var mode = '1';
var programstable;
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
    return '<div style="text-align: left;"><span id=' + id + ' class=filterdrop >' + value + '</span></div>';
}

function BindHeader() {
    try {
        debugger;
        var data = programstable;
        $('#lblTotalUsers').text(data[0].TotalUser);
        $('#lblLoginUser').text(data[0].UserLogin);

        //$('#lblENROLLED').text(data[0].ApprovedEnrollment);

        //$('#lblPending').text(data[0].PendingEnrollment);

        //$('#lblTotal').text((parseInt(data[0].PendingEnrollment) + parseInt(data[0].ApprovedEnrollment)).toString());

        // $('#lblBillingReq').text(12);
        //data.forEach(function (obj, i) {
        //    if (obj.Notifications == "All mail") {
        //        $('#lblENROLLED').text(obj.Cnt);
        //    }
        //    if (obj.Notifications == "Outage") {
        //        $('#lblPending').text(obj.Cnt);
        //    }
        //    if (obj.Notifications == "Billing") {
        //        $('#lblBillingReq').text(obj.Cnt);
        //    }
            //if (obj.Notifications == "Service") {
            //    $('#lblServiceReq').text(obj.Cnt);
            //}
       // });
    }
    catch (e) {
        console.log(e.message);
    }

}

//on page load
function LoadGrid() {
    try {
        debugger;
        autoheightPrimary = false;
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
                    //{ name: 'LoginDateTime', type: 'text' },
                     { name: 'ActivityDateTime', type: 'text' },
                    { name: 'LoginCount', type: 'number' },
                    //{ name: 'PendingEnrollment' },
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };

        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' });


        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            height: GridHeight * .79,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,

            columnsresize: true,
            columnsreorder: true,
            columns:
               [
                 { text: 'Login Date', dataField: 'ActivityDateTime', width: '50%', hidden: false },
                   { text: 'Login Count', dataField: 'LoginCount', width: '50%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                        //{ text: 'Efficiency Type', dataField: 'EEType', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                  //{ text: 'Pending Enrollment', dataField: 'PendingEnrollment', width: '40%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
               ]
        });

        $("#jqxgrid").on('bindingcomplete', function () {
            if ($(window).width() < 1366) {
                $("#jqxgrid").jqxGrid('autoresizecolumns');
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
                   { name: 'ID', type: 'number' },
                        { name: 'CityId', type: 'number' },
                   { name: 'CityName' },
                   { name: 'EEType' },
                   { name: 'Title' },
                   { name: 'PeopleEnrolled', type: 'number' }
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
        width: "100%",
        autoheight: autoheightbool,
        height: "320",
        source: dataAdapter,
        theme: 'darkblue',
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
                   //{ text: 'ID', dataField: 'ID', width: '20%', cellsrenderer: imagerenderer },
                   { text: 'ID', dataField: 'ID', width: '0%', hidden: true },
                   { text: 'City Name', dataField: 'CityName', width: '30%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                   //{ text: 'Efficiency Type', dataField: 'EEType', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                   { text: 'Title', dataField: 'Title', width: '40%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                   { text: 'Users Enrolled', dataField: 'PeopleEnrolled', width: '30%', cellsrenderer: imagerenderer }//, cellsrenderer: imagerenderer
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
    switch (mode) {
        case 1:
            piechart = programstable.Tables[0];
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            piechart = programstable.Tables[1];
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
                        name: obj.Notifications + '-' + obj.LoginDateTime,
                        y: obj.LoginCount,
                        //color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.LoginDateTime,
                        drilldown: 'ReadStatusMode1'
                    });
                });
            }
            break;
        case 2:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.LoginDateTime,
                        y: obj.LoginCount,
                        //color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.LoginDateTime,
                        drilldown: 'ReadStatusMode2'
                    });
                });
            }
            break;
        case 3:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.LoginDateTime,
                        y: obj.LoginCount,
                        //color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.LoginDateTime,
                        drilldown: 'ReadStatusMode3'
                    });
                });
            }
            break;
        case 4:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.LoginDateTime,
                        y: obj.LoginCount,
                        //color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.LoginDateTime,
                        drilldown: 'ReadStatusMode4'
                    });
                });
            }
            break;
        case 5:
            {
                $.map(piechart.Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.Notifications + '-' + obj.LoginDateTime,
                        y: obj.LoginCount,
                        //color: colorarrHEX[i],
                        title: obj.Notifications + '-' + obj.LoginDateTime,
                        drilldown: 'ReadStatusMode5'
                    });
                });
            }
            break;

         
    }

    createchart(caseId, divId); //function writtion in common-function.js
}

