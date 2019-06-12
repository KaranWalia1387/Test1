var minZoomLevel = 5;
var map;
var outData = null;
var Mapmode;
var outageType = 'C';
data = null;
var infowindowOutage = null;
var infowindow1 = null;
var cookie = document.cookie.match('(^|;)?' + 'ClientTimeZone' + '=([^;]*)(;|$)');
var timeOffsetMinutes = ((cookie != null) ? cookie[2] : -(new Date()).getTimezoneOffset());
var OutageIconRed;
var OutageIconBlue;
var URL = "http://d.smartusys.net/westwindpoc/IID_Serv.kmz";

$(document).ready(function () {
    OutageIconRed = $('#hdnPinImageCC').val(); //"images/outages/energy_icon_red.png";
    OutageIconBlue = $('#hdnPinImagePP').val(); //"images/outages/energy_icon_blue.png";
    $("GIStxtGoogleSearch").removeClass('errorbox');
    $("GIStxtGoogleSearch").removeClass('w2ui-tag ');

    $('#imgCurrent').click(function () {
        $("#GIStxtGoogleSearch").removeClass('errorbox');
        error.hideerror();
        if (Mapmode == "1")
        { getLocation(); }
    });

    $('.icon_refreshbtn').click(function () {
        $('#GIStxtGoogleSearch').val('');
        $("#GIStxtGoogleSearch").removeClass('errorbox');
        error.hideerror();
        if (Mapmode == "1") {
            mapGoogle();
        }
    });

    $('#GISsearchGoogleMap').click(function () {
        if (Mapmode == "1") {
            googleOutageSearch();
        }
    });

    Mapmode = $('#hdMapId').val();
    if (Mapmode == "1") {
        infowindowOutage = new google.maps.InfoWindow({});
        infowindow1 = new google.maps.InfoWindow({});
        outData = OuterOutage.loadLatLongOuterOutage("", outageType, timeOffsetMinutes).value;
        mapGoogle();
    }
    else {
        loadOutageMap();
    }

    $('.right_charging_map a').click(function () {
        var pt;
        $("#GIStxtGoogleSearch").removeClass('errorbox');
        error.hideerror();
        if (Mapmode == "1") {
            outageType = $(this).attr('key');
            // Clear search field
            $('#GIStxtGoogleSearch').val('');
            // To show as Active/Deactive
            $('.distance_area a').removeClass('active');
            $(this).addClass('active');
            outData = OuterOutage.loadLatLongOuterOutage("", outageType, timeOffsetMinutes).value;
            if (outData != null && outData.Tables.length > 0 && outData.Tables[0].Rows.length > 0) {
                if (outageType == "C") {
                    mapGoogle();
                }
                else {
                    mapGooglePlanned()
                }
            }
            else {
                var latlong = OuterOutage.LoadDefLatLong().value.split(":");
                if ($('#hdnPinImageCC').val() != "") {
                    var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

                }
                else {
                    var imgIcon = (outageType == 'C') ? OutageIconRed : OutageIconBlue;
                }
                mapOptions = {
                    center: new google.maps.LatLng(latlong[0], latlong[1]),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

                if (outageType == 'C') {
                    toastr.error($('#IDNoOutage').text())
                }
                else if (outageType == 'P') {
                    toastr.error($('#IDNoPlannedOutage').text())
                }
                if (outageType == 'C') {
                    $('#LeftPanel').html('<center>' + $("#IDNoOutage").text() + '</center>');
                }
                else {
                    $('#LeftPanel').html('<center>' + $('#IDNoPlannedOutage').text() + '</center>');
                }
                imgIcon = $('#hdnPinPng').val();
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latlong[0], latlong[1]),
                    map: map,
                    draggable: false,
                    icon: imgIcon
                });

                OpenPopUp(latlong[0], latlong[1], marker);
            }
        }

    });

    $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
        $("#GIStxtGoogleSearch").removeClass('errorbox');
        error.hideerror();
        $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
        $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
        $(this).addClass('MessageContainerActive');
        var obj = this;
        $('#LeftPanel div').removeClass('MessageContainerActive');
        $(this).addClass('MessageContainerActive');
        var latlong = $(this).find('input').val();
        var indexA = latlong.split(',');
        var lat = indexA[0];
        var long = indexA[1];
        var outageId = indexA[2];
        openWindow(lat, long, outageId, outData)

    });

    $('.GIScurrentlocation').click(function () {
        $("#GIStxtGoogleSearch").removeClass('errorbox');
        error.hideerror();
        if (Mapmode == "1")
        { getLocation(); };

    });
});

function refresh() {
    //var zoom = $('#zoom');
    var device = $('#devices');
    //zoom.text(window.detectZoom.zoom().toFixed(2));
    //device.text(window.detectZoom.device().toFixed(2));
    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#devices").addClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#devices").addClass('inner_uni2');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#devices").addClass('inner_uni3');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#devices").addClass('inner_uni4');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
    }
    else {
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }

}

