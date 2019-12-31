<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-polar-grid-helper
          :radius="radius"
          :radials="radials"
          :circles="circles"
          :divisions="divisions"
          :color1="`rgb(${cr}, ${cg}, ${cb})`"
          :color2="`rgb(${gr}, ${gg}, ${gb})`"
        />
      </vgl-scene>
      <vgl-perspective-camera
        orbit-position="15 1 0.5"
        orbit-target="0 -0.5 0"
      />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Grids</h3>
        <label>Radius<input
          v-model="radius"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label>Radials<input
          v-model="radials"
          type="range"
        ></label>
        <label>Circles<input
          v-model="circles"
          type="range"
        ></label>
        <label>Divisions<input
          v-model="divisions"
          type="range"
          min="3"
        ></label>
      </section>
      <section>
        <h3>Color 1</h3>
        <label>R<input
          v-model="cr"
          type="range"
          max="255"
        ></label>
        <label>G<input
          v-model="cg"
          type="range"
          max="255"
        ></label>
        <label>B<input
          v-model="cb"
          type="range"
          max="255"
        ></label>
      </section>
      <section>
        <h3>Color 2</h3>
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
    radius: 5,
    radials: 16,
    circles: 8,
    divisions: 64,
    cr: 255,
    cg: 0,
    cb: 0,
    gr: 255,
    gg: 255,
    gb: 255,
  }),
};
</script>
