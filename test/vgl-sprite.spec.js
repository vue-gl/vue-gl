describe('VglSprite:', function suite() {
  const { VglSprite, VglObject3d, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d, VglNamespace],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst.clone());
      });
    },
  };
  function after10ticks(vm, callback, count = 10) {
    vm.$nextTick(count > 0 ? () => { after10ticks(vm, callback, count - 1); } : callback);
  }
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('default', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-sprite /></object-watcher>',
      components: { VglSprite, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'Sprite');
        expect(actual.position.equals(new THREE.Sprite().position)).to.equal(true);
        expect(actual.quaternion.equals(new THREE.Sprite().quaternion)).to.equal(true);
        expect(actual.scale.equals(new THREE.Sprite().scale)).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with position property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-sprite position="-0.5 0.5 2" /></object-watcher>',
      components: { VglSprite, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'Sprite');
        expect(actual.position.equals(new THREE.Vector3(-0.5, 0.5, 2))).to.equal(true);
        expect(actual.quaternion.equals(new THREE.Sprite().quaternion)).to.equal(true);
        expect(actual.scale.equals(new THREE.Sprite().scale)).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after position property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-sprite :position="position" /></object-watcher>',
      components: { VglSprite, ObjectWatcher },
      data: { position: '0.5 1 -0.5' },
    }).$mount();
    vm.$nextTick(() => {
      vm.position = '0 0 0.5';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          expect(actual1).to.have.property('type', 'Sprite');
          expect(actual1.position.equals(new THREE.Vector3(0.5, 1, -0.5))).to.equal(true);
          expect(actual1.quaternion.equals(new THREE.Sprite().quaternion)).to.equal(true);
          expect(actual1.scale.equals(new THREE.Sprite().scale)).to.equal(true);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          expect(actual2).to.have.property('type', 'Sprite');
          expect(actual2.position.equals(new THREE.Vector3(0, 0, 0.5))).to.equal(true);
          expect(actual2.quaternion.equals(new THREE.Sprite().quaternion)).to.equal(true);
          expect(actual2.scale.equals(new THREE.Sprite().scale)).to.equal(true);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
