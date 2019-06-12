var Servicetable;
var startmode = 'y';
var prevMode;
var yearValue;
var databindtogrid;
TitleExport = 'servicerequest-analysis';
gridid = 'jqxgrid';
var divId = 'div-ServiceRequestchart';
var autoheightbool = false;
var autoheightPrimary = false;
var city = "", zip = "";
var ddlAccountType = "", ddlReason = "";
var isdtchanged = false;
var timedifference = '', daydifference = '';
var frommonth = 0, tomonth = 0;
var colorarraychart = new Array();
var counterhex = 0;
var countlocal = 0;

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    ServiceRequest.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function LoadGrid() {
    data = Servicetable["TblGrid"];
    autoheightPrimary = false;
    if (Servicetable["TblGrid"].length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (Servicetable["TblGrid"].length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'ServiceID' },
        { name: 'CityName' },
        { name: 'CityId', type: 'number' },
        { name: 'ZipCode' },
         { name: 'ServicerequestDate', type: 'date', datefmt: "dd/MM/YYYY" },
         { name: 'ServiceCompleteDate', type: 'date', datefmt: "dd/MM/YYYY" },
         { name: 'ContactName' },
        { name: 'Comments' },
        { name: 'Reason' },
        { name: 'Accountnumber' },
         { name: 'Status' },
         { name: 'CustomerType' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: data
    };


    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid").jqxGrid({

        width: "99%",
        autoheight: autoheightPrimary,
        height: "320",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,

        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Service ID', dataField: 'ServiceID', hidden: true },
            { text: 'Request Date', dataField: 'ServicerequestDate', cellsformat: "MM/dd/yyyy", width: '14%' },
            { text: 'Contact Name', dataField: 'ContactName', width: '16%' },
            { text: 'Reason', dataField: 'Reason', width: '19%' },
            { text: 'Status', dataField: 'Status', width: '12%' },
            { text: 'City Name', dataField: 'CityName', width: '10%' },
              { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
            { text: 'Completion Date', dataField: 'ServiceCompleteDate', cellsformat: "MM/dd/yyyy", width: '15%' },
            { text: 'Comments', dataField: 'Comments', width: '17%' },
              { text: 'Account Number', dataField: 'Accountnumber', hidden: true },
            { text: 'Customer Type', dataField: 'CustomerType', width: '14%' }
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function PiechartCommon(startmode, caseId) {
    var regionChart;
    var meterChart;
    var complianceChart;
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#time-RegionStatuschartTitle').html("<b>" + title + "</b>");
    $('#time-MeterTypeChart').html("<b>" + title + "</b>");
    $('#time-ComplianceChart').html("<b>" + title + "</b>");

    switch (startmode) {
        case 'y':
            //Region Chart
            divId = 'div-RegionStatuschart';
            //glblSeriesSourceData["AllData"] = Servicetable["RefinedTable"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Year';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table0_Year"];
            //glblSeriesSourceData["SeriesNameKey"] = 'CityName';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table0_City"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'Completed';
            //glblSeriesSourceData["SeriesDataValueKey1"] = 'InProgress';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            RegionStatusChart(startmode, divId);

            //Meter Chart
            divId = 'div-MeterTypeChart';
            //glblSeriesSourceData["AllData"] = Servicetable["TblStacked"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Year';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table1_MeterYear"];
            //glblSeriesSourceData["SeriesNameKey"] = 'MeterType';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table1_Meter"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'TotalServiceRequest';
            //glblSeriesSourceData["SeriesDataValueKey1"] = '';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            MeterTypeChart(startmode, divId);

            //Compliance Chart
            divId = 'div-ComplianceChart';

            var jsonData = Servicetable["TblCompliance"];
            
            if (jsonData.length > 6) {
                var divwidth = jsonData.length * 150;
                $('#' + divId).attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-ComplianceChart').attr('style', 'width:' + (divwidth) + 'px!important');
            }
            else {
                $('#' + divId).attr('style', 'width:833px!important;float:left!important');
                $('#h3-ComplianceChart').attr('style', 'width:833px!important');
            }

            processed_json = new Array();
            $.map(jsonData, function (obj, i) {

                processed_json.push({
                    y: obj.Compliance,
                    name: obj.Year
                });
            });

            BindhighChartLineLocal('line', divId, "#3333ff", "Compliance (%)");

            break;
        case 'm':
            //Region Chart
            divId = 'div-RegionStatuschart';
            //glblSeriesSourceData["AllData"] = Servicetable["RefinedTable"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Month';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table0_Year"];
            //glblSeriesSourceData["SeriesNameKey"] = 'CityName';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table0_City"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'Completed';
            //glblSeriesSourceData["SeriesDataValueKey1"] = 'InProgress';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            RegionStatusChart(startmode, divId);

            //Meter Chart
            divId = 'div-MeterTypeChart';
            //glblSeriesSourceData["AllData"] = Servicetable["TblStacked"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Month';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table1_MeterMonth"];
            //glblSeriesSourceData["SeriesNameKey"] = 'MeterType';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table1_Meter"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'TotalServiceRequest';
            //glblSeriesSourceData["SeriesDataValueKey1"] = '';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            MeterTypeChart(startmode, divId);

            //Compliance Chart
            divId = 'div-ComplianceChart';
            processed_json = new Array();
            var jsonData = Servicetable["TblCompliance"];
            if (jsonData.length > 6) {
                var divwidth = jsonData.length * 90;
                $('#' + divId).attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-ComplianceChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
            }
            else {
                $('#' + divId).attr('style', 'width:833px!important');
                $('#h3-ComplianceChart').attr('style', 'width:833px!important');
            }
            processed_json = new Array();
            $.map(jsonData, function (obj, i) {

                processed_json.push({
                    y: obj.Compliance,
                    name: (obj.Month + ' - ' + obj.Year)
                });
            });

            BindhighChartLineLocal('line', divId, "#3333ff", "Compliance (%)");
            break;
        case 'd':
            //Region Chart
            divId = 'div-RegionStatuschart';
            //glblSeriesSourceData["AllData"] = Servicetable["RefinedTable"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Month';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table0_Year"];
            //glblSeriesSourceData["SeriesNameKey"] = 'CityName';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table0_City"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'Completed';
            //glblSeriesSourceData["SeriesDataValueKey1"] = 'InProgress';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            RegionStatusChart(startmode, divId);

            //Meter Chart
            divId = 'div-MeterTypeChart';
            //glblSeriesSourceData["AllData"] = Servicetable["TblStacked"];
            //glblSeriesSourceData["SeriesDataKey"] = 'Day';
            //glblSeriesSourceData["SeriesDataKeyArray"] = Servicetable["Table1_MeterDay"];
            //glblSeriesSourceData["SeriesNameKey"] = 'MeterType';
            //glblSeriesSourceData["SeriesNameArray"] = Servicetable["Table1_Meter"];
            //glblSeriesSourceData["SeriesDataValueKey"] = 'TotalServiceRequest';
            //glblSeriesSourceData["SeriesDataValueKey1"] = '';
            //loadSeries();//Loading Series array from Above Initialized Data;
            //isStacking = true;
            //StackedColumnChart('column', divId);
            MeterTypeChart(startmode, divId);

            //Compliance Chart
            divId = 'div-ComplianceChart';
            processed_json = new Array();
            var jsonData = Servicetable["TblCompliance"];
            if (jsonData.length > 6) {
                var divwidth = jsonData.length * 90;
                $('#' + divId).attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-ComplianceChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
            }
            else {
                $('#' + divId).attr('style', 'width:833px!important');
                $('#h3-ComplianceChart').attr('style', 'width:833px!important');
            }
            processed_json = new Array();
            $.map(jsonData, function (obj, i) {

                processed_json.push({
                    y: obj.Compliance,
                    name: obj.Day
                });
            });

            BindhighChartLineLocal('line', divId, "#3333ff", "Compliance (%)");
            break;
        default: break;
    }

    //if (piechart.Rows.length > 0) {
    //    $('#div-ServiceRequestchart').show();
    //    $('#nodata_div').hide();
    //    $('#nodata_div1').hide();
    //}
    //else {
    //    $('#nodata_div').show();
    //    $('#nodata_div1').show();
    //    $('#nodata_div').html('<font color="Red">No data for Service Report</font>');
    //    $('#nodata_div1').html('<font color="Red">No data for Service Report</font>');
    //    $('#div-Servicechart').hide();
    //    $('#ServiceRequestTitle').hide();
    //}
    SetImages(startmode);
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#ServiceRequestTitle').html(title);
    //$('#chartDiv').show();
    //$('#graphDiv').hide();
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    //$('#txtDateFrom').val('1/1/2013');
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
    $('#hdnParamValues').val(startmode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||');//added a | for reason
    //databindtogrid = Servicetable.Tables[4].Rows;
    databindtogrid = Servicetable;
    //LoadGrid(Servicetable["TblGrid"]);we
    LoadGrid();
    PiechartCommon(startmode);
    //createmap(Servicetable);
    //LoadGrid(Servicetable["TblGrid"]);
    $('#chartDiv').show();
    $('#graphDiv').hide();
    $('#btnFilter').click(function () {
        submit();
    });

    $("#excelExportServiceRequest").click(function () {
        $("#" + gridid).jqxGrid('exportdata', 'xls', 'Service Request Analysis');
    });
});

function submit() {
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();

    if (!isDate(startDate)) {
        alert('Invalid From date format,Please select/enter MM/DD/YYYY.');
        $('#txtDateFrom').focus();
        return false;
    }

    if (!isDate(endDate)) {
        alert('Invalid To Date format,Please select/enter MM/DD/YYYY. ');
        $('#txtDateTo').focus();
        return false;
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
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();

    // Start-Maintain startmode based on date selection
    frommonth = new Date(dtFrom).getMonth + 1;
    tomonth = new Date(dtTo).getMonth + 1;
    timedifference = Math.abs((new Date(dtTo).getTime()) - (new Date(dtFrom).getTime()));
    daydifference = Math.ceil(timedifference / (1000 * 3600 * 24));
    if (daydifference > 365)
        startmode = 'y';
    else if (frommonth == tomonth)
        startmode = 'd';
    else if (frommonth != tomonth)
        startmode = 'm';
    // End-Maintain startmode based on date selection

    //Servicetable = ServiceRequest.GetData(startmode, dtFrom, dtTo, city, zip, ddlAccountType, ddlReason).value;
    Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, dtFrom, dtTo, city, zip, ddlAccountType, ddlReason).value);

    //for pdf
    $('#hdnParamValues').val(startmode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + ddlReason);
    databindtogrid = Servicetable;
    //databindtogrid = Servicetable.Tables[4].Rows;

    //if (mode == '1') {
    //    $('#jqxgrid').show();
    //    $('#jqxchildgrid').hide();
    //    LoadGrid();
    //    gridid = 'jqxgrid';
    //}
    //else {
    //    $('#jqxgrid').hide();
    //    $('#jqxchildgrid').show();
    //    LoadChildGrid();
    //    gridid = 'jqxchildgrid';
    //}
    if (Servicetable["TblGrid"].length == 0) {
        $('#jqxgrid').hide();
        //$('#jqxchildgrid').hide();
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No data</font>');
    }
    PiechartCommon(startmode);
    LoadGrid();
    createmap(Servicetable);
}

function DrillDown(name, x, y, seriesname) {
    prevmode = startmode;
    var date = new Date();
    if (startmode == 'd')
    { return false; }
    else if (startmode == 'y') {
        startmode = 'm';
        $('#txtDateFrom').val('1/1/' + name);
        $('#txtDateTo').val('12/31/' + name);
        yearValue = name;
    }
    else if (startmode == 'm') {
        startmode = 'd';
        if (name.indexOf('-') != -1) {
            var stringArray = name.split("-");
            $('#txtDateFrom').val(getMonthValue(stringArray[0].trim()) + '/1/' + stringArray[1].trim());
            $('#txtDateTo').val(getMonthValue(stringArray[0].trim()) + '/' + getDayValue(stringArray[0].trim(), stringArray[1].trim()) + '/' + stringArray[1].trim());
        }
        else {
            $('#txtDateFrom').val(getMonthValue(name) + '/1/' + yearValue);
            $('#txtDateTo').val(getMonthValue(name) + '/' + getDayValue(name, yearValue) + '/' + yearValue);
        }
    }

    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();
    Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlAccountType, ddlReason).value);
    PiechartCommon(startmode);
    LoadGrid();
    createmap(Servicetable);
    $('#hdnParamValues').val(startmode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + ddlReason);
    databindtogrid = Servicetable;
}


