<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-ring-geometry
          name="ring"
          :inner-radius="innerRadius"
          :outer-radius="outerRadius"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="ring"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="250 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Inner radius<input
        v-model="innerRadius"
        type="range"
      ></label>
      <label>Outer radius<input
        v-model="outerRadius"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    innerRadius: 25,
    outerRadius: 50,
  }),
};
</script>