function loadOutageMap() {
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/dijit/InfoWindow"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, InfoWindow) {
          var outageType = "C";
          var polygonSymbol, polygonGraphic, pts, pt, sym;
          var map = new Map("outage_map_canvas", {
              basemap: "streets",
              zoom: 3,
              minZoom: 3,
              maxZoom: 16
          });
        
          var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
          map.addLayer(basemap);
          var kmlUrl = URL;
          var kml = new esri.layers.KMLLayer(kmlUrl);


          map.addLayer(kml);

          utils.autoRecenter(map);

          var tableID = '';
          on(map, "load", function () {
              loadData();
              drawpolygon();
              $('.GIScurrentlocation').click(function () { showGeolocation(); });
              $('.icon_refreshbtn').click(function () {
                  $('#GIStxtGoogleSearch').val('');
                  drawpolygon();
              });

              if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1).toLowerCase() == 'outeroutage.aspx')
                  on(dom.byId("GISsearchGoogleMap"), "click", geoSearch);

              $('.esriPopup .actionsPane .action').hide();
          });

          function geoSearch() {
              try {
                  var searchString = escape(dom.byId('GIStxtGoogleSearch').value);
                  if (searchString != '') {
                      var result = '';
                      var datas = OuterOutage.loadLatLongOuterOutage(searchString, outageType, timeOffsetMinutes).value;
                      if (parseInt(datas.Tables[2].Rows[0].Status) == 2) {
                          data = datas;
                          drawpolygon();
                          clearAddGraphics();
                          alert(datas.Tables[2].Rows[0].Message);
                          return false;
                      }
                      else {
                          data = datas;
                          plotPicPoint();
                          drawpolygon();
                          return true;
                      }
                  }
                  else {
                      error.showerror("#GIStxtGoogleSearch", ' ' + $('#IDEnterCityZip').text());
                      return false;
                  }
              }
              catch (e) {
                  console.log(e.message);
              }
          }

          function geocodeResults(places) {
              sym = new esri.symbol.PictureMarkerSymbol($('#hdnPinSvg').val(), 36, 47);
              if (places.addresses.length > 0) {
                  clearAddGraphics();
                  var place, attributes, infoTemplate, pt, graphic;
                  for (var i = 0; i < places.addresses.length; i++) {
                      place = places.addresses[i];
                      pt = place.location;
                      attributes = { address: place.address, score: place.score, lat: pt.y.toFixed(2), lon: pt.x.toFixed(2) };
                      infoTemplate = new InfoTemplate("Geocode Result", "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='window.zoomToPlace(" + pt.x + "," + pt.y + ",15)';>Zoom To</span>");

                      graphic = new Graphic(pt, sym, attributes, infoTemplate);

                      map.graphics.add(graphic);
                  }
                  map.centerAndZoom(places.addresses[0].location, 12);
              } else {
                  //toastr.error("Sorry, address or place not found.");
                  toastr.error($('#lblAddplaceNotFound').text());
              }
          }

          function geocodeError(errorInfo) {
              // toastr.error("Sorry, address or place not found.")
              toastr.error($('#lblAddplaceNotFound').text());
          }

          function showGeolocation() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
              } else {
                  toastr.error($('#IDGeo').text())
              }
          }

          function getCurrentLocation(position) {
              clearAddGraphics();
              pt = new Point(position.coords.longitude, position.coords.latitude);
              var symbol = new esri.symbol.PictureMarkerSymbol($('#hdnPinSvg').val(), 36, 47);
              var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
              var locName = "";
              var request =
                     {
                         latlong: pt.y.toFixed(2) + "," + pt.x.toFixed(2)
                     }
              var param = { 'lat': pt.y.toFixed(2), 'lon': pt.x.toFixed(2) }
              $.ajax({
                  type: "POST",
                  url: "outages.aspx/getLocationName",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(param),
                  success: function (data) {
                      var locName = data.d;
                      var infoTemplate = new InfoTemplate("My Location", "Latitude: " + pt.y.toFixed(4) + "<br/>Longitude: " + pt.x.toFixed(4) + " <br/> Location Name: " + locName);
                      attributes = '';
                      //infoTemplate = '';
                      var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                      map.graphics.add(graphic);
                      map.centerAndZoom(pt, 13);

                  },

                  error: function (request, status, error) {
                      toastr.error('Error!! ' + request.statusText)
                  }
              });
          }



          function createPolygonSymbol() {
              return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
          }

          function drawpolygon() {
              try {
                  clearAddGraphics();
                  polygonSymbol = createPolygonSymbol();
                  var tableindex = 0;
                  if (data != null) {
                      if (data.Tables[1].Rows.length > 0) {

                          for (var i = 3; i < data.Tables.length; i++) {
                              pts = [];

                              for (var j = 0; j < data.Tables[i].Rows.length; j++) {
                                  pt = new Point(data.Tables[i].Rows[j]["Longitude"], data.Tables[i].Rows[j]["Latitude"]);
                                  pts.push(pt);
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

                  }


                  if (data.Tables[1].Rows.length > 0) {
                      var tabLength = data.Tables[1].Rows.length;
                      for (var i = 0; i < tabLength; i++) {
                          sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol(OutageIconRed, 36, 47) : new esri.symbol.PictureMarkerSymbol(OutageIconBlue, 36, 47);
                          var place, attributes, infoTemplate, pt, graphic;

                          pt = new Point(data.Tables[1].Rows[i]["OutageLongitude"], data.Tables[1].Rows[i]["OutageLatitude"]);

                          var title = data.Tables[1].Rows[i]["Title"];
                          var dateindex = title.indexOf("Date");
                          var infoStatus = data.Tables[1].Rows[i]["STATUS"];
                          var date = data.Tables[1].Rows[i]["Outagedate"];
                          var report = data.Tables[1].Rows[i]["OutageReportInfo"];
                          var CustomersAffected = data.Tables[1].Rows[i]["CustomersAffected"];
                          var CommunityAffected = data.Tables[1].Rows[i]["CityName"];
                          infoStatus = outageType == 'C' ? "<b>" + $('#lblStatus').text() + ":</b>" + infoStatus : '';
                          var restorationtime = data.Tables[1].Rows[i]["RestorationDate"];
                          attributes = { "Date": date, "Title": title, "Report": report, "Restorationtime": restorationtime, "CustomersAffected": CustomersAffected, "CommunityAffected": CommunityAffected };
                          infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br><strong>" + $('#lblDate').text() + ":</strong> " + "</b>${Date}<br>" + "<strong>" + $('#lblEstimatedtime').text() + ":</strong> " + "${Restorationtime}<br><strong>" + $('#lblCustomersAffected').text() + ":</strong> " + "${CustomersAffected}<br><strong>" + $('#lblCommunityAffected').text() + ":</strong> " + "${CommunityAffected}<br><strong>" + $('#lblReport').text() + "</strong> " + "${Report}<br><strong>");
                          graphic = new Graphic(pt, sym, attributes, infoTemplate);
                          map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                          map.centerAndZoom(pt, 11);
                      }
                  }
              }
              catch (e) {
                  console.log(e.message);
              }
          }

          //new requirements for list view Inner html bind
          function plotPicPoint() {
              try {
                  var leftPanelHTML = '';

                  if (data.Tables[1].Rows.length > 0) {

                      sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol(OutageIconRed, 36, 47) : new esri.symbol.PictureMarkerSymbol(OutageIconBlue, 36, 47);



                      var place, attributes, infoTemplate, pt, graphic;
                      for (var i = 0; i < data.Tables[1].Rows.length; i++) {

                          var infoStatus = data.Tables[1].Rows[i]["STATUS"];
                          var date = data.Tables[1].Rows[i]["Outagedate"];
                          var title = data.Tables[1].Rows[i]["Title"];
                          var CustomersAffected = data.Tables[1].Rows[i]["CustomersAffected"];
                          var CommunityAffected = data.Tables[1].Rows[i]["CityName"];
                          report = data.Tables[1].Rows[i]["OutageReportInfo"];
                          infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":" + "</strong>" + infoStatus : '';
                          var restorationtime = '';
                          if (data.Tables[1].Rows[i]["RestorationTime"] != null) {
                              restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong>" + data.Tables[1].Rows[i]["Restorationdate"];
                          }
                          leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + data.Tables[1].Rows[i]["OutageLongitude"] + "," + data.Tables[1].Rows[i]["OutageLatitude"] + "," + data.Tables[1].Rows[i]["Outageid"] + "," + i + '">';
                          leftPanelHTML += '<table>';
                          leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
                          leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ':</strong>' + date + '</td></tr>';
                          leftPanelHTML += '<tr><td>' + restorationtime + '</td></tr>';
                          leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblCustomersAffected').text() + ':' + '</strong>' + CustomersAffected + '</td></tr>';
                          leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblCommunityAffected').text() + ':' + '</strong>' + CommunityAffected + '</td></tr>';
                          if (data.Tables[1].Rows[i]["OutageReportInfo"] == null)
                              leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong> N/A </td></tr>';
                          else
                              leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong>' + report + '</td></tr>';
                          leftPanelHTML += '</table>';
                          leftPanelHTML += '</div>';


                          $('#LeftPanel').html(leftPanelHTML);

                          $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
                              $("#GIStxtGoogleSearch").removeClass('errorbox');
                              error.hideerror();
                              $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
                              $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
                              $(this).addClass('MessageContainerActive');
                              var latlng = $(this).find('input').val();
                              var indexA = latlng.split(',');
                              var index = indexA[3];
                              var infoStatus = data.Tables[1].Rows[index]["STATUS"];
                              var date = data.Tables[1].Rows[index]["Outagedate"];
                              var title = data.Tables[1].Rows[index]["Title"];
                              var CustomersAffected = data.Tables[1].Rows[index]["CustomersAffected"];
                              var CommunityAffected = data.Tables[1].Rows[index]["CityName"];
                              var report = data.Tables[1].Rows[index]["OutageReportInfo"];
                              infoStatus = outageType == 'C' ? infoStatus : '';
                              var restorationtime = '';
                              if (data.Tables[1].Rows[index]["RestorationTime"] != null) {
                                  restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong> " + data.Tables[1].Rows[index]["Restorationdate"];
                              }

                              attributes = { "Date": date, "Title": title, "Report": report, "Restorationtime": restorationtime, "CustomersAffected": CustomersAffected, "CommunityAffected": CommunityAffected };
                              infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br><strong>" + $('#lblDate').text() + ":</strong> " + "</b>${Date}<br>${Restorationtime}<br><strong>" + $('#lblCustomersAffected').text() + ":</strong> " + "${CustomersAffected}<br><strong>" + $('#lblCommunityAffected').text() + ":</strong> " + "${CommunityAffected}<br><strong>" + $('#lblReport').text() + "</strong> " + "${Report}<br>");
                              var zoompt = new Point(latlng.split(',')[0], latlng.split(',')[1]);
                              graphic = new Graphic(zoompt, sym, attributes, infoTemplate);
                              map.infoWindow.setContent(graphic.getContent());
                              map.infoWindow.setTitle($('#lblOutages').text());
                              map.infoWindow.show(zoompt, InfoWindow.ANCHOR_UPPERRIGHT);
                              map.centerAndZoom(zoompt, 12);
                              map.graphics.add(graphic);
                          });
                      }
                  }
                  else {
                      try {
                          //$('#outage_Text_canvas').html('No outages found.');
                          $('#outage_Text_canvas').html($('#IDNoOutage').text());
                      }
                      catch (e) { }
                  }
              }
              catch (e) {
                  console.log("outer-outage.js|plotpicpoint" + e.message);
              }
          }

          function clearAddGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
              polygonGraphic = null;
              pts = null;
              polygonSymbol = null;
          }

          function loadData() {
              data = null;
              data = OuterOutage.loadLatLongOuterOutage("", outageType, timeOffsetMinutes).value

              if (data != null && data.Tables.length > 0 && data.Tables[0].Rows.length > 0) {
                  tableID = data.Tables[3].Name;
                  plotPicPoint();
              }
              else {
                  try {
                      var latlong = OuterOutage.LoadDefLatLong().value.split(":");
                      clearAddGraphics();
                      $('#LeftPanel').html('<center>' + $("#IDNoOutage").text() + '</center>');
                      pt = new Point(latlong[1], latlong[0]);
                      map.centerAndZoom(pt, 12); showGeolocation();
                  }
                  catch (e) { }
              }
              $('.right_charging_map a').click(function () {

                  outageType = $(this).attr('key');
                  // Clear search field
                  $('#GIStxtGoogleSearch').val('');
                  // To show as Active/Deactive
                  $('.distance_area a').removeClass('active');
                  $(this).addClass('active');
                  data = OuterOutage.loadLatLongOuterOutage("", outageType, timeOffsetMinutes).value;
                  if (data != null && data.Tables.length > 0 && data.Tables[0].Rows.length > 0) {
                      tableID = data.Tables[3].Name;
                      clearAddGraphics();
                      drawpolygon();
                      plotPicPoint();
                  }
                  else {
                      var latlong = OuterOutage.LoadDefLatLong().value.split(":");
                      clearAddGraphics();
                      if (outageType == 'C') {
                          toastr.error($('#IDNoOutage').text())
                      }
                      else if (outageType == 'P') {
                          toastr.error($('#IDNoPlannedOutage').text())
                      }
                      pt = new Point(latlong[1], latlong[0]);
                      map.centerAndZoom(pt, 12);
                  }

              });
          }
      });
}

