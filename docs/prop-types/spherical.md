---
parent: API / Prop types
nav_order: 12
---

# spherical
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
