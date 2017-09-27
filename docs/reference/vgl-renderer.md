---
layout: reference
---
[Home](..) &gt; [References](.) &gt; [Renderers](.#renderers) &gt; VglRenderer
# VglRenderer `<vgl-renderer>`
This component creates a canvas that have WebGL context. Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).
## Mixins
See the mixin components below for common properties.
* [VglAssets](vgl-assets)

## Properties
* `precision` - Shader precision. Can be "highp", "mediump" or "lowp".
* `alpha` - Whether the canvas contains an alpha (transparency) buffer or not.
* `premultipliedAlpha` - Whether the renderer will assume that colors have premultiplied alpha.
* `antialias` - Whether to perform antialiasing.
* `stencil` - Whether the drawing buffer has a stencil buffer of at least 8 bits.
* `preserveDrawingBuffer` - Whether to preserve the buffers until manually cleared or overwritten.
* `depth` - Whether the drawing buffer has a depth buffer of at least 16 bits.
* `logarithmicDepthBuffer` - Whether to use a logarithmic depth buffer.
* `camera` - Name of the using camera.
* `scene` - Name of the target scene.

## Slots
* `default` - VglScene and VglCamera components inside default slots are added as referable components.
