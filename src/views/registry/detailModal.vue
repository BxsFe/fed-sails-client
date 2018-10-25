<template>
  <el-dialog
    :visible.sync="show"
    :title="dialogTitle"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form :rules="rules" :model="form" ref="detailForm" :disabled="readonly" label-width="120px">
      <el-form-item label="业务组" prop="group">
        <el-input v-model="form.group" placeholder="请输入业务组"></el-input>
      </el-form-item>
      <el-form-item label="业务线" prop="type">
        <el-input v-model="form.type" placeholder="请输入业务线"></el-input>
      </el-form-item>
      <el-form-item label="前端" prop="frontend">
        <el-input v-model="form.frontend" placeholder="请输入前端"></el-input>
      </el-form-item>
      <el-form-item label="前端" prop="frontendPoc">
        <el-input v-model="form.frontendPoc" placeholder="请输入前端"></el-input>
      </el-form-item>
      <el-form-item label="服务端" prop="backend">
        <el-input v-model="form.backend" placeholder="请输入服务端"></el-input>
      </el-form-item>
      <el-form-item label="测试" prop="tester">
        <el-input v-model="form.tester" placeholder="请输入测试"></el-input>
      </el-form-item>
      <el-form-item label="代码仓库地址" prop="registry">
        <el-input v-model="form.registry" placeholder="请输入代码仓库地址"></el-input>
      </el-form-item>
      <el-form-item label="上线负责人" prop="master">
        <el-input v-model="form.master" placeholder="请输入上线负责人"></el-input>
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
    group: 'a',
    type: 'a',
    frontend: 'a',
    frontendPoc: 'a',
    backend: 'a',
    tester: 'a',
    registry: 'a',
    master: 'a'
  }
}
export default {
  data() {
    return {
      readonly: false,
      form: defaultDetail(),
      rules: {
        group: [{
          required: true, message: '请输入业务组', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请输入业务线', trigger: 'blur'
        }],
        registry: [{
          required: true, message: '请输入仓库地址', trigger: 'blur'
        }],
        master: [{
          required: true, message: '请输入上线负责人', trigger: 'blur'
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
      this.$store.dispatch('registry/createOsskey', this.form).then(res => {
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
      this.$store.dispatch('registry/updateOsskey', { id : this.detail.id, form: this.form}).then(res => {
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
    ...mapState('registry', {
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
