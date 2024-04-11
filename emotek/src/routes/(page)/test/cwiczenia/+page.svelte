<a href="diagnoza"> Diagnozuj</a> <br />
<a href="cwiczenia"> Ćwicz</a>

<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ćwicz rozpoznawanie emocji</title>
		<style>
			img {
				max-width: 100%;
				max-height: 400px;
			}
		</style>
	</head>
	<body>
		<div>
			<h2>Ćwicz rozpoznawanie emocji</h2>
			<div>
				<img id="image" alt="Zdjęcie do zdiagnozowania emocji" />
				<div id="emotionSelector" style="display: none;">
					<label for="emotion">Wybierz emocję: </label>
					<select id="emotion" bind:value={selectedEmotion}>
						<option value="">Wybierz emocję: </option>
						<option value="anger">Złość</option>
						<option value="contempt">Pogarda</option>
						<option value="fear">Strach</option>
						<option value="disgust">Obrzydzenie</option>
						<option value="happiness">Szczęście</option>
						<option value="sadness">Smutek</option>
						<option value="surprise">Zaskoczenie</option>
					</select>
					<button on:click={nextImage}>Następne</button>
				</div>
				<div id="result" style="display:none;"></div>
			</div>
		</div>
	</body>
</html>

<a href="mojecwiczenia"> Własny test</a> <br />
