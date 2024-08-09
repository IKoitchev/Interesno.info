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

To start the database, run `docker compose up -d` in the root directory of the project. This will expose the database on port `27017`. To browse the database, you can use the admin tool which will be accessible on port `8081`.

Note that you need to have Docker for this step.

### Using the images

You can build both the backend and frontend using their respective Docker images by running `docker build -t <your-image-name> .` in the respective folder, followed by:

- `docker run --env MONGO_DB_HOST=host.docker.internal <your-image-name>` in the backend folder

- `docker run -p 3000:3000 <your-image-name>` in the frontend folder

## PHP (Optional)

The backends runs a few webscrapper scripts, for which PHP is required.
To setup, download the PHP package from: https://windows.php.net/download/
Then extract it and add the path to the /bin folder to PATH.

This is not a mandatory step, as the scripts simply update the record of productions in the database.
Importing the provided data is enough for showcasing the application.
