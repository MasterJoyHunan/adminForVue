<template>
    <div class="app-container"
        id="order-detail">
        <el-row>
            <el-col :span="18"
                class="order-left">
                {{order}}
            </el-col>
            <el-col :span="6"
                class="order-right">
                <ul class="price">
                    <li>
                        <span class="left">商品总价</span>
                        <span>100</span>
                    </li>
                    <li>
                        <span class="left">邮费</span>
                        <span>0</span>
                    </li>
                    <li>
                        <span class="left">优惠</span>
                        <span>-100</span>
                    </li>
                    <li>
                        <span class="left">订单总价</span>
                        <span>100</span>
                    </li>
                    <li>
                        <span class="left">已支付</span>
                        <span>100</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'
export default {
    name: "order-list",
    data() {
        return {
            order: {},
            params: {
            }
        }
    },
    created() {
        this._getData()
    },
    methods: {
        _getData() {
            getOrderDetail({ id: this.$route.query.id }).then(res => {
                this.order = res.data
                console
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
        background-color: #ddd;
    }
    .order-right {
        color: #fff;
        background-color: #161616;
        border-radius: 10px;
        .price {
            list-style: none;
            margin: 0;
            padding: 10px;
            li {
                display: flex;
                align-items: center;
                .left {
                    flex: 1;
                }
            }
        }
    }
}
</style>