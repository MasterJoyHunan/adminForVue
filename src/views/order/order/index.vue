<template>
    <div class="app-container"
        id="order">
        <p class="page-title">订单列表</p>
        <div class="filter-container">
            <div style="float: right; display: flex">
                <el-select v-model="params.status"
                    style="width: 200px; margin: 0 3px"
                    placeholder="选择订单状态">
                    <el-option label="取消"
                        value="-1"></el-option>
                    <el-option label="待支付"
                        value="0"></el-option>
                    <el-option label="待发货"
                        value="1"></el-option>
                    <el-option label="待收货"
                        value="2"></el-option>
                    <el-option label="完成"
                        value="3"></el-option>
                </el-select>
                <!-- <el-input v-model.number="params.tel"
                    style="margin: 0 3px"></el-input> -->
                <el-button type="primary"
                    class="filter-item"
                    @click="search()">搜索</el-button>
            </div>
        </div>
        <el-table v-loading="table_loading"
            ref="tableRef"
            element-loading-text="加载中..."
            border
            highlight-current-row
            row-key='id'
            :data="list">
            <el-table-column label="ID"
                prop="id"
                align="center">
            </el-table-column>
            <el-table-column label="订单编号"
                prop="no"
                align="center">
            </el-table-column>
            <el-table-column label="用户"
                prop="uid"
                align="center">
            </el-table-column>
            <el-table-column label="货物金额"
                prop="money"
                align="center">
            </el-table-column>
            <el-table-column label="邮费"
                prop="postage"
                align="center">
            </el-table-column>
            <el-table-column label="总金额"
                prop="amount"
                align="center">
            </el-table-column>
            <el-table-column label="优惠金额"
                prop="reduce"
                align="center">
            </el-table-column>
            <el-table-column label="支付金额"
                prop="payment"
                align="center">
            </el-table-column>
            <el-table-column label="添加订单时间"
                prop="add_date"
                align="center">
            </el-table-column>
            <el-table-column label="支付订单时间"
                prop="pay_date"
                align="center">
            </el-table-column>
            <el-table-column label="订单状态"
                prop="status"
                align="center">
                <template slot-scope="scope">
                    <el-tag type="danger"
                        v-if="scope.row.status == -1">取消</el-tag>
                    <el-tag v-if="scope.row.status == 0">待付款</el-tag>
                    <el-tag v-if="scope.row.status == 1"
                        type="success">待发货</el-tag>
                    <el-tag v-if="scope.row.status == 2"
                        type="warning">待签收</el-tag>
                    <el-tag v-if="scope.row.status == 3">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                width="170px"
                align="center">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleGetDetail(scope.row)">详情
                    </el-button>
                    <!-- <el-button size="mini"
                        type="danger"
                        v-if="scope.row.status == -1"
                        @click="handleDel(scope.$index, scope.row)">删除
                    </el-button> -->
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
import { getTotal } from '@/api/order'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "order-list",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                status: '',
            }
        }
    },
    methods: {
        handleGetDetail(info) {
            this.$router.push({ path: '/order/detail', query: { id: info.id } })
        },
        handleDel(index, row) {

        },
        _getData() {
            getTotal(this.params).then(res => {
                this.list = res.data.data
                this.total = parseInt(res.data.total)
                this.params.pageSize = parseInt(res.data.per_page)
                this.params.page = parseInt(res.data.current_page)
                this.table_loading = false
            }).catch(err => {
                this.table_loading = false
            })
        }
    }
}
</script>

<style lang="sass" scoped>
    #order
  
</style>