<!--添加商品-->
<template>
    <el-container class="publishProduct">
        <router-view></router-view>
        <el-header class="bgFFF"  v-if="$route.path!='/goods/publishProduct/productpreview'">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <router-link to="/goods/admin">商品管理</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    新增商品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        
        <el-main class="bgFFF" v-if="$route.path!='/goods/publishProduct/productpreview'">
            <el-row>
                <el-col :span="12" class="bgFFF">
                    <div class="arrow colorFFF"  @click="productpreview">
                        预览
                        <div class="jian">

                        </div>
                    </div>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="15" :offset="1" class="input">
                    <div class="box" v-for="(item,index) in input" :key="index">
                        <span class="font14 soan">{{item.name}}：</span>
                        <input type="text" class="font14 inputpadd" :placeholder="item.placeholder" v-model="item.value" :readonly='item.id=="freightCostTemplate"' @keyup="keyCategories(item.id,index,item.name)" @blur="blueChange(item.value,index,item.id)" @focus="focusChange(item.id,index,item.name)">
                        <i v-if="item.id==2 || item.id=='freightCostTemplate'" slot="prefix" class="el-icon-arrow-right right" @click="Categoriesa(item.id,index,item.name)"></i>
                        <i v-if="item.id=='trialModels'" @click="focusChange(item.id,index,item.name)" slot="prefix" class="el-icon-circle-plus-outline right"></i>
                        <i v-if="item.deleteIcom==true"  slot="prefix" class="el-icon-delete outer" @click="deleteattributes(index,item.id)"></i>
                        <p v-if="item.show">{{item.caveat}}</p>
                    </div>
                    <el-button type="primary" @click="addAttribute"><i class="el-icon-plus"></i>新增属性</el-button>
                </el-col>
            </el-row>

            <div  class="choose-category">      <!-- 配件分类 -->
                <el-dialog title="选择分类" :visible.sync="dialogTableVisible">
                    <p>选择配件分类</p>
                    <div class="overauto">
                        <div :class="{className:true,classChange:classNum==index}" v-for="(value,index) in selectAccessoriesClassification" @click="classChange(index)" :key="index">
                            <span>{{value.classify_name}}</span>
                            <i v-if="classNum==index" class="icon"><img src="../../assets/goods/yes.png" alt=""></i>
                        </div>
                    </div>
                    <div class="save">
                        <button class="fr" @click="dialogTableVisible=false">确定</button>
                        <button class="fr" @click="dialogTableVisible=false">取消</button>
                    </div>
                </el-dialog>
            </div>

            <div  class="freighttemplate">      <!-- 运费模板 -->
                <el-dialog title="选择运费模板" :visible.sync="freighttemplatemodal">
                    <div class="overauto">
                        <div :class="{className:true,classChange:freightNum==index}" v-for="(value,index) in getfreightTemplateList" @click="freightChange(index)" :key="index">
                            <span>{{value.name}}</span>
                            <i v-if="freightNum==index" class="icon"><img src="../../assets/goods/yes.png" alt=""></i>
                        </div>
                    </div>
                    <div class="save">
                        <button class="fr" @click="freighttemplatemodal=false">确定</button>
                        <button class="fr" @click="freighttemplatemodal=false">取消</button>
                    </div>
                </el-dialog>
            </div>

            <div  class="new-attribute">      <!-- 新增属性 -->
                <el-dialog title="选择分类" :visible.sync="newAttribute">
                    <p>自定义属性</p>
                    <div class="add-attribute">
                        <input class="txt" type="text" v-model="attributeAdd">
                        <button class="fr el-icon-plus" @click="customAttributes"></button>
                    </div>
                    <div class="overauto">
                        <div :class="{className:true,classChange:attributeNum==index}" v-for="(item,index) in attribute" @click="attributeChange(index)" :key="index">
                            <i v-if="attributeNum==index" class="icon"><img src="../../assets/goods/yes.png" alt=""></i>
                            <span>{{item.name}}</span>
                            <span class="system" v-if="typeof(item.id)=='string'">系统</span>
                            <a class="delete" v-if="typeof(item.id)=='number'" @click.stop="attributeDelete(item.name)">删除</a>
                        </div>
                    </div>
                    <div class="save">
                        <button class="fr" @click="addattributes">确定</button>
                        <button class="fr" @click="newAttribute=false">取消</button>
                    </div>
                </el-dialog>
            </div>

            <el-row>
                <el-col :span="15" :offset="1" class="product-picture font14" >
                    <div class="img">
                        商品图片：
                        <div class="imgLIst" v-for="(value,index) in priceList" :key="index">
                            <img :src="value" alt="" width="100%" height="100%">
                            <i class="red" @click="handleRemove1(index)">×</i>
                        </div>
                        <!-- <el-upload
                        v-if="priceList.length<5"
                        action="https://easy-mock.com/mock/5af24ea78b04ba36ed89b500/mb/upload"
                        list-type="picture-card"
                        :multiple='true'
                        :limit=5
                        :show-file-list='false'
                        :before-upload="beforeAvatarUpload"
                        :on-success='handleSuccess'>
                            <i class="el-icon-plus"></i>
                            
                        </el-upload> -->
                        <div v-if="priceList.length<5" class="el-icon-box"  @click="setHeadImg(1)">
                            +添加图片
                        </div>
                    </div>
                    
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p class="txt">建议尺寸：800*800像素，最多5张</p>
                    <p class="red" v-if="prohide">最少需要一张商品图</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15" :offset="1" class="product-attributes">
                    <p class="font14">商品颜色&尺寸&规格：<el-button type="text" @click="addProduct(1)">零售</el-button><span class="blue">|</span><el-button type="text" @click="addProduct(2)">批发</el-button></p>
                    <div class="line" v-for="(item,index) in product" :key="index">
                        <div class="name">
                            <span class="txt">{{item.sku_name}}</span>
                            <el-button type="text" @click='edit(index)'>编辑</el-button>
                            <el-button type="text" @click="deleteSp(index)">删除</el-button>
                        </div>

                        <div class="retail"  v-if="item.sell_type==1">   <!--  零售 -->
                            <div class="price">
                                价格：
                                <span class="red">￥{{item.product_price}}</span>
                            </div>
                            <div class="instock">
                                库存：
                                <span>{{item.product_inventory}}</span>
                            </div>
                        </div>

                        <div class="wholesale" v-else> <!--批发-->
                            <table>
                                <tr>
                                    <td>价格</td>
                                    <td v-if="item.wholesale_rules[0].sell_money">￥{{item.wholesale_rules[0].sell_money}}</td>
                                    <td v-if="item.wholesale_rules[1].sell_money">￥{{item.wholesale_rules[1].sell_money}}</td>
                                    <td v-if="item.wholesale_rules[2].sell_money">￥{{item.wholesale_rules[2].sell_money}}</td>
                                </tr>
                                <tr>
                                    <td>起批价</td>
                                    <td v-if="item.wholesale_rules[0].sell_money"><span v-if="!item.wholesale_rules[0].end_sum">≥</span>{{item.wholesale_rules[0].start_sum}}<span v-if="item.wholesale_rules[0].end_sum">-{{item.wholesale_rules[0].end_sum}}</span>件</td>
                                    <td v-if="item.wholesale_rules[1].sell_money"><span v-if="!item.wholesale_rules[1].end_sum">≥</span>{{item.wholesale_rules[1].start_sum}}<span v-if="item.wholesale_rules[1].end_sum">-{{item.wholesale_rules[1].end_sum}}</span>件</td>
                                    <td v-if="item.wholesale_rules[2].sell_money"><span v-if="!item.wholesale_rules[2].end_sum">≥</span>{{item.wholesale_rules[2].start_sum}}<span v-if="item.wholesale_rules[2].end_sum">-{{item.wholesale_rules[2].end_sum}}</span>件</td>
                                </tr>
                            </table>
                        </div>
                        
                    </div>
                    
                </el-col>    
            </el-row>

            <div  class="increase-retail">      <!-- 增加零售 -->
                <el-dialog title="商品颜色(零售)" :visible.sync="increaseRetail" :before-close='close1' :close-on-click-modal='false'>
                    <div class="addimg">
                        <!-- <el-upload
                        class="avatar-uploader"
                        action="https://easy-mock.com/mock/5af24ea78b04ba36ed89b500/mb/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                            <img v-if="retail.imageUrl" :src="retail.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <div class="el-icon-box"  @click="setHeadImg(2)">
                            +添加图片
                            <img width="100%" height="100%" :src="retail.imageUrl" alt="">
                        </div>
                    </div>
                    <div class="Attributes">
                        <span>类型：</span>
                        <input type="text" v-model="retail.sku_name" placeholder="最多12个字" maxlength="12">
                    </div>
                    <div class="Attributes">
                        <span>库存：</span>
                        <input type="number" v-model="retail.product_inventory" placeholder="请输入库存">
                    </div>
                    <div class="Attributes">
                        <span>价格：</span>
                        <input type="number" v-model="retail.product_price" placeholder="请输入价格">
                    </div>
                    <div class="save">
                        <button class="fr" @click="addretail">确定</button>
                        <button class="fr" @click="close1">取消</button>
                    </div>
                </el-dialog>
            </div>

            <div  class="Increase-wholesale">      <!-- 增加批发 -->
                <el-dialog title="商品颜色(批发)" :visible.sync="IncreaseWholesale"  :before-close='close1' :close-on-click-modal='false'>
                    <div class="addimg">
                        <!-- <el-upload
                        class="avatar-uploader"
                        action="https://easy-mock.com/mock/5af24ea78b04ba36ed89b500/mb/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccesss"
                        :before-upload="beforeAvatarUpload">
                            <img v-if="wholesale.imageUrl" :src="wholesale.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <div class="el-icon-box"  @click="setHeadImg(3)">
                            +添加图片
                            <img width="100%" height="100%" :src="wholesale.imageUrl" alt="">
                        </div>
                    </div>
                    <div class="Attributes">
                        <span>类型：</span>
                        <input type="text" v-model="wholesale.sku_name" placeholder="最多12个字" maxlength="12">
                    </div>
                    <div class="Attributes">
                        <span>库存：</span>
                        <input type="number" v-model="wholesale.product_inventory" placeholder="请输入库存">
                    </div>
                    <div class="wholesale-interval">
                        <input class="inputs" type="number"  @input="wholesaleNum(1)" v-model="wholesale.wholesale_rules[0].start_sum">
                        <div class="line"></div>
                        <input class="inputs" type="number"  @input="wholesaleNum(2)" v-model="wholesale.wholesale_rules[0].end_sum">
                        <div class="price">
                            ￥
                            <input type="number"  @input="wholesaleNum(3)"  v-model="wholesale.wholesale_rules[0].sell_money">
                        </div>
                    </div>
                    <div class="wholesale-interval">
                        <input class="inputs" type="number" disabled @input="wholesaleNum(4)" v-model="wholesale.wholesale_rules[1].start_sum">
                        <div class="line"></div>
                        <input class="inputs" type="number" @input="wholesaleNum(5)"  v-model="wholesale.wholesale_rules[1].end_sum">
                        <div class="price">
                            ￥
                            <input type="number" @input="wholesaleNum(6)"  v-model="wholesale.wholesale_rules[1].sell_money">
                        </div>
                    </div>
                    <div class="wholesale-interval">
                        <input class="inputs" type="number"  disabled @input="wholesaleNum(7)"  v-model="wholesale.wholesale_rules[2].start_sum">
                        <div class="line"></div>
                        <input class="inputs" type="number"  @input="wholesaleNum(8)"  v-model="wholesale.wholesale_rules[2].end_sum">
                        <div class="price">
                            ￥
                            <input type="number"  @input="wholesaleNum(9)"  v-model="wholesale.wholesale_rules[2].sell_money">
                        </div>
                    </div>
                    <div class="save">
                        <button class="fr" @click="Wholesale">确定</button>
                        <button class="fr" @click="close1">取消</button>
                    </div>
                </el-dialog>
            </div>

            <el-row>
                <el-col :span="12" :offset="1" class="product-description">
                    <div class="box">
                        <span class="proprice">商品描述：</span>
                        <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="textarea">
                        </el-input>
                    </div>
                </el-col>
            </el-row>

             <el-row>
                <el-col :span="19" :offset="1" class="product-picture">
                    <div class="img">
                        商品描述图片：
                        <div class="imgLIst" v-for="(value,index) in detailspriceList" :key="index">
                            <img :src="value" alt="" width="100%"  height="100%">
                            <i class="red" @click="handleRemove2(index)">×</i>
                        </div>
                        <el-upload
                        v-if="detailspriceList.length<5"
                        action="https://easy-mock.com/mock/5af24ea78b04ba36ed89b500/mb/upload"
                        list-type="picture-card"
                        :show-file-list='false'
                        :on-remove="handleRemove2"
                        :multiple='true'
                        :limit=5
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleSuccess2">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- <div v-if="detailspriceList.length<5" class="el-icon-box"  @click="setHeadImg(4)">
                            +添加图片
                        </div> -->
                    </div>
                    <p class="txt font14">建议尺寸：800*800像素，最多5张</p>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="13" :offset="3" class="buttons" v-if="$route.query.type!=2">
                    <el-button class="firstButton" type="primary" @click="publishProduct">发布商品</el-button>
                    <el-button class="twoButton" @click="intoWarehouse">放入仓库</el-button>
                </el-col>
                <el-col :span="13" :offset="3" class="buttons" v-else>
                    <el-button class="firstButton" type="primary" @click="saveGoods">保存商品</el-button>
                </el-col>
            </el-row>
            <cropper ref="cropper" @cropper-callback="cropperCallback"></cropper>
        </el-main>
    </el-container>
