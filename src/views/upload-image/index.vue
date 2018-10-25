<template>
  <el-container>
    <el-main>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="data.path" placeholder="请选择上传的oss路径">
            <el-option
              v-for="item in ossPaths"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="action"
            :multiple="false"
            :show-file-list="false"
            :data="data"
            accept="image/*"
            :on-success="onSuccess"
            :on-error="onError"
            :before-upload="beforeUpload"
            name="file">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div class="image-container" v-for="file in fileList">
        <el-row :gutter="20" style="display: flex; align-items: center;">
          <el-col :span="6">
            <img :src="file.url" class="display-img">
          </el-col>
          <el-col :span="10">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="file.url" style="width: 100%;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  v-clipboard:copy="file.url"
                  v-clipboard:success="onCopy"
                  >复制图片链接</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      action: process.env.BASE_API + '/upload/image',
      imageUrl: '',
      fileList: [],
      data: {
        type: 'image',
        path: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('upload-image/getOssPath').catch(e => {
        this.$message.error(e.message)
      })
    },
    beforeUpload() {
      if (this.data.path === '') {
        this.$message.error('请选择上传的oss路径')
        return false
      }
    },
    onSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.fileList.push({
          url: res.data
        })
      } else {
        this.$message.error(res.message)
      }
    },
    onError(err, file, fileList) {
      console.log(err)
    },
    onCopy() {
      this.$message.success('拷贝成功')
    }
  },
  computed: {
    ...mapState('upload-image', {
      ossPaths: state => state.ossPaths
    })
  }
}
</script>
<style>
  .display-img {
    display: inline-block;
    width: 100%;
  }
  .el-input-group__append button.el-button {  }
</style>
