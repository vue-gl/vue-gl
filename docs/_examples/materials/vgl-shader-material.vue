<template>
  <div>
    <vgl-renderer antialias>
      <vgl-scene>
        <vgl-icosahedron-geometry
          name="geo"
          radius="1"
          detail="5"
        />
        <vgl-shader-material
          ref="mat"
          name="mat"
          wireframe
          :defines="defines"
          :uniforms="uniforms"
          :vertex-shader="vertexShader"
          :fragment-shader="fragmentShader"
        />
        <vgl-mesh
          geometry="geo"
          material="mat"
        />
      </vgl-scene>
      <vgl-perspective-camera orbit-position="5 0.8 0.2" />
    </vgl-renderer>

    <aside class="control-panel">
      <section>
        <h3>Shaders</h3>
        <label>
          Vertex Shader [<a @click="vertShaderShown = !vertShaderShown">
            {{ vertShaderShown ? 'Hide' : 'Show' }}
          </a>]
        </label>
        <textarea
          v-model="vertexShader"
          :style="{display: vertShaderShown ? &quot;block&quot; : &quot;none&quot;}"
          rows="14"
          cols="50"
        />
        <label>
          Fragment Shader [<a @click="fragShaderShown = !fragShaderShown">
            {{ fragShaderShown ? 'Hide' : 'Show' }}
          </a>]
        </label>
        <textarea
          v-model="fragmentShader"
          :style="{display: fragShaderShown ? &quot;block&quot; : &quot;none&quot;}"
          rows="14"
          cols="50"
        />
      </section>
      <section>
        <h3>Vert Shader Uniforms</h3>
        <table>
          <tr>
            <td>Offset</td><td>
              <input
                v-model.number="uniforms.waveOffset.value"
                class="slider"
                type="range"
                max="2"
                step="0.01"
              >
            </td>
          </tr>
          <tr>
            <td>Amplitude</td><td>
              <input
                v-model.number="uniforms.waveAmp.value"
                class="slider"
                type="range"
                max="2"
                step="0.01"
              >
            </td>
          </tr>
          <tr>
            <td>Frequency</td><td>
              <input
                v-model.number="uniforms.waveFreq.value"
                class="slider"
                type="range"
                max="50"
              >
            </td>
          </tr>
        </table>
        <label>
          <h3>Frag Shader Uniforms</h3>
          Frag Color
          <select v-model.number="uniforms.displayColor.value">
            <option
              value="0"
              selected
            >Cartesian</option>
            <option value="1">Spherical</option>
            <option value="2">Depth</option>
          </select>
        </label>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    vertShaderShown: false,
    fragShaderShown: false,
    defines: {
      COLOR_CARTESIAN: 0,
      COLOR_SPHERICAL: 1,
      COLOR_DEPTH: 2,
    },
    uniforms: {
      waveOffset: { value: 0.0 },
      waveAmp: { value: 0.2 },
      waveFreq: { value: 10 },
      displayColor: { value: 0 },
    },
    vertexShader: `

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
    1.0
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

      `.trim(),
    fragmentShader: `

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

      `.trim(),
  }),
};
</script>
