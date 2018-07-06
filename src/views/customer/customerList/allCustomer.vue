<template>
    <div class="allCustomer">
         <el-table :data="customerData"  @selection-change="handleSelectionChange">
          <el-table-column
                type="selection"
                width="55">
              </el-table-column>
          <el-table-column
          width="500"
            label="客户备注">
            <template slot-scope="scope">
                <div class="notes_content">
                    <div class="notes_content_left">
                        <div class="img">
                            <img :src="scope.row.headimgurl">
                        </div>
                        <div class="customerText">
                            <span>单位名：{{scope.row.ramark_company}}</span>
                            <span>客户名：{{scope.row.remark_name}}</span>
                            <span>昵称：{{scope.row.nickname}}</span>
                        </div>
                        <span class="el-icon-edit-outline" @click="updateCustomer(scope.row.id,scope.row.ramark_company,scope.row.remark_name)"></span>
                    </div>
                       <div class="notes_content_right">
                        <div class="identity">
                            <span v-if="scope.row.ifStaff == 1">
                                <div class="identity_img">
                                   <img src="../../../images/customer/yuangong.png">
                                </div>
                                <p>团队员工</p>
                            </span>
                            <span v-if="scope.row.cooperation == 1">
                                <div class="identity_img">
                                   <img src="../../../images/customer/hezuo.png">
                                </div>
                                <p>合作客户</p>
                            </span>
                             <span v-if="scope.row.follow == 1">
                                 <div class="identity_img">
                                   <img src="../../../images/customer/weixin.png">
                                 </div>
                                <p>微信公众号粉丝</p>
                            </span>
                            <span v-if="scope.row.follow != 1 && scope.row.platform_type == 1">
                                 <div class="identity_img">
                                   <img src="../../../images/customer/weixin.png">
                                 </div>
                                <p>微信</p>
                            </span>
                            <span v-if="scope.row.platform_type == 2">
                                <div class="identity_img">
                                   <img src="../../../images/customer/qq.png">
                                </div>
                                <p>QQ</p>
                            </span>
                            <!-- <span v-if="scope.row.platform_type == 3">
                                <div class="identity_img">
                                  <img src="../../../images/customer/qita.png">
                                </div>
                                <p>其它</p>
                            </span> -->
                             <span v-if="scope.row.platform_type == 4">
                                 <div class="identity_img">
                                   <img src="../../../images/customer/xiaochengxu.png">
                                 </div>
                                <p>小程序</p>
                            </span>
                        </div>
                       </div>
                </div>
                
            </template>
          </el-table-column>
          <el-table-column
            label="公司/电话">
            <template slot-scope="scope">
                <p>{{scope.row.company}}</p>
                <p v-if="!scope.row.company">暂无公司</p>
                <p>{{scope.row.phone}}</p>
                <p v-if="!scope.row.phone">暂无电话</p>
            </template>
          </el-table-column>
          <el-table-column
            label="经手业务员">
            <template slot-scope="scope">
                <p v-if="scope.row.staffInfo">{{scope.row.staffInfo.staff_name}}<span class="el-icon-edit-outline" @click="changeStaff(scope.row.staff_id,scope.row.id)"></span></p>
            </template>
          </el-table-column>
          <el-table-column
            >
            <template slot-scope="scope">
             <el-tooltip class="item" effect="dark" placement="top-start">
                 <div slot="content" style="font-size: 14px">针对当前客户修改价格：<br/>为当前客户修改对应商品价格,则当前<br/>客户在商城看到的将会是修改后的价格。</div>
                <p style="color: #1491f2;cursor:pointer" @click="goExclusive(scope.row.user_id,scope.row.id,scope.row.staff_id)">针对当前客户修改商品价格</p>
            </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="110">
            <template slot-scope="scope">
             <div class="operation">
              <el-button  type="primary" size="mini" @click="goConsumption(scope.row.user_id)">消费记录</el-button>
              <el-button type="primary" size="mini" @click="chat(scope.row)">发信息</el-button>
             </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="demonstration" v-if="customerData.length">
           <el-button @click="changeStaffArr" :disabled="disabled">批量更改业务员</el-button>
            <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
             <span v-if="customerData" class="client_Count">
                <p>共{{client_Count}}条,每页10条</p>
            </span>
        </div>
        <el-dialog width="380px" center title="编辑客户" :visible.sync="customerDialog">
            <el-form label-width="80px">
                <el-form-item label="单位名">
                    <el-input v-model="company"></el-input>
                </el-form-item>
                <el-form-item label="客户名">
                   <el-input v-model="name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="customerDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateCustomerBtn">确 定</el-button>
            </div>
        </el-dialog>
         <el-dialog width="380px" center title="修改业务员" :visible.sync="changeStaffDialog">
            <el-form label-width="100px">
                <el-form-item label="修改业务员:">
                      <el-select v-model="changeStaffForm.staffID" placeholder="请选择业务员">
                        <el-option
                        v-for="item in staffList"
                        :key="item.staff_id"
                        :label="item.staff_name"
                        :value="item.staff_id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStaffDialog = false">取 消</el-button>
                <el-button type="primary" @click="changeStaffBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
  getCustomer,
  searchCustomer,
  updateCustomer,
  staffList,
  changeStaff,
  batchChangeStaff,
  checkClientSku,
  checkSatffPermission
} from "@/api/customer/customer.js";
import {
  getchatRecord
} from "@/api/chat/chat";
import { timetrans, b64DecodeUnicode, ws ,change} from "@/utils/webSocket.js";
export default {
  data() {
    return {
      customerData: [],
      total: null,
      page: 1,
      customerDialog: false,
      staffName: null,
      id: null, //客户id
      company: null,
      name: null,
      changeStaffDialog: false,
      staffList: null,
      changeStaffForm: {
        staffID: null,
        id: []
      },
      type: null,
      customerArr: [], //多选客户更改业务员
      staff_id: null,
      disabled: true,
      message:[],
      changeSearch: false
    };
  },
  watch: {
    searchText(val) {
      this.page = 1;
      this.searchCustomerFn();
    },
    page(val) {
      this.searchCustomerFn();
    },
    customerType(val) {
      this.type = val;
      this.page = 1;
      this.searchCustomerFn();
    },
    clientId(){
      this.changeSearch = true
    }
  },
  props: ["searchText", "customerType","clientId"],
  methods: {
    chat(data) {
      console.log(data)
      if(data.staffInfo.user_id != localStorage.getItem("userId")){
         this.$message({
           type:'error',
           message: "该客户不是你跟的单。"
         })
         return;
      }
      if(data.user_id == localStorage.getItem("userId")){
         this.$message({
           type:'error',
           message: "不能和自己聊天。"
         })
         return;
      }
      //发送信息
      let val = {
        receiverId: data.user_id,
        receiverName: data.ramark_company || data.remark_name || data.nickname,
        receiverHead: data.headimgurl
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
          if(val.messageType == 7){
            val.content = JSON.parse(val.content)
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
      //选择表格
      this.disabled = val.length ? false : true;
      this.customerArr = [];
      val.forEach(val => {
        this.customerArr.push(val.id);
      });
    },
    handleCurrentChange(val) {
      //分页
      this.page = val;
    },
    goExclusive(userId,id,staff_id) {
      //去专属价页面
      checkClientSku({ client_id: staff_id,user_id:userId }).then(res => {
        if (res.data.code == 400) {
          this.$message({
            type: "error",
            message: res.data.error
          });
        } else {
          this.$router.push({ path: "exclusive", query: { id: id } });
        }
      });
    },
    goConsumption(id) {
      this.$router.push({ path: "consumption", query: { id: id } });
    },
    getCustomerFn() {
      let data = {
        staff_id: "",
        page: this.page
      };
      getCustomer(data).then(res => {
        this.customerData = res.data.data.clientsList.userList;
        this.total = res.data.data.clientsList.clientsCount * 10;
      });
    },
    searchCustomerFn() {
      //搜索
      if(this.$route.query.user_id && this.$route.query.user_id != 'no' ){
        var data = {
          user_id :this.$route.query.user_id,
          page: this.page,
          type: this.type,
        }
      }else{
        var data = {
          sel_text: this.searchText,
          page: this.page,
          type: this.type,
          staff_id: this.staff_id
        };
      }
      console.log(data)
      searchCustomer(data)
        .then(res => {
          if (res.data.data.userList) {
            this.customerData = res.data.data.userList;
          } else {
            this.customerData = res.data.data;
          }
          this.total = res.data.data.clientsCount * 10;
          this.client_Count = res.data.data.client_Count
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "您的客户列表暂无此客户。"
          });
        });
    },
    updateCustomer(id, company, name) {
      checkSatffPermission().then(res=>{
        console.log(res,"请求判断是否有权限")
        if(res.data.code != 200){
          this.$message({
            type: "error",
            message: res.data.error
          })
          return;
        }
      this.customerDialog = true;
      this.company = company;
      this.name = name;
      this.id = id;
      })
    },
    updateCustomerBtn() {
      let data = {
        id: this.id,
        company: this.company,
        name: this.name
      };
      updateCustomer(data).then(res => {
        if (res.data.code == 200) {
          this.new("修改成功");
          this.customerDialog = false;
        }else{
          this.$message({
            type: "error",
            message:res.data.error
          })
        }
      });
    },
    changeStaff(staff_id, id) {
    //  if(this.checkSatffPermissionFn().code != 200){
    //     this.$message({
    //       type: "error",
    //       message: this.checkSatffPermissionFn().data
    //     })
    //     return;
    //   }
     checkSatffPermission().then(res=>{
        console.log(res,"请求判断是否有权限")
        if(res.data.code != 200){
          this.$message({
            type: "error",
            message: res.data.error
          })
          return;
        }
      this.changeStaffForm.id = []
      this.changeStaffForm.id.push(id);
      this.changeStaffForm.staffID = staff_id;
      this.staffListFn();
      })
      //更改业务员\
     
    },
    changeStaffArr() {
       checkSatffPermission().then(res=>{
       console.log(res,"请求判断是否有权限")
        if(res.data.code != 200){
          this.$message({
            type: "error",
            message: res.data.data
          })
          return;
        }
      this.changeStaffForm.id = this.customerArr;
      this.staffListFn();
      })
      //批量修改业务员
    
    },
    changeStaffBtn() {
      //确定更改按钮
      this.$confirm("确定转移客户给这位业务员吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           batchChangeStaff(this.changeStaffForm).then(res => {
            if (res.data.code == 200) {
              this.new("更改成功");
              this.changeStaffDialog = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.error
              });
            }
          });
        })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消"
        //   });
        // });
    },
    staffListFn() {
      //获取业务员列表
      staffList().then(res => {
        this.staffList = res.data.data;
        this.changeStaffDialog = true;
      });
    },
    new(data) {
      this.$message({
        message: data,
        type: "success"
      });
      this.searchCustomerFn();
    }
  },
  mounted() {
    // if(this.clientId){
    //   alert("you")
    // }
    this.staff_id = this.$route.query.id;
    console.log(this.$route,"aaa")
    if(this.$route.query.user_id){
      return;
    }
    this.searchCustomerFn();
  },
};
</script>

<style scoped>
.allCustomer >>> .el-table th {
  background-color: #f8f8f8;
}
.allCustomer >>> .el-select {
  width: 100% !important;
}
.notes_content {
  display: flex;
  justify-content: space-between;
}
.notes_content_left {
  display: flex;
  justify-content: flex-start;
  width: 360px;
}
.customerText {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  margin-left: 10px;
}
.notes_content_right {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 120px;
}
.identity {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.identity span {
  display: flex;
  align-items: center;
  color: #999999;
  font-size: 12px;
}
.identity_img {
  text-align: center;
  width: 33px;
  display: flex;
  align-items: center;
}
.identity span img {
  height: 16px;
}
.img img {
  width: 70px;
  height: 70px;
}
.allCustomer >>> .el-button--mini,
.el-button--small {
  width: 80px;
}
.operation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.el-button + .el-button {
  margin: 5px 0;
}
.demonstration {
  text-align: center;
  margin-top: 20px;
  position: relative;
}
.demonstration button {
  position: absolute;
  left: 0;
}
.el-icon-edit-outline {
  color: #1491f2;
  font-size: 22px;
  cursor: pointer;
}
.client_Count{
    position: absolute;
    top: 50%;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    right: 0;
    font-size: 13px;
}
</style>

 

