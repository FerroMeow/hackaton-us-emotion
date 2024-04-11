import type { LayoutLoad } from './$types';
import * as firebaseServices from '$lib/firebase/firebaseServices';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = async () => {
	return { ...firebaseServices };
};
