import material from "./material";
import {PointsMaterial} from "three";

export default {
    mixins: [material],
    props: [
        "color",
        "size",
        "sizeAttenuation"
    ],
    computed: {
        instance: () => new PointsMaterial()
    },
    created() {
        this.instance.color.setStyle(this.color || "#ffffff");
        this.instance.size = this.size || 1;
        this.instance.sizeAttenuation = this.sizeAttenuation === undefined || this.sizeAttenuation;
    },
    watch: {
        color(c) {
            this.instance.color.setStyle(c);
        },
        size(s) {
            this.instance.size = s;
        },
        sizeAttenuation(a) {
            this.instance.sizeAttenuation = a;
        }
    }
};
