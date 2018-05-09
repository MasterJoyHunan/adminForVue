<template>
    <div class="app-container"
        id="express">
        <div class="flex-box">
            <el-card class="box-card">
                <div slot="header"
                    class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0"
                        type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 4"
                    :key="o"
                    class="text item">
                    {{'列表内容 ' + o }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { getTotal } from '@/api/express'

export default {
    name: "express-list",
    data() {
        return {
            list: []
        }
    },
    created() {
        this._getData()
    },
    methods: {
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
        .clearfix:before, .clearfix:after 
            display: table
            content: ""
            clear: both
  
</style>