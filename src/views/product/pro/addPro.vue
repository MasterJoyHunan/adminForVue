<template>
    <div class="app-container">
        <el-form class="form-container"
            :inline="true"
            status-icon
            :rules="formRules"
            ref="fromInput"
            :model="formValue"
            @submit.native.prevent
            label-width="80px"
            label-position="left">
            <el-row>
                <el-col :span="24"
                    style="margin-bottom: 22px">
                    <MDinput :maxlength="16"
                        v-model="formValue.title">输入标题</MDinput>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="分类">
                        <el-select v-model="formValue.cate_id"
                            style="width: 200px"
                            @change="chooseCate">
                            <el-option v-for="(item, index) in cate"
                                :label="item.name"
                                :value="item.id"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="市场价">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="售价">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="库存">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.stock"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="售出">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.sales_volume"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="skuLabel.length > 0">
                <el-col :span="24"
                    v-if="sku1List.length > 0"
                    style="padding-bottom: 22px">
                    <span class="diver">选择商品属性1(可不选)</span>
                    <!-- <el-form-item label="选择商品属性"> -->
                    <el-checkbox v-model="chooseSku1"
                        v-for="(le1, index) in sku1List"
                        :key="index"
                        :label="le1"
                        border>{{le1.name}}</el-checkbox>
                    <!-- </el-form-item> -->
                </el-col>
                <el-col :span="24"
                    v-if="sku2List.length > 0"
                    style="padding-bottom: 22px">
                    <span class="diver">选择商品属性2(可不选)</span>
                    <!-- <el-form-item label="选择商品属性"> -->
                    <el-checkbox v-model="chooseSku2"
                        v-for="(le2, index) in sku2List"
                        :key="index"
                        :label="le2"
                        border>{{le2.name}}</el-checkbox>
                    <!-- </el-form-item> -->
                </el-col>
            </el-row>
            <span class="diver">图片上传(第一张将作为默认显示)</span>
            <el-upload :action="imgPostUrl"
                :multiple="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="uploadSuccess"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                style="padding-bottom: 22px"
                :limit="5">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否上架">
                        <el-radio v-model.number="formValue.is_hot"
                            :label="1"
                            border>上架</el-radio>
                        <el-radio v-model.number="formValue.is_hot"
                            :label="0"
                            border>下架</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否热卖">
                        <el-radio v-model.number="formValue.status"
                            :label="1"
                            border>是</el-radio>
                        <el-radio v-model.number="formValue.status"
                            :label="0"
                            border>否</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="formValue.sku.length > 0">
                <span class="diver">添加商品的子属性</span>
                <el-col :span="24">
                    <el-table :data="formValue.sku"
                        border
                        fit
                        highlight-current-row
                        class="table-sku">
                        <el-table-column prop="name"
                            label="属性名">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="market_price"
                            label="市场价">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.market_price"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price"
                            label="售价">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.price"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stock"
                            label="库存">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.stock"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sales_volume"
                            label="销量">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.sales_volume"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="img"
                            align="center"
                            label="上传图片">
                            <template slot-scope="scope">
                                <el-upload :on-success="skuImgUploadSuccess"
                                    :on-progress="skuImgUpload(scope.$index)"
                                    :show-file-list="false"
                                    :action=imgPostUrl>
                                    <el-button slot="trigger"
                                        v-if="!scope.row.img"
                                        size="small"
                                        type="primary">选取文件</el-button>
                                    <img :src="scope.row.img"
                                        v-else
                                        style="height: 30px; width: 30px;"
                                        slot="trigger"
                                        alt="">
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sales_volume"
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="warning"
                                    @click="deleteSku(scope.$index, scope.row)"
                                    icon="el-icon-close"
                                    size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <span class="diver">详细内容</span>
                    <div class="editor-container">
                        <tinymce :height=400
                            ref="editor"
                            v-model="formValue.desc"></tinymce>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="primary"
                        @click="onSubmit"
                        style="float:right">提交</el-button>
                </el-col>
            </el-row>

        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                :src="dialogImageUrl"
                alt="">
        </el-dialog>
    </div>
</template>

