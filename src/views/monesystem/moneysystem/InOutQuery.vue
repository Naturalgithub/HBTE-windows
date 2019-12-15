<template>
  <div class="InOutQuery">
    <!-- 查询 -->
    <el-form>
      <el-row>
        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
          <el-button type="success" @click="exportTable">导出</el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="7">
          <div class="block">
            制单日期：
            <el-date-picker
              v-model="valueDate"
              @change="roundDate(valueDate)"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
          <el-form-item label="单据类型">
            <el-select v-model="inoutwayid" placeholder="请选择单据类型" @change="dateidchange">
              <el-option
                v-for="item in dateoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 收支信息表格 -->
    <template>
      <el-table id="table-data" :data="tableData" style="width: 100%" border size="mini">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="单据类型">
          <template v-slot:default="obj">
            <!-- {{obj.row.incomeExpenseInfo.incomeExpenseType}} -->
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==0">收款单据</span>
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==1">付款单据</span>
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==2">报销单据</span>
            <!-- <span :v-show="obj.row.incomeExpenseType==3">收款单据</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="incomeExpenseInfo.userInfo.name" label="制单人"></el-table-column>
        <el-table-column
          v-if="inoutwayid==2||inoutwayid==3"
          prop="incomeExpenseInfo.expenseUserInfo.name"
          label="报销人"
        ></el-table-column>
        <!-- <el-table-column prop="incomeExpenseInfo.actualName" label="实际制单人"></el-table-column> -->
        <!-- <el-table-column prop="incomeExpenseInfo.clerk" label="业务员"></el-table-column> -->
        <el-table-column prop="incomeExpenseInfo.oddNumber" label="制单号"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.createDate" label="制单日期"></el-table-column>
        <!-- <el-table-column prop="userInfo.userInfoId" label="userInfoId"></el-table-column> -->
        <!-- <el-table-column prop="incomeExpenseInfo.createTime" label="制单时间"></el-table-column> -->
        <el-table-column prop="incomeExpenseInfo.paymentTermName" label="收付方式"></el-table-column>
        <!-- <el-table-column prop="incomeExpenseInfo.currencyInfo.currencyName" label="货币名称"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.currencyInfo.currencyRatio" label="货币兑率"></el-table-column>-->
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==3"
          prop="incomeExpenseInfo.expenseAmount"
          label="支出金额"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==0||inoutwayid==3"
          prop="incomeExpenseInfo.incomeAmount"
          label="收入金额"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==0||inoutwayid==3"
          prop="incomeExpenseInfo.customerInfo.customerName"
          label="客户名称"
        ></el-table-column>

        <el-table-column prop="incomeExpenseInfo.companyInfo.companyName" label="公司名称"></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==3"
          prop="incomeExpenseInfo.supplier.supplierName"
          label="供应商名称"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==3"
          prop="incomeExpenseInfo.supplier.bankInfo.bankName"
          label="供应商开户行"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==3"
          prop="incomeExpenseInfo.supplier.supplierAccount"
          label="供应商银行账号"
        >
          <template v-slot:default="{row}">
            <span v-if="inoutwayid==1||inoutwayid==3">{{10111401040006591}}*</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==3"
          prop="incomeExpenseInfo.department.name"
          label="部门名称"
        ></el-table-column>
        <!-- <el-table-column prop="incomeExpenseInfo.projectInfo.projectName" label="项目名称"></el-table-column> -->
        <el-table-column prop="incomeExpenseInfo.accountTitle.accountTitleName" label="会计科目"></el-table-column>
        <el-table-column prop="productLine.productLineName" label="产品线名称"></el-table-column>
        <el-table-column prop="sumRatio" label="产品线比例"></el-table-column>
        <el-table-column prop="practicalSum" label="产品线金额"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.comment" label="摘要"></el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
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
  </div>
</template>

<script>
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
export default {
  data () {
    return {
      exportTable () {
        let box = xlsx.utils.table_to_book(
          document.querySelector('#table-data')
        )
        let out = xlsx.write(box, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          fileSaver.saveAs(
            new Blob([out], {
              type: 'application/octet-stream'
            }),
            '收支单查询.xlsx'
          )
        } catch (e) {
          // 错误处理方式
        }
        return out
      },

      dateoptions: [
        {
          value: 0,
          label: '收款'
        },
        {
          value: 1,
          label: '付款'
        },
        {
          value: 2,
          label: '报销'
        },
        {
          value: 3,
          label: '全部'
        }
      ],
      queryinoutquery: {
        createDate: ''
      },
      total: 0,
      inoutwayid: 3,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,

      tableData: [],
      roundDateValue: '',
      startTime: '',
      endTime: '',
      valueDate: ''
    }
  },
  created () {
    this.getInOutList()
  },
  methods: {
    roundDate (i) {
      console.log(i)
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
        console.log(this.valueDate)
        this.getInOutList()
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.getInOutList()
    },
    querydata (value) {
      // console.log(value)
      this.getInOutList()
    },
    dateidchange () {
      this.getInOutList()
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getInOutList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getInOutList()
    },
    async getInOutList () {
      // let type = this.inoutwayid == 3 ? '' : this.inoutwayid

      // console.log(this.valueDate[0])

      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/getProductLineIe',
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            incomeExpenseType: this.inoutwayid,
            startTime: this.startTime,
            endTime: this.endTime
          }
        }
      )
      // console.log(data.data)
      this.tableData = data.data
      this.total = data.count
    }
  },
  computed: {
    trunDate (num) {
      return num + '*'
    }
  }
}
</script>

<style>
</style>
