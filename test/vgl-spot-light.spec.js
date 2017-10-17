describe("VglSpotLight component", function() {
    const {VglSpotLight} = VueGL;
    const assert = chai.assert;
    describe("Creating a light", function() {
        describe("The distance of the light should be same as the distance property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.distance, 0);
            });
            it("When the property is a number.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {distance: 2.1}});
                assert.strictEqual(vm.inst.distance, 2.1);
            });
            it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {distance: "2.5"}});
                assert.strictEqual(vm.inst.distance, 2.5);
            });
        });
        describe("The decay of the light should be same as the decay property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.decay, 1);
            });
            it("When the property is a number.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {decay: 2}});
                assert.strictEqual(vm.inst.decay, 2);
            });
            it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {decay: "3"}});
                assert.strictEqual(vm.inst.decay, 3);
            });
        });
        describe("The angle of the light should be same as the angle property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.angle, Math.PI / 3);
            });
            it("When the property is a number.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {angle: 0.44}});
                assert.strictEqual(vm.inst.angle, 0.44);
            });
            it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {angle: "0.22"}});
                assert.strictEqual(vm.inst.angle, 0.22);
            });
        });
        describe("The penumbra of the light should be same as the penumbra property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.penumbra, 0);
            });
            it("When the property is a number.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {penumbra: 0.34}});
                assert.strictEqual(vm.inst.penumbra, 0.34);
            });
            it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {penumbra: "0.21"}});
                assert.strictEqual(vm.inst.penumbra, 0.21);
            });
        });
        describe("The target of the light should be same as the target property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.target.position.x, 0);
                assert.strictEqual(vm.inst.target.position.y, 0);
                assert.strictEqual(vm.inst.target.position.z, 0);
            });
            it("When the property is a Vector3 object.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {target: new THREE.Vector3(1.2, 3, 2)}});
                assert.strictEqual(vm.inst.target.position.x, 1.2);
                assert.strictEqual(vm.inst.target.position.y, 3);
                assert.strictEqual(vm.inst.target.position.z, 2);
            });
            it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {target: "0.29 1e2 -25"}});
                assert.strictEqual(vm.inst.target.position.x, 0.29);
                assert.strictEqual(vm.inst.target.position.y, 1e2);
                assert.strictEqual(vm.inst.target.position.z, -25);
            });
        });
        describe("The target object of the light should be added to the parent object.", function() {
            const {VglObject3d} = VueGL;
            it("When the target property is undefined and a parent does not exist.", function() {
                const vm = new Vue(VglSpotLight);
                assert.isNull(vm.inst.target.parent);
            });
            it("When the target property is undefined and a parent exists.", function() {
                const vm = new Vue({
                    template: `<vgl-object3d><vgl-spot-light ref="spot" /></vgl-object3d>`,
                    components: {VglSpotLight, VglObject3d}
                }).$mount();
                assert.isNull(vm.$refs.spot.inst.target.parent);
            });
            it("When the target property is a Vector3 object and a parent does not exist.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {target: new THREE.Vector3()}});
                assert.isNull(vm.inst.target.parent);
            });
            it("When the target property is a Vector3 object and a parent exists.", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="parent"><vgl-spot-light ref="spot" :target="target" /></vgl-object3d>`,
                    components: {VglSpotLight, VglObject3d},
                    data: {target: new THREE.Vector3()}
                }).$mount();
                assert.strictEqual(vm.$refs.spot.inst.target.parent, vm.$refs.parent.inst);
            });
            it("When the target property is a string and a parent does not exist.", function() {
                const vm = new (Vue.extend(VglSpotLight))({propsData: {target: "0 1.1 -2"}});
                assert.isNull(vm.inst.target.parent);
            });
            it("When the target property is a Vector3 object and a parent exists.", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="parent"><vgl-spot-light ref="spot" target="-1 5 2.8" /></vgl-object3d>`,
                    components: {VglSpotLight, VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.spot.inst.target.parent, vm.$refs.parent.inst);
            });
        });
    });
    describe("Watching properties", function() {
        it("The distance of the light should change when the distance property changes.", function(done) {
            const vm = new (Vue.extend(VglSpotLight))({propsData: {distance: 3.5}});
            vm.distance = "1.8";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.inst.distance, 1.8);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The decay of the light should change when the decay property changes.", function(done) {
            const vm = new (Vue.extend(VglSpotLight))({propsData: {decay: "1.5"}});
            vm.decay = 2.5;
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.inst.decay, 2.5);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The angle of the light should change when the angle property changes.", function(done) {
            const vm = new (Vue.extend(VglSpotLight))({propsData: {angle: 1.12}});
            vm.angle = "0.51";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.inst.angle, 0.51);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The penumbra of the light should change when the penumbra property changes.", function(done) {
            const vm = new (Vue.extend(VglSpotLight))({propsData: {penumbra: 0.8}});
            vm.penumbra = "0.61";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.inst.penumbra, 0.61);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The target of the light should change when the target property changes.", function(done) {
            const vm = new (Vue.extend(VglSpotLight))({propsData: {target: "-1 2 1.1"}});
            vm.target = new THREE.Vector3(1, 1.1, -1);
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.inst.target.position.x, 1);
                    assert.strictEqual(vm.inst.target.position.y, 1.1);
                    assert.strictEqual(vm.inst.target.position.z, -1);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The target object should be added to the parent object when the parent changes.", function(done) {
            const {VglObject3d} = VueGL;
            const vm = new Vue({
                template: `<parent-component :i="i"><vgl-spot-light ref="spot" target="0 -9 2e-3" /></parent-component>`,
                components: {
                    VglSpotLight,
                    ParentComponent: {
                        mixins: [VglObject3d],
                        props: ["i"],
                        computed: {
                            inst() {return this.i;}
                        }
                    }
                },
                data: {i: new THREE.Object3D()}
            }).$mount();
            vm.i = new THREE.Object3D;
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.i, vm.$refs.spot.inst.target.parent);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
