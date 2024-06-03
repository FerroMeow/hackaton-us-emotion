# Emotek.pl

## Requirements<br />
- Firebase CLI<br />
- Python 3<br />
- Node.js and NPM<br />
- Access to "Emotek-pl" firebase project or other similarly configured project<br />

## Build guide
1. Run "firebase login" command<br />
2. Go to /functions/ and run "python -m venv venv" to create a venv folder(virtual environment)<br />
3. Go to /functions/venv/Scripts(/bin) then run "activate" command. This should activate venv and there should be a (venv) label in your terminal.<br />
4. Go back to /functions/ and run "pip install -r requirements.txt"<br />
5. Navigate to "Emotek-pl" in firebase console, then project settings->Service accounts->Generate new private key. Move the downloaded file to /functions/<br />
6. Download "my_model.keras" file from our discord and place it in /functions/<br />
7. Go to /emotek/ and run "npm install" command<br />
8. Create ".env" file inside /emtek/ directory. Navigate to "emotek" app within firebase console and place all the values within it inside the ".env" file in this format:<br />
  PUBLIC_FIREBASE_API_KEY=A... <br />
  PUBLIC_FIREBASE_AUTH_DOMAIN=t... <br />
  ...<br />
9. Create a build of the app by running "npm run build command"<br />
10. Navigate to /data/ directory. Create "database_export" directory<br />
11. Ensure that within the file "emotek/src/lib/firebase/firebaseServices.ts", all the IP addresses are properly set(either your local IP, or 127.0.0.1)<br />
12. Run "firebase emulators:start --import data" command within root directory of the project<br />
13. To run dev server run the command "npm run dev"<br />

## Ports
- The port of the dev server will be provided in the command line<br />
- The default firebase dashboard port is 4000<br />
- The default firebase hosting port is 5000<br />

## Troubleshooting
- If while starting the emulators you get an error regarding occupied ports, change the problematic port in "firebase.json" file.

### To use a custom firebase project you must change the project id in the file ".firebaserc"
### If you encounter any errors during the building process, please send a message on our discord or send an email to "pit56482@gmail.com"
