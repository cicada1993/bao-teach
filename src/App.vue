<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
// 测试差异化构建结果
import "theme.css";
import themeObj from "theme";
export default {
  name: "App",
  mounted() {
    console.log("themeObj", themeObj);
    if (!window["AMap"]) {
      window["onAMapLoaded"] = this.onAMapLoaded;
      const jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src =
        "https://webapi.amap.com/maps?v=2.0&key=eedc2c43f8e152700e79a44203bf6dee&plugin=AMap.Geolocation&callback=onAMapLoaded";
      document.head.appendChild(jsapi);
    } else {
      this.onAMapLoaded();
    }
  },
  methods: {
    onAMapLoaded() {
      console.log("高德地图已加载");
      const geoLocation = new window["AMap"].Geolocation({ extensions: "all" });
      // 获取当前位置
      geoLocation.getCurrentPosition((status, result) => {
        console.log("高德地图定位结果", result);
        window["AMap"].plugin("AMap.Geocoder", () => {
          // let geocoder = new window["AMap"].Geocoder({});

          // let lnglat = [result.position.lng, result.position.lat];
          // geocoder.getAddress(lnglat, (status, res) => {
          //   console.log('详细位置信息',res);
          // });
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
