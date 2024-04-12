import type { Resource } from './Resource';
import type { TrainingSession } from './TrainingSession';

export type TrainingSessionResult = {
	resultId: number;
	sessionId: TrainingSession['userId'];
	resourceId: Resource['resourceId'];
	recognizedEmotions: string[];
	startedAt: Date;
	endedAt: Date;
};
