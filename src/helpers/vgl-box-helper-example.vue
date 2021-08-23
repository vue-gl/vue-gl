<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-defs>
            <template #mesh>
              <vgl-mesh>
                <template #geometry>
                  <vgl-sphere-geometry :radius="radius" />
                </template>
                <template #material>
                  <vgl-mesh-standard-material />
                </template>
              </vgl-mesh>
            </template>
          </vgl-defs>
          <vgl-use href="mesh" />
          <vgl-box-helper :color="color">
            <template #object>
              <vgl-use href="mesh" />
            </template>
          </vgl-box-helper>
          <vgl-ambient-light />
          <vgl-directional-light
            :position-y="1"
            :position-z="1"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="250"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Geometry</h3>
        <label>Radius<input
          v-model.number="radius"
          type="range"
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
    r: '255',
    g: '255',
    b: '255',
    radius: 50,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
