describe('VglPolarGridHelper:', function suite() {
  const { VglPolarGridHelper, VglObject3d, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d, VglNamespace],
    props: ['renderer', 'camera'],
    created() {
      this.vglObject3d.listeners.push(() => {
        this.renderer.render(new THREE.Scene().add(this.inst), this.camera);
        updatedHistory.push(this.renderer.domElement.toDataURL());
      });
    },
  };
  function after10ticks(vm, callback, count = 10) {
    vm.$nextTick(count > 0 ? () => { after10ticks(vm, callback, count - 1); } : callback);
  }
  before(function hook(done) {
    try {
      this.renderer = new THREE.WebGLRenderer();
    } catch (e) {
      this.skip();
    }
    this.camera = new THREE.PerspectiveCamera();
    this.renderer.setSize(355, 219);
    this.camera.aspect = 355 / 219;
    this.camera.position.set(15, 15, 15);
    this.camera.lookAt(new THREE.Vector3());
    this.camera.updateProjectionMatrix();
    done();
  });
  after(function hook(done) {
    if (this.renderer) {
      this.renderer.dispose();
    }
    done();
  });
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('default', function test(done) {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-polar-grid-helper /></object-watcher>',
      components: { VglPolarGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const scene = new THREE.Scene();
        scene.add(new THREE.Object3D().add(new THREE.PolarGridHelper()));
        this.renderer.render(scene, this.camera);
        const expected = this.renderer.domElement.toDataURL();
        expect(updatedHistory[0]).to.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-polar-grid-helper radius="27.21" radials="11" circles="11" divisions="32" color1="#aa823f" color2="#f3dae2" /></object-watcher>',
      components: { VglPolarGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const scene = new THREE.Scene();
        const obj = new THREE.Object3D();
        scene.add(obj.add(new THREE.PolarGridHelper(27.21, 11, 11, 32, 0xaa823f, 0xf3dae2)));
        this.renderer.render(scene, this.camera);
        const expected = this.renderer.domElement.toDataURL();
        expect(updatedHistory[0]).to.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after radius property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-polar-grid-helper :radius="radius" /></object-watcher>',
      components: { VglPolarGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
      data: { radius: '10.3' },
    }).$mount();
    vm.$nextTick(() => {
      vm.radius = '13.7';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const scene1 = new THREE.Scene();
          scene1.add(new THREE.Object3D().add(new THREE.PolarGridHelper(10.3)));
          this.renderer.render(scene1, this.camera);
          const expected1 = this.renderer.domElement.toDataURL();
          expect(updatedHistory[0]).to.equal(expected1);
          const scene2 = new THREE.Scene();
          scene2.add(new THREE.Object3D().add(new THREE.PolarGridHelper(13.7)));
          this.renderer.render(scene2, this.camera);
          const expected2 = this.renderer.domElement.toDataURL();
          expect(updatedHistory[1]).to.equal(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
