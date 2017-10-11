describe("VglObject3d component", function() {
    const {VglObject3d} = VueGL;
    const assert = chai.assert;
    describe("Component tree", function() {
        it("The instance should be added to the parent when created.", function() {
            const vm = new Vue({
                template: `<vgl-object3d ref="parent"><vgl-object3d ref="child" /></vgl-object3d>`,
                components: {VglObject3d}
            }).$mount();
            assert.lengthOf(vm.$refs.parent.inst.children, 1);
            assert.include(vm.$refs.parent.inst.children, vm.$refs.child.inst);
            assert.include(vm.$refs.child.inst.parent, vm.$refs.parent.inst);
        });
        it("The instance under other components should be added to the nearest ancestor.", function() {
            const vm = new Vue({
                template: `<vgl-object3d ref="parent"><other-component><vgl-object3d ref="child" /></other-component></vgl-object3d>`,
                components: {
                    VglObject3d,
                    OtherComponent: {template: `<div><slot /></div>`}
                }
            }).$mount();
            assert.lengthOf(vm.$refs.parent.inst.children, 1);
            assert.include(vm.$refs.parent.inst.children, vm.$refs.child.inst);
            assert.include(vm.$refs.child.inst.parent, vm.$refs.parent.inst);
        });
        it("The instance should be removed from the parent when destroyed.", function(done) {
            const vm = new Vue({
                template: `<vgl-object3d ref="parent"><vgl-object3d v-if="!destroyed" ref="child" /></vgl-object3d>`,
                components: {VglObject3d},
                data: {destroyed: false}
            }).$mount();
            assert.include(vm.$refs.parent.inst.children, vm.$refs.child.inst);
            const parent = vm.$refs.parent;
            vm.destroyed = true;
            vm.$nextTick(() => {
                try {
                    assert.isEmpty(parent.inst.children);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
    describe("Creating a object", function() {
        describe("Properties of the object", function() {
            describe("The position property should affect the position of the instance.", function() {
                it("When the property is undefined.", function() {
                    const vm = new Vue(VglObject3d);
                    assert.strictEqual(vm.inst.position.x, 0);
                    assert.strictEqual(vm.inst.position.y, 0);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
                it("When the property is a Vector3 object.", function() {
                    const vm = new (Vue.extend(VglObject3d))({propsData: {position: new THREE.Vector3(-1, -5, 6.8)}});
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("When the property is a string.", function() {
                    const vm = new (Vue.extend(VglObject3d))({propsData: {position: "-1.0 -5e8 6.8"}});
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
            });
            describe("The rotation property should affect the rotation of the instance.", function() {
                it("When the property is undefined.", function() {
                    const vm = new Vue(VglObject3d);
                    assert.strictEqual(vm.inst.rotation.x, 0);
                    assert.strictEqual(vm.inst.rotation.y, 0);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("When the property is a Euler object.", function() {
                    const vm = new (Vue.extend(VglObject3d))({propsData: {rotation: new THREE.Euler(-1, -5, 6.8, "ZYX")}});
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.strictEqual(vm.inst.rotation.order, "ZYX");
                });
                it("When the property is a string.", function() {
                    const vm = new (Vue.extend(VglObject3d))({propsData: {rotation: "-1.0 -5e8 6.8 XZY "}});
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.strictEqual(vm.inst.rotation.order, "XZY");
                });
            });
            describe("The scale property should affect the scale of the instance.", function() {
                it("When the property is undefined.", function() {
                    const vm = new Vue(VglObject3d);
                    assert.strictEqual(vm.inst.scale.x, 1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1);
                });
                it("When the property is a Vector3 object.", function() {
                    const vm = new (Vue.extend(VglObject3d))({propsData: {scale: new THREE.Vector3(-1, -5, 6.8)}});
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("When the property is a string.", function() {
                const vm = new (Vue.extend(VglObject3d))({propsData: {scale: " -1.0 -5e8 6.8 "}});
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
            });
        });
    });
    describe("Watching properties", function() {
        describe("Should affect the position of the object when the position property is changed.", function() {
            it("From undefined to a string.", function(done) {
                const vm = new Vue(VglObject3d);
                vm.position = " 1.1  -1.9 8";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.position.x, 1.1);
                        assert.strictEqual(vm.inst.position.y, -1.9);
                        assert.strictEqual(vm.inst.position.z, 8);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From a string to a string.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {position: "2.1 3  5"}});
                vm.position = "1.1 -1.9 8";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.position.x, 1.1);
                        assert.strictEqual(vm.inst.position.y, -1.9);
                        assert.strictEqual(vm.inst.position.z, 8);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From a Vector3 object to undefined.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {position: new THREE.Vector3(1.1, -1.9, 8)}});
                vm.position = undefined;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.position.x, 0);
                        assert.strictEqual(vm.inst.position.y, 0);
                        assert.strictEqual(vm.inst.position.z, 0);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("Should affect the rotation of the object when the rotation property is changed.", function() {
            it("From undefined to a string.", function(done) {
                const vm = new Vue(VglObject3d);
                vm.rotation = "  1.1 -1.9 8  ZYX";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.rotation.x, 1.1);
                        assert.strictEqual(vm.inst.rotation.y, -1.9);
                        assert.strictEqual(vm.inst.rotation.z, 8);
                        assert.strictEqual(vm.inst.rotation.order, "ZYX");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From a string to a string.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {rotation: "2.1 3 5 ZYX"}});
                vm.rotation = "1.1 -1.9 8  YZX";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.rotation.x, 1.1);
                        assert.strictEqual(vm.inst.rotation.y, -1.9);
                        assert.strictEqual(vm.inst.rotation.z, 8);
                        assert.strictEqual(vm.inst.rotation.order, "YZX");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From an Euler object to undefined.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {rotation: new THREE.Euler(1.1, -1.9, 8, "ZYX")}});
                vm.rotation = undefined;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.rotation.x, 0);
                        assert.strictEqual(vm.inst.rotation.y, 0);
                        assert.strictEqual(vm.inst.rotation.z, 0);
                        assert.strictEqual(vm.inst.rotation.order, "XYZ");
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("Should affect the scale of the object when the scale property is changed.", function() {
            it("From undefined to a string.", function(done) {
                const vm = new Vue(VglObject3d);
                vm.scale = "1.1 -1.9 8a";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.scale.x, 1.1);
                        assert.strictEqual(vm.inst.scale.y, -1.9);
                        assert.strictEqual(vm.inst.scale.z, 8);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From a string to a string.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {scale: "2.1 3 5"}});
                vm.scale = "1.1 -1.9 8";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.scale.x, 1.1);
                        assert.strictEqual(vm.inst.scale.y, -1.9);
                        assert.strictEqual(vm.inst.scale.z, 8);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("From a Vector3 object to undefined.", function(done) {
                const vm = new (Vue.extend(VglObject3d))({propsData: {scale: new THREE.Vector3(1.1, -1.9, 8)}});
                vm.scale = undefined;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.scale.x, 1);
                        assert.strictEqual(vm.inst.scale.y, 1);
                        assert.strictEqual(vm.inst.scale.z, 1);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("Replacing the instance", function() {
        const MixedIn = {
            mixins: [VglObject3d],
            computed: {
                inst() {return this.i;}
            },
            data: () => ({i: new THREE.Object3D()})
        };
        it("The position of the replaced object should be same as before.", function(done) {
            const vm = new (Vue.extend(MixedIn))({propsData: {position: "8  7^ 9"}});
            const prev = vm.inst;
            vm.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(prev, vm.inst);
                    assert.strictEqual(vm.inst.position.x, 8);
                    assert.strictEqual(vm.inst.position.y, 7);
                    assert.strictEqual(vm.inst.position.z, 9);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The rotation of the replaced object should be same as before.", function(done) {
            const vm = new (Vue.extend(MixedIn))({propsData: {rotation: "8  6^ 9 ZYX"}});
            const prev = vm.inst;
            vm.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(prev, vm.inst);
                    assert.strictEqual(vm.inst.rotation.x, 8);
                    assert.strictEqual(vm.inst.rotation.y, 6);
                    assert.strictEqual(vm.inst.rotation.z, 9);
                    assert.strictEqual(vm.inst.rotation.order, "ZYX");
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The scale of the replaced object should be same as before.", function(done) {
            const vm = new (Vue.extend(MixedIn))({propsData: {scale: "8  1^ 2.8"}});
            const prev = vm.inst;
            vm.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(prev, vm.inst);
                    assert.strictEqual(vm.inst.scale.x, 8);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 2.8);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The replaced object should have same children as before.", function(done) {
            const vm = new Vue({
                template: `<mixed-in ref="me"><vgl-object3d v-for="i in 6" :key="i" /></mixed-in>`,
                components: {VglObject3d, MixedIn}
            }).$mount();
            const prev = vm.$refs.me.inst;
            const children = prev.children.slice(0);
            vm.$refs.me.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(prev, vm.$refs.me.inst);
                    assert.sameMembers(children, vm.$refs.me.inst.children);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The replaced object should have the same parent as before.", function(done) {
            const vm = new Vue({
                template: `<vgl-object3d ref="parent"><mixed-in ref="me" /></vgl-object3d>`,
                components: {VglObject3d, MixedIn}
            }).$mount();
            const prev = vm.$refs.me.inst;
            vm.$refs.me.i = new THREE.Object3D();
            vm.$nextTick(() => {
                try {
                    assert.notEqual(prev, vm.$refs.me.inst);
                    assert.strictEqual(vm.$refs.parent.inst, vm.$refs.me.inst.parent);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
