const { postModel } = require('../models');

module.exports = {
  addNewPost:  (req, res) => {
    const data = {
      category: req.body.category || "",
      likes: 0,
      links: req.body.links || ["0"],
      tags: req.body.tags || ["0"],
      text: req.body.text || "",
      title: req.body.title || "",
      uid: req.body.uid || "",
      comments: req.body.comments || [],
      timestamp: req.body.timestamp || '',
      isApproved: false,
    };
    postModel.addPost(data)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('err adding new post\n', err);
      })
  },
  getRecentPost: (req, res) => {
    postModel.getPosts(req.query.category)
      .then(data => {
        data = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      })
  },
  likePost: (req, res) => {
    postModel.incrementLike(req.params.postid)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('err incrementing likes\n', err);
      })
  }
  dislikePost: (req, res) => {
    postModel.decrementLike(req.params.postid)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('err incrementing likes\n', err);
      })
  },
  deletePost: (req, res) => {
    postModel.deletePost(req.params.postid)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('err deleting from server\n', err);
      })
  }
}