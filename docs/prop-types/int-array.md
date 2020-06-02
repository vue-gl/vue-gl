---
parent: API / Prop types
nav_order: LZ
---

# intArray
Either a string that contains comma separated number strings or an array of values
those are castable to integer numbers. Each value is parsed by `parseInt()` function.

Examples below set the `indices` prop to `[0, 1, 2, 0, 2, 3, 1, 0, 3, 1, 3, 2]`.

```html
<vgl-polyhedron-geometry indices="0, 1, 2, 0, 2, 3, 1, 0, 3, 1, 3, 2" />
```

```html
<vgl-polyhedron-geometry :indices="['0', '1', '2', '0', '2', '3', '1', '0', '3', '1', '3', '2']" />
```

```html
<vgl-polyhedron-geometry :indices="[0, 1, 2, 0, 2, 3, 1, 0, 3, 1, 3, 2]" />
```

---

## List of prop types
{: .text-delta}

{% include toc/siblings.html %}
