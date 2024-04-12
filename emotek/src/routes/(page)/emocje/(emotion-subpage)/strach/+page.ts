import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Strach',
		topBg: 'bg-pomp_and_power-400',
		topText: 'text-white',
		botBg: 'bg-pomp_and_power-800',
		botText: 'text-black'
	};
};
