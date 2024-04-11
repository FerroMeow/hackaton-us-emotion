import type { LayoutData } from './$types';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import firebaseConfig from '$lib/env';

export const load: LayoutData = async () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	connectAuthEmulator(auth, 'http://127.0.0.1:9099');
	return {
		app,
		auth
	};
};
