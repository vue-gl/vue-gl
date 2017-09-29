describe("VglPointsMaterialコンポーネントのテスト", function() {
    const {VglPointsMaterial} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはPointsMaterialオブジェクト", function() {
            const vm = new Vue(VglPointsMaterial);
            assert.isTrue(vm.inst.isPointsMaterial);
        });
    });
    describe("プロパティのテスト", function() {
        describe("colorのテスト", function() {
            it("undefined -> 1, 1, 1", function() {
                const vm = new Vue(VglPointsMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
            });
            it("#e2e2e2 -> 0.886, 0.886, 0.886", function() {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {color: "#e2e2e2"}
                });
                assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
            });
        });
        describe("sizeのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue(VglPointsMaterial);
                assert.strictEqual(vm.inst.size, 1);
            });
            it("0.8 -> 0.8", function() {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {size: "0.8"}
                });
                assert.strictEqual(vm.inst.size, 0.8);
            });
        });
        describe("sizeAttenuationのテスト", function() {
            it("undefined -> true", function() {
                const vm = new Vue(VglPointsMaterial);
                assert.isTrue(vm.inst.sizeAttenuation);
            });
            it("true -> true", function() {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {sizeAttenuation: true}
                });
                assert.isTrue(vm.inst.sizeAttenuation);
            });
            it("false -> false", function() {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {sizeAttenuation: false}
                });
                assert.isFalse(vm.inst.sizeAttenuation);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorの変更", function() {
            it("undefined -> #000", function(done) {
                const vm = new Vue(VglPointsMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
                vm.color = "#000";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0);
                    assert.strictEqual(vm.inst.color.g, 0);
                    assert.strictEqual(vm.inst.color.b, 0);
                    done();
                });
            });
            it("#000000 -> #e2e2e2", function(done) {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {color: "#000000"}
                });
                assert.strictEqual(vm.inst.color.r, 0);
                assert.strictEqual(vm.inst.color.g, 0);
                assert.strictEqual(vm.inst.color.b, 0);
                vm.color = "#e2e2e2";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
                    done();
                });
            });
        });
        describe("sizeの変更", function() {
            it("undefined -> 2", function(done) {
                const vm = new Vue(VglPointsMaterial);
                assert.strictEqual(vm.inst.size, 1);
                vm.size = "2";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.size, 2);
                    done();
                });
            });
            it("0.8 -> 0.9", function(done) {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {size: "0.8"}
                });
                assert.strictEqual(vm.inst.size, 0.8);
                vm.size = 0.9;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.size, 0.9);
                    done();
                });
            });
        });
        describe("sizeAttenuationの変更", function() {
            it("undefined -> false", function(done) {
                const vm = new Vue(VglPointsMaterial);
                assert.isTrue(vm.inst.sizeAttenuation);
                vm.sizeAttenuation = false;
                vm.$nextTick(() => {
                    assert.isFalse(vm.inst.sizeAttenuation);
                    done();
                });
            });
            it("false -> true", function(done) {
                const vm = new (Vue.extend(VglPointsMaterial))({
                    propsData: {sizeAttenuation: false}
                });
                assert.isFalse(vm.inst.sizeAttenuation);
                vm.sizeAttenuation = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.sizeAttenuation);
                    done();
                });
            });
        });
    });
});
