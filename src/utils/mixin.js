/**
 * 需要做表格
 */
const cdn = process.env.CDN
export const pageMixin = {
    created() {
        this._getData()
    },
    data() {
        return {
            cdn: cdn, // 图片CDN前缀
            table_loading: true, // 是否加载
            list: [], // 数据
            params: {
                pageSize: 10, // 每页显示条目个数
                page: 1 // 当前页数
            },
            page_sizes: [10, 25, 50, 100], // 每页显示条目
            // page_sizes: [1, 2, 5, 10], // 每页显示条目
            total: 1 // 总共多少页
        }
    },
    methods: {
        // 每页显示条目改变
        handleSizeChange(val) {
            this.params.pageSize = val
            this._getData()
        },
        // 跳转页面
        handleCurrentChange(val) {
            this._getData()
        },
        // 搜索
        search() {
            this._getData()
        },
        // 获取数据
        _getData() {
            throw Error("请先获取数据")
        }
    }
}
