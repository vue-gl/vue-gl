<template>
  <div>
    <vgl-renderer>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-plane-geometry />
            </template>
            <template #material>
              <vgl-mesh-basic-material>
                <template #map>
                  <vgl-texture>
                    <template #image>
                      <vgl-image :src="src" />
                    </template>
                  </vgl-texture>
                </template>
              </vgl-mesh-basic-material>
            </template>
          </vgl-mesh>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-orthographic-camera
          :top="0.6"
          :bottom="-0.6"
          :position-z="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside>
      <label>
        Select an image:
        <select v-model="src">
          <option :value="spring">Spring</option>
          <option :value="summer">Summer</option>
          <option :value="winter">Winter</option>
        </select>
      </label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';
import spring from './spring.jpg';
import summer from './summer.jpg';
import winter from './winter.jpg';

export default {
  components,
  data: () => ({
    src: spring, spring, summer, winter,
  }),
};
</script>
