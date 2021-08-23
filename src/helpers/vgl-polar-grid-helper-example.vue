<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-polar-grid-helper
            :radius="radius"
            :radials="radials"
            :circles="circles"
            :divisions="divisions"
            :color1="color1"
            :color2="color2"
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
          :look-at-y="-0.5"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Grids</h3>
        <label>Radius<input
          v-model.number="radius"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label>Radials<input
          v-model.number="radials"
          type="range"
        ></label>
        <label>Circles<input
          v-model.number="circles"
          type="range"
        ></label>
        <label>Divisions<input
          v-model.number="divisions"
          type="range"
          min="3"
        ></label>
      </section>
      <section>
        <h3>Color 1</h3>
        <label>R<input
          v-model="r1"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="g1"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="b1"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Color 2</h3>
        <label>R<input
          v-model="r2"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="g2"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="b2"
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
    radius: 5,
    radials: 16,
    circles: 8,
    divisions: 64,
    r1: '255',
    g1: '0',
    b1: '0',
    r2: '255',
    g2: '255',
    b2: '255',
  }),
  computed: {
    color1() { return `rgb(${this.r1}, ${this.g1}, ${this.b1})`; },
    color2() { return `rgb(${this.r2}, ${this.g2}, ${this.b2})`; },
  },
};
</script>
