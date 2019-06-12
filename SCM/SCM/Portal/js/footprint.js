var minZoomLevel = 5;
var roww, mapfp, gsvc;
var datafootprint, picpoints, initialLocation, searchdata;
var Mapmode;
var directionsDisplay = null;
var directionsService = null;

// Create a renderer for directions and bind it to the map.
var rendererOptions = {
    map: mapfp,
    suppressMarkers: true
}

var polylineOptionsActual = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 5
};

//Converting degree to radian 
function deg2rad(deg) { return deg * Math.PI / 180.0; }

//Converting radian to degree 
function rad2deg(rad) { return rad / Math.PI * 180.0; }

$(document).ready(function () {    
    try {
        resizegrid();
    }
    catch (e) {
        console.log(e.message);
    }


    try {
        var selected = $('select#ddlAddress option:selected').val().split(":");
        loadFootPrints(selected[4], selected[3]);
        picpoints = datafootprint.Table1;
        Mapmode = $('#hdMapId').val();
        if (Mapmode == "1") {
            directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: polylineOptionsActual })
            loadFPGoogleMapdetails();
        }
        else {
            loadFPdetails();
            $("#Module12").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// FootPrint 
        }
        $("#Module12").removeClass("preLoader");
    }
    catch (e) {
        console.log(e.message);
    }

    $('#selFootPrint').change(function () {
        var Latitude = ''; var Longitude = '';
        var selected = $('select#ddlAddress option:selected').val().split(":");
        if ($('#GIStxtGoogleSearch').val() == '') {
            Latitude = selected[4];
            Longitude = selected[3];
        }
        var url = "GISGreenFootprint.aspx/SearchFP";
        var param = {
            searchString: escape($('#GIStxtGoogleSearch').val()),
            LocationTypeId: $('#selFootPrint option:selected').val(),
            Latitude: Latitude,
            Longitude: Longitude
        };
        $.ajax({
            async: false,
            type: "POST",
            url: url,
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    if ($.parseJSON(response.d)[0]["Status"]==undefined) {
                        picpoints = $.parseJSON(response.d);
                        datafootprint.Table1 = picpoints;
                        if (Mapmode == "1") {
                            SetImage($('#selFootPrint option:selected').val().toString());

                            loadFPGooglemap();
                            //addfilter();
                            LoadGrid();
                            resizegrid();
                        }
                        else
                            loadFPmap();
                    }
                    else {
                        if (Mapmode == "1") {
                            picpoints = [];
                            datafootprint.Table1 = picpoints;
                            SetImage($('#selFootPrint option:selected').val().toString());
                            loadFPGooglemap();
                            LoadGrid();
                            resizegrid();
                        }
                        else
                            loadFPmap();
                    }
                },
            error: OnError,

        });
     
    });

    $("#Map").click(function () {

        $("#footprint_map_canvas").show();
        $("#jqxgrid").hide();
        $("#Text").removeClass('active');
        $(this).addClass('active');
        if (Mapmode == "1") {
            loadFPGooglemap();
        }
    });

    $("#Text").click(function () {
        $("#footprint_map_canvas").hide();
        $("#jqxgrid").show();
        $("#Map").removeClass('active');
        $(this).addClass('active');
      //  addfilter();
        //LoadGrid();
    });
    $('#GIStxtGoogleSearch').keypress(function (e) {
        textInput_onKeyPress(e);
    });
    $('#GISsearchGoogleMap').click(function () {
        if (Mapmode == "1") {
            SearchFootprintgoogle();
        }
    });

    $('.currentlocation').click(function () {
        if (Mapmode == "1") {
            getLocation();
            google.maps.event.addListener(map, 'zoom_changed', function () {
                if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
            });
        }
        else if (Mapmode == "0") {
            {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                } else {
                    toastr.error($('#ErrMsgGeo').text())
                }
            }
        }
    });

    $('.icon_refreshbtn').click(function () {
        Mapmode = $('#hdMapId').val();
        if (Mapmode == "1")
            window.location.reload();
        else {
        }
        return false;
    });
});

