var Servicetable;
var mode = 'y';
var chart1, chart2, chart3, chart4;
var dtFrom='', dtTo='', city='', zip='', ddlReason='';
var monthFrom, monthTo;
var dayFrom, dayTo;
var colorarraychart = new Array();
var counterhex = 0;
var countlocal = 0;

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    ServiceRequestTrend.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function PiechartCommon(mode) {
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#time-AgingChart').html("<b>" + title + "</b>");
    $('#time-RootCauseChart').html("<b>" + title + "</b>");
    $('#time-TopServiceRequestChart').html("<b>" + title + "</b>");
    $('#time-ResolutionTimeChart').html("<b>" + title + "</b>");
    AgingChart(mode);
    ResolutionChart(mode);
    RootCauseChart(mode);
    TopSeriveRequestChart(mode);

    SetImages(mode);
}

function AgingChart(mode, caseId)
{
    var agingChart, ageTable, categoryTable;
    agingChart = Servicetable.value.Tables[0];
    ageTable = Servicetable.value.Tables[4];
    categoryTable = Servicetable.value.Tables[5];
   
    showLegendsbyAgingChart(ageTable.Rows);
    var seriesname = '';
    chart1 = new Array();

    $.map(ageTable.Rows, function (agePeriodObj, i) {
        var arr = new Array();
        switch (mode)
        {
            case 'y':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(agingChart.Rows, function (obj, i) {
                        if (obj.AgePeriod == agePeriodObj.AgePeriod) {
                            if (catobj.Year == obj.Year) {
                                categoryFound = true;

                                arr.push({
                                    name: obj.Year,
                                    y: obj.TotalServiceRequest,
                                    title: obj.AgePeriod
                                });
                            }
                        }
                    });

                    if(categoryFound == false)
                    {
                        arr.push({
                            name: catobj.Year,
                            y: 0,
                            title: agePeriodObj.AgePeriod
                        });
                    }
                });
                seriesname = 'Year';
                break;
            case 'm':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(agingChart.Rows, function (obj, i) {
                        
                        if (obj.AgePeriod == agePeriodObj.AgePeriod) {
                            if ((catobj.Month + '-' + catobj.Year) == (obj.Month + '-' + obj.Year)) {
                                categoryFound = true;

                                arr.push({
                                    name: obj.Month + '-' + obj.Year,
                                    y: obj.TotalServiceRequest,
                                    title: obj.AgePeriod
                                });
                            }
                        }
                    });

                    if (categoryFound == false) {
                        arr.push({
                            name: catobj.Month + '-' + catobj.Year,
                            y: 0,
                            title: agePeriodObj.AgePeriod
                        });
                    }
                });
                seriesname = 'Month';
                break;
            case 'd':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(agingChart.Rows, function (obj, i) {
                        if (obj.AgePeriod == agePeriodObj.AgePeriod) {
                            if (catobj.Day == obj.Day) {
                                categoryFound = true;

                                arr.push({
                                    name: obj.Day,
                                    y: obj.TotalServiceRequest,
                                    title: obj.AgePeriod
                                });
                            }
                            }
                    });

                    if (categoryFound == false) {
                        arr.push({
                            name: catobj.Day,
                            y: 0,
                            title: agePeriodObj.AgePeriod
                        });
                    }
                });
                seriesname = 'Day';
                break;
        }

        chart1.push({
            name: agePeriodObj.AgePeriod,
            showInLegend: false,
            //color: coloranalyticsHEX[i],
            color: colorarraychart[i],
            data: arr,
        });
    });

    if (categoryTable.Rows.length > 6) {
        var divwidth = categoryTable.Rows.length * 90;
        $('#div-AgingChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-AgingChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-AgingChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-AgingChart').attr('style', 'width:833px!important');
    }

    var title = 'Service Request Aging analysis';
    var toolTipArray = ['Service Request Period: ', 'Service Request Aging: ', 'Service Request Count: '];
    BindLineSeries('div-AgingChart', chart1, seriesname, title, '# of Service Requests', toolTipArray);
}

