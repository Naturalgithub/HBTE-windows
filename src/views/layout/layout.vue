<template>
  <div id="loyout">
    <el-container>
      <div class="fixedtab" v-if="$store.state.showaside">
        <div class="asideicon">
          <!-- <div class="touxiang">
            <img :src="pic" alt>
          </div>-->
        </div>
        <vuescroll :ops="ops">
          <ul class="asideul">
            <li @click="menhu" :class="{sanjiao:sanjiao=='menhu'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%">
                <img src="../../assets/needimg/HBTE.png" alt>
                <p>
                  <a href="###">门户</a>
                </p>
              </a>
            </li>

            <li>
              <span></span>
              <a
                style=" display: inline-block;width:100%;height:100%"
                target="_blank"
                href="https://worktile.com/"
              >
                <img src="../../assets/needimg/worktile.jpg" alt>
                <p>
                  <a href="###">worktile</a>
                </p>
              </a>
            </li>
            <li @click="caiwu" :class="{sanjiao:sanjiao=='caiwu'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/caiwuxitong.png" alt>
                <p>
                  <a href="##">财务系统</a>
                </p>
              </a>
            </li>
            <li @click="shiyanguanli" :class="{sanjiao:sanjiao=='shiyanguanli'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/th.jpg" alt>
                <p>
                  <a href="##">实验管理</a>
                </p>
              </a>
            </li>
            <li @click="pinguanbaogao" :class="{sanjiao:sanjiao=='pinguanbaogao'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/th1.jpg" alt>
                <p>
                  <a href="##">品管报告</a>
                </p>
              </a>
            </li>
            <li @click="jingjia" :class="{sanjiao:sanjiao=='jingjia'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/th2.jpg" alt>
                <p>
                  <a href="##">竞价系统</a>
                </p>
              </a>
            </li>
            <li @click="kehuzhichi" :class="{sanjiao:sanjiao=='kehuzhichi'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/th3.jpg" alt>
                <p>
                  <a href="##">客户支持</a>
                </p>
              </a>
            </li>
            <li style="height:20c0px"></li>
          </ul>
        </vuescroll>
        <div class="asideoptions"></div>
      </div>
      <layoutAside v-if="$store.state.showaside"></layoutAside>

      <el-container>
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer style="height:0px;"></el-footer>
      </el-container>

      <el-popover placement="left" width="100%" trigger="click" content="您好!今天我们能为您做点什么?">
        <div class="el-icon-question help" slot="reference"></div>
        <!-- <el-button >sd</el-button> -->
      </el-popover>
    </el-container>
  </div>
</template>

<script>
import layoutAside from './aside/aside'
import layoutHeader from './header/header'
import Bottom from './Footer/bottom'
import langSelect from '../../components/lang/langSelect'
import vuescroll from 'vuescroll'
export default {
  data () {
    return {
      screenWidth: document.body.clientWidth,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          // background: 'red !important',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        }
      },
      menhusanjiao: '',
      caiwujiao: '',
      pic: ''
    }
  },
  name: 'dc-home',
  components: {
    layoutHeader,
    Bottom,
    langSelect,
    layoutAside,
    vuescroll
  },
  created () {
    this.$router.push('/index')
    this.getPersonpic()
    // this.open2()
    this.getasidesanjiao()
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    getasidesanjiao () {
      const asidedata = JSON.parse(localStorage.getItem('asidedata'))
      console.log(asidedata.aside)
      this.sanjiao = asidedata.aside
    },
    getPersonpic () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data)
      this.pic = data.avatar
    },
    menhu () {
      console.log(11)
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'menhu' }))
      location.reload(0)
    },
    caiwu () {
      console.log(11)
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'caiwu' }))
      location.reload(0)
    },
    shiyanguanli () {
      localStorage.setItem(
        'asidedata',
        JSON.stringify({ aside: 'shiyanguanli' })
      )
      location.reload(0)
    },
    pinguanbaogao () {
      localStorage.setItem(
        'asidedata',
        JSON.stringify({ aside: 'pinguanbaogao' })
      )
      location.reload(0)
    },
    jingjia () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'jingjia' }))
      location.reload(0)
    },
    kehuzhichi () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'kehuzhichi' }))
      location.reload(0)
    },
    open2 () {
      this.$notify({
        title: '您好!',
        message: ' 今天我们能为您做点什么?',
        position: 'bottom-right',
        duration: 4000,
        onClick: function () {
          console.log(22)
          this.$message.success('功能开发中')
        }
      })
    }
  }
}
</script>

<style>
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#loyout,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#elmain {
  background-color: #f0f2f5;
}
.fixedtab {
  position: fixed;
  top: 0;
  // left: 0;
  width: 60px;
  height: 100%;
  background-color: rgb(240, 94, 36) !important;
  // background-color: red !important;
  z-index: 999;
  padding-top: 30px;
  // padding-bottom: 30px;
  .asideul {
    // height: 600px !important;
    margin: 0;
    height: 60%;
    // overflow: hidden;
    // overflow: scroll;
    background-color: rgb(240, 94, 36);
    overflow: auto;
    // padding-left: 6px;
    li {
      position: relative;
      text-align: center;
      margin-bottom: 5px 0 10px 0;
      height: 60px;
      padding-bottom: 5px;
      margin-bottom: 5px;
      // padding: 5px 0 4px 0;
      a {
        padding-top: 5px;
        height: 100%;
        color: #fff;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          // border: 2px solid rgb(223, 116, 45);
        }
        p {
          margin-top: 2px;
          font-size: 10px;
          color: #fff;
        }
      }
      a:hover {
        // color: green;
        background: #b94c21;
      }
      a:active {
        color: #ccc;
      }
    }
    .sanjiao {
      position: relative;
      background-color: #b94c21;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        // width: 5px;
        // height: 5px;
        border: 5px solid transparent;

        border-right: 5px solid rgb(250, 108, 52);

        border-left: 5px solid transparent;

        border-top: 5px solid transparent;
      }
    }
  }
  .asideoptions {
    bottom: 0;
    position: absolute;
    height: 20%;
    width: 100%;
    background-color: rgb(240, 94, 36);
  }
}
.asideicon {
  border-right: 10px solid rag(0, 0, 0);
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  .touxiang {
    img {
      width: 40px;
      height: 40px;
      border-radius: 15px;
      border: 3px solid #fff;
    }
  }
}
.help {
  position: fixed;
  font-size: 30px;
  right: 10px;
  top: 90%;
  color: orange;
}
.el-icon-arrow-down {
  // color: #ccc !important;
  font-size: 18px;
}
// 滚动条
// rail: {
//   background: '#01a99a',
//   opacity: 0,
//   size: '6px',
//   specifyBorderRadius: false,
//   gutterOfEnds: null,
//    gutterOfSide: '2px',
//   keepShow: false
// }
</style>
