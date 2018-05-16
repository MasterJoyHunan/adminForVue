<template>
    <div class="app-container"
        id="edit-pro">
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
                            disabled
                            style="width: 200px">
                            <el-option v-for="(item, index) in cate"
                                :label="item.name"
                                :value="item.id"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8"
                    v-if="formValue.sku.length == 0">
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
                    v-if="formValue.sku.length == 0">
                    <el-form-item label="市场价"
                        prop="market_price">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"
                    v-if="formValue.sku.length == 0">
                    <el-form-item label="售价"
                        prop="price">
                        <el-input style="width: 200px"
                            type="number"
                            v-model.number="formValue.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"
                    v-if="formValue.sku.length == 0">
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
                    <span class="diver">选择商品属性1(可不选)</span>
                    <el-checkbox v-model="chooseSku1"
                        v-for="(le1, index) in sku1List"
                        :key="index"
                        :label="le1"
                        :disabled="inArray(tempChooseSku1, le1)"
                        @change="buildChild(le1, 1)"
                        border>{{le1.name}}</el-checkbox>
                </el-col>
                <el-col :span="24"
                    v-if="sku2List.length > 0"
                    style="padding-bottom: 22px">
                    <span class="diver">选择商品属性2(可不选)</span>
                    <el-checkbox v-model="chooseSku2"
                        v-for="(le2, index) in sku2List"
                        :key="index"
                        :label="le2"
                        :disabled="inArray(tempChooseSku2, le2)"
                        @change="buildChild(le2, 2)"
                        border>{{le2.name}}</el-checkbox>
                </el-col>
            </el-row>
            <span class="diver">图片上传(第一张将作为默认显示)</span>
            <el-upload :action="imgPostUrl"
                :multiple="false"
                list-type="picture-card"
                :file-list="fileList"
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
                                        @click="skuImgUpload(scope.$index)"
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
import { inArray, inArrayObject } from "@/utils/index"
import tinymce from "@/components/Tinymce"
import { getCate, editPro, delPro, getPro } from "@/api/product"
const api = process.env.BASE_API
const cdn = process.env.CDN
export default {
    name: "editPro",
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
                    { required: true, min: 0.01, message: '市场价不得低于0.01元', trigger: 'blur' }
                ],
                price: [
                    { required: true, min: 0.01, message: '售价不得低于0.01元', trigger: 'blur' }
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
            fileList: [],
            tempLabel: {}
        }
    },
    created() {
        // 临时数组存储修改商品的SKU信息, 不需要set get
        this.tempChooseSku1 = []
        this.tempChooseSku2 = []
        this._getData()
    },
    methods: {
        // 如果是已经选择的,无法取消
        inArray(arr, attr) {
            if (inArray(arr, attr) !== false) {
                return true
            } else {
                return false
            }
        },
        // 选择sku
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
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        //图片删除钩子
        handleRemove(file, fileList) {
            console.log(this.formValue)
            const item = file.imgName || file.response.data
            this.formValue.imgs.splice(inArray(this.formValue.imgs, item), 1)
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
            if (!row.id) {
                // 临时添加的可直接删除
                this.formValue.sku.splice(index, 1)
                return
            }
            // 已保存到数据库的需要确认
            this.$confirm('已保存的SKU删除将不可恢复, 确定?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delPro({ id: row.id, type: 2 }).then(res => {
                    this.formValue.sku.splice(index, 1)
                })
            })
        },
        //SKU图片上传之前的操作
        skuImgUpload(index) {
            console.log(this.formValue.sku)
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
                console.log(this.formValue)
                editPro(this.formValue).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/product/goods')
                })
            })
        },
        // 添加新的SKU属性, 笛卡尔积, 如果已经存在的,不改变
        buildChild(attr, pos) {
            // 需要判断,不能为已经选择的SKU
            if (inArray(this.tempChooseSku1, attr) !== false) {
                this.$message({
                    message: '请不要操作已选择的SKU',
                    type: 'error'
                })
                this.chooseSku1 = this.tempChooseSku1
                return
            }
            if (inArray(this.tempChooseSku2, attr) !== false) {
                this.$message({
                    message: '请不要操作已选择的SKU',
                    type: 'error'
                })
                this.chooseSku2 = this.tempChooseSku2
                return
            }
            if (this.chooseSku1.length > 0 && this.chooseSku2.length == 0) {
                this.tempLabel = { name: attr.name, sku_id_1: attr.id, sku_id_2: 0, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                const flag = inArray(this.chooseSku1, attr)
                if (flag !== false) {
                    //添加
                    this.formValue.sku.push(this.tempLabel)
                } else {
                    //删除
                    const index = inArrayObject(this.formValue.sku, this.tempLabel)
                    if (index !== false) {
                        this.formValue.sku.splice(index, 1)
                    }
                }
            } else if (this.chooseSku1.length > 0 && this.chooseSku2.length > 0) {
                // 多重数据的添加
                // 1.选择的sku1
                if (pos == 1) {
                    // 2.判断是选择还是取消
                    const flag = inArray(this.chooseSku1, attr)
                    if (flag !== false) {
                        // 3.如果添加
                        this.chooseSku2.forEach((item, index) => {
                            this.tempLabel = { name: attr.name + item.name, sku_id_1: attr.id, sku_id_2: item.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                            this.formValue.sku.push(this.tempLabel)
                        })
                    } else {
                        // 3.如果取消
                        this.chooseSku2.forEach((item, index) => {
                            this.tempLabel = { name: attr.name + item.name, sku_id_1: attr.id, sku_id_2: item.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                            const index1 = inArrayObject(this.formValue.sku, this.tempLabel)
                            if (index1 !== false) {
                                this.formValue.sku.splice(index1, 1)
                            }
                        })
                    }
                } else {
                    // 选择的sku2
                    const flag = inArray(this.chooseSku2, attr)
                    if (flag !== false) {
                        // 3.如果添加
                        this.chooseSku1.forEach((item, index) => {
                            this.tempLabel = { name: item.name + attr.name, sku_id_1: item.id, sku_id_2: attr.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                            this.formValue.sku.push(this.tempLabel)
                        })
                    } else {
                        // 3.如果取消
                        this.chooseSku1.forEach((item, index) => {
                            this.tempLabel = { name: item.name + attr.name, sku_id_1: item.id, sku_id_2: attr.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                            const index1 = inArrayObject(this.formValue.sku, this.tempLabel)
                            if (index1 !== false) {
                                this.formValue.sku.splice(index1, 1)
                            }
                        })
                    }
                }
            } else if (this.chooseSku1.length == 0 && this.chooseSku2.length > 0) {
                this.tempLabel = { name: attr.name, sku_id_1: 0, sku_id_2: attr.id, stock: 0, market_price: 0, price: 0, sales_volume: 0, img: '' }
                const flag = inArray(this.chooseSku2, attr)
                if (flag !== false) {
                    //添加
                    this.formValue.sku.push(this.tempLabel)
                } else {
                    //删除
                    const index = inArrayObject(this.formValue.sku, this.tempLabel)
                    if (index !== false) {
                        this.formValue.sku.splice(index, 1)
                    }
                }
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
        },
        _getData() {
            getPro(this.$route.query).then(res => {
                this.formValue = res.data
                getCate().then(res => {
                    this.cate = res.data
                    // 渲染SKU_LABEL
                    if (this.formValue.sku.length > 0) {
                        this.cate.forEach((v, i) => {
                            if (v.id == this.formValue.cate_id) {
                                if (v.sku.length > 0) {
                                    this.skuLabel = v.sku
                                    this.setSku(v.sku)
                                }
                            }
                        })
                        const attr1_id = []
                        const attr2_id = []
                        this.formValue.sku.forEach(item => {
                            if (item.sku_id_1 > 0) {
                                !attr1_id[item.sku_id_1] ? attr1_id[item.sku_id_1] = item.sku_id_1 : ''
                            }
                            if (item.sku_id_2 > 0) {
                                !attr2_id[item.sku_id_2] ? attr2_id[item.sku_id_2] = item.sku_id_2 : ''
                            }
                        })
                        if (attr1_id.length > 0) {
                            attr1_id.forEach(i => {
                                this.skuLabel.forEach((v) => {
                                    if (v.id == i) {
                                        this.tempChooseSku1.push(v)
                                        this.chooseSku1.push(v)
                                    }
                                })
                            })
                        }
                        if (attr2_id.length > 0) {
                            attr2_id.forEach(i => {
                                this.skuLabel.forEach((v) => {
                                    if (v.id == i) {
                                        this.tempChooseSku2.push(v)
                                        this.chooseSku2.push(v)
                                    }
                                })
                            })
                        }
                    }
                    //图片处理
                    this.formValue.imgs = this.formValue.imgs.split('|')
                    this.formValue.imgs.map(item => {
                        this.fileList.push({ url: cdn + item, imgName: item })
                    })
                })
            }).catch(err => {
                this.$router.back()
            })
        },
    },
    watch: {
    },
    components: {
        MDinput, tinymce
    },
}
</script>

<style lang="sass">
    #edit-pro
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

