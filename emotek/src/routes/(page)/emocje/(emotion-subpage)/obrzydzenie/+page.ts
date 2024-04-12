import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		emotionPageTitle: 'Obrzydzenie',
		topBg: 'bg-pistachio-500',
		topText: 'text-black',
		botBg: 'bg-pistachio-700',
		botText: 'text-black'
	};
};
