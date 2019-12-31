import { ShaderMaterial } from 'three';
import { VglMaterialWithMap } from '../mixins';
import { boolean, string, float } from '../types';

/**
 * A material for drawing geometries with custom vertex or fragment shaders, corresponding to
 * [THREE.ShaderMaterial](https://threejs.org/docs/index.html#api/materials/ShaderMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as a mixin.
 *
 * Note that some of these properties are not efficient to update. See
 * [here](https://threejs.org/docs/#manual/en/introduction/How-to-update-things) for some caveats
 * about updating material state.
 */

export default {
  mixins: [VglMaterialWithMap],

  props: {
    /**
     * Defines custom constants using `#define` directives within the GLSL code for both the vertex
     * shader and the fragment shader; each key/value pair yields another directive:
     * ```
     * defines: {
     *     FOO: 15,
     *     BAR: true
     * }
     * ```
     * yields the lines
     * ```
     * #define FOO 15
     * #define BAR true
     * ```
     * in the GLSL code.
     * @default {}
     */
    defines: { type: Object, default: () => ({}) },
    /**
     * Define whether the material color is affected by global fog settings; true to pass fog
     * uniforms to the shader. Note that changing this value will cause the material to be
     * reconstructed, so be aware of performance if using this reactively. Also note that when using
     * this, THREE expects fog-related uniforms to be defined on your material; you can use
     * something like the following to include them:
     * ```
     * uniforms: THREE.UniformsUtils.merge([
     *    THREE.UniformsLib['fog'],
     *    { other uniforms... }
     * ]),
     * ```
     */
    fog: { type: boolean, default: false },
    /**
     * Fragment shader GLSL code. This is the actual code for the shader.
     * @default The default fragment shader provided by three.js
     */
    fragmentShader: { type: string },
    /**
     * Defines whether this material uses lighting; true to pass uniform data related to lighting to
     * this shader. Note that changing this value will cause the material to be reconstructed, so be
     * aware of performance if using this reactively. Also note that when using this, THREE expects
     * lighting-related uniforms to be defined on your material; you can use something like the
     * following to include them:
     * ```
     * uniforms: THREE.UniformsUtils.merge([
     *    THREE.UniformsLib['lights'],
     *    { other uniforms... }
     * ]),
     * ```
     */
    lights: { type: boolean, default: false },
    /**
     * Controls wireframe thickness. Due to limitations of the OpenGL Core Profile with the WebGL
     * renderer on most platforms `linewidth` will always be 1 regardless of the set value.
     */
    linewidth: { type: float, default: 1.0 },
    /** Define whether the material is rendered with flat shading. */
    flatShading: { type: boolean, default: false },
    /**
     * An object of the form:
     * ```
     * { "uniform1": { value: 1.0 }, "uniform2": { value: 2 } }
     * ```
     * specifying the uniforms to be passed to the shader code; keys are uniform names, values are
     * definitions of the form
     * ```
     * { value: 1.0 }
     * ```
     * where value is the value of the uniform. Names must match the name of the uniform, as defined
     * in the GLSL code. Note that uniforms are refreshed on every frame, so updating the value of
     * the uniform will immediately update the value available to the GLSL code. */
    uniforms: { type: Object, default: () => ({}) },
    /**
     * Vertex shader GLSL code. This is the actual code for the shader.
     * @default The default vertex shader provided by three.js
     */
    vertexShader: { type: string },
    /**
     * Render geometry as wireframe (using `GL_LINES` instead of `GL_TRIANGLES`).
     */
    wireframe: { type: boolean, default: false },
    /**
     * Controls wireframe thickness. Due to limitations of the OpenGL Core Profile with the WebGL
     * renderer on most platforms `linewidth` will always be 1 regardless of the set value.
     */
    wireframeLinewidth: { type: float, default: 1.0 },
  },

  computed: {
    /** The THREE.ShaderMaterial instance. */
    inst() {
      return new ShaderMaterial({
        fog: this.fog,
        lights: this.lights,
      });
    },
  },

  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          defines: this.defines,
          fog: this.fog,
          fragmentShader: this.fragmentShader || inst.fragmentShader,
          lights: this.lights,
          linewidth: parseFloat(this.linewidth),
          flatShading: this.flatShading,
          uniforms: this.uniforms,
          vertexShader: this.vertexShader || inst.vertexShader,
          wireframe: this.wireframe,
          wireframeLinewidth: parseFloat(this.wireframeLinewidth),
        });
      },
      immediate: true,
    },
    defines: {
      handler(defines) {
        this.inst.defines = defines;
        this.update();
      },
      deep: true,
    },
    fragmentShader(fragmentShader) {
      this.inst.fragmentShader = fragmentShader;
      this.update();
    },
    linewidth(linewidth) {
      this.inst.linewidth = parseFloat(linewidth);
      this.update();
    },
    flatShading(flatShading) {
      this.inst.flatShading = flatShading;
      this.update();
    },
    uniforms: {
      handler(uniforms) {
        this.inst.uniforms = uniforms;
        this.update();
      },
      deep: true,
    },
    vertexShader(vertexShader) {
      this.inst.vertexShader = vertexShader;
      this.update();
    },
    wireframe(wireframe) {
      this.inst.wireframe = wireframe;
      this.update();
    },
    wireframeLinewidth(wireframeLinewidth) {
      this.inst.wireframeLinewidth = parseFloat(wireframeLinewidth);
      this.update();
    },
  },
};
