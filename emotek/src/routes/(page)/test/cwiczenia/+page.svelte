<script lang="ts">
	import { DocInc, getImages, getUserInfo } from '$lib/firebase/db';
	import type { LayoutData } from '../../$types';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { onAuthStateChanged } from 'firebase/auth';
	import { collection, addDoc } from 'firebase/firestore';
	export let data: LayoutData;
	const { db, auth, emotions } = data;
	emotions.map((el) => el['eng']);
	let selectedEmotion: any;
	let trainingSession: TrainingSession;
	let sessionId: number;
	let images: any[];
	let type: string;
	let results: TrainingSessionResult[];
	let startTime: Date;
	let userData: string;
	let userId;
	let userAge: number;
	let image;
	let user;
	let userResponse: string;
	let responseStart: Date;
	let responseEnd: Date;
	async function startTest() {
		if (userData) {
			user = await getUserInfo(db, userData);
			userAge = user['birthYear'];
			startTime = new Date();
			userAge = startTime.getFullYear() - userAge;
			userId = user['userId'];
			type = 'diagnosis';
			emotions.map((el) => el['eng']);
			images = await getImages(
				db,
				emotions.map((el) => el['eng']),
				10
			);
			nextImage(true);
		}
	}
	function nextImage(first = false) {
		if (first) {
			if (!image || image.length == 0) {
				endTest();
			}
			image = images.pop();
			responseStart = new Date();
		} else {
			responseEnd = new Date();
			results.push({
				resultId: 0,
				sessionId: 0,
				resourceId: image['resourceId'],
				startedAt: responseStart,
				endedAt: responseEnd,
				recognizedEmotions: selectedEmotion
			});
			if (!image || image.length == 0) {
				endTest();
			}
			image = images.pop();
			responseStart = new Date();
		}
	}

	async function endTest() {
		/*trainingSession = {
			sessionId: 0,
			userId: user['userId'],
			age: userAge,
			type: type,
			startedAt: startTime,
			endedAt: new Date()
		};*/
		trainingSession = {
			sessionId: 0,
			userId: 1,
			age: 12,
			type: 'diagnosis',
			startedAt: new Date(),
			endedAt: new Date()
		};
		results = [
			{
				endedAt: new Date(),
				startedAt: new Date(),
				resultId: 0,
				resourceId: 1,
				sessionId: 1,
				recognizedEmotions: 'sad'
			},
			{
				endedAt: new Date(),
				startedAt: new Date(),
				resultId: 0,
				resourceId: 1,
				sessionId: 1,
				recognizedEmotions: 'sad'
			},
			{
				endedAt: new Date(),
				startedAt: new Date(),
				resultId: 0,
				resourceId: 1,
				sessionId: 1,
				recognizedEmotions: 'sad'
			},
			{
				endedAt: new Date(),
				startedAt: new Date(),
				resultId: 0,
				resourceId: 1,
				sessionId: 1,
				recognizedEmotions: 'sad'
			}
		];
		sessionId = await DocInc(db, 'sessionId');
		trainingSession['sessionId'] = sessionId;
		await addDoc(collection(db, 'training_session'), trainingSession);
		results = results.map((item) => {
			return { ...item, sessionId: sessionId };
		});
		results.forEach(async (result) => {
			let resultId = await DocInc(db, 'resultId');
			result['resultId'] = resultId;
			await addDoc(collection(db, 'training_session_result'), result);
		});
	}
	onAuthStateChanged(auth, (cred) => {
		userData = cred?.uid;
	});
</script>

<a href="diagnoza"> Diagnozuj</a> <br />
<a href="cwiczenia"> Ćwicz</a>

<div>
	<h2>Ćwicz rozpoznawanie emocji</h2>
	<div>
		<img id="image" alt="Zdjęcie do zdiagnozowania emocji" />
		<div id="emotionSelector">
			<label for="emotion">Wybierz emocję: </label>
			<select id="emotion" bind:value={selectedEmotion}>
				<option value="">Wybierz emocję: </option>
				<option value="anger">Złość</option>
				<option value="contempt">Pogarda</option>
				<option value="fear">Strach</option>
				<option value="disgust">Obrzydzenie</option>
				<option value="happiness">Szczęście</option>
				<option value="sadness">Smutek</option>
				<option value="surprise">Zaskoczenie</option>
			</select>
			<button on:click={endTest}>Następne</button>
		</div>
		<div id="result" style="display:none;"></div>
	</div>
</div>

<a href="mojecwiczenia"> Własny test</a> <br />
