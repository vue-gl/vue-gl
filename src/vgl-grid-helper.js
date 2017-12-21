import VglLineSegments from "./vgl-line-segments.js";
import {GridHelper} from "./three.js";
import {validatePropNumber, validatePropString, parseFloat_, parseInt_} from "./utils.js";

export default {
    mixins: [VglLineSegments],
    props: {
        size: {
            type: validatePropNumber,
            default: 10
        },
        divisions: {
            type: validatePropNumber,
            default: 10
        },
        colorCenterLine: {
            type: validatePropString,
            default: "#444444"
        },
        colorGrid: {
            type: validatePropString,
            default: "#888888"
        }
    },
    computed: {
        inst() {
            const vm = this;
            return new GridHelper(
                parseFloat_(vm.size),
                parseInt_(vm.divisions),
                vm.colorCenterLine,
                vm.colorGrid
            );
        }
    }
};
