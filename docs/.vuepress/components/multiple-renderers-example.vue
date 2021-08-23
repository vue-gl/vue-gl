<template>
  <div>
    <vgl-defs>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-torus-knot-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-directional-light
            :position-x="2"
            :position-y="1.5"
            :position-z="1"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          :position-x="5"
          :position-y="4"
          :position-z="3"
          rotation="lookAt"
        />
      </template>
    </vgl-defs>
    <vgl-renderer class="portrait">
      <template #scene>
        <vgl-use href="scene" />
      </template>
      <template #camera>
        <vgl-use href="camera" />
      </template>
    </vgl-renderer>
    <vgl-renderer class="landscape">
      <template #scene>
        <vgl-use href="scene" />
      </template>
      <template #camera>
        <vgl-use href="camera" />
      </template>
    </vgl-renderer>
  </div>
</template>

<script>
import {
  VglDefs, VglUse, VglRenderer, VglScene, VglPerspectiveCamera, VglMesh, VglTorusKnotGeometry,
  VglMeshStandardMaterial, VglDirectionalLight,
} from 'vue-gl';

export default {
  components: {
    VglDefs,
    VglUse,
    VglRenderer,
    VglScene,
    VglPerspectiveCamera,
    VglMesh,
    VglTorusKnotGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
  },
};
</script>

<style scoped>
.portrait {
  width: 150px;
  height: 300px;
}
</style>
