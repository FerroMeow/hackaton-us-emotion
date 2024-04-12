import {
	Firestore,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	and,
	type DocumentData,
	type DocumentReference,
	type WithFieldValue,
	where,
	orderBy
} from 'firebase/firestore';

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
	const col_ref = collection(db, 'emotions');
	const results = await getDocs(query(col_ref));
	return results.docs.map((res) => res.data());
}

export async function getImages(db: Firestore, emotions: [], count: number) {
	const results = [];
	for (const emotion of emotions) {
		results.push(await getEmotionImages(db, emotion, count));
	}
	return results.flat();
}

async function getEmotionImages(db: Firestore, emotion: object, count: number) {
	const col_ref = collection(db, 'resource');
	const results = await getDocs(query(col_ref, where('emotions', 'array-contains', emotion)));
	const res = results.docs.map((result) => result.data());
	res.sort(() => 0.5 - Math.random());
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

export async function getUserResults(db: Firestore, userId: number, emotions: string[]) {
	const col_ref = collection(db, 'training_session');
	const res_ref = collection(db, 'training_session_result');
	let results;
	results = await getDocs(query(col_ref, where('userId', '==', userId), orderBy('type', 'asc')));
	let res = results.docs.map((result) => result.data());

	for (let i = 0; i < res.length; i++) {
		res[i]['results'] = [];
		const results_docs = await getDocs(query(res_ref, where('sessionId', '==', res[i].sessionId)));
		const results_data = results_docs.docs.map((result1) => result1.data());
		let ii = 0;
		let jj = 0;
		res[i]['results'].push(results_data.flat());
		emotions.forEach((emotion) => {
			res[i][emotion] = {};
			res[i][emotion]['total'] = 0;
			res[i][emotion]['correct'] = 0;
			res[i]['results'][0].forEach(async (answer) => {
				console.log(answer);
				const answer1 = await checkAnswer(db, answer['resourceId'], [emotion]);
				const answer2 = await checkAnswer(db, answer['resourceId'], answer['recognizedEmotions']);

				if (answer1) {
					res[i][emotion]['total'] += 1;
				}
				if (answer2) {
					res[i][emotion]['correct'] += 1;
				}
			});
		});
	}
	return res;
}

export async function checkAnswer(db: Firestore, resourceId: number, answer: string[]) {
	const res_ref = collection(db, 'resource');
	const res_result = await getDocs(
		query(res_ref, and(where('resourceId', '==', resourceId), where('emotions', '==', answer)))
	);
	const results = res_result.docs.map((res) => res.data());
	return results.length > 0;
}
