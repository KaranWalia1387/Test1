var minZoomLevel = 5;
var outageType = "C";
var polygonSymbol, polygonGraphic, pts, pt, sym;
var outData;
var marker1 = new Array();
var map;
var redpinpointimage;
var bluepinpointimage;
var pinpointimage = $('#hdnPinPng').val();
var infowindowOutage = null;
var OutageGoogleVisibility;
var utilitylatlong;
var URL = "http://d.smartusys.net/westwindpoc/IID_Serv.kmz";
function printarea() {
    var printContents = document.getElementsByClassName('right_content_box_outage')[0].innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

$(document).ready(function () {
    try {
        pinpointimage = $('#hdnPinPng').val();
        redpinpointimage = $('#hdnPinImageCC').val(); //"images/outages/energy_icon_red.png";
        bluepinpointimage = $('#hdnPinImagePP').val(); //"images/outages/energy_icon_blue.png";
        Mapmode = $('#hdMapId').val();
        OutageGoogleVisibility = $('#hdOutageModuleEnabled').val();
        utilitylatlong = OuterOutage.LoadDefLatLong().value.split(":");
        if (Mapmode == 1 && OutageGoogleVisibility == "True") {
            infowindowOutage = new google.maps.InfoWindow({});
            mapGoogleOutage();
        }
        else if (Mapmode == 0) {
            mapESri();
        }
        $('.GIScurrentlocation').click(function () {
            $("#GIStxtGoogleSearch").removeClass('errorbox');
            error.hideerror();
            if (Mapmode == "1")
            { getLocation(); };

        });

        //$('[name="btnRefresh1"]').
        //$('.icon_refreshbtn').click(function () {
        $('[name="btnRefresh1"]').click(function () {
            debugger;
            $('#GIStxtGoogleSearch').val('');
            $("#GIStxtGoogleSearch").removeClass('errorbox');
            error.hideerror();
            if (Mapmode == "1") {
                mapGoogleOutage();
            }
        });

        $('#GISsearchGoogleMap').click(function () {
            googleOutageSearch();
        });

        $('.right_charging_map a').click(function () {
            toastr.clear();
            $("#GIStxtGoogleSearch").removeClass('errorbox');
            error.hideerror();
            outageType = $(this).attr('key');
            $('#GIStxtGoogleSearch').val('');
            // To show as Active/Deactive
            $('.distance_area a').removeClass('active');
            $(this).addClass('active');
            var selected = $('select#ddlAddress option:selected').val().split(":");
            if (Mapmode == 1) {
                mapGoogleOutage();
            }
        });
        //$('.btnRefresh').click(function () {
        //    $("#GIStxtGoogleSearch").removeClass('errorbox');
        //    error.hideerror();
        //    if (Mapmode == "1") {
        //        mapGoogleOutage();
        //    }

        //});
        $("#Module5").removeClass("preLoader");
    }
    catch (e) {
        console.log(e.message);
    }
});

function loadOutageData(url, param) {
    try {
        toastr.clear();
        $.ajax(
           {
               async: true,
               type: "POST",
               url: url, //"Dashboard.aspx/LoadOutageService",
               data: JSON.stringify(param),//'{IsPlannedOutage: "' + outageType + '" }',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (response) {
                   var count = 0;
                   var r = JSON.parse(response.d);
                   var odata = [];
                   if (r != null) {
                       // Loading of data in proper format as earlier
                       odata.push({ Name: r[1] ? "1" : "Table", Rows: r[1] ? r[1] : r['Table'] }, { Name: "Table1", Rows: r.Table1 }, { Name: "Zipcode", Rows: r.Zipcode });
                       var object = {};
                       for (var key in r) {
                           if (key != "1" && key != "Table1" && key != "Zipcode" && key != "Table") {
                               object["Name"] = key;
                               object["Rows"] = r[key];
                               odata.push(object);
                           }
                           count++;
                       }
                       var ldata = {}
                       ldata["Tables"] = odata.valueOf();
                       outData = ldata;
                       if (outData.Tables[3].Rows[0].Status == 2) {
                           if (window.location.href.indexOf('Dashboard') < 0) {
                               if (outageType == "P") {
                                   $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");
                                   if (outData.Tables[3].Rows[0].Message.indexOf('City') > -1) {
                                       error.showerror("#GIStxtGoogleSearch", ' ' + outData.Tables[3].Rows[0].Message);

                                   }
                               }
                               else if (outageType == "C") {
                                   $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");
                                   if (outData.Tables[3].Rows[0].Message.indexOf('City') > -1) {
                                       error.showerror("#GIStxtGoogleSearch", ' ' + outData.Tables[3].Rows[0].Message);

                                   }
                               }
                               else if (outData.Tables[3].Rows[0].Message.indexOf('City') > -1) {
                                   error.showerror("#GIStxtGoogleSearch", ' ' + outData.Tables[3].Rows[0].Message);

                               }
                           }
                       }
                       bindmap();
                   }
                   else {

                       var mapOptions = [];
                       if ($("#ddlAddress option:selected").attr('latitude') != "") {
                           mapOptions = {
                               center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
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
                       }



                       toastr.clear();
                       if (outageType == "P") {
                           $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");

                       }
                       else if (outageType == "C") {
                           $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");

                       }

                       map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

                       var marker = new google.maps.Marker({
                           position: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
                           map: map,
                           draggable: false,
                           icon: pinpointimage
                       });




                       OpenPopUp(utilitylatlong[0], utilitylatlong[1], marker);
                   }
               },
               error: function (response) {
                   console.log(response.d);
               }
           });
    }
    catch (e) {
        console.log(e.message);
    }
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
                                 '<div class="iw-title"><strong>' + $('#lblCurrentLocation').text()  + '</strong></div>' +
                                 '<div class="iw-content">' +
                                 '<b>' + $('#lblLatitude').text() + '</b> ' + Lat + '</br>' +
                                 '<b>' + $('#lblLongitude').text() + '</b> ' + Lng + '</br>' +
                                 '<b> Location Name: </b> ' + locName + '</br><div class="iw-bottom-gradient"></div>' + '</div>' + '</div>';

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

function mapESri() {
    try {
        require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
                 "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/dijit/InfoWindow"],

         function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, InfoWindow) {
             setTimeout(function () { }, 2000);
             var outageType = "C";
             var polygonSymbol, polygonGraphic, pts, pt, sym;

             var initExtent = new esri.geometry.Extent({ "xmin": -13947963, "ymin": 4434797, "xmax": -13170751, "ymax": 4779680, "spatialReference": { "wkid": 102100 } });
             //var popup = new esri.dijit.Popup(null, dojo.create("div"));

             var map = new Map("outage_map_canvas", {
                 basemap: "streets",
                 zoom: 3,
                 minZoom: 3,
                 maxZoom: 16,
                 //infoWindow: popup,
                 extent: initExtent,
                 suppressInfoWindows: true,
             });
             var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
             map.addLayer(basemap);
             var kmlUrl = URL;
             var kmlOptions = {
                 clickable: 0, // polygon ignores mouse clicks
                 preserveViewport: 1,
                 suppressInfoWindows: true,
             };

             var kmlLayer = new esri.layers.KMLLayer(kmlUrl, kmlOptions);
             map.addLayer(kmlLayer);
             utils.autoRecenter(map);

             var geocodeService = new Geocoder(window.location.protocol + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
             var tableID = '';

             $('.GIScurrentlocation').click(function () { showGeolocation(); });

             $('#btnRefresh').click(function (event) {
                 $('#GIStxtGoogleSearch').val('')
                 loadData();
                 drawpolygon();

                 return false;// added to stop reloading of page
             });

             on(map, "load", function () {
                 loadData(); //Bug ID: 0009021: Map displayed in firefox and 0009027 : current location can be accessed. 
                 drawpolygon();
                 $('.esriPopup .actionsPane .action').hide();

                 on(geocodeService, "address-to-locations-complete", geocodeResults);
                 on(geocodeService, "error", geocodeError);
                 //#5455-start
                 if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1).toLowerCase() == 'outages.aspx')
                     on(dom.byId("GISsearchGoogleMap"), "click", geoSearch);
                 //#5455-end
             });

             function geoSearch() {
                 try {
                     var searchString = escape(dom.byId('GIStxtGoogleSearch').value);
                     if (searchString != '') {
                         var url = "dashboard.aspx/SearchOutageService";
                         var param = { 'search': searchString, 'isplanned': outageType };
                         loadOutageData(url, param);
                         if (parseInt(data.Tables[3].Rows[0].Status) == 2) {
                             $('#LeftPanel').html('<center>' + $('#IDNoOutage').text() + '</center>');
                             clearAddGraphics();
                             drawpolygon();
                             toastr.error(data.Tables[3].Rows[0].Message);
                             return false;
                         }
                         else
                             drawpolygon();
                         plotPicPoint();
                         return true;
                     }
                     else {
                         error.showerror("#GIStxtGoogleSearch", ' ' + $('#IDEnterCityZip').text());
                         return false;
                     }
                 }
                 catch (e) {

                 }
             }

             function geocodeResults(places) {
                 sym = new esri.symbol.PictureMarkerSymbol(pinpointimage, 36, 47);
                 if (places.addresses.length > 0) {
                     clearAddGraphics();
                     // Objects for the graphic
                     var place, attributes, infoTemplate, pt, graphic;
                     // Create and add graphics with pop-ups
                     for (var i = 0; i < places.addresses.length; i++) {
                         place = places.addresses[i];
                         pt = place.location;
                         attributes = { address: place.address, score: place.score, lat: pt.y.toFixed(2), lon: pt.x.toFixed(2), CustomersAffected: place.CustomersAffected };
                         infoTemplate = new InfoTemplate("Geocode Result", "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='window.zoomToPlace(" + pt.x + "," + pt.y + ",15)';>Zoom To</span>");
                         graphic = new Graphic(pt, sym, attributes, infoTemplate);
                         map.graphics.add(graphic);
                     }
                     map.centerAndZoom(places.addresses[0].location, 12);
                 } else {
                     // toastr.error("Sorry, address or place not found.");
                     toastr.error($('#lblAddplaceNotFound').text());
                 }
             }

             function geocodeError(errorInfo) {
                 // toastr.error("Sorry, place or address not found!");
                 toastr.error($('#lblAddplaceNotFound').text());
             }

             function showGeolocation() {
                 if (navigator.geolocation) {
                     navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                 } else {
                     toastr.error($('#IDGeo').text());
                 }
             }

             function getCurrentLocation(position) {
                 clearAddGraphics();
                 // Create a point
                 pt = new Point(position.coords.longitude, position.coords.latitude);
                 // Create a symbol and pop-up template and add the graphic to the map
                 var symbol = new esri.symbol.PictureMarkerSymbol(pinpointimage, 36, 47);
                 var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
                 var locName = "";
                 var request =
                        {
                            "latlong": pt.y.toFixed(2) + "," + pt.x.toFixed(2)
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
                         var infoTemplate = new InfoTemplate($('#lblMyLocation').text(), $('#lblLatitude').text() + ": ${lat} <br/>" + $('#lblLongitude').text() + ": ${lon} <br/>" + $('#lblLocationName').text() + ": " + locName);
                         //hide infotemplate
                         //infoTemplate = '';
                         //attributes = ''

                         var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                         map.graphics.add(graphic);
                         map.centerAndZoom(pt, 13);
                     },

                     error: function (request) {
                         toastr.error('Error!! ' + request.statusText);
                     }
                 });
             }

             function errorHandler(err) {
                 if (err.code == 1) {
                     toastr.error($("#IDAccessDenied").text());
                 } else if (err.code == 2) {
                 } else {
                     toastr.error("Error: " + err);
                 }
             }

             function createPolygonSymbol() {
                 return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
               new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
               new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
             }

             function drawpolygon() {
                 clearAddGraphics();
                 polygonSymbol = createPolygonSymbol();
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
                             map.centerAndZoom(pt, 12);
                         }
                     }
                 }
                 else {
                     //For Default Lat/Long
                     if ($('#ddlAddress option:selected').attr('longitude') != "") {
                         pt = new Point($('#ddlAddress option:selected').attr('longitude'), $('#ddlAddress option:selected').attr('latitude')); pt = new Point($("#ddlAddress").val().split(':')[4], $("#ddlAddress").val().split(':')[3]);
                         map.centerAndZoom(pt, 12);
                     }
                     else {
                         pt = new Point(utilitylatlong[0], utilitylatlong[1]);
                         map.centerAndZoom(pt, 12);
                     }
                 }
                 if (data.Tables[1].Rows.length > 0) {
                     var tabLength = data.Tables[1].Rows.length;
                     for (var i = 0; i < tabLength; i++) {
                         sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol(redpinpointimage, 36, 47) : new esri.symbol.PictureMarkerSymbol(bluepinpointimage, 36, 47);
                         var attributes, infoTemplate, pt, graphic;
                         pt = new Point(data.Tables[1].Rows[i]["OutageLongitude"], data.Tables[1].Rows[i]["OutageLatitude"]);
                         map.centerAndZoom(pt, 12);
                         var title = data.Tables[1].Rows[i]["Title"];
                         var infoStatus = data.Tables[1].Rows[i]["STATUS"];
                         var date = data.Tables[1].Rows[i]["Outagedate"];
                         var CustomersAffected = data.Tables[1].Rows[i]["CustomersAffected"];
                         var CommunityAffected = data.Tables[1].Rows[i]["CityName"];
                         var report = data.Tables[1].Rows[i]["OutageReportInfo"];
                         infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":</strong> " + infoStatus : '';
                         var restorationtime = '';
                         if (data.Tables[1].Rows[i]["RestorationTime"] != null) {
                             restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong> " + data.Tables[1].Rows[i]["Restorationdate"];
                         }
                         attributes = { "Date": date, "Title": title, "Report": report, "Restorationtime": restorationtime, "CustomersAffected": CustomersAffected, "CommunityAffected": CommunityAffected, "Status": data.Tables[1].Rows[i]["STATUS"] };
                         infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br><strong>" + $('#lblDate').text() + ":</strong> " + "</b>${Date}<br>${Restorationtime}<br><strong>" + $('#lblCustomersAffected').text() + ":</strong> " + "${CustomersAffected}<br><strong>" + $('#lblCommunityAffected').text() + ":</strong> " + "${CommunityAffected}<br><strong>" + $('#lblReport').text() +
                             "</strong> " + "${Report}<br><strong>" + $('#lblStatus').text() + "</strong> " + "</b>${Status}");
                         graphic = new Graphic(pt, sym, attributes, infoTemplate);
                         map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                     }
                 }

                 $("#Module5").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Outage 

             }

             //new requirements for list view Inner html bind
             function plotPicPoint() {
                 var leftPanelHTML = '';

                 if (data.Tables[1].Rows.length > 0) {
                     sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol(redpinpointimage, 36, 47) : new esri.symbol.PictureMarkerSymbol(bluepinpointimage, 36, 47);
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
                             restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ": </strong>" + data.Tables[1].Rows[i]["Restorationdate"];
                         }
                         leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + data.Tables[1].Rows[i]["OutageLongitude"] + "," + data.Tables[1].Rows[i]["OutageLatitude"] + "," + data.Tables[1].Rows[i]["Outageid"] + "," + i + '">';
                         leftPanelHTML += '<table>';
                         leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
                         leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ': </strong>' + date + '</td></tr>';
                         leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblCustomersAffected').text() + ':' + '</strong>' + CustomersAffected + '</td></tr>';
                         leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblCommunityAffected').text() + ':' + '</strong>' + CommunityAffected + '</td></tr>';
                         leftPanelHTML += '<tr><td>' + restorationtime + '</td></tr>';
                         if (data.Tables[1].Rows[i]["OutageReportInfo"] == null)
                             leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong> N/A </td></tr>';
                         else
                             leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + '</strong>' + report + '</td></tr>';
                         if (outageType == "C") {
                             leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblStatus').text() + ':</strong>' + data.Tables[1].Rows[i]["STATUS"] + '</td></tr>';
                         }
                         leftPanelHTML += '</table>';
                         leftPanelHTML += '</div>';

                         // this code used to put poit information in another Div
                         try {
                             $('#outage_Text_canvas').html(leftPanelHTML);
                         }
                         catch (err) { }
                     }

                     $('#LeftPanel').html(leftPanelHTML);

                     $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
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
                         report = data.Tables[1].Rows[index]["OutageReportInfo"];
                         infoStatus = outageType == 'C' ? infoStatus : '';
                         var restorationtime = '';
                         if (data.Tables[1].Rows[index]["RestorationTime"] != null) {
                             restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":</strong> " + data.Tables[1].Rows[index]["Restorationdate"];
                         }
                         attributes = { "Date": date, "Title": title, "Report": report, "Restorationtime": restorationtime, "CustomersAffected": CustomersAffected, "CommunityAffected": CommunityAffected, "Status": data.Tables[1].Rows[index]["STATUS"] };
                         infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b> ${Title}</b><br><strong>" + $('#lblDate').text() + ": </strong> " + "</b>${Date}<br>${Restorationtime}<br><strong>" +
                             $('#lblCustomersAffected').text() + ":</strong> " + "${CustomersAffected}<br><strong>" + $('#lblCommunityAffected').text() + ":</strong> "
                             + "${CommunityAffected}<br><strong>" + $('#lblReport').text() + "</strong> " +(outageType=="C"? "${Report}<br><strong>" + $('#lblStatus').text() + "</strong> ":"")
                             + data.Tables[1].Rows[index]["STATUS"]);

                         var zoompt = new Point(latlng.split(',')[0], latlng.split(',')[1]);
                         graphic = new Graphic(zoompt, sym, attributes, infoTemplate);
                         map.infoWindow.setContent(graphic.getContent());
                         map.infoWindow.setTitle($('#lblOutages').text());
                         map.infoWindow.show(zoompt, InfoWindow.ANCHOR_UPPERRIGHT);
                         map.centerAndZoom(zoompt, 12);
                         map.graphics.add(graphic);
                     });
                 }
                 else {
                     try {
                         if (window.location.href.indexOf('Dashboard') < 0) {
                             if (outageType == 'C') {
                                 $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");

                             }
                             else if (outageType == 'P') {
                                 $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");

                             }
                         }
                     }
                     catch (e) {
                         console.log(e.message);
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

             function loadData() {
                 data = null;
                 var url = "dashboard.aspx/LoadOutageService";
                 var param = { 'IsPlannedOutage': outageType };
                 loadOutageData(url, param);
                 var selected = $('select#ddlAddress option:selected').val().split(":");
                 if (data != null && data.Tables.length > 0 && data.Tables[0].Rows.length > 0) {
                     tableID = data.Tables[3].Name;
                     plotPicPoint();
                 }
                 else {
                     try {
                         clearAddGraphics();
                         $('#LeftPanel').html('<center>' + $('#IDNoOutage').text() + '</center>');
                         pt = new Point(selected[4], selected[3]);
                         map.centerAndZoom(pt, 12); showGeolocation();
                     }
                     catch (e) { }
                 }
                 $('.right_charging_map a').click(function () {

                     outageType = $(this).attr('key');
                     $('#GIStxtGoogleSearch').val('');
                     // To show as Active/Deactive
                     $('.distance_area a').removeClass('active');
                     $(this).addClass('active');
                     var selected = $('select#ddlAddress option:selected').val().split(":");
                     var url = "dashboard.aspx/LoadOutageService";
                     var param = { 'IsPlannedOutage': outageType };
                     loadOutageData(url, param);
                     if (data != null && data.Tables.length > 0 && data.Tables[0].Rows.length > 0) {
                         tableID = data.Tables[3].Name;
                         clearAddGraphics();
                         drawpolygon();
                         plotPicPoint();
                     }
                     else {
                         clearAddGraphics();
                         //Added for correct alert message for NO current and NO Planned outages
                         if (outageType == 'C') {
                             $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");

                         }
                         else if (outageType == 'P') {
                             $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");

                         }
                         pt = new Point(selected[4], selected[3]);
                         map.centerAndZoom(pt, 12);
                     }
                 });
             }

             function loadOutageData(url, param) {
                 $.ajax(
                    {
                        async: false,
                        type: "POST",
                        url: url,
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var count = 0;
                            var r = JSON.parse(response.d);
                            var odata = [];
                            // Loading of data in proper format as earlier
                            odata.push({ Name: r[1] ? "1" : "Table", Rows: r[1] ? r[1] : r['Table'] }, { Name: "Table1", Rows: r.Table1 }, { Name: "Zipcode", Rows: r.Zipcode });
                            var object = {};
                            for (var key in r) {
                                if (key != "1" && key != "Table1" && key != "Zipcode" && key != "Table") {
                                    object = {};
                                    object["Name"] = key;
                                    object["Rows"] = r[key];
                                    odata.push(object);
                                }
                                count++;
                            }
                            var ldata = {}
                            ldata["Tables"] = odata.valueOf();
                            data = ldata;

                        },
                        error: function (response) {
                            console.log(response.d);
                        }
                    });
             }
         });
    }
    catch (e) {
        console.log(e.message);
    }
}

