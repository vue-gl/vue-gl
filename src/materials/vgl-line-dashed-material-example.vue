<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-line>
            <template #geometry>
              <vgl-geometry>
                <template #position>
                  <vgl-float32-attribute
                    :array="[-5, 0, 0, 5, 0, 0, 5, 5, 0, 5, 5, 3, 5, 0, 3, -5, 0, 3]"
                    :item-size="3"
                  />
                </template>
              </vgl-geometry>
            </template>
            <template #material>
              <vgl-line-dashed-material
                :dash-size="dashSize"
                :gap-size="gapSize"
                :linewidth="linewidth"
                :color="color"
              />
            </template>
          </vgl-line>
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
        <h3>Line</h3>
        <label>Width<input
          v-model.number="linewidth"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label>Dash size<input
          v-model.number="dashSize"
          type="range"
          max="3"
          step="0.03"
        ></label>
        <label>Gap size<input
          v-model.number="gapSize"
          type="range"
          max="3"
          step="0.03"
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
    linewidth: 2,
    dashSize: 1,
    gapSize: 1,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
