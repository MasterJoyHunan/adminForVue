<template>
    <div class="app-container">
        <p class="page-title">节点列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="append('')">添加顶级节点</el-button>
        </div>
        <el-tree style="width: 40%; margin: 50px 0 0 80px;"
            :data="tree"
            node-key="id"
            :expand-on-click-node="false"
            :render-content="renderContent">
        </el-tree>
        <el-dialog :visible.sync="showDialog"
            :title="title"
            width="30%">
            <el-form :model="form"
                status-icon
                label-width="100px"
                :rules="formRule"
                ref="nodeForm"
                @submit.native.prevent>
                <el-form-item label="节点名"
                    prop="node_name">
                    <el-input v-model="form.node_name"></el-input>
                </el-form-item>
                <el-form-item label="所属节点">
                    <el-input v-model="form.p_name"
                        disabled></el-input>
                </el-form-item>
                <el-form-item label="控制器名"
                    prop="control_name">
                    <el-input v-model="form.control_name"
                        :disabled="!form.type_id"></el-input>
                </el-form-item>
                <el-form-item label="方法名"
                    prop="action_name">
                    <el-input v-model="form.action_name"
                        :disabled="!form.type_id"></el-input>
                </el-form-item>
                <el-form-item label="组件名"
                    prop="component_name">
                    <el-input v-model="form.component_name"></el-input>
                </el-form-item>
                <el-form-item label="是否是菜单"
                    prop="is_menu">
                    <el-radio-group v-model="form.is_menu"
                        :disabled="!form.type_id">
                        <el-radio :label="2"
                            border>是</el-radio>
                        <el-radio :label="1"
                            border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <div style="float: right">
                        <el-button type="primary"
                            @click="onSubmit">提交</el-button>
                        <el-button type="success"
                            @click="showDialog=false">取消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getNode, delNode, addNode, editNode } from "@/api/node"

export default {
    name: "node",
    created() {
        this._getData()
    },
    data() {
        return {
            tree: [],
            showDialog: false,
            title: '',
            form: {
                id: 0,
                type_id: 0,
                node_name: '',
                control_name: '',
                action_name: '',
                component_name: '',
                is_menu: 0,
                p_name: '',
            },
            formRule: {
                node_name: [
                    { required: true, message: '请输入节点名', trigger: 'blur' }
                ],
                control_name: [
                    { required: true, message: '请输入控制器名', trigger: 'blur' }
                ],
                action_name: [
                    { required: true, message: '请输入方法名', trigger: 'blur' }
                ],
                component_name: [
                    // {required: true, message: '请输入组件名', trigger: 'blur'}
                ],
                is_menu: [
                    { required: true, message: '请选择是否是菜单', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span class="operation">
                        <div>
                            <el-button size="mini" type="text" style="color:#409EFF" on-click={() => this.append(node, data, 1)}>编辑该节点</el-button>
                            <el-button size="mini" type="text" style="color:#67c23a" on-click={() => this.append(node, data, 2)}>添加子节点</el-button>
                            <el-button size="mini" type="text" style="color:#f56c6c" on-click={() => this.remove(node, data)}>删除该节点</el-button>
                        </div>
                    </span>
                </span>)
        },
        append(node, data, type) {
            this.showDialog = true
            this.title = '添加节点'
            if (type == 1) {
                //编辑节点
                this.form.p_name = node.parent.data.label || '顶级节点'
                this.form.type_id = data.type_id
                this.form.control_name = data.control_name
                this.form.action_name = data.action_name
                this.form.component_name = data.component_name
                this.form.node_name = data.label
                this.form.is_menu = data.is_menu
                this.form.id = data.id
            } else if (type == 2) {
                //添加节点
                this.title = '添加节点'
                this.form.p_name = data.label
                this.form.type_id = data.id
                this.form.control_name = ''
                this.form.action_name = ''
                this.form.component_name = ''
                this.form.node_name = ''
                this.form.is_menu = 2
                this.form.id = 0
            } else {
                //添加顶级节点
                this.title = '添加节点'
                this.form.p_name = '顶级节点'
                this.form.type_id = 0
                this.form.control_name = '#'
                this.form.action_name = '#'
                this.form.component_name = ''
                this.form.node_name = ''
                this.form.is_menu = 2
                this.form.id = 0
            }
        },
        onSubmit() {
            this.$refs.nodeForm.validate(valid => {
                if (!valid) {
                    return false
                }
                if (this.form.id === 0) {
                    //添加
                    addNode(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.showDialog = false
                        this._getData()
                    })
                } else {
                    editNode(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.showDialog = false
                        this._getData()
                    })
                }
            })
        },
        remove(node, data) {
            this.$confirm('删除节点将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delNode(data).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    const parent = node.parent
                    const children = parent.data.children || parent.data
                    const index = children.findIndex(d => d.id === data.id)
                    children.splice(index, 1)
                })
            })
        },
        _getData() {
            getNode().then(res => {
                this.tree = res.data
            })
        }
    },
}
</script>

<style lang="sass">
    .custom-tree-node
        flex: 1
        display: flex
        align-items: center
        justify-content: space-between
        font-size: 14px
        padding-right: 8px
        width: 100%
        .operation
            div
                float: right

</style>