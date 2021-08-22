<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-axes-helper :size="size" />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="15"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <label>Size<input
        v-model.number="size"
        type="range"
        max="5"
        step="0.05"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({ size: 1 }),
};
</script>
