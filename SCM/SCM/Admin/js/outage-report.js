var OutageTable;
var OutageMapTable;
var databindtogrid;
gridid = 'jqxgrid';
//var piechart = '';
//var divId = 'div-Outagechart';
var GridWidth = '';
var GridHeight = '';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 3;
var plandsum = 0;
var unplandsum = 0;
var totalsum = 0;
var flagfilter = 0;
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "S.No":
            return getresult(row, value);
            breakbtnSubmit
        case "City":
            return getresult(row, value);
            break;
        case "Zip Code":
            return getresultZip(row, value);
            break;
        case "TotalOutages":
            return getresult(row, value);
            break;
        case "PlannedOutages":
            return getresult(row, value);
            break;
        case "UnplannedOutages":
            return getresult(row, value);
            break;
        default:
            break;
    }
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
function getresultZip(row, value) {

    return '<div style="text-align: left;"><span id=' + value + ' class=filterdropzip >' + value + '</span></div>';

}
function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        if (databindtogrid.length == 0) {
            $('#nodata_div').show();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
        }
        //Getting the source data with ajax GET request
        var source = {
            datatype: "array",
            datafields: [
             { name: 'S.No', type: 'number' },
             { name: 'City' },
             { name: 'CityId', type: 'number' },
             { name: 'ZipCode', type: 'string' },
             { name: 'TotalOutages', type: 'number' },
             { name: 'PlannedOutages', type: 'number' },
             { name: 'UnplannedOutages', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgrid").jqxGrid({

            width: "100%",
            height: GridHeight * .79,
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            filterable: true,
            columns:
            [
                { text: 'S.No', dataField: 'S.No', hidden: true, cellsrenderer: imagerenderer },
                { text: 'City', dataField: 'City', width: '18%', cellsrenderer: imagerenderer },
                { text: 'CityId', dataField: 'CityId', width: '0%', hidden: true },
                { text: 'Zip Code', dataField: 'ZipCode', width: '18%', cellsrenderer: imagerenderer },
                 { text: 'Planned Outages', dataField: 'PlannedOutages', cellsrenderer: imagerenderer },
                { text: 'Current Outages', dataField: 'UnplannedOutages', cellsrenderer: imagerenderer },
                { text: 'Total Outages', dataField: 'TotalOutages', cellsrenderer: imagerenderer },
               
            ]
        });
    } catch (e) {
        console.log(e.message);
    }
}

function LoadChildGrid() {
    try {
        autoheightbool = false;
        if (databindtogrid.length <= 10)
            autoheightbool = true;
        if (databindtogrid.length == 0) {
            $('#nodata_div').show();
            $('#jqxchildgrid').hide();
            $('#jqxgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxchildgrid').show();
            $('#jqxgrid').hide();
        }
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
             { name: 'S.No', type: 'number', hidden: true },
             { name: 'OutageId', type: 'number' },
             { name: 'OutageDate', type: 'date', sorttype: "date", datefmt: "dd/MM/YYYY" },
             { name: 'City', type: 'text' },
             { name: 'ZipCode', type: 'number' },
             { name: 'Type', type: 'text' },
             { name: 'Reason', type: 'text' },
             { name: 'ActionTaken' },
             { name: 'Duration', type: 'number' },
             { name: 'Circuit', type: 'text', hidden: true },
             { name: 'NoOfAddressAffected', type: 'text' },
             { name: 'Restoration Duration', type: 'text' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };

        //var addfilter = function () {
        //    var filtergroup = new $.jqx.filter();
        //    var filter_or_operator = 1;
        //    var filtervalue = 'Beate';
        //    var filtercondition = 'contains';
        //    var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        //    filtervalue = 'Andrew';
        //    filtercondition = 'starts_with';
        //    var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

        //    filtergroup.addfilter(filter_or_operator, filter1);
        //    filtergroup.addfilter(filter_or_operator, filter2);
        //    // add the filters.
        //    $("#jqxgrid").jqxGrid('addfilter', 'City', filtergroup);
        //    // apply the filters.
        //    $("#jqxgrid").jqxGrid('applyfilters');
        //}


        var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


        $("#jqxchildgrid").jqxGrid({
            width: "100%",
            autoheight: autoheightbool,
            height: GridHeight * .32,
            source: dataAdapter,
            theme: 'darkblue',
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            filterable: true,
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,
            autoshowfiltericon: false,
            columnsresize: true,
            columnsreorder: true,
            enabletooltips: true,
            columns:
        [
            { text: 'S.No', dataField: 'S.No', width: '6%', hidden: true },
            { text: 'Outage Id', dataField: 'OutageId', width: '8%', hidden: true },
            { text: 'Outage Date', dataField: 'OutageDate', width: '12%', cellsformat: "MM/dd/yyyy" },
            { text: 'City', dataField: 'City', width: '11%' },
            { text: 'Zip', dataField: 'ZipCode', width: '7%' },
            { text: 'Type', dataField: 'Type', width: '12%' },
            { text: 'Reason', dataField: 'Reason', width: '10%' },
            { text: 'Action Taken', dataField: 'ActionTaken', width: '12%' },
            { text: 'Duration', dataField: 'Duration', width: '8%' },//Modified by Abhilash Jha
            { text: 'Circuit', dataField: 'Circuit', width: '9%', hidden: true },
            { text: 'Address Affected', dataField: 'NoOfAddressAffected', width: '15%' },
            { text: 'Restoration Time', dataField: 'Restoration Duration', width: '15%' }
        ]
        });

        $("#jqxchildgrid").on('bindingcomplete', function () {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        });
    }
    catch (e) { console.log(e.message); }
}



