<template>
    <div class="app-container">
        <!-- <el-form class="form-container" status-icon :rules="formRules" ref="fromInput" :model="formValue"
                 @submit.native.prevent>
            <el-form-item >
                <MDinput :maxlength="16" v-model="formValue.title">标题</MDinput>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="选择分类">
                        <el-select v-model="formValue.cate">
                            <el-option>xxxx</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="市场价">
                        <el-input v-model="formValue.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="售价" >
                        <el-input v-model="formValue.price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form> -->
    </div>
</template>

<script>
    import MDinput from '@/components/MDinput'

    export default {
        /* name: "addPro",
        data() {
            return {
                formValue: {
                    title: '',
                    cate: '',
                    market_price: 0,
                    price: 0,
                },
                formRules: {
                    title: [],
                    cate: [],
                    market_price: [],
                    price: [],
                },
            }
        },
        components: {
            MDinput
        }, */
    }
</script>

<style lang="sass" scoped>
    .form-container
        padding: 10px 50px
</style>