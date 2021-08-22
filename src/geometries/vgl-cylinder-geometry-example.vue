<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-cylinder-geometry
                :radius-top="radiusTop"
                :radius-bottom="radiusBottom"
                :height="height"
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
          :position-radius="200"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Top radius<input
        v-model.number="radiusTop"
        type="range"
      ></label>
      <label>Bottom radius<input
        v-model.number="radiusBottom"
        type="range"
      ></label>
      <label>Height<input
        v-model.number="height"
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
    radiusTop: 25,
    radiusBottom: 25,
    height: 50,
  }),
};
</script>
