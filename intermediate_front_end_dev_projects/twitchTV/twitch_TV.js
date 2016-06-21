/*
cd D:\2015\freeCodeCamp\intermediate_front_end_dev_projects\twitchTV
python -m SimpleHTTPServer
access at 127.0.0.1:8000

*/
$(document).ready(function() {
	console.log("$(document).ready(function()");
	//setup page, load data.
	var twitchUserNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];
	//var twitchUserNames = ["brunofin"];
	//var twitchUserNames = ["storbeck"];
	var url;
	for (var i=0; i<twitchUserNames.length; i++){
		url = "https://api.twitch.tv/kraken/streams/"+twitchUserNames[i]+ '?callback=?';
		// adding the '?callback=?' enables testing "data.stream === undefined" wihtout 422 error.
		console.log("calling getJsonData("+url+")");
		getJsonData(twitchUserNames[i], url)
	}
	//selectively display or hide data by user input.
	$("#showAll").click(function(){
		console.log("#showAll clicked");
        $(".live-streaming").show();
        $(".not-streaming").show();
        $(".closed-streaming").show();
    });
	$("#showOnline").click(function(){
		console.log("#showOnline clicked");
        $(".live-streaming").show();
        $(".not-streaming").hide();
        $(".closed-streaming").hide();
    });
	$("#showOffline").click(function(){
		console.log("#showOffline clicked");
        $(".live-streaming").hide();
        $(".not-streaming").show();
        $(".closed-streaming").hide();
    });
    $("#showClosed").click(function(){
    	console.log("#showClosed clicked");
        $(".live-streaming").hide();
        $(".not-streaming").hide();
        $(".closed-streaming").show();
    });
});//end $(document).ready(function()


