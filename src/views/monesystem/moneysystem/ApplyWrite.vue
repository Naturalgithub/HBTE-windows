<template>
  <div class="InOutAddWrite">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>付款录入</el-breadcrumb-item>
    </el-breadcrumb>-->

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
                  v-for="item in projectOption"
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
          <el-form-item label="报销人　">
            <!-- 可以搜索 -->
            <el-select
              v-model="valuepeople1"
              @change="applyMan(valuepeople1)"
              filterable
              placeholder="请选择(可以搜索)"
            >
              <el-option
                v-for="item in applyManOptions"
                :key="item.id "
                :label="item.name"
                :value="item.id "
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
            v-for="item in custmerOptions"
            :key="item.customerInfoId"
            :label="item.customerName"
            :value="item.customerInfoId"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-row>
        <el-col :span="6">
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

      <el-row></el-row>
      <el-row>
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
        <hbte-people-table
          :approveManlist="approveManlist"
          :applyManOptions="applyManOptions"
          :treePeopleOptions="syroptions"
          @del-approve-mancp="delApproveMancp"
          @handle-node-click="handleNodeClickcp"
          @handle-close="handleClosecp"
          @apply-man="applyMancp"
        ></hbte-people-table>
      </div>
      <div>
        <el-form-item label>
          <el-button type="success" @click="startIn" style="margin-left:0;">添加产品线</el-button>
          <el-button type="success" @click="addListModel">录入</el-button>
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
      <el-form ref="formTest" :model="formTest" label-width="80px">
        <el-form-item label="产品线">
          <el-select v-model="formTest.productLineId" @change="ProductLine" placeholder="请选择">
            <el-option
              v-for="item in ProductOptions"
              :key="item.productLineId"
              :label="item.productLineName"
              :value="item.productLineId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比　例">
          <el-input v-model="formTest.sumRatio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addList(formTest)">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import hbtePeopleTable from '@/components/hbteComponents/hbteChosePeople'