function fpdropdownchange(obj) {
    var selectedOption = obj.options[obj.selectedIndex];
    if (Mapmode == "1") {
        SetImage(selectedOption.value.toLowerCase().toString());
        loadFPGooglemap();
        $("#Module12").removeClass("preLoader");
    }
}
function textInput_onKeyPress(e) {
    if (e.keyCode == 13 || e.keyCode == "13") {
        if (Mapmode == "1") {
            SearchFootprintgoogle();
        }
        e.preventDefault();
        return false;
    }
}
function loadFootPrints(selected4, selected3) {
    try {
        var url = "dashboard.aspx/LoadFootPrintsAjax";
        var param = "{lng:'" + selected4 + "', lat:'" + selected4 + "'}";
        $.ajax({
            async: false,
            type: "POST",
            url: url,
            data: param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    datafootprint = $.parseJSON(response.d);
                },
            error: OnError,
        });

    } catch (e) {
        console.log(e.message);
    }
}

//Calls in case of no geolocation or error
function nogeoLocation() {
    loadFootPrints('', '');
    picpoints = datafootprint.Table1;
    loadFPdetails();
}

//Calculating the distance between currentlocation lat-lng and destination lat-lng 
function distanceLatLon(source, destin, unit) {
    var lat1 = source.y;
    var lon1 = source.x;
    var lat2;
    var lon2;
    var theta;
    var dist;
    lat2 = destin.y;
    lon2 = destin.x;
    theta = lon1 - lon2;
    dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
    if (unit == 'K') { dist = dist * 1.609344; }
    else if (unit == 'N') { dist = dist * 0.8684; }
    return dist.toFixed(2);
}

function loadFPdetails() {
    loadddl();
    loadFPmap();
    try {
        LoadGrid();
    }
    catch (e) {

    }
}

