<template>
    <div class="my-title flex">
        <div class="text">{{title}}</div>
        <img src="../../../assets/images/scrrentImages/title.png" style="width:197px;height:25px;"/>
    </div>
</template>

<script>
export default {
    name: 'my-title',

    data() {
        return {
            
        };
    },
    props: {
        title: {
            type: String,
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
.my-title {
    font-size: 22px;
    color: #333333;
    font-weight: 700;
    margin-top: 10px;
    img {
        transform: translate(-30px,-5px);
    }
}
</style>