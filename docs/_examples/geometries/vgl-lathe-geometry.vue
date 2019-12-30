<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-lathe-geometry
          name="geo"
          points="1 -5, 2 -4, 3 -2, 3.5 0, 4 3, 3.5 5"
          :segments="segments"
          :phi-length="phiLength"
        />
        <vgl-mesh-standard-material
          name="mat"
          side="double"
        />
        <vgl-mesh
          geometry="geo"
          material="mat"
        />
        <vgl-ambient-light />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="15 1 -0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Segments<input
        v-model="segments"
        type="range"
      ></label>
      <label>Phi<input
        v-model="phiLength"
        type="range"
        max="6.29"
        step="0.01"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    segments: 16,
    phiLength: Math.PI * 2,
  }),
};
</script>
