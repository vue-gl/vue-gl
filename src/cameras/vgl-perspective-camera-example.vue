<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-box-geometry
                :width="7.5"
                :height="7.5"
                :depth="7.5"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light
            color="#ffeecc"
            :intensity="0.4"
          />
          <vgl-directional-light
            :position-x="2"
            :position-y="1"
            :position-z="3"
            :intensity="0.7"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          rotation="lookAt"
          :position-radius="20"
          :position-phi="1"
          :position-theta="1"
          :zoom="zoom"
          :near="near"
          :far="far"
          :fov="fov"
          :aspect="autoAspect ? undefined : aspect"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Zoom<input
        v-model.number="zoom"
        type="range"
        min="0.2"
        max="3"
        step="0.1"
      ></label>
      <label>Near<input
        v-model.number="near"
        type="range"
        min="10"
        max="30"
      ></label>
      <label>Far<input
        v-model.number="far"
        type="range"
        min="10"
        max="30"
      ></label>
      <label>Fov<input
        v-model.number="fov"
        type="range"
        max="85"
        min="15"
      ></label>
      <p>
        Aspect
        <label>Auto<input
          v-model="autoAspect"
          type="checkbox"
        ></label>
        <label>
          Ratio
          <input
            v-model.number="aspect"
            :disabled="autoAspect"
            type="range"
            max="5"
            min="0.2"
            step="0.1"
          >
        </label>
      </p>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    fov: 50, zoom: 1, near: 10, far: 30, aspect: 2, autoAspect: true,
  }),
};
</script>

<style scoped>
  label {
    display: flex;
  }
  input {
    margin-left: 1ex;
  }
  p:first-line, :not(p) > label:first-line {
    font-weight: bold;
  }
</style>
