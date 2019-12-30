<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-directional-light
          name="light"
          :position="`${x} ${y} ${z}`"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <vgl-directional-light-helper
          light="light"
          :size="size"
        />
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
        <h3>Helper size</h3>
        <label>Size<input
          v-model="size"
          type="range"
          max="5"
          step="0.05"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    size: 1,
    r: 255,
    g: 255,
    b: 255,
    x: 1,
    y: 2,
    z: 0,
  }),
};
</script>
