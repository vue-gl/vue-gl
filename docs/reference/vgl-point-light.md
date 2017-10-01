---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Lights](.#lights) &gt; VglPointLight
# VglPointLight `<vgl-point-light>`
A light that gets emitted from a single point in all directions, corresponding [THREE.PointLight](https://threejs.org/docs/index.html#api/lights/PointLight). A common use case for this is to replicate the light emitted from a bare lightbulb. This light can cast shadows.
## Mixins
See the mixin components below for common properties.
* [VglLight](vgl-light)

## Properties
* `distance` - The distance from the light where the intensity is 0. When set to 0, then the light never stops.
* `decay` - The amount the light dims along the distance of the light. For physically correct lighting, set this to 2.