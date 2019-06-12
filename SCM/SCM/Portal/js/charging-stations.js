var data, roww, map;
var initialLocation, PEVLocations, CSinitiallocations;
var isdistancesorted = true;
var start;
var previousLine = null;
var long, lat;
var Mapmode= 0//= $('#hdMapId').val();
var orderbydistance = 0;
var orderbyrate = 0;
var rendererOptions = {
    map: map,
    suppressMarkers: true
}
var polylineOptionsActual = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 5
};
var infoWindow = {};
var googledirectionsDisplay = {};
var googledirectionsService;
var markers = [];
var mapOptions = [];
var map;

//Sorting the charging stations based on rate.
function getRateSorted(order) {
    if (order == undefined) {
        order = 'asc';
    }
    var temp;
    rateSorted = CSinitiallocations;
    for (var m = 1; m < CSinitiallocations.Rows.length; m++) {
        rateSorted.Rows[m] = CSinitiallocations.Rows[m];
        for (var n = m; n > 0; n--) {
            if (order == 'asc') {
                if (rateSorted.Rows[n].Rate < rateSorted.Rows[n - 1].Rate) {
                    temp = rateSorted.Rows[n - 1];
                    rateSorted.Rows[n - 1] = rateSorted.Rows[n];
                    rateSorted.Rows[n] = temp;
                }
            }
            else {
                if (rateSorted.Rows[n].Rate > rateSorted.Rows[n - 1].Rate) {
                    temp = rateSorted.Rows[n - 1];
                    rateSorted.Rows[n - 1] = rateSorted.Rows[n];
                    rateSorted.Rows[n] = temp;
                }
            }
        }
    }
    return rateSorted;
}
$(document).ready(function () {


    Mapmode = $('#hdMapId').val();
    if (Mapmode == "1") {
       infoWindow = new google.maps.InfoWindow({});
       googledirectionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: polylineOptionsActual })
       googledirectionsService = new google.maps.DirectionsService;


        googlemapload();
    }
    else
        loadEVmap();
    
    $('.icon_refreshbtn').click(function () {
        if (Mapmode == "1")
            window.location.reload();
          
        else {
          
        }
        return false;
    });
    
   if (Mapmode == '1') {
        $('#searchESRIMap').click(function () {
            searchChargingStations();
            $('#txtMapSearch').blur();
            $('#searchESRIMap').blur();
        });
        function placeInput_onKeyPress(e) {
            if (e.keyCode == 13 || e.keyCode == "13") {
                searchChargingStations();
                $('#txtMapSearch').blur();
                $('#searchESRIMap').blur();
                e.preventDefault();
                return false;
            }
        }
    }


    $('#btnDistance').click(function () {
       // $('#txtMapSearch').val('');
        // To show as Active/Deactive
        $('.distance_area a').removeClass('active');
        $(this).addClass('active');
        if (Mapmode == "1") {
            if (orderbydistance == 0) {
                orderbydistance = 1;
                getDistanceSorted('asc');
            }
            else {
                orderbydistance = 0;
                getDistanceSorted('desc');
            }

            $(this).attr('src', 'images/Electric_distance_btn_ro.png');
            $('#btnRate').attr('src', 'images/Electric_rate_btn.png');
        }
    });
    $('#btnRate').click(function () {
       // $('#txtMapSearch').val('');
        $('.distance_area a').removeClass('active');
        $(this).addClass('active');
        if (Mapmode == "1") {
            if (orderbyrate == 0) {
                orderbyrate = 1;
                chargingmapGoogle(getRateSorted('asc'));
            }
            else {
                orderbyrate = 0;
                chargingmapGoogle(getRateSorted('desc'));
            }
            $(this).attr('src', 'images/Electric_rate_btn_ro.png');
            $('#btnDistance').attr('src', 'images/Electric_distance_btn.png');
        }
    });
});

// google map start

