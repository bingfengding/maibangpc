<template>
    <div class="income-card" v-if="isShowToast">
        <div class="card-content">
            <div class="header">
                <span>收支详情</span>
                <span class="close-icon" @click="closeToast"><img src="@/images/common/grayclose-icon.png" alt=""></span>
            </div>
            <div class="top-content">
                <div class="top-detail" v-if="incomeDetail.change_type == 1">
                    <p class="green" v-if="incomeDetail.status == 4">-{{incomeDetail.change_sum}}</p>
                    <p class="red" v-else>-{{incomeDetail.change_sum}}</p>
                    <p v-if="incomeDetail.status == 1">申请中</p>
                    <p v-else-if="incomeDetail.status == 2">已转账</p>
                    <p v-else-if="incomeDetail.status == 3">已到账</p>
                    <p class="red" v-else-if="incomeDetail.status == 4">提现失败</p>
                </div>
                <div class="top-detail" v-if="incomeDetail.change_type == 2 || incomeDetail.change_type == 4">
                    <p class="red">+{{incomeDetail.change_sum}}</p>
                    <p>收入金额</p>
                </div>
                <div class="top-detail" v-if="incomeDetail.change_type == 3 || incomeDetail.change_type == 5">
                    <p class="green">-{{incomeDetail.change_sum}}</p>
                    <p>支出金额</p>
                </div>
            </div>
            <div class="detail-content">
            <ul>
                <li v-for="(item,index) in incomeDetail.detail" :key="index">
                    <span>{{item[0]}}</span>
                    <span>{{item[1]}}</span>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { platformWasteBook, mchWasteBook } from "@/api/asset/asset.js";
export default {
  data() {
    return {
      isShowToast: false
    };
  },
  methods: {
    closeToast() {
      this.isShowToast = false;
    },
    showToast() {
      this.isShowToast = true;
    }
  },
  props: ["incomeDetail"]
};
</script>
<style lang="stylus" scoped>
.income-card {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
}

.card-content {
    width: 326px;
    background: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: 0 auto;

    .header {
        padding-top: 20px;
        position: relative;
        padding-left: 20px;
        color: #333333;
        font-size: 14px;

        .close-icon {
            position: absolute;
            right: 0;
            width: 50px;
            height: 30px;
            text-align: center;
        }
    }

    .top-content {
        height: 60px;
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: center;

        .top-detail {
            text-align: center;
            color: #333333;
            font-size: 14px;

            p:first-child {
                font-size: 24px;
            }

            .red {
                color: #ff0000;
            }

            .green {
                color: #72d2a8;
            }
        }
    }

    .detail-content {
        margin-top: 20px;
        min-height: 280px;

        ul {
            li {
                font-size: 14px;
                padding: 0 20px;
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #333333;
                background: #ffffff;
            }

            li:nth-child(2n-1) {
                background: #f8f8f8;
            }
        }
    }
}
</style>

