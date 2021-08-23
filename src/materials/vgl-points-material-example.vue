<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-points>
            <template #geometry>
              <vgl-box-geometry
                :width="7.5"
                :height="7.5"
                :depth="7.5"
              />
            </template>
            <template #material>
              <vgl-points-material
                :size="size"
                :disable-size-attenuation="!sizeAttenuation"
                :color="color"
              />
            </template>
          </vgl-points>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="20"
          :position-phi="1"
          :position-theta="1"
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
        <h3>Size</h3>
        <label>Size<input
          v-model.number="size"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label><input
          v-model="sizeAttenuation"
          type="checkbox"
        >Size attenuation</label>
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
    size: 1,
    sizeAttenuation: true,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
