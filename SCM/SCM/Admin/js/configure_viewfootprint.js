var Mode = 1;
var databindtogrid;
var autoheightbool = false;
var autoheightPrimary = false;
var FootPrintTable = {};
var databindtogrid;
var Tables, FootPrintData;

$(document).ready(function () {
    //**************************************
    //$("#ddlCity").prepend("<option value='' selected='selected'></option>");
    $("#ddlCity").prepend("<option value='0' selected='selected'>-- Select City --</option>");
    $("#hdn_city").val('');
    $("#hdn_location").val('');
    //**************************************

    $('#tempmasked').mask('(000) 000-0000'); //Text masking applied
    $('#lblcontact').mask('(000) 000-0000');
    createmap();
 
    $("#mapView").click(function () {
        $(this).removeClass('map1')
        $(this).addClass('activeMap')
        $("#chartimg").attr('src', '../images/usage-graph.svg');

        $("#div-footprintlocationmap").css('height', GridHeight * .89);
        $("#mapDiv").css('width', GridWidth);
        createmap();
    });

    $(document).on("click", "#FPopup", function () {
        
        var FootPrintID = $(this).data('id');
        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].FootPrintID == FootPrintID) {
                $('#locationName').html(databindtogrid[i].Name);
                $('#lblAddress1').html(databindtogrid[i].Address1);
                $('#lblAddress2').html(databindtogrid[i].Address2);
                $('#lblCity_view').html(databindtogrid[i].CityName);
                $('#lblZip').html(databindtogrid[i].ZipCode);
                //***********************
                var contactno = databindtogrid[i].PhoneNo;
                if (contactno != null) {
                    contactno = $("#tempmasked").masked(contactno);
                    $('#lblcontact').html(contactno);
                }
                else {
                    $('#lblcontact').html('');
                }

                //***********************
                //$('#lblcontact').html(databindtogrid[i].PhoneNo);
                //$('#lblcontact').mask("(000) 000-0000");              
                $('#lblLatitude').html(databindtogrid[i].Latitude);
                $('#lblLongitude').html(databindtogrid[i].Longitude);
                $('#lblWebsite').html(databindtogrid[i].WebSite);
                return;
            }
        }
    });
});

//**********************GETDATA and LOAD GRID********************************//
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "Action": return getControlButton(row, value); break;
            // case "Delete": return deleteUser(row, value); break;
        case "Name": return getView(row, value); break;
        default: break;
    }
}

function getView(row, value) {

    var FootPrintID = $('#jqxgrid').jqxGrid('getrowdata', row).FootPrintID;
    var locationtype = $('#jqxgrid').jqxGrid('getrowdata', row).LocationTypeId;
    var Name = $('#jqxgrid').jqxGrid('getrowdata', row).Name;
    return '<div style="padding-left:5px;padding-top: 8px;"><a id="FPopup"  href="#" data-id=' + FootPrintID + ' data-toggle="modal" data-target="#FootPrintPopup">' + Name + '</a></div>';
}

function getControlButton(row, value, datafield) {
    var FootPrintID = $('#jqxgrid').jqxGrid('getrowdata', row).FootPrintID;
    var anchorid = 'Reset' + FootPrintID;

    var editButton = '<div style="text-align: center;"><a style="text-align:center; margin-top:9px;display:block;color:#000;" href="configure-greenfootprint.aspx?FootPrintID=' + FootPrintID + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i></a>';
    var delButton = '<div id="' + anchorid + '"><a href="#" style="text-align:center; margin-top:9px;display:block;color:#f20202;" onclick="deleteSelectedLocation(this,' + FootPrintID + ')"><i class="fa fa-times Gridimage" id="' + FootPrintID + '" title="Delete" /></i></div>';

    return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + delButton + '</td></tr></table></center>';
}

function LoadGrid() {

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'Name' },
        { name: 'Address1' },
        { name: 'FootPrintID' },
        { name: 'LocationTypeId' },
        { name: 'CityID' },
        { name: 'Latitude' },
        { name: 'Longitude' },
         { name: 'ZipCode' },
           //{ name: 'CityName' },
          //  { name: 'LocationType' },
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
        width: "99.8%",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        height: GridHeight * .89,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        rowsheight: 40,

        pageable: true,
        pagesizeoptions: ['10', '20', '35', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
               { text: 'FootPrintID', dataField: 'FootPrintID', hidden: true },
                   { text: 'Action', dataField: 'Action', width: '90', align: 'center', cellsrenderer: imagerenderer },
            { text: 'Location Type', dataField: 'LocationTypeId', hidden: true },
            { text: 'Name', dataField: 'Name', width: '50%', cellsrenderer: imagerenderer },
            
            { text: 'Address', dataField: 'Address1', width: '40%' },
            { text: 'City', dataField: 'CityID', hidden: true },
               { text: 'Latitude', dataField: 'Latitude', hidden: true },
                  { text: 'Longitude', dataField: 'Longitude', hidden: true }
        ]
    });
    //  $("#Module12").removeClass("preloader");//added by lalit yadav 12 oct 2015 loder //FootPrint
}



