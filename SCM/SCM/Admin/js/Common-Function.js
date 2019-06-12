var mode = 1;
var isdecimal = 0;
var isNotification = 0;
$(document).ready(function () {
    var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
    $('input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"]').each(function () {
        $(this).after(mandatoryHtml);
    });
});

function getMMDDYYDate(dt) {
    try {
        var dat = new Date(dt);
        var str = dat.getMonth() + 1 + "/" + dat.getDate() + "/" + dat.getFullYear().toString().substr(2, 2);
        return str;
    }
    catch (e) {
        console.log(e.message);
    }
}

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

    for (var i = 0; i < data.Rows.length; i++) {
        $('#ddluserzipcode').append($("<option></option>").val(data.Rows[i]["ZipCode"]).html(data.Rows[i]["ZipCode"]));
    }
  /*  var param = { xml: createXMLForSingleReg(tables) };
    $.ajax({
        type: "POST",
        url: "default.aspx/RegisterWithSingleAddress",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {







            $('#ddluserzipcode').append($("<option></option>").val('').html('--Select--'));
            for (var i = 0; i < data.Rows.length; i++) {
                $('#ddluserzipcode').append($("<option></option>").val(data.Rows[i]["ZipCode"]).html(data.Rows[i]["ZipCode"]));
            }
            $('#ddluserzipcode').attr('disabled', false);
        }
    });*/
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
                createmapCluster(JSON.parse(MapData), 'div-useremap');
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
    if (value != 1 && value !=3 )
        PiechartCommon(mode, 'i0');
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
        case 'i5':
            Bindheigh('areaspline', divId, name);
        case 'i6':
            BindheighSolarAdminreport('areaspline', divId, name);
            break;
        case 'i7':
            BindheighUsageAdminreport('areaspline', divId, name);
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
    //Added by khushbu kansal for Showing area chart on usage pages
    if (mode == 0) {
        BindheighWithSeries('area', divId, series, isdecimal, name);
    }
    else {
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
            case 'i5':
                BindPieChartWithSeries('areaspline', divId, series, name);
                break;
            case 'i0':
                BindPieChartWithSeries(divId, 'Count', series, '', name);
                break;

            default:
                BindPieChartWithSeries(divId, 'Count', series);
        }
    }
}

function LoadUserMapLocation(Latitude, Longitude, City, Zipcode, Address1, Address2) {
    if (Latitude == null || Latitude == "" || Longitude == null || Longitude == "") {
        $('#location').html('<center><font color="Red">No Data</Font></center>');
        return;
    }
    else {
        $('#location').html('');
        $('#location').width('100%')
    }
    try {

        require([
                "esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint",
                "esri/geometry/Polyline",
                "esri/geometry/Polygon", "esri/graphic",
                "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
                "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"
            ],
            function(Map,
                Geocoder,
                Point,
                Multipoint,
                Polyline,
                Polygon,
                Graphic,
                SimpleMarkerSymbol,
                SimpleLineSymbol,
                SimpleFillSymbol,
                InfoTemplate,
                utils,
                Color,
                on,
                dom) {
                var map = new Map("location",
                {
                    basemap: "streets",
                    zoom: 3,
                    minZoom: 3,
                    maxZoom: 16,
                    smartNavigation: false
                });
                on(map,
                    "load",
                    function() {
                        try {
                            map.disableScrollWheelZoom();
                            getCurrentLocation();
                        } catch (e) {
                            alert(e.message)
                        }
                    });

                function getCurrentLocation() {
                    try {
                        map.graphics.clear();
                        pt = new Point(Longitude, Latitude);
                        var symbol = new esri.symbol.PictureMarkerSymbol('../images/map-icon-green.png', 30, 39);

                        var attributes = {
                            "City": City,
                            "Zipcode": Zipcode,
                            "Address1": Address1,
                            "Address2": Address2
                        };
                        var infoTemplate = new InfoTemplate('Location',
                            "<p style='text-align:left'><b>${City}</b> - ${Zipcode}</br>${Address1}</br>${Address2}</p>");
                        var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                        map.graphics.add(graphic);

                        // Position the map
                        map.centerAndZoom(pt, 10);
                        // map.zoomEnd(0);
                    } catch (e) {
                    }
                }
            });
    } catch (e) {
        console.log("Error in Common-function.js|LoadUserMapLocation : " + e.message);
    }
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

    //$('#outbox').click(function () {
    //    window.location.href = "Notification-outbox.aspx";
    //});

    //$('#outage').click(function () {
    //    LoadMessage('Outage', 'Outage', 'outage');
    //});
    //$('#billing').click(function () {
    //    LoadMessage('billing', 'Billing', 'billing');
    //});
    //$('#service').click(function () {
    //    LoadMessage('service', 'Service', 'service');

    //});
    //$('#connectme').click(function () {
    //    LoadMessage('connect me', 'Connect Me', 'connectme');


    //});
    //$('#demandresponse').click(function () {
    //    LoadMessage('demand response', 'Demand Response', 'demandresponse');


    //});
    //$('#sentitem').click(function () {
    //    LoadMessage('sent', 'Sent', 'sentemail');

    //});
    //$('#saved').click(function () {
    //    LoadMessage('resolved', 'Resolved', 'saved');


    //});
    //$('#trash').click(function () {
    //    LoadMessage('trash', 'Trash', 'trash');

    //});
    //$('#allmail').click(function () {
    //    LoadMessage('allMail', 'All Email', 'allemail');

    //});
});

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
    if (arr.indexOf(char) == -1) {
        return false;
    }
    else {
        return true;
    }
}

function isAlfa(evt) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (specialKeys.indexOf(charCode) !=-1) {
        return true;
    }
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) ) {
        return false;
    }
   
    return true;
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

function File_OnChange() {
  
    try {
        $('#btnRemoveFile').hide();
        var files = $("#fileUpload").get(0).files;
        if (files.length > 0) {
            //Check file type
            var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == 'jpg') {
                $('#btnRemoveFile').show();
                return true;
            }
            else {
                $('#btnRemoveFile').hide();
                alert("File extensions allowed: gif, png, bmp, jpg ,jpeg.");
                $("#fileUpload").val('');
                return false; // Not valid file type
            }
        }
    }
    catch (e) { }
}

function IsHtmlTag(e)
{   
    //var specialKeys = new Array();
    //specialKeys.push(8); //Backspace
    //specialKeys.push(9); //Tab
    //specialKeys.push(46); //Delete
    //specialKeys.push(36); //Home
    //specialKeys.push(35); //End
    //specialKeys.push(37); //Left
    //specialKeys.push(39); //Right
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = ((keyCode == 60 && keyCode == 62 && keyCode <= 47 && keyCode == 92) || (keyCode == 60) || (keyCode == 62 || keyCode==47 || keyCode==92));
    if (ret == true) {
        alert('Html tags are not allowed');
        return false;
    }

}

function GetFileTypeIcon(attachmentExtension) {
    try {
        var classExten = '';
        switch (attachmentExtension) {
            case "gif": case "png": case "bmp": case "jpeg": case 'jpg':
                classExten = "fa-file-image-o";
                break;
            case "pdf":
                classExten = "fa-file-pdf-o "
                break;
            case "doc": case "docx":
                classExten = "fa-file-word-o";
                break;

            case "txt": case "rtf":
                classExten = "fa-file-text";
                break;
            case "xls": case "xlsx":
                classExten = "fa-file-excel-o ";
                break;
            default:
                classExten = "fa-paperclip";


        }
        return classExten;

    } catch (e) {
        console.log(e.message);
    }
}