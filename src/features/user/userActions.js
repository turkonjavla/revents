import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const updateProfile = (user) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;

    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success!', 'Profile updated')
    }
    catch (error) {
      console.log(error);
    }
  }
}

export const uploadProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    }

    try {
      dispatch(asyncActionStart());
      // upload file to firebse storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // get url of image
      let downloadUrl = await uploadedFile.uploadTaskSnapshot.downloadURL;

      // get userDoc from firestore and then check to see if the user already has the photo inside
      let userDoc = await firestore.get(`users/${user.uid}`);

      // if not update their profile with the new image thats being uploaded
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadUrl
        });

        await user.updateProfile({
          photoURL: downloadUrl
        });
      }

      // add new photo as new image in photos collection
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      }, {
          name: imageName,
          url: downloadUrl
        })
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      throw new Error('Problem uploading photo');
    }
  }
}

export const deletePhoto = photo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{
          collection: 'photos',
          doc: photo.id
        }]
      })
    }
    catch (error) {
      console.log(error);
      throw new Error('Problem deleting photo')
    }
  }
}

export const setMainPhoto = photo => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      })
    }
    catch (error) {
      console.log(error);
      throw new Error('Problem setting main photo');
    }
  }
}

export const goingToEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL,
      displayName: user.displayName,
      host: false
    }

    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userId: user.uid,
        eventDate: event.date,
        host: false
      });
      toastr.success('Success', 'You have signed up to the event')
    }
    catch (error) {
      console.log(error);
      toastr.error('Oops', 'Porblem signing up for eent');
    }
  }
}