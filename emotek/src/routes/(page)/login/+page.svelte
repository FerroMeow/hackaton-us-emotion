<script lang="ts">
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut
	} from 'firebase/auth';
	import type { PageData } from './$types';
	import { applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	import { doc, setDoc } from 'firebase/firestore';
	import { setDocInc } from '$lib/firebase/db';
	import type { User, PlaceOfResidence } from '$lib/types/collections/User';
	import type { Sex } from '$lib/types/collections/subtypes/Sex';
	import Input from '$lib/Input.svelte';
	import Button from '$lib/Button.svelte';
	import Select from '$lib/Select.svelte';

	const sexOptions: {
		name: string;
		value: Sex;
	}[] = [
		{
			name: 'Mężczyzna',
			value: 'male'
		},
		{
			name: 'Kobieta',
			value: 'female'
		},
		{
			name: 'Osoba Interpłciowa',
			value: 'intersex'
		}
	];

	const residenceOptions: {
		name: string;
		value: PlaceOfResidence;
	}[] = [
		{
			name: 'Wioska',
			value: 'village'
		},
		{
			name: 'Miasteczko',
			value: 'town'
		},
		{
			name: 'Małe miasto',
			value: 'small city'
		},
		{
			name: 'Duże miasto',
			value: 'large city'
		}
	];

	export let data: PageData;

	const { auth, db } = data;

	const currentUserModel: User = {
		userId: 0,
		sex: 'female',
		additionalInformation: '',
		birthYear: '2000',
		placeOfResidence: 'village'
	};

	let user_email: string;
	let user_password: string;
	let login_mail: string;
	let login_pass: string;

	async function register() {
		const credentials = await createUserWithEmailAndPassword(auth, user_email, user_password);
		setDocInc(
			doc(db, 'user', credentials.user.uid),
			{
				userId: 0,
				sex: currentUserModel.sex,
				birthYear: currentUserModel.birthYear,
				additionalInformation: currentUserModel.additionalInformation,
				placeOfResidence: currentUserModel.placeOfResidence
			} satisfies User,
			'userId'
		);
		const idToken = await credentials.user.getIdTokenResult();
		goto(idToken.claims?.role === 'admin' ? '/admin/' : '/', {
			replaceState: true
		});

		goto('/', {
			replaceState: true
		});
	}
	async function login() {
		const credentials = await signInWithEmailAndPassword(auth, login_mail, login_pass);
		const idToken = await credentials.user.getIdTokenResult();
		goto(idToken.claims?.role === 'admin' ? '/admin/' : '/', {
			replaceState: true
		});
	}
	function logout() {
		signOut(auth);
	}
</script>

<div>
	<div class="container mx-auto">
		<h1>Logowanie do emotek</h1>
	</div>
</div>
<div>
	<div class="container mx-auto">
		<div class="my-8 h-[1px] bg-gray-900"></div>
		<h2 class="text-2xl">Zarejestruj się</h2>
		<form
			id="register"
			class="grid grid-cols-2 gap-4"
			on:submit|preventDefault|stopPropagation={() => {}}
		>
			<Input id="mail" bind:value={user_email} required>Adres email</Input>
			<Input id="mail" bind:value={user_password} required type="password">Hasło</Input>
			<Input id="number" type="number" bind:value={currentUserModel.birthYear} required>
				Data urodzenia
			</Input>
			<Select id="sex" options={sexOptions} bind:value={currentUserModel.sex} />
			<Select id="por" options={residenceOptions} bind:value={currentUserModel.placeOfResidence} />
			<p>
				<Button on:click={register} id="register_button">Zarejestruj się</Button>
			</p>
		</form>
		<div class="my-8 h-[1px] bg-gray-900"></div>
		<h2 class="text-2xl">Zaloguj się</h2>

		<form
			id="login"
			class="grid grid-cols-2 gap-4"
			on:submit|preventDefault|stopPropagation={() => {}}

			<Input id="mail" type="email" bind:value={login_mail} required>Adres email</Input>
			<Input id="password" type="password" bind:value={login_pass} required>Hasło</Input>
			<Button on:click={login}>Zaloguj się</Button>
		</form>
		<p>
			<Button on:click={logout}>Wyloguj</Button>
		</p>
	</div>
</div>
