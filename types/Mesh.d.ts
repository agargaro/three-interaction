import { Object3D } from "three";
import { Mesh as MeshBase } from "three/index";
import { Cursor } from "../src/Interaction/CursorManager";
import { Events } from "../src/Interaction/Events";
import { EventsDispatcher } from "../src/index";
import { InteractionPrototype } from "../src/Patch/Object3D";

export class Mesh extends MeshBase  implements InteractionPrototype {
    __eventsDispatcher: EventsDispatcher;
    override parent: Object3D;
    override children: Object3D[];
    draggable: boolean;
    activable: boolean;
    get activableObj(): Object3D;
    active: boolean;
    activeUntilParent: boolean;
    hovered: boolean;
    enabled: boolean;
    enabledUntilParent: boolean;
    visibleUntilParent: boolean;
    interceptByRaycaster: boolean;
    objectsToRaycast: Object3D[];
    cursorOnHover: Cursor;
    cursorOnDrag: Cursor;
    bindEvent<K extends keyof Events>(type: K | K[], listener: (args: Events[K]) => void): (args: Events[K]) => void;
    hasBoundEvent<K extends keyof Events>(type: K, listener: (args: Events[K]) => void): boolean;
    unbindEvent<K extends keyof Events>(type: K, listener: (args: Events[K]) => void): void;
    triggerEvent<K extends keyof Events>(type: K, args: Events[K]): void;
    triggerEventAncestor<K extends keyof Events>(type: K, args: Events[K]): void;
}
