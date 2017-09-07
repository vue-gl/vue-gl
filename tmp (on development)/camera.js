import object3d from "./object3d";
import {Camera, Vector3, Euler, Spherical} from "three";

export default {
    mixins: [object3d],
    props: ["target", "orbit"],
    computed: {
        instance: () => new Camera(),
        parsedTarget() {
            const target = this.target;
            if (!target) {
                return new Vector3();
            }
            if (Array.isArray(target)) {
                return new Vector3(...target);
            }
            if (typeof target === "object") {
                return new Vector3(target.x, target.y, target.z);
            }
            return new Vector3(...target.split(" ").map((el) => +el));
        },
        parsedOrbit() {
            const orbit = this.orbit;
            if (!orbit) {
                return new Spherical();
            }
            if (Array.isArray(orbit)) {
                return new Spherical(...orbit);
            }
            if (typeof orbit === "object") {
                return new Spherical(orbit.radius, orbit.phi, orbit.theta);
            }
            const props = orbit.split(";");
            if (props.length === 1 && props[0].split(":").length === 1) {
                return new Spherical(...props[0].split(" "));
            }
            const args = props.reduce((obj, str) => {
                const [name, value] = str.split(":");
                obj[name] = value;
                return obj;
            }, {});
            return new Spherical(args.radius, args.phi, args.theta);
        },
        parsedPosition() {
            return new Vector3().setFromSpherical(this.parsedOrbit).add(this.parsedTarget);
        },
        parsedRotation() {
            return new Euler(this.parsedOrbit.phi - Math.PI * .5, this.parsedOrbit.theta, 0, "YXZ");
        }
    },
    created() {
        this.$set(Object.getPrototypeOf(this.assets.cameras), this.name, this.instance);
    },
    beforeDestroy() {
        if (Object.getPrototypeOf(this.assets.cameras)[this.name] === this.instance) {
            this.$delete(Object.getPrototypeOf(this.assets.cameras), this.name);
        }
    },
    watch: {
        instance(instance) {
            Object.getPrototypeOf(this.assets.cameras)[this.name] = instance;
        }
    }
};
