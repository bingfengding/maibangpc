<template>
  <el-container id="setinvoice">
    <el-header class="bgFFF">
     <el-breadcrumb>
        <el-breadcrumb-item>
          发票设置
        </el-breadcrumb-item>        
      </el-breadcrumb>
    </el-header>
    <el-main>        
        <div class="choice-invoice">
            <div class="invoice-explain">
                <p>选择要开启的发票类型</p>
                <p>若全选，买家可以使用专用发票和普通发票任意一种</p>
            </div>
            <div class="invoice-type">
                <div class="invoice-left">
                    <p>增值税专用发票</p>
                </div>
                <div class="invoice-right">
                    <el-switch
                        style="display: block"
                        v-model="specialPurpose"
                        active-color="#13ce66"
                        inactive-color="#CCCCCC"                        
                        @change="special">
                    </el-switch>
                </div>                
            </div>
            <div class="invoice-type">
                <div class="invoice-left">
                    <p>增值税普通发票</p>
                </div>
                <div class="invoice-right">
                    <el-switch
                        style="display: block"
                        v-model="ordinary"                    
                        active-color="#13ce66"
                        inactive-color="#CCCCCC"                        
                        @change="general">
                    </el-switch>
                </div>                
            </div>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import notBeginning from "@/views/set/assemblys/discount/notBeginning"; //未进行
import conducting from "@/views/set/assemblys/discount/conducting"; //进行中
import { getInvoiceStatus, invoicee } from "../../api/set/setmanage";
export default {
  data() {
    return {
      active: "phone",
      currentTab: "phone",
      //默认第一的组件
      activeName: "first",
      //是否开启专用发票
      specialPurpose: false,
      //是否开启普通发票
      ordinary: false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //创建时
    getData() {
      getInvoiceStatus().then(res => {
        console.log(res);
        if (res.data.code == 200) {
          //普票
          if (res.data.data.invoice_general == 1) {
            this.ordinary = true;
          } else if (res.data.data.invoice_general == 2) {
            this.ordinary = false;
          }
          if (res.data.data.invoice_special == 1) {
            this.specialPurpose = true;
          } else if (res.data.data.invoice_special == 2) {
            this.specialPurpose = false;
          }
        }
      });
    },
    //设置专用发票
    special() {
      let status = 0;
      if (this.specialPurpose) {
        status = 1; //开启
      } else {
        status = 2; //关闭
      }
      let data = {
        type: 1, //专用发票设置
        status: status
      };
      invoicee(data).then(res => {
        this.$message({
          message: res.data.data,
          type: "success"
        });
      });
    },
    //设置普通发票
    general() {
      let status = 0;
      if (this.ordinary) {
        status = 1; //开启
      } else {
        status = 2; //关闭
      }
      let data = {
        type: 2, //普通发票设置
        status: status
      };
      invoicee(data).then(res => {
        this.$message({
          message: res.data.data,
          type: "success"
        });
      });
    }
  },
  components: {
    notBeginning,
    conducting
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
#setinvoice >>> .el-tabs__header {
  margin: 0;
}
#setinvoice >>> .el-table th {
  background-color: #f2f2f2;
}
#setinvoice >>> .el-badge__content {
  border: none;
}
#setinvoice >>> .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
#setinvoice >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
}
#setinvoice >>> .el-tabs__item {
  width: 100px;
  text-align: center;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
}
#setinvoice >>> .el-tabs__item.is-active {
  background-color: #1491f2;
  color: #fff;
}
#setinvoice >>> .el-tabs--card > .el-tabs__header {
  border: none;
}
.order-exhibition {
  position: relative;
}
.invoice-explain {
  color: #333;
}
.invoice-explain p:first-child {
  font-size: 20px;
}
.invoice-explain p:last-child {
  font-size: 14px;
  color: #333;
}
.invoice-type {
  height: 60px;
  background-color: #f8f8f8;
  width: 100%;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invoice-left p {
  font-size: 18px;
  color: #333;
  margin-left: 20px;
}
.invoice-right {
  padding-right: 20px;
}
</style>
<style lang="stylus" scoped>
#setinvoice
    .el-header
        margin-left 1px
    .el-breadcrumb
        line-height 60px
    .el-main
        height 100vh
        margin-left 10px
        margin-top 10px
        background-color #FFF
</style>