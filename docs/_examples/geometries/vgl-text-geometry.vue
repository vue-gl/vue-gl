<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-text-geometry
          name="text"
          font="/js/helvetiker_regular.typeface.json"
          :text="text"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="text"
          material="std"
          position="-750 0 0"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="1000 1.3 0.3" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Text<input
        v-model="text"
        type="text"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: 'Text to be displayed.',
  }),
};
</script>
