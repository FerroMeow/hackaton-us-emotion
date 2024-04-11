import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import type { User as UserCollection } from '$lib/types/collections/User';
import { collection, getDocs, limit, query, where, type Firestore } from 'firebase/firestore';

export const getLoggedUser = (auth: Auth): Promise<User | null> =>
	new Promise((res) => onAuthStateChanged(auth, (cred) => res(cred)));

export const getUser = async (user: User, auth: Auth, db: Firestore): Promise<UserCollection> => {
	const currentUid = user.uid;
	const userRef = collection(db, 'user');
	const currentUserQuery = query(userRef, where('uid', '==', currentUid), limit(1));
	const docs = await getDocs(currentUserQuery);
	const doc = docs.empty ? null : docs.docs.at(0);
	return doc?.data() as unknown as UserCollection;
};
