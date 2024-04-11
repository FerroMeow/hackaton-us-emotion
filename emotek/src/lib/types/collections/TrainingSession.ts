import type { User } from './User';

export type Type = '';

export type TrainingSession = {
	sessionId: number;
	userId: User['userId'];
	type: Type;
	age: number;
	startedAt: Date;
	endedAt: Date;
};
