var mode = '1';
var Billingtable;
var databindtogrid;
var autoheightbool = false;
var autoheightPrimary = false;
TitleExport = 'payment-location';
gridid = 'jqxgrid';

//on page load
function LoadGrid() {
    autoheightPrimary = false;


    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request

    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
        $('#jqxgrid').hide();
        
    } else {
        $('#nodata_div').hide();
        $('#jqxgrid').show();
    }

    source = {
        datatype: "array",
        datafields: [
        { name: 'PaylocationId' },
        { name: 'FullLocation' },
       
        { name: 'PaymentHrs' }
       
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    var imagerenderer = function (row, datafield, value) {
        switch (datafield) {
            case "Action": return getControlButton(row, value); break;
             
            case "FullLocation": return getView(row, value); break;
            default: break;
        }
    }

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        source: dataAdapter,
        sortable: true,
 
        height: GridHeight * .86,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        rowsheight:34,
        selectionmode: 'singlerow', //To trigger row select event      
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'PaylocationId', dataField: 'PaylocationId', width: '0%', hidden: true },
              { text: 'Action', dataField: 'Action', width: '90', align: 'center', cellsrenderer: imagerenderer, hidden: userUsageRights },
            { text: 'Location', dataField: 'FullLocation', cellsrenderer: imagerenderer },
          
            { text: 'Payment Timings', dataField: 'PaymentHrs', width: '35%' }
         

        ]
    });

}


//for get reset password icon showing in grid
function getControlButton(row, value, datafield) {
    var paylocationId = $('#jqxgrid').jqxGrid('getrowdata', row).PaylocationId;
    var anchorid = 'Reset' + paylocationId;

    var editButton = '<div style="text-align: center;"><a style="text-align:center; margin-top:7px;display:block;color:#000;" href="configure-payLocations.aspx?paylocationid=' + paylocationId + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i>';
    var delButton = '<div id="' + anchorid + '" ><a href="#" style="text-align:center; margin-top:7px;display:block;color:#f20202;" onclick="deleteSelectedLocation(' + paylocationId + ')"><i class="fa fa-times Gridimage" id="' + paylocationId + '" title="Delete"></i></div>';

    return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + delButton + '</td></tr></table></center>';
}

function editUser(row, value, datafield) {
    var paylocationId = $('#jqxgrid').jqxGrid('getrowdata', row).PaylocationId;
    //var anchorid = 'Reset' + paylocationId;
    return '<div style="text-align: center;"><a href="configure-payLocations.aspx?paylocationid=' + paylocationId + '" style="text-align:center; margin-top:7px;display:block;color:#000;"><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i></div>';
}

function deleteUser(row, value, datafield) {
    var paylocationId = $('#jqxgrid').jqxGrid('getrowdata', row).PaylocationId;
    var anchorid = 'Reset' + paylocationId;
    return '<div id="' + anchorid + '" style="text-align: center;"><a href="#" style="text-align:center; margin-top:7px;display:block;color:#f20202;" onclick="deleteSelectedLocation(' + paylocationId + ')"><i class="fa fa-times Gridimage" id="' + paylocationId + '" title="Delete"></i></div>';
}

function getView(row, value) {

    var locationId = $('#jqxgrid').jqxGrid('getrowdata', row).PaylocationId;
    var location = $('#jqxgrid').jqxGrid('getrowdata', row).FullLocation;
    return '<div style="padding-left:5px; padding-top:10px; display:block;"><a class="Locationdetails" href="#" data-id=' + locationId + ' data-toggle="modal" data-target=".userDetails_location">' + location + '</a></div>';
}

function deleteSelectedLocation(deleteId) {
    if (confirm('Are you sure you want to delete?')) { //As per BRD sheet
        var retval = view_payLocation.DeleteSelectedLocation(deleteId).value;
        if (retval == 1)
            alert("Payment Location has been deleted successfully");
        else
            alert("Location not deleted successfully");

        window.location.reload();
        //return false;
    }
}



