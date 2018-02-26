* Contents
    * [Overview](#overview)
    * [Getting started](#getting-started)
    * [Reactive rendering](#reactive-rendering)
    * [Supported browsers](#supported-browsers)
* Other resources
    * [Component references](reference)

# Overview
[Vue.js](https://vuejs.org) components for reactive 3D rendering. Depends on [three.js](https://threejs.org/).

You can render 3D components on canvas by coding custom html tags. It's not only for integration with other Vue.js applications, but also for drawing 3D graphics more easier!
# Getting started
You need to load the vue.js and the three.js scripts with the vue-gl script.
```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>
<script>
    Object.keys(VueGL).forEach(name => {
        Vue.component(name, VueGL[name]);
    });
</script>
```
You can also get install via npm. The three.js module will be installed as a dependency.
```sh
npm install --save vue vue-gl
```
```js
import * as VueGL from "vue-gl";

Object.keys(VueGL).forEach(name => {
    Vue.component(name, VueGL[name]);
});
```
Then, the following code will render a sphere on the canvas.
```html
<vgl-renderer class="vgl-canvas" style="width: 300px; height: 150px;">
    <vgl-scene>
        <vgl-sphere-geometry name="sphere"></vgl-sphere-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="sphere" material="std"></vgl-mesh>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="0 1 1"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="5 1 1;"></vgl-perspective-camera>
</vgl-renderer>
<script>
    new Vue({
        el: ".vgl-canvas"
    });
</script>
```
<div class="vgl-example"><iframe class="vgl-example__content" srcdoc="
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        .vgl-canvas {
            height: 100vh;
        }
    </style>
    <vgl-renderer class='vgl-canvas'>
        <vgl-scene>
            <vgl-sphere-geometry name='sphere'></vgl-sphere-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='sphere' material='std'></vgl-mesh>
            <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
            <vgl-directional-light position='0 1 1'></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='5 1 1'></vgl-perspective-camera>
    </vgl-renderer>
    <script src='js/vue.min.js'></script>
    <script src='js/three.min.js'></script>
    <script src='js/vue-gl.js'></script>
    <script>
        Object.keys(VueGL).forEach(function(name) {
            Vue.component(name, VueGL[name]);
        });
        const vm = new Vue({
            el: '.vgl-canvas'
        });
    </script>
"></iframe></div>
# Reactive rendering
It works with the reactive data bindings of Vue.js. Follwing code uses [form input bindings](https://vuejs.org/v2/guide/forms.html) and pass datas to the position property of a mesh object. VueGL renders a sphere at your requested position at once.
```html
<div id="vgl-app" style="position: relative; width: 300px; height: 150px;">
    <vgl-renderer style="width: 100%; height: 100%;">
        <vgl-scene>
            <vgl-sphere-geometry name="sphere" radius=25></vgl-sphere-geometry>
            <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
            <vgl-mesh geometry="sphere" material="std" :position="`${x} ${y} ${z}`"></vgl-mesh>
            <vgl-axes-helper size=140></vgl-axes-helper>
            <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
            <vgl-directional-light position="0 1 1"></vgl-directional-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position="200 1 0.5"></vgl-perspective-camera>
    </vgl-renderer>
    <div style="position: absolute; bottom: .5rem; left: .5rem; color: #fff;">
        x: <input size=3 v-model="x"><br>
        y: <input size=3 v-model="y"><br>
        z: <input size=3 v-model="z">
    </div>
</div>
<script>
    const vm = new Vue({
        el: '#vgl-app',
        data: {
            x: 50,
            y: 0,
            z: 0
        }
    });
</script>
```
<div class="vgl-example"><iframe class="vgl-example__content" srcdoc="
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        .vgl-canvas {
            height: 100vh;
        }
        .position-input {
            position: fixed;
            bottom: .5rem;
            left: .5rem;
            color: #fff;
        }
    </style>
    <div id='vgl-app'>
        <vgl-renderer class='vgl-canvas'>
            <vgl-scene>
                <vgl-sphere-geometry name='sphere' radius=25></vgl-sphere-geometry>
                <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
                <vgl-axes-helper size=140></vgl-axes-helper>
                <vgl-mesh geometry='sphere' material='std' :position='`${x} ${y} ${z}`'></vgl-mesh>
                <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
                <vgl-directional-light position='0 1 1'></vgl-directional-light>
            </vgl-scene>
            <vgl-perspective-camera orbit-position='200 1 0.5'></vgl-perspective-camera>
        </vgl-renderer>
        <div class='position-input'>
            x: <input size=3 v-model='x'><br>
            y: <input size=3 v-model='y'><br>
            z: <input size=3 v-model='z'>
        </div>
    </div>
    <script src='js/vue.min.js'></script>
    <script src='js/three.min.js'></script>
    <script src='js/vue-gl.js'></script>
    <script>
        Object.keys(VueGL).forEach(function(name) {
            Vue.component(name, VueGL[name]);
        });
        const vm = new Vue({
            el: '#vgl-app',
            data: {
                x: 50,
                y: 0,
                z: 0
            }
        });
    </script>
"></iframe></div>
# Multiple renderers
Multiple renderers can share the same datas. It might be helpful if you want to reduce using resouces.
```html
<div id="vgl-app" style="position: relative; width: 300px; height: 150px;">
    <vgl-namespace>
        <vgl-scene name="scn">
            <vgl-box-geometry name="cube" width=3 height=5 depth=10></vgl-box-geometry>
            <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
            <vgl-mesh geometry="cube" material="std"></vgl-mesh>
            <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
            <vgl-directional-light position="0 1 1"></vgl-directional-light>
        </vgl-scene>
        <vgl-renderer scene="scn" camera="cmr1" antialias style="width: 49.5%; height: 100%;">
            <vgl-perspective-camera name="cmr1" orbit-position="20 1 0.5"></vgl-perspective-camera>
        </vgl-renderer>
        <vgl-renderer scene="scn" camera="cmr2" antialias style="width: 49.5%; height: 100%; position: absolute; left: 50.5%; top: 0">
            <vgl-perspective-camera name="cmr2" orbit-position="20 2 0.5"></vgl-perspective-camera>
        </vgl-renderer>
    </vgl-namespace>
</div>
<script>
    const vm = new Vue({
        el: "#vgl-app"
    });
</script>
```
<div class="vgl-example"><iframe class="vgl-example__content" srcdoc="
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        .vgl-canvas {
            height: 100vh;
        }
    </style>
    <div id='vgl-app'>
        <vgl-namespace class='vgl-canvas'>
            <vgl-scene name='scn'>
                <vgl-box-geometry name='cube' width=3 height=5 depth=10></vgl-box-geometry>
                <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
                <vgl-mesh geometry='cube' material='std'></vgl-mesh>
                <vgl-ambient-light color='#ffeecc'></vgl-ambient-light>
                <vgl-directional-light position='0 1 1'></vgl-directional-light>
            </vgl-scene>
            <vgl-renderer scene='scn' camera='cmr1' antialias style='width: 49.5%; height: 100%;'>
                <vgl-perspective-camera name='cmr1' orbit-position='20 1 0.5'></vgl-perspective-camera>
            </vgl-renderer>
            <vgl-renderer scene='scn' camera='cmr2' antialias style='width: 49.5%; height: 100%; position: absolute; left: 50.5%; top: 0'>
                <vgl-perspective-camera name='cmr2' orbit-position='20 2 0.5'></vgl-perspective-camera>
            </vgl-renderer>
        </vgl-namespace>
    </div>
    <script src='js/vue.min.js'></script>
    <script src='js/three.min.js'></script>
    <script src='js/vue-gl.js'></script>
    <script>
        Object.keys(VueGL).forEach(function(name) {
            Vue.component(name, VueGL[name]);
        });
        const vm = new Vue({
            el: '#vgl-app'
        });
    </script>
"></iframe></div>
# Supported browsers
All modern browsers except IE < 8 are supported, depends on Vue.js and three.js. Note that IE9 needs a polyfill for TypedArray class ([js-polyfills/typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js) is a one of the options).

Components are tested on following browsers.

![Build Status](https://saucelabs.com/browser-matrix/vuegl.svg)
<script src="https://unpkg.com/srcdoc-polyfill@1.0.0/srcdoc-polyfill.min.js"></script>
