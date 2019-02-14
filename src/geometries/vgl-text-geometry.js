import VglExtrudeGeometry from './vgl-extrude-geometry';
import { TextBufferGeometry, BufferGeometry, FontLoader } from '../three';
import { number, string, boolean } from '../validators';

const fonts = Object.create(null);

/**
 * A component for generating text as a single geometry,
 * corresponding [THREE.TextGeometry](https://threejs.org/docs/index.html#api/geometries/TextGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglExtrudeGeometry],
  props: {
    /** The text that needs to be shown. */
    text: { type: string, default: '' },
    /** The path or URL to the facetype json file. This can also be a Data URI. */
    font: string,
    /** Size of the text. */
    size: { type: number, default: 100 },
    /** Thickness to extrude text. */
    height: { type: number, default: 50 },
    /** Number of points on the curves. */
    curveSegments: { type: number, default: 12 },
    /** Turn on bevel. */
    bevelEnabled: boolean,
    /** How deep into text bevel goes. */
    bevelThickness: { type: number, default: 10 },
    /** How far from text outline is bevel. */
    bevelSize: { type: number, default: 8 },
    /** Number of bevel segments. */
    bevelSegments: { type: number, default: 3 },
  },
  data() { return { f: undefined }; },
  computed: {
    inst() {
      return this.f !== undefined ? new TextBufferGeometry(this.text, {
        font: fonts[this.f],
        size: parseFloat(this.size),
        height: parseFloat(this.height),
        curveSegments: parseInt(this.curveSegments, 10),
        bevelEnabled: this.bevelEnabled,
        bevelThickness: parseFloat(this.bevelThickness),
        bevelSize: parseFloat(this.bevelSize),
        bevelSegments: parseInt(this.bevelSegments, 10),
      }) : new BufferGeometry();
    },
  },
  watch: {
    font: {
      handler(src) {
        if (!fonts[src]) {
          fonts[src] = [() => {
            if (src === this.font) this.f = src;
            this.vglNamespace.update();
          }];
          new FontLoader().load(src, (font) => {
            const queue = fonts[src];
            fonts[src] = font;
            queue.forEach((f) => { f(); });
          });
        } else if (fonts[src].isFont) {
          this.f = src;
        } else {
          fonts[src].push(() => { if (src === this.font) this.f = src; });
        }
      },
      immediate: true,
    },
  },
};