function RootCauseChart(mode, caseId)
{
    var rootCauseChartTable, regionTable, rootCauseTable;
    rootCauseChartTable = Servicetable.value.Tables[1];
    regionTable = Servicetable.value.Tables[6];
    rootCauseTable = Servicetable.value.Tables[7];

    var regionArray, categories;
    chart2 = new Array();
    var seriesname = '';

    regionArray = new Array();
    categories = new Array();
    $.map(regionTable.Rows, function (obj, i) {
        categories.push(obj.CityName + '-' + obj.ZipCode);
    });

    $.map(rootCauseTable.Rows, function (rootCauseObj, i) {
        var arr = new Array();

            $.map(regionTable.Rows, function (regionObj, i) {
                var categoryFound = false;
                $.map(rootCauseChartTable.Rows, function (rootCauseChartObj, i) {
                    if (((regionObj.CityName + '-' + regionObj.ZipCode) == (rootCauseChartObj.CityName + '-' + rootCauseChartObj.ZipCode))
                                && rootCauseObj.RootCause == rootCauseChartObj.RootCause) {
                        categoryFound = true;
                        arr.push(rootCauseChartObj.TotalServiceRequest);
                    }
                });

                if (categoryFound == false)
                {
                    arr.push(0);
                }
            });

        chart2.push({
            name: rootCauseObj.RootCause,
            data: arr,
            color: coloranalyticsHEX[i]
        });
    });

    if (categories.length > 6) {
        var divwidth = categories.length * 150;
        $('#div-RootCauseChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-RootCauseChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-RootCauseChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-RootCauseChart').attr('style', 'width:833px!important');
    }

    var title = 'Service Request Root Cause analysis';
    BindColumnSeriesLocal('div-RootCauseChart', chart2, seriesname, categories, title, '# of Service Requests');
}

function TopSeriveRequestChart(mode, caseId) {
    var srChartTable, regionTable, periodTable, srTypeTable;
    srChartTable = Servicetable.value.Tables[2];
    periodTable = Servicetable.value.Tables[8]
    regionTable = Servicetable.value.Tables[9];
    srTypeTable = Servicetable.value.Tables[10];

    var regionArray, categories;
    chart2 = new Array();
    var seriesname = '';

    regionArray = new Array();
    categories = new Array();
    
    switch (mode) {
        case 'y':
            $.map(periodTable.Rows, function (obj, i) {
                categories.push({
                    name: obj.Year,
                    categories: regionArray
                });
            });
            seriesname = 'Year';
            break;
        case 'm':
            $.map(periodTable.Rows, function (obj, i) {
                categories.push({
                    name: obj.Month + '-' + obj.Year,
                    categories: regionArray
                });
            });
            seriesname = 'Month';
            break;
        case 'd':
            $.map(periodTable.Rows, function (obj, i) {
                categories.push({
                    name: obj.Day,
                    categories: regionArray
                });
            });
            seriesname = 'Day';
            break;
    }

    $.map(regionTable.Rows, function (obj, i) {
        //if (regionTable.length * categories.length > 6)
        //    regionArray.push(obj.CityName + '<br/>' + obj.ZipCode);
        //else
        //    regionArray.push(obj.CityName + ' ' + obj.ZipCode);
        regionArray.push(obj.CityName + '-' + obj.ZipCode);
    });

    $.map(srTypeTable.Rows, function (srTypeObj, i) {
        var arr = new Array();

        $.map(periodTable.Rows, function (periodObj, i) {
            $.map(regionTable.Rows, function (regionObj, i) {
                var categoryFound = false;
                $.map(srChartTable.Rows, function (srChartObj, i) {
                    switch (mode) {
                        case 'y':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (srChartObj.CityName + '-' + srChartObj.ZipCode)) && (periodObj.Year == srChartObj.Year)
                                && srTypeObj.ServiceRequestType == srChartObj.ServiceRequestType) {

                                categoryFound = true;
                                arr.push(srChartObj.TotalServiceRequest);
                            }
                            break;
                        case 'm':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (srChartObj.CityName + '-' + srChartObj.ZipCode)) && (periodObj.Month + '-' + periodObj.Year == srChartObj.Month + '-' + srChartObj.Year)
                                && srTypeObj.ServiceRequestType == srChartObj.ServiceRequestType) {

                                categoryFound = true;
                                arr.push(srChartObj.TotalServiceRequest);
                            }
                            break;
                        case 'd':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (srChartObj.CityName + '-' + srChartObj.ZipCode)) && (periodObj.Day == srChartObj.Day)
                                && srTypeObj.ServiceRequestType == srChartObj.ServiceRequestType) {

                                categoryFound = true;
                                arr.push(srChartObj.TotalServiceRequest);
                            }
                            break;
                    }
                });

                if (categoryFound == false) {
                    arr.push(0);
                }
            });
        });

        chart2.push({
            name: srTypeObj.ServiceRequestType,
            data: arr,
            color: coloranalyticsHEX[i]
        });
    });

    if (regionArray.length * categories.length > 4) {
        var colcount = regionArray.length * categories.length;
        var divwidth = colcount * 200;
        $('#div-TopServiceRequestChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-TopServiceRequestChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-TopServiceRequestChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-TopServiceRequestChart').attr('style', 'width:833px!important');
    }

    var title = 'Top Service Request analysis';
    BindColumnSeriesWithDrillDownLocal('div-TopServiceRequestChart', chart2, seriesname, categories, title, '# of Service Requests');
}

