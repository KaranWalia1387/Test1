var minZoomLevel = 5;
var outageType = "C";
var California = new google.maps.LatLng(36.778261, -119.417932);
function loadMapObject(zoomp) {
    var mapOptions = {
        zoom: zoomp,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($('.map_canvas')[0],
            mapOptions);
    return map;
}

$(document).ready(function () {
    loadMap(comMessages.loadLatLongService(outageType).value);
    checkClientTimeZone();
    $('.outageType a').click(function () {
        outageType = $(this).attr('key');
        if ($(this).find('img').attr('src').indexOf("_ro.png") < 0) {
            $(this).parent().find('img').each(function () { this.src = this.src.replace('_ro.png', '.png'); });
            $(this).find('img').attr('src', $(this).find('img').attr('src').replace('.png', '_ro.png'));
            loadMap(comMessages.loadLatLongService(outageType).value);
        }
    });

    //Commented this code since we are now using asp image button to refresh page
    //$('#btnRefresh').click(function () {
    //    loadMap(comMessages.loadLatLongService(outageType).value);
    //});

    $('#optUsage').change(function () {
        window.location.href = $('#optUsage option:selected').val();
    });
    $('#OutagesearchGoogleMap').click(function () {
        checkOutage($.trim($('#txtGoogleSearch').val()));
    });
});

//function checkClientTimeZone() {
//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    var parameter = "{str:'" + tz.toString() + "'}";
//    $.ajax({
//        type: "POST",
//        url: "dashboard.aspx/setcookie",
//        contentType: "application/json; charset=utf-8",
//        data: parameter,
//        datatype: "json",
//    });
//}

function OutagesearchMap() {
    var nodes = comMessages.searchGoogleMap($.trim($('#txtGoogleSearch').val())).value;
    var xml = nodes,
            xmlDoc = $.parseXML(xml),
            $xml = $(xmlDoc),
            $status = $xml.find("status");
    if ($status.text() == "OK") {
        OutageloadSearchedMap(nodes);

        $('#txtGoogleSearch').focus();
    }
    else {
        w2alert($('#IDEnterCityZip').text());
        //alert('Please enter a City Name or ZIP Code.');

        $('#txtGoogleSearch').focus();
        return false;
    }
    if (getPageName($(location).attr('pathname')) == "chargingstations") {
        $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
            lastClickedDivVal = $(this).find('input[type="hidden"]').val();
            getCurrentLoc(PEVLocations, true);
        });
    }
}

function OutageloadSearchedMap(xmlString) {
    var parsedNodes = $.parseXML(xmlString);
    var pos;
    $(parsedNodes).find('result').each(function () {

        pos = new google.maps.LatLng($(this).find('geometry>location>lat').text(), $(this).find('geometry>location>lng').text());
    });
    map.setCenter(pos);
}

function checkOutage(searchtext) {
    if (searchtext != '') {
        var result = '';
        //var result = comMessages.SearchOutage(searchtext).value;
        if (searchtext.toLowerCase() == 'chino hills' || searchtext == '91709') {
            result = '1';
        }
        else { result = '0'; }
        if (result == "1") {
            OutagesearchMap();
        }
        else {
            w2alert($('#IDNoService').text());
            //alert('Utilities company does not provide service for this area.');
            return false;
        }
    }
    else {
        w2alert($('#IDEnterZip').text());
        //alert('Please enter Zip Code.');
    }
}
function OutagechkKey(e) {
    var code = e.which || event.keyCode;
    if (code == 13) {
        checkOutage($.trim($('#txtGoogleSearch').val()));
        $('#txtGoogleSearch').focus();
        return false;
    }
}
function loadCurrentLocation(mapobject) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {


            mapobject.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            var marker;
            marker = new google.maps.Marker
                    ({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: mapobject,
                        icon: 'images/pin.svg',
                        title: 'Click me',
                        zIndex: 0//to store array index and to use while showing infowindow
                    });

            var infowindow = new google.maps.InfoWindow({
                content: 'Current Location'
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(mapobject, marker)
            });

            google.maps.event.addListener(map, 'zoom_changed', function () {
                if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
            });
        });
    }
    else {
        map.setCenter(California);
    }
}

