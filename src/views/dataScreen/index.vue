<template>
    <div >
        <div class="data-screen-box" ref="dataRef" :class="{'full-height': isFullscreen}">
            <div class="data-screen-box-title" >
                居家康养平台
            </div>
            <div class="screenfull-box">
                <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
            </div>
            <div class="flex mt20">
                <div style="width:30%;height:100%;">
                    <!-- 检测数据 -->
                    <div class="data-screen-border" style="min-width:533px;" :class="{'top-50':!isFullscreen}" >
                        <el-carousel ref="senseRef"  trigger="click" height="840px" arrow="never" :interval="5000" style="margin:0 auto;" :autoplay="!isShow">
                            <el-carousel-item v-for="(item,i) in senseList" :key="i">
                                <senseData :info="item" @show="show" @close="close"></senseData>
                            </el-carousel-item>
                          </el-carousel>
                        <historyPanel :isShow="isShow" :historyList="historyList" :topValue="top" @close="close" @show="isShow = true"></historyPanel>
                        <div class="btn" style="left:13px;height:450px;line-height:450px;" @click="changeSenseCard('prev')">
                            <img src="../../assets/images/scrrentImages/left.png" style="width:10px;height:29px;" alt="">
                        </div>
                        <div class="btn" style="right:4px;height:450px;line-height:450px;" @click="changeSenseCard('next')">
                            <img src="../../assets/images/scrrentImages/right.png" style="width:10px;height:29px;" alt="">
                        </div>
                    </div>
                    <!-- 检测数据 -->
                </div>
                <div class="flex-1 " style="width:70%:height:100%">
                    <!-- 上面 -->
                    <div class="flex flex-x-b" style="height:60%">
                        <div class="" style="width:60%;">
                            <!-- 显示今日报警次数和设备总数 -->
                            <div class="show-total flex flex-x-b" style="padding:30px"  >
                                <failItem :info="item" v-for="(item,i) in failData" :key="i"></failItem>
                            </div>
                            <!-- 显示今日报警次数和设备总数 -->
                            <!-- 显示社区名称和banner图 -->
                            <div class="center">
                                <div class="center-banner" :style="{backgroundImage:'url('+ centerBannerUrl +')'}">
                                    <div class="center-title flex-y flex-x-y">
                                        <div class="title-name">幸之</div>
                                        <div class="text-name mt20">{{ defultCenterTitle }}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 显示社区名称和banner图 -->
                        </div>
                        <!-- 显示雷达数据 -->
                        <div class="data-screen-border mr10" style="height:539px;flex:1;" :style="{height:isFullscreen ? 539 + 'px' : 520 + 'px'}" :class="{'top-50':!isFullscreen}">
                            <el-carousel ref="radarRef" trigger="click" height="539px" arrow="never" :interval="5000">
                                <el-carousel-item v-for="(item,i) in radarList" :key="i">
                                    <radarData :info="item" ></radarData>
                                </el-carousel-item>
                              </el-carousel>
                            
                            <div class="btn" style="left:10px;" @click="changeRadarCard('prev')">
                                <img src="../../assets/images/scrrentImages/left.png" style="width:10px;height:29px;" alt="">
                            </div>
                            <div class="btn" style="right:4px;" @click="changeRadarCard('next')">
                                <img src="../../assets/images/scrrentImages/right.png" style="width:10px;height:29px;" alt="">
                            </div>
                        </div>
                        
                        <!-- 显示雷达数据 -->
                    </div>
                    <!-- 下面 -->
                    <div class="flex flex-x-end" style="height:330px;margin-right:25px" :class="{'y-70':!isFullscreen}">
                        <div class="card" >
                            <myTitle title="Ai小助手守护"></myTitle>
                            <myTable ref="hearthRef" :list="hearthAlarmList" :labels="hearthLabels" :hieght="300" ></myTable>
                        </div>
                        <div class="card" >
                            <myTitle title="安全守卫"></myTitle>
                            <myTable ref="failRef" :list="safeList" :labels="safeLabels" :mode="2" :hieght="300" ></myTable>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- <button @click="additem">add</button> -->
        </div>
       
    </div>
</template>

