import VglMaterial from './vgl-material.js'
import { MeshStandardMaterial } from './three.js'
import { hasColorFactory, hasMap } from './mixins.js'

export default {
  mixins: [VglMaterial, hasColorFactory('#fff'), hasMap],
  computed: {
    inst: () => new MeshStandardMaterial()
  }
}
