var mode = 1;
var isdecimal = 0;
var isNotification = 0;
$(document).ready(function () {
    var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
    $('input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"]').each(function () {
        $(this).after(mandatoryHtml);
    });
});

function AddMandatoryAttributeToElement(elemet) {
    var attr = $(elemet).attr('mandatory');
    // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
    if (typeof attr == typeof undefined || attr == false) {
        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
        $(elemet).attr('mandatory', '1');
        $(elemet).after(mandatoryHtml);
    }
}

function RemoveMandatoryAttributeFromElement(elemet) {  
    $(elemet).removeAttr('mandatory');
    $(elemet).next('span').remove();
}

function checkDate(sender, args) {
    var dt = new Date();
    var tz = -dt.getTimezoneOffset();
    if (addMinutes(sender._selectedDate, -tz) > new Date()) {
        alert("You cannot select a day future than today!");
        sender._selectedDate = new Date();
        sender._element.value = sender._selectedDate.format('M/dd/yyyy');
        return false;
    }
}

function ValidateDateofBirth(sender, args) {
    if (args.value.trim().length > 0) {
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (date_regex.test(args.value)) {
            if (new Date(args.value) >= (new Date((new Date()).toDateString()))) {
                alert("Date should be less than today's Date");
                args.value = '';
                return false;
            }
        }
        else {
            alert('Invalid Date Format');
            args.value = '';
            return false;
        }
    }
    else {
        args.value = ''
    }
    return true;
}


