<template>
    <div class="app-container"
        id="order-detail">
        <el-row>
            <el-col :span="16"
                class="order-left">
                <el-steps :active="order.status + 2"
                    align-center>
                    <el-step title="取消订单"></el-step>
                    <el-step title="等待支付"></el-step>
                    <el-step title="等待发货"></el-step>
                    <el-step title="等待收货"></el-step>
                    <el-step title="完成订单"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="8"
                class="order-right">
                <ul class="price">
                    <li>
                        <span>商品总价</span>
                        <span>¥ {{order.money}}</span>
                    </li>
                    <li>
                        <span>邮费</span>
                        <span>¥ {{order.postage}}</span>
                    </li>
                    <li>
                        <span>优惠</span>
                        <span>¥ {{order.reduce}}</span>
                    </li>
                    <li>
                        <span>订单总价</span>
                        <span>¥ {{order.amount}}</span>
                    </li>
                    <li class="pay">
                        <span>已支付</span>
                        <span>¥ {{order.payment}}</span>
                    </li>
                </ul>
                <span class="post">#收货信息</span>
                <ul class="address">
                    <li>
                        <span>收货人</span>
                        <span>{{order.post_name}}</span>
                    </li>
                    <li>
                        <span>收货电话</span>
                        <span>{{order.post_tel}}</span>
                    </li>
                    <li>
                        <span>收货地址</span>
                        <span>{{order.post_address}}</span>
                    </li>
                </ul>
                <span class="post">#快递信息</span>
                <ul class="address"
                    v-if="order.status > 1">
                    <li>
                        <span>快递公司</span>
                        <span>{{order.express}}</span>
                    </li>
                    <li>
                        <span>快递单号</span>
                        <span>{{order.express_no}}</span>
                    </li>
                </ul>
                <div v-else-if="order.status == 1"
                    class="express">
                    <el-button type="success"
                        plain
                        @click="sendGoods()"
                        size="mini">点击发货</el-button>
                    <el-button type="primary"
                        plain
                        @click="pickedUp()"
                        size="mini">自提</el-button>
                </div>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="showDialog"
            title="填写发货信息"
            width="30%">
            <el-form status-icon
                label-width="120px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="快递公司"
                    prop="express">
                    <el-select v-model="expressInfo.express">
                        <el-option v-for="(item, index) in expressList"
                            :key="index"
                            :value="item"
                            :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递单号"
                    prop="express_no">
                    <el-input v-model="expressInfo.express_no"></el-input>
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
import { getOrderDetail, selfPickedUp, sendGoods } from '@/api/order'
export default {
    name: "order-list",
    data() {
        return {
            order: {},
            expressList: [],
            expressInfo: {
                id: '',
                express: '',
                express_no: '',
            },
            formRule: {
                express: [
                    { required: true, message: '请填写快递公司', trigger: 'blur' },
                ],
                express_no: [
                    { required: true, min: 5, message: '请填写正确快递单号', trigger: 'blur' }
                ]
            },
            showDialog: false
        }
    },
    created() {
        this._getData()
    },
    methods: {
        // 发货
        sendGoods() {
            this.showDialog = true
            this.expressInfo.express = ''
            this.expressInfo.express_no = ''
        },
        // 自提
        pickedUp() {
            this.$confirm('确认客户过来自提?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                selfPickedUp({ id: this.order.id }).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.order.status = 3
                    this.order.express = '自提'
                    this.order.express_no = '自提'
                })
            })
        },
        // 提交填写的快递信息
        onSubmit() {
            this.expressInfo.id = this.$route.query.id
            sendGoods(this.expressInfo).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.showDialog = false
                this.order.status = 2
                this.order.express = this.expressInfo.express
                this.order.express_no = this.expressInfo.express_no
            })
        },
        // 获取数据
        _getData() {
            getOrderDetail({ id: this.$route.query.id }).then(res => {
                this.order = res.data.order
                this.expressList = res.data.express
            }).catch(err => {
                this.$router.back()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#order-detail {
    .order-left {
        // background-color: #ddd;
    }
    .order-right {
        color: #ddd;
        background-color: #161616;
        border-radius: 10px;
        padding: 30px;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .price {
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                // span:last-child {
                //     width: 100px;
                // }
            }
            .pay {
                font-weight: bold;
                margin-top: 15px;
                color: #d9ec0d;
                border-top: 1px dashed;
            }
        }
        .post {
            display: flex;
            margin-top: 40px;
            padding-bottom: 20px;
            border-bottom: 1px dashed;
        }
        .address {
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                span:first-child {
                    width: 70px;
                }
                span:last-child {
                    white-space: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                }
            }
        }
        .express {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0;
            .el-button--success {
                background-color: #5bdc14;
                color: #fff;
            }
            .el-button--primary {
                background-color: #5187c3;
                color: #fff;
            }
        }
    }
}
</style>