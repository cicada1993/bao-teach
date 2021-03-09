<template>
  <div id="map">
    <div id="mouse-position"></div>
    <div style="display: none">
      <el-popover
        ref="popover"
        id="el-popover"
        placement="top"
        title="标题"
        width="200"
        trigger="manual"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        v-model="popVisible"
      >
      </el-popover>
      <el-badge
        v-popover:popover
        @click.native="popVisible = !popVisible"
        id="el-badge"
        :value="12"
        class="item"
      >
        <el-button size="small">评论</el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { loadGeoJson } from "../api/amap";
import "ol/ol.css";
import { Map, View, Feature, Overlay } from "ol";
import { transform, fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import MousePosition from "ol/control/MousePosition";
import MultiPoint from "ol/geom/MultiPoint";
import { createStringXY } from "ol/coordinate";
import { GeoJSON } from "ol/format";
import { Fill, Style, Stroke, Circle, Icon, Text } from "ol/style";
import { getVectorContext } from "ol/render";
import { Point } from "ol/geom";
import { XYZ, OSM, TileDebug } from "ol/source";
let popover;
export default {
  name: "OlMap",
  data() {
    return {
      popVisible: false,
    };
  },
  methods: {
    async showMap() {
      let projection = "EPSG:4326"; // 地理坐标系
      let tileLayer = new TileLayer({
        // 底图 高德离线瓦片图
        source: new XYZ({
          url:
            "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
          wrapX: false,
        }),
      });
      let debugLayer = new TileLayer({
        source: new TileDebug(),
      });
      let view = new View({
        center: [114.302757018889, 30.581260421935127], // 初始中心坐标
        projection,
        zoom: 7,
        minZoom: 1,
      });
      let map = new Map({
        target: "map",
        layers: [tileLayer],
        view,
      });
      // 添加鼠标定位控制器
      let mousePosCtr = new MousePosition({
        coordinateFormat: createStringXY(5),
        projection,
        className: "cur-mouse-position",
        target: document.getElementById("mouse-position"),
        undefinedHTML: "&nbsp;",
      });
      map.addControl(mousePosCtr);

      let hbGeoLayer = await this.getProvinceGeoLayer();
      map.addLayer(hbGeoLayer);

      let tmGeoLayer = await this.getCityGeoLayer();
      map.addLayer(tmGeoLayer);

      let layerMarker = this.getLayerMarker();
      map.addLayer(layerMarker);

      let overlayMarker = this.getOverlayMarker();
      map.addOverlay(overlayMarker);

      popover = this.getOverlayPopover();
      map.addOverlay(popover);

      this.listenPointermove(map);
      this.listenSingleClick(map);
    },
    listenPointermove(map) {
      // 监听鼠标移动事件
      let selected = null;
      map.on("pointermove", (evt) => {
        if (evt.dragging) {
          // 拖拽
          return;
        }
        if (selected !== null) {
          selected.setStyle(undefined);
          selected = null;
        }
        map.forEachFeatureAtPixel(evt.pixel, (f) => {
          let data = f.values_;
          // console.log("feature move hit", f);
          if (data.level && data.level != "province") {
            selected = f;
            f.setStyle(
              new Style({
                fill: new Fill({
                  color: "rgba(255,0,0,0.1)",
                }),
                stroke: new Stroke({
                  color: "rgba(255,0,0,0.5)",
                  width: 3,
                }),
              })
            );
          }
          return true;
        });
      });
    },
    listenSingleClick(map) {
      map.on("click", (evt) => {
        popover.setPosition(undefined);
        this.popVisible = false;
        console.log(evt.coordinate);
        var view = map.getView();
        view.animate({
          center: evt.coordinate,
          duration: 1000,
        });
        map.forEachFeatureAtPixel(evt.pixel, (f) => {
          console.log("feature click hit", f);
          let data = f.values_;
          if (data.key == "yxz") {
            popover.setPosition(evt.coordinate);
            this.popVisible = true;
          }
          return true;
        });
      });
    },
    async getProvinceGeoLayer() {
      // 湖北省geojson边界
      const res = await fetch(
        "https://geo.datav.aliyun.com/areas_v2/bound/420000.json"
      );
      let geoJson = await res.json();
      let geoSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJson),
      });
      let styles = [
        new Style({
          stroke: new Stroke({
            color: "blue",
            width: 3,
          }),
        }),
      ];
      let geoLayer = new VectorLayer({
        source: geoSource,
        style: styles,
      });
      return geoLayer;
    },
    async getCityGeoLayer() {
      // 天门市geojson边界
      const res = await fetch(
        "https://geo.datav.aliyun.com/areas_v2/bound/429006.json"
      );
      let geoJson = await res.json();
      let geoSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJson),
      });
      let styles = [
        new Style({
          stroke: new Stroke({
            color: "red",
            width: 3,
          }),
        }),
      ];
      let geoLayer = new VectorLayer({
        source: geoSource,
        style: styles,
      });
      return geoLayer;
    },
    getLayerMarker() {
      // VectorLayer方式添加标记  在天门市内某处添加一个标记
      let point = new Point([112.98202514648438, 30.673353126358172]);
      let feature = new Feature({
        geometry: point,
        name: "渔薪镇",
        key: "yxz",
        population: 2000000,
      });
      let style = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
        }),
        text: new Text({
          text: "hhhhh",
          textBaseline: "top",
        }),
      });
      feature.setStyle(style);
      let source = new VectorSource({
        features: [feature],
      });
      let layer = new VectorLayer({
        source: source,
      });
      return layer;
    },
    getOverlayMarker() {
      // Overlay 方式添加标记
      let overlay = new Overlay({
        position: [113.08330535888672, 30.660359565846754],
        positioning: "center-center",
        element: document.getElementById("el-badge"),
      });
      return overlay;
    },
    getOverlayPopover() {
      // Overlay 气泡弹框
      let overlay = new Overlay({
        element: document.getElementById("el-popover"),
      });
      return overlay;
    },
  },
  mounted() {
    this.showMap();
    sessionStorage.setItem("ggg","test")
  },
};
</script>

<style lang="less">
#map {
  width: 100%;
  height: 100%;
  position: relative;
  #mouse-position {
    position: absolute;
    z-index: 100;
    color: white;
    right: 0;
    top: 20px;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>