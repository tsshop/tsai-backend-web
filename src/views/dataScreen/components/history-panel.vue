<template>
    <div class="panel" v-if="isShow && historyList.length>0"  :style="{top:topValue + 'px'}" @mouseleave="$emit('close')" @mouseenter="$emit('show')">
        <div style="font-size:20px;color:#333333;font-weight:700;">历史数据</div>
        <img src="../../../assets/images/scrrentImages/line-02.png" style="width:500px;height:3px;" alt="">
        <div v-for="(item,i) in historyList" :key="i" class="flex flex-x-a">
            <div class="item">{{item.handleType}}</div>
            <div class="item">
                <span>{{item.measureData}}</span>
                <span style="margin-left:5px;">{{item.unit}}</span>
            </div>
            <div class="item">{{item.meatime}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SzHealthyBackendWebHistoryPanel',
    props: {
        topValue: {
            type:Number,
            default:10
        },
        isShow: {
            type: Boolean,
            default: false
        },
        historyList: {
            type:Array,
            default:[]
        },
    },
    data() {
        return {
            isDel:false,
            timer:null
        }
    },
};
</script>

<style lang="scss" scoped>
.panel {
    width: 550px;
    padding: 20px;
    background: #ffffff;
    box-shadow:  20px 20px 60px #c8c8c8,
             -20px -20px 60px #ffffff;
    border-radius: 15px;
    position: absolute;
    right: -460px;
    z-index: 999;
    transition: all 0.2s;
}
.item {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #999999;
}


</style>