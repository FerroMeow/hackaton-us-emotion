import type { PageLoad } from './$types';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import firebaseConfig from '$lib/env';

export const load: PageLoad<{
	app: FirebaseApp;
	auth: Auth;
}> = async () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	connectAuthEmulator(auth, 'http://127.0.0.1:9099');
	return {
		app,
		auth
	};
};