//code for excel download
$("#excelExportServiceRequest").click(function () {
    $("#" + gridid).jqxGrid('exportdata', 'xls', 'Service Request Analysis');//renamed title here
});

$('.chartback').click(function () {
    var date = new Date();
    if (startmode == 'd') {
        startmode = 'm';
        $('.chartback').attr('title', 'Back to yearly');
        $('#txtDateFrom').val('1/1/' + yearValue);
        $('#txtDateTo').val('12/31/' + yearValue);
        //Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
        //PiechartCommon(startmode);
        //LoadGrid();
        //createmap(Servicetable);
    }
    else if (startmode == 'm') {
        startmode = 'y';
        $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
        $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
        //Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
        //PiechartCommon(startmode);
        //LoadGrid();
        //createmap(Servicetable);
        $('.chartback').css('display', 'none');
    }
    else if (startmode == 'y') {
        return false;
    }

    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();
    Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlAccountType, ddlReason).value);
    PiechartCommon(startmode);
    LoadGrid();
    createmap(Servicetable);
    $('#hdnParamValues').val(startmode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + ddlReason);
    databindtogrid = Servicetable;
    //if (hdnYear != 0) {
    //    if ((hdnMonth != undefined && hdnMonth != '' && hdnMonth != null)) {
    //        hdnMonth = "";
    //        startmode = "m";
    //        $('.chartback').attr('title', 'Back to yearly');
    //        $('#txtDateFrom').val('1/1/' + hdnYear);
    //        $('#txtDateTo').val('12/31/' + hdnYear);
    //        Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
    //        LoadGrid(Servicetable["TblGrid"]);
    //        PiechartCommon(startmode);
    //    }
    //    else {
    //        hdnMonth = "";
    //        hdnYear = 0;
    //        startmode = "y";
    //        $('#txtDateFrom').val('1/1/2013');
    //        $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    //        Servicetable = $.parseJSON(ServiceRequest.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
    //        LoadGrid(Servicetable["TblGrid"]);
    //        PiechartCommon(startmode);
    //        //$('.chartback').attr('title', 'Back to monthly');
    //        $('.chartback').css('display', 'none');
    //    }
    //}

});

