<template>
  <!-- 商家地址栏 -->
  <el-container id="shopAddress">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          商家地址库
        </el-breadcrumb-item>

      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <div class="newAddress">
            <el-button type="primary" size="small" @click="addAddress">新增地址</el-button>
          </div>
          <!-- 新增地址提交表单 -->
          <el-dialog 
            custom-class="newDialog"
            title="收货地址" 
            :visible.sync="dialogFormVisible"
            width="30%"
            center
            :show-close	= "false"
          >
            <el-form
              :model="form" 
              ref="addressForm"
              label-width="100px"
              :rules="rules"
              label-position=right
            >
              <el-form-item label="联系人：" 
              prop="contacts"
              >
                <el-input  
                placeholder="请输入联系人姓名"
                v-model="form.contacts"
                maxlength="20"
                auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item 
              label="手机号码："
              prop="phone"
              >
                <el-input  
                maxlength="11"
                placeholder="请输入手机号码" 
                v-model="form.phone"
                auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label=" 固定电话：">
                  <el-col :span="6">
                    <el-form-item 
                    prop="area_code">
                      <el-input  
                        v-model="form.area_code"
                        placeholder="请输入区号" 
                        maxlength="4"
                        >
                    </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line textCen" :span="2">-</el-col>
                 <el-col :span="16">
                   <el-form-item 
                   prop="landline_number">
                      <el-input
                        maxlength="8"     
                        v-model="form.landline_number"
                        placeholder="请输入座机号" 
                      >
                  </el-input>
                   </el-form-item>
                  
                 </el-col>
              </el-form-item>
              <!-- 省份选择 -->
              <el-form-item
                label="所在区域："
                prop="selectedOptions"
                class="selectCity"
                 >
                <el-cascader
                  :options="cityOptions"
                  @change="changeProvince"
                  v-model="form.selectedOptions"
                  ref = "cascader"
                >
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址："  prop="address">
                <el-input
                v-model="form.address"
                maxlength="80"
                placeholder="请输入详细地址，如街道名称，门牌号等信息" 
                auto-complete="off"
                >
                </el-input>
              </el-form-item>
              <el-form-item class="defaultReturn" prop="default">
                设为默认退货地址
                <el-switch
                  v-model="form.if_default"
                  :disabled="if_disabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('addressForm')">取 消</el-button>
              <el-button type="primary" @click="submitForm('addressForm',form.recipient_id)">保 存</el-button>
            </div>
          </el-dialog>
            <!-- 表格 -->
          <el-col>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="contacts"
                label="联系人"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                min-width="160">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                min-width="300"
                >
              </el-table-column>
              <el-table-column
                prop="if_default"
                label="设为默认退货地址"
                min-width="120"
                >
                <template slot-scope="scope">
                  <el-switch
                  :disabled="defaultArr[scope.$index]==1 || !if_Jurisdiction"
                  v-model="defaultArr[scope.$index]"
                  @change="switchChange(scope.$index,scope.row,'addressForm')"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                </template>
                
              </el-table-column>
              <el-table-column 
                label="操作"
                min-width="160"
                class="abnxc"
              >
                <template slot-scope="scope" class="abnxc">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">
                    编辑
                    </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">
                    删除
                    </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import { judgePermisson } from "api/shop/public";
