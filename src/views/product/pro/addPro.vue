<template>
    <div class="app-container"
        id="add-pro">
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
                    <el-form-item prop="title"
                        id="title-item">
                        <MDinput :maxlength="25"
                            v-model="formValue.title">输入标题</MDinput>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="分类"
                        prop="cate_id">
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
                <el-col :span="8"
                    v-if="!haveSku">
                    <el-form-item label="库存"
                        prop="stock">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.stock"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序"
                        prop="sort">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8"
                    v-if="!haveSku">
                    <el-form-item label="市场价"
                        prop="market_price">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"
                    v-if="!haveSku">
                    <el-form-item label="售价"
                        prop="price">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"
                    v-if="!haveSku">
                    <el-form-item label="售出"
                        prop="sales_volume">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.sales_volume"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row v-if="skuLabel.length > 0">
                <el-col :span="24"
                    v-if="sku1List.length > 0"
                    style="padding-bottom: 22px">
                    <span class="diver">选择商品属性1
                        <div class="el-form-item__error"
                            v-if="choose1Error">请继续选择属性2</div>
                    </span>
                    <el-checkbox v-model="chooseSku1"
                        v-for="(le1, index) in sku1List"
                        :key="index"
                        :label="le1"
                        border>{{le1.name}}</el-checkbox>
                </el-col>
                <el-col :span="24"
                    v-if="sku2List.length > 0"
                    style="padding-bottom: 22px">
                    <span class="diver">选择商品属性2
                        <div class="el-form-item__error"
                            v-if="choose2Error">请继续选择属性1</div>
                    </span>
                    <el-checkbox v-model="chooseSku2"
                        v-for="(le2, index) in sku2List"
                        :key="index"
                        :label="le2"
                        border>{{le2.name}}</el-checkbox>
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
                    <el-form-item label="是否上架"
                        prop="is_hot">
                        <el-radio v-model.number="formValue.is_hot"
                            :label="1"
                            border>上架</el-radio>
                        <el-radio v-model.number="formValue.is_hot"
                            :label="0"
                            border>下架</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否热卖"
                        prop="status">
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
                            align="center"
                            :render-header="overwrite"
                            label="属性名">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="market_price"
                            align="center"
                            :render-header="overwrite"
                            label="市场价">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.market_price"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price"
                            align="center"
                            :render-header="overwrite"
                            label="售价">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.price"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stock"
                            align="center"
                            :render-header="overwrite"
                            label="库存">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.stock"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sales_volume"
                            align="center"
                            :render-header="overwrite"
                            label="销量">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.sales_volume"
                                    type="number"
                                    size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="img"
                            :render-header="overwriteImg"
                            align="center"
                            label="上传图片">
                            <template slot-scope="scope">
                                <el-upload :on-success="skuImgUploadSuccess"
                                    :show-file-list="false"
                                    class="upload-img-col"
                                    :action=imgPostUrl>
                                    <el-button slot="trigger"
                                        v-if="!scope.row.img"
                                        @click="skuImgUpload(scope.$index)"
                                        size="mini"
                                        type="primary">选取文件</el-button>
                                    <img :src="cdn + scope.row.img"
                                        class="upload-img"
                                        v-else
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
    data() {
        return {
            cdn: cdn,
            formValue: {
                title: "",
                cate_id: '',
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
                title: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 4, max: 25, message: '请输入4-25个字', trigger: 'blur' }
                ],
                cate_id: [
                    { required: true, message: '请选择分类', trigger: 'blur', type: 'number' },
                ],
                market_price: [
                    { required: true, min: 0.01, message: '市场价不得低于0.01元', trigger: 'blur', type: 'number' }
                ],
                price: [
                    { required: true, min: 0.01, message: '售价不得低于0.01元', trigger: 'blur', type: 'number' }
                ],
                stock: [
                    { required: true, min: 1, message: '库存不能低于1个', trigger: 'blur', type: 'number' }
                ],
                sales_volume: [
                    { required: true, min: 0, message: '销售个数不能为负数', trigger: 'blur', type: 'number' }
                ],
                sort: [
                    { required: true, min: 0, max: 255, message: '排序0-255之间', trigger: 'blur', type: 'number' }
                ],
                is_hot: [
                    { required: true, enum: [0, 1], message: '非法数据', trigger: 'blur', type: 'number' }
                ],
                status: [
                    { required: true, enum: [0, 1], message: '非法数据', trigger: 'blur', type: 'number' }
                ],

            },
            skuAttr: {
                name: '',
                market_price: '',
                price: '',
                sales_volume: '',
                stock: '',
                img: ''
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
            haveSku: false
        }
    },
    created() {
        getCate().then(res => {
            this.cate = res.data
        })
    },
    methods: {
        chooseCate(tag) {
            this.skuLabel = []
            this.chooseSku1 = []
            this.chooseSku2 = []
            this.cate.forEach((v, i) => {
                if (v.id == tag) {
                    if (v.sku.length > 0) {
                        this.haveSku = true
                        this.skuLabel = v.sku
                        this.setSku(v.sku)
                    } else {
                        this.haveSku = false
                    }
                }
            })
        },
        setSku(sku) {
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
        handlePictureCardPreview(file) {
            console.log('handlePictureCardPreview', file)
            this.dialogVisible = true
            this.dialogImageUrl = file.url
        },
        //图片删除钩子
        handleRemove(file, fileList) {
            this.formValue.imgs.splice(inArray(this.formValue.imgs, file.response.data), 1)
            console.log('handleRemove', file, fileList)
        },
        //图片上传钩子
        uploadSuccess(res, file, fileList) {
            this.formValue.imgs.unshift(res.data)
            console.log('uploadSuccess', res, file, fileList)
        },
        //图片删除前钩子
        beforeRemove(file, fileList) {
            console.log('beforeRemove', file, fileList)
            return this.$confirm('确定移除？')
        },
        //删除SKU
        deleteSku(index, row) {
            this.formValue.sku.splice(index, 1)
        },
        //SKU图片上传之前的操作
        skuImgUpload(index) {
            this.tempIdenx = index
        },
        //SKU图片上传
        skuImgUploadSuccess(res) {
            if (res.status == 1) {
                this.formValue.sku[this.tempIdenx].img = res.data
            }
        },
        //提交
        onSubmit() {
            this.$refs.fromInput.validate(valid => {
                if (!valid) {
                    this.$message({
                        message: '信息填写错误,请仔细检查',
                        type: 'error'
                    })
                    return false
                }
                if (this.choose1Error || this.choose2Error) {
                    this.$message({
                        message: 'SKU选择出现错误!请仔细检查',
                        type: 'error'
                    })
                    return false
                }
                addPro(this.formValue).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/product/goods')
                })
            })
        },
        // 添加新的SKU属性, 笛卡尔积
        buildChild() {
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
        },
        //重写头部
        overwrite(h, { column, $index }) {
            return (
                <el-popover placement="top-start" trigger="click">
                    <el-row>
                        <el-col span={15}>
                            <el-input size="mini"
                                on-change={(str) => { this.skuAttr[column.property] = str }}
                                placeholder="全部修改"></el-input>
                        </el-col>
                        <el-col span={9}>
                            <el-button size="mini"
                                style="float: right"
                                on-click={() => this.setAll(column.property)}
                                type="success">确定</el-button>
                        </el-col>
                    </el-row>
                    <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                </el-popover>
            )
        },
        //重写图片上传头部
        overwriteImg(h, { column, $index }) {
            // const _this = this
            if (!this.skuAttr.img) {
                return h('el-popover', {
                    props: {
                        placement: 'top-start',
                        trigger: 'click'
                    }
                }, [h('el-upload', {
                    props: {
                        action: this.imgPostUrl,
                        showFileList: false,
                        onSuccess: this.setAllImg
                    },
                }, [(<el-button slot="trigger"
                    size="mini"
                    type="primary">选取文件</el-button>)]), (<span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>)]
                )
            } else {
                /* return (
                    <el-popover placement="top-start" trigger="click">
                        <el-row>
                            <el-col span={15} style="display: flex; justify-content:center">
                                <el-upload
                                    action={this.imgPostUrl}
                                    showFileList={false}
                                    on-success={() => _this.setAllImg}
                                >
                                    <img src={this.cdn + this.skuAttr.img} style="height: 28px; width: 28px;" />
                                </el-upload>
                            </el-col>
                            <el-col span={9}>
                                <el-button size="mini"
                                    style="float: right"
                                    on-click={() => this.setAll('img')}
                                    type="success">确定</el-button>
                            </el-col>
                        </el-row>
                        <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                    </el-popover>
                ) */
                return (
                    <el-popover placement="top-start" trigger="click">
                        <el-row>
                            <el-col span={15} style="display: flex; justify-content:center">
                                {h('el-upload', {
                                    props: {
                                        action: this.imgPostUrl,
                                        showFileList: false,
                                        onSuccess: this.setAllImg
                                    }                                }
                                    , [(<img src={this.cdn + this.skuAttr.img} style="height: 28px; width: 28px;" />)])}
                            </el-col>
                            <el-col span={9}>
                                <el-button size="mini"
                                    style="float: right"
                                    on-click={() => this.setAll('img')}
                                    type="success">确定</el-button>
                            </el-col>
                        </el-row>
                        <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                    </el-popover>
                )
            }
        },
        //将整列SKU设置为同一个
        setAll(index) {
            this.formValue.sku.forEach(item => {
                this.$set(item, index, this.skuAttr[index])
            })
        },
        setAllImg(res) {
            if (res.status == 1) {
                this.skuAttr.img = res.data
            }
        }
    },
    computed: {
        // 商品属性选择, 如果有两级属性, 则必须选择两个都选择才能提交
        choose1Error() {
            if (this.sku1List.length > 0 && this.sku2List.length == 0) {
                return false
            }
            if (this.sku1List.length > 0 && this.sku2List.length > 0) {
                if (this.chooseSku1.length > 0 && this.chooseSku2.length == 0) {
                    return true
                }
                return false
            }
        },
        choose2Error() {
            if (this.sku1List.length == 0 && this.sku2List.length > 0) {
                return false
            }
            if (this.sku1List.length > 0 && this.sku2List.length > 0) {
                if (this.chooseSku1.length == 0 && this.chooseSku2.length > 0) {
                    return true
                }
                return false
            }
        }
    },
    watch: {
        chooseSku1(newV, oldV) {
            this.buildChild()
        },
        chooseSku2(newV, oldV) {
            this.buildChild()
        },
    },
    components: {
        MDinput, tinymce
    },
}
</script>

<style lang="sass">
    #add-pro
        .form-container
            padding: 10px 50px
            .material-input
                font-weight: 800
                font-size: 23px
                color: rgba(176, 195, 25, 0.8)
            #title-item
                display: block
                .el-form-item__content
                    display: block !important
            .diver
                display: block
                font-size: 12px
                color: #ccc
                line-height: 40px
                margin-bottom: 22px
                border-bottom: 1px dashed #ccc
                .el-form-item__error
                    position: relative
                    padding-top: 0
                    top: auto
                    left: 10px
                    display: inline-block
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
            .upload-img-col
                display: flex
                justify-content: center
                .upload-img
                    display: block
                    height: 28px
                    width: 28px
            .el-icon-edit
                margin-left: 5px
                line-height: 23px
                &:before
                    -webkit-text-fill-color: #409EFF
                    fill: #409EFF
</style>
