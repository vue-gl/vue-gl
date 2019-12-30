<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-axes-helper :size="size" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="15 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Size<input
        v-model="size"
        type="range"
        max="5"
        step="0.05"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({ size: 1 }),
};
</script>
