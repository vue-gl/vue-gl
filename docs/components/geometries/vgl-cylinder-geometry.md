This is a component for generating cylinder geometries, corresponding [THREE.CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry).

## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* `radiusTop: float` - Radius of the cylinder at the top.
* `radiusBottom: float` - Radius of the cylinder at the bottom.
* `height: float` - Height of the cylinder.
* `radialSegments: int` - Number of segmented faces around the circumference of the cylinder.
* `heightSegments: int` - Number of rows of faces along the height of the cylinder.
* `openEnded: boolean` - A Boolean indicating whether the ends of the cylinder are open or capped.
* `thetaStart: float` - Start angle for first segment.
* `thetaLength: float` - The central angle of the circular sector.

## Example
{% include example.html url=page.url %}
