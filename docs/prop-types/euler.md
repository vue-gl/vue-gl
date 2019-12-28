---
parent: API / Prop types
nav_order: 10
---

# euler
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
