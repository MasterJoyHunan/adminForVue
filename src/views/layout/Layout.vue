<template>
    <div class="app-wrapper"
        :class="{hideSidebar:!sidebar.opened}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import { mapGetters } from 'vuex'

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        ...mapGetters(['sidebar'])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
