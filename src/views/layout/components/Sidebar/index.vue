<template>
    <scroll-bar>
        <el-menu mode="vertical"
            unique-opened
            :default-active="$route.path"
            :collapse="isCollapse"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF">
            <sidebar-item :routes="routes"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { inArray } from "@/utils"

export default {
    components: { SidebarItem, ScrollBar },
    computed: {
        ...mapGetters([
            'sidebar',
            'adminNode'
        ]),
        routes() {
            const path = this.$router.options.routes
            path.forEach((item, index) => {
                if (item.hidden !== true && item.name !== 'dashboard') {
                    if (inArray(this.adminNode, item.name) === false) {
                        path[index].hidden = true
                    }
                    if (item.children.length > 0) {
                        const child = item.children
                        child.forEach((item2, index2) => {
                            if (inArray(this.adminNode, item2.name) === false) {
                                path[index].children[index2].hidden = true
                            }
                        })
                    }
                }
            })
            return path
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>
