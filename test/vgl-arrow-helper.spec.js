describe("VglArrowHelperのテスト", function() {
    const {VglArrowHelper} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはArrowHelperオブジェクト", function() {
            const vm = new Vue(VglArrowHelper);
            assert.isTrue(vm.inst.line.isLine);
            assert.isTrue(vm.inst.cone.isMesh);
        });
    });
    describe("プロパティのテスト", function() {
        describe("dirプロパティ", function() {
            it("\"0 2 0\" -> 0, 0, 0 (No rotation)", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {dir: "0 2 0"}
                });
                assert.strictEqual(vm.inst.rotation.x, 0);
                assert.strictEqual(vm.inst.rotation.y, 0);
                assert.strictEqual(vm.inst.rotation.z, 0);
            });
            it("\"0 2 2\" -> π/4, 0, 0", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {dir: "0 2 2"}
                });
                assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 0.00000000000000012);
                assert.strictEqual(vm.inst.rotation.y, 0);
                assert.strictEqual(vm.inst.rotation.z, 0);
            });
        });
        describe("lengthプロパティ", function() {
            it("\"3.8\" -> 3.04 (3.8 - 3.8 * 0.2)", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {length: "3.8"}
                });
                assert.strictEqual(vm.inst.line.scale.y, 3.04);
            });
        });
        describe("headLengthプロパティ", function() {
            it("\"1.1\" -> 1.1 with length", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {length: 5, headLength: "1.1"}
                });
                assert.strictEqual(vm.inst.cone.scale.y, 1.1);
            });
            it("\".1\" -> 0.1 without length", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {headLength: ".1"}
                });
                assert.strictEqual(vm.inst.cone.scale.y, 0.1);
            });
        });
        describe("headWidthプロパティ", function() {
            it("\"1.2\" -> 1.2 with length", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {length: 4, headWidth: "1.2"}
                });
                assert.strictEqual(vm.inst.cone.scale.x, 1.2);
            });
            it("\".2\" -> 0.2 without length", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {headWidth: ".2"}
                });
                assert.strictEqual(vm.inst.cone.scale.x, 0.2);
            });
        });
        describe("colorプロパティ", function() {
            it("#676767", function() {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {color: "#676767"}
                });
                assert.strictEqual(vm.inst.line.material.color.getHex(), 0x676767);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("dirの変更", function() {
            it("\"0 2 0\" -> \"0 2 2\"", function(done) {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {dir: "0 2 0"}
                });
                assert.strictEqual(vm.inst.rotation.x, 0);
                vm.dir = "0 2 2";
                vm.$nextTick(() => {
                    assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 0.00000000000000012);
                    done();
                });
            });
        });
        describe("lengthの変更", function() {
            it("3 -> \"5\"", function(done) {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {length: 3}
                });
                assert.strictEqual(vm.inst.line.scale.y, 2.4);
                vm.length = "5";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.line.scale.y, 4);
                    done();
                });
            });
        });
        describe("headLengthの変更", function() {
            it("\".25\" -> 0.35", function(done) {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {headLength: ".25"}
                });
                assert.strictEqual(vm.inst.cone.scale.y, 0.25);
                vm.headLength = 0.35;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.cone.scale.y, 0.35);
                    done();
                });
            });
        });
        describe("headWidthの変更", function() {
            it("\".15\" -> 0.25", function(done) {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {headWidth: ".15"}
                });
                assert.strictEqual(vm.inst.cone.scale.z, 0.15);
                vm.headWidth = 0.25;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.cone.scale.z, 0.25);
                    done();
                });
            });
        });
        describe("colorの変更", function() {
            it("#ffdd77 -> #ab76c5", function(done) {
                const vm = new (Vue.extend(VglArrowHelper))({
                    propsData: {color: "#ffdd77"}
                });
                assert.strictEqual(vm.inst.cone.material.color.getHex(), 0xffdd77);
                vm.color = "#ab76c5";
                return vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.cone.material.color.getHex(), 0xab76c5);
                    done();
                });
            });
        });
    });
});
