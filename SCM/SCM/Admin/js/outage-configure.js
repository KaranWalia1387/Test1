
var usertable;
var databindtogrid;
var drwapolytable;
var outid;
var querystring = '';
var flag = '';
function LoadZipcode(cityname) {
    $('#ddluserzipcode').empty();
    var data = Common.GetZipcode(cityname).value;
   
    $('#ddluserzipcode').append("<option>Zip Code</option>");
    for (var i = 0; i < data.Rows.length; i++) {
        $('#ddluserzipcode').append($("<option></option>").val(data.Rows[i]["ZipCode"]).html(data.Rows[i]["ZipCode"]));
    }
    $('#ddluserzipcode').attr('disabled', false);
}

function loadmap() {
    var tb;

    try {
        require(["esri/map", "esri/toolbars/draw", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/geometry/webMercatorUtils"],
              function (Map, Draw, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, tolatlong) {

                  var pointSymbol, lineSymbol, polygonSymbol, pgon;
                  var multiPointGraphic, polylineGraphic, polygonGraphic, multiPoint;
                  var pts, activeToolId;
                  var pointCount = 0;

                  map = new Map("div-graph", {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16
                  });
                  utils.autoRecenter(map);
                  var geocodeService = new Geocoder("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
              
                  $('#ddlCity').change(function () {
                      var obj = $('#ddlCity option:selected');
                      if (obj.index() > 0) {
                          geoSearch();
                      }
                  });

                  on(map, "load", function () {
                      on(geocodeService, "address-to-locations-complete", geocodeResults);
                      on(geocodeService, "error", geocodeError);
                      querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[0];
                      if (querystring == "outageid") {
                        
                          drawpolygon();
                      }
                        
                      else { 
                          showGeolocation();
                      }
                  });

                  on(map, "click", addGraphicCallback);
                  on(map, "dbl-click", addGraphicCallback);  // double-click?

                  function showGeolocation() {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                      } else {
                          var pt = new Point($("#Longitude").val(), $("#Latitude").val());
                          map.centerAndZoom(pt, 10);
                      }
                  }
                  function errorHandler(err) {

                      var pt = new Point($("#Longitude").val(), $("#Latitude").val());
                      map.centerAndZoom(pt, 10);
                  }
                  function getCurrentLocation(position) {

                      var pt = new Point(position.coords.longitude, position.coords.latitude);
                      map.centerAndZoom(pt, 10);
                  }
                  $('#addPolygon').click(function () {
                      flag = '1';
                      if (validatecontrols()) {
                         
                          if (querystring != '') {
                              $('#lblGuide').html('');
                              clearAddGraphics();
                          }
                          $('#addPoint').val('Add Point');
                          alert('Click on map to draw polygon. Double click to finish');
                          setActiveTool(this);
                      }
                  });
                  $('#addPoint').click(function () {
                      flag = '1';
                      if ($('#addPoint').val().toLowerCase() == 'add point') {
                          if (validatecontrols()) {
                          
                              alert('Click on Map to draw point. Click on finish to save changes');
                              $('#addPoint').val('Finish');
                              setActiveTool(this);
                          }
                      }
                      else {
                          $('#addPoint').val('Add Point');
                          activeToolId = '';
                      }
                  });
                  $('#btnclear').click(function () {
                      $('#lblGuide').html('');
                      clearAddGraphics();
                  });
                  $('#btnSubmit').click(function () {
                      if (ValidatePage('divFilter')) {
                          if ($('#ddlCity option:selected').index() <= 0) {
                              alert('Please select Location')
                              $('#ddlCity').focus();
                              return false;
                          }
                         
                          if (ValidateDateFormat($('#txtDate').val()) != true) {
                              alert('Please provide date in MM/DD/YYYY format.');
                              $('#txtDate').focus();
                              return false;
                          }
                          if (validateTime($('#txtTime').val()) != true) {

                              $('#txtTime').focus();
                              return false;
                          }
                          if (isNaN($('#txtRestorationtime').val()) == true) {
                              alert('Please provide Restoration time in hours only.');
                              $('#txtRestorationtime').focus();
                              return false;
                          }
                          if (($('#txtRestorationtime').val() == 0) || ($('#txtRestorationtime').val() == '') || (parseInt($('#txtRestorationtime').val()) < 0)) {
                              //alert('Restoration time cannot be zero or empty.');
                              alert('Please enter a valid Restoration Time');// According to BRD Sheet
                              $('#txtRestorationtime').focus();
                              return false;
                          }
                        
                          var coordinatearray = new Array();
                          var pointarray = new Array();
                          var Outage = [];
                          $.each(map.graphics.graphics, function (i, obj) {
                              if (obj.geometry.type == 'polygon') {
                                  $.map(obj.geometry.rings[0], function (obj, i) {
                                      var arr = new Array();
                                      arr = esri.geometry.xyToLngLat(obj[0], obj[1]);
                                      if (flag == '1') {
                                          coordinatearray.push({
                                              y: arr[0],
                                              x: arr[1],
                                              "zipcode": $("#ddlCity").val()
                                          });
                                      }
                                      else {
                                          coordinatearray.push({
                                              y: obj[0],
                                              x: obj[1],
                                              "zipcode": $("#ddlCity").val()
                                          });
                                      }
                                  });
                                  Outage.push({ Area: coordinatearray })
                              } else if (obj.geometry.type == 'point') {
                                  {
                                      var arr = new Array();
                                      arr = esri.geometry.xyToLngLat(obj.geometry.x, obj.geometry.y);
                                      if (arr[0] != 0) {
                                          if (flag == '1') {
                                              pointarray.push({
                                                  y: arr[0],
                                                  x: arr[1],
                                                  "zipcode": $("#ddlCity").val()
                                              });
                                          }
                                          else {
                                              pointarray.push({
                                                  y: obj.geometry.x,
                                                  x: obj.geometry.y,
                                                  "zipcode": $("#ddlCity").val()
                                              })
                                          }
                                      }
                                  };
                              }
                          });

                          if (coordinatearray.length == 0) {
                              alert('Please draw Polygon to highlight the outage area');
                              return false;
                          }
                          if (coordinatearray.length > 0 && coordinatearray[0].x != coordinatearray[coordinatearray.length - 1].x && coordinatearray[0].y != coordinatearray[coordinatearray.length - 1].y) {
                              alert('Please draw complete Polygon for outage');
                              return false;
                          }
                          if (pointarray.length == 0) {
                              alert('Please select a point for outage');
                              return false;
                          }
                          Outage.push({ points: pointarray });

                          var opsel = $('.rdogroup input:checked').val();
                          //Validations Before Saving
                          if (opsel == '1') {
                              if ($('#txtLat').val() == '') {
                                  alert('Please enter outage latitude.');
                                  $('#txtLat').focus();
                                  return false;
                              }
                              else if ($('#txtLong').val() == '') {
                                  alert('Please enter outage longitude.')
                                  $('#txtLong').focus();
                                  return false;
                              }
                          }
                          else {
                              if ($('#ddlCity option:selected').index() <= 0) {
                                  alert('Please select Location')
                                  $('#ddlCity').focus();
                                  return false;
                              }

                           
                          }
                         
                          var str = '0|';
                          str += $('#txtCause').val() + '|' + $('#txtDate').val() + ' ' + $('#txtTime').val() + '|' + $('#txtCircuitId').val() + '|' + $('#txtRestorationtime').val() + '|';
                          if (opsel == '1')
                              str += $('#txtLat').val() + '|' + $('#txtLong').val();
                          else
                              str += pointarray[0].x.toFixed(6) + '|' + pointarray[0].y.toFixed(6) + '|' + $('#ddlCity option:selected').val(); // + '|' + $('#ddluserzipcode option:selected').val();
                          str += '|' + $('#txtMessage').val() + '|' + $('#txtReportInfo').val();
                          var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[0];
                          if (querystring == "outageid") {
                              str += '|' + outid + '|' + $('#ddlResolution option:selected').val() + '|' + $('#ddlCity option:selected').attr('cityid');
                          }
                          else {
                              str += '|' + '' + '|' + '0' + '|' + $('#ddlCity option:selected').attr('cityid');
                          }
                          var result = configure_outage.Savelatelong("{'Outage':" + JSON.stringify(Outage) + "}", str).value;
                          if (result > 0) {
                              alert('Outage information has been saved successfully');
                              reset();
                              if (querystring == "outageid") {
                                  window.location = 'Outage-Cancellation.aspx';
                              }

                          }
                          else {
                              alert('Outage did not submitted');
                              return false;
                          }
                      }
                      else { return false; }

                  
                  });
                  function validatecontrols() {

                      if ($('#ddlCity option:selected').val().length > 0) {
                        
                          return true;
                      }
                      else {
                          alert('Please select Location');
                          $('#ddlCity').focus();
                          return false;
                      }
                  }
                  pointSymbol = createPointSymbol();
               
                  polygonSymbol = createPolygonSymbol();

                  function geocodeResults(places) {
                      if (places.length > 0) {
                          var  pt;
                          pt = places[0].location;
                          map.setLevel(12);
                          map.centerAt(pt);
                      } else {
                          alert("Sorry, zip code not found.");
                      }
                  }

                  function geocodeError(errorInfo) {
                      alert("Sorry, zip code not found!");
                  }

                  function geoSearch() {
                      var searchString = $('#ddlCity option:selected').text();
                    
                      
                      var options = {
                          address: { "SingleLine": searchString },
                          outFields: ["Loc_name", "Place_addr"], //Need R&D
                       
                      }
                      geocodeService.addressToLocations(options);
                  }

                  function setActiveTool(obj) {
                      var ctrl = obj;
                      activeToolId = (ctrl ? ctrl.id : null);
                      if (ctrl) {
                          map.disableDoubleClickZoom();
                          map.disablePan();
                      } else {
                          map.enableDoubleClickZoom();
                          map.enablePan();
                      }
                  }

                  function addGraphicCallback(evt) {
                      var pt = evt.mapPoint;
                      var finished = (evt.type == "dblclick" || evt.type == "touchend");
                      switch (activeToolId) {
                          case 'addPoint':
                              addPoint(pt, finished);
                              break;
                          case 'addLine':
                              addLine(pt, finished);
                              break;
                          case 'addPolygon':
                              addPolygon(pt, finished);
                              break;
                          default:
                      }
                  }

                  function addPoint(pt) {
                      var graphic = new Graphic(pt, pointSymbol);
                      if (pgon == undefined || !pgon.contains(pt))//#5746
                          alert("Please add the point inside the affected area only");
                      else if (pointCount == 0) {
                          map.graphics.add(graphic);
                          pointCount++;
                      }
                      else
                          alert("Only one point is allowed inside the affected area.\nPlease clear and recreate the affected area and point");
                  }

                  function drawpolygon() {
                      clearAddGraphics();
                      polygonSymbol = createPolygonSymbol();
                   
                      if (drwapolytable.length > 0) {
                          pts = [];
                          for (var i = 0; i < drwapolytable.length; i++) {

                              pt = new Point(drwapolytable[i]["Longitude"], drwapolytable[i]["Latitude"]);
                              pts.push(pt);
                          }
                          if (pts.length > 1) {
                              var polygon = new Polygon(pt.spatialReference);
                              polygon.addRing(pts);
                              polygonSymbol.setColor(new Color([229, 107, 8, 0.25]));
                              polygonGraphic = new Graphic(polygon, polygonSymbol);
                              map.graphics.add(polygonGraphic);
                              polygonGraphic = null;
                              pts = null;
                              map.centerAndZoom(pt, 12);
                          }
                      }

                      if (usertable.Table3.length > 0) {
                          attributes = { lat: usertable.Table3[0].OutageLatitude, lon: usertable.Table3[0].OutageLongitude };
                          sym = new esri.symbol.PictureMarkerSymbol('../images/pins.png', 30, 30);
                          pt = new esri.geometry.Point(usertable.Table3[0].OutageLongitude, usertable.Table3[0].OutageLatitude, new esri.SpatialReference({ wkid: 4326 }))
                          months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                          var graphic = new Graphic(pt, sym, attributes);
                          map.graphics.add(graphic);
                          map.centerAndZoom(pt, 12);
                      }
                  }

                  // Add polygon graphic
                  function addPolygon(pt, finished) {
                      if (!pts) pts = [];
                      pts.push(pt);

                      // Create the polygon and graphic
                      if (pts.length > 1) {
                          if (finished && pts.length > 2)
                              pts.push(pts[0]);  // Close the ring
                          var polygon = new Polygon(pt.spatialReference);
                          polygon.addRing(pts);
                          pgon = polygon;
                          if (!polygonGraphic) {
                              polygonGraphic = new Graphic(polygon, polygonSymbol);
                              map.graphics.add(polygonGraphic);
                          }
                          else
                              polygonGraphic.setGeometry(polygon);
                      }
                      if (finished && pts.length > 2) {
                          map.graphics.remove(multiPointGraphic);
                          multiPointGraphic = null;
                          pts = null;
                          activeToolId = '';
                          $('#lblGuide').text('');
                      }
                  }
                  function createPointSymbol() {
                      return new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 7,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 1),
                    new Color([255, 0, 0, 0.75]));
                  }

                  function createLineSymbol() {
                      return new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0, 0.75]),
                    2);
                  }

                  function createPolygonSymbol() {
                      return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
                  }

                  function clearAddGraphics() {
                      map.infoWindow.hide();
                      map.graphics.clear();
                      multiPointGraphic = null;
                      polylineGraphic = null;
                      polygonGraphic = null;
                      pts = null;
                      activeToolId = '';
                      pointCount = 0;
                      pgon = undefined;//#5746
                      if ($('#addPoint').val() == "Finish")
                          $('#addPoint').val('Add Point');
                  }

              });

    }
    catch (ex) {
        alert(ex.message);
    }
}

