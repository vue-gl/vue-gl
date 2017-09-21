import VglMaterial from "./vgl-material.js";
import {LineBasicMaterial} from "./three.js";
import {parseNumber} from "./utils.js";

export default {
    mixins: [VglMaterial],
    props: ["color", "lights", "linewidth", "linecap", "linejoin"],
    computed: {
        inst: () => new LineBasicMaterial()
    },
    created() {
        if (this.lights) this.inst.lights = this.lights;
        if (this.linewidth) this.inst.linewidth = parseNumber(this.linewidth);
        if (this.linecap) this.inst.linecap = this.linecap;
        if (this.linejoin) this.inst.linejoin = this.linejoin;
        if (this.color) this.inst.color.setStyle(this.color);
    },
    watch: {
        color(cl) {
            this.inst.color.setStyle(cl);
        },
        lights(li) {
            this.inst.lights = li;
        },
        linewidth(w) {
            this.inst.linewidth = parseNumber(w);
        },
        linecap(c) {
            this.inst.linecap = c;
        },
        linejoin(j) {
            this.inst.linejoin = j;
        }
    }
};
