<template>
    <div>
        <div class="title-info flex flex-x-b flex-y-center mt20">
            <div class="flex">
                <div>
                    <img :src="info.iconUrl" style="width:30px;height:30px;" alt="">
                </div>
                <div class="ml10" style="font-size:20px;color:#333333;">{{info.title}}</div>
            </div>
            <div :style="{color:info.color}" class="flex flex-x-start flex-y-c">
                <div style="font-size:22px;margin-right:5px;">{{info.value}}</div>
                <div style="margin-top:2px;">{{info.unit}}</div>
            </div>
        </div>
        <div class="bg-box">
            <div class="bg-item" :style="{backgroundImage:`url(${info.bg})`}"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SzHealthyBackendWebRadarDataItem',

    data() {
        return {
            
        };
    },
    props: {
        info: {
            type:Object,
            default: {}
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.bg-box {
    width: 100%;
    height: 82px;
    overflow: hidden;
    background-image: url(../../../assets/images/scrrentImages/bgline.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
}

.bg-item {
    width: 100%;
    height: 82px;
    overflow: hidden;
    background-position: center;
    background-repeat: repeat-x;
    background-size: 600px 50px;
    animation: run 7s linear infinite;
    animation-fill-mode: forwards;
}

@keyframes run
{
    0%   {background-position: 0px 10px;}
    25%  {background-position: 150px 10px;}
    50%  {background-position: 300px 10px;}
    75%  {background-position: 450px 10px;}
    100% {background-position: 600px 10px;}
}
</style>