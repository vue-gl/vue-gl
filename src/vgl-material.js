import { assetFactory } from './mixins.js'
import { Material } from './three.js'

export default {
  mixins: [assetFactory(Material, 'vglMaterials')]
}
