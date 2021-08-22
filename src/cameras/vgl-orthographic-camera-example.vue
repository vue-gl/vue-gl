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
            :intensity="0.8"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-orthographic-camera
          position="spherical"
          rotation="lookAt"
          :position-radius="20"
          :position-phi="1"
          :position-theta="1"
          :zoom="zoom"
          :near="near"
          :far="far"
          :left="leftConst ? undefined : left"
          :right="rightConst ? undefined : right"
          :bottom="bottomConst ? undefined : bottom"
          :top="topConst ? undefined : top"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Zoom<input
        v-model.number="zoom"
        type="range"
        min="1"
        max="25"
      ></label>
      <label>Near<input
        v-model.number="near"
        type="range"
        max="25"
        min="10"
      ></label>
      <label>Far<input
        v-model.number="far"
        type="range"
        max="25"
        min="10"
      ></label>
      <p>
        Left
        <label>Auto<input
          v-model="leftConst"
          type="checkbox"
        ></label>
        <label>
          Position
          <input
            v-model.number="left"
            :disabled="leftConst"
            type="range"
            min="-200"
            max="200"
          >
        </label>
      </p>
      <p>
        Right
        <label>Auto<input
          v-model="rightConst"
          type="checkbox"
        ></label>
        <label>
          Position
          <input
            v-model.number="right"
            :disabled="rightConst"
            type="range"
            min="-200"
            max="200"
          >
        </label>
      </p>
      <p>
        Top
        <label>Auto<input
          v-model="topConst"
          type="checkbox"
        ></label>
        <label>
          Position
          <input
            v-model.number="top"
            :disabled="topConst"
            type="range"
            min="-100"
            max="100"
          >
        </label>
      </p>
      <p>
        Bottom
        <label>Auto<input
          v-model="bottomConst"
          type="checkbox"
        ></label>
        <label>
          Position
          <input
            v-model.number="bottom"
            :disabled="bottomConst"
            type="range"
            min="-100"
            max="100"
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
    zoom: 10,
    near: 10,
    far: 25,
    leftConst: true,
    left: -150,
    rightConst: true,
    right: 150,
    topConst: true,
    top: 75,
    bottomConst: true,
    bottom: -75,
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
