<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-spot-light-helper>
            <template #light>
              <vgl-spot-light
                :position-x="px"
                :position-y="py"
                :position-z="pz"
                :color="color"
                :distance="distance"
                :angle="angle"
              >
                <template #target>
                  <vgl-object3d
                    :position-x="tx"
                    :position-y="ty"
                    :position-z="tz"
                  />
                </template>
              </vgl-spot-light>
            </template>
          </vgl-spot-light-helper>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="100"
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
          v-model.number="px"
          type="range"
          min="-100"
        ></label>
        <label>y<input
          v-model.number="py"
          type="range"
          min="-100"
        ></label>
        <label>z<input
          v-model.number="pz"
          type="range"
          min="-100"
        ></label>
      </section>
      <section>
        <h3>Light target</h3>
        <label>x<input
          v-model.number="tx"
          type="range"
          min="-100"
        ></label>
        <label>y<input
          v-model.number="ty"
          type="range"
          min="-100"
        ></label>
        <label>z<input
          v-model.number="tz"
          type="range"
          min="-100"
        ></label>
      </section>
      <section>
        <h3>Light properties</h3>
        <label>Distance<input
          v-model.number="distance"
          type="range"
        ></label>
        <label>Angle<input
          v-model.number="angle"
          type="range"
          step="0.01"
          max="1.57"
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
    px: 30,
    py: 30,
    pz: 0,
    tx: -30,
    ty: -30,
    tz: 0,
    distance: 50,
    angle: 0.5,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
