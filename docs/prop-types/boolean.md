---
parent: API / Prop types
nav_order: 1
---

# boolean
`true` or `false`. When prop value is static, presence of the prop name sets the
prop value to `true`. Default value is always `false`. When you bind the prop to
javascript expression, prop value should be a boolean not a truthy or falsy values.

Examples below set the `antialias` prop to `true`.

```html
<vgl-renderer antialias />
```

```html
<vgl-renderer :antialias="true" />
```