$('.imgtoggle').click(function () {

    $('.content').slideToggle('slow');
    var oldSrc = $('.imgtoggle').attr('src');
    var minusImg = "..\\images\\ArrowsMinus.png";
    var plusImg = "..\\images\\ArrowsPlus.png";
    oldSrc = oldSrc == minusImg ? plusImg : minusImg;
    $('.imgtoggle').attr('src', oldSrc);
});

function showLegendsbyStatus(statusTable)
{
    $('#greenBox').hide();
    $('#CompleteID').hide();
    $('#orangeBox').hide();
    $('#ProgessID').hide();
    counterhex = 0;
    countlocal = 0;
    var dataarr = new Array();
    if (statusTable.length > 0) {       
        $.each(statusTable, function (i, v) {
            counterhex = 0;
            if (statusTable[i].Status == "Completed") {
                $('#greenBox').show();
                $('#CompleteID').show();
                dataarr.push("#greenBox");
                colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                counterhex++;
                countlocal++;
            }
            else
                counterhex++;
            if (statusTable[i].Status == "In Progress") {
                $('#orangeBox').show();
                $('#ProgessID').show();
                dataarr.push("#orangeBox");
                colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
            }
        });
        //$.each(dataarr, function (i, v) {
        //    $(dataarr[i]).css({ "background-color": coloranalyticsHEX[i] });
        //});
    }
}

