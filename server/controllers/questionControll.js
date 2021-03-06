var models = require('../models/Question')
var jwt = require('jsonwebtoken')
require('dotenv').config()

var createQuestion = (req, res) => {
  if (req.headers.token == null) {
    res.send({msg: 'You Must Login First'})
  } else {
    var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    models.create({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      answer_id: [],
      voteup: [],
      votedown: []
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

var getAllQuestion = (req, res) => {
  models.find()
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

var deleteQuestion = (req, res) => {
  if (req.headers.token == null) {
    res.send({msg: 'If You Want Delete this Question, You must Login First'})
  } else {
    var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    models.remove({
      _id: req.params.id
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = {
  createQuestion,
  getAllQuestion,
  deleteQuestion
}
