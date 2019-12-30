<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-cylinder-geometry
          name="cylinder"
          :radius-top="radiusTop"
          :radius-bottom="radiusBottom"
          :height="height"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="cylinder"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="200 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Top radius<input
        v-model="radiusTop"
        type="range"
      ></label>
      <label>Bottom radius<input
        v-model="radiusBottom"
        type="range"
      ></label>
      <label>Height<input
        v-model="height"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    radiusTop: 25,
    radiusBottom: 25,
    height: 50,
  }),
};
</script>
