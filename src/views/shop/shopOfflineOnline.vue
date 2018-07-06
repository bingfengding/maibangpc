<template>
  <!-- 线下网点 -->
  <el-container id="shopOfflineOnline">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          <span @click="toFirst"  :class="addInlineChoice?'fontBlod pointer':''">线下网点管理</span>   
        </el-breadcrumb-item>
        <el-breadcrumb-item  v-if="indexEdite">
          编辑线下网点
        </el-breadcrumb-item>
        <el-breadcrumb-item  v-else-if="addInlineChoice">
          添加线下网点
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF" v-if="!addInlineChoice">
          <el-col class="shopHeader">
            <el-row type="flex" justify="space-between">
              <el-col class="shopHeaderLeft">
                <span class="choiceInput pointer font14" :class="choice===1?'activeInput colorFFF':''" @click="allOnline">全部网点</span>
                <span class="choiceInput pointer font14" :class="choice===2?'activeInput colorFFF':''" @click="offlineOnline">线下网点</span>
                <span class="choiceInput pointer font14" :class="choice===3?'activeInput colorFFF':''" @click="buyOnline">买家自提点</span>
            </el-col>
            <el-col class="shopHeaderRight">
              <el-button plain size="small" @click="addInline">添加线下网点</el-button>
               <el-input
                placeholder="线下网点搜索"
                size="small"
                clearable
                v-model="searchText"
                >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            </el-row>
            
          </el-col>
          <el-col class="shopMain">
          <!-- 表格 -->
          <el-table
            header-row-class-name="tabelHeader"
            ref="onlineTable"
            :data="items"
            tooltip-effect="dark"
            style="width: 100%"
            class="font14"
              @selection-change="handleSelectionChange"
          >
          <!-- 复选框 -->
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <!-- 图片 -->
          <el-table-column
            label="网点照片"
            width="100"
            >
            <template slot-scope="scope">
              <div class="tableImgBox">
                <img :src="scope.row.img_ids.pic_path" alt="">
              </div>
            </template>
            </el-table-column>
            <el-table-column
              width="130"
              >
              <template slot-scope="scope">
                <span class="selfLiftingButton font12 colorFFF textCen" v-show="scope.row.outlets_type.indexOf('1')+1 &&choice!=3">
                  门店
                </span>
                <span class="storeButton font12 colorFFF textCen" v-show="scope.row.outlets_type.indexOf('2')+1 &&choice!=2">
                  自提
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="store_name"
              label="网点名称"
              min-width="180"
              >
            </el-table-column>
            <el-table-column
              label="联系电话"
              min-width="180"
              >
              <template slot-scope="scope">
                <div v-if="scope.row.area_code">{{ scope.row.area_code }}-{{scope.row.store_phone}}</div>
                <div v-else>{{scope.row.store_phone}}</div> 
              </template>
            </el-table-column>
            <el-table-column
              label="网点位置"
              min-width="280"
            >
            <template slot-scope="scope">
              <div>
                {{ scope.row.store_address_bz.provinceName }}{{ scope.row.store_address_bz.cityName }}{{ scope.row.store_address_bz.areaName }}{{ scope.row.address }}
              </div>
            </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              label="操作"
              width="60"
              >
              <template slot-scope="scope">
                <span class="blue pointer" @click="editOnline(scope.row.id)">编辑</span>
              </template>

            </el-table-column>
          </el-table>
          <el-button plain size="small" class="delectLists" @click="delectLists">删除</el-button>
          </el-col>
        </el-row>
        <el-row class="mainBody bgFFF" v-else>
          <el-form
              :model="form" 
              ref="onlineForm"
              label-width="100px"
              :rules="rules"
              label-position=right
            >
              <el-form-item label="网点名称：" 
              prop="store_name"
              >
                <el-input  
                size="small"
                placeholder="支持最多20个字符"
                v-model="form.store_name"
                maxlength="20"
                auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label=" 联系电话：" required>
                  <el-col :span="8">
                    <el-form-item prop="area_code">
                      <el-input  
                        size="small"
                        v-model="form.area_code"
                        placeholder="请输入区号" 
                        maxlength="4"
                        >
                    </el-input>
                    </el-form-item>
                  </el-col>
                 <el-col :span="16">
                   <el-form-item prop="store_phone">
                      <el-input
                        size="small"
                        maxlength="11"  
                        v-model="form.store_phone"
                        placeholder="手机,区号可留空" 
                      >
                  </el-input>
                   </el-form-item>
                 </el-col>
              </el-form-item>
              <!-- 省份选择 -->
              <el-form-item
                label="所在地区："
                prop="selectedOptions"
                class="selectCity"
                 >
                <el-cascader
                  size="small"
                  :options="cityOptions"
                  @change="changeProvince"
                  v-model="form.selectedOptions"
                  ref = "cascader"
                >
                </el-cascader>
              </el-form-item>
              <!-- 详细地址 -->
              <el-form-item label="详细地址："  prop="store_address">
                <el-input
                size="small"
                v-model="form.store_address"
                maxlength="80"
                placeholder="请输入详细地址，如街道名称，门牌号等信息" 
                auto-complete="off"
                >
                </el-input>
              </el-form-item>
              <!-- 网点照片 -->
              <el-form-item label="网点照片：" prop="store_images" class="imageItem">
                <el-upload
                  action="pc_seller/pc_seller/images/ImgUploads"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :http-request= "customUp"
                  :before-remove = beforeRemove
                  :on-remove="handleRemove"
                  :file-list="imgUploadsList"
                  :before-upload="beforeAvatarUpload"
                  :limit="5"
                  :class="lengthNum>=5?'hideImg':''"
                  v-model="form.store_images"
                >
                 <span class="blue font14">+添加图片</span>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                  <img width="100%" :src="dialogImageUrl" alt="" >
                </el-dialog>
              </el-form-item>
              <!-- 是否营业 -->
              <el-form-item    
                label="是否营业：" 
                prop="business_status"
                >
                <el-select 
                v-model="form.business_status" 
                placeholder="请选择"
                @change="changeBusiness"
                size="small"
                >
                  <el-option
                    v-for = "item in if_business"
                    :key = "item.id"
                    :label = "item.name"
                    size="small"
                    :value = "item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 营业时间 -->
              <el-form-item    
                label="营业时间：" 
                required
                >
                <el-dropdown >
                  <span class="el-dropdown-link font14 pointer">
                    查看营业时间
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item
                      v-model="businessTime"
                      v-for="(item,index) in businessTime" 
                      :key="index"
                      class="itemBase"
                      @click.native="changeItem(index)"
                     >
                      <span 
                        class="font12"
                      >
                        {{item.open_time}}-
                        {{item.close_time}}
                      </span>
                      <span class="font12"> {{item.week}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item class="buildItem font14 textCen" @click.native="buildItem">
                      添加营业时间
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                
              </el-form-item>
              <!-- 店铺介绍 -->
              <el-form-item 
                label="店铺介绍："
                prop="recommend">
                <el-input  
                  type="textarea" v-model="form.recommend"
                  maxlength="200"
                  :autosize="{minRows: 2}"
                  placeholder="简述网点的推荐商品或者活动，也可以向卖家陈述特殊服务，例如：免费WIFI和停车（最多200个字）"
                  size="mini"
                >
                </el-input>
              </el-form-item>
              <!-- 网点类型 -->
              <el-form-item 
                label="网点类型："
                prop="outlets_type">
                <el-checkbox-group v-model="form.outlets_type" 
                size="small"
               
                >

                  <el-checkbox-button 
                    v-for="item in outletsTypes" 
                    :label="item.id"  
                    :key="item.id"
                  >
                    {{item.name}}
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" class="dangerSubmit" @click="deleteOnline"  v-show="form.outletsId">删除</el-button>
                <el-button size="small" type="primary" class="successSubmit" @click="submitForm('onlineForm')">
                  保存
                </el-button>
              </el-form-item>
            </el-form>
            <el-dialog
              title="新增网点营业时间"
              :visible.sync="dialogTimeVisible"
              width="400px"
              :show-close="false"
              center
              custom-class="timeDialog"
              >
              <div class="timeDialogDiv">
                <span class="timeLabel">开门时间</span>
                  <el-time-picker
                    v-model="businesTimeValue.open_time"
                    size="small"
                    value-format="HH:mm" format="HH:mm"
                    placeholder="任意时间点">
                  </el-time-picker>
                </div>
                <div class="timeDialogDiv">
                  <span class="timeLabel">关门时间</span>
                  <el-time-picker
                    v-model="businesTimeValue.close_time"
                    size="small"
                    value-format="HH:mm" format="HH:mm"
                    placeholder="任意时间点">
                  </el-time-picker>
                </div>
                <div class="timeDialogDiv">
                  <span class="timeLabel">重复</span>
                  <el-select 
                    v-model="businesTimeValue.week" 
                    multiple   
                    placeholder="设置重复营业时间"
                    size="small"
                  >
                    <el-option
                      v-for="item in weeks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                      >
                    </el-option>
                  </el-select>
                </div>
              <div slot="footer" class="dialog-footer">
                
                <el-button type="primary" size="small" @click="saveTime">保存</el-button>
              </div>
            </el-dialog>
        </el-row>
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import { judgePermisson } from "api/shop/public";
import cityOptions from "utils/city_data2017_element.js";
import {
  outletsDetail,
  outletsList,
  saveOutlets,
  deleteOutlets
} from "api/shop/online";
import { imgUploads } from "api/shop/authentication";
export default {
  data() {
    let validateCode = (rule, value, callback) => {
      let re = /^\d{0,4}$/;
      if (!re.test(value)) {
        return callback(new Error("请输入正确的区号"));
      } else {
        callback();
      }
    };
    let validateNumber = (rule, value, callback) => {
      let re = /^\d{7,11}$/;
      if (!re.test(value)) {
        return callback(new Error("请输入正确的号码"));
      } else {
        callback();
      }
    };
    return {
      if_Jurisdiction: false, //判断是否拥有权限
      indexEdite: 0, //判断是否选择了编辑
      indexTime: 0,
      index: 0, //删除的图片对应索引
      lengthNum: 0,
      dialogTimeVisible: false, //添加时间的
      dialogVisible: false, //展示图片的
      dialogImageUrl: "", //展示图片的链接
      disabled: false, //是否隐藏添加图片的按钮
      cityOptions, //引入省市区
      addInlineChoice: false, // 切换到添加网点界面
      choice: 1, //判断选择按钮
      searchText: "", //搜索内容
      multipleSelection: [], //复选框
      imgUploadsList: [], //图片列表
      outletsTypes: [
        { id: 1, name: "线下门店" },
        { id: 2, name: "买家自提点" }
      ], //网点类型数据组合
      //是否营业的内容
      if_business: [{ id: 1, name: "营业" }, { id: 2, name: "休息" }],

      // 营业时间显示
      businessTime: [],
      //营业时间值
      businesTimeValue: {
        open_time: "09:00",
        close_time: "18:00",
        week: []
      },
      //  星期选择
      weeks: [
        {
          value: 1,
          label: "周一",
          disabled: false
        },
        {
          value: 2,
          label: "周二",
          disabled: false
        },
        {
          value: 3,
          label: "周三",
          disabled: false
        },
        {
          value: 4,
          label: "周四",
          disabled: false
        },
        {
          value: 5,
          label: "周五",
          disabled: false
        },
        {
          value: 6,
          label: "周六",
          disabled: false
        },
        {
          value: 7,
          label: "周日",
          disabled: false
        }
      ],
      //提交线下网点的表单内容
      form: {
        selectedOptions: [],
        outletsId: "", //网点id
        store_name: "", //网点名称
        store_address_bz: {
          areaId: "",
          areaName: "",
          cityId: "",
          cityName: "",
          provinceId: "",
          provinceName: ""
        },
        store_address: "", //详细地址
        store_phone: "", //电话
        store_images: [],
        outlets_type: [],
        business_status: "", //是否营业
        recommend: "", // 商家简介
        area_code: "", //区号
        business_hours: []
      },
      // table的详细数据
      items: [
        {
          id: 0,
          outlets_type: ["1"],
          store_name: "",
          store_address_bz: {
            areaId: "",
            areaName: "",
            cityId: "",
            cityName: "",
            provinceId: "",
            provinceName: ""
          },
          address: "",
          img_ids: {
            pic_path: "",
            relative_path: "",
            pic_thum: "",
            relative_path_thum: ""
          }
        }
      ],
      rules: {
        //验证规则
        store_name: [
          {
            required: true,
            message: "网点名称不能为空",
            trigger: "blur"
          }
        ],

        area_code: [{ validator: validateCode, trigger: "blur" }],
        store_images: [
          { required: true, message: "至少添加一张图片", trigger: "change" }
        ],
        store_phone: [
          { required: true, message: "号码不能为空", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" }
        ],
        selectedOptions: [
          { required: true, message: "请选择所在地区", trigger: "change" }
        ],
        store_address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        outlets_type: [
          { required: true, message: "请选择网点类型", trigger: "change" }
        ],
        business_status: [
          { required: true, message: "请选择是否营业", trigger: "change" }
        ],
        business_hours: [
          { required: true, message: "请添加营业时间", trigger: "change" }
        ],
        // recommend: [
        //   { required: true, message: "请描述您的店铺情况", trigger: "blur" }
        // ]
      }
    };
  },
  mounted() {},
  computed: {
    computeSearchText() {
      return this.searchText;
    }
  },
  watch: {
    computeSearchText() {
      if (this.choice == 1) {
        console.log(1);
        this.reset();
      } else if (this.choice == 2) {
        console.log(2);
        this.offlineOnline();
      } else if (this.choice == 3) {
        console.log(3);
        this.buyOnline();
      }
    }
  },
  created() {
    this.reset();
  },
  methods: {
    // 重置数据
    reset() {
      if (this.searchText) {
        outletsList().then(res => {
          if (res.data.code === 200) {
            let base = res.data.data;
            let arr = [];
            base.forEach((value, index) => {
              if (value.store_name.indexOf(this.searchText) + 1) {
                arr.push(value);
              }
            });
            this.items = arr;
            console.log(arr);
          } else {
            this.$message.error(res.data.error);
          }
        });
      } else {
        outletsList().then(res => {
          if (res.data.code === 200) {
            this.items = res.data.data;
          } else {
            this.$message.error(res.data.error);
          }
        });

        judgePermisson().then(res => {
          if (res.data.code == 200) {
            this.if_Jurisdiction = true;
          } else {
            this.if_Jurisdiction = false;
          }
        });
      }
    },
    // // 搜索
    // searchOnline() {
    //   if (this.choice == 1) {
    //     console.log(1);
    //     this.reset();
    //   } else if (this.choice == 2) {
    //     console.log(2);
    //     this.offlineOnline();
    //   } else if (this.choice == 3) {
    //     console.log(3);
    //     this.buyOnline();
    //   }
    // },
    // 点击获取全部网点
    allOnline() {
      this.choice = 1;
      this.reset();
    },
    // 点击获取线下网点
    offlineOnline() {
      this.choice = 2;
      if (this.searchText) {
        outletsList().then(res => {
          if (res.data.code === 200) {
            let base = res.data.data;
            let arr = [];
            base.forEach((value, index) => {
              if (
                value.store_name.indexOf(this.searchText) + 1 &&
                value.outlets_type.indexOf("1") + 1
              ) {
                arr.push(value);
              }
            });
            this.items = arr;
          } else {
            this.$message.error(res.data.error);
          }
        });
      } else {
        outletsList().then(res => {
          if (res.data.code === 200) {
            let base = res.data.data;
            let arr = [];
            base.forEach((value, index) => {
              if (value.outlets_type.indexOf("1") + 1) {
                arr.push(value);
              }
            });
            this.items = arr;
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },
    // 点击获取买家自提点
    buyOnline() {
      this.choice = 3;
      if (this.searchText) {
        outletsList().then(res => {
          if (res.data.code === 200) {
            let base = res.data.data;
            let arr = [];
            base.forEach((value, index) => {
              if (
                value.store_name.indexOf(this.searchText) + 1 &&
                value.outlets_type.indexOf("2") + 1
              ) {
                arr.push(value);
              }
            });
            this.items = arr;
          } else {
            this.$message.error(res.data.error);
          }
        });
      } else {
        outletsList().then(res => {
          if (res.data.code === 200) {
            let base = res.data.data;
            let arr = [];
            base.forEach((value, index) => {
              if (value.outlets_type.indexOf("2") + 1) {
                arr.push(value);
              }
            });
            this.items = arr;
          } else {
            this.$message.error(res.data.error);
          }
        });
      }
    },
    // 搜索
    // 批量删除网点
    delectLists() {
      this.multipleSelection.forEach(value => {
        deleteOutlets(value.id);
        switch (this.choice) {
          case 1:
            this.allOnline();
            break;
          case 2:
            this.offlineOnline();
            break;
          case 3:
            this.buyOnline();
            break;
        }
      });
    },
    // 删除网点
    deleteOnline() {
      if (this.if_Jurisdiction) {
        deleteOutlets(this.form.outletsId).then(res => {
          if (res.data.code === 200) {
            this.$message.success("成功删除线下网点");
            this.addInlineChoice = false;
            switch (this.choice) {
              case 1:
                this.allOnline();
                break;
              case 2:
                this.offlineOnline();
                break;
              case 3:
                this.buyOnline();
                break;
            }
          } else {
            this.$message.error(res.data.code);
          }
        });
      } else {
        this.$message.error("您没有删除网点权限");
      }
    },
    // 编辑网点
    editOnline(index) {
      if (this.if_Jurisdiction) {
        console.log(index);
        this.indexEdite = index;
        outletsDetail(index).then(res => {
          if (res.data.code === 200) {
            let _form = res.data.data;
            _form.outletsId = res.data.data.id;
            this.lengthNum = _form.store_images.length;
            _form.selectedOptions = [
              res.data.data.store_address_bz.provinceId,
              res.data.data.store_address_bz.cityId,
              res.data.data.store_address_bz.areaId
            ];
            _form.outlets_type = _form.outlets_type.map(Number);
            let _business_hours = [];
            console.log(_form);
            _form.business_hours.forEach((value, index) => {
              let _week = "";
              let _weekHours = [];
              value.week.forEach(value => {
                switch (value) {
                  case "1":
                    _week += "周一";
                    _weekHours.push(1);
                    break;
                  case "2":
                    _week += "周二";
                    _weekHours.push(2);
                    break;
                  case "3":
                    _week += "周三";
                    _weekHours.push(3);
                    break;
                  case "4":
                    _week += "周四";
                    _weekHours.push(4);

                    break;
                  case "5":
                    _week += "周五";
                    _weekHours.push(5);
                    break;
                  case "6":
                    _week += "周六";
                    _weekHours.push(6);
                    break;
                  case "7":
                    _week += "周日";
                    _weekHours.push(7);
                    break;
                }
              });
              value.week = _weekHours;
              _business_hours.push({
                open_time: value.open_time,
                close_time: value.close_time,
                week: _week
              });
            });
            this.businessTime = _business_hours;
            _form.business_status = _form.business_status == 1 ? 1 : 2;
            console.log(this.businessTime);
            console.log(this.businesTimeValue);
            let _imgUploadsList = [];
            _form.store_images.forEach(value => {
              _imgUploadsList.push({ url: value.pic_path });
            });
            this.imgUploadsList = _imgUploadsList;
            this.form = _form;

            this.addInlineChoice = true;
          } else {
            this.$message.error(res.data.error);
          }
        });
      } else {
        this.$message.error("您没有编辑网点权限");
      }
    },
    // 复选框数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置省市区信息
    changeProvince(value) {
      this.form.store_address_bz.provinceId = this.$refs.cascader.currentValue[0];
      this.form.store_address_bz.provinceName = this.$refs.cascader.currentLabels[0];
      this.form.store_address_bz.cityId = this.$refs.cascader.currentValue[1];
      this.form.store_address_bz.cityName = this.$refs.cascader.currentLabels[1];
      this.form.store_address_bz.areaId = this.$refs.cascader.currentValue[2];
      this.form.store_address_bz.areaName = this.$refs.cascader.currentLabels[2];
    },
    // 营业时间改变
    changeBusinessTime() {},
    //是否营业的数据改变的时候
    changeBusiness(value) {
      this.form.business_status = value;
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      console.log(file);
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

    // 点击成功图片的时候
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除图片之前
    beforeRemove(file, fileList) {
      fileList.forEach((value, index) => {
        if (file == value) {
          this.index = index;
        }
      });
    },
    //删除图片
    handleRemove(file, fileList) {
      this.form.store_images.splice(this.index, 1);
      this.lengthNum = this.form.store_images.length;
    },
    // 自定义上传
    customUp(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        imgUploads(1, reader.result).then(result => {
          this.form.store_images.push({
            relative_path: result.data.data.originImg,
            relative_path_thum: result.data.data.thumImg
          });
          this.lengthNum = this.form.store_images.length;
        });
      };
    },
    //添加营业时间
    buildItem() {
      console.log("选择了添加营业时间");
      this.businesTimeValue = {
        open_time: "9:00",
        close_time: "18:00",
        week: []
      };
      this.indexTime = 0;
      let _disableWeek = [];
      this.form.business_hours.forEach((value, index) => {
        _disableWeek = _disableWeek.concat(value.week);
      });
      _disableWeek.forEach(value => {
        if (!this.weeks[value - 1].disabled) {
          this.weeks[value - 1].disabled = true;
        }
      });
      console.log(this.businesTimeValue);
      this.dialogTimeVisible = true;
    },

    // 修改营业时间
    changeItem(index) {
      this.indexTime = index + 1;
      this.businesTimeValue.open_time = this.form.business_hours[
        index
      ].open_time;

      this.businesTimeValue.close_time = this.form.business_hours[
        index
      ].close_time;
      this.businesTimeValue.week = this.form.business_hours[index].week;
      let _disableWeek = [];
      this.form.business_hours.forEach((value, key) => {
        if (key != this.indexTime - 1)
          _disableWeek = _disableWeek.concat(value.week);
      });
      this.weeks.forEach(value => {
        console.log(value);
        value.disabled = false;
      });
      _disableWeek.forEach(value => {
        if (!this.weeks[value - 1].disabled) {
          this.weeks[value - 1].disabled = true;
        }
      });
      this.dialogTimeVisible = true;
    },
    //  保存营业时间
    saveTime() {
      console.log(this.businessTime);
      console.log(this.businesTimeValue);
      let _businessTime = {
        open_time: "",
        close_time: "",
        week: ""
      };
      let _business_hours = {
        open_time: "",
        close_time: "",
        week: []
      };
      // let _openHour = this.businesTimeValue.open_time.getHours();
      // let _openMin =
      //   this.businesTimeValue.open_time.getMinutes() < 10
      //     ? "0" + this.businesTimeValue.open_time.getMinutes()
      //     : this.businesTimeValue.open_time.getMinutes();
      // let _closeHour = this.businesTimeValue.close_time.getHours();
      // let _closeMin =
      //   this.businesTimeValue.close_time.getMinutes() < 10
      //     ? "0" + this.businesTimeValue.close_time.getMinutes()
      //     : this.businesTimeValue.close_time.getMinutes();
      // _businessTime.open_time = "" + _openHour + ":" + _openMin;
      // _businessTime.close_time = "" + _closeHour + ":" + _closeMin;
      _businessTime.open_time = this.businesTimeValue.open_time;
      _businessTime.close_time = this.businesTimeValue.close_time;
      _business_hours.open_time = this.businesTimeValue.open_time;
      _business_hours.close_time = this.businesTimeValue.close_time;
      this.businesTimeValue.week.sort(function(x, y) {
        return x - y;
      });
      console.log(this.businesTimeValue.week);
      if (!this.indexTime) {
        this.businesTimeValue.week.forEach((value, index) => {
          _businessTime.week += this.weeks[value - 1].label;
          _business_hours.week.push(value);
        });
        if (!_businessTime.week) {
          this.$message.error("请选择星期");
        } else {
          console.log(_businessTime);
          this.businessTime.push(_businessTime);
          this.form.business_hours.push(_business_hours);
          this.businesTimeValue = {
            open_time: "09:00",
            close_time: "18:00",
            week: []
          };
          this.dialogTimeVisible = false;
        }
      } else {
        this.businesTimeValue.week.forEach((value, index) => {
          _businessTime.week += this.weeks[value - 1].label;
          _business_hours.week.push(value);
        });
        if (!_businessTime.week) {
          this.$message.error("请选择星期");
        } else {
          this.businessTime[this.indexTime - 1] = _businessTime;
          this.form.business_hours[this.indexTime - 1] = _business_hours;
          this.businesTimeValue = {
            open_time: "09:00",
            close_time: "18:00",
            week: []
          };
          this.dialogTimeVisible = false;
        }
      }
    },
    //保存整个表单
    submitForm(formName) {
      this.$refs[formName].validate().then(valid => {
        if (valid) {
          saveOutlets(this.form).then(res => {
            if (res.data.code === 200) {
              if (this.form.outletsId) {
                this.$message.success("成功修改线下网点");
              } else {
                this.$message.success("成功添加线下网点");
              }
              this.addInlineChoice = false;
              switch (this.choice) {
                case 1:
                  this.allOnline();
                  break;
                case 2:
                  this.offlineOnline();
                  break;
                case 3:
                  this.buyOnline();
                  break;
              }
              this.imgUploadsList = [];
              this.businessTime = [];
              this.indexTime = 0;
              this.lengthNum = 0;
              this.form = {
                selectedOptions: [],
                outletsId: "", //网点id
                store_name: "", //网点名称
                store_address_bz: {
                  areaId: "",
                  areaName: "",
                  cityId: "",
                  cityName: "",
                  provinceId: "",
                  provinceName: ""
                },
                store_address: "", //详细地址
                store_phone: "", //电话
                store_images: [],
                outlets_type: [],
                business_status: "", //是否营业
                recommend: "", // 商家简介
                area_code: "", //区号
                business_hours: []
              };
              this.$refs[formName].resetFields();
            } else {
              this.$message.error(res.data.error);
            }
          });
        }
      });
    },
    //  新增线下地址
    addInline() {
      if (this.if_Jurisdiction) {
        this.addInlineChoice = true;
      } else {
        this.$message.error("您没有新增网点权限");
      }
    },
    toFirst() {
      if (this.addInlineChoice) {
        this.addInlineChoice = false;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#shopOfflineOnline
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 20px 10px
      min-height 750px
      .shopHeader
        padding-bottom 10px
        .shopHeaderLeft
          min-width 300px
          .activeInput
            background-color #1491f2
          .choiceInput
            padding 0 18px
            line-height 32px
            display inline-block
            border-radius 4px
        .shopHeaderRight
          min-width 400px
          text-align right
          .el-input
            width 220px
      .el-form
        width 450px
        .successSubmit
          width 240px
        .dangerSubmit
          width 90px
        .el-checkbox-group
          .el-checkbox-button
            margin-right 20px
        .el-dropdown
          border 1px solid #dcdfe6
          line-height 30px
          padding 0 15px
          border-radius 4px
          color #c0c4cc
          width 215px
          position relative
          .el-dropdown-link
            display inline-block
            height 30px
            width 200px
            i
              position absolute
              right 10px
              top 8px
      .timeDialog
        .timeDialogDiv
          margin-bottom 20px
          .timeLabel
            display inline-block
            width 70px
            text-align right
            padding-right 20px
        input
          width 215px
        button
          width 200px
      .shopMain
        .selfLiftingButton
          background #1491f2
          display inline-block
          border-radius 4px
          width 50px
          height 24px
          line-height 24px
        .storeButton
          display inline-block
          border-radius 4px
          width 50px
          height 24px
          line-height 24px
          background-color #ff9933
        .tableImgBox
          width 80px
          height 80px
          background-color #ccc
          img
            width 100%
            height 100%
      .delectLists
        margin 20px
  .el-breadcrumb
    .fontBlod:hover
      color #1491f2
</style>

<style>
#shopOfflineOnline .tabelHeader th {
  background-color: #f2f2f2;
}
#shopOfflineOnline .el-checkbox-button .el-checkbox-button__inner {
  border-radius: 2px;
  border: 1px solid #dbdbdb;
}
#shopOfflineOnline .is-checked .el-checkbox-button__inner {
  border: 1px solid #409eff;
}
#shopOfflineOnline .el-checkbox-button__inner:hover {
  border: 1px solid #409eff;
}
#shopOfflineOnline .el-upload {
  width: 90px;
  height: 90px;
  line-height: 90px;
  border: 1px solid #cccccc;
}
#shopOfflineOnline .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}
#shopOfflineOnline .hideImg .el-upload {
  display: none;
}
.el-dropdown-menu {
  width: 215px;
  padding: 5px 0 0 0;
}
.el-dropdown-menu li {
  padding: 5px 10px;
  line-height: 20px;
}
.el-dropdown-menu .itemBase span:first-of-type {
  display: inline-block;
  width: 82px;
  vertical-align: middle;
}
.el-dropdown-menu .itemBase span:last-of-type {
  display: inline-block;
  width: 106px;
  vertical-align: middle;
}
.el-dropdown-menu .buildItem {
  background-color: #f5f7fa;
  line-height: 30px;
}
#shopOfflineOnline .imageItem .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
#shopOfflineOnline .imageItem .el-dialog {
  display: inline-block;
  width: auto;
  height: auto;
}

#shopOfflineOnline .imageItem .el-dialog img {
  width: auto;
}
</style>
