var type = (function(global) {
    var cache = {};
    return function(obj) {
        var key;
        return obj === null ? 'null' // null
            : obj === global ? 'global' // window in browser or global in nodejs
            : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
            : obj.nodeType ? 'object' // DOM element
            : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
            || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
    };
}(this));


d3.json("GDP-data.json", function(data) {
  console.log(data);
  console.log(data.id, type(data.id));
  console.log(data.source_name, type(data.source_name));
  console.log(data.description, type(data.description));
  console.log(data.data, type(data.data));
  console.log(data.data[0], type(data.data[0]));
  console.log(data.data[1], type(data.data[1]));
  console.log(data.data[1][0], type(data.data[1][0]));
  //console.log(parseDate(data.data[1][0]), type(parseDate(data.data[1][0]));//error
  console.log(data.data[1][1], type(data.data[1][1]));


});