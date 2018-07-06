<template>
  <!-- 商家地址栏 -->
  <el-container id="shopInfo">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          店铺资料
        </el-breadcrumb-item>

      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row>
        <el-row class="mainBody bgFFF" type="flex" justify="center"> 
          <el-col>
            <el-form 
            :model="form"
            ref="form"
            label-width="100px"
            :rules="rules"
            >
              <el-form-item label="店铺LOGO:" prop="logo" class="upLogo">
                <!-- <el-upload
                  class="avatar-uploader"
                  action="pc_seller/pc_seller/images/ImgUploads"
                  :show-file-list = "false"
                  :before-upload="beforeUpload"
                  :http-request="uploadImg"
                  :drag = "true"
                >
                  <img v-if = "imageUrl" :src = "imageUrl" class = "avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
                <span @click="setHeadImg" class="pointer"><img v-if = "imageUrl" :src = "imageUrl" class = "avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i></span>
              </el-form-item>
              <el-form-item label="店铺名称:" prop="name">
                <el-input v-model="form.name"
                placeholder="请输入店铺名称"
                size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人:" prop="contact">
                <el-input v-model="form.contact"
                placeholder="请输入联系人姓名"
                size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="phone">
                <el-input v-model="form.phone"
                placeholder="请输入联系人电话"
                size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="经营类目:" prop="businessClassification">
                <el-select 
                v-model="form.businessClassification" 
                placeholder="请选择"
                @change="changeIfication"
                size="mini"
                >
                <el-option
                  v-for = "item in classify"
                  :key = "item.id"
                  :label = "item.name"
                  size="mini"
                  :value = "item.id">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item    
              label="经营身份:" 
              prop="businessIdentify"
              >
                <el-select 
                v-model="form.businessIdentify" 
                placeholder="请选择"
                @change="changeIdentify"
                size="mini"
                >
                <el-option
                  v-for = "item in identifies"
                  :key = "item.id"
                  :label = "item.name"
                  size="mini"
                  :value = "item.id">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="店铺介绍:" prop="describe">
                <el-input  type="textarea" v-model="form.describe"
                maxlength="200"
                :autosize="{minRows: 2}"
                placeholder="请描述下店铺的具体情况"
                size="mini"
                >
                </el-input>
                <span class="count">{{countNum}}/200</span>
              </el-form-item>
              <el-form-item 
                label="所在地区:"
                prop="selectedOptions"
                ref="selectedOptions"
              >
                <el-cascader
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                  ref = "cascader"
                  size="mini"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址:" prop="addressDetail">
                <el-input v-model="form.addressDetail"
                placeholder="请输入详细地址，如街道名称，门牌号等信息"
                size="mini"
                ></el-input>
              </el-form-item>
                <el-form-item>
                  <el-row type="flex" justify="center">

                    <el-button  type="primary" size="small" @click="submitForm('form')">提交</el-button>
                  </el-row>
                  
              </el-form-item>
            </el-form>
          </el-col>
          <cropper ref="cropper" @cropper-callback="cropperCallback"></cropper>
        </el-row>
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import options from "@/utils/city_data2017_element";
import { imgUploads } from "api/shop/authentication";
import cropper from "@/components/cropper/index.vue";
import {
  storeDetail,
  businessClassify,
  businessIdentifies,
  completeMaterial
} from "api/login/login";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      let re = /^1[0-9]{10}$/;
      if ((value + "").length < 10 && (value + "").length != 0) {
        return callback(new Error("手机号位数不够"));
      } else if ((value + "").length != 0 && !re.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      countNum: 0,
      imageUrl: "", // logo图片信息
      options, //省市区信息
      classify: [], // 经营分类
      identifies: [], // 经营身份
      form: {},
      selectedOptions: [],
      rules: {
        logo: [{ required: true, message: "请上传店铺LOGO", trigger: "blur" }],
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          {
            min: 2,
            max: 40,
            message: "长度在 2 到40 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        contact: [
          {
            min: 2,
            max: 20,
            message: "长度在 2 到20 个字符",
            trigger: "blur"
          }
        ],
        businessClassification: [
          { required: true, message: "请选择经营类目", trigger: "change" }
        ],
        businessIdentify: [
          { required: true, message: "请选择经营身份", trigger: "change" }
        ],
        describe: [
          {
            min: 2,
            max: 200,
            message: "长度在 2 到200 个字符",
            trigger: "blur"
          }
        ],
        selectedOptions: [],
        addressDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 经营分类
    businessIdentifies().then(result => {
      if (result.data.code == 200) {
        this.identifies = result.data.data.identifies;
      } else {
        this.$message.error(resutl.data.error);
      }
    });
    //经营身份
    businessClassify().then(result => {
      if (result.data.code == 200) {
        this.classify = result.data.data.classify;
      } else {
        this.$message.error(resutl.data.error);
      }
    });
    //  初始信息
    storeDetail(localStorage.getItem("storeId")).then(result => {
      if (result.data.code == 200) {
        this.form = result.data.data;
        this.selectedOptions = [
          result.data.data.provinceId,
          result.data.data.cityId,
          result.data.data.areaId
        ];
        this.form.businessClassification =
          result.data.data.businessClassification.id;
        this.form.businessIdentify = result.data.data.businessIdentify.id;
        this.form.provinceId = result.data.data.provinceId;
        this.form.provinceName = result.data.data.provinceName;
        this.form.cityId = result.data.data.cityId;
        this.form.areaId = result.data.data.areaId;
        this.form.cityName = result.data.data.cityName;
        this.form.areaName = result.data.data.areaName;
        this.imageUrl = result.data.data.logo;
        this.form.describe = result.data.data.describe;
        this.form.contact = result.data.data.contact;
      } else {
        this.$message.error(resutl.data.error);
      }
    });
  },

  mounted() {},
  computed: {
    //字数改变
    countChange() {
      return this.form.describe;
    }
  },
  watch: {
    countChange: function() {
      this.countNum = ("" + this.form.describe).length;
    }
  },
  methods: {
    setHeadImg() {
      this.$refs.cropper.setshowCropper();
    },
    // 切图工具
    cropperCallback(data) {
      console.log(data);
      let that = this;
      if (data.result == 1) {
        that.form.logo = data.data.thumImg;
        that.imageUrl = data.data.fullpathThumImg;
      } else {
        that.$message.error(data.msg);
      }
    },
    // 提交列表
    submitForm(formName) {
      this.$refs[formName].validate().then(result => {
        if (result) {
          let token = localStorage.getItem("currentUser_token");
          completeMaterial(token, this.form).then(result => {
            if (result.data.code === 200) {
              this.$store.commit("change_image_shop_logo");
              document.title = this.form.name;
              this.$message.success("完善店铺信息成功");
            } else {
              this.$message.error(result.data.error);
            }
          });
        }
      });
    },
    // 图片上传之前
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error("请使用png/jpg格式的图片!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传图片
    uploadImg(file) {
      this.$refs.cropper.setshowCropper();
      // let reader = new FileReader();
      // reader.readAsDataURL(file.file);
      // reader.onload = () => {
      //   this.imageUrl = reader.result;
      //   // console.log(this.imageUrl);
      //   imgUploads(4, this.imageUrl).then(result => {
      //     this.form.logo = result.data.data.originImg;
      //   });
      // };
    },

    //省市区改变
    handleChange() {
      this.form.provinceId = this.$refs.cascader.currentValue[0];
      this.form.provinceName = this.$refs.cascader.currentLabels[0];
      this.form.cityId = this.$refs.cascader.currentValue[1];
      this.form.cityName = this.$refs.cascader.currentLabels[1];
      this.form.areaId = this.$refs.cascader.currentValue[2];
      this.form.areaName = this.$refs.cascader.currentLabels[2];
    },
    // 经营类别改变
    changeIfication(value) {
      // console.log(value);
      this.form.businessClassification = value;
    },
    // 经营身份改变
    changeIdentify(value) {
      // console.log(value);
      this.form.businessIdentify = value;
    }
  },
  components: { cropper }
};
</script>
<style lang="stylus" scoped>
#shopInfo
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 20px 10px 100px 10px
      min-height 750px
      >.el-col
        min-width 450px
        width 30%
        .el-select
          width 100%
        .el-cascader
          width 100%
      .el-button
        width 220px
      .count
        position absolute
        right 4px
        bottom -6px
        font-size 12px
        color #999999
      .upLogo
        img
          width 100px
          height 100px
        .el-button
          position absolute
          width 60px
          top 30px
</style>

<style>
#shopInfo .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#shopInfo .el-upload-dragger {
  width: 100px;
  height: 100px;
}
#shopInfo .el-upload-dragger img {
  width: 100px;
  height: 100%;
}
</style>