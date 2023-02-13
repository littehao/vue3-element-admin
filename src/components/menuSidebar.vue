<template>
    <div class="menu-sidebar" :class="sidebar.menuMode == 'horizontal'?'relative flex-1 h-100':'absolute top'">
        <el-menu
            class="sidebar-el-menu"
            :class="sidebar.menuMode == 'horizontal'?'':'vertical'"
            :default-active="onRoutes"
            :collapse="sidebar.menuMode == 'horizontal'?false:sidebar.collapse"
            :background-color="sidebar.menuMode == 'horizontal'?'transparent':'#324157'"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            :mode="sidebar.menuMode"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss" :popper-class="sidebar.menuMode == 'horizontal'?'sub-horizontal-bg':''">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/modules/sidebar';
import { useRoute } from 'vue-router';
const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '系统首页',
        permiss: '1',
    },
    {
        icon: 'Calendar',
        index: '1',
        title: '表格相关',
        permiss: '2',
        subs: [
            {
                index: '/table',
                title: '常用表格',
                permiss: '2',
            },
            {
                index: '/import',
                title: '导入Excel',
                permiss: '2',
            },
            {
                index: '/export',
                title: '导出Excel',
                permiss: '2',
            },
        ],
    },
];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style lang="scss">
.menu-sidebar{
    .sidebar-el-menu.vertical:not(.el-menu--collapse) {
        width: 250px;
    }
    .el-menu--horizontal{
        border:0;
        background-color: transparent;
    }
    .el-menu--horizontal>.el-sub-menu:hover,
    .el-menu--horizontal>.el-sub-menu.is-active{
        color: var(--el-menu-hover-text-color);
        background-color: var(--el-menu-hover-bg-color);
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        background-color: var(--el-menu-hover-bg-color);
    }
    .el-menu.vertical>.el-menu-item.is-active,
    .el-menu.vertical>.el-sub-menu.is-active .el-menu-item.is-active{
        background-color: var(--el-menu-hover-bg-color);
    }
}
.menu-sidebar.top{
    display: block;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.menu-sidebar::-webkit-scrollbar {
    width: 0;
}
.menu-sidebar > ul {
    height: 100%;
    width: 100%;
}
/*菜单样式*/
.el-popper.sub-horizontal-bg{
    background-color: #242f42 !important;
}
.el-menu--horizontal.sub-horizontal-bg .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal.sub-horizontal-bg .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-sub-menu.is-active>.el-sub-menu__title{
    color: var(--el-menu-active-color);
    background-color: var(--el-menu-hover-bg-color);
}
</style>
