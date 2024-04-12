import type { PageLoad } from './$types';
import { getPosts } from '$lib/firebase/blog';

export const load: PageLoad = async ({ parent }) => {
	const { db } = await parent();
	return {
		posts: getPosts(db)
	};
};
