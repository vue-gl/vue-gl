import { BufferGeometry, BufferAttribute } from '../three.js';
import { string, floatArray } from '../validators.js';
import { parseArray } from '../parsers.js';

/**
 * This is the base mixin component for all geometry components,
 * corresponding [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry).
 * This can also be used directly for building custom geometries.
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** Name of the component. */
    name: string,
    /** The x, y, and z coordinates of each vertex in this geometry. */
    positionAttribute: floatArray,
    /** The red, green, and blue channels of vertex color of each vertex in this geometry. */
    colorAttribute: floatArray,
    /** The x, y, and z components of the vertex normal vector of each vertex in this geometry. */
    normalAttribute: floatArray,
  },
  computed: {
    inst: () => new BufferGeometry(),
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (this.positionAttribute) {
          const positionAttribute = oldInst
            ? oldInst.getAttribute('position')
            : new BufferAttribute(new Float32Array(parseArray(this.positionAttribute)), 3);
          inst.addAttribute('position', positionAttribute);
        }
        if (this.colorAttribute) {
          const colorAttribute = oldInst
            ? oldInst.getAttribute('color')
            : new BufferAttribute(new Float32Array(parseArray(this.colorAttribute)), 3);
          inst.addAttribute('color', colorAttribute);
        }
        if (this.normalAttribute) {
          const normalAttribute = oldInst
            ? oldInst.getAttribute('normal')
            : new BufferAttribute(new Float32Array(parseArray(this.normalAttribute)), 3);
          inst.addAttribute('normal', normalAttribute);
        }
        if (oldInst) oldInst.dispose();
        this.vglNamespace.geometries[this.name] = inst;
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { geometries }, inst } = this;
      if (geometries[oldName] === inst) delete geometries[oldName];
      geometries[name] = inst;
    },
    positionAttribute(positionAttribute) {
      const positionArray = parseArray(positionAttribute);
      const attributeObject = this.inst.getAttribute('position');
      if (attributeObject.array.length === positionArray.length) {
        attributeObject.copyArray(positionArray);
      } else {
        attributeObject.setArray(new Float32Array(positionArray));
      }
      attributeObject.needsUpdate = true;
    },
    colorAttribute(colorAttribute) {
      const colorArray = parseArray(colorAttribute);
      const attributeObject = this.inst.getAttribute('color');
      if (attributeObject.array.length === colorArray.length) {
        attributeObject.copyArray(colorArray);
      } else {
        attributeObject.setArray(new Float32Array(colorArray));
      }
      attributeObject.needsUpdate = true;
    },
    normalAttribute(normalAttribute) {
      const normalArray = parseArray(normalAttribute);
      const attributeObject = this.inst.getAttribute('normal');
      if (attributeObject.array.length === normalArray.length) {
        attributeObject.copyArray(normalArray);
      } else {
        attributeObject.setArray(new Float32Array(normalArray));
      }
      attributeObject.needsUpdate = true;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { geometries }, inst } = this;
    if (geometries[this.name] === inst) delete geometries[this.name];
    inst.dispose();
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
