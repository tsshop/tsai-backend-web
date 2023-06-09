<template>
    <div class="fail-box flex flex-x-start flex-y-c">
        <div class="mt5 mr10">
            <img :src="info.icon" alt="" style="width:72px;height:72px;">
        </div>
        <div class="flex-y flex-x-a">
            <div style="font-size:16px;color:#666666;">{{info.title}}</div>
            <div class="flex flex-x-y" style="color:#FC7E23;">
                <div style="font-size:28px;font-weight:700;margin-top:5px;margin-right:5px;">{{info.value}}</div>
                <div style="font-size:18px;">{{info.unit}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SzHealthyBackendWebFailItem',

    data() {
        return {
            
        };
    },
    props:{
        info: {
            type:Object,
            default:{}
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.fail-box {
    height: 72px;
}
</style>