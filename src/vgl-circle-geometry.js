import VglGeometry from './vgl-geometry.js'
import { CircleGeometry } from './three.js'
import { parseFloat_, parseInt_, createObjectFromArray } from './utils.js'

const validator = [String, Number]

const props = [
  'radius',
  'segments',
  'thetaStart',
  'thetaLength'
]

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst () {
      return new CircleGeometry(...props.map((key, i) => (i === 1 ? parseInt_ : parseFloat_)(this[key])))
    }
  }
}
