import type { Sex } from './subtypes/Sex';

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
	  }
	| {
			resourceId: number;
			type: 'image';
			age?: Age;
			sex?: Sex;
			imageCategory: ImageCategory;
	  };
