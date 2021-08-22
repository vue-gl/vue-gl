<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-camera-helper>
            <template #camera>
              <vgl-perspective-camera
                :far="far"
                :fov="fov"
                :near="near"
                :aspect="aspect"
              />
            </template>
          </vgl-camera-helper>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="0.8"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
          :look-at-z="-0.3"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <label>Fov<input
        v-model.number="fov"
        type="range"
        max="90"
      ></label>
      <label>Far<input
        v-model.number="far"
        type="range"
        max="1"
        step="0.01"
      ></label>
      <label>Near<input
        v-model.number="near"
        type="range"
        max="0.1"
        step="0.001"
      ></label>
      <label>Aspect<input
        v-model.number="aspect"
        type="range"
        min="0.1"
        max="3"
        step="0.1"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    fov: 50,
    near: 0.05,
    far: 0.5,
    aspect: 1,
  }),
};
</script>
