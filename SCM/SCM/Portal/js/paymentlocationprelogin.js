
var map;
var Mapmode = 0;
var minZoomLevel = 5;
var paymentLocationTable = null;
var paymentlocationData = null;
var outData = null;
$(document).ready(function () {
    Mapmode = $('#hdMapId').val();
    paymentLocationTable = PaymentLocationPreLogin.LoadData();
    paymentlocationData = paymentLocationTable.value.Tables[0];
    outData = paymentLocationTable.value.Tables[0];
    selectmap();
    $("#ddlCity").change(function () {

        var obj = $('#ddlCity option:selected');
        if (obj.index() > 0) {
            PaymentLocationPreLogin.setSession($('#ddlCity option:selected').val());
        }
        else {
            PaymentLocationPreLogin.setSession("0");
        }
        if (Mapmode == "1")
        {
            paymentLocationTable = PaymentLocationPreLogin.LoadDatabycity($('#ddlCity option:selected').val());
            outData = paymentLocationTable.value.Tables[0];
            mapGoogle();
        }
         
       
        if (Mapmode == "1")
            k('#LeftPanel div').live('click', function () {
                var obj = this;
                $('#LeftPanel div').removeClass('MessageContainerActive');
                $(this).addClass('MessageContainerActive');
                var PaylocationId = $(this).find('input').val();
                bingpay(PaylocationId);
            });

    });
    $('.active').removeClass('active');
    $('.icon_payment_location').addClass('active');

});


function selectmap() {
   
    if (Mapmode=="1")
        mapGoogle();
    else {
        createmap();
    }
    if (Mapmode == "1")
        k('#LeftPanel div').live('click', function () {
            var obj = this;
            $('#LeftPanel div').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            var PaylocationId = $(this).find('input').val();
            bingpay(PaylocationId);
        });

}

