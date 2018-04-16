<template>
    <div class="app-container">
        <p style="border-bottom: 1px solid #000; padding: 10px;">商品分类列表</p>
        <div class="filter-container">
            <el-button type="primary" plain class="filter-item" @click="addCate()">添加分类</el-button>
            <div style="float: right">
                <el-input placeholder="分类名" style="width: 200px" class="filter-item" v-model="params.name"></el-input>
                <el-button type="primary" class="filter-item" @click="search">搜索</el-button>
            </div>
        </div>
        <el-table
                v-loading="table_loading"
                element-loading-text="加载中..."
                border
                fit
                highlight-current-row
                :data="list"
        >
            <el-table-column
                    label="ID"
                    prop="id"
                    align="center"
                    width="60px"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="分类名"
                    prop="name"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="上级分类"
                    prop="pid.name"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="状态"
                    prop="status"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="添加时间"
                    prop="add_time"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    :current-page.sync="params.page"
                    @current-change="handleCurrentChange"
                    :page-sizes="page_sizes"
                    :page-size="params.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--添加分类-->

    </div>
</template>

<script>
    import {getCate} from '@/api/cate'
    import {mapMutations} from 'vuex'
    export default {
        name: "product-cate",
        created(){
            this._getData()
        },
        data(){
            return {
                table_loading: true,
                list: [],
                params: {
                    name: '',
                    pageSize: 10, //	每页显示条目个数
                    page: 1, //前页数
                },
                page_sizes: [10, 25, 50, 100],
                total: 1   //总共多少页
            }
        },

        methods: {
            //编辑用户,并把用户信息存储在VUEX,方便调用
            handleEdit(index, info){
                this.setEditAdmin(info)
                this.$router.push('/admin/addAdmin')
            },
            //删除用户
            handleDel(index, info){
                this.$confirm('删除管理员将不可恢复', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    delAdmin(info).then(res=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.list.splice(index, 1)
                    })
                })
            },
            //跳转到添加用户
            addAdmin(flag){
                this.$router.push('/admin/addAdmin/')
                this.setEditAdmin({})
            },
            //搜索
            search(){
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
            _getData(){
                getCate(this.params).then(res=>{
                    this.list = res.data.data
                    this.total = res.data.total
                    this.pageSize = res.data.per_page
                    this.page = res.data.current_page
                    this.table_loading = false
                }).catch(err=>{
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
    .search-container{
        margin-bottom: 10px;
    }
    .page-container{
        float: right;
        margin: 20px;
    }
</style>