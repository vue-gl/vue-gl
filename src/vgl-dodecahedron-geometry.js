import VglGeometry from './vgl-geometry.js'
import { DodecahedronGeometry } from './three.js'
import { hedronFactory } from './mixins.js'

export default {
  mixins: [VglGeometry, hedronFactory(DodecahedronGeometry)]
}