<script>
import screenfull from 'screenfull'
import senseData from './components/sense-data.vue'
import radarData from './components/radar-data.vue';
import failItem from './components/fail-item.vue';
import fail from '../../assets/images/scrrentImages/fail.png'
import device from '../../assets/images/scrrentImages/device.png'
import myTable from './components/my-table.vue';
import myTitle from './components/my-title.vue'
import historyPanel from './components/history-panel.vue';
import defulteCenterBanner from '../../assets/images/scrrentImages/default-center-banner.png'
import { getSense, geTtotalData, getHealthAlarm, getRadar } from '../../api/dataScreen'
import auth from '../../plugins/auth'
// import axios from 'axios'
export default {
    name: 'SzHealthyBackendWebIndex',
    components:{ senseData, radarData, failItem, myTable, myTitle, historyPanel },
    data() {
        return {
            Alerm:null, //报警次数
            Equipment:null, //设备总数
            isFullscreen:false, //是否全屏
            // height:0, 
            isShow: false, //显示历史面板
            top: 100, //历史面板的定位top
            historyList:[], //历史记录面板
            centerBannerUrl: defulteCenterBanner, //社区背景图
            defultCenterTitle:'社区居家康养平台', //社区默认标题
            failData:[
                {
                    icon:fail,
                    title:'今日报警次数',
                    value:'------',
                    unit:'(次)'
                },{
                    icon:device,
                    title:'设备总数',
                    value:'------',
                    unit:'(个)'
                }
            ], //报警数据
            radarList: [], //雷达数据列表
            senseList:[], //检测数据列表 
            hearthLabels:['姓名','检测类型','数值','报警时间'], //Ai小助手守护列表标题
            safeLabels:['姓名','检测类型','报警时间'], //安全守卫列表标题
            hearthAlarmList:[], //Ai小助手守护数据
            safeList:[], //安全守卫数据
            timer: null, // 轮询定时器
        };
    },
    created() {
        auth.hasPermi('healthy:show:checkInfo') && this.initSense()
        auth.hasPermi('healthy:show:radarInfo') && this.initRarda()
        auth.hasPermi('healthy:show:count') && this.getTotal()
        if(auth.hasPermi('healthy:show:alarm')) {
         this.getHealthAlarmList()
         this.getFailAlarmList()
        }  
        this.handlePolling()
        if(!auth.hasPermi('healthy:show:checkInfo')) return this.$modal.msgError('您没有访问检查信息的权限，请联系管理员！')
        if(!auth.hasPermi('healthy:show:radarInfo')) return this.$modal.msgError('您没有访问检查信息的权限，请联系管理员！')
        if(!auth.hasPermi('healthy:show:count')) return this.$modal.msgError('您没有访问统计数据的权限，请联系管理员！')
        if(!auth.hasPermi('healthy:show:alarm')) return this.$modal.msgError('您没有访问报警信息的权限，请联系管理员！')
    },
    mounted() {
        this.init() 
    },
    computed: {
    },
    beforeDestroy() {
        clearInterval(this.timer) //关闭轮询
        this.destroy()
    },
    methods: {
        // 切换全屏按钮
        click() {
            if (!screenfull.isEnabled) {
              this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
              return false
            }
            screenfull.toggle()
            this.change()
        },
        change() {
          this.isFullscreen = screenfull.isFullscreen
          this.$store.commit('dataScreen/CHANGE_FULL', this.isFullscreen)
        },
        init() {
          if (screenfull.isEnabled) {
            screenfull.on('change', this.change)
          }
        },
        destroy() {
          if (screenfull.isEnabled) {
            screenfull.off('change', this.change)
          }
        },
        // 切换全屏按钮
        // 显示检测数据历史记录
        show(e) {
            this.historyList = e.list
            this.top = e.top
            this.isShow = true
        },
        // 关闭检测数据历史记录
        close() {
            this.isShow = false
        },
        // 左右切换雷达数据
        changeRadarCard(methodName) {
            this.$refs.radarRef[methodName]()
        },
        // 左右切换检测数据
        changeSenseCard(methodName) {
            this.$refs.senseRef[methodName]()
        },
        // 初始化雷达数据
        initRarda() {
            getRadar({pageNum:1,pageSize: 20}).then(res => {
                this.radarList = res.data
            }).catch((value) => {
                clearInterval(this.timer)
            })
            
        },
        // 初始化检测数据
        initSense() {
            getSense({pageNum:1,pageSize: 20}).then(res => {
                this.senseList = res.data
            }).catch((value) => {
                clearInterval(this.timer)
            })
        },
         // 统计数据
         getTotal() {
            geTtotalData().then(res => {
                this.failData[0].value = res.data.alarmNum
                this.failData[1].value = res.data.equipmentNum
                this.centerBannerUrl = res.data.communityBanner ? res.data.communityBanner : defulteCenterBanner
                this.defultCenterTitle = res.data.communityName ? res.data.communityName : '社区居家康养平台'
            }).catch((value) => {
                clearInterval(this.timer)
            })
        },
        // Ai小助手报警
        getHealthAlarmList() {
            getHealthAlarm({pageSize:20,pageNum:1,alarmType:1}).then(res => {
                if(res.data) {
                    this.hearthAlarmList = res.data
                }
            }).catch((value) => {
                clearInterval(this.timer)
            })
        },
        // 安全守卫
        getFailAlarmList() {
            getHealthAlarm({pageSize:20,pageNum:1,alarmType:2}).then(res => {
                if(res.data) {
                    this.safeList = res.data
                }
            }).catch((value) => {
                clearInterval(this.timer)
            })
        },
        // 30秒轮询数据
        handlePolling() {
            this.timer = window.setInterval(()=> {
                setTimeout(() => {
                    auth.hasPermi('healthy:show:checkInfo') && this.initSense()
                    auth.hasPermi('healthy:show:radarInfo') && this.initRarda()
                    auth.hasPermi('healthy:show:count') && this.getTotal()
                    if(auth.hasPermi('healthy:show:alarm')) {
                     this.getHealthAlarmList()
                     this.getFailAlarmList()
                    }  
                }, 0);
            },30000)
        },
    },
};
</script>

