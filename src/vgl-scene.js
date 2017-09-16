import VglObject3d from "./vgl-object3d.js";
import {Scene} from "./three.js";

export default {
    mixins: [VglObject3d],
    inject: ["scenes"],
    computed: {
        inst: () => new Scene()
    },
    created() {
        if (this.scenes) {
            this.$set(this.scenes, this.name, this.inst);
        }
    },
    beforeDestroy() {
        if (this.scenes && this.scenes[this.name] === this.inst) {
            this.$delete(this.scenes, this.name);
        }
    },
    watch: {
        inst(inst) {
            this.scenes[this.name] = inst;
        }
    }
};