function createmap() {

    $("#div-paymentlocationmap").html('');
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/geometry/webMercatorUtils"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                  paymentLocationTable = view_payLocation.LoadGridData();
                  var polygonSymbol, polygonGraphic, pts, pt, sym;
                  var map = new Map("div-paymentlocationmap", {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16
                  });

                  utils.autoRecenter(map);
                 

                  $("#ddlCity").change(function () {
                      var data = paymentLocationTable.value.Tables[0];
                      if (data.Rows.length != '0') {
                          showGeolocation();
                      }
                      else {
                          var obj = $('#ddlCity option:selected');
                          if (obj.index() > 0) {
                              GetCityLocationInMap();
                          }
                      }
                  });

                  on(map, "load", function () {
                      try {
                          getCurrentLocation();
                      }
                      catch (e) {
                          alert(e.message);
                      }
                  });

                  function geocodeResults(places) {

                      try {
                          sym = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 40, 40);
                          if (places.addresses.length > 0) {
                              clearAddGraphics();
                              // Objects for the graphic
                              var place, attributes, infoTemplate, pt, graphic;
                              // Create and add graphics with pop-ups
                              for (var i = 0; i < places.addresses.length; i++) {
                                  place = places.addresses[i];
                                  pt = place.location;
                                  attributes = { address: ' ' + place.address, score: ' ' + place.score, lat: ' ' + pt.y.toFixed(2), lon: ' ' + pt.x.toFixed(2) };
                                  infoTemplate = new InfoTemplate("Geocode Result", "${address}<br/>Latitude: ${lat}<br/>Longitude: ${lon}<br/>Score: ${score}<span class='popupZoom' onclick='window.zoomToPlace(" + pt.x + "," + pt.y + ",15)';>Zoom To</span>");
                                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                                  map.graphics.add(graphic);
                              }
                              map.centerAndZoom(places.addresses[0].location, 8);
                          } else {
                              clearAddGraphics();
                              alert("Sorry, address or place not found.");
                          }
                      }
                      catch (e)
                      { }
                  }

                  function geocodeError(errorInfo) {
                      clearAddGraphics();
                      alert("Sorry, place or address not found!");
                  }

                  function showGeolocation() {
                      try {
                          if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
                          } else {
                              alert("Sorry, your browser doesn't support geolocation.");
                          }
                      }
                      catch (e)
                      { }
                  }

                  function getCurrentLocation(position) {

                      try {
                          clearAddGraphics();
                          var paymentlocationData = paymentLocationTable.value.Tables[0];
                          if (paymentlocationData.Rows.length > 0) {
                              for (var i = 0; i < paymentlocationData.Rows.length; i++) {
                                  pt = new Point(paymentlocationData.Rows[i]["PaymentLongitude"], paymentlocationData.Rows[i]["PaymentLatitude"]);
                                  var symbol = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 35, 35);

                                  var locationName = paymentlocationData.Rows[i]["LocationName"];
                                  // bug id 15757
                                  if (paymentlocationData.Rows[i]["Address2"] !== null || paymentlocationData.Rows[i]["Address2"] != "") {
                                      var address = paymentlocationData.Rows[i]["Address1"] + ", " + paymentlocationData.Rows[i]["Address2"];
                                  }
                                  else
                                  {
                                      var address = paymentlocationData.Rows[i]["Address1"];
                                  }
                                  var city = paymentlocationData.Rows[i]["Cityname"];
                                  var paymenthrs = paymentlocationData.Rows[i]["PaymentHrs"];
                                  var contactno = paymentlocationData.Rows[i]["ContactNo"];
                                  contactno = contactno.replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3');
                                  var emailid = paymentlocationData.Rows[i]["Emailid"];

                                  var attributes = { "Name": locationName, "Address": address, "City": city, "PaymentHours": paymenthrs, "ContactNo": contactno, "EmailID": emailid };
                                  var infoTemplate = new InfoTemplate(locationName, "<b>Address</b>: ${Address}<br/><b>City</b>: ${City}<br/><b>Payment Hours</b>: ${PaymentHours}<br/><b>Contact Number</b>: ${ContactNo}<br/><b>Email</b>: ${EmailID}");
                                  var graphic = new Graphic(pt, symbol, attributes, infoTemplate);

                                  map.graphics.add(graphic);
                                  map.centerAndZoom(pt, 10);
                              }
                          }
                          else {
                              alert("Sorry, address or place not found.");
                              var obj = $('#ddlCity option:selected');
                              if (obj.index() > 0) {
                                  GetCityLocationInMap();
                              }
                          }
                      }
                      catch (e)
                      { }
                  }

                  function GetCityLocationInMap() {
                      var city = '';
                      clearAddGraphics();
                      var obj = $('#ddlCity option:selected');
                      if (obj.index() > 0) {
                          city = $(obj).text();
                      }

                      if (city != '') {
                          //var address = city + ', ' + 'CA ';
                          var address = city ;
                          var geocoder = new google.maps.Geocoder();
                          geocoder.geocode({ 'address': address }, function (results, status) {
                              if (status.toString() == google.maps.GeocoderStatus.OK.toString()) {
                                  pt = new Point(results[0].geometry.location.lng(), results[0].geometry.location.lat());
                                  map.centerAndZoom(pt, 10);
                              }
                          });
                      }
                  }

                  function errorHandler(err) {
                      try {
                          if (err.code == 1) {
                              alert("Error: Access is denied!");
                          } else if (err.code == 2) {
                              alert("Error: Position is unavailable!");
                          } else
                              alert("Error: " + err);
                      }
                      catch (e)
                      { }
                  }

                  function createPolygonSymbol() {
                      try {
                          return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0, 0.75]), 1), new Color([255, 0, 0, 0.25]));
                      }
                      catch (e)
                      { }
                  }

                  function clearAddGraphics() {
                      map.infoWindow.hide();
                      map.graphics.clear();
                      polygonGraphic = null;
                      pts = null;
                      polygonSymbol = null;
                  }
              });
}

