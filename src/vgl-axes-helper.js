import VglLineSegments from './vgl-line-segments.js'
import { AxesHelper } from './three.js'
import { parseFloat_ } from './utils.js'

export default {
  mixins: [VglLineSegments],
  props: { size: [String, Number] },
  computed: {
    inst () {
      return new AxesHelper(parseFloat_(this.size))
    }
  }
}
