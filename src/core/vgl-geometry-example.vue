<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-line-loop>
            <template #geometry>
              <vgl-geometry
                :draw-range-start="drawRangeStart"
                :draw-range-count="drawRangeCount"
              >
                <template #position>
                  <vgl-float32-attribute
                    :array="position"
                    :item-size="3"
                  />
                </template>
                <template #color>
                  <vgl-float32-attribute
                    :array="color"
                    :item-size="3"
                  />
                </template>
              </vgl-geometry>
            </template>
            <template #material>
              <vgl-line-basic-material
                :linewidth="2"
                vertex-colors
              />
            </template>
          </vgl-line-loop>
          <vgl-line-loop
            :position-y="5"
            :rotation-y="-1.5708"
            :rotation-x="3.1416"
          >
            <template #geometry>
              <vgl-geometry>
                <template #position>
                  <vgl-float32-attribute
                    :array="position"
                    :item-size="3"
                  />
                </template>
                <template #color>
                  <vgl-float32-attribute
                    :array="color"
                    :item-size="3"
                  />
                </template>
              </vgl-geometry>
            </template>
            <template #material>
              <vgl-line-basic-material
                :linewidth="2"
                vertex-colors
              />
            </template>
          </vgl-line-loop>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          rotation="lookAt"
          :look-at-y="1.5"
          :position-radius="13"
          :position-phi="0.8"
          :position-theta="0.4"
        />
      </template>
    </vgl-renderer>
    <aside>
      <p>
        Draw range
        <label>Start<input
          v-model.number="drawRangeStart"
          type="range"
          max="6"
        ></label>
        <label>
          Count
          <input
            v-model.number="drawRangeCount"
            type="range"
            :max="8 - drawRangeStart"
            min="2"
          >
        </label>
      </p>
      <p>
        Position attribute
        <label>
          Line distance
          <input
            v-model.number="distance"
            min="0.5"
            max="1.5"
            step="0.1"
            type="range"
          >
        </label>
      </p>
      <p>
        Color attribute
        <label>
          Intensity
          <input
            v-model.number="intensity"
            min="0.5"
            max="1"
            step="0.01"
            type="range"
          >
        </label>
      </p>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    drawRangeStart: 0, drawRangeCount: 8, intensity: 1, distance: 1,
  }),
  computed: {
    color() {
      return [
        1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1,
        0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1,
      ].map((value) => value * this.intensity);
    },
    position() {
      return [
        -5, 0, 0, 5, 0, 0, 5, 5, 0, -5, 5, 0,
        -5, 5 - this.distance, 0, 5 - this.distance, 5 - this.distance, 0,
        5 - this.distance, this.distance, 0, -5, this.distance, 0,
      ];
    },
  },
};
</script>

<style scoped>
  label {
    display: flex;
  }
  input {
    margin-left: 1ex;
  }
  p:first-line {
    font-weight: bold;
  }
</style>
