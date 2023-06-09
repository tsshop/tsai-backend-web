<template>
  <div class="valuerange">
    <input
      @input="chagneV('leftV')"
      type="number"
      v-model="leftV"
      placeholder="最小值"
    />
    <div></div>
    <input
      @input="chagneV('rightV')"
      type="number"
      v-model="rightV"
      placeholder="最大值"
    />
  </div>
</template>

<script>
export default {
  name: "ValueRange",
  props: {
    max: {
      type: Number,
      default: 999999,
    },
    min: {
      type: Number,
      default: -999999,
    },
    value: {
      type: [String, Array, null],
      default: "",
    },
    father: {
      type: Object,
      delete: () => {},
    },
    name: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(newV) {
      if (newV) {
        //  console.log('xxxx',newV);
      } else if (newV === null || !newV) {
        this.leftV = "";
        this.rightV = "";
      }
    },
  },
  data() {
    return {
      leftV: "",
      rightV: "",
    };
  },
  created() {
    if (this.value) {
      this.leftV = this.value[0];
      this.leftV = this.value[1];
    }
    // console.log("father", this.father);
  },
  methods: {
    clear() {
      let name = this.nameFilter(this.name);
      delete this.father.params["begin" + name];
      delete this.father.params["end" + name];
      this.leftV = "";
      this.rightV = "";
    },
    chagneV(key) {
      let name = this.nameFilter(this.name);
      //   this.$emit("input", "a");
      if (this.leftV === "" && this.rightV === "") {
        delete this.father.params["begin" + name];
        delete this.father.params["end" + name];
      } else {
        // console.log("ss", this.father.params);
        this.father.params["begin" + name] =
          this.leftV !== "" ? this.leftV : this.min;
        this.father.params["end" + name] =
          this.rightV !== "" ? this.rightV : this.max;
      }
    },
    nameFilter(str = '') {
      let newStr = str.slice(0, 1).toUpperCase() + str.substr(1);

      return newStr;
    },
  },
};
</script>

<style>
.valuerange {
  width: 214px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
}
.valuerange input {
  flex: 1;
  text-align: center;
  border: none;
  display: block;
  width: 100%;
  color: #666;
  outline: none;
}
.valuerange input:focus {
  border: none !important;
  outline: none;
}
.valuerange div {
  width: 4px;
  height: 1px;
  background: #dcdfe6;
}
</style>

