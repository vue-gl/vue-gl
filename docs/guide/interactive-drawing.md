---
parent: Guide
nav_order: 4
---

# Interactive drawing
{: .no_toc}

## Table of contents
{: .no_toc .text-delta}

* toc
{:toc}

---

## Data binding
We can bind datas to component props as Vue.js' function, of course. If bound data
is reactive (watched by Vue.js), [`VglRenderer`](/components/renderers/vgl-renderer)
component will re-render objects when the watchers detect meaningful changes.

```html
<!-- The antialias prop gets true. -->
<vgl-renderer id="ex-1" :antialias="smooth"></vgl-renderer>

<script>
  new Vue({
    el: '#ex-1',
    data: {
      smooth: true,
    },
  });
</script>
```

## Working with form inputs
To handle user inputs, bind datas to both forms and VueGL components. The example
blow handles user input as `zCoordinate` and bind it to the `VglMesh` component.
The mesh moves following the slider input value.

<div class="code-example">
  <code-example2 inline-template>
    <div class="max-width-1-2">
      <div class="aspect-1618-1000">
        <vgl-renderer>
          <vgl-sphere-geometry name="sphere"></vgl-sphere-geometry>
          <vgl-scene>
            <vgl-mesh :position="`0 0 ${zCoordinate}`" geometry="sphere"></vgl-mesh>
          </vgl-scene>
          <vgl-perspective-camera orbit-position="10 0 0"></vgl-perspective-camera>
        </vgl-renderer>
      </div>
      <input type="range" v-model="zCoordinate" min="-5" max="5">
    </div>
  </code-example2>
  <script>
    Vue.component('CodeExample2', {
      data: () => ({ zCoordinate: 0 }),
    });
  </script>
</div>
```html
<div id="ex-2">
  <vgl-renderer>
    <vgl-sphere-geometry name="sphere"></vgl-sphere-geometry>
    <vgl-scene>
      <!-- Re-rendering will be triggered when zCoordinate changes. -->
      <vgl-mesh :position="`0 0 ${zCoordinate}`" geometry="sphere"></vgl-mesh>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="10 0 0"></vgl-perspective-camera>
  </vgl-renderer>
  <!-- User can handles zCoordinate via this range input. -->
  <input type="range" v-model="zCoordinate" min="-5" max="5">
</div>
<script>
  new Vue({
    el: '#ex-2',
    data: {
      zCoordinate: 0,
    },
  });
</script>
```

[Namespaces](namespaces){: .btn .nav-prev}
[Supporting old browsers](supporting-old-browsers){: .btn .nav-next}
{: .d-flex .mt-8 .justify-between}
