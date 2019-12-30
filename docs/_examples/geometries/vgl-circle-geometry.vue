<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-circle-geometry
          name="circle"
          :radius="radius"
          :segments="segments"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="circle"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="200 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Radius<input
        v-model="radius"
        type="range"
      ></label>
      <label>Segments<input
        v-model="segments"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    radius: 25,
    segments: 16,
  }),
};
</script>
