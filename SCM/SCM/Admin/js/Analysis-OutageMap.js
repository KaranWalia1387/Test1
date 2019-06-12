//var map;
$(document).ready(function () {
    $("#mapView").click(function () {
        CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
        $('#chartDiv').hide();
        $("#mapDiv").show();
    });
});


function CreateMap(outageMapTableData, divId) {
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
                          $('#btnFilter').click(function () {
                              outagedata = outageMapTableData;
                              if (outagedata.length != '0') {
                                  showGeolocation();
                              }
                          });
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

                          for (var i = 0; i < outageMapTableData.length; i++) {

                              pt = new Point(outageMapTableData[i]["Longitude"], outageMapTableData[i]["Latitude"]);
                              // Create a symbol and pop-up template and add the graphic to the map
                              if (outageMapTableData[i].Severity == 'Low') {
                                  var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-green.png', 30, 40);
                              }
                              else if (outageMapTableData[i].Severity == 'Medium') {
                                  var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-yellow.png', 30, 40);
                              }
                              else if (outageMapTableData[i].Severity == 'High') {
                                  var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-orange.png', 30, 40);
                              }
                              else if (outageMapTableData[i].Severity == 'Critical') {
                                  var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-red.png', 30, 40);
                              }

                              var outageDate = outageMapTableData[i].OutageDate;
                              var location = outageMapTableData[i].CityName + '-' + outageMapTableData[i].ZipCode;
                              var severity = outageMapTableData[i].Severity;

                              var attributes = { "Location": location, "OutageDate": outageDate, "Severity": severity };
                              var infoTemplate = new InfoTemplate(location, "<p style='text-align:left'>Outage Date<b> ${OutageDate}</b><br/>Location<b> ${Location}</b><br/> Severity<b> ${Severity}</b><br/>");
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