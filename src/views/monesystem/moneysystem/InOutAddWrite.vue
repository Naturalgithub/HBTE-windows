<template>
  <div class="InOutAddWrite">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>付款录入</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 导入功能 -->
    <el-button type="success" style="margin-bottom:20px" @click="Inbtn">导入</el-button>
    <!-- 导入模态框 -->
    <el-dialog title="导入" :visible.sync="InputDialogVisible" width="30%">
      <el-row>
        <!-- class="luruinput" -->
        <a href="###">
          <input type="file" ref="fileInput" @change="getFile">
          <!-- 导&nbsp;&nbsp;&nbsp;&nbsp;入 -->
        </a>
        <!-- <p style="color:green;margin-bottom:10px" v-if="returnName">
          {{returnName}}
          <el-button @click="sureUpload" size="small">立即上传</el-button>
        </p>-->
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="InputDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpload">确定录入</el-button>
      </span>
    </el-dialog>
    <!-- 分栏 -->

    <el-form :inline="true" :model="InoutwriteForm" class="demo-form-inline">
      <!-- <el-row :gutter="10"> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="单　　号">
            <el-input v-model="InoutwriteForm.oddNumber" placeholder="审批人" :lg="12"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-form-item label="制单人员">
            <el-input :disabled="true" placeholder="请输入制单人" v-model="InoutwriteForm.userInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目信息">
            <!-- 级联选择器 -->
            <div class="block">
              <!-- <el-cascader v-model="InoutwriteForm.projectInfoId"></el-cascader> -->
              <el-select v-model="InoutwriteForm.projectInfo.projectInfoId" placeholder="请选择">
                <el-option
                  v-for="item in projectOptions"
                  :key="item.projectInfoId"
                  :label="item.projectName"
                  :value="item.projectInfoId"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="摘　　要">
            <el-input v-model="InoutwriteForm.comment"></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="6">
          <el-form-item label="业务人员">
            <el-select v-model="InoutwriteForm.clerk" placeholder="请选择">
              <el-option
                v-for="item in syroptions"
                :key="item.userInfoId"
                :label="item.userName"
                :value="item.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="实操人员">
            <el-select v-model="InoutwriteForm.actualName" placeholder="请选择">
              <el-option
                v-for="item in syroptions"
                :key="item.userInfoId"
                :label="item.userName"
                :value="item.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="6">
          <el-form-item label="币　　种">
            <el-select
              @change="moneyExchangeRate(InoutwriteForm.currencyInfo.currencyInfoId)"
              v-model="InoutwriteForm.currencyInfo.currencyInfoId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in currencyInfoOptions"
                :key="item.currencyInfoId"
                :label="item.currencyName"
                :value="item.currencyInfoId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支出金额">
            <el-input placeholder="请输入支出金额" v-model="InoutwriteForm.expenseAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="兑人民币">
            <el-input placeholder="请输入支出金额" v-model="sumMoneyRate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商　">
            <el-select v-model="InoutwriteForm.supplier.supplierId" placeholder="请选择">
              <el-option
                v-for="item in supplierOptions"
                :key="item.supplierId"
                :label="item.supplierName"
                :value="item.supplierId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-form-item label="收入金额">
        <el-input placeholder="请输入收入金额" v-model="InoutwriteForm.incomeAmount"></el-input>
      </el-form-item>-->

      <!-- <el-form-item label="客户名称">
        <el-select v-model="InoutwriteForm.customerInfo.customerInfoId" placeholder="请选择">
          <el-option
            v-for="item in khxxoptions"
            :key="item.customerInfoId"
            :label="item.customerName"
            :value="item.customerInfoId"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-row>
        <el-col :span="6">
          <!-- <el-form-item label="账　　号">
            <el-input placeholder="请输入账号" v-model="InoutwriteForm.account" style="width:107%"></el-input>
          </el-form-item>h-->
        </el-col>
        <el-col :span="6">
          <!-- <el-form-item label="开户行　">

            <el-select v-model="InoutwriteForm.bankInfo.bankInfoId" placeholder="请选择">
              <el-option
                v-for="item in yhxxoptions"
                :key="item.bankInfoId"
                :label="item.bankName"
                :value="item.bankInfoId"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="所属部门">
            <el-cascader
              :options="departmentOptions"
              :props="{

        label: 'name',
        value: 'id',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      }"
              clearable
              @change="departmentHandleChange"
              placeholder="请选择(默认为一级分类)"
            >
              <template v-slot:default="obj">
                <span>{{ obj.data.name}}</span>
                <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会计科目">
            <!-- 级联选择器 -->
            <div class="block">
              <!-- <el-cascader v-model="InoutwriteForm.accountTitleId"></el-cascader> -->
              <!-- 级联选择器 -->
              <el-cascader
                :options="accountTitleOptions"
                :props="{
        label: 'accountTitleName',
        value: 'accountTitleId',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      }"
                clearable
                @change="accountHandleChange"
                placeholder="请选择(默认为一级分类)"
              >
                <template v-slot:default="obj">
                  <span>{{ obj.data.accountTitleCode}}-{{obj.data.accountTitleName}}</span>
                  <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
                </template>
              </el-cascader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属公司">
            <div class="block">
              <!-- <el-cascader v-model="InoutwriteForm.companyInfoId"></el-cascader> -->
              <el-select v-model="InoutwriteForm.companyInfo.companyInfoId" placeholder="请选择">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.companyInfoId"
                  :label="item.companyName"
                  :value="item.companyInfoId"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款方式">
            <el-select v-model="InoutwriteForm.paymentTermName" placeholder="请选择">
              <el-option
                v-for="item in paymentOptions"
                :key="item.paymentTermId"
                :label="item.paymentTermName"
                :value="item.paymentTermName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- </el-row> -->
      <el-row></el-row>
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="审批人员">
            <el-select
              v-model="valuepeople"
              @change="shenpivaluepeople(valuepeople)"
              multiple
              filterable
              placeholder="请选择(可以搜索)"
            >
              <el-option
                v-for="item in syroptions"
                :key="item.id "
                :label="item.name"
                :value="item.id "
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="6">
          <div>
            <el-form-item label="备　　注">
              <el-input autosize v-model="InoutwriteForm.eventInfo.eventComment"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <el-form-item label="制单日期">
            <div class="block">
              <el-date-picker
                class="mr0"
                v-model="InoutwriteForm.createDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ///// -->
      <div>
        <el-form-item label="审批人员">
          <ul class="approveMan">
            <li v-for="item in approveManlist" :key="item.id">
              <img :src="item.avatar" alt>
              <span
                style="cursor: pointer;"
                class="el-icon-circle-close"
                @click="delApproveMan(item.id)"
              ></span>&nbsp;
              <span>></span>&nbsp;&nbsp;
            </li>
          </ul>

          <ul class="approveMan">
            <li style="padding-top:5px;">
              <span
                style="cursor: pointer; font-size:35px"
                class="el-icon-circle-plus-outline"
                @click="showPeopleInfo"
              ></span>
            </li>
          </ul>
        </el-form-item>
        <!-- <el-form-item label>
          <el-button type="success" @click="showPeopleInfo" style="margin-left:0;">点击选择人员</el-button>
        </el-form-item>-->
      </div>
      <div>
        <el-form-item label>
          <el-button type="success" @click="startIn" style="margin-left:0;">添加产品线</el-button>
          <el-button type="success" @click="addListmoban">录入</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="productLine.productLineName" label="产品线"></el-table-column>
      <el-table-column prop="sumRatio" label="比　例"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-button type="success" style="margin:10px;float:left" disabled>立即录入</el-button> -->

    <!-- 立即录入的模态框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
      <el-form ref="formtest" :model="formtest" label-width="80px">
        <el-form-item label="产品线">
          <el-select v-model="formtest.productLineId" @change="chanpinxian" placeholder="请选择">
            <el-option
              v-for="item in cpxxxoptions"
              :key="item.productLineId"
              :label="item.productLineName"
              :value="item.productLineId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比　例">
          <el-input v-model="formtest.sumRatio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addList(formtest)">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 选择人员模态框 -->
    <el-dialog :visible.sync="choseDialogVisible" closable="false" width="18%">
      <vuescroll :ops="ops" style="height:500px">
        <div>
          <el-tree
            node-key="id"
            :default-expanded-keys="[1]"
            accordion
            :data="syroptions"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span v-if="data.type==1" class="el-icon-office-building"></span>
              <span v-else>
                <span class="touxiang">
                  <img :src="data.avatar" alt>
                </span>
              </span>&nbsp;
              <span>{{ data.title }}</span>
            </span>
          </el-tree>
        </div>
      </vuescroll>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
