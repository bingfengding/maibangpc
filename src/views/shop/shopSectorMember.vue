<template>
    <div class="sectorMember">
          <el-header class="header">
            <router-link to="member" tag="span" style="color: #1491f2;cursor:pointer">店铺成员</router-link><span>/{{$route.query.name}}</span>
          </el-header>
        <div class="sectorMember">        
       <component-member :isDepartmentId="departmentId"></component-member>
        <!-- <div class="page">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="50">
          </el-pagination>
        </div> -->
        </div>
    </div>
</template>
<script>
import { getDepartmentStaff } from "@/api/shop/members/members";
import componentMember from './component_member.vue';
export default {
  data() {
    return {
      staffData: [],
      total: 0,
      page: 1,
      departmentId: this.$route.query.id
    };
  },
  watch:{
    page(){
      this.getDepartmentStaffFn()
    }
  },
  components:{ componentMember },
  methods: {
     handleCurrentChange(val){//分页
         this.page = val
      },
    getDepartmentStaffFn() {
      let data = {
        departmentId: this.$route.query.id,
        page: this.page
      };
      getDepartmentStaff(data).then(res => {
          this.staffData = res.data.data.staffs.staffs
          this.total = res.data.data.staffs.totalCount
      });
    }
  },
  mounted() {
    // this.getDepartmentStaffFn();
  }
};
</script>

<style lang="stylus">
.sectorMember {
  img{
    width: 60px;
    height 60px
  }  
  .header {
    width: 100%;
    background: white;
    height: 60px;
    border-left: 1px solid #f2f2f2;
    line-height: 60px;
    font-size 14px
  }
  .sectorMember{
    margin: 10px
    padding 10px
    background white
    min-height 600px
    .el-table th {
      background-color: #f8f8f8;
    }
  }
}
</style>
