<template>
  <div>
    <p>Cube objects shown below use the same geometry and material.</p>
    <vgl-renderer>
      <vgl-defs>
        <template #geometry>
          <vgl-box-geometry />
        </template>
        <template #material>
          <vgl-mesh-standard-material :color="0xc5f0ba" />
        </template>
      </vgl-defs>
      <template #scene>
        <vgl-scene>
          <template v-for="x in 10">
            <template v-for="y in 10">
              <vgl-mesh
                v-for="z in 10"
                :key="x + y * 100 + z * 10000"
                :position-x="x * 2.5"
                :position-y="y * 2.5"
                :position-z="z * 2.5"
              >
                <template #geometry>
                  <vgl-use href="geometry" />
                </template>
                <template #material>
                  <vgl-use href="material" />
                </template>
              </vgl-mesh>
            </template>
          </template>
          <vgl-ambient-light :intensity="0.4" />
          <vgl-directional-light
            :intensity="0.7"
            :position-x="3"
            :position-y="2"
            :position-z="1"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          :position-x="35"
          :position-y="35"
          :position-z="50"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default { components };
</script>
