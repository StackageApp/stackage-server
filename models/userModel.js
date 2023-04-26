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
  },
  getNameAndPhoto: async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const { name } = userData.userInfo;
    const photoURL = userData.photoURL;
    return { name, photoURL };
  },
  resetNotifcations: async (uid) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { notifcations: 0 });
  },
  addMessage: async (uid, message) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData.messages[messages.senderUid]) {
      userData.messages[message.senderUid] = [];
    }
    userData.messages[message.senderUid].push(message);
    userData.notifcations++;

    await updateDoc(userRef, {
      messages: userData.messages,
      notifcations: userData.notifcations,
    })
  }
};