function loadddl() {
    try {
        if (datafootprint.Table.length > 0) {
            for (i = 0; i < datafootprint.Table.length; i++) {
                $('#selFootPrint').append($("<option></option>").val(datafootprint.Table[i]["LocationTypeId"]).html(datafootprint.Table[i]["LocationType"]));
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}

function loadFPmap() {

    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic", "esri/tasks/GeometryService", "esri/tasks/ProjectParameters", "esri/SpatialReference",
          "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "esri/tasks/RouteTask", "esri/tasks/RouteParameters", "esri/tasks/FeatureSet", "esri/units",
          "js/utils.js", "dojo/promise/all", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
          function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, GeometryService, ProjectParameters, SpatialReference, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, Directions, RouteParameters, FeatureSet, Units, utils, all, Color, on, dom) {
              "use strict"

              var geocodeService;
              var directionsService;
              var directions;
              var sym = new esri.symbol.PictureMarkerSymbol($('#hdnPinIcon').val(), 36, 47);
              var map = new Map("footprint_map_canvas", {
                  basemap: "streets",
                  zoom: 3,
                  minZoom: 3,
                  maxZoom: 16
              });

              utils.autoRecenter(map);
              geocodeService = new Geocoder(window.location.protocol + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
              on(geocodeService, "error", errorHandler);

              directionsService = new Directions(window.location.protocol + "//tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route");
              on(directionsService, "solve-complete", showRoute);
              on(directionsService, "error", errorHandlerDirections);
           

              /**************************GREEN FOOTPRINT MAP PLOTTING**************************/
              var  attributes, infoTemplate, pt, graphic, textSymbol, previousLine = null;

              function addpp(LocationtypeId) {
                  try {
                      clearGeolocationGraphics();
                      if (picpoints.length == 0) {
                          var selected = $('select#ddlAddress option:selected').val().split(":");
                          pt = new Point(selected[4], selected[3]);
                          map.centerAndZoom(pt, 8);
                      }
                      else {
                          for (var i = 0; i < picpoints.length; i++) {
                              roww = picpoints[i];
                              if (LocationtypeId != "0" && roww.LocationTypeId != LocationtypeId) { continue; }
                              switch (roww.LocationTypeId.toString()) {
                                  case '1': sym = new esri.symbol.PictureMarkerSymbol($('#hdndine').val(), 36, 47); break;
                                  case '2': sym = new esri.symbol.PictureMarkerSymbol($('#hdnentertainment_green').val(), 36, 47); break;
                                  case '3': sym = new esri.symbol.PictureMarkerSymbol($('#hdnpev_green').val(), 36, 47); break;
                                  case '4': sym = new esri.symbol.PictureMarkerSymbol($('#hdnretail_green').val(), 36, 47); break;
                                  case '5': sym = new esri.symbol.PictureMarkerSymbol($('#hdngroceries_green').val(), 36, 47); break;
                                  case '6': sym = new esri.symbol.PictureMarkerSymbol($('#hdndropoff_green').val(), 36, 47); break;
                                  case '7': sym = new esri.symbol.PictureMarkerSymbol($('#hdnOldAppliancesdropoff').val(), 36, 47); break;
                                  default: sym = new esri.symbol.PictureMarkerSymbol($('#hdnPinIcon').val(), 36, 47);
                              }

                              attributes = { address: roww.NAME, lat: roww.Latitude, lon: roww.Longitude, Ttl: roww.FpTitle, Tt2: roww.FpSubtitle, Tt3: roww.NAME, Tt4: parseFloat(roww.Distance).toFixed(2) };

                              infoTemplate = new InfoTemplate(roww.Locationtype, '<strong>' + $('#lblLocationName').text() + "</strong> ${Tt3}<br/><strong>" + $('#lblAddress').text() + ":</strong> ${Ttl}<br/> ${Tt2}<br/><strong>" + $('#lblDistance').text() + ":</strong> ${Tt4} Miles<br/> <img src='" + $('#hdngetDirection').val() + "' class='anchr' latlon = '${lat},${lon}' alt='#' style='cursor:pointer' title='Route' />");
                              pt = new esri.geometry.Point(roww.Longitude,
                                  roww.Latitude,
                                  new esri.SpatialReference({ wkid: 4326 }));
                              graphic = new Graphic(pt, sym, attributes, infoTemplate);
                              map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                              map.centerAndZoom(pt, 8);
                          }
                      }
                  } catch (e) {
                      console.log(e.message);
                  }
              }

              function addppLocation(locations, position) {
                  clearGeolocationGraphics();
                  sym = new esri.symbol.PictureMarkerSymbol($('#hdnPinIcon').val(), 36, 47);
                  initialLocation = new Point(position.coords.longitude, position.coords.latitude);
                  for (var i = 0; i < locations.length; i++) {
                      var destinLocation = new Point(locations[i].Longitude, locations[i].Latitude);
                      var distance = distanceLatLon(initialLocation, destinLocation) + ' Miles';
                      roww = locations[i];
                      attributes = { address: roww.Name, lat: roww.Latitude, lon: roww.Longitude, Ttl: roww.FpTitle, Tt2: roww.FpSubtitle, Tt3: roww.Name, Tt4: distance };
                      infoTemplate = new InfoTemplate(roww.Locationtype, '<strong>' + $('#lblLocationName').text() + "</strong> ${Tt3}<br/> <strong>" + $('#lblAddress').text() + ":</strong> ${Ttl}<br/> ${Tt2}<br/> ${Tt4}<br/> <img src='images/route.png' class='anchr' latlon = '${lat},${lon}' alt='Get Directions to this place' />");
                      pt = new esri.geometry.Point(roww.Longitude, roww.Latitude, new esri.SpatialReference({ wkid: 4326 }))
                      graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                      textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 2);
                      map.graphics.add(new Graphic(pt, textSymbol, attributes));
                      map.centerAndZoom(pt, 8);
                  }
              }

             
              $('#selFootPrint').change(function () {

                  var Latitude = ''; var Longitude = '';
                  var selected = $('select#ddlAddress option:selected').val().split(":");
                  if ($('#GIStxtGoogleSearch').val() == '') {
                      Latitude = selected[4];
                      Longitude = selected[3];
                  }
                  var url = "GISGreenFootprint.aspx/SearchFP";
                  var param = {
                      searchString: escape($('#GIStxtGoogleSearch').val()),
                      LocationTypeId: $('#selFootPrint option:selected').val(),
                      Latitude: Latitude,
                      Longitude: Longitude
                  };
                  $.ajax({
                      async: false,
                      type: "POST",
                      url: url,
                      data: JSON.stringify(param),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success:
                          function (response) {
                              if ($.parseJSON(response.d)[0]["Status"] == undefined) {
                                  picpoints = $.parseJSON(response.d);
                                  datafootprint.Table1 = picpoints;
                                
                                      SetImage($('#selFootPrint option:selected').val().toString());
                                      addpp($('#selFootPrint option:selected').val());


                                      resizegrid();
                                      LoadGrid();
                                     
                                  }
                                  
                              
                             
                          },
                      error: OnError,

                  });

              });
              /**************************GREEN FOOTPRINT MAP PLOTTING**************************/

              on(map, "load", function () {

                  addpp("0");

                  $('.currentlocation').click(function () {
                      showGeolocation();
                  });
                  $('#GISsearchGoogleMap').click(function () {
                      SearchFootprint();
                  });
                  $('.icon_refreshbtn').click(function () {
                      window.location.reload();
                  });
                  /*********To hide Zoom To link*********/
                  $('.esriPopup .actionsPane .action').hide();
                  $('#GIStxtGoogleSearch').keypress(function (e) {
                      placeInput_onKeyPress(e);
                  });
              });

              /**************************CODE FOR EVENTS BINDING**************************/

              $('#btnDistance').click(function () {
                  getDistanceSorted($('#selFootPrint option:selected').text());
              });

              k(".anchr").live('click', function () {
                  var latlng = this.attributes["latlon"].value;
                  calculateDirections(latlng.split(',')[0], latlng.split(',')[1]);
              });


              /**************************CODE FOR EVENTS BINDING**************************/

              /**************************CODE FOR CURRENT LOCATION**************************/
              //To Find current location of user.
              function showGeolocation() {
                  try {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                      } else {
                          toastr.error($('#ErrMsgGeo').text())

                      }
                  }
                  catch (e) { }
              }

              //To Plot current location called by showGeolocation().
              function getCurrentLocation(position) {
                  try {
                      clearGeolocationGraphics();
                      
                      var pt = new Point(position.coords.longitude, position.coords.latitude);
                      var symbol = new esri.symbol.PictureMarkerSymbol($('#hdnuserpinicon').val(), 36, 47);
                      var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
                      var request =
                             {
                                 latlong: pt.y.toFixed(2) + "," + pt.x.toFixed(2)
                             }
                      $.ajax({
                          type: "POST",
                          url: "GISGreenFootprint.aspx/getLocationName",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          data: JSON.stringify(request),
                          success: function (data) {
                              var locName = data.d;
                              var infoTemplate = new InfoTemplate($('#lblMyLocation').text(), $('#lblLatitude').text() + ": ${lat} <br/>" + $('#lblLongitude').text() + ": ${lon} <br/>" + $('#lblLocationName').text() + ": " + locName);
                              //to Hide infotemplate for slide 20
                              infoTemplate = '';
                              attributes = ''
                              var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                              map.graphics.add(graphic);
                              map.centerAndZoom(pt, 8);
                          },

                          error: function (request, status, error) {
                              toastr.error('Error!! ' + request.statusText);
                          }
                      });
                  }
                  catch (e) { }
              }


              //Error handler of showGeolocation()
              function errorHandler(err) {
                  if (err.code == 1) {
                      toastr.error($('#ErrMsgAccessDebied').text())
                  } else if (err.code == 2) {
                      toastr.error($('#ErrMsgUnavailable').text())
                  } else {
                      toastr.error("Error: " + err)
                  }

              }
              function errorHandlerDirections(err) {
                  toastr.error($('#ErrMsgNoRoute').text())
               
              }
              /**************************CODE FOR CURRENT LOCATION**************************/

              /**************************CODE FOR SEARCHING**************************/
              // Listen for enter key
              function placeInput_onKeyPress(e) {
                  if (e.keyCode == 13 || e.keyCode == "13") {
                      SearchFootprint();
                      e.preventDefault();
                      return false;
                  }
              }


              // Geocode against the user input
              function SearchFootprint() {
                  try {
                      toastr.clear();
                      var searchString = dom.byId('GIStxtGoogleSearch').value;
                      if (searchString.trim() != '') {
                          searchText(searchString);

                          if (parseInt(searchdata[0].Status) <= 0) {
                              //Ref bug Id=12942
                              $('#GIStxtGoogleSearch').val("");
                              toastr.error(searchdata[0].Message);

                              return false;
                          } else {
                              picpoints = searchdata;

                              if (Mapmode == "1") {
                                  datafootprint.Table1 = searchdata;
                                  LoadGrid();
                                  loadFPGoogleMapdetails();
                              } else {
                                  // loadFootPrints("", "");                                  
                                  datafootprint.Table1 = searchdata;
                                  LoadGrid();
                                  addpp($('#selFootPrint option:selected').val());
                              }
                          }
                      } else {
                          toastr.warning($("#lblcityblankerror").text());
                          return false;

                      }
                  } catch (e) {
                      console.log(e.message);
                  }
              }
              /**************************CODE FOR SEARCHING**************************/
              function clearGeolocationGraphics() {
                  map.infoWindow.hide();
                  map.graphics.clear();
              }

              //Sorting places based on distance. 
              function getDistanceSorted(Locationtype) {
                  var  temp, i = 0;
                  var distarr = new Array();
                  var distSorted = new Array();

                  if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(function (geocodePosition) {
                          initialLocation = new esri.geometry.Point(geocodePosition.coords.longitude, geocodePosition.coords.latitude);
                          for (var j = 0; j < picpoints.length; j++) {
                              roww = picpoints[j];
                              if (Locationtype != "All" && roww.LocationType != Locationtype) { continue; }
                              distSorted[i] = roww;
                              distarr[i] = distanceLatLon(initialLocation, new esri.geometry.Point(roww.Longitude, roww.Latitude));
                              i++;
                          }

                          for (var m = 1; m < distSorted.length; m++) {
                              for (var n = m; n > 0; n--) {
                                  if (parseFloat(distarr[n]) < parseFloat(distarr[n - 1])) {
                                      temp = distSorted[n - 1];
                                      distSorted[n - 1] = distSorted[n];
                                      distSorted[n] = temp;
                                      temp = distarr[n - 1];
                                      distarr[n - 1] = distarr[n];
                                      distarr[n] = temp;
                                  }
                              }
                          }
                          addppLocation(distSorted, geocodePosition);
                      });
                  }
                  else {
                      toastr.error($('#ErrMsgGeoNotSupp').text())
                  }
              }

              function calculateDirections(lat, long) {
                  try {
                      var start;
                      var stop;
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                      } else {
                          toastr.error($('#ErrMsgGeo').text())
                      }

                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(function(geocodePosition) {
                              try {
                                  initialLocation = new
                                      Point(geocodePosition.coords.longitude, geocodePosition.coords.latitude);
                                  start = new Point(parseFloat(long), parseFloat(lat));
                                  stop = initialLocation;
                                  var routeParams = new RouteParameters();
                                  routeParams.returnRoutes = false;
                                  routeParams.returnDirections = true;
                                  routeParams.directionsLengthUnits = Units.MILES;
                                  routeParams.outSpatialReference = map.spatialReference;
                                  routeParams.stops = new FeatureSet();
                                  var startGraphic = addPtGraphic("Start", start);
                                  var stopGraphic = addPtGraphic("End", stop);
                                  routeParams.stops.features[0] = startGraphic;
                                  routeParams.stops.features[1] = stopGraphic;

                                  directionsService.solve(routeParams);
                              } catch (e) {
                                  toastr.error($('#ErrMsgNoRoute').text())

                              }
                          });
                      }
                      else {
                          toastr.error($('#ErrMsgNoRoute').text())
                      }

                  }
                  catch (e)
                  { console.log(e.message); }
              }

              function showRoute(results) {
                  try {
                      var routeInfo = results.result;  // 3.5
                      if (routeInfo) {
                          if (routeInfo.routeResults && routeInfo.routeResults.length > 0) {
                              directions = routeInfo.routeResults[0].directions;
                              //Remove previous route
                              if (previousLine != null) {
                                  removeLineGraphic(previousLine);
                              }


                              //  Add route to map
                              addLineGraphic(directions.mergedGeometry, [255, 0, 0, 0.5], null, null, true);

                              // Zoom to route
                              map.setExtent(directions.mergedGeometry.getExtent().expand(2.0));
                          }
                      }
                      else {
                          toastr.error($('#ErrMsgNoRoute').text())
                      }
                  }
                  catch (e)
                  { }
              }

              function addPtGraphic(type, place) {

                  try {
                      var symbol, attributes, infoTemplate, graphic;
                      if (type == "Start") {
                          symbol = utils.createPictureSymbol($('#hdnPinIcon').val(), 0, 10, 24);

                          graphic = new Graphic(place, symbol, attributes, infoTemplate);
                      }
                      else {
                          symbol = utils.createPictureSymbol($('#hdnPinIcon').val(), 0, 10, 24);
                          graphic = new Graphic(place, symbol);
                      }
                      // Add graphic to map 
                      if (type != "Start") {
                          map.graphics.add(graphic);
                          if (graphic.getDojoShape()) {
                              graphic.getDojoShape().moveToFront();
                          }
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
                      previousLine = graphic;
                      return graphic;
                  }
                  catch (e)
                  { }
              }

              function removeLineGraphic(line) {
                  map.graphics.remove(line);
              }
          });

}

