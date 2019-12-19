---
nav_order: 2
---
# Prop types
{: .no_toc}

---

## Table of contents
{: .text-delta .no_toc}

* toc
{:toc}

## Overview
VueGL components recognize a prop value as its prop type. Therefore you don't need
to bind raw objects or primitives even still you can do that.

Each prop type has a specific method to parse prop values. For example, an `int`
type prop is parsed by `parseInt()` function internally. So any values castable to
string and parsable as integer are acceptable.

Examples below set the `segments` prop to `16`.

* Passing a static string

  ```html
  <vgl-circle-geometry segments="16" />
  ```

* Passing a number

  ```html
  <vgl-circle-geometry :segments="16" />
  ```

## List of prop types

### ***boolean***
`true` or `false`. When prop value is static, presence of the prop name sets the
prop value to `true`. Default value is always `false`. When you bind the prop to
javascript expression, prop value should be a boolean not a truthy or falsy values.

Examples below set the `antialias` prop to `true`.

```html
<vgl-renderer antialias />
```

```html
<vgl-renderer :antialias="true" />
```

### ***int***
Integer number. It can be a premitive or an object that is castable to string because
prop is parsed by `parseInt()` function.

Examples below set the `radial-segments` prop to `12`.

```html
<vgl-cylinder-geometry radial-segments="12" />
```

```html
<vgl-cylinder-geometry :radial-segments="12" />
```

### ***float***
Float number. It can be a premitive or an object that is castable to string because
prop is parsed by `parseFloat()` function.

Examples below set the `fov` prop to `63.35`.

```html
<vgl-perspective-camera fov="63.35" />
```

```html
<vgl-perspective-camera :fov="63.35" />
```

### ***string***
Any string.

### ***name***
Identifier string without space charactor. Used for object specification in VueGL's
namespace.

### ***names***
Either space separated name strings or an array of name strings. Used for multiple
object specification in VueGL's namespace.

Examples below set materials named `mat1` and `mat2` to the mesh object.

```html
<vgl-mesh material="mat1 mat2" />
```

```html
<vgl-mesh :material="['mat1', 'mat2']" />
```

### ***color***
Either a CSS style color string, a hexadecimal value or a `THREE.Color` instance.
The prop value is passed to `THREE.Color()` constructor.

Examples below set the light color to `0x4ef3a7`.

```html
<vgl-ambient-light color="#4ef3a7" />
```

```html
<vgl-ambient-light color="rgb(78, 243, 167)" />
```

```html
<vgl-ambient-light :color="'#4ef3a7'" />
```

```html
<vgl-ambient-light :color="0x4ef3a7" />
```

```html
<vgl-ambient-light :color="new THREE.Color(0x4ef3a7)" />
```

### ***vector2***
Either a string that represents space separated 2 coodinates or a `THREE.Vector2`
instance.

Examples below set the `offset` prop to `(x, y) = (12.34, 56.78)`.

```html
<vgl-texture offset="12.34 56.78" />
```

```html
<vgl-texture :offset="new THREE.Vector2(12.34, 56.78)">
```

### ***vector3***
Either a string that represents space separated 3 coodinates or a `THREE.Vector3`
instance.

Examples below set the `position` prop to `(x, y, z) = (1.23, 3.45, 4.56)`.

```html
<vgl-group position="1.23 3.45 4.56" />
```

```html
<vgl-group :position="new THREE.Vector3(1.23, 3.45, 4.56)" />
```

### ***euler***
Either a string that represents space separated 3 coodinates and order string or
a `THREE.Euler` instance.

Examples below set the `rotation` prop to
`(x, y, z, order) = (0.12, 0.23, 0.34, 'ZYX')`.

```html
<vgl-group rotation="0.12 0.23 0.34 ZYX" />
```

```html
<vgl-group :rotation="new THREE.Euler(0.12, 0.23, 0.34, 'ZYX')" />
```

### ***quaternion***
Either a string that represents space separated 4 coodinates or a `THREE.Quaternion`
instance.

Examples below set the `rotationQuaternion` prop to
`(x, y, z, w) = (0.91, 0.23, 0.34, 0.88)`.

```html
<vgl-group rotation-quaternion="0.91 0.23 0.34 0.88" />
```

```html
<vgl-group :rotation-quaternion="new THREE.Quaternion(0.91, 0.23, 0.34, 0.88)" />
```

### ***spherical***
Either a string that represents space separated 3 coodinates or a `THREE.Spherical`
instance.

Examples below set the `orbit-position` prop to
`(radius, phi, theta) = (123.4, 0.23, 0.34)`.

```html
<vgl-perspective-camera orbit-position="123.4 0.23 0.34" />
```

```html
<vgl-perspective-camera :orbit-position="new THREE.Spherical(123.4, 0.23, 0.34)" />
```

### ***floatArray***
Either a string that contains comma separated number strings or an array of values
those are castable to float numbers. Each value is parsed by `parseFloat()` function.

Examples below set the `position-attribute` prop to `[1.1, 1.2, 1.3, 3.1, 3.2, 3.3]`.

```html
<vgl-geometry position-attribute="1.1, 1.2, 1.3, 3.1, 3.2, 3.3" />
```

```html
<vgl-geometry :position-attribute="['1.1', '1.2', '1.3', '3.1', '3.2', '3.3']" />
```

```html
<vgl-geometry :position-attribute="[1.1, 1.2, 1.3, 3.1, 3.2, 3.3]" />
```

### ***vector2Array***
Either a string or an array. The string is splited by comma delimeters first, and
each part of the string is parsed as space separated 2 coodinates of 2D vector. If
the value is an array, each item of the array can be either a string or a `THREE.Vector2`
instance.

Examples below set the `points` prop to
`[new THREE.Vector2(-1.2, 0), new THREE.Vector2(1, 2.5)]`.

```html
<vgl-lathe-geometry points="-1.2 0, 1 2.5" />
```

```html
<vgl-lathe-geometry :points="['-1.2 0', '1 2.5']" />
```

```html
<vgl-lathe-geometry :points="[new THREE.Vector2(-1.2, 0), new THREE.Vector2(1, 2.5)]" />
```

### ***fog***
Space-separated paramaters as color, near and far, corresponding [THREE.Fog](https://threejs.org/docs/#api/en/scenes/Fog)
