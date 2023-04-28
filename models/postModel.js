const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where, deleteDoc } = require('firebase/firestore')
const db = require('../database');

module.exports = {
  addPost: async (postInfo) => {
    const postRef = await doc(collection(db, 'posts'))
    await setDoc(postRef, postInfo);
  },
  getPosts: async (category = null, uid = null) => {
    const postRef = await collection(db, 'posts')
    let q = await query(postRef, orderBy('timestamp', 'desc'));
    if (category) {
      q = query(postRef, where('category', '==', category), orderBy('timestamp', 'desc'));
    }
    if (uid) {
      q = query(postRef, where('uid', '==', uid), orderBy('timestamp', 'desc'));
    }
    return await getDocs(q);
  },
  incrementLike: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    const postSnap = await getDoc(postRef);
    const incrementedLike = postSnap.data().likes + 1;
    const isApproved = postSnap.data().isApproved;
    if (incrementedLike >= 5 && !isApproved) {
      await updateDoc(postRef, { likes: 0, isApproved: true})
    } else {
      await updateDoc(postRef, { likes: incrementedLike})
    }
  },
  decrementLike: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    const postSnap = await getDoc(postRef);
    const decrementedDislike = postSnap.data().likes - 1;
    if (decrementedDislike <= -5 && !getPosts.data().isApproved) {
      await deleteDoc(postRef);
    } else {
      await updateDoc(postRef, { likes: decrementedDislike})
    }
  },
  deletePost: async (postid) => {
    const postRef = await doc(db, 'posts', postid);
    await deleteDoc(postRef);
  },
  addComment: async (uid, comment) => {
    const postRef = doc(db, 'posts', uid);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();
    postData.comments.push(comment);
    await updateDoc(postRef, { comments: postData.comments });
  }
};