import vuescroll from 'vuescroll'
export default {
  components: { vuescroll },
  computed: {
    sumMoneyRate () {
      return +this.currentduilv * +this.InoutwriteForm.expenseAmount
    }
  },
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#ccc'
        }
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      baseurl: this.$store.state.baseurl,
      id: '', // 登录人的id
      imageUrl: '',
      InputDialogVisible: false,
      tableData: [],
      aa: '',
      form1: '',
      formtest: {
        productLineId: '',
        productLineName: '',
        sumRatio: ''
      },
      dialogVisible: false,
      InoutwriteForm: {
        actualName: '',
        clerk: '',
        incomeExpenseType: 1,
        ieProductLines: '',
        eventInfo: {
          eventComment: ''
        },
        oddNumber: '',
        createDate: '',
        // createTime: '',
        userInfo: {
          id: '',
          name: ''
        },
        paymentTermName: '',
        currencyInfo: {
          currencyInfoId: ''
        },
        incomeAmount: '',
        expenseAmount: '',
        comment: '',
        customerInfo: {
          customerInfoId: ''
        },
        bankInfo: {
          bankInfoId: ''
        },
        supplier: {
          supplierId: ''
        },
        account: '',
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: ''
        },
        department: {
          id: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        actExecutions: []
      },

      // 收款方式级联选择器
      paymentOptions: [],
      // 货币信息选择器
      currencyInfoOptions: [],
      // 客户信息选择器
      khxxoptions: [],
      // 银行信息选择器
      yhxxoptions: [],
      // 会计级联选择器
      accountTitleOptions: [],
      // 公司信息选择器
      companyOptions: [],
      // 部门信息选择器
      departmentOptions: [],
      // 产品线信息选择器
      cpxxxoptions: [],
      // 项目信息选择器
      projectOptions: [],
      valuepeople: [],
      syroptions: [],
      supplierOptions: [],
      currentduilv: '',
      turnRMB: '',
      fileds: '',
      returnName: '',
      choseDialogVisible: false,
      approveManlist: []
    }
  },
  created () {
    this.getproductLineId()
    this.getpaymentTermId()
    this.getcurrencyInfoId()
    this.getcustomerInfoId()
    this.getcompanyInfoId()
    this.getid()
    this.getaccountTitleId()
    // this.chanpinxian()
    this.getprojectInfoId()
    this.getuserInfoList()
    this.getbankInfoId()
    this.getsupplierId()
    this.getnameid()
  },
  methods: {
    delApproveMan (id) {
      console.log(2)
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)

      // this.fahoutailist
    },
    handleNodeClick (data) {
      console.log(data)
      for (var i = 0; i < this.approveManlist.length; i++) {
        if (this.approveManlist[i].id == data.id) {
          this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }

      if (data.type == 2) {
        this.approveManlist.push(data)
        this.choseDialogVisible = false
        console.log(this.approveManlist)
        this.fahoutailist = this.approveManlist.map(item => {
          return item.id
        })
        console.log(this.fahoutailist)
      }
      // actExecutions
      const arr1 = []
      for (let i = 0; i < this.approveManlist.length; i++) {
        var aa = {
          userInfo: { id: this.approveManlist[i].id },
          actExecutionPriority: i
        }
        arr1.push(aa)
      }
      this.InoutwriteForm.actExecutions = arr1
      console.log(this.InoutwriteForm.actExecutions)
    },
    showPeopleInfo () {
      this.choseDialogVisible = true
    },
    Inbtn () {
      this.InputDialogVisible = true
    },
    async getFile (event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.form1 = form
      const files = event.target.files
      console.log(files[0].name)
      this.returnName = files[0].name
      // console.log(event)
      this.fileds = files[0]
      this.form1.append('file', this.fileds) // id 文件对象
      this.form1.append('id', this.id) // 登录人的id
      this.form1.append(
        'incomeExpenseType',
        this.InoutwriteForm.incomeExpenseType
      ) // 单据类型
    },
    async sureUpload () {
      this.InputDialogVisible = false
      // this.returnName = ''
      // console.log(this.fileds)
      // console.log(this.form1)
      // let form = new FormData() // FormData 对象
      // form.append('file', this.fileds ) // 文件对象
      let that = this
      // console.log(
      //   `${that.baseurl}hbte-financial/hbte/incomeExpense/importPaymentInfo`
      // )

      $.ajax({
        url: `${
          that.baseurl
        }hbte-financial/hbte/incomeExpense/importPaymentInfo`, // url地址
        type: 'POST', // 上传方式
        data: this.form1, // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头
        success: function (data) {
          // 成功回调
          // console.log(data)
          if (data.code == 0) {
            that.$message.success('导入成功,不会覆盖原有数据')
          } else {
            that.$message.error(data.errorMsg)
          }
        },
        error: function (data) {
          // 失败回调
          // console.log(data)
        }
      })
      // const { data } = await this.$axios.post(
      //   '/hbte-financial/hbte/incomeExpense/importPaymentInfo',
      //   { file: this.fileds }
      // )
      // console.log(data)

      this.InputDialogVisible = false
    },
    // handleAvatarSuccess (res, file) {
    //   const aa = res
    //   console.log(aa.result)

    //   this.imageUrll = URL.createObjectURL(file.raw)
    //   console.log(this.imageUrll)
    //   console.log(file)
    // },
    // beforeAvatarUpload () {},
    showdaoru () {
      this.InputDialogVisible = true
    },
    getnameid () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data.id)
      this.InoutwriteForm.userInfo.id = data.id
      this.InoutwriteForm.userInfo.name = data.userName
    },
    // 计算货币兑率反显
    moneyExchangeRate (duilv) {
      // console.log(this.currencyInfoOptions)
      const hb = this.currencyInfoOptions
      let needhblv = hb.filter(item => {
        return item.currencyInfoId == duilv
      })
      // console.log(needhblv)
      // 当前兑率
      let currentduilv = needhblv[0].currencyRatio
      this.currentduilv = currentduilv
      // console.log(duilv)
      // console.log(this.currentduilv)

      let num = +this.InoutwriteForm.expenseAmount
      // console.log(num)
      this.turnRMB = this.duilv * num
      // console.log(this.turnRMB)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    startIn () {
      this.dialogVisible = true
    },
    addList (formtest) {
      // console.log(11)
      let productLineId = this.formtest.productLineId
      let sumRatio = this.formtest.sumRatio
      // console.log(this.aa)
      this.tableData.push({
        productLine: {
          productLineId: productLineId,
          productLineName: this.aa
        },
        sumRatio: sumRatio
      })
      this.InoutwriteForm.ieProductLines = this.tableData
      // console.log(this.tableData)
      this.dialogVisible = false
      // this.$refs.formtest.resetFields()
      this.formtest.productLineId = ''
      this.formtest.productLineName = ''
      this.formtest.sumRatio = ''
    },
    chanpinxian (value) {
      var obj = {}
      obj = this.cpxxxoptions.find(function (item) {
        return item.productLineId === value
      })
      // console.log(obj)
      this.aa = obj.productLineName
      // obj 就是被选中的那个对象，
    },
    async getpaymentTermId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/paymentTerm/paymentTermList'
      )
      let aa = JSON.parse(localStorage.getItem('data'))
      // console.log(aa.id)
      this.id = aa.id

      // this.InoutwriteForm.userInfo.userName = aa.userName
      // this.InoutwriteForm.userInfo.userInfoId = aa.userInfoId
      // console.log(data)
      this.paymentOptions = data.data
      var cca = parseInt(Math.random() * 10000000)
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 月份从0开始
      var day = date.getDate() // 日期
      // let asc = cca.slice(3)
      // console.log(asc)

      this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
    },
    // 获取货币信息id
    async getcurrencyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList'
      )
      // console.log(data)
      this.currencyInfoOptions = data.data
    },
    // // 获取客户信息id
    async getcustomerInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList'
      )
      // console.log(data)
      this.khxxoptions = data.data
    },
    // 获取客户信息id
    async getbankInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/bank/bankInfoList'
      )
      // console.log(data)
      this.yhxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // // 获取公司信息id
    async getcompanyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/company/companyInfoList'
      )
      // console.log(data.data)
      this.companyOptions = data.data
      // console.log(this.yhxxoptions)
    },
    async getaccountTitleId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleList'
      )

      // console.log(data)
      this.accountTitleOptions = this.getTreeData(data.data)
    }, // 递归方法
    getTreeData (data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    accountHandleChange (value) {
      // console.log(value)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getid () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data.data)
      this.departmentOptions = this.getTreeData(data.data)
    },
    departmentHandleChange (value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.department.id = value[value.length - 1] || -1
    },
    // 获取产品线信息id
    async getproductLineId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/productLineList'
      )
      // console.log(data.data)
      this.cpxxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // 获取项目信息id
    async getprojectInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/project/projectInfoList'
      )
      // console.log(data.data)
      this.projectOptions = data.data
      // console.log(this.projectOptions)
    },
    // // 立即录入
    async addListmoban () {
      if (this.InoutwriteForm.eventInfo.eventComment == '') {
        this.$message.error('提交前,请确认备注是否漏填')
        return
      } else if (this.InoutwriteForm.projectInfo.projectInfoId == '') {
        this.$message.error('提交前,请确认项目信息是否漏填')
        return
      } else if (this.InoutwriteForm.comment == '') {
        this.$message.error('提交前,请确认摘要是否漏填')
        return
      } else if (this.InoutwriteForm.expenseAmount == '') {
        this.$message.error('提交前,请确认支出金额是否漏填')
        return
      } else if (this.InoutwriteForm.accountTitle.id == '') {
        this.$message.error('提交前,请确认会计科目是否漏填')
        return
      } else if (this.InoutwriteForm.createDate == '') {
        this.$message.error('提交前,请确认创建时间是否漏填')
        return
      } else if (this.InoutwriteForm.companyInfo.companyInfoId == '') {
        this.$message.error('提交前,请确认所属公司是否漏填')
        return
      } else if (this.InoutwriteForm.currencyInfo.currencyInfoId == '') {
        this.$message.error('提交前,请确认币种是否漏填')
        return
      } else if (this.InoutwriteForm.ieProductLines == '') {
        this.$message.error('请确认产品线是否填写完整')
        return
      } else if (this.InoutwriteForm.actExecutions == '') {
        this.$message.error('请确认审批人是否填写完整')
        return
      }

      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
        this.InoutwriteForm
      )
      // console.log(22)

      // console.log(data)
      if (data.code == 0) {
        this.$message.success('数据录入成功')
        this.InoutwriteForm.currencyInfo.currencyInfoId = ''
        this.InoutwriteForm.companyInfo.companyInfoId = ''
        this.InoutwriteForm.createDate = ''
        this.InoutwriteForm.accountTitle.id = ''
        this.InoutwriteForm.oddNumber = ''
        this.InoutwriteForm.projectInfo.projectInfoId = ''
        this.InoutwriteForm.comment = ''
        this.InoutwriteForm.currencyInfo.currencyInfoId = ''
        this.InoutwriteForm.expenseAmount = ''
        this.InoutwriteForm.supplier.supplierId = ''
        this.InoutwriteForm.companyInfo.companyInfoId = ''
        this.InoutwriteForm.paymentTermName = ''
        this.InoutwriteForm.eventInfo.eventComment = ''
        this.InoutwriteForm.createDate = ''
        this.approveManlist = []
        this.tableData = []
        // window.location.reload()
        var cca = parseInt(Math.random() * 10000000)
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 // 月份从0开始
        var day = date.getDate() // 日期
        // let asc = cca.slice(3)
        // console.log(asc)

        this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
      } else {
        // console.log(data)

        this.$message.error(data.errorMsg)
      }
    },
    async getuserInfoList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentUserList'
      )
      console.log(data.data)

      this.syroptions = data.data
    },
    async getsupplierId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/supplier/supplierList'
      )
      // console.log(data.data)

      this.supplierOptions = data.data
    },
    // // ??
    shenpivaluepeople (v) {
      // console.log(v)
      const arr1 = []
      for (var i = 0; i < v.length; i++) {
        var aa = { userInfo: { userInfoId: v[i] }, actExecutionPriority: i }
        arr1.push(aa)
      }
      // console.log(arr1)
      this.InoutwriteForm.actExecutions = arr1
    }
  }
}
</script>

<style lang="scss" scoped>
.luruinput {
  padding: 8px 5px 8px 5px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #fff;
  background: rgb(103, 194, 58);
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.luruinput input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.a-luruinput:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
.mr0 {
  margin-right: 0;
}
.el-select {
  width: 93%;
}
.el-input {
  width: 100%;
}
.el-date-editor {
  width: 88%;
}
.el-cascader {
  width: 93%;
}
.touxiang {
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
}

.approveMan {
  float: left;
  li {
    position: relative;
    float: left;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .el-icon-circle-close {
      position: absolute;
      left: 28px;
    }
  }
}
>>> .el-tree-node__content {
  height: 42px !important;
}
.pd0 {
  padding: 0;
}
</style>
