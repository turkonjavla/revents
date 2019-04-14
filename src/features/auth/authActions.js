import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';

export const login = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    }
    catch (error) {
      /*       console.log(error); */
      throw new SubmissionError({
        _error: 'The email or password you entered is invalid'
      })
    }
  }
}

export const reigsterUser = (user) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    try {
      // create the user in firebase auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);

      // update auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });
      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }

      await firestore.set(`users/${createdUser.uid}`, {...newUser});
      dispatch(closeModal()); 
    }
    catch (error) {
      console.log(error);
    }
  }
}