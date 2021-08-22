<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-shape-geometry :curve-segments="curveSegments">
                <template #shapes>
                  <vgl-shape d="M0 0L10 10L-10 10L-20 -30L30 -40" />
                </template>
              </vgl-shape-geometry>
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
          :look-at-z="50"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Curve segments<input
        v-model.number="curveSegments"
        type="range"
        max="20"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({ curveSegments: 5 }),
};
</script>
