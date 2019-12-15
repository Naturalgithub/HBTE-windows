<template>
  <div class="NewIndex2">
    <el-header>
      <div class="logo">
        <img :src="denglvyelogo" alt>
      </div>
      <div class="title">
        <span class="h1">
          {{homeDescribe}}
          <!-- <span style="font-size:16px">(v1.0.0)</span> -->
        </span>
      </div>
      <div class="logout">
        <img
          :src="ruleForm.avatar"
          style="width:42px;height:42px;vertical-align:middle; border-radius: 50%;margin-right: 10px; "
          alt
        >
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{logo}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" trigger="click">
            <el-dropdown-item command="a">&nbsp;&nbsp;&nbsp;&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
            <el-dropdown-item
              command="c"
              v-show="ruleForm.isSysAdmin==1"
            >&nbsp;&nbsp;&nbsp;&nbsp;后台管理&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
            <el-dropdown-item
              command="b"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;退&nbsp;&nbsp;出&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 内容 -->
    <!-- 内容 -->
    <div class="el-main">
      <!-- <div class="ge" v-for="item in sysModules" :key=""> -->

      <div class="ge" v-for="item in sysModules" :key="item.sysModuleId">
        <h3>{{item.moduleName}}</h3>
        <ul>
          <li v-for="item1 in item.appInfos" :key="item1.appInfoId" @click="qiehuandizhi(item1)">
            <!-- <el-popover
              placement="bottom-end"
              title="描述"
              width="200"
              trigger="hover"
              :content="item1.appDescribe"
            >-->
            <a slot="reference" :href="item1.appUrl">
              <!-- <a href="###">{{item1.appUrl}}</a> -->
              <img
                slot="reference"
                :src="'http://47.98.145.222:8080/'+item1.appImgPath"
                :alt="item1.appName"
              >
              <p>{{item1.appName}}</p>
            </a>
            <!-- </el-popover> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 修改密码工号密码 -->
    <el-dialog
      class="demo-ruleForm"
      title="修改密码"
      status-icon
      ref="ruleForm"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="工号" style="margin-bottom:20px;">
          <el-input v-model="ruleForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" style="margin-bottom:20px">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="ruleForm.checkpassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button class="btnone" @click="dialogVisible = false">取 消</button>
        <button class="btntwo" @click="tijiaoxinxi">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
