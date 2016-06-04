//http://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator(input) {
  var inputArr = input.split("");
  var results = [];//initialise array 'results' to empty array. 
  // NB : 'permute' function appends to array 'results' so initial conditions required.

  function permute(arr, memo) {
    var cur, memo = memo || [];//declare variables, if memo not declared, intialise it to empty array

    for (var i = 0; i < arr.length; i++) {//loop through all elements of input array 'arr'
      //take i'th element from array and move to end of array 'results'
      cur = arr.splice(i, 1);// remove one item from array 'arr' at position i & store in 'cur'.
      if (arr.length === 0) {//use === to check array length value is 0 and type matches.
        results.push(memo.concat(cur));//add 'memo.concat(cur)' to end of array 'results'
        //memo.concat(cur) = comcatenates contents of memo & cur.
      }
      permute(arr.slice(), memo.concat(cur));//recurse 
      arr.splice(i, 0, cur[0]);//array.splice(start, deleteCount[, item1[, item2[, ...]]])
      //removes zero elements from array 'arr' at position i, inserts 'cur[0]' at position i.
    }

    return results;
  }
  var permutedArr = permute(inputArr);
  for (var i=0; i<permutedArr.length; i++){
    permutedArr[i] = permutedArr[i].join('');
  }
  return permutedArr;
}

checkRepeat = function (str) {
    var repeats = /(.)\1/;
    return repeats.test(str)
}

function countNoRepeats(input){
//count non repeating permutations.
  var count = 0;
  for (var i=0; i<input.length; i++){
    if (!checkRepeat(input[i])){
      count += 1;
    }
  }
  return count;
}


function permAlone(str) {
  var temp = permutator(str);
  return countNoRepeats(temp);
}


//permAlone('aab');


/*
Return the number of total permutations of the provided string that don't have repeated consecutive letters. 
Assume that all characters in the provided string are each unique.

For example, aab should return 2 because it has 6 total permutations 
(aab, aab, aba, aba, baa, baa), 
but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.

*/


console.log(permAlone("aab") );
console.log("should return a number.");

console.log(permAlone("aab") );
console.log("should return 2.");

console.log(permAlone("aaa") );
console.log("should return 0.");

console.log(permAlone("aabb") );
console.log("should return 8.");

console.log(permAlone("abcdefa") );
console.log("should return 3600.");

console.log(permAlone("abfdefa") );
console.log("should return 2640.");

console.log(permAlone("zzzzzzzz") );
console.log("should return 0.");

console.log(permAlone("a") );
console.log("should return 1.");

console.log(permAlone("aaab") );
console.log("should return 0.");

console.log(permAlone("aaabb") );
console.log("should return 12.");


