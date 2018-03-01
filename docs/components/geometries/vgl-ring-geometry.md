This is a simple shape component of Euclidean geometry, corresponding [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry). It is contructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle. It can also be used to create regular polygons, where the number of segments determines the number of sides.

## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* `innerRadius: float` - Inner radius of the ring.
* `outerRadius: float` - Outer radius of the ring.
* `thetaSegments: int` - Number of segments along to the tangential direction.
* `phiSegments: int` - Number of segments along to the radial direction.
* `thetaStart: float` - The starting angle.
* `thetaLength: float` - The central angle.

## Example
{% include example.html url=page.url %}
