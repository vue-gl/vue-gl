<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-box-geometry
          name="box"
          :width="width"
          :height="height"
          :depth="depth"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="box"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="100 1 1" />
    </vgl-renderer>

    <aside class="control-panel">
      <h3>Size</h3>
      <label>Width<input
        v-model="width"
        type="range"
      ></label>
      <label>Height<input
        v-model="height"
        type="range"
      ></label>
      <label>Depth<input
        v-model="depth"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    width: 50,
    height: 50,
    depth: 50,
  }),
};
</script>
