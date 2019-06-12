var data, roww, map;
var initialLocation;


require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {

          var sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 30, 39);
          var textSymbol;
          map = new Map("electric_map_canvas", {
              basemap: "streets",
              zoom: 3
          });
          utils.autoRecenter(map);
          var geocodeService = new Geocoder("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

          on(map, "load", function () {
              on(geocodeService, "address-to-locations-complete", geocodeResults);
              on(geocodeService, "error", geocodeError);
              getapidata();
             
          });

          function getapidata() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function (geocodePosition) {
                      initialLocation = new esri.geometry.Point(geocodePosition.coords.longitude, geocodePosition.coords.latitude);
                      var result = charging_stations_api.GetApiLocations(geocodePosition.coords.latitude, geocodePosition.coords.longitude).value;
                      var parsedjson = jQuery.parseJSON(result);
                      plotapilocations(parsedjson);
                  })
              }

          }

          function getDistanceSorted() {
              var distanceSorted, temp;
              var distarr = new Array();
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function (geocodePosition) {
                      initialLocation = new esri.geometry.Point(geocodePosition.coords.longitude, geocodePosition.coords.latitude);
                      var result = charging_stations_api.GetApiLocations(33.989819000000004, -117.732585).value;
                      var parsedjson = jQuery.parseJSON(result);
                      for (var j = 0; j < CSinitiallocations.Rows.length; j++) {
                          distarr[j] = distanceLatLon(initialLocation, new esri.geometry.Point(CSinitiallocations.Rows[j].Longitude, CSinitiallocations.Rows[j].Latitude));
                      }
                      distanceSorted = CSinitiallocations;
                      for (var m = 1; m < CSinitiallocations.Rows.length; m++) {
                          distanceSorted.Rows[m] = CSinitiallocations.Rows[m];
                          for (var n = m; n > 0; n--) {
                              if (parseFloat(distarr[n]) < parseFloat(distarr[n - 1])) {
                                  temp = distanceSorted.Rows[n - 1];
                                  distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                                  distanceSorted.Rows[n] = temp;
                                  temp = distarr[n - 1];
                                  distarr[n - 1] = distarr[n];
                                  distarr[n] = temp;
                              }
                          }
                      }
                      addpp(distanceSorted, false, geocodePosition);
                  });
              }
              else {
                  alert('Geolocation is not supported by this browser.');
              }
          }

       

          function addpp(locationstoplot, flag, locationcurrent) {
              if (flag) {
                  if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(function (position) {
                          plotPicPoint(locationstoplot, position);
                      });
                  } else {
                      alert("Sorry, your browser doesn't support geolocation.");
                  }
              }
              else {
                  plotPicPoint(locationstoplot, locationcurrent);
              }
          }

          function plotapilocations(data) {
              var leftPanelHTML = '';
              for (var i = 0; i < data.fuel_stations.length; i++) {
                  var distance = data.fuel_stations[i].distance + ' Miles';
                  var locName = data.fuel_stations[i].station_name;
                  var address = data.fuel_stations[i].street_address + ',' + data.fuel_stations[i].city + ',' + data.fuel_stations[i].state + ',' + data.fuel_stations[i].zip;
                  leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + data.fuel_stations[i].longitude + "," + data.fuel_stations[i].latitude + '"/>';
                  leftPanelHTML += '<table>';
                  leftPanelHTML += '<tr><td rowspan="5"><img  src="images/pin.svg"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                  leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
                  leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
                  leftPanelHTML += '<tr><td>' + distance + '</td></tr>';
                  leftPanelHTML += '</table></div>';
                  attributes = { address: address, locName: locName };
                  infoTemplate = new InfoTemplate("CHARGING STATION", "${locName}<br />${address}");
                  pt = new esri.geometry.Point(data.fuel_stations[i].longitude, data.fuel_stations[i].latitude, new esri.SpatialReference({ wkid: 4326 }))
                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                  map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                  textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 2);
                  map.graphics.add(new Graphic(pt, textSymbol, attributes));
                  map.setLevel(10);
                  map.centerAt(new esri.geometry.Point(data.fuel_stations[0].longitude, data.fuel_stations[0].latitude, new esri.SpatialReference({ wkid: 4326 })));
              }

              $('#LeftPanel').html(leftPanelHTML);

              $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
                  $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
                  $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
                  $(this).addClass('MessageContainerActive');
                  var latlng = $(this).find('input').val();
                  map.centerAndZoom(new Point(latlng.split(',')[0], latlng.split(',')[1]), 14);
              });
          }

          function plotPicPoint(locationstoplot, position) {
              var leftPanelHTML = '';
              PEVLocations = locationstoplot;
              initialLocation = new Point(position.coords.longitude, position.coords.latitude);
              var place, attributes, infoTemplate, pt, graphic;
              for (var i = 0; i < PEVLocations.Rows.length; i++) {
                  var destinLocation = new Point(PEVLocations.Rows[i].Longitude, PEVLocations.Rows[i].Latitude);
                  var distance = distanceLatLon(initialLocation, destinLocation) + ' Miles';
                  var locName = PEVLocations.Rows[i].LocationName;
                  var rate = PEVLocations.Rows[i].Rate + PEVLocations.Rows[i].UOM;
                  var address = PEVLocations.Rows[i].Address1;
                  leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + '"/>';
                  leftPanelHTML += '<table>';
                  leftPanelHTML += '<tr><td rowspan="5"><img  src="images/pin.svg"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                  leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
                  leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
                  leftPanelHTML += '<tr><td class="red">Rate: $' + rate + '</td></tr>';
                  leftPanelHTML += '<tr><td>' + distance + '</td></tr>';
                  leftPanelHTML += '</table></div>';
                  attributes = { address: PEVLocations.Rows[i].Address1, rate: PEVLocations.Rows[i].Rate + PEVLocations.Rows[i].UOM };
                  infoTemplate = new InfoTemplate("CHARGING STATION", "${address}<br/>Rate: ${rate}");
                  pt = new esri.geometry.Point(PEVLocations.Rows[i].Longitude, PEVLocations.Rows[i].Latitude, new esri.SpatialReference({ wkid: 4326 }))
                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                  map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                  textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 2);
                  map.graphics.add(new Graphic(pt, textSymbol, attributes));
                  map.setLevel(10);
                  map.centerAt(new esri.geometry.Point(PEVLocations.Rows[0].Longitude, PEVLocations.Rows[0].Latitude, new esri.SpatialReference({ wkid: 4326 })));
              }

              $('#LeftPanel').html(leftPanelHTML);

              $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
                  $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
                  $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
                  $(this).addClass('MessageContainerActive');
                  var latlng = $(this).find('input').val();
                  map.centerAndZoom(new Point(latlng.split(',')[0], latlng.split(',')[1]), 14);
              });
          }


          $('#btnDistance').click(function () {
              getDistanceSorted();
              $(this).attr('src', 'images/Electric_distance_btn_ro.png');
              $('#btnRate').attr('src', 'images/Electric_rate_btn.png');
          });
          $('#btnRate').click(function () {
              addpp(getRateSorted(), true);
              $(this).attr('src', 'images/Electric_rate_btn_ro.png');
              $('#btnDistance').attr('src', 'images/Electric_distance_btn.png');
          });

          $('#searchESRIMap').click(function () {
              geoSearch();
          });


        
          function geocodeResults(places) {
              if (places.addresses.length > 0) {
                  var place, attributes, infoTemplate, pt, graphic;
                  place = places.addresses[0];
                  pt = place.location;
                  attributes = { address: place.address, score: place.score, lat: pt.y.toFixed(2), lon: pt.x.toFixed(2) };
                  infoTemplate = new InfoTemplate("Searched Location", "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='window.zoomToPlace(" + pt.x + "," + pt.y + ",15)';>Zoom To</span>");
                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                  map.centerAt(pt);
                  $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
                      addpp(PEVLocations, true);
                  });
              } else {
                  alert("Sorry, address or place not found.");
              }
          }

          function geocodeError(errorInfo) {
              alert("Sorry, place or address not found!");
          }


          function geoSearch() {

              var searchString = dom.byId('txtMapSearch').value;
              var boundingBox;
             
              // Set geocode options
              var options = {
                  address: { "SingleLine": searchString },
                  outFields: ["Loc_name", "Place_addr"],  // Coming soon: Place_addr will contain full address for POI locations!
                  searchExtent: boundingBox
              }
              // Execute geosearch
              geocodeService.addressToLocations(options);
             
          }

        
          function clearFindGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
          }
      });