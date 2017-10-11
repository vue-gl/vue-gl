describe("VglMaterial component", function() {
    const {VglMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("The instance should be registered to the injected namespace.", function() {
        it("Should be registered when created.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-material name="dm'&^>" ref="me" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglMaterial,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglMaterials"],
                        render() {}
                    }
                }
            }).$mount();
            assert.strictEqual(vm.$refs.other.vglMaterials["dm'&^>"], vm.$refs.me.inst);
        });
        it("Should be unregistered when destroyed.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-material name="n<!--" v-if="!destroyed" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglMaterial,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglMaterials"],
                        render() {}
                    }
                },
                data: {destroyed: false}
            }).$mount();
            assert.hasAllKeys(vm.$refs.other.vglMaterials, ["n<!--"]);
            vm.destroyed = true;
            vm.$nextTick(() => {
                try {
                    assert.isEmpty(vm.$refs.other.vglMaterials);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("Should be replaced when the instance is replaced.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><mixed-in name="'<!--" ref="geo" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    MixedIn: {
                        mixins: [VglMaterial],
                        computed: {
                            inst() {return this.i;}
                        },
                        data: () => ({i: new THREE.Material()})
                    },
                    OtherComponent: {
                        inject: ["vglMaterials"],
                        render() {}
                    }
                }
            }).$mount();
            vm.$refs.geo.i = new THREE.Material();
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.other.vglMaterials["'<!--"], vm.$refs.geo.inst);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
