const assetTypes = [
    "scenes",
    "cameras",
    "materials",
    "geometries",
    "attributes"
];

function findParent(vm) {
    if (vm.$parent) {
        if (vm.$parent.$options.isVgl) {
            return vm.$parent;
        }
        return findParent(vm.$parent);
    }
    return null;
}

function extend(parent) {
    return assetTypes.reduce((obj, key) => {
        obj[key] = Object.create(parent && parent.assets[key]);
        return obj;
    }, {});
}

export default {
    isVgl: true,
    data() {
        return {
            assets: extend(findParent(this))
        };
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
