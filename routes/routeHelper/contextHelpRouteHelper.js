/**
 * New node file
 */

 
var myCache = require('memory-cache');
var fs = require('fs');
var path = require('path');



function getTheContent(contextObject) {
    console.log("server side processing starts here.....................................");
   
   //check if server side cache has data
    var isLoaded = myCache.get("_myServerKey_isLoaded");
    
    //get from file system   
    if (isLoaded == null){
     	// get the root folder dir packed from app.js start up
    	var rootFolder = myCache.get("rootFolder") + "/help/";
    	console.log("root folder is ...."+rootFolder);
     	loadFromFileSystem(rootFolder);
    }else{
    	// load from in memory server side cache
    	
    }

	var theContent = "";
	theContent = myCache.get("_myKey" + contextObject);
    console.log("server side processing ends here.....................................");
    return theContent;
    
};

function loadFromFileSystem(helpFolder) {
    // match with the filenames under \help\ folder
    var arrFiles = ["homePage","page1"];
    for (var i = 0; i < arrFiles.length; i++) {
        if (path.existsSync(helpFolder + arrFiles[i])) {
            theContent = fs.readFileSync(helpFolder + arrFiles[i], 'utf8');
            if (theContent != null)
                myCache.put('_myKey' + arrFiles[i], theContent.toString());//<_myKeypage1>, <content from file>
           
        }
    }
    myCache.put("_myServerKey_isLoaded", "yes");
};

exports.getTheContent = getTheContent;
 