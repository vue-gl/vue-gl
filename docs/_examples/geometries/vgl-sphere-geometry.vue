<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-sphere-geometry
          name="sphere"
          :radius="radius"
          :width-segments="widthSegments"
          :height-segments="heightSegments"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="sphere"
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
      <label>Widgh segments<input
        v-model="widthSegments"
        type="range"
        max="64"
      ></label>
      <label>Height segments<input
        v-model="heightSegments"
        type="range"
        max="32"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    radius: 50,
    widthSegments: 16,
    heightSegments: 8,
  }),
};
</script>
