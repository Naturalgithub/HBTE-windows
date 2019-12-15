<template>
  <div>
    <el-aside id="asideNav">
      <div class="logo-name">
        <p v-if="$store.getters.logoShow">HBTE</p>
        <p v-else style="padding-left:0px">
          <a href="http://hbtetech.com/">
            <img style="margin-top:3px;" src="../../../assets/logo2.png" alt>
          </a>
        </p>
      </div>
      <el-menu
        style="width:194px;padding-right:0;"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgb(231, 226, 226)"
        text-color="#000"
        active-text-color="#fff"
        router
        unique-opened
      >
        <el-menu-item v-if="showmenhu">
          <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
          <span slot="title" style="font-size:12px;" class="fw">&nbsp;&nbsp;&nbsp;&nbsp;门户主页</span>
        </el-menu-item>
        <el-submenu index="2" v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span class="fw" style="font-size:12px;">&nbsp;&nbsp;&nbsp;收支系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="InOutWrite">收款录入</el-menu-item>
            <el-menu-item index="InOutAddWrite">付款录入</el-menu-item>
            <el-menu-item index="ApplyWrite">报销录入</el-menu-item>
            <el-menu-item index="InOutQuery">收支单据查询</el-menu-item>
            <el-menu-item index="PLine">产品线收支表</el-menu-item>
            <el-menu-item index="InOutManagement">部门收支汇总表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-lock"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="Useradd">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>-->
        <el-submenu index="4" v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;审批管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="ApplicationList">申请列表</el-menu-item>

            <el-menu-item index="ToDoList">待办事项</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1" v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/MoneyManagement">货币管理</el-menu-item>
            <el-menu-item index="/CustomerManagement">客户管理</el-menu-item>
            <el-menu-item index="/BankManagement">银行管理</el-menu-item>
            <el-menu-item index="/AitemLine">产品线管理</el-menu-item>
            <el-menu-item index="/SupplierManage">供应商管理</el-menu-item>
            <!-- <el-menu-item index="/DaYinBiaoGuanLi">打印表管理</el-menu-item> -->
            <el-menu-item index="/CompanyInfo">公司信息管理</el-menu-item>
            <el-menu-item index="/ItemInfo">项目信息管理</el-menu-item>
            <!-- <el-menu-item index="/aemtest">产品线管理</el-menu-item> -->
            <el-menu-item index="/AccountingItem">会计科目管理</el-menu-item>
            <el-menu-item index="/PayPal">收款信息管理</el-menu-item>
            <el-menu-item index="/DepartmentInfo">部门信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import menuTree from './menuTree'

export default {
  created () {
    this.open1()
  },
  data () {
    return {
      showmenhu: true,
      showcaiwu: ''
    }
  },
  name: 'asideNav',
  components: {
    menuTree
  },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    '$route.path': function (val) {
      this.selectmenu(val)
    }
  },
  methods: {
    open1 () {
      // 进来根据权限是否隐藏
      let temp = JSON.parse(localStorage.getItem('asidedata'))
      console.log(temp)

      this.showmenhu = temp.aside == 'menhu'
      this.showcaiwu = temp.aside == 'caiwu'
      console.log(this.showmenhu, this.showcaiwu)
    },
    menhu () {},
    caiwu () {},
    selectmenu (key) {
      let router = this.$store.getters.routers
      let name = ''
      let navTitle = function (path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (
              routerARR[i].path === path &&
              routerARR[i].children.length < 1
            ) {
              name = routerARR[i].name
              break
            }
            navTitle(path, routerARR[i].children)
          }
        }
        return name
      }
      this.$store.dispatch('addTab', {
        title: navTitle(key, router),
        path: key
      })
    }
  }
}
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  // border-right: solid 1px #ddc2b8;
  .logo-name {
    background-color: rgb(227, 114, 46) !important;
    @extend %w100;
    font-weight: 300;
    z-index: 999;
    p {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    @extend %h100;
    overflow-y: scroll;
  }
  .el-menu {
    background-color: rgb(231, 226, 226) !important;
    // padding-left: 0 !important;
    // margin-left: 65px;
    // margin: 1px;
    padding-left: 45px;
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-submenu__title {
      padding-right: 0px !important;
    }
    .fa {
      vertical-align: middle;
      margin-right: 0px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item-group__title {
      padding-bottom: 0px;
    }
    .el-menu {
      padding-left: 15px;
      .el-submenu {
        height: 30px !important;
        .el-menu-item {
          // padding-left: 54px !important;
          width: 100%;
          height: 40px !important;
        }
        .el-menu-item-group {
          .el-menu-item {
            height: 40px !important;
            padding-left: 54px !important;
            // text-indent: 20px !important;
            // color: red !important;
            // margin-right: 20px !important;
          }
          .el-menu-item:nth-child(1) {
            padding-top: 0px;
            // padding-left: 40px;
          }
        }
      }
      .el-menu-item {
        height: 40px !important;
        padding-left: 60px !important;
      }

      // .el-menu-item-group {
      //   height: 20px !important;
      // }
    }
    .el-menu-item {
      // height: 20px !important;

      font-size: 12px !important;
      background-color: rgb(231, 226, 226) !important;
      border-bottom: 1px solid #f6d6b7;
      &:hover {
        color: #ffffff !important;
        background-color: #b94c21 !important;
      }
    }
    .el-menu-item.is-active {
      background-color: rgb(243, 152, 115) !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
  }
  .el-submenu__title:hover {
    background-color: #b94c21 !important;
  }
}
.fw {
  font-weight: 700;
}
</style>
