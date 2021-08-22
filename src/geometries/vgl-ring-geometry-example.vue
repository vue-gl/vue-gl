<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-ring-geometry
                :inner-radius="innerRadius"
                :outer-radius="outerRadius"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light color="#ffeecc" />
          <vgl-directional-light
            :position-y="1"
            :position-z="2"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="250"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Inner radius<input
        v-model.number="innerRadius"
        type="range"
      ></label>
      <label>Outer radius<input
        v-model.number="outerRadius"
        type="range"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    innerRadius: 25,
    outerRadius: 50,
  }),
};
</script>
