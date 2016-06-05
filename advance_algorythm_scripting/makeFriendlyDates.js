/*
Convert a date range consisting of two dates formatted as YYYY-MM-DD into a more readable format.

The friendly display should use month names instead of numbers and ordinal dates instead of cardinal (1st instead of 1).

Do not display information that is redundant or that can be inferred by the user: 

if the date range ends in less than a year from when it begins, do not display the ending year.

Additionally, if the date range begins in the current year (i.e. it is currently the year 2016) and ends within one year, the year should not be displayed at the beginning of the friendly range.
NB: need to compare year of start date to year of current date.

If the range ends in the same month that it begins, do not display the ending year or month.

If the start date and end date are the same day/month/year, the returned array will have only one element. (array length = 1)

NB: cater for x1st, xnd, 3rd, xth. 

1. Split the string into an array where you get the "YYYY", "MM", "DD"
2. cater for  cater for x1st, xnd, 3rd, xth. NB 3rd, 13th. 23rd. test all possible days of month (ie 1st to 31st)
3. If you are using Date() to create instances of dates to work with, then use UTC time to avoid errors due to time zone difference between servers.
4. check logic for displaying year and month for all combinations. 
ie: same month of same year, same month of diff year, diff month of same year, diff month of diff year.

This could be tidied up to use Date objects instead of the extra number variables for day/month/year. Readability is nice.

*/


function makeFriendlyDates(arr) {
	//console.log("arr="+arr);
	var year1 = parseInt(arr[0].substring(0,4), 10);
	var year2 = parseInt(arr[1].substring(0,4), 10);
	var month1 = parseInt(arr[0].substring(5,7), 10);
	var month2 = parseInt(arr[1].substring(5,7), 10);
	var day1 = parseInt(arr[0].substring(8,10), 10);
	var day2 = parseInt(arr[1].substring(8,10), 10);
	var utcDate1 = new Date(Date.UTC(year1, month1, day1));
	var utcDate2 = new Date(Date.UTC(year2, month2, day2));
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var result = ["", ""];
	var showMonth2 = true;
	var showYear1 = true;
	var showYear2 = true;


	//console.log("year1="+year1+" month1="+month1+" day1="+day1+" utcDate1="+utcDate1);
	//console.log("year2="+year2+" month2="+month2+" day2="+day2+" utcDate2="+utcDate2);

	//start date is in current year and ends within one year: do not show year in start date.
	/*
	if (new Date().getFullYear()===year1){
		console.log("start date is in current year");
	}
	*/

	if (new Date().getFullYear()===year1 && lessThanYearDuration(utcDate1, utcDate2)){
		//console.log("start date is in current year and ends within one year, do not show year in start date.");
		showYear1 = false;
	}

	//end date is in same year and month as start date : do not display end year or month.
	if (year1===year2 && month1===month2){
		//console.log("end date is in same year and month as start date, do not display end year or month.");
		showYear2 = false;
		showMonth2 = false;
	}

	//the date range ends in less than a year from when it begins: do not display year in end date.
	if (lessThanYearDuration(utcDate1, utcDate2)){
		//console.log("date range ends in less than a year from when it begins, do not display year in end date.");
		showYear2 = false;
	}

	//construct output
	result[0] = month[month1-1].concat(" ", day1, daySuffix(day1));
	if (showYear1) {
		result[0] = result[0].concat(", ", year1);
	}
	if (showMonth2){
		result[1] = month[month2-1].concat(" ");
	}
	result[1] = result[1].concat(day2, daySuffix(day2));
	if (showYear2){
		result[1] = result[1].concat(", ", year2);
	}
	// if start and end date the same, result array has only one element.
	if (year1===year2 && month1===month2 && day1===day2){
		//console.log("start and end date the same, delete second date from result.")
		result.splice(1,1);//deletes element at position 1.
	}

	return result;
}

function daySuffix(date){
	//date is int representing day of month.
	//returns suffix to use for nominated day of month.
	var result = "";
	switch (date) {
	  case 1:
	    result = "st";
	    break;
	  case 2:
	    result = "nd";
	    break;
	  case 22:
	    result = "nd";
	    break;
	  case 3:
	    result = "rd";
	    break;
	  case 23:
	    result = "rd";
	    break;
	  case 21:
	    result = "st";
	    break;
	  case 31:
	    result = "st";
	    break;
	  default:
	    result = "th";
	}
	return result;
}

function lessThanYearDuration(startDate, endDate){

	var oneDay = 1000*60*60*24;//one day of milliseconds = 24 hrs*60 minutes * 60 seconds * 1000 milliseconds.
	var differenceMilliseconds = endDate.getTime() - startDate.getTime();
	var differenceDays = Math.floor(differenceMilliseconds/oneDay);
	if (differenceDays<365){
		//console.log("dates less than a year apart.");
		return true;
	} else {
		//console.log("dates 365 days or more apart.");
		return false;
	}
}





/*
//simple unit test to verify daySuffix() produces required results.
for (var i=1; i<=31; i++){
	console.log(i+daySuffix(i));
}
*/

//makeFriendlyDates(['2016-07-01', '2016-07-04']);


/*  Test cases below  */

console.log(makeFriendlyDates(["2016-07-01", "2016-07-04"]));
console.log("should return ['July 1st','4th']\n");

console.log(makeFriendlyDates(["2016-07-01", "2018-07-04"]));
console.log("should return ['July 1st, 2016', 'July 4th, 2018'].\n");

console.log(makeFriendlyDates(["2016-12-01", "2017-02-03"]));
console.log("should return ['December 1st','February 3rd'].\n");

console.log(makeFriendlyDates(["2016-12-01", "2018-02-03"]));
console.log("should return ['December 1st, 2016','February 3rd, 2018'].\n");

console.log(makeFriendlyDates(["2017-03-01", "2017-05-05"]));
console.log("should return ['March 1st, 2017','May 5th']\n");

console.log(makeFriendlyDates(["2018-01-13", "2018-01-13"]));
console.log("should return ['January 13th, 2018'].\n");

console.log(makeFriendlyDates(["2022-09-05", "2023-09-04"]));
console.log("should return ['September 5th, 2022','September 4th'].\n");

console.log(makeFriendlyDates(["2022-09-05", "2023-09-05"]));
console.log("should return ['September 5th, 2022','September 5th, 2023']\n");


/* 

Notes

  */