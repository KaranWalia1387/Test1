var CustomerTable;
var chart1, chart2, chart3, chart4;
var dtFrom = '', dtTo = '', city = '', zip = '';
var monthFrom, monthTo;
var dayFrom, dayTo;

//function checkClientTimeZone() {
//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    CustomerAnalysis.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function LoadGrid() {
    data = CustomerTable.value.Tables[2].Rows;
    autoheightPrimary = false;
    if (data.length > 0) {
        if (data.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'FullName' },
            { name: 'CustomerType' },
            { name: 'Address' },
             { name: 'EmailID' },
             { name: 'MobilePhone' },
             { name: 'CityName' },
            { name: 'ZipCode', type: 'number' }
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

            width: "100%",
            autoheight: autoheightPrimary,
            height: "300",
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
                { text: 'Name', dataField: 'FullName', width: '15%' },
                { text: 'Address', dataField: 'Address', width: '25%' },
                { text: 'City Name', dataField: 'CityName', width: '12%' },
                { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
                { text: 'Email', dataField: 'EmailID', width: '18%' },
                { text: 'Mobile', dataField: 'MobilePhone', width: '12%' },
                { text: 'Customer Type', dataField: 'CustomerType', width: '15%' }
            ]
        });

        $("#jqxgrid").on('bindingcomplete', function () {
            if ($(window).width() < 1025) {
                $("#jqxgrid").jqxGrid('autoresizecolumns');
            }
        });
    }
}

function PiechartCommon() {
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#time-CustomersTypeChart').html("<b>" + title + "</b>");
    $('#time-TopUsageCustmersChart').html("<b>" + title + "</b>");
    $('#time-TopDevicesChart').html("<b>" + title + "</b>");
    CustomerTypeByRegionChart();
    //LoadGrid(CustomerTable.value.Tables[2].Rows);
    CustomerUsageChart()
    TopDevicesChart();

    //CreateMap(CustomerTable.value.Tables[1].Rows, 'div-CustomerMap');
}

function CustomerTypeByRegionChart(caseId) {
    var customerTypeChartTable, regionTable, customerTypeTable;
    customerTypeChartTable = CustomerTable.value.Tables[0];
    regionTable = CustomerTable.value.Tables[5]
    customerTypeTable = CustomerTable.value.Tables[6];

    var categories;
    chart1 = new Array();
    var seriesname = '';

    categories = new Array();
    $.map(regionTable.Rows, function (obj, i) {
        categories.push(obj.CityName + '-' + obj.ZipCode);
    });

    $.map(customerTypeTable.Rows, function (customerTypeObj, i) {
        var arr = new Array();

       $.map(regionTable.Rows, function (regionObj, i) {
            var categoryFound = false;
            $.map(customerTypeChartTable.Rows, function (customerTypeChartObj, i) {
                if (((regionObj.CityName + '-' + regionObj.ZipCode) == (customerTypeChartObj.CityName + '-' + customerTypeChartObj.ZipCode))
                    && customerTypeObj.CustomerType == customerTypeChartObj.CustomerType) {

                    categoryFound = true;
                    arr.push(customerTypeChartObj.TotalCustomer);
                }
            });

            if (categoryFound == false) {
                arr.push(0);
            }
      });

        chart1.push({
            name: customerTypeObj.CustomerType,
            data: arr,
            color: coloranalyticsHEX[i]
        });
    });

    if (categories.length > 4) {
        var divwidth = categories.length * 200;
        $('#div-CustomersTypeChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-CustomersTypeChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-CustomersTypeChart').attr('style', 'width:833px!important;float:left!important;');
        $('#h3-CustomersTypeChart').attr('style', 'width:833px!important');
    }

    var title = 'Customers By Type and Region';
    BindStackedColumnSeriesLocal('div-CustomersTypeChart', chart1, seriesname, categories, title, '# of Customers');
}

