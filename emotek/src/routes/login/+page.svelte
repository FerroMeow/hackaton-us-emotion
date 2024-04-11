<script lang="ts">
	import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
	import type { PageData } from './$types';
	import { applyAction } from '$app/forms';

	export let data: PageData;

	const { app, auth } = data;

	let user_email: string;
	let user_password: string;
	let user_name: string;

	function register() {
		createUserWithEmailAndPassword(auth, user_email, user_password);
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {
		} else {
		}
	});
</script>

<h1>Logowanie do emotek</h1>
<h2>Zarejestruj się</h2>
<form id="register">
	<label for="login">Nazwa użytkownika</label>
	<input type="text" bind:value={user_name} id="login" required />
	<label for="mail" pattern=".+@example\.com">Adres email</label>
	<input type="email" bind:value={user_email} id="mail" required />
	<label for="password">hasło</label>
	<input type="text" bind:value={user_password} id="password" required />
	<label for="birth">data urodzenia</label>
	<input type="date" id="birth" required />
	<label for="sex">Płeć</label>
	<select id="sex">
		<option value="M">Mężczyzna</option>
		<option value="F">Kobieta</option>
	</select>
	<label for="por">Miejsce zamieszkania</label>
	<select id="por" required>
		<option value="village">Wieś</option>
		<option value="small city">Małe miasto</option>
		<option value="big city">Duże miasto</option>
	</select>
	<button on:click={register} type="submit" id="register_button">Zarejestruj się</button>
</form>
<h2>Zaloguj się</h2>
<form id="login">
	<label for="mail">Adres email</label>
	<input type="email" required id="mail" />
	<label for="password">hasło</label>
	<input type="text" required id="password" />
	<button type="submit" id="login_button">Zaloguj się</button>
</form>
