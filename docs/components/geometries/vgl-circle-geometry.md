This is a simple shape component of Euclidean geometry, corresponding [THREE.CircleGeometry](https://threejs.org/docs/index.html#api/geometries/CircleGeometry). It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle. It can also be used to create regular polygons, where the number of segments determines the number of sides.

## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* `radius: float` - Radius of the circle.
* `segments: int` - Number of segments (triangles).
* `thetaStart: float` - Start angle for first segment.
* `thetaLength: float` - The central angle of the circular sector.

## Example
{% include example.html url=page.url %}
