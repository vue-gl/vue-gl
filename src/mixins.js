import {parseFloat_, parseInt_} from "./utils.js";

export function assetFactory(threeClass, namespace) {
    return {
        props: {
            name: String
        },
        inject: [namespace],
        computed: {
            inst: () => new threeClass()
        },
        created() {
            this.$set(this[namespace], this.name, this.inst);
        },
        watch: {
            inst(inst) {
                this[namespace][this.name] = inst;
            }
        },
        beforeDestroy() {
            if (this[namespace][this.name] === this.inst) this.$delete(this[namespace], this.name);
        },
        render(h) {
            if (this.$slots.default) return h("div", this.$slots.default);
        }
    };
}

function hasAssetsMixinFactory(propname, namespace) {
    const computedPropname = propname + "_";
    return {
        props: {[propname]: String},
        inject: [namespace],
        computed: {
            [computedPropname]() {
                return this[namespace][this[propname]];
            }
        },
        mounted() {
            if (this[computedPropname]) this.inst[propname] = this[computedPropname];
        },
        watch: {
            [computedPropname](prop) {
                this.inst[propname] = prop;
            }
        }
    };
}

export function objectMixinFactory(hasGeometry) {
    const mixins = [hasAssetsMixinFactory("material", "vglMaterials")];
    if (hasGeometry) mixins.push(hasAssetsMixinFactory("geometry", "vglGeometries"));
    return {mixins};
}

const numberValidator = [String, Number];

export function hedronFactory(threeClass) {
    return {
        props: {
            radius: numberValidator,
            detail: numberValidator
        },
        computed: {
            inst() {
                return new threeClass(parseFloat_(this.radius), parseInt_(this.detail));
            }
        }
    };
}
