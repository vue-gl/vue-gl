Camera that uses perspective projection, corresponding [THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera). Camera frustum aspect ratio is automatically set to the renderer aspect ratio.

## Mixins
See the mixin components below for common properties.
* [VglCamera](vgl-camera)

## Properties
* `near: float` - Camera frustum near plane.
* `far: float` - Camera frustum far plane.
* `fov: float` - Camera frustum vertical field of view, from bottom to top of view, in degrees.
* `zoom: float` - Zoom factor of the camera.

## Example
{% include example.html url=page.url %}
