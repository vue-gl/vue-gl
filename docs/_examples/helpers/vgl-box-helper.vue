<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-sphere-geometry
          name="geo"
          :radius="radius"
        />
        <vgl-mesh-standard-material name="mtl" />
        <vgl-mesh
          geometry="geo"
          material="mtl"
          name="obj"
        />
        <vgl-box-helper
          object="obj"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <vgl-ambient-light />
        <vgl-directional-light position="0 1 1" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="250 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Geometry</h3>
        <label>Radius<input
          v-model="radius"
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
export default {
  data: () => ({
    r: 255,
    g: 255,
    b: 255,
    radius: 50,
  }),
};
</script>
