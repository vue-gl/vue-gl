import {createObjectFromArray} from "./utils.js";

const globalNamespaces = [
    "vglCameras",
    "vglScenes"
];

const localNamespaces = [
    "vglGeometries",
    "vglMaterials",
    "vglTextures"
];

const namespaces = [...globalNamespaces, ...localNamespaces];

const localDataNames = localNamespaces.map((key) => key + "_");
const computedNames = localDataNames.map((key) => key + "_");

function createEmptyObject() {
    return Object.create(null);
}

function createEmptyObjectsFromArray(arr, base) {
    return createObjectFromArray(arr, () => createEmptyObject(), base);
}

export default {
    provide() {
        const vm = this;
        class LocalProvider {
            constructor(index) {
                this.i = index;
            }
            get forGet() {
                return vm[computedNames[this.i]];
            }
            get forSet() {
                return vm[localDataNames[this.i]];
            }
        }
        class GlobalProvider {
            constructor(index) {
                this.i = index;
            }
            get forGet() {
                return vm[globalNamespaces[this.i]];
            }
            get forSet() {
                return vm[globalNamespaces[this.i]];
            }
        }
        return createObjectFromArray(localNamespaces, (_, index) =>
            new LocalProvider(index)
        , vm.$data[globalNamespaces[0]] ? createObjectFromArray(globalNamespaces, (_, index) =>
            new GlobalProvider(index)
        ): {});
    },
    inject: createObjectFromArray(namespaces, (namespace) => ({
        default: undefined
    })),
    data() {
        return createEmptyObjectsFromArray(localDataNames, this[globalNamespaces[0]] ? {}: createEmptyObjectsFromArray(globalNamespaces));
    },
    computed: createObjectFromArray(computedNames, (_, index) => function() {
        const name = localNamespaces[index], dataName = localDataNames[index];
        return this[name] ? Object.assign(Object.create(this[name].forGet), this[dataName]): this[dataName];
    }),
    render(h) {
        if (this.$slots.default) return h("div", this.$slots.default);
    }
};
