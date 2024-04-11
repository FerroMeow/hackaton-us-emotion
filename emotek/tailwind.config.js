/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				redwood: {
					DEFAULT: '#a04a4a',
					100: '#200f0f',
					200: '#401e1e',
					300: '#602c2c',
					400: '#813b3b',
					500: '#a04a4a',
					600: '#ba6868',
					700: '#cb8e8e',
					800: '#dcb4b4',
					900: '#eed9d9'
				},
				pistachio: {
					DEFAULT: '#a5cd79',
					100: '#213012',
					200: '#425f23',
					300: '#638f35',
					400: '#84bc49',
					500: '#a5cd79',
					600: '#b7d794',
					700: '#c9e1af',
					800: '#dbebc9',
					900: '#edf5e4'
				},
				pomp_and_power: {
					DEFAULT: '#8c6aaa',
					100: '#1c1423',
					200: '#382846',
					300: '#543c69',
					400: '#70508c',
					500: '#8c6aaa',
					600: '#a388ba',
					700: '#baa6cc',
					800: '#d1c3dd',
					900: '#e8e1ee'
				},
				pink_lavender: {
					DEFAULT: '#dea3c9',
					100: '#38142c',
					200: '#702957',
					300: '#a93d83',
					400: '#c969a7',
					500: '#dea3c9',
					600: '#e4b4d3',
					700: '#ebc7de',
					800: '#f1dae9',
					900: '#f8ecf4'
				},
				gray: {
					DEFAULT: '#808080',
					100: '#1a1a1a',
					200: '#333333',
					300: '#4d4d4d',
					400: '#666666',
					500: '#808080',
					600: '#999999',
					700: '#b3b3b3',
					800: '#cccccc',
					900: '#e6e6e6'
				},
				glaucous: {
					DEFAULT: '#6080c4',
					100: '#10182a',
					200: '#1f3055',
					300: '#2f497f',
					400: '#3f61aa',
					500: '#6080c4',
					600: '#7f98d0',
					700: '#9fb2db',
					800: '#bfcce7',
					900: '#dfe5f3'
				},
				ecru: {
					DEFAULT: '#d7b37a',
					100: '#34260f',
					200: '#684c1f',
					300: '#9c722e',
					400: '#c89646',
					500: '#d7b37a',
					600: '#dfc294',
					700: '#e7d2af',
					800: '#efe1ca',
					900: '#f7f0e4'
				}
			}
		}
	},
	plugins: []
};
