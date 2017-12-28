import VglGeometry from './vgl-geometry.js'
import { CylinderGeometry } from './three.js'
import { parseFloat_, parseInt_, createObjectFromArray } from './utils.js'

const validator = [String, Number]

const props = [
  'radiusTop',
  'radiusBottom',
  'height',
  'radialSegments',
  'heightSegments',
  'openEnded',
  'thetaStart',
  'thetaLength'
]

export default {
  mixins: [VglGeometry],
  props: createObjectFromArray(props, (key, i) => (i === 5 ? Boolean : validator)),
  computed: {
    inst () {
      return new CylinderGeometry(...props.map((key, i) => (i < 3 || i > 5 ? parseFloat_ : parseInt_)(this[key])))
    }
  }
}
