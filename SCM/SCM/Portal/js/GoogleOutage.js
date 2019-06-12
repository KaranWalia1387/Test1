var outageType = "C";
var polygonSymbol, polygonGraphic, pts, pt, sym;
var outData;
var marker1 = new Array();

var mapType = 1;
var map;


$(document).ready(function () {
    $('.right_charging_map a').click(function () {

        outageType = $(this).attr('key');
        $('#GIStxtGoogleSearch').val('');
        // To show as Active/Deactive
        $('.distance_area a').removeClass('active');
        $(this).addClass('active');
        var selected = $('select#ddlAddress option:selected').val().split(":");
        //$(this).parent().find('div').each(function () { $('.outageType a div').addClass('TabBtns').removeClass('TabBtns_ro'); });
        //$(this).find('div').addClass('TabBtns_ro').removeClass('TabBtns');
        //data = comMessages.loadLatLongService(outageType).value;
        mapGoogle();
    });

    mapGoogle();

    var leftPanel = $('#LeftPanel');
    $(".MessageContainer").click(function () {

        alert();
        //$(leftPanel).find('div[class^="MessageContainer"]').addClass('MessageContainer');
        //$(leftPanel).find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
        //$(this).addClass('MessageContainerActive');

        //latlng = $(this).find('input').val().replace('(', '').replace(')', '');
        //if (Data.Rows[latlng].OutageLatitude != "" && Data.Rows[latlng].OutageLongitude != "")
        //    map.setCenter(new google.maps.LatLng(Data.Rows[latlng].OutageLatitude, Data.Rows[latlng].OutageLongitude));
        //if (map.getZoom() != 13) {
        //    map.setZoom(13);
        //}
        //$('#path').html('');
        //$('#LeftPanel').height(384);
        //$('#path').height(0);

    });
});

window.onload = function () {
    //mapGoogle();

    //var leftPanel = $('#LeftPanel');
    //$(leftPanel).find('div[class^="MessageContainer"]').click(function () {

    //    alert();
    //    $(leftPanel).find('div[class^="MessageContainer"]').addClass('MessageContainer');
    //    $(leftPanel).find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
    //    $(this).addClass('MessageContainerActive');

    //    //latlng = $(this).find('input').val().replace('(', '').replace(')', '');
    //    //if (Data.Rows[latlng].OutageLatitude != "" && Data.Rows[latlng].OutageLongitude != "")
    //    //    map.setCenter(new google.maps.LatLng(Data.Rows[latlng].OutageLatitude, Data.Rows[latlng].OutageLongitude));
    //    //if (map.getZoom() != 13) {
    //    //    map.setZoom(13);
    //    //}
    //    //$('#path').html('');
    //    //$('#LeftPanel').height(384);
    //    //$('#path').height(0);

    //});
};

function addListnerLeftPanel() {
    $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
        $('#LeftPanel').find('div[class^="MessageContainer"]').addClass('MessageContainer');
        $('#LeftPanel').find('div[class^="MessageContainer"]').removeClass('MessageContainerActive');
        $(this).addClass('MessageContainerActive');

        //var latlng = $(this).find('input').val();
        //var indexA = latlng.split(',');
        //var index = indexA[3];
        //var infoStatus = data.Tables[1].Rows[index]["STATUS"];
        //var date = data.Tables[1].Rows[index]["Outagedate"];
        //var title = data.Tables[1].Rows[index]["Title"];
        //var area = data.Tables[1].Rows[index]["Area"];
        
        //report = data.Tables[1].Rows[index]["OutageReportInfo"];
        //infoStatus = outageType == 'C' ? infoStatus : '';
        //var restorationtime = '';
        //if (data.Tables[1].Rows[index]["RestorationTime"] != null) {
        //    restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":" + "</strong>" + data.Tables[1].Rows[index]["Restorationdate"];
        //    //restorationtime = "<strong>Estimated Restoration Time</strong>: " + data.Tables[1].Rows[i]["RestorationTime"];
        //}
        //if (infoStatus == "") {
        //    attributes = { "Date": date, "Title": title, "Area": area, "Report": report, "Restorationtime": restorationtime };
        //    infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br>" + $('#lblDate').text() + ":" + "</b>${Date}<br><b>" + $('#lblReport').text() + ":" + "</b>${Report}<br>${Restorationtime}<br>");
        //}
        //else {
        //    attributes = { "InfoStatus": infoStatus, "Date": date, "Title": title, "Area": area, "Report": report, "Restorationtime": restorationtime };
        //    infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br><b>InfoStatus:</b>${InfoStatus}<br><b>" + $('#lblDate').text() + ":" + "</b>${Date}<br><b>" + $('#lblReport').text() + ":" + "</b>${Report}<br>${Restorationtime}<br>");
        //}
        ////tableID = latlng.split(',')[2];
        //var zoompt = new Point(latlng.split(',')[0], latlng.split(',')[1]);
        //graphic = new Graphic(zoompt, sym, attributes, infoTemplate);
        //map.infoWindow.setContent(graphic.getContent());
        //map.infoWindow.setTitle($('#lblOutages').text());
        //map.infoWindow.show(zoompt, InfoWindow.ANCHOR_UPPERRIGHT);
        //map.centerAndZoom(zoompt, 12);
        ////clearAddGraphics();
        ////drawpolygon();
        //map.graphics.add(graphic);
    });
}


