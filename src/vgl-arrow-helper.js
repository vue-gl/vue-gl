import VglObject3d from "./vgl-object3d.js";
import {ArrowHelper, Vector3, Color} from "./three.js";
import {parseVector3, parseNumber} from "./utils.js";

function areUndefined(...args) {
    return !args.some((arg) => arg !== undefined);
}

export default {
    mixins: [VglObject3d],
    props: [
        "dir",
        "length",
        "color",
        "headLength",
        "headWidth"
    ],
    computed: {
        inst: () => new ArrowHelper(new Vector3(1), new Vector3()),
        len() {
            const length = this.length === undefined ? 1: this.length;
            return [
                parseFloat(length),
                parseNumber(this.headLength),
                parseNumber(this.headWidth)
            ];
        }
    },
    created() {
        if (this.dir) {
            this.inst.setDirection(parseVector3(this.dir).normalize());
        }
        if (!areUndefined(this.length, this.headLength, this.headWidth)) {
            this.inst.setLength(...this.len);
        }
        if (this.color) {
            this.inst.setColor(new Color(this.color));
        }
    },
    watch: {
        dir(dir) {
            this.inst.setDirection(parseVector3(dir).normalize());
        },
        len(len) {
            this.inst.setLength(...len);
        },
        color(color) {
            this.inst.setColor(new Color(color));
        }
    }
};