function FillChartData(mode) {
    try {
        debugger;
        processed_json = new Array();
        processed_json2 = new Array();

        if (databindtogrid == null) {
            $('#chartDiv').html(nodataLabel);
        }
        yaxis = 'Number of Logins';

        // processed_json = new Array();
        $.map(databindtogrid, function (obj, i) {
            processed_json.push({
                name: mode = obj.LoginDateTime.slice(0, -5),
                y: mode = obj.LoginCount,
                //color: colorarrHEX[i],
                title: mode = obj.LoginDateTime.slice(0, -5)
            });
        });

       
        if (processed_json.length > 0) {
            BindhighChart2SeriesHeat('areaspline', 'chartDiv', 'Total Login');
        } else {
            $('#chartDiv').html(nodataLabel);
        }
        dtOutageChartjs = processed_json;
    } catch (e) { }
}


//for get lock icon showing in grid
function getRead(row, value) {
    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    return '<div style="text-align: center;">' + (value == "No" ? '<img src="../images/folder_close.png" class="Gridimage" title="' + value + '"/>' : '<img src="../images/folder_open.png" class="Gridimage" title="' + value + '" />') + '</a></div>';
}


$(document).ready(function () {

    chartdivid = 'div-NotificationChart';

    $('#nodata_div').hide();
    $('#nodata_div1').hide();


    submit();


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
    });


    $("#btnExcelExport").click(function () {
        try {
            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            // var count = $("#" + gridid).jqxGrid('columns').records.length;
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Heat Map');
            document.getElementById('graphDiv').style.display = 'none';
            document.getElementById('tabledivarea').style.display = 'none';
            if (defOpen == 1)
                document.getElementById('tabledivarea').style.display = 'block';
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
    if (obj.index() > 0 && objNotify.index() > 0) {
        submit();
    }
});

function switchview(viewshow, viewhide) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        document.getElementById(viewhide).style.display = 'none';
        $(".jqgrid:visible").jqxGrid('updatebounddata');
    }
    catch (e) { }
}

function submit() {
    try {
        debugger;
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";
        //var ddlNotificationtype = ($('#ddlNotificationtype').val() == null || $('#ddlNotificationtype').val() == '') ? '' : $('#ddlNotificationtype').val();
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
       
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
       
        var param = {
            mode: mode,
            datefrom: dtFrom,
            dateto: dtTo,
            cityid: city,
            zip: '',
            eetype: ddlAccountType,
        }
        $.ajax({
            type: "POST",
            url: "HeatMapSample.aspx/LoadGrid",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
               
                var result = $.parseJSON(data);
                if (result != null) {
                   
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

                    if (startDate != '' && endDate != '') {
                        var dsplit = endDate.split("/");
                        if (endDate.indexOf("-") != -1)
                        {
                            dsplit = endDate.split("-");
                        }
                        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        dsplit = startDate.split("/");
                        if (startDate.indexOf("-") != -1) {
                            dsplit = startDate.split("-");
                        }
                        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        $('#lblCurrent').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                        $('#lblBefore').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
                    }
                    //OutageTable = result; 
                    programstable = result.Table;
                    databindtogrid = result.Table1;
                    //paperlessbilltable.Tables[0].Rows;
                    BindHeader();
                    for (var i = 0; i < databindtogrid.length; i++) {

                        var dateEnds = new Date(databindtogrid[i]["ActivityDateTime"]);
                        databindtogrid[i]["LoginDateTime"] = (dateEnds.getMonth() + 1) + '/' + dateEnds.getDate() + '/' + dateEnds.getFullYear();
                    }
                    //for pdf
                    $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);

                    $('#legends').hide();

                    if (databindtogrid.length == 0) {

                        $('#graphdivarea').hide();
                        $('.lgnd_box_right').hide();
                        $('#nodata_div').show();
                        $('#jqxgrid').hide();
                        BindHeader();
                    } else {
                        $('#graphdivarea').show();
                        $('.lgnd_box_right').show();
                        $('#nodata_div').hide();
                        $('#jqxgrid').show();
                        if (mode == 1) {
                            if (databindtogrid.length <= 10)
                                autoheightPrimary = true;
                            document.getElementById('chartDiv').style.display = 'block';
                            document.getElementById('graphDiv').style.display = 'none';
                            LoadGrid();
                            BindHeader();
                            FillChartData(mode);
                            gridid = 'jqxgrid';
                        }
                        else {
                            LoadGrid();
                            FillChartData(mode);
                            gridid = 'jqxgrid';

                            
                            //LoadChildGrid();
                        }
                    }
                    loader.hideloader();
                }
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!! ' + request.statusText); }
        });
    } catch (e) { loader.hideloader(); alert('Error!! '); }
}