---
parent: API / Prop types
nav_order: G
---

# color
Either a CSS style color string, a hexadecimal value or a `THREE.Color` instance.
The prop value is passed to `THREE.Color()` constructor.

Examples below set the light color to `0x4ef3a7`.

```html
<vgl-ambient-light color="#4ef3a7" />
```

```html
<vgl-ambient-light color="rgb(78, 243, 167)" />
```

```html
<vgl-ambient-light :color="'#4ef3a7'" />
```

```html
<vgl-ambient-light :color="0x4ef3a7" />
```

```html
<vgl-ambient-light :color="new THREE.Color(0x4ef3a7)" />
```

---

## List of prop types
{: .text-delta}

{% include toc/siblings.html %}
