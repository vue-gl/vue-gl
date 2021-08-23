<template>
  <div>
    <vgl-renderer antialias>
      <template #scene>
        <vgl-scene>
          <vgl-mesh>
            <template #geometry>
              <vgl-icosahedron-geometry
                :radius="1"
                :detail="5"
              />
            </template>
            <template #material>
              <vgl-shader-material
                :wireframe="wireframe"
                :defines="defines"
                :uniforms="uniforms"
                :vertex-shader="vertexShader"
                :fragment-shader="fragmentShader"
              />
            </template>
          </vgl-mesh>
        </vgl-scene>
      </template>
      <template #camera>
        <vgl-perspective-camera
          position="spherical"
          :position-radius="5"
          :position-phi="0.8"
          :position-theta="0.2"
          rotation="lookAt"
        />
      </template>
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Shaders</h3>
        <label>
          Vertex Shader <button @click="vertShaderShown = !vertShaderShown">
            {{ vertShaderShown ? 'Hide' : 'Show' }}
          </button>
          <textarea
            v-show="vertShaderShown"
            v-model="vertexShader"
            rows="14"
            cols="50"
          />
        </label>
        <label>
          Fragment Shader <button @click="fragShaderShown = !fragShaderShown">
            {{ fragShaderShown ? 'Hide' : 'Show' }}
          </button>
          <textarea
            v-show="fragShaderShown"
            v-model="fragmentShader"
            rows="14"
            cols="50"
          />
        </label>
      </section>
      <section>
        <h3>Vert Shader Uniforms</h3>
        <table>
          <tr>
            <td>Offset</td><td>
              <input
                v-model.number="waveOffset"
                type="range"
                max="2"
                step="0.01"
              >
            </td>
          </tr>
          <tr>
            <td>Amplitude</td><td>
              <input
                v-model.number="waveAmp"
                type="range"
                max="2"
                step="0.01"
              >
            </td>
          </tr>
          <tr>
            <td>Frequency</td><td>
              <input
                v-model.number="waveFreq"
                type="range"
                max="50"
              >
            </td>
          </tr>
        </table>
        <label>
          <h3>Frag Shader Uniforms</h3>
          Frag Color
          <select v-model.number="displayColor">
            <option
              value="0"
              selected
            >Cartesian</option>
            <option value="1">Spherical</option>
            <option value="2">Depth</option>
          </select>
        </label>
        <label>
          <h3>Defines</h3>
          Scale
          <input
            v-model.number="scale"
            type="range"
            min="0.2"
            step="0.1"
            max="10"
          >
        </label>
        <label>
          <h3>Options</h3>
          Wireframe
          <input
            v-model="wireframe"
            type="checkbox"
          >
        </label>
      </section>
    </aside>
  </div>
</template>

<script>
import * as components from 'vue-gl';

const fragmentShader = `
  uniform int displayColor;

  varying vec4 vSpherical;
  varying vec4 vCartesian;

  void main() {
    if (displayColor == COLOR_CARTESIAN) {
      gl_FragColor = vCartesian;
    } else if (displayColor == COLOR_SPHERICAL) {
      gl_FragColor = vSpherical;
    } else if (displayColor == COLOR_DEPTH) {
      float depth = gl_FragCoord.z * gl_FragCoord.w;
      gl_FragColor = vec4(vec3(depth), 1.0);
    }
  }
`;

const vertexShader = `
  uniform float waveOffset;
  uniform float waveAmp;
  uniform float waveFreq;

  varying vec4 vCartesian;
  varying vec4 vSpherical;

  void main() {
    float r = length(position);
    float theta = acos(position.y / r); // inclination
    float phi = atan(position.z, position.x); // azimuth

    float finalR = r + sin((theta + waveOffset) * waveFreq) * waveAmp;
    vec4 finalPos = vec4(
      finalR * sin(theta) * cos(phi),
      finalR * cos(theta),
      finalR * sin(theta) * sin(phi),
      1.0 / SCALE
    );

    gl_Position = projectionMatrix * modelViewMatrix * finalPos;

    const float PI = 3.141592654;
    vCartesian = finalPos;
    vSpherical = vec4( // normalize values to [0, 1]
      r,
      theta / PI,
      ((phi / PI) + 1.0) / 2.0,
      1.0
    );
  }
`;

export default {
  components,
  data: () => ({
    scale: 1.0,
    waveOffset: 0.0,
    waveAmp: 0.2,
    waveFreq: 10,
    displayColor: 0,
    vertexShader,
    fragmentShader,
    vertShaderShown: false,
    fragShaderShown: false,
    wireframe: true,
  }),
  computed: {
    defines() {
      return {
        COLOR_CARTESIAN: 0,
        COLOR_SPHERICAL: 1,
        COLOR_DEPTH: 2,
        SCALE: Number.isInteger(this.scale) ? `${this.scale}.0` : this.scale,
      };
    },
    uniforms() {
      return {
        waveOffset: { value: this.waveOffset },
        waveAmp: { value: this.waveAmp },
        waveFreq: { value: this.waveFreq },
        displayColor: { value: this.displayColor },
      };
    },
  },
};
</script>
