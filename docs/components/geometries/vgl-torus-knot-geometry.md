A component for generating torus knot geometries, corresponding [THREE.TorusKnotGeometry](https://threejs.org/docs/index.html#api/geometries/TorusKnotGeometry).

## Mixins
See the mixin components below for common properties.
* [VglGeometry](vgl-geometry)

## Properties
* `radius: float` - Radius of the torus.
* `tube: float` - Diamiter of the tube.
* `radialSegments: int` - Number of segments of the tube's section.
* `tubularSegments: int` - Number of segments along to the tube length direction.
* `p: int` - This value determines how many times the geometry winds around its axis of rotational symmetry.
* `q: int` - This value determines, how many times the geometry winds around a circle in the interior of the torus.

## Example
{% include example.html url=page.url %}
