import VglObject3d from "./vgl-object3d.js";
import {DirectionalLightHelper, Object3D} from "./three.js";
import {validatePropString, validatePropNumber, parseFloat_, findParent} from "./utils.js";

export default {
    mixins: [VglObject3d],
    props: {
        color: {
            type: validatePropString
        },
        size: {
            type: validatePropNumber,
            default: 1
        }
    },
    computed: {
        inst() {
            if (this.c !== false) {
                const p = findParent(this, "isVglObject3d");
                if (p) {
                    this.p = p.inst.color;
                    return new DirectionalLightHelper(p.inst, parseFloat_(this.size), this.c);
                }
            }
            this.p = null;
            return new Object3D();
        },
        hex() {
            return this.p && this.p.getHex();
        }
    },
    created() {
        this.c = this.color;
    },
    data() {
        return {
            c: false,
            p: null
        };
    },
    watch: {
        color(color) {
            this.inst.color = color;
            this.inst.update();
        },
        hex(hex) {
            if (hex && !this.color) this.inst.update();
        }
    }
};
