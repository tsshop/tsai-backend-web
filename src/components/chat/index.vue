<template>
  <div>
    <div class="title-box" v-if="name && id">
      <div class="chat-back" @click="close">关闭</div>
      <div>
        {{ name }}
      </div>
      <div class="chat-back"></div>
    </div>
    <div class="chat-box" v-if="id">
      <div v-for="item in list" :key="item.id">
        <template v-if="item.type == 'TIME'">
          <div style="text-align: center; margin-top: 10px">
            {{ item.content }}
          </div>
        </template>
        <template v-if="item.type == 'text'">
          <div class="chat-item-1" :class="item.mine ? 'reserve' : ''">
            <image-preview
              :src="item.avatarUrl || ''"
              :width="40"
              :height="40"
            />
            <div class="content1">
              <div class="content-text">
                {{ item.content }}
              </div>
            </div>
          </div>
        </template>
      </div>
      <div style="height: 40px"></div>
    </div>
    <div v-if="name && id" style="display: flex">
      <el-input
        v-model="keyword"
        type="textarea"
        rows="2"
        placeholder="请输入内容"
        @keyup.enter.native="to_submit"
      />

      <el-button type="primary" @click="to_submit">发送</el-button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "h-chat",
  props: {
    name: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      id: "",
      list: [],
      keyword: "",
    };
  },
  methods: {
    refresh(id) {
      this.id = id;
      request({
        url: "/healthy/messageLog/getLog",
        params: {
          pageSize: 10000,
          pageNum: 1,
          userId: this.id,
        },
      }).then((res) => {
        if (res.code == 200 && res.data) {
          this.list = this.add_time(res.data);

          this.$nextTick(() => {
            this.to_last();
          });
        }
      });
    },
    to_last() {
      document.querySelector(".chat-box").scrollTop = 9999999;
    },
    add_time(arr) {
      let arr_f = [];
      let time = 1000 * 60 * 10;

      arr.forEach((val, index) => {
        if (
          index == 0 ||
          arr[index].createTime - arr[index - 1].createTime > time
        ) {
          if (this.isToday(val.createTime)) {
            arr_f.push({
              //   content: this.dateFormat("HH:MM", new Date(val.createTime)),
              content: this.parseTime(val.createTime, "{h}:{i}"),
              type: "TIME",
              id: "xxxxx" + val.createTime,
            });
          } else {
            arr_f.push({
              //   content: this.dateFormat("mm-dd HH:MM", new Date(val.createTime)),
              content: this.parseTime(val.createTime, "{m}-{d} {h}:{i}"),
              type: "TIME",
              id: "xxxxx" + val.createTime,
            });
          }
        }

        if (val.fromId != this.id) {
          val.avatarUrl = "https://ysxu-img.oss-cn-hangzhou.aliyuncs.com/shop/1668755070207.png?Expires=1984115067&OSSAccessKeyId=LTAI5tE7E5SKRaCyJFB654Sn&Signature=j4oriH0ENcukatpLO%2Bxib1DfVZQ%3D";
          val.mine = true;
        } else {
          val.avatarUrl = this.avatarUrl;
          val.mine = false;
        }
        arr_f.push(val);
      });

      return arr_f;
    },
    isToday(str) {
      if (new Date(str).toDateString() === new Date().toDateString()) {
        return true;
      } else if (new Date(str) < new Date()) {
        return false;
      }
    },
    to_submit() {
      if (!String(this.keyword).trim()) {
        return;
      }
      request({
        url: "/healthy/messageLog/chat",
        data: {
          type: "text",
          content: String(this.keyword).trim(),
          toId: this.id,
        },
        method: "post",
      }).then((res) => {
        console.log("ssse");
        if (res.code != 200) return;
        let date_now = new Date();
        if (
          this.list.length > 0 &&
          date_now.getTime() - this.list[this.list.length - 1].createTime >
            600000
        ) {
          this.list.push({
            id: "xxxx" + date_now.getTime(),
            type: "TIME",
            content: this.parseTime(date_now, "{h}:{i}"),
          });
        }
        this.list.push({
          id: new Date().getTime(),
          type: "text",
          content: String(this.keyword).trim(),
          avatarUrl: "https://ysxu-img.oss-cn-hangzhou.aliyuncs.com/shop/1668755070207.png?Expires=1984115067&OSSAccessKeyId=LTAI5tE7E5SKRaCyJFB654Sn&Signature=j4oriH0ENcukatpLO%2Bxib1DfVZQ%3D",
          mine: true,
        });
        this.keyword = "";

        this.$nextTick(() => {
          this.to_last();
        });
      });
    },
    close() {
      this.id = "";
    },
  },
};
</script>

<style >
.chat-box {
  width: 400px;
  height: 700px;
  background: #f1f1f1;
  overflow-y: scroll;
}
.title-box {
  background: #f1f1f1;
  line-height: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.chat-item-1 {
  display: flex;
  padding: 0 10px;
  margin-top: 10px;
}
.chat-item-1 .content1 {
  flex: 1;
}
.chat-item-1 .content1 .content-text {
  display: inline-block;
  max-width: 240px;
  background: rgba(94, 213, 190, 0.7);
  white-space: pre-line;
  margin: 0 10px;
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  word-break: break-word;
}
.reserve {
  justify-content: flex-end;
  flex-direction: row-reverse;
}
.reserve .content1 {
  display: flex;
  justify-content: flex-end;
}
.chat-back {
  width: 60px;
  cursor: pointer;
}
</style>