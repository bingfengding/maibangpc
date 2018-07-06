<template>
  <!-- 店铺成员 -->
  <div id="shopMember">
      <div class="showMember_content_taber">   
        <!-- 成员 -->
         <el-table
          :data="staffData"
           @row-click="rowClick"
            @selection-change="handleSelectionChange">
          <el-table-column
                type="selection"
                width="55">
              </el-table-column>
            <el-table-column min-width="70">
              <template slot-scope="scope">
                <div class="img">
                  <img :src="scope.row.avatar">
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="成员姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="currentMonthOrderTotalPrice"
            label="当月业绩">
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位">
          </el-table-column>
          <el-table-column
            label="操作"
            width="190"
            >
            <template slot-scope="scope">
              <el-button @click.stop="chat(scope.row)" type="primary" size="mini">发信息</el-button>
              <el-button @click.stop="staffBtn('update',scope.row.id,scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button type="primary" size="mini" @click.stop="stopStaffBtn(scope.row.id)" v-if="scope.row.staff_status == 1">停用</el-button>
              <el-button type="primary" size="mini" @click.stop="stopStaffBtn(scope.row.id)" v-if="scope.row.staff_status == 2">启用</el-button>
              <el-button type="primary" size="mini" @click.stop="delStaff(scope.row.id)" v-if="scope.row.staff_status == 2">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="member_footer">
       <el-button size="small" @click="changeStaffsDepartmentFn" :disabled="!staffArr.length">设置所在部门</el-button>
      </div>
    <!-- 成员弹框 -->
    <el-dialog :title="staffType" :visible.sync="staffDislog" width="450px" class="staffDislog"  :before-close="close">
  <el-form :model="updateStaffForm" :rules="rules" ref="staffForm">
    <el-form-item label="电话:" label-width="75px" prop="phone">
      <el-input v-model="updateStaffForm.phone" auto-complete="off" placeholder="请输入电话号码" @blur="showCode"></el-input>
    </el-form-item>
     <el-form-item label="验证码:" label-width="75px" prop="verifyCode" v-if="isShowCode">
      <el-input v-model="updateStaffForm.verifyCode" auto-complete="off" placeholder="请输入验证码"></el-input>
      <el-button class="getCodeBtn" type="text" @click="getCodeBtn" :disabled="disabled">{{codeText}}</el-button>
    </el-form-item>
     <el-form-item label="姓名:" label-width="75px" prop="name">
      <el-input v-model="updateStaffForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
    </el-form-item>
     <el-form-item label="职位:" label-width="75px" prop="position">
      <el-input v-model="updateStaffForm.position" auto-complete="off" placeholder="请输入职位"></el-input>
    </el-form-item>
     <el-form-item label="部门:" label-width="75px" prop="department">
      <el-select v-model="updateStaffForm.department" placeholder="请选择部门">
        <el-option
          v-for="item in departmentData"
          :key="item.id"
          :label="item.department_name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="权限:" label-width="75px">
      <span class="span" @click="showCompetence">
        点击弹出权限表
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
  </el-form>
   <div class="CompetenceDislog" v-if="CompetenceDislog">
     <div class="CompetenceDislog_header">
       <p>选择权限</p>
     </div>
     <div class="CompetenceDislog_content">
          <el-checkbox-group v-model="checkCompetenceArr"  @change="selectDescription">
            <el-checkbox :label="item.name" v-for=" (item,index) in competenceData" :key="index">{{item.description}}</el-checkbox>
          </el-checkbox-group>
     </div>
     <div class="CompetenceDislog_footer">
       <span @click="hideCompetenceDislog">取消</span>
       <span class="isOk" @click="selectDescriptionBtn">确定</span>
     </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="staffIsOk" >保存</el-button>
  </div>
