<template>
  <el-container>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:1337/upload/assets"
      name="image"
      :data="data"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-container>
</template>
<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      imageUrl: '',
      data: {
        type: 'asset'
      }
    }
  },
  created() {},
  methods: {
    // test() {
    //   request({
    //     url: 'http://localhost:1337/upload',
    //     methods: 'get'
    //   }).then(res => {
    //     console.log(res);
    //   }).catch(e => {
    //     debugger
    //     console.error(e);
    //   })
    // },
    handleAvatarSuccess() {
      console.log('handleAvatarSuccess');
    },
    beforeAvatarUpload() {
      console.log('beforeAvatarUpload');
    }
  }
}
</script>
