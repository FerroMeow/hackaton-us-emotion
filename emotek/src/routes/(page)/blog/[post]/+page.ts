import type { PageLoad } from './$types';
import { getPost } from '$lib/firebase/blog';

export const prerender = false;

export const load: PageLoad = async ({ parent, params }) => {
	const { db } = await parent();
	return {
		post: await getPost(db, params.post)
	};
};
