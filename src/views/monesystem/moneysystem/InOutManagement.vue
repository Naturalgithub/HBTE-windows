<template>
  <div class="InOutQuery">
    <!-- 部门收支信息表格 -->
    <div class="export">
      <el-button
        @click="output"
        style="margin-bottom: 10px; margin-right:60px"
        size="medium"
        type="success"
      >导出</el-button>
      <!-- <el-button style="margin-bottom: 10px;" size="medium" type="primary">导入</el-button>  -->
      制单日期：
      <el-date-picker
        style="margin-bottom:20px"
        v-model="valueDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="roundDate"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <el-table
      id="table"
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 20px;margin-top:10px"
      size="mini"
      row-key="accountTitleId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}"
    >
      <el-table-column prop="accountTitleName" sortable label="费用明细/部门" fixed width="153"></el-table-column>
      <!-- accountCount -->
      <el-table-column label="合计" prop="accountCount">
        <template v-slot:default="{ row }">{{countRow(row.sum)=='NaN'?'':countRow(row.sum)}}</template>
      </el-table-column>
      <el-table-column :label="item.name" v-for="item in dapartmentList" :key="item.id">
        <template v-slot:default="{ row }">{{lastCountRow(row,item.id)}}</template>

        <!-- {{item.id}} -->
        <el-table-column prop :label="item1.name" v-for="item1 in item.children" :key="item1.id">
          <template v-slot:default="{ row }">{{lastCountRow(row,item1.id)}}</template>
          <el-table-column prop :label="item2.name" v-for="item2 in item1.children" :key="item2.id">
            <template v-slot:default="{ row }">{{lastCountRow(row,item.id)}}</template>
            <el-table-column
              prop
              :label="item3.name"
              v-for="item3 in item2.children"
              :key="item3.id"
            >
              <template v-slot:default="{ row }">{{lastCountRow(row,item.id)}}</template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '5月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      value: '',
      aa: 11,
      dapartmentList: [],
      tableData: [],
      valueDate: [],
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.getkuaijiList()
    this.getInOutList()
  },
  methods: {
    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ' '
      }
      this.getkuaijiList()
      this.getInOutList()
    },
    output (tableID) {
      /* generate workbook object from table */
      let table = document.querySelector('#' + 'table').cloneNode(true)
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      table.removeChild(table.querySelector('.el-table__fixed'))
      let wb = XLSX.utils.table_to_book(table, { raw: true }) // mytable为表格的id名
      /* get binary string as output */
      let excName = this.companyReport
      if (this.dataEndDate) {
        excName += '(' + this.dataEndDate + ')'
      }
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '各部门收支汇总表' + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    async getkuaijiList () {
      // console.log(this.tableData)
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/getAccountTitleDepartmentSum',
        { params: { startTime: this.startTime, endTime: this.endTime } }
      )
      console.log(data.data)
      let temp = data.data
      let newtemp = []
      for (var i = 0; i < temp.length; i++) {
        if (i > 0 && i < temp.length - 1) {
          newtemp.push(temp[i])
        }
      }
      this.tableData = newtemp
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data)
      this.dapartmentList = data.data
    },
    formatNumberRgx (num) {
      var parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    lastCountRow (row, id) {
      for (var i = 0; i < row.departments.length; i++) {
        if (row.departments[i].id === id) {
          if (row.departments[i].departmentSum !== '0.00') {
            return this.formatNumberRgx(row.departments[i].departmentSum)
          }
        }
      }
    },
    countRow (countNum) {
      let num = Number(countNum)
      if (num == '') {
        return ''
      } else {
        return this.formatNumberRgx(num)
      }
    },
    queryList (value) {
      this.getkuaijiList()
    }
  }
}
</script>
