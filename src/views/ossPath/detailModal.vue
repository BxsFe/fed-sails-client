<template>
  <el-dialog
    :visible.sync="show"
    :title="dialogTitle"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form :rules="rules" :model="form" ref="detailForm" :disabled="readonly" label-width="120px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" placeholder="请输入accessKeyId"></el-input>
      </el-form-item>
      <el-form-item label="path" prop="path">
        <el-input v-model="form.path" placeholder="请输入accessKeySecret"></el-input>
      </el-form-item>
      <el-form-item label="key" prop="key">
        <el-input-number v-model="form.key" label="请输入region"></el-input-number>
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
    name: 'a',
    path: 'b',
    key: 0
  }
}
export default {
  data() {
    return {
      readonly: false,
      form: defaultDetail(),
      rules: {
        name: [{
          required: true, message: '请输入name', trigger: 'blur'
        }],
        path: [{
          required: true, message: '请输入path', trigger: 'blur'
        }],
        key: [{
          required: true, message: '请输入key', trigger: 'blur'
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
    submit(item) {
      this.$refs.detailForm.validate(valid => {
        if (!valid) { return }
        if (this.isNew) {
          this.newOsskey()
        } else {
          this.updateOsskey()
        }
      })
    },
    newOsskey() {
      this.$store.dispatch('ossPath/createOsskey', this.form).then(res => {
        if (res.code === 200) {
          this.show = false
          this.$emit('update')
        } else {
          console.error(res)
        }
      }).catch(e => {
        this.$message(e.message)
      })
    },
    updateOsskey() {
      this.$store.dispatch('ossPath/updateOsskey', { id : this.detail.id, form: this.form}).then(res => {
        if (res.code === 200) {
          this.show = false
          this.$emit('update')
        } else {
          console.error(res)
        }
      }).catch(e => {
        this.$message(e.message)
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
    ...mapState('ossPath', {
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
