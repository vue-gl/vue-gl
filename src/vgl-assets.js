function findParent(vm) {
    const parent = vm.$parent;
    if (parent) {
        if (parent.$options.isVglAssets) {
            return parent;
        }
        return findParent(parent);
    }
}

function createCollection(parent, type) {
    return Object.create(parent && parent.assets[type]);
}

export default {
    isVglAssets: true,
    data() {
        const parent = findParent(this) || null;
        return {
            assets: {
                materials: createCollection(parent, "materials"),
                geometries: createCollection(parent, "geometries"),
                attributes: createCollection(parent, "attributes")
            }
        };
    },
    render(h) {
        if (this.$slots.default) {
            return h("div", this.$slots.default);
        }
    }
};
