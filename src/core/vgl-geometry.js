import { BufferGeometry, BufferAttribute } from 'three';
import { string, floatArray } from '../validators';
import { parseArray } from '../parsers';

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
          inst.setAttribute('position', positionAttribute);
        }
        if (this.colorAttribute) {
          const colorAttribute = oldInst
            ? oldInst.getAttribute('color')
            : new BufferAttribute(new Float32Array(parseArray(this.colorAttribute)), 3);
          inst.setAttribute('color', colorAttribute);
        }
        if (this.normalAttribute) {
          const normalAttribute = oldInst
            ? oldInst.getAttribute('normal')
            : new BufferAttribute(new Float32Array(parseArray(this.normalAttribute)), 3);
          inst.setAttribute('normal', normalAttribute);
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
      let attributeObject = this.inst.getAttribute('position');
      if (attributeObject.array.length === positionArray.length) {
        attributeObject.copyArray(positionArray);
      } else {
        /* itemSize / array length is different from previous..
        recreate new Buffer and restore version */
        const previousVersion = attributeObject.version;
        attributeObject = new BufferAttribute(new Float32Array(positionArray), 3);
        attributeObject.version = previousVersion;
        this.inst.setAttribute('position', attributeObject);
      }
      attributeObject.needsUpdate = true;
    },
    colorAttribute(colorAttribute) {
      const colorArray = parseArray(colorAttribute);
      let attributeObject = this.inst.getAttribute('color');
      if (attributeObject.array.length === colorArray.length) {
        attributeObject.copyArray(colorArray);
      } else {
        /* itemSize / array length is different from previous..
        recreate new Buffer and restore version */
        const previousVersion = attributeObject.version;
        attributeObject = new BufferAttribute(new Float32Array(colorArray), 3);
        attributeObject.version = previousVersion;
        this.inst.setAttribute('color', attributeObject);
      }
      attributeObject.needsUpdate = true;
    },
    normalAttribute(normalAttribute) {
      const normalArray = parseArray(normalAttribute);
      let attributeObject = this.inst.getAttribute('normal');
      if (attributeObject.array.length === normalArray.length) {
        attributeObject.copyArray(normalArray);
      } else {
        /* itemSize / array length is different from previous..
        recreate new Buffer and restore version */
        const previousVersion = attributeObject.version;
        attributeObject = new BufferAttribute(new Float32Array(normalArray), 3);
        attributeObject.version = previousVersion;
        this.inst.setAttribute('normal', attributeObject);
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
