const { userModel } = require('../models');

module.exports = {
  addNewUser: (req, res) => {
    userModel.addUser(req.params.uid, req.body.userInfo)
      .then(data => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('err posting to fb\n', err)
      })
  },
  getUserData: (req, res) => {
    userModel.userData(req.params.uid)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('err getting user data\n', err)
      })
  },
  editUserData: (req, res) => {
    userModel.editUserData(req.params.uid, req.body.userInfo)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('err editing user data\n', err)
      })
  },
  getUserMessageData: (req, res) => {
    userModel.getNameAndPhoto(req.params.uid)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('err getting name and photo\n', err);
      })
  },
  resetUserNotifications: (req, res) => {
    userModel.resetNotifcations(req.params.uid)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log('err reseting user notifcations\n', err);
      })
  },
  addUserMessage: (req, res) => {
    userModel.addMessage(req.params.uid, req.body.message)
      .then(() => {
        userModel.addMessage(req.params.uid2, req.body.message)
          .then(() => {
            res.status(200);
          })
      })
      .catch(err => {
        console.log('err adding new message\n', err);
      })
  }
}