$(document).ready(function () {
   
    var beforedate = new Date(new Date().setDate(new Date().getDate() - 30));
    var date = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    $('#lblCurrent').text(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
    $('#lblBefore').text(months[beforedate.getMonth()] + ' ' + beforedate.getDate() + ', ' + beforedate.getFullYear());

    $('#filter_btn_explorer').click(function () {
        $('#txtDateFrom').val((beforedate.getMonth() + 1) + '/' + beforedate.getDate() + '/' + beforedate.getFullYear());
        $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    });

    chartgraphsection(defOpen);
    submit();

    $('#mapView').click(function () {
        defOpen = 3;
        submit();
        $("#outage_map_canvas").html('');
        //$("#outage_map_canvas").css('height', GridHeight * .50);
        //$("#outage_map_canvas").css('width', GridWidth * .50);
       // loadOutageMap();

        if (databindtogrid.length == 0) {
            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('mapDiv').style.display = 'none';
            document.getElementById('outage_map_canvas').style.display = 'none';
        }
        else {
            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('mapDiv').style.display = 'block';
            document.getElementById('outage_map_canvas').style.display = 'block';
        }       
        chartgraphsection(defOpen);
    });

    $('#btnFilter').click(function () {
        try {


            var startDate = $('#txtDateFrom').val();
            var endDate = $('#txtDateTo').val();

            if (startDate == '' && endDate == '') {
                var d = new Date();
                var output1 = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

                var d1 = new Date();
                d1.setDate(d1.getDate() - 30);
                var output2 = d1.getMonth() + 1 + '/' + d1.getDate() + '/' + d1.getFullYear();

                $('#txtDateFrom').val(output2);
                $('#txtDateTo').val(output1);

            }

            if (startDate != '' && endDate != '') {
                if (Date.parse(startDate) > Date.parse(endDate)) {
                    $("#txtDateTo").val('');
                    //  alert("From date should not be greater than to date");
                    alert("'From Date' should not be greater than 'To date'");
                    $("#txtDateTo").val("");
                    return false;
                }
            }

            flagfilter = 1;
            $("#outage_map_canvas").html('');
            $("#outage_map_canvas").css('height', GridHeight * .82);
            $("#outage_map_canvas").width('100%');
            var bfrdate = $('#txtDateTo').val().split('/');
            var aftdate = $('#txtDateFrom').val().split('/');
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $('#lblCurrent').text(months[bfrdate[0] - 1] + ' ' + bfrdate[1] + ', ' + bfrdate[2]);
            $('#lblBefore').text(months[aftdate[0] - 1] + ' ' + aftdate[1] + ', ' + aftdate[2]);

            submit();
           // loadOutageMap();
            chartgraphsection(defOpen);


        } catch (e) { console.log(e.message); }
    });


    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + '1' + '|||');
    
    $('#gridView').click(function () {
        //if (gridid == 'jqxgrid')
        //    LoadGrid();
        //else
        //    LoadChildGrid();
        //defOpen = 1;
        //document.getElementById('graphDiv').style.display = 'block';
        //document.getElementById('mapDiv').style.display = 'none';
        //document.getElementById('outage_map_canvas').style.display = 'none';
        //chartgraphsection(defOpen);
        submit();
        document.getElementById('lgndrght').style.display = 'none';
    });
 
    $("#btnExcelExport").click(function () {
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Outage Report');

            document.getElementById('graphDiv').style.display = 'none';
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';

        } catch (e) {
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
            else {
                document.getElementById('graphDiv').style.display = 'none';
            }
        }
    });
});

