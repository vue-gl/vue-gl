---
layout: reference
---
{% include breadcrumbs/helpers.md %} &gt; VglCameraHelper
# VglCameraHelper `<vgl-camera-helper>`
This helps with visualizing what a camera contains in its frustum, corresponding [THREE.CameraHelper](https://threejs.org/docs/index.html#api/helpers/CameraHelper). It visualizes the frustum of a camera using a LineSegments.
## Mixins
See the mixin components below for common properties.
* [VglLineSegments](vgl-line-segments)

## Properties
* {% include prop.md name="camera" type="string" %} - Name of the camera to visualize.

## Example usage
```html
<vgl-renderer antialias style="width: 300px; height: 150px;" camera="viewing">
    <vgl-scene>
        <vgl-camera-helper camera="shown"></vgl-camera-helper>
    </vgl-scene>
    <vgl-perspective-camera name="view" orbit-position="0.8 1 1" orbit-target="0 0 -0.3"></vgl-perspective-camera>
    <vgl-perspective-camera name="shown" far="0.5"></vgl-perspective-camera>
</vgl-renderer>
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
    <vgl-renderer antialias class='vgl-canvas' camera='viewing'>
        <vgl-scene>
            <vgl-camera-helper camera='viewed'></vgl-camera-helper>
        </vgl-scene>
        <vgl-perspective-camera name='viewing' orbit-position='0.8 1 1' orbit-target='0 0 -0.3'></vgl-perspective-camera>
        <vgl-perspective-camera name='viewed' far='0.5'></vgl-perspective-camera>
    </vgl-renderer>
    <script src='https://unpkg.com/vue/dist/vue.min.js'></script>
    <script src='https://unpkg.com/three/build/three.min.js'></script>
    <script src='../js/vue-gl.js'></script>
    <script>
        Object.keys(VueGL).forEach(function(name) {
            Vue.component(name, VueGL[name]);
        });
        const vm = new Vue({
            el: '.vgl-canvas'
        });
    </script>
"></iframe></div>
<script src="https://unpkg.com/srcdoc-polyfill@1.0.0/srcdoc-polyfill.min.js"></script>
