import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD4p5HaLKxuVvcrEOIgj3XumFdC2DcTyBk',
  authDomain: 'crwn-db-ac83a.firebaseapp.com',
  databaseURL: 'https://crwn-db-ac83a.firebaseio.com',
  projectId: 'crwn-db-ac83a',
  storageBucket: 'crwn-db-ac83a.appspot.com',
  messagingSenderId: '475753676390',
  appId: '1:475753676390:web:fc03c574740a28ecbab7a7',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
