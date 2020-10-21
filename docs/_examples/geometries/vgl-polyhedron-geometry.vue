<template>
  <div>
    <vgl-renderer
      antialias
      camera="camera"
      scene="scene"
    >
      <vgl-scene name="scene">
        <vgl-polyhedron-geometry
          name="geo"
          vertices="1, 1, 1, -1, -0.5, 1, -0.5, -1, 1, 0, 0, -1"
          indices="0, 1, 2, 0, 3, 1, 1, 3, 2, 0, 2, 3"
          :radius="radius"
          :detail="detail"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="geo"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 0.5 -2" />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="100 0.5 0"
        name="camera"
      />
    </vgl-renderer>
    <aside class="control-panel">
      <label>Radius<input
        v-model="radius"
        type="range"
      ></label>
      <label>Detail<input
        v-model="detail"
        type="range"
        max="10"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    radius: 40,
    detail: 0,
  }),
};
</script>
