<template>
  <!-- 店铺成员 -->
  <el-container id="shopMember">
    <el-header class="header">
       <p>店铺成员</p>
    </el-header>
    <el-main class="shopMember_content">
      <div  class="shopMember_content_left">
      <div class="shopMember_content_header">
        <el-button type="primary" size="small" @click="staffBtn('create')">添加成员</el-button>
        <el-button type="primary" size="small" @click="DepartmentBtn('create')">新增部门</el-button>
      </div>
      <div class="showMember_content_taber">
        <el-table
          :data="departmentData"
           @row-click="rowClick"
         >
            <el-table-column
                width="55">
            </el-table-column>
            <el-table-column min-width="70">
              <template slot-scope="scope">
                <div class="img">
                  <img src="@/images/member/dem.png">
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="department_name"
            min-width="100"
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="departSum"
            min-width="100"
            label="人数">
          </el-table-column>
          <el-table-column
            prop="add_time"
            width="250"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作"
              width="190">
            <template slot-scope="scope">
               <el-button @click.stop="DepartmentBtn('update',scope.row.department_name,scope.row.id)" type="primary" size="mini">编辑</el-button>
              <el-button type="primary" size="mini" @click.stop="delDepartment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 成员 -->
        <div class="br" style="background: #f2f2f2;height: 10px;width: calc(100% + 20px);margin-left: -10px;margin-top: 5px"></div>
        <component-member :stf="staffData"  @refresh="getMembersListFn"></component-member>
      </div>
      </div>
    </el-main>
    <!-- 部门弹框 -->
    <el-dialog :title="departmentTitle" :visible.sync="departmentDislog" center width="25%">
      <el-input  auto-complete="off" v-model="departmentName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="departmentDislog = false">取 消</el-button>
        <el-button type="primary" @click="departmentOK">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 成员弹框 -->
    <el-dialog :title="staffType" :visible.sync="staffDislog" width="455px"  :before-close="close" class="staffDislog">
  <el-form :model="staffForm" :rules="rules" ref="staffForm">
    <el-form-item label="电话:" label-width="75px" prop="phone">
      <el-input v-model="staffForm.phone" auto-complete="off" placeholder="请输入电话号码"></el-input>
    </el-form-item>
     <el-form-item label="验证码:" label-width="75px" prop="verifyCode">
      <el-input v-model="staffForm.verifyCode" auto-complete="off" placeholder="请输入验证码"></el-input>
      <el-button class="getCodeBtn" type="text" @click="getCodeBtn" :disabled="disabled">{{codeText}}</el-button>
    </el-form-item>
     <el-form-item label="姓名:" label-width="75px" prop="name">
      <el-input v-model="staffForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
    </el-form-item>
     <el-form-item label="职位:" label-width="75px" prop="position">
      <el-input v-model="staffForm.position" auto-complete="off" placeholder="请输入职位"></el-input>
    </el-form-item>
     <el-form-item label="部门:" label-width="75px" prop="department">
      <el-select v-model="staffForm.department" placeholder="请选择部门">
        <el-option
          v-for="item in departmentData"
          :key="item.id"
          :label="item.department_name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="权限:" label-width="70px">
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
 
  </el-container>
</template>

