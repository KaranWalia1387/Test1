var ElectricTable;
var startmode = 'y';
var prevMode;
var yearValue;
var databindtogrid;
TitleExport = 'ElectricUsageAnalysis-analysis';
gridid = 'jqxgrid';
var divId = '';
var chart1, dayFrom, dayTo, monthstartDate, monthendDate;
var autoheightbool = false;
var autoheightPrimary = false;
var dtFrom = '', dtTo = '', city = '', zip = '',ddlUsageTime = '', ddlAccountType = '', custName = '', hourType = 'A', dayType = 'A';
var showweek = true;
var showpeak = true;
var monthFrom, monthTo;
var dayFrom, dayTo;
var hourDay;
var timedifference = '', daydifference = '';
var frommonth = 0, tomonth = 0;

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    ElectricUsageAnalysis.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

$('.imgtoggle').click(function () {

    $('.content').slideToggle('slow');
    var oldSrc = $('.imgtoggle').attr('src');
    var minusImg = "..\\images\\ArrowsMinus.png";
    var plusImg = "..\\images\\ArrowsPlus.png";
    oldSrc = oldSrc == minusImg ? plusImg : minusImg;
    $('.imgtoggle').attr('src', oldSrc);
});

function LoadGrid() {
    data = ElectricTable.Tables[5];
    autoheightPrimary = false;
    if (data.Rows.length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (data.Rows.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'CityName' },
        { name: 'ZipCode', type: 'number' },
        { name: 'CustomerId' },
        { name: 'CustomerName' },
        { name: 'TotalUsage',type:'text' },
         //{ name: 'Status' },
         //{ name: 'CustomerType' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: data.Rows
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
             { text: 'Customer Name', dataField: 'CustomerName', width: '29%' },//set customer name to column 1
            { text: 'City Name', dataField: 'CityName', width: '25%' },
              { text: 'Zip Code', dataField: 'ZipCode', width: '23%' },
            { text: 'Total Usage(kWh)', dataField: 'TotalUsage', width: '23%' },
              { text: 'CustomerId', dataField: 'CustomerId', hidden: true },
            //{ text: 'Status', dataField: 'Status', width: '12%' },
            //{ text: 'Customer Type', dataField: 'CustomerType', width: '14%' }
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}


//function call for all charts
function Piechartcommon(startmode) {
    try {
        var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
        $('#time-WeekendWeekDayChart').html("<b>" + title + "</b>");
        $('#time-PeakNonPeakChart').html("<b>" + title + "</b>");
        $('#time-TopCustomerChart').html("<b>" + title + "</b>");
        $('#time-TotalUsageChart').html("<b>" + title + "</b>");
        $('#time-TrendChart').html("<b>" + title + "</b>");
        if(showweek)
            PiechartWeek(startmode);
        if (showpeak)
            PiechartPeak(startmode);
        PiechartTrend(startmode);
        TopUsageChart(startmode);
        BarchartUsage(startmode);
        SetImages(startmode);
        //$("#div-TopCustomerChart").width('100%');
        //$("#div-TotalUsageChart").width('100%');
        //$("#div-TrendChart").width('100%');
        
    }
    catch (ex) { }
}


//for weekend-weekday data
function PiechartWeek(startmode, caseId) {
    try {
        //if (ElectricTable.Tables[0].Rows.length > 0) {
        //    var jsonData = ElectricTable.Tables[0].Rows;
        //    processed_json = new Array();

        //    $.map(jsonData, function (obj, i) {
        //        processed_json.push({
        //            y: obj.TotalUsage,
        //            name: obj.Weekend_Weekday,
        //            color: colorarrHEX[i+2],
        //            title: obj.Weekend_Weekday + "-" + 'Usage(Kwh)'
        //        });
        //    });
        //    BindPieChartLocal('div-WeekendWeekDayChart', 'Count');

            //2nd pie chart
            //processed_json = new Array();
            //$.map(jsonData, function (obj, i) {
            //    if (obj.Weekend_Weekday == "Weekend") {
            //        processed_json.push({
            //            y: obj.TotalUsage,
            //            name: obj.Weekend_Weekday,
            //            color: colorarrHEX[i],
            //            title: obj.Weekend_Weekday + "-" + 'Usage'
            //        });
            //    }
            //});
            //BindPieChart('div-WeekEndchart', 'Count');
        // }
        var weekEndDayChartTable;
        weekEndDayChartTable = ElectricTable.Tables[0];

        chart1 = new Array();
        var seriesname = '';
        var seriesType = 'Day';
        $.map(weekEndDayChartTable.Rows, function (obj, i) {
            var name = '';
            switch (startmode) {
                case 'y':
                    name = obj.Weekend_Weekday;
                    seriesname = 'Year';
                    break;
                case 'm':
                    name = obj.Weekend_Weekday;
                    seriesname = 'Month';
                    break;
                case 'd':
                    name = obj.Weekend_Weekday;
                    seriesname = 'Day';
                    break;
                case 'h':
                    name = obj.Weekend_Weekday;
                    seriesname = 'Hour';
                    break;
            }
            chart1.push({
                name: name,
                y: obj.TotalUsage,
                color: colorarrHEX[i + 2],
            });
        });

        var title = 'Weekend/Weekday Analysis';
        var toolTipArray = ['Day Type: ', 'Electric Usage (kWh): '];
        BindPieChartLocal('div-WeekendWeekDayChart', chart1, seriesname, title, seriesType,toolTipArray);
    }
    catch (ex)
    { }
}


//for peak,non-peak data 
function PiechartPeak(startmode, caseId) {
    try {
        //if (ElectricTable.Tables[1].Rows.length > 0) {
        //    var jsonData = ElectricTable.Tables[1].Rows;
        //    processed_json = new Array();

        //    $.map(jsonData, function (obj, i) {
        //        processed_json.push({
        //            y: obj.TotalUsage,
        //            name: obj.Peak_NonPeakHour,
        //            color: colorarrHEX[i+4],
        //            title: obj.Peak_NonPeakHour + "-" + 'Usage(Kwh)'
        //        });

        //    });
        //    BindPieChartLocal('div-PeakNonPeakChart', 'Count');

        //    //2nd pie chart
        //    //processed_json = new Array();
        //    //$.map(jsonData, function (obj, i) {
        //    //    if (obj.Peak_NonPeakHour == "NonPeakHour") {
        //    //        processed_json.push({
        //    //            y: obj.TotalUsage,
        //    //            name: obj.Peak_NonPeakHour,
        //    //            color: colorarrHEX[i],
        //    //            title: obj.Peak_NonPeakHour + "-" + 'Usage'
        //    //        });
        //    //    }
        //    //});
        //    //BindPieChart('div-NonPeakChart', 'Count');
        //}
        var peakNonPeakChartTable;
        peakNonPeakChartTable = ElectricTable.Tables[1];

        chart2 = new Array();
        var seriesname = '';
        var seriesType = 'Hour';
        $.map(peakNonPeakChartTable.Rows, function (obj, i) {
            var name = '';
            switch (startmode) {
                case 'y':
                    name = obj.Peak_NonPeakHour;
                    seriesname = 'Year';
                    break;
                case 'm':
                    name = obj.Peak_NonPeakHour;
                    seriesname = 'Month';
                    break;
                case 'd':
                    name = obj.Peak_NonPeakHour;
                    seriesname = 'Day';
                    break;
                case 'h':
                    name = obj.Peak_NonPeakHour;
                    seriesname = 'Hour';
                    break;
            }
            chart2.push({
                name: name,
                y: obj.TotalUsage,
                color: colorarrHEX[i + 4],
            });
        });

        var title = 'Peak/NonPeak Analysis';
        var toolTipArray = ['Hour Type: ', 'Electric Usage (kWh): '];
        BindPieChartLocal('div-PeakNonPeakChart', chart2, seriesname, title, seriesType, toolTipArray);
    }
    catch (ex)
    { }
}


//for line chart  Electric Usage Trends by location
function PiechartTrend(startmode, caseId) {
    try {
        var MainTable, regionTable, categoryTable;
        MainTable = ElectricTable.Tables[4];    //table coming from db
        regionTable = ElectricTable.Tables[6];  //dtTrendTable
        categoryTable = ElectricTable.Tables[7];    //dtTrendYear

        if (MainTable.Rows.length > 0) {

            chart1 = new Array();
            $.map(regionTable.Rows, function (regionobj, i) {
                var arr = new Array();
                switch (startmode) {
                    case 'y':
                        $.map(categoryTable.Rows, function (catobj, i) {
                            var categoryFound = false;

                            $.map(MainTable.Rows, function (obj, i) {
                                if (obj.ZipCode == regionobj.ZipCode) {

                                    if (catobj.Year == obj.Year) {
                                        categoryFound = true;
                                        arr.push({
                                            name: obj.Year,
                                            y: obj.TotalUsage,
                                            title: obj.CityName + obj.ZipCode
                                        });
                                    }
                                }
                            });

                            if (categoryFound == false) {
                                arr.push({
                                    name: catobj.Year,
                                    y: 0,
                                    title: regionobj.CityName + regionobj.ZipCode
                                });
                            }
                        });
                        seriesname = 'Year';

                        break;
                    case 'm':
                        $.map(categoryTable.Rows, function (catobj, i) {
                            var categoryFound = false;
                            $.map(MainTable.Rows, function (obj, i) {
                                if (obj.ZipCode == regionobj.ZipCode) {

                                    if ((catobj.Month + '-' + catobj.Year) == (obj.Month + '-' + obj.Year)) {
                                        categoryFound = true;

                                        arr.push({
                                            name: obj.Month + '-' + obj.Year,
                                            y: obj.TotalUsage,
                                            title: obj.CityName + '-' + obj.ZipCode
                                        });
                                    }
                                }
                            });

                            if (categoryFound == false) {
                                arr.push({
                                    name: catobj.Month + '-' + catobj.Year,
                                    y: 0,
                                    title: regionobj.CityName + regionobj.ZipCode
                                });
                            }
                        });
                        seriesname = 'Month';
                        break;
                    case 'd':
                        $.map(categoryTable.Rows, function (catobj, i) {
                            var categoryFound = false;

                            $.map(MainTable.Rows, function (obj, i) {
                                if (catobj.Day == obj.Day) {
                                    categoryFound = true;

                                    if (obj.ZipCode == regionobj.ZipCode) {
                                        arr.push({
                                            name: obj.Day,
                                            y: obj.TotalUsage,
                                            title: obj.CityName + obj.ZipCode
                                        });
                                    }
                                }
                            });

                            if (categoryFound == false) {
                                arr.push({
                                    name: catobj.Day,
                                    y: 0,
                                    title: regionobj.CityName + regionobj.ZipCode
                                });
                            }
                        });
                        seriesname = 'Day';
                        break;
                    default: break;
                }

                chart1.push({
                    name: regionobj.CityName + '-' + regionobj.ZipCode,
                    showInLegend: true,
                    color: coloranalyticsHEX[i],
                    data: arr,
                });
            });
            //var title = 'Electric Usage Analysis';
            var title = '';
            if (categoryTable.Rows.length > 4) {
                var divwidth = categoryTable.Rows.length * 250;
                $('#div-TrendChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-TrendChart').attr('style', 'width:' + (divwidth) + 'px!important');
            }
            else {
                $('#div-TrendChart').attr('style', 'width:833px!important;float:left!important');
                $('#h3-TrendChart').attr('style', 'width:833px!important');
            }

            BindLineSeries('div-TrendChart', chart1, seriesname, title);
        }
    }
    catch (ex)
    { }
}


//Top Customers By Electric Usage i.e residential and commercial
function TopUsageChart(startmode, caseId) {
    try {
        var MainTableUsage, YearlyUsage, TopUsageRegionTable, AccountTypeTable;
        MainTableUsage = ElectricTable.Tables[3];
        AccountTypeTable = ElectricTable.Tables[8];//dtAccountTypeTable        

        var chart2 = new Array();
        var tempArray = new Array();
        var tempUsageTbl = new Array();
        var categories = new Array();
        var seriesname = '';

        if (MainTableUsage.Rows.length > 0) {

            //$.map(MainTableUsage.Rows, function (obj, i) {
            //    tempArray.push(obj.CustomerName);
            //    tempUsageTbl.push(obj.TotalUsage);
            //});

            //$.map(AccountTypeTable.Rows, function (Accountobj, i) {
            //    if (Accountobj.CustomerType == "Residential") {
            //        categories.push({
            //            name: Accountobj.CustomerType,
            //            categories: tempArray
            //        });
            //    }
            //    else if (Accountobj.CustomerType == "Commercial") {
            //        categories.push({
            //            name: Accountobj.CustomerType,
            //            categories: tempArray
            //        });
            //    }
            //    chart2.push({
            //        data: tempUsageTbl,
            //        name: seriesname
            //    })
            //});

            $.map(AccountTypeTable.Rows, function (Accountobj, i) {
                tempArray = new Array();
                $.map(MainTableUsage.Rows, function (obj, i) {
                    if (Accountobj.CustomerType == obj.CustomerType) {
                        tempArray.push(obj.CustomerName);
                        tempUsageTbl.push({
                            color: colorarrHEX[i],
                            y: obj.TotalUsage
                        });
                    }
                });
                categories.push({
                    name: Accountobj.CustomerType,
                    categories: tempArray
                });
                chart2.push({
                    name: seriesname,
                    data: tempUsageTbl,
                    showInLegend: false,
                    color: coloranalyticsHEX[i]
                });
            });
            
            //var title = 'Top Electric Usage analysis';

            if (AccountTypeTable.Rows.length > 10) {
                var divwidth = AccountTypeTable.Rows.length * 100;
                $('#div-TotalUsageChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-TotalUsageChart').attr('style', 'width:' + (divwidth) + 'px!important');
            }
            else {
                $('#div-TotalUsageChart').attr('style', 'width:833px!important;float:left!important');
                $('#h3-TotalUsageChart').attr('style', 'width:833px!important');
            }
            var title = '';
            BindColumnGroup('div-TotalUsageChart', chart2, seriesname, categories, title);
        }
    }
    catch (ex)
    { }
}


//Electric Usage using drilldown
function BarchartUsage(startmode, caseId) {
    try {
        if (ElectricTable.Tables[2].Rows.length > 0) {
            var jsonData = ElectricTable.Tables[2].Rows;
            var seriesname, name, chart3;
            chart3 = new Array();

            $.map(jsonData, function (obj, i) {
                switch (startmode) {
                    case 'y':
                        name = obj.Year;
                        seriesname = 'Year';
                        break;
                    case 'm':
                        name = obj.Month + '-' + obj.Year;
                        seriesname = 'Month';
                        break;
                    case 'd':
                        name = obj.Day;
                        seriesname = 'Day';
                        break;
                    case 'h':
                        name = obj.Hourly;
                        seriesname = 'Hour';
                        break;
                }
                chart3.push({
                    name: name,
                    y: obj.TotalUsage,
                    color: "#F8A13F"
                })
            });
            //var title = "Total Electric Usage";
            var title = '';//title removed as given in issue sheet
            var nameTooltip = '';

            if (jsonData.length > 3) {
                var divwidth = jsonData.length * 200;
                $('#div-TopCustomerChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
                $('#h3-TopCustomerChart').attr('style', 'width:' + (divwidth) + 'px!important');
            }
            else {
                $('#div-TopCustomerChart').attr('style', 'width:833px!important;float:left!important');
                $('#h3-TopCustomerChart').attr('style', 'width:833px!important');
            }
            BindColumnSeriesDrilldown("div-TopCustomerChart", chart3, seriesname, title, nameTooltip);
        }
    }
    catch (ex)
    { }
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    //var prevDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 1);
    //$('#txtDateFrom').val('1/1/2013');
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    ElectricTable = (ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '','','').value);
    //ElectricTable = $.parseJSON(ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
    $('#hdnParamValues').val(startmode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||');
    databindtogrid = ElectricTable;
    LoadGrid();
    showweek = true;
    showpeak = true;
    Piechartcommon(startmode);
    $('#chartDiv').show();
    $('#graphDiv').hide();
    $('#btnFilter').click(function () {
        submit();
    });

    //code for excel download
    $("#btnExcelExport").click(function () {
        $("#" + gridid).jqxGrid('exportdata', 'xls', 'Electric Usage Analysis');
    });
});

function submit() {
    try {
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

        //if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        //    var ddlCity = $('#ddlCity option:selected');
        //    if ($(ddlCity).attr('key') == 'CityName') {
        //        city = $(ddlCity).val();
        //    }
        //    if ($(ddlCity).attr('key') == 'Zipcode') {
        //        zip = $(ddlCity).val();
        //    }
        //}
        //dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        //dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        //ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        //custName = ($('#txtCustomerName').val() == null || $('#txtCustomerName').val() == '') ? '' : $('#txtCustomerName').val();
        //ddlUsageTime = ($('#ddlUsageTime').val() == null || $('#ddlUsageTime').val() == '') ? '' : $("#ddlUsageTime option:selected").text();

        //if (ddlUsageTime == '') {
        //    hourType = 'A';
        //} else if (ddlUsageTime == 'Peak') {
        //    hourType = 'P';
        //} else if (ddlUsageTime == 'NonPeak') {
        //    hourType = 'NP';
        //}

        //dayType = 'A';
        SetFilterValues();
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

        ElectricTable = ElectricUsageAnalysis.GetData(startmode, dtFrom, dtTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
        // ElectricTable = $.parseJSON(ElectricUsageAnalysis.GetData(startmode, dtFrom, dtTo, city, zip, ddlAccountType, custName).value);

        //for pdf
        //$('#hdnParamValues').val(startmode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + custName + '|' + hourType + '|' + dayType);
        databindtogrid = ElectricTable;

        if (ElectricTable.Tables[5].length == 0) {
            $('#jqxgrid').hide();
            $('#nodata_div').show();
            $('#nodata_div1').show();
            $('#nodata_div').html('<font color="Red">No Data</font>');
            $('#nodata_div1').html('<font color="Red">No data</font>');
        }
        showweek = true;
        showpeak = true;
        LoadGrid();
        Piechartcommon(startmode);
    }
    catch (ex)
    { }
}

function BindLineSeries(id, dataseries, seriesname, title) {
    try {
        $('#' + id).highcharts({
            title: {
                style: {
                    'fontSize': '1em'
                },
                useHTML: true,
                x: -27,
                y: 8,
                text: '<span class="chart-title">' + title + '</span>'
            },
            yAxis: {
                title: {
                    text: 'Electric Usage (kWh)',
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                },
                min: 0,
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
                    rotation: -45,//increased as it was cluttering earlier
                    style: {
                        color: '#333333',
                        margin: "-20px",
                        fontSize: '10px',
                    }
                },
                type: "category",
                name: seriesname,
                title: {
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '3px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 18,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    style: {
                        color: '#d3d3d3',
                        fontSize: '12px',
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            if (this.y != 0) {
                                return Math.round(this.y);
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<tr><td style="color: {series.color}">Electric Usage Period:</td>' +
                                    '<td style="text-align: right"><b>{point.key} </b></td></tr>' + '</br>',
                pointFormat: '<tr><td style="color: {series.color}">Region:</td>' +
                                    '<td style="text-align: right"><b>{series.name} </b></td></tr>' + '</br>' +
                                    '<tr><td style="color: {series.color}">Electric Usage (kWh):</td>' +
                                    '<td style="text-align: right"><b>{point.y:,.0f} </b></td></tr>'
            },
            series: dataseries
        });
    }
    catch (err) {
    }
}

function BindColumnGroup(id, dataseries, seriesname, categories, title) {

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
            yAxis: {
                min: 0,
                maxPadding: 0.09,
                title: {
                    text: 'Electric Usage (kWh)'
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            if (this.y != 0) {
                                return Math.round(this.y);
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Customer & Customer Type: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Electric Usage (kWh): </td>' +
                            '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
                }
            }
        });
    }
    catch (err) {
    }
}

function BindColumnSeriesDrilldown(id, dataseries, seriesname, title, nameTooltip) {

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
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45
                }
            },
            yAxis: {
                min: 0,
                maxPadding: 0.09,
                title: {
                    text: 'Electric Usage (kWh)'
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            if (this.y != 0) {
                                return Math.round(this.y);
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            series: [{
                name: nameTooltip,
                data: dataseries,
                showInLegend: false
            }],
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Electric Usage Period: </td>' +
                            '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Electric Usage (kWh): </td>' +
                            '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
                }
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right'
            }
        });
    }
    catch (err) {
    }
}

