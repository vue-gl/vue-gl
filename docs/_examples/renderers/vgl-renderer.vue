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
    >
      <vgl-scene>
        <vgl-sphere-geometry name="sphere" />
        <vgl-box-geometry name="box" />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="box"
          material="std"
          position="0 -1.5 0"
          receive-shadow
        />
        <vgl-mesh
          geometry="sphere"
          material="std"
          cast-shadow
          receive-shadow
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light
          position="0 1 1"
          cast-shadow
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="5 1 1" />
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
    </aside>
  </div>
</template>

<script>
export default {
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
  }),
};
</script>
