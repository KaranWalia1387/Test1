var defOpen = 1;
var TextMessageTable;
var databindtogrid;
gridid = 'jqxgrid';
var piechart = '';
var divId = 'div-TextMessagechart';
var mode = '';
var autoheightPrimary = false;
var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';
}
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;

    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CityName' },
         { name: 'CityId', type: 'number' },
         { name: 'UserCount', type: 'number' },
         { name: 'Pending', type: 'number' },
         { name: 'Success', type: 'number' },
         { name: 'Failure', type: 'number' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    if (databindtogrid.length > 0) {
        $("#btnExportPdf").removeAttr('disabled');
        $("#btnExportPdf").css('cursor', 'pointer');
    }
    else {
        $("#btnExportPdf").attr('disabled', 'disabled');
        $("#btnExportPdf").css('cursor', 'default');
    }
    var supportsOrientationChange = "onorientationchange" in window,
     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
        var GridHeight = $(window).height() - 331;
        $("#jqxgrid").jqxGrid({ height: GridHeight });
        var modechild = ($('#ddlCity').val() != '') ? '2' : '1';
        if (modechild == 2) {
            $("#jqxchildgrid").jqxGrid({ height: GridHeight });
        }
    }, false);

    $("#jqxgrid").jqxGrid({
        width: "100%",
        //autoheight: autoheightPrimary,       
        source: dataAdapter,
        height: GridHeight * .78,
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
            { text: 'City Name', dataField: 'CityName', cellsrenderer: imagerenderer },
            { text: 'Users', dataField: 'UserCount', width: '10%', cellsrenderer: imagerenderer },
            { text: 'Pending Message', dataField: 'Pending', width: '20%', cellsrenderer: imagerenderer },
            { text: 'Success Message', dataField: 'Success', width: '20%', cellsrenderer: imagerenderer },
            { text: 'Failure Message', dataField: 'Failure', width: '20%', cellsrenderer: imagerenderer }
        ]
    });
}

function LoadChildGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CustomerName' },
         { name: 'CityName' },
         { name: 'ZipCode' },
         { name: 'AccountNumber', type: 'number' },
         { name: 'MobileNo' },
         { name: 'TextMsg' },
         { name: 'PushTimeStamp' },
         { name: 'MessageStatus' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxchildgrid").jqxGrid({
        width: "100%",
        autoheight: autoheightPrimary,
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
        columns:
        [
            { text: 'Customer Name', dataField: 'CustomerName', width: '15%' },
            { text: 'City Name', dataField: 'CityName', width: '15%' },
            { text: 'Zip Code', dataField: 'ZipCode', width: '15%' },
            { text: 'Account Number', dataField: 'AccountNumber', width: '20%' },
            { text: 'Mobile No', dataField: 'MobileNo', width: '15%' },
            { text: 'Message', dataField: 'TextMsg', width: '15%' },
            { text: 'Push Timestamp', dataField: 'PushTimeStamp', width: '15%' },
            { text: 'Message Status', dataField: 'MessageStatus', width: '20%' },
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

// NOT IN USE
function OLD_LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CustomerName' },
         { name: 'AccountNumber', type: 'number' },
         { name: 'MobileNo' },
         { name: 'Status', type: 'number' },
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
        //autoheight: autoheightPrimary,
        height: GridHeight * .79,
        source: dataAdapter,

        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Customer Name', dataField: 'CustomerName' },
            { text: 'Account Number', dataField: 'AccountNumber', width: '12%' },
            { text: 'Mobile No', dataField: 'MobileNo' },
            { text: 'Status', dataField: 'Status' },
        ]
    });
}
function chartclick(name, chartType, drilldown, type) {
    var tabSecondary = TextMessageTable.Tables[2];
    var processed_json4 = new Array();
    if (drilldown.indexOf('city') > 0) {
        $.map(tabSecondary.Rows, function (obj, i) {
            if (name.replace(' ', '').trim().toLowerCase() == obj.CityName.replace(' ', '').trim().toLowerCase()) {
                processed_json4.push({
                    name: obj.Status,
                    y: parseInt(obj.UserCount),
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            }
        });
    }
    else {
        $.map(tabSecondary.Rows, function (obj, i) {
            if (name.trim() == obj.ZipCode) {
                processed_json4.push({
                    name: obj.Status,
                    y: parseInt(obj.UserCount),
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            }
        });
    }
    return processed_json4;
}
function PiechartCommon(mode, caseId) {

    var piechart = TextMessageTable.Tables[1];
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#usagetitle').html(title);

    switch (parseInt(mode)) {
        case 0:
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.CityName,
                    y: obj.UserCount,
                    color: colorarrHEX[i],
                    title: obj.CityName,
                    drilldown: 'status-city'
                });
            });
            break;
        case 1:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.ZipCode,
                    y: obj.UserCount,
                    title: obj.ZipCode,
                    color: colorarrHEX[i],
                    drilldown: 'status-zipcode'
                });
            });
            break;
        case 3:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.ZipCode,
                    y: obj.UserCount,
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.ZipCode
                });
            });
            break;
        case 2:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.Status,
                    y: obj.UserCount,
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            });

            break;
    }
    if (mode == 0 || mode == 1)
        createchart(caseId, divId, 'City'); //function writtion in common-function.js
    else
        createchart(caseId, divId);
}

