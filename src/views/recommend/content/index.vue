<template>
    <div class="app-container">
        <p class="page-title">推荐位内容管理</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="handelAdd()">添加推荐内容</el-button>
            <div style="float: right; display: flex">
                <el-select v-model="params.cate_id"
                    style="width: 200px; margin: 0 3px"
                    placeholder="选择所属推荐位">
                    <el-option v-for="(item, index) in cate"
                        :label="item.name"
                        :value="item.id"
                        :key="index"></el-option>
                </el-select>
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
                prop="pinfo.name"
                label="所属分类">
            </el-table-column>
            <el-table-column align="center"
                prop="name"
                label="推荐信息">
            </el-table-column>
            <el-table-column align="center"
                prop="memo"
                label="推荐摘要">
            </el-table-column>
            <el-table-column align="center"
                prop="img"
                label="图片">
                <template slot-scope="scope">
                    <img :src="cdn + scope.row.img"
                        class="scope-img"
                        v-if="scope.row.img">
                </template>
            </el-table-column>
            <el-table-column align="center"
                prop="link"
                label="链接">
            </el-table-column>
            <el-table-column align="center"
                prop="sort"
                width="60px"
                label="排序">
            </el-table-column>
            <el-table-column align="center"
                label="操作"
                width="170px">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                        type="danger"
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
            title="添加推荐位内容"
            width="30%">
            <el-form :model="form"
                status-icon
                label-width="120px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="选择所属推荐位"
                    prop="pid">
                    <el-select v-model="form.pid"
                        style="width: 100%;"
                        placeholder="请选择">
                        <el-option v-for="(item,i) in cate"
                            :key="i"
                            :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐信息"
                    prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="推荐摘要"
                    prop="memo">
                    <el-input v-model="form.memo"></el-input>
                </el-form-item>
                <el-form-item label="推荐链接"
                    prop="link">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item label="推荐图片">
                    <el-upload :on-success="skuImgUploadSuccess"
                        :show-file-list="false"
                        class="upload-img-col"
                        :action=imgPostUrl>
                        <el-button slot="trigger"
                            v-if="!form.img"
                            type="primary">选取文件</el-button>
                        <img :src="cdn + form.img"
                            class="upload-img"
                            v-else
                            slot="trigger"
                            alt="">
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序"
                    prop="sort">
                    <el-input v-model.number="form.sort"></el-input>
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
import { getRecommendList, recommendContent, addRecommendContent, editRecommendContent, delRecommendContent } from '@/api/recommend'
import { pageMixin } from '@/utils/mixin'
const api = process.env.BASE_API
export default {
    name: "addRecommend-content",
    mixins: [pageMixin],
    data() {
        return {
            showDialog: false,
            cate: [],
            params: {
                cate_id: ''
            },
            form: {
                id: '',
                name: '',
                memo: '',
                sort: 0,
                link: '',
                img: '',
                pid: '',
            },
            isAdd: true,
            formRule: {
                name: [
                    { required: true, message: '请输入推荐信息', trigger: 'blur' }
                ],
                // memo: [
                //     { required: true, message: '请输入推荐摘要', trigger: 'blur' }
                // ],
                // sort: [
                //     { required: true, message: '请输入排序', trigger: 'blur' }
                // ],
                // link: [
                //     { required: true, message: '请输入链接', trigger: 'change' }
                // ],
                pid: [
                    { required: true, type: 'number', message: '请选择所属分类', trigger: 'change' }
                ],
            },
            inputValue: '',
            imgPostUrl: api + '/common/uploadImg', //图片上传地址
        }
    },
    created() {
        getRecommendList().then(res => {
            this.cate = res.data
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {
        // 上传图片
        skuImgUploadSuccess(res, files) {
            if (res.status == 1) {
                this.form.img = res.data
            }
        },
        //添加顶级分类
        handelAdd() {
            [this.form.id, this.form.name, this.form.memo, this.form.sort, this.form.link, this.form.img, this.form.pid, this.showDialog, this.isAdd] = ['', '', '', 0, '', '', '', true, true]
        },
        // 修改推荐内容
        handleEdit(index, row) {
            [this.showDialog, this.isAdd, this.form] = [true, false, row]
        },
        //添加顶级分类提交
        onSubmit() {
            this.$refs.cateForm.validate(valid => {
                if (!valid) {
                    return false
                }
                if (this.isAdd) {
                    addRecommendContent(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                } else {
                    editRecommendContent(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                }
            })
        },

        //删除推荐内容
        handleDel(index, row) {
            this.$confirm('是否确定删除该推荐内容', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delRecommendContent({ id: row.id }).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //获取数据
        _getData() {
            recommendContent(this.params).then(res => {
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.list = res.data.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
    },

}
</script>

<style scoped lang="scss">
.upload-img {
    width: 100%;
}
.scope-img {
    width: 53px;
}
</style>