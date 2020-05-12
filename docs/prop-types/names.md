---
parent: API / Prop types
nav_order: F
---

# names
Either space separated name strings or an array of name strings. Used for multiple
object specification in VueGL's namespace.

Examples below set materials named `mat1` and `mat2` to the mesh object.

```html
<vgl-mesh material="mat1 mat2" />
```

```html
<vgl-mesh :material="['mat1', 'mat2']" />
```

---

## List of prop types
{: .text-delta}

{% include toc/siblings.html %}
