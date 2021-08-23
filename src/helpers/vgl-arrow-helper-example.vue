<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-arrow-helper
            :color="color"
            :direction-x="x"
            :direction-y="y"
            :direction-z="z"
            :length="length"
            :head-length="headLength"
            :head-width="headWidth"
          />
          <vgl-axes-helper :size="10" />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="1"
          :position-theta="-0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Direction</h3>
        <label>x<input
          v-model.number="x"
          type="range"
          max="5"
          min="-5"
          step="0.5"
        ></label>
        <label>y<input
          v-model.number="y"
          type="range"
          max="5"
          min="-5"
          step="0.5"
        ></label>
        <label>z<input
          v-model.number="z"
          type="range"
          max="5"
          min="-5"
          step="0.5"
        ></label>
      </section>
      <section>
        <h3>Size</h3>
        <label>Length<input
          v-model.number="length"
          type="range"
          step="0.03"
          max="3"
        ></label>
        <label>Head length<input
          v-model.number="headLength"
          type="range"
          step="0.02"
          max="2"
        ></label>
        <label>Head width<input
          v-model.number="headWidth"
          type="range"
          step="0.01"
          max="1"
        ></label>
      </section>
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
    x: 1,
    y: 1,
    z: 1,
    r: '255',
    g: '255',
    b: '255',
    length: 1,
    headLength: 0.2,
    headWidth: 0.04,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
