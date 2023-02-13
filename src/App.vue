<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref ,Ref} from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useSidebarStore } from '@/store/modules/sidebar';

//导航模式
const sidebar = useSidebarStore();
let navpattern: string = localStorage.getItem('menuMode') || 'horizontal'
sidebar.changeMenuMode(navpattern)
</script>
<style>

</style>
