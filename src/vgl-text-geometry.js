import VglExtrudeGeometry from './vgl-extrude-geometry.js'
import { TextGeometry } from './three.js'
import { parseFloat_, parseInt_, validatePropNumber, validatePropString } from './utils.js'

function getText (nodes) {
  return nodes.map(node => (node.children ? getText(node.children) : node.text)).join('')
}

export default {
  mixins: [VglExtrudeGeometry],
  inject: ['vglFonts'],
  props: {
    font: validatePropString,
    size: {
      type: validatePropNumber,
      default: 100
    },
    height: {
      type: validatePropNumber,
      default: 50
    },
    curveSegments: {
      type: validatePropNumber,
      default: 12
    },
    bevelEnabled: Boolean,
    bevelThickness: {
      type: validatePropNumber,
      default: 10
    },
    bevelSize: {
      type: validatePropNumber,
      default: 8
    },
    bevelSegments: {
      type: validatePropNumber,
      default: 3
    }
  },
  computed: {
    inst () {
      const font = this.vglFonts.forGet[this.font]
      const nodes = this.$slots.default
      if (font && nodes) {
        return new TextGeometry(getText(nodes), {
          font,
          size: parseFloat_(this.size),
          height: parseFloat_(this.height),
          curveSegments: parseInt_(this.curveSegments),
          bevelEnabled: this.bevelEnabled,
          bevelThickness: parseFloat_(this.bevelThickness),
          bevelSize: parseFloat_(this.bevelSize),
          bevelSegments: parseInt_(this.bevelSegments)
        })
      }
    }
  }
}
