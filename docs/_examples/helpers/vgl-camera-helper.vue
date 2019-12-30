<template>
  <div>
    <vgl-renderer
      antialias
      camera="view"
    >
      <vgl-scene>
        <vgl-camera-helper camera="shown" />
      </vgl-scene>
      <vgl-perspective-camera
        name="view"
        orbit-position="0.8 1 1"
        orbit-target="0 0 -0.3"
      />
      <vgl-perspective-camera
        name="shown"
        :far="far"
        :fov="fov"
        :near="near"
      />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Fov<input
        v-model="fov"
        type="range"
        max="90"
      ></label>
      <label>Far<input
        v-model="far"
        type="range"
        max="1"
        step="0.01"
      ></label>
      <label>Near<input
        v-model="near"
        type="range"
        max="0.1"
        step="0.001"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    fov: 50,
    near: 0.05,
    far: 0.5,
  }),
};
</script>
