import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Smutek',
		topBg: 'bg-glaucous-400',
		topText: 'text-white',
		botBg: 'bg-glaucous-800',
		botText: 'text-black'
	};
};
