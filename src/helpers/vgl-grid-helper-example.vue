<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-grid-helper
            :size="size"
            :divisions="divisions"
            :color-center-line="colorCenterLine"
            :color-grid="colorGrid"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="15"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Grid</h3>
        <label>Size<input
          v-model.number="size"
          type="range"
          max="20"
        ></label>
        <label>Divisions<input
          v-model.number="divisions"
          type="range"
          step="2"
        ></label>
      </section>
      <section>
        <h3>Centerline color</h3>
        <label>R<input
          v-model="cr"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="cg"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="cb"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Grid color</h3>
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
    size: 10,
    divisions: 10,
    cr: '255',
    cg: '0',
    cb: '0',
    gr: '255',
    gg: '255',
    gb: '255',
  }),
  computed: {
    colorCenterLine() { return `rgb(${this.cr}, ${this.cg}, ${this.cb})`; },
    colorGrid() { return `rgb(${this.gr}, ${this.gg}, ${this.gb})`; },
  },
};
</script>