function DrillDown(period, x, y, currentSeriesName, seriesType) {
    showweek = true;
    showpeak = true;
    SetFilterValues();
    switch (currentSeriesName) {
        case 'Year':
            startmode = 'm';
            monthFrom = '1/1/' + period;
            monthTo = '12/31/' + period;
            $('#txtDateFrom').val(monthFrom);
            $('#txtDateTo').val(monthTo);
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, monthFrom, monthTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
        case 'Month':
            startmode = 'd';
            var stringArray = period.split("-");
            var date = new Date(Date.parse(stringArray[0] + " 1, " + stringArray[1]));
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            dayFrom = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            dayTo = (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + '/' + lastDay.getFullYear();
            $('#txtDateFrom').val(dayFrom);
            $('#txtDateTo').val(dayTo);
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, dayFrom, dayTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
        case 'Day':
            startmode = 'h';
            hourDay = period;
            $('#txtDateFrom').val(hourDay);
            $('#txtDateTo').val(hourDay);
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, hourDay, hourDay, city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
    }
}

function DrillUp(name, x, y, currentSeriesName) {
    showweek = true;
    showpeak = true;
    SetFilterValues();
    switch (currentSeriesName) {
        case 'Month':
            startmode = 'y';
            $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
            $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
        case 'Day':
            startmode = 'm';
            $('#txtDateFrom').val(monthFrom);
            $('#txtDateTo').val(monthTo);
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, monthFrom, monthTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
        case 'Hour':
            startmode = 'd';
            $('#txtDateFrom').val(dayFrom);
            $('#txtDateTo').val(dayTo);
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, dayFrom, dayTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            Piechartcommon(startmode);
            break;
    }
}

function chartclick(x, y) {
    prevmode = startmode;
    showweek = true;
    showpeak = true;
    var date = new Date();
    if (startmode == 'h')
    { return false; }
    else if (startmode == 'y') {
        startmode = 'm';
        $('#txtDateFrom').val('1/1/' + x);
        $('#txtDateTo').val('12/31/' + x);
        yearValue = x;
    }
    else if (startmode == 'm') {
        startmode = 'd';
        $('#txtDateFrom').val(getMonthValue(x) + '/1/' + yearValue);
        $('#txtDateTo').val(getMonthValue(x) + '/' + getDayValue(x, yearValue) + '/' + yearValue);
    }
    else if (startmode == 'd') {
        startmode = 'h';
        $('#txtDateFrom').val(getMonthValue(x) + '/' + getDayValue(x, yearValue) + '/' + yearValue);
        $('#txtDateTo').val(getMonthValue(x) + '/' + getDayValue(x, yearValue) + '/' + yearValue);
    }
    ElectricTable = (ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '').value);
    LoadGrid();
    Piechartcommon(startmode);
}

