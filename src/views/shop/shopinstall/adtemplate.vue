<template>
  <div id="templateAddAd">
    <el-dialog
      title="图片广告"
      :visible.sync="$store.state.addinfo.diglogVisibleImg"
      :modal-append-to-body="false"
      width="350px"
      :show-close="false"
      class="upBgImg"
      :modal="false"
      custom-class="upBgimgA"
    >
      <el-row justify="start" type="flex" class="showImgMain">
        <span class="nameSpan">背景图片:</span>
        <div class="rightMain">
          <el-upload class="avatar-uploader"
          action="pc_seller/pc_seller/images/ImgUploads"
          :show-file-list = "false"
          :before-upload = "beforeUpload"
          :http-request	= "beforeAvatarUpload"
          >
            <img v-if="addImgItemsList.url" :src="addImgItemsList.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">
            </i>
          </el-upload>
          <p class="font12 color999">建议尺寸：500X400像素，尺寸不匹配时图片将被压缩或拉伸以铺满画面</p>
        </div>
        
      </el-row>
      <el-row justify="start" type="flex" class="showImgMain">
        <span class="nameSpan">链接:</span>
        <el-button
          plain
          size="small"
          class=""
          @click="diglogVisibleShow"
        >
        <span v-if="addImgItemsList.describe ">{{addImgItemsList.describe }}</span>
          <span v-else>请选择目的地</span>
          
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-row>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDislogImg" size="small">取 消</el-button>
        <el-button type="primary" @click="bindingImg" size="small">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 第二个dialog -->
        <el-dialog
          class="chooiesFoot"
          title="选择跳转商品"
          :visible.sync="diglogVisible"
          :modal-append-to-body="true"
          width="400px"
        >
          <el-input
            size="small"
            @change.native="searchShop"
            v-model="searchText"
            placeholder="搜索你要找的商品"
            prefix-icon="el-icon-search"
          ></el-input>
          <ul class="color-6 productList">
            <label v-for="item in items"  :key="item.id">
            <li 
              
              :style="'backgroundImage:url('+item.skuInfo.sku_img+')'"
            >
              <p>{{item.product_name}}</p>
              <p>编码：{{item.product_sku_num}}</p>
              <el-radio
                v-model="addImgItemsList.radio"
                @change="radioChange"
                :label="item.id"
              >
                </el-radio>
            </li>
            </label>
          </ul>
          <el-row class="pagingDiv" justify="center" type="flex">
            <el-pagination
              small
              layout="prev, pager, next"
              :background = "true"
              :page-size = "5"
              :pager-count = "5"
              :total="total"
              @current-change = "Paging"
              >
            </el-pagination>
          </el-row> 
          <span slot="footer" class="dialog-footer">
            <el-button @click="diglogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="binding" size="small">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { imgUploads } from "api/shop/authentication";
