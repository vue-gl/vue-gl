describe("VglDirectionalLight component", function() {
    const {VglDirectionalLight} = VueGL;
    const assert = chai.assert;
    it("The instance should be an DirectionalLight object.", function() {
        const vm = new Vue(VglDirectionalLight);
        assert.isTrue(vm.inst.isDirectionalLight);
    });
});
