<template>
  <my-map
    ref="xdhMap"
    adapter="TDT"
    @ready="onMapReady"
    @layer-ready="onLayerReady"
    @click="handleClick"
    @pointermove="handleMove"
    @moveend="handleMoveEnd"
    :zoom="5"
    :center="[106.011022, 37.237037]"
  >
    <my-map-geo
      :json="geo"
      :hover-style="hoverStyle"
      :stroke="stroke"
      :fill="fill"
      :text="text"
      @click="geoClick"
    ></my-map-geo>
    <my-map-image
      :coordinate="[113.261999, 23.130592]"
      :src="src"
      :zIndex="10"
      @click="imgClick"
    ></my-map-image>
    <my-map-heat :data="heatData"></my-map-heat>
  </my-map>
</template>

<script>
import { deepBlue, techBlue, black, orange, blue } from "$ui/map/utils/filters";
import { MyMap, MyMapGeo, MyMapImage, MyMapHeat } from "$ui/map";
import china from "$ui/charts/geo/china.json";
import logo from "$ui/assets/logo.png";
export default {
  components: {
    MyMap,
    MyMapGeo,
    MyMapImage,
    MyMapHeat,
  },
  data() {
    return {
      filter: blue,
      src: logo,
      geo: china,
      stroke: {
        width: 3,
        color: "rgba(255,255,255)",
      },
      fill: "rgba(0,0,255,0.1)",
      text: {
        fill: "white",
      },
      hoverStyle: {
        fill: "rgba(255, 255, 255, 0.1)",
        stroke: {
          color: "#000",
          width: 3,
        },
        text: {
          fill: "red",
        },
      },
      heatData: Array.from(
        {
          length: 1000,
        },
        (v, index) => {
          return {
            coordinate: Array.of(
              120 + Math.random() - Math.random(),
              30 + Math.random() - Math.random()
            ),
          };
        }
      ),
    };
  },
  methods: {
    geoClick(e, feature) {
      alert("geo");
    },
    imgClick(e) {
      alert("img");
    },
    handleClick(e) {},
    handleMove(e) {},
    handleMoveEnd(e) {},
    onMapReady(olMap, xdhMap) {
      console.log("地图创建完成", { olMap, xdhMap });
    },
    onLayerReady(layer, xdhMap) {
      let layers = layer.getLayersArray();
      console.log("底图创建完成", layers);
      for (let tileLayer of layers) {
        tileLayer.on("prerender", (evt) => {
          evt.context.filter = "sepia(100%) invert(100%) brightness(80%)";
        });
        tileLayer.on("postrender", (evt) => {});
      }
    },
    onPostCompose(e) {},
  },
};
</script>

<style lang="less">
.my-map {
  width: 100%;
  height: 100% !important;
}
</style>