<template>
	<v-header />
	<menuSidebar v-if="sidebar.menuMode == 'vertical'"/>
	<div class="content-box" :class="sidebar.menuMode == 'vertical'?['vertical',{'content-collapse': sidebar.collapse}]:''">
		<v-tags></v-tags>
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '../store/modules/sidebar';
import { useTagsStore } from '../store/modules/tags';
import vHeader from '../components/header.vue';
import menuSidebar from '../components/menuSidebar.vue';
import vTags from '../components/tags.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
