describe("VglPointLightコンポーネントのテスト", function() {
    const {VglPointLight} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはPointLightオブジェクト", function() {
            const vm = new Vue(VglPointLight);
            assert.isTrue(vm.inst.isPointLight);
        });
    });
    describe("プロパティのテスト", function() {
        describe("distanceのテスト", function() {
            it("undefined -> 0", function() {
                const vm = new Vue(VglPointLight);
                assert.strictEqual(vm.inst.distance, 0);
            });
            it("\"2.1\" -> 2.1", function() {
                const vm = new (Vue.extend(VglPointLight))({
                    propsData: {distance: "2.1"}
                });
                assert.strictEqual(vm.inst.distance, 2.1);
            });
        });
        describe("decayのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue(VglPointLight);
                assert.strictEqual(vm.inst.decay, 1);
            });
            it("\"2\" -> 2", function() {
                const vm = new (Vue.extend(VglPointLight))({
                    propsData: {decay: "2"}
                });
                assert.strictEqual(vm.inst.decay, 2);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("distanceの変更", function() {
            it("3.5 -> \"1.8\"", function(done) {
                const vm = new (Vue.extend(VglPointLight))({
                    propsData: {distance: 3.5}
                });
                assert.strictEqual(vm.inst.distance, 3.5);
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
        });
        describe("decayの変更", function() {
            it("\"1.5\" -> 2.5", function(done) {
                const vm = new (Vue.extend(VglPointLight))({
                    propsData: {decay: "1.5"}
                });
                assert.strictEqual(vm.inst.decay, 1.5);
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
        });
    });
});
