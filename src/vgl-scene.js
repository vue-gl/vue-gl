import VglObject3d from "./vgl-object3d.js";
import {Scene} from "./three.js";

export default {
    mixins: [VglObject3d],
    computed: {
        inst: () => new Scene()
    },
    created() {
        this.assets.set("scenes", this.name, this.inst);
    },
    beforeDestroy() {
        this.assets.delete("scenes", this.name, this.inst);
    },
    watch: {
        inst(inst) {
            this.assets.set("scenes", this.name, inst);
        }
    }
};
