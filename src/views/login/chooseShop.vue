<template>
  <el-row id="chooseShop" type="flex" justify="center">
    <el-col>
      <el-row class="chooseShopHeader" type="flex" justify="space-between">
      <el-col :span="8">
        <span class="font20 fontWeight">
          <i class="bgImg"></i>
          汽配帮手 |
          </span>
          <span
          class="font18">选择店铺</span>
        </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="end">
          <span class="font14">
          {{staff_phone}}
        </span>
        &nbsp;&nbsp;&nbsp;
          <span @click="outUser" class="pointer hoverBlue font14">退出</span>
        </el-row>
        </el-col>
    </el-row>
    <el-row class="chooseShopMain">
      <el-row class="chooseShopMainInfo" type="flex" justify="start">
        <div class="headBg" :span="10" >
          <img :src="staff_img_thum" alt="">
        </div>
      <div >
        <p class="infoName font18 fontWeight">{{staff_name}}</p>
        <p >
          <span class="font14">{{staff_phone}}</span>
        </p>
        </div>
      <div class="establishShop" v-show="!hasBeenCreatedStore">
        <el-button type="primary" @click="dialogFormVisibleShow">创建店铺</el-button>
      </div>

      </el-row>
      <div class="chooseShopContent">
          <!-- <div class="chooseShopContentSer">
              <el-input
                placeholder="搜索店铺"
                size="small"
                v-model="search">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </div> -->
          <el-row>
            <el-col 
              v-for="(item,index) in shopItems" 
              :key=index 
              :span="8" 
              class="shopItem pointer"
               @mouseover.native="showButton(index)"
              @mouseout.native="hideButton(index)"
              @click.native = "chooseShop(index)"
            >
              <div><img :src="item.logo" alt=""></div>
              <p>{{item.name}}</p>
              <p class="font14">
                创建人:{{item.creatorName}}
              </p>
              <transition name="el-fade-in" mode="out-in">
               <p v-show="item.show" class="modifyShop">
                <span class="pointer blue font14" @click.stop="changeShopInfo(index)">修改</span>
              </p>
              </transition>
             
            </el-col>
            
          </el-row>
      </div>
    </el-row>

    <!-- 创建店铺 -->
    <el-dialog 
    title="创建店铺" 
    :visible.sync="dialogFormVisible" 
    class="establishDialog"
    width="30%"
    center
    >
      <el-form 
      :model="establishForm"
      ref="establishForm"
      label-width="100px"
      :rules="rules"
      >
        <el-form-item label="店铺LOGO:" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="pc_seller/pc_seller/images/ImgUploads"
            :show-file-list = "false"
            :before-upload="beforeUpload"
            :http-request="uploadImg"
            :drag = "true"
           >
            <img v-if = "imageUrl" :src = "imageUrl" class = "avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺名称:" prop="name">
          <el-input v-model="establishForm.name"
          placeholder="请输入店铺名称"
          size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="经营类目:" prop="groupValue">
          <el-select v-model="establishForm.groupValue" placeholder="请选择"
          size="mini"
          >
          <el-option
            v-for = "item in establishForm.group"
            :key = "item.id"
            :label = "item.label"
            size="mini"
            :value = "item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="经营身份:" prop="identityValue">
          <el-select v-model="establishForm.identityValue" placeholder="请选择"
          size="mini"
          >
          <el-option
            v-for = "item in establishForm.identity"
            :key = "item.id"
            :label = "item.label"
            size="mini"
            :value = "item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item 
          label="所在地区:"
          prop="selectedOptions"
          ref="selectedOptions"
        >
          <el-cascader
            :options="options"
            v-model="establishForm.selectedOptions"
            @change="handleChange"
            ref = "cascader"
            size="mini"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" prop="address">
          <el-input v-model="establishForm.address"
          placeholder="请输入详细地址，如街道名称，门牌号等信息"
          size="mini"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="sureAgreement">
        <el-row type="flex" justify="center">
          <div>
            <el-checkbox v-model="checked"></el-checkbox>
          <span class="font14">阅读并同意</span>
          <span 
            class="blue pointer font14"
            @click="toAgreement"
          >《迈邦汽配帮手软件协议》</span>
          </div>
        </el-row> 
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button 
          size="small" 
          type="primary" 
          @click="establishShopForm('establishForm')"
        >
          创建店铺
        </el-button>

      </span>
      
    </el-dialog>
    </el-col>
    
  </el-row>
</template>
<script>
import options from "@/utils/city_data2017_element";
import {
  establishShop,
  storeId,
  usermessage,
  completeMaterial
} from "@/api/login/login";
import { setCookie } from "utils/cookies";
import { validatePhone } from "@/utils/validate";
import { storeHome, getMerchantInfo } from "api/shop/profile";
import { imgUploads, judgecertification } from "api/shop/authentication";

