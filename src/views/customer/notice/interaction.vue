<template>
    <div class="interaction">
        <div class="noData" v-if="!inter_count">
                <p>暂无互动</p>
            </div>
        <div class="interaction_content">
            <div class="item" v-for="(item,index) in interaction" :key="index">
                <div class="item_header">
                    <span class="type">{{item.title}}</span>
                    <span class="time">{{item.interaction_time}}</span>
                </div>
                <div class="item_content" v-if="item.content">
                    <div class="item_content_left">
                      <p style="color: #999999;" class="text" v-if="item.content.content">
                          {{item.content.content}}
                      </p>
                    </div>
                    <div class="img" v-if="item.content.picture_path">
                        <img :src="item.content.picture_path">
                    </div>
                </div>
            </div>
        </div>
            <div class="pagination" v-if="inter_count">
              <el-pagination
                layout="prev, pager, next"
                 @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
            <span v-if="interaction">
                <p>共{{inter_count}}条,每页10条</p>
            </span>
        </div>
    </div>
</template>
<script>
import { getinteractionMessage } from "@/api/customer/interaction/interaction";
export default {
  data() {
    return {
      interaction: null,
      page: 1,
      total: null,
      inter_count:null
    };
  },
 watch:{
      page(){
          this.getinteractionMessageFn()
      }
  },
  methods: {
    handleCurrentChange(val){
          this.page = val
      },
    //请求通知列表
    getinteractionMessageFn() {
      let data = {
        page: this.page
      };
      getinteractionMessage(data).then(res => {
        this.interaction = res.data.data.list;
        this.total = res.data.data.pageNum * 10;
        this.inter_count = res.data.data.inter_count 
      });
    }
  },
  created() {
    this.getinteractionMessageFn();
  }
};
</script>
<style scoped>
.noData {
  width: 550px;
  height: 80px;
  font-size: 14px;
  line-height: 80px;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  border-radius: 5px;
  color: #666666;
}
.interaction {
  min-height: 100%;
  background: white;
}
.interaction_content {
  min-height: 100%;
}
.item {
  width: 550px;
  height: 120px;
  background-color: #f2f2f2;
  border: 5px;
  padding: 10px;
  font-size: 14px;
  margin-top: 10px;
}
.interaction_item_left_data {
  display: flex;
  justify-content: space-between;
}
.item_header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 15px;
  margin-bottom: 10px;
}
.item_content_left {
  width: 395px;
  font-size: 14px;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.img img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}
.item_content {
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 12px;
}
.pagination {
  width: 550px;
  text-align: center;
  font-size: 13px;
  position: relative;
  margin-top: 20px;
}
.pagination span {
  position: absolute;
  top: 50%;
  height: 20px;
  margin-top: -10px;
  line-height: 20px;
  right: 0;
}
</style>
