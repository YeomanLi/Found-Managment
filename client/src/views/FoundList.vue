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
        >
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          v-model="filterTime.endTime"
          type="datetime"
          placeholder="选择结束时间点"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleFilter">筛选</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- {{thisInfo}} -->
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
                  @click='handleEdit(scope.row)'
              >编辑</el-button>
              <el-button 
                  type="danger" 
                  icon='delete' 
                  size="small"
                  @click='handleDelete(scope.row)'
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <FormDialog :dialog="dialog" :form="form" @update="handleUpdate"></FormDialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import FormDialog from '../components/FormDialog'
export default {
  name: 'FoundList',
  components: {
    FormDialog
  },
  data () {
    return {
      currentInfo: [],
      allTableInfo: [],
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
      }
    }
  },
  created () {
    this.fentchInfo()
  },

  methods: {
    async fentchInfo () {
      console.log('fentch...')
      const resArr = await this.$store.dispatch('info/getAllInfo')
      this.currentInfo = resArr
      this.allTableInfo = resArr
    },

    handleFilter () {
      console.log(this.filterTime)
    },

    handleAdd () {
      console.log('add')
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

    handleUpdate (payload, type) {
      if ('add' == type) {
        this.currentInfo.push(payload)
      }
    },

    handleEdit () {
      console.log('edit')
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
        const thisIndex = this.currentInfo.findIndex((val) => rowData._id == val._id)
        if (-1 < thisIndex) this.currentInfo.splice(thisIndex, 1)
        else  console.log('???')
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
