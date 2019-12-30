<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-torus-geometry
          name="torus"
          :radius="radius"
          :tube="tube"
          :tubular-segments="tubularSegments"
          :radial-segments="radialSegments"
        />
        <vgl-mesh-standard-material name="std" />
        <vgl-mesh
          geometry="torus"
          material="std"
        />
        <vgl-ambient-light color="#ffeecc" />
        <vgl-directional-light position="0 1 2" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="100 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <label>Radius<input
        v-model="radius"
        type="range"
        max="50"
        step="0.5"
      ></label>
      <label>Tube radius<input
        v-model="tube"
        type="range"
        max="20"
        step="0.2"
      ></label>
      <label>Radial segments<input
        v-model="radialSegments"
        type="range"
      ></label>
      <label>Tubular segments<input
        v-model="tubularSegments"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    radius: 10,
    tube: 5,
    tubularSegments: 8,
    radialSegments: 16,
  }),
};
</script>
