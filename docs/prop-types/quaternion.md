---
parent: API / Prop types
nav_order: K
---

# quaternion
Either a string that represents space separated 4 coodinates or a `THREE.Quaternion`
instance.

Examples below set the `rotationQuaternion` prop to
`(x, y, z, w) = (0.91, 0.23, 0.34, 0.88)`.

```html
<vgl-group rotation-quaternion="0.91 0.23 0.34 0.88" />
```

```html
<vgl-group :rotation-quaternion="new THREE.Quaternion(0.91, 0.23, 0.34, 0.88)" />
```

---

## List of prop types
{: .text-delta}

{% include toc_siblings.html %}
