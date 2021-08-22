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
              <vgl-mesh-basic-material :color="color" />
            </template>
          </vgl-mesh>
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
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
