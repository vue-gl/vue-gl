import {BufferAttribute} from "three";
import vgl from "./vgl";

export default {
    mixins: [vgl],
    props: ["name", "array", "size"],
    computed: {
        instance: () => new BufferAttribute(new Float32Array(0), 3)
    },
    created() {
        this.instance.setArray(new Float32Array(typeof this.array === "object" ? this.array: this.array.split(" ")));
        this.instance.itemSize = this.size || 3;
        this.instance.needsUpdate = true;
        this.$set(Object.getPrototypeOf(this.assets.attributes), this.name, this.instance);
    },
    beforeDestroy() {
        if (this.parent.assets.attributes[this.name] === this.instance) {
            this.$delete(Object.getPrototypeOf(this.assets.attributes), this.name);
        }
    },
    watch: {
        instance(instance) {
            Object.getPrototypeOf(this.assets.attributes)[this.name] = instance;
        },
        array(arr) {
            const _arr = typeof arr === "object" ? arr: arr.split(" ");
            if (_arr.length !== this.instance.array.length) {
                this.instance.setArray(new Float32Array(_arr));
            } else {
                this.instance.copyArray(_arr);
            }
            this.instance.needsUpdate = true;
        },
        size(size) {
            this.instance.itemSize = size || 3;
        }
    }
};
