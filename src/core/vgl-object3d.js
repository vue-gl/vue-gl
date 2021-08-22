import { Object3D } from 'three';
import VglSlotable from './private/vgl-slotable';
import VglSlotHolder from './private/vgl-slot-holder';
import {
  add, castShadow, hidden, inst, lookAtX, lookAtY, lookAtZ, name, position, positionPhi, lookAt,
  positionRadius, positionTheta, positionX, positionY, positionZ, receiveShadow, remove, rotation,
  rotationOrder, rotationW, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ, euler,
  quaternion, rectangular, spherical,
} from '../constants';

function chars(order) { return order.trim().toUpperCase().split(/\s*/); }

/** A basic object representation. */
export default {
  mixins: [VglSlotable, VglSlotHolder],
  props: {
    /**
     * The coodinate system to determine the object position.
     * @values 'rectangular', 'spherical'
     */
    [position]: {
      type: String,
      default: rectangular,
      validator: (p) => [rectangular, spherical].includes(p),
    },
    /** The x coordinate of the object's local position. */
    [positionX]: { type: Number, default: 0 },
    /** The y coordinate of the object's local position. */
    [positionY]: { type: Number, default: 0 },
    /** The z coordinate of the object's local position. */
    [positionZ]: { type: Number, default: 0 },
    /** The Euclidian distance from the origin to the object's local position. */
    [positionRadius]: { type: Number, default: 1 },
    /** The polar angle from y axis to the object's local position. */
    [positionPhi]: { type: Number, default: 0 },
    /** The equator angle around y axis to the object's local position. */
    [positionTheta]: { type: Number, default: 0 },
    /**
     * The rotation representing method.
     * @values 'euler', 'quaternion', 'lookAt'
     */
    [rotation]: {
      type: String,
      default: euler,
      validator: (r) => [euler, quaternion, lookAt].includes(r),
    },
    /** The x coordinate of the object's local rotation. */
    [rotationX]: { type: Number, default: 0 },
    /** The y coordinate of the object's local rotation. */
    [rotationY]: { type: Number, default: 0 },
    /** The z coordinate of the object's local rotation. */
    [rotationZ]: { type: Number, default: 0 },
    /** The w coordinate of the object's local rotation. */
    [rotationW]: { type: Number, default: 1 },
    /** The rotation order of the object's local rotation. */
    [rotationOrder]: {
      type: String,
      default: 'XYZ',
      validator: (order) => chars(order).sort().join('') === 'XYZ',
    },
    /** The global x coodinate of a point the object to face. */
    [lookAtX]: { type: Number, default: 0 },
    /** The global y coodinate of a point the object to face. */
    [lookAtY]: { type: Number, default: 0 },
    /** The global z coodinate of a point the object to face. */
    [lookAtZ]: { type: Number, default: 0 },
    /** The x coordinate of the object's local scale. */
    [scaleX]: { type: Number, default: 1 },
    /** The y coordinate of the object's local scale. */
    [scaleY]: { type: Number, default: 1 },
    /** The z coordinate of the object's local scale. */
    [scaleZ]: { type: Number, default: 1 },
    /** Whether the object gets rendered into the shadow map. */
    [castShadow]: Boolean,
    /** Whether the material receives shadows. */
    [receiveShadow]: Boolean,
    /** An arbitrary name of the instance. */
    [name]: { type: String, default: '' },
    /** The object visibility. */
    [hidden]: Boolean,
  },
  computed: {
    /** The THREE.Object3D instance. */
    [inst]: () => new Object3D(),
  },
  watch: {
    [inst](obj, {
      position: p, rotation: r, scale, castShadow: cs, receiveShadow: rs, visible, name: n,
    }) {
      obj.position.copy(p);
      obj.rotation.copy(r);
      obj.scale.copy(scale);
      Object.assign(obj, {
        castShadow: cs, receiveShadow: rs, visible, name: n,
      });
    },
    [name]: { handler(n) { this[inst].name = n; }, immediate: true },
    [positionX](x) {
      if (this[position] === rectangular) {
        this[inst].position.x = x;
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [positionY](y) {
      if (this[position] === rectangular) {
        this[inst].position.y = y;
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [positionZ](z) {
      if (this[position] === rectangular) {
        this[inst].position.z = z;
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [positionRadius](r) {
      if (this[position] === spherical) {
        this[inst].position.setFromSphericalCoords(r, this[positionPhi], this[positionTheta]);
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [positionPhi](p) {
      if (this[position] === spherical) {
        this[inst].position.setFromSphericalCoords(this[positionRadius], p, this[positionTheta]);
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [positionTheta](t) {
      if (this[position] === spherical) {
        this[inst].position.setFromSphericalCoords(this[positionRadius], this[positionPhi], t);
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      }
    },
    [position]: {
      handler(p) {
        if (p === rectangular) {
          this[inst].position.set(this[positionX], this[positionY], this[positionZ]);
        } else {
          this[inst].position.setFromSphericalCoords(
            this[positionRadius], this[positionPhi], this[positionTheta],
          );
        }
        if (this[rotation] === lookAt) {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      },
      immediate: true,
    },
    [rotation]: {
      handler(r) {
        if (r === euler) {
          this[inst].rotation.set(
            this[rotationX], this[rotationY], this[rotationZ], chars(this[rotationOrder]).join(''),
          );
        } else if (r === quaternion) {
          this[inst].quaternion.set(
            this[rotationX], this[rotationY], this[rotationZ], this[rotationW],
          );
        } else {
          this[inst].lookAt(this[lookAtX], this[lookAtY], this[lookAtZ]);
        }
      },
      immediate: true,
    },
    [rotationX](x) {
      if (this[rotation] === euler) this[inst].rotation.x = x;
      else if (this[rotation] === quaternion) this[inst].quaternion.x = x;
    },
    [rotationY](y) {
      if (this[rotation] === euler) this[inst].rotation.y = y;
      else if (this[rotation] === quaternion) this[inst].quaternion.y = y;
    },
    [rotationZ](z) {
      if (this[rotation] === euler) this[inst].rotation.z = z;
      else if (this[rotation] === quaternion) this[inst].quaternion.z = z;
    },
    [rotationW](w) { if (this[rotation] === quaternion) this[inst].quaternion.w = w; },
    [rotationOrder](order) {
      if (this[rotation] === euler) this[inst].rotation.order = chars(order).join('');
    },
    [lookAtX](x) {
      if (this[rotation] === lookAt) this[inst].lookAt(x, this[lookAtY], this[lookAtZ]);
    },
    [lookAtY](y) {
      if (this[rotation] === lookAt) this[inst].lookAt(this[lookAtX], y, this[lookAtZ]);
    },
    [lookAtZ](z) {
      if (this[rotation] === lookAt) this[inst].lookAt(this[lookAtX], this[lookAtY], z);
    },
    [scaleX]: { handler(x) { this[inst].scale.x = x; }, immediate: true },
    [scaleY]: { handler(y) { this[inst].scale.y = y; }, immediate: true },
    [scaleZ]: { handler(z) { this[inst].scale.z = z; }, immediate: true },
    [castShadow]: { handler(cs) { this[inst].castShadow = cs; }, immediate: true },
    [receiveShadow]: { handler(rs) { this[inst].receiveShadow = rs; }, immediate: true },
    [hidden]: { handler(h) { this[inst].visible = !h; }, immediate: true },
  },
  methods: {
    [add](slot, obj) { if (slot === 'default') this[inst].add(obj); },
    [remove](slot, obj) { if (slot === 'default') this[inst].remove(obj); },
  },
  /**
   * Objects defined in the slot will be handled as decsendants.
   * @slot default
   */
  render: undefined,
};
