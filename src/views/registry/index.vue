<template>
  <el-container>
    <el-main>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="showDetail()">新建</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="group" label="业务组"></el-table-column>
        <el-table-column prop="type" label="业务线"></el-table-column>
        <el-table-column prop="frontend" label="前端 POC"></el-table-column>
        <el-table-column prop="frontendPoc" label="前端 Backup POC"></el-table-column>
        <el-table-column prop="backend" label="服务端 POC"></el-table-column>
        <el-table-column prop="tester" label="测试 POC"></el-table-column>
        <el-table-column prop="registry" label="代码仓库地址"></el-table-column>
        <el-table-column prop="master" label="上线负责人"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteDetail(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    
    <detail-modal :visible.sync="showDetailModal" @update="search()"></detail-modal>

  </el-container>
</template>
<script>
import detailModal from './detailModal'
export default {
  data() {
    return {
      showDetailModal: false,
      tableData: []
    }
  },
  components: { detailModal },
  created() {
    this.search()
  },
  methods: {
    reset() {
      this.search(1)
    },
    search(page = 1) {
      this.$store.dispatch('registry/getTableList', { page }).then(res => {
        this.tableData = res.data
      })
    },
    pageChagne(page) {
      this.search(page)
    },
    showDetail(item) {
      // 注意替换vuex 命名空间
      this.$store.commit('registry/setDetail', item)
      this.showDetailModal = true
    },
    deleteDetail(item) {
      this.$confirm('确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('registry/deleteOsskey', item).then(res => {
          this.search()
        })
      }).catch(() => {})
    }
  }
}
</script>
