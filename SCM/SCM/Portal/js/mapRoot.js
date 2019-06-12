var data, roww, map, pt;
var initialLocation, lat, long;

require(["esri/map", "esri/geometry/Point", "esri/tasks/locator", "esri/tasks/RouteTask", "esri/tasks/RouteParameters", "esri/tasks/FeatureSet", "esri/SpatialReference",
   "esri/units", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/promise/all", "dojo/on", "dojo/dom", "dojo/domReady!"],
   function (Map, Point, Geocode, Directions, RouteParameters, FeatureSet, SpatialReference, Units, Graphic, SimpleLineSymbol, InfoTemplate, utils, all, on, dom) {
       "use strict"
    
       var geocodeService;
       var directionsService;
       var directions;
       var directionsList;
        map = new Map("mapDiv", {
           basemap: "streets",
          // center: [-117, 34],
           zoom: 5
       });

       utils.autoRecenter(map);
       geocodeService = new Geocode("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
       on(geocodeService, "error", errorHandler);

       directionsService = new Directions("http://tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route");
       on(directionsService, "solve-complete", showRoute);
       on(directionsService, "error", errorHandler);
       directionsList = dom.byId('directionsList')
      // calculateDirections();
       on(map, "load", function () {
          
           showGeolocation();
         //  calculateDirections();
       });

       function showGeolocation() {
           try {
               if (navigator.geolocation) {
                   //  navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                   navigator.geolocation.getCurrentPosition(calculateDirections, errorHandler);

               } else {
                   alert("Sorry, your browser doesn't support geolocation.");
               }
           }
           catch (e)
           { }
       }

       function getCurrentLocation(position) {
          
           try {
               // clearAddGraphics();
               calculateDirections(position);
               // Create a point
               //lat = position.coords.longitude;
               //long = position.coords.latitude;
               pt = new Point(position.coords.longitude, position.coords.latitude);
               // Create a symbol and pop-up template and add the graphic to the map
               var symbol = new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_red.png', 35, 35);
               var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
               var infoTemplate = new InfoTemplate("My Location", "Latitude: ${lat} <br/>Longitude: ${lon}");
               var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
               map.graphics.add(graphic);
               // Position the map
               map.centerAndZoom(pt, 8);
           }
           catch (e)
           { }
       }

       function calculateDirections(position) {
           try {
               // Get the geocode candidates
               //              var start = geocodeResults[0][0];
               //              var stop = geocodeResults[1][0];
               //var start = new Point(position.coords.longitude, position.coords.latitude);
               //var stop = new Point(long, lat);
               //pt = new Point(long, lat);
               var start = new Point(77.329999999999930000, 28.580000000000000000);
               var stop = new Point(117.732584799999980000, 33.989818800000000000);
            //   var start = new Point(77.233330, 28.609115);


               //var stop = new Point(-117, 34);


               //              if (!start || !stop) {
               //                  utils.setStyle("progress", "progress hidden");
               //                  alert("Sorry, " + (!start ? "Start" : "End") + " address not found! Please try again.");
               //                  return;
               //              } else {
               // Clear old graphics
               // map.graphics.clear();
               //segmentGraphic = null;
               //Setup the route parameters 
               var routeParams = new RouteParameters();
               routeParams.returnRoutes = false;
               routeParams.returnDirections = true;
               routeParams.directionsLengthUnits = Units.MILES;
               routeParams.outSpatialReference = map.spatialReference;
               routeParams.stops = new FeatureSet();

               // Add the graphics to define route stops
               var startGraphic = addPtGraphic("Start", start);
               var stopGraphic = addPtGraphic("End", stop);
               routeParams.stops.features[0] = startGraphic;
               routeParams.stops.features[1] = stopGraphic;

               //use the routing task to create a shortest path between those two located address points
               directionsService.solve(routeParams);
               //}
           }
           catch (e)
           { }
       }

       function showRoute(results) {
           try {
               var routeInfo = results.result;  // 3.5
               if (routeInfo) {
                   if (routeInfo.routeResults && routeInfo.routeResults.length > 0) {
                       directions = routeInfo.routeResults[0].directions;
                       //  Add route to map
                       addLineGraphic(directions.mergedGeometry, [255, 0, 0, 0.5], null, null, true);
                       // Zoom to route
                       map.setExtent(directions.mergedGeometry.getExtent().expand(2.0));
                       // Show turn-by-turn directions
                       showDirections(directions);
                   }
               }
               else {
                   alert("Could not find route.");
               }
               //utils.setStyle("progress", "progress hidden");
           }
           catch (e)
           { }
       }

       function addPtGraphic(type, place) {
           
           try {
               var symbol;
               if (type == "Start")
                   symbol = utils.createPictureSymbol("images/outages/energy_icon_red.png", 0, 10, 24);
               else
                   symbol = utils.createPictureSymbol("images/outages/energy_icon_red.png", 0, 10, 24);
               // Add graphic to map 
               //var attributes = { address: place.address, score: place.score, lat: place.location.y.toFixed(2), lon: place.location.x.toFixed(2) };
               //var infoTemplate = new InfoTemplate(type, "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='zoomToPlace(" + place.location.x.toFixed(2) + "," + place.location.y.toFixed(2) + ",15)';>Zoom To</span>");
               var graphic = new Graphic(place, symbol);
               map.graphics.add(graphic);
               if (graphic.getDojoShape()) {
                   graphic.getDojoShape().moveToFront();
               }
               return graphic;
           }
           catch (e)
           { }
       }

       function addLineGraphic(line, color, title, text, moveToBack) {
           try {
               var symbol = new SimpleLineSymbol().setColor(new dojo.Color(color)).setWidth(4);
               var infoTemplate;
               if (title && text)
                   infoTemplate = new InfoTemplate(title, text);
               var graphic = new Graphic(line, symbol, null, infoTemplate);
               map.graphics.add(graphic);

               if (graphic.getDojoShape()) {
                   if (graphic && moveToBack)
                       graphic.getDojoShape().moveToBack();
                   else
                       graphic.getDojoShape().moveToFront();
               }
               return graphic;
           }
           catch (e)
           { }
       }

       function showDirections(directions) {
           
           try {
               var dirStrings = [];
               for (var i = 0; i < directions.features.length; i++) {
                   var feature = directions.features[i];
                   if (i == 0 || i == directions.length - 1)
                       feature.attributes.text = feature.attributes.text;
                   else
                       feature.attributes.text = feature.attributes.text + " (" + feature.attributes.length.toFixed(2) + " miles)";
                   dirStrings.push("<li id=item" + i + ">" + feature.attributes.text + "</li>");
               }
               directionsList.innerHTML = dirStrings.join("");
               //var lbl = dom.byId("infoTotals");
               //lbl.innerHTML = formatDistance(directions.totalLength, "mile(s)") + " " + formatTime(directions.totalTime);

               //utils.setStyle("infoPanel", "info-panel visible");
               //utils.setStyle("mapDiv", "map infoPosition");
               //map.resize();
           }
           catch (e)
           { }
       }

       function errorHandler(error) {
           alert(error.error.message);
           map.centerAndZoom(pt, 8);
       }
   });


$(document).ready(function () {
    
    try {
        var url = document.location.href;
        var query = url.split('?')[1].split('=')[1].split(',');
        lat = query[1];
        long = query[0];
    }
    catch (e)
    { }
});
