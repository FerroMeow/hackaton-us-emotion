import type { Firestore } from 'firebase/firestore';
import { getUserInfo, getImages } from './firebase/db';
import type { TrainingSessionResult } from './types/collections/TrainingSessionResult';
import type { TrainingSession } from './types/collections/TrainingSession';
import { DocInc } from './firebase/db';
import { setDoc, doc, writeBatch } from 'firebase/firestore';
import { goto } from '$app/navigation';

export async function startTest(
	type: string,
	emotions: string[],
	count: number,
	userData: string | undefined,
	db: Firestore
) {
	if (userData) {
		const user = await getUserInfo(db, userData);
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
	selectedEmotion: string[],
	last_emotion: string[]
) {
	const image_res = images_res.pop();
	/*selectedEmotion = ['surprise', 'fear', 'sadness', 'anger', 'Happiness', 'contempt', 'disgust'];
	const select = selectedEmotion[Math.floor(Math.random() * selectedEmotion.length)];
	selectedEmotion = [select];*/
	if (!image_res) {
		results_res[results_res.length - 1]['endedAt'] = new Date();
		results_res[results_res.length - 1]['recognizedEmotions'] = selectedEmotion;
		results_res[results_res.length - 1]['answer'] = last_emotion;
		return { image_res, images_res, results_res };
	}
	if (results_res.length > 0) {
		results_res[results_res.length - 1]['endedAt'] = new Date();
		results_res[results_res.length - 1]['recognizedEmotions'] = selectedEmotion;
		results_res[results_res.length - 1]['answer'] = last_emotion;
	}
	results_res.push({
		resultId: -1,
		sessionId: -1,
		resourceId: image_res['resourceId'],
		startedAt: new Date(),
		endedAt: new Date(),
		recognizedEmotions: [],
		answer: []
	});
	console.log(results_res);

	const last_emotion_res = image_res['emotions'];

	return { image_res, images_res, results_res, last_emotion_res };
}

export async function endTest(
	db: Firestore,
	trainingSession: TrainingSession,
	results: TrainingSessionResult[]
) {
	trainingSession['endedAt'] = new Date();
	const sessionId = await DocInc(db, 'sessionId');
	console.log(sessionId);
	trainingSession['sessionId'] = sessionId;
	const batch = writeBatch(db);
	batch.set(doc(db, 'training_session', sessionId.toString()), trainingSession);
	results = results.map((item) => {
		return { ...item, sessionId: sessionId };
	});
	for (let i = 0; i < results.length; i++) {
		const resultId = await DocInc(db, 'resultId');
		console.log(resultId);
		results[i]['resultId'] = resultId;
		batch.set(doc(db, 'training_session_result', resultId.toString()), results[i]);
	}
	await batch.commit();
	goto('/test/wyniki', {
		replaceState: true
	});
}
