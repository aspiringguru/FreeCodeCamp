/*

*/
var randomQuote, randomAuthor;
var randomChuckAuthor, randomChuckQuote;
var newChuckName;
$(document).ready(function() {
	//console.log("$(document).ready(function()");
	newChuckName = getQueryVariable("newChuckName");
	//console.log("newChuckName="+newChuckName);
	returnQuote();
	function returnQuote(){
		var url = "http://api.icndb.com/jokes/random";
		//console.log("getting json from "+url);
		//names of Chuck Norris Characters. 
		//For some weird reason, if this line is broken over > line, accessing the array elements returns an error. ugh!
		var chuckAuthors = ["Cordell Walker", "Chuck Slaughter", "Cliff Garrett", "Col. James Braddock", "Col. Scott McCoy", "Colonel James Braddock", "Dan Stevens", "Danny O'Brien", "Eddie Cusack", "Frank Shatter", "Grogan", "J.J. McQuade", "Jake Fallon", "Jake Wilder", "John David Dawes", "John Shepherd", "John T. Booker", "Josh Randall", "Joshua McCord", "Maj. Scott McCoy", "Matt Hunter", "Matt Logan", "Max Donigan", "Scott James", "Sean Kane"];
		var randomChuckInt = Math.floor((Math.random()*chuckAuthors.length));
		//console.log("randomChuckInt="+randomChuckInt);
		randomChuckAuthor = chuckAuthors[randomChuckInt];
		//console.log("randomChuckAuthor="+randomChuckAuthor);
		$.getJSON(url,function(data){
			if (data.success===null){
				//console.log("data.type===null");
				randomChuckQuote = "Your lag is because Chuck Norris broke the internet. Then rebuilt it.";
			} else if (data.type === undefined) {
				//console.log("data.type===undefined");
				randomChuckQuote = "Chuck Norris DDOS'd the internet. All of it.";
			} else {
				randomChuckQuote = data.value.joke;
				//console.log("quote retrieved from json");
			}
			//randomChuckQuote = randomChuckQuote.replace("Chuck Norris", "Matthew");
			randomChuckQuote = replaceAll(randomChuckQuote, "Chuck Norris", newChuckName);
			$("#quote").html(randomChuckQuote);
			$("#author").html(randomChuckAuthor);
			$("#newChuckName").html(newChuckName+" Quote Generator");
			//console.log("randomChuckQuote="+randomChuckQuote+", randomChuckAuthor="+randomChuckAuthor);
		});//end $.getJSON(url2,function(data2)

	}//end function returnQuote()
	//
	$("#getQuote").click(function() {
		//console.log("user clicked, return random quote.");
		returnQuote();
	});//end click(function())
	$("#tweetQuote").click(function() {
		//console.log("user clicked, randomQuote="+randomQuote+", randomAuthor="+randomAuthor);
		var tempEncode = encodeURIComponent("'"+randomChuckQuote+"' by "+randomChuckAuthor);
		if (tempEncode.length>140){
			//console.log("tempEncode.length>140, substring to 140 chars for tweet.")
			tempEncode = tempEncode.substring(0, 140);
		}
		window.open("https://twitter.com/intent/tweet?text="+tempEncode);
	});//end click(function())


});//end $(document).ready(function()


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

/*
useful references
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
https://developer.mozilla.org/en-US/docs/Web/API/Window/location
https://css-tricks.com/snippets/javascript/get-url-variables/


Todo
1. Fix CSS - text is too wide.
2. Need to detect Chuck Norris's properly and replicate the 's with newChuckName.
3. improve text shortening for twitter, drop vowels? 

*/