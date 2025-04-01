import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
	id: 'zeptomail-settings',
	name: 'Zeptomail Settings',
	icon: 'mail',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
});
