import VglGeometry from './vgl-geometry.js'
import { TetrahedronGeometry } from './three.js'
import { hedronFactory } from './mixins.js'

export default {
  mixins: [VglGeometry, hedronFactory(TetrahedronGeometry)]
}
