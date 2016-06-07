/*
Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but different indices, 
return the smallest sum of indices. 
[addressed by looping through array from position 0 to end AND testing if the pair being added match existing pairs.]
[NB: need to check pairs, not just values. ie: simply testing if (i,j) is in array of pairs will not verify if (j,i) is in array of pairs.]
ie: numeric elements occur more than once in arr.
possible solution: once a pair is found, delete that pair and any duplicate pairs from arr.

NB:Once an element has been used, it cannot be reused to pair with another. [addressed by checking both indices not already in results.]
possible solution: if an index already in array of matches, cannot add the pair.

For example pairwise([7, 9, 11, 13, 15], 20) returns 6.
The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.

Index	0	1	2	3	4
Value	7	9	11	13	15
Below we'll take their corresponding indices and add them.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

NB: the solution provided would be neater if set theory was used. 
For this problem imported libraries were not used. Hence the 'messy' solution.

*/

function pairwise(arr, arg) {
	//console.log("arr="+arr+" arg="+arg);
	var matchingIndices = [];
	var matchingPairs = [];
	for (var i=0; i<arr.length; i++){
		for (var j=1; j<arr.length; j++){
			if (i===j){ break;}//if i===j skip.
			if (arr[i]+arr[j]===arg){
				//console.log("arr["+i+"]+arr["+j+"]="+arr[i]+"+"+arr[j]+"="+arg);
				if (matchingIndices.indexOf(i)<0 && matchingIndices.indexOf(j)<0 && matchingPairs.indexOf([arr[i], arr[j]])<0 && matchingPairs.indexOf([arr[j], arr[i]]) ){
					//console.log("adding indices i="+i+" j="+j+" to results.");
					matchingIndices.push(i);
					matchingIndices.push(j);
					matchingPairs.push([arr[i], arr[j]]);
				} else {
					//console.log("not adding indices i="+i+" j="+j+" to results, one or both of indices already in results array, or pair values already in results array.");
				}
			}
		}
	}
	//console.log("matchingIndices="+matchingIndices);
	//return arg;
	//calculate some of indices& return.
	if (matchingIndices.length>0){
		arg = matchingIndices.reduce(function(a, b) { return a + b; });
	} else {
		arg = 0;
	}
	return arg;
}

console.log("pairwise([1,4,2,3,0,5], 7) = "+pairwise([1,4,2,3,0,5], 7));



console.log("pairwise([1, 4, 2, 3, 0, 5], 7)="+pairwise([1, 4, 2, 3, 0, 5], 7)+" should return 11.");
console.log("pairwise([1, 3, 2, 4], 4)="+pairwise([1, 3, 2, 4], 4)+" should return 1.");
console.log("pairwise([1, 1, 1], 2)="+pairwise([1, 1, 1], 2)+" should return 1.");
console.log("pairwise([0, 0, 0, 0, 1, 1], 1)="+pairwise([0, 0, 0, 0, 1, 1], 1)+" should return 10.");
console.log("pairwise([], 100)="+pairwise([], 100)+" should return 0.");
