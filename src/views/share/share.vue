<template>
<div>
  <div :class="{'share': true,'showShare': $store.state.share.show}" v-if="$store.state.share.show">
        <share :config="config"></share>  
    </div>
</div>
</template>
<script>
// import "vue-social-share/dist/client.css";
export default {
  data() {
    return {
      config: {
        url: sessionStorage.getItem("share_url"), // 网址，默认使用 window.location.href
        source: "汽配帮手", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: sessionStorage.getItem("share_title"), // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "做汽配生意用汽配帮手", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: sessionStorage.getItem("share_img"), // 图片, 默认取网页中第一个img标签
        sites: ["qzone", "wechat", "weibo", "qq"], // 启用的站点
        // disabled: ["google", "facebook", "twitter"], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码,点右上角即可分享至朋友圈。</p>"
      },
      showShare: false
    };
  },
  watch: {
    url(val) {
      this.$set(this.config, "url", val);
      console.log(this.config);
      this.showShare = true;
    },
    title(val) {
      this.$set(this.config, "title", val);
    },
    img(val) {
      this.$set(this.config, "image", val);
    }
  },
  computed: { 
    url() {
      return this.$store.state.share.url;
    },
    img() {
      return this.$store.state.share.img;
    },
    title() {
      return this.$store.state.share.title;
    }
  },
  methods: {
    hide() {
      this.$store.dispatch("hideShare");
    }
  }
};
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css");
</style>
<style lang="stylus">
.share {
  padding: 0 15px;
  background: white;
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -90px;
  z-index: 10000;
  border-radius: 0 0 5px 5px;
  transition: 0.3s;
  margin-top: -44px;
  height: 44px;

  .cha {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 30px;
    cursor: pointer;
  }
}

.share2 {
  background: #f5f5c1;
}

.showShare {
  margin-top: 0;
}

.social-share .icon-wechat .wechat-qrcode {
  top: 50px !important;
  left: -63px !important;
}

.wechat-qrcode {
  overflow: hidden;
}
</style>
