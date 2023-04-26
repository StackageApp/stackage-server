const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where } = require('firebase/firestore')
const db = require('../database');

module.exports = {
  addPost: async (postInfo) => {
    const postRef = await doc(collection(db, 'posts'))
    await setDoc(postRef, postInfo);
  },
  getPosts: async (category = null) => {
    const postRef = await collection(db, 'posts')
    let q = await query(postRef, orderBy('timestamp', 'desc'));
    if (category) {
      q = query(postRef, where('category', '==', category), orderBy('timestamp', 'desc'));
    }
    return await getDocs(q);
  },
  incrementLike: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    const postSnap = await getDoc(postRef);
    const incrementedLike = postSnap.data().likes + 1;
    if (incrementedLike >= 5) {
      await updateDoc(postRef, { likes: 0, isApproved: true})
    } else {
      await updateDoc(postRef, { likes: incrementedLike})
    }
  },
  decrementDislike: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    const postSnap = await getDoc(postRef);
    const decrementedDislike = postSnap.data().dislikes - 1;
    if (decrementedDislike <= -5) {
      await deleteDoc(postRef);
    } else {
      await updateDoc(postRef, { dislikes: decrementedDislike})
    }
  },
  deletePost: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    await deleteDoc(postRef);
  }
};