import cityOptions from "utils/city_data2017_element.js";
import { validatePhone } from "@/utils/validate";
import {
  returnGoodsAddress,
  getmerchantAddressList,
  deleteMerchantAddress,
  merchantAddressDetail,
  changeMerchantAddress
} from "api/shop/shopaddress";
export default {
  data() {
    let validateCode = (rule, value, callback) => {
      let re = /^\d{3,4}$/;
      if (!value) {
        callback();
      } else if (!re.test(value)) {
        return callback(new Error("请输入正确的区号"));
      } else {
        callback();
      }
    };
    let validateNumber = (rule, value, callback) => {
      let re = /^\d{7,8}$/;
      if (!value) {
        callback();
      } else if (!re.test(value)) {
        return callback(new Error("请输入正确的固话号码"));
      } else {
        callback();
      }
    };
    return {
      if_Jurisdiction: false, //判断是否有权限
      if_disabled: false,
      cityOptions,
      dialogFormVisible: false,
      defaultArr: [],
      form: {
        recipient_id: "",
        contacts: "",
        phone: "",
        address: "",
        area_code: "",
        landline_number: "",
        areaName: "",
        cityId: "",
        cityName: "",
        provinceId: "",
        provinceName: "",
        areaId: "",
        selectedOptions: [],
        if_default: false,
        address_type: "1"
      },
      rules: {
        contacts: [
          {
            required: true,
            message: "请输入联系人姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        area_code: [{ validator: validateCode, trigger: "blur" }],
        landline_number: [{ validator: validateNumber, trigger: "blur" }],
        selectedOptions: [
          { required: true, message: "请选择所在地区", trigger: "change" }
        ],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ]
      },
      tableData: [],
      sureDefault: false,
      notDelete: false
    };
  },
  mounted() {
    this.resetTable();
  },
  methods: {
    // 默认地址改变的时候
    switchChange(index, row, formName) {
      changeMerchantAddress({
        recipient_id: row.id,
        if_default: row.if_default ? 0 : 1
      }).then(result => {
        if (result.data.code == 200) {
          if (this.notDelete) {
            this.$message.error("必须保留1个默认地址");
          }

          this.resetTable();
        } else {
          this.resetTable();
          this.$message.error(result.data.error);
        }
      });
    },
    // 更新数据
    resetTable() {
      getmerchantAddressList().then(result => {
        if (result.data.code == 200) {
          if (result.data.data.length == 1) {
            this.notDelete = true;
          } else if (result.data.data.length > 1) {
            this.notDelete = false;
          }
          let _tableData = [...result.data.data];
          let _defaultArr = [];
          console.log(_tableData);
          _tableData.forEach((value, index) => {
            if (value.if_default == 0) {
              _defaultArr.push(false);
            } else {
              _defaultArr.push(true);
            }

            this.defaultArr = _defaultArr;
          });
          // let newArray = _tableData.splice(_index, 1);
          // this.tableData = [newArray[0], ..._tableData];
          this.tableData = _tableData;
        } else if (result.data.code == 400) {
          this.sureDefault = true;
          this.tableData = [];
        } else {
          this.sureDefault = false;
          this.$message.error("result.data.error");
        }
      });
      judgePermisson().then(res => {
        if (res.data.code == 200) {
          this.if_Jurisdiction = true;
        } else {
          this.if_Jurisdiction = false;
        }
      });
    },
    // 新增地址
    addAddress() {
      if (this.if_Jurisdiction) {
        this.dialogFormVisible = true;
      } else {
        this.$message.error("您没有权限");
      }
    },
    // 修改信息
    handleEdit(index, row) {
      if (this.if_Jurisdiction) {
        merchantAddressDetail({ recipient_id: row.id }).then(result => {
          if (result.data.code == 200) {
            let base = result.data.data;
            this.form.recipient_id = row.id;
            this.form.address = base.address;
            this.form.contacts = base.contacts;
            this.form.area_code = base.area_code;
            this.form.areaName = base.address_pcd.areaName;
            this.form.areaId = base.address_pcd.areaId;
            this.form.cityId = base.address_pcd.cityId;
            this.form.cityName = base.address_pcd.cityName;
            this.form.provinceId = base.address_pcd.provinceId;
            this.form.provinceName = base.address_pcd.provinceName;
            this.form.phone = base.phone;
            this.form.area_code = base.area_code;
            this.form.landline_number = base.landline_number;
            this.form.if_default = base.if_default ? true : false;
            this.form.selectedOptions = [
              base.address_pcd.provinceId,
              base.address_pcd.cityId,
              base.address_pcd.areaId
            ];
            console.log(base.if_default);
            if (base.if_default) {
              this.if_disabled = true;
            }
          } else {
            this.$message({
              message: result.data.error,
              type: "error"
            });
          }
        });

        this.dialogFormVisible = true;
      } else {
        this.$message.error("您没有权限");
      }
    },
    // 删除对应地址
    handleDelete(index, row) {
      if (this.if_Jurisdiction) {
        this.resetTable();
        if (this.notDelete) {
          this.$message.error("必须保留一个地址");
          return;
        } else {
          deleteMerchantAddress({ recipient_id: row.id }).then(result => {
            if (result.data.code == 200) {
              this.$message({
                message: "删除地址成功",
                type: "success"
              });
              // 获取更新后的地址信息
              this.resetTable();
            } else {
              this.$message({
                message: result.data.error,
                type: "error"
              });
            }
          });
        }
      } else {
        this.$message.error("您没有权限");
      }
    },
    // 设置省市区信息
    changeProvince(value) {
      this.form.provinceId = this.$refs.cascader.currentValue[0];
      this.form.provinceName = this.$refs.cascader.currentLabels[0];
      this.form.cityId = this.$refs.cascader.currentValue[1];
      this.form.cityName = this.$refs.cascader.currentLabels[1];
      this.form.areaId = this.$refs.cascader.currentValue[2];
      this.form.areaName = this.$refs.cascader.currentLabels[2];
    },
    // 新增退货地址
    submitForm(formName, row) {
      if (!row) {
        this.resetTable();
        this.$refs[formName].validate().then(valid => {
          console.log(valid);
          if (valid) {
            console.log(valid);
            // 声明需要提交的参数数据
            let _if_default = 0;
            if (this.sureDefault) {
              _if_default = 1;
            } else {
              if (this.form.if_default) {
                _if_default = 1;
              } else {
                _if_default = 0;
              }
            }
            let object = {
              contacts: this.form.contacts,
              phone: this.form.phone,
              area_code: this.form.area_code,
              landline_number: this.form.landline_number,
              extension_number: "",
              address_pcd: {
                areaName: this.form.areaName,
                cityId: this.form.cityId,
                cityName: this.form.cityName,
                provinceId: this.form.provinceId,
                provinceName: this.form.provinceName,
                areaId: this.form.areaId
              },
              address: this.form.address,
              if_default: _if_default,
              address_type: 1
            };

            // 提交申请
            returnGoodsAddress(object).then(result => {
              if (result.data.code == 200) {
                this.$message({
                  message: "添加地址成功",
                  type: "success"
                });
                // 获取更新后的地址信息
                this.resetTable();
                // 充值表单
                this.$refs[formName].resetFields();
                this.form.recipient_id = "";
                // 关闭窗口
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  message: result.data.error,
                  type: "error"
                });
                this.$refs[formName].resetFields();
                this.form.recipient_id = "";
              }
            });
          }
        });
      } else {
        this.$refs[formName].validate().then(valid => {
          if (valid) {
            let _if_default1 = 0;
            if (this.notDelete) {
              _if_default1 = 1;
            } else {
              if (this.form.if_default) {
                _if_default1 = 1;
              } else {
                _if_default1 = 0;
              }
            }
            // 声明需要提交的参数数据
            let object = {
              recipient_id: this.form.recipient_id,
              contacts: this.form.contacts,
              phone: this.form.phone,
              area_code: this.form.area_code,
              landline_number: this.form.landline_number,
              extension_number: "",
              address_pcd: {
                areaName: this.form.areaName,
                cityId: this.form.cityId,
                cityName: this.form.cityName,
                provinceId: this.form.provinceId,
                provinceName: this.form.provinceName,
                areaId: this.form.areaId
              },
              address: this.form.address,
              if_default: _if_default1,
              address_type: 1
            };
            // 提交申请
            returnGoodsAddress(object).then(result => {
              if (result.data.code == 200) {
                this.$message({
                  message: "修改地址成功",
                  type: "success"
                });
                // 获取更新后的地址信息
                this.resetTable();
                // 重置表单
                this.$refs[formName].resetFields();
                this.form.recipient_id = "";
                this.if_disabled = false;
                this.form.if_default = false;
                // 关闭窗口
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  message: result.data.error,
                  type: "error"
                });
                this.$refs[formName].resetFields();
                this.form.recipient_id = "";
                this.if_disabled = false;
                this.form.if_default = false;
              }
            });
          }
        });
      }
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.form.recipient_id = "";
      this.if_disabled = false;
      this.form.if_default = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
#shopAddress
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
      .newDialog
        .el-form-item__content
          margin-left 0
        .el-switch
          position absolute
          top 10px
          right 10%
        .selectCity
          .el-cascader
            width 100%
      .newAddress
        margin-bottom 20px
</style>
<style>
/* #shopAddress .el-form-item__label {
  text-align: left;
} */
#shopAddress .defaultReturn .el-form-item__content {
  margin-left: 0 !important;
}
#shopAddress .has-gutter {
  color: #1491f2;
}
#shopAddress .el-table th {
  background-color: #f8f8f8;
}
#shopAddress .has-gutter tr th:nth-last-of-type(2) {
  text-align: right;
}
#shopAddress .el-table__body-wrapper tr td:last-of-type {
  text-align: right;
}
</style>

