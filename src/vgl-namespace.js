import {createObjectFromArray} from "./utils.js";
import {findParent} from "./utils.js";

const providedKeys = [
    "vglGeometries",
    "vglMaterials"
];

const globalProvidedKeys = [
    "vglCameras",
    "vglScenes"
];

function globalProvidedKeysObject(vm, valueSetter) {
    if (vm.$options.isVglRootNamespace) return createObjectFromArray(globalProvidedKeys, valueSetter);
}

export default {
    isVglNamespace: true,
    beforeCreate() {
        const $options = this.$options;
        $options.isVglRootNamespace = !findParent(this, "isVglNamespace");
        if (!$options.isVglRootNamespace) {
            $options.inject = createObjectFromArray(providedKeys, (key) => key, $options.inject);
            $options.watch = createObjectFromArray(providedKeys, (key) => () => {
                const data = this[key + "_"], s = Symbol();
                this.$set(data, s, null);
                this.$delete(data, s);
            }, $options.watch);
        }
    },
    provide() {
        return createObjectFromArray(providedKeys, (key) => this[key + "_"], globalProvidedKeysObject(this, (key) => this[key]));
    },
    data() {
        return providedKeys.reduce((data, key) => {
            data[key + "_"] = Object.create(this[key] || null);
            return data;
        }, globalProvidedKeysObject(this, () => Object.create(null)) || {});
    },
    render(h) {
        if (this.$slots.default) return h("div", this.$slots.default);
    }
};
