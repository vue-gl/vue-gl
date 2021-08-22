<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-torus-knot-geometry />
            </template>
            <template #material>
              <vgl-mesh-physical-material
                :color="color"
                :clearcoat="clearcoat"
                :clearcoat-roughness="clearcoatRoughness"
                :reflectivity="reflectivity"
              />
            </template>
          </vgl-mesh>
          <vgl-ambient-light :intensity="0.5" />
          <vgl-directional-light
            :position-y="2"
            :position-z="1"
            :intensity="0.5"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Color</h3>
        <label>R<input
          v-model="r"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="g"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="b"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Physical</h3>
        <label>Clear coat<input
          v-model.number="clearcoat"
          type="range"
          max="1"
          step="0.01"
        ></label>
        <label>Clear coat roughness<input
          v-model.number="clearcoatRoughness"
          type="range"
          max="1"
          step="0.01"
        ></label>
        <label>Reflectivity<input
          v-model.number="reflectivity"
          type="range"
          max="1"
          step="0.01"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    r: '255',
    g: '255',
    b: '255',
    clearcoat: 0,
    clearcoatRoughness: 0,
    reflectivity: 1,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