function mapGoogle() {
    var url = "dashboard.aspx/LoadOutageService";
    var param = { 'IsPlannedOutage': outageType };
    loadOutageData(url, param);

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
            center: new google.maps.LatLng($("#ddlAddress option:selected").attr('latitude'), $("#ddlAddress option:selected").attr('longitude')),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $('#LeftPanel').html('<center>No Outages Present</center>');
    }
    //var infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("outage_map_canvas"), mapOptions);

    bingOutagePoint();
}

function loadOutageData(url, param) {
    $.ajax({
        async: false,
        type: "POST",
        url: url, //"Dashboard.aspx/LoadOutageService",
        data: JSON.stringify(param),//'{IsPlannedOutage: "' + outageType + '" }',
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
                    object["Name"] = key;
                    object["Rows"] = r[key];
                    odata.push(object);
                }
                count++;
            }
            var ldata = {}
            ldata["Tables"] = odata.valueOf();
            outData = ldata;

        },
        error: function (response) {
            console.log(response.d);
        }
    });
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
                strokeColor: "#FF0000",
                strokeOpacity: 0.75,
                strokeWeight: 1,
                fillColor: "#FF0000",
                fillOpacity: 0.25
            });
            mapPoly.setMap(map);
        });
    });
}

function bingOutagePoint() {
    var titleOutage = "";
    //var marker = new Array();
    var marker1 = new Array();
    var infowindow = new Array();
    var leftPanelHTML = '';
    var styledMarker = new Array();
    var Data = outData.Tables[1];
    //========================================
    var clkstatus = true;
    //initialLocation1 = initialLocation;
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

        var date = Data.Rows[i].Restorationdate;
        var outageRestoration = "";
        if (date != null) {
            outageRestoration = date;
        }
        var imgIcon, maplabelclass;
        var Cause = Data.Rows[i].OutageReportInfo;

        leftPanelHTML += '<div class="MessageContainer"><input type="hidden" value="' + Data.Rows[i]["OutageLongitude"] + "," + Data.Rows[i]["OutageLatitude"] + "," + Data.Rows[i]["Outageid"] + "," + i + '"/>';
        leftPanelHTML += '<table>';

        imgIcon = (outageType == 'C') ? 'images/outages/energy_icon_red.svg' : 'images/outages/energy_icon_blue.svg';
        outageTitle = Data.Rows[i].Title;

        //leftPanelHTML += '<tr><td rowspan="5"><img  src="' + imgIcon + '"/></td></tr>';//<label class="PinLabel1">' + (i + 1) + '</label>
        maplabelclass = 'maplabels1';

        
        leftPanelHTML += '<tr class="blue"><td><b>' + Data.Rows[i].Title + '</b></td></tr>';
        leftPanelHTML += '<tr><td><strong>Date & time of outage:</strong>' + outageDate + '</td></tr>';
        if (outageType == 'C') {
            leftPanelHTML += '<tr><td><strong>Status:</strong>' + Data.Rows[i].STATUS + '</td></tr>';
        }
        leftPanelHTML += '<tr><td><strong>Estimated Restoration:</strong>' + outageRestoration + '</td></tr>';
        leftPanelHTML += '<tr><td><strong>Report Info:</strong>' + Cause + '</td></tr>';
        leftPanelHTML += '</table></div>';

        //var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="markerwindow"><strong>' + outageTitle + '</strong></br>Date & Time of Outage: ' + outageDate + '</br>Status: ' + Data.Rows[i].STATUS + '</br>Estimated Time of Restoration: ' + outageRestoration + '</div>'
        });

        $('#LeftPanel').html(leftPanelHTML);
        addListnerLeftPanel();
        var marker = new google.maps.Marker({
            position: destinLocation,
            map: map,
            draggable: false,
            icon: imgIcon,
            title: outageTitle
        });
        
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                //infoWindow.setContent(oooo);
                infowindow.open(map, marker);
            });
        })(marker, data);

        drowPolygon(Data.Rows[i].Outageid)
    }
}




























