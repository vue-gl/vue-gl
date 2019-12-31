<template>
  <div>
    <vgl-renderer
      antialias
      shadow-map-enabled
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
        <vgl-hemisphere-light
          :color="`rgb(${r}, ${g}, ${b})`"
          :ground-color="`rgb(${gr}, ${gg}, ${gb})`"
          :intensity="intensity"
        />
        <vgl-directional-light
          position="0 1 1"
          cast-shadow
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="5 1 1" />
    </vgl-renderer>
    <aside class="control-panel">
      <section>
        <h3>Intensity</h3>
        <input
          v-model="intensity"
          type="range"
          max="1"
          step="0.01"
        >
      </section>
      <section>
        <h3>Sky color</h3>
        <label>R<input
          v-model="r"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="g"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="b"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Ground color</h3>
        <label>R<input
          v-model="gr"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="gg"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="gb"
          type="range"
          max="255"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    intensity: 0.5,
    r: 255,
    b: 255,
    g: 255,
    gr: 127,
    gb: 127,
    gg: 127,
  }),
};
</script>
