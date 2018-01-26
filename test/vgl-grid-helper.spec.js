describe('VglGridHelper:', function suite() {
  const { VglGridHelper, VglObject3d, VglNamespace } = VueGL;
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
  before(function hook(done) {
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera();
    this.renderer.setSize(355, 219);
    this.camera.aspect = 355 / 219;
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(new THREE.Vector3());
    this.camera.updateProjectionMatrix();
    done();
  });
  after(function hook(done) {
    this.renderer.dispose();
    done();
  });
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('default', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-grid-helper /></object-watcher>',
      components: { VglGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const scene = new THREE.Scene();
      scene.add(new THREE.Object3D().add(new THREE.GridHelper()));
      this.renderer.render(scene, this.camera);
      const expected = this.renderer.domElement.toDataURL();
      expect(updatedHistory[0]).to.equal(expected);
    });
  });
  it('with properties', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-grid-helper size="2.7" divisions="21" color-center-line="green" color-grid="red" /></object-watcher>',
      components: { VglGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const scene = new THREE.Scene();
      scene.add(new THREE.Object3D().add(new THREE.GridHelper(2.7, 21, 'green', 'red')));
      this.renderer.render(scene, this.camera);
      const expected = this.renderer.domElement.toDataURL();
      expect(updatedHistory[0]).to.equal(expected);
    });
  });
  it('after size property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-grid-helper :size="size" /></object-watcher>',
      components: { VglGridHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
      data: { size: 1.3 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.size = 1.7;
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const scene1 = new THREE.Scene();
        scene1.add(new THREE.Object3D().add(new THREE.GridHelper(1.3)));
        this.renderer.render(scene1, this.camera);
        const expected1 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[0]).to.equal(expected1);
        const scene2 = new THREE.Scene();
        scene2.add(new THREE.Object3D().add(new THREE.GridHelper(1.7)));
        this.renderer.render(scene2, this.camera);
        const expected2 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[1]).to.equal(expected2);
      });
    });
  });
});
