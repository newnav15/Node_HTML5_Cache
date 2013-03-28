
/*
 * GET home page.
 */

 var contextHelpRouter= require('./routeHelper/contextHelpRouteHelper.js');


exports.index = function(req, res){
  res.render('index', { title: 'HOME' });
};

exports.getPage1 = function(req, res){
  res.render('page1', { title: 'PAGE 1' });
};

exports.getTheContent = function(req, res){
	var contextObject = req.params.contextObject;
    res.send(contextHelpRouter.getTheContent(contextObject));
  
};

