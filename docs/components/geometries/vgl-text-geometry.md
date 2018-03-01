A component for generating text as a single geometry, corresponding [THREE.TextGeometry](https://threejs.org/docs/index.html#api/geometries/TextGeometry).

## Mixins
See the mixin components below for common properties.
* [VglExtrudeGeometry](vgl-extrude-geometry)

## Properties
* `text: string` - The text that needs to be shown.
* `font: string` - The path or URL to the facetype json file. This can also be a Data URI.
* `size: float` - Size of the text.
* `height: float` - Thickness to extrude text.
* `curveSegments: int` - Number of points on the curves.
* `bevelEnabled: bool` - Turn on bevel.
* `bevelThickness: float` - How deep into text bevel goes.
* `bevelSize: float` - How far from text outline is bevel.
* `bevelSegments: int` - Number of bevel segments.
* `bevelSegments: int` - Number of bevel segments.

## Example
{% include example.html url=page.url %}
