---
parent: API / Prop types
nav_order: 13
---

# floatArray
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