function searchText(searchtext) {
    try {
        var Latitude = ''; var Longitude = '';
        var selected = $('select#ddlAddress option:selected').val().split(":");
        if ($('#GIStxtGoogleSearch').val() == '') {
            Latitude = selected[4];
            Longitude =selected[3];
        }
        var url = "GISGreenFootprint.aspx/SearchFP";
        var param = {
            searchString: escape($('#GIStxtGoogleSearch').val()),
            LocationTypeId: $('#selFootPrint option:selected').val(),
            Latitude: Latitude,
            Longitude: Longitude        
        };
        $.ajax({
            async: false,
            type: "POST",
            url: url,
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    searchdata = $.parseJSON(response.d);
                },
            error: OnError,

        });

    }
    catch (e) {
        console.log(e.message);
    }

}

function OnError() {

    console.log('errro');
}

/***************************GOOGLEMAP**********************************************/
function loadFPGoogleMapdetails() {
    loadddl();
    loadFPGooglemap();
    try {
        LoadGrid();
    }
    catch (e) {

    }
}

function loadFPGooglemap() {

    var markers = [];
    var mapOptions = [];
    var markers = [];
    var mapOptions = [];

    markers = $.map(picpoints, function (val, key) {
        return { "lat": val.Latitude, "lng": val.Longitude };
    });
    if (picpoints.length > 0) {
        mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    else {
        mapOptions = {
            center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }

    mapfp = new google.maps.Map(document.getElementById("footprint_map_canvas"), mapOptions);
    bindFPGooglePoint(picpoints);

}

function bindFPGooglePoint() {
  
    var infowindow = new Array();
    var LocationTypeId = $('#selFootPrint option:selected').val();
  
    for (var i = 0; i < picpoints.length; i++) {
        roww = picpoints[i];
        var destinLocation = new google.maps.LatLng(roww.Latitude, roww.Longitude);
        var imgIcon = $('#hdnPinIcon').val(); //'images/pin.png ';
       
        if (LocationTypeId.toString() != "0" && roww.LocationTypeId.toString() != LocationTypeId) { continue; }
        switch (roww.LocationTypeId.toString()) {
            case '1': imgIcon = $('#hdndine').val(); break;
            case '2': imgIcon = $('#hdnentertainment_green').val(); break;//'images/Footprint/entertainment_green.png'
            case '3': imgIcon = $('#hdnpev_green').val(); break;
            case '4': imgIcon = $('#hdnretail_green').val(); break;
            case '5': imgIcon = $('#hdngroceries_green').val(); break;
            case '6': imgIcon = $('#hdndropoff_green').val(); break;
            case '7': imgIcon = $('#hdnOldAppliancesdropoff').val(); break;
            default: imgIcon = ($('#hdnPinIcon').val(), 36, 47);
        }
        var infoWindow = new google.maps.InfoWindow({ maxWidth: 350 });
        var markerfp = new google.maps.Marker({
            position: destinLocation,
            map: mapfp,
            draggable: false,
            icon: imgIcon,
            title: roww.NAME,
        });

       
        (function (markerfp, roww) {
            google.maps.event.addListener(markerfp, "click", function (e) {
                infoWindow.setContent('<div id="iw-container">' +
                  '<div class="iw-title">' + roww.Locationtype + '</div>' +
                  '<div class="iw-content">' +
                  '<strong><b >' + $('#lblLocationName').text() + '</b></strong> ' + roww.NAME + '</br>' +
                    "<strong><b > " + $('#lblAddress').text() + "</b>: " + "</strong>" + roww.FpTitle + ',' + roww.FpSubtitle + '</br>' +
                   '<strong><b  >' + $('#lblDistance').text() + '</b>:</strong> ' + roww.Distance + ' Miles </br>' +
                   "<img src='" + $('#hdngetDirection').val() + "' class='anchr'  latlon = '${lat},${lon}'  alt='#' style='cursor:pointer' title='Route' onclick=initMap(" + roww.Latitude + ',' + roww.Longitude + ')' + " />" + '</p>' +
                  '</div>' +
                '</div>');
                infoWindow.open(mapfp, markerfp);
            });

        })(markerfp, roww);

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(mapfp, 'click', function () {
            infowindow.close();
        });
        google.maps.event.addListener(mapfp, 'zoom_changed', function () {
            if (mapfp.getZoom() < minZoomLevel) mapfp.setZoom(minZoomLevel);
        });
        google.maps.event.addListener(infoWindow, 'domready', function () {
            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
            */
            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({ opacity: '1', right: '60px', top: '25px', border: '0px solid #006599', 'border-radius': '0px' });

            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({ display: 'none' });
            }

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function () {
                $(this).css({ opacity: '1' });
            });
        });
    }
}