function showLegendsbyMeterType(meterType)
{
    try
    {
        $('#elecBox').hide();
        $('#elecBoxID').hide();
        $('#evBox').hide();
        $('#evBoxID').hide();
        $('#gasBox').hide();
        $('#gasBoxID').hide();
        $('#solarBox').hide();
        $('#solarBoxID').hide();
        $('#waterBox').hide();
        $('#waterBoxID').hide();
        //counterhex = 0;
        countlocal = 0;
        var dataarr = new Array();    
        if (meterType.length > 0) {
            $.each(meterType, function (i, v) {
                counterhex = 0;
                if (meterType[i].ServiceName == "Electric") {
                    $('#elecBox').show();
                    $('#elecBoxID').show();
                    dataarr.push("#elecBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (meterType[i].ServiceName == "Electric Vehicle") {
                    $('#evBox').show();
                    $('#evBoxID').show();
                    dataarr.push("#evBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (meterType[i].ServiceName == "Gas") {
                    $('#gasBox').show();
                    $('#gasBoxID').show();
                    dataarr.push("#gasBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (meterType[i].ServiceName == "Solar") {
                    $('#solarBox').show();
                    $('#solarBoxID').show();
                    dataarr.push("#solarBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (meterType[i].ServiceName == "Water") {
                    $('#waterBox').show();
                    $('#waterBoxID').show();
                    dataarr.push("#waterBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                }
            });      
            //$.each(dataarr, function (i, v) {
            //    $(dataarr[i]).css({ "background-color": coloranalyticsHEX[i] });
            //    $(dataarr[i]).show();
            //    $(dataarr[i] + "ID").show();
               
            //});
        }
    }
    catch (e) {        
    }
} 
function RegionStatusChart(startmode, divId) {
    var regionstatusChartTable, regionTable, periodTable, statusTable;
    regionstatusChartTable = Servicetable["TblStackedGroup"];
    periodTable = Servicetable["Table0_Year"];
    regionTable = Servicetable["Table0_CityZip"];
    statusTable = Servicetable["Table0_Status"];
    showLegendsbyStatus(statusTable);
    var regionArray, categories;
    chart1 = new Array();
    var seriesname = '';

    regionArray = new Array();
    categories = new Array();
    
    switch (startmode) {
        case 'y':
            $.map(periodTable, function (obj, i) {
                categories.push({
                    name: obj.Year,
                    categories: regionArray
                });
            });
            seriesname = 'Year';
            break;
        case 'm':
            $.map(periodTable, function (obj, i) {
                categories.push({
                    name: obj.Month + '-' + obj.Year,
                    categories: regionArray
                });
            });
            seriesname = 'Month';
            break;
        case 'd':
            $.map(periodTable, function (obj, i) {
                categories.push({
                    name: obj.Day,
                    categories: regionArray
                });
            });
            seriesname = 'Day';
            break;
    }

    $.map(regionTable, function (obj, i) {
        //if(regionTable.length*categories.length > 6)
        //    regionArray.push(obj.CityName + '<br/>' + obj.ZipCode);
        //else
            regionArray.push(obj.CityName + ' ' + obj.ZipCode);
    });

    $.map(statusTable, function (statusObj, i) {
        var arr = new Array();

        $.map(periodTable, function (periodObj, i) {
            $.map(regionTable, function (regionObj, i) {
                var categoryFound = false;
                $.map(regionstatusChartTable, function (regionstatusObj, i) {
                    switch (startmode) {
                        case 'y':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (regionstatusObj.CityName + '-' + regionstatusObj.ZipCode)) && (periodObj.Year == regionstatusObj.Year)
                                && statusObj.Status == regionstatusObj.Status) {

                                categoryFound = true;
                                arr.push(regionstatusObj.TotalRequest);
                            }
                            break;
                        case 'm':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (regionstatusObj.CityName + '-' + regionstatusObj.ZipCode)) && (periodObj.Month + '-' + periodObj.Year == regionstatusObj.Month + '-' + regionstatusObj.Year)
                                && statusObj.Status == regionstatusObj.Status) {

                                categoryFound = true;
                                arr.push(regionstatusObj.TotalRequest);
                            }
                            break;
                        case 'd':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (regionstatusObj.CityName + '-' + regionstatusObj.ZipCode)) && (periodObj.Day == regionstatusObj.Day)
                                && statusObj.Status == regionstatusObj.Status) {

                                categoryFound = true;
                                arr.push(regionstatusObj.TotalRequest);
                            }
                            break;
                    }
                });

                if (categoryFound == false) {
                    arr.push(0);
                }
            });
        });

        chart1.push({
            name: statusObj.Status,
            data: arr,
            color: colorarraychart[i]
        });
    });

    if (regionArray.length * categories.length > 6) {
        var colcount = regionArray.length * categories.length;
        var divwidth = colcount * 150;
        $('#' + divId).attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-RegionStatuschart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#' + divId).attr('style', 'width:833px!important;float:left!important');
        $('#h3-RegionStatuschart').attr('style', 'width:833px!important');
    }

    var title = '';
    BindStackedGroupedColumnSeriesLocal(divId, chart1, seriesname, categories, title, "Total Requests");
    
}

