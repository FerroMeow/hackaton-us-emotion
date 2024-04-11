<a href="diagnoza"> Diagnozuj</a>

<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Diagnoza rozpoznawania emocji</title>
	</head>

	<body>
		<h2>Diagnoza rozpoznawania emocji</h2>
		<div id="imageContainer"></div>
		<div id="emotionsSelectors">
			<label for="emotion">Wybierz emocje:</label>

			<select id="emotion">
				<option value="anger">Złość</option>
				<option value="contempt">Pogarda</option>
				<option value="fear">Strach</option>
				<option value="disgust">Obrzydzenie</option>
				<option value="happiness">Szczęście</option>
				<option value="sadness">Smutek</option>
				<option value="surprise">Zaskoczenie</option>
			</select>

			<button onclick="nextImage()">Następne zdjęcie</button>
		</div>
	</body>
</html>

<a href="cwiczenia"> Ćwicz</a> <br />
<a href="mojecwiczenia"> Własny test</a> <br />
