import type { LayoutLoad } from './$types';
import * as firebaseServices from '$lib/firebase/firebaseServices';
import { getEmotions } from '$lib/firebase/db';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = async () => {
	const db = firebaseServices['db'];
	const emotions = await getEmotions(db);
	return { ...firebaseServices, emotions };
};
