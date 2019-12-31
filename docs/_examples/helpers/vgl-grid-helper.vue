<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-grid-helper
          :size="size"
          :divisions="divisions"
          :color-center-line="`rgb(${cr}, ${cg}, ${cb})`"
          :color-grid="`rgb(${gr}, ${gg}, ${gb})`"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="15 1 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Grid</h3>
        <label>Size<input
          v-model="size"
          type="range"
          max="20"
        ></label>
        <label>Divisions<input
          v-model="divisions"
          type="range"
          step="2"
        ></label>
      </section>
      <section>
        <h3>Centerline color</h3>
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
        <h3>Grid color</h3>
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
    size: 10,
    divisions: 10,
    cr: 255,
    cg: 0,
    cb: 0,
    gr: 255,
    gg: 255,
    gb: 255,
  }),
};
</script>
