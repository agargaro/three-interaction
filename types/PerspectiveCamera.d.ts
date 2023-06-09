import { Object3D, Scene } from "three";
import { PerspectiveCamera as PerspectiveCameraBase } from "three/index";
import { Cursor } from "../src/Events/CursorManager";
import { Events } from "../src/Events/Events";
import { BindingCallback, EventsDispatcher } from "../src/index";
import { Object3DExtPrototype } from "../src/Patch/Object3D";

export class PerspectiveCamera extends PerspectiveCameraBase implements Object3DExtPrototype {
    enabled: boolean;
    enabledUntilParent: boolean;
    interceptByRaycaster: boolean;
    objectsToRaycast: Object3D[];
    focusable: boolean;
    draggable: boolean;
    hovered: boolean;
    focused: boolean;
    clicking: boolean;
    dragging: boolean;
    cursor: Cursor;
    cursorOnDrag: Cursor;
    scene: Scene;
    get firstFocusable(): Object3D;
    needsRender(): void;
    on<K extends keyof Events>(type: K | K[], listener: (args: Events[K]) => void): (args: Events[K]) => void;
    hasEvent<K extends keyof Events>(type: K, listener: (args: Events[K]) => void): boolean;
    off<K extends keyof Events>(type: K, listener: (args: Events[K]) => void): void;
    trigger<K extends keyof Events>(type: K, args: Events[K]): void;
    triggerAncestor<K extends keyof Events>(type: K, args: Events[K]): void;
    setManualDetectionMode(): void;
    detectChanges(recursive?: boolean): void;
    bindProperty<T extends keyof this>(property: T, getCallback: () => this[T], renderOnChange?: boolean): this;
    unbindProperty<T extends keyof this>(property: T): this;
    override parent: Object3D;
    override children: Object3D[];
    /** @internal */ __boundCallbacks: BindingCallback[];
    /** @internal */ __manualDetection: boolean;
    /** @internal */ __eventsDispatcher: EventsDispatcher;
    /** @internal */ __vec3Patched: boolean;
    /** @internal */ __rotationPatched: boolean;
    /** @internal */ __smartRenderingPatched: boolean;
    /** @internal */ __enabled: boolean;
    /** @internal */ __visible: boolean;
}
