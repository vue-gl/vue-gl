import { ShaderMaterial } from 'three';
import defaultFragment from 'three/src/renderers/shaders/ShaderChunk/default_fragment.glsl';
import defaultVertex from 'three/src/renderers/shaders/ShaderChunk/default_vertex.glsl';
import VglMaterial from './vgl-material';
import {
  fragmentShader, inst, uniforms, vertexShader, wireframe,
} from '../constants';

export default {
  mixins: [VglMaterial],
  props: {
    /** The fragment shader GLSL code. */
    [fragmentShader]: { type: String, default: defaultFragment },
    /**
     * An uniform definition object.
     * To trigger re-rendering properly, you should pass a new object rather than overwriting the
     * originally passed object.
     */
    [uniforms]: { type: Object, default: () => ({}) },
    /** The vertex shader GLSL code. */
    [vertexShader]: { type: String, default: defaultVertex },
    /** Whether geometries to be rendered as wireframe or not. */
    [wireframe]: Boolean,
  },
  computed: {
    /** The THREE.ShaderMaterial instance. */
    [inst]: () => new ShaderMaterial(),
  },
  watch: {
    [fragmentShader]: {
      handler(f) { Object.assign(this[inst], { fragmentShader: f, needsUpdate: true }); },
      immediate: true,
    },
    [vertexShader]: {
      handler(v) { Object.assign(this[inst], { vertexShader: v, needsUpdate: true }); },
      immediate: true,
    },
    [uniforms]: { handler(u) { Object.assign(this[inst].uniforms, u); }, immediate: true },
    [wireframe]: { handler(w) { this[inst].wireframe = w; }, immediate: true },
  },
};
