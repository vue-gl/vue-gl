This component creates a canvas that have WebGL context. Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).

## Mixins
See the mixin components below for common properties.
* [VglNamespace](vgl-namespace)

## Properties
* `precision: string` - Shader precision. Can be "highp", "mediump" or "lowp".
* `alpha: boolean` - Whether the canvas contains an alpha (transparency) buffer or not.
* `disablePremultipliedAlpha: boolean` - Whether the renderer will assume that colors have premultiplied alpha.
* `antialias: boolean` - Whether to perform antialiasing.
* `disableStencil: boolean` - Whether the drawing buffer has a stencil buffer of at least 8 bits.
* `preserveDrawingBuffer: boolean` - Whether to preserve the buffers until manually cleared or overwritten.
* `disableDepth: boolean` - Whether the drawing buffer has a depth buffer of at least 16 bits.
* `logarithmicDepthBuffer: boolean` - Whether to use a logarithmic depth buffer.
* `camera: string` - Name of the using camera.
* `scene: string` - Name of the target scene.
* `shadowMapEnabled: bool` - If set, use shadow maps in the scene.

## Slots
* `default` - VglGeometries, VglMaterials, and VglTextures inside default slots are added as referable components.

## Example
{% include example.html url=page.url %}
