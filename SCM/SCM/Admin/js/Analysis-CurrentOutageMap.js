var data, roww, map;
var initialLocation;
var PEVLocations;
var outagedata;
var outageinfo;

function createmap(data,mapId) {


    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                  //START
                  //var city = "";
                  //var zip = "";//($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
                  //var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
                  //var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
                  //var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();

                  //var ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
                  //var custname = '';

                  //
                  //   var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
                  //if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                  //    var ddlCity = $('#ddlCity option:selected');
                  //    if ($(ddlCity).attr('key') == 'CityName') {
                  //        city = $(ddlCity).val();
                  //    }
                  //    if ($(ddlCity).attr('key') == 'Zipcode') {
                  //        zip = $(ddlCity).val();
                  //    }
                  //}

                  //if ((city == '' && zip == '' && ddlOutageType == '')) {
                  //    mode = 1;
                  //}
                  //else {

                  //    mode = (city != '') ? 2 : 1;

                  //    if (zip != '') {
                  //        mode = 3;
                  //    }

                  //    if ((city != '' || zip != '') && ddlOutageType != '') {
                  //        mode = 4;
                  //    }
                  //    else if (ddlOutageType != '') {
                  //        mode = 5;
                  //    }
                  //}
                  //END
                  outagetable = data;
                  // var outageType = "C";
                  var polygonSymbol, polygonGraphic, pts, pt, sym;
                  $('#' + mapId).html('');
                  var map = new Map(mapId, {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16
                  });

                  utils.autoRecenter(map);
                  var geocodeService = new Geocoder(window.location.protocol + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

                  showGeolocation();

                  //drawpolygon();
                  on(map, "load", function () {
                      try {
                          showGeolocation();
                          $('#btnFilter').click(function () {
                              //outagedata = (mode > 1 && mode != 5) ? OutageTable.Tables[2].Rows : OutageTable.Tables[3].Rows; // outagetable.Tables[0];
                              outagedata = data;
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

                  function getCurrentLocation(position) {

                      try {
                          map.graphics.clear();
                          outagedata = data;
                          var symbol, attributes, infoTemplate, graphic;
                          
                          for (var i = 0; i < outagedata.length; i++) {
                              pt = new Point(outagedata[i]["Longitude"], outagedata[i]["Latitude"]);
                              if (mapId == "div-RestoreUnrestore") {
                                  symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-red.png', 30, 40);

                                  var customersAffected = outagedata[i]["CustomersAffected"];
                                  var restoredstatus = outagedata[i]["RestoredStatus"];
                                  var title = '<b>Outage Report:</b> ' + restoredstatus;

                                  attributes = { "City": restoredstatus, "Title": title, "total": customersAffected };
                                  infoTemplate = new InfoTemplate(restoredstatus, "<p style='text-align:left'>${Title}<br/><b>TotalOutages:</b>${total}<br/>");
                                  graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                                  map.graphics.add(graphic);
                              }
                              else {
                                  // Create a symbol and pop-up template and add the graphic to the map
                                  if (outagedata[i]["Severity"] == "Low") {
                                      symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-green.png', 30, 40);
                                  }
                                  else if (outagedata[i]["Severity"] == "Medium") {
                                      symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-yellow.png', 30, 40);
                                  }
                                  else if (outagedata[i]["Severity"] == "High") {
                                      symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-orange.png', 30, 40);
                                  }
                                  else if (outagedata[i]["Severity"] == "Critical") {
                                      symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-red.png', 30, 40);
                                  }

                                  var city = outagedata[i]["CityName"];
                                  var title = '<b>Outage Report:</b> ' + city;
                                  var severity = outagedata[i]["Severity"];//0005050: Outage report filter dates are appeared in Outage-Report-Map pinned popup which is not a case
                                  var customersAffected = outagedata[i]["CustomersAffected"];
                                  var zip = outagedata[i]["ZipCode"];
                                  //var plan = outagedata.Rows[i]["PlannedOutages"];

                                  attributes = { "total": customersAffected };
                                  infoTemplate = new InfoTemplate(city, "<p style='text-align:left'><b>Customers Affected:</b>${total}</p>");
                                  graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                                  map.graphics.add(graphic);
                              }


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

$(document).ready(function () {

    $("#mapView").click(function () {
        var mapId = '';
        $('#chartDiv').hide();
        $("#mapDiv").show();
        $('#mapDiv2').css('display', 'block');
        $('#mapDiv3').css('display', 'block');
        $('#mapDiv4').css('display', 'block');
        if (Outagetable.Tables[0].Rows.length > 0) {
            mapId = "div-CurrentOutageMap";
            createmap(Outagetable.Tables[0].Rows, mapId);
        }
        if (Outagetable.Tables[2].Rows.length > 0) {
            mapId = "div-CurrentUnrestored";
            createmap(Outagetable.Tables[2].Rows, mapId);
        }
        if (Outagetable.Tables[4].Rows.length > 0) {
            mapId = "div-RetoreNextDay";
            createmap(Outagetable.Tables[4].Rows, mapId);
        }
        if (Outagetable.Tables[5].Rows.length > 0) {
            mapId = "div-RestoreUnrestore";
            createmap(Outagetable.Tables[5].Rows, mapId);
        }
    });

    //$("#mapDiv").css('margin-y:');

});


