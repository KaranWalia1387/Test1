var map;
$(document).ready(function () {
    $("#mapView").click(function () {
        ismap = true;
        $('#chartDiv').hide();
        $("#mapDiv").show();
        CreateMap(CustomerTable.value.Tables[1].Rows, 'div-CustomerMap');
    });
});


function CreateMap(customerMapTableData, divId) {
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {

                  var polygonSymbol, polygonGraphic, pts, pt, sym;
                  $('#' + divId).html('');
                  var map = new Map(divId, {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16
                  });

                  utils.autoRecenter(map);
                  var geocodeService = new Geocoder(window.location.protocol + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

                  on(map, "load", function () {
                      try {
                          showGeolocation();
                          plotlocation();
                      }
                      catch (e) {
                          alert(e.message)
                      }
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

                  function plotlocation(position) {

                      try {
                          map.graphics.clear();

                          for (var i = 0; i < customerMapTableData.length; i++) {

                              pt = new Point(customerMapTableData[i]["Longitude"], customerMapTableData[i]["Latitude"]);

                              // Create a symbol and pop-up template and add the graphic to the map
                              var symbol = new esri.symbol.PictureMarkerSymbol('../images/user-icon.png', 30, 40);

                              var customerName = customerMapTableData[i].CustomerName;
                              var location = customerMapTableData[i].Address + ', ' +customerMapTableData[i].CityName + '-' + customerMapTableData[i].ZipCode;
                              var customerType = customerMapTableData[i].CustomerType;

                              var attributes = { "Location": location, "CustomerName": customerName, "CustomerType": customerType };
                              var infoTemplate = new InfoTemplate(customerName, "<p style='text-align:left'>Location:<b> ${Location}</b><br/> Customer Type:<b> ${CustomerType}</b><br/>");
                              var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                              map.graphics.add(graphic);
                              // Position the map

                              map.centerAndZoom(pt, 10);
                              // map.zoomEnd(0);
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


                  function clearAddGraphics() {
                      map.infoWindow.hide();
                      map.graphics.clear();
                      polygonGraphic = null;
                      pts = null;
                      polygonSymbol = null;
                  }
              });
}