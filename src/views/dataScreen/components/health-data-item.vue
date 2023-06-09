<template>
    <div class="health-data-info mt10" @mouseenter="mouseenter" style="cursor: pointer;">
        <div class="title-box flex flex-y-center">
            <img src="../../../assets/images/scrrentImages/dot.png" style="width:13px;height:13px;">
            <div style="font-size:20px;color:#333333;margin-left:10px;">{{info.title}}</div>
        </div>
        <div class="data-box mt10 flex">
            <img :src="info.imageUrl" alt="" style="width:72px;height:72px;">
            <div class="flex-1 flex-y flex-x-a ml20" style="line-height:20px;font-size:16px;color:#666666;">
                <div class="flex flex-y-c">
                    <div>{{ smallTitle }} </div>
                    <div>{{ info.value }}</div>
                    <div style="margin-left:5px;">{{ info.unit }}</div>
                </div>
                <div class="flex">
                    <div>最近测试时间：</div>
                    <div>{{ info.updateTime }}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import historyPanel from './history-panel.vue';
export default {
    name: 'SzHealthyBackendWebHealthDataItem',
    components:{historyPanel},
    data() {
        return {
            
        };
    },
    props: {
        info: {
            type:Object,
            default: {
                imageUrl:'../../../assets/images/scrrentImages/blood-pressure.png'
            }
        },
    },
    computed: {
        smallTitle() {
            return this.info.title === '血压数据' ? '最近数据（收缩/舒张）：' : '最近数据：'
        }
    },

    mounted() {
        
    },

    methods: {
        mouseenter() {
            this.$emit('show')
        }
    },
};
</script>

<style lang="scss" scoped>

</style>