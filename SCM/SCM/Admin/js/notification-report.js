var mode = '1';
var notificationtable;
var databindtogrid;
TitleExport = 'notification-report';
gridid = 'jqxgrid';
var divId = 'div-NotificationChart';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;

var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    var notifyId = $('#jqxgrid').jqxGrid('getrowdata', row).NotificationId;
    var id = cityId + '_' + notifyId;
    return '<div style="text-align: left;"><span id=' + id + ' class=subBackToMainfilterdrop >' + value + '</span></div>';
}

//on page load
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'CityId', type: 'number' },
         { name: 'CityName' },
        { name: 'Notifications' },
        { name: 'NotificationId', type: 'number' },
         { name: 'Cnt', type: 'number' }
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
        width: "99%",
        autoheight: autoheightPrimary,
        source: dataAdapter,

        height: GridHeight * .75,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,

        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
                { text: 'City Name', dataField: 'CityName', width: '35%', cellsrenderer: imagerenderer },
            { text: 'Notification Type', dataField: 'Notifications', width: '35%', cellsrenderer: imagerenderer },
            { text: 'Notification Count', dataField: 'Cnt', width: '30%', cellsrenderer: imagerenderer }
        ]
    });
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'NotificationId', type: 'number' },
        { name: 'NotificationType' },
        { name: 'NotificationTitle' },
         { name: 'Customer Name' },
         { name: 'CustomerType' },//Ref BugID: 4844
         { name: 'City' },
         { name: 'ZipCode', type: 'number' },
         { name: 'Time/Date', type: 'date' },
         { name: 'Read' },
         { name: 'NotificationBody' }         
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    // Load icon in cell // NEW UI 12/17/2014
    var imagerenderer = function (row, datafield, value) {
        switch (datafield) {
            case "Read": return getRead(row, value); break;
            default: break;
        }
    }

    $("#jqxchildgrid").jqxGrid({
        width: "99%",
        autoheight: autoheightbool,
        source: dataAdapter,
        height: GridHeight * .75,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        columns:
        [
            { text: 'Notification Id', dataField: 'NotificationId', width: '0%',hidden:true },
            { text: 'Notification Type', dataField: 'NotificationType', width: '16%' },
            { text: 'Notification Title', dataField: 'NotificationTitle', width: '16%' },
            { text: 'Customer Name', dataField: 'Customer Name', width: '18%' },//Ref BugID: 4844
            { text: 'Customer Type', dataField: 'CustomerType', width: '23%' },
            { text: 'City', dataField: 'City', width: '10%' },
            { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
            { text: 'Time/Date', dataField: 'Time/Date', width: '16%', cellsformat: "HH:mm MM/dd/yyyy" },
            { text: 'Read', dataField: 'Read', width: '6%', cellsrenderer: imagerenderer },
            { text: 'Comment', dataField: 'NotificationBody', width: '23%' }
            
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//For high chart
function PiechartCommon(mode, caseId) {
    var piechart;
    var pieChartLevel3;
    switch(mode)
    {
        case 1:
            piechart = notificationtable.Tables[0];
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            piechart = notificationtable.Tables[1];
            break;
    }

    if (piechart.Rows.length > 0) {
        $('#div-NotificationChart').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No Data</font>');
        $('#div-NotificationChart').hide();
        $('#notifytitle').hide();
    }
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    
    $('#notifytitle').html("<b>" + title + "</b>");

    processed_json = new Array();
    processed_json2 = new Array();
    processed_json3 = new Array();
   
    switch (mode) {
        case 1:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.CityName,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.CityName,
                        drilldown: 'ReadStatusMode1'
                    });
                });
            }
            break;
        case 2:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications+'-'+obj.ZipCode,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.ZipCode,
                        drilldown: 'ReadStatusMode2'
                    });
                });
            }
            break;
        case 3:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.CustomerType,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.CustomerType,
                        drilldown: 'ReadStatusMode3'
                    });
                });
            }
            break;
        case 4:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.Notifications,
                        drilldown: 'ReadStatusMode4'
                    });
                });
            }
            break;
        case 5:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.Notifications,
                        drilldown: 'ReadStatusMode5'
                    });
                });
            }
            break;
    }

    createchart(caseId, divId); //function writtion in common-function.js
}

