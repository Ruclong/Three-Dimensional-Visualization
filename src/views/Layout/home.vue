<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { getList, getCoordinate } from "@/api/file.js";

export default {
  data() {
    return {
      container: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      mesh: null,
      texture: null,
      helper: null,
      worldWidth: 40,
      worldDepth: 40,
      data: [
        [3851670.65, 38.2, 39481878.68],
        [3853451.44, 38.23, 39484801.52],
        [3851810.89, 37.82, 39481631.88],
        [3852522.8, 38.23, 39483501.3],
        [3852715.0, 36.92, 39484939.3],
        [3851786.38, 38.8, 39479075.57],
        [3852217.16, 36.6, 39485594.02],
        [3852948.51, 37.97, 39484500.95],
        [3852280.13, 37.84, 39482546.22],
        [3851173.66, 38.64, 39482247.78],
        [3851418.06, 38.2, 39482737.02],
        [3851919.48, 38.98, 39480564.63],
        [3851362.04, 38.68, 39479184.14],
        [3853347.0, 36.95, 39488599.33],
        [3853900.1, 37.27, 39486757.05],
        [3851318.47, 38.56, 39482763.89],
        [3850798.76, 38.78, 39481359.99],
        [3853388.1, 37.71, 39485779.46],
        [3851225.34, 38.1, 39478667.74],
        [3853284.63, 37.2, 39488088.44],
        [3852434.81, 38.13, 39482941.04],
        [3850995.32, 39.22, 39479287.55],
        [3852578.63, 37.31, 39485524.95],
        [3851072.61, 38.74, 39480224.97],
        [3851620.91, 37.69, 39484670.85],
        [3852508.07, 40.05, 39478841.57],
        [3852405.35, 36.99, 39487099.04],
        [3852095.66, 37.89, 39484579.68],
        [3852082.86, 37.76, 39482008.59],
        [3850804.04, 38.71, 39480895.0],
        [3851599.62, 37.07, 39483701.5],
        [3852193.78, 38.15, 39483571.82],
        [3851017.38, 38.68, 39480840.42],
        [3851656.04, 38.91, 39480090.83],
        [3852108.72, 36.92, 39486603.36],
        [3853764.18, 37.15, 39488471.36],
        [3850682.06, 39.25, 39479950.29],
        [3851915.71, 36.73, 39485160.93],
        [3850571.09, 39.21, 39479415.78],
        [3853646.32, 37.79, 39484801.52],
        [3853224.42, 37.07, 39483790.33],
        [3852370.44, 37.38, 39486511.78],
        [3851640.54, 38.92, 39479652.31],
        [3852586.33, 37.87, 39484473.89],
        [3851501.7, 38.01, 39480829.33],
        [3854091.09, 37.22, 39487884.24],
        [3853585.4, 37.33, 39487483.9],
        [3852135.03, 37.29, 39487162.06],
        [3850921.64, 39.33, 39480269.95],
        [3850769.02, 39.47, 39480304.59],
        [3851666.26, 37.65, 39484188.2],
        [3853381.6, 38.56, 39482686.05],
        [3852690.36, 37.68, 39486446.43],
        [3850932.72, 39.23, 39479866.22],
        [3851752.66, 37.56, 39484670.85],
        [3851639.3, 38.06, 39482693.47],
        [3852311.26, 38.25, 39483546.3],
        [3852917.81, 37.53, 39483402.26],
        [3851767.21, 38.66, 39481103.75],
        [3852091.75, 37.34, 39486154.47],
        [3850686.92, 39.17, 39478797.66],
        [3852748.68, 38.95, 39480650.72],
        [3851102.2, 38.28, 39478181.56],
        [3850497.0, 39.42, 39478850.5],
        [3851868.33, 36.88, 39485684.43],
        [3853146.38, 36.78, 39487573.63],
        [3854357.71, 37.56, 39485624.96],
        [3851151.03, 38.8, 39481757.93],
        [3851919.79, 38.19, 39482626.91]
      ],
      datas: [],
    };
  },
  watch: {
    datas: {
      handler(old, New) {
      }
    }
  },
  mounted() {


    // this.getHoleDetail();
    this.getPanel();
  },
  methods: {
    async getPanel() {
      // const response = await getCoordinate()
      // // 处理成功的情况
      // for (let i = 0; i < response.data.length; i++) {
      //   this.datas.push(response.data[i].coordinateInfoList)
      // }

      // const response = await getList()
      // this.data=[]
      // // 处理成功的情况
      // for (let i = 0; i < response.data.length; i++) {
      //   this.data.push([response.data[i].latitude, response.data[i].longitude, response.data[i].altitude, -response.data[i].overDepth])
      // }
      // console.log('获取的数据：', this.data)

      this.init();
      this.animate();
    },
    async getHoleDetail() {
      // try {
      //   const response = await getList()
      //   // 处理成功的情况
      //   for (let i = 0; i < response.data.length; i++) {
      //     this.data.push([response.data[i].latitude, response.data[i].longitude, response.data[i].altitude, -response.data[i].overDepth])
      //   }
      // } catch (error) {
      //   // 处理错误的情况
      //   console.error('请求出错：', error)
      // }
    },
    init() {
      this.container = document.getElementById('container');
      this.container.innerHTML = '';

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      // 创建场景
      this.scene = new THREE.Scene();
      // 设置场景背景颜色
      this.scene.background = new THREE.Color(0xbfd1e5);

      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 20000);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 1000;
      this.controls.maxDistance = 10000;
      this.controls.maxPolarAngle = Math.PI;

      // 创建箭头表示坐标轴 X、Y、Z
      const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 2000, 0xff0000);
      const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 2000, 0x000000);
      const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 2000, 0x00ff00);

      this.scene.add(xAxis);
      this.scene.add(yAxis);
      this.scene.add(zAxis);

      // 设置相机和控制器的位置
      this.controls.target.y = 500;
      this.camera.position.y = this.controls.target.y + 2000;
      this.camera.position.z = 2000;
      this.controls.update();

      // const geometry = new THREE.PlaneGeometry(7800, 7800, this.worldWidth - 1, this.worldDepth - 1);
      // geometry.rotateX(-Math.PI / 2);
      const geometries = this.createPlanes()

      for (let s = 0; s < geometries.length; s++) {
        const vertices = geometries[s].attributes.position.array;
        // 归一化数据
        const normalizedData = this.normalizeDatasZ(this.datas[s]).sort((a, b) => a[3] - b[3]);
        const normalizedData_copy = this.normalizeDatasX(this.datas[s]).sort((a, b) => a[3] - b[3]);
        // 在使用线性插值前 先处理数据
        const dataPostion = this.beforeInterpolation(normalizedData)
        const dataPostion_copy = this.beforeInterpolation(normalizedData_copy).sort((a, b) => a[3] - b[3])

        // 横向线性插值
        this.linerInterpolationZ(dataPostion, vertices)
        this.linerInterpolationX(dataPostion_copy, vertices)

      }
      // 生成两个面之间填充体
      this.addFilling(geometries);

      // 监听鼠标移动事件
      this.container.addEventListener('pointermove', this.onPointerMove);
      // 监听窗口大小变化事件
      window.addEventListener('resize', this.onWindowResize);
    },

    // 创建地形层
    createPlanes() {
      const settings = [
        { heightFactor: 10, colorIndex: 2, yPos: 600 },
        { heightFactor: 7, colorIndex: 0, yPos: 0 },
        { heightFactor: 50, colorIndex: 3, yPos: -300 }
      ];
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x8d6e63 }), // 棕色
        new THREE.MeshBasicMaterial({ color: 0xffeb3b }), // 黄色
        new THREE.MeshBasicMaterial({ color: 0x4caf50 }), // 绿色
        new THREE.MeshBasicMaterial({ color: 0x3E1F00 }), // 黑褐色
      ];
      let geometries = []; // 存储每个平面的几何体
      settings.forEach((setting, index) => {
        const geometry = new THREE.PlaneGeometry(7800, 7800, this.worldWidth - 1, this.worldDepth - 1);
        geometry.rotateX(-Math.PI / 2);
        const mesh = new THREE.Mesh(geometry, materials[setting.colorIndex]);
        mesh.position.y = setting.yPos;
        this.scene.add(mesh);
        geometries.push(geometry); // 将几何体添加到数组中
      });
      return geometries;
    },
    addFilling(geometries) {

      // 创建填充材质，设置为棕色，不透明度为完全不透明
      const fillMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x8d6e63 }), // 棕色
        new THREE.MeshBasicMaterial({ color: 0x3E1F00 }), // 黑褐色
        new THREE.MeshBasicMaterial({ color: 0xffeb3b }), // 黄色
        new THREE.MeshBasicMaterial({ color: 0x4caf50 }), // 绿色

      ];

      // 计算每个方块的尺寸，总长度为7800，按worldWidth分割
      const blockSize = 7800 / this.worldWidth;

      for (let g = 0; g < geometries.length - 1; g++) {
        // 遍历高度数据数组，每个元素是地形在该点的高度
        for (let i = 0, j = 0, l = geometries[0].attributes.position.array.length; i < l; i++, j += 3) {
          const vertexHeight = geometries[g].attributes.position.array[j + 1];;
          const vertexNextHeight = geometries[g + 1].attributes.position.array[j + 1];
          // 如果顶点的高度超过vertexNextHeight，则需要添加填充体
          if (vertexHeight > vertexNextHeight) {
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
            this.scene.add(fillMesh);
          }
        }
      }
    },
    // 线性插值前数据处理
    beforeInterpolation(normalizedData) {
      // 将高度数据和索引存入arrayLine[]中
      let arrayLine = [];
      for (let i = 0; i < normalizedData.length; i++) {
        const H = Math.floor(normalizedData[i][3] / 40)
        const L = Math.floor(normalizedData[i][3] % 40)

        arrayLine.push([normalizedData[i][1], normalizedData[i][3], H, L])

      }
      return arrayLine
    },
    // Z 线性插值
    linerInterpolationZ(dataPostion, vertices) {
      // 横向插值
      for (let k = 0; k < dataPostion.length; k++) {
        // 数据：dataPostion[k][0]，索引：dataPostion[k][1]
        const index = dataPostion[k][1];
        const data = dataPostion[k][0];
        let stride, num;  // 在循环体开始处声明 stride
        // 计算步长
        if (k == 0) {
          stride = (dataPostion[k][0] - 0) / (dataPostion[k][1] - 0)
          num = dataPostion[k][1] - 0
        } else {
          const previousIndex = dataPostion[k - 1][1];
          const previousData = dataPostion[k - 1][0];
          num = index - previousIndex;
          stride = (data - previousData) / (index - previousIndex);
        }

        // 将数据点插入
        let paneIndex = index * 3;// 所在几何平面的索引
        // 高度
        let Y = data * 5;
        // 先填充有高度顶点
        vertices[paneIndex + 1] = Y

        for (let j = num, i = 1; j > 0; j--, i++) {
          vertices[paneIndex - 3 * i + 1] = (data - stride * i) * 5
        }

      }
    },

    // X 线性插值
    linerInterpolationX(dataPostion, vertices) {
      // 纵向插值
      for (let k = 0; k < dataPostion.length; k++) {
        // 数据：dataPostion[k][0]，索引：dataPostion[k][1], 行: dataPostion[k][2], 列: dataPostion[k][3]
        const data = dataPostion[k][0];
        const index = dataPostion[k][1];
        // H L 都是0-39
        const H = dataPostion[k][2];
        const L = dataPostion[k][3];
        let stride, num;  // 在循环体开始处声明 stride
        // 计算步长
        if (k == 0) {
          stride = (dataPostion[k][0] - 0) / (H - 0)
          num = H - 0
        }
        else {
          const preH = dataPostion[k - 1][2];
          const preL = dataPostion[k - 1][3];
          if (L === preL) {
            num = H - preH
          } else {
            num = H
          }

          stride = (data) / (H - preH);
        }

        // 将数据点插入
        let paneIndex = index;// 所在几何平面的索引

        for (let j = 1, i = 1; j <= num; j++, i++) {
          // console.log(paneIndex-40*j, (data - stride * (i-0.3)) * 5);
          vertices[(index - 40 * j) * 3 + 1] = (data - stride * i)

        }

      }
    },

    normalizeDatasZ(data) {
      // 按z坐标排序
      data.sort((a, b) => a[2] - b[2]);

      // 提取x, y, z坐标数组
      const xs = data.map(item => item[0]);
      const ys = data.map(item => item[1]);
      const zs = data.map(item => item[2]);

      // 计算最小值和最大值
      const minMax = (values) => {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
      };

      const { min: minX, max: maxX } = minMax(xs);
      const { min: minY, max: maxY } = minMax(ys);
      const { min: minZ, max: maxZ } = minMax(zs);

      // 归一化坐标并计算排序位置
      return data.map(([x, y, z], index) => {
        // 归一化X坐标并四舍五入到最近的100
        let normX = Math.round((((x - minX) / (maxX - minX) * 2) - 1) * 3900 / 100) * 100;
        // 归一化X坐标并四舍五入到最近的100
        let normY = Math.round((((y - minY) / (maxY - minY) * 2) - 1) * 50) * 1;
        // 归一化Z坐标并四舍五入到最近的100
        let normZ = Math.round((((z - minZ) / (maxZ - minZ) * 2) - 1) * 3900 / 100) * 100;

        if (normZ % 200 !== 0) {
          normZ = normZ
        } else {
          normZ = normZ + 100
        }
        if (normX % 200 !== 0) {
          normX = normX
        } else {
          normX = normX + 100
        }
        // 计算归一化坐标在40*40网格中的X和Z索引
        const gridX = ((normX + 3900) / 200);
        const gridZ = ((normZ + 3900) / 200);

        // 计算排序位置
        const position = gridZ * 40 + gridX;
        return [normX, normY, normZ, position];
      });

    },

    normalizeDatasX(data) {
      // 按z坐标排序
      data.sort((a, b) => a[2] - b[2]);

      // 提取x, y, z坐标数组
      const xs = data.map(item => item[0]);
      const ys = data.map(item => item[1]);
      const zs = data.map(item => item[2]);

      // 计算最小值和最大值
      const minMax = (values) => {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
      };

      const { min: minX, max: maxX } = minMax(xs);
      const { min: minY, max: maxY } = minMax(ys);
      const { min: minZ, max: maxZ } = minMax(zs);

      // 归一化坐标并计算排序位置
      return data.map(([x, y, z], index) => {
        // 归一化X坐标并四舍五入到最近的100
        let normX = Math.round((((x - minX) / (maxX - minX) * 2) - 1) * 3900 / 100) * 100;
        // 归一化X坐标并四舍五入到最近的100
        let normY = Math.round((((y - minY) / (maxY - minY) * 2) - 1) * 50) * 1;
        // 归一化Z坐标并四舍五入到最近的100
        let normZ = Math.round((((z - minZ) / (maxZ - minZ) * 2) - 1) * 3900 / 100) * 100;

        if (normZ % 200 !== 0) {
          normZ = normZ
        } else {
          normZ = normZ + 100
        }
        if (normX % 200 !== 0) {
          normX = normX
        } else {
          normX = normX + 100
        }
        // 计算归一化坐标在40*40网格中的X和Z索引
        const gridX = ((normX + 3900) / 200);
        const gridZ = ((normZ + 3900) / 200);

        // 计算排序位置
        const position = gridZ * 40 + gridX;
        return [normX, normY, normZ, position];
      });

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
