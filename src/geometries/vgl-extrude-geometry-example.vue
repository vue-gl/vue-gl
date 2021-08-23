<template>
  <div>
    <vgl-renderer
      ref="renderer"
      antialias
    >
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-extrude-geometry
                :depth="depth"
                :curve-segments="curveSegments"
                :steps="steps"
                :bevel-enabled="bevelEnabled"
                :bevel-thickness="bevelThickness"
                :bevel-size="bevelSize"
                :bevel-offset="bevelOffset"
                :bevel-segments="bevelSegments"
              >
                <template #shapes>
                  <vgl-shape d="M0 0L10 10L-10 10L-20 -30L30 -40" />
                </template>
              </vgl-extrude-geometry>
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
          :look-at-y="-30"
          :look-at-z="50"
        />
      </template>
    </vgl-renderer>
    <aside>
      <section>
        <label>Extrude depth<input
          v-model.number="depth"
          type="range"
        ></label>
        <label>Extrude curve segments<input
          v-model.number="curveSegments"
          type="range"
          max="20"
        ></label>
        <label>Extrude steps<input
          v-model.number="steps"
          type="range"
          max="10"
        ></label>
        <label>Bevel enabled<input
          v-model="bevelEnabled"
          type="checkbox"
        ></label>
        <label>Bevel thickness<input
          v-model.number="bevelThickness"
          type="range"
          step="0.1"
          max="10"
        ></label>
        <label>Bevel size<input
          v-model.number="bevelSize"
          type="range"
          step="0.1"
          max="10"
        ></label>
        <label>Bevel offset<input
          v-model.number="bevelOffset"
          type="range"
          step="0.1"
          min="-10"
          max="10"
        ></label>
        <label>Bevel segments<input
          v-model.number="bevelSegments"
          type="range"
          max="10"
        ></label>
      </section>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

export default {
  components,
  data: () => ({
    depth: 50,
    curveSegments: 5,
    steps: 5,
    bevelEnabled: false,
    bevelThickness: 2,
    bevelSize: 2,
    bevelOffset: 0,
    bevelSegments: 5,
  }),
};
</script>