export default {
  data() {
    return {
      checked: true,
      imageUrl: "",
      store_Id: "",
      staff_img_thum: "",
      staff_name: "",
      staff_phone: "",
      hasBeenCreatedStore: false,
      search: "",
      show: false,
      options,
      shopItems: [],
      dialogFormVisible: false,
      establishForm: {
        storeId: "",
        logoUrl: "",
        name: "",
        groupValue: "",
        identityValue: "",
        group: [
          {
            id: "1",
            label: "汽车配件"
          },
          {
            id: "2",
            label: "汽车精品"
          },
          {
            id: "3",
            label: "养护配件"
          },
          {
            id: "4",
            label: "汽保工具"
          },
          {
            id: "5",
            label: "油漆化工"
          },
          {
            id: "6",
            label: "汽车改装"
          }
        ],
        identity: [
          {
            id: "1",
            label: "经销商"
          },
          {
            id: "2",
            label: "代理商"
          },
          {
            id: "3",
            label: "品牌商"
          },
          {
            id: "4",
            label: "生产商"
          }
        ],
        address: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        areaId: "",
        areaName: "",
        contact: "",
        phone: "",
        describe: "",
        selectedOptions: []
      },
      rules: {
        logoUrl: [
          { required: true, message: "请上传店铺LOGO", trigger: "blur" }
        ],
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
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        contact: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到20 个字符",
            trigger: "blur"
          }
        ],
        groupValue: [
          { required: true, message: "请选择经营类目", trigger: "change" }
        ],
        identityValue: [
          { required: true, message: "请选择经营身份", trigger: "change" }
        ],
        describe: [
          { required: true, message: "请输入店铺介绍", trigger: "blur" }
        ],
        selectedOptions: [
          { required: true, message: "请选择所在地区", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.store_Id = this.$store.state.usersModule.currentUser.UserStoreId;
    this.details();
  },
  methods: {
    // 跳转到协议页面
    toAgreement() {
      const { href } = this.$router.resolve({
        path: "/protocol"
      });
      window.open(href, "_blank");
    },
    // 修改店铺信息
    changeShopInfo(index) {
      this.chooseShop(index, true);
    },
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
    // 上传店铺图片
    uploadImg(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(this.imageUrl);
        imgUploads(4, this.imageUrl).then(result => {
          this.establishForm.logoUrl = result.data.data.originImg;
        });
      };
    },

    details() {
      storeId(localStorage.getItem("currentUser_token")).then(result => {
        if (result.data.code == 200) {
          console.log(result.data, "登录信息");
          this.$store.dispatch("closeWebsoket", false); //如果是登录就开启
          sessionStorage.clear();
          localStorage.setItem("userName", result.data.data.user.name);
          console.log(result.data.data);
          localStorage.setItem("userId", result.data.data.user.userId);
          // 保存用户名字
          this.$store.commit("setUserName", result.data.data.user.name);
          localStorage.setItem("userAvatar", result.data.data.user.avatar);

          this.staff_name = result.data.data.user.name;
          this.staff_img_thum = result.data.data.user.avatar;
          this.staff_phone = localStorage.getItem("currentUser_name");
          let arr = result.data.data.store.stores;
          this.hasBeenCreatedStore = result.data.data.store.hasBeenCreatedStore;
          for (let value of arr) {
            let show = false;
            value.show = false;
          }
          this.shopItems = arr;
        } else {
          this.$message({
            message: result.data.error,
            type: "error"
          });
        }
      });
    },
 
    // 退出店铺
    outUser() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$store.commit("outUser");
          document.title = "汽配帮手";
          setCookie("", -1); //修改2值都为空，天数为负1天就好了
          console.log(2);
          this.$router.push({
            path: "/login"
          });
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {});
    },
    showButton(index) {
      this.shopItems[index].show = true;
    },
    hideButton(index) {
      this.shopItems[index].show = false;
    },
    dialogFormVisibleShow() {
      this.dialogFormVisible = true;
    },
    //省市区改变
    handleChange() {
      this.establishForm.provinceId = this.$refs.cascader.currentValue[0];
      this.establishForm.provinceName = this.$refs.cascader.currentLabels[0];
      this.establishForm.cityId = this.$refs.cascader.currentValue[1];
      this.establishForm.cityName = this.$refs.cascader.currentLabels[1];
      this.establishForm.areaId = this.$refs.cascader.currentValue[2];
      this.establishForm.areaName = this.$refs.cascader.currentLabels[2];
    },

    // 选择店铺
    chooseShop(index, modify) {
      this.$store.commit("setstoreId", {
        store_id: this.shopItems[index].storeId
      });
      // 保存认证信息
      judgecertification().then(result => {
        if (result.data.code == 200) {
          //是否是创建人
          this.$store.commit("setIsCreater", this.shopItems[index].isCreator);
          localStorage.setItem("status", result.data.data.status);
          localStorage.setItem("cer_type", result.data.data.cer_type);
        } else {
          this.$message.error(result.data.error);
        }
      });
      // 获取店铺相关数据保存到store
      let program = {
        offline_store: 2, // 是否有线下网点
        secured_transaction: 2, //  是否开启担保交易
        merchantInfo: {
          shop_name: "", //店铺名称
          merchant_logo: "" //店铺logo
        },
        certification: {
          type: 1, // 认证类型（1：个人认证，2企业认证）
          status: 1 // 认证状态（1：申请中，2：已通过，3：未通过）
        }
      };
      storeHome().then(result => {
        localStorage.setItem(
          "shop_name",
          result.data.data.merchantInfo.shop_name
        );
        document.title = result.data.data.merchantInfo.shop_name;
        this.$store.commit("change_home_info", {
          merchantInfo: result.data.data.merchantInfo,
          certification: result.data.data.certification
        });
      });
      getMerchantInfo().then(result => {
        this.$store.commit("change_home_info", {
          offline_store: result.data.data.offline_store,
          secured_transaction: result.data.data.secured_transaction
        });
      });
      let _token = localStorage.getItem("currentUser_token");
      console.log(_token);
      // // 设置cookies
      // setCookie(_token);
      //跳转到首页
      if (modify) {
        this.$router.push({
          path: "/shop/info"
        });
      } else {
        this.$router.push({
          path: "/home"
        });
      }
    },
    // 跳转设置页面
    setInfo() {
      this.$router.push({
        path: "/user"
      });
    },
    // 提交创建店铺的表单
    establishShopForm(formName) {
      this.$refs[formName].validate().then(result => {
        if (result) {
          let _token = localStorage.getItem("currentUser_token");
          let object = {
            token: _token,
            logo: this.establishForm.logoUrl,
            name: this.establishForm.name,
            businessClassification: this.establishForm.groupValue,
            businessIdentify: this.establishForm.identityValue,
            provinceId: this.establishForm.provinceId,
            provinceName: this.establishForm.provinceName,
            cityId: this.establishForm.cityId,
            cityName: this.establishForm.cityName,
            areaId: this.establishForm.areaId,
            areaName: this.establishForm.areaName,
            addressDetail: this.establishForm.address
          };
          console.log(object);
          establishShop(object).then(result => {
            console.log(result);
            if (result.data.code == 200) {
              this.$message({
                message: "店铺创建成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.details();
            } else {
              this.$message({
                message: result.data.error,
                type: "error"
              });
            }
            this.$refs[formName].resetFields();
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#chooseShop
  >.el-col
    width 900px
  .chooseShopHeader
    min-width 900px
    line-height 70px
    padding 0 5px
    span
      vertical-align middle
    i
      display inline-block
      width 30px
      height 30px
      vertical-align middle
      background-image url('../../assets/icon.png')
  .chooseShopMain
    background-color #f8f8f8
    padding 5px 5px 5px 5px
    .chooseShopMainInfo
      padding-left 25px
      height 50px
      margin 15px 0
      .headBg
        width 50px
        border-radius 50%
        background-color black
        margin-right 10px
        img
          width 100%
          height 100%
      .infoName
        margin-bottom 5px
      .establishShop
        position absolute
        right 50px
    .chooseShopContent
      background-color #ffffff
      padding 20px 15px
      width 100%
      min-height 500px
      .chooseShopContentSer
        width 180px
        margin-bottom 20px
      .shopItem
        border 1px solid #cccccc
        height 130px
        margin-bottom 50px
        padding 36px 10px 0 80px
        width 280px
        border-top 3px solid #ccc
        background-position 10px center
        background-size 60px 60px
        background-repeat no-repeat
        position relative
        >div
          width 60px
          height 60px
          position absolute
          border-radius 50%
          overflow hidden
          top 35px
          left 10px
          img
            width 100%
            height 100%
        .modifyShop
          span
            position absolute
            right 8px
            bottom 0
        p
          line-height 30px
      .shopItem:not(:nth-of-type(3n))
        margin-right 10px
  .establishDialog
    .el-cascader
      width 100%
    .el-select
      width 100%
    .dialog-footer
      .el-button
        width 200px
</style>
<style>
#chooseShop .establishDialog .el-dialog__header {
  background-color: #f8f8f8;
}

#chooseShop .el-form-item {
  width: 100%;
}
#chooseShop .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#chooseShop .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#chooseShop .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#chooseShop .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
#chooseShop .el-upload-dragger {
  width: 100px;
  height: 100px;
}
#chooseShop .el-upload-dragger img {
  width: 100px;
  height: 100%;
}
#chooseShop .el-dialog {
  min-width: 500px;
}
#chooseShop .el-dialog .el-dialog__footer {
  margin-top: -30px;
}
</style>
