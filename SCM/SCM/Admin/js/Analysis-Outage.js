var Outagetable;
var mode = 'y';
var chart1, chart2, chart3;
var dtFrom = '', dtTo = '', city = '', zip = '', ddlAccountType = '', ddlOutageType = '';
var monthFrom, monthTo;
var dayFrom, dayTo;
var colorarraychart = new Array();
var counterhex = 0;
var countlocal = 0;

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    OutageAnalysis.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function PiechartCommon(mode) {
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#time-OutageTypeChart').html("<b>" + title + "</b>");
    $('#time-RestorationChart').html("<b>" + title + "</b>");
    $('#time-TopOutagesChart').html("<b>" + title + "</b>");
    OutageTypeChart(mode);
    RestorationChart(mode);
    TopOutageChart(mode);
    //CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
    SetImages(mode);
}

function OutageTypeChart(mode, caseId) {
    var outageTypeChartTable, regionTable, periodTable, outageTypeTable;
    outageTypeChartTable = Outagetable.value.Tables[0];
    periodTable = Outagetable.value.Tables[4]
    regionTable = Outagetable.value.Tables[5];
    outageTypeTable = Outagetable.value.Tables[6];

    showLegendsbyOutageType(outageTypeTable.Rows);

    var regionArray, categories;
    chart1 = new Array();
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
        //if (regionTable.length * categories.length > 9)
        //    regionArray.push(obj.CityName + '<br/>' + obj.ZipCode);
        //else
        //    regionArray.push(obj.CityName + ' ' + obj.ZipCode);
        regionArray.push(obj.CityName + '-' + obj.ZipCode);
    });

    $.map(outageTypeTable.Rows, function (outageTypeObj, i) {
        var arr = new Array();

        $.map(periodTable.Rows, function (periodObj, i) {
            $.map(regionTable.Rows, function (regionObj, i) {
                var categoryFound = false;
                $.map(outageTypeChartTable.Rows, function (outageTypeChartObj, i) {
                    switch (mode) {
                        case 'y':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageTypeChartObj.CityName + '-' + outageTypeChartObj.ZipCode)) && (periodObj.Year == outageTypeChartObj.Year)
                                && outageTypeObj.OutageType == outageTypeChartObj.OutageType) {

                                categoryFound = true;
                                arr.push(outageTypeChartObj.TotalOutage);
                            }
                            break;
                        case 'm':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageTypeChartObj.CityName + '-' + outageTypeChartObj.ZipCode)) && (periodObj.Month + '-' + periodObj.Year == outageTypeChartObj.Month + '-' + outageTypeChartObj.Year)
                                && outageTypeObj.OutageType == outageTypeChartObj.OutageType) {

                                categoryFound = true;
                                arr.push(outageTypeChartObj.TotalOutage);
                            }
                            break;
                        case 'd':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageTypeChartObj.CityName + '-' + outageTypeChartObj.ZipCode)) && (periodObj.Day == outageTypeChartObj.Day)
                                && outageTypeObj.OutageType == outageTypeChartObj.OutageType) {

                                categoryFound = true;
                                arr.push(outageTypeChartObj.TotalOutage);
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
            name: outageTypeObj.OutageType,
            data: arr,
            color: colorarraychart[i]
        });
    });

    if (regionArray.length * categories.length > 6) {
        var colcount = regionArray.length * categories.length;
        var divwidth = colcount * 150;
        $('#div-OutageTypeChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-OutageTypeChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-OutageTypeChart').attr('style', 'width:800px!important;float:left!important');
        $('#h3-OutageTypeChart').attr('style', 'width:822px!important');
    }

    var title = 'Outage Type Analysis';
    BindStackedColumnSeriesLocal('div-OutageTypeChart', chart1, seriesname, categories, title, '# of Outages');
}