<style lang="scss" scoped>
.data-screen-box {
    width: 100%;
    height: calc(100vh - 88px);
    background-image: url(../../assets/images/scrrentImages/screen-banner.png);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    padding: 0 20px;
    position: relative;
}
.data-screen-box-title {
    font-size: 42px;
    color: #F76901;
    margin: 0 auto;
    width: 280px;
    height: 100px;
    line-height: 100px;
    font-weight: 700;
}

.data-screen-border {
    border:1px solid transparent;
    border-image-source: url(../../assets/images/scrrentImages/border-01.png);
    border-image-repeat: stretch;
    border-image-slice: 1 1 fill;
    padding: 30px 60px 60px 60px;
    position: relative;
    z-index: 3;
}


.center {
    height: 610px;
    width: 610px;
    margin: 0 auto;
    background-image: url(../../assets/images/scrrentImages/center.png);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    overflow: hidden;
    transform: translateY(-80px);
}

.center-banner {
    width: 450px;
    height: 450px;
    border-radius: 50%;
    margin: 80px auto;
    line-height: 450px;
    overflow: hidden;
    background-color: #fff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.center-title {
    width: 262px;
    height: 262px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.7);
    text-align: center;
    line-height: 262px;
    margin: 94px auto ;
    .title-name {
        height: 50px;
        font-size: 42px;
        color:#89582B;
        line-height: 50px;
    }
    .text-name {
        height: 30px;
        font-size: 30px;
        color: #89582B;
        line-height: 30px;
    }
}
.show-total {
    width: 80%;
    height:131px;
    margin: 0 auto;
    border:1px solid transparent;
    border-image-source: url(../../assets/images/scrrentImages/total.png);
    border-image-repeat: stretch;
    border-image-slice: 1 1 fill;
    padding-top: 20px;
    position: relative;
    z-index: 2;
}

.card {
    width: 29vw;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
    margin-left: 20px;
    padding: 10px 20px 20px 20px;
    transform: translateY(-50px);
    overflow: hidden;
}
.btn {
    width: 22px;
    height: 280px;
    text-align: center;
    line-height: 280px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
} 

.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
.screenfull-box {
    position: absolute;
    top: 10px;
    right: 10px;
}
.full-height {
    height:100vh;
}
.hasPadding {
    padding-bottom: 15vh;
}
.top-50 {
    top:-50px;
}
.y-70 {
    transform: translate(15px,-60px);
}

</style>