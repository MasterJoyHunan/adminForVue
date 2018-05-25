<template>
    <div class="app-container"
        id="express">
        <p class="page-title">快递公司列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addExpress()">添加快递公司</el-button>
        </div>
        <div class="flex-box">
            <div class="card-container"
                v-for="(item, index) in list"
                :key="index">
                <el-card class="box-card">
                    <div slot="header"
                        class="title-header">
                        <span class="title">{{item.name}}</span>
                        <el-button circle
                            size="mini"
                            type="success"
                            icon="el-icon-edit"
                            @click="handleEdit(item)"></el-button>
                        <el-button circle
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDel(item.id, index)"></el-button>
                    </div>
                    <div class="text item card-content">
                        <div class="card-content-left">公司电话</div>
                        <div class="card-content-rigth">{{item.tel}}</div>
                    </div>
                    <div class="text item card-content">
                        <div class="card-content-left">公司地址</div>
                        <div class="card-content-rigth">{{item.address}}</div>
                    </div>
                    <div class="text item card-content">
                        <div class="card-content-left">联系人/收件人</div>
                        <div class="card-content-rigth">{{item.contact}}</div>
                    </div>
                    <div class="text item card-content">
                        <div class="card-content-left">联系人电话</div>
                        <div class="card-content-rigth">{{item.contact_tel}}</div>
                    </div>
                </el-card>
            </div>
        </div>
        <el-dialog :visible.sync="showDialog"
            title="添加快递公司"
            width="25%">
            <el-form :model="form"
                status-icon
                label-width="120px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="快递公司"
                    prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="快递公司电话"
                    prop="tel">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="快递公司地址"
                    prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人/收件员"
                    prop="contact">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话"
                    prop="contact_tel">
                    <el-input v-model="form.contact_tel"></el-input>
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
import { getTotal, addExpress, editExpress, delExpress } from '@/api/express'

export default {
    name: "express-list",
    data() {
        return {
            list: [],
            showDialog: false,
            form: {
                id: '',
                name: '',
                tel: '',
                address: '',
                contact: '',
                contact_tel: '',
                sort: ''
            },
            formRule: {
                name: [
                    { required: true, message: '快递公司必填', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 添加快递公司
        addExpress() {
            this.showDialog = true
            Object.keys(this.form).map(item => {
                this.form[item] = ''
            })
        },
        // 表单提交
        onSubmit() {
            this.$refs.cateForm.validate(valid => {
                if (!valid) {
                    return false
                }
                if (this.form.id > 0) {
                    editExpress(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                } else {
                    addExpress(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.list.unshift(this.form)
                        this.showDialog = false
                    })
                }
            })
        },
        // 修改
        handleEdit(info) {
            Object.keys(this.form).map(item => {
                this.form[item] = info[item]
            })
            this.showDialog = true
        },
        // 删除
        handleDel(id, index) {
            this.$confirm('是否确定删除快递公司', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delExpress({ id: id }).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        // 获取数据
        _getData() {
            getTotal().then(res => {
                this.list = res.data
            })
        }
    }
}
</script>

<style lang="sass" scoped>
    #express
        .flex-box
            display: flex
            flex-wrap: wrap
            .card-container
                width: 33.33%
                padding: 10px
                .box-card
                    background-color: rgba(130, 236, 116, .2)
                    .title-header
                        display: flex
                        align-items: center
                        .title
                            font-weight: bold
                            font-size: 23px
                            flex: 1
                    .card-content
                        display: flex
                        padding: 5px
                        font-size: 15px
                        line-height: 30px
                        border-bottom: 1px dashed #ddd
                        &:last-child
                            border-bottom: none
                        .card-content-left
                            width: 150px
  
</style>