function checkEnter(e) {
    var characterCode
    if (e && e.which) {
        e = e
        characterCode = e.which
    }
    else {
        e = event
        characterCode = e.keyCode
    }

    if (characterCode == 13) {
        searchChargingStations();
        return false
    }
    else {
        return true
    }
}

function googlemapload() {
    var selected = $('select#ddlAddress option:selected').val().split(":");
    long = parseFloat(selected[4]);
    lat = parseFloat(selected[3]);
    PEVLocations = charging_stations.LoadPevLocations(String(long), String(lat)).value;
    CSinitiallocations = PEVLocations;
    getDistanceSorted();

}

function getDistanceSorted(order) {
    if (order == undefined) {
        order = 'asc';
    }
    var distanceSorted, temp;
    var distarr = new Array();

    // initialLocation = new esri.geometry.Point(long, lat);

    // start = new esri.geometry.Point(long, lat);
    for (var j = 0; j < CSinitiallocations.Rows.length; j++) {
        //Changed Logic as distance is already coming from Database
        distarr[j] = CSinitiallocations.Rows[j].Distance;
    }
    distanceSorted = CSinitiallocations;
    for (var m = 1; m < CSinitiallocations.Rows.length; m++) {
        distanceSorted.Rows[m] = CSinitiallocations.Rows[m];
        for (var n = m; n > 0; n--) {
            if (order == 'asc') {
                if (parseFloat(distarr[n]) < parseFloat(distarr[n - 1])) {
                    temp = distanceSorted.Rows[n - 1];
                    distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                    distanceSorted.Rows[n] = temp;
                    temp = distarr[n - 1];
                    distarr[n - 1] = distarr[n];
                    distarr[n] = temp;
                }
            }
            else {
                if (parseFloat(distarr[n]) > parseFloat(distarr[n - 1])) {
                    temp = distanceSorted.Rows[n - 1];
                    distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                    distanceSorted.Rows[n] = temp;
                    temp = distarr[n - 1];
                    distarr[n - 1] = distarr[n];
                    distarr[n] = temp;
                }
            }
        }
    }
    if (Mapmode == "1")
        chargingmapGoogle(distanceSorted);
}