function submit() {
    try {
        debugger;
        //var startDate = $('#txtDateFrom').val();
        //var endDate = $('#txtDateTo').val();

        //if (startDate == '' && endDate == '')
        //{
        //    var d = new Date();
        //    var output1 = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

        //    var d1 = new Date();
        //    d1.setDate(d1.getDate() - 30);
        //    var output2 = d1.getMonth() + 1 + '/' + d1.getDate() + '/' + d1.getFullYear();

        //    $('#txtDateFrom').val(output2);
        //    $('#txtDateTo').val(output1);

        //}

        //if (startDate != '' && endDate != '') {
        //    if (Date.parse(startDate) > Date.parse(endDate)) {
        //        $("#txtDateTo").val('');
        //        //  alert("From date should not be greater than to date");
        //        alert("'From Date' should not be greater than 'To date'");
        //        $("#txtDateTo").val("");
        //        return false;
        //    }
        //}
        loader.showloader();
        var city = "";
        var zip = "";//($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();

        var ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
        var custname = '';
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }

        if ((city == '' && zip == '' && ddlOutageType == '')) {
            mode = 1;
        }
        else {

            mode = (city != '') ? 2 : 1;

            if (zip != '') {
                mode = 3;
            }

            if ((city != '' || zip != '') && ddlOutageType != '') {
                mode = 4;
            }
            else if (ddlOutageType != '') {
                mode = 5;
            }
        }
        var param = {
            datefrom: dtFrom,
            dateto: dtTo,
            mode: mode, cityid: city,
            zipcode: zip,
            outagetype: ddlOutageType,
            customername: custname
        }
        // OutageTable = Outage.LoadGridData(dtFrom, dtTo, mode, city, zip, ddlOutageType, custname).value;
        $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + mode + '|' + city + '|' + zip + '|' + ddlOutageType);
        $.ajax({
            type: "POST",
            url: "Outage.aspx/SearchOutage",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //async: false,
            data: JSON.stringify(param),
            success: onSucess,
            error: OnError
            // error: function (request, status, error) { w2alert('Error!! ' + request.statusText); }

        });

    } catch (e) { }
}
function OnError(request, status, error) {
    //loader.hideloader();
    alert('Error!! ' + request.statusText);
}