function plotPicPoint() {






    var leftPanelHTML = '';

    if (data.Tables[1].Rows.length > 0) {

        sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_red.svg', 40, 40) : new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_blue.svg', 40, 40);



        var place, attributes, infoTemplate, pt, graphic;
        for (var i = 0; i < data.Tables[1].Rows.length; i++) {

            // pt = new Point(data.Tables[1].Rows[i]["OutageLongitude"], data.Tables[1].Rows[i]["OutageLatitude"]);
            var infoStatus = data.Tables[1].Rows[i]["STATUS"];
            var date = data.Tables[1].Rows[i]["Outagedate"];
            var title = data.Tables[1].Rows[i]["Title"];
            var area = data.Tables[1].Rows[i]["Area"];
            report = data.Tables[1].Rows[i]["OutageReportInfo"];
            infoStatus = outageType == 'C' ? "<strong>" + $('#lblStatus').text() + ":" + "</strong>" + infoStatus : '';
            var restorationtime = '';
            if (data.Tables[1].Rows[i]["RestorationTime"] != null) {
                restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":" + "</strong>" + data.Tables[1].Rows[i]["Restorationdate"];
                //restorationtime = "<strong>Estimated Restoration Time</strong>: " + data.Tables[1].Rows[i]["RestorationTime"];
            }
            leftPanelHTML += '<div class="MessageContainer "><input type="hidden" value="' + data.Tables[1].Rows[i]["OutageLongitude"] + "," + data.Tables[1].Rows[i]["OutageLatitude"] + "," + data.Tables[1].Rows[i]["Outageid"] + "," + i + '">';
            leftPanelHTML += '<table>';
            leftPanelHTML += '<tr ><td class="blue">' + title + '</td></tr>';
            leftPanelHTML += '<tr><td class="green"><strong>' + $('#lblDate').text() + '</strong>' + date + '</td></tr>';
            //leftPanelHTML += '<tr ><td><strong>' + area + '</strong></td></tr>';
            leftPanelHTML += '<tr><td>' + infoStatus + '</td></tr>';
            leftPanelHTML += '<tr><td>' + restorationtime + '</td></tr>';
            if (data.Tables[1].Rows[i]["OutageReportInfo"] == null)
                leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + ':' + '</strong> N/A </td></tr>';
            else
                leftPanelHTML += '<tr class="border"><td><strong>' + $('#lblReport').text() + ':' + '</strong>' + report + '</td></tr>';



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
            var area = data.Tables[1].Rows[index]["Area"];
            report = data.Tables[1].Rows[index]["OutageReportInfo"];
            infoStatus = outageType == 'C' ? infoStatus : '';
            var restorationtime = '';
            if (data.Tables[1].Rows[index]["RestorationTime"] != null) {
                restorationtime = "<strong>" + $('#lblEstimatedtime').text() + ":" + "</strong>" + data.Tables[1].Rows[index]["Restorationdate"];
                //restorationtime = "<strong>Estimated Restoration Time</strong>: " + data.Tables[1].Rows[i]["RestorationTime"];
            }
            if (infoStatus == "") {
                attributes = { "Date": date, "Title": title, "Area": area, "Report": report, "Restorationtime": restorationtime };
                infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br>" + $('#lblDate').text() + "</b>${Date}<br><b>" + $('#lblReport').text() + ":" + "</b>${Report}<br>${Restorationtime}<br>");
            }
            else {
                attributes = { "InfoStatus": infoStatus, "Date": date, "Title": title, "Area": area, "Report": report, "Restorationtime": restorationtime };
                infoTemplate = new InfoTemplate($('#lblOutages').text(), "<b>${Title}</b><br><b>InfoStatus:</b>${InfoStatus}<br><b>" + $('#lblDate').text() + "</b>${Date}<br><b>" + $('#lblReport').text() + ":" + "</b>${Report}<br>${Restorationtime}<br>");
            }
            //tableID = latlng.split(',')[2];
            var zoompt = new Point(latlng.split(',')[0], latlng.split(',')[1]);
            graphic = new Graphic(zoompt, sym, attributes, infoTemplate);
            map.infoWindow.setContent(graphic.getContent());
            map.infoWindow.setTitle($('#lblOutages').text());
            map.infoWindow.show(zoompt, InfoWindow.ANCHOR_UPPERRIGHT);
            map.centerAndZoom(zoompt, 12);
            //clearAddGraphics();
            //drawpolygon();
            map.graphics.add(graphic);
        });

    }
    else {
        try { $('#outage_Text_canvas').html('No outages found.'); }
        catch (e) { }
    }
}

function clearAddGraphics() {
    map.infoWindow.hide();
    map.graphics.clear();
    polygonGraphic = null;
    pts = null;
    polygonSymbol = null;
}