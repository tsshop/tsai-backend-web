<template>
    <div class="flex label-box">
        <div class="label">{{label}}</div>
        <div class="slot-class flex ">
            <slot class=""></slot>
            <div v-if="isAge" class="age" style="margin-top:1px;margin-left:5px;">岁</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SzHealthyBackendWebUserInfoItem',

    props: {
        isAge: {
            type:Boolean,
            default: false,
        },
        label: {
            type:String,
            default:''
        }
    },
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.label-box {
    height: 45px;
    line-height: 45px;
    vertical-align: bottom;
}
.label {
    font-size: 16px;
    color:#666666;
}
.slot-class {
    font-size: 26px;
    color: #FC7E23;
}
.age {
    font-size: 16px;
    color: #FC7E23;
}
</style>