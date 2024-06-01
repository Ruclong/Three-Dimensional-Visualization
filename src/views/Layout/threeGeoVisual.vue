<template>
  <div class="box">
    <div id="container" class="container"></div>
    <!-- <Legend /> -->
  </div>
</template>

<script>
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';  // 导入字体加载器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';//导入场景控制器
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'; //导入gui面板
import Papa from 'papaparse';
import Legend from "./layerColor.vue";

export default {
  name: "App",
  components: {
    Legend
  },
  data() {
    return {
      container: null,//容器
      camera: null,  //摄像机
      controls: null,//控制器
      scene: null,  //场景
      renderer: null, //渲染
      mesh: null,     //材质
      texture: null,  //纹理
      worldWidth: 40, //世界网格
      worldDepth: 40, //世界网格
      drillHolesGroup: undefined, coalSeamGroup: undefined, terrainGroup: undefined, fillGeometrys: undefined,// gui组
      drillData: [
        [3851670.65, 39481878.68, 38.2, -490.77],
        [3853451.44, 39484801.52, 38.23, -780.03],
        [3851810.89, 39481631.88, 37.82, -730.81],
        [3852522.8, 39483501.3, 38.23, -681.76],
        [3852715, 39484939.3, 36.92, -705.31],
        [3851786.38, 39479075.57, 38.8, -860.32],
        [3852217.16, 39485594.02, 36.6, -508.68],
        [3852948.51, 39484500.95, 37.97, -603.43],
        [3852280.13, 39482546.22, 37.84, -784.23],
        [3851173.66, 39482247.78, 38.64, -367.55],
        [3851620.91, 39484670.85, 37.69, -317.08],
        [3851418.06, 39482737.02, 38.2, -375.98],
        [3851919.48, 39480564.63, 38.98, -691.99],
        [3851362.04, 39479184.14, 38.68, -552.18],
        [3853900.1, 39486757.05, 37.27, -868.04],
        [3851318.47, 39482763.89, 38.56, -365.39],
        [3850798.76, 39481359.99, 38.78, -348.98],
        [3853388.1, 39485779.46, 37.71, -850.26],
        [3851225.34, 39478667.74, 38.1, -517.81],
        [3853284.63, 39488088.44, 37.2, -813.65],
        [3853347, 39488599.33, 36.95, -550.61],
        [3852434.81, 39482941.04, 38.13, -800.93],
        [3850995.32, 39479287.55, 39.22, -562.33],
        [3852578.63, 39485524.95, 37.31, -645.56],
        [3851072.61, 39480224.97, 38.74, -511.41],
        [3852508.07, 39478841.57, 40.05, -986],
        [3852405.35, 39487099.04, 36.99, -332.91],
        [3852095.66, 39484579.68, 37.89, -524.73],
        [3852082.86, 39482008.59, 37.76, -791.09],
        [3850804.04, 39480895, 38.71, -418.33],
        [3851599.62, 39483701.5, 37.07, -365.25],
        [3852193.78, 39483571.82, 38.15, -432.91],
        [3851017.38, 39480840.42, 38.68, -346.2],
        [3851656.04, 39480090.83, 38.91, -765.27],
        [3852108.72, 39486603.36, 36.92, -315.82],
        [3853764.18, 39488471.36, 37.15, -762.04],
        [3850682.06, 39479950.29, 39.25, -436.97],
        [3851915.71, 39485160.93, 36.73, -389.22],
        [3850571.09, 39479415.78, 39.21, -356.57],
        [3853646.32, 39484801.52, 37.79, -693.47],
        [3853224.42, 39483790.33, 37.07, -791.35],
        [3852370.44, 39486511.78, 37.38, -494.25],
        [3851640.54, 39479652.31, 38.92, -791.35],
        [3852586.33, 39484473.89, 37.87, -671.86],
        [3851501.7, 39480829.33, 38.01, -547.88],
        [3854091.09, 39487884.24, 37.22, -829.63],
        [3853585.4, 39487483.9, 37.33, -920.58],
        [3852135.03, 39487162.06, 37.29, -410.52],
        [3850921.64, 39480269.95, 39.33, -372.37],
        [3850769.02, 39480304.59, 39.47, -455.78],
        [3851666.26, 39484188.2, 37.65, -362.05],
        [3853381.6, 39482686.05, 38.56, -892.38],
        [3852690.36, 39486446.43, 37.68, -630.99],
        [3850932.72, 39479866.22, 39.23, -518.04],
        [3851752.66, 39484670.85, 37.56, -334.66],
        [3851639.3, 39482693.47, 38.06, -314.2],
        [3852311.26, 39483546.3, 38.25, -587.15],
        [3852917.81, 39483402.26, 37.53, -734.75],
        [3851767.21, 39481103.75, 38.66, -580.77],
        [3852091.75, 39486154.47, 37.34, -358.25],
        [3850686.92, 39478797.66, 39.17, -324.51],
        [3852748.68, 39480650.72, 38.95, -926.78],
        [3851102.2, 39478181.56, 38.28, -625.44],
        [3850497, 39478850.5, 39.42, -394.46],
        [3851868.33, 39485684.43, 36.88, -313.57],
        [3853146.38, 39487573.63, 36.78, -760.58],
        [3854357.71, 39485624.96, 37.56, -1002],
        [3851151.03, 39481757.93, 38.8, -439.23],
        [3851919.79, 39482626.91, 38.19, -645.86],
      ],
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.container = document.getElementById('container');
      this.container.innerHTML = '';

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      // 创建场景及背景颜色
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xbfd1e5);

      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 50000);
      this.camera.position.set(-15000, 5000, 0);
      this.camera.lookAt(0, 0, 0); // 让摄像机朝向场景的中心点

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.enableZoom = true;
      this.controls.update();

      // 设置相机和控制器的位置
      this.camera.position.set(-15000, 5000, 0);
      this.camera.lookAt(0, 0, 0); // 让摄像机朝向场景的中心点

      // GUI面板
      this.drillHolesGroup = new THREE.Group();
      this.coalSeamGroup = new THREE.Group();
      this.terrainGroup = new THREE.Group();
      this.fillGeometrys = new THREE.Group();

      // 添加钻孔
      this.addDrillHoles();
      // 添加煤层
      this.createCoalSeam();
      // 创建地形
      const geometries = this.createTopBottom(this.drillData, this.worldDepth, this.worldWidth)
      // 添加填充
      this.addFilling(geometries)

      this.scene.add(this.drillHolesGroup);
      this.scene.add(this.coalSeamGroup);
      this.scene.add(this.terrainGroup);
      this.scene.add(this.fillGeometrys);


      // 监听鼠标移动事件
      this.container.addEventListener('pointermove', this.onPointerMove);
      // 监听窗口大小变化事件
      window.addEventListener('resize', this.onWindowResize);

      this.createGUI();

      this.animate();
    },
    createGUI() {
      // 初始化GUI
      const gui = new GUI();

      const params = {
        showDrillHoles: true,
        showCoalSeam: true,
        showTerrain: true,
        showFillGeometry: true,
        opacity: 1,

      };

      gui.add(params, 'showDrillHoles').name('显示钻孔').onChange((value) => {
        this.drillHolesGroup.visible = value;
      });

      gui.add(params, 'showCoalSeam').name('显示煤层').onChange((value) => {
        this.coalSeamGroup.visible = value;
      });

      // 添加显示地形的选项
      const terrainFolder = gui.addFolder('地形控制');
      terrainFolder.add(params, 'showTerrain').name('显示地形').onChange((value) => {
        this.terrainGroup.visible = value;
      });

      terrainFolder.add(params, 'showFillGeometry').name('添加填充').onChange((value) => {
        this.fillGeometrys.visible = value;
      });

      terrainFolder.open(); // 默认打开地形控制文件夹

      gui.add(params, 'opacity', 0, 1).name('透明度').step(0.01).onChange((value) => {
        this.fillGeometrys.children.forEach(child => {
          child.material.opacity = value;
        });
        this.terrainGroup.children.forEach(child => {
          child.material.opacity = value;
        });
      });
    },
    // 标准化数据
    normalizeDatas(data) {
      data.sort((a, b) => a[2] - b[2]);
      const xs = data.map(item => item[0]);
      const ys = data.map(item => item[1]);
      const zs = data.map(item => item[2]);

      const minMax = (values) => {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
      };

      const { min: minX, max: maxX } = minMax(xs);
      const { min: minY, max: maxY } = minMax(ys);
      const { min: minZ, max: maxZ } = minMax(zs);


      return data.map(([x, y, z], index) => {
        let normX = Math.round((((x - minX) / (maxX - minX) * 2) - 1) * 3900 / 100) * 100;
        let normY = Math.round((((y - minY) / (maxY - minY) * 2))) * 1;
        let normZ = Math.round((((z - minZ) / (maxZ - minZ) * 2) - 1) * 3900 / 100) * 100;

        if (normZ % 200 !== 0) normZ = normZ;
        else normZ = normZ + 100;
        if (normX % 200 !== 0) normX = normX;
        else normX = normX + 100;

        const gridX = ((normX + 3900) / 200);
        const gridZ = ((normZ + 3900) / 200);
        const position = gridZ * 40 + gridX;
        return [normX, y, normZ, position];
      });
    },
    // 创建地形外壳
    createTopBottom(drillData, worldDepth, worldWidth) {
      let geometries = [];
      /*
      高程表面
      */
      let arryTop = []
      for (let g = 0; g < drillData.length; g++) {
        arryTop.push([drillData[g][0], drillData[g][2], drillData[g][1],])
      }
      const geometry = new THREE.PlaneGeometry(7800, 7800, worldWidth - 1, worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      geometry.rotateY(Math.PI / 2); // 旋转以匹配地形
      let vertices = geometry.attributes.position.array;
      const normalizedData = this.normalizeDatas(arryTop);
      geometry.attributes.position.needsUpdate = true; // 此行非常重要
      geometries.push(this.cubicSplineInterpolation(normalizedData, vertices));
      for (let i = 0, j = 0; i < vertices.length; i++, j += 3) {
        vertices[j + 1] += 1250
      }
      // 创建地形网格材质，使用标准材质
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ff45,
        wireframe: true,
        opacity: 1
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 20
      mesh.position.x = 100
      mesh.position.z = -100
      this.terrainGroup.add(mesh)

      /*
      地下边界
      */
      let arryBottom = []
      for (let g = 0; g < drillData.length; g++) {
        arryBottom.push([drillData[g][0], drillData[g][3], drillData[g][1],])
      }
      // 创建一个新的平面几何体，尺寸与地形相同
      const planeGeometry = new THREE.PlaneGeometry(7800, 7800, worldWidth - 1, worldDepth - 1);
      planeGeometry.rotateX(-Math.PI / 2); // 旋转以匹配地形
      planeGeometry.rotateY(Math.PI / 2); // 旋转以匹配地形
      // 使用arry数组调整顶点位置
      const vertices2 = planeGeometry.attributes.position.array;
      const normalizedData2 = this.normalizeDatas(arryBottom);
      geometries.push(this.cubicSplineInterpolation(normalizedData2, vertices2));
      for (let i = 0, j = 0; i < vertices2.length; i++, j += 3) {
        vertices2[j + 1] -= 3250
      }
      planeGeometry.attributes.position.needsUpdate = true;
      // 创建材质

      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x8b7d6b, wireframe: true, opacity: 1 });
      // 创建网格并添加到场景
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      planeMesh.position.z = -100;
      planeMesh.position.x = 100;
      planeMesh.position.y = -5;
      this.terrainGroup.add(planeMesh);

      return geometries
    },
    //三次样条插值
    cubicSplineInterpolation(data, vertices) {
      const n = data.length;
      // 提取坐标点
      const xs = data.map(d => d[3]); // 提取归一化后的索引值
      const ys = data.map(d => d[1]); // 提取归一化后的高度值

      // 三次样条插值系数初始化
      const a = ys.slice(); // 系数a，初始化为y的值
      const b = Array(n - 1).fill(0); // 系数b，初始为0
      const d = Array(n - 1).fill(0); // 系数d，初始为0
      const h = Array(n - 1).fill(0); // 相邻数据点之间的间距

      // 计算相邻数据点之间的间距h
      for (let i = 0; i < n - 1; i++) {
        h[i] = xs[i + 1] - xs[i];
      }

      // 计算系数alpha
      const alpha = Array(n - 1).fill(0);
      for (let i = 1; i < n - 1; i++) {
        // 公式来源：三次样条插值法
        alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
      }

      // 三次样条插值法的系数矩阵
      const c = Array(n).fill(0); // 系数c
      const l = Array(n).fill(0); // 系数l
      const mu = Array(n).fill(0); // 系数mu
      const z = Array(n).fill(0); // 系数z

      // 设置边界条件，通常为自然边界条件，即二阶导数为0
      l[0] = 1;
      mu[0] = 0;
      z[0] = 0;

      // 通过追赶法求解系数
      for (let i = 1; i < n - 1; i++) {
        // l[i]表示系数矩阵对角线元素
        l[i] = 2 * (xs[i + 1] - xs[i - 1]) - h[i - 1] * mu[i - 1];
        // mu[i]表示系数矩阵的上三角元素
        mu[i] = h[i] / l[i];
        // z[i]表示系数矩阵的右端项
        z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
      }

      // 设置最后一个边界条件
      l[n - 1] = 1;
      z[n - 1] = 0;
      c[n - 1] = 0;

      // 反向迭代求解系数c, b, d
      for (let j = n - 2; j >= 0; j--) {
        // c[j]表示三次样条函数的二阶导数值
        c[j] = z[j] - mu[j] * c[j + 1];
        // b[j]表示三次样条函数的一阶导数值
        b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
        // d[j]表示三次样条函数的三阶导数值
        d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
      }

      // 遍历所有顶点，更新每个顶点的高度值
      for (let i = 0; i < vertices.length / 3; i++) {
        // 计算当前顶点的x和z坐标在归一化网格中的位置
        let x = (i % this.worldWidth) * (7800 / this.worldWidth) - 3900;
        let z = Math.floor(i / this.worldWidth) * (7800 / this.worldDepth) - 3900;

        // 找到x和z坐标的对应索引
        let idx = 0;
        for (let j = 0; j < n - 1; j++) {
          if (x >= xs[j] && x <= xs[j + 1]) {
            idx = j;
            break;
          }
        }

        // 使用三次样条插值公式计算高度值
        let height = a[idx] + b[idx] * (x - xs[idx]) + c[idx] * Math.pow((x - xs[idx]), 2) + d[idx] * Math.pow((x - xs[idx]), 3);

        // 更新顶点数组中的高度值
        vertices[i * 3 + 1] = height / 1500; // 调整高度比例
      }
      return vertices
    },
    //填充体
    addFilling(geometries) {
      // 创建填充材质，设置为棕色，不透明度为完全不透明
      const fillMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x8d6e63, transparent: true, opacity: 1 }), // 棕色
        new THREE.MeshBasicMaterial({ color: 0x3E1F00, transparent: true, opacity: 1 }), // 黑褐色
        new THREE.MeshBasicMaterial({ color: 0xffeb3b, transparent: true, opacity: 1 }), // 黄色
        new THREE.MeshBasicMaterial({ color: 0x4caf50, transparent: true, opacity: 1 }), // 绿色
      ];

      const blockSize = 7800 / this.worldWidth;

      for (let g = 0; g < geometries.length - 1; g++) {
        // 遍历高度数据数组，每个元素是地形在该点的高度
        for (let i = 0, j = 0, l = geometries[0].length - 3200; i < l; i++, j += 3) {
          const vertexHeight = geometries[g][j + 1];;
          const vertexNextHeight = geometries[g + 1][j + 1];

          // 检查顶点高度是否为NaN，如果是，则跳过当前顶点
          if (isNaN(vertexHeight) || isNaN(vertexNextHeight)) {
            continue;
          }

          // 如果顶点的高度超过vertexNextHeight，则需要添加填充体
          if (vertexHeight >= vertexNextHeight) {
            // 计算填充体的高度
            const height = vertexHeight - vertexNextHeight;
            // 创建填充体的几何形状，高度为计算所得的高度，其余为块尺寸
            const fillGeometry = new THREE.BoxGeometry(blockSize, height, blockSize);

            // 计算填充体的中心位置并平移填充几何体到该位置
            // (i % worldWidth) 和 Math.floor(i / worldWidth) 分别计算x和z坐标索引
            // -3750 + blockSize / 2 是为了将几何体中心对准坐标轴中心
            fillGeometry.translate(
              (i % this.worldWidth) * blockSize - 3800 + blockSize / 2,
              vertexNextHeight + height / 2, // 设置y坐标为水位加上半个高度，使得填充体底部位于水位高度
              Math.floor(i / this.worldWidth) * blockSize - 3800 + blockSize / 2
            );

            // 创建填充体网格，并添加到场景中
            const fillMesh = new THREE.Mesh(fillGeometry, fillMaterial[g]);
            fillMesh.rotateY(Math.PI / 2); // 旋转以匹配地形

            this.fillGeometrys.add(fillMesh);
          }
        }
      }
    },
    // 绘制侧面
    addSideFace(holeData, minX, maxX, minY, maxY) {
      //绘制侧面
      // 映射数据成处理的原数据
      const data = holeData.map(row => [row['Y'], row['X'], row['top'], row['bottom'], row['id']]);
      // 去除空值
      const filteredData = data.filter(row => row[0] != null || row[1] != null);
      //取X，Y
      const points = filteredData.map(row => [row[0], row[1]]);
      // 使用Graham扫描算法处理后的外围点数据
      const hull = this.grahamScan(points);
      //还原点信息
      const boundaryData = hull.map(point => {
        const original = data.find(row => row[0] === point[0] && row[1] === point[1]);
        return { 'id': original[4], 'Y': point[0], 'X': point[1], 'top': original[2], 'bottom': original[3], };
      });

      // 定义顶点位置数组和索引数组
      const boundaryVertices = [];
      const boundaryIndices = [];

      boundaryData.forEach((v, i) => {
        const xNorm = ((v.X - minX) / (maxX - minX) * 7800 - 3900) * 0.9;
        const yNorm = ((v.Y - minY) / (maxY - minY) * 7800 - 3900) * 0.9;
        boundaryVertices.push(yNorm, -v.top, xNorm);
        boundaryVertices.push(yNorm, -v.bottom, xNorm);

        const nextIndex = (i + 1) % boundaryData.length; // 下一个顶点索引
        boundaryIndices.push(i * 2, nextIndex * 2, nextIndex * 2 + 1); // 侧面索引1
        boundaryIndices.push(nextIndex * 2 + 1, i * 2 + 1, i * 2); // 侧面索引2
      });
      // 边界
      const geometryBoundary = new THREE.BufferGeometry();
      geometryBoundary.setAttribute('position', new THREE.Float32BufferAttribute(boundaryVertices, 3));
      geometryBoundary.setIndex(boundaryIndices);
      geometryBoundary.computeVertexNormals();
      const meshBoundary = new THREE.Mesh(geometryBoundary, new THREE.MeshLambertMaterial({
        color: 0x00ff50,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
        // wireframe: true
      }));
      this.scene.add(meshBoundary);
    },
    //计算外围点扫描算法
    grahamScan(points) {
      points.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
      const n = points.length;
      const lower = [];
      for (let i = 0; i < n; i++) {
        while (lower.length >= 2 && this.cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
          lower.pop();
        }
        lower.push(points[i]);
      }
      const upper = [];
      for (let i = n - 1; i >= 0; i--) {
        while (upper.length >= 2 && this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
          upper.pop();
        }
        upper.push(points[i]);
      }
      lower.pop();
      upper.pop();
      return lower.concat(upper);
    },
    cross(o, a, b) {
      return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    },

    // 创建煤层
    async createCoalSeam() {
      try {
        const holeData = await this.fetchHoleData();
        let verticeTop = [], verticeBottom = [];
        const drillDataX = this.drillData.map(item => item[0]);
        const drillDataY = this.drillData.map(item => item[1]);
        const minX = Math.min(...drillDataX);
        const maxX = Math.max(...drillDataX);
        const minY = Math.min(...drillDataY);
        const maxY = Math.max(...drillDataY);

        this.addSideFace(holeData, minX, maxX, minY, maxY)

        // 存储顶点信息
        for (let i = 0; i < holeData.length; i++) {

          let normX = (holeData[i].X - minX) / (maxX - minX) * 7800 - 3900;
          let normZ = (holeData[i].Y - minY) / (maxY - minY) * 7800 - 3900;
          verticeTop.push(normZ * 0.9, -holeData[i].top, normX * 0.9);
          verticeBottom.push(normZ * 0.9, -holeData[i].bottom, normX * 0.9);
        }

        // const topCurve = new THREE.CatmullRomCurve3(verticeTop);
        // const bottomCurve = new THREE.CatmullRomCurve3(verticeBottom);

        // const topPoints = topCurve.getPoints(50);
        // const bottomPoints = bottomCurve.getPoints(50);

        // const topVertices = [];
        // const bottomVertices = [];

        // topPoints.forEach(point => {
        //     topVertices.push(point.x, point.y, point.z);
        // });

        // bottomPoints.forEach(point => {
        //     bottomVertices.push(point.x, point.y, point.z);
        // });

        const indicesTop = this.TIN(verticeTop);
        const indicesBottom = this.TIN(verticeBottom);

        // 材质
        const materials = {
          top: new THREE.MeshLambertMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            // metalness: 0.6,
            // roughness: 0.4,
            wireframe: true
          }),
          bottom: new THREE.MeshLambertMaterial({
            color: 0x0004850,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            // metalness: 0.6,
            // roughness: 0.4
            // wireframe: true
          })
        };

        //顶部
        const geometryTop = new THREE.BufferGeometry();
        geometryTop.setAttribute('position', new THREE.Float32BufferAttribute(verticeTop, 3));
        geometryTop.setIndex(indicesTop);
        geometryTop.computeVertexNormals();
        const meshTop = new THREE.Mesh(geometryTop, materials.top);
        this.coalSeamGroup.add(meshTop);

        // 底部
        const geometryBottom = new THREE.BufferGeometry();
        geometryBottom.setAttribute('position', new THREE.Float32BufferAttribute(verticeBottom, 3));
        geometryBottom.setIndex(indicesBottom);
        geometryBottom.computeVertexNormals();
        const meshBottom = new THREE.Mesh(geometryBottom, materials.bottom);
        this.coalSeamGroup.add(meshBottom);

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 1); // 环境光
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 平行光
        directionalLight.position.set(0, 100, 100).normalize();
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 1000); // 点光源
        pointLight.position.set(0, 200, 200);
        this.scene.add(pointLight);
      } catch (error) {
        console.error('绘制煤层出错:', error);
      }
    },

    // 添加钻孔及字体
    async addDrillHoles() {
      // 从 CSV 文件获取数据
      const parsedData = await this.fetchHoleData();
      const holeData = parsedData.reduce((acc, item) => {
        let borehole = acc.find(b => b.id === item.id);
        if (!borehole) {
          borehole = {
            id: item.id,
            Y: item.Y,
            X: item.X,
            T: item.t,
            data: []
          };
          acc.push(borehole);
        }
        borehole.data.push({ name: item.name, top: item.top, bottom: item.bottom });
        return acc;
      }, []);
      const colorMap = {
        "9煤": 0x1C1C1C, // 极浅灰色
        // "煤": 0x1C1C1C, // 黑色
      };
      holeData.forEach(drill => {
        // 加载字体
        const loader = new FontLoader();

        drill.data.forEach(layer => {
          const xs = drill.X;
          const ys = drill.Y;
          const height = layer.bottom - layer.top;
          // 更精确的坐标归一化方法
          let normX = (xs - Math.min(...this.drillData.map(item => item[0]))) / (Math.max(...this.drillData.map(item => item[0])) - Math.min(...this.drillData.map(item => item[0]))) * 7800 - 3900;
          let normZ = (ys - Math.min(...this.drillData.map(item => item[1]))) / (Math.max(...this.drillData.map(item => item[1])) - Math.min(...this.drillData.map(item => item[1]))) * 7800 - 3900;
          // 调整钻孔的高度计算方法，使其基于地表以下深度
          const geometry = new THREE.CylinderGeometry(30, 30, height * 4.5, 32);
          const material = new THREE.MeshBasicMaterial({
            color: colorMap[layer.name] || 0xFFFFFF,
            transparent: true,
            opacity: 1
          });
          const cylinder = new THREE.Mesh(geometry, material);
          // 根据实际坐标调整钻孔位置
          cylinder.position.set(normZ * 0.9, -layer.top, normX * 0.9); // 高度的中点应该是地表下的中间位置
          this.scene.add(cylinder);


          loader.load('/font/gentilis_regular.typeface.json', (font) => {
            let color = new THREE.Color(0x000000);  // 文本颜色
            if (drill.T === -1) {
              color = 0xff0000
            }
            if (drill.T === 8) {
              color = 0x0000ff
            }
            // 创建材质
            const textMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: true,
              opacity: 1,
              side: THREE.DoubleSide
            });
            const message = drill.id + "\nH:" + height.toFixed(2);  // 要显示的文本
            // 生成文本的形状
            const shapes = font.generateShapes(message, 30);
            // 创建几何体
            const geometry = new THREE.ShapeGeometry(shapes);
            geometry.computeBoundingBox();
            // 计算文本的水平居中偏移量
            const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            // 将几何体水平居中
            geometry.translate(xMid, 0, 0);
            // 创建文本网格
            const text = new THREE.Mesh(geometry, textMaterial);
            text.position.set(normZ * 0.9 + 100, -layer.top, normX * 0.9);  // 设置文本的Z轴位置
            this.scene.add(text); // 添加到 drillHolesGroup 而不是 scene
          }); // 加载字体结束

        });
      })

    },

    // 从 CSV 文件获取数据
    async fetchHoleData() {
      try {
        const response = await fetch('/csv/999.csv');
        const data = await response.text();

        const parsedData = Papa.parse(data, {
          header: true,
          dynamicTyping: true
        }).data;
        return parsedData;
      } catch (error) {
        console.error("Error fetching hole data:", error);
      }
    },

    // 三角剖分计算绘制顺序 ,返回值 return indices
    performDelaunay(vertices) {
      //取x,z坐标，存到points2D中，算出绘制顺序，用以三角剖分
      let points2D = [];
      for (let i = 0; i < vertices.length; i += 3) {
        points2D.push([vertices[i], vertices[i + 2]]);
      }

      const delaunay = d3.Delaunay.from(points2D);
      const triangles = new Uint32Array(delaunay.triangles);
      const indices = [];
      for (let i = 0; i < triangles.length; i += 3) {
        indices.push(triangles[i], triangles[i + 1], triangles[i + 2]);
      }
      return indices
    },

    // 将质心添加上去,返回值vertices
    addCentroidsToVertices(vertices, centroids) {
      centroids.forEach(centroid => {
        vertices.push(centroid[0], centroid[1], centroid[2]);
      });
      return vertices;
    },

    // 计算质心,返回值return centroids
    calculateCentroids(vertices, indices) {
      let centroids = [];
      for (let i = 0; i < indices.length; i += 3) {
        const v1 = indices[i] * 3;
        const v2 = indices[i + 1] * 3;
        const v3 = indices[i + 2] * 3;
        const centroid = [
          (vertices[v1] + vertices[v2] + vertices[v3]) / 3,
          (vertices[v1 + 1] + vertices[v2 + 1] + vertices[v3 + 1]) / 3,
          (vertices[v1 + 2] + vertices[v2 + 2] + vertices[v3 + 2]) / 3,
        ];
        centroids.push(centroid);
      }
      return centroids;
    },

    // 执行多次三角剖分
    TIN(verticeTop) {
      for (let i = 0; i < 5; i++) {
        let index = this.performDelaunay(verticeTop);
        let centroids = this.calculateCentroids(verticeTop, index);
        verticeTop = this.addCentroidsToVertices(verticeTop, centroids);
      }
      let indices = this.performDelaunay(verticeTop);
      return indices
    },

    // 窗口大小变化事件处理函数
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderScene();
    },
    renderScene() {
      this.renderer.render(this.scene, this.camera);
    },
    onPointerMove(event) {
      const pointer = new THREE.Vector2();
      pointer.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
      pointer.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, this.camera);
      // const intersects = raycaster.intersectObject(this.mesh);
    }
  },

};
</script>

<style>
#container {
  background-color: #bfd1e5;
  /* 设置背景颜色 */
  color: #61443e;
  /* 设置文字颜色 */
  margin: 0;
  display: block;
}
</style>