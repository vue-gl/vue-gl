<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-sphere-geometry
                :radius="radius"
                :width-segments="widthSegments"
                :height-segments="heightSegments"
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
      <label>Radius<input
        v-model.number="radius"
        type="range"
      ></label>
      <label>Widgh segments<input
        v-model.number="widthSegments"
        type="range"
        max="64"
      ></label>
      <label>Height segments<input
        v-model.number="heightSegments"
        type="range"
        max="32"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    radius: 50,
    widthSegments: 16,
    heightSegments: 8,
  }),
};
</script>
