const express = require('express');
const router = express.Router();
const register = require('../moduls/resgister');
const remove_file = require('../moduls/file_system');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

module.exports = router;
