---
parent: API / Prop types
nav_order: 14
---

# vector2Array
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
