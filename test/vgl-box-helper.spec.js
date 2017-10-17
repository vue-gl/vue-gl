describe("VglBoxHelper component", function() {
    const {VglBoxHelper, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Creating a helper", function() {
        describe("The color of the box should be same as the color property.", function() {
            it("When the property is a color name.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-box-helper color="red" ref="helper" /></vgl-namespace>`,
                    components: {VglBoxHelper, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.helper.inst.material.color.r, 255/255);
                assert.strictEqual(vm.$refs.helper.inst.material.color.g, 0/255);
                assert.strictEqual(vm.$refs.helper.inst.material.color.b, 0/255);
            });
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace>`,
                    components: {VglBoxHelper, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.helper.inst.material.color.r, 255/255);
                assert.strictEqual(vm.$refs.helper.inst.material.color.g, 255/255);
                assert.strictEqual(vm.$refs.helper.inst.material.color.b, 0/255);
            });
        });
        describe("The object to show the bounding box should be the parent object.", function() {
            const {VglObject3d} = VueGL;
            it("When the parent component is a VglObject3d.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-object3d ref="target"><vgl-box-helper ref="helper" /></vgl-object3d></vgl-namespace>`,
                    components: {VglObject3d, VglBoxHelper, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.target.inst, vm.$refs.helper.inst.object);
            });
            it("When the parent of the parent component is a VglObject3d.", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="target"><vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace></vgl-object3d>`,
                    components: {VglObject3d, VglBoxHelper, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.target.inst, vm.$refs.helper.inst.object);
            });
            it("When a parent component does not exit.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace>`,
                    components: {VglBoxHelper, VglNamespace}
                }).$mount();
                assert.isUndefined(vm.$refs.helper.inst.object);
            });
        });
    });
    describe("Watching properties", function() {
        describe("The color of the box should change when the color property changes.", function() {
            it("From a color name to a hex code", function(done) {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-box-helper :color="color" ref="helper" /></vgl-namespace>`,
                    components: {VglBoxHelper, VglNamespace},
                    data: {color: "red"}
                }).$mount();
                vm.color = "#aa87C5";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.helper.inst.material.color.r, 170/255);
                        assert.strictEqual(vm.$refs.helper.inst.material.color.g, 135/255);
                        assert.strictEqual(vm.$refs.helper.inst.material.color.b, 197/255);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("Watching the parent instance", function() {
        const {VglObject3d} = VueGL;
        it("The object to show the bounding box should change when the parent instance changes.", function(done) {
            const vm = new Vue({
                template: `<parent-component ref="target"><vgl-box-helper ref="helper" /></parent-component>`,
                components: {
                    VglBoxHelper,
                    ParentComponent: {
                        mixins: [VglObject3d, VglNamespace],
                        computed: {
                            inst() {return this.i;}
                        },
                        data() {
                            return {i: new THREE.Object3D()};
                        }
                    }
                }
            }).$mount();
            const before = vm.$refs.target.i;
            vm.$refs.target.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(before, vm.$refs.helper.inst.object);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
