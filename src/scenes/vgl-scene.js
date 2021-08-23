import { Color, Scene } from 'three';
import VglObject3d from '../core/vgl-object3d';
import {
  add, background, environment, fog, inst, overrideMaterial, remove,
} from '../constants';

export default {
  mixins: [VglObject3d],
  props: {
    /**
     * The background color of the scene.
     * It is overwritten if the background slot is not empty.
     */
    [background]: [String, Number],
  },
  computed: {
    /** The THREE.Scene instance. */
    [inst]: () => new Scene(),
  },
  watch: {
    [background]: {
      handler(c) {
        if (c === undefined) return;
        if (!this[inst].background) this[inst].background = new Color(c);
        else if (this[inst].background instanceof Color) this[inst].background.set(c);
      },
      immediate: true,
    },
  },
  methods: {
    [add](slot, obj) {
      if (slot === fog) this[inst].fog = obj;
      else if (slot === overrideMaterial) this[inst].overrideMaterial = obj;
      else if (slot === environment) this[inst].environment = obj;
      else if (slot === background) this[inst].background = obj;
      else VglObject3d.methods[add].call(this, slot, obj);
    },
    [remove](slot, obj) {
      if (slot === fog) {
        if (this[inst].fog === obj) this[inst].fog = null;
      } else if (slot === overrideMaterial) {
        if (this[inst].overrideMaterial === obj) this[inst].overrideMaterial = null;
      } else if (slot === environment) {
        if (this[inst].environment === obj) this[inst].environment = null;
      } else if (slot === background) {
        if (this[inst].background === obj) {
          this[inst].background = this[background] ? new Color(this[background]) : null;
        }
      } else VglObject3d.methods[remove].call(this, slot, obj);
    },
  },
  /**
   * @slot fog
   */
  /**
   * @slot overrideMaterial
   */
  /**
   * @slot background
   */
  /**
   * @slot environment
   */
  render: undefined,
};
