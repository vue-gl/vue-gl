import VglMaterial from './vgl-material.js'
import { PointsMaterial } from './three.js'
import { parseFloat_ } from './utils.js'

export default {
  mixins: [VglMaterial],
  props: {
    color: {
      type: String,
      default: '#fff'
    },
    size: {
      type: [String, Number],
      default: 1
    },
    disableSizeAttenuation: Boolean
  },
  computed: {
    inst: () => new PointsMaterial()
  },
  created () {
    const inst = this.inst
    inst.color.setStyle(this.color)
    inst.size = parseFloat_(this.size)
    inst.sizeAttenuation = !this.disableSizeAttenuation
  },
  watch: {
    color (color) {
      this.inst.color.setStyle(color)
    },
    size (size) {
      this.inst.size = parseFloat_(size)
    },
    disableSizeAttenuation (disabled) {
      this.inst.sizeAttenuation = !disabled
    }
  }
}
