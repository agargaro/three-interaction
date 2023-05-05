import*as t from"three";import*as e from"three/examples/jsm/lines/Line2";import*as i from"three/examples/jsm/lines/LineGeometry";import*as s from"three/examples/jsm/lines/LineMaterial";import*as n from"three/examples/jsm/libs/stats.module";var r={d:(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},a={};r.d(a,{x$:()=>d,H7:()=>L,wO:()=>u,Ex:()=>E,Qr:()=>B,kX:()=>F,SP:()=>l,td:()=>P,w_:()=>k,Ns:()=>D,or:()=>G,gb:()=>A,cP:()=>Y,DJ:()=>R,Ke:()=>X,RR:()=>T,MZ:()=>q,cQ:()=>_,CP:()=>W,tL:()=>U,Xp:()=>C,cu:()=>z,uF:()=>f,EU:()=>y,Lz:()=>V,zh:()=>M});const h=(o={Clock:()=>t.Clock,Color:()=>t.Color,EventDispatcher:()=>t.EventDispatcher,InstancedInterleavedBuffer:()=>t.InstancedInterleavedBuffer,InstancedMesh:()=>t.InstancedMesh,InterleavedBufferAttribute:()=>t.InterleavedBufferAttribute,MathUtils:()=>t.MathUtils,Matrix4:()=>t.Matrix4,Object3D:()=>t.Object3D,PerspectiveCamera:()=>t.PerspectiveCamera,Quaternion:()=>t.Quaternion,Raycaster:()=>t.Raycaster,ShaderMaterial:()=>t.ShaderMaterial,Vector2:()=>t.Vector2,Vector3:()=>t.Vector3,WebGLRenderTarget:()=>t.WebGLRenderTarget,WebGLRenderer:()=>t.WebGLRenderer},c={},r.d(c,o),c);var o,c;class l extends h.InstancedMesh{constructor(t,e,i,s,n){super(t,e,i),this.instances=[],this._tempMatrix=new h.Matrix4,this._tempColor=new h.Color,this._needsUpdate=!1,"number"==typeof n&&(n=this._tempColor.setHex(n));for(let t=0;t<i;t++)this.instances.push(new s(this,t,n));this.bindEvent("pointerintersection",(t=>{this.instances[t.intersection.instanceId].triggerEvent("pointerintersection",t)})),this.bindEvent("animate",(t=>{for(let e=0;e<this.count;e++)this.instances[e].triggerEvent("animate",t)}))}}class _{static areVector3Equals(t,e,i=this.eps){return!!(t&&e&&Math.abs(t.x-e.x)<=i&&Math.abs(t.y-e.y)<=i&&Math.abs(t.z-e.z)<=i)}static getSceneFromObj(t){for(;t;){if(t.isScene)return t;t=t.parent}}}_.eps=Math.pow(10,-8);class d{constructor(){this._set=new Set,this.data=[]}push(t){this._set.has(t.id)||(this._set.add(t.id),this.data.push(t))}has(t){return this._set.has(t.id)}clear(){this._set=new Set,this.data=[]}}class u{static push(t,e){if(this._allowedEventsSet.has(t)){let i=_.getSceneFromObj(e);if(i)this.pushScene(i,t,e);else{const s=()=>{i=_.getSceneFromObj(e),this.pushScene(i,t,e),e.removeEventListener("added",s)};e.addEventListener("added",s)}}}static pushScene(t,e,i){var s,n;const r=null!==(s=this._events[t.id])&&void 0!==s?s:this._events[t.id]={};(null!==(n=r[e])&&void 0!==n?n:r[e]=new d).push(i)}static remove(){}static dispatchEvent(t,e,i){const s=this._events[null==t?void 0:t.id];if(s&&s[e])for(const t of s[e].data)t.__eventsDispatcher.dispatchEvent(e,i)}}u._allowedEventsSet=new Set(["rendererresize","framerendering","animate"]),u._events={};const p=!1;h.Object3D.DEFAULT_MATRIX_AUTO_UPDATE=!p,h.Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!p;const v=new d;function y(t){g(t.position),t.position._onChangeCallback=()=>{t.__eventsDispatcher.dispatchEvent("positionchange")},g(t.scale),t.scale._onChangeCallback=()=>{t.__eventsDispatcher.dispatchEvent("scalechange")}}function g(t){t._x=t.x,t._y=t.x,t._z=t.x,t.isVector3=!0,Object.setPrototypeOf(t,m.prototype),Object.defineProperties(t,{x:{get(){return this._x},set(t){this._x=t}},y:{get(){return this._y},set(t){this._y=t}},z:{get(){return this._z},set(t){this._z=t}}})}class m{set(t,e,i){return void 0===i&&(i=this._z),this._x=t,this._y=e,this._z=i,this._onChangeCallback(),this}setScalar(t){return this._x=t,this._y=t,this._z=t,this._onChangeCallback(),this}setX(t){return this._x=t,this._onChangeCallback(),this}setY(t){return this._y=t,this._onChangeCallback(),this}setZ(t){return this._z=t,this._onChangeCallback(),this}setComponent(t,e){switch(t){case 0:this._x=e;break;case 1:this._y=e;break;case 2:this._z=e;break;default:throw new Error("index is out of range: "+t)}return this._onChangeCallback(),this}getComponent(t){switch(t){case 0:return this._x;case 1:return this._y;case 2:return this._z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this._x,this._y,this._z)}copy(t,e){return this._x=t.x,this._y=t.y,this._z=t.z,!1!==e&&this._onChangeCallback(),this}add(t){return this._x+=t.x,this._y+=t.y,this._z+=t.z,this._onChangeCallback(),this}addScalar(t){return this._x+=t,this._y+=t,this._z+=t,this._onChangeCallback(),this}addVectors(t,e){return this._x=t.x+e.x,this._y=t.y+e.y,this._z=t.z+e.z,this._onChangeCallback(),this}addScaledVector(t,e){return this._x+=t.x*e,this._y+=t.y*e,this._z+=t.z*e,this._onChangeCallback(),this}sub(t){return this._x-=t.x,this._y-=t.y,this._z-=t.z,this._onChangeCallback(),this}subScalar(t){return this._x-=t,this._y-=t,this._z-=t,this._onChangeCallback(),this}subVectors(t,e){return this._x=t.x-e.x,this._y=t.y-e.y,this._z=t.z-e.z,this._onChangeCallback(),this}multiply(t){return this._x*=t.x,this._y*=t.y,this._z*=t.z,this._onChangeCallback(),this}multiplyScalar(t,e){return this._x*=t,this._y*=t,this._z*=t,!1!==e&&this._onChangeCallback(),this}multiplyVectors(t,e){return this._x=t.x*e.x,this._y=t.y*e.y,this._z=t.z*e.z,this._onChangeCallback(),this}applyEuler(t){return this.applyQuaternion(x.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(x.setFromAxisAngle(t,e))}applyMatrix3(t,e){const i=this._x,s=this._y,n=this._z,r=t.elements;return this._x=r[0]*i+r[3]*s+r[6]*n,this._y=r[1]*i+r[4]*s+r[7]*n,this._z=r[2]*i+r[5]*s+r[8]*n,!1!==e&&this._onChangeCallback(),this}applyNormalMatrix(t){return this.applyMatrix3(t,!1).normalize()}applyMatrix4(t,e){const i=this._x,s=this._y,n=this._z,r=t.elements,a=1/(r[3]*i+r[7]*s+r[11]*n+r[15]);return this._x=(r[0]*i+r[4]*s+r[8]*n+r[12])*a,this._y=(r[1]*i+r[5]*s+r[9]*n+r[13])*a,this._z=(r[2]*i+r[6]*s+r[10]*n+r[14])*a,!1!==e&&this._onChangeCallback(),this}applyQuaternion(t){const e=this._x,i=this._y,s=this._z,n=t.x,r=t.y,a=t.z,h=t.w,o=h*e+r*s-a*i,c=h*i+a*e-n*s,l=h*s+n*i-r*e,_=-n*e-r*i-a*s;return this._x=o*h+_*-n+c*-a-l*-r,this._y=c*h+_*-r+l*-n-o*-a,this._z=l*h+_*-a+o*-r-c*-n,this._onChangeCallback(),this}project(t){return this.applyMatrix4(t.matrixWorldInverse,!1).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse,!1).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this._x,i=this._y,s=this._z,n=t.elements;return this._x=n[0]*e+n[4]*i+n[8]*s,this._y=n[1]*e+n[5]*i+n[9]*s,this._z=n[2]*e+n[6]*i+n[10]*s,this.normalize()}divide(t){return this._x/=t.x,this._y/=t.y,this._z/=t.z,this._onChangeCallback(),this}divideScalar(t,e){return this.multiplyScalar(1/t,e)}min(t){return this._x=Math.min(this._x,t.x),this._y=Math.min(this._y,t.y),this._z=Math.min(this._z,t.z),this._onChangeCallback(),this}max(t){return this._x=Math.max(this._x,t.x),this._y=Math.max(this._y,t.y),this._z=Math.max(this._z,t.z),this._onChangeCallback(),this}clamp(t,e){return this._x=Math.max(t.x,Math.min(e.x,this._x)),this._y=Math.max(t.y,Math.min(e.y,this._y)),this._z=Math.max(t.z,Math.min(e.z,this._z)),this._onChangeCallback(),this}clampScalar(t,e){return this._x=Math.max(t,Math.min(e,this._x)),this._y=Math.max(t,Math.min(e,this._y)),this._z=Math.max(t,Math.min(e,this._z)),this._onChangeCallback(),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1,!1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this._x=Math.floor(this._x),this._y=Math.floor(this._y),this._z=Math.floor(this._z),this._onChangeCallback(),this}ceil(){return this._x=Math.ceil(this._x),this._y=Math.ceil(this._y),this._z=Math.ceil(this._z),this._onChangeCallback(),this}round(){return this._x=Math.round(this._x),this._y=Math.round(this._y),this._z=Math.round(this._z),this._onChangeCallback(),this}roundToZero(){return this._x=this._x<0?Math.ceil(this._x):Math.floor(this._x),this._y=this._y<0?Math.ceil(this._y):Math.floor(this._y),this._z=this._z<0?Math.ceil(this._z):Math.floor(this._z),this._onChangeCallback(),this}negate(){return this._x=-this._x,this._y=-this._y,this._z=-this._z,this._onChangeCallback(),this}dot(t){return this._x*t.x+this._y*t.y+this._z*t.z}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)}manhattanLength(){return Math.abs(this._x)+Math.abs(this._y)+Math.abs(this._z)}normalize(t){return this.divideScalar(this.length()||1,t)}setLength(t){return this.normalize(!1).multiplyScalar(t)}lerp(t,e){return this._x+=(t.x-this._x)*e,this._y+=(t.y-this._y)*e,this._z+=(t.z-this._z)*e,this._onChangeCallback(),this}lerpVectors(t,e,i){return this._x=t.x+(e.x-t.x)*i,this._y=t.y+(e.y-t.y)*i,this._z=t.z+(e.z-t.z)*i,this._onChangeCallback(),this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,n=t.z,r=e.x,a=e.y,h=e.z;return this._x=s*h-n*a,this._y=n*r-i*h,this._z=i*a-s*r,this._onChangeCallback(),this}projectOnVector(t){const e=t.lengthSq();if(0===e)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t,!1).multiplyScalar(i)}projectOnPlane(t){return b.copy(this).projectOnVector(t),this.sub(b)}reflect(t){return this.sub(b.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(0===e)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(h.MathUtils.clamp(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this._x-t.x,i=this._y-t.y,s=this._z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this._x-t.x)+Math.abs(this._y-t.y)+Math.abs(this._z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this._x=s*Math.sin(i),this._y=Math.cos(e)*t,this._z=s*Math.cos(i),this._onChangeCallback(),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this._x=t*Math.sin(e),this._y=i,this._z=t*Math.cos(e),this._onChangeCallback(),this}setFromMatrixPosition(t){const e=t.elements;return this._x=e[12],this._y=e[13],this._z=e[14],this._onChangeCallback(),this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this._x=e,this._y=i,this._z=s,this._onChangeCallback(),this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,3*e)}setFromEuler(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._onChangeCallback(),this}setFromColor(t){return this._x=t.r,this._y=t.g,this._z=t.b,this._onChangeCallback(),this}equals(t){return t.x===this._x&&t.y===this._y&&t.z===this._z}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._onChangeCallback(),this}random(){return this._x=Math.random(),this._y=Math.random(),this._z=Math.random(),this._onChangeCallback(),this}randomDirection(){const t=2*(Math.random()-.5),e=Math.random()*Math.PI*2,i=Math.sqrt(1-Math.pow(t,2));return this._x=i*Math.cos(e),this._y=i*Math.sin(e),this._z=t,this._onChangeCallback(),this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z}}const b=new h.Vector3,x=new h.Quaternion;function f(t){const e=t.quaternion._onChangeCallback;t.quaternion._onChange((()=>{e(),t.__eventsDispatcher.dispatchEvent("quaternionchange")}))}function C(t){const e=t.rotation._onChangeCallback;t.rotation._onChange((()=>{e(),t.__eventsDispatcher.dispatchEvent("rotationchange")}))}const M={};function z(t){t.__patched||(y(t),f(t),C(t),t.matrix.compose=function(t,e,i){const s=this.elements,n=e._x,r=e._y,a=e._z,h=e._w,o=n+n,c=r+r,l=a+a,_=n*o,d=n*c,u=n*l,p=r*c,v=r*l,y=a*l,g=h*o,m=h*c,b=h*l,x=i._x,f=i._y,C=i._z;return s[0]=(1-(p+y))*x,s[1]=(d+b)*x,s[2]=(u-m)*x,s[3]=0,s[4]=(d-b)*f,s[5]=(1-(_+y))*f,s[6]=(v+g)*f,s[7]=0,s[8]=(u+m)*C,s[9]=(v-g)*C,s[10]=(1-(_+p))*C,s[11]=0,s[12]=t._x,s[13]=t._y,s[14]=t._z,s[15]=1,this},t.__patched=!0)}h.Object3D.prototype.activable=!1,h.Object3D.prototype.active=!1,h.Object3D.prototype.hovered=!1,h.Object3D.prototype.enabled=!0,h.Object3D.prototype.interceptByRaycaster=!0,Object.defineProperty(h.Object3D.prototype,"activableObj",{get:function(){let t=this;for(;t&&!t.activable;)t=t.parent;return t}}),h.Object3D.prototype.bindEvent=function(t,e){if("string"==typeof t)return this.__eventsDispatcher.addEventListener(t,e);for(const i of t)this.__eventsDispatcher.addEventListener(i,e);return e},h.Object3D.prototype.hasBoundEvent=function(t,e){return this.__eventsDispatcher.hasEventListener(t,e)},h.Object3D.prototype.unbindEvent=function(t,e){this.__eventsDispatcher.removeEventListener(t,e)},h.Object3D.prototype.triggerEvent=function(t,e){this.__eventsDispatcher.dispatchDOMEvent(t,e)},h.Object3D.prototype.triggerEventAncestor=function(t,e){this.__eventsDispatcher.dispatchDOMEventAncestor(t,e)},Object.defineProperty(h.Object3D.prototype,"userData",{set:function(t){var e;this._patched||(M[this.id]=this,this.__eventsDispatcher=new E(this),e=this,p&&e.bindEvent(["positionchange","scalechange","quaternionchange","rotationchange"],(()=>{v.push(e)})),this._patched=!0),Object.defineProperty(this,"userData",{value:t,writable:!0})}});class E{constructor(t){this.parent=t,this._listeners={}}addEventListener(t,e){return this._listeners[t]||(this._listeners[t]=[],this.parent.isObject3D&&(u.push(t,this.parent),"positionchange"!==t&&"scalechange"!==t&&"rotationchange"!==t&&"quaternionchange"!==t||z(this.parent))),-1===this._listeners[t].indexOf(e)&&this._listeners[t].push(e),e}hasEventListener(t,e){var i,s;return!(null===(s=null===(i=this._listeners[t])||void 0===i?void 0:i.indexOf(e))||void 0===s||!s)}removeEventListener(t,e){var i,s;const n=null!==(s=null===(i=this._listeners[t])||void 0===i?void 0:i.indexOf(e))&&void 0!==s?s:-1;-1!==n&&this._listeners[t].splice(n,1)}dispatchDOMEvent(t,e){e._bubbles=!1,e._stoppedImmediatePropagation=!1,e._defaultPrevented=!1,e._type=t,e._target=this.parent,this._dispatchDOMEvent(t,e)}_dispatchDOMEvent(t,e){if(!this._listeners[t])return;const i=e.currentTarget=this.parent;for(const s of this._listeners[t]){if(e._stoppedImmediatePropagation)break;s.call(i,e)}}dispatchDOMEventAncestor(t,e){let i=this.parent;for(e._bubbles=!0,e._stoppedImmediatePropagation=!1,e._defaultPrevented=!1,e._type=t,e._target=i;i&&e._bubbles;)i.__eventsDispatcher._dispatchDOMEvent(t,e),i=i.parent}dispatchEvent(t,e){if(this._listeners[t])for(const i of this._listeners[t])i.call(this.parent,e)}}let w=1;class P extends h.EventDispatcher{get activableObj(){return this.activable?this:this.parent.activableObj}constructor(t,e,i){super(),this.position=new h.Vector3,this.scale=new h.Vector3(1,1,1),this.quaternion=new h.Quaternion,this.activable=!1,this.active=!1,this.activeUntilParent=!1,this.hovered=!1,this.enabled=!0,this.id=w++,this.parent=t,this.instanceId=e,this.__eventsDispatcher=new E(this),i&&this.setColor(i)}setColor(t){"number"==typeof t?this.parent.setColorAt(this.instanceId,this.parent._tempColor.setHex(t)):this.parent.setColorAt(this.instanceId,t),this.parent.instanceColor.needsUpdate=!0}getColor(t=this.parent._tempColor){return this.parent.getColorAt(this.instanceId,t),t}updateMatrix(){const t=this.parent._tempMatrix;t.compose(this.position,this.quaternion,this.scale),this.parent.setMatrixAt(this.instanceId,t),this.parent.instanceMatrix.needsUpdate=!0}bindEvent(t,e){if("string"==typeof t)return this.__eventsDispatcher.addEventListener(t,e);for(const i of t)this.__eventsDispatcher.addEventListener(i,e);return e}hasBoundEvent(t,e){return this.__eventsDispatcher.hasEventListener(t,e)}unbindEvent(t,e){this.__eventsDispatcher.removeEventListener(t,e)}triggerEvent(t,e){this.__eventsDispatcher.dispatchEvent(t,e)}}const j=(t=>{var e={};return r.d(e,t),e})({Line2:()=>e.Line2}),S=(t=>{var e={};return r.d(e,t),e})({LineGeometry:()=>i.LineGeometry}),O=(t=>{var e={};return r.d(e,t),e})({LineMaterial:()=>s.LineMaterial});class k extends j.Line2{constructor(t=new O.LineMaterial){super(new S.LineGeometry,t),this.bindEvent("rendererresize",(t=>{this.material.resolution.set(t.width,t.height)}))}updatePoints(t,...e){const i=this.geometry.attributes.instanceStart.array;for(const s of e){const e=6*(s-1)+3;i[e]=t[s].x,i[e+1]=t[s].y,i[e+2]=t[s].z,i[e+3]=t[s].x,i[e+4]=t[s].y,i[e+5]=t[s].z}this.geometry.attributes.instanceStart.needsUpdate=!0,this.geometry.attributes.instanceEnd.needsUpdate=!0,this.update()}setPoints(t){this.createAttributes(t)||(this.fillFloat32Array(t,this.geometry.attributes.instanceStart.array),this.geometry.attributes.instanceStart.needsUpdate=!0,this.geometry.attributes.instanceEnd.needsUpdate=!0),this.update()}createAttributes(t){var e;if((null===(e=this.geometry.getAttribute("instanceStart"))||void 0===e?void 0:e.count)!==t.length-1){const e=this.fillFloat32Array(t),i=new h.InstancedInterleavedBuffer(e,6,1);return this.geometry.setAttribute("instanceStart",new h.InterleavedBufferAttribute(i,3,0)),this.geometry.setAttribute("instanceEnd",new h.InterleavedBufferAttribute(i,3,3)),this.geometry._maxInstanceCount=t.length,!0}}fillFloat32Array(t,e){var i,s;null!=e||(e=new Float32Array(3*(t.length-1)*2));for(let n=0;n<t.length-1;n++){const r=6*n;e[r]=t[n].x,e[r+1]=t[n].y,e[r+2]=null!==(i=t[n].z)&&void 0!==i?i:0,e[r+3]=t[n+1].x,e[r+4]=t[n+1].y,e[r+5]=null!==(s=t[n+1].z)&&void 0!==s?s:0}return e}update(){this.geometry.computeBoundingBox(),this.geometry.computeBoundingSphere()}}class D extends h.ShaderMaterial{constructor(t,e,i){super(),this.vertexShader="\n        varying vec2 vUv;\n\n\t\tvoid main() {\n            vUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\t\t}",this.fragmentShader="\n        uniform vec3 empty;\n        uniform vec3 fill;\n        uniform float percentage;\n        uniform float time;\n        uniform float height;\n        varying vec2 vUv;\n\n        void main() {\n            if (vUv.y > percentage) {\n                gl_FragColor = vec4(empty + (sin(vUv.y * height + time) * 0.2 - 0.1), 1.0);\n            } else {\n                gl_FragColor = vec4(fill + (cos(vUv.y * height + time) * 0.2 - 0.1), 1.0);\n            }\n        }",this.uniforms={empty:{value:new h.Color(e)},fill:{value:new h.Color(i)},percentage:{value:0},time:{value:0},height:{value:t}}}setPercentage(t){this.uniforms.percentage.value=t}}const I=(t=>{var e={};return r.d(e,t),e})({default:()=>n.default});class L{get bubbles(){return this._bubbles}get defaultPrevented(){return this._defaultPrevented}get target(){return this._target}get type(){return this._type}constructor(t=!1){this.timeStamp=performance.now(),this.cancelable=t}preventDefault(){this._defaultPrevented=!0}stopImmediatePropagation(){this._stoppedImmediatePropagation=!0}stopPropagation(){this._bubbles=!1}}class A extends L{get altKey(){return this._event.altKey}get button(){return this._event.button}get buttons(){return this._event.buttons}get clientX(){return this._event.clientX}get clientY(){return this._event.clientY}get ctrlKey(){return this._event.ctrlKey}get metaKey(){return this._event.metaKey}get movementX(){return this._event.movementX}get movementY(){return this._event.movementY}get offsetX(){return this._event.offsetX}get offsetY(){return this._event.offsetY}get pageX(){return this._event.pageX}get pageY(){return this._event.pageY}get screenX(){return this._event.screenX}get screenY(){return this._event.screenY}get shiftKey(){return this._event.shiftKey}constructor(t,e,i,s,n){super(n),this._event=t,this.intersection=e,this.relatedTarget=s,(null==e?void 0:e.object)===(null==i?void 0:i.object)&&(this.movement=e.point.clone().sub(i.point))}getModifierState(t){return this._event.getModifierState(t)}}class R extends A{get pointerId(){return this._event.pointerId}get width(){return this._event.width}get height(){return this._event.height}get pressure(){return this._event.pressure}get tangentialPressure(){return this._event.tangentialPressure}get tiltX(){return this._event.tiltX}get tiltY(){return this._event.tiltY}get twist(){return this._event.twist}get pointerType(){return this._event.pointerType}get isPrimary(){return this._event.isPrimary}constructor(t,e,i,s,n){super(t,e,i,s,n)}getCoalescedEvents(){}getPredictedEvents(){}}class T extends L{constructor(t,e){super(),this.intersection=t,t.object===(null==e?void 0:e.object)&&(this.movement=t.point.clone().sub(e.point))}}class U extends A{constructor(t,e){super(t,e,void 0)}}class q extends L{constructor(t,e,i){super(),this.renderer=t,this.width=e,this.height=i}}class F extends L{constructor(t){super(),this.relatedTarget=t}}function V(t){t.scenes=[];const e=new h.Clock,i=t.render.bind(t);t.render=function(t,s){this._isGPUPicking?this._isGPUPicking=!1:(u.dispatchEvent(t,"animate",{delta:e.getDelta(),total:e.getElapsedTime()}),u.dispatchEvent(t,"framerendering"),function(){if(p){for(const t of v.data)t.updateMatrix(),t.updateMatrixWorld();v.clear()}}()),i(t,s)};const s=t.setSize.bind(t);t.setSize=function(t,e,i){s(t,e,i);for(const i of this.scenes)u.dispatchEvent(i,"rendererresize",new q(this,t,e))},t.addScene=function(...t){for(const e of t)-1===this.scenes.indexOf(e)&&this.scenes.push(e)},t.removeScene=function(t){const e=this.scenes.indexOf(t);-1!==e&&this.scenes.splice(e,1)}}class X{constructor(){this._items=[]}enqueue(t){if("pointermove"===t.type)for(let e=this._items.length-1;e>=0;e--){const i=this._items[e];if(i.pointerId===t.pointerId){const s=i.type;if("pointermove"===s)return void(this._items[e]=t);if("pointercancel"===s||"pointerdown"===s||"pointerout"===s||"pointerover"===s||"pointerup"===s)break}}this._items.push(t)}dequeue(){const t=this._items;return this._items=[],t}}class B{constructor(t){this.renderer=t,this.enabled=!0,this.raycastGPU=!1,this.pickingTexture=new h.WebGLRenderTarget(1,1),this.intersectionSortComparer=(t,e)=>t.distance===e.distance?e.object.id-t.object.id:t.distance-e.distance,this.continousPointerRaycasting=!0,this.disactiveWhenClickOut=!1,this.pointer=new h.Vector2,this.pointerUv=new h.Vector2,this.intersection={},this._lastPointerDownExt={},this._lastPointerDown={},this._lastPointerMove={},this._lastClick={},this._lastIntersection={},this._raycaster=new h.Raycaster,this._queue=new X,this._mouseDetected=!1,this._isTapping=!1,this.registerRenderer(t)}registerRenderer(t){t instanceof h.WebGLRenderer?(t.domElement.addEventListener("pointermove",(t=>this._mouseDetected="mouse"===t.pointerType)),t.domElement.addEventListener("pointerdown",(t=>this._isTapping="mouse"!==t.pointerType&&t.isPrimary)),t.domElement.addEventListener("pointerup",(t=>this._isTapping&&(this._isTapping=!t.isPrimary))),this.bindEvents()):console.error("Renderer not supported.")}bindEvents(){const t=this.renderer.domElement;t.addEventListener("pointercancel",this.enqueue.bind(this)),t.addEventListener("pointerdown",this.enqueue.bind(this)),t.addEventListener("pointermove",this.enqueue.bind(this)),t.addEventListener("pointerup",this.enqueue.bind(this)),t.addEventListener("wheel",this.enqueue.bind(this)),t.addEventListener("keydown",this.enqueue.bind(this)),t.addEventListener("keyup",this.enqueue.bind(this))}enqueue(t){this._queue.enqueue(t)}update(t,e){if(this.enabled){this._primaryRaycasted=!1;for(const i of this._queue.dequeue())this.computeQueuedEvent(i,t,e);this.pointerIntersection(t,e)}}raycastScene(t,e,i){i.isPrimary&&(this._primaryRaycasted=!0,this._primaryIdentifier=i.pointerId),this._lastIntersection[i.pointerId]=this.intersection[i.pointerId],this.updateCanvasPointerPosition(i),this._raycaster.setFromCamera(this.pointerUv,e);const s=this.raycastGPU?this.raycastObjectsGPU(t,e):this.raycastObjects(t,[]);s.sort(this.intersectionSortComparer),this.intersection[i.pointerId]=s[0]}raycastObjects(t,e){if(t.interceptByRaycaster&&t.visible){for(const i of t.children)this.raycastObjects(i,e);let i=e.length;for(t.objectsToRaycast?this._raycaster.intersectObjects(t.objectsToRaycast,!1,e):this._raycaster.intersectObject(t,!1,e);e.length>i;){const s=e[i];s.hitbox=s.object,s.object=t,i++}}return e}raycastObjectsGPU(t,e){const i=this.renderer.domElement.width,s=this.renderer.domElement.height;e.setViewOffset(i,s,this.pointer.x*devicePixelRatio,this.pointer.y*devicePixelRatio,1,1),this.renderer.setRenderTarget(this.pickingTexture),this.renderer.render(t,e),e.clearViewOffset();const n=new Uint8Array(4);this.renderer.readRenderTargetPixels(this.pickingTexture,0,0,1,1,n);const r=n[0]<<16|n[1]<<8|n[2];this.renderer.setRenderTarget(null);const a=M[r],h=[];if(a){a.objectsToRaycast?this._raycaster.intersectObjects(a.objectsToRaycast,!1,h):this._raycaster.intersectObject(a,!1,h);for(const t of h)t.hitbox=t.object,t.object=a}return h}updateCanvasPointerPosition(t){this.pointerUv.x=t.offsetX/this.renderer.domElement.clientWidth*2-1,this.pointerUv.y=t.offsetY/this.renderer.domElement.clientHeight*-2+1,this.pointer.set(t.offsetX,t.offsetY)}triggerAncestorPointer(t,e,i,s,n){if(i){const r=new R(e,this.intersection[e.pointerId],this._lastIntersection[e.pointerId],s,n);return i.triggerEventAncestor(t,r),r}}triggerAncestorWheel(t,e){if(e){const i=new U(t,this.intersection[this._primaryIdentifier]);e.triggerEventAncestor("wheel",i)}}computeQueuedEvent(t,e,i){switch(t.type){case"pointermove":return this.pointerMove(t,e,i);case"pointerdown":return this.pointerDown(t,e,i);case"pointerup":return this.pointerUp(t);case"wheel":return this.wheel(t);default:console.error("Error: computeEvent failed.")}}pointerDown(t,e,i){var s;"mouse"!==t.pointerType&&this.raycastScene(e,i,t);const n=this.triggerAncestorPointer("pointerdown",t,null===(s=this.intersection[t.pointerId])||void 0===s?void 0:s.object,void 0,!0);this._lastPointerDown[t.pointerId]=t,this._lastPointerDownExt[t.pointerId]=n,(null==n?void 0:n._defaultPrevented)||this.focus(t)}pointerMove(t,e,i){var s;this._lastPointerMove[t.pointerId]=t,this.pointerOutOver(e,i,t),this.triggerAncestorPointer("pointermove",t,null===(s=this.intersection[t.pointerId])||void 0===s?void 0:s.object)}pointerIntersection(t,e){if(!this.continousPointerRaycasting)return;!this._mouseDetected&&!this._isTapping||this._primaryRaycasted||this.pointerOutOver(t,e,this._lastPointerMove[this._primaryIdentifier]||this._lastPointerDown[this._primaryIdentifier]);const i=this.intersection[this._primaryIdentifier];null==i||i.object.triggerEventAncestor("pointerintersection",new T(i,this._lastIntersection[this._primaryIdentifier]))}wheel(t){this.triggerAncestorWheel(t,this.intersection[this._primaryIdentifier].object)}pointerOutOver(t,e,i){var s,n;this.raycastScene(t,e,i);const r=null===(s=this.intersection[this._primaryIdentifier])||void 0===s?void 0:s.object,a=null===(n=this._lastIntersection[this._primaryIdentifier])||void 0===n?void 0:n.object;a&&(a.hovered=!1),r&&(r.hovered=!0),r!==a&&(this.triggerAncestorPointer("pointerout",i,a,r),this.triggerAncestorPointer("pointerleave",i,a,r),this.triggerAncestorPointer("pointerover",i,r,a),this.triggerAncestorPointer("pointerenter",i,r,a))}pointerUp(t){var e,i;const s=null===(e=this.intersection[this._primaryIdentifier])||void 0===e?void 0:e.object,n=this._lastPointerDownExt[t.pointerId];if(this.triggerAncestorPointer("pointerup",t,s,null==n?void 0:n._target),s===(null!==(i=null==n?void 0:n._target)&&void 0!==i?i:null)){const e=this._lastClick[t.pointerId];this._lastClick[t.pointerId]=this.triggerAncestorPointer("click",t,s),s===(null==e?void 0:e._target)&&t.timeStamp-e.timeStamp<=300&&(this.triggerAncestorPointer("dblclick",t,s),this._lastClick[t.pointerId]=void 0)}else this._lastClick[t.pointerId]=void 0}focus(t){var e;if(!t.isPrimary)return;const i=null===(e=this.intersection[t.pointerId])||void 0===e?void 0:e.object.activableObj;if(this.activeObj!==i){if(!this.disactiveWhenClickOut&&!i)return;const t=new F(i),e=this.activeObj;e&&(e.active=!1,e.triggerEventAncestor("blur",t),e.triggerEvent("focusout",t)),i&&(i.active=!0,t.relatedTarget=e,i.triggerEventAncestor("focus",t),i.triggerEvent("focusin",t)),this.activeObj=i}}}class W extends h.WebGLRenderer{constructor(t,e,i=!0,s={}){if(super(s),this.fullscreen=i,!s.canvas&&document.body.appendChild(this.domElement),V(this),this.addScene(...t),this.activeScene=t[0],this.activeScene)for(const t of this.activeScene.children)if(t.isCamera){this.activeCamera=t;break}window.addEventListener("resize",(()=>this.setSizeByCanvas())),this.setSizeByCanvas(),this.setPixelRatio(window.devicePixelRatio),this.eventsManager=new B(this),this.setAnimationLoop(((t,i)=>{this.eventsManager.update(this.activeScene,this.activeCamera),e(t,i)}))}setSizeByCanvas(){if(this.fullscreen)this.setSize(window.innerWidth,window.innerHeight);else{const{width:t,height:e}=this.domElement.getBoundingClientRect();this.setSize(t,e,!1)}}}class G{constructor(t,e,i=!0,s={}){this.scenes=t,this.animate=e,this.stats=new I.default,this.renderer=new W(t,this.animateBase.bind(this),i,s),document.body.appendChild(this.stats.dom)}animateBase(t,e){this.animate&&this.animate(t,e),this.renderer.render(this.renderer.activeScene,this.renderer.activeCamera),this.stats.update()}}class Y extends h.PerspectiveCamera{constructor(t,e,i){super(t,void 0,e,i),this.bindEvent("rendererresize",(t=>{this.aspect=t.width/t.height,this.updateProjectionMatrix()}))}}var Q=a.x$,K=a.H7,H=a.wO,Z=a.Ex,N=a.Qr,J=a.kX,$=a.SP,tt=a.td,et=a.w_,it=a.Ns,st=a.or,nt=a.gb,rt=a.cP,at=a.DJ,ht=a.Ke,ot=a.RR,ct=a.MZ,lt=a.cQ,_t=a.CP,dt=a.tL,ut=a.Xp,pt=a.cu,vt=a.uF,yt=a.EU,gt=a.Lz,mt=a.zh;export{Q as DistinctTargetArray,K as EventExt,H as EventsCache,Z as EventsDispatcher,N as EventsManager,J as FocusEventExt,$ as InstancedMesh,tt as InstancedMeshSingle,et as Line2,it as LoadingMaterial,st as Main,nt as MouseEventExt,rt as PerspectiveCamera,at as PointerEventExt,ht as PointerEventsQueue,ot as PointerIntersectionEvent,ct as RendererResizeEvent,lt as Utils,_t as WebGLRenderer,dt as WheelEventExt,ut as applyEulerPatch,pt as applyObject3DPatch,vt as applyQuaternionPatch,yt as applyVector3Patch,gt as applyWebGLRendererPatch,mt as object3DList};