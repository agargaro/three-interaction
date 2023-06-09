import { Object3D, WebGLRenderer } from "three";
import { RenderManager } from "../Rendering/RenderManager";
import { CursorHandler } from "./CursorManager";
import { DragAndDropManager } from "./DragAndDropManager";
import { FocusEventExt, InteractionEvents, IntersectionExt, KeyboardEventExt, PointerEventExt, PointerIntersectionEvent, WheelEventExt } from "./Events";
import { InteractionEventsQueue } from "./InteractionEventsQueue";
import { RaycasterManager } from "./RaycasterManager";

export class InteractionManager {
    public enabled = true;
    public needsUpdate = true;
    public continousRaycasting = true; //for intersection event
    public continousRaycastingDrop = true; //for trigger drag without moving
    public blurOnClickOut = false;
    public intersection: { [x: string]: IntersectionExt } = {};
    public intersectionDropTarget: IntersectionExt;
    public focusedObject: Object3D;
    public raycasterManager: RaycasterManager;
    private _renderManager: RenderManager;
    private _cursorManager: CursorHandler;
    private _queue = new InteractionEventsQueue();
    private _dragManager = new DragAndDropManager();
    private _primaryIdentifier: number;
    private _lastPointerDownExt: { [x: string]: PointerEventExt } = {};
    private _lastPointerDown: { [x: string]: PointerEvent } = {};
    private _lastPointerMove: { [x: string]: PointerEvent } = {};
    private _lastClick: PointerEventExt;
    private _lastIntersection: { [x: string]: IntersectionExt } = {};
    private _primaryRaycasted: boolean;
    private _mouseDetected = false;
    private _isTapping = false;

    constructor(renderManager: RenderManager) {
        this._renderManager = renderManager;
        const renderer = renderManager.renderer;
        this.registerRenderer(renderer);
        this._cursorManager = new CursorHandler(renderer.domElement);
        this.raycasterManager = new RaycasterManager(renderManager);
    }

    public registerRenderer(renderer: WebGLRenderer): void {
        if (!(renderer instanceof WebGLRenderer)) {
            console.error("Renderer not supported.");
            return;
        }
        renderer.domElement.addEventListener("pointermove", (e) => this._mouseDetected = e.pointerType === "mouse");
        renderer.domElement.addEventListener("pointerdown", (e) => this._isTapping = e.pointerType !== "mouse" && e.isPrimary);
        renderer.domElement.addEventListener("pointerup", (e) => this._isTapping &&= !e.isPrimary);
        //todo pointercancel
        this.bindEvents(renderer);
    }

    private bindEvents(renderer: WebGLRenderer): void {
        const domElement = renderer.domElement;
        // domElement.addEventListener("pointercancel", this.enqueue.bind(this));
        domElement.addEventListener("pointerleave", this.enqueue.bind(this));
        domElement.addEventListener("pointerdown", this.enqueue.bind(this));
        domElement.addEventListener("pointermove", this.enqueue.bind(this));
        domElement.addEventListener("pointerup", this.enqueue.bind(this));
        domElement.addEventListener("wheel", this.enqueue.bind(this));
        document.addEventListener("keydown", this.enqueue.bind(this)); //todo capire meglio?
        document.addEventListener("keyup", this.enqueue.bind(this));
    }

    private enqueue(event: Event): void {
        this._queue.enqueue(event);
    }

    public update(): void { //todo user active scene?
        //TODO check se canvas ha perso focus
        if (this.enabled !== true || this.needsUpdate === false) return;
        this._primaryRaycasted = false;
        for (const event of this._queue.dequeue()) {
            this.computeQueuedEvent(event);
        }
        this.pointerIntersection();
        this._cursorManager.update(this._dragManager.target, this.intersection[this._primaryIdentifier]?.object); //todo creare hoveredobj?
        // this.needsUpdate = false; TODO decomment when implement 20 fps raycasting
    }

    private raycastScene(event: PointerEvent): void {
        if (event.isPrimary) {
            this._primaryRaycasted = true;
            this._primaryIdentifier = event.pointerId;
        }
        if (this._dragManager.isDragging) {
            const intersections = this.raycasterManager.getIntersections(event, true, this._dragManager.findDropTarget === true ? this._dragManager.target : undefined);
            this.intersectionDropTarget = intersections[0];
        } else {
            this._lastIntersection[event.pointerId] = this.intersection[event.pointerId]; //todo remember delete
            const intersections = this.raycasterManager.getIntersections(event, false);
            this.intersection[event.pointerId] = intersections[0];
        }
    }

