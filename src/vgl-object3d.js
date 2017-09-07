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
        switch (typeof pos) {
            case "string":
            case "number":
                pos = (pos + "").trim().split(/\s+/);
            case "object":
                const isArray = Array.isArray(pos);
                return {
                    x: parseFloat(pos[isArray ? 0: "x"] || 0),
                    y: parseFloat(pos[isArray ? 1: "y"] || 0),
                    z: parseFloat(pos[isArray ? 2: "z"] || 0)
                };
        }
    }
}

function rotation(rot) {
    if (rot) {
        switch (typeof rot) {
            case "string":
            case "number":
                rot = (rot + "").trim().split(/\s+/);
            case "object":
                const isArray = Array.isArray(rot);
                let order = (rot[isArray ? 3: "order"] + "").trim();
                if (!/[XYZ]{3}/.test(order)) {
                    order = "XYZ";
                }
                return {
                    x: parseFloat(rot[isArray ? 0: "x"] || 0),
                    y: parseFloat(rot[isArray ? 1: "y"] || 0),
                    z: parseFloat(rot[isArray ? 2: "z"] || 0),
                    order
                };
        }
    }
}

function scale(s) {
    if (s) {
        switch (typeof s) {
            case "string":
                s = (s + "").trim().split(/\s+/);
            case "object":
                const isArray = Array.isArray(s);
                if (!(isArray && s.length === 1)) {
                    return {
                        x: parseFloat(s[isArray ? 0: "x"] || 0) || 1,
                        y: parseFloat(s[isArray ? 1: "y"] || 0) || 1,
                        z: parseFloat(s[isArray ? 2: "z"] || 0) || 1
                    };
                }
                s = parseFloat(s[0]);
            case "number":
                return {
                    x: s,
                    y: s,
                    z: s
                };
        }
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