</el-dialog>
 <el-dialog :visible.sync="cardDislog" width="450px" title="店铺成员信息" class="card_dislog" :before-close="closeCard">
   <el-form v-if="cardForm">
    <el-form-item :label="cardForm.name+'的名片：'" label-width="140px">
      <span class="span" @click="showCard(cardForm.id)">
        点击查看名片
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
      <el-form-item :label="cardForm.name+'的客户：'" label-width="140px">
      <span class="span" @click="goCustomer(cardForm.id)">
        点击查看客户
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
      <el-form-item :label="cardForm.lastMonth+'月的业绩：'" label-width="140px">
      <span class="span" @click="goStatistical(cardForm.lastMonth)">
        点击查看业绩
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
    <el-form-item :label="cardForm.nowMonth+'月的业绩：'" label-width="140px">
      <span class="span"  @click="goStatistical(cardForm.nowMonth)">
        点击查看业绩
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
     <el-form-item label='所在部门：' label-width="140px">
       <p style="text-align:center" v-if="$route.query.name">{{$route.query.name}}</p>
       <p v-if="!$route.query.name" style="text-align:center" >暂无部门</p>
    </el-form-item>
    <el-form-item  label='权限：' label-width="140px">
      <span class="span"  @click="showCompetence">
        点击弹出权限表
        <span class="icon el-icon-arrow-right"></span>
      </span>
    </el-form-item>
    <div class="CompetenceDislog" v-if="CompetenceDislog">
     <div class="CompetenceDislog_header">
       <p>拥有的权限</p>
     </div>
     <div class="CompetenceDislog_content">
          <el-checkbox-group v-model="checkCompetenceArr"  @change="selectDescription">
            <el-checkbox :label="item.name" v-for=" (item,index) in competenceData" :key="index" disabled>{{item.description}}</el-checkbox>
          </el-checkbox-group>
     </div>
  </div>
   <div class="card_item" v-if="isShowCard">
     <span style="font-size: 16px">{{cardForm.name}}的名片</span>
     <div class="code">
       <div class="user">
        <span><img :src="cardData.staff_img_thum" style="width: 25px;height:25px;margin-right: 5px"></span>
        <span>{{cardData.staff_name}}</span>
       </div>
       <img :src="code"  style="width: 150px;height: 150px;margin: 10px 0">
       <p>扫描二维码,进入商城关注</p>
     </div>
     <div class="shop_logo">
        <img :src="merchantInfo.merchant_logo" alt="">{{merchantInfo.shop_name}} 
     </div>
     <div class="code_footer">
       <el-button type="primary" size="small" @click="showShare" style="width: 130px;">分享</el-button>
     </div>

   </div>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeCard" size="small">取消</el-button>
    <el-button type="primary" @click.stop="staffBtn('update',cardForm.id,cardForm)" size="small">编辑</el-button>
  </div>
 </el-dialog>
     <el-dialog width="20%" center title="设置所在部门" :visible.sync="changeStaffDialog">
            <el-form label-width="100px">
                <el-form-item label="部门:">
                      <el-select v-model="departmentId" placeholder="请选择部门">
                        <el-option
                          v-for="item in departmentData"
                          :key="item.id"
                          :label="item.department_name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStaffDialog = false">取 消</el-button>
                <el-button type="primary" @click="changeStaffsDepartmentIsOk">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import {
  getMembersList,
  getDepartmentsList,
  createStaff,
  verifyCode,
  permissions,
  deleteStaff,
  updateStaff,
  stopStaff,
  staffdetails,
  getDepartmentStaff,
  staffcard,
  changeStaffsDepartment,
  updateVerifyCode
} from "@/api/shop/members/members";
import {
  getchatRecord
} from "@/api/chat/chat";
import { timetrans, b64DecodeUnicode, ws ,change} from "@/utils/webSocket.js";
import { storeHome } from "api/shop/profile";
export default {
  data() {
    return {
      merchantInfo: {
        shop_name: "",
        merchant_logo: "",
        isMerchantOrderServic: true,
        is_creator: true,
        isOutlets: true
      },
      certification: {},
      changeStaffDialog: false,
      departmentId: null,
      departmentName: null,
      departmentId: null,
      permissions: [], //选择的权限
      competenceData: [],
      checkCompetenceArr: [],
      value: null,
      staffForm: {
        phone: null,
        name: null,
        position: null,
        verifyCode: null,
        permissions: [],
        department: null
      },
      updateStaffForm: {
        staffId: null,
        phone: null,
        verifyCode: null,
        name: null,
        position: null,
        permissions: [],
        department: null
      },
      codeText: "获取验证码",
      isShowCode: false,
      disabled: false,
      CompetenceDislog: false,
      staffType: null,
      // 部门弹框
      departmentDislog: false,
      departmentTitle: null,
      staffDislog: false,
      departmentData: [],
      staffData: [],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输 入正确的验证码", trigger: "blur" }
        ]
      },
      phone: null,
      cardDislog: false,
      cardForm: null,
      code: "",
      isShowCard: false,
      cardData: [],
      staffArr: [],
      message: []
    };
  },
  watch: {
    stf(val) {
      this.staffData = val;
      this.checkCompetenceArr = val.permissions;
    }
  },
  props: ["stf", "isDepartmentId"],
  methods: {
    chat(data) {
      if (data.user_id == localStorage.getItem("userId")) {
        this.$message({
          type: "error",
          message: "不能跟自己聊天"
        });
        return;
      }
      let val = {
        receiverId: data.user_id,
        receiverName: data.name,
        receiverHead: data.avatar,
        type: "staffChat"
      };
      this.message = []
      this.getChatListFn(val)
    },
    getChatListFn(data) {
      let val = {
        //改变未读状态
        chatType: "customerService",
        page: 1,
        receiverId: data.receiverId
      };
      getchatRecord(val).then(res => {
        res.data.data.forEach(val => {
          val.sendTime = timetrans(val.sendTime);
          if (val.baseType == 1) {
            val.content = b64DecodeUnicode(val.content);
          }
          if (val.messageType == 4) {
            if(val.messageFrom != 7){
              val.content = 'https://image.ymaibang.com/' + val.content;
            }else{
              val.content = val.content;
            }
          }
          if (val.messageType == 2) {
            val.content = JSON.parse(val.content);
          }
          if (val.senderId == localStorage.getItem("userId")) {
            //是本人发送的
            this.message.push(change(val.messageType,val.sendTime,val.content)) 
          } else {
             this.message.push(change(val.messageType,val.sendTime,val.content,'receive'))
          }
        });
        sessionStorage.setItem(data.receiverId,JSON.stringify(this.message))
        this.$store.dispatch("show", data);
      });
    },
    handleSelectionChange(val) {
      this.staffArr = [];
      val.forEach(val => {
        this.staffArr.push(val.id);
      });
    },
    changeStaffsDepartmentFn() {
      //批量分组
      getDepartmentsList().then(res => {
        this.departmentData = res.data.data;
      });
      this.departmentId = null;
      this.changeStaffDialog = true;
    },
    changeStaffsDepartmentIsOk() {
      let data = {
        staffIds: this.staffArr,
        departmentId: this.departmentId
      };
      changeStaffsDepartment(data).then(res => {
        if (res.data.code == 200) {
          this.changeStaffDialog = false;
          this.new("操作成功");
          this.$emit("refresh");
        } else {
          this.$message({
            type: "error",
            message: res.data.error
          });
        }
      });
    },
    closeCard() {
      this.cardDislog = false;
      this.$store.dispatch("hideShare");
    },
    showShare() {
      if (this.$store.state.share.show) {
        this.$store.dispatch("hideShare");
        return;
      }
      this.$store.dispatch("showShare");
    },
    showCard(id) {
      //显示个人名片
      let data = {
        staffId: id
      }
       staffcard(data).then(res=>{
         this.code = res.data.data.or_code
         this.cardData = res.data.data         
         this.CompetenceDislog = false
         this.isShowCard = !this.isShowCard
         let data  = {
           img : this.$store.state.homeInfo.merchantInfo.merchant_logo,
           title: this.$store.state.homeInfo.merchantInfo.shop_name,
           url: res.data.data.storeEntrance
         }
         this.$store.dispatch("changeUrl",data);
       })
    },
    rowClick(row) {
      this.cardForm = row;
      this.cardDislog = true;
      this.isShowCard = false;
      this.CompetenceDislog = false;
      storeHome().then(result => {
        if (result.data.code === 200) {
          this.merchantInfo = result.data.data.merchantInfo;
          this.certification = result.data.data.certification;
        } else {
          this.$message.error(result.data.error);
        }
        this.$store.commit("change_home_info", {
          merchantInfo: result.data.data.merchantInfo,
          certification: result.data.data.certification
        });
      });
    },
    goStatistical(date) {
      this.$router.push({
        name: "销售统计",
        params: { staffId: this.cardForm.id, date: date }
      });
    },
    goCustomer(id) {
      this.$router.push({ path: "/customer/customerList", query: { id: id } });
    },
    showCode() {
      if (this.updateStaffForm.phone !== this.phone) {
        this.isShowCode = true;
      } else {
        this.isShowCode = false;
      }
    },
    getDepartmentStaffFn() {
      //请求部门成员
      let data = {
        departmentId: this.isDepartmentId,
        page: 2
      };
      getDepartmentStaff(data).then(res => {
        this.staffData = res.data.data.staffs.staffs;
        this.total = res.data.data.staffs.totalCount;
      });
    },
    stopStaffBtn(id) {
      let data = {
        staffId: id
      };
      stopStaff(data).then(res => {
        if (res.data.code == 200) {
          this.new("修改成功");
        } else {
          this.$message({
            type: "error",
            message: res.data.error
          });
        }
      });
    },
    getMembersListFn() {
      getMembersList().then(res => {
        //请求未分组成员列表
        this.departmentData = res.data.data.departments;
        res.data.data.departments.forEach(val => {});
        this.staffData = res.data.data.staffs.staffs;
      });
    },
    updateStaffFn() {
      if(!this.updateStaffForm.verifyCode){
          delete this.updateStaffForm.phone;
      }
      updateStaff(this.updateStaffForm).then(res => {
        this.$refs["staffForm"].resetFields();
        if (res.data.code == 200) {
          this.new("修改成功");
        } else {
          this.$message({
            type: "error",
            message: res.data.error
          });
        }
      });
    },
    staffIsOk() {
      //创建成员按钮
      if (this.staffType == "添加成员") {
        this.$refs["staffForm"].validate(valid => {
          if (valid) {
            this.createStaffFn();
          } else {
            return;
          }
          this.$refs["staffForm"].resetFields();
          this.staffDislog = false;
        });
      } else {
        this.$refs["staffForm"].validate(valid => {
          if (valid) {
            this.updateStaffFn();
          } else {
            return;
          }

          this.staffDislog = false;
        });
      }
    },
    //获取验证码
    getCodeBtn() {
      let data = {
        phone: this.updateStaffForm.phone
      };
      updateVerifyCode(data).then(res => {
        this.codeText = 60;
        this.disabled = true;
        let that = this;
        let time = setInterval(function() {
          that.codeText = that.codeText - 1;
          if (that.codeText == 0) {
            that.codeText = "重新获取验证码";
            that.disabled = false;
            clearInterval(time);
          }
        }, 1000);
      });
    },
    permissionsFn() {
      //获取权限表
      permissions().then(res => {
        this.competenceData = res.data.data;
      });
    },
    //删除成员操作
    delStaff(id) {
      this.$confirm("删除后将无法恢复, 确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            staffId: id
          };
          deleteStaff(data).then(res => {
            if (res.data.code == 200) {
              this.new("删除成功");
            } else {
              this.$message({
                type: "error",
                message: res.data.error
              });
            }
          });
        })
    },
    // 创建成员
    staffBtn(type, id,val) {
      if(val.user_id == localStorage.getItem("userId")){
        this.$router.push("/set/userinfo/index")
        return;
      }
      this.cardDislog = false;
      if (type == "create") {
        this.staffForm.permissions = [];
        this.checkCompetenceArr = [];
        this.staffType = "添加成员";
        this.staffDislog = true;
        this.CompetenceDislog = false;
      } else {
        let data = {
          staffId: id
        };
        staffdetails(data).then(res => {
          this.staffType = "编辑成员";
          this.staffForm = res.data.data;
          this.updateStaffForm.staffId = res.data.data.id;
          if (res.data.data.department_id != 0) {
            this.updateStaffForm.department = res.data.data.department_id;
          }
          this.updateStaffForm.phone = res.data.data.phone;
          this.updateStaffForm.position = res.data.data.position;
          this.updateStaffForm.permissions = res.data.data.permissions;
          this.updateStaffForm.name = res.data.data.name;
          this.phone = res.data.data.phone;
          this.staffDislog = true;
          this.CompetenceDislog = false;
        });
        getDepartmentsList().then(res => {
          this.departmentData = res.data.data;
        });
      }
    },
    //显示权限表
    showCompetence() {
      this.isShowCard = false;
      if (this.cardDislog) {
        this.checkCompetenceArr = this.cardForm.permissions;
      } else {
        this.checkCompetenceArr = this.updateStaffForm.permissions;
      }
      this.CompetenceDislog = !this.CompetenceDislog;
    },
    // 关闭权限表
    hideCompetenceDislog() {
      this.checkCompetenceArr = [];
      this.CompetenceDislog = false;
    },
    selectDescription(value) {
      //选择权限
      console.log(this.checkCompetenceArr);
    },
    selectDescriptionBtn() {
      //确定选择权限
      this.updateStaffForm.permissions = this.checkCompetenceArr;
      this.CompetenceDislog = false;
    },
    close() {
      this.$confirm("未保存是否退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs["staffForm"].resetFields();
          this.staffDislog = false;
        })
        .catch(() => {});
    },
    new(value) {
      if (this.isDepartmentId) {
        this.getDepartmentStaffFn();
      } else {
        this.getMembersListFn();
      }
      this.departmentDislog = false;
      this.$message({
        message: value,
        type: "success"
      });
    }
  },
  mounted() {
    // this.getMembersListFn();
    if (this.isDepartmentId) {
      //判断部门
      this.getDepartmentStaffFn();
    }
    this.permissionsFn();

  }
};
</script>
<style scoped>
.card_dislog >>> .el-form-item {
  padding: 0;
  border-bottom: 1px solid #e5e5e5;
}
#shopMember {
  width: 100%;
}
.shopMember_content_left {
  width: 100%;
}
.header {
  width: 100%;
  background: white;
  height: 60px;
  border-left: 1px solid #f2f2f2;
  line-height: 60px;
  font-size: 14px;
}
.shopMember_content {
  padding-left: 10px;
  width: 100%;
  height: 100%;
}
.shopMember_content_header {
  background: white;
  height: 60px;
  width: 100%;
  line-height: 60px;
  padding-left: 10px;
}
.img img {
  width: 60px;
  height: 60px;
}
/* 表格 */
.showMember_content_taber {
  background: white;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
}
.showMember_content_taber >>> .el-table th {
  background-color: #f8f8f8;
}
.showMember_content_taber >>> .el-table__row {
  cursor: pointer;
}
.showMember_content_taber >>> .el-select {
  width: 100% !important;
}

