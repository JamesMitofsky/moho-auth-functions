import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const accountCreate = functions.auth.user().onCreate(async (user) => {
  await admin.initializeApp();
  const formattedUser = {
    created: user.metadata.creationTime,
    email: user.email,
    name: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };

  // create directory pointer
  const document = admin.firestore().doc(`users/${user.uid}`);

  // push new user to database
  await document.set(formattedUser);
});
