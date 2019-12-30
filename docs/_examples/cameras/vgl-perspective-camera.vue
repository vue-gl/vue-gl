<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-box-geometry
          name="box"
          width="7.5"
          height="7.5"
          depth="7.5"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="box"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="20 1 1"
        :fov="fov"
        :zoom="zoom"
      />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Fov<input
        v-model="fov"
        type="range"
        max="90"
      ></label>
      <label>Zoom<input
        v-model="zoom"
        type="range"
        max="2"
        step="0.02"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    fov: 50,
    zoom: 1,
  }),
};
</script>
