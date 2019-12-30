---
parent: API / Prop types
nav_order: 3
---

# float
Float number. It can be a premitive or an object that is castable to string because
prop is parsed by `parseFloat()` function.

Examples below set the `fov` prop to `63.35`.

```html
<vgl-perspective-camera fov="63.35" />
```

```html
<vgl-perspective-camera :fov="63.35" />
```