function RestorationChart(mode, caseId) {
    var restorationChart, regionTable, categoryTable;
    restorationChart = Outagetable.value.Tables[2];
    regionTable = Outagetable.value.Tables[7]
    categoryTable = Outagetable.value.Tables[8];

    var seriesname = '';
    chart2 = new Array();

    $.map(regionTable.Rows, function (regionobj, i) {
        var arr = new Array();
        switch (mode) {
            case 'y':
                $.map(categoryTable.Rows, function (catobj, i) {
                    var categoryFound = false;

                    $.map(restorationChart.Rows, function (obj, i) {
                        if (obj.ZipCode == regionobj.ZipCode) {

                            if (catobj.Year == obj.Year) {
                                categoryFound = true;
                                arr.push({
                                    name: obj.Year,
                                    y: obj.AvgRestorationTime,
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
                    $.map(restorationChart.Rows, function (obj, i) {
                        if (obj.ZipCode == regionobj.ZipCode) {

                            if ((catobj.Month + '-' + catobj.Year) == (obj.Month + '-' + obj.Year)) {
                                categoryFound = true;

                                arr.push({
                                    name: obj.Month + '-' + obj.Year,
                                    y: obj.AvgRestorationTime,
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

                    $.map(restorationChart.Rows, function (obj, i) {
                        if (catobj.Day == obj.Day) {
                            categoryFound = true;

                            if (obj.ZipCode == regionobj.ZipCode) {
                                arr.push({
                                    name: obj.Day,
                                    y: obj.AvgRestorationTime,
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

        chart2.push({
            name: regionobj.CityName + '-' + regionobj.ZipCode,
            showInLegend: true,
            color: coloranalyticsHEX[i],
            data: arr,
        });
    });

    if (categoryTable.Rows.length > 6) {
        var divwidth = categoryTable.Rows.length * 90;
        $('#div-RestorationChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-RestorationChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-RestorationChart').attr('style', 'width:800px!important;float:left!important');
        $('#h3-RestorationChart').attr('style', 'width:822px!important');
    }

    var title = 'Outage Restoration Analysis';
    var toolTipArray = ['Outage Period: ', 'Outage Region: ', 'Average Restoration Time (Hours): '];
    BindLineSeriesLocal('div-RestorationChart', chart2, seriesname, title, 'Average Restoration Time (Hours)', toolTipArray);
}

function TopOutageChart(mode, caseId) {
    var topOutageChartTable, regionTable, periodTable, topOutageCauseTable;
    topOutageChartTable = Outagetable.value.Tables[3];
    periodTable = Outagetable.value.Tables[9]
    regionTable = Outagetable.value.Tables[10];
    topOutageCauseTable = Outagetable.value.Tables[11];

    var regionArray, categories;
    chart3 = new Array();
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

    $.map(topOutageCauseTable.Rows, function (outageCauseObj, i) {
        var arr = new Array();

        $.map(periodTable.Rows, function (periodObj, i) {
            $.map(regionTable.Rows, function (regionObj, i) {
                var categoryFound = false;
                $.map(topOutageChartTable.Rows, function (outageCauseChartObj, i) {
                    switch (mode) {
                        case 'y':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageCauseChartObj.CityName + '-' + outageCauseChartObj.ZipCode)) && (periodObj.Year == outageCauseChartObj.Year)
                                && outageCauseObj.OutageCause == outageCauseChartObj.OutageCause) {

                                categoryFound = true;
                                arr.push(outageCauseChartObj.TotalOutage);
                            }
                            break;
                        case 'm':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageCauseChartObj.CityName + '-' + outageCauseChartObj.ZipCode)) && (periodObj.Month + '-' + periodObj.Year == outageCauseChartObj.Month + '-' + outageCauseChartObj.Year)
                                && outageCauseObj.OutageCause == outageCauseChartObj.OutageCause) {

                                categoryFound = true;
                                arr.push(outageCauseChartObj.TotalOutage);
                            }
                            break;
                        case 'd':
                            if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageCauseChartObj.CityName + '-' + outageCauseChartObj.ZipCode)) && (periodObj.Day == outageCauseChartObj.Day)
                                && outageCauseObj.OutageCause == outageCauseChartObj.OutageCause) {

                                categoryFound = true;
                                arr.push(outageCauseChartObj.TotalOutage);
                            }
                            break;
                    }
                });

                if (categoryFound == false) {
                    arr.push(0);
                }
            });
        });

        chart3.push({
            name: outageCauseObj.OutageCause,
            data: arr,
            color: coloranalyticsHEX[i]
        });
    });

    if (regionArray.length * categories.length > 3) {
        var colcount = regionArray.length * categories.length;
        var divwidth = colcount * 225;
        $('#div-TopOutagesChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-TopOutagesChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-TopOutagesChart').attr('style', 'width:800px!important;float:left!important');
        $('#h3-TopOutagesChart').attr('style', 'width:822px!important');
    }

    var title = 'Top Outage Cause Analysis';
    BindColumnSeriesLocal('div-TopOutagesChart', chart3, seriesname, categories, title, '# of Outages');
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
    ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    switch (currentSeriesName) {
        case 'Year':
            mode = 'm';
            monthFrom = '1/1/' + period;
            monthTo = '12/31/' + period;
            Outagetable = OutageAnalysis.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, ddlOutageType);
            PiechartCommon(mode);
            CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
            break;
        case 'Month':
            mode = 'd';
            var stringArray = period.split("-");
            var date = new Date(Date.parse(stringArray[0] + " 1, " + stringArray[1]));
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            dayFrom = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            dayTo = (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + '/' + lastDay.getFullYear();
            Outagetable = OutageAnalysis.GetData(mode, dayFrom, dayTo, city, zip, ddlAccountType, ddlOutageType);
            PiechartCommon(mode);
            CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
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
    ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    switch (currentSeriesName) {
        case 'Month':
            mode = 'y';
            Outagetable = OutageAnalysis.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), city, zip, ddlAccountType, ddlOutageType);
            PiechartCommon(mode);
            CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
            break;
        case 'Day':
            mode = 'm';
            Outagetable = OutageAnalysis.GetData(mode, monthFrom, monthTo, city, zip, ddlAccountType, ddlOutageType);
            PiechartCommon(mode);
            CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
            break;
    }
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    GetDatesDifferenceInDays();

    Outagetable = OutageAnalysis.GetData(mode, $('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '','');
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    PiechartCommon(mode);
    $('#chartDiv').show();
    $("#mapDiv").hide();
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
    //} else {
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
            // alert("From date should not be greater than to date");
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
    ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();
    ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

    GetDatesDifferenceInDays();

    Outagetable = OutageAnalysis.GetData(mode, dtFrom, dtTo, city, zip, ddlAccountType, ddlOutageType);
    databindtogrid = Outagetable.value.Tables[0].Rows;
    PiechartCommon(mode);
    CreateMap(Outagetable.value.Tables[1].Rows, 'div-LocationMap');
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
                min: 0
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
                headerFormat: '<tr><td style="color: {series.color}">' + toolTipArray[0] + '</td>' +
                                    '<td style="text-align: right"><b>{point.key} </b></td></tr>' + '</br>',
                pointFormat: '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                                    '<td style="text-align: right"><b>{series.name} </b></td></tr>' + '</br>' +
                                    '<tr><td style="color: {series.color}">' + toolTipArray[2] + '</td>' +
                                    '<td style="text-align: right"><b>{point.y} </b></td></tr>'
            },
            series: dataseries
        });
    }
    catch (err) {
    }
}

function BindColumnSeriesLocal(id, dataseries, seriesname, categories, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
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
                    return '<tr><td style="color: {series.color}">Outages Region & Period: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Outages Type: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Outage Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                }
            },
            xAxis: {
                categories: categories,
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisTitle,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                },
            }
        });
    }
    catch (err) {
    }
}

function BindStackedColumnSeriesLocal(id, dataseries, seriesname, categories, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
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
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Outage Region & Period: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Outage Type: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Outage Count: </td>' +
                            '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                }
            },
            xAxis: {
                categories: categories,
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
    switch (mode) {
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

function showLegendsbyOutageType(outageTable) {
    $('#greenBox').hide();
    $('#CompleteID').hide();
    $('#orangeBox').hide();
    $('#ProgessID').hide();
    counterhex = 0;
    countlocal = 0;
    var dataarr = new Array();
    if (outageTable.length > 0) {
        $.each(outageTable, function (i, v) {
            counterhex = 0;
            if (outageTable[i].OutageType == "Planned") {
                $('#greenBox').show();
                $('#CompleteID').show();
                dataarr.push("#greenBox");
                colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
                counterhex++;
                countlocal++;
            }
            else
                counterhex++;
            if (outageTable[i].OutageType == "Unplanned") {
                $('#orangeBox').show();
                $('#ProgessID').show();
                dataarr.push("#orangeBox");
                colorarraychart[countlocal] = coloranalyticsHEX[counterhex];
            }
        });
    }
}