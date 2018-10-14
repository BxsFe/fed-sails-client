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
        <el-table-column prop="accessKeySecret" label="accessKeySecret"></el-table-column>
        <el-table-column prop="accessKeyId" label="accessKeyId"></el-table-column>
        <el-table-column prop="region" label="region"></el-table-column>
        <el-table-column prop="bucket" label="bucket"></el-table-column>
        <el-table-column prop="type" label="type"></el-table-column>
        <el-table-column prop="des" label="des"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteDetail(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    
    <!-- <el-footer>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="pageChagne"
        :total="1000">
      </el-pagination>
    </el-footer> -->
    <!-- 详情弹窗 -->
    <detail-modal :visible.sync="showDetailModal" @update="search()"></detail-modal>

  </el-container>
</template>
<script>
import detailModal from './detailModal'
const defaultSearchData = {
  times: [],
  name: ''
}
export default {
  data() {
    return {
      showDetailModal: false,
      searchData: defaultSearchData,
      tableData: []
    }
  },
  components: { detailModal },
  created() {
    this.search()
  },
  methods: {
    reset() {
      this.searchData = defaultSearchData
      this.search(1)
    },
    search(page = 1) {
      this.$store.dispatch('osskey/getTableList', { page }).then(res => {
        this.tableData = res.data
      })
    },
    pageChagne(page) {
      this.search(page)
    },
    showDetail(item) {
      // 注意替换vuex 命名空间
      this.$store.commit('osskey/setDetail', item)
      this.showDetailModal = true
    },
    deleteDetail(item) {
      this.$confirm('确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('osskey/deleteOsskey', item).then(res => {
          this.search()
        })
      }).catch(() => {})
    }
  }
}
</script>
