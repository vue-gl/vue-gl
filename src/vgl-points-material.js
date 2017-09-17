import VglMaterial from "./vgl-material.js";
import {PointsMaterial} from "./three.js";

export default {
    mixins: [VglMaterial],
    props: [
        "color",
        "size",
        "sizeAttenuation"
    ],
    computed: {
        inst: () => new PointsMaterial()
    },
    created() {
        if (this.color) this.inst.color.setStyle(this.color);
        if (this.size) this.inst.size = parseFloat(this.size);
        if (this.sizeAttenuation !== undefined) this.inst.sizeAttenuation = this.sizeAttenuation;
    },
    watch: {
        color(c) {
            this.inst.color.setStyle(c);
        },
        size(s) {
            this.inst.size = parseFloat(s);
        },
        sizeAttenuation(a) {
            this.inst.sizeAttenuation = a;
        }
    }
};