function getJsonData(twitchUserName, url) {
    //console.log("getJsonData called, $.getJSON with url="+url);
    var dummyImage = "https://dummyimage.com/40/ecf0e7/5c5457.jpg&text=0x3F";//dummy image for when user is not valid.
	try {
		$.getJSON(url,function(data){
			//NB: since getJSON calls are asynchronous, any variables specific to each call need to be created within the call.
			//othewise different calls are accessing the same variables and chaos results.
		    var online, logo, onlineStatus, onlineUrl;
		    var validUser = true;
		    var onlineClass;
			if (data.stream===null){
				//console.log("data.stream===null");
				/*  $("#twitchStatus").html(twitchUserName+" Is Offline") */
				online = false;
				//var ttemp = "<div class='row'><div class='col-md-4 not-streaming'><img class='img-circle' src='"+dummyImage+"'></div>  <div class='col-md-4 not-streaming'>"+twitchUserName+"</div>  <div class='col-md-4 not-streaming'>OffLine</div></div>";
				console.log("twitchUserName="+twitchUserName+", data.stream===null");
				//$("#twitchUserData").append(ttemp);
			} else if (data.stream === undefined) {
				//var ttemp = "<div class='row'><div class='col-md-4 closed-streaming'><img class='img-circle' src='"+dummyImage+"'></div>  <div class='col-md-4 closed-streaming'>"+twitchUserName+"</div>  <div class='col-md-4 closed-streaming'>Account Closed</div></div>";
				validUser = false;
				online = false;//kindof redundant but set in case logic later relies on this.
				console.log("twitchUserName="+twitchUserName+", data.stream === undefined");
				//$("#twitchUserData").append(ttemp);
      		}	else {
				/*
				console.log("twitchUserName="+twitchUserName+"data.stream is NOT null");
				console.log("twitchUserName="+twitchUserName+"data.stream._id="+data.stream._id);
				console.log("twitchUserName="+twitchUserName+"data.stream.game="+data.stream.game);
				console.log("twitchUserName="+twitchUserName+"data.stream.viewers="+data.stream.viewers);
				console.log("twitchUserName="+twitchUserName+"data.stream.created_at="+data.stream.created_at);
				console.log("twitchUserName="+twitchUserName+"data.stream.video_height="+data.stream.video_height);
				console.log("twitchUserName="+twitchUserName+"data.stream.average_fps="+data.stream.average_fps);
				console.log("twitchUserName="+twitchUserName+"data.stream.delay="+data.stream.delay);
				console.log("twitchUserName="+twitchUserName+"data.stream.is_playlist="+data.stream.is_playlist);
				console.log("twitchUserName="+twitchUserName+"data.stream.channel.url="+data.stream.channel.url);
				console.log("twitchUserName="+twitchUserName+"data.stream.channel.followers="+data.stream.channel.followers);
				console.log("twitchUserName="+twitchUserName+"data.stream.channel.mature="+data.stream.channel.mature);
				*/
				onlineStatus = data.stream.channel.status;
				console.log("twitchUserName="+twitchUserName+"data.stream.channel.status="+onlineStatus);
				onlineUrl = data.stream.channel.url;
				console.log("twitchUserName="+twitchUserName+"data.stream.channel.url="+onlineUrl);
				logo = data.stream.channel.logo;
				online = true;
				//console.log("twitchUserName="+twitchUserName+" data.stream.channel.logo="+logo);
				//console.log("twitchUserName="+twitchUserName+" data.stream.channel._links.follows="+data.stream.channel._links.follows);
				//console.log("data.stream.="+data.stream.);
				//$("#twitchUserData").html("<a href='https://www.twitch.tv/"+twitchUserName+"' target='_blank'>"+twitchUserName+" Is Online</a>");
				//var temp = "<div class='row'><div class='col-md-4 live-streaming'><img class='img-circle' src='"+logo+"'></div>  <div class='col-md-4 live-streaming'>"+twitchUserName+"</div>  <div class='col-md-4 live-streaming'>Online</div></div>"
				console.log("twitchUserName="+twitchUserName+", is a valid user and online.")
				//$("#twitchUserData").append(temp);
			}//end if (data.stream===null) & else
			//now getJSON data from api.twitch.tv/kraken/channels/username/?callback=?
			var url2 = "https://api.twitch.tv/kraken/channels/"+twitchUserName+ '?callback=?';
			console.log("calling $.getJSON(url2,function(data2) with url2="+url2);
			$.getJSON(url2,function(data2){
				if (data2.logo === null){
					logo = dummyImage;
					console.log("$.getJSON(url2,function(data2), twitchUserName="+twitchUserName+"data.logo === null, using dummy image");
				} else {
					logo = data2.logo;//value retrieved from getJson call to https://api.twitch.tv/kraken/channels/channelName?callback=?
					console.log("$.getJSON(url2,function(data2), twitchUserName="+twitchUserName+", data.logo="+logo);
				}
				//now assemble data collected from json to put into the html $jquery call.
				if (online===true && validUser===true) {
					onlineClass = "live-streaming";
					onlineUrl = "<a href='"+onlineUrl+"' target='_blank'>"+twitchUserName+"</a>";
					//use onlineUrl retrieved from json
					//use value retrieved from json
					//logo was set with data from json call
					console.log("twitchUserName="+twitchUserName+", online=true && validUser===true");
				} else if (online===false && validUser===true) {
					onlineClass = "not-streaming";
					onlineStatus = "Offline";
					onlineUrl = twitchUserName;
					//logo was set with data from json call
					console.log("twitchUserName="+twitchUserName+", online=false && validUser===true");
				} else if (validUser===false){
					onlineClass = "closed-streaming";
					logo = dummyImage;
					onlineStatus = "Account Closed";
					onlineUrl = twitchUserName;
					console.log("twitchUserName="+twitchUserName+", validUser===false");
				}
				var temp = "<div class='row'><div class='col-md-4 "+onlineClass+"'>" +
					"<img class='img-circle' src='"+logo+"'></div><div class='col-md-4 "+onlineClass+"'>"+
					onlineUrl+"</div><div class='col-md-4 "+onlineClass+"'>"+onlineStatus+"</div></div>";
				$("#twitchUserData").append(temp);

			});//end $.getJSON(url2,function(data2)



		});//end $.getJSON(url,function(data)
	} catch (e){
		console.log("general Error caught"+e);
	}//end try catch
}//end function getJsonData(twitchUserName, url)

