# VueGL

[Vue.js](https://vuejs.org/) components rendering 3D WebGL graphics reactively with
[three.js](https://threejs.org/).

[![NPM](https://nodei.co/npm/vue-gl.png?compact=true)](https://nodei.co/npm/vue-gl/
)  
[![Financial Contributors on Open Collective](https://opencollective.com/vue-gl/all/badge.svg?label=financial+contributors)](https://opencollective.com/vue-gl)

## Usage

```html
<!-- Load scripts -->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vue-gl"></script>

<!-- Define canvas and objects -->
<vgl-renderer id="my-canvas">
  <template #scene>
    <vgl-scene>
      <vgl-mesh>
        <template #geometry>
          <vgl-sphere-geometry></vgl-sphere-geometry>
        </template>
        <template #material>
          <vgl-mesh-basic-material></vgl-mesh-basic-material>
        </template>
      </vgl-mesh>
    </vgl-scene>
  </template>
  <template #camera>
    <vgl-perspective-camera position="spherical" :position-radius="5"></vgl-perspective-camera>
  </template>
</vgl-renderer>

<!-- Register components and start vue -->
<script>
  new Vue({ el: "#my-canvas", components: VueGL });
</script>
```

[See the documentation](//vue-gl.github.io) for more information.

## Available components

[Components reference](//vue-gl.github.io/components/) shows a list of available
core components. [Example components reference](//vue-gl.github.io/examples/) also
introduces additional components you can use immediately.

The list of components not implemented yet can be found at [this project](https://github.com/vue-gl/vue-gl/projects/1).

## Contribution

Are you interested in enhance this product?
We're really glad and thanks a lot!  
See [Contributing guidelines](CONTRIBUTING.md) to get started.

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/vue-gl/vue-gl/graphs/contributors">
  <img src="https://opencollective.com/vue-gl/contributors.svg?width=890&button=false">
</a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/vue-gl/contribute)]

#### Individuals

<a href="https://opencollective.com/vue-gl"><img src="https://opencollective.com/vue-gl/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a
link to your website. [[Contribute](https://opencollective.com/vue-gl/contribute)]

<a href="https://opencollective.com/vue-gl/organization/0/website"><img src="https://opencollective.com/vue-gl/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/1/website"><img src="https://opencollective.com/vue-gl/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/2/website"><img src="https://opencollective.com/vue-gl/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/3/website"><img src="https://opencollective.com/vue-gl/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/4/website"><img src="https://opencollective.com/vue-gl/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/5/website"><img src="https://opencollective.com/vue-gl/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/6/website"><img src="https://opencollective.com/vue-gl/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/7/website"><img src="https://opencollective.com/vue-gl/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/8/website"><img src="https://opencollective.com/vue-gl/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/vue-gl/organization/9/website"><img src="https://opencollective.com/vue-gl/organization/9/avatar.svg"></a>

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvue-gl%2Fvue-gl?ref=badge_large)
