---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Lights](.#lights) &gt; VglSpotLight
# VglSpotLight `<vgl-spot-light>`
This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets. Corresponding [THREE.SpotLight](https://threejs.org/docs/index.html#api/lights/SpotLight). This light can cast shadows.
## Mixins
See the mixin components below for common properties.
* [VglLight](vgl-light)

## Properties
* `angle` - Maximum extent of the spotlight, in radians, from its direction. Should be no more than Math.PI/2.
* `distance` - The distance from the light where the intensity is 0. When set to 0, then the light never stops.
* `decay` - The amount the light dims along the distance of the light. For physically correct lighting, set this to 2.
* `penumbra` - Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1.
* `target` - The spotlight's pointing position.