import {
  detail,
  searchMerchantProduct,
  saveMerchantAdvertisement
} from "api/shop/install";
export default {
  data() {
    return {
      searchText: "",
      addImgItemsList: {
        chooseID: 0,
        radio: 0,
        picture_relative: "",
        describe: "",
        url: "",
        productId: 0
      },
      advertisementList: [],
      diglogVisible: false, //打开
      paginationIndex: 0, //商品列表对应的index
      total: 0, //商品的页数
      productData: [], //商品总列表
      items: [], //当前页面商品列表
      broadcasts: []
    };
  },
  created() {
    this.Initialization();
  },
  mounted() {},
  computed: {
    ...mapState({
      addImgItems: state => state.addinfo.addImgItems,
      diglogVisibleImg: state => state.addinfo.diglogVisibleImg
    }),
    chooseChange() {
      return this.$store.state.addinfo.addImgItems.chooseID;
    }
  },
  watch: {
    chooseChange: function() {
      console.log("我变化了");
      this.addImgItemsList = this.addImgItems;
      console.log(this.addImgItemsList);
    }
  },
  methods: {
    // 商品搜索
    searchShop() {
      searchMerchantProduct().then(result => {
        console.log("测试const");
        let baseArr = result.data.data.productData;
        if (!this.searchText) {
          console.log(2);
          this.productData = baseArr;
          this.total = this.productData.length;
          this.items = this.productData.slice(
            this.paginationIndex * 5,
            this.paginationIndex * 5 + 5
          );
        } else {
          let arr1 = [];
          baseArr.forEach((value, index) => {
            // console.log(value.product_name.indexOf(this.searchText));
            // console.log(value.product_sku_num.indexOf(this.searchText));
            if (
              value.product_name.indexOf(this.searchText) + 1 ||
              value.product_sku_num.indexOf(this.searchText) + 1
            ) {
              arr1.push(value);
            }
          });
          this.productData = arr1;
          this.total = this.productData.length;
          this.items = this.productData.slice(
            this.paginationIndex * 5,
            this.paginationIndex * 5 + 5
          );
        }
      });
    },
    // 重置
    Initialization() {
      console.log(this.addImgItems);
      this.addImgItemsList = this.addImgItems;
      // 进行商品分类
      searchMerchantProduct().then(result => {
        this.productData = result.data.data.productData;
        this.total = this.productData.length;
        this.items = this.productData.slice(
          this.paginationIndex * 5,
          this.paginationIndex * 5 + 5
        );
      });
    },
    // 绑定翻页与商品变化
    productPagin() {
      this.items = this.productData.slice(
        this.paginationIndex * 5,
        this.paginationIndex * 5 + 5
      );
    },
    // 选择商品列表栏展开
    diglogVisibleShow() {
      if (!this.addImgItemsList.url) {
        this.$message.error("请上传图片");
      } else {
        this.diglogVisible = true;
      }
    },
    // 绑定图片与商品
    binding() {
      if (this.addImgItems.radio) {
        this.productData.forEach(value => {
          if (value.id == this.addImgItemsList.radio) {
            this.addImgItemsList.describe =
              value.product_name + "\\" + value.product_sku_num;
          }
          return;
        });
      }
      this.items.forEach(value => {
        if (this.addImgItemsList.radio == value.id) {
          this.addImgItemsList.describe =
            value.product_name + "\\" + value.product_sku_num;
        }
      });
      this.diglogVisible = false;
      console.log(this.addImgItemsList);
    },
    // 提交保存
    bindingImg() {
      this.addImgItemsList.productId = this.addImgItemsList.radio;
      this.$store.commit("change_addimgitems", this.addImgItemsList);
      if (this.addImgItemsList.picture_relative) {
        saveMerchantAdvertisement(
          this.$store.state.addinfo.template_id,
          {
            picture_relative: this.addImgItemsList.picture_relative,
            productId: this.addImgItemsList.productId
          },
          this.addImgItemsList.chooseID + 1
        );
        // this.advertisementList = [];
        this.Initialization();
        this.$store.commit("addinfo_change_add");
        //关闭dialog
        this.$store.commit("addinfo_change_diglogvisibleimg");
      } else {
        this.$message.error("广告图不能为空");
      }
    },
    // 翻页的时候
    Paging(value) {
      this.paginationIndex = value - 1;
      this.productPagin();
    },
    // 按钮选中改变的时候
    radioChange() {},
    //图片上传之前
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("请使用png/jpg格式的图片!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //图片自定义上传
    beforeAvatarUpload(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        imgUploads(1, reader.result).then(result => {
          this.addImgItemsList.url = reader.result;
          this.addImgItemsList.picture_relative = result.data.data.originImg;
        });
      };
    },
    //隐藏图片
    hideDislogImg() {
      this.$store.commit("addinfo_change_diglogvisibleimg");
    }
  }
};
</script>
<style lang="stylus" scoped>
#templateAddAd
  .upBgImg
    .showImgMain
      .nameSpan
        display inline-block
        width 60px
        text-align right
        padding-right 10px
        line-height 32px
      .el-button
        width 230px
      .rightMain
        width 230px
        p
          padding-top 10px
        .avatar-uploader
          width 100px
          height 80px
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
            width 100px
            height 80px
    .showImgMain:first-of-type
      margin-bottom 20px
    .chooiesFoot
      .pagingDiv
        position relative
        margin-top 20px
        .pagingSpan
          display inline-block
          position absolute
          top 0
          right 0px
          line-height 22px
          font-size 12px
  .productList
    width 100%
    li
      width 100%
      border-bottom 1px solid #cccccc
      padding 10px 20px 10px 70px
      background-repeat no-repeat
      background-size 40px 40px
      background-position center left
      position relative
      p:first-of-type
        margin-bottom 6px
      .el-radio
        position absolute
        right 0
        top 24px
</style>
<style>
#templateAddAd .upBgImg {
  width: 100vw;
  height: 100vh;
}
#templateAddAd .upBgImg .upBgimgA {
  width: 350px;
  position: absolute;
  left: 50%;
  transform: translate(50%, 0);
}
#templateAddAd .el-dialog {
  background-color: #f2f2f2;
}
#templateAddAd .el-dialog .productList .el-radio .el-radio__label {
  display: none;
}
#templateAddAd .el-upload {
  width: 100px;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
}
#templateAddAd .el-upload img {
  width: 100px;
  height: 80px;
}
#templateAddAd .showImgMain .el-button {
  text-align: left;
  background-color: #f2f2f2;
}
#templateAddAd .showImgMain .el-button .el-icon-arrow-right {
  position: absolute;
  right: 20px;
}
</style>
