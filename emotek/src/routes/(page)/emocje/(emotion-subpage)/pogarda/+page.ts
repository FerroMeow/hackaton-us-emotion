import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Pogarda',
		topBg: 'bg-black',
		topText: 'text-white',
		botBg: 'bg-gray-700',
		botText: 'text-black'
	};
};
