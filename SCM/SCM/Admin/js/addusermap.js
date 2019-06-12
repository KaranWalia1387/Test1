var data, roww, map;
var initialLocation;
var PEVLocations;
var outagedata;
var outageinfo;
var ismap = false;//#4101 This variable is use to check currently map div is visible or not.
$(document).ready(function () {
    $("#mapView").click(function () {
        ismap = true;//#4101
        $("#mapDiv").show();
        createmap();
        $(this).addClass('map-active');
    });
    /*#4101-start*/
    $('#imggrid').click(function () {
        ismap = false;
    });
    /*#4101-end*/
});

/*#4101-start*/
function createmap()
{
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
                  "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
                  function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                      var polygonSymbol, polygonGraphic, pts, pt, sym;
                      $('#div-useremap').html('');
                     // var map = new Map("div-useremap", { basemap: "streets", zoom: 3, minZoom: 3, maxZoom: 16 });
                      var map = new Map("mapDiv", { basemap: "streets", zoom: 3, minZoom: 3, maxZoom: 16 });
                      
                      utils.autoRecenter(map);

                      on(map, "load", function () {
                          try {
                              getCurrentLocation();
                          }
                          catch (e) {
                              console.log(e.message);
                          }
                      });

                      function getCurrentLocation() {
                          try {
                              map.graphics.clear();
                              var pt = null;
                              for (var i = 0; i < usertable.Tables[0].Rows.length; i++)
                              {
                                  if (!(usertable.Tables[0].Rows[i].Latitude == '' && usertable.Tables[0].Rows[i].Longitude == '')) {
                                      pt = new Point(usertable.Tables[0].Rows[i].Longitude, usertable.Tables[0].Rows[i].Latitude);
                                      var symbol = new esri.symbol.PictureMarkerSymbol('../images/user-icon.png', 30, 40);
                                      var attributes = { "Address1": usertable.Tables[0].Rows[i].Address1 };
                                      var infoTemplate = new InfoTemplate(usertable.Tables[0].Rows[i].Name, "<b>Address:</b> ${Address1}");
                                      var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                                      map.graphics.add(graphic);
                                      //var textSymbol = new esri.symbol.TextSymbol(i + 1).setOffset(0, 2);
                                      //map.graphics.add(new Graphic(pt, textSymbol, attributes));
                                      map.centerAndZoom(pt, 10);
                                  }
                              }
                              if (usertable.Tables[0].Rows.length==0) {
                                
                              }
                            
                          }
                          catch (e) {
                              console.log(e.message);
                          }
                      }
                  });
}
/*#4101-end*/