function onSucess(data, status) {
    loader.showloader();
    data = data.d;
    var result = $.parseJSON(data);
    //OutageTable = result;  
    // Fixed UAT issue
    databindtogrid = result.Table3;
   // databindtogrid = (mode > 1 && mode != 5) ? result.Table2 : result.Table3;
    OutageMapTable = result.Table;
    plandsum = 0; unplandsum = 0; totalsum = 0;
    for (var i in result.Table) {
        plandsum += parseInt(result.Table[i].PlannedOutages);
        unplandsum += parseInt(result.Table[i].UnplannedOutages);
        totalsum += parseInt(result.Table[i].TotalOutages);
    }
    $("#lblplanned").text(plandsum);
    $("#lblunplanned").text(unplandsum);
    $("#lbltotal").text(totalsum);
    loader.hideloader();
    if (databindtogrid ==null || databindtogrid=="undefined" || databindtogrid.length == 0) {
        $('#nodata_div').show();
        document.getElementById('graphDiv').style.display = 'none';
        document.getElementById('mapDiv').style.display = 'none';
        document.getElementById('outage_map_canvas').style.display = 'none';
    }
    else
    {
        if ($(".left-active-sprite i").hasClass('activeMap') == true) {
            $('#nodata_div').hide();
            document.getElementById('lgndrght').style.display = 'block';
            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('mapDiv').style.display = 'block';
            document.getElementById('outage_map_canvas').style.display = 'block';
            $("#outage_map_canvas").css('height', GridHeight * .82);
            $("#outage_map_canvas").width('100%');
            loadOutageMap();
        }
        else {
            if (mode > 1 && mode != 5) {
                $('#jqxgrid').hide();
                $('#jqxchildgrid').show();
                gridid = 'jqxchildgrid';//4636
                LoadChildGrid();
            }
            else {
                $('#jqxgrid').show();
                $('#jqxchildgrid').hide();
                gridid = 'jqxgrid';//4636                          
                LoadGrid();
            }
            document.getElementById('graphDiv').style.display = 'block';
            document.getElementById('mapDiv').style.display = 'none';
            document.getElementById('outage_map_canvas').style.display = 'none';
        }
    }

}
var data = null;
function loadOutageMap() {
    $("#outage_map_canvas").html('');
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/dijit/InfoWindow"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, InfoWindow) {
          var outageType = "C";
          var polygonSymbol, polygonGraphic, pts, pt, sym;
          var map = new Map("outage_map_canvas", {
              basemap: "streets",
              zoom: 3,
              minZoom: 3,
              maxZoom: 16
          });

          utils.autoRecenter(map);
          var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
          var tableID = '';
          on(map, "load", function () {
              loadData();
          });

          function geoSearch() {
              try {
                  var searchString = dom.byId('GIStxtGoogleSearch').value;
                  if (searchString != '') {
                      var result = '';
                      data = Outage.LoadGridData().value;
                      if (parseInt(data.Tables[0].Rows[0].Status) == 0) {
                          w2alert(data.Tables[0].Rows[0].Message);
                          return false;
                      }
                      else
                          drawpolygon()
                      return true;
                  }
                  else {
                      //alert('Please enter Zip Code or City.');
                      error.showerror("#GIStxtGoogleSearch", ' ' + $('#IDEnterCityZip').text());
                      return false;
                  }
              }
              catch (e) {

              }
          }

          function geocodeResults(places) {
              sym = new esri.symbol.PictureMarkerSymbol('images/pin1.svg', 36, 37);
              if (places.addresses.length > 0) {
                  clearAddGraphics();
                  // Objects for the graphic
                  var place, attributes, infoTemplate, pt, graphic;
                  // Create and add graphics with pop-ups
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
                  alert("Sorry, address or place not found.");
              }
          }

          function geocodeError(errorInfo) {
              w2alert("Sorry, place or address not found!");
          }

          function showGeolocation() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
              } else {
                  alert($('#IDGeo').text());
                  //w2alert("Sorry, your browser doesn't support geolocation.");
              }
          }

          function getCurrentLocation(position) {
              clearAddGraphics();
              //// Create a point
              //pt = new Point(position.coords.longitude, position.coords.latitude);
              //// Create a symbol and pop-up template and add the graphic to the map
              //var symbol = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 36, 47);
              //var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };

              if (OutageTable.Table.length != 0) {
                  attributes = { lat: OutageTable.Table[i].Latitude, lon: OutageTable.Table[i].Longitude };
                  sym = new esri.symbol.PictureMarkerSymbol('../images/pin1.png', 30, 30);
                  pt = new esri.geometry.Point(OutageTable.Table[i].Longitude, OutageTable.Table[i].Latitude, new esri.SpatialReference({ wkid: 4326 }))
                  var graphic = new Graphic(pt, sym, attributes);
                  map.graphics.add(graphic);

                  map.centerAndZoom(pt, 13);
              }
          }


          function errorHandler(err) {
              if (err.code == 1) {
                  w2alert("Error: Access is denied!");
              } else if (err.code == 2) {
                  w2alert("Error: Position is unavailable!");
              } else
                  w2alert("Error: " + err);
          }

          function createPolygonSymbol() {
              return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0, 0.92]), 1), new Color([255, 0, 0, 0.25]));
          }

          function drawpolygon() {
              clearAddGraphics();
              polygonSymbol = createPolygonSymbol();
              var tableindex = 0;
              //for (var i = 0; i < data.Tables.length; i++) {
              //    if (data.Tables[i].Name == tableID)
              //        tableindex = i;
              //}
              //if (data.Tables[tableindex].Rows.length > 0) {
              if (data.Tables[1].Rows.length > 0) {
                  //for (var j = 0; j < data.Tables[2].Rows.length; j++) {
                  //pts = [];
                  //for (var i = 0; i < data.Tables[tableindex].Rows.length; i++) {
                  for (var i = 3; i < data.Tables.length; i++) {
                      pts = [];
                      //if (data.Tables[tableindex].Rows[i]["ZipCode"] == data.Tables[2].Rows[j]["ZipCode"]) {
                      for (var j = 0; j < data.Tables[i].Rows.length; j++) {
                          pt = new Point(data.Tables[i].Rows[j]["Longitude"], data.Tables[i].Rows[j]["Latitude"]);
                          pts.push(pt);
                      }
                      //}
                      //}
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
                  //}
              }
              else {
                  pt = new Point($('#ddlAddress option:selected').attr('longitude'), $('#ddlAddress option:selected').attr('latitude'));
                  map.centerAndZoom(pt, 12);
              }
              if (data.Tables[1].Rows.length > 0) {
                  var tabLength = data.Tables[1].Rows.length;
                  for (var i = 0; i < tabLength; i++) {
                      //if (data.Tables[1].Rows[i]["Outageid"].toString() == tableID) {
                      sym = outageType == 'C' ? new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_red.png', 36, 47) : new esri.symbol.PictureMarkerSymbol('images/outages/energy_icon_blue.svg', 36, 47);
                      var place, attributes, infoTemplate, pt, graphic;

                      pt = new Point(data.Tables[1].Rows[i]["OutageLongitude"], data.Tables[1].Rows[i]["OutageLatitude"]);

                      var title = data.Tables[1].Rows[i]["Title"];
                      var dateindex = title.indexOf("Date");
                      var infoStatus = data.Tables[1].Rows[i]["STATUS"];
                      var date = data.Tables[1].Rows[i]["Outagedate"];
                      infoStatus = outageType == 'C' ? "Status: " + infoStatus : '';
                      var restorationtime = '';
                      if (data.Tables[1].Rows[i]["RestorationTime"] != null) {
                          restorationtime = "Estimated Restoration: " + data.Tables[1].Rows[i]["Restorationdate"];
                          //restorationtime = "Estimated Restoration Time: " + data.Tables[1].Rows[i]["RestorationTime"];
                      }
                      if (dateindex != -1) {
                          if (outageType == 'P') {
                              attributes = { Title: data.Tables[1].Rows[i]["Title"] + " ", Area: data.Tables[1].Rows[i]["Area"], RestorationTime: restorationtime };
                          }
                          else {
                              attributes = { Title: data.Tables[1].Rows[i]["Title"] + " ", Area: data.Tables[1].Rows[i]["Area"], Status: infoStatus, RestorationTime: restorationtime };
                          }

                      }
                      else {
                          if (outageType == 'P') {
                              attributes = { Title: "<b>" + data.Tables[1].Rows[i]["Title"] + "</b><br/>" + "Date: " + date, Area: data.Tables[1].Rows[i]["Area"], RestorationTime: restorationtime };//Modified by Abhilash Jha for Bug ID: 0009677
                          } else {
                              attributes = { Title: "<b>" + data.Tables[1].Rows[i]["Title"] + "</b><br/>" + "Date: " + date, Area: data.Tables[1].Rows[i]["Area"], Status: infoStatus, RestorationTime: restorationtime };
                          }
                      }

                      if (outageType == 'P') {
                          infoTemplate = new InfoTemplate("Outage", "${Title}<br/>${RestorationTime}");
                          //infoTemplate = new InfoTemplate("Outage", "${Title}<br/>${Area}<br/>${RestorationTime}");

                      }
                      else {
                          infoTemplate = new InfoTemplate("Outage", "${Title}<br/>${Status}<br/>${RestorationTime}");
                      }
                      graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                      //    }
                  }
              }
              $("#Module5").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Outage 
          }



          function clearAddGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
              polygonGraphic = null;
              pts = null;
              polygonSymbol = null;
          }


          function loadData() {
              try {
                  clearAddGraphics();
                  for (var i in OutageMapTable) {
                      attributes = { lat: OutageMapTable[i].Latitude, lon: OutageMapTable[i].Longitude, city: OutageMapTable[i].CityName, address: OutageMapTable[i].Cause, zipcode: OutageMapTable[i].ZipCode };
                      if (OutageMapTable[i].PlannedOutages == 1) { sym = new esri.symbol.PictureMarkerSymbol('../images/planned_pin.png', 30, 40); }
                      else { sym = new esri.symbol.PictureMarkerSymbol('../images/current_pin.png', 30, 40); };
                      pt = new esri.geometry.Point(OutageMapTable[i].Longitude, OutageMapTable[i].Latitude, new esri.SpatialReference({ wkid: 4326 }))
                      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      var d = new Date(OutageMapTable[i].OutageDate);
                      var month;
                      // bug no 15793
                      //  if (d.getMonth() + 1 > 12) { month = months[1]; } else { month = months[d.getMonth() + 1]; }
                      month = months[d.getMonth()];
                      var n = (month + " " + d.getDate() + " " + d.getFullYear());//+ " " + d.toLocaleTimeString());
                      infoTemplate = new InfoTemplate("Outage", "<b>${address}</b><br/><b>City:</b> ${city}<br/><b>Zip Code:</b> ${zipcode}<br/><b>Outage Date:</b> " + n);
                      var graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(graphic);
                  }
                  map.centerAndZoom(pt, 11);
              }
              catch (e) { }
          }

          function SearchloadData() {
              try {
                  clearAddGraphics();
                  for (var i in OutageMapTable) {
                      attributes = { lat: OutageMapTable[i].Latitude, lon: OutageMapTable[i].Longitude, city: OutageMapTable[i].CityName, address: OutageMapTable[i].Cause, zipcode: OutageMapTable[i].ZipCode };
                      if (OutageMapTable[i].PlannedOutages == 1) { sym = new esri.symbol.PictureMarkerSymbol('../images/planned_pin.png', 30, 40); }
                      else { sym = new esri.symbol.PictureMarkerSymbol('../images/current_pin.png', 30, 40); };
                      pt = new esri.geometry.Point(OutageMapTable[i].Longitude, OutageMapTable[i].Latitude, new esri.SpatialReference({ wkid: 4326 }))
                      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      var d = new Date(OutageMapTable[i].OutageDate);
                      var month;
                      // bug no 15793
                      //if (d.getMonth() + 1 > 12) { month = months[1]; } else { month = months[d.getMonth() + 1]; }
                      month = months[d.getMonth()];
                      var n = (month + " " + d.getDate() + " " + d.getFullYear());//+ " " + d.toLocaleTimeString());
                      infoTemplate = new InfoTemplate("Outage", "<b>${address}</b><br/><b>City:</b> ${city}<br/><b>Zip Code:</b> ${zipcode}<br/><b>Outage Date:</b> " + n);
                      var graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(graphic);
                  }
                  map.centerAndZoom(pt, 11);

              }
              catch (e) { }
          }

      });
}