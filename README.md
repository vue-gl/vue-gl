# VueGL

[Vue.js](https://vuejs.org/) components rendering 3D graphics reactively via [three.js](https://threejs.org/).
See the [documents](https://vue-gl.github.io/vue-gl/) for more details.

[![NPM](https://nodei.co/npm/vue-gl.png?compact=true)](https://nodei.co/npm/vue-gl/
)  
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl?ref=badge_small
)  
[![CircleCI](https://circleci.com/gh/vue-gl/vue-gl.svg?style=svg)](https://circleci.com/gh/vue-gl/vue-gl
)  
[![codecov](https://codecov.io/gh/vue-gl/vue-gl/branch/master/graph/badge.svg)](https://codecov.io/gh/vue-gl/vue-gl
)  
[![Financial Contributors on Open Collective](https://opencollective.com/vue-gl/all/badge.svg?label=financial+contributors)](https://opencollective.com/vue-gl)

## Usage

Define objects by tags.  
Save the following code as a html file, and open in any modern browser.

```html
<!-- dependencies -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>

<!-- load components -->
<script src="https://unpkg.com/vue-gl"></script>

<!-- define objects -->
<vgl-renderer id="vgl-canvas" style="width: 300px; height: 150px;">
  <vgl-scene>
    <vgl-sphere-geometry></vgl-sphere-geometry>
    <vgl-mesh-standard-material></vgl-mesh-standard-material>
    <vgl-mesh></vgl-mesh>
    <vgl-ambient-light></vgl-ambient-light>
    <vgl-directional-light position="2 0 1"></vgl-directional-light>
  </vgl-scene>
  <vgl-perspective-camera orbit-position="200 1 1"></vgl-perspective-camera>
</vgl-renderer>

<!-- register components and start vue -->
<script>
  Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
  });
  new Vue({
    el: "#vgl-canvas"
  });
</script>
```

When you open the html above in the browser, you'll see below.  
![VueGL example](https://www.evernote.com/shard/s42/sh/475e146b-d187-4abb-8793-09bf0561a295/c581691f3ea3f0f1603fdfb5467bf485/res/67489a93-c191-4da5-a353-a15d0120230c/2017-09-21-iloveimg-cropped.png?resizeSmall&width=832)

> Note that IE9 needs a polyfill for the TypedArray class, like the [js-polyfills/typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js).

## Components

- Cameras
  - [x] **[VglCamera](src/cameras/vgl-camera.js)** -
        Corresponding to [THREE.Camera](https://threejs.org/docs/index.html#api/cameras/Camera)
  - [x] **[VglOrthographicCamera](src/cameras/vgl-orthographic-camera.js)** -
        Corresponding to [THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/cameras/OrthographicCamera)
  - [x] **[VglPerspectiveCamera](src/cameras/vgl-perspective-camera.js)** -
        Corresponding to [THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera)
- Core
  - [x] **[VglGeometry](src/core/vgl-geometry.js)** -
        Corresponding to [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry)
  - [x] **[VglObject3d](src/core/vgl-object3d.js)** -
        Corresponding to [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D)
- Geometries
  - [x] **[VglBoxGeometry](src/geometries/vgl-box-geometry.js)** -
        Corresponding to [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry)
  - [x] **[VglCircleGeometry](src/geometries/vgl-circle-geometry.js)** -
        Corresponding to [THREE.CircleGeometry](https://threejs.org/docs/index.html#api/geometries/CircleGeometry)
  - [x] **[VglConeGeometry](src/geometries/vgl-cone-geometry.js)** -
        Corresponding to [THREE.ConeGeometry](https://threejs.org/docs/index.html#api/geometries/ConeGeometry)
  - [x] **[VglCylinderGeometry](src/geometries/vgl-cylinder-geometry.js)** -
        Corresponding to [THREE.CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry)
  - [x] **[VglDodecahedronGeometry](src/geometries/vgl-dodecahedron-geometry.js
        )** - Corresponding to [THREE.DodecahedronGeometry](https://threejs.org/docs/index.html#api/geometries/DodecahedronGeometry)
  - [ ] **[VglEdgesGeometry](src/geometries/vgl-edges-geometry.js)** -
        Corresponding to [THREE.EdgesGeometry](https://threejs.org/docs/index.html#api/geometries/EdgesGeometry)
  - [x] **[VglExtrudeGeometry](src/geometries/vgl-extrude-geometry.js)** -
        Corresponding to [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry)
  - [x] **[VglIcosahedronGeometry](src/geometries/vgl-icosahedron-geometry.js
        )** - Corresponding to [THREE.IcosahedronGeometry](https://threejs.org/docs/index.html#api/geometries/IcosahedronGeometry)
  - [x] **[VglLatheGeometry](src/geometries/vgl-lathe-geometry.js)** -
        Corresponding to [THREE.LatheGeometry](https://threejs.org/docs/index.html#api/geometries/LatheGeometry)
  - [x] **[VglOctahedronGeometry](src/geometries/vgl-octahedron-geometry.js)** -
        Corresponding to [THREE.OctahedronGeometry](https://threejs.org/docs/index.html#api/geometries/OctahedronGeometry)
  - [ ] **[VglParametricGeometry](src/geometries/vgl-parametric-geometry.js)** -
        Corresponding to [THREE.ParametricGeometry](https://threejs.org/docs/index.html#api/geometries/ParametricGeometry)
  - [x] **[VglPlaneGeometry](src/geometries/vgl-plane-geometry.js)** -
        Corresponding to [THREE.PlaneGeometry](https://threejs.org/docs/index.html#api/geometries/PlaneGeometry)
  - [ ] **[VglPolyhedronGeometry](src/geometries/vgl-polyhedron-geometry.js)** -
        Corresponding to [THREE.PolyhedronGeometry](https://threejs.org/docs/index.html#api/geometries/PolyhedronGeometry)
  - [x] **[VglRingGeometry](src/geometries/vgl-ring-geometry.js)** -
        Corresponding to [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry)
  - [ ] **[VglShapeGeometry](src/geometries/vgl-shape-geometry.js)** -
        Corresponding to [THREE.ShapeGeometry](https://threejs.org/docs/index.html#api/geometries/ShapeGeometry)
  - [x] **[VglSphereGeometry](src/geometries/vgl-sphere-geometry.js)** -
        Corresponding to [THREE.SphereGeometry](https://threejs.org/docs/index.html#api/geometries/SphereGeometry)
  - [x] **[VglTetrahedronGeometry](src/geometries/vgl-tetrahedron-geometry.js
        )** - Corresponding to [THREE.TetrahedronGeometry](https://threejs.org/docs/index.html#api/geometries/TetrahedronGeometry)
  - [x] **[VglTextGeometry](src/geometries/vgl-text-geometry.js)** -
        Corresponding to [THREE.TextGeometry](https://threejs.org/docs/index.html#api/geometries/TextGeometry)
  - [x] **[VglTorusGeometry](src/geometries/vgl-torus-geometry.js)** -
        Corresponding to [THREE.TorusGeometry](https://threejs.org/docs/index.html#api/geometries/TorusGeometry)
  - [x] **[VglTorusKnotGeometry](src/geometries/vgl-torus-knot-geometry.js)** -
        Corresponding to [THREE.TorusKnotGeometry](https://threejs.org/docs/index.html#api/geometries/TorusKnotGeometry)
  - [ ] **[VglTubeGeometry](src/geometries/vgl-tube-geometry.js)** -
        Corresponding to [THREE.TubeGeometry](https://threejs.org/docs/index.html#api/geometries/TubeGeometry)
  - [ ] **[VglWireframeGeometry](src/geometries/vgl-wireframe-geometry.js)** -
        Corresponding to [THREE.WireframeGeometry](https://threejs.org/docs/index.html#api/geometries/WireframeGeometry)
- Helpers
  - [x] **[VglArrowHelper](src/helpers/vgl-arrow-helper.js)** -
        Corresponding to [THREE.ArrowHelper](https://threejs.org/docs/index.html#api/helpers/ArrowHelper)
  - [x] **[VglAxesHelper](src/helpers/vgl-axes-helper.js)** -
        Corresponding to [THREE.AxesHelper](https://threejs.org/docs/index.html#api/helpers/AxesHelper)
  - [x] **[VglBoxHelper](src/helpers/vgl-box-helper.js)** -
        Corresponding to [THREE.BoxHelper](https://threejs.org/docs/index.html#api/helpers/BoxHelper)
  - [x] **[VglCameraHelper](src/helpers/vgl-camera-helper.js)** -
        Corresponding to [THREE.CameraHelper](https://threejs.org/docs/index.html#api/helpers/CameraHelper)
  - [x] **[VglDirectionalLightHelper](src/helpers/vgl-directional-light-helper.js
        )** - Corresponding to [THREE.DirectionalLightHelper](https://threejs.org/docs/index.html#api/helpers/DirectionalLightHelper)
  - [ ] **[VglFaceNormalsHelper](src/helpers/vgl-face-normals-helper.js)** -
        Corresponding to [THREE.FaceNormalsHelper](https://threejs.org/docs/index.html#api/helpers/FaceNormalsHelper)
  - [x] **[VglGridHelper](src/helpers/vgl-grid-helper.js)** -
        Corresponding to [THREE.GridHelper](https://threejs.org/docs/index.html#api/helpers/GridHelper)
  - [x] **[VglPolarGridHelper](src/helpers/vgl-polar-grid-helper.js)** -
        Corresponding to [THREE.PolarGridHelper](https://threejs.org/docs/index.html#api/helpers/PolarGridHelper)
  - [ ] **[VglHemisphereLightHelper](src/helpers/vgl-hemisphere-light-helper.js
        )** - Corresponding to [THREE.HemisphereLightHelper](https://threejs.org/docs/index.html#api/helpers/HemisphereLightHelper)
  - [ ] **[VglPointLightHelper](src/helpers/vgl-point-light-helper.js)** -
        Corresponding to [THREE.PointLightHelper](https://threejs.org/docs/index.html#api/helpers/PointLightHelper)
  - [x] **[VglRectAreaLightHelper](src/helpers/vgl-rect-area-light-helper.js)** -
        Corresponding to [THREE.RectAreaLightHelper](https://threejs.org/docs/index.html#api/helpers/RectAreaLightHelper)
  - [ ] **[VglSkeletonHelper](src/helpers/vgl-skeleton-helper.js)** -
        Corresponding to [THREE.SkeletonHelper](https://threejs.org/docs/index.html#api/helpers/SkeletonHelper)
  - [x] **[VglSpotLightHelper](src/helpers/vgl-spot-light-helper.js)** -
        Corresponding to [THREE.SpotLightHelper](https://threejs.org/docs/index.html#api/helpers/SpotLightHelper)
  - [ ] **[VglVertexNormalsHelper](src/helpers/vgl-vertex-normals-helper.js)** -
        Corresponding to [THREE.VertexNormalsHelper](https://threejs.org/docs/index.html#api/helpers/VertexNormalsHelper)
- Lights
  - [x] **[VglAmbientLight](src/lights/vgl-ambient-light.js)** -
        Corresponding to [THREE.AmbientLight](https://threejs.org/docs/index.html#api/lights/AmbientLight)
  - [x] **[VglDirectionalLight](src/lights/vgl-directional-light.js)** -
        Corresponding to [THREE.DirectionalLight](https://threejs.org/docs/index.html#api/lights/DirectionalLight)
  - [x] **[VglHemisphereLight](src/lights/vgl-hemisphere-light.js)** -
        Corresponding to [THREE.HemisphereLight](https://threejs.org/docs/index.html#api/lights/HemisphereLight)
  - [x] **[VglLight](src/lights/vgl-light.js)** -
        Corresponding to [THREE.Light](https://threejs.org/docs/index.html#api/lights/Light)
  - [x] **[VglPointLight](src/lights/vgl-point-light.js)** -
        Corresponding to [THREE.PointLight](https://threejs.org/docs/index.html#api/lights/PointLight)
  - [x] **[VglRectAreaLight](src/lights/vgl-rect-area-light.js)** -
        Corresponding to [THREE.RectAreaLight](https://threejs.org/docs/index.html#api/lights/RectAreaLight)
  - [x] **[VglSpotLight](src/lights/vgl-spot-light.js)** -
        Corresponding to [THREE.SpotLight](https://threejs.org/docs/index.html#api/lights/SpotLight)
- Materials
  - [x] **[VglLineBasicMaterial](src/materials/vgl-line-basic-material.js)** -
        Corresponding to [THREE.LineBasicMaterial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial)
  - [x] **[VglLineDashedMaterial](src/materials/vgl-line-dashed-material.js)** -
        Corresponding to [THREE.LineDashedMaterial](https://threejs.org/docs/index.html#api/materials/LineDashedMaterial)
  - [x] **[VglMaterial](src/materials/vgl-material.js)** -
        Corresponding to [THREE.Material](https://threejs.org/docs/index.html#api/materials/Material)
  - [x] **[VglMeshBasicMaterial](src/materials/vgl-mesh-basic-material.js)** -
        Corresponding to [THREE.MeshBasicMaterial](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial)
  - [x] **[VglMeshDepthMaterial](src/materials/vgl-mesh-depth-material.js)** -
        Corresponding to [THREE.MeshDepthMaterial](https://threejs.org/docs/index.html#api/materials/MeshDepthMaterial)
  - [x] **[VglMeshLambertMaterial](src/materials/vgl-mesh-lambert-material.js
        )** - Corresponding to [THREE.MeshLambertMaterial](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial)
  - [x] **[VglMeshNormalMaterial](src/materials/vgl-mesh-normal-material.js)** -
        Corresponding to [THREE.MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial)
  - [x] **[VglMeshPhongMaterial](src/materials/vgl-mesh-phong-material.js)** -
        Corresponding to [THREE.MeshPhongMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhongMaterial)
  - [x] **[VglMeshPhysicalMaterial](src/materials/vgl-mesh-physical-material.js
        )** - Corresponding to [THREE.MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial)
  - [x] **[VglMeshStandardMaterial](src/materials/vgl-mesh-standard-material.js
        )** - Corresponding to [THREE.MeshStandardMaterial](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial)
  - [x] **[VglMeshToonMaterial](src/materials/vgl-mesh-toon-material.js)** -
        Corresponding to [THREE.MeshToonMaterial](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial)
  - [x] **[VglPointsMaterial](src/materials/vgl-points-material.js)** -
        Corresponding to [THREE.PointsMaterial](https://threejs.org/docs/index.html#api/materials/PointsMaterial)
  - [ ] **[VglRawShaderMaterial](src/materials/vgl-raw-shader-material.js)** -
        Corresponding to [THREE.RawShaderMaterial](https://threejs.org/docs/index.html#api/materials/RawShaderMaterial)
  - [X] **[VglShaderMaterial](src/materials/vgl-shader-material.js)** -
        Corresponding to [THREE.ShaderMaterial](https://threejs.org/docs/index.html#api/materials/ShaderMaterial)
  - [x] **[VglShadowMaterial](src/materials/vgl-shadow-material.js)** -
        Corresponding to [THREE.ShadowMaterial](https://threejs.org/docs/index.html#api/materials/ShadowMaterial)
  - [x] **[VglSpriteMaterial](src/materials/vgl-sprite-material.js)** -
        Corresponding to [THREE.SpriteMaterial](https://threejs.org/docs/index.html#api/materials/SpriteMaterial)
- Objects
  - [ ] **[VglBone](src/objects/vgl-bone.js)** -
        Corresponding to [THREE.Bone](https://threejs.org/docs/index.html#api/objects/Bone)
  - [x] **[VglGroup](src/objects/vgl-group.js)** -
        Corresponding to [THREE.Group](https://threejs.org/docs/index.html#api/objects/Group)
  - [x] **[VglLine](src/objects/vgl-line.js)** -
        Corresponding to [THREE.Line](https://threejs.org/docs/index.html#api/objects/Line)
  - [x] **[VglLineLoop](src/objects/vgl-line-loop.js)** -
        Corresponding to [THREE.LineLoop](https://threejs.org/docs/index.html#api/objects/LineLoop)
  - [x] **[VglLineSegments](src/objects/vgl-line-segments.js)** -
        Corresponding to [THREE.LineSegments](https://threejs.org/docs/index.html#api/objects/LineSegments)
  - [ ] **[VglLod](src/objects/vgl-lod.js)** -
        Corresponding to [THREE.LOD](https://threejs.org/docs/index.html#api/objects/LOD)
  - [x] **[VglMesh](src/objects/vgl-mesh.js)** -
        Corresponding to [THREE.Mesh](https://threejs.org/docs/index.html#api/objects/Mesh)
  - [x] **[VglPoints](src/objects/vgl-points.js)** -
        Corresponding to [THREE.Points](https://threejs.org/docs/index.html#api/objects/Points)
  - [ ] **[VglSkeleton](src/objects/vgl-skeleton.js)** -
        Corresponding to [THREE.Skeleton](https://threejs.org/docs/index.html#api/objects/Skeleton)
  - [ ] **[VglSkinnedMesh](src/objects/vgl-skinned-mesh.js)** -
        Corresponding to [THREE.SkinnedMesh](https://threejs.org/docs/index.html#api/objects/SkinnedMesh)
  - [x] **[VglSprite](src/objects/vgl-sprite.js)** -
        Corresponding to [THREE.Sprite](https://threejs.org/docs/index.html#api/objects/Sprite)
- Renderers
  - [x] **[VglRenderer](src/renderers/vgl-renderer.js)** -
        Corresponding to [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/renderers/WebGLRenderer)
- Scenes
  - [x] **[VglScene](src/scenes/vgl-scene.js)** -
        Corresponding to [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene)
- Textures
  - [x] **[VglTexture](src/textures/vgl-texture.js)** -
        Load an image using [THREE.TextureLoader](https://threejs.org/docs/index.html#api/textures/TextureLoader)

## Contribution

Are you interested in enhance this product?
We're really glad and thanks a lot!  
See [Contributing guidelines](CONTRIBUTING.md) to get started.

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/vue-gl/vue-gl/graphs/contributors">
  <img src="https://opencollective.com/vue-gl/contributors.svg?width=890&button=false">
</a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/vue-gl/contribute)]

#### Individuals

<a href="https://opencollective.com/vue-gl"><img src="https://opencollective.com/vue-gl/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a
link to your website. [[Contribute](https://opencollective.com/vue-gl/contribute)]

<a href="https://opencollective.com/vue-gl/organization/0/website"><img src="https://opencollective.com/vue-gl/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/1/website"><img src="https://opencollective.com/vue-gl/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/2/website"><img src="https://opencollective.com/vue-gl/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/3/website"><img src="https://opencollective.com/vue-gl/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/4/website"><img src="https://opencollective.com/vue-gl/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/5/website"><img src="https://opencollective.com/vue-gl/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/6/website"><img src="https://opencollective.com/vue-gl/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/7/website"><img src="https://opencollective.com/vue-gl/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/8/website"><img src="https://opencollective.com/vue-gl/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/9/website"><img src="https://opencollective.com/vue-gl/organization/9/avatar.svg"></a>

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl?ref=badge_large)
