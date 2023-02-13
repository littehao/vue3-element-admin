import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			collapse: false,
			menuMode:'horizontal'
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		},
		changeMenuMode(mode:string){
			localStorage.setItem('menuMode',mode)
			this.menuMode = mode
		}
	}
});
