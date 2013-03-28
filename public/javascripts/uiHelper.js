/**
 * New node file
 */

 
 $(document).ready(function () {
 	$('.button1').live('click', function () {
		var contextObject= getContextObject();
		var theContent = getTheContent(contextObject);
    });
    
    function getContextObject(){
    	var contextObject = window.location.pathname;
		var regex = new RegExp("/", 'g');
        contextObject = contextObject.replace(regex, "");
        
        switch (contextObject) {
            case '':
                contextObject = 'homePage';
                break;
            case 'getPage1':
            	contextObject = 'page1';
                break;
        }
        console.log("requested context help page --> "+contextObject);
        return contextObject;
    }
    
    function getTheContent(contextObject) {
	    var clientDataStore = window.sessionStorage;
	    var theContent = "";
	    
	    //check if the content exists in client cache
	    theContent = clientDataStore.getItem('_myKey'+contextObject);
	    
	    //Make the server side call to get the data if cache is empty on client 
	    if (theContent == null || theContent.length <= 0) {
	    	 console.log('return content from server side.............');
	        $.ajax({
	            async:false,
	            url: '/getTheContent/' + contextObject,
	            type: "GET",
	            cache: false,
	            timeout: 5000,
	            complete: function () {},
	            success: function (callback) {
	                theContent = callback;
	                clientDataStore.setItem('_myKey'+contextObject, theContent); // <_myKeypage1 , contents of page 1>
	                console.log("................."+theContent);
	                $('#pageInfo').html('');
			        $("#pageInfo").css("display", "block");        
			        $('#pageInfo').html(theContent);
	            },
	            error: function (event)
	            { console.log('Error:::'+event); }
	        });
	    } else {
	        // return the content from client side cache
	        console.log('return content from client side cache .............');
	        return theContent;
	    }

    return theContent;
}



    
 
 });