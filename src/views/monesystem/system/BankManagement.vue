<template>
  <div class="users">
    <!-- 搜索框 -->
    <!-- <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select search">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>-->
    <!-- 按钮添加 -->
    <el-button class="addBtn" type="success" @click="dialogVisible = true">添加</el-button>
    <!-- <el-row>
      <a class="luruinput" href="###">
        <input type="file" ref="fileInput" @change="getFile">
        导&nbsp;&nbsp;&nbsp;&nbsp;入
      </a>
      <p style="color:green;margin-bottom:10px" v-if="huixianame">
        {{huixianame}}
        <el-button @click="sureupload" size="small">立即上传</el-button>
      </p>
    </el-row>-->
    <!-- 表格组件 -->
    <el-table style="margin-top:10px" :data="momeyManagementList" border size="mini">
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="bankName" label="银行名称"/>
      <el-table-column prop="bankAddress" label="银行地址"/>

      <el-table-column label="操作">
        <!-- row这个参数, 是element ui内部, 定义slot时, 传递过来的 -->
        <template v-slot:default="obj">
          <el-button
            plain
            size="small"
            @click="showEditDialog(obj.row)"
            type="primary"
            icon="el-icon-edit"
          />
          <el-button
            plain
            size="small"
            @click="delUser(obj.row.bankInfoId)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
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
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30, 50, 80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <!-- 模态框 -->
    <el-dialog title="银行管理" :visible.sync="dialogVisible" width="40%">
      <el-form :rules="rules" ref="ruleForm" :model="form" status-icon label-width="100px">
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="银行名称"/>
        </el-form-item>

        <el-form-item label="银行地址" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="银行地址"/>
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="moneyadd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="40%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="银行名称">
          <el-input v-model="editForm.bankName"/>
        </el-form-item>
        <el-form-item label="银行地址" prop="email">
          <el-input v-model="editForm.bankAddress"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMoney">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      wenjian: '',
      form1: '',

      query: '',
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      // bankInfoId: '1',
      momeyManagementList: [], // userList: [],
      dialogVisible: false,
      // 表单的数据
      form: {
        bankName: '',
        bankAddress: ''
      },
      editForm: {
        bankInfoId: '',
        bankName: '',
        bankAddress: ''
      },

      // 表单校验规则
      rules: {
        bankName: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '用户名长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        bankAddress: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '密码长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      editVisible: false,
      assignVisible: false,
      // 分配表单的数据
      assignForm: {
        id: '',
        rid: '',
        username: ''
      },
      roleList: [],
      huixianame: ''
    }
  },
  created () {
    this.getMoneyList()
  },
  methods: {
    async getFile (event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.form1 = form
      const files = event.target.files
      // console.log(files[0])
      this.huixianame = files[0].name
      // console.log(event)
      this.wenjian = files[0]
      this.form1.append('file', this.wenjian) // 文件对象 注意第二个是一个文件对象
      this.form1.append('incomeExpenseType', 5) // 单据类型
      // 类似于 File { name: "付款.xls", lastModified: 1575285768023, lastModifiedDate: Mon Dec 02 2019 19: 22: 48 GMT + 0800(中国标准时间), webkitRelativePath: "", size: 22016, … }
    },
    async sureupload () {
      this.huixianame = ''
      // console.log(this.wenjian)
      // console.log(this.form1)
      // let form = new FormData() // FormData 对象
      // form.append('file', this.wenjian ) // 文件对象
      let that = this
      $.ajax({
        url:
          'http://192.168.2.38:8080/hbte-financial/hbte/supplier/importSupplierInfo', // url地址
        type: 'POST', // 上传方式
        data: this.form1, // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头error
        success: function (data) {
          // 成功回调
          that.getMoneyList()
          // console.log(data)
          if (data.code == 0) {
            that.$message.success('导入成功成功')
          } else {
            that.$message.error(data.errorMsg)
          }
        },
        error: function (data) {
          // 失败回调
          // console.log(data)
        }
      })
    },
    async getMoneyList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/bank/bankInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      // console.log(data.data)
      this.momeyManagementList = data.data
      this.total = data.data.length
      // console.log(this.$axios)
    }, // getMoneyList () {
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getMoneyList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getMoneyList()
    },
    showEditDialog (row) {
      this.editVisible = true
      // console.log(row)
      // 回显基本的数据
      this.editForm.bankName = row.bankName
      this.editForm.bankAddress = row.bankAddress

      this.editForm.bankInfoId = row.bankInfoId
    },
    async delUser (id) {
      // console.log(id)
      // console.log(data)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/bank/delBankInfo',
          {
            bankInfoId: id
          }
        )
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      } catch (e) {
        // console.log(e)
      }
      // if (data.code === 0) {
      //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       })
      //     })
      this.getMoneyList()
      // } else {
      //   this.$message.error('删除失败')
      // }
    },
    async editMoney () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/bank/updateBankInfo',
        this.editForm
      )
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.editVisible = false
      // console.log(data)
      this.getMoneyList()
    },
    async moneyadd () {
      try {
        this.dialogVisible = false
        await this.$refs.ruleForm.validate()
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/bank/saveBankInfo',
          this.form
        )
        if (data.code === 0) {
          this.$message.success('添加成功')
        } else {
          this.$message.error(data.errorMsg)
          // console.log(data.errorMsg)
        }
        this.getMoneyList()

        // console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 300px;
  margin-bottom: 10px;
}
.addBtn {
  margin-bottom: 20px;
}
.el-pagination {
  margin-top: 10px;
}
.addBtn {
  margin-bottom: 10px;
}
.luruinput {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
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
</style>