<script>
import {
  getMembersList,
  getDepartmentsList,
  createStaff,
  verifyCode,
  permissions,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  deleteStaff,
  updateStaff,
  stopStaff,
  staffdetails
} from "@/api/shop/members/members";
import componentMember from './component_member.vue';
export default {
  data() {
    return {
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
      codeText: "获取验证码",
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
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
           verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
          ],
       }
    };
  },
  components:{componentMember},
  methods: {
    
    rowClick(row, event, column){
      this.$router.push({path: 'shopSectorMember',query:{id:row.id,name:row.department_name}})
    },
    stopStaffBtn(id){
      let data = {
         staffId:id
      }
      stopStaff(data).then(res=>{
        this.new("修改成功")
      })
    },
    getMembersListFn() {
      getMembersList().then(res => {
        //请求成员列表
        this.departmentData = res.data.data.departments;
        res.data.data.departments.forEach(val=>{
         val.add_time = this.timetrans(val.add_time)
        })
        this.staffData = res.data.data.staffs.staffs;
      });
    },
    createStaffFn() {
      //创建成员方法
      createStaff(this.staffForm).then(res => {
        if(res.data.code == 200){
           this.new("添加成功")
        }else{
           this.$message({
            type: "error",
            message: res.data.error
          });
        }
      });
    },
    updateStaffFn(){
      let data = {
        
      }
       updateStaff().then(res=>{
       })
    },
    staffIsOk() {
      //创建成员按钮
      if(this.staffType == '添加成员'){
        this.$refs['staffForm'].validate((valid) => {
          if (valid) {
            this.createStaffFn();
          } else {
            return;
          }
          this.staffDislog = false;
        });
      }else{
         this.updateStaffFn()
         this.staffDislog = false;
      }
    },
    //获取验证码
    getCodeBtn() {
      if(!this.staffForm.phone){
        this.$message({
          type: "error",
          message: "请输入手机号码"
        })
        return;
      }
      let data = {
        phone: this.staffForm.phone
      };
      verifyCode(data).then(res => {
        if(res.data.code == 500){
           this.$message({
          type: "error",
          message: res.data.error
        })
        return;
        }
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
      this.$confirm("删除后将无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            staffId: id
          }
          deleteStaff(data).then(res=>{
            if(res.data.code == 200){
             this.new("删除成功")
            }else{
               this.$message({
                type: "error",
                message: res.data.error
              });
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    // 创建成员
    staffBtn(type,id) {
      if (type == "create") {
         this.staffForm.permissions = []
         this.checkCompetenceArr = []
        this.staffType = "添加成员";
      } else {
        let data = {
          staffId: id
        }
        staffdetails(data).then(res=>{
          this.staffType = "编辑成员";
          this.staffForm = res.data.data
        })
       
      }
      this.staffDislog = true;
      this.CompetenceDislog = false;
    },
    //显示权限表
    showCompetence() {
      this.checkCompetenceArr = this.staffForm.permissions;
      this.CompetenceDislog = !this.CompetenceDislog;
    },
    // 关闭权限表
    hideCompetenceDislog() {
      this.checkCompetenceArr = []
      this.CompetenceDislog = false;
    },
    selectDescription(value) {
      //选择权限
      console.log(this.checkCompetenceArr)
    },
    selectDescriptionBtn() {
      //确定选择权限
      this.staffForm.permissions = this.checkCompetenceArr;
      this.CompetenceDislog = false;
    },
    close() { //关闭成员弹框
      this.$confirm("未保存是否退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs['staffForm'].resetFields()
          this.staffDislog = false;
        })
        .catch(() => {});
    },
  
      //创建部门和编辑部门
    DepartmentBtn(type,name,id) {
      if (type == "create") {
        //创建部门的操作
        this.departmentName = ''
        this.departmentTitle = "新增部门";
      } else {
        this.departmentTitle = "编辑部门";
        this.departmentName = name
        this.departmentId = id
      }
      this.departmentDislog = true;
    },
    departmentOK(){ //保存添加部门 、编辑部门
        if(this.departmentTitle == '新增部门'){
          let data = {
            departmentName: this.departmentName
          }
          createDepartment(data).then(res=>{
            if(res.data.code == 200){
              this.new("新增成功")
            }else{
              this.$message({
                type: 'error',
                message: res.data.error
              })
            }
             
          })
        }else{
          let data = {
               departmentId: this.departmentId,
                departmentName: this.departmentName
          }
           updateDepartment(data).then(res=>{
             if(res.data.code != 200){
               this.$message({
                 type: 'error',
                 message: res.data.error
               })
             }else{
               this.new("修改成功")
             }
          })
        }
    },
    delDepartment(id){ //删除部门
     this.$confirm("删除部门不会删除部门里的成员，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            departmentId:id
          }
          deleteDepartment(data).then(res=>{
                this.new("删除成功")
          })
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    new(value){
      this.getMembersListFn();
          this.departmentDislog = false;
          this.$message({
            message: value,
            type: 'success'
      });
    },
    timetrans(date){
        var date = new Date(date*1000);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
   }
  },
  mounted() {
    this.getMembersListFn();
    this.permissionsFn();
  }
};
</script>
<style scoped>

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
  font-size: 14px
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
  padding: 10px;
}
.showMember_content_taber >>> .el-table th {
  background-color: #f8f8f8;
}
.showMember_content_taber >>> .el-table__row{
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
  color: #00cc00;
  background: #00cc00;
  border-color: #00cc00;
}
.CompetenceDislog_content >>> .el-checkbox__inner {
  border-radius: 50%;
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
</style>
