<template>
  <div class="ApplicationList">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审批管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 日期选择器 -->
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="7">
        申请时间：
        <el-date-picker
          style="margin-bottom:20px"
          v-model="valueDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="roundDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
      <el-col :xs="4" :sm="6" :md="10" :lg="10" :xl="11">
        操作状态:&nbsp;&nbsp;
        <el-select v-model="inOutWayId" placeholder="请选择操作状态" @change="dateIdChange">
          <el-option
            v-for="item in dateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <!-- 申请表 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column sortable label="单据类型">
        <template v-slot:default="{ row }">
          <span v-show="row.incomeExpenseInfo.incomeExpenseType==0">收款单据</span>
          <span v-show="row.incomeExpenseInfo.incomeExpenseType==1">付款单据</span>
          <span v-show="row.incomeExpenseInfo.incomeExpenseType==2">报销单据</span>
        </template>
      </el-table-column>
      <el-table-column prop="userInfo.name" sortable label="申请人" width="180"></el-table-column>
      <el-table-column sortable prop="eventTime" label="申请日期"></el-table-column>
      <el-table-column prop="incomeExpenseInfo.oddNumber" sortable label="收支单据">
        <!-- {{<a href="###">incomeExpenseInfo.oddNumber</a>}} -->
        <template v-slot:default="{ row }">
          <a
            href="###"
            @click="queryInout(row.incomeExpenseInfo.incomeExpenseInfoId)"
          >{{row.incomeExpenseInfo.oddNumber}}</a>
        </template>
      </el-table-column>

      <el-table-column prop label="状态" sortable>
        <template v-slot:default="{ row }">
          <el-button v-if="row.eventStatus === 0" type="info" size="small" disabled>进行中</el-button>
          <el-button v-if="row.eventStatus === 1" type="success" size="small" disabled>已同意</el-button>
          <el-button v-if="row.eventStatus === 2" type="danger" size="small" disabled>已拒绝</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="eventComment" label="备注"></el-table-column> -->
    </el-table>
    <!-- 分页器 -->
    <!--
      @size-change: 每页条数变化时, 触发
      @current-change: 当前页变化时, 触发
      :current-page 当前页
      :page-sizes 可供选择每页条数的选择项
      :page-size 每页条数
      layout 显示的功能控件
    -->
    <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 单据模态框 -->
    <el-dialog :title="inOutTitle" :visible.sync="querydialogVisible" width="40%">
      <div class="rongqi">
        <div class="zhang" :style="chapater">
          <span>{{chapaterTxt}}</span>
        </div>
      </div>
      <!-- <hr> -->
      <table class="selfTable" border="1">
        <tr class="tr">
          <td>
            <b>单据</b>
          </td>
          <td colspan="3">{{passForm.oddNumber}}</td>
        </tr>
        <tr>
          <td>
            <b>制单人</b>
          </td>
          <td>{{passForm.userInfo.name}}</td>
          <td>
            <b>供应商</b>
          </td>
          <td>{{passForm.supplier.supplierName}}</td>
        </tr>
        <tr>
          <td>
            <b>收款方式</b>
          </td>
          <td>{{passForm.paymentTermName}}</td>
          <td>
            <b>货币信息</b>
          </td>
          <td>{{passForm.currencyInfo.currencyName}}</td>
        </tr>
        <tr>
          <td>
            <b>收入金额</b>
          </td>
          <td>{{passForm.incomeAmount}}</td>
          <td>
            <b>支出金额</b>
          </td>
          <td>
            <span v-if="passForm.expenseAmount">{{passForm.expenseAmount}}</span>
            <span v-else>\</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>摘要</b>
          </td>
          <td>{{passForm.comment}}</td>
          <td>
            <b>客户信息</b>
          </td>
          <td>{{passForm.customerInfo.customerName}}</td>
        </tr>
        <tr>
          <td>
            <b>账号</b>
          </td>

          <td>
            <span v-if="passForm.expenseAmount">{{passForm.account}}</span>
            <span v-else>\</span>
          </td>
          <td>
            <b>会计科目</b>
          </td>
          <td>{{passForm.accountTitle.accountTitleName}}</td>
        </tr>
        <tr>
          <td>
            <b>公司信息</b>
          </td>
          <td>{{passForm.companyInfo.companyName}}</td>
          <td>
            <b>部门</b>
          </td>
          <td>
            <span v-if="passForm.expenseAmount">{{passForm.department.name}}</span>
            <span v-else>\</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>报销人</b>
          </td>
          <td>
            <span v-if="passForm.expenseAmount">{{passForm.expenseUserInfo.name}}</span>
            <span v-else>\</span>
          </td>
          <td>
            <b>制单日期</b>
          </td>
          <td>{{passForm.createDate}}</td>
        </tr>
        <tr>
          <td>
            <b>项目信息</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.expenseAmount">{{passForm.projectInfo.projectName}}</span>
            <span v-else>\</span>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <b>产品线分摊表</b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>产品线</b>
          </td>
          <td>
            <b>比例</b>
          </td>
          <td>
            <b>金额</b>
          </td>
        </tr>
        <tr v-for="item in passForm.ieProductLines " :key="item.ieProductLineId">
          <td colspan="2">{{item.productLine.productLineName}}</td>
          <td>{{item.sumRatio}}</td>
          <td>{{item.practicalSum}}</td>
        </tr>
        <tr>
          <td colspan="4">
            <b>审批进度</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>审核人</b>
          </td>
          <td>
            <b>审核时间</b>
          </td>
          <td>
            <b>备注</b>
          </td>
          <td>
            <b>状态</b>
          </td>
        </tr>
        <tr v-for=" item in passForm.eventInfo.actExecutions" :key="item.actExecutionId">
          <td>{{item.userInfo.name}}</td>
          <td>{{item.actExecutionTime}}</td>
          <td>{{item.actExecutionComment}}</td>
          <td>
            <span v-if="item.actExecutionStatus === 0">未处理</span>
            <span v-if="item.actExecutionStatus === 1">已同意</span>
            <span v-if="item.actExecutionStatus === 2">已拒绝</span>
          </td>
        </tr>
      </table>
      <!-- <selfTable></selfTable> -->
      <el-form ref="form" :model="passForm" label-width="80px"></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="querydialogVisible = false">取 消</el-button>
        <el-button @click="querydialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inOutWayId: 3,
      dateOptions: [
        {
          value: 0,
          label: '进行中'
        },
        {
          value: 1,
          label: '已同意'
        },
        {
          value: 2,
          label: '已拒绝'
        },
        {
          value: 3,
          label: '全部'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // dateOptions: '',
      inOutTitle: '',
      startTime: '',
      endTime: '',
      chapater: '',
      chapaterTxt: '',
      roundDateValue: '',
      valueDate: '',
      checkDatea: [],
      passForm: {
        expenseUserInfo: { name: '' },
        actualName: '',
        clerk: '',
        incomeExpenseInfoId: '',
        comment: '',
        account: '',
        tempa: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          userInfoId: '',
          id: '',
          name: ''
        },
        paymentTermName: '',
        currencyInfo: {
          currencyInfoId: ''
        },
        supplier: { supplierName: '' },
        incomeAmount: '',
        expenseAmount: '',

        customerInfo: {
          customerInfoId: '',
          customerName: ''
        },
        bankInfo: {
          bankInfoId: '',
          bankName: ''
        },
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: '',
          companyName: ''
        },
        department: {
          departmentId: '',
          nameL: ''
        },
        productLine: {
          productLineId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        sumRatio: '',
        actExecutions: [],
        eventInfo: {
          actExecutions: []
        }
      },

      search: '',
      total: 2,
      page: 1,
      pageSize: 30,
      userInfoId: '',
      tableData: [],
      form: {
        test: 1,
        text: ''
      },
      dialogVisible: false,
      querydialogVisible: false,
      eventStatus: ''
    }
  },
  created () {
    this.getEventInfoList()
    // this.queryInout()
  },
  methods: {
    dateIdChange (dateType) {
      console.log(dateType)
      if (dateType === 3) {
        this.eventStatus = ''
        this.getEventInfoList()
        return
      } else {
        this.eventStatus = dateType
      }
      this.getEventInfoList()
    },
    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }

      this.getEventInfoList()
    },
    async delData (id) {
      // const {data} = await this.$axios.post('',{})
    },
    async checkDate (id) {
      // console.log(id)
      this.dialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/actExecution/getActExecution',
        { params: { eventInfoId: id } }
      )
      // console.log(data.data)
      this.checkDatea = data.data
    },
    async getEventInfoList () {
      const tempa = JSON.parse(localStorage.getItem('data'))

      this.userInfoId = tempa.id
      // console.log(tempa.userInfoId)
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/event/eventInfoList',
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            id: this.userInfoId,
            startTime: this.startTime,
            endTime: this.endTime,
            eventStatus: this.eventStatus
          }
        }
      )
      // console.log(data.count)
      this.tableData = data.data
      this.total = data.count
    },
    async queryInout (id) {
      // console.log(id)
      this.querydialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: {
            incomeExpenseInfoId: id
          }
        }
      )
      // console.log(data.data)
      this.passForm = data.data
      if (data.data.incomeExpenseType == 0) {
        this.inOutTitle = '收款单据'
      } else if (data.data.incomeExpenseType == 1) {
        this.inOutTitle = '付款单据'
      } else if (data.data.incomeExpenseType == 2) {
        this.inOutTitle = '报销单据'
      } else {
        this.inOutTitle = '其他单据'
      }
      if (data.data.actStatus == 0) {
        this.chapaterTxt = '进行中'
        this.chapater = 'border:3px solid #ccc;color:#ccc'
      } else if (data.data.actStatus == 1) {
        this.chapaterTxt = '已同意'
        this.chapater =
          'border:3px solid rgb(103, 194, 58);color:rgb(103, 194, 58)'
      } else if (data.data.actStatus == 2) {
        this.chapaterTxt = '已拒绝'
        this.chapater = 'border:3px solid red;color:red'
      } else {
      }
      // this.total = data.data.count
      // console.log(data.data)
      // this.querydialogVisible
    },
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getEventInfoList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getEventInfoList()
    }
  }
}
</script>

<style>
.zhang {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: raba(0, 0, 0, 0);
  transform: rotate(-25deg);
  position: relative;
}

.zhang span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 16px;
}
.rongqi {
  position: absolute;
  right: 20px;
  top: 40px;
}
.el-dialog__body {
  padding-top: 10px;
}
</style>
<style style lang='scss'>
.selfTable {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
  tr {
    height: 30px;
    td,
    th {
      border: 1px solid #000;
    }
    th {
      background-color: #000;
      color: white;
    }
    td {
      width: 25%;
      text-align: center;
    }
  }
}
</style>
