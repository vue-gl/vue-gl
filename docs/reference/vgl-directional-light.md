---
layout: reference
---
{% include breadcrumbs/lights.md %} VglDirectionalLight
# VglDirectionalLight `<vgl-directional-light>`
A light that gets emitted in a specific direction, corresponding [THREE.DirectionalLight](https://threejs.org/docs/index.html#api/lights/DirectionalLight). This light will behave as though it is infinitely far away and the rays produced from it are all parallel. This light can cast shadows.
## Mixins
See the mixin components below for common properties.
* [VglLight](vgl-light)

## Properties
* {% include prop.md name="castShadow" type="bool" %} - If set to true light will cast dynamic shadows.
