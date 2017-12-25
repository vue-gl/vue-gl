---
layout: reference
---
{% include breadcrumbs/renderers.md %} VglRenderer
# VglRenderer `<vgl-renderer>`
This component creates a canvas that have WebGL context. Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).
## Mixins
See the mixin components below for common properties.
* [VglNamespace](vgl-namespace)

## Properties
* {% include prop.md name="precision" type="string" %} - Shader precision. Can be "highp", "mediump" or "lowp".
* {% include prop.md name="alpha" type="boolean" %} - Whether the canvas contains an alpha (transparency) buffer or not.
* {% include prop.md name="disablePremultipliedAlpha" type="boolean" %} - Whether the renderer will assume that colors have premultiplied alpha.
* {% include prop.md name="antialias" type="boolean" %} - Whether to perform antialiasing.
* {% include prop.md name="disableStencil" type="boolean" %} - Whether the drawing buffer has a stencil buffer of at least 8 bits.
* {% include prop.md name="preserveDrawingBuffer" type="boolean" %}`preserveDrawingBuffer` - Whether to preserve the buffers until manually cleared or overwritten.
* {% include prop.md name="disableDepth" type="boolean" %} - Whether the drawing buffer has a depth buffer of at least 16 bits.
* {% include prop.md name="logarithmicDepthBuffer" type="boolean" %} - Whether to use a logarithmic depth buffer.
* {% include prop.md name="camera" type="string" %} - Name of the using camera.
* {% include prop.md name="scene" type="string" %} - Name of the target scene.
* {% include prop.md name="shadowMapEnabled" type="bool" %} - If set, use shadow maps in the scene.

## Slots
* `default` - VglScene and VglCamera components inside default slots are added as referable components.
