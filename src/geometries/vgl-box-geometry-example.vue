<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-box-geometry
                :width="width"
                :height="height"
                :depth="depth"
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
          :position-radius="100"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Width<input
        v-model.number="width"
        type="range"
      ></label>
      <label>Height<input
        v-model.number="height"
        type="range"
      ></label>
      <label>Depth<input
        v-model.number="depth"
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
    width: 50,
    height: 50,
    depth: 50,
  }),
};
</script>
