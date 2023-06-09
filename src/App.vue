<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "App",
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created(){
    this.$store.dispatch('SystemNameOrLogo');
  },
  watch: {
    user: {
      deep:true,
      handler(newV) {
        document.title = newV.systemInfoIcon?.appName || process.env.VUE_APP_TITLE
        if (null != newV.systemInfoIcon?.appIcon) {
          var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = newV.systemInfoIcon?.appIcon || '/logo.png';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }
    }
  }
};
</script>
