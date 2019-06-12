var data, roww, map;
var initialLocation;
var PEVLocations;
var outagedata;
var outageinfo;

function createmap() {


    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                  //START 0005350
                  var city = "";
                  var zip = "";//($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
                  var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
                  var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
                  var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();

                  var ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
                  var custname = '';

                  //
                  //   var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
                  if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                      var ddlCity = $('#ddlCity option:selected');
                      if ($(ddlCity).attr('key') == 'CityName') {
                          city = $(ddlCity).val();
                      }
                      if ($(ddlCity).attr('key') == 'Zipcode') {
                          zip = $(ddlCity).val();
                      }
                  }

                  if ((city == '' && zip == '' && ddlOutageType == '')) {
                      mode = 1;
                  }
                  else {

                      mode = (city != '') ? 2 : 1;

                      if (zip != '') {
                          mode = 3;
                      }

                      if ((city != '' || zip != '') && ddlOutageType != '') {
                          mode = 4;
                      }
                      else if (ddlOutageType != '') {
                          mode = 5;
                      }
                  }
                  //END   0005350
                 // outagetable = Outage.LoadGridData($('#txtDateFrom').val(),$('#txtDateTo').val()== ''? '':  convertlocaltoutc($('#txtDateTo').val()), mode, city, zip, ddlOutageType, custname).value;
                  // var outageType = "C";
                  var param = {
                      datefrom: dtFrom,
                      dateto: dtTo,
                      mode: mode, cityid: city,
                      zipcode: zip,
                      outagetype: ddlOutageType,
                      customername: custname
                  }
                  $.ajax({
                      type: "POST",
                      url: "Outage.aspx/SearchOutage",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      data: JSON.stringify(param),
                      success: function (data) {
                          data = data.d;
                          var result = $.parseJSON(data);
                          OutageTable = result;
                      },

                      error: function (request, status, error) { w2alert('Error!! ' + request.statusText); }
                  });
                  var polygonSymbol, polygonGraphic, pts, pt, sym;
                  $('#outage_map_canvas').html('');
                  var map = new Map("outage_map_canvas", {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16
                  });

                  utils.autoRecenter(map);
                  var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

                showGeolocation();

                  //drawpolygon();
                  on(map, "load", function () {
                      try {
                          showGeolocation();
                          $('#btnFilter').click(function () {
                              //outagedata = (mode > 1 && mode != 5) ? OutageTable.Tables[2].Rows : OutageTable.Tables[3].Rows; // outagetable.Tables[0];
                              if (parseInt(OutageTable.Table.length) > 0) {
                                  outagedata = OutageTable.Table;
                                  if (outagedata.length != '0') {
                                      showGeolocation();
                                  }
                                  else {
                                      nodatashow();
                                      document.getElementById('mapDiv').style.display = 'none';
                                      document.getElementById('outage_map_canvas').style.display = 'none';
                                  }
                              }
                              
                          });

                      }
                      catch (e) {
                          alert(e.message)
                      }
                  });



                  function geocodeResults(places) {

                      try {
                          sym = new esri.symbol.PictureMarkerSymbol('../images/pin1.png', 40, 40);
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
                          clearAddGraphics();
                          result = OutageTable.Table;
                          //outagedata = (mode > 1 && mode != 5) ? OutageTable.Tables[2].Rows : OutageTable.Tables[3].Rows;

                          //for (var i = 0; i < outagedata.Rows.length; i++) {
                          //    pt = new Point(outagedata.Rows[i]["Longitude"], outagedata.Rows[i]["Latitude"]);
                          //    // Create a symbol and pop-up template and add the graphic to the map
                          //    if (outagedata.Rows[i]["TotalOutages"] < 6) {
                          //        var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-green.png', 30, 40);
                          //    }
                          //    else if (outagedata.Rows[i]["TotalOutages"] > 5 && outagedata.Rows[i]["TotalOutages"] < 11) {
                          //        var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-yellow.png', 30, 40);
                          //    }
                          //    else if (outagedata.Rows[i]["TotalOutages"] > 10) {
                          //        var symbol = new esri.symbol.PictureMarkerSymbol('../images/outages-red.png', 30, 40);
                          //    }


                          //    var city = outagedata.Rows[i]["CityName"];
                          //    var title = '<b>Outage Report:</b> ' + outagedata.Rows[i]["OutageDate"];//$('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
                          //    var cause = outagedata.Rows[i]["OutageReportInfo"];//0005050: Outage report filter dates are appeared in Outage-Report-Map pinned popup which is not a case
                          //    var totaloutage = outagedata.Rows[i]["TotalOutages"];
                          //    var unplan = outagedata.Rows[i]["UnplannedOutages"];
                          //    var plan = outagedata.Rows[i]["PlannedOutages"];

                          //    var attributes = { "Cause": cause, "City": city, "Title": title, "total": totaloutage, "unplan": unplan, "plan": plan };
                          //    var infoTemplate = new InfoTemplate(city, "<p style='text-align:left'><b>${Cause}</b><br/>${Title}<br/><b>TotalOutages:</b>${total}<br/><b>Planned:</b> ${plan}<br/> <b>Unplanned:</b>${unplan}</p>");
                          //    var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                          //    map.graphics.add(graphic);

                          //    // Position the map


                          for (var i in result) {
                              attributes = { lat: result[i].Latitude, lon: result[i].Longitude };
                              if (result[i].PlannedOutages == 1) { sym = new esri.symbol.PictureMarkerSymbol('../images/pin1.png', 30, 30); }
                              else { sym = new esri.symbol.PictureMarkerSymbol('../images/pins.png', 30, 30); };
                              pt = new Point(result[i].Longitude, result[i].Latitude);
                              var graphic = new Graphic(pt, sym, attributes);
                              map.graphics.add(graphic);
                          }
                              map.centerAndZoom(pt, 13);
                              // map.zoomEnd(0);

                          //}
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

//    $("#mapView").click(function () {
//        $("#div-Outagemap").css('height', GridHeight*.75);
//        $("#mapDiv").css('width', GridWidth);
//        createmap();
//    });

  //  $("#mapDiv").css('margin-y:');


    //$("#mapView").click(function () {
    //    $("#outage_map_canvas").css('height', GridHeight * .75);
    //     $("#outage_map_canvas").css('width', GridWidth);
    //    createmap();
    //});
});


