import type { User } from './User';

//export type Type = 'diagnosis' | 'training';

export type TrainingSession = {
	sessionId: number;
	userId: User['userId'];
	type: string;
	age: number;
	startedAt: Date;
	endedAt: Date;
};
