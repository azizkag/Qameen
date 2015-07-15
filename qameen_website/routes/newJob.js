var express = require('express');
var router = express.Router();
// var Parse = require('parse').Parse;

// Parse.initialize("ZYXlOAmL91AMn8kiog3kwA00r1cQB0HACIWUz75Y", "wXN6wTPTZ5DHesOyDYYQlwg8bJyvyRBXxSHFkt0R");

router.get('/', function(req, res, next) {
  		res.render('submitJob', { jobs: "test" });
	});

module.exports = router;
