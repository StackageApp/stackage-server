const model = require('../models');

module.exports = {
  addNewUser: (req, res) => {
    model.addUser(req.params.uid, req.body.userInfo)
      .then(data => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('err posting to fb\n', err)
      })
  },
  getUserData: (req, res) => {
    model.userData(req.params.uid)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('err getting user data\n', err)
      })
  },
  editUserData: (req, res) => {
    model.editUserData(req.params.uid, req.body.userInfo)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('err editing user data\n', err)
      })
  }
}