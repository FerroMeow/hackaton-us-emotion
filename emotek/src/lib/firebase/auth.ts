import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';

export const getLoggedUser = (auth: Auth): Promise<User | null> =>
	new Promise((res) => onAuthStateChanged(auth, (cred) => res(cred)));
