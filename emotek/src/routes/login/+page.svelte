<script lang="ts">
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut,
		onAuthStateChanged
	} from 'firebase/auth';

	import { initializeApp } from 'firebase/app';
	import { connectAuthEmulator, getAuth } from 'firebase/auth';
	import firebaseConfig from '$lib/env';
	export const _app = initializeApp(firebaseConfig);
	export const _auth = getAuth(_app);

	connectAuthEmulator(_auth, 'http://127.0.0.1:9099');
	import type { User } from '$lib/types/user';

	let user_email: string;
	let user_password: string;
	let user_name: string;
	let login_mail: string;
	let login_pass: string;
	let user: User | null;

	function register() {
		createUserWithEmailAndPassword(_auth, user_email, user_password);
	}
	function login() {
		signInWithEmailAndPassword(_auth, login_mail, login_pass);
	}
	function logout() {
		signOut(_auth);
	}
	onAuthStateChanged(_auth, (cred) => {
		if (cred) {
			console.log(cred);
			user = {
				email: cred.email,
				display_name: cred.displayName
			};
		}
	});
</script>

{#if user != null}
	<p>user: {user.display_name} {user.email}</p>
{:else}
	<p>not logged in</p>
{/if}

<h1>Logowanie do emotek</h1>
<h2>Zarejestruj się</h2>
<form id="register">
	<label for="login">Nazwa użytkownika</label>
	<input type="text" bind:value={user_name} id="login" required />
	<label for="mail">Adres email</label>
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
		<option value="medium city">Średnie miasto</option>
		<option value="big city">Duże miasto</option>
	</select>
	<button on:click={register} type="submit" id="register_button">Zarejestruj się</button>
</form>
<h2>Zaloguj się</h2>
<form id="login">
	<label for="mail">Adres email</label>
	<input bind:value={login_mail} type="email" required id="mail" />
	<label for="password">hasło</label>
	<input bind:value={login_pass} type="text" required id="password" />
	<button on:click={login} type="submit" id="login_button">Zaloguj się</button>
</form>
<input type="button" value="logout" on:click={logout} />