$(document).ready(function () {
    $("#ddlCity").prepend("<option value='' selected='selected'>-- Select City --</option>");
    $('#nodata_div').hide();

    Billingtable = view_payLocation.LoadGridData().value;

    databindtogrid = Billingtable.Tables[0].Rows;
    //createmap();
    LoadGrid();

    $("#ddlCity").change(function () {
        var obj = $('#ddlCity option:selected');
        if (obj.index() > 0) {
          
            view_payLocation.SetSession($('#ddlCity option:selected').val());
            Billingtable = view_payLocation.LoadGridData().value;
            databindtogrid = Billingtable.Tables[0].Rows;
            LoadGrid();
        }
        else {
           
            view_payLocation.SetSession("0");
            Billingtable = view_payLocation.LoadGridData().value;
            databindtogrid = Billingtable.Tables[0].Rows;
            LoadGrid();
        }

        if ($('.left-active-sprite a i.activeMap').length==1){//$('#mapDiv').is(':visible')) {
            $("#div-paymentlocationmap").css('height', GridHeight * .89);
            $("#mapDiv").css('display','block');
            $("#mapDiv").css('width', GridWidth);
            if (databindtogrid.length > 0) {
                createmap();
            }
            else
            {
                $("#mapDiv").css('display', 'none');
            }
        }
    });

    $("#chartimg").click(function () {
        $(this).attr('src', '../images/usage-graph-active.svg');
        $("#mapView").removeClass('activeMap');
        document.getElementById('graphDiv').style.display = 'block';
        LoadGrid();
    });

    $("#mapView").click(function () {
        $(this).removeClass('map1')
        $(this).addClass('activeMap')
        $("#chartimg").attr('src', '../images/usage-graph.svg');
        $("#div-paymentlocationmap").css('height', GridHeight * .89);
        $("#mapDiv").css('width', GridWidth);

        if (databindtogrid.length > 0) {
             $("#mapDiv").css('display', 'block');
            createmap();
        } else {
            $("#mapDiv").css('display', 'none');
        }
    });

    $("#mapDiv").css('margin-y:');

   
});
$(document).on("click", ".Locationdetails", function () {
    var locationId = $(this).data('id');
    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].PaylocationId == locationId) {
            $('#locationName').html(databindtogrid[i].LocationName);
            $('#lblAddress1').html(databindtogrid[i].Address1);
            $('#lblAddress2').html(databindtogrid[i].Address2);
          //  $('#lblCity').text(databindtogrid[i].Cityname);
          //  lblCity1
            $('#lblCity1').html(databindtogrid[i].Cityname);
            $('#lblZip').html(databindtogrid[i].ZipCode);
            $('#lblcontact').html(databindtogrid[i].ContactNo.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));            
            $('#lblemail').html(databindtogrid[i].Emailid);
            $('#lblPayTimings').html(databindtogrid[i].PaymentHrs);
            $('#lblWebsite').html(databindtogrid[i].PaymentLocWebsite);
            return;
        }
    }

});