$(document).ready(function () {

    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1025)
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                else {
                    LoadChildGrid();
                }
            }
        }
        catch (e) { }
    });

    $('#nodata_div').hide();
    $('#nodata_div1').hide();

    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

    chartdivid = 'div-GenerationChart';
    mode = 0;
    chartdivid = 'div-TextMessageTablechart';

    submit();


    /*
    TextMessageTable = TextMessage.LoadGridData($('#txtDateFrom').val(), $('#txtDateTo').val(), mode, '', '', '').value;
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + mode + '|||');
    databindtogrid = TextMessageTable.Tables[0].Rows;
    if (databindtogrid.length != 0) {
        $('#jqxgrid').show();
        $('#usagetitle').hide();
        $('#div-TextMessagechart').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
        LoadGrid();
        PiechartCommon();
    }
    else {
        $('#jqxgrid').hide();
        $('#nodata_div').html('<font color="Red">No data for text message</font>');
        $('#nodata_div').show();
        $('#nodata_div1').html('<font color="Red">No data for text message</font>');
        $('#nodata_div1').show();
        $('#usagetitle').hide();
        $('#div-TextMessagechart').hide();
    }    */

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
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Push Notification Report');
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
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
    resizegrid();
});
function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For mutually Exclusive search Criteria
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
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        if (ValidatePage('divFilter')) {
            var zip = '';
            var city = '';
            if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                var ddlCity = $('#ddlCity option:selected');
                if ($(ddlCity).attr('key') == 'CityName') {
                    city = $(ddlCity).val();
                }
                if ($(ddlCity).attr('key') == 'Zipcode') {
                    zip = $(ddlCity).val();
                }
            }

            var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
            var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

            var ddlMessageStatus = ($('#ddlMessageStatus').val() == '--Status--' || $('#ddlMessageStatus').val() == null || $('#ddlMessageStatus').val() == '') ? '' : $('#ddlMessageStatus').val();

            if ((city == '' && zip == '' && ddlMessageStatus == '')) {
                mode = 0;
            }
            else {
                mode = (city != '') ? 1 : 0;

                if (zip != '') {
                    mode = 2;
                }

                if ((city != '' || zip != '') && ddlMessageStatus != '') {
                    mode = 3;
                }
                else if (ddlMessageStatus != '') {
                    mode = 3;
                }
            }

            TextMessageTable = PushNotification.LoadGridData(dtFrom, dtTo, mode, city, zip, ddlMessageStatus).value;
            databindtogrid = TextMessageTable.Tables[0].Rows;
            $('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city + '|' + zip + '|' + ddlMessageStatus);


            if (databindtogrid.length != 0) {
                if (mode == '0') {
                    $('#jqxgrid').show();
                    $('#jqxchildgrid').hide();
                    $('#usagetitle').show();
                    $('#div-TextMessagechart').show();
                    $('#nodata_div').hide();
                    $('#nodata_div1').hide();
                }
                else {
                    $('#jqxgrid').hide();
                    $('#jqxchildgrid').show();
                    $('#usagetitle').show();
                    $('#div-TextMessagechart').show();
                    $('#nodata_div').hide();
                    $('#nodata_div1').hide();
                }
            }
            else {
                $('#jqxgrid').hide();
                $('#jqxchildgrid').hide();
                $('#nodata_div').html('<font color="Red">No Data</font>');
                $('#nodata_div').show();
                $('#nodata_div1').html('<font color="Red">No Data</font>');
                $('#nodata_div1').show();
                $('#usagetitle').hide();
                $('#div-TextMessagechart').hide();

                return;
            }

            if (mode > 0) {

                if (databindtogrid.length <= 10) { autoheightPrimary = true; }

                $('#jqxgrid').hide();
                $('#jqxchildgrid').show();
                gridid = 'jqxchildgrid';
                LoadChildGrid();
                PiechartCommon(mode);
            }
            else {
                $('#jqxgrid').show();
                $('#jqxchildgrid').hide();
                gridid = 'jqxgrid';
                PiechartCommon(mode);
                LoadGrid();

            }

            return true;
        }
        else { return false; }
    }
    catch (e) {
    }
}

