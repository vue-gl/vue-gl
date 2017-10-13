import {findParent, createObjectFromArray} from "./utils.js";

const globalNamespaces = [
    "vglCameras",
    "vglScenes"
];

const localNamespaces = [
    "vglGeometries",
    "vglMaterials"
];

function createEmptyObject() {
    return Object.create(null);
}

function isRoot(vm) {
    return vm.$options.isVglRootNamespace;
}

function pop(str) {
    return str.slice(0, -1);
}

export default {
    isVglNamespace: true,
    beforeCreate() {
        const $options = this.$options;
        if (findParent(this, "isVglNamespace")) {
            if (!$options.inject) $options.inject = {};
            localNamespaces.forEach((namespace) => {
                $options.inject[namespace] = namespace;
            });
        } else {
            $options.isVglRootNamespace = true;
        }
    },
    provide() {
        const vm = this;
        class Provider {
            constructor(namespace, global) {
                this.n = namespace;
                this.g = global ? 0: 1;
            }
            get forGet() {
                return vm[this.n + "_".repeat(this.g * 2)];
            }
            get forSet() {
                return vm[this.n + "_".repeat(this.g)];
            }
        }
        return createObjectFromArray(localNamespaces, (namespace) =>
            new Provider(namespace)
        , isRoot(this) ? createObjectFromArray(globalNamespaces, (namespace) =>
            new Provider(namespace, true)
        ): {});
    },
    data() {
        return createObjectFromArray(localNamespaces.map((key) => key + "_"), (namespace) =>
            createEmptyObject()
        , isRoot(this) ? createObjectFromArray(globalNamespaces, (namespace) =>
            createEmptyObject()
        ): {});
    },
    computed: createObjectFromArray(localNamespaces.map((key) => key + "__"), (namespace) => function() {
        const single = pop(namespace);
        return isRoot(this) ? this[single]: Object.assign(Object.create(this[pop(single)].forGet), this[single]);
    }),
    render(h) {
        if (this.$slots.default) return h("div", this.$slots.default);
    }
};
