<template>
  <!-- 公众号 -->
  <el-container id="shopPublic">
    <!-- header头 -->
    <el-header class="bgFFF">
     <el-breadcrumb>
        
        <el-breadcrumb-item>
          微信公众号
        </el-breadcrumb-item>
        
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-row class="mainBody bgFFF">
          <!-- 判断是否绑定公众号 -->
          <el-row type="flex" justify="space-between" v-if="if_modify">
            <el-col :span="14" class="shopBinding">
              <p class="colorGreen">绑定微信公众号，把店铺和微信打通</p>
              <p>绑定后即可在这里管理你的公众号，汽配帮手提供比微信官方后台更强大的功能！</p>
              <div>
                <el-button 
                  type="success"  
                  @click="bindingPublic"
                  v-if="show"
                >我有微信公众号,立即设置</el-button>
                <div class="successText" v-else>
                  <span>
                    <i class="el-icon-circle-check"></i>恭喜你授权成功“{{weixin_mp_nickname}}”服务号
                  </span>
                  <div style="display:inline-block"><el-button type="success" @click="sureModify">自定义菜单</el-button>
                  <el-button type="success" @click="reBinding" plain>切换账号</el-button></div>
                  
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="font14 shopPrompt">
              <p>温馨提示：</p>
              <ul>
                <li>
                  一个公众号只能和一个店铺绑定
                </li>
                <li>
                  为保证所有功能正常，授权时请保持默认选择，把权限统一授权给汽配帮手
                </li>
              </ul>
            </el-col>
          </el-row>
          <!-- 判断是否绑定公众号结束 -->
          <!-- 公众号设置界面 -->
          <el-row v-else class="customPublic">
            <el-col class="customPublicHeader">
              <p>
                <i class="el-icon-warning blue"></i> 
                您的每次操作都会实时保存到当前页面以便预览，若要在公众号上生效，请修改后点击“提交发布”
              </p>
            </el-col>
            <el-col class="customPublicMain">
              <el-row type="flex" justify="start">
                <!-- 左侧手机页面 -->
                <el-col :span="8" class="phonePage">
                  <div>
                    <img src="../../assets/shop/public_02.png" alt="">
                  </div>
                  <div class="phonePageMain">
                  </div>
                  <div class="phonePageFooter">
                    <el-row type="flex" justify="start">
                      <el-col class="keyboard" :span="2">
                        <el-row type="flex" justify="center">
                          <img src="../../assets/shop/public_01.png" alt="">
                        </el-row>
                      </el-col>
                      <el-col class="phonePageSelect" :span="22">
                        <el-row 
                          type="flex" 
                          justify="start"
                          class="phonePageSelectItems"
                        >
                        <!--  draggable="true"
                            @dragstart.capture.native="handleDragStart($event, item)"
                            @dragover.capture.native="handleDragOver($event, item)"
                            @dragenter.capture.native="handleDragEnter($event, item)" 
                            @dragend.capture.native="handleDragEnd($event, item)" -->
                          <draggable 
                            v-model="items" 
                            :move="getdata"
                            @update="datadragEnd"
                            :options="{animation: 200,handle:'.normalMenu',filter :'.baseItem',
                            draggable:'.normalMenu'}" 
                            class="draggable">
                            <transition-group name="list-complete">
                              <el-col
                                v-for="(item,index) in items"
                                :key="index"
                                @click.capture.native="menuChindMore[index]?'':modifyMenu(index)"
                                class="normalMenu list-complete-item"
                                >
                                {{item.name}}
                                <el-row type="flex" justify="center" class="chindItems">
                                  <draggable 
                                    v-model="item.sub_button" 
                                    :move="getdata"
                                    :options="{animation: 200,handle:'.normalChindItem',
                                    filter :'.baseChindItem'}"
                                    @update="datadragEnd" 
                                    class="draggableChind">             
                                    <transition-group tag="ul">
                                    <!--  draggable="true"
                                      @dragstart.stop="handleChindDragStart($event, value,index)"
                                      @dragover.stop.prevent="handleChindDragOver($event,value,index)"
                                      @dragenter.stop="handleChindDragEnter($event,value,index)" 
                                      @dragend.stop="handleChindDragEnd($event, value,index)" -->
                                    <li 
                                      class="textCen normalChindItem" 
                                      v-for="(value,key) in item.sub_button" :key="key"
                                      @click="modifyChindMenu(index,key)"
                                    >
                                      {{value.name}}
                                    </li>
                                    <li 
                                      key="baseChindItem"
                                      class="baseChindItem textCen"
                                      v-if="menuChindMore[index]!=5"
                                      @click.stop="newAddChindMenu(index)"
                                    >
                                      <i class="el-icon-plus"></i>
                                    </li>
                                    <div class="triangle" key="triangle"></div>
                                    </transition-group>
                                
                                </draggable>
                                </el-row> 
                              </el-col>
                              <el-col 
                              class="baseItem pointer"
                              @click.native="newAddMenu"
                              key="baseItem"
                              v-show="menuMore!=3"
                            >
                              <i class="el-icon-plus"></i>
                            </el-col>
                            </transition-group>
                            </draggable>
                            
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <!-- 添加菜单页面 -->
                <el-col :span="12" class="selectitems" v-show="selectitemsShow">
                  <el-row type="flex" justify="space-between" class="selectitemsHeader">
                    <span>菜单名称</span>
                    <span class="pointer" @click="removeMenu">删除菜单</span>
                  </el-row>
                  <el-row class="selectitemsMain">
                    <el-col class="selectitemsMainName">
                      <el-row type="flex" justify="start">
                        <span class="font14">菜单名称</span>
                        <el-input 
                          size="small"
                          placeholder="请输入菜单名称"
                          v-model="name"
                          maxlength="8"
                        >
                        </el-input>
                      </el-row>
                      <p class=" color999">字数不超过4个汉字或8个字母</p>
                    </el-col>
                    <el-col class="selectitemsMainUrl">
                      <el-row type="flex" justify="start">
                      <span class="font14">跳转链接</span>
                      <el-select 
                        size="small"
                        v-model="optionsValue" 
                        placeholder="请选择链接地址">
                        <el-option
                          v-for="urls in options"
                          :key="urls.url"
                          :label="urls.value"
                          :value="urls.url">
                        </el-option>
                      </el-select>
                      </el-row>
                    </el-col>
                    <el-col class="saveInfo">
                      <el-row type="flex" justify="start">
                        <span class="font14"></span>
                        <el-button type="primary" size="small" @click="saveItems">保存</el-button>
                      </el-row>
                    </el-col>
                  </el-row>
                   <div class="triangle"></div>
                </el-col>
                 <!-- 添加子菜单页面 -->
                <el-col :span="12" class="selectitems" v-show="selectitemsChindShow">
                  <el-row type="flex" justify="space-between" class="selectitemsHeader">
                    <span>子菜单名称</span>
                    <span class="pointer" @click="removeChindMenu">删除子菜单</span>
                  </el-row>
                  <el-row class="selectitemsMain">
                    <el-col class="selectitemsMainName">
                      <el-row type="flex" justify="start">
                        <span class="font14">子菜单名称</span>
                        <el-input 
                          size="small"
                          placeholder="请输入子菜单名称"
                          v-model="chindName"
                          maxlength="14"
                        >
                        </el-input>
                      </el-row>
                      <p class=" color999">字数不超过7个汉字或14个字母</p>
                    </el-col>
                    <el-col class="selectitemsMainUrl">
                      <el-row type="flex" justify="start">
                      <span class="font14">跳转链接</span>
                      <el-select 
                        size="small"
                        v-model="optionsChindValue" 
                        placeholder="请选择链接地址">
                        <el-option
                          v-for="urls in options"
                          :key="urls.url"
                          :label="urls.value"
                          :value="urls.url">
                        </el-option>
                      </el-select>
                      </el-row>
                    </el-col>
                    <el-col class="saveInfo">
                      <el-row type="flex" justify="start">
                        <span class="font14"></span>
                        <el-button type="primary" size="small" @click="submitChindMenu">保存</el-button>
                      </el-row>
                    </el-col>
                  </el-row>
                   <div class="triangle"></div>
                </el-col>
              </el-row>
              <el-row class="customPublicMainFooter">
                <el-col :span="6">  
                  <el-row type="flex" justify="center"> <el-button type="info" plain size="small">菜单排序</el-button></el-row>
                 
                </el-col>
                <el-col :span="10" v-show="selectitemsShow ||selectitemsChindShow">
                  <el-row type="flex" justify="center">
                    <el-button type="primary" size="small" @click="submitMenuAdd">提交发布</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 公众号设置界面结束 -->
        </el-row>
      </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