function ResolutionChart(mode, caseId) {
    var resolutionChart, regionTable, categoryTable;
    resolutionChart = Servicetable.value.Tables[3];
    regionTable = Servicetable.value.Tables[11]
    categoryTable = Servicetable.value.Tables[12];

    var seriesname = '';
    chart4 = new Array();

    $.map(regionTable.Rows, function (regionobj, i) {
        var arr = new Array();
        switch (mode) {
            case 'y':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(resolutionChart.Rows, function (obj, i) {
                        if (obj.ZipCode == regionobj.ZipCode) {

                            if (catobj.Year == obj.Year) {
                                categoryFound = true;
                                arr.push({
                                    name: obj.Year,
                                    y: obj.AvgSRResolutionTime,
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
                    $.map(resolutionChart.Rows, function (obj, i) {
                        if (obj.ZipCode == regionobj.ZipCode) {

                            if ((catobj.Month + '-' + catobj.Year) == (obj.Month + '-' + obj.Year)) {
                                categoryFound = true;

                                arr.push({
                                    name: obj.Month + '-' + obj.Year,
                                    y: obj.AvgSRResolutionTime,
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

                    $.map(resolutionChart.Rows, function (obj, i) {
                        if (catobj.Day == obj.Day) {
                            categoryFound = true;

                            if (obj.ZipCode == regionobj.ZipCode) {
                                arr.push({
                                    name: obj.Day,
                                    y: obj.AvgSRResolutionTime,
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
        }

        chart4.push({
            name: regionobj.CityName + '-' + regionobj.ZipCode,
            showInLegend: true,
            color: coloranalyticsHEX[i],
            data: arr,
        });
    });

    if (categoryTable.Rows.length > 6) {
        var divwidth = categoryTable.Rows.length * 90;
        $('#div-ResolutionTimeChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-ResolutionTimeChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-ResolutionTimeChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-ResolutionTimeChart').attr('style', 'width:833px!important');
    }

    var title = 'Service Request Resolution analysis';
    var toolTipArray = ['Service Request Period: ', 'Service Request Region: ', 'Service Request Resolution in Days: '];
    BindLineSeries('div-ResolutionTimeChart', chart4, seriesname, title, 'Resolution in Days', toolTipArray);
}

function DrillDown(period, x, y, currentSeriesName) {
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();
    switch (currentSeriesName)
    {
        case 'Year':
            mode = 'm';
            monthFrom = '1/1/' + period;
            monthTo = '12/31/' + period;
            Servicetable = ServiceRequestTrend.GetData(mode, monthFrom, monthTo, city, zip, ddlReason);
            PiechartCommon(mode);
            break;
        case 'Month':
            mode = 'd';
            var stringArray = period.split("-");
            var date = new Date(Date.parse(stringArray[0] + " 1, " + stringArray[1]));
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            dayFrom = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            dayTo = (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + '/' + lastDay.getFullYear();
            Servicetable = ServiceRequestTrend.GetData(mode, dayFrom, dayTo, city, zip, ddlReason);
            PiechartCommon(mode);
            break;
    }
}

function DrillUp(name, x, y, currentSeriesName) {
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();
    switch (currentSeriesName) {
        case 'Month':
            mode = 'y';
            Servicetable = ServiceRequestTrend.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlReason);
            PiechartCommon(mode);
            break;
        case 'Day':
            mode = 'm';
            Servicetable = ServiceRequestTrend.GetData(mode, monthFrom, monthTo, city, zip, ddlReason);
            PiechartCommon(mode);
            break;
    }
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    GetDatesDifferenceInDays();

    Servicetable = ServiceRequestTrend.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '');
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    PiechartCommon(mode);

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

function GetDatesDifferenceInDays()
{
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

    //if (diffDays >= 365){
    //    mode = 'y';
    //}
    //else if (diffDays > 30) {
    //    mode = 'm';
    //}else {
    //    mode = 'd';
    //}
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
            //  alert("From date should not be greater than to date");
            alert("'From Date' should not be greater than 'To date'");
            $("#txtDateTo").val("");
            return false;
        }
    }

    city = "";
    zip = "";
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }

    dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
    dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
    ddlReason = ($('#ddlReason').val() == null || $('#ddlReason').val() == '') ? '' : $('#ddlReason').val();

    GetDatesDifferenceInDays();

    Servicetable = ServiceRequestTrend.GetData(mode, dtFrom, dtTo, city, zip, ddlReason);

    //for pdf
    $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlReason);

    PiechartCommon(mode);
}

function BindLineSeries(id, dataseries, seriesname, title, yAxisTitle, toolTipArray) {
    try
    {
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
                min:0,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
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
                        enabled: false
                    }
                }
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<tr><td style="color: {series.color}">' + toolTipArray[0] +'</td>' +
                                    '<td style="text-align: right"><b>{point.key} </b></td></tr>' + '</br>',
                pointFormat: '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                                    '<td style="text-align: right"><b>{series.name} </b></td></tr>' + '</br>' +
                                    '<tr><td style="color: {series.color}">' + toolTipArray[2] + '</td>' +
                                    '<td style="text-align: right"><b>{point.y} </b></td></tr>'
                },
            series: dataseries
        });
    }
    catch(err)
    {
    }
}

function BindColumnSeriesLocal(id, dataseries, seriesname, categories, title, yAxisTitle, drillDownEnabled, toolTip) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    showInLegend: true,
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
                                return this.y;
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            series: dataseries,
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Service Request Region: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Service Request Root Cause: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Service Request Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                   }
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisTitle,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            }
        });
    }
    catch (err) {
    }
}

function BindColumnSeriesWithDrillDownLocal(id, dataseries, seriesname, categories, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                    DrillDown(this.category.parent.name, this.x, this.y, seriesname);
                            }
                        }
                    },
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
                                return this.y;
                            } else {
                                return null;
                            }
                        }
                    }
                }
            },
            series: dataseries,
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Service Request Region & Period: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Service Request Type: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Service Request Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                }
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min:0,
                title: {
                    text: yAxisTitle,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            }
        });
    }
    catch (err) {
    }
}

