import type { Emotion } from '../Emotion';
import type { Resource } from './Resource';
import type { TrainingSession } from './TrainingSession';

export type TrainingSessionResult = {
	resultId: number;
	sessionId: TrainingSession['userId'];
	resourceId: Resource['resourceId'];
	recognizedEmotions: Emotion[];
	startedAt: Date;
	endedAt: Date;
};
