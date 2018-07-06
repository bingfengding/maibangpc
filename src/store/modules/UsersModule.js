import {
  login
} from "@/api/login/login";
import {
  getCookie
} from "utils/cookies";
export default {
  state: {
    currentUser: {
      get userAvatar() {
        return localStorage.getItem("userAvatar");
      },
      get userName() {
        return localStorage.getItem("currentUser_name");
      },
      get UserToken() {
        return getCookie();
      },
      get UserStoreId() {
        return localStorage.getItem("storeId");
      },
    },
    phone: "",
    userName: "",
    userAvatar: ""
  },
  mutations: {
    setUser(state, {
      user_name,
      user_token
    }) {
      // 在这里把用户名和token保存起来
      localStorage.setItem("currentUser_name", user_name);
      localStorage.setItem("currentUser_token", user_token);
    },
    outUser(state) {
      localStorage.clear();
    },
    setstoreId(state, {
      store_id
    }) {
      localStorage.setItem("storeId", store_id);
    },
    setPhone(state, {
      phone
    }) {

      state.phone = phone;

    },
    setUserName(state, name) {
      state.userName = name;
      localStorage.setItem("userName", name);
    },
    setUserAvatar(state, avatar) {
      state.userAvatar = avatar;
      localStorage.setItem("userAvatar", avatar);
    }

  },
  actions: {
    userLogin(context, {
      user_name,
      user_pass
    }) {
      login(user_name, user_pass).then((result) => {

        if (result.data.code == 200) {
          let token = result.data.data.token;
          if (token != "") {
            context.commit("setUser", {
              "user_name": user_name,
              "user_token": token
            })
          }

          // this.$router.push({
          //   path: "/"
          // }); //登录成功之后重定向到首页

        } else {
          return Promise.reject(result)
        }

      })
    }
  }
}
