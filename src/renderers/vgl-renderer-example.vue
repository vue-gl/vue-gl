<template>
  <div>
    <vgl-renderer
      :antialias="antialias"
      :alpha="alpha"
      :disable-premultiplied-alpha="!premultipliedAlpha"
      :disable-depth="!depth"
      :precision="precision"
      :disable-stencil="!stencil"
      :preserve-drawing-buffer="preserveDrawingBuffer"
      :shadow-map-enabled="shadowMapEnabled"
      :logarithmic-depth-buffer="logarithmicDepthBuffer"
      :class="orientation"
    >
      <template #scene>
        <vgl-scene>
          <vgl-mesh
            :position-y="-1.5"
            receive-shadow
          >
            <template #geometry>
              <vgl-box-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-mesh
            cast-shadow
            receive-shadow
          >
            <template #geometry>
              <vgl-sphere-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light color="#ffeecc" />
          <vgl-directional-light
            :position-y="1"
            :position-z="1"
            cast-shadow
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <label><input
        v-model="antialias"
        type="checkbox"
      >Antialias</label>
      <label><input
        v-model="alpha"
        type="checkbox"
      >Alpha</label>
      <label><input
        v-model="premultipliedAlpha"
        type="checkbox"
      >Premultiplied alpha</label>
      <label><input
        v-model="depth"
        type="checkbox"
      >Depth buffer</label>
      <label><input
        v-model="stencil"
        type="checkbox"
      >Stencil buffer</label>
      <label><input
        v-model="preserveDrawingBuffer"
        type="checkbox"
      >Preserve drawing buffer</label>
      <label><input
        v-model="logarithmicDepthBuffer"
        type="checkbox"
      >Logarithmic depth buffer</label>
      <label><input
        v-model="shadowMapEnabled"
        type="checkbox"
      >Shadow map</label>
      <label>Precision
        <select v-model="precision">
          <option value="highp">High</option>
          <option value="mediump">Medium</option>
          <option value="lowp">Low</option>
        </select>
      </label>
      <label>Canvas orientation
        <select v-model="orientation">
          <option value="landscape">Landscape</option>
          <option value="square">Square</option>
          <option value="portrait">Portrait</option>
        </select>
      </label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    antialias: true,
    alpha: false,
    premultipliedAlpha: true,
    depth: true,
    precision: 'highp',
    stencil: true,
    preserveDrawingBuffer: false,
    shadowMapEnabled: false,
    logarithmicDepthBuffer: false,
    orientation: 'landscape',
  }),
};
</script>

<style scoped>
.landscape {
  width: 300px;
  height: 150px;
}
.square {
  width: 150px;
  height: 150px;
}
.portrait {
  width: 150px;
  height: 300px;
}
</style>
