<template>
  <div>
    <vgl-renderer
      antialias
      shadow-map-enabled
    >
      <template #scene>
        <vgl-scene>
          <vgl-mesh
            :position-y="-1.5"
            receive-shadow
          >
            <template #geometry>
              <vgl-box-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-mesh
            cast-shadow
            receive-shadow
          >
            <template #geometry>
              <vgl-sphere-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-hemisphere-light
            :color="color"
            :ground-color="groundColor"
            :intensity="intensity"
          />
          <vgl-directional-light
            :position-y="1"
            :position-z="1"
            cast-shadow
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Intensity</h3>
        <input
          v-model.number="intensity"
          type="range"
          max="1"
          step="0.01"
        >
      </section>
      <section>
        <h3>Sky color</h3>
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
        <h3>Ground color</h3>
        <label>R<input
          v-model="gr"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="gg"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="gb"
          type="range"
          max="255"
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
    intensity: 0.5,
    r: '255',
    b: '255',
    g: '255',
    gr: '127',
    gb: '127',
    gg: '127',
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
    groundColor() { return `rgb(${this.gr}, ${this.gg}, ${this.gb})`; },
  },
};
</script>
