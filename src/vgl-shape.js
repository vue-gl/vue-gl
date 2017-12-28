import VglPath from './vgl-path.js'
import { Shape } from './three.js'

export default {
  mixins: [VglPath],
  computed: {
    inst: () => new Shape()
  }
}
