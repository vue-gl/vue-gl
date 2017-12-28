import VglGeometry from './vgl-geometry.js'
import { PlaneGeometry } from './three.js'
import { parseFloat_, parseInt_, createObjectFromArray } from './utils.js'

const validator = [String, Number]

const props = [
  'width',
  'height',
  'widthSegments',
  'heightSegments'
]

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst () {
      return new PlaneGeometry(...props.map((key, i) => (i > 1 ? parseInt_ : parseFloat_)(this[key])))
    }
  }
}
