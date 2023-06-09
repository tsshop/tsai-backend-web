<template>
  <div>
    <el-dialog
      :before-close="before_close"
      title="心电图"
      :visible="show"
      width="90%"
      append-to-body
    >
      <div class="salce-box">
        <div class="t1">缩放</div>
        <el-slider
          class="t2"
          v-model="salce"
          :step="0.5"
          :min="1"
          :max="2"
        ></el-slider>
      </div>
      <div style="min-height: 800px; overflow: hidden" class="pr">
        <canvas
          v-if="url && show_c"
          id="grid"
          :width="screenWidth"
          :height="screenHeight"
          :style="{ transform: 'scale(' + salce + ')' }"
        ></canvas>
        <div
          class="box-scroll"
          :style="{ height: salce * screenHeight + 'px' }"
        >
          <div class="pr z-4" v-if="url">
            <canvas
              id="heart"
              :width="canvasWidth"
              :height="canvasHeight"
              :style="{ transform: 'scale(' + salce + ')' }"
            ></canvas>
          </div>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "heart", //心电图
  data() {
    return {
      url: "", //心电图地址
      row: null,
      show: false,

      screenHeight: 0, //可视区域高度
      screenWidth: 0, //可视区域宽度

      canvasHeight: 0,
      canvasWidth: 0,

      salce: 1, //缩放
      show_c: false,
    };
  },
  methods: {
    open(row) {
      if (row) {
        this.row = row;
        this.url = row.eegdata;
        this.show = true;
        this.get_eedata();
        this.$nextTick(() => {});
      }
    },
    get_eedata() {
      this.request({
        url: `/healthy/detectionEcg/EcgFile?url=${this.url}`,
        method: "post",
      }).then((res) => {
        if (res.code == 200 && res.data) {
          let arr = res.data.map((val) => {
            val.name = val.code;
            val.label = false;
            return val;
          });

          this.init_canvas(arr);
        }
      });
    },
    before_close() {
      this.url = "";
      this.show = false;
      this.show_c = false;
      this.salce = 1;
    },

    /////////////////////////////////////////////////
    init_canvas(arr) {
      let initObj = {
        rowHeight: 100, //每个心点图的高度
        rowContentHeight: 100, //每条心电图的内容高度
        max: 500, //心电图 最大值（和最小值对称）
        marginTop: 50, //上边距
        marginLeft: 80, //左边距
        marginBottom: 100,
        textWidth: 32, //文本宽度
        widthZoom: 1,
        gridWidth: 50,
        color: [
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#9690E9",
          "#9690E9",
          "#000000",
          "#9690E9",
          "#9690E9",
          "#9690E9",
          "#9690E9",
          "#000000",
          "#000000",
        ],
      };

      if (arr.length == 1) {
        initObj.max = 500;
        initObj.rowHeight = 400; //每个心点图的高度
        initObj.rowContentHeight = 100; //每条心电图的内容高度
        initObj.widthZoom = 1; //每条心电图的内容高度
      } else if (arr.length <= 3) {
        initObj.max = 500;
        initObj.rowHeight = 200; //每个心点图的高度
        initObj.rowContentHeight = 100; //每条心电图的内容高度
        initObj.widthZoom = 1; //每条心电图的内容高度
      }

      arr.forEach((val) => {
        let code_arr = val.code.split("_");
        code_arr = code_arr.filter((val) => val).reverse();
        if (code_arr.length > 0) val.code = code_arr[0];
      });

      if (arr.length != 12) {
        arr.forEach((val) => {
          val.data = val.data.splice(
            parseInt(val.data.length / 3),
            val.data.length - 1
          );
        });
      } else {
      }
      // arr = arr.filter((val) => val.code != "V2");

      if (arr.length == 12) {
        let sort_arr = [
          "I",
          "II",
          "III",
          "AVR",
          "AVL",
          "AVF",
          "V1",
          "V2",
          "V3",
          "V4",
          "V5",
          "V6",
        ];
        let obj = {};
        arr.forEach((val) => {
          val.data = val.data.splice(
            parseInt(val.data.length / 2),
            val.data.length - 1
          );
          obj[val.code] = val.data;
        });
        let new_arr = sort_arr.map((val) => {
          return {
            code: val,
            data: obj[val],
          };
        });
        arr = new_arr;
        arr.forEach((val) => {
          if (val.code == "AVR") {
            val.code = "aVR";
          }
          if (val.code == "AVL") {
            val.code = "aVL";
          }
          if (val.code == "AVF") {
            val.code = "aVF";
          }
        });

        // arr = arr.filter(val=>val.code == "I")
        // console.log('ssssssssssssssss',arr.map(val=>val.code));
      }

      this.draw(arr, initObj);
    },
    draw(arr, initObj, two) {
      // this.canvasHeight =
      //   (arr.length > 6 ? 6 : arr.length) * initObj.rowHeight +
      //   initObj.marginBottom;
       this.canvasHeight =
        (arr.length) * initObj.rowHeight +
        initObj.marginBottom + initObj.marginTop;

      if (arr.length > 0 && arr[0].data) {
        this.canvasWidth =
          initObj.marginLeft +
          initObj.textWidth +
          arr[0].data.length * initObj.widthZoom +
          40;
      }

      this.screenHeight = this.canvasHeight;
      this.screenWidth = Number(
        document.querySelector(".box-scroll").offsetWidth
      );
      this.show_c = true;

      setTimeout(() => {
        let canvas = null;

        ///////////////
        if (two) {
          canvas = uni.createCanvasContext("heart1", this);
          console.log("sss");
        } else {
          canvas = document.getElementById("heart").getContext("2d");
        }

        this.draw_grid(initObj);

        //绘制单位

        //////////////////////////
        let darw_arr = [];

        arr.forEach((val, index) => {
          //绘制 线图名字
          canvas.beginPath();

          //   canvas.setFillStyle(initObj.color[index]);
          //   canvas.strockStyle = '#FF0000';
          canvas.fillStyle = initObj.color[index];
          //   canvas.setFontSize(18);
          //   canvas.font = "20px";

          canvas.font = "20px arial";

          // canvas.fillText(
          //   val.code,
          //   initObj.marginLeft,
          //   initObj.marginTop +
          //     initObj.rowHeight * (index % 6) +
          //     20 +
          //     (arr.length == 12 && index >= 6 ? 20 : 0)
          // );

          canvas.fillText(
            val.code,
            initObj.marginLeft,
            initObj.marginTop +
              initObj.rowHeight * index + 50 + (index>3?initObj.gridWidth:0)
          );

          //   canvas.strokeText();
          //折线

          //   canvas.draw(true);
          //   return;
          //   canvas.setLineWidth(1);
          canvas.lineWidth = 1;
          if (val.data) {
            //初始点位置

            // canvas.setStrokeStyle(initObj.color[index]);
            canvas.strokeStyle = initObj.color[index];
            //////////////////////////////////////
            // let canter = [
            //   initObj.marginLeft + initObj.textWidth,
            //   initObj.rowHeight * (index % 6) + initObj.rowHeight / 2,
            // ];
             let canter = [
              initObj.marginLeft + initObj.textWidth,
              initObj.rowHeight * index  + initObj.rowHeight / 2 + initObj.marginTop + (index>3?initObj.gridWidth:0),
            ];
            // console.log('canter', canter);
            let center_cha = canter[1] % initObj.gridWidth;
            //对准网格粗线
            if (arr.length != 12 || false) {
              ///////

              if (center_cha > initObj.gridWidth / 2) {
                if (arr.length == 1) {
                  canter[1] =
                    parseInt(
                      (canter[1] / initObj.gridWidth) * initObj.widthZoom
                    ) *
                      initObj.gridWidth +
                    initObj.gridWidth * initObj.widthZoom;
                } else {
                  canter[1] =
                    parseInt(
                      (canter[1] / initObj.gridWidth) * initObj.widthZoom
                    ) *
                      initObj.gridWidth -
                    initObj.gridWidth * initObj.widthZoom;
                }
              } else if (center_cha < initObj.gridWidth / 2) {
                canter[1] =
                  parseInt(
                    (canter[1] / initObj.gridWidth) * initObj.widthZoom
                  ) *
                    initObj.gridWidth +
                  initObj.gridWidth * initObj.widthZoom;
              }
              //////
            }
            canvas.beginPath();
            val.data.forEach((row, rowIndex) => {
              if (rowIndex == 0) {
                canvas.moveTo(
                  canter[0] + rowIndex * initObj.widthZoom,
                  canter[1] - initObj.rowContentHeight * (row / initObj.max / 2)
                );
              } else {
                canvas.lineTo(
                  canter[0] + rowIndex * initObj.widthZoom,
                  canter[1] - initObj.rowContentHeight * (row / initObj.max / 2)
                );
              }
            });
            canvas.stroke();
            // canvas.draw(true, () => {
            //   darw_arr.splice(0, 1);
            //   setTimeout(() => {
            //     if (darw_arr.length > 0) {
            //       darw_arr[0]();
            //     } else {
            //       // this.isSuccess = true;
            //       // alert(this.isSuccess)
            //     }
            //   }, 200);
            // });

            ///////////////////////////////////////
          }

          ////////////
        });
        // canvas.draw(true);
      }, 300);
    },
    scaleChange(e) {
      this.bgH = this.screenHeight * e.detail.scale;
      this.bgW = this.screenWidth * e.detail.scale;
      this.scale1 = e.detail.scale;
    },
    //绘制网格
    draw_grid(initObj) {
      //   console.log('document.getElementById("grid")',document.getElementById("grid"));
      // canvas.beginPath()
      // canvas.setFillStyle('#ff2020');

      //   canvas.setFontSize(18);
      //   canvas.setTextAlign('right')
      //   canvas.fillText('25mm/s', this.screenHeight - 30, 30);
      //   canvas.fillText('5mm/mv', this.screenWidth - 30, 50);

      // ///////////////绘制网格

      let width = initObj.gridWidth * initObj.widthZoom;

      console.log("this.", this);

      //   return;

      let canvas = document.getElementById("grid").getContext("2d");
      canvas.width = this.screenWidth;
      canvas.height = this.screenHeight;
      let row_num = this.xs(this.screenWidth / width, -1) + 1;
      let cloum_num = this.xs(this.screenHeight / width, -1) + 1;

      canvas.beginPath();
      canvas.strokeStyle = "#ffcbcb";
      canvas.lineJoin = "round";
      canvas.lineWidth = 1;
      // canvas.setLineJoin('round');
      //绘制小网格
      for (let i = 0; i <= cloum_num * 5; i++) {
        if (i % 5 != 0) {
          canvas.moveTo(0, (i * width) / 5);
          canvas.lineTo(this.screenWidth, (i * width) / 5);
        }
      }

      canvas.stroke();
      //   canvas.draw(true);
      for (let i = 0; i <= row_num * 5; i++) {
        if (i % 5 != 0) {
          canvas.moveTo((i * width) / 5, 0);
          canvas.lineTo((i * width) / 5, this.screenHeight);
        }
      }

      canvas.stroke();
      //   canvas.draw(true);

      canvas.beginPath();
      canvas.strokeStyle = "#ff4f4f";
      //   canvas.setStrokeStyle("#ff4f4f");
      //绘制大网格
      for (let i = 0; i <= cloum_num; i++) {
        canvas.moveTo(0, i * width);
        canvas.lineTo(this.screenWidth, i * width);
      }
      for (let i = 0; i <= row_num; i++) {
        canvas.moveTo(i * width, 0);
        canvas.lineTo(i * width, this.screenHeight);
      }

      canvas.stroke();

      ////////////
      canvas.fillStyle = "#ff2020";
      //   canvas.setFontSize(18);
      //   canvas.font = "20px";

      canvas.font = "20px arial";

      canvas.fillText("25mm/s", this.screenWidth - 90, 30);
      canvas.fillText("10mm/mv", this.screenWidth - 90, 50);
      ////////////
    },
    /////////////////////////////////////////////////////
  },
};
</script>

<style>
.pr {
  position: relative;
}
.box-scroll {
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  position: relative;
  z-index: 5;
}
.z-4 {
  z-index: 4;
}
#heart {
  transform-origin: left top;
}
#grid {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;

  transform-origin: left top;
}

.salce-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.salce-box .t2 {
  width: 100px;
  margin-left: 20px;
}
</style>