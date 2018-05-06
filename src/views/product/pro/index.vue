<template>
    <div class="app-container"
        id="product-index">
        <p style="border-bottom: 1px solid #000; padding: 10px;">商品列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addGoods()">添加商品</el-button>
            <div style="float: right; display: flex">
                <el-select v-model="params.cate_id"
                    placeholder="分类">
                    <el-option v-for="(item, index) in cate"
                        :label="item"
                        :value="index"
                        :key="index"></el-option>
                </el-select>
                <el-input placeholder="商品名"
                    style="width: 200px; margin: 0 3px"
                    class="filter-item"
                    v-model="params.title"></el-input>
                <el-button type="primary"
                    class="filter-item"
                    @click="search">搜索</el-button>
            </div>
        </div>
        <el-table v-loading="table_loading"
            element-loading-text="加载中..."
            border
            highlight-current-row
            :row-class-name="getRowClass"
            row-key='id'
            :data="list">
            <el-table-column type="expand">
                <template slot-scope="scope"
                    v-if="scope.row.sku.length">
                    <el-table :data="scope.row.sku"
                        size="mini"
                        class="sku-table"
                        highlight-current-row>
                        <el-table-column prop="name"
                            align="center"
                            label="属性名">
                        </el-table-column>
                        <el-table-column prop="img"
                            align="center"
                            label="商品图片">
                            <template slot-scope="scope">
                                <div class="img-container"
                                    :style="{backgroundImage: `url(${cdn + scope.row.img})`}"></div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="market_price"
                            align="center"
                            label="市场价">
                        </el-table-column>
                        <el-table-column prop="price"
                            align="center"
                            label="售价">
                        </el-table-column>
                        <el-table-column prop="stock"
                            align="center"
                            label="库存">
                        </el-table-column>
                        <el-table-column prop="sales_volume"
                            align="center"
                            label="售出">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="ID"
                prop="id"
                align="center"
                width="60px">
            </el-table-column>
            <el-table-column align="center"
                label="商品名"
                prop="title">
            </el-table-column>
            <el-table-column align="center"
                label="商品图片">
                <template slot-scope="scope">
                    <img :src="cdn + scope.row.img"
                        style="width: 50px; height:50px; dislay: block">
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="所属分类"
                prop="cate_id">
                <template slot-scope="scope">
                    <span>{{cate[scope.row.cate_id]}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="市场价"
                prop="market_price">
            </el-table-column>
            <el-table-column align="center"
                label="售价"
                prop="price">
            </el-table-column>
            <el-table-column align="center"
                label="库存"
                prop="stock">
            </el-table-column>
            <el-table-column align="center"
                label="销量"
                prop="sales_volume">
            </el-table-column>
            <el-table-column align="center"
                label="状态"
                width="80px">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==1"
                        type="success">上架</el-tag>
                    <el-tag v-if="scope.row.status==0"
                        type="danger">下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini"
                        type="danger"
                        @click="handleDel(scope.row)">删除</el-button>
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
import { getGoods } from '@/api/goods'
const cdn = process.env.CDN
export default {
    name: "goods",
    created() {
        this._getData()
    },
    data() {
        return {
            cdn: cdn,
            table_loading: true,
            list: [],
            cate: [],
            params: {
                title: '',
                cate_id: '',
                pageSize: 10, //	每页显示条目个数
                page: 1, //前页数
            },
            page_sizes: [10, 25, 50, 100],
            total: 1   //总共多少页
        }
    },

    methods: {
        // 给不需要展开的行添加一个类
        getRowClass({ row }) {
            if (row.sku.length == 0) {
                return 'hide-expand'
            }
            return ''
        },
        //编辑商品,并把用户信息存储在VUEX,方便调用
        handleEdit(index, info) {
            this.$router.push('/admin/addAdmin')
        },
        //删除用户
        handleDel(index, info) {
            this.$confirm('删除管理员将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(111)
            })
        },
        //跳转到添加商品
        addGoods() {
            this.$router.push('/product/addgoods')
        },
        //搜索
        search() {
            this._getData()
        },
        //修改每页显示多少条数据
        handleSizeChange(val) {
            this.params.pageSize = val
            this._getData()
        },
        //跳转页面
        handleCurrentChange(val) {
            this._getData()
        },
        //获取数据
        _getData() {
            getGoods(this.params).then(res => {
                this.list = res.data.pro.data
                this.cate = res.data.cate
                this.total = res.data.pro.total
                this.pageSize = res.data.pro.per_page
                this.page = res.data.pro.current_page
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
    },
}
</script>

<style lang="sass">
#product-index
    .search-container
        margin-bottom: 10px
    .page-container
        float: right
        margin: 20px
    .hide-expand
        .el-table__expand-column
            .cell
                visibility: hidden
    .img-container
        width: 23px
        height: 23px
        background-size: 100%
        margin: 0 auto
    // .sku-table
        // .el-table--border
            // border-right: none !important
    .el-table__expanded-cell
        padding: 10px

</style>