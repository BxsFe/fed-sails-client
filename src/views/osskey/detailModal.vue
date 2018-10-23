<template>
  <el-dialog
    :visible.sync="show"
    :title="dialogTitle"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form :rules="rules" :model="form" ref="detailForm" :disabled="readonly" label-width="120px">
      <el-form-item label="accessKeyId" prop="accessKeyId">
        <el-input v-model="form.accessKeyId" placeholder="请输入accessKeyId"></el-input>
      </el-form-item>
      <el-form-item label="accessKeySecret" prop="accessKeySecret">
        <el-input v-model="form.accessKeySecret" placeholder="请输入accessKeySecret"></el-input>
      </el-form-item>
      <el-form-item label="region" prop="region">
        <el-input v-model="form.region" placeholder="请输入region"></el-input>
      </el-form-item>
      <el-form-item label="bucket" prop="bucket">
        <el-input v-model="form.bucket" placeholder="请输入bucket"></el-input>
      </el-form-item>
      <el-form-item label="cdn" prop="cdn">
        <el-input v-model="form.cdn" placeholder="请输入cdn"></el-input>
      </el-form-item>
      <el-form-item label="type" prop="type">
        <el-input v-model="form.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="des" prop="des">
        <el-input v-model="form.des" placeholder="请输入描述"></el-input>
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
    accessKeySecret: 'a',
    accessKeyId: 'b',
    region: 'c',
    bucket: 'd',
    type: 'e',
    des: ''
  }
}
export default {
  data() {
    return {
      readonly: false,
      form: defaultDetail(),
      rules: {
        accessKeySecret: [{
          required: true, message: '请输入accessKeySecret', trigger: 'blur'
        }],
        accessKeyId: [{
          required: true, message: '请输入accessKeyId', trigger: 'blur'
        }],
        region: [{
          required: true, message: '请输入region', trigger: 'blur'
        }],
        bucket: [{
          required: true, message: '请输入bucket', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请输入type', trigger: 'blur'
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
      this.$store.dispatch('osskey/createOsskey', this.form).then(res => {
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
      this.$store.dispatch('osskey/updateOsskey', { id : this.detail.id, form: this.form}).then(res => {
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
    ...mapState('osskey', {
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
