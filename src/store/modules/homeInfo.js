export default {
  state: {
    shop_image_change: false, //店铺图片改变
    offline_store: 1, // 是否有线下网点
    secured_transaction: 1, //  是否开启担保交易
    merchantInfo: {
      shop_name: "", //店铺名称
      merchant_logo: "" //店铺logo
    },
    certification: {
      type: 1, // 认证类型（1：个人认证，2企业认证）
      status: 1 // 认证状态（1：申请中，2：已通过，3：未通过）
    }
  },
  mutations: {
    change_home_info(
      state, {
        offline_store,
        secured_transaction,
        merchantInfo,
        certification
      }
    ) {
      state.offline_store = offline_store ? offline_store : state.offline_store;
      state.secured_transaction = secured_transaction ?
        secured_transaction :
        state.secured_transaction;
      state.merchantInfo = merchantInfo ? merchantInfo : state.merchantInfo;
      state.certification = certification ? certification : state.certification;
    },
    change_image_shop_logo(state) {
      state.shop_image_change = state.shop_image_change ? false : true;
    }
  }
};
