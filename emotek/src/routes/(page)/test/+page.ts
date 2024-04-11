import type { PageLoad } from './$types';
import firebaseConfig from '$lib/env';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

export const load: PageLoad = async () => {
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	const resources = await getDocs(collection(firestore, 'resource'));

	return {
		resources
	};
};
