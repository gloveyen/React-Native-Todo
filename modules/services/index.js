import firebase from '../firebase';

export const addMission = async (payload) => {
  const ref = firebase.firestore().collection('Missions');
  const snapshot = await ref.add({ ...payload });
  return { id: snapshot.id, ...payload };
}