function SearchFootprintgoogle() {
    try {
        toastr.clear();
        var searchString = $('#GIStxtGoogleSearch').val();
        if (searchString.trim() != '') {
            searchText(searchString);
            if (parseInt(searchdata[0].Status) <= 0) {
                $('#GIStxtGoogleSearch').val("");
                toastr.error(searchdata[0].Message);

                return false;
            }
            else {
                picpoints = searchdata;
                if (Mapmode = "1") {
                    datafootprint.Table1 = searchdata;
                    loadFPGooglemap();
                    LoadGrid();
                }
                else {
                    addpp($('#selFootPrint option:selected').val());
                }
            }
        }
        else {
            toastr.warning($("#lblcityblankerror").text());
            return false;
        }
    }
    catch (e) { }
}

function getLocation() {
    try
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            toastr.error("Geolocation is not supported by this browser.");
        }
    }
    catch(e) {
        console.log(e.message);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var imgIcon = $('#hdnPinIcon').val();//'images/pin.png ';
    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mapfp = new google.maps.Map(document.getElementById("footprint_map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: mapfp,
        draggable: false,
        icon: imgIcon,

    });

    google.maps.event.addListener(mapfp, 'zoom_changed', function () {
        if (mapfp.getZoom() < minZoomLevel) mapfp.setZoom(minZoomLevel);
    });
}

