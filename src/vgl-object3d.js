import {parseVector3, parseEuler, findParent} from "./utils.js";
import {Object3D, Vector3, Euler} from "./three.js";

const defaultPosition = new Vector3();
const defaultRotation = new Euler();
const defaultScale = new Vector3(1, 1, 1);

export default {
    isVglObject3d: true,
    props: {
        position: {
            type: [String, Vector3],
            default: () => defaultPosition
        },
        rotation: {
            type: [String, Euler],
            default: () => defaultRotation
        },
        scale: {
            type: [String, Vector3],
            default: () => defaultScale
        }
    },
    computed: {
        inst: () => new Object3D()
    },
    created() {
        parseVector3(this.position, this.inst.position);
        parseEuler(this.rotation, this.inst.rotation);
        parseVector3(this.scale, this.inst.scale);
        const parent = findParent(this, "isVglObject3d");
        if (parent) parent.inst.add(this.inst);
    },
    beforeDestroy() {
        if (this.inst.parent) this.inst.parent.remove(this.inst);
    },
    watch: {
        position(position) {
            parseVector3(position || defaultPosition, this.inst.position);
        },
        rotation(rotation) {
            parseEuler(rotation || defaultRotation, this.inst.rotation);
        },
        scale(scale) {
            parseVector3(scale || defaultScale, this.inst.scale);
        },
        inst(inst, oldInst) {
            if (oldInst.children.length) inst.add(...oldInst.children);
            inst.position.copy(oldInst.position);
            inst.rotation.copy(oldInst.rotation);
            inst.scale.copy(oldInst.scale);
            if (oldInst.parent) oldInst.parent.remove(oldInst).add(inst);
        }
    },
    render(h) {
        if (this.$slots.default) return h("div", this.$slots.default);
    }
};
