var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("ZYXlOAmL91AMn8kiog3kwA00r1cQB0HACIWUz75Y", "wXN6wTPTZ5DHesOyDYYQlwg8bJyvyRBXxSHFkt0R");

router.get('/', function(req, res, next) {
  		res.render('submitJob', { jobs: "test" });
	});

router.post('/positionEntry', function(req, res, next) {
		console.log(req.body.inputReqs)
		var JobObj = Parse.Object.extend("Job");
		var Job = new JobObj();

		Job.save({
		  company: req.body.inputCompany,
		  description: req.body.inputDescription,
		  requirments: req.body.inputReqs,
		  title: req.body.inputTitle,
		  city: req.body.inputCity,
		  ownerEmail: req.body.inputEmail,
		  status: 0,
		  numberRecs: 0
		}, {
		  success: function(Job) {
		    // The object was saved successfully.
		    res.render('submitJob', { status: 1, message: "Job post was successfully submitted" });
		  },
		  error: function(Job, error) {
		    // The save failed.
		    // error is a Parse.Error with an error code and message.
		    res.render('submitJob', { status: 0, message: "Sorry, there was an error submitting this job" });

		  }
		});
  		
	});

module.exports = router;
