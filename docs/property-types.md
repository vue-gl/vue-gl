---
toc:
  - Overview
  - Types
---
# Property types

## Overview

Any properties of all components accept both strings and raw datas (primitives
or objects). If the property is a string, it will be parsed as a suitable data
type. Otherwise, the property data is used as a raw data type.

For example,

```html
<vgl-renderer>
  <vgl-scene>
    <vgl-axis-helper position="1 1.5 3"></vgl-axis-helper>
  </vgl-scene>
  <vgl-perspective-camera orbitPosition="3 1 1"></vgl-perspective-camera>
</vgl-renderer>
```

This will show an [axis helper](vgl-axis-helper) at the position (x=1, y=1.5,
z=3), with a [perspective camera](vgl-perspective-camera) at (r=3, phi=1,
theta=1). The type of the `position` property of [VglObject3d](vgl-object-3d)
is vector3, so that it is parsed as a
[THREE.Vector3](https://threejs.org/docs/index.html#api/math/Vector3) object.
The type of the `orbitPosition` property is spherical, so that it is parsed as
a [THREE.Spherical](https://threejs.org/docs/index.html#api/math/Spherical) object.

If you would like to pass raw datas (will skip parsing and may speed up your
app), use data binding directive.

```html
<vgl-renderer>
  <vgl-scene>
    <vgl-axis-helper :position="new THREE.Vector3(1, 1.5, 3)"></vgl-axis-helper>
  </vgl-scene>
  <vgl-perspective-camera :orbitPosition="new THREE.Spherical(3, 1, 1)"></vgl-perspective-camera>
</vgl-renderer>
```

## Types

Following list shows all property types and parsing schemas.

- ***boolean***  
  Whether attribute exists or not.
- ***euler***  
  Space-separated 3 numbers and 1 string are parsed as x, y, z, order, corresponding
  [THREE.Euler](https://threejs.org/docs/index.html#api/math/Euler).
- ***float***  
  Parsed as a float number using `parseFloat()`.
- ***int***  
  Parsed as an integer number using `parseInt()`.
- ***spherical***  
  Space-separated 3 numbers are parsed as radius, phi, theta, corresponding [THREE.Spherical](https://threejs.org/docs/index.html#api/math/Spherical).
- ***string***  
  Always pass through.
- ***vector2***  
  Space-separated 2 numbers are parsed as x, y, corresponding [THREE.Vector2](https://threejs.org/docs/index.html#api/math/Vector2).
- ***vector3***  
  Space-separated 3 numbers are parsed as x, y, z, corresponding [THREE.Vector3](https://threejs.org/docs/index.html#api/math/Vector3).
- ***floatArray***
  Parsed as an array of float numbers.
- ***vector2Array***
  Parsed as an array of vector2s.
- ***fog***
  Space-separated paramaters as color, near and far, corresponding [THREE.Fog](https://threejs.org/docs/#api/en/scenes/Fog)
- ***names***
  A string or an array of string.
