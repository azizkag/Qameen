var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("ZYXlOAmL91AMn8kiog3kwA00r1cQB0HACIWUz75Y", "wXN6wTPTZ5DHesOyDYYQlwg8bJyvyRBXxSHFkt0R");

router.get('/', function(req, res, next) {
		var jobId = req.query.jobId

		var JobObj = Parse.Object.extend("Job");
		var query = new Parse.Query(JobObj);
		query.get(jobId, {
		  success: function(jobObj) {
		    // The object was retrieved successfully.
		    res.render('makeRec', { job: jobObj});
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		  }
		});
  		
	});

router.post('/submit', function(req, res, next) {
		var jobId = req.query.jobId

		//prepare recommendation object
		var recObj = Parse.Object.extend("Recommendation");
		var Rec = new recObj();

		Rec.save({
		  jobId: jobId,
		  author: req.body.author,
		  authorEmail: req.body.authorEmail,
		  name: req.body.name,
		  details: req.body.details,
		  email: req.body.email,
		  phone: req.body.phone
		}, {
		  success: function(Job) {
		    // The object was saved successfully.

		    //increase the number of recs for that job by one
		    var JobObj = Parse.Object.extend("Job");
			var query = new Parse.Query(JobObj);
			query.get(jobId, {
			  success: function(jobObj) {
			    // The object was retrieved successfully.
			    jobObj.increment("numberRecs");
			    jobObj.save();
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and message.
			  }
			});

			//what to do after sucess?
		    res.render('message', { status: 1, message: "Recommendation was successfully submitted" });
		  },
		  error: function(Job, error) {
		    // The save failed.
		    // error is a Parse.Error with an error code and message.
		    res.render('message', { status: 0, message: "Sorry, there was an error submitting this recommendation" });

		  }
		});
  		
	});

module.exports = router;
