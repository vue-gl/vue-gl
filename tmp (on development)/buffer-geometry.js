import {BufferGeometry} from "three";
import vgl from "./vgl";

export default {
    mixins: [vgl],
    props: ["name", "attribute"],
    computed: {
        instance: () => new BufferGeometry()
    },
    watch: {
        instance(instance) {
            Object.getPrototypeOf(this.assets.geometries)[this.name] = instance;
        }
    },
    created() {
        if (this.attribute) {
            this.attribute.split(";").forEach((attr) => {
                const [name, attribute] = attr.split(":");
                this.instance.addAttribute(name.trim(), this.assets.attributes[attribute.trim()]);
            });
        }
        this.$set(Object.getPrototypeOf(this.assets.geometries), this.name, this.instance);
    },
    beforeDestroy() {
        if (Object.getPrototypeOf(this.assets.geometries)[this.name] === this.instance) {
            this.$delete(Object.getPrototypeOf(this.assets.geometries), this.name);
        }
    }
};