function MeterTypeChart(startmode, divId) {
    var meterTypeChartTable, periodTable, meterTypeTable;
    meterTypeChartTable = Servicetable["TblStacked"];
    periodTable = Servicetable["Table1_MeterYear"];
    meterTypeTable = Servicetable["Table1_Meter"];
    
    showLegendsbyMeterType(meterTypeTable);
    var categories;
    chart1 = new Array();
    var seriesname = '';

    categories = new Array();
    switch (startmode) {
        case 'y':
            $.map(periodTable, function (obj, i) {
                categories.push(obj.Year);
            });
            break;
        case 'm':
            $.map(periodTable, function (obj, i) {
                categories.push(obj.Month + ' - ' + obj.Year);
            });
            break;
        case 'd':
            $.map(periodTable, function (obj, i) {
                categories.push(obj.Day);
            });
            break;
    }

    $.map(meterTypeTable, function (meterTypeObj, i) {
        var arr = new Array();

        $.map(periodTable, function (periodObj, i) {
            var categoryFound = false;
            $.map(meterTypeChartTable, function (meterTypeChartObj, i) {
                switch (startmode) {
                    case 'y':
                        if ((periodObj.Year == meterTypeChartObj.Year) && meterTypeObj.MeterType == meterTypeChartObj.MeterType) {

                            categoryFound = true;
                            arr.push(meterTypeChartObj.TotalServiceRequest);
                        }
                        break;
                    case 'm':
                        if (((periodObj.Month + '-' + periodObj.Year) == (meterTypeChartObj.Month + '-' + meterTypeChartObj.Year)) && meterTypeObj.MeterType == meterTypeChartObj.MeterType) {

                            categoryFound = true;
                            arr.push(meterTypeChartObj.TotalServiceRequest);
                        }
                        break;
                    case 'd':
                        if ((periodObj.Day == meterTypeChartObj.Day) && meterTypeObj.MeterType == meterTypeChartObj.MeterType) {

                            categoryFound = true;
                            arr.push(meterTypeChartObj.TotalServiceRequest);
                        }
                        break;

                }
            });

            if (categoryFound == false) {
                arr.push(0);
            }
        });

        chart1.push({
            name: meterTypeObj.ServiceName,
            data: arr,
            color: colorarraychart[i]
        });
    });

    if (categories.length > 6) {
        var divwidth = categories.length * 140;
        $('#' + divId).attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-MeterTypeChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#' + divId).attr('style', 'width:833px!important;float:left!important');
        $('#h3-MeterTypeChart').attr('style', 'width:833px!important');
    }

    var title = '';
    BindStackedColumnSeriesLocal(divId, chart1, seriesname, categories, title, "Total Requests");
}