import {
  menu,
  submitMenu,
  checkPermissions,
  wechatBindingInfo
} from "api/shop/public";
import { getMerchantNameLogo } from "api/home/home";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      dragging: null,
      draggingChind: null,
      weixin_mp_nickname: "",
      if_Jurisdiction: false, //判断是否拥有权限修改
      isMerchantOrderServic: false, //是否购买了专业版
      merchant_id: 0, //商品ID
      selectitemsChindShow: false, //子菜单界面
      index: 0, //判断是否传入了参数
      key: 0,
      menuMore: 0, //用来判断是否隐藏添加菜单按钮
      menuChindMore: [], //用来判断是否隐藏菜单按钮
      type: "view",
      selectitemsShow: false, //是否显示菜单
      name: "", //菜单名
      chindName: "", //子菜单名
      optionsValue: "", //链接地址
      optionsChindValue: "", //子菜单链接
      show: true, //是否判定
      if_modify: true, //切换页面
      storeId: 0, //店铺id
      items: [], //菜单列表
      options: [
        // 跳转链接
        {
          value: "商品首页",
          lable: 1,
          url: ""
        },
        {
          value: "个人中心",
          lable: 2,
          url: ""
        },
        {
          value: "购物车",
          lable: 3,
          url: ""
        },
        {
          value: "车型查询",
          lable: 4,
          url: ""
        }
      ]
    };
  },
  created() {
    this.initial();
  },
  mounted() {},
  methods: {
    // 初始化
    initial() {
      this.storeId = window.localStorage.getItem("storeId");
      this.options = [
        {
          label: 1,
          value: "商城首页",
          url:
            "https://weixin.ymaibang.com/open/component_oauth.php?merchant_id=" +
            this.storeId +
            "&diff=first"
        },
        {
          label: 2,
          value: "个人中心",
          url:
            "https://weixin.ymaibang.com/open/component_oauth.php?merchant_id=" +
            this.storeId +
            "&diff=personal_center"
        },
        {
          label: 3,
          value: "购物车",
          url:
            "https://weixin.ymaibang.com/open/component_oauth.php?merchant_id=" +
            this.storeId +
            "&diff=shop"
        },
        {
          label: 4,
          value: "车型查询",
          url:
            "https://weixin.ymaibang.com/open/component_oauth.php?merchant_id=" +
            this.storeId +
            "&diff=search_car_model"
        }
      ];
      // this.items =this.test;
      // let _menuChindMore = [];
      // this.menuMore = this.test.length;
      // this.test.forEach(value => {
      //   if (value.sub_button) {
      //     _menuChindMore.push(value.sub_button.length);
      //   } else {
      //     _menuChindMore.push(0);
      //   }
      //     });
      // this.menuChindMore = _menuChindMore;
      // console.log(this.menuChindMore);
      menu().then(res => {
        if (res.data.code == 200) {
          this.show = false;
          let base = res.data.data.button;
          let _menuChindMore = [];
          this.items = base;
          this.menuMore = base.length;
          console.log(base);
          base.forEach((value,index) => {
            console.log(value,index);

            if (value.sub_button.length) {
              _menuChindMore.push(value.sub_button.length);
              value.type = "view";
              value.url=this.options[0].url;
              
            } else {
              _menuChindMore.push(0);
            }
          });
          this.menuChindMore = _menuChindMore;
        } else if (res.data.code == 400) {
          this.show = true;
        } else {
          this.$message.error(res.data.error);
        }
      });
      // 获取店铺信息
      getMerchantNameLogo().then(res => {
        if (res.data.code == 200) {
          this.isMerchantOrderServic = res.data.data.isMerchantOrderServic;
        } else {
          this.$message.error(res.data.error);
        }
      });
      let requirePermissionParam = JSON.stringify({
        requirePermissions: [{ name: "wechat" }],
        isOr: true
      });
      checkPermissions(requirePermissionParam).then(res => {
        if (res.data.code === 200) {
          this.if_Jurisdiction = res.data.data;
        } else {
          this.if_Jurisdiction = false;
        }
      });
      wechatBindingInfo(1).then(res => {
        if (res.data.code === 200) {
          this.weixin_mp_nickname = res.data.data.wechatInfo.weixin_mp_nickname;
        }
      });
    },
    // 排序
    getdata(evt) {
      console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.tags);
    },
    // 重新绑定
    reBinding() {
      if (this.if_Jurisdiction) {
        window.open(
          `https://weixin.ymaibang.com/open/component_start_auth.php?merchant_id=${
            this.storeId
          }&auth_type=1`
        );
        this.$confirm("请在新窗口中完成微信公众号授权", "提示", {
          cancelButtonText: "已成功设置",
          confirmButtonText: "授权失败,重试"
        }).then(() => {
          this.bindingPublic();
        });
      } else {
        this.$message.error("您没有权限绑定");
      }
    },
    // 绑定公众号
    bindingPublic() {
      if (this.if_Jurisdiction) {
        if (this.isMerchantOrderServic) {
          window.open(
            `https://weixin.ymaibang.com/open/component_start_auth.php?merchant_id=${
              this.storeId
            }&auth_type=1`
          );
          this.$confirm("请在新窗口中完成微信公众号授权", "提示", {
            cancelButtonText: "已成功设置",
            confirmButtonText: "授权失败,重试"
          })
            .then(() => {
              this.bindingPublic();
            })
            .catch(() => {
              menu().then(res => {
                if (res.data.code == 200) {
                  this.show = false;
                  this.$message.success("恭喜成功绑定微信公众号");
                } else if (res.data.code == 400) {
                  this.show = true;
                  this.$message.error("未绑定成功，请重新尝试");
                } else {
                  this.$message.error(res.data.error);
                }
              });
            });
        } else {
          this.$message.error("请先订购专业版");
        }
      } else {
        this.$message.error("您没有权限绑定");
      }
    },
    // 自定义菜单
    sureModify() {
      if (this.if_Jurisdiction) {
        menu().then(res => {
          if (res.data.code == 200) {
            this.if_modify = false;
          } else if (res.data.code == 400) {
            this.$message.error("请先绑定微信公众号");
          }
        });
      } else {
        this.$message.error("您没有权限修改");
      }
    },
    // 保存菜单
    saveItems() {
      console.log("提交菜单信息");
      if (!this.name) {
        this.$message.error("菜单名不能为空");
        return;
      } else if (this.name.replace(/[^\x00-\xff]/g, "01").length > 8) {
        this.$message.error("菜单名最多为4个汉字或8个字母");
        return;
      }

      if (!this.optionsValue) {
        this.$message.error("请选择跳转链接");
        return;
      }

      if (this.index) {
        console.log("提交修改菜单信息");
        this.items[this.index - 1].type = this.type;
        this.items[this.index - 1].name = this.name;
        this.options.forEach((value, index) => {
          if (value.value == this.optionsValue) {
            console.log(this.items[this.index - 1].url);
            this.items[this.index - 1].url = value.url;
          }
        });
        this.$message.success("菜单修改成功");
        this.index = 0;
      } else {
        console.log("提交新增菜单信息");
        if (this.menuMore >= 3) {
          this.$message.error("菜单栏最多3个菜单");
          this.optionsValue = "";
          this.name = "";
          return;
        }
        let _url = "";
        this.options.forEach((value, index) => {
          console.log();
          if (value.url == this.optionsValue) {
            _url = value.url;
          }
        });
        this.items.push({
          type: this.type,
          name: this.name,
          url: _url
        });
      }
      console.log(this.items);
      console.log(this.optionsValue);
      this.menuMore = this.items.length;
      this.optionsValue = "";
      this.name = "";
    },
    // 新增子菜单
    newAddChindMenu(index) {
      console.log("新增子菜单");
      this.key = 0;
      this.index = index + 1;
      this.chindName = "";
      this.optionsChindValue = "";
      this.selectitemsChindShow = true;
      this.selectitemsShow = false;
    },
    // 新增菜单
    newAddMenu() {
      console.log("新增菜单");
      this.optionsValue = "";
      this.name = "";
      this.selectitemsShow = true;
      this.selectitemsChindShow = false;
      this.index = 0;
      console.log(this.items);
    },
    // 修改菜单信息
    modifyMenu(index) {
      console.log("修改菜单");
      console.log(index);
      this.index = index + 1;
      this.selectitemsShow = true;
      this.selectitemsChindShow = false;
      console.log(this.items[index]);
      this.name = this.items[index].name;
      console.log(this.optionsValue);
      this.optionsValue = this.items[index].url;
      console.log(this.items);
    },
    // 修改子菜单信息
    modifyChindMenu(index, key) {
      console.log("修改子菜单");
      this.index = index + 1;
      this.key = key + 1;
      this.chindName = this.items[index].sub_button[key].name;
      this.optionsChindValue = this.items[index].sub_button[key].url;
      this.selectitemsChindShow = true;
      this.selectitemsShow = false;
    },
    // 删除菜单信息
    removeMenu() {
      console.log("点击了删除菜单");
      if (this.index) {
        console.log("删除菜单信息");
        this.items.splice(this.index - 1, 1);
        this.index = 0;
        this.name = "";
        this.optionsValue = "";
        this.menuMore = this.items.length;
        this.$message.success("菜单删除成功");
      }
    },
    // 删除子菜单信息
    removeChindMenu() {
      console.log("点击了删除子菜单");
      if (this.key) {
        console.log("删除子菜单信息");
        console.log(this.items[this.index - 1]);
        if (this.items[this.index - 1].sub_button.length == 1) {
          this.items[this.index - 1].sub_button = null;
          this.menuChindMore[this.index - 1] = 0;
        } else {
          console.log(this.items[this.index - 1]);
          console.log(this.index);
          console.log(this.key);
          this.items[this.index - 1].sub_button.splice(this.key - 1, 1);
          this.menuChindMore[this.index - 1] = this.items[
            this.index - 1
          ].sub_button.length;
        }
        this.$message.success("子菜单删除成功");
        this.key = 0;
        this.chindName = "";
        this.optionsChindValue = "";
      }
    },
    // 保存子菜单信息
    submitChindMenu() {
      if (!this.chindName) {
        this.$message.error("菜单名不能为空");
        return;
      } else if (this.chindName.replace(/[^\x00-\xff]/g, "01").length > 14) {
        this.$message.error("菜单名最多为7个汉字或14个字母");
        return;
      }
      if (!this.optionsChindValue) {
        this.$message.error("请选择跳转链接");
        return;
      }

      if (!this.items[this.index - 1].sub_button) {
        this.items[this.index - 1].sub_button = [];
      }
      if (this.key) {
        console.log("提交修改子菜单信息");
        this.items[this.index - 1].sub_button[this.key - 1].type = this.type;
        this.items[this.index - 1].sub_button[
          this.key - 1
        ].name = this.chindName;
        this.options.forEach((value, index) => {
          if (value.value == this.optionsChindValue) {
            this.items[this.index - 1].sub_button[this.key - 1].url = value.url;
          }
        });
        this.$message.success("子菜单修改成功");
        // this.items[this.index - 1].sub_button[
        //   this.key - 1
        // ].url = this.optionsChindValue;
        this.key = 0;
      } else {
        if (this.menuChindMore[this.index - 1] >= 5) {
          this.$message.error("最多只能包含5个子菜单");
          this.optionsChindValue = "";
          this.chindName = "";
          return;
        }
        let _url = "";
        this.options.forEach((value, index) => {
          if (value.url == this.optionsChindValue) {
            _url = value.url;
          }
        });
        this.items[this.index - 1].sub_button.push({
          type: this.type,
          name: this.chindName,
          url: _url
        });
      }
      this.menuChindMore[this.index - 1] = this.items[
        this.index - 1
      ].sub_button.length;
      this.optionsChindValue = "";
      this.chindName = "";
      console.log(this.items);
      // 提交到后台
      // let menu = "{ button:" + JSON.stringify(this.items) + "}";
      // submitMenu({ menu }).then(res => {
      //   if (res.data.code == 200) {
      //     this.$message.success("提交成功");
      //   } else {
      //     this.$message.error(res.data.error);
      //   }
      // });
    },
    //提交发布信息
    submitMenuAdd() {
      // 提交到后台
      console.log(this.items);
      // let menu = "{"+"button"+":" + JSON.stringify(this.items) + "}";
      // let menu = "{button:" + this.items + "}";
      let menu = JSON.stringify({
        button: this.items
      });
      console.log(menu);
      submitMenu({ menu }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("提交成功");
        } else {
          this.$message.error(res.data.error);
        }
      });
    }
  },
  components: {
    draggable
  }
};
</script>
<style lang="stylus" scoped>
#shopPublic
  .el-header
    margin-left 1px
    .el-breadcrumb
      line-height 60px
  .el-main
    padding 10px
    .mainBody
      width 100%
      padding 50px 30px 100px 30px
      min-height 750px
      .shopPrompt
        padding-top 50px
        ul, li
          list-style disc
      .shopBinding
        p:nth-of-type(2)
          margin 30px 0
        .successText
          span
            display inline-block
            margin-right 40px
            .el-icon-circle-check
              width 40px
              height 40px
              font-size 40px
              vertical-align middle
              margin-right 10px
              color #67c23a
          .el-button
            margin-right 30px
      .customPublic
        margin -40px -20px 0 -20px
        .customPublicHeader
          background-color #f5f5f5
          padding 26px 40px
          .el-icon-warning
            font-size 50px
            vertical-align middle
        .customPublicMain
          padding 50px
          .phonePage
            max-width 375px
            img
              width 100%
              height 63px
            .phonePageMain
              height 555px
              border-left 1px solid #ccc
              border-right 1px solid #ccc
              margin-top -4px
            .phonePageFooter
              height 50px
              // border 1px solid #ccc
              background-color #f5f5f5
              .keyboard
                min-width 42px
                max-width 42px
                height 50px
                border-left 1px solid #ccc
                border-top 1px solid #ccc
                border-bottom 1px solid #ccc
                .el-row
                  height 50px
                  padding-top 14px
                  img
                    width 26px
                    height 20px
              .phonePageSelect
                width 100%
                .phonePageSelectItems
                  .draggable
                    width 100%
                    display flex
                    justify-content flex-start
                    >span
                      width 100%
                      display flex
                      justify-content flex-start
                    .el-col
                      border 1px solid #cccccc
                      height 50px
                      line-height 50px
                      text-align center
                      cursor pointer
                      position relative
                      ul
                        display none
                    .el-col:hover
                      border 1px solid #1491f2
                      color #1491f2
                      i
                        color #1491f2
                      ul
                        display block
                        color #333333
                        i
                          color #333333
                    .baseItem
                      text-align center
                      line-height 50px
                      i
                        font-size 20px
                        color #999
                    .normalMenu
                      .chindItems
                        color #333333
                        position absolute
                        bottom 100%
                        left 0
                        right 0
                        ul
                          padding-bottom 20px
                          li
                            min-width 120px
                            cursor pointer
                            border 1px solid #cccccc
                            height 50px
                            white-space nowrap
                            padding 0 10px
                            background-color #f2f2f2
                          li:hover
                            border 1px solid #1491f2
                            color #1491f2
                            i
                              color #1491f2
                          li:hover + .triangle:before
                            border-color #1491f2 transparent transparent transparent
            .triangle:after
              content ''
              position absolute
              border-width 14px
              width 0
              height 0
              overflow hidden
              border-style solid
              border-color #f2f2f2 transparent transparent transparent
              left 50%
              bottom -7px
              margin-left -14px
            .triangle:before
              content ''
              position absolute
              border-width 14px
              width 0
              height 0
              overflow hidden
              border-style solid
              border-color #ccc transparent transparent transparent
              left 50%
              bottom -8px
              margin-left -14px
          .selectitems
            height 668px
            border 1px solid #cccccc
            margin-left 30px
            padding 20px
            background-color #f2f2f2
            position relative
            .selectitemsHeader
              border-bottom 1px solid #cccccc
              padding-bottom 20px
            .selectitemsMain
              .el-col
                margin-top 50px
                span
                  line-height 32px
                  display inline-block
                  width 80px
              .selectitemsMainName
                .el-input
                  width 215px
                p
                  font-size 12px
                  margin-left 80px
                  margin-top 10px
            .triangle:after
              content ''
              position absolute
              border-width 20px
              width 0
              height 0
              overflow hidden
              border-style solid
              border-color transparent #f2f2f2 transparent transparent
              left -39px
              bottom 8px
            .triangle:before
              content ''
              position absolute
              border-width 20px
              width 0
              height 0
              overflow hidden
              border-style solid
              border-color transparent #ccc transparent transparent
              left -40px
              bottom 8px
          .customPublicMainFooter
            padding-top 50px
          .saveInfo
            .el-button
              width 100px
</style>
