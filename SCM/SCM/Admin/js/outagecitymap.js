var data, roww, map;
var initialLocation;
var PEVLocations;
var outagedata;
var outageinfo;
$(document).ready(function () {
});


require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
          "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
          function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
              outagetable = OutageCity.LoadGridData($('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '', '', '').value;
              // var outageType = "C";
              var polygonSymbol, polygonGraphic, pts, pt, sym;
              var map = new Map("div-OutageCitymap", {
                  basemap: "streets",
                  zoom: 3,
                  minZoom: 3,
                  maxZoom: 16
              });

              utils.autoRecenter(map);
              var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

             // showGeolocation();

              drawpolygon();
              on(map, "load", function () {
                  try {
                      drawpolygon();
                      on(geocodeService, "address-to-locations-complete", geocodeResults);

                      $('#btnFilter').click(function () {

                          outagedata = outagetable.Tables[0];
                          if (outagedata.Rows.length != '0') {
                              $("#mapDiv").show();
                              $('#nodata_div').hide();
                              drawpolygon();
                          }
                          else {
                              $("#mapDiv").hide();
                              $('#nodata_div').show();
                          }
                      });
                  }
                  catch (e)
                  { }
              });

              function geocodeResults(places) {
                  try {
                      sym = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 40, 40);
                      if (places.addresses.length > 0) {
                          clearAddGraphics();
                          // Objects for the graphic
                          var place, attributes, infoTemplate, pt, graphic;
                          // Create and add graphics with pop-ups
                          for (var i = 0; i < places.addresses.length; i++) {
                              place = places.addresses[i];
                              pt = place.location;
                              attributes = { address: place.address, score: place.score, lat: pt.y.toFixed(2), lon: pt.x.toFixed(2) };
                              infoTemplate = new InfoTemplate("Geocode Result", "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='window.zoomToPlace(" + pt.x + "," + pt.y + ",15)';>Zoom To</span>");
                              graphic = new Graphic(pt, sym, attributes, infoTemplate);
                              map.graphics.add(graphic);
                          }
                          map.centerAndZoom(places.addresses[0].location, 8);
                      } else {
                          alert("Sorry, address or place not found.");
                      }
                  }
                  catch (e)
                  { }
              }

              function geocodeError(errorInfo) {
                  alert("Sorry, place or address not found!");
              }

              function showGeolocation() {
                  try {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                      } else {
                          alert("Sorry, your browser doesn't support geolocation.");
                      }
                  }
                  catch (e)
                  { }
              }

              function getCurrentLocation(position) {

                  try {
                      // Create a point
                      outagedata = outagetable.Tables[0];
                      for (var i = 0; i < outagedata.Rows.length; i++) {
                          pt = new Point(outagedata.Rows[i]["Longitude"], outagedata.Rows[i]["Latitude"]);
                          // Create a symbol and pop-up template and add the graphic to the map
                          var symbol = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 35, 35);
                          var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
                          var infoTemplate = new InfoTemplate("My Location", "Latitude: ${lat} <br/>Longitude: ${lon}");
                          var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                          map.graphics.add(graphic);
                          // Position the map
                          map.centerAndZoom(pt, 12);
                      }
                  }
                  catch (e)
                  { }
              }

              function errorHandler(err) {
                  try {
                      if (err.code == 1) {
                          alert("Error: Access is denied!");
                      } else if (err.code == 2) {
                          alert("Error: Position is unavailable!");
                      } else
                          alert("Error: " + err);
                  }
                  catch (e)
                  { }
              }

              function createPolygonSymbol() {
                  try {
                      return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
                  }
                  catch (e)
                  { }
              }



              function drawpolygon() {


                  try {
                      outagedata = outagetable.Tables[0];
                      clearAddGraphics();
                      polygonSymbol = createPolygonSymbol();
                      if (outagetable.Tables[0].Rows.length > 0) {
                          for (var j = 0; j < outagetable.Tables[2].Rows.length; j++) {
                              pts = [];
                              for (var i = 0; i < outagetable.Tables[0].Rows.length; i++) {
                                  if (outagetable.Tables[0].Rows[i]["ZipCode"] == outagetable.Tables[2].Rows[j]["ZipCode"]) {
                                      pt = new Point(outagetable.Tables[0].Rows[i]["Longitude"], outagetable.Tables[0].Rows[i]["Latitude"]);
                                      pts.push(pt);
                                  }
                              }

                              if (pts.length > 1) {
                                  var polygon = new Polygon(pt.spatialReference);
                                  polygon.addRing(pts);
                                  polygonSymbol.setColor(outageType == 'C' ? new Color([255, 0, 0, 0.25]) : new Color([229, 107, 8, 0.25]));
                                  polygonGraphic = new Graphic(polygon, polygonSymbol);
                                  map.graphics.add(polygonGraphic);
                                  polygonGraphic = null;
                                  pts = null;
                                  map.centerAndZoom(pt, 13);
                              }
                          }

                          //for pinpont of center
                          if (outagetable.Tables[0].Rows.length > 0) {
                              sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol('../images/outages-power-red.png', 30, 51) : new esri.symbol.PictureMarkerSymbol('../images/outages-power-yellow.png', 30, 51);
                              var place, attributes, infoTemplate, pt, graphic;
                              pt = new Point(outagetable.Tables[0].Rows[0]["Longitude"], outagetable.Tables[0].Rows[0]["Latitude"]);
                             
                              graphic = new Graphic(pt, sym);
                              map.graphics.add(new Graphic(pt, sym));
                              map.centerAndZoom(pt, 13);
                          }
                      }
                  }
                  catch (e)
                  { }

              }


              function clearAddGraphics() {
                  map.infoWindow.hide();
                  map.graphics.clear();
                  polygonGraphic = null;
                  pts = null;
                  polygonSymbol = null;
              }
          });