function deleteSelectedLocation(e,deleteId) {
    if (confirm('Are you sure you want to delete?')) {
        DeleteLocation(e,deleteId);
       // window.location.reload();
    }
}

function DeleteLocation(e,deleteId) {
    try {
        Mode = 4;
        FootprintID = deleteId
        var params = { 'Mode': Mode, 'FootprintID': FootprintID };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "configure_viewfootprint.aspx/DeleteData",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var result = JSON.parse(response.d);
                if (result.Table[0].Status == 1) {
                    alert(result.Table[0].Message);
                    //window.location.reload();
                    $(e).closest('div[role=row]').remove();
                    loader.hideloader();
                }
            },
            //async: false,
            failure: function (response) {
                return response.d;
                loader.hideloader();
            }
        });
    }


    catch (e) { }
}


//*****************************************MAP**********************//
function createmap() {
  
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!", "esri/geometry/webMercatorUtils"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
            
                  var polygonSymbol, polygonGraphic, pts, pt, sym;
                  var map = new Map("div-footprintlocationmap", {
                      basemap: "streets",
                      zoom:3 ,
                      minZoom: 3,
                      maxZoom: 16
                  });

                  utils.autoRecenter(map);
                  var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
                  on(map, "load", function () {
                      try {
                          GetData();                         
                      }
                      catch (e) {
                          alert(e.message)
                      }
                  });
                  $("#ddlCity").change(function () {
                      var obj = $('#ddlCity option:selected');
                      if (obj.length > 0) {
                          var CityId = ($('#ddlCity').val() == null || $('#ddlCity').val() == '' || $('#ddlCity').val() == 0) ? null : $('#ddlCity').val();
                          var LocationTypeId = ($('#ddlLocationType').val() == 0 || $('#ddlLocationType').val() == '') ? null : $('#ddlLocationType').val();
                          var param = { 'CityId': CityId, 'LocationTypeId': LocationTypeId }
                          //**********************
                          $("#hdn_city").val($('#ddlCity').val());
                          //**********************
                          CallAjax(Error, param);
                      }                   

                  });

                  $("#ddlLocationType").change(function () {
                      var obj = $('#ddlLocationType option:selected');
                      if (obj.length > 0) {
                          var CityId = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? null : $('#ddlCity').val();
                          var LocationTypeId = ($('#ddlLocationType').val() == 0 || $('#ddlLocationType').val() == '') ? null : $('#ddlLocationType').val();
                          var param = { 'CityId': CityId, 'LocationTypeId': LocationTypeId }

                          //**********************
                          $("#hdn_location").val($('#ddlLocationType').val());
                          //**********************
                          CallAjax(Error, param);
                      }                     
                  });
                  
                  $("#chartimg").click(function () {
                      $(this).attr('src', '../images/usage-graph-active.svg');
                      $("#mapView").removeClass('activeMap');
                      document.getElementById('graphDiv').style.display = 'block';
                      GetData();

                  });
               
                  function GetData() {
                      try {

                          var CityId = ($('#ddlCity').val() == null || $('#ddlCity').val() == '' || $('#ddlCity').val() == 0) ? null : $('#ddlCity').val();
                          var LocationTypeId = ($('#ddlLocationType').val() == 0 || $('#ddlLocationType').val() == '') ? null : $('#ddlLocationType').val();
                          var param = { 'CityId': CityId, 'LocationTypeId': LocationTypeId }
                          CallAjax(Error, param);

                      } catch (e) {
                          console.log(e.message);
                      }
                  }
                  function CallAjax(fnError, param) {
                      try {
                          loader.showloader();
                          $.ajax({
                              type: "POST",
                              url: "configure_viewfootprint.aspx/getFootPrintData",
                              data: JSON.stringify(param),
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              success: function (response, status, type) {

                                  FootPrintData = $.parseJSON(response.d);
                                  ConvertData();
                                  var length = parseInt(FootPrintTable.Tables[0].Rows.length);
                                  if (length > 0) {
                                      $('#nodata_div').hide();
                                      $('#jqxgrid').show();
                                      $('#div-footprintlocationmap').show();
                                      databindtogrid = FootPrintTable.Tables[0].Rows;
                                      var length = parseInt(FootPrintTable.Tables[0].Rows.length);
                                      LoadGrid();
                                      loaddata();

                                  } else {

                                      $('#nodata_div').show();
                                      $('#jqxgrid').hide();

                                      $('#div-footprintlocationmap').hide();
                                  }
                                  loader.hideloader();
                              },
                              error: fnError,
                          })
                      }
                      catch (e) {
                          loader.hideloader();
                      }

                  }
                  function ConvertData() {
                      try {
                          Tables = new Array();
                          $.map(FootPrintData, function (obj, i) {
                              Tables.push({
                                  name: i,
                                  Rows: obj,
                              });
                          });
                          FootPrintTable['Tables'] = Tables;
                      }
                      catch (e) {
                          console.log(e.message)
                      }
                  }

                  function loaddata() {
                      map.graphics.clear();
                      try {
                          var sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 36, 47);
                          if (FootPrintTable.Tables[0].Rows.length > 0) {
                              clearAddGraphics();
                              for (var i = 0; i < FootPrintTable.Tables[0].Rows.length; i++) {

                                  // if (roww.LocationtypeFootPrintTable.Tables[0].Rows[i] != Locationtype) { continue; }
                                  switch (FootPrintTable.Tables[0].Rows[i]["LocationType"].toLowerCase()) {
                                  case 'electric vehicle':
                                      sym = new esri.symbol.PictureMarkerSymbol('../images/pev_green.svg', 36, 47);
                                      break;
                                  case 'la venta al detalle':
                                  case 'retail':
                                      sym = new esri.symbol.PictureMarkerSymbol('../images/retail_green.svg', 36, 47);
                                      break;
                                  case 'compras':
                                  case 'shopping':
                                      sym = new esri.symbol
                                          .PictureMarkerSymbol('../images/groceries_green.svg', 36, 47);
                                      break;
                                  case 'comedor':
                                  case 'dining':
                                      sym = new esri.symbol.PictureMarkerSymbol('../images/dining_green.svg', 36, 47);
                                      break;
                                  case 'entretenimiento':
                                  case 'entertainment':
                                      sym = new esri.symbol
                                          .PictureMarkerSymbol('../images/entertainment_green.svg', 36, 47);
                                      break;
                                  case 'estación de carga':
                                  case 'charging station':
                                      sym = new esri.symbol.PictureMarkerSymbol('../images/pev_green.svg', 36, 47);
                                      break;

                                  default:
                                      sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 36, 47);
                                  }
                                  pt = new Point(FootPrintTable.Tables[0].Rows[i]["Longitude"],
                                      FootPrintTable.Tables[0].Rows[i]["Latitude"]);
                                  //  var symbol = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 35, 35);

                                  var locationName = FootPrintTable.Tables[0].Rows[i]["Name"];

                                  var address = FootPrintTable.Tables[0].Rows[i]["Address2"]
                                      ? FootPrintTable.Tables[0].Rows[i]["Address1"] +
                                      ", " +
                                      FootPrintTable.Tables[0].Rows[i]["Address2"]
                                      : FootPrintTable.Tables[0].Rows[i]["Address1"];
                                  var city = FootPrintTable.Tables[0].Rows[i]["CityName"];

                                  var contactno = FootPrintTable.Tables[0].Rows[i]["PhoneNo"];
                                  if (contactno !=null )
                                  contactno =  $("#tempmasked").masked(contactno);
                                  var attributes = {
                                      "Name": locationName,
                                      "Address": address,
                                      "City": city,
                                      "PhoneNo": contactno
                                  };
                                  var infoTemplate = new
                                      InfoTemplate(locationName,
                                          "<b>Address</b>:${Address}<br/><b>City</b>:${City}<br/><b>Contact Number</b>:<p data-mask='00/00/0000'>${PhoneNo}</p>");
                                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                                  map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                                  map.centerAndZoom(pt, 10);
                              }
                          } else {
                              alert("Sorry, address or place not found.")
                              var obj = $('#ddlCity option:selected');
                              if (obj.index() > 0) {
                                  GetCityLocationInMap();
                              }
                          }
                      } catch (e) {
                          console.log(e.message);
                      }
                  }
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
                                  attributes = { address: place.address, score: place.score, lat: pt.y.toFixed(2), lon: pt.x.toFixed(2) };
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
                      
                      map.graphics.clear();
                      try {
                          var sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 36, 47);
                          if (FootPrintTable.Tables[0].Rows.length > 0) {
                              clearAddGraphics();
                              for (var i = 0; i < FootPrintTable.Tables[0].Rows.length; i++) {

                                  switch (FootPrintTable.Tables[0].Rows[i]["LocationType"].toLowerCase()) {
                                      case 'electric vehicle': sym = new esri.symbol.PictureMarkerSymbol('../images/pev_green.svg', 36, 47); break;
                                      case 'la venta al detalle':
                                      case 'retail': sym = new esri.symbol.PictureMarkerSymbol('../images/retail_green.svg', 36, 47); break;
                                      case 'compras':
                                      case 'shopping': sym = new esri.symbol.PictureMarkerSymbol('../images/groceries_green.svg', 36, 47); break;
                                      case 'comedor':
                                      case 'dining': sym = new esri.symbol.PictureMarkerSymbol('../images/dining_green.svg', 36, 47); break;
                                      case 'entretenimiento':
                                      case 'entertainment': sym = new esri.symbol.PictureMarkerSymbol('../images/entertainment_green.svg', 36, 47); break;
                                      case 'estación de carga':
                                      case 'charging station': sym = new esri.symbol.PictureMarkerSymbol('../images/pev_green.svg', 36, 47); break;

                                      default: sym = new esri.symbol.PictureMarkerSymbol('images/pin.svg', 36, 47);
                                  }
                                  pt = new Point(FootPrintTable.Tables[0].Rows[i]["Longitude"], FootPrintTable.Tables[0].Rows[i]["Latitude"]);
                                //  var symbol = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 35, 35);

                                  var locationName = FootPrintTable.Tables[0].Rows[i]["Name"];

                                  var address = FootPrintTable.Tables[0].Rows[i]["Address2"] ? FootPrintTable.Tables[0].Rows[i]["Address1"] + ", " + FootPrintTable.Tables[0].Rows[i]["Address2"] : FootPrintTable.Tables[0].Rows[i]["Address1"];
                                  var city = FootPrintTable.Tables[0].Rows[i]["CityName"];

                                  var contactno = FootPrintTable.Tables[0].Rows[i]["PhoneNo"];
                                  if (contactno != null)
                                  contactno = $("#tempmasked").masked(contactno);//Text is masked
                                  var attributes = { "Name": locationName, "Address": address, "City": city, "PhoneNo": contactno };
                                  var infoTemplate = new InfoTemplate(locationName, "<b>Address</b>:${Address}<br/><b>City</b>:${City}<br/><b>Contact Number</b>:${PhoneNo}");
                                  graphic = new Graphic(pt, sym, attributes, infoTemplate);
                                  map.graphics.add(new Graphic(pt, sym, attributes, infoTemplate));
                                  map.centerAndZoom(pt, 10);
                              }
                          }
                          else {
                              alert("Sorry, address or place not found.")
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

                  function GetLocationTypeInMap(Locationtype) {
                      for (var i = 0; i < FootPrintTable.Tables[0].Rows.length ; i++) {
                          roww = FootPrintTable.Tables[0].Rows[i];
                          var symbol = new esri.symbol.PictureMarkerSymbol('../images/pin.png', 35, 35);
                         
                          var locationName = FootPrintTable.Tables[0].Rows[i]["Name"];
                       
                          var address = FootPrintTable.Tables[0].Rows[i]["Address2"] ? FootPrintTable.Tables[0].Rows[i]["Address1"] + ", " + FootPrintTable.Tables[0].Rows[i]["Address2"] : FootPrintTable.Tables[0].Rows[i]["Address1"];
                          var city = FootPrintTable.Tables[0].Rows[i]["CityName"];
                          
                          var contactno = FootPrintTable.Tables[0].Rows[i]["PhoneNo"];
                          
                          var attributes = { "Name": locationName, "Address": address, "City": city, "PhoneNo": contactno };
                          var infoTemplate = new InfoTemplate(locationName, "<b>Address</b>:${Address}<br/><b>City</b>:${City}<br/><b>Contact Number</b>:${PhoneNo}");
                          var graphic = new Graphic(pt, symbol, attributes, infoTemplate);

                          map.graphics.add(graphic);
                          map.centerAndZoom(pt, 10);
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