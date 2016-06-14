$(document).ready(function() {
  var lon;
  var lat;
  var tempC;
  var tempF;

  //todo: get geolocation from another service to it works on codepen

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      console.log("position.coords.latitude=" + lat);
      console.log("position.coords.longitude=" + lon);
      $("#dataLat").html("lat:"+lat);
      $("#dataLon").html("lon:"+lon);

    var units = "metric";
    //NB: use this url with 'id=blah' if need to pull location from openweathermap.org.
    //var api = "http://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=ac4bcbd029d597f5ac1f0dfd51d470b7&units=" + units;
    //NB: drop id parameter and add lat & lon parameter to url call on the api.
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=ac4bcbd029d597f5ac1f0dfd51d470b7&units=" + units;
    $.getJSON(api, function(data) {
      //console.log("lon=" + data.coord.lon);
      //console.log("lat=" + data.coord.lat);
      //var weatherType = data.weather[0].description;
      tempC = (data.main.temp).toFixed(1);//NB: we specified units='metric'
      tempF = (tempC*1.8+32).toFixed(1);
      var windSpeed = (data.wind.speed*3.6).toFixed(1);
      var windSpeedImp = (windSpeed*0.621371).toFixed(1);
      var city = data.name;
      var weatherType = data.weather[0].description;
      var metric = true;
      //console.log("weatherType="+weatherType);
      console.log("tempC="+tempC);
      console.log("tempF="+tempF);
      console.log("windSpeed="+windSpeed);
      console.log("weatherType="+weatherType);
      console.log("city="+city);
      console.log("api="+api);
      $("#dataWindspeed").html("WindSpeed:"+windSpeed+" km/hr");
      $("#dataCity").html("Location:"+city);
      $("#weatherType").html("Weather Type:"+weatherType);
      $("#tempF").html("tempF:"+tempF);
      $("#tempC").html("tempC:"+tempC);
      $("#temp").html(" "+tempC+"&#8451;");//NB: default to metric.
      $("#temp").click(function(){
        metric = !metric;
        if(metric){
          console.log("metric is true");
          $("#temp").html(" "+tempC+"&#8451;");
          $("#dataWindspeed").html("WindSpeed:"+windSpeed+" km/hr");
        } else {
          console.log("metric is false");
          $("#temp").html(" "+tempF+"&#8457;");
          $("#dataWindspeed").html("WindSpeed:"+windSpeedImp+" mph");
        }
      });
      //logic for background image changing with weather, use case for simplicity.
      if(tempC>40){
        imageUrl = "https://wallpaperscraft.com/image/morocco_africa_desert_sand_sky_107665_2997x1989.jpg";//desert
      } else if (tempC>30){
        imageUrl = "https://wallpaperscraft.com/image/field_farm_crop_field_crops_109678_602x339.jpg";//open field
      } else if (tempC>20){
        imageUrl = "https://wallpaperscraft.com/image/forest_mountains_summer_landscape_water_90615_1920x1200.jpg";//grassland+lake
      } else if (tempC>10){
        imageUrl = "https://wallpaperscraft.com/image/hoarfrost_trees_emptiness_winter_cold_fog_haze_terribly_frost_gray_hair_62665_2560x1600.jpg";//frost field
      } else {
        imageUrl = "https://wallpaperscraft.com/image/snow_field_trees_buildings_84824_3840x2160.jpg";//snow
      }
      console.log("imageUrl="+imageUrl);
      //updates the css property of body and setting background image.
      $('body').css('background-image', 'url(' + imageUrl + ')');

    });//end $.getJSON(api, function(data)
  });//end navigator.geolocation.getCurrentPosition
 
}//end if (navigator.geolocation) {

});//end $(document).ready(function()