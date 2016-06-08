/*
Exact Change

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. 
Return the string "Closed" if cash-in-drawer is equal to the change due.
NB: above two lines from the problem description, these are misleading and need to be compared with the test case solutions provided. 

NB: after checking the tests cases listed, the criteria for returning strings or arrays is as follows.
- if the 'total value of cash in drawer' is less than change required - fast exit to return 'Insufficient Funds' (do not attempt to calculate the change)
- if the change available cannot provide the exact change required, return 'Insufficient Funds'.
- if after calculating the change and confirming exact match and the change remaining in drawer has value 0.00, return 'Closed'.
[ie: no more change left in till, cannot give change to next customer so till is closed.]

- array returned has denominations sorted in descending order.
- If a denomination is too large to be required for the change, do not provide entries in the array returned. 
- Once a denomination is included in the array, all smaller denominations are nominated in the array, even if the value used of that denomination is zero.

Note: this should be tidied up but passes the assessment criteria.
Areas for improvement
- better use of inheritance and global variables.
- simplified tracking of cash in drawer, change, remaining refund.
- have used excess number of variables for readability.
- check big O and footprint, more efficient algorythm and less memory usage should be possible.


*/
var change = [];//possibly should rewrite with change not as global variable.

function checkCashRegister(price, cash, cid) {
  change = [];
  var denomination = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"];
  var denomValue = [0.01, 0.05, 0.10, 0.25, 1.00, 5.00, 10.00, 20.00, 100.00];
  //
  var insufFunds = "Insufficient Funds";
  price = +parseFloat(price).toFixed(2);
  cash = +parseFloat(cash).toFixed(2);
  var valueChangeDue = cash-price;
  
  var changeInDrawer = sumDrawer(cid);
  console.log("at start of function checkCashRegister, changeInDrawer="+changeInDrawer+", cash="+cash+", price="+price+", value of change due="+valueChangeDue );
  console.log("cid="+cid);
  console.log("cid.length="+cid.length);
  if (changeInDrawer<valueChangeDue){
    console.log("total value of change in drawer is less than cash-price.");
    return insufFunds;
  }
  //generate change from cash in drawer.
  for (var i=cid.length-1; i>=0; i--){
    var changeDenomIndex = denomination.indexOf(cid[i][0]);//find denomination of ith element.
    var changeDenomValue = denomValue[changeDenomIndex];//value of the denomination.
    console.log("changeDenom="+cid[i][0]+", changeDenomValue="+changeDenomValue+", valueChangeDue="+valueChangeDue+", cid["+i+"][1]="+cid[i][1]);
    while (changeDenomValue<=valueChangeDue && cid[i][1]>0){
      //while the value of the denomination is less than the remaining change due 
      // _&_ change in this denomination is available in drawer
      add2Change(cid[i][0], changeDenomValue);
      cid[i][1] -= changeDenomValue;
      cid[i][1] = +cid[i][1].toFixed(2);
      valueChangeDue -= changeDenomValue;
      valueChangeDue = +valueChangeDue.toFixed(2);
    }
    /*
    if(change.length>0){
      //if change already has element for a currency
      //an entry for this currency must be recorded.
      //due to laziness adding denomination with zero value as it will not affect values if already exists.
      //without this 'if' condition, denominations smaller than the largest denomination selected for change are omitted.
      console.log("change.length="+change.length+">0, add "+cid[i][0]+", 0 to change since change has a larger denomination.");
      add2Change(cid[i][0], 0);
    }
    */
  }
  // Here is your change, ma'am.
  console.log("at end: value of change in drawer="+sumDrawer(cid)+", valueChangeDue="+valueChangeDue);
  console.log("change="+change);
  console.log("typeof change="+typeof change);
  changeInDrawer = sumDrawer(cid);
  console.log("change.length="+change.length+", value of change="+sumDrawer(change));
  console.log("end of function checkCashRegister\n\n");
  if (sumDrawer(cid)>0 && valueChangeDue>0){
    return insufFunds;
  } else if (sumDrawer(cid)===0 && valueChangeDue===0){
    return "Closed";
  }
  return change;
}
  
