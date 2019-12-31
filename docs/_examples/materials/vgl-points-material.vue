<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-box-geometry
          name="box"
          width="7.5"
          height="7.5"
          depth="7.5"
        />
        <vgl-points-material
          name="pts"
          :size="size"
          :disable-size-attenuation="!sizeAttenuation"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <vgl-points
          geometry="box"
          material="pts"
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
        <h3>Size</h3>
        <label>Size<input
          v-model="size"
          type="range"
          max="10"
          step="0.1"
        ></label>
        <label><input
          v-model="sizeAttenuation"
          type="checkbox"
        >Size attenuation</label>
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
    size: 1,
    sizeAttenuation: true,
  }),
};
</script>
