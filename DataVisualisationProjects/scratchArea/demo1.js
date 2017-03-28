var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");

svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
    	  .attr("class", "bar")
          //.attr("height","250")//fix height
          //.attr("height", function(d, i) {return (d)})
          .attr("height", function(d, i) {return (d * 10)})//mult height x 10 for scaling
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60) + 25})
          //.attr("y","50");
          .attr("y", function(d, i) {return 400 - (d * 10)});//repositions vertical bars with base @ common reference point.
          //lines below provide same functionality as stroke & stroke-width in .css
          //.attr("stroke", "black")
          //.attr("stroke-width", "5");

svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d;})
    	  .attr("class", "text") //assigning class enables css to format
          //next 2 lines position text @ top of columns.
          //.attr("x", function(d, i) {return (i * 60) + 25})
          //.attr("y", function(d, i) {return 400 - (d * 10)});
          //next two lines float text above the bars & centers over bar centre.
          .attr("x", function(d, i) {return (i * 60) + 36})
          //.attr("y", function(d, i) {return 390 - (d * 10)});
          //move text from above bars to inside top of bars. 
          //nb: needs .css to assign colour diff to bars for visibility
          .attr("y", function(d, i) {return 415 - (d * 10)});