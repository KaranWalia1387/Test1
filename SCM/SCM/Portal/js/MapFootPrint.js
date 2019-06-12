var mapFootPrint;
var California = new google.maps.LatLng(36.778261, -119.417932); //This is default location for not navigator.geolocation support
$(document).ready(function () {
    try {
        mapFootPrint = loadMapObject_Footprint();
        $('.currentlocation').click(function () {
            setCurrentLocation();
        });
        var FootPrintData = comFootPrint.loadFootPrints().value;
        if (FootPrintData.Tables[0].Rows.length > 0) {
            for (i = 0; i < FootPrintData.Tables[0].Rows.length; i++) {
                $('#selFootPrint').append($("<option></option>").val(FootPrintData.Tables[0].Rows[i]["Locationtype"]).html(FootPrintData.Tables[0].Rows[i]["Locationtype"]));
            }
        }
        loadMapFoot(FootPrintData.Tables[1], 'All');
        $('#selFootPrint').change(function () {
            switch ($('option:selected', this).val().toLowerCase().toString()) {
                case "all":
                    $('#img-footprints').attr('src', 'images/Footprint/All_key.png');
                    break;
                case "dining":
                    $('#img-footprints').attr('src', 'images/Footprint/dining_key.png');
                    break;
                case "entertainment":
                    $('#img-footprints').attr('src', 'images/Footprint/entertainment_key.png');
                    break;
                case "electric vehicle":
                    $('#img-footprints').attr('src', 'images/Footprint/pev_key.png');
                    break;
                case "retail":
                    $('#img-footprints').attr('src', 'images/Footprint/retail_key.png');
                    break;
                case "shopping":
                    $('#img-footprints').attr('src', 'images/Footprint/groceries_key.png');
                    break;
                default: $('#img-footprints').attr('src', 'images/Footprint/All_key.png');
            }

            loadMapFoot(FootPrintData.Tables[1], $('#selFootPrint option:selected').val());

        });
    }
    catch (e) { }
});

function loadMapObject_Footprint() {
    var mapOptions = {
        zoom: 12,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map;
    if (getPageName($(location).attr('pathname')) == "dashboard") {
        map = new google.maps.Map($('#footprint_map_canvas')[0], mapOptions);

    }
    else {
        map = new google.maps.Map($('.map_canvas')[0], mapOptions);
    }
    return map;
}

function setCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            mapFootPrint = loadMapObject_Footprint();
            mapFootPrint.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            var marker;
            var city;
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            marker = new google.maps.Marker
                    ({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: mapFootPrint,
                        icon: 'images/pin.svg',
                        title: 'Click me',
                        zIndex: 0//to store array index and to use while showing infowindow
                    });

            var infowindow = new google.maps.InfoWindow({
                content: 'Current Location'
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(mapFootPrint, marker)
            });
        });
    }
    else {
        alert('Geolocation is not supported by this browser.');
        mapFootPrint = loadMapObject_Footprint();
        mapFootPrint.setZoom(5);

        var marker = new google.maps.Marker({
            position: California,
            map: mapFootPrint
        });
        mapFootPrint.setCenter(California);
    }
}


function loadMapFoot(FootPrintData, Locationtype) {
    try {
        if (FootPrintData.Rows.length > 0) {
            mapFootPrint = loadMapObject_Footprint();
            mapFootPrint.setCenter(new google.maps.LatLng(FootPrintData.Rows[0].Latitude, FootPrintData.Rows[0].Longitude));
            var pinImg = '';
            var marker = new Array();
            var infowindow = new Array();
            for (var k = 0; k < FootPrintData.Rows.length; k++) {
                if (Locationtype != "All" && FootPrintData.Rows[k]["Locationtype"] != Locationtype) { continue; } //Filtering Data
                switch (FootPrintData.Rows[k]["Locationtype"].toLowerCase()) {
                    case 'electric vehicle': pinImg = 'images/Footprint/pev_green.svg'; break;
                    case 'retail': pinImg = 'images/Footprint/retail_green.svg'; break;
                    case 'shopping': pinImg = 'images/Footprint/groceries_green.svg'; break;
                    case 'dining': pinImg = 'images/Footprint/dining_green.svg'; break;
                    case 'entertainment': pinImg = 'images/Footprint/entertainment_green.svg'; break;
                    default: pinImg = 'images/pin.svg';
                }
                marker[k] = new google.maps.Marker({
                    position: new google.maps.LatLng(FootPrintData.Rows[k].Latitude, FootPrintData.Rows[k].Longitude),
                    map: mapFootPrint,
                    icon: pinImg,
                    title: 'Click me',
                    zIndex: k//to store array index and to use while showing infowindow
                });

                infowindow[k] = new google.maps.InfoWindow({
                    content: '<div class="markerwindow">' + FootPrintData.Rows[k].FpTitle + '</br>' + FootPrintData.Rows[k].FpSubtitle + '</div>'
                });

                var lastIndex = 0;
                google.maps.event.addListener(marker[k], 'click', function () {
                    var currentIndex = this.getZIndex();
                    //edited by shobhit
                    if (infowindow[lastIndex] != null) {
                        infowindow[lastIndex].close();
                    }
                    infowindow[currentIndex].open(mapFootPrint, marker[currentIndex]);
                    lastIndex = currentIndex;
                });
            }
        }
        else { setCurrentLocation(); }
    }
    catch (e) { }
}