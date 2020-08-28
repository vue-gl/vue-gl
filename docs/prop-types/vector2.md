---
parent: API / Prop types
nav_order: H
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

---

## List of prop types
{: .text-delta}

{% include toc/siblings.html %}