function SetHourType(type) {
    switch (type.toLowerCase()) {
        case 'peakhour':
            hourType = 'P';
            break;
        case 'nonpeakhour':
            hourType = 'NP';
            break;
        default:
            hourType = 'A';
            break;
    }

    switch (startmode) {
        case 'y':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), $('#txtDateTo').val(), city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'm':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, monthFrom, monthTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'd':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, dayFrom, dayTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'h':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, hourDay, hourDay, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
    }
    showweek = true;
    showpeak = false;
    Piechartcommon(startmode);
}

function SetDayType(type) {
    switch (type.toLowerCase()) {
        case 'weekday':
            dayType = 'WD';
            break;
        case 'weekend':
            dayType = 'WE';
            break;
        default:
            dayType = 'A';
            break;
    }

    switch (startmode) {
        case 'y':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, $('#txtDateFrom').val(), $('#txtDateTo').val(), city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'm':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, monthFrom, monthTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'd':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, dayFrom, dayTo, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
        case 'h':
            ElectricTable = ElectricUsageAnalysis.GetData(startmode, hourDay, hourDay, city, zip, ddlAccountType, custName, hourType, dayType).value;
            break;
    }

    showweek = false;
    showpeak = true;
    Piechartcommon(startmode);
}

$('.chartback').click(function () {
    switch (startmode) {
        case 'y':
            break;
        case 'm':
            DrillUp('', '', '', 'Month');
            break;
        case 'd':
            DrillUp('', '', '', 'Day');
            break;
        case 'h':
            DrillUp('', '', '', 'Hour');
            break;
    }
});

