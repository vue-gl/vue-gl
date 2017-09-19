import VglAssets from "./vgl-assets.js";
import {parseVector3, parseEuler} from "./utils.js";
import {Object3D} from "./three.js";

function findParent(vm) {
    const parent = vm.$parent;
    if (parent) {
        if (parent.$options.isVglObject3d) {
            return parent;
        }
        return findParent(parent);
    }
}

export default {
    isVglObject3d: true,
    mixins: [VglAssets],
    props: [
        "name",
        "position",
        "rotation",
        "scale"
    ],
    computed: {
        inst: () => new Object3D()
    },
    created() {
        const inst = this.inst;
        if (this.position) inst.position.copy(parseVector3(this.position));
        if (this.rotation) inst.rotation.copy(parseEuler(this.rotation));
        if (this.scale) inst.scale.copy(parseVector3(this.scale));
        const parent = findParent(this);
        if (parent) {
            parent.inst.add(inst);
        }
    },
    beforeDestroy() {
        const inst = this.inst;
        if (inst.parent) {
            inst.parent.remove(inst);
        }
    },
    watch: {
        position(pos) {
            this.inst.position.copy(parseVector3(pos));
        },
        rotation(rot) {
            this.inst.rotation.copy(parseEuler(rot));
        },
        scale(s) {
            this.inst.scale.copy(parseVector3(s || 1));
        },
        inst(inst, oldInst) {
            if (oldInst.children.length) inst.add(...oldInst.children);
            inst.position.copy(oldInst.position);
            inst.rotation.copy(oldInst.rotation);
            inst.scale.copy(oldInst.scale);
            const parent = oldInst.parent;
            if (parent) {
                parent.remove(oldInst);
                parent.add(inst);
            }
        }
    }
};
