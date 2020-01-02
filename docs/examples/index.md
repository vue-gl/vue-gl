---
has_children: true
nav_order: D
---
# API / Example Components

## Trying example components

Each example components are built standalone under the [dist/js/examples](https://unpkg.com/browse/vue-gl/dist/examples/).
To use them, load scripts directly with `<script>` element after loading VueGL or
import with module bundlers.

When load scripts directly, the component will be injected under the `VueGL` namespace.
Resister `VueGL.<ComponentName>` to `Vue` before instantiating the components.
