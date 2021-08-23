<template>
  <div>
    <p>Two canvases below shares a same scene and project it by different cameras.</p>
    <vgl-defs>
      <template #sharedScene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-box-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-ambient-light :intensity="0.4" />
          <vgl-directional-light
            :intensity="0.5"
            :position-x="3"
            :position-y="2"
            :position-z="1"
          />
        </vgl-scene>
      </template>
    </vgl-defs>
    <vgl-renderer>
      <template #scene>
        <vgl-use href="sharedScene" />
      </template>
      <template #camera>
        <vgl-perspective-camera
          :position-x="1.5"
          :position-y="1.2"
          :position-z="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <vgl-renderer>
      <template #scene>
        <vgl-use href="sharedScene" />
      </template>
      <template #camera>
        <vgl-orthographic-camera
          :left="-2.2"
          :right="2.2"
          :position-x="1.5"
          :position-y="1.2"
          :position-z="1"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default { components };
</script>
