<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-torus-knot-geometry name="geo" />
        <vgl-mesh-physical-material
          name="mat"
          :color="`rgb(${r}, ${g}, ${b})`"
          :clear-coat="clearCoat"
          :clear-coat-roughness="clearCoatRoughness"
          :reflectivity="reflectivity"
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
        <h3>Physical</h3>
        <label>Clear coat<input
          v-model="clearCoat"
          type="range"
          max="1"
          step="0.01"
        ></label>
        <label>Clear coat roughness<input
          v-model="clearCoatRoughness"
          type="range"
          max="1"
          step="0.01"
        ></label>
        <label>Reflectivity<input
          v-model="reflectivity"
          type="range"
          max="1"
          step="0.01"
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
    clearCoat: 0,
    clearCoatRoughness: 0,
    reflectivity: 1,
  }),
};
</script>
