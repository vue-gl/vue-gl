<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-torus-knot-geometry name="geo" />
        <vgl-mesh-phong-material
          name="mat"
          :color="`rgb(${r}, ${g}, ${b})`"
          :specular="`rgb(${sr}, ${sg}, ${sb})`"
          :shininess="shininess"
        />
        <vgl-mesh
          geometry="geo"
          material="mat"
        />
        <vgl-ambient-light intensity="0.5" />
        <vgl-directional-light
          position="0 2 1"
          intensity="0.5"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="5 1 0.5" />
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
          v-model="shininess"
          type="range"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    r: 255,
    g: 255,
    b: 255,
    sr: 17,
    sg: 17,
    sb: 17,
    shininess: 30,
  }),
};
</script>
