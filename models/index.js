const { doc, getDoc, setDoc, updateDoc, collection } = require('firebase/firestore')
const db = require('../database');

module.exports = {
  addUser: async (uid, userData) => {
    const defaultUserRef = await doc(db, 'users', 'default1');
    const defaultUserSnap = await getDoc(defaultUserRef);
    const defaultData = defaultUserSnap.data();
    defaultData.userInfo = userData;
    const newUserRef = await doc(db, 'users', uid)
    await setDoc(newUserRef, defaultData);
  },
  userData: async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  },
  editUserData: async (uid, newUserInfo) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { userInfo: newUserInfo })
  }
};