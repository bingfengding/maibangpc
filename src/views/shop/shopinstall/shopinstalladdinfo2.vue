<template>
    <!-- 店铺装修 -->
      <el-container id="shopInstallAddInfo2">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb> 
        <el-breadcrumb-item :to="{path:'home'}">     
          模板商城
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          模板详情
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row class="mainBody bgFFF">
        <el-row type="flex" justify="center">
          <el-col class="templateCenter">
            <div class="header">
              <div>
                <img src="../../../assets/shop/install/addinfo2_01.png" alt="">
              </div>
              <div>
                <img src="../../../assets/shop/install/addinfo2_02.png" alt="">
              </div>
            </div>
            <div class="broadcast">
              <el-carousel 
                type="card" 
                :interval= "0"
                trigger="click"
                @change="templateOpen"
                arrow="never"
                height="130px">
                <el-carousel-item 
                v-for="(items,index) in broadcasts" 
                :key="items.id"
                >
                  <div class="avatar-uploader" @click="showDialogImg(index)">
                    <img 
                      v-if="items.picture" 
                      :src="items.picture" 
                      class="avatar"
                    >
                    <i v-else class="el-icon-plus avatar-uploader-icon">
                    </i>
                   
                  </div> 
                </el-carousel-item>
              </el-carousel>
            </div>
            
            <div class="footer">
              <img src="../../../assets/shop/install/install_05.png" alt="">
            </div>
          </el-col>
        </el-row>
          <adtemplate class="adtemplate"></adtemplate>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { imgUploads } from "api/shop/authentication";
import {
  detail,
  useTemplate,
  searchMerchantProduct,
  saveMerchantAdvertisement
} from "api/shop/install";
import adtemplate from "./adtemplate";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      addImgItems: {
        chooseID: 0,
        radio: 0,
        picture_relative: "",
        describe: "",
        url: "",
        productId: 0
      },
      broadcasts: [
        {
          picture: "",
          product_id: 0,
          picture_relative: "",
          describe: ""
        },
        {
          picture: "",
          product_id: 0,
          picture_relative: "",
          describe: ""
        },
        {
          picture: "",
          product_id: 0,
          picture_relative: "",
          describe: ""
        },
        {
          picture: "",
          product_id: 0,
          picture_relative: "",
          describe: ""
        }
      ]
    };
  },
  created() {
    this.$store.commit("addinfo_change_template_id", 2);
  },
  mounted() {
    this.Initialization();
  },
  computed: {
    changAdd() {
      return this.$store.state.addinfo.changeAdd;
    }
  },
  watch: {
    changAdd: function() {
      console.log("watch");
      this.Initialization();
    }
  },
  methods: {
    ...mapMutations(["change_addimgitems", "addinfo_change_diglogvisibleimg"]),
    Initialization() {
      detail(2).then(res => {
        if (res.data.code === 200) {
          let base = res.data.data.template;
          let baseA = [
            {
              picture: "",
              product_id: 0,
              picture_relative: "",
              describe: ""
            },
            {
              picture: "",
              product_id: 0,
              picture_relative: "",
              describe: ""
            },
            {
              picture: "",
              product_id: 0,
              picture_relative: "",
              describe: ""
            },
            {
              picture: "",
              product_id: 0,
              picture_relative: "",
              describe: ""
            }
          ];

          if (base.length) {
            base.forEach((element, index) => {
              baseA[element.index - 1] = element;
            });
          }
          this.broadcasts = baseA;
          this.templateOpen(this.addImgItems.chooseID);
        } else {
          this$message.error(data.error);
        }
      });
    },
    //轮播图改变
    templateOpen(id = 0) {
      console.log("我切换了图片");
      this.addImgItems.chooseID = id;
      this.addImgItems.picture_relative = this.broadcasts[id].picture_relative
        ? this.broadcasts[id].picture_relative
        : "";
      this.addImgItems.url = this.broadcasts[id].picture
        ? this.broadcasts[id].picture
        : "";
      this.addImgItems.radio = this.broadcasts[id].product_id
        ? this.broadcasts[id].product_id
        : 0;
      this.addImgItems.productId = this.broadcasts[id].product_id
        ? this.broadcasts[id].product_id
        : 0;
      this.addImgItems.describe = this.broadcasts[id].describe
        ? this.broadcasts[id].describe
        : "";
      console.log(this.addImgItems);
      this.$store.commit("change_addimgitems", this.addImgItems);
    },
    showDialogImg(index) {
      if (index === this.addImgItems.chooseID) {
        // if (index === 0) {
        //   this.templateOpen(0);
        // }
        this.$store.commit("addinfo_change_diglogvisibleimg", 1);
      }
      console.log("我点击了外面的");
    }
  },
  components: {
    adtemplate
  }
};
</script>

<style lang="stylus" scoped>
#shopInstallAddInfo2
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 20px 20px 80px 20px
      position relative
      min-height 750px
      .templateCenter
        width 375px
        .header
          font-size 0
          img
            width 100%
        .footer
          border 1px solid #cccccc
          border-top none
          img
            width 100%
        .broadcast
          width 100%
          padding-bottom 20px
          position relative
          border-left 1px solid #cccccc
          border-right 1px solid #cccccc
          .el-carousel
            padding-top 4px
          ul
            li
              width 20px
              height 20px
          .avatar-uploader
            width 100%
            height 100%
            display flex
            align-items center
            justify-content center
            border 1px solid #ccc
            box-shadow 0 0 4px #ccc
            background-color #f8f8f8
            i
              font-size 40px
              line-height 80px
              color #1491f2
            img
              position absolute
              margin auto
              top -9999px
              right -9999px
              bottom -9999px
              left -9999px
              min-width 100%
              min-height 100%
          .adtemplate
            position absolute
            right 0
            top 0
        .proposalText
          p
            margin-bottom 10px
</style>
<style>
#shopInstallAddInfo2 .broadcast .el-carousel__indicators li {
  width: 20px;
  height: 8px;
}
#shopInstallAddInfo2 .broadcast .el-carousel__indicators li button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 1;
}
#shopInstallAddInfo2 .broadcast .el-carousel__indicator.is-active button {
  background-color: #1491f2;
}
</style>
