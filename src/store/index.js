import Vue from "vue";
import Vuex from "vuex";
import chat from "./modules/chat";
import permission from "./modules/permission";
import usersModule from "./modules/usersModule";
import shopinstall from "./modules/shopinstall";
import homeInfo from "./modules/homeInfo";
import share from "./modules/share";
import getters from "./getters";
import addinfo from "./modules/addinfo";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //state
    activeSidebar: ""
  },
  mutations: {},
  modules: {
    chat,
    permission,
    usersModule,
    shopinstall,
    homeInfo,
    share,
    addinfo
  },
  getters,
  actions: {}
});
