import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const accountCreate = functions.auth.user().onCreate(async (user) => {
  await admin.initializeApp();
  const formattedUser = {
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    created: user.metadata.creationTime,
  };

  // create directory pointer
  const document = admin.firestore().doc(`users/${user.uid}`);

  // push new user to database
  await document.set(formattedUser);
});