function CustomerUsageChart(caseId) {
    var customerUsageChartTable, regionTable, customerTypeTable, customerOrderTable;
    customerUsageChartTable = CustomerTable.value.Tables[3];
    regionTable = CustomerTable.value.Tables[7]
    customerTypeTable = CustomerTable.value.Tables[8];
    customerOrderTable = CustomerTable.value.Tables[9]

    var customerTypeTableArray, categories;
    chart2 = new Array();
    var seriesname = '';

    customerTypeTableArray = new Array();
    categories = new Array();
    $.map(customerTypeTable.Rows, function (obj, i) {
        customerTypeTableArray.push(obj.CustomerType);
    });

    $.map(regionTable.Rows, function (obj, i) {
        categories.push({
            name: obj.CityName + '-' + obj.ZipCode,
            categories: customerTypeTableArray
        });
    });

    var arr = new Array();

    $.map(customerOrderTable.Rows, function (customerOrderObj, i) {
        var arr = new Array();

        $.map(regionTable.Rows, function (regionObj, i) {
            $.map(customerTypeTable.Rows, function (customerTypeObj, i) {
                var categoryFound = false;
                $.map(customerUsageChartTable.Rows, function (customerUsageChartObj, i) {
                    if (((regionObj.CityName + '-' + regionObj.ZipCode) == (customerUsageChartObj.CityName + '-' + customerUsageChartObj.ZipCode)) && (customerTypeObj.CustomerType == customerUsageChartObj.CustomerType)
                                && customerOrderObj.Order == customerUsageChartObj.Order) {

                        categoryFound = true;
                        arr.push({
                            name: customerUsageChartObj.FullName,
                            y:customerUsageChartObj.usage}
                            );
                    }
                });

                if (categoryFound == false) {
                    arr.push(0);
                }
            });
        });

        chart2.push({
            data: arr,
            showInLegend: false,
            color: coloranalyticsHEX[i]
        });
    });

    if (regionTable.Rows.length * categories.length > 6) {
        var colcount = regionTable.Rows.length * categories.length;
        var divwidth = colcount * 100;
        $('#div-TopUsageCustmersChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-TopUsageCustmersChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-TopUsageCustmersChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-TopUsageCustmersChart').attr('style', 'width:833px!important');
    }

    var title = 'Customer Usage Analysis';
    BindColumnSeriesWithCategoriesLocal('div-TopUsageCustmersChart', chart2, seriesname, categories, title, 'Total Usage (kWh)');
}

function TopDevicesChart(caseId) {
    var devicesChart;
    devicesChart = CustomerTable.value.Tables[4];

    chart4 = new Array();
    var seriesname = '';

    $.map(devicesChart.Rows, function (obj, i) {
        chart4.push({
            name: obj.DeviceType,
            y: obj.DeviceCount,
            color: coloranalyticsHEX[i]
        });
    });

    if (devicesChart.Rows.length > 4) {
        var divwidth = devicesChart.Rows.length * 200;
        $('#div-TopDevicesChart').attr('style', 'width:' + (divwidth) + 'px!important;float:left!important');
        $('#h3-TopDevicesChart').attr('style', 'width:' + (divwidth) + 'px!important');
    }
    else {
        $('#div-TopDevicesChart').attr('style', 'width:833px!important;float:left!important');
        $('#h3-TopDevicesChart').attr('style', 'width:833px!important');
    }

    var title = 'Top Devices Analysis';
    BindColumnSeriesLocal('div-TopDevicesChart', chart4, '', title, '# of Devices');
}

$(document).ready(function () {
    //checkClientTimeZone();
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear() - 2));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

    CustomerTable = CustomerAnalysis.GetData($('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '');
    databindtogrid = CustomerTable.value.Tables[2].Rows;
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    LoadGrid();
    PiechartCommon();
    $('#chartDiv').show();
    $('#graphDiv').hide();
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

    $("#excelExportServiceRequest").click(function () {
        $("#jqxgrid").jqxGrid('exportdata', 'xls', 'Customer Details');
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
            //alert("From date should not be greater than to date");
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
    
    CustomerTable = CustomerAnalysis.GetData(dtFrom, dtTo, city, zip);
    $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + city + '|' + zip);

    PiechartCommon();
    LoadGrid();
    CreateMap(CustomerTable.value.Tables[1].Rows, 'div-CustomerMap');
}

function BindStackedColumnSeriesLocal(id, dataseries, seriesname, categories, title, yAxisTitle) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    showInLegend: false,
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
                    return '<tr><td style="color: {series.color}">Customer Region: </td>' +
                            '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' +
                            '</br>' + '<tr><td style="color: {series.color}">Customer Type: </td>' +
                            '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Customer Count: </td>' +
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
            },
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
            plotOptions: {
                series: {
                    //pointWidth: 38
                },
                column: {
                    dataLabels: {
                        rotation: 270,
                        enabled: false,//acc to sheet
                        formatter: function () {
                            if (this.y != 0) {
                                return Math.abs(this.y);
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
                    return '<tr><td style="color: {series.color}">Region & Customer Type: </td>' +
                                '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                                '<tr><td style="color: {series.color}">Customer Name: </td>' +
                                '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                                '<tr><td style="color: {series.color}">Usage: </td>' +
                                '<td style="text-align: right"><b>' + Math.round(this.y) + '</b></td></tr>';
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
            series: [{
                name: seriesname,
                data: dataseries,
                showInLegend: false
            }],
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<tr><td style="color: {series.color}">Device Type: </td>' +
                            '<td style="text-align: right"><b>' + this.point.name + '</b></td></tr>' + '</br>' +
                            '<tr><td style="color: {series.color}">Device Count: </td>' +
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