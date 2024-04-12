import {
	QueryDocumentSnapshot,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	type Firestore
} from 'firebase/firestore';

export const getPosts = async (db: Firestore) =>
	getDocs(query(collection(db, 'post'), orderBy('postId', 'desc')));

export const deletePost = async (db: Firestore, document: QueryDocumentSnapshot) => {
	deleteDoc(doc(db, 'post', document.id));
};
