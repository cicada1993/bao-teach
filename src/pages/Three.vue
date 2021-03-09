<template>
  <div class="three-page" ref="container"></div>
</template>

<script>
import "three/examples/js/controls/OrbitControls.js";
export default {
  data() {
    return {};
  },
  methods: {
    playCube() {
      let scene = new THREE.Scene(); // 创建场景对象

      let axesHelper = new THREE.AxesHelper(250); // 辅助三维坐标系
      scene.add(axesHelper);

      let geom = new THREE.BoxGeometry(100, 100, 100); // 创建立方体几何对象
      let material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
      }); // 创建材质对象
      let mesh = new THREE.Mesh(geom, material); // 创建网格模型
      scene.add(mesh); // 将模型添加到场景中

      let box = new THREE.SphereGeometry(60, 40, 40);
      let boxMesh = new THREE.Mesh(
        box,
        new THREE.MeshPhongMaterial({
          color: 0xff0000,
          specular: 0x4488ee,
          shininess: 12,
        })
      );
      boxMesh.position.set(150, 0, 0);
      scene.add(boxMesh);

      let point = new THREE.PointLight(0xffffff); // 创建点光源
      point.position.set(400, 200, 300); // 点光源位置
      scene.add(point); // 将点光源添加到场景中

      let ambient = new THREE.AmbientLight(0x444444); // 创建环境光
      scene.add(ambient); // 将环境光添加到场景中

      let container = this.$refs.container;

      let cwidth = container.offsetWidth;
      let cheight = container.offsetHeight;

      let k = cwidth / cheight;
      let s = 400;

      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); // 创建相机对象
      camera.position.set(200, 300, 200); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(cwidth, cheight); //设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

      container.appendChild(renderer.domElement);
      let t0 = new Date();
      let render = () => {
        // let t1 = new Date();
        // let t = t1 - t0;
        // t0 = t1;
        renderer.render(scene, camera); //执行渲染操作   指定场景、相机作为参数
        // mesh.rotateY(0.001 * t);
        // requestAnimationFrame(render);
      };
      render();

      let controls = new THREE.OrbitControls(camera, renderer.domElement); // 创建控件对象
      controls.addEventListener("change", render); //监听鼠标、键盘事件
    },
  },
  mounted() {
    this.playCube();
  },
};
</script>

<style lang="less">
.three-page {
  width: 100%;
  height: 100%;
}
</style>