import VglLineSegments from './vgl-line-segments.js'
import { PolarGridHelper } from './three.js'
import { validatePropNumber, validatePropString, parseFloat_, parseInt_ } from './utils.js'

export default {
  mixins: [VglLineSegments],
  props: {
    radius: {
      type: validatePropNumber,
      default: 10
    },
    radials: {
      type: validatePropNumber,
      default: 16
    },
    circles: {
      type: validatePropNumber,
      default: 8
    },
    divisions: {
      type: validatePropNumber,
      default: 64
    },
    color1: {
      type: validatePropString,
      default: '#444444'
    },
    color2: {
      type: validatePropString,
      default: '#888888'
    }
  },
  computed: {
    inst () {
      const vm = this
      return new PolarGridHelper(
        parseFloat_(vm.radius),
        parseInt_(vm.radials),
        parseInt_(vm.circles),
        parseInt_(vm.divisions),
        vm.color1,
        vm.color2
      )
    }
  }
}