    private triggerPointer(type: keyof InteractionEvents, event: PointerEvent, target: Object3D, relatedTarget?: Object3D): void {
        if (target) {
            const pointerEvent = new PointerEventExt(event, this.intersection[event.pointerId], relatedTarget);
            target.trigger(type, pointerEvent);
        }
    }

    private triggerAncestorPointer(type: keyof InteractionEvents, event: PointerEvent, target: Object3D, relatedTarget?: Object3D, cancelable?: boolean): PointerEventExt {
        if (target) {
            const pointerEvent = new PointerEventExt(event, this.intersection[event.pointerId], relatedTarget, cancelable);
            target.triggerAncestor(type, pointerEvent);
            return pointerEvent;
        }
    }

    private triggerAncestorWheel(event: WheelEvent, intersection: IntersectionExt): void {
        if (intersection) {
            const wheelEvent = new WheelEventExt(event, intersection);
            intersection.object.triggerAncestor("wheel", wheelEvent);
        }
    }

    private triggerAncestorKeyboard(type: keyof InteractionEvents, event: KeyboardEvent, cancelable: boolean): KeyboardEventExt {
        if (this.focusedObject) {
            const keyboardEvent = new KeyboardEventExt(event, cancelable);
            this.focusedObject.triggerAncestor(type, keyboardEvent);
            return keyboardEvent;
        }
    }

    private computeQueuedEvent(event: Event): void {
        switch (event.type) {
            case "pointerleave": return this.pointerLeave(event as PointerEvent);
            case "pointermove": return this.pointerMove(event as PointerEvent);
            case "pointerdown": return this.pointerDown(event as PointerEvent);
            case "pointerup": return this.pointerUp(event as PointerEvent);
            case "wheel": return this.wheel(event as WheelEvent);
            case "keydown": return this.keyDown(event as KeyboardEvent);
            case "keyup": return this.keyUp(event as KeyboardEvent);
            default: console.error("Error: computeEvent failed.");
        }
    }

    public isMainClick(event: PointerEvent): boolean {
        return event.isPrimary && ((event.pointerType === "mouse" && event.button === 0) || event.pointerType !== "mouse");
    }

    private pointerDown(event: PointerEvent): void {
        if (event.pointerType !== "mouse") {
            this.pointerMove(event);
        }
        const target = this.intersection[event.pointerId]?.object;
        const pointerDownEvent = this.triggerAncestorPointer("pointerdown", event, target, undefined, true);
        this._lastPointerDown[event.pointerId] = event;
        this._lastPointerDownExt[event.pointerId] = pointerDownEvent;

        if (target) {
            //todo handle if pointer cancel
            target.clicking = this.isMainClick(event);
        }

        if (!pointerDownEvent?._defaultPrevented) {
            this.focus(event, target);
        }
    }

    private pointerLeave(event: PointerEvent): void {
        this._lastPointerMove[event.pointerId] = event;
    }

    private pointerMove(event: PointerEvent): void {
        this._lastPointerMove[event.pointerId] = event;
        this.raycastScene(event);
        if (this._dragManager.isDragging) {
            this._dragManager.performDrag(event, this.raycasterManager.raycaster, this._renderManager.activeView.camera, this.intersectionDropTarget);
        } else {
            this.pointerOutOver(event);
            const target = this.intersection[event.pointerId]?.object;
            if (!this._dragManager.startDragging(event, this.raycasterManager.raycaster, this._renderManager.activeView?.camera, target)) {
                this.triggerAncestorPointer("pointermove", event, target);
            }
        }
    }

