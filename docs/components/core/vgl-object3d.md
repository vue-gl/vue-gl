This is the base mixin component for most object components in VueGL, corresponding [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D). Object3d components inside a object3d component are added as children via THREE.Object3D.prototype.add() method.

## Properties
* `name: string` - Optional name of the object.
* `position: vector3` - The object's local position as a 3D vector.
* `rotation: euler` - The object's local rotation as a euler angle.
* `scale: vector3` - The object's local scale as a 3D vector.
* `castShadow: bool` - Whether the object gets rendered into shadow map.
* `receiveShadow: bool` - Whether the material receives shadows.

## Slots
* `default` - VglObject3d components inside default slots are added as children.
