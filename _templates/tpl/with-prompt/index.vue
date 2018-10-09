---
to: src/views/<%= viewName %>/index.vue
---
<template>
  <el-container>
    <el-main>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchData.name" placeholder="请输入内容" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchData.times"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showDetail()">新建</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="pageChagne"
        :total="1000">
      </el-pagination>
    </el-footer>
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
      this.$store.dispatch('<%= viewName %>/getTableList', { page }).then(res => {
        this.tableData = res.data.mallPromotionModuleList.entityList
      })
    },
    pageChagne(page) {
      this.search(page)
    },
    showDetail(item) {
      // 注意替换vuex 命名空间
      this.$store.commit('<%= viewName %>/setDetail', item)
      this.showDetailModal = true
    }
  }
}
</script>
