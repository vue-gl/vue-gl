<template>
  <div>
    <vgl-renderer
      antialias
      shadow-map-enabled
    >
      <template #scene>
        <vgl-scene>
          <vgl-mesh
            :position-y="-1.5"
            receive-shadow
          >
            <template #geometry>
              <vgl-box-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-mesh
            cast-shadow
            receive-shadow
          >
            <template #geometry>
              <vgl-sphere-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light
            color="#ffffff"
            :intensity="0.1"
          />
          <vgl-rect-area-light
            :color="color"
            :intensity="intensity"
            :width="width"
            :height="height"
            :position-x="x"
            :position-y="y"
            :position-z="z"
            :rotation-x="Math.PI"
          >
            <vgl-line-loop
              :scale-x="width"
              :scale-y="height"
            >
              <template #geometry>
                <vgl-geometry>
                  <template #position>
                    <vgl-float32-attribute
                      :array="[-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5]"
                      :item-size="2"
                    />
                  </template>
                </vgl-geometry>
              </template>
              <template #material>
                <vgl-line-basic-material :color="color" />
              </template>
            </vgl-line-loop>
          </vgl-rect-area-light>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="10"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Intensity</h3>
        <input
          v-model.number="intensity"
          type="range"
          max="1"
          step="0.01"
        >
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
      <section>
        <h3>Position</h3>
        <label>X<input
          v-model.number="x"
          type="range"
          min="-10"
          max="10"
          step="0.1"
        ></label>
        <label>Y<input
          v-model.number="y"
          type="range"
          min="-10"
          max="10"
          step="0.1"
        ></label>
        <label>Z<input
          v-model.number="z"
          type="range"
          min="-10"
          max="10"
          step="0.1"
        ></label>
      </section>
      <section>
        <h3>Width</h3>
        <input
          v-model.number="width"
          type="range"
          min="1"
          max="100"
          step="0.1"
        >
      </section>
      <section>
        <h3>Height</h3>
        <input
          v-model.number="height"
          type="range"
          min="1"
          max="100"
          step="0.1"
        >
      </section>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    intensity: 0.5,
    r: '255',
    b: '255',
    g: '255',
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    z: -5,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
  },
};
</script>
