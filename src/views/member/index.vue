<template>
    <div class="app-container">
        <p class="page-title">会员管理</p>
        <div class="filter-container">
            <div style="float: right; display: flex">
                <el-input v-model.number="params.tel"
                    style="margin: 0 3px"></el-input>
                <el-button type="primary"
                    class="filter-item"
                    @click="search()">搜索</el-button>
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
                prop="tel"
                label="电话号码">
            </el-table-column>
            <el-table-column align="center"
                prop="true_name"
                label="真实姓名">
            </el-table-column>
            <el-table-column align="center"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <el-tag type="success"
                        v-if="scope.row.status == 1">正常</el-tag>
                    <el-tag type="warning"
                        v-else>封停</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                prop="amoney"
                label="内置积分">
            </el-table-column>
            <el-table-column align="center"
                prop="add_time"
                label="注册时间">
            </el-table-column>
            <el-table-column align="center"
                prop="last_login_time"
                label="最后登录时间">
            </el-table-column>
            <el-table-column align="center"
                label="操作"
                width="80px">
                <template slot-scope="scope">
                    <el-tooltip content="设置会员是否封停"
                        placement="top">
                        <el-switch :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click.native="setStatus(scope.$index, scope.row)"
                            v-model="scope.row.status">
                        </el-switch>
                    </el-tooltip>
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
import { getList, changeStatus } from '@/api/member'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "member",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                name: ''
            }
        }
    },
    methods: {
        setStatus(index, row) {
            const status = row.status == 1 ? 0 : 1
            changeStatus({ id: row.id, status: row.status }).then(res => {

            }).catch(err => {
                row.status = status
            })
        },
        _getData() {
            getList(this.params).then(res => {
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.list = res.data.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>