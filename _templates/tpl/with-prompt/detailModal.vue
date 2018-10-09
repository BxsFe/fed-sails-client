---
to: src/views/<%= viewName %>/detailModal.vue
---
<template>
  <el-dialog
    :visible.sync="show"
    :title="dialogTitle"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form :rules="rules" :model="form" ref="detailForm" :disabled="readonly" label-width="120px">
      <el-form-item label="请" prop="msg">
        <el-input v-model="form.msg" placeholder="请"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
function defaultDetail() {
  return {
    msg: '',
    times: []
  }
}
export default {
  data() {
    return {
      readonly: false,
      form: defaultDetail(),
      rules: {
        msg: [{
          required: true, message: '请输入姓名', trigger: 'blur'
        }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.$refs.detailForm.validate(valid => {
        if (!valid) { return }
        this.$emit('update')
      })
    },
    openDialog() {
      if (!this.isNew) {
        this.form = Object.assign({}, this.detail)
      }
    },
    closeDialog() {
      this.$refs.detailForm.clearValidate()
      this.form = defaultDetail()
    }
  },
  computed: {
    // 替换vuex的命名空间
    ...mapState('<%= viewName %>', {
      detail: state => state.detail,
      isNew: state => state.isNew
    }),
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    dialogTitle() {
      return this.isNew ? '新建' : '编辑'
    }
  }
}
</script>