</template>

<script>
import {
  attributeInformation,
  addAttributes,
  deleteAttribute,
  productCategoryList,
  detail,
  freightTemplateList,
  imgUploads,
  Confirmthereleaseofgoods,
  editProduct
} from "@/api/goods/goods";
import cropper from "@/components/cropper/index.vue";
export default {
  data() {
    return {
      data: [],
      input: [
        //商品属性
        {
          id: 0,
          name: "商品名称",
          value: "",
          caveat: "商品名称必须填写",
          show: false,
          placeholder: "请输入商品名称"
        },
        {
          id: 1,
          name: "商品编码",
          value: "",
          caveat: "请填写商品编码",
          show: false,
          placeholder: "请输入商品编码"
        },
        {
          id: 2,
          name: "商品分类",
          value: "",
          caveat: "请填写商品分类",
          show: false,
          placeholder: "请输入商品分类"
        }
      ],
      attribute: [
        //商品可增加的属性
      ],
      selectAccessoriesClassification: [], //选择配件分类列表
      getfreightTemplateList: [], //运费模板列表
      product: [
        //产品规格
      ],
      retail: {
        //需要增加的零售商品
        imageUrl: "", //零售属性图
        sell_type: 1,
        type: "retail"
      },
      wholesale: {
        //需要增加的批发商品
        imageUrl: "",
        sell_type: 2,
        type: "wholesale",
        wholesale_rules: [{}, {}, {}]
      },
      textarea: "", //商品描述
      trialModelsModal: "", //适用车型
      dialogImageUrl: "",
      dialogVisible: false,
      dialogTableVisible: false, //商品分类弹框
      freighttemplatemodal: false, //运费模板弹窗
      newAttribute: false, //新增属性弹框
      increaseRetail: false, //增加零售弹框
      IncreaseWholesale: false, //增加批发弹框
      classNum: -1, //配件分类索引标识
      attributeNum: -1, //属性分类索引标识
      freightNum: -1, //运费模板标识
      AddAttr: "", //增加的属性
      attributeAdd: "", //增加自定义属性
      inputIndex: "", //属性索引
      priceList: [], //商品图片集
      prohide: false, //显隐商品字体
      detailspriceList: [], //商品详情图片集,
      weight: "", //重量
      editIndex: -1, //编辑索引
      paramsletparams: "", //扩展属性,
      carShow: true, //车型页面显示 3
      isCreatedNew: false, //是否新增分类
      productDelete: [], //删除的商品
      priceNum: 0 //判断图片归属
    };
  },
  components: {
    cropper
  },
  created() {
    if (this.$route.query.type == 1 || this.$route.query.type == 2) {
      this.getData();
    } else {
      this.datarecovery();
    }
  },
  methods: {
    getData() {
      let data = {
        productId: this.$route.query.id
      };
      detail(data).then(item => {
        let params = item.data.data;
        this.paramsletparams = params.extended_properties;
        this.paramsletparams.filter(res => {
          if (res.id == "trialModels") {
            if (localStorage.carList) {
              let listCar = JSON.parse(localStorage.carList);
              this.trialModelsModal = listCar;
              res.value = listCar[0].content;
            } else {
              this.trialModelsModal = res.value;
              if (res.value[0].content) {
                res.value = res.value[0].content;
              } else {
                res.value = res.value[0].content;
              }
            }
          }
          if (res.id == "weight") {
            this.weight = res.value;
          }
          if (res.id == "freightCostTemplate") {
            res.freightid = res.value;
            freightTemplateList().then(value => {
              value.data.data.filter(o => {
                if (o.id == res.value) {
                  res.value = o.name;
                }
              });
            });
          }
          res.deleteIcom = true;
        });
        this.input[0].value = params.product_name;
        this.input[1].value = params.product_sku_num;
        this.input[2].value = params.classify_name;
        this.input = this.input.concat(this.paramsletparams);
        this.product = params.sku;
        this.textarea = params.product_details;
        this.inputId = params.classify_id;
        this.priceList = params.productPictures;
        this.detailspriceList = params.productDescribePictures;

        this.datarecovery();
      });
    },
    datarecovery() {
      //数据重获得
      if (localStorage.data) {
        let data = JSON.parse(localStorage.data);
        this.input = data.input;
        this.product = data.product;
        this.priceList = data.priceList;
        this.textarea = data.textarea;
        this.detailspriceList = data.detailspriceList;
        this.inputId = data.inputId;
        this.isCreatedNew = data.isCreatedNew;
        localStorage.removeItem("data");
        if (localStorage.carList) {
          let listCar = JSON.parse(localStorage.carList);
          this.trialModelsModal = listCar;
          this.input.filter(res => {
            if (res.id == "trialModels") {
              res.value = listCar[0].content;
            }
          });
          localStorage.removeItem("carList");
        }
      }
    },
    setHeadImg(n) {
      this.priceNum = n;
      this.$refs.cropper.setshowCropper();
    },
    cropperCallback(data) {
      let that = this;
      if (data.result == 1) {
        switch (this.priceNum) {
          case 1:
            that.priceList.push(data.data.fullpathOriginImg);
            break;
          case 2:
            that.retail.imageUrl = data.data.fullpathOriginImg;
            break;
          case 3:
            that.wholesale.imageUrl = data.data.fullpathOriginImg;
            break;
          case 4:
            that.detailspriceList.push(data.data.fullpathOriginImg);
            break;
        }
      } else {
        that.$message.error(data.msg);
      }
    },
    handleRemove1(index) {
      //删除图片钩子
      this.$confirm("此操作将移除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.priceList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleRemove2(index) {
      //删除图片钩子
      this.$confirm("此操作将移除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.detailspriceList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    beforeAvatarUpload(file) {
      //判断图片类型
      if (!/^image\/(jpeg|png|jpg)$/.test(file.type)) {
        this.$confirm("上传图片暂时只支持JPG,JPEG,PNG格式", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          callback: action => {
            this.$refs.form.resetFields();
            this.$emit("1EditUpload");
          }
        });
      }
      const isLt1000 = file.size / 1024 < 1000;
      if (!isLt1000) {
        this.$confirm("上传的图片过大，不能大于1MB", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          callback: action => {
            this.$refs.form.resetFields();
            this.$emit("1EditUpload");
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.retail.imageUrl = URL.createObjectURL(file.raw);

      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        let imageUrl = reader.result;
        imgUploads(2, imageUrl).then(res => {
          if (res.data.result == 1) {
            this.retail.AimageUrl =
              "https://image.ymaibang.com/" + res.data.data.originImg;
          }
        });
      };
    },
    handleAvatarSuccesss(res, file) {
      this.wholesale.imageUrl = URL.createObjectURL(file.raw);

      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        let imageUrl = reader.result;
        imgUploads(2, imageUrl).then(res => {
          if (res.data.result == 1) {
            this.wholesale.AimageUrl =
              "https://image.ymaibang.com/" + res.data.data.originImg;
          }
        });
      };
    },
    handleSuccess(res, fileList) {
      let reader = new FileReader();
      reader.readAsDataURL(fileList.raw);
      reader.onload = () => {
        let imageUrl = reader.result;
        imgUploads(2, imageUrl).then(res => {
          if (res.data.result == 1) {
            this.priceList.push(
              "https://image.ymaibang.com/" + res.data.data.originImg
            );
          }
        });
      };
      this.prohide = false;
    },
    handleSuccess2(res, fileList) {
      let reader = new FileReader();
      reader.readAsDataURL(fileList.raw);
      reader.onload = () => {
        let imageUrl = reader.result;
        imgUploads(2, imageUrl).then(res => {
          if (res.data.result == 1) {
            this.detailspriceList.push(
              "https://image.ymaibang.com/" + res.data.data.originImg
            );
          }
        });
      };
    },
    blueChange(value, index, id) {
      //属性框未填内容提示
      if (value == "" && index < 3) {
        this.input[index].show = true;
      } else {
        this.input[index].show = false;
      }
      if (id == "weight") {
        this.weight = value;
      }
    },
    deleteattributes(index, id) {
      //移除属性
      let yon = true;
      if (id == "weight") {
        this.input.filter(res => {
          if (res.id == "freightCostTemplate") {
            yon = false;
          }
        });
      }
      if (yon) {
        this.$confirm("确定移除此属性？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.input.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.error("拥有运费模板属性的商品，必须需要商品重量属性");
      }
    },
    focusChange(id, index, name) {
      //属性框模态框的弹出
      this.inputIndex = index;
      if (name == "运费模板") {
        this.freighttemplatemodal = true;
        freightTemplateList().then(res => {
          this.getfreightTemplateList = res.data.data;
        });
      }
      if (id == "trialModels") {
        let dataList = {
          input: this.input,
          product: this.product,
          priceList: this.priceList,
          textarea: this.textarea,
          detailspriceList: this.detailspriceList,
          inputId: this.inputId,
          isCreatedNew: this.isCreatedNew
        };
        localStorage.data = JSON.stringify(dataList);
        if (this.trialModelsModal) {
          localStorage.trialModelsModal = JSON.stringify(this.trialModelsModal);
        }

        this.$router.push({ path: "applicableModels" });
      }
    },
    Categoriesa(id, index, name) {
      //商品分类弹框
      if (id == 2) {
        this.dialogTableVisible = true;
        productCategoryList().then(res => {
          if (res.data.code == 200) {
            this.selectAccessoriesClassification = res.data.data.classify;
          }
        });
      } else if (name == "运费模板") {
        this.freighttemplatemodal = true;
        freightTemplateList().then(res => {
          this.getfreightTemplateList = res.data.data;
        });
      }
    },
    keyCategories(id, index, name) {
      //判断分类是否新增
      if (id == 2) {
        this.isCreatedNew = true;
      }
    },
    classChange(index) {
      //商品分类状态改变
      this.classNum = index;
      this.input[2].value = this.selectAccessoriesClassification[
        index
      ].classify_name;
      this.inputId = this.selectAccessoriesClassification[index].id;
      this.input[2].show = false;
      this.isCreatedNew = false;
    },
    freightChange(index) {
      //运费模板的选择
      this.freightNum = index;
      this.input[this.inputIndex].value = this.getfreightTemplateList[
        index
      ].name;
      this.input[this.inputIndex].freightid = this.getfreightTemplateList[
        index
      ].id;
    },
    addAttribute() {
      //新增属性
      this.newAttribute = true;
      attributeInformation().then(res => {
        this.attribute = res.data.data.filter(o => {
          return (o.deleteIcom = true);
        });
      });
    },
    attributeChange(index) {
      //商品属性状态改变
      this.attributeNum = index;
      this.AddAttr = this.attribute[index];
    },
    addattributes() {
      //增加商品属性到填内容项
      if (!this.AddAttr == "") {
        let num = 0;
        this.input.filter(res => {
          if (res.id == this.AddAttr.id) {
            num = 1;
          }
        });
        if (num == 0) {
          this.input.push(this.AddAttr);
          if (this.AddAttr.id == "freightCostTemplate") {
            let num = true;
            this.input.filter(res => {
              if (res.id == "weight") {
                num = false;
              }
            });
            if (num) {
              this.input.push({
                deleteIcom: true,
                id: "weight",
                isBuildIn: true,
                name: "商品重量"
              });
            }
          }
        } else {
          this.$message.error("此属性已增加");
        }
      }
      this.newAttribute = false;
    },
    customAttributes() {
      //增加自定义属性
      let num = 0;
      this.attribute.filter(res => {
        if (res.name === this.attributeAdd) {
          num = 1;
        }
      });

      if (num == 1) {
        this.$message.error("此属性已拥有");
      } else if (this.attributeAdd == "") {
        this.$message.error("请输入需要增加的属性");
      } else {
        let data = {
          name: this.attributeAdd
        };
        addAttributes(data).then(res => {
          if (res.data.code == 200) {
            attributeInformation().then(res => {
              this.attribute = res.data.data.filter(o => {
                return (o.deleteIcom = true);
              });
            });
            this.attributeAdd = "";
          }
        });
      }
    },
    attributeDelete(name) {
      //删除自定义属性
      let data = {
        name: name
      };
      deleteAttribute(data).then(res => {
        if (res.data.code == 200) {
          attributeInformation().then(res => {
            this.attribute = res.data.data.filter(o => {
              return (o.deleteIcom = true);
            });
          });
        }
      });
    },

    addProduct(n) {
      //增加零售框的弹出
      if (n == 1) {
        this.increaseRetail = true;
        this.editIndex = -1;
        this.retail = { sell_type: 1, imageUrl: "", type: "retail" };
        window.onbeforeunload = this.onbeforeunload_handler;
      } else if (n == 2) {
        this.IncreaseWholesale = true;
        this.editIndex = -1;
        this.wholesale = {
          imageUrl: "",
          sell_type: 2,
          wholesale_rules: [{}, {}, {}],
          type: "wholesale"
        };
        window.onbeforeunload = this.onbeforeunload_handler;
      }
    },
    addretail() {
      //确定增加零售产品
      if (!this.retail.sku_name) {
        this.$message.error("商品类型不能为空");
      } else if (!this.retail.product_inventory) {
        this.$message.error("商品库存不能为空");
      } else if (!this.retail.product_price) {
        this.$message.error("商品价格不能为空");
      } else if (this.retail.product_inventory < 0) {
        this.$message.error("请输入有效的库存");
      } else if (this.retail.product_price < 0) {
        this.$message.error("请输入有效的价格");
      } else {
        if (this.editIndex == -1) {
          this.product.push(this.retail);
        } else {
          this.product[this.editIndex] = this.retail;
        }
        this.increaseRetail = false;
        this.imageUrl = "";
        window.onbeforeunload = null;
      }
    },
    wholesaleNum(n) {
      //批发数量与价钱的拦截
      if (n == 1) {
        if (
          isNaN(this.wholesale.wholesale_rules[0].start_sum) ||
          this.wholesale.wholesale_rules[0].start_sum < 0
        ) {
          this.wholesale.wholesale_rules[0].start_sum = 0;
          return;
        }
      } else if (n == 2) {
        if (
          isNaN(this.wholesale.wholesale_rules[0].end_sum) ||
          this.wholesale.wholesale_rules[0].end_sum < 0
        ) {
          this.wholesale.wholesale_rules[0].end_sum =
            parseInt(this.wholesale.wholesale_rules[0].start_sum) + 1;
          return;
        }
        this.wholesale.wholesale_rules[1].start_sum =
          parseInt(this.wholesale.wholesale_rules[0].end_sum) + 1;
      } else if (n == 5) {
        if (
          isNaN(this.wholesale.wholesale_rules[1].end_sum) ||
          this.wholesale.wholesale_rules[1].end_sum < 0
        ) {
          this.wholesale.wholesale_rules[1].end_sum =
            parseInt(this.wholesale.wholesale_rules[1].start_sum) + 1;
          return;
        }
        if (isNaN(parseInt(this.wholesale.wholesale_rules[1].end_sum) + 1)) {
          this.wholesale.wholesale_rules[2].start_sum = "";
        } else {
          this.wholesale.wholesale_rules[2].start_sum =
            parseInt(this.wholesale.wholesale_rules[1].end_sum) + 1;
        }
      } else if (n == 3) {
        if (
          isNaN(this.wholesale.wholesale_rules[0].sell_money) ||
          this.wholesale.wholesale_rules[0].sell_money < 0
        ) {
          this.wholesale.wholesale_rules[0].sell_money = 0;
          return;
        }
      } else if (n == 6) {
        if (
          isNaN(this.wholesale.wholesale_rules[1].sell_money) ||
          this.wholesale.wholesale_rules[1].sell_money < 0
        ) {
          this.wholesale.wholesale_rules[1].sell_money = 0;
          return;
        }
      } else if (n == 9) {
        if (
          isNaN(this.wholesale.wholesale_rules[2].sell_money) ||
          this.wholesale.wholesale_rules[2].sell_money < 0
        ) {
          this.wholesale.wholesale_rules[2].sell_money = 0;
          return;
        }
      }
    },
    Wholesale() {
      //确定增加批发产品
      console.log(
        this.wholesale.wholesale_rules[2].start_sum,
        this.wholesale.wholesale_rules[2].sell_money
      );
      if (!this.wholesale.product_inventory) {
        this.$message.error("商品库存不能为空");
      } else if (this.wholesale.product_inventory < 0) {
        this.$message.error("请输入有效的库存");
      } else if (
        this.wholesale.wholesale_rules[2].start_sum &&
        !this.wholesale.wholesale_rules[2].sell_money
      ) {
        this.$message.error("商品属性价格不能为空");
      } else {
        if (this.editIndex == -1) {
          this.product.push(this.wholesale);
        } else {
          this.product[this.editIndex] = this.wholesale;
        }
        this.IncreaseWholesale = false;
        window.onbeforeunload = null;
      }
    },
    edit(index) {
      //编辑商品
      this.editIndex = index;
      let data = this.product[index];
      if (data.sell_type == 1 || data.type == "retail") {
        this.retail = { sell_type: 1, imageUrl: "", type: "retail" };
        this.increaseRetail = true;
        if (data.sku_img) {
          this.retail.imageUrl = data.sku_img;
        } else if (data.imageUrl) {
          this.retail.imageUrl = data.imageUrl;
        }
        this.retail.id = data.id;
        this.retail.sku_name = data.sku_name;
        this.retail.product_inventory = data.product_inventory;
        this.retail.product_price = data.product_price;
        window.onbeforeunload = this.onbeforeunload_handler;
      } else if (data.sell_type == 2 || data.type == "wholesale") {
        this.wholesale = {
          imageUrl: "",
          sell_type: 2,
          wholesale_rules: [{}, {}, {}],
          type: "wholesale"
        };
        this.IncreaseWholesale = true;
        this.wholesale.imageUrl = data.sku_img;
        this.wholesale.sku_name = data.sku_name;
        this.wholesale.id = data.id;
        this.wholesale.product_inventory = data.product_inventory;
        this.wholesale.wholesale_rules[0].start_sum =
          data.wholesale_rules[0].start_sum;
        this.wholesale.wholesale_rules[0].end_sum =
          data.wholesale_rules[0].end_sum;
        this.wholesale.wholesale_rules[0].sell_money =
          data.wholesale_rules[0].sell_money;
        this.wholesale.wholesale_rules[1].start_sum =
          data.wholesale_rules[1].start_sum;
        this.wholesale.wholesale_rules[1].end_sum =
          data.wholesale_rules[1].end_sum;
        this.wholesale.wholesale_rules[1].sell_money =
          data.wholesale_rules[1].sell_money;
        this.wholesale.wholesale_rules[2].start_sum =
          data.wholesale_rules[2].start_sum;
        this.wholesale.wholesale_rules[2].end_sum =
          data.wholesale_rules[2].end_sum;
        this.wholesale.wholesale_rules[2].sell_money =
          data.wholesale_rules[2].sell_money;
        window.onbeforeunload = this.onbeforeunload_handler;
      }
    },
    deleteSp(index) {
      //删除商品2
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.productDelete.push({
            id: this.product[index].id,
            isDelete: true
          });
          this.product.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    publishProduct() {
      //发布商品
      if (this.input[0].value == "") {
        this.$message(this.input[0].caveat);
      } else if (this.input[1].value == "") {
        this.$message(this.input[1].caveat);
      } else if (this.input[2].value == "") {
        this.$message(this.input[2].caveat);
      } else if (this.priceList.length < 1) {
        this.$message("最少需要一张商品图片");
        this.prohide = true;
      } else if (this.product.length == 0) {
        this.$message("请添加产品的颜色&尺寸&规格");
      } else {
        let product = this.product;
        product.forEach(function(item) {
          item.name = item.sku_name;
          item.stock = item.product_inventory;
          if (item.AimageUrl) {
            item.picture = item.AimageUrl;
          } else if (item.sku_img) {
            item.picture = item.sku_img;
          } else if (item.imageUrl) {
            item.picture = item.imageUrl;
          }
          if (item.sell_type == 1) {
            item.type = "retail";
          } else if (item.sell_type == 2) {
            item.type = "wholesale";
          }
          item.price = item.product_price;
          if (item.wholesale_rules) {
            item.wholesales = item.wholesale_rules;
            delete item.wholesale_rules;

            let who = item.wholesales;
            let num = 0;
            who.forEach((res, index) => {
              res.start = res.start_sum;
              delete res.start_sum;
              res.end = res.end_sum;
              delete res.end_sum;
              res.price = res.sell_money;
              delete res.sell_money;
              if (!res.price) {
                who.splice(index);
              }
            });
            item.wholesales = who;
          }
        });
        this.input.filter(res => {
          if (res.id == "trialModels") {
            res.value = this.trialModelsModal;
          }
          if (res.id == "freightCostTemplate") {
            res.value = res.freightid;
          }
        });
        let data = {
          name: this.input[0].value,
          number: this.input[1].value,
          weight: this.weight,
          classify: {
            isCreatedNew: this.isCreatedNew, // 是否为新增分类
            name: this.input[2].value,
            id: this.inputId //已有分类id
          },
          extendedProperties: this.input.slice(3),
          productPictures: this.priceList, //商品图片
          productDescriptionPictures: this.detailspriceList, //商品描述图片
          description: this.textarea,
          productSkus: product,
          putawayStatus: 2
        };
        data = JSON.stringify(data);
        let params = {
          params: data
        };
        Confirmthereleaseofgoods(params).then(res => {
          if (res.data.code == 200) {
            this.$message.success("创建商品成功");
            this.$router.push({ path: "admin" });
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },
    saveGoods() {
      //保存商品
      console.log(this.trialModelsModal);
      if (this.input[0].value == "") {
        this.$message(this.input[0].caveat);
      } else if (this.input[1].value == "") {
        this.$message(this.input[1].caveat);
      } else if (this.input[2].value == "") {
        this.$message(this.input[2].caveat);
      } else if (this.priceList == 0) {
        this.$message("最少需要一张商品图片");
        this.prohide = true;
      } else if (this.product.length == 0) {
        this.$message("请添加产品的颜色&尺寸&规格");
      } else {
        let product = this.product;
        product.forEach(function(item) {
          item.name = item.sku_name;
          item.stock = item.product_inventory;
          if (item.AimageUrl) {
            item.picture = item.AimageUrl;
          } else if (item.sku_img) {
            item.picture = item.sku_img;
          } else if (item.imageUrl) {
            item.picture = item.imageUrl;
          }
          if (item.sell_type == 1) {
            item.type = "retail";
          } else if (item.sell_type == 2) {
            item.type = "wholesale";
          }
          item.price = item.product_price;
          if (item.wholesale_rules) {
            item.wholesales = item.wholesale_rules;
            delete item.wholesale_rules;

            let who = item.wholesales;
            who.forEach(res => {
              res.start = res.start_sum;
              delete res.start_sum;
              res.end = res.end_sum;
              delete res.end_sum;
              res.price = res.sell_money;
              delete res.sell_money;
              if (!res.price) {
                who.splice(index);
              }
            });
            item.wholesales = who;
          }
        });
        this.input.filter(res => {
          if (res.id == "trialModels") {
            res.value = this.trialModelsModal;
          }
          if (res.id == "freightCostTemplate") {
            res.value = res.freightid;
          }
        });
        let data = {
          productId: this.$route.query.id,
          name: this.input[0].value,
          number: this.input[1].value,
          weight: this.weight,
          classify: {
            isCreatedNew: this.isCreatedNew, // 是否为新增分类
            name: this.input[2].value,
            id: this.inputId //已有分类id
          },
          extendedProperties: this.input.slice(3),
          productPictures: this.priceList, //商品图片
          productDescriptionPictures: this.detailspriceList, //商品描述图片
          description: this.textarea,
          productSkus: product.concat(this.productDelete)
        };

        let params = {
          params: JSON.stringify(data)
        };
        editProduct(params).then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.$router.push({ path: "admin" });
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },
    intoWarehouse() {
      //放入仓库
      if (this.input[0].value == "") {
        this.$message(this.input[0].caveat);
      } else if (this.input[1].value == "") {
        this.$message(this.input[1].caveat);
      } else if (this.input[2].value == "") {
        this.$message(this.input[2].caveat);
      } else if (this.priceList.length < 1) {
        this.$message("最少需要一张商品图片");
        this.prohide = true;
      } else if (this.product.length == 0) {
        this.$message("请添加产品的颜色&尺寸&规格");
      } else {
        let product = this.product;
        product.forEach(function(item) {
          item.name = item.sku_name;
          item.stock = item.product_inventory;
          if (item.AimageUrl) {
            item.picture = item.AimageUrl;
          } else if (item.sku_img) {
            item.picture = item.sku_img;
          } else if (item.imageUrl) {
            item.picture = item.imageUrl;
          }
          if (item.sell_type == 1) {
            item.type = "retail";
          } else if (item.sell_type == 2) {
            item.type = "wholesale";
          }
          item.price = item.product_price;
          if (item.wholesale_rules) {
            item.wholesales = item.wholesale_rules;
            delete item.wholesale_rules;

            let who = item.wholesales;
            who.forEach(res => {
              res.start = res.start_sum;
              delete res.start_sum;
              res.end = res.end_sum;
              delete res.end_sum;
              res.price = res.sell_money;
              delete res.sell_money;
              if (!res.price) {
                who.splice(index);
              }
            });
            item.wholesales = who;
          }
        });
        this.input.filter(res => {
          if (res.id == "trialModels") {
            res.value = this.trialModelsModal;
          }
          if (res.id == "freightCostTemplate") {
            res.value = res.freightid;
          }
        });
        let data = {
          name: this.input[0].value,
          number: this.input[1].value,
          weight: this.weight,
          classify: {
            isCreatedNew: this.isCreatedNew, // 是否为新增分类
            name: this.input[2].value,
            id: this.inputId //已有分类id
          },
          extendedProperties: this.input.slice(3),
          productPictures: this.priceList, //商品图片
          productDescriptionPictures: this.detailspriceList, //商品描述图片
          description: this.textarea,
          productSkus: product,
          putawayStatus: 0
        };
        data = JSON.stringify(data);
        let params = {
          params: data
        };
        Confirmthereleaseofgoods(params).then(res => {
          if (res.data.code == 200) {
            this.$message.success("创建商品成功");
            this.$router.push({ path: "admin" });
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },
    productpreview() {
      let dataList = {
        input: this.input,
        product: this.product,
        priceList: this.priceList,
        textarea: this.textarea,
        detailspriceList: this.detailspriceList,
        inputId: this.inputId
      };
      localStorage.data = JSON.stringify(dataList);
      this.$router.push({ path: "publishProduct/productpreview" });
    },
    close1() {
      this.$confirm("是否关闭编辑框", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          (this.increaseRetail = false), (this.IncreaseWholesale = false);
          window.onbeforeunload = null;
        })
        .catch(() => {});
    },
    onbeforeunload_handler() {
      event.returnValue = "确定离开当前页面吗？";
      var warning = "确认退出?";
      return warning;
    }
  }
  // watch:{
  //     $route(to,from){
  //         if(to.name=='car'){
  //             this.carShow=false
  //             console.log(to,from)
  //         }
  //     }
  // }
};

// window.onbeforeunload = onbeforeunload_handler;
// window.onunload = onunload_handler;
// function
// function onunload_handler(){
//     var warning="谢谢光临";
//     alert(warning);
// }
</script>
<style scoped>
.publishProduct .el-header {
  margin-left: 1px;
}
.publishProduct .el-header .el-breadcrumb {
  line-height: 60px;
}
.publishProduct .arrow {
  width: 668px;
  height: 40px;
  background-color: #1491f2;
  line-height: 40px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.arrow .jian {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-left: 22px solid #1491f2;
  border-bottom: 20px solid transparent;
  position: absolute;
  top: 0;
  right: -21px;
}
.el-main {
  margin-top: 10px;
  margin-left: 10px;
}
.input {
  margin-top: 20px;
}
.input .box {
  margin-top: 15px;
  position: relative;
}
.input .box .inputpadd {
  padding-left: 10px;
  padding-right: 20px;
}
.input .box .soan {
  display: inline-block;
  min-width: 70px;
}
.input .box .right {
  position: absolute;
  margin-left: -21px;
  margin-top: 6px;
}
.input .box .outer {
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
}
.input input {
  width: 317px;
  height: 30px;
  padding-left: 1px;
  padding-right: 15px;
}
.input p {
  margin-left: 80px;
  margin-top: 8px;
  font-size: 12px;
  color: red;
}
.input .el-button {
  margin-top: 30px;
  margin-left: 250px;
}
.input .el-icon-plus {
  margin-right: 10px;
}
.product-picture {
  margin-top: 30px;
}
.product-picture .img {
  display: flex;
}
.el-icon-box {
  width: 90px;
  height: 90px;
  border: 1px dashed #ccc;
  color: #1491f2;
  text-align: center;
  line-height: 90px;
  cursor: pointer;
  position: relative;
}
.el-icon-box img {
  position: absolute;
  top: 0;
  left: 0;
}
.product-picture .img .imgLIst {
  width: 90px;
  height: 90px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
}
.product-picture .img .imgLIst .red {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  top: -15px;
  right: -5px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
}
.product-picture .img .imgLIst img {
  border-radius: 5px;
}
.product-picture .addImg {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  line-height: 100px;
  text-align: center;
  color: #1491f2;
  position: relative;
  margin-right: 10px;
}
.product-picture input {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0;
  background-color: red;
  top: 0;
  left: 0;
}
.product-picture .txt {
  margin-top: 20px;
  margin-left: 70px;
  color: #999999;
}
.product-attributes {
  margin-top: 30px;
}
.product-attributes .blue {
  color: #1491f2;
  margin: 0 3px;
}
.product-picture .red {
  margin-left: 70px;
  margin-top: 10px;
  color: red;
}
.line {
  width: 100%;
  height: 111px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
.line .name .txt {
  display: inline-block;
  width: 200px;
  margin-right: 100px;
}
.retail .price .red {
  color: red;
}
.retail .instock {
  margin-top: 10px;
}
.wholesale tr:first-child td:not(:first-child) {
  color: red;
}
.wholesale td:not(:first-child) {
  width: 120px;
  text-align: center;
}
.product-description {
  margin-top: 30px;
}
.product-description .box {
  display: flex;
}
.product-description .box span {
  width: 100px;
}
.product-description p {
  margin-left: 90px;
  margin-top: 20px;
  color: #ccc;
  font-size: 14px;
}
.buttons {
  margin-top: 50px;
  margin-bottom: 100px;
}
.firstButton {
  width: 200px;
  margin-right: 50px;
}
.twoButton {
  color: #1491f2;
}
.choose-category p {
  margin-bottom: 15px;
}
.choose-category .overauto {
  width: 375px;
  height: 290px;
  overflow: auto;
}
.choose-category .overauto .className:first-child {
  border-top: 1px solid #ccc;
}
.choose-category .overauto .className {
  width: 350px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.choose-category .overauto .className .icon {
  position: absolute;
  right: 5px;
}
.choose-category .overauto .classChange {
  background-color: #f8f8f8;
  color: #36b32c;
}
.choose-category .save {
  padding-top: 10px;
  width: 100%;
  height: 50px;
}
.choose-category .save button {
  width: 90px;
  height: 30px;
  margin-left: 10px;
  line-height: 20px;
  cursor: pointer;
}
.choose-category .save button:first-child {
  background-color: #1491f2;
  color: #fff;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.choose-category .save button:last-child {
  background-color: #fff;
  color: #1491f2;
  border: 1px solid #1491f2;
  border-radius: 3px;
}

.freighttemplate p {
  margin-bottom: 15px;
}
.freighttemplate .overauto {
  width: 375px;
  height: 290px;
  overflow: auto;
}
.freighttemplate .overauto .className:first-child {
  border-top: 1px solid #ccc;
}
.freighttemplate .overauto .className {
  width: 350px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.freighttemplate .overauto .className .icon {
  position: absolute;
  right: 5px;
}
.freighttemplate .overauto .classChange {
  background-color: #f8f8f8;
  color: #36b32c;
}
.freighttemplate .save {
  padding-top: 10px;
  width: 100%;
  height: 50px;
}
.freighttemplate .save button {
  width: 90px;
  height: 30px;
  margin-left: 10px;
  line-height: 20px;
}
.freighttemplate .save button:first-child {
  background-color: #1491f2;
  color: #fff;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.freighttemplate .save button:last-child {
  background-color: #fff;
  color: #1491f2;
  border: 1px solid #1491f2;
  border-radius: 3px;
}

.new-attribute .add-attribute {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.new-attribute .add-attribute .txt {
  width: 310px;
  height: 30px;
  border: 1px solid #cccccc;
}
.new-attribute .add-attribute .fr {
  width: 50px;
  height: 30px;
  color: #1491f2;
  font-size: 20px;
  background-color: #f2f2f2;
  border: solid 1px #cccccc;
  border-left: none;
}
.new-attribute .overauto {
  width: 375px;
  height: 240px;
  overflow: auto;
  position: relative;
}
.new-attribute .overauto .system {
  position: absolute;
  right: 3px;
}
.new-attribute .overauto .delete {
  position: absolute;
  right: 3px;
  cursor: pointer;
}
.new-attribute .overauto .className:first-child {
  border-top: 1px solid #ccc;
}
.new-attribute .overauto .className {
  width: 345px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.new-attribute .overauto .className .icon {
  margin-right: 10px;
}
.new-attribute .overauto .classChange {
  background-color: #f8f8f8;
  color: #36b32c;
}
.new-attribute .save {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
.new-attribute .save button {
  width: 90px;
  height: 30px;
  margin-left: 10px;
  line-height: 20px;
}
.new-attribute .save button:first-child {
  background-color: #1491f2;
  color: #fff;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.new-attribute .save button:last-child {
  background-color: #fff;
  color: #1491f2;
  border: 1px solid #1491f2;
  border-radius: 3px;
}

.increase-retail .addimg {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  margin-bottom: 30px;
}
.increase-retail .Attributes input {
  width: 260px;
  height: 30px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-radius: 2px;
  border: 1px solid #ccc;
}
.increase-retail .save {
  width: 100%;
  height: 50px;
  margin-top: 15px;
}
.increase-retail .save button {
  width: 90px;
  height: 30px;
  margin-left: 10px;
  line-height: 20px;
}
.increase-retail .save button:first-child {
  background-color: #1491f2;
  color: #fff;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.increase-retail .save button:last-child {
  background-color: #fff;
  color: #1491f2;
  border: 1px solid #1491f2;
  border-radius: 3px;
}

.Increase-wholesale .addimg {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  margin-bottom: 30px;
}
.Increase-wholesale .Attributes input {
  width: 260px;
  height: 30px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-radius: 2px;
  border: 1px solid #ccc;
}
.Increase-wholesale .wholesale-interval {
  width: 100%;
  height: 25px;
  display: flex;
  margin-top: 10px;
}
.Increase-wholesale .wholesale-interval .line {
  width: 48px;
  height: 1px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}
.Increase-wholesale .wholesale-interval .inputs {
  width: 60px;
  height: 24px;
}
.Increase-wholesale .wholesale-interval .price {
  margin-left: 10px;
}
.Increase-wholesale .wholesale-interval .price input {
  width: 90px;
  height: 20px;
  color: red;
  border: none;
  border-bottom: 1px solid red;
}
.Increase-wholesale .save {
  width: 100%;
  height: 50px;
  margin-top: 15px;
}
.Increase-wholesale .save button {
  width: 90px;
  height: 30px;
  margin-left: 10px;
  line-height: 20px;
}
.Increase-wholesale .save button:first-child {
  background-color: #1491f2;
  color: #fff;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.Increase-wholesale .save button:last-child {
  background-color: #fff;
  color: #1491f2;
  border: 1px solid #1491f2;
  border-radius: 3px;
}
.publishProduct .el-dialog__wrapper .el-dialog .el-dialog__body {
  background-color: #fff;
}
.el-dialog__wrapper .el-dialog__footer {
  background-color: #fff;
}
</style>

<style>
.publishProduct .el-dialog__wrapper .el-dialog .el-dialog__body {
  background-color: #fff !important;
}
.publishProduct .el-dialog__wrapper .el-dialog .el-dialog__footer {
  background-color: #fff !important;
}
.publishProduct .el-upload--picture-card {
  width: 90px;
  height: 90px;
  line-height: 90px;
}
.publishProduct .el-upload--picture-card .el-icon-plus {
  height: 90px;
}
.publishProduct .el-upload-list__item {
  width: 90px;
  height: 90px;
}
.publishProduct .el-dialog__wrapper .el-dialog {
  width: 400px;
  height: 440px;
  border-radius: 5px;
}
.publishProduct .el-dialog__wrapper .el-dialog .el-dialog__body {
  padding-top: 5px;
}

.publishProduct .increase-retail .el-dialog__wrapper .el-dialog {
  width: 350px;
  height: 400px;
  border-radius: 5px;
}
.publishProduct .increase-retail .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.publishProduct .increase-retail .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.publishProduct .increase-retail .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.publishProduct .increase-retail .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.publishProduct .Increase-wholesale .el-dialog__wrapper .el-dialog {
  width: 350px;
  height: 470px;
  border-radius: 5px;
}
.publishProduct .Increase-wholesale .el-dialog__wrapper .el-dialog {
  width: 350px;
  height: 470px;
  border-radius: 5px;
}
.publishProduct .Increase-wholesale .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.publishProduct .Increase-wholesale .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.publishProduct .Increase-wholesale .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.publishProduct .Increase-wholesale .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
