import type { Emotion } from '$lib/types/Emotion';
import {
	Firestore,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	limit,
	type DocumentData,
	type DocumentReference,
	type WithFieldValue,
	where
} from 'firebase/firestore';
import type { Resource } from '$lib/types/collections/Resource';

export async function setDocInc<AppModelType, DbModelType extends DocumentData>(
	reference: DocumentReference<AppModelType, DbModelType>,
	data: WithFieldValue<AppModelType> & object,
	incrementField: string
) {
	data[incrementField] = await DocInc(reference.firestore, incrementField);
	await setDoc(reference, data);
}
export async function DocInc(db: Firestore, incrementField: string) {
	console.log('setting incrementable data');
	const incrementDoc = doc(db, 'autoincrement', incrementField);
	console.log('created increment ref doc');
	const incrementDocRes = await getDoc(incrementDoc);
	console.log('got increment doc');
	let currentValue: number | null | undefined = incrementDocRes.exists()
		? incrementDocRes.data()?.value
		: null;
	console.log(`inc val 1: ${currentValue}`);
	currentValue = currentValue ?? 1;
	console.log(`inc val 2: ${currentValue}`);
	currentValue = Number(currentValue);
	console.log(`inc val 3: ${currentValue}`);
	console.log(`Set target data`);
	await setDoc(incrementDoc, {
		value: currentValue + 1
	});
	console.log(`Updated increment val`);
	return currentValue;
}

export async function getEmotions(db: Firestore) {
	let arr = [];
	const col_ref = collection(db, 'emotions');
	const results = await getDocs(query(col_ref));
	results.docs.map((res) => arr.push(res.data()));
	return arr;
}

export async function getImages(db: Firestore, emotions: Emotion[], count: number) {
	let results = [];
	for (const emotion of emotions) {
		let tmp = await getEmotionImages(db, emotion, count);
		results.push(tmp);
	}
	return results.flat();
}

async function getEmotionImages(db: Firestore, emotion: Emotion, count: number) {
	const col_ref = collection(db, 'resource');
	const results = await getDocs(query(col_ref, where('emotions', 'array-contains', emotion)));
	let res = results.docs.map((result) => result.data());
	res.sort((index) => 0.5 - Math.random());
	return res.slice(0, count);
}

export async function getUserInfo(db: Firestore, userId: string) {
	const doc_ref = doc(db, 'user', userId);
	const result = await getDoc(doc_ref);
	if (result.exists()) {
		return result.data();
	} else {
		return {};
	}
}