function chartclick(name, chartType, drilldown, type) {
    var tempTable;
    var processed_json4 = new Array();
    if (drilldown.indexOf('ReadStatusMode') >= 0) {
        if (drilldown.indexOf('ReadStatusMode1') == 0)
        {
            tempTable = notificationtable.Tables[1];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.PlaceHolderName == res[0] && obj.CityName == res[1])
                {
                    if(obj.Read == 'Read')
                    {
                        processed_json4.push({
                            name: obj.PlaceHolderName +'-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CityName + '-' + obj.Read,
                            drilldown: 'RepliedStatusMode1'
                        });
                    } else if (obj.Read == 'UnRead') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CityName + '-' + obj.Read,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('ReadStatusMode2') == 0)
        {
            tempTable = notificationtable.Tables[2];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.PlaceHolderName == res[0] && obj.ZipCode == res[1])
                {
                    if(obj.Read == 'Read')
                    {
                        processed_json4.push({
                            name: obj.PlaceHolderName +'-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.ZipCode + '-' + obj.Read,
                            drilldown: 'RepliedStatusMode2'
                        });
                    } else if (obj.Read == 'UnRead') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.ZipCode + '-' + obj.Read,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('ReadStatusMode3') == 0) {
            tempTable = notificationtable.Tables[2];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.PlaceHolderName == res[0] && obj.CustomerType == res[1]) {
                    if (obj.Read == 'Read') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CustomerType + '-' + obj.Read,
                            drilldown: 'RepliedStatusMode3'
                        });
                    } else if (obj.Read == 'UnRead') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CustomerType + '-' + obj.Read,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('ReadStatusMode4') == 0) {
            tempTable = notificationtable.Tables[2];
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.PlaceHolderName == name) {
                    if (obj.Read == 'Read') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Read,
                            drilldown: 'RepliedStatusMode4'
                        });
                    } else if (obj.Read == 'UnRead') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Read,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('ReadStatusMode5') == 0) {
            tempTable = notificationtable.Tables[2];
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.PlaceHolderName == name) {
                    if (obj.Read == 'Read') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Read,
                            drilldown: 'RepliedStatusMode5'
                        });
                    } else if (obj.Read == 'UnRead') {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Read,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Read,
                        });
                    }
                }
            });
        }
        return processed_json4;
    }
    else if (drilldown.indexOf('RepliedStatusMode') >= 0)
    {
        if (drilldown.indexOf('RepliedStatusMode1') == 0)
        {
            tempTable = notificationtable.Tables[2];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.Read == 'Read') {
                    if (obj.PlaceHolderName == res[0] && obj.CityName == res[1]) {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Replied,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CityName + '-' + obj.Replied,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('RepliedStatusMode2') == 0)
        {
            tempTable = notificationtable.Tables[3];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.Read == 'Read') {
                    if (obj.PlaceHolderName == res[0] && obj.ZipCode == res[1]) {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Replied,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.ZipCode + '-' + obj.Replied,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('RepliedStatusMode3') == 0) {
            tempTable = notificationtable.Tables[3];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.Read == 'Read') {
                    if (obj.PlaceHolderName == res[0] && obj.CustomerType == res[1]) {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Replied,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.CustomerType + '-' + obj.Replied,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('RepliedStatusMode4') == 0) {
            tempTable = notificationtable.Tables[3];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.Read == 'Read') {
                    if (obj.PlaceHolderName == res[0]) {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Replied,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Replied,
                        });
                    }
                }
            });
        }
        else if (drilldown.indexOf('RepliedStatusMode5') == 0) {
            tempTable = notificationtable.Tables[3];
            var res = name.split("-");
            $.map(tempTable.Rows, function (obj, i) {
                if (obj.Read == 'Read') {
                    if (obj.PlaceHolderName == res[0]) {
                        processed_json4.push({
                            name: obj.PlaceHolderName + '-' + obj.Replied,
                            y: obj.Cnt,
                            color: colorarrHEX[i],
                            title: obj.PlaceHolderName + '-' + obj.Replied,
                        });
                    }
                }
            });
        }

        return processed_json4;
    }
}