function chargingmapGoogle(locationstoplot) {
    var outData = locationstoplot;
 
    markers = $.map(outData.Rows, function (val, key) {
        return { "title": val.LocationName, "lat": val.Latitude, "lng": val.Longitude, "description": val.LocationName };
    });
    if (outData.Rows.length > 0) {
        mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    else {
        mapOptions = {
            center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $('#LeftPanel').html('<center>No Charging Station</center>');
    }
    map = new google.maps.Map(document.getElementById("electric_map_canvas"), mapOptions);
    bingChargingPoint(locationstoplot);
    k('#LeftPanel div').live('click', function () {
        var obj = this;
        $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
        $('#LeftPanel div').removeClass('MessageContainerActive');
        $(this).addClass('MessageContainerActive');

        var latlng = $(this).find('input').val();
        mapOptions = {
            center: new google.maps.LatLng(latlng.split(',')[1], latlng.split(',')[0]),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
       OpenWindow(latlng.split(',')[1], latlng.split(',')[0], latlng.split(',')[2], locationstoplot)
    });
}

function bingChargingPoint(PEVLocations) {
    var titleOutage = "";
    var infowindow = new Array();
    var leftPanelHTML = '';
    var labels;
    var roww;
    var clkstatus = true;
    for (var i = 0; i < PEVLocations.Rows.length; i++) {
        roww = PEVLocations.Rows[i];

        var distance = roww.Distance + ' Miles';
        var locName = roww.LocationName;
        var rate = (roww.Rate) == null ? "NA" : "$" + (roww.Rate + roww.UOM);
        var address = roww.Address1;
        var address2 = roww.Address2;

        leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + roww.Longitude + "," + roww.Latitude + "," + roww.LocationName + '"/>';
        leftPanelHTML += '<table>';
        leftPanelHTML += '<tr><td rowspan="6"><img  src="' + $('#hdnMapIcon').val() + '"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
        leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
        leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
        leftPanelHTML += '<tr class="border"><td>' + address2 + '</td></tr>';
        leftPanelHTML += '<tr><td class="red">' + $('#lblRate').text() + ':' + rate + '</td></tr>';
        leftPanelHTML += '<tr><td>' + distance + '</td></tr>';
        leftPanelHTML += '</table></div>';

        var destinLocation = new google.maps.LatLng(roww.Latitude, roww.Longitude);
          var beachIcon = {
              url: $('#hdnMapIcon').val(),
        };
        $('#LeftPanel').html(leftPanelHTML);
      
        labels = i + 1;
      
        var marker = new MarkerWithLabel({
            position: destinLocation,
            map: map,
            labelAnchor: new google.maps.Point(10, 33),
            labelContent: labels.toString(),
            labelInBackground: false,
            labelClass: "labels",
            icon: beachIcon,
            draggable: false,
            title: roww.LocationName,
        });

        (function (marker, roww) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent('<div id="iw-container"> <div class="iw-title">' + $('#titletext').text() + '</div >' + '<div class="iw-content-header"><strong> ' + roww.LocationName + '</strong></div><div class="iw-content"><strong>'
                    + $('#lblAddress').text() + ':</strong> ' + roww.Address1 + ' ' + roww.Address2 + '</br><strong>' + $('#lblRate').text() + ':</strong> ' + ((roww.Rate) == null ? "NA" : "$" + (roww.Rate + roww.UOM)) + ' <br/><strong>' +
                $('#lblDistance').text() + ':</strong> ' + roww.Distance + ' Miles<br/><img latlng=\"' + roww.Longitude + "," + roww.Latitude + '\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>' + '</div></div>');
                infoWindow.open(map, marker);
            });
        })(marker, roww);
        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infoWindow.close();
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

function ZoomChargingPoint(PEVLocations) {
    var titleOutage = "";
    var infowindow = new Array();
    var roww;
    // var leftPanelHTML = '';
    var labels;
    var clkstatus = true;
    for (var i = 0; i < PEVLocations.Rows.length; i++) {
        roww = PEVLocations.Rows[i];
        var rate = (PEVLocations.Rows[i].Rate) == null ? "NA" : "$" + (roww.Rate + roww.UOM);
        var destinLocation = new google.maps.LatLng(roww.Latitude, roww.Longitude);
        var imgIcon = $('#hdnMapIcon').val();
        //var ChargingTitle = PEVLocations.Rows[i].LocationName;
        //  var myinfowindow = new google.maps.InfoWindow({ content: '<div ><strong >' + $('#titletext').text() + '</strong ></br>' + $('#lblAddress').text() + ':' + PEVLocations.Rows[i].Address1 + ' ' + PEVLocations.Rows[i].Address2 + '</br>' + $('#lblRate').text() + ':' + rate + ' <br/><img latlng=\"" + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + "\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>'});
        var beachIcon = {
            url: $('#hdnMapIcon').val(),
            //labelOrigin: new google.maps.Point(15, 15),
        };
        labels = i + 1;
        var infoWindow = new google.maps.InfoWindow();

        // For Fixing bug 0024910
        var marker = new MarkerWithLabel({
            position: destinLocation,
            map: map,
            labelAnchor: new google.maps.Point(10, 33),
            labelContent: labels.toString(),
            labelInBackground: false,
            labelClass: "labels",
            icon: beachIcon,
            draggable: false,
            title: roww.LocationName,
        });

        (function (marker, roww) {
            //google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent('<div id="iw-container"> ' +                    
                   '<div class="iw-title">' + $('#titletext').text() + '</div >' +
                    '<div class="iw-content-header"><strong> ' + roww.LocationName + '</strong></div><div class="iw-content"><strong>' +
                $('#lblAddress').text() + ':</strong> ' + roww.Address1 + ' ' + roww.Address2 + '</br><strong>' +
                $('#lblRate').text() + ':</strong> ' + ((roww.Rate) == null ? "NA" : "$" + (roww.Rate + roww.UOM)) + ' <br/><strong>' +
                $('#lblDistance').text() + ': </strong>' + roww.Distance + ' Miles<br/><img latlng=\"' + roww.Longitude + "," + roww.Latitude + '\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>' +
                '</div>' + '</div>');
                infoWindow.open(map, marker);
            //});
        })(marker, roww);

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infoWindow.close();
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
    }
}

function OpenWindow(latitude,longitude,  LocationName, PEVLocations) {
    try {
       
        mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
       // map = new google.maps.Map(document.getElementById("electric_map_canvas"), mapOptions);
    
        for (var i = 0; i < PEVLocations.Rows.length; i++) {
            if (PEVLocations.Rows[i].LocationName == LocationName && PEVLocations.Rows[i].Latitude == latitude) {
                roww = PEVLocations.Rows[i];
                var rate = (PEVLocations.Rows[i].Rate) == null ? "NA" : "$" + (roww.Rate + roww.UOM);
                var destinLocation = new google.maps.LatLng(roww.Latitude, roww.Longitude);
                var imgIcon = $('#hdnMapIcon').val();
                //var ChargingTitle = PEVLocations.Rows[i].LocationName;
                //  var myinfowindow = new google.maps.InfoWindow({ content: '<div ><strong >' + $('#titletext').text() + '</strong ></br>' + $('#lblAddress').text() + ':' + PEVLocations.Rows[i].Address1 + ' ' + PEVLocations.Rows[i].Address2 + '</br>' + $('#lblRate').text() + ':' + rate + ' <br/><img latlng=\"" + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + "\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>'});
                var beachIcon = {
                    url: $('#hdnMapIcon').val(),
                    //labelOrigin: new google.maps.Point(15, 15),
                };
                labels = 0;
                labels = i + 1;
                var marker = new MarkerWithLabel({
                    position: destinLocation,
                    map: map,
                    labelAnchor: new google.maps.Point(10, 33),
                    labelContent: labels.toString(),
                    labelInBackground: false,
                    labelClass: "labels",
                    icon: beachIcon,
                    draggable: false,
                    title: roww.LocationName,
                });


                (function (marker, roww) {
                    infoWindow.setContent('<div id="iw-container"> ' +
                   '<div class="iw-title">' + $('#titletext').text() + '</div >' +
                    '<div class="iw-content-header"><strong> ' + roww.LocationName + '</strong></div><div class="iw-content"><strong>' +
                $('#lblAddress').text() + ':</strong> ' + roww.Address1 + ' ' + roww.Address2 + '</br><strong>' +
                $('#lblRate').text() + ': </strong>' + rate + ' <br/><strong>' +
                $('#lblDistance').text() + ':</strong> ' + roww.Distance + ' Miles<br/><img latlng=\"' + roww.Longitude + "," + roww.Latitude + '\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>' +
                '</div>' + '</div>')
                  
                    infoWindow.open(map, marker);
                    //  });
                })(marker,roww);

                google.maps.event.addListener(map, 'click', function () {
                    infoWindow.close();
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
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.close();
                    infoWindow.open(map, marker);
                });

            }


       
        }

     
    }
    catch (e) {
        console.log(e.message);
    }
}
k(".imgroute").live('click', function () {
   
    var latlng = $(this).attr('latlng');
    if (Mapmode == "1")
        initMap(latlng.split(',')[1], latlng.split(',')[0]);
  
})

function initMap(dirlat, dirlong) {
    googledirectionsDisplay.setMap(map);
    calculateAndDisplayRoute(googledirectionsService, googledirectionsDisplay, dirlat, dirlong);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, dirlat, dirlong) {
    try {
        var imgIcon = 'images/user-pin-icon.png';
        var selected = $('select#ddlAddress option:selected').val().split(":");
        long = parseFloat(selected[4]);
        lat = parseFloat(selected[3]);
        var selectedMode = 'Driving';
        directionsService.route({
            origin: { lat: lat, lng: long },  // Haight.
            destination: { lat: parseFloat(dirlat), lng: parseFloat(dirlong) },  // Ocean Beach.
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var _route = response.routes[0].legs[0];
                var pinA = new google.maps.Marker({
                    position: _route.start_location,
                    map: map,
                    icon: imgIcon
                });

            } else {
                toastr.error('Directions request failed due to ' + status);
               // toastr.error('Directions request failed due to ' + status);
            }
        });
    }
    catch (e) {

    }
}
function searchChargingStations() {
    try {
      
        var searchString = escape($('#txtMapSearch').val());
        if (searchString.trim() != '') {
            var searchdata = charging_stations.searchPevLocations(searchString).value;
            if (parseInt(searchdata.Rows[0].Status) <= 0) {
                toastr.warning(searchdata.Rows[0].Message);
               // toastr.warning("Please enter valid  City Name/Zipcode");
                //alert("Please enter valid  City Name/Zipcode");
                return false;
            }
            else {
                CSinitiallocations = searchdata;
                if (Mapmode == '1') {
                    if (isdistancesorted) {

                        getDistanceSorted();
                    }
                    else {
                     
                        chargingmapGoogle(getRateSorted());
                    }
                }

            }
        }
        else {
            //toastr.warning($('#IDMandatoryText').text())
            toastr.warning($('#IDMandatoryText').text());
          
            return false;
        }
    }
    catch (e) { }
}


