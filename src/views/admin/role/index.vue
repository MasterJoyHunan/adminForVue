<template>
    <div class="app-container">
        <p class="page-title">角色管理</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addRole()">添加角色</el-button>
        </div>
        <el-table v-loading="table_loading"
            element-loading-text="加载中..."
            border
            fit
            highlight-current-row
            :data="list">
            <el-table-column align="center"
                width="60px"
                label="ID"
                prop="id">
            </el-table-column>
            <el-table-column align="center"
                label="角色"
                prop="role_name">
            </el-table-column>
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                        type="success"
                        v-if="scope.row.id != 1"
                        @click="handleAuth(scope.$index, scope.row)">分配权限
                    </el-button>
                    <el-button size="mini"
                        type="danger"
                        v-if="scope.row.id != 1"
                        @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<el-pagination></el-pagination>-->
        <el-dialog :visible.sync="showDialog"
            :title="title"
            width="30%">
            <el-form :model="form"
                status-icon
                label-width="80px"
                :rules="formRole"
                ref="roleForm"
                @submit.native.prevent>
                <el-form-item label="角色名"
                    prop="role_name">
                    <el-input v-model="form.role_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click="onSubmit()"
                        style="float: right">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="showDialogDistribution"
            title="分配权限"
            width="30%"
            class="my-dialog">
            <el-tree ref="tree"
                :data="tree"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="choseKeys">
            </el-tree>
            <el-button type="primary"
                @click="giveAccess()"
                style="float: right">确定分配</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { getRoleList, addRoles, delRoles, getAuth, setAuth } from '@/api/role'

export default {
    name: "role",
    created() {
        this._getData()
    },
    data() {
        return {
            table_loading: true,
            list: [],
            params: {
                pageSize: 10, //	每页显示条目个数
                page: 1, //前页数
            },
            //form表单双向绑定数据
            form: {
                role_name: '',
                id: ''
            },
            //form表单填写规则
            formRole: {
                role_name: [
                    { required: true, message: '请填写角色名', trigger: 'blur' }
                ],
            },
            showDialog: false, //添加/编辑 弹窗
            showDialogDistribution: false, //分配权限弹窗
            title: '',
            tree: [], //树节点
            choseKeys: [], //已选择的节点
            temp_id: '' //设置权限的ID
        }
    },
    methods: {
        //打开弹窗
        addRole() {
            this.showDialog = true
            this.title = '添加角色'
        },
        //修改角色
        handleEdit(index, info) {
            this.showDialog = true
            this.title = '编辑角色'
            this.form.id = info.id
            this.form.role_name = info.role_name
        },
        //配置权限(获取权限)
        handleAuth(index, info) {
            this.showDialogDistribution = true
            //获取用户的权限
            getAuth(info).then(res => {
                this.temp_id = info.id
                this.tree ? this.tree = res.data.tree : null
                this.choseKeys = res.data.choseKeys ? res.data.choseKeys : []
            })
        },
        //配置权限(设置权限)
        giveAccess() {
            const ruleStr = this.$refs.tree.getCheckedKeys().join(',')
            const data = { id: this.temp_id, rule: ruleStr }
            setAuth(data).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.showDialogDistribution = false
            })
        },
        //删除角色
        handleDel(index, info) {
            this.$confirm('删除角色将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delRoles({ id: info.id }).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //提交
        onSubmit() {
            this.$refs.roleForm.validate(valid => {
                if (!valid) {
                    return false
                }
                addRoles(this.form).then(res => {
                    this.showDialog = false
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.form.id = ''
                    this._getData()
                })
            })
        },
        //获取数据
        _getData() {
            getRoleList(this.params).then(res => {
                this.table_loading = false
                this.list = res.data.data
            })
        }
    }
}
</script>

<style lang="sass">
    .my-dialog
        .el-dialog
            .el-dialog__body
                height: 500px
                overflow: scroll

</style>