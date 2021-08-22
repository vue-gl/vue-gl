<template>
  <div>
    <vgl-renderer>
      <template #scene>
        <vgl-scene>
          <vgl-mesh :position-z="-z">
            <template #geometry>
              <vgl-sphere-geometry />
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
          :position-x="4"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <input
        v-model.number="z"
        min="-1"
        max="1"
        step="0.01"
        type="range"
      >
    </aside>
  </div>
</template>

<script>
import {
  VglRenderer, VglScene, VglMesh, VglSphereGeometry, VglMeshStandardMaterial, VglDirectionalLight,
  VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglScene,
    VglMesh,
    VglSphereGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglPerspectiveCamera,
  },
  data: () => ({ z: 0 }),
};
</script>