<script>
import MDinput from "@/components/MDinput"
import { inArray } from "@/utils/index"
import tinymce from "@/components/Tinymce"
import { getCate, addPro } from "@/api/product"
const api = process.env.BASE_API
const cdn = process.env.CDN
export default {
    name: "addPro",
    data () {
        return {
            formValue: {
                title: "",
                cate_id: "",
                market_price: 0,
                price: 0,
                stock: 0,
                sales_volume: 0,
                sort: 0,
                imgs: [],
                is_hot: 0,
                status: 1,
                desc: '',
                sku: [],
            },
            formRules: {
                title: [],
                cate: [],
                market_price: [],
                price: []
            },
            cate: [],
            skuLabel: [],
            sku1List: [],
            sku2List: [],
            chooseSku1: [],
            chooseSku2: [],
            tempIdenx: 0, //临时保存SKU上传图片的变量
            imgPostUrl: api + '/common/uploadImg', //图片上传地址
            dialogImageUrl: '', //已完成上传, 加载图片预览地址
            dialogVisible: false, //加载图片预览地址flag
        }
    },
    created () {
        getCate().then(res => {
            this.cate = res.data
        })
    },
    methods: {
        chooseCate (tag) {
            this.skuLabel = []
            this.chooseSku1 = []
            this.chooseSku2 = []
            this.cate.forEach((v, i) => {
                if (v.id == tag) {
                    if (v.sku.length > 0) {
                        this.skuLabel = v.sku
                        this.setSku(v.sku)
                    }
                }
            })
        },
        setSku (sku) {
            const sku1 = []
            const sku2 = []
            sku.forEach((item, index) => {
                if (item.level == 1) {
                    sku1.push(item)
                } else {
                    sku2.push(item)
                }
            })
            this.sku1List = sku1.length > 0 ? sku1 : []
            this.sku2List = sku2.length > 0 ? sku2 : []
        },
        //图片预览
        handlePictureCardPreview (file) {
            console.log('handlePictureCardPreview', file)
            this.dialogVisible = true
            this.dialogImageUrl = cdn + file.response.data
        },
        //图片删除钩子
        handleRemove (file, fileList) {
            this.formValue.imgs.splice(inArray(this.formValue.imgs, file.response.data), 1)
            console.log('handleRemove', file, fileList)
        },
        //图片上传钩子
        uploadSuccess (res, file, fileList) {
            this.formValue.imgs.unshift(res.data)
            console.log('uploadSuccess', res, file, fileList)
        },
        //图片删除前钩子
        beforeRemove (file, fileList) {
            console.log('beforeRemove', file, fileList)
            return this.$confirm('确定移除？')
        },
        //删除SKU
        deleteSku (index, row) {
            this.formValue.sku.splice(index, 1)
        },
        //SKU图片上传之前的操作
        skuImgUpload (index) {
            this.tempIdenx = index
        },
        //SKU图片上传
        skuImgUploadSuccess (res) {
            if (res.status == 1) {
                this.formValue.sku[this.tempIdenx].img = cdn + res.data
                console.log(this.formValue.sku[this.tempIdenx])
            }
        },
        //提交
        onSubmit () {
            addPro(this.formValue).then(res => {
                console.log(res)
            })
        },
        // 添加新的SKU属性, 笛卡尔积
        buildChild () {
            // console.log(this.chooseSku1, this.chooseSku2)
            this.formValue.sku = []
            if (this.chooseSku1.length > 0 && this.chooseSku2.length == 0) {
                this.chooseSku1.forEach((item, index) => {
                    this.formValue.sku.push({ name: item.name, sku_id_1: item.id, sku_id_2: 0, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' })
                })
            } else if (this.chooseSku1.length > 0 && this.chooseSku2.length > 0) {
                this.chooseSku1.forEach((item, index) => {
                    this.chooseSku2.forEach((item2, index2) => {
                        this.formValue.sku.push({ name: item.name + item2.name, sku_id_1: item.id, sku_id_2: item2.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' })
                    })
                })
            } else if (this.chooseSku1.length == 0 && this.chooseSku2.length > 0) {
                this.chooseSku2.forEach((item, index) => {
                    this.formValue.sku.push({ name: item.name, sku_id_1: 0, sku_id_2: item.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' })
                })
            }
        }
    },
    watch: {
        chooseSku1 (newV, oldV) {
            this.buildChild()
        },
        chooseSku2 (newV, oldV) {
            this.buildChild()
        },
    },
    components: {
        MDinput, tinymce
    },
}
</script>

<style lang="sass" scoped>
    .form-container
        padding: 10px 50px
        .diver
            display: block
            font-size: 12px
            color: #ccc
            line-height: 40px
            margin-bottom: 22px
            border-bottom: 1px dashed #ccc
        .editor-container 
            min-height: 500px
            margin: 0 0 30px
            .editor-upload-btn-container 
                text-align: right
                margin-right: 10px
                .editor-upload-btn 
                display: inline-block
        .table-sku
            font-size: 12px
</style>