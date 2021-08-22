<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-lathe-geometry
                :points="[[1, -5], [2, -4], [3, -2], [3.5, 0], [4, 3], [3.5, 5]]"
                :segments="segments"
                :phi-length="phiLength"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material side="double" />
            </template>
          </vgl-mesh>
          <vgl-ambient-light />
          <vgl-directional-light
            :position-y="1"
            :position-z="2"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="15"
          :position-phi="1"
          :position-theta="-0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Segments<input
        v-model.number="segments"
        type="range"
      ></label>
      <label>Phi<input
        v-model.number="phiLength"
        type="range"
        max="6.29"
        step="0.01"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    segments: 16,
    phiLength: Math.PI * 2,
  }),
};
</script>
