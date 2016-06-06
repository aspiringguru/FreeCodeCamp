/*
Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object.

*/
var Person = function(firstAndLast) {
    //return firstAndLast;

    //var fullName = firstAndLast;
    var firstName = firstAndLast.split(" ")[0];
    var lastName = firstAndLast.split(" ")[1];

    this.getFullName = function() {
    	return firstName.concat(" ", lastName);
    };
    this.getFirstName = function() {
    	return firstName;
    };
    this.getLastName = function() {
    	return lastName;
    };
    this.setFirstName = function(fname){
    	firstName = fname;
    };
    this.setLastName = function(lname){
    	lastName = lname;
    };
    this.setFullName = function(firstAndLast){
    	var fname = firstAndLast.split(" ")[0];
    	this.setFirstName(fname);
    	var lname = firstAndLast.split(" ")[1];
    	this.setLastName(lname);
    };
};

var bob = new Person('Bob Ross');



//tests as used in the online assessor
console.log("Object.keys(bob).length="+Object.keys(bob).length+" should return 6.");
console.log("bob instanceof Person="+(bob instanceof Person)+" should return true.");
console.log("bob.firstName="+bob.firstName+" should return undefined.");
console.log("bob.lastName="+bob.lastName+" should return undefined.");
console.log("bob.getFirstName()="+bob.getFirstName()+" should return 'Bob'.");
console.log("bob.getLastName()="+bob.getLastName()+" should return 'Ross'");
console.log("bob.getFullName()="+bob.getFullName()+" should return 'Bob Ross'.");
console.log("bob.setFirstName('Haskell')="+bob.setFirstName("Haskell"));
console.log("bob.getFullName()="+bob.getFullName()+" should return 'Haskell Ross'");
console.log("bob.setLastName('Curry')="+bob.setLastName("Curry"));
console.log("bob.getFullName()="+bob.getFullName()+" should return 'Haskell Curry'");
console.log("bob.setFullName('Haskell Curry')="+bob.setFullName("Haskell Curry"));
console.log("bob.getFullName()="+bob.getFullName()+" should return 'Haskell Curry'");
console.log("bob.getFirstName()="+bob.getFirstName()+" should return 'Haskell'");
console.log("bob.getLastName()="+bob.getLastName()+" should return 'Curry'");

/*
these tests conflict with the online script tests, perform these seperately or after.
console.log("bob.getFullName()="+bob.getFullName()+"|");
console.log("bob.getFirstName()="+bob.getFirstName()+"|");
console.log("bob.getLastName()="+bob.getLastName()+"|");
bob.setFirstName("Fred");
console.log("bob.getFullName()="+bob.getFullName()+"|");
console.log("bob.getFirstName()="+bob.getFirstName()+"|");
console.log("bob.getLastName()="+bob.getLastName()+"|");
bob.setLastName("Smith");
console.log("bob.getFullName()="+bob.getFullName()+"|");
console.log("bob.getFirstName()="+bob.getFirstName()+"|");
console.log("bob.getLastName()="+bob.getLastName()+"|");
*/
