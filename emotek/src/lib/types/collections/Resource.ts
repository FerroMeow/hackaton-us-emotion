import type { Sex } from './subtypes/Sex';
import type { Emotion } from '../Emotion';

export type ResourceType = 'image' | 'video' | 'text' | 'audio' | 'other';
export type Age = 'child' | 'young adults' | 'middle-aged adults' | 'old-aged adults';
export type ImageCategory = 'face' | 'fullBody';

export type Resource =
	| {
			resourceId: number;
			type: 'video' | 'text' | 'audio' | 'other';
			age?: Age;
			sex?: Sex;
			imageCategory?: ImageCategory;
			emotions: Emotion[];
			URL: string;
	  }
	| {
			resourceId: number;
			type: 'image';
			age?: Age;
			sex?: Sex;
			imageCategory: ImageCategory;
			emotions: Emotion[];
			path: string;
	  };