function BindPieChartLocal(id, dataseries, seriesname, title, seriesType, tooltipArray) {
    try {
        $('#' + id).highcharts({
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#000',
                            fontSize: '12px',
                        },
                        formatter: function () {
                            return Math.round(this.y);
                        },
                        distance: 1
                    },
                    colorByPoint: true,
                    cursor: 'pointer',
                    allowPointSelect: true,
                    point: {
                        events: {
                            select: function () {
                                if (seriesType == 'Day') {
                                    SetDayType(this.name);
                                } else if (seriesType == 'Hour') {
                                    SetHourType(this.name);
                                }
                                $('#lbldata').text(this.name);
                                $('#spndata').show();
                            },
                            unselect: function () {
                                if (seriesType == 'Day') {
                                    SetDayType('');
                                } else if (seriesType == 'Hour') {
                                    SetHourType('');
                                }
                                $('#lbldata').text('');
                                $('#spndata').hide();
                            }
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: seriesname,
                data: dataseries
            }],
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">' + tooltipArray[0] + '</td>' +
                            '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">' + tooltipArray[1] + '</td>' +
                            '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
                }
            },
        });
    }
    catch (err) {
    }
}

function SetFilterValues() {
    dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
    dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
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
    custName = ($('#txtCustomerName').val() == null || $('#txtCustomerName').val() == '') ? '' : $('#txtCustomerName').val();
    ddlUsageTime = ($('#ddlUsageTime').val() == null || $('#ddlUsageTime').val() == '') ? '' : $("#ddlUsageTime option:selected").text();
    if (ddlUsageTime == '') {
        hourType = 'A';
    } else if (ddlUsageTime == 'Peak') {
        hourType = 'P';
    } else if (ddlUsageTime == 'NonPeak') {
        hourType = 'NP';
    }

    dayType = 'A';

    $('#lbldata').text('');
    $('#spndata').hide();

    $('#hdnParamValues').val(startmode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + custName + '|' + hourType + '|' + dayType);
}
//used common function for SetImages

//function SetImages() {
//    switch (startmode) {
//        case 'y':
//            $('.chartback').css('display', 'none');
//            break;
//        case 'm':
//            $('.chartback').css('display', 'block');
//            $('.chartback').attr('title', 'Back to Yearly');
//            break;
//        case 'd':
//            $('.chartback').css('display', 'block');
//            $('.chartback').attr('title', 'Back to Monthly');
//            break;
//        case 'h':
//            $('.chartback').css('display', 'block');
//            $('.chartback').attr('title', 'Back to Daily');
//            break;
//    }
//}