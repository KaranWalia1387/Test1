var redpinpointimage;

require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
          var outageType = "C";
          var polygonSymbol, polygonGraphic, pts, pt, sym;
          var map = new Map("outage_map_canvas", {
              basemap: "streets",
              zoom: 3
          });

          utils.autoRecenter(map);
          var geocodeService = new Geocoder("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

          on(map, "load", function () {
              drawpolygon();
              $('.GIScurrentlocation').click(function () { showGeolocation(); });
              $('#btnRefresh').click(function () {
                  drawpolygon();
              });
              on(geocodeService, "address-to-locations-complete", geocodeResults);
              on(geocodeService, "error", geocodeError);
              on(dom.byId("GISsearchGoogleMap"), "click", geoSearch);
          });

          function geoSearch() {
              var searchString = dom.byId('GIStxtGoogleSearch').value;
              if (searchString != '') {
                  var result = '';
                  data = comMessages.SearchOutage(searchString, outageType).value;

                  if (data.Tables[0].Rows.length > 0) { drawpolygon(); }
                  else {
                      if (outageType == 'C') {
                          w2alert($("#IDNoOutage").text());
                      }
                      else { w2alert('There are no planned outages reported for this area.'); }
                      return false;
                  }
              }
              else {
                  w2alert('Please enter Zip Code or City.');
                  return false;
              }
          }

          function geocodeResults(places) {
              sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 30, 39);
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
                  w2alert("Sorry, address or place not found.");
              }
          }

          function geocodeError(errorInfo) {
              w2alert("Sorry, place or address not found!");
          }

          function showGeolocation() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
              } else {
                  w2alert("Sorry, your browser doesn't support geolocation.");
              }
          }

          function getCurrentLocation(position) {
              clearAddGraphics();
              // Create a point
              pt = new Point(position.coords.longitude, position.coords.latitude);
              // Create a symbol and pop-up template and add the graphic to the map
              var symbol = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 30, 39);
              var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
              var infoTemplate = new InfoTemplate("My Location", "Latitude: ${lat} <br/>Longitude: ${lon}");
              var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
              map.graphics.add(graphic);
              // Position the map
              map.centerAndZoom(pt, 13);
          }

          function errorHandler(err) {
              if (err.code == 1) {
                  w2alert("Error: Access is denied!");
              } else if (err.code == 2) {
                  w2alert("Error: Position is unavailable!");
              } else
                  w2alert("Error: " + err);
          }

          function createPolygonSymbol() {
              return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
          }

          function drawpolygon() {

              clearAddGraphics();
              polygonSymbol = createPolygonSymbol();
              if (data.Tables[0].Rows.length > 0) {

                  for (var j = 0; j < data.Tables[2].Rows.length; j++) {
                      pts = [];
                      for (var i = 0; i < data.Tables[0].Rows.length; i++) {
                          if (data.Tables[0].Rows[i]["ZipCode"] == data.Tables[2].Rows[j]["ZipCode"]) {
                              pt = new Point(data.Tables[0].Rows[i]["Longitude"], data.Tables[0].Rows[i]["Latitude"]);
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
                          map.centerAndZoom(pt, 11);
                      }
                  }
              }

              if (data.Tables[1].Rows.length > 0) {
                  sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol(redpinpointimage, 30, 51) : new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_blue.svg', 30, 51);
                  var place, attributes, infoTemplate, pt, graphic;
                  for (var i = 0; i < data.Tables[1].Rows.length; i++) {
                      pt = new Point(data.Tables[1].Rows[i]["OutageLongitude"], data.Tables[1].Rows[i]["OutageLatitude"]);
                      var infoStatus = data.Tables[1].Rows[i]["Status"];
                      infoStatus = outageType == 'C' ? "Status: " + infoStatus : '';
                      var restorationtime = '';
                      if (data.Tables[1].Rows[i]["RestorationTime"] != null)
                          restorationtime = "Estimated Restoration Time: " + data.Tables[1].Rows[i]["RestorationTime"] + " hrs";
                      attributes = { Title: data.Tables[1].Rows[i]["Title"], Area: data.Tables[1].Rows[i]["Area"], Status: infoStatus, RestorationTime: restorationtime };
                      infoTemplate = new InfoTemplate("Outage", "<b>${Title}</b><br/>${Area}<br/>${Status}<br/>${RestorationTime}");
                      graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                  }
              }
          }

          function clearAddGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
              polygonGraphic = null;
              pts = null;
              polygonSymbol = null;
          }

          $(document).ready(function () {
              redpinpointimage = "images/outages/energy_icon_red.png";
              bluepinpointimage = "images/outages/energy_icon_blue.png";

              data = comMessages.loadLatLongService(outageType).value

              //Vivek Code For Css Based Tab Buttons of Current & Planned Image
              $('.outageType a').click(function () {
                  outageType = $(this).attr('key');
                  $(this).parent().find('div').each(function () { $('.outageType a div').addClass('TabBtns').removeClass('TabBtns_ro'); });
                  $(this).find('div').addClass('TabBtns_ro').removeClass('TabBtns');
                  data = comMessages.loadLatLongService(outageType).value;
                  clearAddGraphics();
                  drawpolygon();
              });
          });
      });