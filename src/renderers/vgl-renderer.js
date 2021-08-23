/* globals globalThis */
import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from 'three';
import VglSlot from '../core/private/vgl-slot';
import {
  add, alpha, logarithmicDepthBuffer, antialias, noStencil, preserveDrawingBuffer, noDepth, scene,
  remove, shadowMapEnabled, precision, powerPreference, inst, camera, noPremultipliedAlpha, change,
} from '../constants';

const preferences = {
  highPerformance: 'high-performance', lowPower: 'low-power', default: 'default',
};

function serialize(object) {
  return Object.entries(object)
    .sort()
    .map((entry) => entry[1])
    .map((v) => {
      if (v === true) return 1;
      if (v === false) return 0;
      return v;
    });
}

function key(...objects) { return objects.flatMap(serialize).join(''); }

function attrs(vm, slot) {
  return {
    on: {
      [add](obj) {
        const target = vm[inst];
        target[slot] = obj;
        vm.$nextTick(vm.render);
      },
      [remove](obj) {
        if (vm[inst][slot] === obj) {
          const target = vm[inst];
          delete target[slot];
        }
      },
      [change]() { vm.$nextTick(vm.render); },
    },
  };
}

const resizeHooks = globalThis.ResizeObserver ? {
  created() { this.resizeObserver = new globalThis.ResizeObserver(this.render); },
  mounted() { this.resizeObserver.observe(this.$el); },
  updated() {
    this.resizeObserver.disconnect();
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
    if (this[inst].renderer) this[inst].renderer.dispose();
  },
} : {};

export default {
  props: {
    /** Whether the canvas contains an alpha (transparency) buffer or not. */
    [alpha]: Boolean,
    /** Whether the renderer will assume that colors have premultiplied alpha. */
    [noPremultipliedAlpha]: Boolean,
    /** Whether to perform antialiasing. */
    [antialias]: Boolean,
    /** Whether the drawing buffer has a stencil buffer of at least 8 bits. */
    [noStencil]: Boolean,
    /** Whether to preserve the buffers until manually cleared or overwritten. */
    [preserveDrawingBuffer]: Boolean,
    /** Whether the drawing buffer has a depth buffer of at least 16 bits. */
    [noDepth]: Boolean,
    /** Whether to use a logarithmic depth buffer. */
    [logarithmicDepthBuffer]: Boolean,
    /** If set, use shadow maps in the scene. */
    [shadowMapEnabled]: Boolean,
    /**
     * The shader precision.
     * @values highp, mediump, lowp
     */
    [precision]: { type: String, validator: (v) => ['highp', 'mediump', 'lowp'].includes(v) },
    /**
     * A hint to the user agent indicating what configuration of GPU is suitable
     * for this WebGL context.
     * @values highPerformance, lowPower, default
     */
    [powerPreference]: { type: String, default: 'default', validator: (v) => v in preferences },
  },
  computed: {
    [inst]() {
      return {
        parameters: {
          preserveDrawingBuffer: this[preserveDrawingBuffer],
          precision: this[precision],
          depth: !this[noDepth],
          alpha: this[alpha],
          stencil: !this[noStencil],
          logarithmicDepthBuffer: this[logarithmicDepthBuffer],
          antialias: this[antialias],
          powerPreference: preferences[this.powerPreference],
          premultipliedAlpha: !this[noPremultipliedAlpha],
        },
        shadowMap: { enabled: this[shadowMapEnabled] },
      };
    },
  },
  methods: {
    render() {
      if (this[inst].toBeRendered) return;
      this.$nextTick(() => {
        const { [inst]: obj, $el } = this;
        if (!obj.renderer) {
          obj.renderer = new WebGLRenderer({ canvas: $el, ...obj.parameters });
          Object.assign(obj.renderer.shadowMap, obj.shadowMap);
        }
        const { [scene]: s, [camera]: c, renderer: r } = obj;
        if (s && c) {
          const { clientWidth, clientHeight } = $el;
          let restore;
          if (c instanceof PerspectiveCamera) {
            const { aspect } = c;
            if (aspect === undefined) {
              restore = { aspect };
              c.aspect = clientWidth / clientHeight;
              c.updateProjectionMatrix();
            }
          } else if (c instanceof OrthographicCamera) {
            const {
              left, right, top, bottom,
            } = c;
            if ([left, right, top, bottom].includes(undefined)) {
              restore = {
                left, right, top, bottom,
              };
              if (![left, right].includes(undefined)) {
                const height = Math.abs(left - right) * (clientHeight / clientWidth);
                if (bottom !== undefined) c.top = bottom + height;
                else if (top !== undefined) c.bottom = top - height;
                else Object.assign(c, { top: height / 2, bottom: height / -2 });
              } else if (![top, bottom].includes(undefined)) {
                const width = Math.abs(top - bottom) * (clientWidth / clientHeight);
                if (left !== undefined) c.right = left + width;
                else if (right !== undefined) c.left = right - width;
                else Object.assign(c, { left: width / -2, right: width / 2 });
              } else {
                if (left !== undefined) c.right = left + clientWidth;
                else if (right !== undefined) c.left = right - clientWidth;
                else Object.assign(c, { left: clientWidth / -2, right: clientWidth / 2 });
                if (top !== undefined) c.bottom = top - clientHeight;
                else if (bottom !== undefined) c.top = bottom + clientHeight;
                else Object.assign(c, { top: clientHeight / 2, bottom: clientHeight / -2 });
              }
              c.updateProjectionMatrix();
            }
          }
          if (obj.clientWidth !== clientWidth || obj.clientHeight !== clientHeight) {
            Object.assign(obj, { clientWidth, clientHeight });
            r.setSize(clientWidth, clientHeight, false);
          }
          r.render(s, c);
          if (restore) Object.assign(c, restore);
        }
        obj.toBeRendered = 0;
      });
      this[inst].toBeRendered = 1;
    },
  },
  watch: {
    [inst](_, { renderer }) { if (renderer) renderer.dispose(); },
  },
  beforeDestroy() { if (this[inst].renderer) this[inst].renderer.dispose(); },
  render(h) {
    const { parameters, shadowMap } = this[inst];
    return h('canvas', { key: key(parameters, shadowMap) }, [
      h(VglSlot, attrs(this, camera),
        /** @slot The camera to project scene objects. */
        this.$slots[camera]),
      h(VglSlot, attrs(this, scene),
        /** @slot The scene to be rendered. */
        this.$slots[scene]),
      h('template',
        /**
         * @slot The default slot can contain any components but they won't be rendered directly.
         * One of relevant case is putting `<vgl-def>` components and use them in (as) the scene.
         */
        this.$slots.default),
    ]);
  },
  ...resizeHooks,
};
