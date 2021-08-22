<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-polyhedron-geometry
                :vertices="[1, 1, 1, -1, -0.5, 1, -0.5, -1, 1, 0, 0, -1]"
                :indices="[0, 1, 2, 0, 3, 1, 1, 3, 2, 0, 2, 3]"
                :radius="radius"
                :detail="detail"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light color="#ffeecc" />
          <vgl-directional-light
            :position-y="0.5"
            :position-z="-2"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="100"
          :position-phi="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <label>Radius<input
        v-model.number="radius"
        type="range"
      ></label>
      <label>Detail<input
        v-model.number="detail"
        type="range"
        max="10"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    radius: 40,
    detail: 0,
  }),
};
</script>
