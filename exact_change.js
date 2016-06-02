
var currency = [];
currency['ONE HUNDRED'] = 100.00;
currency['TWENTY'] = 20.00;
currency['TEN'] = 10.00;
currency['FIVE'] = 5.00;
currency['ONE'] = 1.00;
currency['QUARTER'] = 0.25;
currency['DIME'] = 0.10;
currency['NICKEL'] = 0.05;
currency['PENNY'] = 0.01;

function checkCashRegister(price, cash, cid) {
/* 
Return the string "Insufficient Funds" if cash-in-drawer is less than the change due.
Return the string "Closed" if cash-in-drawer is equal to the change due.
Otherwise, return change in coin and bills, sorted in highest to lowest order.

Identify largest cash-in-drawer less than the required change, add it to change and remove from drawer.
Repeat until no cash-in-drawer or exact change or "Insufficient Funds" identified.
NB: working in cents rather than $ due to floating point rounding errors.
*/
	price = price * 100;
	cash = cash * 100;
	var change = [];
	var changeDue = (cash - price);
	cashInDrawer = 0;
	console.log('changeDue='+changeDue);
   	console.log('typeof cashInDrawer ='+typeof cashInDrawer);
	for (var k in cid) {
	    if (cid.hasOwnProperty(k)) {
	    	console.log('typeof cid['+k+'][1]='+typeof cid[k][1]);
	        cashInDrawer = cashInDrawer + Math.round(cid[k][1]*100);
	        console.log('key is: ' + k + ', cid['+k+'][0] is: ' + cid[k][0] + ', cid['+k+'][1] is: ' + cid[k][1] + ', cashInDrawer='+ cashInDrawer+"\n");
	    }
	}
	//cashInDrawer = cashInDrawer/100;
	console.log("cashInDrawer="+cashInDrawer);

	if (cashInDrawer < changeDue){
		console.log("Insufficient Funds");
		return "Insufficient Funds";
	} else if (cashInDrawer == changeDue) {
		console.log("Closed");
		return "Closed";
	} else {
		console.log("calculating change due.");
	}

	var counter =0;
	while (changeDue>0 && counter<1) {
		counter += 1;
		console.log('calculating change');
		for (var i=cid.length-1; i>=0; i--) {
			console.log("testing "+cid[i][0]+" of value = "+currency[cid[i][0]]+" for change. changeDue="+changeDue+" changeDue is oject type "+typeof changeDue);
			console.log("cid["+i+"][1]="+cid[i][1]);
			console.log("currency[cid["+i+"][0]]=currency["+cid[i][0]+"]="+currency[cid[i][0]]+" this object type="+typeof currency[cid[i][0]]+"\n");

			while(cid[i][1]>0 && changeDue>0 && currency[cid[i][0]]*100<changeDue){
				console.log("cid["+i+"][0]="+cid[i][0]+", cid["+i+"][1]="+cid[i][1]);
				console.log("adding "+currency[cid[i][0]]*100+" to change.");
				changeDue -= currency[cid[i][1]];
				cid[i][1] = cid[i][1]-currency[cid[i][0]]*100;
				console.log("changeDue="+changeDue);
				if (cid[i][1]>0==0){
					console.log("out of change for "+cid[i][0]>0);
				}
			}
		}

	}

	// Here is your change, ma'am.
	return change;
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
checkCashRegister(100.00, 250.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

//checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
/*
checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
// should return an array.
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return a string.
checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return a string.
checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
// should return [["QUARTER", 0.50]].
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
// should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return "Insufficient Funds".
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return "Insufficient Funds".
checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// should return "Closed".


*/