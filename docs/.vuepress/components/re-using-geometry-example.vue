<template>
  <vgl-renderer>
    <vgl-defs>
      <template #tetrahedron>
        <vgl-tetrahedron-geometry />
      </template>
    </vgl-defs>
    <template #scene>
      <vgl-scene>
        <vgl-mesh
          v-for="z, i of [-2.5, 0, 2.5]"
          :key="z"
          :position-z="z"
        >
          <template #geometry>
            <vgl-use href="tetrahedron" />
          </template>
          <template #material>
            <vgl-mesh-standard-material :color="(0x000088 << i * 8) + 0x777777" />
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
        :position-y="1.5"
        :position-z="1.5"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglDefs, VglUse, VglScene, VglTetrahedronGeometry, VglMeshStandardMaterial,
  VglDirectionalLight, VglMesh, VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglDefs,
    VglUse,
    VglScene,
    VglTetrahedronGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglMesh,
    VglPerspectiveCamera,
  },
};
</script>
