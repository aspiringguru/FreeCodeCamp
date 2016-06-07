/*
Return a new array that transforms the element's average altitude into their orbital periods.

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km^3s^-2.

https://en.wikipedia.org/wiki/Orbital_period

a = (GMT^2 / 4xpi^2)^(1/3)

a = the orbit's semi-major axis in meters.
G = the gravitational constant.
M = mass of the more massive body.
T = the orbital period in seconds.

T = 2 x pi x sqrt(a^3/u)
a = the orbit's semi-major axis in meters.
u = GM is the standard gravitational parameter in m3/s2 = 398600.4418

https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes
he semi-major axis is one half of the major axis, and thus runs from the centre, 
through a focus, and to the perimeter. 
Essentially, it is the radius of an orbit at the orbit's two most distant points. 
For the special case of a circle, the semi-major axis is the radius. 
One can think of the semi-major axis as an ellipse's long radius.

*/

//alternate solution - creates temp object to store results.
//passes the online test but fails the scope of problem.
//NB: the original code nominates returning the original object, not generating a new object.
function orbitalPeriod2(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  result = [];
  for (var obj in arr){//loop through the args given.
  	//T = 2 x pi x sqrt(a^3/u)
  	//extract the objects altitude from the args given, calculate the orbit period using the forumula from wikipedia.
  	var orbPeriod = Math.round(2*Math.PI*Math.sqrt(Math.pow(earthRadius+arr[obj].avgAlt, 3)/GM));
  	//create a new object to store the results.
  	var temp = {name: arr[obj].name, orbitalPeriod: orbPeriod};
  	//put the results into the array to be returned once all input values assessed.
  	result.push(temp);
  }
  //console.log("\n at end of orbitalPeriod, result="+result+"\n")
  return result;
}

//preferred solution - modifies the original arr value & deletes attribute 'avgAlt' (not required)
function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  result = [];
  for (var obj in arr){//loop through the args given.
  	//T = 2 x pi x sqrt(a^3/u)
  	//extract the objects altitude from the args given, calculate the orbit period using the forumula from wikipedia.
  	var orbPeriod = Math.round(2*Math.PI*Math.sqrt(Math.pow(earthRadius+arr[obj].avgAlt, 3)/GM));
  	//create a new object to store the results.
  	//var temp = {name: arr[obj].name, orbitalPeriod: orbPeriod};
  	arr[obj].orbitalPeriod = orbPeriod;
  	delete arr[obj].avgAlt;
  }
  //console.log("\n at end of orbitalPeriod, result="+result+"\n")
  return arr;
}


console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]) );

//online test criteria - needs reformatting.
console.log("orbitalPeriod([{name : 'sputnik', avgAlt : 35873.5553}])="+orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}])
	+"\n should return [{name: 'sputnik', orbitalPeriod: 86400}].\n\n");

console.log("orbitalPeriod([{name: 'iss', avgAlt: 413.6}, {name: 'hubble', avgAlt: 556.7}, {name: 'moon', avgAlt: 378632.553}])="
	+orbitalPeriod([{name: 'iss', avgAlt: 413.6}, {name: 'hubble', avgAlt: 556.7}, {name: 'moon', avgAlt: 378632.553}])
	+"\n should return [{name : 'iss', orbitalPeriod: 5557}, {name: 'hubble', orbitalPeriod: 5734}, {name: 'moon', orbitalPeriod: 2377399}].");

