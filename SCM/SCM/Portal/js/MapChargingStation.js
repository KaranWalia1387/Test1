var latlng;
var initialLocation;
var rateSorted;
var California = new google.maps.LatLng(36.778261, -119.417932); //This is default location for not navigator.geolocation support
var map;
var directionrend;

$(document).ready(function () {
    PEVLocations = ChargingStations.LoadPevLocations().value;
    if (PEVLocations.Rows.length == 0 || PEVLocations == "" || PEVLocations == null) {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                map = loadMapObject();
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                var marker;
                var city;
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker = new google.maps.Marker
                    ({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: map,
                        icon: 'images/pin.svg',
                        title: 'Click me',
                        zIndex: 0//to store array index and to use while showing infowindow
                    });

                var infowindow = new google.maps.InfoWindow({
                    content: 'Current Location'
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker)
                });
            });
        }
        else {
            w2alert('Geolocation is not supported by this browser.');
            map = loadMapObject();
            map.setZoom(5);

            var marker = new google.maps.Marker({
                position: California,
                map: map
            });
            mapFootPrint.setCenter(California);
        }
        return;
    }
    $('#btnDistance').click(function () {
        getDistanceSorted();

        $('#path').html('');
        $('#LeftPanel').height(384);
        $('#path').height(0);
        $(this).attr('src', 'images/Electric_distance_btn_ro.png');
        $('#btnRate').attr('src', 'images/Electric_rate_btn.png');
    });
    $('#btnRate').click(function () {
        getRateSorted();
        getCurrentLoc(rateSorted, true);
        $('#path').html('');
        $('#LeftPanel').height(384);
        $('#path').height(0);
        $(this).attr('src', 'images/Electric_rate_btn_ro.png');
        $('#btnDistance').attr('src', 'images/Electric_distance_btn.png');
    });
    getCurrentLoc(PEVLocations, true);
});

function getCurrentLoc(Data, clk) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (geocodePosition) {
            loadPEVLocation(Data, clk, new google.maps.LatLng(geocodePosition.coords.latitude, geocodePosition.coords.longitude));
        });
    }
    else {
        w2alert('Geolocation is not supported by this browser.');
        var map = loadMapObject();
        map.setZoom(5);

        var marker = new google.maps.Marker({
            position: California,
            map: map

        });
        map.setCenter(California);
    }
}

function getRateSorted() {
    var temp;
    rateSorted = PEVLocations;
    for (var m = 1; m < PEVLocations.Rows.length; m++) {
        rateSorted.Rows[m] = PEVLocations.Rows[m];
        for (var n = m; n > 0; n--) {
            if (rateSorted.Rows[n].Rate < rateSorted.Rows[n - 1].Rate) {
                temp = rateSorted.Rows[n - 1];
                rateSorted.Rows[n - 1] = rateSorted.Rows[n];
                rateSorted.Rows[n] = temp;
            }
        }
    }
}

function getDistanceSorted() {
    var distanceSorted;
    var distarr = new Array();
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (geocodePosition) {

            initialLocation = new google.maps.LatLng(geocodePosition.coords.latitude, geocodePosition.coords.longitude);
            for (var j = 0; j < PEVLocations.Rows.length; j++) {

                distarr[j] = distanceLatLon(initialLocation, new google.maps.LatLng(PEVLocations.Rows[j].Latitude, PEVLocations.Rows[j].Longitude));
            }
            distanceSorted = PEVLocations;
            for (var m = 1; m < PEVLocations.Rows.length; m++) {
                distanceSorted.Rows[m] = PEVLocations.Rows[m];
                for (var n = m; n > 0; n--) {
                    if (distarr[n] < distarr[n - 1]) {
                        temp = distanceSorted.Rows[n - 1];
                        distanceSorted.Rows[n - 1] = distanceSorted.Rows[n];
                        distanceSorted.Rows[n] = temp;

                        temp = distarr[n - 1];
                        distarr[n - 1] = distarr[n];
                        distarr[n] = temp;
                    }
                }
            }
            loadPEVLocation(distanceSorted, true, initialLocation);
        });
    }
    else {
        w2alert('Geolocation is not supported by this browser.');
        var map = loadMapObject();
        map.setZoom(5);

        var marker = new google.maps.Marker({
            position: California,
            map: map

        });
        map.setCenter(California);
    }
}


function loadMapObject() {
    var mapOptions = {
        zoom: 14,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($('#electric_map_canvas')[0], mapOptions);
    return map;
}

function imgclick(obj) {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (geocodePosition) {

            var directionsService = new google.maps.DirectionsService();
            var directionsRequest = {

                origin: new google.maps.LatLng(geocodePosition.coords.latitude, geocodePosition.coords.longitude),
                destination: new google.maps.LatLng($(obj).attr('coordinates').split(',')[0], $(obj).attr('coordinates').split(',')[1]),
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            };

            if (directionrend != null) {
                directionrend.setMap(null);
            }

            directionsService.route(
          directionsRequest,
          function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  $('#path').html('');
                  directionrend = new google.maps.DirectionsRenderer({
                      map: map,
                      directions: response,
                      suppressMarkers: true,
                      panel: path,
                      preserveViewport: true
                  });

                  $('#LeftPanel').height(200);
                  $('#path').height(184);
                  map.setZoom(9);

              }
              else
                  w2alert("Unable to retrieve your route");
          }
        );
        });
    }
    else
        w2alert("Unable to retrieve your route");
}

