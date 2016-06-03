
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    for (var i=0; i<arr2.length; i++){
        console.log("adding "+arr2[i]+" to inventory.");
        add2Inventory(arr1, arr2[i]);
    }
    


    return arr1;
}

function inInventory(item, inv){
    for (var i=0; i<inv.length; i++){
        if (item===inv[i][1]){
            console.log("match found");
            return i;
        } else {
            console.log("try next array element");
        }
    }
    return -1;
}


function add2Inventory(inv, stock) {//inv, stock
    console.log("adding stock item ["+stock+"] to inventory "+inv+"\n");
    var pos = inInventory(stock[1], inv);
    if (pos>=0){
        console.log("stock item is in inventory, add to stock count.");
        inv[pos][0] += stock[0];
    } else {
        console.log("stock item is _NOT_ in inventory. add to inventory.");
        //find position to insert alphabetically
        var i = 0;
        var b = stock[1].toLowerCase();
        //find position of stock item in the inventory.
        var keepTesting = true;
        while (i<inv.length && keepTesting){
            var a = inv[i][1].toLowerCase();
            if (b<a){
                console.log(b+"<"+a+" break out of while loop @ i="+i);
                keepTesting = false;
                break;
            } else {
                console.log(b+">="+a+"\n");
                i++;
            } 
        }
        console.log("inv.length="+inv.length);
        if (i==inv.length){
            console.log("adding stock item to end. i="+i);
        }
        console.log("insert "+stock[0]+" units of item "+stock[1]+" at position "+i);
        inv.splice(i, 0, stock);
        //
    }
    console.log("after adding, inventory = "+inv+"\n");
    return inv;
}


// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);


/*
updateInventory();
//should return an array.

updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]);
//length should return an array with a length of 6.

updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]])'
//should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].

updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []);
//should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]].

updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]);
//should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]].

updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]);
//should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]].


Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. 
Update the current existing inventory item quantities (in arr1). 
If an item cannot be found, add the new item and quantity into the inventory array. 
The returned inventory array should be in alphabetical order by item.
*/