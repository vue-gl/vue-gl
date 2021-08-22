<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh :position-x="-750">
            <template #geometry>
              <vgl-text-geometry :text="text">
                <template #font>
                  <vgl-font :data="font" />
                </template>
              </vgl-text-geometry>
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
          :position-radius="1000"
          :position-phi="1.3"
          :position-theta="0.3"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Text<input v-model="text"></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

const typeface = require('three/examples/fonts/helvetiker_regular.typeface.json');

export default {
  components,
  data: () => ({
    font: typeface,
    text: 'Text to be displayed.',
  }),
};
</script>
