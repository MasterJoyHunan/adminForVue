<template>
    <div class="app-container">
        <p class="page-title">数据库列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="backSql()">备份数据库</el-button>
            <el-button type="danger"
                plain
                class="filter-item"
                @click="initSql()">系统初始化</el-button>
        </div>
        <el-table v-loading="table_loading"
            element-loading-text="加载中..."
            border
            fit
            highlight-current-row
            :data="list">
            <el-table-column align="center"
                label="数据库"
                prop="title">
            </el-table-column>
            <el-table-column align="center"
                label="数据库大小"
                prop="size">
            </el-table-column>
            <el-table-column align="center"
                label="创建时间"
                prop="addtime">
            </el-table-column>
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="download(scope.row)">下载</el-button>
                    <el-button size="mini"
                        type="warning"
                        @click="restore(scope.row)">还原</el-button>
                    <el-button size="mini"
                        type="danger"
                        @click="deleteSql(scope.$index, scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getList, back, init, restore, del } from '@/api/database'
export default {
    name: "database",
    created() {
        this._getData()
    },
    data() {
        return {
            table_loading: true,
            list: [],
        }
    },
    methods: {
        //备份数据库
        backSql() {
            this.$confirm('是否备份数据库', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                back().then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this._getData()
                })
            })
        },
        //初始化数据库
        initSql() {
            this.$confirm('系统将恢复初始状态,不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                init().then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                })
            })
        },
        //下载
        download(item) {
            location.href = 'http://localhost/web/public/vueapi/data/download?filename=' + item.title
        },
        //还原
        restore(item) {
            this.$confirm('系统将继续还原操作,不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                restore(item).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                })
            })
        },
        //删除数据库文件
        deleteSql(index, item) {
            this.$confirm('该数据库将进行删除,不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del(item).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //获取数据
        _getData() {
            getList().then(res => {
                this.list = res.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
    },

}
</script>

<style scoped>
.search-container {
  margin-bottom: 10px;
}
.page-container {
  float: right;
  margin: 20px;
}
</style>