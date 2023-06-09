<template>
  <div id="firstPage">
    <div class="map">
      <!--  -->
      <!-- <el-amap-search-box class="search-box"></el-amap-search-box> -->
      <div class="search-box">
        <el-input
          placeholder="请输入门店地址"
          v-model="keyword"
          style="width: 400px"
        />
        <el-button class="ml-10" type="primary" @click="onSearchResult(keyword)"
          >搜索</el-button
        >
      </div>
      <el-amap :center="center" :events="events" :zoom="zoom" id="container">
        <el-amap-marker :position="center" :label="label"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {},
  data() {
    return {
      center: [116.397428, 39.90923],
      zoom: 15,
      label: {
        content: "门店",
        offset: [10, 12],
      },
      events: {
        click: this.change,
      },
      keyword: "",
    };
  },
  updated() {},
  mounted() {},
  created() {
    // setTimeout(() => {
    this.initMap();
    setTimeout(() => {
      // this.onSearchResult("江西")
    }, 2000);
  },
  methods: {
    // 初始化地图
    initMap(map) {
      var map = new AMap.Map("container", {
        zoomEnable: true, //是否禁止缩放
        zoom: 12, //缩放比例
        dragEnable: false, //禁止拖动
        cursor: "hand", // 鼠标在地图上的表现形式，小手
      });
      map.on("click", this.change);
      // 初始化工具条
      map.plugin(
        ["AMap.ToolBar", "AMap.PlaceSearch", "AMap.Geocoder"],
        function () {
          // map.addControl(new AMap.ToolBar());
          // map.addControl(new AMap.PlaceSearch());
        }
      );
    },
    change(e) {
      console.log("e", e);
      if (e.lnglat) {
        this.getAddress([e.lnglat.lng, e.lnglat.lat]);
      }
    },
    set_center(v) {
      console.log("set+cener", v);
      this.center = v;
    },
    onSearchResult(keyword) {
      let that = this;
      let address = keyword;
      var geocoder = new AMap.Geocoder({
        city: "", //城市设为北京，默认：“全国”
      });
      geocoder.getLocation(address, function (status, result) {
        console.log("status", status);
        console.log("result", result);
        if (status === "complete" && result.geocodes.length) {
          var lnglat = result.geocodes[0].location;
          that.center = [lnglat.lng, lnglat.lat];
          that.lng = lnglat.lng;
          that.lat = lnglat.lat;
          //   that.markers = [
          //     {
          //       position: that.center,
          //     },
          //   ];
          //   that.center = that.center;

          that.$emit("change", {
            lon: that.lng,
            lat: that.lat,
            province: result.geocodes[0].addressComponent.province || "",
            city: result.geocodes[0].addressComponent.city || result.geocodes[0].addressComponent.province || "",
            area: result.geocodes[0].addressComponent.district || "",
            detailAddr: result.geocodes[0].formattedAddress || "",
          });
        } else {
          console.log("根据地址查询位置失败");
        }
      });
    },
    getAddress(points) {
      console.log(points);
      let geocoder = new AMap.Geocoder({ radius: 1000 });
      console.log(1);
      geocoder.getAddress(points, (status, result) => {
        console.log(2, result);
        if (status === "complete" && result.regeocode) {
          // let s_addr =
          //   result.regeocode.addressComponent.province +
          //   "-" +
          //   result.regeocode.addressComponent.city +
          //   "-" +
          //   result.regeocode.addressComponent.district;
          // let addreesd = result.regeocode.formattedAddress; // 全部地址名称
          // let houzhi = addreesd.substring(s_addr.length); // 获取具体街道
          // console.log(s_addr);
          // console.log(houzhi);
          // console.log(addreesd);
          // this.address = s_addr + "," + houzhi;
          // console.log(this.address);

          this.$emit("change", {
            lon: points[0],
            lat: points[1],
            province: result.regeocode.addressComponent.province || "",
            city: result.regeocode.addressComponent.city || result.regeocode.addressComponent.province || "",
            area: result.regeocode.addressComponent.district || "",
            detailAddr: result.regeocode.formattedAddress || "",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
#firstPage {
  width: 100%;
  height: 500px;
}
.search-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}
.ml-10 {
  margin-left: 10px;
}
</style>