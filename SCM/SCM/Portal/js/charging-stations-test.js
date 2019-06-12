var data, roww, map;
var initialLocation, PEVLocations, CSinitiallocations;
var isdistancesorted = true;
var start;
var previousLine = null;
var long, lat;
var googlemap;
var Mapmode = 0//= $('#hdMapId').val();
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
var googledirectionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: polylineOptionsActual })

//var googledirectionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: polylineOptionsActual });
var googledirectionsService = new google.maps.DirectionsService;

$(document).ready(function () {
    googlemapload();

});


function googlemapload()
{
    var selected = $('select#ddlAddress option:selected').val().split(":");
    long = parseFloat(selected[4]);
    lat = parseFloat(selected[3]);
    PEVLocations = charging_stations.LoadPevLocations(String(long), String(lat)).value;
    CSinitiallocations = PEVLocations;
    //  mapGoogle(CSinitiallocations);
    getDistanceSorted();

}

function getDistanceSorted(order) {
    if (order == undefined) {
        order = 'asc';
    }
    //$('#page_loader').hide();
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
    mapGoogle(distanceSorted);
   // addpp(distanceSorted, false);

}




function mapGoogle(outData) {
    //var outData = locationstoplot;
    var markers = [];
    var mapOptions = [];
    markers = $.map(outData.Rows, function (val, key) {
        return { "title": val.LocationName, "lat": val.Latitude, "lng": val.Longitude, "description": val.LocationName };
    });
    if (outData.Rows.length > 0) {
        mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    else {
        mapOptions = {
            center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $('#LeftPanel').html('<center>No Payment Location</center>');
    }
    googlemap = new google.maps.Map(document.getElementById("electric_map_canvas"), mapOptions);
    bingChargingPoint(outData);
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

        leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + roww.Longitude + "," + roww.Latitude + '"/>';
        leftPanelHTML += '<table>';
        leftPanelHTML += '<tr><td rowspan="6"><img  src="images/pin.svg"/><label class="PinLabel">' + (i + 1) + '</label></td></tr>';
        leftPanelHTML += '<tr><td class="blue">' + locName + '</td></tr>';
        leftPanelHTML += '<tr class="border"><td>' + address + '</td></tr>';
        leftPanelHTML += '<tr class="border"><td>' + address2 + '</td></tr>';
        leftPanelHTML += '<tr><td class="red">' + $('#lblRate').text() + ':' + rate + '</td></tr>';
        leftPanelHTML += '<tr><td>' + distance + '</td></tr>';
        leftPanelHTML += '</table></div>';

        var destinLocation = new google.maps.LatLng(roww.Latitude, roww.Longitude);

        //var imgIcon = 'images/pin.svg ';
        var beachIcon = {
            url: 'images/pin.svg ',
            labelOrigin: new google.maps.Point(15, 15),
        };
        //  var ChargingTitle = PEVLocations.Rows[i].LocationName;
        // var infowindow = new google.maps.InfoWindow({content: '<div ><strong >' + $('#titletext').text() + '</strong ></br>' + $('#lblAddress').text() + ':' + address + ' ' + address2 +'</br>'+ $('#lblRate').text() + ':' + rate + ' <br/><img latlng=\"" + PEVLocations.Rows[i].Longitude + "," + PEVLocations.Rows[i].Latitude + "\" class=\"imgroute\" src="images/get_direction_icon.png" />' + '</div>'});
        $('#LeftPanel').html(leftPanelHTML);
        // addListnerLeftPanel();
        labels = i + 1;
        var infoWindow1 = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            position: destinLocation,
            label: labels.toString(),
            map: googlemap,
            draggable: false,
            icon: beachIcon,
            title: roww.LocationName,
        });
        (function (marker, roww) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow1.setContent('<div>test <div>');
                infoWindow1.open(googlemap, marker);
            });
        })(marker, roww);
    
        // Event that closes the Info Window with a click on the map

        //  drowPolygon(outData.Rows[i].PaylocationId)
    }
}