//This function is used to show grouped and stacked column charts
function BindStackedGroupedColumnSeriesLocal(id, dataseries, seriesname, categories, title, yaxistext) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            title: {
                style: {
                    'fontSize': '1em'
                },
                useHTML: true,
                x: -27,
                y: 8,
                text: '<span class="chart-title">' + title + '</span>'
            },
            plotOptions: {
                series: {
                    pointWidth: 38,
                    cursor: 'pointer',
                    showInLegend: false,
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.category.parent.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            if (this.y != 0) {
                                return this.y;
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: yaxistext,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Request Region & Period: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Request Status: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Request Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                }
            }
        });
    }
    catch (err) {
    }
}

//This function is used to create stacked column chart
function BindStackedColumnSeriesLocal(id, dataseries, seriesname, categories, title, yaxistext) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    pointWidth: 40,
                    cursor: 'pointer',
                    showInLegend: false,
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.category.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            if (this.y != 0) {
                                return this.y;
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories,
                labels: {
                    rotation: -45,
                    style: {
                        color: '#333333',
                        margin: "-20px",
                        fontSize: '10px',
                    }
                },
            },
            yAxis: {
                title: {
                    text: yaxistext,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Request Period: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Meter Type: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Request Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                }
            }
        });
    }
    catch (err) {
    }
}

function BindhighChartLineLocal(type, id, seriescolor, yaxistext, seriesname) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        title: {
            text: ''
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            //min: 0,
            title: {
                text: yaxistext,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '3px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            },
            type: "category",
            name: '',
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<tr><td style="color: {series.color}">Request Period: </td>' +
                                '<td style="text-align: right"><b>{point.key} </b></td></tr>' + '</br>',
            pointFormat:    '<tr><td style="color: {series.color}">Compliance %: </td>' +
                                '<td style="text-align: right"><b>{point.y} </b></td></tr>'
        },
        plotOptions: {
            series: {
                pointWidth: 18,
                point: {
                    cursor: 'pointer',
                    events: {
                        click: function () {
                            DrillDown(this.name, this.x, this.y, seriesname);
                        }
                    }
                }
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            data: processed_json,
            showInLegend: false,
            color: seriescolor
        }]
    });
}
