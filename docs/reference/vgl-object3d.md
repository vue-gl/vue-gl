---
layout: reference
---
{% include breadcrumbs/core.md %} VglObject3d
# VglObject3d `<vgl-object3d>`
This is the base mixin component for most object components in VueGL, corresponding [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D). Object3d components inside a object3d component are added as children via THREE.Object3D.prototype.add() method.

## Properties
* {% include prop.md name="name" type="string" %} - Optional name of the object.
* {% include prop.md name="position" type="vector3" %} - The object's local position as a 3D vector.
* {% include prop.md name="rotation" type="euler" %} - The object's local rotation as a euler angle.
* {% include prop.md name="scale" type="vector3" %} - The object's local scale as a 3D vector.
* {% include prop.md name="castShadow" type="bool" %} - Whether the object gets rendered into shadow map.
* {% include prop.md name="receiveShadow" type="bool" %} - Whether the material receives shadows.

## Slots
* `default` - VglObject3d components inside default slots are added as children.