.span {
  width: 100%;
  display: block;
  height: 40px;
  text-align: center;
  color: #cccccc;
  cursor: pointer;
}
.icon {
  color: black;
  font-size: 28px;
  line-height: 40px;
  float: right;
}
.CompetenceDislog {
  width: 300px;
  background: white;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: -320px;
  border-radius: 2px;
}
.CompetenceDislog_header {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
}
.CompetenceDislog_content {
  width: 100%;
  background-color: #f2f2f2;
  height: calc(100% - 80px);
  overflow-y: auto;
}
.card_item {
  width: 300px;
  background: white;
  height: 410px;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: -320px;
  border-radius: 2px;
}
.card_item {
  color: #333333;
  font-size: 14px;
  padding: 10px;
}
.card_item .code {
  text-align: center;
  margin: 10px;
}
.card_item .user {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.card_item .code_footer {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}
.CompetenceDislog_footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  font-size: 0;
  background: white;
  line-height: 40px;
}
.CompetenceDislog_footer span {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 100%;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}
.CompetenceDislog_footer .isOk {
  color: #1491f2;
}
.CompetenceDislog_content >>> .el-checkbox {
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}
.CompetenceDislog_content >>> .el-checkbox__label {
  margin-left: 25px;
}
.CompetenceDislog_content >>> .el-checkbox + .el-checkbox {
  margin: 0;
}
.CompetenceDislog_content
  >>> .el-checkbox__input.is-checked
  .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  color: white;
  background: #00cc00;
  border-color: #00cc00;
}
.CompetenceDislog_content >>> .el-checkbox__inner {
  border-radius: 50%;
  color: white;
}
.CompetenceDislog_content
  >>> .el-checkbox__input.is-checked
  + .el-checkbox__label {
  color: #606266;
}
.getCodeBtn {
  border: none;
  position: absolute;
  right: 10px;
  top: 0;
}
.share {
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -85px;
  margin-top: -50px;
  height: 50px;
  z-index: 10000;
  transition: 0.3s;
  background: white;
  padding: 0 20px;
  border-radius: 0 0 5px 5px;
  text-align: center;
}
.showShare {
  margin-top: 0px;
}
.member_footer {
  margin-top: 10px;
}
.shop_logo {
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  padding: 10px;
}
.shop_logo img {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
.showMember_content_taber >>> .el-button--mini, .el-button--small{
  width: 68px !important;
  margin:5px;
}
.member_footer >>> .el-button--mini, .el-button--small{
  width: 108px !important;
}
</style>
