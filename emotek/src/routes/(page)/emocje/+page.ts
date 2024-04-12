import type { PageLoad } from './$types';

type EmotionPageData = {
	endpoint: string;
	bg: string;
	src: string | null;
	name: string;
	description: string;
};

const emotionData: EmotionPageData[] = [
	{
		name: 'Złość',
		endpoint: 'zlosc',
		description:
			'Złość to emocja najczęściej utożsamiana z agresją. Ale czy to tylko tyle? Sprawdź!',
		bg: 'bg-redwood-700',
		src: null
	},
	{
		name: 'Szczęście',
		endpoint: 'szczescie',
		description:
			'Jedna z najbardziej miłych emocji, coś co wielu chce osiągnąć. Jednak nie jest to proste. Dzięki naszym informacjom możesz je osiągnąć!',
		bg: 'bg-pink_lavender-700',
		src: null
	},
	{
		name: 'Smutek',
		endpoint: 'smutek',
		description:
			'Najbardziej niezrozumiana emocja. Kliknij aby dowiedzieć się czemu nie ma potrzeby jej unikania!',
		bg: 'bg-glaucous-700',
		src: null
	},
	{
		name: 'Zaskoczenie',
		endpoint: 'zaskoczenie',
		description:
			'Emocja mało popularna i przez wielu uważana za nieinteresującą. Nie jest to prawda, o czym piszemy na jej stronie!',
		bg: 'bg-ecru-700',
		src: null
	},
	{
		name: 'Strach',
		endpoint: 'strach',
		description:
			'Jedna z najsilniejszych emocji. Wiedza o niej pozwala zapanować nad jej efektami, czego możesz dokonać na jej stronie.',
		bg: 'bg-pomp_and_power-700',
		src: null
	},
	{
		name: 'Pogarda',
		endpoint: 'pogarda',
		description: 'Interesująca w wielu aspektach emocja o której można mówić godzinami.',
		bg: 'bg-gray-700',
		src: null
	},
	{
		name: 'Obrzydzenie',
		endpoint: 'obrzydzenie',
		description: 'Niech jej nazwa nie zniechęca cię do poznania jej dokładniej!',
		bg: 'bg-pistachio-700',
		src: null
	}
];

export const load: PageLoad = async () => {
	return {
		emotionData
	};
};
