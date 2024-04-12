import type { Firestore } from 'firebase/firestore';
import { getUserInfo, getImages } from './firebase/db';
import type { TrainingSessionResult } from './types/collections/TrainingSessionResult';
import type { TrainingSession } from './types/collections/TrainingSession';
import { DocInc } from './firebase/db';
import { addDoc, collection } from 'firebase/firestore';

export async function startTest(
	type: string,
	emotions: string[],
	count: number,
	userData: string | undefined,
	db: Firestore
) {
	if (userData) {
		const user = await getUserInfo(db, userData);
		console.log(userData);
		const startTime = new Date();
		const trainingSession_res: TrainingSession = {
			sessionId: 0,
			userId: user['userId'],
			age: startTime.getFullYear() - user['birthYear'],
			type: type,
			startedAt: startTime,
			endedAt: new Date()
		};
		let images_res;

		await getImages(db, emotions, count).then((res) => {
			images_res = res;
		});
		return { trainingSession_res, images_res };
	}
	return {};
}

export function nextImage(
	images_res: any[],
	results_res: TrainingSessionResult[],
	selectedEmotion: string[]
) {
	const image_res = images_res.pop();
	if (images_res) {
		return { image_res, images_res, results_res };
	}
	if (results_res.length > 0) {
		results_res[results_res.length - 1]['resourceId'] = image_res['resourceId'];
		results_res[results_res.length - 1]['endedAt'] = new Date();
		results_res[results_res.length - 1]['recognizedEmotions'] = selectedEmotion;
	}

	results_res.push({
		resultId: -1,
		sessionId: -1,
		resourceId: -1,
		startedAt: new Date(),
		endedAt: new Date(),
		recognizedEmotions: []
	});

	return { image_res, images_res, results_res };
}

export async function endTest(
	db: Firestore,
	trainingSession: TrainingSession,
	results: TrainingSessionResult[]
) {
	trainingSession['endedAt'] = new Date();
	const sessionId = await DocInc(db, 'sessionId');
	trainingSession['sessionId'] = sessionId;
	await addDoc(collection(db, 'training_session'), trainingSession);
	results = results.map((item) => {
		return { ...item, sessionId: sessionId };
	});
	results.forEach(async (result) => {
		const resultId = await DocInc(db, 'resultId');
		result['resultId'] = resultId;
		await addDoc(collection(db, 'training_session_result'), result);
	});
}
