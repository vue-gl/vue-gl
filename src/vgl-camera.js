import VglObject3d from "./vgl-object3d.js";
import {parseVector3, parseSpherical} from "./utils.js";
import {Camera} from "./three.js";

export default {
    mixins: [VglObject3d],
    props: ["orbitTarget", "orbitPosition"],
    inject: ["cameras"],
    computed: {
        inst: () => new Camera()
    },
    created() {
        const inst = this.inst;
        const orbitPosition = this.orbitPosition;
        const orbitTarget = this.orbitTarget;
        if (orbitPosition || orbitTarget) {
            const target = parseVector3(orbitTarget);
            if (orbitPosition) {
                inst.position
                    .setFromSpherical(parseSpherical(orbitPosition))
                    .add(target);
            }
            inst.lookAt(target);
        }
        if (this.cameras) {
            this.$set(this.cameras, this.name, this.inst);
        }
    },
    beforeDestroy() {
        if (this.cameras && this.cameras[this.name] === this.inst) {
            this.$delete(this.cameras, this.name);
        }
    },
    watch: {
        inst(inst) {
            this.cameras[this.name] = inst;
        },
        orbitTarget(target) {
            const inst = this.inst;
            const vector = parseVector3(target);
            if (this.orbitPosition) {
                inst.position
                    .setFromSpherical(parseSpherical(this.orbitPosition))
                    .add(vector);
            }
            inst.lookAt(vector);
        },
        orbitPosition(position) {
            const inst = this.inst;
            const spherical = parseSpherical(position);
            inst.position.setFromSpherical(spherical);
            const vector = parseVector3(this.orbitTarget);
            if (this.orbitTarget) {
                inst.add(vector);
            }
            inst.lookAt(vector);
        }
    }
};
