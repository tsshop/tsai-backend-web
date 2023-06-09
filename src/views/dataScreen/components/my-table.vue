<template>
    <div class="table mt20">
        <div class="label flex flex-x-b">
            <div class="label-item" v-for="(it, i) in labels" :key="i">{{ it }}</div>
        </div>
        <div class="table-content">
            <div class="table_inner_body" :style="{transform: 'translateY(' + tableTop + 'px' + ')' }">
                <div class="flex flex-x-b flex-y-center" v-for="(item, index) in tableList" :key="index">
                    <div class="table-item">{{ item.name }}</div>
                    <div class="table-item">{{ item.checkType }}</div>
                    <div v-if="mode == 1" class="table-item">{{ item.alarmNum }}</div>
                    <div class="table-item" style="width:200px">{{ item.time }}</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

export default {
    name: 'SzHealthyBackendWebMyTable',
    data() {
        return {
            showFlag: true,
            tableTimer: null,
            tableTop: 0,
            tableListSize: 0,
            componentTimer: null,
            //需要根据情况设置的参数
            visibleSize: 6, //容器内可视最大完整行数
            lineHeight: 35, //每行的实际高度（包含margin-top/bottom,border等）
            componentTimerInterval: 30000, //刷新数据的时间间隔
            tableTimerInterval: 1000 / 30, //向上滚动 1px 所需要的时间，目前30帧
            tableList:[],
            // isFirst:true,
        };
    },
    props: {
        list: {
            type: Array,
            default: []
        },
        labels: {
            type: Array,
            default: []
        },
        mode: {
            type:Number,
            default: 1
        },
        height: {
            type: Number,
            default: 400
        }
    },
    watch: {
        list: {
            handler(newV) {
                this.tableList = newV.map(item => item)
                this.bsGetProductProcess(newV)
            },
            deep: true
        }
    },
    mounted() {
    },
    beforeDestroy() {
        clearInterval(this.tableTimer)
    },

    methods: {
        // 来新数据切到最上面来重新开始滚动
        bsGetProductProcess(list = []) {
            clearInterval(this.tableTimer);
            this.tableTop = 0;
            this.tableList = list.map(item => item)
            this.tableActionFun()
            
        },
        // 判断是滚动还是不滚动
        tableActionFun() {
            this.tableListSize = this.tableList.length;
            if (this.tableListSize > this.visibleSize) {
                this.tableList = this.tableList.concat(this.tableList);
                this.tableTimerFun();
            } else {
                this.fillTableList();
            }
        },
        //当数据过少时，不触发自动轮播事件，并填充没有数据的行，参数根据实际情况修改即可
        fillTableList() {
            var addLength = this.visibleSize - this.tableListSize;
            for (var i = 0; i < addLength; i++) {
                this.tableList.push({});
            }
        },
        // 无缝滚动
        tableTimerFun() {
            var count = 0;
            this.tableTimer = setInterval(() => {
                if (count < (this.tableList.length / 2) * this.lineHeight) {
                    this.tableTop -= 1;
                    count++;
                } else {
                    count = 0;
                    this.tableTop = 0;
                }
            }, this.tableTimerInterval);
        },
    },
};
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
}

.label-item {
    width: 120px;
    text-align: center;
    margin-bottom: 10px;
    color: #FC7E23;
    font-size: 16px;
    

    &:nth-last-child(1) {
        width: 200px;
    }
}

.table-item {
    width: 120px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    white-space: nowrap;
}

.table-content {
    height: 205px;
    overflow: hidden;
   // position: relative;
   
}

.table_inner_body {
    width: 100%;
}
</style>