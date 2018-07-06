export default {
  state: {
    change: false,
    show_who: 3,
    if_save: false,
    if_ad_save: false,
  },
  mutations: {
    switch_change(state) {
      state.change = state.change ? false : true;
    },
    change_who(state, {
      num
    }) {
      state.show_who = num;
    },
    if_save(state) {
      state.if_save = state.if_save ? false : true;
    },
    if_ad_save(state) {
      state.if_ad_save = state.if_ad_save ? false : true;

    }
  }
};
