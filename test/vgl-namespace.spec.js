describe("VglNamespace component", function() {
    const {VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Global datas (cameras and scenes)", function() {
        it("Descendants should be able to inject vglCameras and vglScenes.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><child-component ref="child" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    ChildComponent: {
                        inject: ["vglCameras", "vglScenes"],
                        render() {}
                    }
                }
            }).$mount();
            assert.isObject(vm.$refs.child.vglCameras);
            assert.isObject(vm.$refs.child.vglScenes);
        });
        it("Provided datas should be global under the root VglNamespace component.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><child-component ref="child" /><vgl-namespace><grandchild-component ref="grandchild" /></vgl-namespace></vgl-namespace>`,
                components: {
                    VglNamespace,
                    ChildComponent: {
                        inject: ["vglCameras", "vglScenes"],
                        created() {
                            this.vglCameras.a = "1";
                            this.vglScenes.c = "3";
                            this.vglCameras.e = "5";
                        },
                        render() {}
                    },
                    GrandchildComponent: {
                        inject: ["vglCameras", "vglScenes"],
                        created() {
                            this.vglCameras.b = "2";
                            this.vglScenes.d = "4";
                            this.vglCameras.e = "6";
                        },
                        render() {}
                    }
                }
            }).$mount();
            assert.strictEqual(vm.$refs.grandchild.vglCameras.a, "1");
            assert.strictEqual(vm.$refs.grandchild.vglCameras.b, "2");
            assert.strictEqual(vm.$refs.grandchild.vglScenes.c, "3");
            assert.strictEqual(vm.$refs.grandchild.vglScenes.d, "4");
            assert.strictEqual(vm.$refs.grandchild.vglCameras.e, "6");
            assert.strictEqual(vm.$refs.child.vglCameras.a, "1");
            assert.strictEqual(vm.$refs.child.vglCameras.b, "2");
            assert.strictEqual(vm.$refs.child.vglScenes.c, "3");
            assert.strictEqual(vm.$refs.child.vglScenes.d, "4");
            assert.strictEqual(vm.$refs.child.vglCameras.e, "6");
        });
    });
    describe("Local datas (geometries and materials)", function() {
        it("Descendants should be able to inject vglGeometries and vglMaterials.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><child-component ref="child" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    ChildComponent: {
                        inject: ["vglGeometries", "vglMaterials"],
                        render() {}
                    }
                }
            }).$mount();
            assert.isObject(vm.$refs.child.vglGeometries);
            assert.isObject(vm.$refs.child.vglMaterials);
        });
        it("Each VglNamespace component should provide datas locally.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><parent-component ref="parent" /><vgl-namespace><child-component ref="child" /></vgl-namespace></vgl-namespace>`,
                components: {
                    VglNamespace,
                    ParentComponent: {
                        inject: ["vglGeometries", "vglMaterials"],
                        created() {
                            this.vglGeometries.a = "1";
                            this.vglMaterials.b = "2";
                            this.vglGeometries.c = "3";
                        },
                        render() {}
                    },
                    ChildComponent: {
                        inject: ["vglGeometries", "vglMaterials"],
                        created() {
                            this.vglGeometries.d = "4";
                            this.vglMaterials.e = "5";
                            this.vglGeometries.c = "6";
                        },
                        render() {}
                    }
                }
            }).$mount();
            assert.strictEqual(vm.$refs.parent.vglGeometries.a, "1");
            assert.strictEqual(vm.$refs.parent.vglMaterials.b, "2");
            assert.strictEqual(vm.$refs.parent.vglGeometries.c, "3");
            assert.isUndefined(vm.$refs.parent.vglGeometries.d);
            assert.isUndefined(vm.$refs.parent.vglMaterials.e);
            assert.strictEqual(vm.$refs.child.vglGeometries.a, "1");
            assert.strictEqual(vm.$refs.child.vglMaterials.b, "2");
            assert.strictEqual(vm.$refs.child.vglGeometries.c, "6");
            assert.strictEqual(vm.$refs.child.vglGeometries.d, "4");
            assert.strictEqual(vm.$refs.child.vglMaterials.e, "5");
        });
        it("The ancestor's datas should also be reactive.", function (done) {
            let geometryChanges = 0, materialChanges = 0;
            const vm = new Vue({
                template: `<vgl-namespace><parent-component ref="parent" /><vgl-namespace><child-component ref="child" /></vgl-namespace></vgl-namespace>`,
                components: {
                    VglNamespace,
                    ParentComponent: {
                        inject: ["vglGeometries", "vglMaterials"],
                        render() {}
                    },
                    ChildComponent: {
                        inject: ["vglGeometries", "vglMaterials"],
                        render() {},
                        watch: {
                            vglGeometries() {
                                ++geometryChanges;
                            },
                            vglMaterials() {
                                ++materialChanges;
                            }
                        }
                    }
                }
            }).$mount();
            vm.$set(vm.$refs.parent.vglGeometries, "a", "1");
            vm.$set(vm.$refs.parent.vglMaterials, "b", "2");
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(geometryChanges, 1);
                    assert.strictEqual(materialChanges, 1);
                    assert.doesNotHaveAnyKeys(vm.$refs.child.vglGeometries, [undefined]);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
