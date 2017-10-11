---
layout: reference
---
[Home](..) &gt; [References](.) &gt; Property types
# Property types
## Overview
Any properties of all components accept both strings and raw datas (primitives or objects). If the property is a string, it will be parsed as a suitable data type. Otherwise, the property data is used as a raw data type.

For example,
```html
<vgl-renderer>
    <vgl-scene>
        <vgl-axis-helper position="1 1.5 3"></vgl-axis-helper>
    </vgl-scene>
    <vgl-perspective-camera orbitPosition="3 1 1"></vgl-perspective-camera>
</vgl-renderer>
```
This will show an [axis helper](vgl-axis-helper) at the position (x=1, y=1.5, z=3), with a [perspective camera](vgl-perspective-camera) at (r=3, phi=1, theta=1). The type of the `position` property of [VglObject3d](vgl-object-3d) is vector3, so that it is parsed as a [THREE.Vector3](https://threejs.org/docs/index.html#api/math/Vector3) object. The type of the `orbitPosition` property is spherical, so that it is parsed as a [THREE.Spherical](https://threejs.org/docs/index.html#api/math/Spherical) object.

If you would like to pass raw datas (will skip parsing and may speed up your app), use data binding directive.
```html
<vgl-renderer>
    <vgl-scene>
        <vgl-axis-helper :position="new THREE.Vector3(1, 1.5, 3)"></vgl-axis-helper>
    </vgl-scene>
    <vgl-perspective-camera :orbitPosition="new THREE.Spherical(3, 1, 1)"></vgl-perspective-camera>
</vgl-renderer>
```
Following list shows all property types and parsing schemas.

## Types

| Type      | Raw             | description
|-
| boolean   | boolean         | Whether attribute exists or not.
| euler     | THREE.Euler     | Space-separated 3 numbers and 1 string are parsed as x, y, z, order.
| float     | number          | Parsed as a float number using `parseFloat()`.
| int       | number          | Parsed as an integer number using `parseInt()`.
| spherical | THREE.Spherical | Space-separated 3 numbers are parsed as radius, phi, theta.
| string    | string          | Always pass through.
| vector2   | THREE.Vector2   | Space-separated 2 numbers are parsed as x, y.
| vector3   | THREE.Vector3   | Space-separated 3 numbers are parsed as x, y, z.
