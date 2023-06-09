<template>
    <div>
        <div class="">
            <myTitle title="雷达数据"></myTitle>
            <div class="info flex flex-x-b mt20">
                <div>
                    <userInfoItem label="检测人姓名：">{{info.name}}</userInfoItem>
                    <userInfoItem label="检测人年龄：" :isAge="!!info.age">{{info.age}}</userInfoItem>
                </div>
                <div>
                    <img src="../../../assets/images/scrrentImages/line-01.png" style="width:5px;height:83px;" alt="">
                </div>
                <div class="man-info-box">
                    <div>
                        <img v-if="info.status === 0" src="../../../assets/images/scrrentImages/man.png" style="width:22px;height:51px;" alt="">
                        <img v-if="info.status === 1" src="../../../assets/images/scrrentImages/abnormal-man.png" style="width:22px;height:51px;" alt="">
                    </div>
                    <div class="ml10">
                        <div v-if="info.status === 0" style="font-size:30px;color:#6FCF54;font-weight:700;">正常</div>
                        <div v-if="info.status === 1" style="font-size:30px;color:#fa6f6f;font-weight:700;">异常</div>
                        <div style="color:#999999;">当前人体综合指数</div>
                    </div>
                </div>
            </div>
            <img src="../../../assets/images/scrrentImages/line-02.png" style="width:417px;height:3px;" alt="">
            <div v-for="(item,i) in radarData" :key="i">
                <radarDataItem :info="item"></radarDataItem>
            </div>
        </div>
    </div>
</template>

<script>
import myTitle from './my-title.vue'
import userInfoItem from './user-info-item.vue'
import radarDataItem from './radar-data-item.vue';
import green from '../../../assets/images/scrrentImages/green.png'
import red from '../../../assets/images/scrrentImages/red.png'
import heart from '../../../assets/images/scrrentImages/heart.png'
import breathe from '../../../assets/images/scrrentImages/breathe.png'
export default {
    name: 'SzHealthyBackendWebRadarData',
    components: { myTitle, userInfoItem, radarDataItem },
    props: {
        info: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            
        };
    },
    computed: {
        radarData() {
            return [
                {
                    id: 1,
                    iconUrl: heart,
                    title: '心率数据',
                    value: this.info.heart,
                    unit:'次/分',
                    bg: red,
                    color: '#F96161'
                },{
                    id: 2,
                    iconUrl: breathe,
                    title: '呼吸数据',
                    value: this.info.breathe,
                    unit:'次/分',
                    bg: green,
                    color:'#6FCF54'
                }
            ]
        }
    },
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>


.man-info-box {
    height: 90px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}


</style>