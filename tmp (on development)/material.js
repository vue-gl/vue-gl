import {Material} from "three";
import vgl from "./vgl";

export default {
    mixins: [vgl],
    props: ["name"],
    computed: {
        instance: () => new Material()
    },
    watch: {
        instance(instance) {
            Object.getPrototypeOf(this.assets.materials)[this.name] = instance;
        }
    },
    created() {
        this.$set(Object.getPrototypeOf(this.assets.materials), this.name, this.instance);
    },
    beforeDestroy() {
        if (Object.getPrototypeOf(this.assets.materials)[this.name] === this.instance) {
            this.$delete(Object.getPrototypeOf(this.assets.materials), this.name);
        }
    }
};
