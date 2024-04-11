import type { LayoutLoad } from './$types';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import firebaseConfig from '$lib/env';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = async () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const storage = getStorage();
	connectStorageEmulator(storage, '127.0.0.1', 9199);
	const db = getFirestore(app);
	connectAuthEmulator(auth, 'http://127.0.0.1:9099');
	connectFirestoreEmulator(db, '127.0.0.1', 8080);
	return {
		app,
		auth,
		storage,
		db
	};
};