function loadMap(dataTable) {
    try {
        var zoomp;
        if (getPageName($(location).attr('pathname')) == "dashboard") {

            zoomp = 10;
        }
        else {
            zoomp = 12;
        }

        map = loadMapObject(zoomp);

        if (dataTable.Tables[0].Rows.length == 0) {
            loadCurrentLocation(map);
            return;
        }
        if (dataTable.Tables[0] == null) {
            loadCurrentLocation(map);
            return;
        }
        var shapeCount = (dataTable.Tables.length) / 2;
        var marker = new Array();
        var infowindow = new Array();

        /////////FOR SHAPE/////////
        for (var i = 0; i < shapeCount; i++) {
            var pagename = getPageName($(location).attr('pathname'));
            var tblLatLong = dataTable.Tables[i * 2];
            var OutageTypeFlag = dataTable.Tables[0].Name; //0=Water, 1=power

            var paths = new Array();
            for (var j = 0; j < tblLatLong.Rows.length; j++) {
                paths[j] = new google.maps.LatLng(tblLatLong.Rows[j]["Latitude"], tblLatLong.Rows[j]["Longitude"]);
            }

            var shape = new google.maps.Polygon({
                paths: paths,
                strokeColor: '#ff0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: outageType == 'C' ? '#ff0000' : '#e56b08',
                fillOpacity: 0.35
            });
            shape.setMap(map);

        }
        /////////FOR SHAPE/////////

        /////////FOR PINPOINTS/////////

        var m = 0;
        var mapCenter = '';

        for (var k = 0; k < shapeCount; k++) {
            var iconImg = 'images/outages/';
            if (pagename == "dashboard") {
                if (k == 0) iconImg += (outageType == 'C' ? 'energy_icon_red.png' : 'energy_icon_blue.png');
                else iconImg += (outageType == 'C' ? 'outages-water-red.png' : 'outages-water-blue.png');
            }
            else {
                if (OutageTypeFlag == 1) iconImg += (outageType == 'C' ? 'energy_icon_red.png' : 'energy_icon_blue.png');
                else { iconImg += (outageType == 'C' ? 'outages-water-red.png' : 'outages-water-blue.png'); }
            }
            var tblMessage = dataTable.Tables[(k * 2) + 1];

            for (var i = 0; i < tblMessage.Rows.length; i++) {

                mapCenter = new google.maps.LatLng(tblMessage.Rows[i]["OutageLatitude"], tblMessage.Rows[i]["OutageLongitude"]);


                marker[m] = new google.maps.Marker({
                    position: mapCenter,
                    map: map,
                    icon: iconImg,
                    title: 'Click me',
                    zIndex: m//to store array index and to use while showing infowindow
                });


                var infoTitle = "<b>" + tblMessage.Rows[i]["Title"] + "</b><br/>";
                var infoArea = tblMessage.Rows[i]["Area"] + "<br/>";
                //infoArea = outageType == 'C' ? infoArea + "<br/>" : infoArea.split('Date/Time')[0] + "<br/>" + "Date/Time: " + infoArea.split('Date/Time')[1] + "<br/>";
                var infoStatus = tblMessage.Rows[i]["Status"];
                infoStatus = outageType == 'C' ? "Status: " + infoStatus + "<br/>" : '';
                var restorationtime = '';
                if (tblMessage.Rows[i]["RestorationTime"] != null)
                    restorationtime = "Estimated Restoration Time: " + tblMessage.Rows[i]["RestorationTime"];

                infowindow[m] = new google.maps.InfoWindow({
                    content: '<div class="markerwindow">' + infoTitle + infoArea + infoStatus + restorationtime + '</div>'
                });


                var lastIndex = 0;
                google.maps.event.addListener(marker[m], 'click', function () {
                    var currentIndex = this.getZIndex();
                    infowindow[lastIndex].close();
                    // Calling the open method of the infoWindow 
                    infowindow[currentIndex].open(map, marker[currentIndex]);
                    lastIndex = currentIndex;
                });
                m++;
            }
        }
        /////////FOR PINPOINTS/////////
        if (mapCenter != '') {
            map.setCenter(mapCenter);
        }
        else { loadCurrentLocation(map); }
    }
    catch (e) {
    }
}