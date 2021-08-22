<template>
  <vgl-renderer>
    <template #scene>
      <vgl-scene>
        <vgl-defs>
          <template #satellite>
            <vgl-mesh
              position="spherical"
              :position-radius="3"
              :position-phi="Math.PI/2"
              :position-theta="satellite"
            >
              <template #geometry>
                <vgl-icosahedron-geometry />
              </template>
              <template #material>
                <vgl-mesh-standard-material />
              </template>
            </vgl-mesh>
          </template>
        </vgl-defs>
        <vgl-mesh
          position="spherical"
          :position-radius="5"
          :position-phi="Math.PI/2"
          :position-theta="planet"
          :rotation-x="Math.PI/6"
        >
          <template #geometry>
            <vgl-octahedron-geometry />
          </template>
          <template #material>
            <vgl-mesh-standard-material />
          </template>
          <vgl-use href="satellite" />
        </vgl-mesh>
        <vgl-spot-light
          :position-y="10"
          :angle="0.3"
          :penumbra="0.5"
        >
          <template #target>
            <vgl-use href="satellite" />
          </template>
        </vgl-spot-light>
      </vgl-scene>
    </template>
    <template #camera>
      <vgl-perspective-camera
        :position-x="12"
        :position-y="8"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglDefs, VglUse, VglScene, VglMesh, VglIcosahedronGeometry, VglOctahedronGeometry,
  VglMeshStandardMaterial, VglSpotLight, VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglDefs,
    VglUse,
    VglScene,
    VglMesh,
    VglIcosahedronGeometry,
    VglOctahedronGeometry,
    VglMeshStandardMaterial,
    VglSpotLight,
    VglPerspectiveCamera,
  },
  data: () => ({ planet: 0.5, satellite: 0 }),
  mounted() {
    setInterval(() => {
      this.planet += 0.005;
      this.satellite += 0.02;
    }, 10);
  },
};
</script>
