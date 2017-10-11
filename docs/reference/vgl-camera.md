---
layout: reference
---
{% include breadcrumbs/cameras.md %} VglCamera
# VglCamera `<vgl-camera>`
This is abstract base component for cameras, corresponding [THREE.Camera](https://threejs.org/docs/index.html#api/cameras/Camera). This component should always be mixined (inherited). You probably want a [VglPerspectiveCamera](vgl-perspective-camera) and [VglOrthographicCamera](vgl-orthographic-camera).
## Mixins
See the mixin components below for common properties.
* [VglObject3d](vgl-object3d)

## Properties
* {% include prop.md name="orbitTarget" type="vector3" %} - Position in 3D space for the camera to point towards. This property overwrite rotation property when both defined.
* {% include prop.md name="orbitPosition" type="spherical" %} - Spherical position around orbitTarget. This property overwrite position and rotation properties. If orbitTarget is not defined, automatically set to (0, 0, 0).
