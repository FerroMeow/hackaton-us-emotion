import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Złość',
		topBg: 'bg-redwood-400',
		topText: 'text-white',
		botBg: 'bg-redwood-800',
		botText: 'text-black'
	};
};
