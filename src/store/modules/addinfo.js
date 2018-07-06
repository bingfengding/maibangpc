export default {
  state: {
    template_id: 0,
    addImgItems: {
      chooseID: -1,
      radio: 0,
      picture_relative: "",
      describe: "",
      url: "",
      productId: 0
    },
    diglogVisibleImg: false,
    changeAdd: false
  },
  mutations: {
    change_addimgitems(state, items) {
      state.addImgItems = items;
      console.log(state.addImgItems);
    },
    addinfo_change_diglogvisibleimg(state, item) {
      state.diglogVisibleImg = item ? true : false;
    },
    addinfo_change_add(state) {
      state.changeAdd = state.changeAdd ? false : true
    },
    addinfo_change_template_id(state, item) {
      state.template_id = item;
      console.log(state.template_id);
    }
  }
}
