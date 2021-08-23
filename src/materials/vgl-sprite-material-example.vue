<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-sprite>
            <template #material>
              <vgl-sprite-material>
                <template #map>
                  <vgl-texture>
                    <template #image>
                      <vgl-image src="./docs/img/star.gif" />
                    </template>
                  </vgl-texture>
                </template>
              </vgl-sprite-material>
            </template>
          </vgl-sprite>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="20"
          :position-phi="1"
          :position-theta="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <label>No effect<input type="range"></label>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default { components };
</script>