// google map end 





//Calls in case of no geolocation or error
function nogeoLocation() {
    var selected = $('select#ddlAddress option:selected').val().split(":");
    long = parseFloat(selected[4]);
    lat = parseFloat(selected[3]);
}

function loadEVmap() {

    require(["esri/map", "esri/geometry/Point", "esri/tasks/locator", "esri/tasks/RouteTask", "esri/tasks/RouteParameters", "esri/tasks/FeatureSet", "esri/SpatialReference",
   "esri/units", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/InfoTemplate", "js/utils.js", "dojo/promise/all", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/tasks/RouteTask", "esri/tasks/RouteParameters", "esri/tasks/FeatureSet", "esri/dijit/InfoWindow"],
   function (Map, Point, Geocode, Directions, RouteParameters, FeatureSet, SpatialReference, Units, Graphic, SimpleLineSymbol, InfoTemplate, utils, all, on, dom, InfoWindow) {
       "use strict"

       var geocodeService;
       var directionsService;
       var directions;
       var directionsList;

       var sym = new esri.symbol.PictureMarkerSymbol($('#hdnMapIcon').val(), 30, 40);
       var textSymbol;
       map = new Map("electric_map_canvas", {
           basemap: "streets",
           zoom: 3
       });

       utils.autoRecenter(map);
       geocodeService = new Geocode(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
       directionsService = new Directions(window.location.protocol+"//tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route");
       on(directionsService, "solve-complete", showRoute);
       on(directionsService, "error", errorHandlerDirections);
       directionsList = dom.byId('directionsList')
       on(map, "load", function () {
         
           var selected = $('select#ddlAddress option:selected').val().split(":");
           long = parseFloat(selected[4]);
           lat = parseFloat(selected[3]);          
           PEVLocations = charging_stations.LoadPevLocations(String(long), String(lat)).value;
           CSinitiallocations = PEVLocations;
           getDistanceSorted();

           $('.icon_refreshbtn').click(function () {
               window.location.reload();
           });
       });
       function errorHandlerDirections(err) {
           toastr.warning($('#IDNoRoute').text())
          //alert($('#IDNoRoute').text());
       
       }
       //Sorting the charging stations based on distance.
       function testmessage ()
       {
         //  alert('test mesage 3');
       }
       function getDistanceSorted(order) {
           if (order == undefined)
           {
               order = 'asc';
           }
           //$('#page_loader').hide();
           var distanceSorted, temp;
           var distarr = new Array();
          
                   initialLocation = new esri.geometry.Point(long, lat);
          
                   start = new esri.geometry.Point(long, lat);
                   for (var j = 0; j < CSinitiallocations.Rows.length; j++) {
                       //Changed Logic as distance is already coming from Database
                       distarr[j] = CSinitiallocations.Rows[j].Distance;
                   }
                   distanceSorted = CSinitiallocations;
                   for (var m = 1; m < CSinitiallocations.Rows.length; m++) {
                       distanceSorted.Rows[m] = CSinitiallocations.Rows[m];
                       for (var n = m; n > 0; n--) {
                           if (order == 'asc') {
                               if (parseFloat(distarr[n]) < parseFloat(distarr[n - 1])) {
                                   temp = distanceSorted.Rows[n - 1];
                                   distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                                   distanceSorted.Rows[n] = temp;
                                   temp = distarr[n - 1];
                                   distarr[n - 1] = distarr[n];
                                   distarr[n] = temp;
                               }
                           }
                           else {
                               if (parseFloat(distarr[n]) > parseFloat(distarr[n - 1])) {
                                   temp = distanceSorted.Rows[n - 1];
                                   distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                                   distanceSorted.Rows[n] = temp;
                                   temp = distarr[n - 1];
                                   distarr[n - 1] = distarr[n];
                                   distarr[n] = temp;
                               }
                           }
                       }
                   }
                   addpp(distanceSorted, false);
               
       }

       /**************************CHARGING STATIONS MAP PLOTTING**************************/
       function addpp(locationstoplot, flag) {
           //Mapmode = $('#hdMapId').val();
           //if (Mapmode == "1")
           //    chargingmapGoogle(locationstoplot);
           //else
               plotPicPoint(locationstoplot);
           
       }

       function plotPicPoint(locationstoplot) {
           var leftPanelHTML = '';
           PEVLocations = locationstoplot;
           initialLocation = new Point(long, lat);
           var place, attributes, infoTemplate, pt, graphic, previousLine = null;
           clearFindGraphics();
           if (PEVLocations.Rows.length > 0) {
               for (var i = 0; i < PEVLocations.Rows.length; i++) {
                   var destinLocation = new Point(PEVLocations.Rows[i].Longitude, PEVLocations.Rows[i].Latitude);
                   var distance = PEVLocations.Rows[i].Distance + ' Miles';
                   var locName = PEVLocations.Rows[i].LocationName;
                   var rate = (PEVLocations.Rows[i].Rate) == null ? "NA" : "$" + (PEVLocations.Rows[i].Rate + PEVLocations.Rows[i].UOM);
                   var address = PEVLocations.Rows[i].Address1;
                   var address2 = PEVLocations.Rows[i].Address2;
                   leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + "," + i + '"/>';
                   leftPanelHTML += '<table>';
                   leftPanelHTML += '<tr><td rowspan="6"><img  src="' + $('#hdnMapIcon').val() + '"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
                   leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
                   leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
                   leftPanelHTML += '<tr class="border"><td>' + address2 + '</td></tr>';
                   leftPanelHTML += '<tr><td class="red">' + $('#lblRate').text() + ':' + rate + '</td></tr>';
                   leftPanelHTML += '<tr><td>' + distance + '</td></tr>';
                   leftPanelHTML += '</table></div>';
                   attributes = { address: PEVLocations.Rows[i].Address1 + PEVLocations.Rows[i].Address2, rate: rate, distance: distance };

                   infoTemplate = new InfoTemplate($('#titletext').text(), '<strong>' + $('#lblAddress').text() + '</strong>: ${address}<br/><strong>' + $('#lblRate').text() + '</strong>: ${rate}<br/><strong>' + $('#lblDistance').text() + ': </strong>${distance}<br/><img latlng=\"' + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + '\" class=\"imgroute\" src="images/get_direction_icon.png" />');
                   pt = new esri.geometry.Point(PEVLocations.Rows[i].Longitude, PEVLocations.Rows[i].Latitude, new esri.SpatialReference({ wkid: 4326 }))
                   graphic = new Graphic(pt, sym, attributes, infoTemplate);
                   map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                   textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 2);
                   map.graphics.add(new Graphic(pt, textSymbol, attributes, infoTemplate));
                   map.setLevel(10);
                   map.centerAt(new esri.geometry.Point(PEVLocations.Rows[0].Longitude, PEVLocations.Rows[0].Latitude, new esri.SpatialReference({ wkid: 4326 })));
               }
               $('#LeftPanel').html(leftPanelHTML);
           }
           else {
               $('#LeftPanel').html('<center>No Charging Station</center>');
           }

          

           $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
               $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
               $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
               $(this).addClass('MessageContainerActive');
               // bugId 23271
               var latlng = $(this).find('input').val();
               var index = latlng.split(',')[2];
               var distance = PEVLocations.Rows[index].Distance + ' Miles';
               var locName = PEVLocations.Rows[index].LocationName;
               var rate = (PEVLocations.Rows[index].Rate) == null ? "NA" : "$" + (PEVLocations.Rows[index].Rate + PEVLocations.Rows[index].UOM);
               var address = PEVLocations.Rows[index].Address1;
               var address2 = PEVLocations.Rows[index].Address2;
               attributes = { address: PEVLocations.Rows[index].Address1 + PEVLocations.Rows[index].Address2, rate: rate, distance: distance };

               infoTemplate = new InfoTemplate($('#titletext').text(), '<strong>' + $('#lblAddress').text() + ':</strong> ${address}<br/><strong>' + $('#lblRate').text() + ':</strong> ${rate}<br/><strong>' + $('#lblDistance').text() + ':</strong> ${distance}<br/><img latlng=\"' + PEVLocations.Rows[index].Longitude + "," + PEVLocations.Rows[index].Latitude + '\" class=\"imgroute\" src="images/get_direction_icon.png" />');
              
               var zoompt = new Point(latlng.split(',')[0], latlng.split(',')[1]);
              
               graphic = new Graphic(zoompt, sym, attributes, infoTemplate);
               map.graphics.add(new Graphic(zoompt, sym, attributes, infoTemplate));
               textSymbol = new esri.symbol.TextSymbol(parseInt(index)+1).setOffset(0, 2);
               map.graphics.add(new Graphic(zoompt, textSymbol, attributes, infoTemplate));
               graphic = new Graphic(zoompt, textSymbol, attributes, infoTemplate);
               map.infoWindow.setContent(graphic.getContent());
               map.infoWindow.setTitle($('#titletext').text());
               map.infoWindow.show(zoompt, InfoWindow.ANCHOR_UPPERRIGHT);
               map.centerAndZoom(zoompt, 17);
               map.graphics.add(graphic);
               //
              // map.centerAndZoom(new Point(latlng.split(',')[0], latlng.split(',')[1]), 17);
           });
           $(".distance_area ul li a").click(function () {
               $(".distance_area ul li a").removeClass('active');
               $(this).addClass('active');
           });
       }
       /**************************CHARGING STATIONS MAP PLOTTING**************************/

       k(".imgroute").live('click', function () {

           var latlng = $(this).attr('latlng');
         
           calculateDirections(latlng.split(',')[1], latlng.split(',')[0]);
       })
       /**************************CODE FOR EVENTS BINDING**************************/
       $('#btnDistance').click(function () {
           if (orderbydistance == 0) {
               orderbydistance = 1;
               getDistanceSorted('asc');
           }
           else {
               orderbydistance = 0;
               getDistanceSorted('desc');
           }
           
           $(this).attr('src', 'images/Electric_distance_btn_ro.png');
           $('#btnRate').attr('src', 'images/Electric_rate_btn.png');
       });
       $('#btnRate').click(function () {
           if (orderbyrate == 0) {
               orderbyrate = 1;
               addpp(getRateSorted('asc'));
           }
           else {
               orderbyrate = 0;
               addpp(getRateSorted('desc'));
           }
          // addpp(getRateSorted(), true);
           $(this).attr('src', 'images/Electric_rate_btn_ro.png');
           $('#btnDistance').attr('src', 'images/Electric_distance_btn.png');
       });

       $('#searchESRIMap').click(function () {
           searchChargingStations();
           $('#txtMapSearch').blur();
           $('#searchESRIMap').blur();
       });

       $('#txtMapSearch').keypress(function (e) {
           placeInput_onKeyPress(e);
           
       });
       /**************************CODE FOR EVENTS BINDING**************************/


       /**************************CODE FOR SEARCHING**************************/
       // Listen for enter key
       function placeInput_onKeyPress(e) {
           if (e.keyCode == 13 || e.keyCode == "13") {
               searchChargingStations();      
               $('#txtMapSearch').blur();
               $('#searchESRIMap').blur();
               e.preventDefault();
               return false;
           }
       }


       /**************************CODE FOR SEARCH CHARGING STATIONS**************************/
       function searchChargingStations() {
           try{
               var searchString = escape(dom.byId('txtMapSearch').value);
               if (searchString.trim() != '') {
                   var searchdata = charging_stations.searchPevLocations(searchString).value;
                   if (parseInt(searchdata.Rows[0].Status) <= 0) {
                       toastr.warning("Please enter valid  City Name/Zipcode");
                      // toastr.warning("Please enter valid  City Name/Zipcode")
                      // w2alert(searchdata.Rows[0].Message);
                       return false;
                   }
                   else {
                       CSinitiallocations = searchdata;
                       if (isdistancesorted)
                           getDistanceSorted();
                       else
                           addpp(getRateSorted(), true);
                   }
               }
               else {
                  // toastr.warning($('#IDMandatoryText').text())
                   toastr.warning($('#IDMandatoryText').text());
                   //alert('Please enter text to search.');
                   return false;
               }
           }
           catch(e){}
       }


       function calculateDirections(dirlat, dirlong) {
           try {
               var start;
               var stop;
                       try {
                           initialLocation = new Point(long, lat);
                           start = new Point(parseFloat(dirlong), parseFloat(dirlat));
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
                       }
               catch (e) {
                   toastr.warning($('#IDNoRoute').text());
                          // toastr.error($('#IDNoRoute').text())
                       }
           }
           catch (e)
           { console.log(e.message); }
       }
       //show route

       function showRoute(results) {

           var routeInfo = results.result;  // 3.5
           if (routeInfo) {
               if (routeInfo.routeResults && routeInfo.routeResults.length > 0) {
                   directions = routeInfo.routeResults[0].directions;
                   //Remove the Line
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
              // toastr.warning($('#IDNoRoute').text())
               toastr.warning($('#IDNoRoute').text());
               //alert("Could not find route.");
           }
     

       }

       function addPtGraphic(type, place) {

           try {
               var symbol;
               if (type == "End")
                   symbol = utils.createPictureSymbol("images/user-pin-icon.png", 0, 10, 24);
               else
                   symbol = utils.createPictureSymbol('', 0, 10, 24);
       
               var graphic = new Graphic(place, symbol);
               map.graphics.add(graphic);
               if (graphic.getDojoShape()) {
                   graphic.getDojoShape().moveToFront();
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
       



       /**************************CODE FOR SEARCHING**************************/
       //Clear the map
       function clearFindGraphics() {
           map.infoWindow.hide();
           map.graphics.clear();
       }

       function removeLineGraphic(line) {
           map.graphics.remove(line);
       }
   });
   
}

function sortArrOfObjectsByParam(arrToSort /* array */, strObjParamToSortBy /* string */, sortAscending /* bool(optional, defaults to true) */) {
    if (sortAscending == undefined) sortAscending = true;  // default to true

    if (sortAscending) {
        arrToSort.sort(function (a, b) {
            return a[strObjParamToSortBy] > b[strObjParamToSortBy];
        });
    }
    else {
        arrToSort.sort(function (a, b) {
            return a[strObjParamToSortBy] < b[strObjParamToSortBy];
        });
    }
}


$(document).ready(function () {

    $('.icon_charging_station').addClass('active');
});