function initMap(dirlat, dirlong) {
    directionsDisplay.setMap(mapfp);
    calculateAndDisplayRoute(directionsService, directionsDisplay, dirlat, dirlong);
    mapfp.addListener('click', function (e) {
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, dirlat, dirlong) {
    try {
        var imgIcon = $('#hdnuserpinicon').val();//'images/user-pin-icon.png';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                long = parseFloat(p.coords.longitude);
                lat = parseFloat(p.coords.latitude);
            });
        }
        else {
            var selected = $('select#ddlAddress option:selected').val().split(":");
            long = parseFloat(selected[4]);
            lat = parseFloat(selected[3]);
        }
        var selected = $('select#ddlAddress option:selected').val().split(":");
        long = parseFloat(selected[4]);
        lat = parseFloat(selected[3]);
        var selectedMode = 'Driving';
        directionsService.route({
            origin: { lat: lat, lng: long },  // Haight.
            destination: { lat: parseFloat(dirlat), lng: parseFloat(dirlong) },  // Ocean Beach.
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.DirectionsUnitSystem.METRIC,

        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var _route = response.routes[0].legs[0];
                pinA = new google.maps.Marker({
                    position: _route.start_location,
                    map: mapfp,
                    icon: imgIcon
                });
            } else {
                toastr.error('Directions request failed due to ' + status);
            }
        });
    }
    catch (e) {

    }
}

