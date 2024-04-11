import type { LayoutData } from './$types';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage,  } from "firebase/storage";
import firebaseConfig from '$lib/env';

export const load: LayoutData = async () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const storage = getStorage();
	connectStorageEmulator(storage,"127.0.0.1", 9199);
	connectAuthEmulator(auth, 'http://127.0.0.1:9099');
	return {
		app,
		auth,
		storage
	};
};
