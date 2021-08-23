# Reactive drawing
One of VueGL's main solution is reactively re-drawing scenes. When the Vue.js instance detects data
changes, VueGL automatically updates its canvas with the new data.

## Detecting data changes
The example below updates the data periodically and the canvas is updated at same time.
```vue
<template>
  <vgl-renderer>
    <template #scene>
      <vgl-scene>
        <vgl-mesh :position-z="z">
          <template #geometry>
            <vgl-sphere-geometry />
          </template>
          <template #material>
            <vgl-mesh-standard-material />
          </template>
        </vgl-mesh>
        <vgl-directional-light
          :position-x="2"
          :position-y="1.5"
          :position-z="1"
        />
      </vgl-scene>
    </template>
    <template #camera>
      <vgl-perspective-camera
        :position-x="4"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglScene, VglMesh, VglSphereGeometry, VglMeshStandardMaterial, VglDirectionalLight,
  VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglScene,
    VglMesh,
    VglSphereGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglPerspectiveCamera,
  },
  data: () => ({ z: 0, upward: true }),
  mounted() {
    setInterval(() => {
      this.z += this.upward ? 0.01 : -0.01;
      if (this.z >= 1 || this.z <= -1) this.upward = !this.upward;
    }, 10);
  },
};
</script>
```
<ClientOnly><periodically-update-example /></ClientOnly>

## Handling form inputs
To handle user inputs, simply bind datas to both forms and VueGL components.

In example below, try moving range input and the sphere will move together.
```vue
<template>
  <div>
    <vgl-renderer>
      <template #scene>
        <vgl-scene>
          <vgl-mesh :position-z="-z">
            <template #geometry>
              <vgl-sphere-geometry />
            </template>
            <template #material>
              <vgl-mesh-standard-material />
            </template>
          </vgl-mesh>
          <vgl-directional-light
            :position-x="2"
            :position-y="1.5"
            :position-z="1"
          />
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          :position-x="4"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>
    <aside>
      <input
        v-model.number="z"
        min="-1"
        max="1"
        step="0.01"
        type="range"
      >
    </aside>
  </div>
</template>

<script>
import {
  VglRenderer, VglScene, VglMesh, VglSphereGeometry, VglMeshStandardMaterial, VglDirectionalLight,
  VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglScene,
    VglMesh,
    VglSphereGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglPerspectiveCamera,
  },
  data: () => ({ z: 0 }),
};
</script>
```
<ClientOnly><interactive-update-example /></ClientOnly>
