import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Zaskoczenie',
		topBg: 'bg-ecru-400',
		topText: 'text-black',
		botBg: 'bg-ecru-800',
		botText: 'text-black'
	};
};
