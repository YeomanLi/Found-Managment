<template>
  <div class="dialog-container">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show">
      <div class="form-container">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto;">
            <el-form-item label="收支类型">
              <el-select v-model="form.type" placeholder="收支类型">
                <el-option
                  v-for="(formtype, index) in form_type_list"
                  :key="index"
                  :label="formtype"
                  :value="formtype"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop='description' label="收支描述:">
              <el-input type="description" v-model="form.description"></el-input>
            </el-form-item>

            <el-form-item prop='income'  label="收入:">
              <el-input type="income" v-model="form.income"></el-input>
            </el-form-item>

            <el-form-item prop='expend' label="支出:">
              <el-input type="expend" v-model="form.expend"></el-input>
            </el-form-item>

            <el-form-item prop='cash' label="账户现金:">
              <el-input type="cash" v-model="form.cash"></el-input>
            </el-form-item>

            <el-form-item label="备注:">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item  class="text_right">
              <el-button @click="dialog.show = false">取消</el-button>
              <el-button type="primary" @click='onSubmit("form")'>提交</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
export default {
  name: 'FormDialog',
  props: {
    dialog: Object,
    form: Object
  },
  data () {
    return {
      form_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],

      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }
  },

  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const actionsType = 'add' == this.dialog.option ? 'addInfo' : 'editInfo'
          this.$store.dispatch(`info/${ actionsType }`, this.form)
                     .then(res => {
                       console.log(res)
                       this.$emit('update', res.data, this.dialog.option)
                       this.dialog.show = false
                     })
                     .catch(err => console.log(err))
        }
      })
    }
  }
}
</script>