import $ from 'jquery'
import vuescroll from 'vuescroll'
export default {
  components: { vuescroll, hbtePeopleTable },
  computed: {
    sumMoneyRate() {
      return +this.currentduilv * +this.InoutwriteForm.expenseAmount
    }
  },
  data() {
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
      fahoutailist: [],
      valuepeople1: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      baseurl: this.$store.state.baseurl,
      id: '', // 登录人的id
      imageUrl: '',
      daorudialogVisible: false,
      tableData: [],
      valueaa: '',
      formInfo: '',
      formTest: {
        productLineId: '',
        productLineName: '',
        sumRatio: ''
      },
      dialogVisible: false,
      InoutwriteForm: {
        expenseUserInfo: { id: '' },
        actualName: '',
        clerk: '',
        incomeExpenseType: 2,
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
      applyManOptions: [],
      // 收款方式级联选择器
      paymentOptions: [],
      // 货币信息选择器
      currencyInfoOptions: [],
      // 客户信息选择器
      custmerOptions: [],
      // 银行信息选择器
      UserInfoOptions: [],
      // 会计级联选择器
      accountTitleOptions: [],
      // 公司信息选择器
      companyOptions: [],
      // 部门信息选择器
      departmentOptions: [],
      // 产品线信息选择器
      ProductOptions: [],
      // 项目信息选择器
      applyManOptions: [],
      projectOption: [],
      valuepeople: [],
      syroptions: [],
      supplierOptions: [],
      currentduilv: '',
      turnRMB: '',
      fileds: '',
      returnName: '',
      choseMandialogVisible: false,
      approveManlist: []
    }
  },
  created() {
    this.getProductLineId()
    this.getPaymentTermId()
    this.getCurrencyInfoId()
    this.getcustomerInfoId()
    this.getcompanyInfoId()
    this.getId()
    this.getaccountTitleId()
    // this.ProductLine()
    this.getprojectInfoId()
    this.getUserInfoList()
    this.getbankInfoId()
    this.getSupplierId()
    this.getNameId()
    this.applyManlist()
  },
  methods: {
    applyMancp(v) {
      let currentManObj = this.applyManOptions.filter(item => {
        return item.id === v
      })
      console.log(currentManObj[0])
      for (var i = 0; i < this.approveManlist.length; i++) {
        if (this.approveManlist[i].id == v) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }
      this.approveManlist.push(currentManObj[0])
      let temp = this.approveManlist
      let aa = temp.map(item => {
        return item.id
      })
      this.fahoutailist = aa
      console.log(this.fahoutailist)
    },
    handleClosecp(tag) {
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== tag.id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)
    },
    handleNodeClickcp(data) {
      console.log(data)
      for (var i = 0; i < this.approveManlist.length; i++) {
        if (this.approveManlist[i].id == data.id) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }

      if (data.type == 2) {
        this.approveManlist.push(data)
        // this.choseDialogVisible = false
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
      console.log(this.approveManlist)

      this.InoutwriteForm.actExecutions = arr1
      // console.log(this.InoutwriteForm.actExecutions)
    },
    delApproveMancp(id) {
      console.log(22)

      console.log(2)
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)
    },
    async applyManlist() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/userInfo/userInfoList'
      )
      // console.log(data.data)

      this.applyManOptions = data.data
    },

    async getFile(event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.formInfo = form
      const files = event.target.files
      console.log(files[0].name)
      this.returnName = files[0].name
      // console.log(event)
      this.fileds = files[0]
      this.formInfo.append('file', this.fileds) // id 文件对象
      this.formInfo.append('id', this.id) // 登录人的id
      this.formInfo.append(
        'incomeExpenseType',
        this.InoutwriteForm.incomeExpenseType
      ) // 单据类型
    },

    getNameId() {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data.id)
      this.InoutwriteForm.userInfo.id = data.id
      this.InoutwriteForm.userInfo.name = data.userName
    },
    // 计算货币兑率反显
    moneyExchangeRate(duilv) {
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
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    startIn() {
      this.dialogVisible = true
    },
    addList(formTest) {
      // console.log(11)
      let productLineId = this.formTest.productLineId
      let sumRatio = this.formTest.sumRatio
      // console.log(this.valueaa)
      this.tableData.push({
        productLine: {
          productLineId: productLineId,
          productLineName: this.valueaa
        },
        sumRatio: sumRatio
      })
      this.InoutwriteForm.ieProductLines = this.tableData
      // console.log(this.tableData)
      this.dialogVisible = false
      // this.$refs.formTest.resetFields()
      this.formTest.productLineId = ''
      this.formTest.productLineName = ''
      this.formTest.sumRatio = ''
    },
    ProductLine(value) {
      var obj = {}
      obj = this.ProductOptions.find(function(item) {
        return item.productLineId === value
      })
      // console.log(obj)
      this.valueaa = obj.productLineName
      // obj 就是被选中的那个对象，
    },
    async getPaymentTermId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/paymentTerm/paymentTermList'
      )
      let valueaa = JSON.parse(localStorage.getItem('data'))
      // console.log(valueaa.id)
      this.id = valueaa.id

      // this.InoutwriteForm.userInfo.userName = valueaa.userName
      // this.InoutwriteForm.userInfo.userInfoId = valueaa.userInfoId
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
    async getCurrencyInfoId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList'
      )
      // console.log(data)
      this.currencyInfoOptions = data.data
    },
    // // 获取客户信息id
    async getcustomerInfoId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList'
      )
      // console.log(data)
      this.custmerOptions = data.data
    },
    // 获取客户信息id
    async getbankInfoId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/bank/bankInfoList'
      )
      // console.log(data)
      this.UserInfoOptions = data.data
      // console.log(this.UserInfoOptions)
    },
    // // 获取公司信息id
    async getcompanyInfoId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/company/companyInfoList'
      )
      // console.log(data.data)
      this.companyOptions = data.data
      // console.log(this.UserInfoOptions)
    },
    async getaccountTitleId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleList'
      )

      // console.log(data)
      this.accountTitleOptions = this.getTreeData(data.data)
    }, // 递归方法
    getTreeData(data) {
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
    accountHandleChange(value) {
      // console.log(value)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data.data)
      this.departmentOptions = this.getTreeData(data.data)
    },
    departmentHandleChange(value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.department.id = value[value.length - 1] || -1
    },
    // 获取产品线信息id
    async getProductLineId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/productLineList'
      )
      // console.log(data.data)
      this.ProductOptions = data.data
      // console.log(this.UserInfoOptions)
    },
    // 获取项目信息id
    async getprojectInfoId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/project/projectInfoList'
      )
      // console.log(data.data)
      this.projectOption = data.data
      // console.log(this.projectOption)
    },
    // // 立即录入
    async addListModel() {
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
      } else if (this.InoutwriteForm.expenseUserInfo.id == '') {
        this.$message.error('请确认报销人是否填写完整')
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

    async getUserInfoList() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentUserList'
      )
      console.log(data.data)

      this.syroptions = data.data
    },
    async getSupplierId() {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/supplier/supplierList'
      )
      // console.log(data.data)

      this.supplierOptions = data.data
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
