<template>
  <div class="found-list-container">
    <el-form
      :inline="true"
      ref="filterBox"
      :model="filterTime"
    >
      <el-form-item label="选择筛选时间">
        <el-date-picker
          v-model="filterTime.startTime"
          type="datetime"
          placeholder="选择起始时间点"
          value-format="timestamp"
        >
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          v-model="filterTime.endTime"
          type="datetime"
          placeholder="选择结束时间点"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleFilter">筛选</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleAdd" :disabled="user.identity != 'manager'">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <el-table
        v-if="currentInfo.length > 0"
        :data="currentInfo"
        max-height="450"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align='center'
          width="70">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          align='center'
          width="250"
          sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align='center'
          width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="收支描述"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          align='center'
          width="170"> 
          <template slot-scope="scope">  
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          align='center'
          width="170">
          <template slot-scope="scope">  
              <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align='center'
          width="170">
          <template slot-scope="scope">  
              <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="operation"
          align='center'
          label="操作"
          fixed="right"
          width="180">
          <template slot-scope='scope'>
              <el-button 
                  type="warning" 
                  icon='edit' 
                  size="small"
                  :disabled="user.identity != 'manager'"
                  @click='handleEdit(scope.row)'
              >编辑</el-button>
              <el-button 
                  type="danger" 
                  icon='delete' 
                  size="small"
                  :disabled="user.identity != 'manager'"
                  @click='handleDelete(scope.row)'
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-contaienr">
          <el-pagination
            v-if="paginations.total > 0"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :toal="paginations.total"
            :current-page.sync="paginations.page_index"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <FormDialog :dialog="dialog" :form="form" @update="handleUpdate"></FormDialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import FormDialog from '../components/FormDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'FoundList',
  components: {
    FormDialog
  },
  data () {
    return {
      currentInfo: [],
      allInfo: [],
      filterTableInfo: [],
      filterTime: {
        startTime: '',
        endTime: ''
      },
      form: {
        type: '',
        description: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      dialog: {
        title: '',
        show: false,
        option: '',
      },
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  created () {
    this.fentchInfo()
  },

  methods: {
    async fentchInfo () {
      console.log('fentch...')
      const resArr = await this.$store.dispatch('info/getAllInfo')
      this.currentInfo = resArr
      this.allInfo = resArr
      this.setPaginations()
    },

    handleArrInfo (payload, type) {
      const currentInfoId = this.currentInfo.findIndex((val) => payload._id == val._id)
      const allInfoId = this.allInfo.findIndex((val) => payload._id == val._id)
      console.log(type)
      if ('delete' == type) {
        this.currentInfo.splice(currentInfoId, 1)
        this.allInfo.splice(allInfoId, 1) 
      } else {
        this.currentInfo.splice(currentInfoId, 1, payload)
        this.allInfo.splice(allInfoId, 1, payload) 
      }
    },

    handleSizeChange (page_size) {
      this.paginations.page_size = page_size
      this.paginations.page_index = 1
      this.currentInfo = this.allInfo.filter((item, index) => {
        return index < page_size
      })
    },

    handleCurrentChange (page) {
      const previosNum = this.paginations.page_size * (page - 1)
      const leftInfo = this.allInfo.filter((item, index) => {
        return index >= previosNum
      })
      this.currentInfo = leftInfo.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },

    setPaginations () {
      this.paginations.total = this.allInfo.length
      this.paginations.page_size = 5
      this.paginations.page_index = 1
      this.currentInfo = this.allInfo.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },

    handleFilter () {
      if (!this.filterTime.startTime || !this.filterTime.endTime) {
        Notification({
          title: 'Warning',
          message: '请完整填写筛选条件',
          type: 'warning',
          duration: 1000,
          showClose: false
        })
      } else {
        this.allInfo = this.allInfo.filter((item) => {
          const date = new Date(item.date)
          const tempDate = date.getTime()
          return tempDate >= this.filterTime.startTime && tempDate <= this.filterTime.endTime
        })
        this.setPaginations()
      }
    },

    handleAdd () {
      this.dialog = {
        show: true,
        title: '添加',
        option: 'add'
      }
      this.form = {
        type: '',
        description: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    },

    handleEdit (payload) {
      this.dialog = {
        show: true,
        title: '编辑',
        option: 'edit'
      }
      this.form = {
        type: payload.type,
        description: payload.description,
        income: payload.income,
        expend: payload.expend,
        cash: payload.cash,
        remark: payload.remark,
        id: payload._id
      }
    },

    handleUpdate (payload, type) {
      if ('add' == type) {
        this.currentInfo.push(payload)
        this.allInfo.push(payload)
      } else {
        this.handleArrInfo(payload, type)
      }
    },

    async handleDelete (rowData, index) {
      const res = await this.$store.dispatch('info/deleteInfo', rowData._id)
      if ('success' == res) {
        Notification({
          title: 'Success',
          message: '删除该条目成功',
          type: 'success',
          duration: 1000,
          showClose: false
        })
        this.handleArrInfo(rowData, 'delete')
      } else {
        console.log(res)
        Notification({
          title: 'Error',
          message: '删除失败',
          type: 'error',
          duration: 1000,
          showClose: false
        })
      }
    }
  }
}
</script>