// NEW UI 12/17/2014
//for get lock icon showing in grid
function getRead(row, value) {
    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    return '<div style="text-align: center;">' + (value == "No" ? '<img src="../images/folder_close.png" class="Gridimage" title="' + value + '"/>' : '<img src="../images/folder_open.png" class="Gridimage" title="' + value + '" />') + '</a></div>';
}


$(document).ready(function () {
    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-NotificationChart';

    $('#nodata_div').hide();
    $('#nodata_div1').hide();

    submit();

    //notificationtable = Notifications.LoadGrid(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '', '', '').value;
    //$('#hdnParamValues').val(mode +'|'+ $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|0||||||0');
    //if (notificationtable != null) {
    //    databindtogrid = notificationtable.Tables[0].Rows;
    
    //    LoadGrid();
    //    PiechartCommon(mode);
    //}
    //else{
    //    $('#nodata_div').show();
    //    $('#nodata_div1').show();
    //    $('#nodata_div').html('<font color="Red">No Data</font>');
    //    $('#nodata_div1').html('<font color="Red">No Data</font>');
    //    $('#div-NotificationChart').hide();
    //    $('#notifytitle').hide();
    //}

    //$("#ddlCity").change(function () {
    //    var obj = $('#ddlCity option:selected');
    //    if (obj.index() > 0) {
    //        LoadUserZipcode($(obj).text());
    //    }
    //    else {
    //        $('#ddluserzipcode').empty();
    //    }
    //});
    $('.imgtoggle').click(function () {

        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });
    $('#btnFilter').click(function () {
        submit();
        chartgraphsection(defOpen);
    });


    $("#btnExcelExport").click(function () {
      
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Notification Report');
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
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id.split('_')[0];
    var notify = this.id.split('_')[1];
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    $('#ddlNotificationtype').val(notify);
    var objNotify = $('#ddlNotificationtype option:selected');
    if (obj.index() > 0 && objNotify.index()>0) {
        submit();
    }
});
function submit() {
    try
    {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For Mutually Exclusive Search Criteria
        //if (!isDate(startDate)) {
        //    alert('Invalid From date format,Please select/enter MM/DD/YYYY.');
        //    $('#txtDateFrom').focus();
        //    return false;
        //}
        //if (!isDate(endDate)) {
        //    alert('Invalid To Date format,Please select/enter MM/DD/YYYY. ');
        //    $('#txtDateTo').focus();
        //    return false;
        //}
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";
        var ddlNotificationtype = ($('#ddlNotificationtype').val() == null || $('#ddlNotificationtype').val() == '') ? '' : $('#ddlNotificationtype').val();
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }

        if ((city == '' && zip == '' && ddlAccountType == '')) {
            mode = 1;
        }
        else {

            mode = (city != '') ? 2 : 1;

            if (zip != '') {
                mode = 3;
            }

            if ((city != '' || zip != '') && ddlAccountType != '') {
                mode = 4;
            } else if (ddlAccountType != '') {
                mode = 4;
            }
        }

        if (ddlNotificationtype != '') {
            mode = 5;
        }

        notificationtable = Notifications.LoadGrid(mode, dtFrom, dtTo, city, zip, ddlNotificationtype, ddlAccountType).value;
        //for pdf
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlNotificationtype + '|' + ddlAccountType);
        databindtogrid = notificationtable.Tables[0].Rows;
        if (databindtogrid.length == 0) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
            $('#nodata_div').show();
            $('#nodata_div').html('<font color="Red">No Data</font>');
        }
        if (mode == 1) {
            if (databindtogrid.length <= 10)
                autoheightPrimary = true;
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            PiechartCommon(mode);
            gridid = 'jqxgrid';
            LoadGrid();
          
        }
        else {
            $('#jqxgrid').hide();
       
            $('#jqxchildgrid').show();
            PiechartCommon(mode);
            gridid = 'jqxchildgrid';
            LoadChildGrid();
        
        }

        chartgraphsection(defOpen);
    } catch (e) { }
}