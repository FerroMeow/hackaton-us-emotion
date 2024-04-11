import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import firebaseConfig from '$lib/env';

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
connectAuthEmulator(auth, 'http://127.0.0.1:9099');

export const storage = getStorage();
connectStorageEmulator(storage, '127.0.0.1', 9199);

export const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);
