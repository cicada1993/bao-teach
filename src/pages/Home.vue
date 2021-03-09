<template>
  <el-container class="home">
    <el-header>
      <div class="title-bar">Emscripten Project Manager System</div>
    </el-header>
    <el-container>
      <el-aside class="proj-menus">
        <el-menu default-active="proj_0">
          <el-menu-item
            @click="curIndex = index"
            v-for="(name, index) in projMenus"
            :key="index"
            :index="'proj_' + index"
          >
            <i class="el-icon-eleme" /><span>{{ name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="proj-page">
        <el-upload
          :on-change="changeFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :auto-upload="false"
          :file-list="fileList"
          action=""
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <canvas id="canvas" :width="cw" :height="ch" />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import { userStore } from "../storage";
import { loadEmProjs } from "../api/local";
import { testWorker } from "../workers";
export default {
  name: "HomePage",
  computed: {
    projUrl() {
      if (this.projMenus.length > 0) {
        return `/local/${this.projMenus[this.curIndex]}/`;
      }
      return "";
    },
  },
  data() {
    return {
      projMenus: [],
      curIndex: 0,
      fileList: [],
      cw: 300,
      ch: 300,
    };
  },
  created() {
    this.loadProjs();
  },
  methods: {
    async loadProjs() {
      const res = await loadEmProjs();
      this.projMenus = res.result;
    },
    async saveSth() {
      await userStore.setItem("user_info", { id: 123, name: "张三" });
      testWorker.postMessage({ type: "storage" });
    },
    handlePreview(file) {
      console.log("文件预览", file);
    },
    handleRemove(file, fileList) {
      console.log("删除文件", fileList);
    },
    changeFile(file) {
      console.log("文件信息", file);
      let image = new Image();
      image.onload = () => {
        console.log("图片加载完成");
        console.log("图片尺寸", {
          w: image.width,
          h: image.height,
        });
        // ctx_2d.drawImage(image, 500, 500, 300, 200, 0, 0, 300, 200);
      };
      image.onabort = () => {
        console.log("图片取消加载");
      };
      image.onerror = (err) => {
        console.log("图片加载失败", err);
      };
      image.src = file.url;
    },
    drawSth() {
      let cWidth = this.cw;
      let cHeight = this.ch;
      let canvas = document.getElementById("canvas");
      let ctx_2d = canvas.getContext("2d");
      ctx_2d.fillStyle = "rgba(0,0,255,1)";
      ctx_2d.fillRect(0, 0, cWidth, cHeight);
      
      // 读取像素数据
      let imageData = ctx_2d.getImageData(0, 0, cWidth, cHeight);
      let pixelData = imageData.data;
      console.log("画布像素数据", pixelData);
      console.time('转化')
      // 像素灰度
      for (let i = 0; i < pixelData.length; i += 4) {
        let pixelAvg = (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;
        pixelData[i] = pixelAvg;
        pixelData[i + 1] = pixelAvg;
        pixelData[i + 2] = pixelAvg;
      }
      console.timeEnd('转化')
      ctx_2d.putImageData(imageData, 0, 0);
    },
  },
  mounted() {
    this.saveSth();
    this.drawSth();
  },
};
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .el-header {
    padding: 0;
    color: white;
    font-weight: bold;
  }
  .title-bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .proj-menus {
  }
  .proj-page {
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
    }
  }

  #canvas {
    background: white;
  }
}
</style>