<template>
  <el-container>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:1337/upload/image?hook=foo"
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
    handleAvatarSuccess() {
      console.log('handleAvatarSuccess');
    },
    beforeAvatarUpload() {
      console.log('beforeAvatarUpload');
    }
  }
}
</script>
