<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-plane-geometry
                :width="512"
                :height="512"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material>
                <template #map>
                  <vgl-texture
                    :rotation="rotation"
                    :center-u="0.5"
                    :center-v="0.5"
                  >
                    <template #image>
                      <vgl-image :src="shimoguri" />
                    </template>
                  </vgl-texture>
                </template>
              </vgl-mesh-standard-material>
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
          :position-radius="700"
          :position-phi="1"
          :position-theta="0.5"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <label>Rotation<input
        v-model.number="rotation"
        type="range"
        max="3.14"
        min="-3.14"
        step="0.01"
      ></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';
import shimoguri from './shimoguri.jpg';

export default {
  components,
  data: () => ({ rotation: 0, shimoguri }),
};
</script>
