<script>
	import BorderSvg from '$lib/front-page/BorderSvg.svelte';
	import Pane from '$lib/front-page/Pane.svelte';
</script>

<Pane accentColor={{ bg: 'bg-glaucous-600', text: 'text-black' }} title="Testy 🧐">
	<p>
		Przeprowadź z nami testy <a href="/test/diagnoza/" class="text-pomp_and_power-300 underline"
			>Diagnostyczne</a
		> aby sprawdzić swoje umiejętności w rozpoznawaniu emocji.
	</p>
	<p>Po wykonaniu diagnozy, możesz wykonać testy w celu poprawy wykrywania emocji wśród ludzi.</p>
	<p>
		Zaproponujemy Ci plan poprawy Twoich zdolności, lub możesz samemu zdecydować w jakich emocjach
		wolisz się szkolić.
	</p>
</Pane>
<BorderSvg topFill="fill-glaucous-600" botBg="bg-ecru-500" />
<Pane accentColor={{ bg: 'bg-ecru-500', text: 'text-black' }} title="O emocjach 🎁">
	<p>
		Na stronie <a href="/emocje/" class="text- text-redwood-300 underline">o emocjach</a> dowiesz się
		więcej na temat głównych emocji.
	</p>
	<p>
		Dowiesz się o tym dlaczego nie każdy przejaw <a
			href="/emocje/zlosc/"
			class="text-redwood-300 underline">gniewu</a
		> jest wyraźnie widoczny.
	</p>
	<p>
		Przeczytasz o tym dlaczego ludzie czują <a
			href="/emocje/obrzydzenie/"
			class="text-redwood-200 underline">obrzydzenie</a
		>.
	</p>
</Pane>
<BorderSvg topFill="fill-ecru-500" botBg="bg-pink_lavender-400" />
<Pane accentColor={{ bg: 'bg-pink_lavender-400', text: 'text-black' }} title="Sprawdź nasz blog 👽">
	<p>Na naszym blogu ciągle piszemy o nowych odkryciach w dziedzinie emocji i rozpoznawania ich.</p>
	<p>
		Dzięki naszym postom w końcu znajdziesz odpowiedź na <a
			href="/blog/"
			class="text-gray-200 underline">nurtujące cię pytania</a
		>
	</p>
</Pane>
<BorderSvg topFill="fill-pink_lavender-400" botBg="bg-pistachio-400" />
<Pane
	accentColor={{ bg: 'bg-pistachio-400', text: 'text-white' }}
	title="Udostępnij nas znajomym 🏅"
>
	<p><a href="/">Emotek.pl</a> to strona edukacyjna.</p>
	<p>
		Polecając nas znajomym, nie tylko pomagasz im w zdobyciu emocjonalnej wiedzy, ale również
		pomagasz lekarzom lepiej zrozumieć powody problemów z interpretacją emocji.
	</p>
	<p>Znajdziesz nas na:</p>
	<ul class="list-item">
		<li><a href="#"><i class="fa-brands fa-facebook"></i> Facebook</a></li>
		<li><a href="#"><i class="fa-brands fa-tiktok"></i> TikTok</a></li>
		<li><a href="#"><i class="fa-brands fa-twitter"></i> X</a></li>
	</ul>
</Pane>
<BorderSvg topFill="fill-pistachio-400" botBg="bg-black" />
<footer class="bg-black py-2 text-right text-white">
	<p>&copy; Piotr Sołtysik, Oliwia Gonta, Konrad Balcerzak {new Date().getFullYear()}</p>
</footer>