///*************GoogleMAp******************/////
function mapGoogle() {
    $("#GIStxtGoogleSearch").removeClass('errorbox');
    error.hideerror();
    var markers = [];
    var mapOptions = [];
    var maplabelclass;
    var utilitylatlong = OuterOutage.LoadDefLatLong().value.split(":");
    if (outData.Tables[1].Rows.length > 0) {
        markers = $.map(outData.Tables[1].Rows, function (val, key) {
            return { "title": val.ZipCode, "lat": val.OutageLatitude, "lng": val.OutageLongitude, "description": val.OutageReportInfo };
        });
        mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            suppressInfoWindows: true,
        };
        //}
    }
    else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
        }
        else {

            mapOptions = {
                center: new google.maps.LatLng(utilitylatlong[0], utilitylatlong[1]),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                suppressInfoWindows: true,
            };
        }
        $('#LeftPanel').html('<center>' + $("#IDNoOutage").text() + '</center>');
    }
    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

    var kmlURL = URL;
    var kmlOptions = {
        clickable: 0, // polygon ignores mouse clicks
        preserveViewport: 1,
        //color: 'ff330000',
    };

    kmlLayer = new google.maps.KmlLayer(kmlURL, kmlOptions);
    kmlLayer.setMap(map);


    if ($('#hdnPinImageCC').val() != "") {
        var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

    }
    else {
        var imgIcon = (outageType == 'C') ? OutageIconRed : OutageIconBlue;

    }

    function errorHandler(err) {
        if (err.code == 1) {
            mapOptions = {
                center: new google.maps.LatLng(utilitylatlong[0], utilitylatlong[1]),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);
        } else if (err.code == 2) {
        } else {
            toastr.error("Error: " + err);
        }

    }

    var outerCoords = [
    { lat: -32.364, lng: 153.207 }, // north west
    { lat: -35.364, lng: 153.207 }, // south west
    { lat: -35.364, lng: 158.207 }, // south east
    { lat: -32.364, lng: 158.207 }  // north east
    ];
    map.data.add({
        geometry: new google.maps.Data.Polygon([outerCoords])
    });

    var titleOutage = "";
    var marker1 = new Array();
    var infowindow = new Array();
    var leftPanelHTML = '';
    var styledMarker = new Array();

    var Data = outData.Tables[1];
    //========================================
    var clkstatus = true;
    for (var i = 0; i < Data.Rows.length; i++) {
        var data = Data.Rows[i];
        var destinLocation = new google.maps.LatLng(Data.Rows[i].OutageLatitude, Data.Rows[i].OutageLongitude);
        var locName = Data.Rows[i].LocationName;
        var startDate = Data.Rows[i].Outagedate;
        var outageTitle = Data.Rows[i].Title;
        var zipCode = Data.Rows[i].ZipCode;
        var Cause = Data.Rows[i].Cause;
        var restorationtime = '';
        if (Data.Rows[i].RestorationTime != null) {
            restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong>" + Data.Rows[i].Restorationdate;

        }
        leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
        leftPanelHTML += '<table>';
        outageTitle = Data.Rows[i].Title;
        var infoStatus = Data.Rows[i]["STATUS"];
        var date = Data.Rows[i]["Outagedate"];
        var title = Data.Rows[i]["Title"];
        var CustomersAffected = Data.Rows[i]["CustomersAffected"];
        var CommunityAffected = Data.Rows[i]["CityName"];
        report = Data.Rows[i]["OutageReportInfo"];
        infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":" + "</strong>" + infoStatus : '';
        leftPanelHTML += '<div><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
        leftPanelHTML += '<table>';
        leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
        leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ':</strong>' + date + '</td></tr>';
        leftPanelHTML += '<tr><td>' + restorationtime + '</td></tr>';
        leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCustomersAffected').text() + ':</strong>' + CustomersAffected + '</td></tr>';
        leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCommunityAffected').text() + ':</strong>' + CommunityAffected + '</td></tr>';
        if (Data.Rows[i]["OutageReportInfo"] == null)
            leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong> N/A </td></tr>';
        else
            leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong>' + report + '</td></tr>';
        if (outageType == "C") {
            leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblStatus').text() + ':</strong>' + Data.Rows[i]["STATUS"] + '</td></tr>';
        }
        leftPanelHTML += '</table>';
        leftPanelHTML += '</div>';

        var content = '<div id="iw-container">' +
            '<div class="iw-title">' + outageTitle + '</div>' +
            '<div class="iw-content">' +
            '<strong>' + $('#lblDate').text() + ': </strong>' + outData.Tables[1].Rows[i].Outagedate + '</br>' +
            '<b>' + $('#lblEstimatedtime').text() + '</b>: ' + outData.Tables[1].Rows[i].Restorationdate + '</br>' +
            '<strong>' + $('#lblCustomersAffected').text() + ': </strong>' + outData.Tables[1].Rows[i].CustomersAffected + '</br>' +
            '<strong>' + $('#lblCommunityAffected').text() + ': </strong>' + outData.Tables[1].Rows[i].CityName + '</br>' +
            '<strong>' + $('#lblReport').text() + " </strong> " + outData.Tables[1].Rows[i].OutageReportInfo + '</br>' +
            '<b>' +   (outageType == "C"? $('#lblStatus').text() + ':</b> ' + outData.Tables[1].Rows[i].STATUS :"")+ '</br>' + '</div>' +
            '<div class="iw-bottom-gradient"></div>' + '</div>';

        $('#LeftPanel').html(leftPanelHTML);
        drowPolygon(outData, Data.Rows[i].Outageid);

        var marker = new google.maps.Marker({
            position: destinLocation,
            map: map,
            draggable: false,
            icon: imgIcon,
        });

        (function (marker, data) {
            bindInfoWindow(marker, map, infowindowOutage, content);
        })(marker, data);



        google.maps.event.addListener(map, 'click', function () {
            infowindowOutage.close();
        });
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
        });
        google.maps.event.addListener(infowindowOutage, 'domready', function () {

            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            var iwBackground = iwOuter.prev();

            // Removes background shadow DIV
            iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

            // Removes white background DIV
            iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

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
        $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
            $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
            $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            var obj = this;
            $('#LeftPanel div').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            var latlong = $(this).find('input').val();
            var indexA = latlong.split(',');
            var lat = indexA[0];
            var long = indexA[1];
            var outageId = indexA[2];
            openWindow(lat, long, outageId, outData)

        });
    }
}

