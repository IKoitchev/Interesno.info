# Interesno.info

A project that will be able to retrieve the production program from the National theatre and the Opera in Sofia.
The website will also act as a blog, where different articles can be uploaded.
Additional information such as wheather forecast will be included as well.

The app uses a local Mongo database, which is stored in the "database" folder of the repository. It is required for the backend of the app to run properly.

# Technologies

The frontend of the application uses React.js and the backend uses Node.js/Express.js.

# Set up

## Frontend and backend

The following steps apply for both apps.
Make sure you have Node.js installed on your device.
Then run 'npm install' inside the respective app folder (frontend or backend)

## Database

For the database, you need to have mongoserver and mongo tools installed. Preferably also MongoDBCompass for convinience.
Open a terminal and run "mongorestore -d interesnoDB2 (path)" where '(path)' is the path to the database folder of the repo
For example:
C:\GIT\Interesno.info\database\interesnoDB

## PHP (Optional)

The backends runs a few webscrapper scripts, for which PHP is required.
To setup, download the PHP package from: https://windows.php.net/download/
Then extract it and add the path to the /bin folder to PATH.

This is not a mandatory step, as the scripts simply update the record of productions in the database.
Importing the provided data is enough for showcasing the application.