function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function LoadUserZipcode(cityname) {
    $('#ddluserzipcode').empty();
    var data = Common.GetZipcode(cityname).value;
    $('#ddluserzipcode').append($("<option></option>").val('').html('--Select--'));
    for (var i = 0; i < data.Rows.length; i++) {
        $('#ddluserzipcode').append($("<option></option>").val(data.Rows[i]["ZipCode"]).html(data.Rows[i]["ZipCode"]));
    }
    $('#ddluserzipcode').attr('disabled', false);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

//This function is for allowing user to enter only digits and one colon
function isTime(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 58 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function convertlocaltoutc(dateval) {

    var date = new Date();
    var offset = date.getTimezoneOffset();
    var currentdate = ((date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString());
    if (dateval == currentdate) {
        var parseddate = new Date(dateval + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
        parseddate.setMinutes(parseddate.getMinutes() + offset);
        return ((parseddate.getMonth() + 1).toString() + '/' + parseddate.getDate().toString() + '/' + parseddate.getFullYear().toString())
    }
    else {
        var parseddate = new Date(dateval + ' ' + '00:00:00');
        parseddate.setMinutes(parseddate.getMinutes() + offset);
        return ((parseddate.getMonth() + 1).toString() + '/' + parseddate.getDate().toString() + '/' + parseddate.getFullYear().toString())
    }
}

function chartgraphsection(value, module) {
    try {
        defOpen = value;
        $('#i1').addClass('column').removeClass('activeColumn');
        $('#i2').addClass('line').removeClass('activeLine');
        $('#i3').addClass('bar').removeClass('activeBar');
        $('#pieGraph').addClass('pie').removeClass('activePie');
        $('#gridView').addClass('grid').removeClass('activeGrid');
        $('#mapView').addClass('map1').removeClass('activeMap');

        if (value == 1) {
            $('#gridView').addClass('activeGrid').removeClass('grid');
        } else if (value == 2) {
            $('#pieGraph').addClass('activePie').removeClass('pie');
        }
        else {
            //   $('#mapView').addClass('activeMap').removeClass('map');
            $('#mapView').addClass('activeMap').removeClass('map1');
        }
        if (databindtogrid.length == 0) {

            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('chartDiv').style.display = 'none';
            document.getElementById('mapDiv').style.display = 'none';
        }
        else {

            if (value == 1) {
                document.getElementById('graphDiv').style.display = 'block';
                document.getElementById('chartDiv').style.display = 'none';
                document.getElementById('mapDiv').style.display = 'none';
            }
            else if (value == 2) {
                document.getElementById('graphDiv').style.display = 'none';
                document.getElementById('chartDiv').style.display = 'block';
                document.getElementById('mapDiv').style.display = 'none';
            }
            else {
                document.getElementById('graphDiv').style.display = 'none';
                document.getElementById('chartDiv').style.display = 'none';
                document.getElementById('mapDiv').style.display = 'block';
            }
        }

    }
    catch (e) {
    }
    finally {
        try {
            resizegrid();
        }
        catch (e) { }
    }
    if (value != 1)
        try {
            //PiechartCommon(mode, 'i0');
        }
        catch (e)
        { console.log(e.message);}
    else if (value == 1 && module == 'analysis')
        LoadGrid();
}

function createchart(caseId, divId, name) {
    switch (caseId) {
        case 'i1':
            Bindheigh('column', divId, isdecimal, 'Count');
            break;
        case 'i2':
            Bindheigh('line', divId, isdecimal, 'Count');
            break;
        case 'i3':
            Bindheigh('area', divId, isdecimal, 'Count');
            break;
        case 'i4':
            BindPieChart(divId, name);
            break;
        case 'i0':
            var series = name != '' || name != undefined ? name : 'Count';
            BindPieChart(divId, series);
            break;
        default:
            BindPieChart(divId, 'Count');
    }
}

function createchartWithSeries(caseId, divId, series, name) {
    switch (caseId) {
        case 'i1':
            BindheighWithSeries('column', divId, series, isdecimal, name);
            break;
        case 'i2':
            BindheighWithSeries('line', divId, series, isdecimal, name);
            break;
        case 'i3':
            BindheighWithSeries('area', divId, series, isdecimal, name);
            break;
        case 'i4':
            BindPieChartWithSeries(divId, 'Count', series, '', name);
            break;
        case 'i0':
            BindPieChartWithSeries(divId, 'Count', series, '', name);
            break;

        default:
            BindPieChartWithSeries(divId, 'Count', series);
    }
}
function LoadMessage(type, name, active) {
    $('#chkall').attr('checked', false);
    $('.btnSave').show();
    $('.MailListing').show();
    $('#MessageBody').hide();
    $('.btnputback').hide();
    $('#btnBack').hide();
    $('#btnReply').hide();
    $('#msgReply').hide();
    $('#btnPrevious').hide();
    $('#btnNext').hide();
    $('#divHeader').show();
    ismsgopen = false;
    $("#notification>ul>li.active").removeClass("active");
    var value = configure_inbox.LoadMessages('', type, '').value;
    $('#ulNotificatons').text('');
    $('#ulNotificatons').append(value);
    $('#lblHeading').text('');
    $('#lblHeading').text(name);
    if (type != "sent")
        $('#lblFromTo').text('From');
    else
        $('#lblFromTo').text('To');
    $('.MailListing').show();
    $('.MessageBody').hide();
    if (value == '')
        $('#divHeader').hide();
    else {
        $('#divHeader').show();
    }
    var result = configure_inbox.UnreadMessage().value;
    for (var i = 0; i < result.Rows.length; i++) {
        $('#unReadOutage').text(result.Rows[i].Outage != '0' ? '(' + '' + result.Rows[i].Outage + ' )' : '');
        $('#unReadInbox').text(result.Rows[i].Inbox != '0' ? '(' + '' + result.Rows[i].Inbox + ' )' : '');
        $('#unReadConnectMe').text(result.Rows[i].ConnectMe != '0' ? '(' + '' + result.Rows[i].ConnectMe + ' )' : '');
        $('#unReadService').text(result.Rows[i].Service != '0' ? '(' + '' + result.Rows[i].Service + ' )' : '');
        $('#unReadBilling').text(result.Rows[i].Billing != '0' ? '(' + '' + result.Rows[i].Billing + ' )' : '');
        $('#unReadDemandResponse').text(result.Rows[i].DemandResponse != '0' ? '(' + '' + result.Rows[i].DemandResponse + ' )' : '');
    }
    $(".sidebar_" + active + "_inner").addClass('active');
    if (type == 'resolved') {
        $('.btnputback').show();
        $('.btnSave').hide();
    }
    if (type == 'trash') {
        $('.btnputback').show();
    }
    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        arrmsgids[i] = $(arrchkbox)[i].id;
    }
}
function LoadUserMapLocation(Latitude, Longitude, City, Zipcode, Address1, Address2) {
    if (Latitude == null || Latitude == "" || Longitude == null || Longitude == "") {
        $('#location').html('<center><font color="Red">No Data</Font></center>');
        return;
    }
    else {
        $('#location').html('');
    }
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                  var map = new Map("location", {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16,
                      smartNavigation: false
                  });
                  on(map, "load", function () {
                      try {
                          map.disableScrollWheelZoom();
                          getCurrentLocation();
                      }
                      catch (e) {
                          alert(e.message)
                      }
                  });

                  function getCurrentLocation() {
                      try {
                          map.graphics.clear();
                          pt = new Point(Longitude, Latitude);
                          var symbol = new esri.symbol.PictureMarkerSymbol('../images/map-icon-green.png', 30, 39);

                          var attributes = { "City": City, "Zipcode": Zipcode, "Address1": Address1, "Address2": Address2 };
                          var infoTemplate = new InfoTemplate('Location', "<p style='text-align:left'><b>${City}</b> - ${Zipcode}</br>${Address1}</br>${Address2}</p>");
                          var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                          map.graphics.add(graphic);

                          // Position the map
                          map.centerAndZoom(pt, 10);
                          // map.zoomEnd(0);
                      }
                      catch (e)
                      { }
                  }
              });
}
$(document).ready(function () {
    $('#imgClk  a span').click(function (obj) {
        $('#pieGraph').addClass('pie').removeClass('activePie');
        $('#i1').addClass('column').removeClass('activeColumn');
        $('#i2').addClass('line').removeClass('activeLine');
        $('#i3').addClass('bar').removeClass('activeBar');
        switch ($(this).attr("id")) {
            case 'i1':
                $('#i1').addClass('activeColumn').removeClass('column');
                break;
            case 'i2':
                $('#i2').addClass('activeLine').removeClass('line');
                break;
            case 'i3':
                $('#i3').addClass('activeBar').removeClass('bar');
                break;
            default:
                $('#pieGraph').addClass('pie').removeClass('activePie');
                break;
        }
        PiechartCommon(mode, $(this).attr("id"));
    });
    $('#notification').click(function (event) {
        if (event.target.id == '') {
            var url = location.search;
            $('.MailListing').show();
            $('.MessageBody').hide();
            if (url.indexOf("Notification") < 0) {
                window.location.href = "notification-inbox.aspx?type=allmail&Notification=" + isNotification;
            }
            else {
                $('#collapseOne').toggle();

            }

        }

    });

    $('#banner').click(function (event) {
        if (event.target.id == '') {
            var url = location.search;
            if (url.indexOf("banner") < 0) {
                window.location.href = "configure-banner.aspx";
            }
            else {
                $('#collapseTwo').toggle();
            }
        }
    });

    //Function to open Service Request analysis report by default
    //on clicking the Analytics Report
    $('#analytics').click(function (event) {
        if (event.target.id == '') {
            //var url = location.search;
            //if (url.indexOf("Notification") < 0) {
            window.location.href = "ServiceRequest.aspx";
            //}
            //else {
            //    $('#collapseOne').toggle();

            //}

        }

    });

    $('#outbox').click(function () {
        window.location.href = "Notification-outbox.aspx";
    });

    $('#outage').click(function () {
        LoadMessage('Outage', 'Outage', 'outage');
    });
    $('#billing').click(function () {
        LoadMessage('billing', 'Billing', 'billing');
    });
    $('#service').click(function () {
        LoadMessage('service', 'Service', 'service');

    });
    $('#connectme').click(function () {
        LoadMessage('connect me', 'Connect Me', 'connectme');


    });
    $('#demandresponse').click(function () {
        LoadMessage('demand response', 'Demand Response', 'demandresponse');


    });
    $('#sentitem').click(function () {
        LoadMessage('sent', 'Sent', 'sentemail');

    });
    $('#saved').click(function () {
        LoadMessage('resolved', 'Resolved', 'saved');


    });
    $('#trash').click(function () {
        LoadMessage('trash', 'Trash', 'trash');

    });
    $('#allmail').click(function () {
        LoadMessage('allMail', 'All Email', 'allemail');

    });
});


//$('.input-section').each(function () {
//    $(this).nextUntil('.filter-section').andSelf().wrapAll('<div class="input_section_box">');

//});

$("#ddlCity").change(function () {
    if ($('#ddluserzipcode').length > 0) {
        var obj = $('#ddlCity option:selected');
        if (obj.index() > 0) {

            LoadUserZipcode($(obj).text());
        }
        else {
            $('#ddluserzipcode').empty();
            $('#ddluserzipcode').attr("disabled", true)
        }
    }
});

function nodatashow() {
    $('#jqxgrid').hide();
    $('#jqxchildgrid').hide();
    $('#nodata_div').show();
    $('#graphDiv').hide();
    $('#chartDiv').hide();
    $('#mapDiv').hide();

}
function numberOnly(txt, e) {
    var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    var code;
    if (window.event)
        code = e.keyCode;
    else
        code = e.which;
    var char = keychar = String.fromCharCode(code);
    if (arr.indexOf(char) == -1)
        return false;

}

function SetImages(startmode) {
    switch (startmode) {
        case 'y':
            $('.chartback').css('display', 'none');
            break;
        case 'm':
            $('.chartback').css('display', 'block');
            $('.chartback').attr('title', 'Back to Yearly');
            break;
        case 'd':
            $('.chartback').css('display', 'block');
            $('.chartback').attr('title', 'Back to Monthly');
            break;
        case 'h':
            $('.chartback').css('display', 'block');
            $('.chartback').attr('title', 'Back to Daily');
            break;
    }
}