function mapGooglePlanned() {


    var markers = [];
    var mapOptions = [];
    var maplabelclass;
    var utilitylatlong = OuterOutage.LoadDefLatLong().value.split(":");
    markers = $.map(outData.Tables[1].Rows, function (val, key) {
        return { "title": val.ZipCode, "lat": val.OutageLatitude, "lng": val.OutageLongitude, "description": val.OutageReportInfo };
    });
    if (outData.Tables[1].Rows.length > 0) {

        mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    else {
        mapOptions = {
            center: new google.maps.LatLng(utilitylatlong[0], utilitylatlong[1]),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $('#LeftPanel').html('<center>' + $("#IDNoPlannedOutage").text() + '</center>');
    }
    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);
    if ($('#hdnPinImageCC').val() != "") {
        var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

    }
    else {
        var imgIcon = (outageType == 'C') ? OutageIconRed : OutageIconBlue;

    }

    var titleOutage = "";
    var marker1 = new Array();
    var infowindow = new Array();
    var leftPanelHTML = '';
    var styledMarker = new Array();

    var Data = outData.Tables[1];
    var clkstatus = true;
    for (var i = 0; i < Data.Rows.length; i++) {
        var data = Data.Rows[i];
        var destinLocation = new google.maps.LatLng(Data.Rows[i].OutageLatitude, Data.Rows[i].OutageLongitude);
        var locName = Data.Rows[i].LocationName;
        var startDate = Data.Rows[i].Outagedate;
        var outageDate = "";
        if (startDate != null) {
            outageDate = startDate;
        }

        var outageTitle = Data.Rows[i].Title;
        var zipCode = Data.Rows[i].ZipCode;
        var outageRestoration = "";
        var Cause = Data.Rows[i].Cause;
        var restorationtime = '';
        if (Data.Rows[i].Restorationdate != null) {
            restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong>" + Data.Rows[i].Restorationdate;

        }
        leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
        leftPanelHTML += '<table>';
        outageTitle = Data.Rows[i].Title;
        var infoStatus = Data.Rows[i]["STATUS"];
        var date = Data.Rows[i]["Outagedate"];
        var title = Data.Rows[i]["Title"];
        var CustomersAffected = Data.Rows[i]["CustomersAffected"];
        var CommunityAffected = Data.Rows[i]["CityName"];

        report = Data.Rows[i]["OutageReportInfo"];
        infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":" + "</strong>" + infoStatus : '';
        leftPanelHTML += '<div><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
        leftPanelHTML += '<table>';
        leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
        leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ':</strong>' + date + '</td></tr>';
        leftPanelHTML += '<tr><td>' + restorationtime + '</td></tr>';
        leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCustomersAffected').text() + ':</strong>' + CustomersAffected + '</td></tr>';
        leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCommunityAffected').text() + ':</strong>' + CommunityAffected + '</td></tr>';
        if (Data.Rows[i]["OutageReportInfo"] == null)
            leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong> N/A </td></tr>';
        else
            leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong>' + report + '</td></tr>';

        leftPanelHTML += '</table>';
        leftPanelHTML += '</div>';

        var content = '<div id="iw-container">' +
            '<div class="iw-title">' + outageTitle + '</div>' +
            '<div class="iw-content">' +
            '<strong>' + $('#lblDate').text() + ': </strong>' + outData.Tables[1].Rows[i].Outagedate + '</br>' +
            '<b>' + $('#lblEstimatedtime').text() + ': </b> ' + outData.Tables[1].Rows[i].Restorationdate + '</br>' +
            '<strong>' + $('#lblCustomersAffected').text() + ': </strong>' + outData.Tables[1].Rows[i].CustomersAffected + '</br>' +
            '<strong>' + $('#lblCommunityAffected').text() + ': </strong>' + outData.Tables[1].Rows[i].CityName + '</br>' +
            '<strong>' + $('#lblReport').text() + " </strong> " + outData.Tables[1].Rows[i].OutageReportInfo + '</br>' + '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';

        $('#LeftPanel').html(leftPanelHTML);
        drowPolygon(outData, Data.Rows[i].Outageid);

        var marker = new google.maps.Marker({
            position: destinLocation,
            map: map,
            draggable: false,
            icon: imgIcon,

        });

        (function (marker, data) {
            bindInfoWindow(marker, map, infowindowOutage, content);
        })(marker, data);



        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infowindowOutage.close();
        });
        google.maps.event.addListener(infowindowOutage, 'domready', function () {

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
        $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
            $("#GIStxtGoogleSearch").removeClass('errorbox');
            error.hideerror();
            $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
            $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            var obj = this;
            $('#LeftPanel div').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            var latlong = $(this).find('input').val();
            var indexA = latlong.split(',');
            var lat = indexA[0];
            var long = indexA[1];
            var outageId = indexA[2];
            openWindow(lat, long, outageId, outData)

        });
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function () {
        infowindow.close();
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function drowPolygon(outData, outageId) {
    var latlng = [];
    $.each(outData.Tables[1].Rows, function (m, k) {
        latlng = [];

        $.when($.each($.grep(outData.Tables[0].Rows, function (n, i) { return (n.Outageid === outageId); }), function () {

            latlng.push(new google.maps.LatLng(this.Latitude, this.Longitude));
        })).done(function () {
            mapPoly = new google.maps.Polygon({
                paths: latlng,

                strokeColor: "#FF4C4C",
                strokeOpacity: 0.75,
                strokeWeight: 1,
                fillColor: "#ffcccc",   // IMPORTANT! NEEDS TO BE A GRAY SCALE
                fillOpacity: 0.15


            });
            mapPoly.setMap(map);
        });
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
    } else {
        //toastr.error("Geolocation is not supported by this browser.")
        toastr.error($('#lblGeoLocationNotSupportedBrowser').text());
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var imgIcon = $('#hdnPinPng').val();//"images/pin.png";
    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: false,
        icon: imgIcon,
    });

    OpenPopUp(lat, lng, marker);
}

function OpenPopUp(Lat, Lng, marker) {
    var param = { 'lat': Lat, 'lon': Lng }
    $.ajax({
        type: "POST",
        url: "outages.aspx/getLocationName",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            var locName = data.d;

            var contentString = '<div id="iw-container">' +
                                 '<div class="iw-title"><strong>' + $('#lblCurrentLocation').text() + "" + '</strong></div>' +
                                 '<div class="iw-content">' +
                                 '<b>' + $('#lblLatitude').text() + '</b> ' + Lat + '</br>' +
                                 '<b>' + $('#lblLongitude').text() + '</b> ' + Lng + '</br>' +
                                 '<b> Location Name: </b> ' + locName + '</br><div class="iw-bottom-gradient"></div>' + '</div></div>';

            var infowindows = new google.maps.InfoWindow({
                content: contentString,
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindows.open(map, marker);
            });
            google.maps.event.addListener(infowindows, 'domready', function () {
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();
                iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
                iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
                var iwCloseBtn = iwOuter.next();
                iwCloseBtn.css({ opacity: '1', right: '60px', top: '25px', border: '0px solid #006599', 'border-radius': '0px' });
                if ($('.iw-content').height() < 140) {
                    $('.iw-bottom-gradient').css({ display: 'none' });
                }
                iwCloseBtn.mouseout(function () {
                    $(this).css({ opacity: '1' });
                });
            });
        }
    });
}

function bindmap() {
    try {
        var markers = [];
        var mapOptions = [];
        markers = $.map(outData.Tables[1].Rows, function (val, key) {
            return { "title": val.ZipCode, "lat": val.OutageLatitude, "lng": val.OutageLongitude, "description": val.OutageReportInfo };
        });
        if (outData.Tables[1].Rows.length > 0) {
            mapOptions = {
                center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
        else {
            mapOptions = {
                center: new google.maps.LatLng($('#hdnLatitude').val(), $('#hdnLongitude').val()),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            if (outageType == "P") {
                $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");
                toastr.error(outData.Tables[2].Rows[0].Message);  // key = 'P'
            }
            else if (outageType == "C") {
                $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");
                toastr.error(outData.Tables[2].Rows[0].Message);  // key = 'C'
            }
            try { $("<center>" + '#outage_Text_canvas').html($('#IDNoOutage').text() + "</center>"); }
            catch (e) { }
        }

        map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

        if ($('#hdnPinImageC').val() != "") {
            var imgIcon = (outageType == 'C') ? $('#hdnPinImageC').val() : $('#hdnPinImageP').val();

        }
        else {
            var imgIcon = (outageType == 'C') ? redpinpointimage : bluepinpointimage;
        }
        var titleOutage = "";
        //var marker = new Array();
        var marker1 = new Array();

        var leftPanelHTML = '';
        var styledMarker = new Array();

        var Data = outData.Tables[1];
        //========================================
        var clkstatus = true;
        for (var i = 0; i < Data.Rows.length; i++) {
            var data = Data.Rows[i];
            var destinLocation = new google.maps.LatLng(Data.Rows[i].OutageLatitude, Data.Rows[i].OutageLongitude);
            var locName = Data.Rows[i].LocationName;
            var startDate = Data.Rows[i].Outagedate;
            var outageDate = "";
            if (startDate != null) {
                outageDate = startDate;
            }

            var outageTitle = Data.Rows[i].Title;
            var zipCode = Data.Rows[i].ZipCode;

            var date = Data.Rows[i].RestorationTime;
            var outageRestoration = "";
            if (date != null) {
                outageRestoration = date;
            }
            var imgIcon, maplabelclass;
            var Cause = Data.Rows[i].Cause;
            leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
            leftPanelHTML += '<table>';

            outageTitle = Data.Rows[i].Title;
            var infoStatus = Data.Rows[i]["STATUS"];
            var date = Data.Rows[i]["Outagedate"];
            var title = Data.Rows[i]["Title"];
            var CustomersAffected = Data.Rows[i]["CustomersAffected"];
            var CommunityAffected = Data.Rows[i]["CityName"];
            report = Data.Rows[i]["OutageReportInfo"];//'<b>' + $('#lblEstimatedtime').text() + '</b>: ' + outData.Tables[1].Rows[i].Restorationdate + '</br>' +
            infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":" + "</strong>" + infoStatus : '';
            var restorationtime = Data.Rows[i]["Restorationdate"];
            leftPanelHTML += '<div><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
            leftPanelHTML += '<table>';
            leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
            leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ':</strong>' + date + '</td></tr>';
            //leftPanelHTML += '<tr><td>' + infoStatus + '</td></tr>';
            leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblEstimatedtime').text() + ':</strong>' + restorationtime + '</td></tr>';
            leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCustomersAffected').text() + ':</strong>' + CustomersAffected + '</td></tr>';
            leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblCommunityAffected').text() + ':</strong>' + CommunityAffected + '</td></tr>';
            if (Data.Rows[i]["OutageReportInfo"] == null)
                leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong> N/A </td></tr>';
            else
                leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong>' + report + '</td></tr>';
            if (outageType == "C") {
                leftPanelHTML += '<tr><td>' + '<strong>' + $('#lblStatus').text() + ':</strong>' + Data.Rows[i]["STATUS"] + '</td></tr>';
            }
            leftPanelHTML += '</table>';
            leftPanelHTML += '</div>';
            var content = '<div id="iw-container">' +
                '<div class="iw-title"><strong>' + $('#lblOutages').text() + '</strong></div>' +
                '<div class="iw-content">' +
                '<strong>' + Data.Rows[i].Title + ' </strong></br>' +
                '<strong>' + $('#lblDate').text() + ': </strong>' + Data.Rows[i].Outagedate + '</br>' +
                '<b>' + $('#lblEstimatedtime').text() + ':</b> ' + Data.Rows[i].Restorationdate + '</br>' +
                '<b>' + $('#lblCustomersAffected').text() + ':</b> ' + Data.Rows[i].CustomersAffected + '</br>' +
                '<b>' + $('#lblCommunityAffected').text() + ':</b> ' + Data.Rows[i].CityName + '</br>' +
                '<strong>' + $('#lblReport').text() + "</strong> " + Data.Rows[i].OutageReportInfo + '</br>' +
                '<b>' +  (outageType == "C"?$('#lblStatus').text() + ':</b> ' + Data.Rows[i].STATUS:"") + '</br>' + '</div>' + '</div>' +
                '<div class="iw-bottom-gradient"></div>' + '</div>';

            try {
                $('#outage_Text_canvas').html(leftPanelHTML);
                $("#Module5").removeClass("preLoader");
            }
            catch (err) { }

            // Event that closes the Info Window with a click on the map
            google.maps.event.addListener(map, 'click', function () {
                infowindowOutage.close();
            });
            // Limit the zoom level
            google.maps.event.addListener(map, 'zoom_changed', function () {
                if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
            });

            google.maps.event.addListener(infowindowOutage, 'domready', function () {

                // Reference to the DIV that wraps the bottom of infowindow
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();
                iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
                iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
                var iwCloseBtn = iwOuter.next();
                iwCloseBtn.css({ opacity: '1', right: '60px', top: '25px', border: '0px solid #006599', 'border-radius': '0px' });
                if ($('.iw-content').height() < 140) {
                    $('.iw-bottom-gradient').css({ display: 'none' });
                }
                iwCloseBtn.mouseout(function () {
                    $(this).css({ opacity: '1' });
                });
            });
            $('#LeftPanel').html(leftPanelHTML);

            $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
                var labels;
                $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
                $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
                $(this).addClass('MessageContainerActive');
                var latlng = $(this).find('input').val();
                $("#GIStxtGoogleSearch").removeClass('errorbox');
                error.hideerror();
                OpenWindow(latlng.split(',')[0], latlng.split(',')[1], latlng.split(',')[2]);
            });



            labels = i + 1;
            var marker = new google.maps.Marker({
                position: destinLocation,
                map: map,
                draggable: false,
                icon: imgIcon,
                title: outageTitle
            });
            (function (marker, data) {
                bindInfoWindow(marker, map, infowindowOutage, content);
            })(marker, data);

            drowPolygon(Data.Rows[i].Outageid);

        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function googleOutageSearch() {
    try {
        var searchString = escape($('#GIStxtGoogleSearch').val());
        if (searchString != '') {
            var result = '';
            var datas = OuterOutage.loadLatLongOuterOutage(searchString, outageType, timeOffsetMinutes).value;

            if (parseInt(datas.Tables[2].Rows[0].Status) == 2) {
                toastr.error(datas.Tables[2].Rows[0].Message);
                //clearAddGraphics();
                if (outageType == 'C') {
                    //$('#LeftPanel').html('<center>No Current Outages</center>');
                    $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");
                }
                else {
                    //  $('#LeftPanel').html('<center>No Planned Outages</center>');
                    $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");
                }
                outData = datas;
                bindmap();
                return false;
            }
            else {
                outData = datas;
                mapGoogle();
                return true;
            }
        }
        else {
            error.showerror("#GIStxtGoogleSearch", ' ' + $('#IDEnterCityZip').text());
            return false;
        }
    }
    catch (e) {

    }
}

function openWindow(lat, long, Outageid, outData) {
    $("#GIStxtGoogleSearch").removeClass('errorbox');
    error.hideerror();
    var markers = [];
    var mapOptions = [];
    var destinLocation = new google.maps.LatLng(lat, long);
    var utilitylatlong = OuterOutage.LoadDefLatLong().value.split(":");
    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

    if (outData.Tables[1].Rows.length > 0) {
        for (var i = 0; i < outData.Tables[1].Rows.length ; i++) {

            if (outData.Tables[1].Rows[i].Outageid == Outageid) {
                mapOptions = {
                    center: new google.maps.LatLng(lat, long),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
            }

        }
    }
    else {
        mapOptions = {
            center: new google.maps.LatLng(utilitylatlong[0], utilitylatlong[1]),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }

    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);
    var titleOutage = "";
    //var marker = new Array();
    var marker1 = new Array();

    var leftPanelHTML = '';
    var styledMarker = new Array();

    var Data = outData.Tables[1];
    //========================================
    var clkstatus = true;
    //initialLocation1 = initialLocation;
    for (var i = 0; i < Data.Rows.length; i++) {
        if (Data.Rows[i].Outageid == Outageid) {

            var data = Data.Rows[i];
            var destinLocation = new google.maps.LatLng(Data.Rows[i].OutageLatitude, Data.Rows[i].OutageLongitude);
            var locName = Data.Rows[i].LocationName;
            var startDate = Data.Rows[i].Outagedate;
            var outageDate = "";
            if (startDate != null) {
                outageDate = startDate;
            }

            var outageTitle = Data.Rows[i].Title;
            var zipCode = Data.Rows[i].ZipCode;
            var date = Data.Rows[i].Outagedate;
            var CustomersAffected = Data.Rows[i]["CustomersAffected"];
            var CommunityAffected = Data.Rows[i]["CityName"];
            var outageRestoration = "";

            var Cause = Data.Rows[i].Cause;
            if (Data.Rows[i].Restorationdate != null) {
                restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong>" + Data.Rows[i].Restorationdate;
            }
            if ($('#hdnPinImageCC').val() != "") {
                var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

            }
            else {
                var imgIcon = (outageType == 'C') ? OutageIconRed : OutageIconBlue;

            }

            var infoStatus = Data.Rows[i].STATUS;
            infoStatus = outageType == 'C' ? infoStatus : '';

            var content = '<div id="iw-container">' +
                '<div class="iw-title">' + outData.Tables[1].Rows[i].Title + '</div>' +
                '<div class="iw-content">' +
                '<strong>' + $('#lblDate').text() + ': </strong>' + outData.Tables[1].Rows[i].Outagedate + '</br>'
                + '<b>' + $('#lblEstimatedtime').text() + ':</b> ' + outData.Tables[1].Rows[i].Restorationdate + '</br>' +
                '<b>' + $('#lblCustomersAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CustomersAffected + '</br>' +
                '<b>' + $('#lblCommunityAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CityName + '</br>' +
                '<strong>' + $('#lblReport').text() + " </strong> " + outData.Tables[1].Rows[i].OutageReportInfo + '</br>' +
                '<strong>' +  (outageType == "C"? $('#lblStatus').text() + ": </strong>" + outData.Tables[1].Rows[i].STATUS:"") + '</br>' + '</div>' +
                '<div class="iw-bottom-gradient"></div>' +
                '</div>';

            var marker = new google.maps.Marker({
                position: destinLocation,
                map: map,
                draggable: false,
                icon: imgIcon,
                title: outageTitle
            });

            (function (marker, data) {
                infowindowOutage.setContent("<div id='iw-container'>" +
                    "<div class='iw-title'>" + outageTitle + "</div>" +
                    "<div class='iw-content'>" +
                    "<strong>" + $('#lblDate').text() + ": </strong>" + date + "</br>" +
                    "<b>" + $('#lblEstimatedtime').text() + ":</b> " + outData.Tables[1].Rows[i].Restorationdate + "</br>" +
                    '<b>' + $('#lblCustomersAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CustomersAffected + '</br>' +
                    '<b>' + $('#lblCommunityAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CityName + '</br>' +
                    "<strong>" + $('#lblReport').text() + " </strong>" + outData.Tables[1].Rows[i].OutageReportInfo + "</br>" +
                    "<strong>" +  (outageType == "C"?$('#lblStatus').text() + ": </strong>" + outData.Tables[1].Rows[i].STATUS:"") + "</br>" + "</div>" +
                    "<div class='iw-bottom-gradient'></div>" +
                    "</div>"
                );
                infowindowOutage.open(map, marker);

            })(marker, data);


            drowPolygon(outData, Data.Rows[i].Outageid);
            // Event that closes the Info Window with a click on the map
            google.maps.event.addListener(map, 'click', function () {
                infowindowOutage.close();
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindowOutage.open(map, marker);
            });
            google.maps.event.addListener(map, 'zoom_changed', function () {
                if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
            });
            google.maps.event.addListener(infowindowOutage, 'domready', function () {

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
}

function errorHandler(err) {
    if (err.code == 1) {
        toastr.error($("#IDAccessDenied").text());
        mapGoogle();
    } else if (err.code == 2) {

    } else {
        toastr.error("Error: " + err);
    }
}