function sumDrawer(cash){
  /*
  calculates total value of all denominates in array provided.
  returns float to two decimal places.
  converts each array item to float w 2 decimal places when extracted
  & converts final sum to  float w 2 decimal places before returning value.
  possibly redundant, but javascript float behaviour is weird.
  NB: this function is used to check change available at start and at end.
  */
  var sum = 0;
  for (var i=0; i<cash.length; i++){
    var temp = +cash[i][1].toFixed(2);
    sum += temp;
    //console.log("cash["+i+"][1]="+cash[i][1]+", sum="+sum);
  }
  sum = +sum.toFixed(2);
  return sum;
}

function add2Change(denom, denomVal){
  /*
  add denomination to global array 'change'.
  if denomination already in the array, increment value of that denomination.
  if denomination NOT in array, add element to array for that denomination.
  NB: needs fix to add denomination to array if larger denominations in array.
  */
  console.log("add2Change called, denom="+denom+", denomVal="+denomVal);
  var foundDenom = false;
  //find position of denom in change.
  for (var i=0; i<change.length; i++){
    if (change[i][0]===denom){
    change[i][1]  += denomVal;
    change[i][1] = +change[i][1].toFixed(2)
    console.log("added "+denomVal+" of denomination "+denom+" to change.");
    foundDenom = true;
    }
  }
  //if denom not in change, add element to change to represent denom.
  if (!foundDenom){
    //denom not already in the change, add element to array.
    var temp = [denom, denomVal];
    change.push(temp);
    //change.splice(0, 0, temp);
    console.log("["+denom+", "+denomVal+"] spliced onto front of change, change="+change);
  }
}




// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

//checkCashRegister(18.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
//checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return a string. 
//[total change available = 0.01, required change is 0.50]
//checkCashRegister(19.94, 20.00, [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return a string. 
var result;

result = checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
console.log("result='"+result+"', should return an array.\n");
//$20.00-$19.50=$0.50, 'cash in drawer' is able to provide exact change and 'cash in drawer' has value > 0 after issueing change.

result = checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log("result='"+result+"', should return a string.\n");
//$20.00-$19.50=$0.50. 'cash in drawer' is less than change required.

result = checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
console.log("result='"+result+"', should return a string.\n");
//$20.00-$19.50=$0.50. We also need to calculate change issued and test the remaining 'cash in drawer' values is zero.

result = checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
console.log("result='"+result+"', should return [['QUARTER', 0.50]].\n");
//$20.00-$19.50=$0.50. after change is issued, the 'cash in drawer' value is still above zero.

result = checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]) 
console.log("result='"+result+"', should return [['TWENTY', 60.0], ['TEN', 0.0], ['FIVE',15.00], ['ONE', .00, ['QUARTER', 0.50], ['DIME', 0.20], ['PENNY', 0.04]");
//100-3.26=$96.74. 'should return'=60+15+.50+.20+.04=$77.74, the 'TEN' should be 20.00.
//NB: does not return array element for denominations above TWENTY, does include array element for TEN even though value is 0.00 when it should be 20.00. 


result = checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
console.log("result='"+result+"', should return 'Insufficient Funds'.");
//NB: this fails because the total value of the available change (0.01) is less than change required (0.50).

result = checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
console.log("result='"+result+"', should return 'Insufficient Funds'.");
//NB: this fails because the available change is a ONE and a PENNY, change required is 0.50.
//NBB: 'Insufficient Funds' appears to be 'when correct change cannot be issued' as well as value of 'cash in drawer' being inadequate.


result = checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
console.log("result='"+result+"', should return 'Closed'.");
//20.00-19.50=0.50. The total value of 'cash in drawer' is equal to the change required and the exact change is available. 
//ie: after issueing change to customer, the 'cash in drawer' value is zero.
