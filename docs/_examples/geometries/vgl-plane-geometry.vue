<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-plane-geometry
          name="plane"
          :width="width"
          :height="height"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="plane"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="100 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Width<input
        v-model="width"
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
    width: 50,
    height: 50,
  }),
};
</script>