function mapGoogle() {
    var markers = [];
    var mapOptions = [];
   
    
    markers = $.map(outData.Rows, function (val, key) {
        return { "title": val.ZipCode, "lat": val.PaymentLatitude, "lng": val.PaymentLongitude, "description": val.LocationName };
    });
    if (outData.Rows.length > 0) {
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
        $('#LeftPanel').html('<center>'+$('#PaymentLocationsNotFound').text()+'</center>');
    }
    map = new google.maps.Map(document.getElementById("paymentlocationprelogin_map_canvas"), mapOptions);
    bingPaymentPoint();
   
}
function bingPaymentPoint() {
     var infowindow = new Array();
    var leftPanelHTML = '';
    var labels;
    var roww;
   
    var imgIcon = {
        url: $('#hdnMapIcon').val(),// 'images/pin.png ',
   
    };
    for (var i = 0; i < outData.Rows.length; i++) {
        roww = outData.Rows[i];
        
        var PaymentLatitude = outData.Rows[i].PaymentLatitude;
        var PaymentLongitude=outData.Rows[i].PaymentLongitude;
        leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + outData.Rows[i].PaylocationId + '"/>';
        leftPanelHTML += '<table>';
        leftPanelHTML += '<tr><td rowspan="6"><img  src="' + $('#hdnMapIcon').val() + '"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
        leftPanelHTML += '<tr class="blue"><td><b>' + outData.Rows[i].LocationName + '</b></td></tr>';
        leftPanelHTML += '<tr><td>' + outData.Rows[i].Address1 + ',' + outData.Rows[i].Address2 + '</td></tr>';
        leftPanelHTML += '<tr><td>' + outData.Rows[i].Cityname + '</td></tr>';
        leftPanelHTML += '</table></div>';
        var destinLocation = new google.maps.LatLng(PaymentLatitude, PaymentLongitude);
        
        labels = i + 1;
        $('#LeftPanel').html(leftPanelHTML);
        var k = 0;
        for (var j = i; j < outData.Rows.length; j++) {
            if (PaymentLatitude == outData.Rows[j].PaymentLatitude.toString() && PaymentLongitude == outData.Rows[j].PaymentLongitude.toString() && j != i) {
                k++;
            }
        }
        if (k != 0)
            continue

        // A new Info Window is created and set content
        var infowindow = new google.maps.InfoWindow();
       
        var marker = new MarkerWithLabel({
            position: destinLocation,
            map: map,
            labelAnchor: new google.maps.Point(10, 33),
            labelContent: labels.toString(),
            labelInBackground: false,
            labelClass: "labels",
            icon: imgIcon,
            draggable: false,
            title: roww.LocationName,
        });
        (function (marker, roww) {
            google.maps.event.addListener(marker, "click", function (e) {
                infowindow.setContent('<div id="iw-container">' +
                          '<div class="iw-title">' + roww.LocationName + '</div>' +   '<div class="iw-content">' +
                          '<b>'+$('#Address').text()+'</b>: ' + roww.Address1 + ',' + roww.Address2 + '</br>' + '<b>'+$('#City').text()+'</b>: ' + roww.Cityname + '</br>' +
                          //'<b>' + $('#PaymentHours').text() + '</b>: ' + roww.PaymentHrs + '</br>' +
                          '<b>' + $('#ContactNo').text() + '</b>: ' + roww.ContactNo + '</br>' +
                          '<b>'+$('#Emailid').text()+'</b>: ' + roww.Emailid + '</div>' +  '<div class="iw-bottom-gradient"></div>' + '</div>');
                infowindow.open(map, marker);
            });
        })(marker, roww);

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infowindow.close();
        });
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
        });
        google.maps.event.addListener(infowindow, 'domready', function () {

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

            //// Moves the infowindow 115px to the right.
            //iwOuter.parent().parent().css({ left: '100px' });

            //// Moves the shadow of the arrow 76px to the left margin.
            //iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            //// Moves the arrow 76px to the left margin.
            //iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

            // Changes the desired tail shadow color.
           // iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.css({ opacity: '1', right: '60px', top: '23px', border: '0px solid #006599', 'border-radius': '0px' });

            // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
            if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({ display: 'none' });
            }

            // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
            iwCloseBtn.mouseout(function () {
                $(this).css({ opacity: '1' });
            });
        });
        //  drowPolygon(outData.Rows[i].PaylocationId)
    }
}
function bingpay(PaylocationId) {
    var mapOptions = [];
    if (outData.Rows.length > 0) {
        for (var i = 0; i < outData.Rows.length ; i++) {
            if (outData.Rows[i].PaylocationId.toString() == PaylocationId) {
                mapOptions = {
                    center: new google.maps.LatLng(outData.Rows[i].PaymentLatitude, outData.Rows[i].PaymentLongitude),
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
        $('#LeftPanel').html('<center>'+$('#PaymentLocationsNotFound').text()+'</center>');
    }
    map = new google.maps.Map(document.getElementById("paymentlocationprelogin_map_canvas"), mapOptions);
    var imgIcon = {
        url: $('#hdnMapIcon').val(),// 'images/pin.png ',
   
    };
    for (var i = 0; i < outData.Rows.length; i++) {
        if (outData.Rows[i].PaylocationId == PaylocationId) {
            var destinLocation = new google.maps.LatLng(outData.Rows[i].PaymentLatitude, outData.Rows[i].PaymentLongitude);
   
            outageTitle = outData.Rows[i].LocationName;
         var content = '<div id="iw-container">' +
                              '<div class="iw-title">' + outData.Rows[i].LocationName + '</div>' +
                              '<div class="iw-content">' +
                    '<b>' + $('#Address').text() + '</b>: ' + outData.Rows[i].Address1 + ',' + outData.Rows[i].Address2 + '</br>' +
                    '<b>' + $('#City').text() + '</b>: ' + outData.Rows[i].Cityname + '</br>' +// $('#PaymentHours').text() + '</b>: ' + outData.Rows[i].PaymentHrs + '</br>' +
                    '<b>'+$('#ContactNo').text()+'</b>: ' + outData.Rows[i].ContactNo + '</br>' +
                    '<b>'+$('#Emailid').text()+'</b>: ' + outData.Rows[i].Emailid + '</div>' +
                              '<div class="iw-bottom-gradient"></div>' +
                            '</div>';
            labels = i + 1;
            // $('#LeftPanel').html(leftPanelHTML);
            // A new Info Window is created and set content
            var infowindow = new google.maps.InfoWindow({
                content: content,
                // Assign a maximum value for the width of the infowindow allows
                // greater control over the various content elements
                maxWidth: 350
            });
            // addListnerLeftPanel();
            //var marker = new google.maps.Marker({
            //    position: destinLocation,
            //    map: map,
            //    label: labels.toString(),
            //    draggable: false,
            //    icon: imgIcon,
            //    title: outageTitle
            //});

            var marker = new MarkerWithLabel({
                position: destinLocation,
                map: map,
                labelAnchor: new google.maps.Point(10, 33),
                labelContent: labels.toString(),
                labelInBackground: false,
                labelClass: "labels",
                icon: imgIcon,
                draggable: false,
                title: outageTitle,
            });

          

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);

            // Event that closes the Info Window with a click on the map
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            });
            google.maps.event.addListener(map, 'zoom_changed', function () {
                if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
            });
            google.maps.event.addListener(infowindow, 'domready', function () {

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

                //// Moves the infowindow 115px to the right.
                //iwOuter.parent().parent().css({ left: '100px' });

                //// Moves the shadow of the arrow 76px to the left margin.
                //iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

                //// Moves the arrow 76px to the left margin.
                //iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

                // Changes the desired tail shadow color.
                //iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

                // Reference to the div that groups the close button elements.
                var iwCloseBtn = iwOuter.next();

                // Apply the desired effect to the close button
                iwCloseBtn.css({ opacity: '1', right: '60px', top: '23px', border: '0px solid #006599', 'border-radius': '0px' });

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

function createmap() {
    $('#page_loader').show();
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic", "esri/tasks/GeometryService", "esri/tasks/ProjectParameters", "esri/SpatialReference",
          "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "esri/tasks/RouteTask", "esri/tasks/RouteParameters", "esri/tasks/FeatureSet", "esri/units",
          "js/utils.js", "dojo/promise/all", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/dijit/InfoWindow", "dojo/dom-construct"],
          function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, GeometryService, ProjectParameters, SpatialReference, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, Directions, RouteParameters, FeatureSet, Units, utils, all, Color, on, dom, InfoWindow, domConstruct) {
              "use strict"

              var geocodeService;
              var sym = new esri.symbol.PictureMarkerSymbol( $('#hdnMapIcon').val(), 30, 40);
              var map = new Map("paymentlocationprelogin_map_canvas", {
                  basemap: "streets",
                  zoom: 3,
                  minZoom: 3,
                  maxZoom: 16
              });

           
             
              try {
                  geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
                  on(geocodeService, "error", errorHandler);

              } catch (e) {
                  pt = new Point($('#hdnLongitude').val(), $('#hdnLatitude').val());
                  map.centerAndZoom(pt, 15);
              }
            

              /**************************MAP PLOTTING**************************/

              var pt;
            
              function addpp(paymentlocationData) {
                  var leftPanelHTML = '';
                  try {
                      clearGeolocationGraphics();
                      if (paymentlocationData.Rows.length == 0) {
                      
                          showGeolocation();
                      }
                      else {
                          if (paymentlocationData.Rows.length > 0) {
                              for (var i = 0; i < paymentlocationData.Rows.length; i++) {
                                  if (paymentlocationData.Rows[i]["PaymentLongitude"] != null || paymentlocationData.Rows[i]["PaymentLatitude"] != null) {
                                      pt = new esri.geometry.Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"], new esri.SpatialReference({ wkid: 4326 }))
                                      var symbol = new esri.symbol.PictureMarkerSymbol( $('#hdnMapIcon').val(), 30, 39);

                                      var locationName = paymentlocationData.Rows[i]["LocationName"];
                                      var address = paymentlocationData.Rows[i]["Address1"] + " " + paymentlocationData.Rows[i]["Address2"];
                                      var city = paymentlocationData.Rows[i]["Cityname"];
                                      var paymenthrs = paymentlocationData.Rows[i]["PaymentHrs"];
                                      var contactno = paymentlocationData.Rows[i]["ContactNo"].replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                                      var emailid = paymentlocationData.Rows[i]["Emailid"];
                                      leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + paymentlocationData.Rows[i]["PaymentLongitude"] + "," + paymentlocationData.Rows[i]["PaymentLatitude"] + '"/>';
                                                                            leftPanelHTML += '<table>';
                                                                            leftPanelHTML += '<tr><td rowspan="6"><img  src="'+$('#hdnMapIcon').val()+'"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                                                                            leftPanelHTML += '<tr><td class="blue">' + locationName + '</td></tr>';
                                                                            leftPanelHTML += '<tr class="border"><td id="address">' + address + '</td></tr>';
                                                                            leftPanelHTML += '<tr class="border"><td id="cty">' + city + '</td></tr>';
                                                                        
                                                                            leftPanelHTML += '<tr style="display:none"><td id="payHour">' + paymenthrs + '</td></tr>';
                                                                            leftPanelHTML += '<tr style="display:none"><td id="contact">' + contactno + '</td></tr>';
                                                                            leftPanelHTML += '<tr style="display:none"><td id="email">' + emailid + '</td></tr>';
                                                                          
                                                                            leftPanelHTML += '</table></div>';
                                      // var attributes = { "Name": locationName, "Address": address, "City": city, "PaymentHours": paymenthrs, "ContactNo": contactno, "EmailID": emailid };
                                                                            var attributes = { "Name": locationName, "Address": address, "City": city, "ContactNo": contactno, "EmailID": emailid };
                                      var infoTemplate = new InfoTemplate(locationName, "<b>" + $('#Address').text() + " </b>: ${Address}<br/><b>" + $('#City').text() + "</b>: ${City}<br/><b>" + $('#PaymentHours').text() + "</b>: ${PaymentHours}<br/><b>" + $('#ContactNo').text() + "</b>: ${ContactNo}<br/><b>" + $('#Emailid').text() + "</b>: ${EmailID}");
                                      var graphic = new Graphic(pt, symbol, attributes, infoTemplate);

                                      map.graphics.add(graphic);

                                      pt = new esri.geometry.Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"], new esri.SpatialReference({ wkid: 4326 }))
                                      graphic = new Graphic(pt, sym, attributes, infoTemplate);
                                      map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                                      var textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 1);
                                                                            map.graphics.add(new Graphic(pt, textSymbol, attributes, infoTemplate));
                                      map.centerAndZoom(pt, 15);
                                  }
                              }
                              $('#LeftPanel').html(leftPanelHTML);
                          }
                         
                      }
                      $('#page_loader').hide();
                  } catch (e) {
                      console.log(e.message);
                  }
              }
            
              on(map, "load", function () {
                  
                  addpp(paymentlocationData);

              });
              /**************************CODE FOR EVENTS BINDING**************************/

              $("#ddlCity").change(function () {
                  $('#page_loader').show();

                  var obj = $('#ddlCity option:selected');
                  if (obj.index() > 0) {
                      PaymentLocationPreLogin.setSession($('#ddlCity option:selected').val());
                  }
                  else {
                      PaymentLocationPreLogin.setSession("0");
                  }
                  paymentLocationTable = PaymentLocationPreLogin.LoadDatabycity($('#ddlCity option:selected').val());
                  var paymentlocationData = paymentLocationTable.value.Tables[0];
                  addpp(paymentlocationData);
                  $('#page_loader').hide();
              });
              k('#LeftPanel div').live('click', function () {
                 
                  $('#LeftPanel div').removeClass('MessageContainerActive');
                  $(this).addClass('MessageContainerActive');
                  var latlng = $(this).find('input').val();
                 map.centerAndZoom(new Point(latlng.split(',')[0], latlng.split(',')[1]), 8);

                  //BUG 6106 STARTS
                  var Address = $(this).find("#address").text().replace(/=/g, ':');
                  var city = $(this).find('#cty').text().replace(/=/g, ':');
                  var name = $(this).find(".blue").text().replace(/=/g, ':');
                  var payHour = $(this).find("#payHour").text().replace(/=/g, ':');
                  var contact = $(this).find("#contact").text().replace(/=/g, ':');
                  var email = $(this).find("#email").text().replace(/=/g, ':');
                  var attributes = { "Name": name, "Address": Address, "City": city, "PaymentHours": payHour, "ContactNo": contact, "EmailID": email };
                  var infoTemplate = new InfoTemplate(name, "<b>" + $('#Address').text() + " </b>:${Address}<br/><b>" + $('#City').text() + "</b>:${City}<br/><b>" + $('#PaymentHours').text() + "</b>:${PaymentHours}<br/><b>" + $('#ContactNo').text() + "</b>:${ContactNo}<br/><b>" + $('#Emailid').text() + "</b>:${EmailID}");
                  var point = new esri.geometry.Point(latlng.split(',')[0], latlng.split(',')[1]);
                  point = esri.geometry.geographicToWebMercator(point);
                  var symbol = new esri.symbol.PictureMarkerSymbol( $('#hdnMapIcon').val(), 30, 39);
                  var textSymbol = new esri.symbol.TextSymbol($(this).find(".PinLabel").text()).setOffset(0, 1);
                  var graphic = new Graphic(point, symbol, attributes, infoTemplate);
                  map.graphics.add(graphic);
                  map.graphics.add(point, textSymbol);
                  map.graphics.add(new Graphic(point, textSymbol, attributes, infoTemplate));
                
                  //To load popup dynamically 
                  map.infoWindow.show(point, InfoWindow.ANCHOR_UPPERRIGHT);
                  map.infoWindow.setContent(graphic.getContent());
                  map.infoWindow.setTitle(name.toString());
                  map.centerAndZoom(point, 8);
               

              });


              /**************************CODE FOR CURRENT LOCATION**************************/
              //To Find current location of user.
              function showGeolocation() {
                  try {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                      } else {
                         
                          pt = new Point($('#hdnLongitude').val(), $('#hdnLatitude').val());
                          map.centerAndZoom(pt, 15);

                      }
                      $('#page_loader').hide();
                  }
                  catch (e) { }
              }

              //To Plot current location called by showGeolocation().
              function getCurrentLocation(position) {
                  try {
                      $('#page_loader').hide();
                      var leftPanelHTML = '';
                      clearAddGraphics();
                      var paymentlocationData = paymentLocationTable.value.Tables[0];
                      if (paymentlocationData.Rows.length > 0) {
                          for (var i = 0; i < paymentlocationData.Rows.length; i++) {
                              if (paymentlocationData.Rows[i]["PaymentLongitude"] != null || paymentlocationData.Rows[i]["PaymentLatitude"] != null) {
                                  pt = new Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"]);
                                  var symbol = new esri.symbol.PictureMarkerSymbol( $('#hdnMapIcon').val(), 30, 39);

                                  var locationName = paymentlocationData.Rows[i]["LocationName"];
                                  var address = paymentlocationData.Rows[i]["Address1"] + " " + paymentlocationData.Rows[i]["Address2"];
                                  var city = paymentlocationData.Rows[i]["Cityname"];
                                  var paymenthrs = paymentlocationData.Rows[i]["PaymentHrs"];
                                  var contactno = paymentlocationData.Rows[i]["ContactNo"].replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                                  var emailid = paymentlocationData.Rows[i]["Emailid"];
                                  leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + paymentlocationData.Rows[i]["PaymentLongitude"] + "," + paymentlocationData.Rows[i]["PaymentLatitude"] + '"/>';
                                  leftPanelHTML += '<table>';
                                  leftPanelHTML += '<tr><td rowspan="6"><img  src="' + $('#hdnMapIcon').val() + '"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                                  leftPanelHTML += '<tr><td class="blue">' + locationName + '</td></tr>';
                                  leftPanelHTML += '<tr class="border"><td id="address">' + address + '</td></tr>';
                                  leftPanelHTML += '<tr class="border"><td id="cty">' + city + '</td></tr>';
                                 
                                  leftPanelHTML += '<tr style="display:none"><td id="payHour">' + paymenthrs + '</td></tr>';
                                  leftPanelHTML += '<tr style="display:none"><td id="contact">' + contactno + '</td></tr>';
                                  leftPanelHTML += '<tr style="display:none"><td id="email">' + emailid + '</td></tr>';
                                  //BUG 6106 END

                                  leftPanelHTML += '</table></div>';
                                  var attributes = { "Name": locationName, "Address": address, "City": city, "PaymentHours": paymenthrs, "ContactNo": contactno, "EmailID": emailid };
                                  var infoTemplate = new InfoTemplate(locationName, "<b>" + $('#Address').text() + " </b>: ${Address}<br/><b>" + $('#City').text() + "</b>: ${City}<br/><b>" + $('#PaymentHours').text() + "</b>: ${PaymentHours}<br/><b>" + $('#ContactNo').text() + "</b>: ${ContactNo}<br/><b>" + $('#Emailid').text() + "</b>: ${EmailID}");
                                  var graphic = new Graphic(pt, symbol, attributes, infoTemplate);

                                  map.graphics.add(graphic);
                                  var textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 1);
                                  map.graphics.add(new Graphic(pt, textSymbol, attributes, infoTemplate));
                                  map.centerAndZoom(pt, 1);
                                  $('#page_loader').hide();
                              }
                          }
                      }
                      else {
                         
                          pt = new Point(parseFloat(33), parseFloat(-117));

                          map.centerAndZoom(pt, 15);

                      }
                      $('#LeftPanel').html(leftPanelHTML);
                  }
                  catch (e)
                  { }
              }

              function errorHandler(err) {
                  try {
                      if (err.code == 1) {
                          toastr.error("Please enable your access to Current Location");
                         
                      } else if (err.code == 2) {
                         
                          getCurrentLocation(Position);
                      } else {
                          toastr.error("Error: " + err);
                     
                      }
                  }
                  catch (e)
                  { }
              }



              /**************************CODE FOR SEARCHING**************************/
              function clearGeolocationGraphics() {
                  map.infoWindow.hide();
                  map.graphics.clear();
              }
              function addppcity(paymentlocationData) {
                  try {
                      clearGeolocationGraphics();
                      if (paymentlocationData.Rows.length == 0) {
                          showGeolocation();
                      }
                      else {
                          if (paymentlocationData.Rows.length > 0) {
                              for (var i = 0; i < paymentlocationData.Rows.length; i++) {
                                  if (paymentlocationData.Rows[i]["PaymentLongitude"] != null || paymentlocationData.Rows[i]["PaymentLatitude"] != null) {
                                      pt = new esri.geometry.Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"], new esri.SpatialReference({ wkid: 4326 }))
                                      var symbol = new esri.symbol.PictureMarkerSymbol( $('#hdnMapIcon').val(), 30, 39);

                                      var locationName = paymentlocationData.Rows[i]["LocationName"];
                                      var address = paymentlocationData.Rows[i]["Address1"] + " " + paymentlocationData.Rows[i]["Address2"];
                                      var city = paymentlocationData.Rows[i]["Cityname"];
                                      var paymenthrs = paymentlocationData.Rows[i]["PaymentHrs"];
                                      var contactno = paymentlocationData.Rows[i]["ContactNo"].replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                                      var emailid = paymentlocationData.Rows[i]["Emailid"];
                                      leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + paymentlocationData.Rows[i]["PaymentLongitude"] + "," + paymentlocationData.Rows[i]["PaymentLatitude"] + '"/>';
                                      leftPanelHTML += '<table>';
                                      leftPanelHTML += '<tr><td rowspan="6"><img  src="'+ $('#hdnMapIcon').val()+'"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                                      leftPanelHTML += '<tr><td class="blue">' + locationName + '</td></tr>';
                                      leftPanelHTML += '<tr class="border"><td id="address">' + address + '</td></tr>';
                                      leftPanelHTML += '<tr class="border"><td id="cty">' + city + '</td></tr>';
                                      leftPanelHTML += '<tr style="display:none"><td id="payHour">' + paymenthrs + '</td></tr>';
                                      leftPanelHTML += '<tr style="display:none"><td id="contact">' + contactno + '</td></tr>';
                                      leftPanelHTML += '<tr style="display:none"><td id="email">' + emailid + '</td></tr>';
                                      //BUG 6106 END

                                      leftPanelHTML += '</table></div>';
                                      var attributes = { "Name": locationName, "Address": address, "City": city, "PaymentHours": paymenthrs, "ContactNo": contactno, "EmailID": emailid };
                                      var infoTemplate = new InfoTemplate(locationName, "<b>" + $('#Address').text() + " </b>: ${Address}<br/><b>" + $('#City').text() + "</b>: ${City}<br/><b>" + $('#PaymentHours').text() + "</b>: ${PaymentHours}<br/><b>" + $('#ContactNo').text() + "</b>: ${ContactNo}<br/><b>" + $('#Emailid').text() + "</b>: ${EmailID}");
                                      var graphic = new Graphic(pt, symbol, attributes, infoTemplate);

                                      map.graphics.add(graphic);

                                      pt = new esri.geometry.Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"], new esri.SpatialReference({ wkid: 4326 }))
                                      graphic = new Graphic(pt, sym, attributes, infoTemplate);
                                      map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                                      var textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 1);
                                      map.graphics.add(new Graphic(pt, textSymbol, attributes, infoTemplate));
                                   
                                      map.centerAndZoom(pt, 15);
                                  }
                              }
                          }
                          $('#LeftPanel').html(leftPanelHTML);
                      }

                  } catch (e) {
                      console.log(e.message);
                  }
              }

          });

    

}