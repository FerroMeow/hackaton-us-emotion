import type { PageLoad } from './$types';
// import firebaseConfig from '$lib/env';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';

export async function load({ fetch }): PageLoad {
	// Required for side-effects
	// const app = initializeApp(firebaseConfig);
	// const firestore = getFirestore(app);
	// const resources = await getDocs(collection(firestore, 'resource'));
	console.log(Math.random());
}
