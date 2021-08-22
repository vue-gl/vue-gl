<template>
  <vgl-renderer>
    <template #scene>
      <vgl-scene>
        <vgl-mesh>
          <template #geometry>
            <vgl-box-geometry />
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
        :position-x="2"
        :position-y="1.5"
        :position-z="1"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglScene, VglMesh, VglBoxGeometry, VglMeshStandardMaterial, VglDirectionalLight,
  VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglScene,
    VglMesh,
    VglBoxGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglPerspectiveCamera,
  },
};
</script>
