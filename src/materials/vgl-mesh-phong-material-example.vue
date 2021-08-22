<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-torus-knot-geometry />
            </template>
            <template #material>
              <vgl-mesh-phong-material
                :color="color"
                :specular="specular"
                :shininess="shininess"
              />
            </template>
          </vgl-mesh>
          <vgl-ambient-light :intensity="0.5" />
          <vgl-directional-light
            :position-y="2"
            :position-z="1"
            :intensity="0.5"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="1"
          :position-theta="0.5"
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
        <h3>Specular color</h3>
        <label>R<input
          v-model="sr"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="sg"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="sb"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Properties</h3>
        <label>Shininess<input
          v-model.number="shininess"
          type="range"
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
    sr: '17',
    sg: '17',
    sb: '17',
    shininess: 30,
  }),
  computed: {
    color() { return `rgb(${this.r}, ${this.g}, ${this.b})`; },
    specular() { return `rgb(${this.sr}, ${this.sg}, ${this.sb})`; },
  },
};
</script>
