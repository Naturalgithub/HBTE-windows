<template>
  <div class="ApplicationList">
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

    <!-- 代办表 -->
    <!-- <el-input v-model="search" placeholder="请输入内容"></el-input> -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column sortable label="单据类型">
        <template v-slot:default="{ row }">
          <span v-if="row.incomeExpenseInfo.incomeExpenseType==0">收款单据</span>
          <span v-if="row.incomeExpenseInfo.incomeExpenseType==1">付款单据</span>
          <span v-if="row.incomeExpenseInfo.incomeExpenseType==2">报销单据</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="userInfo.name" label="申请人"></el-table-column>
      <el-table-column sortable prop="eventTime" label="申请日期"></el-table-column>
      <el-table-column sortable prop="incomeExpenseInfo.oddNumber" label="单号">
        <template v-slot:default="{ row }">
          <a
            href="###"
            @click="queryInout(row.incomeExpenseInfo.incomeExpenseInfoId)"
          >{{row.incomeExpenseInfo.oddNumber}}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="eventComment" label="备注"></el-table-column> -->
      <el-table-column label="状态">
        <template v-slot:default="{row}">
          <el-button
            v-if="row.actExecution.actExecutionStatus === 0"
            type="info"
            size="small"
            disabled
          >未处理</el-button>
          <el-button v-else type="success" size="small" disabled>已处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30,50,80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 查看模态框 -->
    <el-dialog title="当前进度" :visible.sync="dialogVisible" width="40%">
      <el-table border style="width: 100%" :data="checkDataa">
        <el-table-column prop="userInfo.name" label="名字"></el-table-column>
        <el-table-column prop="actExecutionTime" label="时间"></el-table-column>
        <el-table-column prop="actExecutionComment" label="备注"></el-table-column>
        <el-table-column label="状态" sortable>
          <template v-slot:default="{ row }">
            <el-button v-if="row.actExecutionStatus === 0" type="info" disabled size="small">未处理</el-button>
            <el-button v-if="row.actExecutionStatus === 1" type="success" disabled size="small">同意</el-button>
            <el-button v-if="row.actExecutionStatus === 2" type="danger" disabled size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 单据模态框 -->
    <el-dialog :title="inOutTitle" :visible.sync="queryDialogVisible" width="40%">
      <div class="tempChapter">
        <div class="chapter" :style="chapter">
          <span>{{chapterTxt}}</span>
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
          <td>
            <span v-if="passForm.supplier.supplierName">{{passForm.supplier.supplierName}}</span>
            <span v-else>\</span>
          </td>
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
          <td>
            <span v-if="passForm.incomeAmount">{{passForm.incomeAmount}}</span>
            <span v-else>\</span>
          </td>
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
          <td>
            <span v-if="passForm.customerInfo.customerName">{{passForm.customerInfo.customerName}}</span>
            <span v-else>\</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>账号</b>
          </td>

          <td>
            <span v-if="passForm.account">{{passForm.account}}</span>
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
            <span v-if="passForm.department.name">{{passForm.department.name}}</span>
            <span v-else>\</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>报销人</b>
          </td>
          <td>
            <span v-if="passForm.expenseUserInfo.name">{{passForm.expenseUserInfo.name}}</span>
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
            <span v-if="passForm.projectInfo.projectName">{{passForm.projectInfo.projectName}}</span>
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
        <tr
          v-for=" eventInfoItem in passForm.eventInfo.actExecutions"
          :key="eventInfoItem.actExecutionId"
        >
          <td>{{eventInfoItem.userInfo.name}}</td>
          <td>{{eventInfoItem.actExecutionTime}}</td>
          <td>{{eventInfoItem.actExecutionComment}}</td>
          <td>
            <span
              v-if="$store.state.id == eventInfoItem.userInfo.id &&  eventInfoItem.actExecutionStatus == 0 ?true : false "
            >
              <el-button
                style="margin:3px 0"
                type="success"
                @click="sp(1,eventInfoItem)"
                :disabled="once"
                size="mini"
              >同意</el-button>
              <el-button
                style="margin:3px 0"
                type="danger"
                @click="sp(2,eventInfoItem)"
                :disabled="once"
                size="mini"
              >拒绝</el-button>
            </span>
            <span style="margin:3px 0" v-else-if="eventInfoItem.actExecutionStatus == 0">待处理</span>
            <span style="margin:3px 0" v-else-if="eventInfoItem.actExecutionStatus == 1">已同意</span>

            <span style="margin:3px 0" v-else>已拒绝</span>
            <!-- <span v-else >待处理</span> -->
          </td>
        </tr>
      </table>
      <el-form ref="form" :model="passForm" label-width="80px"></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="queryDialogVisible = false">取 消</el-button>
        <el-button @click="queryDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      dateOptions: [
        {
          value: 0,
          label: '未处理'
        },
        {
          value: 1,
          label: '已处理'
        },
        {
          value: 3,
          label: '全部'
        }
      ],
      inOutWayId: '',
      personId: '',
      chapterTxt: '',
      startTime: '',
      endTime: '',
      valueDate: '',
      total: 2,
      chapter: 'border:3px solid red;color:red',
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      once: false,
      queryDialogVisible: false,
      passForm: {
        eventInfo: { actExecutions: [], eventInfoId: '' },
        expenseUserInfo: { name: '' },
        actualName: '',
        clerk: '',
        incomeExpenseInfoId: '',
        comment: '',
        account: '',
        // aa: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          id: '',
          name: ''
        },
        supplier: { supplierName: '' },

        paymentTermId: '',
        currencyInfo: {
          currencyInfoId: ''
        },
        incomeAmount: '',
        expenseAmount: '',

        customerInfo: {
          customerInfoId: '',
          customerName: ''
        },
        bankInfo: {
          bankInfoId: ''
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
          departmentId: ''
        },
        productLine: {
          productLineId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        sumRatio: '',
        actExecutions: []
      },
      checkDataa: [],
      search: '',
      tableData: [],
      form: {
        test: 1,
        text: ''
      },
      dialogVisible: false,
      inOutTitle: '',
      eventStatus: ''
    }
  },
  created () {
    this.getactTodoList()
  },
  methods: {
    dateIdChange (dateType) {
      console.log(dateType)
      if (dateType === 3) {
        this.eventStatus = ''
        this.getactTodoList()
        return
      } else {
        this.eventStatus = dateType
      }
      this.getactTodoList()
    },
    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }

      this.getactTodoList()
    },
    async checkdata (id) {
      // console.log(22)

      // console.log(id)
      this.dialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/actExecution/getActExecution',
        { params: { eventInfoId: id } }
      )
      // console.log(data.data)
      this.checkDataa = data.data
      // this.total = data.data.length
    },
    async getactTodoList () {
      const temp = JSON.parse(localStorage.getItem('data'))
      // console.log(temp.userInfoId)
      // this.userInfoId = temp.userInfoId

      const { data } = await this.$axios.get(
        'hbte-financial/hbte/actTodo/actTodoList',
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            id: temp.id,
            startTime: this.startTime,
            endTime: this.endTime,
            actExecutionStatus: this.eventStatus
          }
        }
      )
      // console.log(data)
      this.tableData = data.data
      this.total = data.count
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getactTodoList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getactTodoList()
    },
    async queryInout (id) {
      console.log(2)
      this.queryDialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: { incomeExpenseInfoId: id }
        }
      )
      console.log(data.data)
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
        this.chapterTxt = '进行中'
        this.chapter = 'border:3px solid #ccc;color:#ccc'
      } else if (data.data.actStatus == 1) {
        this.chapterTxt = '已同意'
        this.chapter =
          'border:3px solid rgb(103, 194, 58);color:rgb(103, 194, 58)'
      } else if (data.data.actStatus == 2) {
        this.chapterTxt = '已拒绝'
        this.chapter = 'border:3px solid red;color:red'
      } else {
      }
      // this.inOutTitle = data.data.incomeExpenseType
      // this.queryDialogVisible
    },
    async sp (v, eventInfoItem) {
      console.log(v, eventInfoItem)
      this.queryDialogVisible = false
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/actExecution/updateActExecution',
        {
          actExecutionId: eventInfoItem.actExecutionId,
          actExecutionStatus: v,
          eventInfo: {
            eventInfoId: this.passForm.eventInfo.eventInfoId,
            eventTime: this.passForm.eventInfo.eventTime,
            eventComment: this.passForm.eventInfo.eventComment,
            userInfo: {
              id: this.passForm.userInfo.id
            }
          },
          incomeExpenseInfo: {
            incomeExpenseInfoId: this.passForm.incomeExpenseInfoId
          }
        }
      )
      // this.once = false
      // console.log(data)
      this.getactTodoList()
    }
  }
}
</script>

<style>
.chapter {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: raba(0, 0, 0, 0);
  transform: rotate(-25deg);
  position: relative;
}

.chapter span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 16px;
}
.tempChapter {
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