function reset() {
   $('#ddlCity').val('');
    location.reload();
}

$(document).ready(function () {
    
    $('#txtTime').timepicker({
        showPeriod: true,
        showLeadingZero: true
    });
    $("#div-graph").height(GridHeight * .89);
     var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[0];
    if (querystring == "outageid") {
        outid = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];    
        var param;
        param = {
            fromdate: '', todate: '',
            Outageid: outid, IsPlanned: null
        }
        $('#Resolution').show();
        $.ajax({
            type: "POST",
            url: "Outage-Cancellation.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data, status) {
                loader.hideloader();
                usertable = JSON.parse(data.d);
                databindtogrid = usertable.Table3;
                drwapolytable = usertable.Table4;
                $("#txtCause").val(databindtogrid[0]["Cause"]);
                $("#txtMessage").val(databindtogrid[0]["OutageMessage"]);
                $("#txtReportInfo").val(databindtogrid[0]["OutageReportInfo"]);
                $("#ddlCity").val(databindtogrid[0]["ZipCode"]);
              //  $("#txtTime").val((new Date(databindtogrid[0]["StartDate"]).getHours() > 9 ? new Date(databindtogrid[0]["StartDate"]).getHours() : '0' + new Date(databindtogrid[0]["StartDate"]).getHours()) + ":" + new Date(databindtogrid[0]["StartDate"]).getMinutes());
                $("#txtTime").val(DateFormat(databindtogrid[0]["StartDate"]));
                $("#txtDate").val(databindtogrid[0]["OutageDate"]);
                $("#txtRestorationtime").val(databindtogrid[0]["RestorationTime"]);
                $('#ddlResolution').val(databindtogrid[0]["IsResolved"]);
                loadmap();
            }
        });
    }
    else {       
        $('#Resolution').hide(); loadmap();
     }
    $("#btnClearOutage").click(function () {
        $('#ddlCity').val('');
        $('#txtDate').val('');
        $('#txtCause').val('');
        $('#txtTime').val('');
        $('#txtMessage').val('');
        $('#txtReportInfo').val('');
        $('#txtRestorationtime').val('');
    });

  
});
function DateFormat(date) {

    var time = date.split(' ')[3] == "" ? date.split(' ')[4] : date.split(' ')[3];
    var len= time.length;
    return time.substr(0, len - 2) + ' ' + time.substr(len - 2, len);
}

function ValidateDateFormat(dt) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dt))) {
        return false;
    }
    else {

        return true;
    }
}

function validateTime(strTime) {
    var timRegX = /^(\d{1,2}):(\d{2}) [APap][mM]?$/;

    var timArr = strTime.match(timRegX);
    if (strTime == "") {
        alert('Please provide Outage Time.');
        return false;
    }
    if (timArr == null) {
        alert("Please enter Time in HH:MM format");
        $('#txtTime').focus();
        return false;
    }
    hour = timArr[1];
    minute = timArr[2];



    if (hour < 0 || hour > 23 || hour == undefined) {
     
        alert("Hour must be between 0 and 23");
        $('#txtTime').focus();
        return false;
    }

    if (minute < 0 || minute > 59 || minute == undefined) {
        alert("Minute must be between 0 and 59.");
        $('#txtTime').focus();
        return false;
    }


    var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[0];
    if (querystring != "outageid") {
        var dt = Date.parse($('#txtDate').val() + ' ' + $('#txtTime').val());
        var d = new Date(dt);
        if (d < (new Date())) {
            alert('Outage cannot be configured for past date and time');
            $('#txtTime').focus();
            return false;
        }
    }
    return true;
}