function mapGoogleOutage() {
    toastr.clear();
    $("#GIStxtGoogleSearch").removeClass('errorbox');
    error.hideerror();
    var url = "dashboard.aspx/LoadOutageService";
    var param = { 'IsPlannedOutage': outageType };
    loadOutageData(url, param);
}

function bindmap(bindmap) {
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
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                suppressInfoWindows: true,
            };
        }
        else {
            //Default Lat/Long
            if ($("#ddlAddress option:selected").attr('latitude') != "" && $("#ddlAddress option:selected").attr('latitude') != undefined) {
                mapOptions = {
                    center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    suppressInfoWindows: true,
                };
            }
            else {
                mapOptions = {
                    center: new google.maps.LatLng(utilitylatlong[0], utilitylatlong[1]),
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    suppressInfoWindows: true,
                };
            }
            if (window.location.href.indexOf('Dashboard') < 0) {
                if (outageType == "P") {
                    $('#LeftPanel').html("<center>" + $('#IDNoPlannedOutage').text() + "</center>");
                    //   toastr.error(outData.Tables[3].Rows[0].Message);  // key = 'P'
                }
                else if (outageType == "C") {
                    $('#LeftPanel').html("<center>" + $('#IDNoOutage').text() + "</center>");
                    //  toastr.error(outData.Tables[3].Rows[0].Message);  // key = 'C'
                }
                try { $('#outage_Text_canvas').html("<center>" + $('#IDNoOutage').text() + "</center>"); }
                catch (e) { }
            }
            else {
                if (outageType == "C") {
                    $('#outage_Text_canvas').html("<center>" + $('#IDNoOutage').text() + "</center>");
                }

            }
        }
        map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

        var kmlURL = URL;
        var kmlOptions = {
            clickable: 0, // polygon ignores mouse clicks
            preserveViewport: 1,
        };

        kmlLayer = new google.maps.KmlLayer(kmlURL, kmlOptions);
        kmlLayer.setMap(map);

        if ($('#hdnPinImageCC').val() != "") {
            var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

        }
        else {
            var imgIcon = (outageType == 'C') ? redpinpointimage : bluepinpointimage;
        }

        //var marker = new Array();
        var marker1 = new Array();

        var leftPanelHTML = '';
        var Data = outData.Tables[1];
        //========================================
        for (var i = 0; i < Data.Rows.length; i++) {
            var data = Data.Rows[i];
            var destinLocation = new google.maps.LatLng(Data.Rows[i].OutageLatitude, Data.Rows[i].OutageLongitude);
            var startDate = Data.Rows[i].Outagedate;
            var outageDate = "";
            if (startDate != null) {
                outageDate = startDate;
            }

            var outageTitle = Data.Rows[i].Title;
            var date = Data.Rows[i].RestorationTime;
            var outageRestoration = "";
            if (date != null) {
                outageRestoration = date;
            }
            var imgIcon;
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
            var restorationtime = Data.Rows[i]["Restorationdate"];
            leftPanelHTML += '<div><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '">';
            leftPanelHTML += '<table>';
            leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
            leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + ':</strong>' + date + '</td></tr>';
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
                                   '<strong>' + Data.Rows[i].Title + '</strong></br>' +
                                  '<strong>' + $('#lblDate').text() + ': </strong>' + Data.Rows[i].Outagedate + '</br>' +
                                  '<b>' + $('#lblEstimatedtime').text() + ':</b> ' + Data.Rows[i].Restorationdate + '</br>' +
                                    '<b>' + $('#lblCustomersAffected').text() + ':</b> ' + Data.Rows[i].CustomersAffected + '</br>' +
                                      '<b>' + $('#lblCommunityAffected').text() + ':</b> ' + Data.Rows[i].CityName + '</br>' +
                                  '<strong>' + $('#lblReport').text() + "</strong> " + Data.Rows[i].OutageReportInfo + '</br>' +
                                      '<b>' +  (outageType == "C"?$('#lblStatus').text() + ':</b> ' + Data.Rows[i].STATUS:"") + '</br>' + '</div>' +
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

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function () {
        infowindow.close();
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function closeAllInfoWindows(infowindow) {
    for (var i = 0; i < infowindow.length; i++) {
        infowindow[i].close();
    }
}

function OpenWindow(longitude, latitude, outageId) {
    try {
        var mapOptions = [];
        if (outData.Tables[1].Rows.length > 0) {
            for (var i = 0; i < outData.Tables[1].Rows.length ; i++) {

                if (outData.Tables[1].Rows[i].OutageLatitude == latitude) {
                    mapOptions = {
                        center: new google.maps.LatLng(latitude, longitude),
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                }
            }
        }
        else {
            mapOptions = {
                center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
        map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);
        if ($('#hdnPinImageCC').val() != "") {
            var imgIcon = (outageType == 'C') ? $('#hdnPinImageCC').val() : $('#hdnPinImagePP').val();

        }
        else {
            var imgIcon = (outageType == 'C') ? redpinpointimage : bluepinpointimage;
        }

        for (var i = 0; i < outData.Tables[1].Rows.length; i++) {
            if (outData.Tables[1].Rows[i].Outageid == outageId) {
                var destinLocation = new google.maps.LatLng(outData.Tables[1].Rows[i].OutageLatitude, outData.Tables[1].Rows[i].OutageLongitude);
                outageTitle = outData.Tables[1].Rows[i].Title;
                // InfoWindow content
                var content = '<div id="iw-container">' +
                    '<div class="iw-title"><strong>' + $('#lblOutages').text() + '</strong></div>' +
                    '<div class="iw-content">' +
                    '<strong>' + outData.Tables[1].Rows[i].Title + '</strong></br>' +
                    '<strong>' + $('#lblDate').text() + ':</strong> ' + outData.Tables[1].Rows[i].Outagedate + '</br>' +
                    '<b>' + $('#lblEstimatedtime').text() + ':</b> ' + outData.Tables[1].Rows[i].Restorationdate + '</br>' +
                    '<b>' + $('#lblCustomersAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CustomersAffected + '</br>' +
                    '<b>' + $('#lblCommunityAffected').text() + ':</b> ' + outData.Tables[1].Rows[i].CityName + '</br>' +
                    '<strong>' + $('#lblReport').text() + "</strong> " + outData.Tables[1].Rows[i].OutageReportInfo + '</br>' +
                    (outageType=="C"?'<b>' + $('#lblStatus').text() + ':</b> ' + outData.Tables[1].Rows[i].STATUS :"")+ '</br>' + '</div>' +
                    '<div class="iw-bottom-gradient"></div>' + '</div>';
                // A new Info Window is created and set content
                var infowindowOutage = new google.maps.InfoWindow({
                    content: content,
                    // Assign a maximum value for the width of the infowindow allows
                    // greater control over the various content elements
                    maxWidth: 350
                });
                var marker = new google.maps.Marker({
                    position: destinLocation,
                    map: map,
                    //label: labels.toString(),
                    draggable: false,
                    icon: imgIcon,
                    title: outageTitle
                });

                (function (marker) {
                    //google.maps.event.addListener(marker, "click", function (e) {
                    infowindowOutage.open(map, marker);
                    //  });
                })(marker);

                // Event that closes the Info Window with a click on the map
                // Event that closes the Info Window with a click on the map
                google.maps.event.addListener(map, 'click', function () {
                    infowindowOutage.close();
                });

                // Limit the zoom level
                google.maps.event.addListener(map, 'zoom_changed', function () {
                    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindowOutage.open(map, marker);
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
                    iwCloseBtn.css({ opacity: '1', right: '60px', top: '25px', border: '0px solid #006599', 'border-radius': '0px' });
                    if ($('.iw-content').height() < 140) {
                        $('.iw-bottom-gradient').css({ display: 'none' });
                    }
                    iwCloseBtn.mouseout(function () {
                        $(this).css({ opacity: '1' });
                    });
                });

                drowPolygon(parseInt(outageId));
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function drowPolygon(outageId) {
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
                fillColor: "#ffcccc",
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
        toastr.error($('#lblGeoLocationNotSupportedBrowser').text());
    }
}

function errorHandler(err) {
    if (err.code == 1) {
        toastr.error($("#IDAccessDenied").text());
        //toastr.error($("#lblGeoErrorCode1").text());
    } else if (err.code == 2) {
    } else {
        toastr.error("Error: " + err);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var imgIcon = pinpointimage;

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

function googleOutageSearch() {
    try {
        var searchString = escape($('#GIStxtGoogleSearch').val().replace(/[^a-z0-9\s]/gi, ''));
        if (searchString != '') {
            var url = "dashboard.aspx/SearchOutageService";
            var param = { 'search': searchString, 'isplanned': outageType };
            loadOutageData(url, param);
            return true;
        }
        else {
            error.showerror("#GIStxtGoogleSearch", ' ' + $('#IDEnterCityZip').text());
            return false;
        }
    }
    catch (e) {

    }
}

