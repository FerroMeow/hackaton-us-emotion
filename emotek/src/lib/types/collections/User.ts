import type { Sex } from './subtypes/Sex';

export type PlaceOfResidence = 'village' | 'town' | 'small city' | 'large city';

export const numberIntoPlaceOfResidence = (population: number): PlaceOfResidence => {
	if (population > 100000) {
		return 'large city';
	}
	if (population > 20000) {
		return 'small city';
	}
	if (population > 1000) {
		return 'town';
	}
	return 'village';
};

export type User = {
	userId: number;
	birthYear: number;
	sex: Sex;
	placeOfResidence: PlaceOfResidence;
	additionalInformation: string;
};
