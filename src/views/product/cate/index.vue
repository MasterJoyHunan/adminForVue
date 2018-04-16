<template>
    <div class="app-container">
        <p style="border-bottom: 1px solid #000; padding: 10px;">商品分类列表</p>
        <div class="filter-container">
            <el-button type="primary" plain class="filter-item" @click="addCate()">添加顶级分类</el-button>
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
            >
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
                        <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
                    </template>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="上级分类"
                    prop="pcate.name"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="排序(降序)"
                    prop="order"
                    width="60px"
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
                    <el-button v-if="scope.row.edit" icon="el-icon-circle-check-outline" size="mini" type="success" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                    <el-button v-else size="mini" type="primary" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-close" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog
                :visible.sync="showDialog"
                title="添加分类" width="30%"
        >
            <el-form
                    :model="form"
                    status-icon label-width="100px" :rules="formRule" ref="cateForm"
                    @submit.native.prevent
            >
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input v-model="form.order"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="float: right">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getCate, addCate, delCate} from '@/api/cate'

    export default {
        name: "product-cate",
        created() {
            this._getData()
        },
        data() {
            return {
                table_loading: true,
                showDialog: false,
                list: [],
                params: {
                    name: '',
                    pageSize: 10, //	每页显示条目个数
                    page: 1, //前页数
                },
                page_sizes: [10, 25, 50, 100],
                total: 1,   //总共多少页
                form: {
                    name: '',
                    order: 0,
                    pid: 0, //上级分类
                },
                formRule: {
                    name: [
                        {required: true, message: '请输入分类名', trigger: 'blur'}
                    ],
                    order: [
                        {required: true, message: '请输入排序', trigger: 'blur'},
                        {type: 'number', message: '必须是数字类型', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            //添加顶级分类
            addCate() {
                this.showDialog = true
            },
            //添加顶级分类提交
            onSubmit() {
                this.$refs.cateForm.validate(valid => {
                    if(!valid){
                        return false
                    }
                    this.form.pid = 0
                    addCate(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                })
            },
            //修改分类
            /*handleEdit(index, row){
                row.edit = true
            },*/

            //取消修改分类
            cancelEdit(row){
                row.edit = false
                row.name = row.old_name
            },
            //删除分类
            handleDel(index, row) {
                this.$confirm('是否确定删除该分类', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCate({id: row.id}).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.list.splice(index, 1)
                    })
                })
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
                getCate(this.params).then(res => {
                    this.list = res.data.data.map(item => {
                        this.$set(item, 'edit', false)
                        item.old_name = item.name
                        return item
                    })
                    this.total = res.data.total
                    this.pageSize = res.data.per_page
                    this.page = res.data.current_page
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
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }

</style>