This is the backend for the [project tracker frontend](https://github.com/brunomileto/project-tracker-frontend.git)

The project is a simple electron app, that you can track work hours in tasks and the respective project for that task.

![App Image](https://github.com/brunomileto/project-tracker-backend/blob/master/docs/assets/imgs/Screenshot_04.png?raw=true)

It is ready to upload on [Heroku](https://heroku.com/). You can use the [Isomnia Json](https://github.com/brunomileto/project-tracker-backend/blob/master/Insomnia_2022-04-29.json) for dev environment but also, after upload to heroku, you can use de prd environment to set your heroku url.

## Getting Started

First, install de dependecies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology stack:

- [NodeJs](https://nodejs.org/en/)
- [Firebase Firestore & Auth](https://firebase.google.com/)

## Firebase Configuration

#### Step 1. Create [Firebase account](https://console.firebase.google.com)

<p align='center'>
  <img src='https://raw.githubusercontent.com/suevalov/next-blog-firestore/master/docs/create-firebase-project.png' width='300' alt='Create Firebase account'>
</p>

#### Step 2. Setup Authentication Method

- Click **Set up sign-in method** on Authentication section.
- Enable **just** Google authentication provider.
- Add your domain (if you have one) to **Authorized domains**.

<p align='center'>
  <img src='https://raw.githubusercontent.com/suevalov/next-blog-firestore/master/docs/setup-authentication.png' width='300' alt='Setup authentication'>
</p>

#### Step 3. Create Firestore database

- Go to **Database** section and create Firestore instance.

<p align='center'>
  <img src='https://raw.githubusercontent.com/suevalov/next-blog-firestore/master/docs/create-firestore.png' width='300' alt='Create Firestore database'>
</p>

#### Step 4. Set up Firebase secret keys for our app.

- Create **`.env`** at the root of the project. Do not commit this file. It is personal data that should not be available for everyone.
- Go to **Project settings** in Firebase console (click on the gear icon next to **Project Overview**).
- Copy data from this page to **`.env`** in the following format:

```bash
F_PROJECT_ID=<your Project ID>
F_AUTH_DOMAIN=<your Project ID>.firebaseapp.com
F_API_KEY=<your Web API Key>
```

#### Step 5. Set up Firebase Admin SDK key for importing/exporting data from database.

In order to be able to initialize database with initial seed we need to generate private Firebase Admin service key.

- Go to **Project Settings** > **Service Accounts** and click **Generate new private key** button.
- Save downloaded file as **`firebase-service-key.json`** at project root.
  \*\* Do not commit this file. It's added to `.gitignore` by default.

#### Step 7. Initialize.

We almost finished. Let's initialize what we have done.

```bash
yarn
```

OR

```bash
npm install
```

## License

Licensed under the MIT License, Copyright © 2022-present Bruno M. D. Assunção

See [LICENSE](./LICENSE) for more information.
