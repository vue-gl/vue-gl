/* globals chai Vue VueGL */

describe("VglDirectionalLight component", function() {
    const {VglDirectionalLight} = VueGL;
    const assert = chai.assert;
    it("The instance should be an DirectionalLight object.", function() {
        const vm = new Vue(VglDirectionalLight);
        assert.isTrue(vm.inst.isDirectionalLight);
    });
    describe("Properties of the light", function() {
        describe("The castShadow property", function() {
            it("When the property is false.", function() {
                const vm = new (Vue.extend(VglDirectionalLight))({
                    propsData: {castShadow: false}
                });
                assert.isFalse(vm.inst.castShadow);
            });
            it("When the property is true.", function() {
                const vm = new (Vue.extend(VglDirectionalLight))({
                    propsData: {castShadow: true}
                });
                assert.isTrue(vm.inst.castShadow);
            });
        });
    });
    describe("Watching properties", function() {
        describe("The castShadow property", function() {
            it("The instance property should be reflected when the property changes.", function(done) {
                const vm = new Vue(VglDirectionalLight);
                vm.castShadow = true;
                vm.$nextTick(() => {
                    try {
                        assert.isTrue(vm.inst.castShadow);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
});
