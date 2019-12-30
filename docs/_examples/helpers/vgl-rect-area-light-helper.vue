<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-rect-area-light
          name="light"
          :position="`${x} ${y} ${z}`"
          :width="width"
          :height="height"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <vgl-rect-area-light-helper light="light" />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="20 1.8 0.5" />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Light color</h3>
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
        <h3>Light position</h3>
        <label>x<input
          v-model="x"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
        <label>y<input
          v-model="y"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
        <label>z<input
          v-model="z"
          type="range"
          max="5"
          min="-5"
          step="0.01"
        ></label>
      </section>
      <section>
        <h3>Light size</h3>
        <label>Width<input
          v-model="width"
          type="range"
          max="25"
          min="1"
          step="0.1"
        ></label>
        <label>Height<input
          v-model="height"
          type="range"
          max="25"
          min="1"
          step="0.1"
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
    x: 1,
    y: 2,
    z: 0,
    width: 10,
    height: 10,
  }),
};
</script>