function loadPEVLocation(Data, clkstatus, initialLocation) {

    map = loadMapObject();
    map.setCenter(new google.maps.LatLng(Data.Rows[0].Latitude, Data.Rows[0].Longitude));


    var marker = new Array();
    var marker1 = new Array();
    var infowindow = new Array();
    var leftPanelHTML = '';
    var styledMarker = new Array();
    initialLocation1 = initialLocation;
    for (var i = 0; i < Data.Rows.length; i++) {

        var destinLocation = new google.maps.LatLng(Data.Rows[i].Latitude, Data.Rows[i].Longitude);
        var distance = distanceLatLon(initialLocation1, destinLocation) + ' Miles';
        var locName = Data.Rows[i].LocationName;

        var rate = Data.Rows[i].Rate + Data.Rows[i].UOM;
        var address = Data.Rows[i].Address1;
        if (clkstatus) {
            leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + destinLocation + '"/>';
            leftPanelHTML += '<table>';
            leftPanelHTML += '<tr><td rowspan="5"><img  src="images/pin.svg"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
            leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
            leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
            leftPanelHTML += '<tr><td class="red">Rate: $' + rate + '</td></tr>';
            leftPanelHTML += '<tr><td>' + distance + '</td></tr>';

            leftPanelHTML += '</table></div>';
        }
        marker1[i] = new MarkerWithLabel({
            position: destinLocation,
            map: map,
            draggable: false,
            raiseOnDrag: false,
            labelText: i + 1,
            labelAnchor: new google.maps.Point(3, -30),
            labelClass: "maplabels", // the CSS class for the label
            labelInBackground: false,
            labelStyle: { opacity: 0.75 },
            icon: 'images/pin.svg',
            zIndex: i,
            title: 'Click me'
        });

        if (getPageName($(location).attr('pathname')) == "chargingstations") {
            infowindow[i] = new google.maps.InfoWindow({
                content: '<div class="markerwindow">' + locName + '<img src="images/route.png" style="float:right;" coordinates="' + Data.Rows[i].Latitude + ',' + Data.Rows[i].Longitude + '"  onclick="imgclick(this);" />' + '</br>Rate: $' + rate + ' ,<br /> Distance: ' + distance + '</div>'
            });
        }
        else {
            infowindow[i] = new google.maps.InfoWindow({
                content: '<div class="markerwindow">' + locName + '</br>Rate: $' + rate + ' , Distance: ' + distance + '</div>'
            });
        }

        var lastIndex = 0;
        google.maps.event.addListener(marker1[i], 'click', function () {
            var currentIndex = this.getZIndex();
            infowindow[lastIndex].close();
            infowindow[currentIndex].open(map, marker1[currentIndex]);
            lastIndex = currentIndex;
        });
    }

    if (clkstatus) {
        $('#LeftPanel').html(leftPanelHTML);
        var leftPanel = $('#LeftPanel');

        if (lastClickedDivVal == null) {
            $(leftPanel).find('div:first-child').addClass('MessageContainerActive');
        }
        else {
            $('#LeftPanel input[value="' + lastClickedDivVal + '"]');
            $(leftPanel).find('input[value="' + lastClickedDivVal + '"]').parent().addClass('MessageContainerActive');
            latlng = lastClickedDivVal.replace('(', '').replace(')', '');
            map.setCenter(new google.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]));
            lastClickedDivVal = null;
        }
        $(leftPanel).find('div[class^="MessageContainer"]').click(function () {
            $(leftPanel).find('div[class^="MessageContainer"]').addClass('MessageContainer');
            $(leftPanel).find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
            $(this).addClass('MessageContainerActive');
            latlng = $(this).find('input').val().replace('(', '').replace(')', '');
            map.setCenter(new google.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]));
            if (map.getZoom() != 14) {
                map.setZoom(14);
            }

            $('#path').html('');
            $('#LeftPanel').height(384);
            $('#path').height(0);
        });
    }
}

//function setContent() {
//    var leftPanel = $('#LeftPanel');
//    $(leftPanel).find('div:first-child').addClass('MessageContainerActive');
//    $(leftPanel).find('div[class^="MessageContainer"]').click(function () {
//        $(leftPanel).find('div[class^="MessageContainer"]').addClass('MessageContainer');
//        $(leftPanel).find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
//        $(this).addClass('MessageContainerActive');
//        var latlng = $(this).find('input').val().replace('(', '').replace(')', '');
//        loadPEVLocation(PEVLocations, false);
//        map.setCenter(new google.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]));
//    });
//}



function distanceLatLon(source, destin, unit) {

    var lat1 = source.lat();
    var lon1 = source.lng();
    var lat2;
    var lon2;

    var theta;
    var dist;


    lat2 = destin.lat();
    lon2 = destin.lng();
    theta = lon1 - lon2;
    dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
    if (unit == 'K') { dist = dist * 1.609344; }
    else if (unit == 'N') { dist = dist * 0.8684; }



    return dist.toFixed(2);

}

function deg2rad(deg) { return deg * Math.PI / 180.0; }
function rad2deg(rad) { return rad / Math.PI * 180.0; }


