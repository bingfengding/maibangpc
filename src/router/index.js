import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

// console.log(process);
const _import = require("./_import_" + process.env.NODE_ENV);

const Layout = _import("layout/Layout");
//  登录页面
const login = _import("login/login");
const modify = _import("login/modify");
const reg = _import("login/reg");
const chooseShop = _import("login/chooseShop");
const protocol = _import("login/protocol");

//  首页界面
const home = _import("home/home");

//商城界面
const shop = _import("shop/shop");
const shopprofile = _import("shop/shopprofile");
const shopinfo = _import("shop/shopinfo"); // 店铺信息
const shopinstall = _import("shop/shopinstall/shopinstall");
const shopinstallhome = _import("shop/shopinstall/shopinstallhome");
const shopinstalladdinfo2 = _import("shop/shopinstall/shopinstalladdinfo2");
const shopinstalladdinfo3 = _import("shop/shopinstall/shopinstalladdinfo3");
const shopinstalladdinfo4 = _import("shop/shopinstall/shopinstalladdinfo4");
const shopauthentication = _import("shop/shopauthentication");
const shopauthenticationsuccess = _import("shop/shopauthenticationsuccess"); // 认证成功
const shopauthenticationerror = _import("shop/shopauthenticationerror"); // 个人认证界面
const shopAuthenticationEnterprise = _import("shop/shopauthenticationenterprise"); //企业认证
const shoppublic = _import("shop/shoppublic");
const shopprogram = _import("shop/shopprogram");
const shoppayment = _import("shop/shoppayment");
const shopnotice = _import("shop/shopnotice");
const shopmember = _import("shop/shopmember");
const shopaddress = _import("shop/shopaddress");
const shopSectorMember = _import("shop/shopSectorMember");
const shopOfflineOnline = _import("shop/shopOfflineOnline"); //线下网点
//商品界面
const goods = _import("goods/goods");
const goodsadmin = _import("goods/goodsadmin");
const classificationManagement = _import("goods/classificationManagement");
const freightManagement = _import("goods/freightManagement");
const publishProduct = _import("goods/publishProduct");
const addShippingTemplate = _import("goods/addShippingTemplate");
const applicableModels = _import("goods/applicableModels");
const productpreview = _import("goods/productpreview");
//订单界面
const order = _import("order/order");
const orderprofile = _import("order/orderprofile");
const orderrefund = _import("order/orderrefund"); //退款订单
const refunddetail = _import("order/refunddetail"); //退款详情
const orderdetail = _import("order/orderdetail"); //订单详情

//资产界面
const asset = _import("asset/asset");
const assetme = _import("asset/assetme");
const income = _import("asset/income");
const withdraw = _import("asset/withdraw");
const toBeSettled = _import("asset/toBeSettled");
const accountList = _import("asset/cashAccount/accountList");
const addAccount = _import("asset/cashAccount/addAccount");
const orderService = _import("asset/orderService"); //  订购服务


//客户界面
const customer = _import("customer/customer");
const notice = _import("customer/notice"); //通知
const customerList = _import("customer/customerList");
const expandCustomer = _import("customer/expandCustomer");
const consumption = _import("customer/customerList/consumption");
const exclusive = _import("customer/customerList/exclusive");
//数据界面
const data = _import("data/data");
const salesTrend = _import("data/salesTrend");
const statistical = _import("data/statistical");
//设置界面
const set = _import("set/set");
const setshopinfo = _import("set/setshopinfo"); //修改密码
const setfeedback = _import("set/setfeedback"); //问题反馈
const setabout = _import("set/setabout"); //关于我们

//个人中心
const userinfo = _import("user/index"); //个人中心
const user = _import("user/user"); //个人中心
const changePhone = _import("user/changePhone"); //更改手机号
const userhelpHome = _import("user/userhelp/index"); //用户帮助中心
const realNameAuthentication = _import("user/authentication/realNameAuthentication"); //用户帮助中心


const setvrificationphone = _import("set/setvrificationphone"); //验证手机号
const setModifyPwd = _import("set/setModifyPwd"); //修改密码
const browseTheGoods = _import("set/browseTheGoods"); //商品浏览
const setbulletinsetting = _import("set/setbulletinsetting"); //公告设置
const setlogistics = _import("set/setlogistics"); //物流设置
const setinvoice = _import("set/setinvoice"); //发票设置setdiscountgoods
const setdiscountgoods = _import("set/setdiscountgoods"); //编辑折扣商品
Vue.use(Router);

