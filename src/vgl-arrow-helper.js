import VglObject3d from "./vgl-object3d.js";
import {ArrowHelper, Color, Vector3} from "./three.js";
import {parseVector3, parseFloat_} from "./utils.js";

const numberValidator = [String, Number];
const defaultDirection = new Vector3(0, 1);
const origin = new Vector3();
const tempColor = new Color();

function setDirection(vm, dir) {
    vm.inst.setDirection(parseVector3(dir).normalize());
}

export default {
    mixins: [VglObject3d],
    props: {
        dir: {
            type: [String, Vector3],
            default: () => defaultDirection
        },
        length: {
            type: numberValidator,
            default: 1
        },
        color: {
            type: String,
            default: "#ff0"
        },
        headLength: numberValidator,
        headWidth: numberValidator
    },
    computed: {
        inst: () => new ArrowHelper(defaultDirection, origin),
        len() {
            return [parseFloat_(this.length), parseFloat_(this.headLength), parseFloat_(this.headWidth)];
        }
    },
    created() {
        if (this.dir !== defaultDirection) this.inst.setDirection(parseVector3(this.dir).normalize());
        this.inst.setLength(...this.len);
        this.inst.setColor(tempColor.setStyle(this.color));
    },
    watch: {
        dir(dir) {
            setDirection(this, dir);
        },
        len(len) {
            this.inst.setLength(...len);
        },
        color(color) {
            this.inst.setColor(tempColor.setStyle(color));
        }
    }
};