//***********************notused****************//
function placeMarkerAndPanTo(latLng, mapfp) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: mapfp
    });
    mapfp.panTo(latLng);
}

function calculateroute(sourcelat, sourcelong) {
    var lat_lng = new Array();
    var myLatlng = new google.maps.LatLng(28.6129, 77.2295);
    var myLatlng1 = new google.maps.LatLng(28.5707, 77.3261);
    var imgIcon = $('#hdnPinIcon').val();//'images/pin.png ';
    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mapfp = new google.maps.Map(document.getElementById("footprint_map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: mapfp,
        draggable: false,
        icon: imgIcon,

    });

    lat_lng.push(myLatlng);
    lat_lng.push(myLatlng1);
    //***********ROUTING****************//

    //Initialize the Path Array
    var path = new google.maps.MVCArray();

    var service = new google.maps.DistanceMatrixService();
    var directionsDisplay = new google.maps.DirectionsRenderer;
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: mapfp, strokeColor: '#4986E7' });

    //Loop and Draw Path Route between the Points on MAP
    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length + 1) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            path.push(src);
            poly.setPath(path);
            service.getDistanceMatrix({
                origin: src,
                destination: des,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        path.push(result.routes[0].overview_path[i]);
                    }
                }
            });
        }
    }
}

function LoadGrid() {
    try {
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'Locationtype' },
            { name: 'NAME' },
            { name: 'FpTitle' },
            { name: 'FpSubtitle' },
            { name: 'LocationTypeId' },
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: datafootprint.Table1
        };

        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgrid").jqxGrid({
            width: "100%",
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '35', '50'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Location Type', dataField: 'Locationtype', width: '20%' },
                { text: 'Name', dataField: 'NAME', width: '32%' },
                { text: 'Address', dataField: 'FpTitle', width: '25%' },
                { text: 'City', dataField: 'FpSubtitle', width: '23%' },
                { text: 'Location Type', dataField: 'LocationTypeId', hidden: true },
            ]
        });
    }
    catch (e)
    {
        console.log("LoadGrid:" + e.message);
    }
}

