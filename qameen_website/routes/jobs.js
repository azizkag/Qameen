var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("ZYXlOAmL91AMn8kiog3kwA00r1cQB0HACIWUz75Y", "wXN6wTPTZ5DHesOyDYYQlwg8bJyvyRBXxSHFkt0R");


var Jobs = Parse.Object.extend("Job");
var query = new Parse.Query(Jobs);
query.equalTo("status", 0);


//if objects retrived pass them to the page
/* GET home page. */
router.get('/', function(req, res, next) {
	
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " jobs.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      console.log(object.id + ' - ' + object.get('company'));
	    }
	    res.render('jobs', { jobs: results });
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    res.render('jobs', { err: error });
	  }

	});
	
});





module.exports = router;
