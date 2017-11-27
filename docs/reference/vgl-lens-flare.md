---
layout: reference
---
{% include breadcrumbs/objects.md %} VglLensFlare
# VglLensFlare `<vgl-lens-flare>`
A component for creating a simulated lens flare that tracks a light, corresponding [THREE.LensFlare](https://threejs.org/docs/index.html#api/objects/LensFlare).
## Mixins
See the mixin components below for common properties.
* [VglObject3d](vgl-object3d)

## Example usage
```html
<vgl-renderer alpha antialias style="width: 300px; height: 150px; background: black;">
    <vgl-scene>
        <vgl-plane-geometry name="plane"></vgl-plane-geometry>
        <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
        <vgl-mesh geometry="plane" material="std" rotation="-1.57 0 0" position="0 -0.25 0"></vgl-mesh>
        <vgl-lens-flare>
            <vgl-texture src='path/to/img1.png' name='fl1'></vgl-texture>
            <vgl-texture src='path/to/img2.png' name='fl2'></vgl-texture>
            <vgl-texture src='path/to/img3.png' name='fl3'></vgl-texture>
            <vgl-lens-flare-texture texture='fl1' size='140' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl3' size='12' distance='0.6' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl3' size='14' distance='0.7' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl3' size='24' distance='0.9' blending='2'></vgl-lens-flare-texture>
            <vgl-lens-flare-texture texture='fl3' size='14' distance='1.0' blending='2'></vgl-lens-flare-texture>
        </vgl-lens-flare>
        <vgl-point-light></vgl-point-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="1.5 1 1" orbit-target="0.5 0.15 0"></vgl-perspective-camera>
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
            background: black;
        }
    </style>
    <vgl-renderer alpha antialias class='vgl-canvas'>
        <vgl-scene>
            <vgl-plane-geometry name='plane'></vgl-plane-geometry>
            <vgl-mesh-standard-material name='std'></vgl-mesh-standard-material>
            <vgl-mesh geometry='plane' material='std' rotation='-1.57 0 0' position='0 -0.25 0'></vgl-mesh>
            <vgl-lens-flare>
                <vgl-texture src='../img/lensflare1.png' name='fl1'></vgl-texture>
                <vgl-texture src='../img/lensflare2.png' name='fl2'></vgl-texture>
                <vgl-texture src='../img/lensflare3.png' name='fl3'></vgl-texture>
                <vgl-lens-flare-texture texture='fl1' size='140' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl2' size='100' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl3' size='12' distance='0.6' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl3' size='14' distance='0.7' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl3' size='24' distance='0.9' blending='2'></vgl-lens-flare-texture>
                <vgl-lens-flare-texture texture='fl3' size='14' distance='1.0' blending='2'></vgl-lens-flare-texture>
            </vgl-lens-flare>
            <vgl-point-light></vgl-point-light>
        </vgl-scene>
        <vgl-perspective-camera orbit-position='1.5 1 1' orbit-target='0.5 0.15 0'></vgl-perspective-camera>
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
