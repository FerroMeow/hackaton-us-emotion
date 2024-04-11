<a href="diagnoza"> Diagnozuj</a> <br />
<a href="cwiczenia"> Ćwicz</a> <br />
<a href="mojecwiczenia"> Własny test</a>

<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Własny test rozpoznawania emocji</title>
	</head>

	<body>
		<h2>Własny test rozpoznawania emocji</h2>
		<form action="diagnoza" method="POST">
			<label for="emotions">Wybierz emocje:</label>

			<select id="emotions" name="emotions" multiple>
				<option value="anger">Złość</option>
				<option value="contempt">Pogarda</option>
				<option value="fear">Strach</option>
				<option value="disgust">Obrzydzenie</option>
				<option value="happiness">Szczęście</option>
				<option value="sadness">Smutek</option>
				<option value="surprise">Zaskoczenie</option>
			</select>
			<br />
			<button type="submit">Rozpocznij swój test</button>
		</form>
	</body>
</html>
