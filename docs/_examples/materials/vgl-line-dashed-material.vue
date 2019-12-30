<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-geometry
          name="line"
          position-attribute="-5, 0, 0, 5, 0, 0, 5, 5, 0, 5, 5, 3, 5, 0, 3, -5, 0, 3"
        />
        <vgl-line-dashed-material
          name="line"
          :dash-size="dashSize"
          :gap-size="gapSize"
          :linewidth="linewidth"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <vgl-line
          geometry="line"
          material="line"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="20 1 1" />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Color</h3>
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
        <h3>Line</h3>
        <label>Width<input
          v-model="linewidth"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label>Dash size<input
          v-model="dashSize"
          type="range"
          max="3"
          step="0.03"
        ></label>
        <label>Gap size<input
          v-model="gapSize"
          type="range"
          max="3"
          step="0.03"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    r: 255,
    g: 255,
    b: 255,
    linewidth: 2,
    dashSize: 1,
    gapSize: 1,
  }),
};
</script>
