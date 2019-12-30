---
parent: API / Prop types
nav_order: 8
---

# vector2
Either a string that represents space separated 2 coodinates or a `THREE.Vector2`
instance.

Examples below set the `offset` prop to `(x, y) = (12.34, 56.78)`.

```html
<vgl-texture offset="12.34 56.78" />
```

```html
<vgl-texture :offset="new THREE.Vector2(12.34, 56.78)">
```
