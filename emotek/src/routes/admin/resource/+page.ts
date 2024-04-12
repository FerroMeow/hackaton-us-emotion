import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { db } = await parent();
	return {
		resourceDocs: getDocs(query(collection(db, 'resource'), orderBy('resourceId', 'desc')))
	};
};
