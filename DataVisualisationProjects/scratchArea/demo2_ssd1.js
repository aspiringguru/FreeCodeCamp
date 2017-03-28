d3.csv("demo2.csv", function(data) {
  console.log(data[0]);
  data.forEach(function(d) {
    d.population = +d.population;
    d["land area"] = +d["land area"];
  });
  console.log(data[0]);
});