    private pointerIntersection(): void {
        if (this._dragManager.isDragging) {
            if (!this._primaryRaycasted && this._dragManager.findDropTarget && this.continousRaycastingDrop) {
                const event = this._lastPointerMove[this._primaryIdentifier] || this._lastPointerDown[this._primaryIdentifier];
                this.raycastScene(event);
                this._dragManager.performDrag(event, this.raycasterManager.raycaster, this._renderManager.activeView?.camera, this.intersectionDropTarget);
            }
        } else if (this.continousRaycasting && (this._mouseDetected || this._isTapping)) {
            if (!this._primaryRaycasted) {
                const event = this._lastPointerMove[this._primaryIdentifier] || this._lastPointerDown[this._primaryIdentifier];
                this.raycastScene(event);
                this.pointerOutOver(event);
            }
            const intersection = this.intersection[this._primaryIdentifier];
            intersection?.object.triggerAncestor("pointerintersection", new PointerIntersectionEvent(intersection));
        }
    }

    private wheel(event: WheelEvent): void {
        this.triggerAncestorWheel(event, this.intersection[this._primaryIdentifier]);
    }

    private pointerOutOver(event: PointerEvent): void {
        const hoveredObj = this.intersection[event.pointerId]?.object;
        const lastHoveredObj = this._lastIntersection[event.pointerId]?.object;

        if (event.isPrimary) {
            lastHoveredObj && (lastHoveredObj.hovered = false);
            hoveredObj && (hoveredObj.hovered = true);
        }

        if (hoveredObj !== lastHoveredObj) {
            this.triggerAncestorPointer("pointerout", event, lastHoveredObj, hoveredObj);
            this.triggerPointer("pointerleave", event, lastHoveredObj, hoveredObj);
            this.triggerAncestorPointer("pointerover", event, hoveredObj, lastHoveredObj);
            this.triggerPointer("pointerenter", event, hoveredObj, lastHoveredObj);
        }
    }

    private pointerUp(event: PointerEvent): void {
        const target = this.intersection[event.pointerId]?.object;
        const lastPointerDownTarget = this._lastPointerDownExt[event.pointerId]?._target;
        let lastClick: PointerEventExt;

        if (event.pointerType !== "mouse" && target) {
            target.hovered = false;
            this.triggerAncestorPointer("pointerout", event, target);
            this.triggerPointer("pointerleave", event, target);
        }

        if (!this._dragManager.stopDragging(event)) {
            this.triggerAncestorPointer("pointerup", event, target, lastPointerDownTarget);
            if (target && target === lastPointerDownTarget) {
                lastClick = this.triggerAncestorPointer("click", event, target);
            }
        }

        this._lastClick = this.dblClick(event, lastClick, target);

        if (lastPointerDownTarget && this.isMainClick(event)) {
            lastPointerDownTarget.clicking = false;
        }
    }

    private dblClick(event: PointerEvent, lastClick: PointerEventExt, target: Object3D): PointerEventExt {
        if (this.isMainClick(event) && lastClick) {
            const prevClick = this._lastClick;
            if (target === prevClick?._target && event.timeStamp - prevClick.timeStamp <= 300) {
                this.triggerAncestorPointer("dblclick", event, target);
                return undefined;
            }
            return lastClick;
        }
    }

    private keyDown(event: KeyboardEvent): void {
        const keyDownEvent = this.triggerAncestorKeyboard("keydown", event, true);
        if (!keyDownEvent?._defaultPrevented) {
            if (event.key === "Escape" || event.key === "Esc") {
                this._dragManager.cancelDragging(this._lastPointerMove[this._primaryIdentifier]);
            }
        }
    }

    private keyUp(event: KeyboardEvent): void {
        this.triggerAncestorKeyboard("keyup", event, false);
    }

    private focus(event: PointerEvent, target: Object3D): void { //TODO creare possibilità di settare focus manulamente
        if (!event.isPrimary) return;
        const focusableObj = target?.firstFocusable;
        if (this.focusedObject !== focusableObj) {

            if (!this.blurOnClickOut && !focusableObj) return;

            const event = new FocusEventExt(focusableObj);
            const oldFocusedObj = this.focusedObject;

            if (oldFocusedObj) {
                oldFocusedObj.focused = false;
                oldFocusedObj.triggerAncestor("blur", event);
                oldFocusedObj.trigger("focusout", event);
            }

            if (focusableObj) {
                focusableObj.focused = true
                event.relatedTarget = oldFocusedObj;
                focusableObj.triggerAncestor("focus", event);
                focusableObj.trigger("focusin", event);
            }

            this.focusedObject = focusableObj;
            this._renderManager.activeView.scene.__needsRender = true;
        }
    }
}
