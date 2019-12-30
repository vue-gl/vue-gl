<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-plane-geometry
          name="plane"
          width="512"
          height="512"
        />
        <vgl-texture
          src="/img/shimoguri.jpg"
          :rotation="rotation"
          center="0.5 0.5"
          name="texture"
        />
        <vgl-mesh-standard-material
          name="std"
          map="texture"
        />
        <vgl-mesh
          geometry="plane"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="700 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Rotation<input
        v-model="rotation"
        type="range"
        max="3.14"
        min="-3.14"
        step="0.01"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    rotation: 0,
  }),
};
</script>
