# VueGL
[Vue.js](https://vuejs.org/) components rendering 3D graphics reactively via [three.js](https://threejs.org/). See the [documents](https://vue-gl.github.io/vue-gl/) for more details.

[![NPM](https://nodei.co/npm/vue-gl.png?compact=true)](https://nodei.co/npm/vue-gl/) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl?ref=badge_shield)
 
[![CircleCI](https://circleci.com/gh/vue-gl/vue-gl.svg?style=svg)](https://circleci.com/gh/vue-gl/vue-gl)  
[![codecov](https://codecov.io/gh/vue-gl/vue-gl/branch/master/graph/badge.svg)](https://codecov.io/gh/vue-gl/vue-gl)  
[![Build Status](https://saucelabs.com/browser-matrix/vuegl.svg)](https://saucelabs.com/beta/builds/8a544a31f8174ff28d19b5ad3f70c18c)
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
        <vgl-directional-light></vgl-directional-light>
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
  - [x] **[VglCamera](src/vgl-camera.js)** - Corresponding to [THREE.Camera](https://threejs.org/docs/index.html#api/cameras/Camera)
  - [x] **[VglOrthographicCamera](src/vgl-orthographic-camera.js)** - Corresponding to [THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/cameras/OrthographicCamera)
  - [x] **[VglPerspectiveCamera](src/vgl-perspective-camera.js)** - Corresponding to [THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera)
- Core
  - [x] **[VglFont](src/vgl-font.js)** - Corresponding to [THREE.Font](https://threejs.org/docs/index.html#api/extras/core/Font)
  - [x] **[VglGeometry](src/vgl-geometry.js)** - Corresponding to [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry)
  - [x] **[VglObject3d](src/vgl-object3d.js)** - Corresponding to [THREE.Object3D](https://threejs.org/docs/index.html#api/core/Object3D)
- Geometries
  - [x] **[VglBoxGeometry](src/vgl-box-geometry.js)** - Corresponding to [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry)
  - [x] **[VglCircleGeometry](src/vgl-circle-geometry.js)** - Corresponding to [THREE.CircleGeometry](https://threejs.org/docs/index.html#api/geometries/CircleGeometry)
  - [x] **[VglConeGeometry](src/vgl-cone-geometry.js)** - Corresponding to [THREE.ConeGeometry](https://threejs.org/docs/index.html#api/geometries/ConeGeometry)
  - [x] **[VglCylinderGeometry](src/vgl-cylinder-geometry.js)** - Corresponding to [THREE.CylinderGeometry](https://threejs.org/docs/index.html#api/geometries/CylinderGeometry)
  - [x] **[VglDodecahedronGeometry](src/vgl-dodecahedron-geometry.js)** - Corresponding to [THREE.DodecahedronGeometry](https://threejs.org/docs/index.html#api/geometries/DodecahedronGeometry)
  - [ ] **[VglEdgesGeometry](src/vgl-edges-geometry.js)** - Corresponding to [THREE.EdgesGeometry](https://threejs.org/docs/index.html#api/geometries/EdgesGeometry)
  - [ ] **[VglExtrudeGeometry](src/vgl-extrude-geometry.js)** - Corresponding to [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry)
  - [x] **[VglIcosahedronGeometry](src/vgl-icosahedron-geometry.js)** - Corresponding to [THREE.IcosahedronGeometry](https://threejs.org/docs/index.html#api/geometries/IcosahedronGeometry)
  - [ ] **[VglLatheGeometry](src/vgl-lathe-geometry.js)** - Corresponding to [THREE.LatheGeometry](https://threejs.org/docs/index.html#api/geometries/LatheGeometry)
  - [x] **[VglOctahedronGeometry](src/vgl-octahedron-geometry.js)** - Corresponding to [THREE.OctahedronGeometry](https://threejs.org/docs/index.html#api/geometries/OctahedronGeometry)
  - [ ] **[VglParametricGeometry](src/vgl-parametric-geometry.js)** - Corresponding to [THREE.ParametricGeometry](https://threejs.org/docs/index.html#api/geometries/ParametricGeometry)
  - [x] **[VglPlaneGeometry](src/vgl-plane-geometry.js)** - Corresponding to [THREE.PlaneGeometry](https://threejs.org/docs/index.html#api/geometries/PlaneGeometry)
  - [ ] **[VglPolyhedronGeometry](src/vgl-polyhedron-geometry.js)** - Corresponding to [THREE.PolyhedronGeometry](https://threejs.org/docs/index.html#api/geometries/PolyhedronGeometry)
  - [x] **[VglRingGeometry](src/vgl-ring-geometry.js)** - Corresponding to [THREE.RingGeometry](https://threejs.org/docs/index.html#api/geometries/RingGeometry)
  - [ ] **[VglShapeGeometry](src/vgl-shape-geometry.js)** - Corresponding to [THREE.ShapeGeometry](https://threejs.org/docs/index.html#api/geometries/ShapeGeometry)
  - [x] **[VglSphereGeometry](src/vgl-sphere-geometry.js)** - Corresponding to [THREE.SphereGeometry](https://threejs.org/docs/index.html#api/geometries/SphereGeometry)
  - [x] **[VglTetrahedronGeometry](src/vgl-tetrahedron-geometry.js)** - Corresponding to [THREE.TetrahedronGeometry](https://threejs.org/docs/index.html#api/geometries/TetrahedronGeometry)
  - [x] **[VglTextGeometry](src/vgl-text-geometry.js)** - Corresponding to [THREE.TextGeometry](https://threejs.org/docs/index.html#api/geometries/TextGeometry)
  - [x] **[VglTorusGeometry](src/vgl-torus-geometry.js)** - Corresponding to [THREE.TorusGeometry](https://threejs.org/docs/index.html#api/geometries/TorusGeometry)
  - [x] **[VglTorusKnotGeometry](src/vgl-torus-knot-geometry.js)** - Corresponding to [THREE.TorusKnotGeometry](https://threejs.org/docs/index.html#api/geometries/TorusKnotGeometry)
  - [ ] **[VglTubeGeometry](src/vgl-tube-geometry.js)** - Corresponding to [THREE.TubeGeometry](https://threejs.org/docs/index.html#api/geometries/TubeGeometry)
  - [ ] **[VglWireframeGeometry](src/vgl-wireframe-geometry.js)** - Corresponding to [THREE.WireframeGeometry](https://threejs.org/docs/index.html#api/geometries/WireframeGeometry)
- Helpers
  - [x] **[VglArrowHelper](src/vgl-arrow-helper.js)** - Corresponding to [THREE.ArrowHelper](https://threejs.org/docs/index.html#api/helpers/ArrowHelper)
  - [x] **[VglAxesHelper](src/vgl-axes-helper.js)** - Corresponding to [THREE.AxesHelper](https://threejs.org/docs/index.html#api/helpers/AxesHelper)
  - [x] **[VglBoxHelper](src/vgl-box-helper.js)** - Corresponding to [THREE.BoxHelper](https://threejs.org/docs/index.html#api/helpers/BoxHelper)
  - [x] **[VglCameraHelper](src/vgl-camera-helper.js)** - Corresponding to [THREE.CameraHelper](https://threejs.org/docs/index.html#api/helpers/CameraHelper)
  - [x] **[VglDirectionalLightHelper](src/vgl-directional-light-helper.js)** - Corresponding to [THREE.DirectionalLightHelper](https://threejs.org/docs/index.html#api/helpers/DirectionalLightHelper)
  - [ ] **[VglFaceNormalsHelper](src/vgl-face-normals-helper.js)** - Corresponding to [THREE.FaceNormalsHelper](https://threejs.org/docs/index.html#api/helpers/FaceNormalsHelper)
  - [x] **[VglGridHelper](src/vgl-grid-helper.js)** - Corresponding to [THREE.GridHelper](https://threejs.org/docs/index.html#api/helpers/GridHelper)
  - [ ] **[VglPolarGridHelper](src/vgl-polar-grid-helper.js)** - Corresponding to [THREE.PolarGridHelper](https://threejs.org/docs/index.html#api/helpers/PolarGridHelper)
  - [ ] **[VglHemisphereLightHelper](src/vgl-hemisphere-light-helper.js)** - Corresponding to [THREE.HemisphereLightHelper](https://threejs.org/docs/index.html#api/helpers/HemisphereLightHelper)
  - [ ] **[VglPointLightHelper](src/vgl-point-light-helper.js)** - Corresponding to [THREE.PointLightHelper](https://threejs.org/docs/index.html#api/helpers/PointLightHelper)
  - [ ] **[VglRectAreaLightHelper](src/vgl-rect-area-light-helper.js)** - Corresponding to [THREE.RectAreaLightHelper](https://threejs.org/docs/index.html#api/helpers/RectAreaLightHelper)
  - [ ] **[VglSkeletonHelper](src/vgl-skeleton-helper.js)** - Corresponding to [THREE.SkeletonHelper](https://threejs.org/docs/index.html#api/helpers/SkeletonHelper)
  - [ ] **[VglSpotLightHelper](src/vgl-spot-light-helper.js)** - Corresponding to [THREE.SpotLightHelper](https://threejs.org/docs/index.html#api/helpers/SpotLightHelper)
  - [ ] **[VglVertexNormalsHelper](src/vgl-vertex-normals-helper.js)** - Corresponding to [THREE.VertexNormalsHelper](https://threejs.org/docs/index.html#api/helpers/VertexNormalsHelper)
- Lights
  - [x] **[VglAmbientLight](src/vgl-ambient-light.js)** - Corresponding to [THREE.AmbientLight](https://threejs.org/docs/index.html#api/lights/AmbientLight)
  - [x] **[VglDirectionalLight](src/vgl-directional-light.js)** - Corresponding to [THREE.DirectionalLight](https://threejs.org/docs/index.html#api/lights/DirectionalLight)
  - [ ] **[VglHemisphereLight](src/vgl-hemisphere-light.js)** - Corresponding to [THREE.HemisphereLight](https://threejs.org/docs/index.html#api/lights/HemisphereLight)
  - [x] **[VglLight](src/vgl-light.js)** - Corresponding to [THREE.Light](https://threejs.org/docs/index.html#api/lights/Light)
  - [x] **[VglPointLight](src/vgl-point-light.js)** - Corresponding to [THREE.PointLight](https://threejs.org/docs/index.html#api/lights/PointLight)
  - [ ] **[VglRectAreaLight](src/vgl-rect-area-light.js)** - Corresponding to [THREE.RectAreaLight](https://threejs.org/docs/index.html#api/lights/RectAreaLight)
  - [x] **[VglSpotLight](src/vgl-spot-light.js)** - Corresponding to [THREE.SpotLight](https://threejs.org/docs/index.html#api/lights/SpotLight)
- Materials
  - [x] **[VglLineBasicMaterial](src/vgl-line-basic-material.js)** - Corresponding to [THREE.LineBasicMaterial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial)
  - [ ] **[VglLineDashedMaterial](src/vgl-line-dashed-material.js)** - Corresponding to [THREE.LineDashedMaterial](https://threejs.org/docs/index.html#api/materials/LineDashedMaterial)
  - [x] **[VglMaterial](src/vgl-material.js)** - Corresponding to [THREE.Material](https://threejs.org/docs/index.html#api/materials/Material)
  - [ ] **[VglMeshBasicMaterial](src/vgl-mesh-basic-material.js)** - Corresponding to [THREE.MeshBasicMaterial](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial)
  - [ ] **[VglMeshDepthMaterial](src/vgl-mesh-depth-material.js)** - Corresponding to [THREE.MeshDepthMaterial](https://threejs.org/docs/index.html#api/materials/MeshDepthMaterial)
  - [ ] **[VglMeshLambertMaterial](src/vgl-mesh-lambert-material.js)** - Corresponding to [THREE.MeshLambertMaterial](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial)
  - [ ] **[VglMeshNormalMaterial](src/vgl-mesh-normal-material.js)** - Corresponding to [THREE.MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial)
  - [ ] **[VglMeshPhongMaterial](src/vgl-mesh-phong-material.js)** - Corresponding to [THREE.MeshPhongMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhongMaterial)
  - [ ] **[VglMeshPhysicalMaterial](src/vgl-mesh-physical-material.js)** - Corresponding to [THREE.MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial)
  - [x] **[VglMeshStandardMaterial](src/vgl-mesh-standard-material.js)** - Corresponding to [THREE.MeshStandardMaterial](https://threejs.org/docs/index.html#api/materials/MeshStandardMaterial)
  - [ ] **[VglMeshToonMaterial](src/vgl-mesh-toon-material.js)** - Corresponding to [THREE.MeshToonMaterial](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial)
  - [x] **[VglPointsMaterial](src/vgl-points-material.js)** - Corresponding to [THREE.PointsMaterial](https://threejs.org/docs/index.html#api/materials/PointsMaterial)
  - [ ] **[VglRawShaderMaterial](src/vgl-raw-shader-material.js)** - Corresponding to [THREE.RawShaderMaterial](https://threejs.org/docs/index.html#api/materials/RawShaderMaterial)
  - [ ] **[VglShaderMaterial](src/vgl-shader-material.js)** - Corresponding to [THREE.ShaderMaterial](https://threejs.org/docs/index.html#api/materials/ShaderMaterial)
  - [x] **[VglShadowMaterial](src/vgl-shadow-material.js)** - Corresponding to [THREE.ShadowMaterial](https://threejs.org/docs/index.html#api/materials/ShadowMaterial)
  - [x] **[VglSpriteMaterial](src/vgl-sprite-material.js)** - Corresponding to [THREE.SpriteMaterial](https://threejs.org/docs/index.html#api/materials/SpriteMaterial)
- Objects
  - [ ] **[VglBone](src/vgl-bone.js)** - Corresponding to [THREE.Bone](https://threejs.org/docs/index.html#api/objects/Bone)
  - [x] **[VglGroup](src/vgl-group.js)** - Corresponding to [THREE.Group](https://threejs.org/docs/index.html#api/objects/Group)
  - [x] **[VglLensFlare](src/vgl-lens-flare.js)** - Corresponding to [THREE.LensFlare](https://threejs.org/docs/index.html#api/objects/LensFlare)
  - [x] **[VglLine](src/vgl-line.js)** - Corresponding to [THREE.Line](https://threejs.org/docs/index.html#api/objects/Line)
  - [x] **[VglLineLoop](src/vgl-line-loop.js)** - Corresponding to [THREE.LineLoop](https://threejs.org/docs/index.html#api/objects/LineLoop)
  - [x] **[VglLineSegments](src/vgl-line-segments.js)** - Corresponding to [THREE.LineSegments](https://threejs.org/docs/index.html#api/objects/LineSegments)
  - [ ] **[VglLod](src/vgl-lod.js)** - Corresponding to [THREE.LOD](https://threejs.org/docs/index.html#api/objects/LOD)
  - [x] **[VglMesh](src/vgl-mesh.js)** - Corresponding to [THREE.Mesh](https://threejs.org/docs/index.html#api/objects/Mesh)
  - [x] **[VglPoints](src/vgl-points.js)** - Corresponding to [THREE.Points](https://threejs.org/docs/index.html#api/objects/Points)
  - [ ] **[VglSkeleton](src/vgl-skeleton.js)** - Corresponding to [THREE.Skeleton](https://threejs.org/docs/index.html#api/objects/Skeleton)
  - [ ] **[VglSkinnedMesh](src/vgl-skinned-mesh.js)** - Corresponding to [THREE.SkinnedMesh](https://threejs.org/docs/index.html#api/objects/SkinnedMesh)
  - [x] **[VglSprite](src/vgl-sprite.js)** - Corresponding to [THREE.Sprite](https://threejs.org/docs/index.html#api/objects/Sprite)
- Renderers
  - [x] **[VglRenderer](src/vgl-renderer.js)** - Corresponding to [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/renderers/WebGLRenderer)
- Scenes
  - [x] **[VglScene](src/vgl-scene.js)** - Corresponding to [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene)
- Textures
  - [x] **[VglLensFlareTexture](src/vgl-lens-flare-texture.js)** - Register a texture and corresponding properties to the VglLensFlare component.
  - [x] **[VglTexture](src/vgl-texture.js)** - Load an image using [THREE.TextureLoader](https://threejs.org/docs/index.html#api/textures/TextureLoader)
## Contribution
Are you interested in enhance this product ?  
We're really glad and thanks a lot !  
To start development, see [CONTRIBUTING.md](CONTRIBUTING.md).


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl?ref=badge_large)