var addfilter = function () {
    var filtergroup = new $.jqx.filter();
    var filter_or_operator = 1;
    var filtervalue = $("#selFootPrint option:selected").val();
   
        var filtercondition = 'equal';
        var filter1 = filtergroup.createfilter('numericfilter', filtervalue, filtercondition);

        filtergroup.addfilter(filter_or_operator, filter1);

        // add the filters.
        $("#jqxgrid").jqxGrid('addfilter', 'LocationTypeId', filtergroup);
        // apply the filters.
        $("#jqxgrid").jqxGrid('applyfilters');
    //}
}

function resizegrid() {
    $("#jqxgrid").jqxGrid('updatebounddata');

}

function SetImage(value) {
    switch (value) {
        case "0":
            $('#img-footprints').attr('src', $("#hdnAllkey").val());//'images/Footprint/All_key.png'
            break;
        case "1":
            $('#img-footprints').attr('src', $("#hdndiningkey").val());//'images/Footprint/dining_key.png'
            break;
        case "2":
            $('#img-footprints').attr('src', $("#hdnentertainmentkey").val());//'images/Footprint/entertainment_key.png'
            break;
        case "3":
            $('#img-footprints').attr('src', $("#hdnpevkey").val());//'images/Footprint/pev_key.png'
            break;
        case "4":
            $('#img-footprints').attr('src', $("#hdnretailkey").val());//'images/Footprint/retail_key.png'
            break;
        case "5":
            $('#img-footprints').attr('src', $("#hdngrocerieskey").val());//'images/Footprint/groceries_key.png'
            break;
        case "6":
            $('#img-footprints').attr('src', $("#hdndropoffkey").val());//'images/Footprint/dropoff_key.png'
            break;
        case "7":
            $('#img-footprints').attr('src', $("#hdnAppliances").val());//'images/Footprint/Old Appliances drop off-2.png'
            break;
        default: $('#img-footprints').attr('src', $("#hdnAllkey").val());//'images/Footprint/All_key.png'
    }
}

function getCurrentLocation(position) {
    try {
        clearGeolocationGraphics();
        
        var pt = new Point(position.coords.longitude, position.coords.latitude);
        var symbol = new esri.symbol.PictureMarkerSymbol($('#hdnuserpinicon').val(), 36, 47);
        var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
      
        var request =
               {
                   latlong: pt.y.toFixed(2) + "," + pt.x.toFixed(2)
               }
        $.ajax({
            type: "POST",
            url: "GISGreenFootprint.aspx/getLocationName",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(request),
            success: function (data) {
                var infoTemplate  = '';
                attributes = ''
                var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                map.graphics.add(graphic);
                map.centerAndZoom(pt, 8);
            },

            error: function (request, status, error) {
                toastr.error('Error!! ' + request.statusText);
            }
        });
    }
    catch (e) { }
}

function errorHandler(err) {
    if (err.code == 1) {
        toastr.error($('#ErrMsgAccessDebied').text());
    } else if (err.code == 2) {
        toastr.error($('#ErrMsgUnavailable').text());
    } else {
        toastr.error("Error: " + err);
    }

}