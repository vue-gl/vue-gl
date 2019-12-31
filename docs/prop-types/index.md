---
nav_order: 2
has_children: true
---

# API / Prop types
VueGL components recognize a prop value as its prop type. Therefore you don't need
to bind raw objects or primitives even still you can do that.

Each prop type has a specific method to parse prop values. For example, an `int`
type prop is parsed by `parseInt()` function internally. So any values castable to
string and parsable as integer are acceptable.

Examples below set the `segments` prop to `16`.

* Passing a static string

  ```html
  <vgl-circle-geometry segments="16" />
  ```

* Passing a number

  ```html
  <vgl-circle-geometry :segments="16" />
  ```
