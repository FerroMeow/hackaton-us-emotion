import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Szczęście',
		topBg: 'bg-pink_lavender-400',
		topText: 'text-black',
		botBg: 'bg-pink_lavender-800',
		botText: 'text-black'
	};
};
