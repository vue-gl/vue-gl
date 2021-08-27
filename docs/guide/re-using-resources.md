# Re-using resources
Since Vue.js is designed for managing DOM elements and DOM objects cannot be re-used, each instance
of a Vue.js component is unique. But we would often like to reduce resource usage when using WebGL
especially handling much objects. We would also need to re-use instances when other component
requires exactly same instance.

&lt;VglDefs&gt; and &lt;VglUse&gt; are special components for re-using Three.js instances. Any
named slots under the &lt;VglDefs&gt; can be used in other place via &lt;VglUse&gt;.

## Resource usage reduction
The example below uses the same tetrahedron geometry for different mesh objects. It creates a
tetrahedron geometry just once when the instance of &lt;VglDefs&gt; is created. Since the geometry
is defined in `tetrahedron` slot, it is accessible with passing that name to `href` prop of the
&lt;VglUse&gt; component.
```vue
<template>
  <vgl-renderer>
    <vgl-defs>
      <template #tetrahedron>
        <vgl-tetrahedron-geometry />
      </template>
    </vgl-defs>
    <template #scene>
      <vgl-scene>
        <vgl-mesh
          v-for="z, i of [-2.5, 0, 2.5]"
          :key="z"
          :position-z="z"
        >
          <template #geometry>
            <vgl-use href="tetrahedron" />
          </template>
          <template #material>
            <vgl-mesh-standard-material :color="(0x000088 << i * 8) + 0x777777" />
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
        :position-x="5"
        :position-y="1.5"
        :position-z="1.5"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglDefs, VglUse, VglScene, VglTetrahedronGeometry, VglMeshStandardMaterial,
  VglDirectionalLight, VglMesh, VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglDefs,
    VglUse,
    VglScene,
    VglTetrahedronGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
    VglMesh,
    VglPerspectiveCamera,
  },
};
</script>
```
<ClientOnly><re-using-geometry-example /></ClientOnly>


## Sharing resources between multiple renderers
&lt;VglDefs&gt; can be defined also outside &lt;VglRenderer&gt;. It allows you to render a same
scene on multiple canvases without cloning objects.

&lt;VglDefs&gt; and &lt;VglUse&gt; uses the root Vue.js instance as a namespace. So that you can
share resources in the same Vue.js instance but not available in others.

The example below shows two canvases and draws the same scene with the same camera on them.
```vue
<template>
  <div>
    <vgl-defs>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-torus-knot-geometry />
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
          :position-x="5"
          :position-y="4"
          :position-z="3"
          rotation="lookAt"
        />
      </template>
    </vgl-defs>
    <vgl-renderer class="portrait">
      <template #scene>
        <vgl-use href="scene" />
      </template>
      <template #camera>
        <vgl-use href="camera" />
      </template>
    </vgl-renderer>
    <vgl-renderer class="landscape">
      <template #scene>
        <vgl-use href="scene" />
      </template>
      <template #camera>
        <vgl-use href="camera" />
      </template>
    </vgl-renderer>
  </div>
</template>

<script>
import {
  VglDefs, VglUse, VglRenderer, VglScene, VglPerspectiveCamera, VglMesh, VglTorusKnotGeometry,
  VglMeshStandardMaterial, VglDirectionalLight,
} from 'vue-gl';

export default {
  components: {
    VglDefs,
    VglUse,
    VglRenderer,
    VglScene,
    VglPerspectiveCamera,
    VglMesh,
    VglTorusKnotGeometry,
    VglMeshStandardMaterial,
    VglDirectionalLight,
  },
};
</script>

<style scoped>
.portrait {
  width: 150px;
  height: 300px;
}
</style>
```
<ClientOnly><multiple-renderers-example /></ClientOnly>

## When you have to take exact that instance
Some VueGL components need to get instances used in other component tree.

For example, &lt;VglSpotLight&gt; accepts `target` slot in that object the light faces to. Since
the target object is usually a child of other object, you have to pass a same instance to both
slots.

This is also a use case of &lt;VglDefs&gt; and &lt;VglUse&gt; because they internally handle the
exact same instance.

The spot light in the following example always faces to the satellite icosahedron object.
```vue
<template>
  <vgl-renderer>
    <template #scene>
      <vgl-scene>
        <vgl-defs>
          <template #satellite>
            <vgl-mesh
              position="spherical"
              :position-radius="3"
              :position-phi="Math.PI/2"
              :position-theta="satellite"
            >
              <template #geometry>
                <vgl-icosahedron-geometry />
              </template>
              <template #material>
                <vgl-mesh-standard-material />
              </template>
            </vgl-mesh>
          </template>
        </vgl-defs>
        <vgl-mesh
          position="spherical"
          :position-radius="5"
          :position-phi="Math.PI/2"
          :position-theta="planet"
          :rotation-x="Math.PI/6"
        >
          <template #geometry>
            <vgl-octahedron-geometry />
          </template>
          <template #material>
            <vgl-mesh-standard-material />
          </template>
          <vgl-use href="satellite" />
        </vgl-mesh>
        <vgl-spot-light
          :position-y="10"
          :angle="0.3"
          :penumbra="0.5"
        >
          <template #target>
            <vgl-use href="satellite" />
          </template>
        </vgl-spot-light>
      </vgl-scene>
    </template>
    <template #camera>
      <vgl-perspective-camera
        :position-x="12"
        :position-y="8"
        rotation="lookAt"
      />
    </template>
  </vgl-renderer>
</template>

<script>
import {
  VglRenderer, VglDefs, VglUse, VglScene, VglMesh, VglIcosahedronGeometry, VglOctahedronGeometry,
  VglMeshStandardMaterial, VglSpotLight, VglPerspectiveCamera,
} from 'vue-gl';

export default {
  components: {
    VglRenderer,
    VglDefs,
    VglUse,
    VglScene,
    VglMesh,
    VglIcosahedronGeometry,
    VglOctahedronGeometry,
    VglMeshStandardMaterial,
    VglSpotLight,
    VglPerspectiveCamera,
  },
  data: () => ({ planet: 0.5, satellite: 0 }),
  mounted() {
    setInterval(() => {
      this.planet += 0.005;
      this.satellite += 0.02;
    }, 10);
  },
};
</script>
```
<ClientOnly><exact-same-instance-example /></ClientOnly>
