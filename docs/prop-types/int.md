---
parent: API / Prop types
nav_order: 2
---

# int
Integer number. It can be a premitive or an object that is castable to string because
prop is parsed by `parseInt()` function.

Examples below set the `radial-segments` prop to `12`.

```html
<vgl-cylinder-geometry radial-segments="12" />
```

```html
<vgl-cylinder-geometry :radial-segments="12" />
```
