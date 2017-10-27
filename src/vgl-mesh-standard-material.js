import VglMaterial from "./vgl-material.js";
import {MeshStandardMaterial} from "./three.js";
import {validatePropString} from "./utils.js";

function update(vm) {
    vm.inst.dispatchEvent({type: "update"});
}

export default {
    mixins: [VglMaterial],
    props: {
        color: {
            type: validatePropString,
            default: "#fff"
        },
        map: validatePropString
    },
    inject: ["vglTextures"],
    computed: {
        inst: () => new MeshStandardMaterial(),
        tex() {
            return this.vglTextures.forGet[this.map] || null;
        }
    },
    watch: {
        color: {
            handler(color) {
                this.inst.color.setStyle(color);
                update(this);
            },
            immediate: true
        },
        tex: {
            handler(texture) {
                this.inst.map = texture;
                update(this);
            },
            immediate: true
        }
    }
};