// import Cookies from 'js-cookie'
export default {
  name: 'carrousel',
  data () {
    return {
      ruleForm: {
        // name: '',
        userId: '',
        password: '',
        checkpassword: '',
        avatar: '',
        isSysAdmin: '',
        id: ''
      },
      dialogVisible: false,
      logo: '',
      homeDescribe: '',
      denglvyelogo: '',
      sysModules: ''
    }
  },
  created () {
    this.getName()
    this.gethomeDescribe()
    this.getmokuai()
    this.open2()
  },
  methods: {
    open2 () {
      this.$notify({
        title: '帮助',
        message: '点此联系技术客服',
        duration: 0,
        position: 'bottom-right',
        cursor: 'point'
      })
    },
    qiehuandizhi (url) {
      console.log(url.appUrl)
    },
    async getmokuai () {
      const { data } = await this.$axios('hbte-dingding/sys/index', {
        params: { id: this.ruleForm.id }
      })
      console.log(data.result)
      this.sysModules = data.result.sysModules
    },
    async gethomeDescribe () {
      const { data } = await this.$axios('hbte-dingding/home/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      console.log(data.result.homeInfos[0].loginDescribe)
      this.homeDescribe = data.result.homeInfos[0].homeDescribe
      this.denglvyelogo =
        `http://47.98.145.222:8080/` + data.result.homeInfos[0].homeImgPath
    },
    async tijiaoxinxi () {
      if (this.ruleForm.password !== this.ruleForm.checkpassword) {
        this.$message.error('修改失败,两次密码不一样')
        return
      }
      if (this.ruleForm.password != '') {
        const aa = await this.$axios.post('hbte-dingding/user/update', {
          userId: this.ruleForm.userId,
          passwd: this.ruleForm.password
        })
        console.log(aa.data.code)
        if (aa.data.code === '0') {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.ruleForm.userId = ''
          this.ruleForm.password = ''
          this.ruleForm.checkpassword = ''
        } else {
          this.$message.error('修改失败,请联系管理员')
          this.dialogVisible = false
        }
      } else {
        this.$message.error('修改失败,密码不为空')
        this.dialogVisible = false
      }
    },
    getName () {
      let aa = localStorage.getItem('data')
      this.logo = JSON.parse(aa)['userName']
      // console.log(this.logo['userName'])
      this.ruleForm.userId = JSON.parse(aa)['userId']
      // console.log(this.ruleForm.userId)

      this.ruleForm.userName = JSON.parse(aa)['userName']
      this.ruleForm.avatar = JSON.parse(aa)['avatar']
      this.ruleForm.isSysAdmin = JSON.parse(aa)['isSysAdmin']
      this.ruleForm.id = JSON.parse(aa)['id']
    },
    handleCommand (command) {
      // this.$message('click on item ' + command)
      if (command === 'b') {
        this.quitindex()
      } else if (command === 'c') {
        this.jumpbacktai()
      } else if (command === 'a') {
        this.dialogVisible = true
      }
    },
    jumpbacktai () {
      this.$router.push({ path: '/index' })
    },
    quitindex () {
      console.log(1)

      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.$router.push('/')
          // this.router.go(-1)
          // console.log(22)
          localStorage.removeItem('data')
          Cookies.remove('token', { path: '/' })
          // Cookies.remove('token')
          location.reload()
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    callback () {
      console.log(22)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
* {
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
}
.NewIndex2 {
  width: 100%;
  height: 100%;
  // background: url('../../assets/Ocean_by_Shu_Le.jpg') no-repeat center center;
  background-size: cover;
  // background: rgba(0, 0, 0, 0.7);
  // background-color: red;
}
.el-header {
  background-color: rgb(227, 114, 46);
  display: flex;
  padding: 0;
  width: 100%;
  position: fixed;
  margin-bottom: 60px;

  .logo {
    width: 200px;
    padding: 2px;
    padding-left: 0;
    padding-top: 10px;
    span {
      margin-left: 20px;
      font-size: 40px;
      color: rgb(87, 75, 75);
    }
    img {
      padding-left: 40px;
      height: 40px;
    }
  }
  .title {
    // padding-bottom: 10px;
    flex: 1;
    padding-left: 100px;
    text-align: center;
    img {
      display: inline-block;
      vertical-align: middle;
      // display: inline-block;
      height: 40px;
      margin-bottom: 20px;
      // width: 100px;
    }
    .h1 {
      font-size: 24px;
      height: 60px;
      line-height: 60px;
      color: #ffffff;
    }
  }
  .logout {
    width: 300px;
    font-weight: 700;
    text-align: right;
    padding: 10px;
    line-height: 40px;
    margin-right: 20px;

    a {
      color: orange;
    }
  }
}
.firstclass {
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 20px;
  background-color: rgba(218, 126, 23, 0.8);
  padding: 20px;
  margin: 0 10px 10px;
  h3 {
    margin-bottom: 10px;
  }
}

.el-main {
  height: 100%;
  padding-top: 60px;
  .ge {
    padding: 20px 30px 0px;
    width: 80%;
    height: 200px;
    margin: 10px auto;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    h3 {
      // background-color: yellow;
      color: #7e5509;
      text-align: center;
      margin-bottom: 20px;
      font-size: 16px;
    }
    ul {
      // display: flex;
      padding: 0;
      // height: 100%;
      width: 100%;
      // height: 100%;
      li {
        // flex: ;
        float: left;
        width: 15%;
        // height: ;
        text-align: center;
        // height: 200px;
        // background-color: yellow;

        a {
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
          p {
            color: #000;
          }
        }
      }
    }
  }
}
button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent; //自定义边框
  outline: none;
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 5px;
}
.btnone {
  background-color: #fff;
  border: 1px solid #ccc;
}

.btntwo {
  background-color: rgb(64, 158, 255);
  color: #fff;
}
</style>
