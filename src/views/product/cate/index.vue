<template>
    <div class="app-container">
        <p class="page-title">商品分类列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addCate()">添加分类</el-button>
            <div style="float: right">
                <el-input placeholder="分类名"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.name"></el-input>
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
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div>
                        <el-tag type="success">商品属性1 :</el-tag>
                        <el-tag v-if="scope.row.attr1"
                            v-for="(item, index) in scope.row.attr1"
                            :key="index"
                            closable
                            @close="deleteAttr(scope.row, item.id, index, 1)">{{item.name}}
                        </el-tag>
                        <el-input class="input-new-tag"
                            v-if="scope.row.new_attr1"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row, 1)"
                            @blur="scope.row.new_attr1 = false"
                            v-model="inputValue"
                            ref="inputEle"
                            placeholder="回车添加">
                        </el-input>
                        <el-button v-else
                            class="button-new-tag"
                            size="small"
                            @click="addAttr(scope.row, 1)">+ 添加新属性
                        </el-button>
                    </div>
                    <p style="border-bottom: solid #ebeef5 1px"></p>
                    <div style="margin-top: 5px">
                        <el-tag type="success">商品属性2 :</el-tag>
                        <el-tag v-if="scope.row.attr2"
                            v-for="(item, index) in scope.row.attr2"
                            :key="index"
                            closable
                            @close="deleteAttr(scope.row, item.id, index, 2)">{{item.name}}
                        </el-tag>
                        <el-input class="input-new-tag"
                            v-if="scope.row.new_attr2"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row, 2)"
                            @blur="scope.row.new_attr2 = false"
                            v-model="inputValue"
                            ref="inputEle"
                            placeholder="回车添加">
                        </el-input>
                        <el-button v-else
                            class="button-new-tag"
                            size="small"
                            @click="addAttr(scope.row, 2)">+ 添加新属性
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID"
                prop="id"
                align="center"
                width="60px">
            </el-table-column>
            <el-table-column align="center"
                label="分类名">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        size="small"
                        v-model="scope.row.name"></el-input>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="排序(降序)"
                width="100px">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        size="small"
                        type="number"
                        v-model.number="scope.row.sort"></el-input>
                    <span v-else>{{scope.row.sort}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="添加时间"
                prop="add_time">
            </el-table-column>
            <el-table-column align="center"
                width="400px"
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit"
                        icon="el-icon-refresh"
                        size="mini"
                        type="warning"
                        @click="handleCancel(scope.row)">取消
                    </el-button>
                    <el-button v-if="scope.row.edit"
                        icon="el-icon-circle-check-outline"
                        size="mini"
                        type="success"
                        @click="handleEdit(scope.$index, scope.row)">保存
                    </el-button>
                    <el-button v-else
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="scope.row.edit=!scope.row.edit">编辑
                    </el-button>
                    <el-button size="mini"
                        type="danger"
                        icon="el-icon-close"
                        @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
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
        <el-dialog :visible.sync="showDialog"
            title="添加分类"
            width="30%">
            <el-form :model="form"
                status-icon
                label-width="100px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="分类名"
                    prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排序"
                    prop="sort">
                    <el-input v-model.number="form.sort"
                        type="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="float: right">
                        <el-button type="primary"
                            @click="onSubmit">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getCate, addCate, editCate, delCate, addCateAttr, delCateAttr } from '@/api/cate'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "product-cate",
    mixins: [pageMixin],
    data() {
        return {
            showDialog: false,
            params: {
                name: '',
            },
            form: {
                name: '',
                sort: 1,
            },
            formRule: {
                name: [
                    { required: true, message: '请输入分类名', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    { type: "number", message: '必须是数字', trigger: 'blur' }
                ]
            },
            inputValue: '',
        }
    },

    methods: {
        //添加顶级分类
        addCate() {
            this.form.name = ''
            this.form.sort = 1
            this.showDialog = true
        },
        //添加顶级分类提交
        onSubmit() {
            this.$refs.cateForm.validate(valid => {
                if (!valid) {
                    return false
                }
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
        handleEdit(index, row) {
            editCate(row).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                row.old_name = row.name
                row.edit = false
            })
        },

        //取消修改分类
        handleCancel(row) {
            row.edit = false
            row.name = row.old_name
            row.sort = row.old_sort
        },

        //删除分类
        handleDel(index, row) {
            this.$confirm('是否确定删除该分类', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCate({ id: row.id }).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },

        //添加新的属性
        addAttr(row, attr) {
            attr == 1 ? row.new_attr1 = true : row.new_attr2 = true
            this.$nextTick(() => {
                this.$refs.inputEle.$refs.input.focus()
            })
            this.inputValue = ''
        },

        //添加新的属性提交
        handleInputConfirm(row, attr) {
            const data = { pid: row.id, level: attr, name: this.inputValue }
            addCateAttr(data).then(res => {
                if (attr == 1) {
                    row.attr1.push(res.data)
                    row.new_attr1 = false
                } else {
                    row.attr2.push(res.data)
                    row.new_attr2 = false
                }
            })
        },
        //删除属性
        deleteAttr(row, id, index, attr) {
            delCateAttr({ id: id }).then(res => {
                attr == 1 ? row.attr1.splice(index, 1) : row.attr2.splice(index, 1)
            })
        },
        //获取数据
        _getData() {
            getCate(this.params).then(res => {
                this.list = res.data.data.map(item => {
                    this.$set(item, 'edit', false)
                    this.$set(item, 'new_attr1', false)
                    this.$set(item, 'new_attr2', false)
                    const attr1 = []
                    const attr2 = []
                    if (item.sku.length > 0) {
                        item.sku.forEach(sku => {
                            sku.level == 1 ? attr1.push(sku) : attr2.push(sku)
                        })
                    }
                    item.attr1 = attr1
                    item.attr2 = attr2
                    item.old_name = item.name
                    item.old_sort = item.sort
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
.el-tag + .el-tag {
  margin-left: 10px;
}

.search-container {
  margin-bottom: 5px;
  margin-top: 5px;
}

.page-container {
  float: right;
  margin: 20px;
}

.button-new-tag {
  margin-left: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>