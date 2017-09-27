---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Core](.#core) &gt; VglObject3d
# VglObject3d `<vgl-object3d>`
This is the base mixin component for most object components in VueGL, corresponding [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D). Object3d components inside a object3d component are added as children via THREE.Object3D.prototype.add() method.
## Mixins
See the mixin components below for common properties.
* [VglAssets](vgl-assets)

## Properties
* `name` - Optional name of the object.
* `position` - The object's local position as a 3D vector.
* `rotation` - The object's local rotation as a euler angle.
* `scale` - The object's local scale as a 3D vector.

## Slots
* `default` - VglObject3d components inside default slots are added as children.
