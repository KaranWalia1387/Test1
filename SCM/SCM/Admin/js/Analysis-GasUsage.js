var GasUsageTable;
var mode = 'y';
var chart1, chart2, chart3, chart4, chart5;
var dtFrom = '', dtTo = '', city = '', zip = '', ddlAccountType = '', ddlUsageTime = '', hourType = 'A', dayType = 'A';;
var monthFrom, monthTo;
var dayFrom, dayTo;
var hourDay;

//function checkClientTimeZone() {
//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    GasUsage.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function PiechartCommon(mode, drawDayType, drawHourType) {
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#time-WeekendWeekDayChart').html("<b>" + title + "</b>");
    $('#time-PeakNonPeakChart').html("<b>" + title + "</b>");
    $('#time-GasUsageChart').html("<b>" + title + "</b>");
    $('#time-TopGasUsageChart').html("<b>" + title + "</b>");
    $('#time-GasUsageTrendChart').html("<b>" + title + "</b>");
    if (drawDayType == true) {
        WeekendAndWeekDayChart(mode);
    }
    if (drawHourType == true) {
        PeakNonPeakChart(mode);
    }
    GasUsageChart(mode);
    TopCustomersChart();
    GasUsageTrendChart(mode);

    SetImages(mode);
}

function WeekendAndWeekDayChart(mode, caseId) {
    var weekEndDayChartTable;
    weekEndDayChartTable = GasUsageTable.value.Tables[0];

    chart1 = new Array();
    var seriesname = '';
    var seriesType = 'Day';
    $.map(weekEndDayChartTable.Rows, function (obj, i) {
        var name = '';
        switch (mode) {
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
    var toolTipArray = ['Day Type: ', 'Gas Usage (Ccf): '];
    BindPieSeries('div-WeekendWeekDayChart', chart1, seriesname, title, seriesType, toolTipArray);
}

function PeakNonPeakChart(mode, caseId) {
    var peakNonPeakChartTable;
    peakNonPeakChartTable = GasUsageTable.value.Tables[1];

    chart2 = new Array();
    var seriesname = '';
    var seriesType = 'Hour';
    $.map(peakNonPeakChartTable.Rows, function (obj, i) {
        var name = '';
        switch (mode) {
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
            color: colorarrHEX[i + 4]
        });
    });

    var title = 'Peak/NonPeak Analysis';
    var toolTipArray = ['Hour Type: ', 'Gas Usage (Ccf): '];
    BindPieSeries('div-PeakNonPeakChart', chart2, seriesname, title, seriesType, toolTipArray);
}

function GasUsageChart(mode, caseId) {
    var gasUsageChart;
    gasUsageChart = GasUsageTable.value.Tables[2];

    chart3 = new Array();
    var seriesname = '';

    $.map(gasUsageChart.Rows, function (obj, i) {
        var name = '';
        switch (mode) {
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
        });
    });

    if (gasUsageChart.Rows.length > 3) {
        var divwidth = gasUsageChart.Rows.length * 200;
        $('#div-GasUsageChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-GasUsageChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-GasUsageChart').attr('style', 'width:822px!important;float:left!important');
        $('#h3-GasUsageChart').attr('style', 'width:822px!important');
    }

    var title = 'Gas Usage Analysis';
    var toolTipArray = ['Gas Usage Period: ', 'Gas Usage Region: ', 'Gas Usage (Ccf): '];
    BindColumnSeriesLocal('div-GasUsageChart', chart3, seriesname, title, 'Gas Usage (Ccf)', toolTipArray);
}

function TopCustomersChart(mode, caseId) {
    var customerChartTable, customerTypeTable;
    customerChartTable = GasUsageTable.value.Tables[3];
    customerTypeTable = GasUsageTable.value.Tables[5]

    var customerNameArray, categories;
    chart4 = new Array();
    var seriesname = 'Top Customers';

    categories = new Array();
    var arr = new Array();
    $.map(customerTypeTable.Rows, function (customerTypeobj, i) {
        customerNameArray = new Array();
        $.map(customerChartTable.Rows, function (obj, i) {
            if (customerTypeobj.CustomerType == obj.CustomerType) {
                customerNameArray.push(obj.CustomerName);
                arr.push({
                    color: colorarrHEX[i],
                    y: obj.TotalUsage
                });
            }
        });

        categories.push({
            name: customerTypeobj.CustomerType,
            categories: customerNameArray
        });
    });

    chart4.push({
        name: seriesname,
        data: arr,
        showInLegend: false,
    });

    if (customerChartTable.Rows.length > 10) {
        var divwidth = customerChartTable.Rows.length * 100;
        $('#div-TopGasUsageChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-TopGasUsageChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-TopGasUsageChart').attr('style', 'width:822px!important;float:left!important');
        $('#h3-TopGasUsageChart').attr('style', 'width:822px!important');
    }

    var title = 'Top Gas Usage Customers';
    BindColumnSeriesWithCategoriesLocal('div-TopGasUsageChart', chart4, seriesname, categories, title, 'Gas Usage (Ccf)');
}

function GasUsageTrendChart(mode, caseId) {
    var gasUsageChart, regionTable, categoryTable;
    gasUsageChart = GasUsageTable.value.Tables[4];
    regionTable = GasUsageTable.value.Tables[6]
    categoryTable = GasUsageTable.value.Tables[7];

    var seriesname = '';
    chart5 = new Array();

    $.map(regionTable.Rows, function (regionobj, i) {
        var arr = new Array();
        switch (mode) {
            case 'y':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(gasUsageChart.Rows, function (obj, i) {
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
                    $.map(gasUsageChart.Rows, function (obj, i) {
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

                    $.map(gasUsageChart.Rows, function (obj, i) {
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
            case 'h':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(gasUsageChart.Rows, function (obj, i) {
                        if (catobj.Hourly == obj.Hourly) {
                            categoryFound = true;

                            if (obj.ZipCode == regionobj.ZipCode) {
                                arr.push({
                                    name: obj.Hourly,
                                    y: obj.TotalUsage,
                                    title: obj.CityName + obj.ZipCode
                                });
                            }
                        }
                    });

                    if (categoryFound == false) {
                        arr.push({
                            name: catobj.Hourly,
                            y: 0,
                            title: regionobj.CityName + regionobj.ZipCode
                        });
                    }
                });
                seriesname = 'Hour';
                break;
        }

        chart5.push({
            name: regionobj.CityName + '-' + regionobj.ZipCode,
            showInLegend: true,
            color: coloranalyticsHEX[i],
            data: arr
        });
    });

    if (categoryTable.Rows.length > 4) {
        var divwidth = categoryTable.Rows.length * 250;
        $('#div-GasUsageTrendChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-GasUsageTrendChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-GasUsageTrendChart').attr('style', 'width:822px!important;float:left!important');
        $('#h3-GasUsageTrendChart').attr('style', 'width:822px!important');
    }

    var title = 'Gas Usage Trend Analysis';
    var toolTipArray = ['Gas Usage Period: ', 'Gas Usage Region: ', 'Gas Usage (Ccf): '];
    BindLineSeriesLocal('div-GasUsageTrendChart', chart5, seriesname, title, 'Gas Usage (Ccf)', toolTipArray);
}

function DrillDown(period, x, y, currentSeriesName, seriesType) {
    SetFilterValues();
    switch (currentSeriesName) {
        case 'Year':
            mode = 'm';
            monthFrom = '1/1/' + period;
            monthTo = '12/31/' + period;
            $('#txtDateFrom').val(monthFrom);
            $('#txtDateTo').val(monthTo);
            GasUsageTable = GasUsage.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
        case 'Month':
            mode = 'd';
            var stringArray = period.split("-");
            var date = new Date(Date.parse(stringArray[0] + " 1, " + stringArray[1]));
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            dayFrom = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            dayTo = (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + '/' + lastDay.getFullYear();
            $('#txtDateFrom').val(dayFrom);
            $('#txtDateTo').val(dayTo);
            GasUsageTable = GasUsage.GetData(mode, dayFrom, dayTo, city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
        case 'Day':
            mode = 'h';
            hourDay = period;
            $('#txtDateFrom').val(hourDay);
            $('#txtDateTo').val(hourDay);
            GasUsageTable = GasUsage.GetData(mode, hourDay, hourDay, city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
    }
}

function DrillUp(name, x, y, currentSeriesName) {
    SetFilterValues();
    switch (currentSeriesName) {
        case 'Month':
            mode = 'y';
            $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
            $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
            GasUsageTable = GasUsage.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
        case 'Day':
            mode = 'm';
            $('#txtDateFrom').val(monthFrom);
            $('#txtDateTo').val(monthTo);
            GasUsageTable = GasUsage.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
        case 'Hour':
            mode = 'd';
            $('#txtDateFrom').val(dayFrom);
            $('#txtDateTo').val(dayTo);
            GasUsageTable = GasUsage.GetData(mode, dayFrom, dayTo, city, zip, ddlAccountType, hourType, dayType);
            PiechartCommon(mode, true, true);
            break;
    }
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    GetDatesDifferenceInDays();

    GasUsageTable = GasUsage.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '', hourType, dayType);
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    PiechartCommon(mode, true, true);

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

});

function GetDatesDifferenceInDays() {
    var date1 = new Date($('#txtDateFrom').val());
    var date2 = new Date($('#txtDateTo').val());
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var frommonth = date1.getMonth + 1;
    var tomonth = date2.getMonth + 1;
    if (diffDays > 365)
        mode = 'y';
    else if (frommonth == tomonth)
        mode = 'd';
    else if (frommonth != tomonth)
        mode = 'm';

    //if (diffDays >= 365) {
    //    mode = 'y';
    //}
    //else if (diffDays > 30) {
    //    mode = 'm';
    //} else if (diffDays > 1) {
    //    mode = 'd';
    //} else {
    //    mode = 'h';
    //}
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

    switch (mode) {
        case 'y':
            GasUsageTable = GasUsage.GetData(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'm':
            GasUsageTable = GasUsage.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'd':
            GasUsageTable = GasUsage.GetData(mode, dayFrom, dayTo, city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'h':
            GasUsageTable = GasUsage.GetData(mode, hourDay, hourDay, city, zip, ddlAccountType, hourType, dayType);
            break;
    }
    PiechartCommon(mode, true, false);
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

    switch (mode) {
        case 'y':
            GasUsageTable = GasUsage.GetData(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'm':
            GasUsageTable = GasUsage.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'd':
            GasUsageTable = GasUsage.GetData(mode, dayFrom, dayTo, city, zip, ddlAccountType, hourType, dayType);
            break;
        case 'h':
            GasUsageTable = GasUsage.GetData(mode, hourDay, hourDay, city, zip, ddlAccountType, hourType, dayType);
            break;
    }

    PiechartCommon(mode, false, true);
}

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
           // alert("From date should not be greater than to date");
            alert("'From Date' should not be greater than 'To date'");
            $("#txtDateTo").val("");
            return false;
        }
    }

    //city = "";
    //zip = "";
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
    GetDatesDifferenceInDays();
    GasUsageTable = GasUsage.GetData(mode, dtFrom, dtTo, city, zip, ddlAccountType, hourType, dayType);
    PiechartCommon(mode, true, true);
}

function BindPieSeries(id, dataseries, seriesname, title, seriesType, toolTipArray) {
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
                    return '<tr><td style="color: {series.color}">' + toolTipArray[0] + '</td>' +
                            '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                            '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
                }
            },
        });
    }
    catch (err) {
    }
}

function BindLineSeriesLocal(id, dataseries, seriesname, title, yAxisTitle, toolTipArray) {
    try {
        $('#' + id).highcharts({
            yAxis: {
                title: {
                    text: yAxisTitle,
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
                },
                min:0
            },
            xAxis: {
                labels: {
                    rotation: -45,
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
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                line: {
                    dataLabels: {
                        enabled: false, //changed acc to sheet
                        formatter: function () {
                            return Math.round(this.y);
                        }
                    }
                }
            },
            series: dataseries,
            tooltip: {
                useHTML: true,
                headerFormat: '<tr><td style="color: {series.color}">' + toolTipArray[0] + '</td>' +
                                    '<td style="text-align: right"><b>{point.key} </b></td></tr>' + '</br>',
                pointFormat: '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                                    '<td style="text-align: right"><b>{series.name} </b></td></tr>' + '</br>' +
                                    '<tr><td style="color: {series.color}">' + toolTipArray[2] + '</td>' +
                                    '<td style="text-align: right"><b>{point.y:,.0f} </b></td></tr>'
            },
        });
    }
    catch (err) {
    }
}

function BindColumnSeriesLocal(id, dataseries, seriesname, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
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
                    text: yAxisTitle,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
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
                name: seriesname,
                data: dataseries,
                showInLegend: false
            }],
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Gas Usage Period: </td>' +
                            '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Gas Usage (Ccf): </td>' +
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

function BindColumnSeriesWithCategoriesLocal(id, dataseries, seriesname, categories, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            series: dataseries,
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Customer & Customer Type: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Gas Usage (Ccf): </td>' +
                            '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
                }
            },
            xAxis: {
                categories: categories
            },
            yAxis:{
                min: 0,
                maxPadding: 0.09,
                title: {
                    text: yAxisTitle,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
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
            }
        });
    }
    catch (err) {
    }
}

$('.chartback').click(function () {
    switch (mode) {
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
    }
});

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
}