export const RouterMap = [{
    path: "",
    redirect: "home"
  },
  {
    path: "/home",
    name: "home",
    component: Layout,
    children: [{
      path: "",
      component: home,
      name: "home",
      meta: {
        title: "概况"
      }
    }]
  },
  // 用户协议
  {
    path: "/protocol",
    component: protocol,
    meta: {
      requireAuth: true
    }
  },
  // 登录页面
  {
    path: "/login",
    component: login,

    meta: {
      requireAuth: true
    }
  },
  // 注册页面
  {
    path: "/reg",
    component: reg,

    meta: {
      requireAuth: true
    }
  },
  // 修改密码页面
  {
    path: "/modify",
    component: modify,
    meta: {
      requireAuth: true
    }
  },
  // 选择店铺界面
  {
    path: "/chooseShop",
    component: chooseShop,
    meta: {
      requireAuth: true
    }
  },
  //跳转商城

  {
    path: "/shop",
    component: Layout,
    name: "店铺管理",
    children: [{
        path: "/shop/",
        redirect: "/shop/profile"
      },
      {
        path: "/shop/profile",
        component: shopprofile,
        name: "店铺概况",
        noCache: false
      },
      {
        path: "/shop/info",
        component: shopinfo,
        name: "店铺资料",
        noCache: false
      },
      {
        path: "/shop/install",
        component: shopinstall,
        name: "店铺装修",
        noCache: false,
        children: [{
            path: "",
            redirect: "home",
            name: "店铺装修"
          },
          {
            path: "home",
            component: shopinstallhome,
            name: "店铺装修",

          },
          // {
          //  path: "switch2",
          //  component: shopinstallswitch2,
          //  name: "店铺装修"
          //  },
          {
            path: "addinfo2",
            component: shopinstalladdinfo2,
            name: "店铺装修"
          },
          {
            path: "addinfo3",
            component: shopinstalladdinfo3,
            name: "店铺装修"
          }, {
            path: "addinfo4",
            component: shopinstalladdinfo4,
            name: "店铺装修"
          }

        ]
      },
      {
        path: "/shop/authentication",
        component: shopauthentication,
        name: "主体认证",
        noCache: true,
        children: [{
            path: "",
            redirect: "enterprise",
            name: "主体认证"
          },
          // {
          //   path: "success",
          //   component: shopauthenticationsuccess,
          //   name: "主体认证"
          // },
          // {
          //   path: "error",
          //   component: shopauthenticationerror,
          //   name: "主体认证",

          // }, 
          {
            path: "enterprise",
            component: shopAuthenticationEnterprise,
            name: "主体认证"
          }
        ]
      },
      {
        path: "/shop/public",
        component: shoppublic,
        name: "公众号",
        noCache: false
      },
      {
        path: "/shop/program",
        component: shopprogram,
        name: "小程序",
        noCache: false
      },
      {
        path: "/shop/payment",
        component: shoppayment,
        name: "支付方式",
        noCache: false
      },
      {
        path: "/shop/notice",
        component: shopnotice,
        name: "交易和物流通知",
        noCache: false
      },
      {
        path: "/shop/member",
        component: shopmember,
        name: "店铺成员",
        noCache: false
      },
      {
        path: "/shop/address",
        component: shopaddress,
        name: "商家地址库",
        noCache: false,
      },
      {
        path: "/shop/offlineonline",
        component: shopOfflineOnline,
        name: "线下网点管理",
        noCache: false,
      },
      {
        path: "/shop/shopSectorMember",
        component: shopSectorMember,
        noCache: false
      }
    ]
  },
  //  跳转商品
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods",
    name: "店铺管理",
    children: [{
        path: "",
        redirect: "admin"
      },
      {
        path: "/goods/admin",
        component: goodsadmin,
        name: "商品管理",
        meta: {
          share: true
        }
      },
      {
        path: "/goods/classificationManagement",
        component: classificationManagement,
        name: "分类管理"
      },
      {
        path: "/goods/freightManagement",
        component: freightManagement,
        name: "运费管理"
      },
      {
        path: "publishProduct",
        component: publishProduct,
        children: [{
          path: "productpreview",
          component: productpreview
        }]
      },
      {
        path: "addShippingTemplate",
        component: addShippingTemplate
      },
      {
        path: "applicableModels",
        component: applicableModels
      },

    ]
  },
  //  跳转订单
  {
    path: "/order",
    component: Layout,
    redirect: "/order",
    name: "订单管理",
    children: [{
        path: "",
        redirect: "profile"
      },
      {
        path: "profile",
        component: orderprofile,
        name: "全部订单"
      },
      {
        path: "refund",
        component: orderrefund,
        name: "退款订单"
      },
      {
        path: "reddetail",
        component: refunddetail
      },
      {
        path: "orddetail",
        component: orderdetail
      }
    ]
  },

  //  跳转资产
  //  跳转资产
  {
    path: "/asset",
    component: Layout,
    redirect: "/asset",
    name: "我的金库",
    children: [{
        path: "",
        redirect: "me"
      },
      {
        path: "me",
        component: assetme,
        name: "我的金库"
      }, {
        path: "withdraw",
        component: withdraw,
        name: "提现"
      }, {
        path: "toBeSettled",
        component: toBeSettled,
        name: "待结算"
      }, {
        path: "income",
        component: income,
        name: "收支明细"
      },
      {
        path: "accountList",
        component: accountList,
      }, {
        path: "addAccount",
        component: addAccount,
      },
      {
        path: "service",
        component: orderService,
        name: "订购服务"
      }

    ]
  },


  //  跳转客户
  {
    path: "/customer",
    component: Layout,
    redirect: "/customer",
    name: "客户",
    children: [{
        path: "",
        redirect: "customerList"
      },
      {
        path: "customerList",
        component: customerList,
        name: "客户列表",
        meta: {
          requireAuth: true
        },
        children: []
      },
      {
        path: "notice",
        component: notice,
        name: "通知信息",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "expandCustomer",
        component: expandCustomer,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "consumption",
        component: consumption,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "exclusive",
        component: exclusive,
        meta: {
          requireAuth: true
        }
      }
    ]
  },

  //  跳转数据
  {
    path: "/data",
    component: Layout,
    redirect: "/data",
    name: "数据",
    children: [{
        path: "",
        redirect: "index",
      },
      {
        path: "index",
        component: salesTrend,
        name: "销售趋势"
      },
      {
        path: "statistical",
        component: statistical,
        name: "销售统计"
      }
    ]
  },


  //  跳转设置
  {
    path: "/set",
    component: Layout,
    redirect: "/set",
    name: '设备管理',
    children: [{
        path: "/set",
        redirect: "shopinfo"
      },
      {
        path: "/set/shopinfo",
        component: setshopinfo,
        name: '折扣设置',
      },
      {
        path: "/set/setbulletinsetting",
        component: setbulletinsetting,
        name: '公告设置',
      },
      {
        path: "/set/setlogistics",
        component: setlogistics,
        name: '物流设置',
      },
      {
        path: "/set/setinvoice",
        component: setinvoice,
        name: '发票设置',
      },
      {
        path: "/set/setvrificationphone",
        component: setvrificationphone,
        name: '修改密码',
      },
      {
        path: "/set/feedback",
        component: setfeedback,
        name: '问题反馈',
      },
      // 个人中心
      {
        path: "/set/userinfo",
        component: userinfo,
        name: "个人中心",
        children: [
          // 更改手机号
          {
            path: "",
            redirect: "index",
          },
          {
            path: "index",
            component: user,
            name: "个人中心"
          },
          {
            path: "changePhone",
            component: changePhone,
            name: "个人中心",
            meta: {
              title: "更改手机号"
            }
          }, {
            path: "realNameAuthentication",
            component: realNameAuthentication,
            name: "个人中心",
            meta: {
              title: "实名认证"
            }
          },

        ]
      },

      {
        path: "/set/about",
        component: setabout,
        name: '关于我们',
      },
      {
        path: "setModifyPwd",
        component: setModifyPwd,
      },
      {
        path: "setdiscountgoods",
        component: setdiscountgoods,
      },
      {
        path: "browseTheGoods",
        component: browseTheGoods,
      },

    ]
  }, {
    path: "/userhelpHome",
    component: userhelpHome,
    meta: {
      title: "帮助中心"
    }
  }

];

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: RouterMap
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (
      store.state.usersModule.currentUser.UserToken &&
      store.state.usersModule.currentUser.UserStoreId
    ) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else if (
      store.state.usersModule.currentUser.UserToken &&
      !store.state.usersModule.currentUser.UserStoreId
    ) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
