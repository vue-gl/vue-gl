import VglGeometry from './vgl-geometry.js'
import { OctahedronGeometry } from './three.js'
import { hedronFactory } from './mixins.js'

export default {
  mixins: [VglGeometry, hedronFactory(OctahedronGeometry)]
}
