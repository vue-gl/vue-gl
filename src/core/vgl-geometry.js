import { BufferGeometry, BufferAttribute } from 'three';
import { name, floatArray } from '../types';
import { validateName, validateFloatArray } from '../validators';
import { parseArray } from '../parsers';

/**
 * This is the base mixin component for all geometry components,
 * corresponding [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry).
 * This can also be used directly for building custom geometries.
 */

export default {
  inject: {
    vglNamespace: {
      default() { throw new Error('VueGL components must be wraped by VglNamespace component.'); },
    },
  },
  props: {
    /** Name of the component. */
    name: { type: name, required: true, validator: validateName },
    /** The x, y, and z coordinates of each vertex in this geometry. */
    positionAttribute: { type: floatArray, validator: validateFloatArray },
    /** The red, green, and blue channels of vertex color of each vertex in this geometry. */
    colorAttribute: { type: floatArray, validator: validateFloatArray },
    /** The x, y, and z components of the vertex normal vector of each vertex in this geometry. */
    normalAttribute: { type: floatArray, validator: validateFloatArray },
  },
  computed: {
    /** The THREE.BufferGeometry instance. */
    inst: () => new BufferGeometry(),
  },
  methods: {
    /**
     * Emit an event in `geometries` namespace. Call this method after editing instance's
     * properties.
     */
    update() {
      if (this.name !== undefined) this.vglNamespace.geometries.emit(this.name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.name !== undefined) this.vglNamespace.geometries.delete(this.name, this.inst);
    this.inst.dispose();
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
        this.vglNamespace.geometries.set(this.name, inst);
      },
      immediate: true,
    },
    name(newName, oldName) {
      if (oldName !== undefined) this.vglNamespace.geometries.delete(oldName, this.inst);
      if (newName !== undefined) this.vglNamespace.geometries.set(newName, this.inst);
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
      this.update();
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
      this.update();
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
      this.update();
    },
  },
  render(h) {
    if (!this.$slots.default) return undefined;
    return h('div', { style: { display: 'none' } }, this.$slots.default);
  },
};
