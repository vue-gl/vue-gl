/* globals Vue */

import VglOrthographicCameraExample from './cameras/vgl-orthographic-camera.vue';
import VglPerspectiveCameraExample from './cameras/vgl-perspective-camera.vue';
import VglGeometryExample from './core/vgl-geometry.vue';
import VglBoxGeometryExample from './geometries/vgl-box-geometry.vue';
import VglCircleGeometryExample from './geometries/vgl-circle-geometry.vue';
import VglConeGeometryExample from './geometries/vgl-cone-geometry.vue';
import VglCylinderGeometryExample from './geometries/vgl-cylinder-geometry.vue';
import VglDodecahedronGeometryExample from './geometries/vgl-dodecahedron-geometry.vue';
import VglExtrudeGeometryExample from './geometries/vgl-extrude-geometry.vue';
import VglIcosahedronGeometryExample from './geometries/vgl-icosahedron-geometry.vue';
import VglLatheGeometryExample from './geometries/vgl-lathe-geometry.vue';
import VglOctahedronGeometryExample from './geometries/vgl-octahedron-geometry.vue';
import VglPlaneGeometryExample from './geometries/vgl-plane-geometry.vue';
import VglRingGeometryExample from './geometries/vgl-ring-geometry.vue';
import VglSphereGeometryExample from './geometries/vgl-sphere-geometry.vue';
import VglTetrahedronGeometryExample from './geometries/vgl-tetrahedron-geometry.vue';
import VglTextGeometryExample from './geometries/vgl-text-geometry.vue';
import VglTorusGeometryExample from './geometries/vgl-torus-geometry.vue';
import VglTorusKnotGeometryExample from './geometries/vgl-torus-knot-geometry.vue';
import VglArrowHelperExample from './helpers/vgl-arrow-helper.vue';
import VglAxesHelperExample from './helpers/vgl-axes-helper.vue';
import VglBoxHelperExample from './helpers/vgl-box-helper.vue';
import VglCameraHelperExample from './helpers/vgl-camera-helper.vue';
import VglDirectionalLightHelperExample from './helpers/vgl-directional-light-helper.vue';
import VglGridHelperExample from './helpers/vgl-grid-helper.vue';
import VglPolarGridHelperExample from './helpers/vgl-polar-grid-helper.vue';
import VglRectAreaLightHelperExample from './helpers/vgl-rect-area-light-helper.vue';
import VglSpotLightHelperExample from './helpers/vgl-spot-light-helper.vue';
import VglAmbientLightExample from './lights/vgl-ambient-light.vue';
import VglHemisphereLightExample from './lights/vgl-hemisphere-light.vue';
import VglRectAreaLightExample from './lights/vgl-rect-area-light.vue';
import VglLineBasicMaterialExample from './materials/vgl-line-basic-material.vue';
import VglLineDashedMaterialExample from './materials/vgl-line-dashed-material.vue';
import VglMeshBasicMaterialExample from './materials/vgl-mesh-basic-material.vue';
import VglMeshDepthMaterialExample from './materials/vgl-mesh-depth-material.vue';
import VglMeshLambertMaterialExample from './materials/vgl-mesh-lambert-material.vue';
import VglMeshNormalMaterialExample from './materials/vgl-mesh-normal-material.vue';
import VglMeshPhongMaterialExample from './materials/vgl-mesh-phong-material.vue';
import VglMeshPhysicalMaterialExample from './materials/vgl-mesh-physical-material.vue';
import VglMeshStandardMaterialExample from './materials/vgl-mesh-standard-material.vue';
import VglMeshToonMaterialExample from './materials/vgl-mesh-toon-material.vue';
import VglPointsMaterialExample from './materials/vgl-points-material.vue';
import VglShaderMaterialExample from './materials/vgl-shader-material.vue';
import VglShadowMaterialExample from './materials/vgl-shadow-material.vue';
import VglSpriteMaterialExample from './materials/vgl-sprite-material.vue';
import VglRendererExample from './renderers/vgl-renderer.vue';
import VglTextureExample from './textures/vgl-texture.vue';

const examples = {
  VglOrthographicCameraExample,
  VglPerspectiveCameraExample,
  VglGeometryExample,
  VglBoxGeometryExample,
  VglCircleGeometryExample,
  VglConeGeometryExample,
  VglCylinderGeometryExample,
  VglDodecahedronGeometryExample,
  VglExtrudeGeometryExample,
  VglIcosahedronGeometryExample,
  VglLatheGeometryExample,
  VglOctahedronGeometryExample,
  VglPlaneGeometryExample,
  VglRingGeometryExample,
  VglSphereGeometryExample,
  VglTetrahedronGeometryExample,
  VglTextGeometryExample,
  VglTorusGeometryExample,
  VglTorusKnotGeometryExample,
  VglArrowHelperExample,
  VglAxesHelperExample,
  VglBoxHelperExample,
  VglCameraHelperExample,
  VglDirectionalLightHelperExample,
  VglGridHelperExample,
  VglPolarGridHelperExample,
  VglRectAreaLightHelperExample,
  VglSpotLightHelperExample,
  VglAmbientLightExample,
  VglHemisphereLightExample,
  VglRectAreaLightExample,
  VglLineBasicMaterialExample,
  VglLineDashedMaterialExample,
  VglMeshBasicMaterialExample,
  VglMeshDepthMaterialExample,
  VglMeshLambertMaterialExample,
  VglMeshNormalMaterialExample,
  VglMeshPhongMaterialExample,
  VglMeshPhysicalMaterialExample,
  VglMeshStandardMaterialExample,
  VglMeshToonMaterialExample,
  VglPointsMaterialExample,
  VglShaderMaterialExample,
  VglShadowMaterialExample,
  VglSpriteMaterialExample,
  VglRendererExample,
  VglTextureExample,
};

Object.entries(examples).forEach(([name, component]) => Vue.component(name, component));
