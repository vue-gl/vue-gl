import VglGeometry from './vgl-geometry.js'
import { SphereGeometry } from './three.js'
import { parseFloat_, parseInt_, createObjectFromArray } from './utils.js'

const validator = [String, Number]

const props = [
  'radius',
  'widthSegments',
  'heightSegments',
  'phiStart',
  'phiLength',
  'thetaStart',
  'thetaLength'
]

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, () => validator),
  computed: {
    inst () {
      return new SphereGeometry(...props.map((key, i) => (i < 1 || i > 2 ? parseFloat_ : parseInt_)(this[key])))
    }
  }
}
