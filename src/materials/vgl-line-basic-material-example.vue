<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-line-loop>
            <template #geometry>
              <vgl-geometry>
                <template #position>
                  <vgl-float32-attribute
                    :array="array"
                    :item-size="3"
                  />
                </template>
              </vgl-geometry>
            </template>
            <template #material>
              <vgl-line-basic-material
                :linewidth="linewidth"
                :color="color"
              />
            </template>
          </vgl-line-loop>
          <vgl-line-loop :rotation-y="-1.5708">
            <template #geometry>
              <vgl-geometry>
                <template #position>
                  <vgl-float32-attribute
                    :array="array"
                    :item-size="3"
                  />
                </template>
              </vgl-geometry>
            </template>
            <template #material>
              <vgl-line-basic-material
                :linewidth="linewidth"
                :color="color"
              />
            </template>
          </vgl-line-loop>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="20"
          :position-phi="0.8"
          :position-theta="0.7"
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
    array: [-5, 0, 0, 5, 0, 0, 5, 5, 0, -5, 5, 0, -5, 4, 0, 4, 4, 0, 4, 1, 0, -5, 1, 0],
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
