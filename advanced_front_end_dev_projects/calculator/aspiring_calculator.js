/*
Hi, thanks for checking the source code.
Follow me on github.
https://github.com/aspiringguru/FreeCodeCamp/tree/master/intermediate_front_end_dev_projects/RandomQuoteGenerator 
*/
var reset = false;
var calcInProgress="";
var answer = "";
$(document).ready(function() {
  $("button").click(function() {
  	var buttonText = $(this).attr("value");
    console.log("text="+buttonText+", parseInt(buttonText, 10)="+parseInt(buttonText, 10)+", parseInt(buttonText, 10) == buttonText="+(parseInt(buttonText, 10) == buttonText));
    if(parseInt(buttonText, 10) == buttonText || buttonText === "." || buttonText === "/" || buttonText === "*" || buttonText === "-" || buttonText === "+" || buttonText === "%"){
    	//a number entered.
    	console.log("a math operator entered");
    	if (reset===true){
    		//start of new calc.
    		console.log("start of new calc");
    		calcInProgress = buttonText;
    		reset = false;
    	} else {
    		//continuing an existing calc
    		console.log("adding "+buttonText+" to calc");
    		calcInProgress += buttonText;
    	}
       	$(".textbox").val(calcInProgress);//update calc display on screen.
    //end if(parseInt(text, 10) == various tests for math operators that can be parsed.)
    } else if(buttonText === "=") {
    	//calc result and present to user
    	try{
	 	    answer = eval(calcInProgress);
	 	    calcInProgress = answer.toString();
			$(".textbox").val(answer);//display evaluated answer on screen. NB: variable calc is not changed.
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("=, calc & display result, answer="+answer);
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
    } else if(buttonText === "And") {
    	//calc result and present to user
    	try{
	 	    answer = eval(calcInProgress);
	 	    calcInProgress = answer.toString();
			$(".textbox").val(answer);//display evaluated answer on screen. NB: variable calc is not changed.
			console.log("ANS, calc & display result, answer="+answer);
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
    } else if (buttonText === "AC") {
		//reset calc to fresh start
		calcInProgress = "";
		$(".textbox").val("");
		console.log("AC button pressed, reset to start");
    } else if(buttonText === "CE") {
		//remove last entry from formula to be calculated.
		calcInProgress = calcInProgress.slice(0, -1);
		$(".textbox").val(calcInProgress);
		console.log("CE button pressed, delete last character entered");
  	} else if(buttonText === "X2") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.pow(eval(calcInProgress), 2);
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("squared");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}

  	} else if(buttonText === "X3") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.pow(eval(calcInProgress), 3);
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("cubed");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "sqrt") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.sqrt(eval(calcInProgress));
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("sqrt calculated");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "sin") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.sin(eval(calcInProgress));
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("sin calculated");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "cos") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.cos(eval(calcInProgress));
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("cos calculated");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "tan") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.tan(eval(calcInProgress));
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("tan calculated");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "log") {
		//remove last entry from formula to be calculated.
		try {
			answer = Math.log(eval(calcInProgress));
			calcInProgress = answer.toString();
			$(".textbox").val(answer);
			reset = true;//next button click function call will know the answer was just calculated.
			console.log("tan calculated");
		} catch(e){
			$(".textbox").val(calcInProgress);
			window.alert("error, check math syntax.");
		}
  	}  else if(buttonText === "PI") {
		//remove last entry from formula to be calculated.
		calcInProgress += Math.PI;
		$(".textbox").val(calcInProgress);
		console.log("PI added to equation");
  	}  else if(buttonText === ")") {
		//remove last entry from formula to be calculated.
		calcInProgress += ")";
		$(".textbox").val(calcInProgress);
  	}  else if(buttonText === "(") {
		//remove last entry from formula to be calculated.
		calcInProgress += "(";
		$(".textbox").val(calcInProgress);
  	}
    
    console.log("calcInProgress="+calcInProgress+", answer="+answer);
  });//end $("button").click(function()
});//end $(document).ready(function()

/*
http://api.jquery.com/val/
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
parseInt(string, radix);  radix = 10 for base 10. NB: ALWAYS specify the radix for reliable results.

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/eval
evaluates JavaScript code represented as a string.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt


Follow me on github.
https://github.com/aspiringguru/FreeCodeCamp/tree/master/intermediate_front_end_dev_projects/RandomQuoteGenerator 

Oh and I need a professional level mentor and a paid internship. Beer costs $.


*/