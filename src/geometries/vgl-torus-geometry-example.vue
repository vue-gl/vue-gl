<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-torus-geometry
                :radius="radius"
                :tube="tube"
                :tubular-segments="tubularSegments"
                :radial-segments="radialSegments"
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
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Radius<input
        v-model.number="radius"
        type="range"
        max="50"
        step="0.5"
      ></label>
      <label>Tube radius<input
        v-model.number="tube"
        type="range"
        max="20"
        step="0.2"
      ></label>
      <label>Radial segments<input
        v-model.number="radialSegments"
        type="range"
      ></label>
      <label>Tubular segments<input
        v-model.number="tubularSegments"
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
    radius: 10,
    tube: 5,
    tubularSegments: 8,
    radialSegments: 16,
  }),
};
</script>