$('.chartback').click(function () {
    switch(mode)
    {
        case 'y':
            break;
        case 'm':
            DrillUp('', '', '', 'Month');
            break;
        case 'd':
            DrillUp('', '', '', 'Day');
            break;
    }
});

function showLegendsbyAgingChart(ageTable) {
    try {
        $('#zerofiveBox').hide();
        $('#zerofiveID').hide();
        $('#sixtenBox').hide();
        $('#sixtenBoxID').hide();
        $('#elevenBox').hide();
        $('#elevenBoxID').hide();
        $('#sixteenBox').hide();
        $('#sixteenBoxID').hide();
        $('#twentyBox').hide();
        $('#twentyBoxID').hide();
        //counterhex = 0;
        countlocal = 0;
        var dataarr = new Array();
        if (ageTable.length > 0) {
            $.each(ageTable, function (i, v) {
                counterhex = 0;
                if (ageTable[i].AgePeriod == ">20 Days") {
                    $('#twentyBox').show();
                    $('#twentyBoxID').show();
                    dataarr.push("#twentyBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (ageTable[i].AgePeriod == "0-5 Days") {
                    $('#zerofiveBox').show();
                    $('#zerofiveID').show();
                    dataarr.push("#zerofiveBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (ageTable[i].AgePeriod == "11-15 Days") {
                    $('#elevenBox').show();
                    $('#elevenBoxID').show();
                    dataarr.push("#elevenBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (ageTable[i].AgePeriod == "16-20 Days") {
                    $('#sixteenBox').show();
                    $('#sixteenBoxID').show();
                    dataarr.push("#sixteenBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                    counterhex++;
                    countlocal++;
                }
                else
                    counterhex++;
                if (ageTable[i].AgePeriod == "6-10 Days") {
                    $('#sixtenBox').show();
                    $('#sixtenBoxID').show();
                    dataarr.push("#sixtenBox");
                    colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                }
            });
        }
    }
    catch (e) {
    }
}