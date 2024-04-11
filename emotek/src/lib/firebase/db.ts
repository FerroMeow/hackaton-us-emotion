import {
	doc,
	getDoc,
	setDoc,
	type DocumentData,
	type DocumentReference,
	type WithFieldValue
} from 'firebase/firestore';

export async function setDocInc<AppModelType, DbModelType extends DocumentData>(
	reference: DocumentReference<AppModelType, DbModelType>,
	data: WithFieldValue<AppModelType> & object,
	incrementField: string
) {
	console.log('setting incrementable data');
	const incrementDoc = doc(reference.firestore, 'autoincrement', incrementField);
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
	data[incrementField] = currentValue;
	await setDoc(reference, data);
	console.log(`Set target data`);
	await setDoc(incrementDoc, {
		value: currentValue + 1
	});
	console.log(`Updated increment val`);
}
