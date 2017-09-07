import VglAbstract from "./vgl-abstract.js";

import {Object3D} from "./three.js";

function findParent(vm) {
    const parent = vm.$parent;
    if (parent) {
        if (parent.$options.isVgl && parent.inst && parent.inst.isObject3D) {
            return parent;
        }
        return findParent(parent);
    }
}

function position(pos) {
    if (pos) {
        if (typeof pos === "string") {
            pos = pos.trim().split(/\s+/);
        }
        if (typeof pos === "number") {
            pos = [pos];
        }
        if (Array.isArray(pos)) {
            return {
                x: parseFloat(pos[0] || 0),
                y: parseFloat(pos[1] || 0),
                z: parseFloat(pos[2] || 0)
            };
        }
        if (typeof pos === "object") {
            return {
                x: parseFloat(pos.x || 0),
                y: parseFloat(pos.y || 0),
                z: parseFloat(pos.z || 0)
            };
        }
    }
}

function rotation(rot) {
    if (rot) {
    if (Array.isArray(rot)) {
        const xyz = rot.slice(0, 3).map((item) => parseFloat(item));
        xyz.length = 3;
        const order = Euler.RotationOrders.indexOf((rot[3] + "").trim()) < 0 ? "XYZ": rot[3].trim();
        return new Euler(...xyz, order);
    }
    if (typeof rot === "object") {
        const order = Euler.RotationOrders.indexOf((rot.order + "").trim()) < 0 ? "XYZ": rot.order.trim();
        return new Euler(parseFloat(rot.x), parseFloat(rot.y), parseFloat(rot.z), order);
    }
    const xyzo = (rot + "").trim().split(/\s+/);
    const xyz = xyzo.slice(0, 3).map((item) => parseFloat(item));
    xyz.length = 3;
    const order = Euler.RotationOrders.indexOf(xyzo[3]) < 0 ? "XYZ": xyzo[3];
    return new Euler(...xyz, order);
    }
}

function scale(s) {
    if (s) {
    if (Array.isArray(s)) {
        if (!s.length) {
            return new Vector3(1, 1, 1);
        }
        if (s.length < 2) {
            const t = parseFloat(s[0]) || 1;
            return new Vector3(t, t, t);
        }
        const arr = s.length < 3 ? [...s, 1]: s;
        return new Vector3(...arr.map((item) => parseFloat(item) || 1));
    }
    if (typeof s === "object") {
        return new Vector3(parseFloat(s.x) || 1, parseFloat(s.y) || 1, parseFloat(s.z) || 1);
    }
    const arr = (s + "").trim().split(/\s+/);
    if (arr.length < 2) {
        const t = parseFloat(arr[0]) || 1;
        return new Vector3(t, t, t);
    }
    if (arr.length < 3) {
        arr.push(1);
    }
    return new Vector3(...arr.map((item) => parseFloat(item) || 1));
    }
}

function setValues(obj, properties) {
    if (properties) {
        Object.keys(properties).forEach((key) => {
            obj[key] = properties[key];
        });
    }
}

export default {
    mixins: [VglAbstract],
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
        setValues(inst.position, position(this.position));
        setValues(inst.rotation, rotation(this.rotation));
        setValues(inst.scale, scale(this.scale));
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
            setValues(this.inst.position, position(pos));
        },
        rotation(rot) {
            setValues(this.inst.rotation, rotation(rot));
        },
        scale(s) {
            setValues(this.inst.scale, scale(s));
        },
        inst(inst, oldInst) {
            inst.add(...oldInst.children);
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
