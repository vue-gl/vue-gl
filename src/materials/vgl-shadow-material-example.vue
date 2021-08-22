<template>
  <div>
    <vgl-renderer
      antialias
      shadow-map-enabled
      alpha
    >
      <template #scene>
        <vgl-scene>
          <vgl-mesh
            :position-y="0.5"
            cast-shadow
          >
            <template #geometry>
              <vgl-box-geometry
                :width="1"
                :height="1"
                :depth="1"
              />
            </template>
            <template #material>
              <vgl-mesh-standard-material color="#ffbbaa" />
            </template>
          </vgl-mesh>
          <vgl-mesh
            :rotation-x="-1.570796"
            receive-shadow
          >
            <template #geometry>
              <vgl-plane-geometry
                :width="3.5"
                :height="3.5"
              />
            </template>
            <template #material>
              <vgl-shadow-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light color="#ffeecc" />
          <vgl-directional-light
            :position-x="-1"
            :position-y="2"
            :position-z="2"
            cast-shadow
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="3"
          :position-phi="1"
          :position-theta="0.7"
          rotation="lookAt"
          :look-at-y="0.5"
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
