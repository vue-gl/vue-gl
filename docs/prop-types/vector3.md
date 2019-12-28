---
parent: API / Prop types
nav_order: 9
---

# vector3
Either a string that represents space separated 3 coodinates or a `THREE.Vector3`
instance.

Examples below set the `position` prop to `(x, y, z) = (1.23, 3.45, 4.56)`.

```html
<vgl-group position="1.23 3.45 4.56" />
```

```html
<vgl-group :position="new THREE.Vector3(1.23, 3.45, 4.56)" />
```
