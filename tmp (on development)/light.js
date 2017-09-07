import object3d from "./object3d";
import {Light} from "three";

export default {
    mixins: [object3d],
    props: ["color", "intensity"],
    computed: {
        instance: () => new Light()
    },
    created() {
        this.instance.color.setStyle(this.color || "#ffffff");
        this.instance.intensity = this.intensity || 1;
    },
    watch: {
        color(color) {
            this.instance.color.setStyle(color);
        },
        intensity(intensity) {
            this.instance.intensity = intensity || 1;
        }
    }
};
