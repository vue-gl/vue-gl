describe('VglArrowHelper:', function suite() {
  const { VglArrowHelper, VglObject3d } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d],
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
  it('with dir property', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper dir="5 1 -1" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const scene = new THREE.Scene();
      scene.add(new THREE.Object3D()
        .add(new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
        )));
      this.renderer.render(scene, this.camera);
      const expected = this.renderer.domElement.toDataURL();
      expect(updatedHistory[0]).to.equal(expected);
    });
  });
  it('with dir, length, headLength, and headWidth properties', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper dir="5 1 -1" length="3.1" head-length="2.01" head-width="1.11" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const scene = new THREE.Scene();
      scene.add(new THREE.Object3D()
        .add(new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
          3.1,
          undefined,
          2.01,
          1.11,
        )));
      this.renderer.render(scene, this.camera);
      const expected = this.renderer.domElement.toDataURL();
      expect(updatedHistory[0]).to.equal(expected);
    });
  });
  it('with dir and color properties', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper dir="5 1 -1" color="#f23d8a" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const scene = new THREE.Scene();
      scene.add(new THREE.Object3D()
        .add(new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
          undefined,
          new THREE.Color('#f23d8a'),
        )));
      this.renderer.render(scene, this.camera);
      const expected = this.renderer.domElement.toDataURL();
      expect(updatedHistory[0]).to.equal(expected);
    });
  });
  it('after dir property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper :dir="dir" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
      data: { dir: '5 1 -1' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.dir = '2 -11 8.8';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const scene1 = new THREE.Scene();
        scene1.add(new THREE.Object3D()
          .add(new THREE.ArrowHelper(
            new THREE.Vector3(5, 1, -1).normalize(),
            new THREE.Vector3(),
          )));
        this.renderer.render(scene1, this.camera);
        const expected1 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[0]).to.equal(expected1);
        const scene2 = new THREE.Scene();
        scene2.add(new THREE.Object3D()
          .add(new THREE.ArrowHelper(
            new THREE.Vector3(2, -11, 8.8).normalize(),
            new THREE.Vector3(),
          )));
        this.renderer.render(scene2, this.camera);
        const expected2 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[1]).to.equal(expected2);
      });
    });
  });
  it('after length property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper dir="5 1 -1" :length="length" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
      data: { length: '2.1' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.length = '3.3';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const scene1 = new THREE.Scene();
        scene1.add(new THREE.Object3D()
          .add(new THREE.ArrowHelper(
            new THREE.Vector3(5, 1, -1).normalize(),
            new THREE.Vector3(),
            2.1,
          )));
        this.renderer.render(scene1, this.camera);
        const expected1 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[0]).to.equal(expected1);
        const scene2 = new THREE.Scene();
        scene2.add(new THREE.Object3D()
          .add(new THREE.ArrowHelper(
            new THREE.Vector3(5, 1, -1).normalize(),
            new THREE.Vector3(),
            3.3,
          )));
        this.renderer.render(scene2, this.camera);
        const expected2 = this.renderer.domElement.toDataURL();
        expect(updatedHistory[1]).to.equal(expected2);
      });
    });
  });
});
