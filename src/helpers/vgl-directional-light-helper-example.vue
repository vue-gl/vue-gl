<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-directional-light-helper :size="size">
            <template #light>
              <vgl-directional-light
                :position-x="x"
                :position-y="y"
                :position-z="z"
                :color="color"
              />
            </template>
          </vgl-directional-light-helper>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="20"
          :position-phi="1.8"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Light color</h3>
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
        <h3>Light position</h3>
        <label>x<input
          v-model.number="x"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
        <label>y<input
          v-model.number="y"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
        <label>z<input
          v-model.number="z"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
      </section>
      <section>
        <h3>Helper size</h3>
        <label>Size<input
          v-model.number="size"
          type="range"
          max="5"
          step="0.05"
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
    size: 1,
    r: '255',
    g: '255',
    b: '255',
    x: 1,
    y: 2,
    z: 0,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
