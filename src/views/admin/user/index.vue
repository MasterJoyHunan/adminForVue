<template>
    <div class="app-container">
        <p class="page-title">管理员列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addAdmin()">添加管理员</el-button>
            <div style="float: right">
                <el-input placeholder="管理员用户名"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.user_name"></el-input>
                <el-button type="primary"
                    class="filter-item"
                    @click="search">搜索</el-button>
            </div>
        </div>
        <el-table v-loading="table_loading"
            element-loading-text="加载中..."
            border
            fit
            highlight-current-row
            :data="list">
            <el-table-column label="ID"
                prop="id"
                align="center"
                width="60px">
            </el-table-column>
            <el-table-column align="center"
                label="管理员名称"
                prop="user_name">
            </el-table-column>
            <el-table-column align="center"
                label="管理员真实姓名"
                prop="real_name">
            </el-table-column>
            <el-table-column align="center"
                label="管理员角色"
                prop="role.role_name">
            </el-table-column>
            <el-table-column align="center"
                label="最后登录IP"
                prop="last_login_ip">
            </el-table-column>
            <el-table-column align="center"
                label="最后登录时间"
                prop="last_login_time">
            </el-table-column>
            <el-table-column align="center"
                label="状态"
                width="80px">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==1"
                        type="success">正常</el-tag>
                    <el-tag v-if="scope.row.status==0"
                        type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background
                @size-change="handleSizeChange"
                :current-page.sync="params.page"
                @current-change="handleCurrentChange"
                :page-sizes="page_sizes"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getAdminList, delAdmin } from '@/api/adminUser'
import { mapMutations } from 'vuex'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "userIndex",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                user_name: '',
            },
        }
    },

    methods: {
        //编辑用户,并把用户信息存储在VUEX,方便调用
        handleEdit(index, info) {
            this.setEditAdmin(info)
            this.$router.push('/admin/addAdmin')
        },
        //删除用户
        handleDel(index, info) {
            this.$confirm('删除管理员将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delAdmin(info).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //跳转到添加用户
        addAdmin(flag) {
            this.$router.push('/admin/addAdmin/')
            this.setEditAdmin({})
        },
        //获取数据
        _getData() {
            getAdminList(this.params).then(res => {
                this.list = res.data.data
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
        ...mapMutations({
            'setEditAdmin': 'SET_EDIT_ADMIN'
        })
    },

}
</script>

<style scoped>
.search-container {
  margin-bottom: 10px;
}
</style>