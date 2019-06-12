var Outagetable;
var startmode = 'y';
var prevMode;
var yearValue;
var databindtogrid;
TitleExport = 'currentoutage-analysis';
gridid = 'jqxgrid';
var divId = 'div-ServiceRequestchart';
var autoheightbool = false;
var autoheightPrimary = false;

//function checkClientTimeZone() {

//    // Set the client time zone
//    var dt = new Date();
//    var tz = -dt.getTimezoneOffset();
//    CurrentOutageDetailed.setcookie(tz.toString());
//    // Expire in one year
//    dt.setYear(dt.getYear() + 1);
//}

function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'OutageId' },
        { name: 'CityName' },
        { name: 'ZipCode', type: 'number' },
        { name: 'CustomerId' },
         { name: 'CustomerName' },
        { name: 'Location' },
        { name: 'CustomerType' },
         { name: 'OutageType' },
         { name: 'Severity' },
         { name: 'RestorationTime', type: 'number' }
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
            { text: 'Outage Id', dataField: 'OutageId', hidden: true },
            { text: 'City Name', dataField: 'CityName', width: '12%' },
              { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
              { text: 'Customer Id', dataField: 'CustomerId', hidden: true },
            { text: 'Customer Name', dataField: 'CustomerName', width: '16%' },
            { text: 'Location', dataField: 'Location', width: '24%' },
            { text: 'Customer Type', dataField: 'CustomerType', width: '13%' },
            { text: 'Outage Type', dataField: 'OutageType', width: '12%' },
              { text: 'Severity', dataField: 'Severity', width: '10%' },
            { text: 'Restoration Time(Hrs)', dataField: 'RestorationTime', width: '19%' }
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function PiechartCommon(mode) {
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    //$('#time-ImpactAnalysis').html("<b>" + title + "</b>");
    //$('#time-ServiceRequestchart').html("<b>" + title + "</b>");
    
    ServiceRequestChart();
    CriticalOutageChart();
}

function CriticalOutageChart() {
    var outageChartTable, custTable, regionTable, severityTable;
    outageChartTable = Outagetable.Tables[3];
    regionTable = Outagetable.Tables[8];
    custTable = Outagetable.Tables[7];
    severityTable = Outagetable.Tables[9];
    
    var regionArray, categories;
    regionArray = new Array();
    categories = new Array();
    chart2 = new Array();
    var seriesname = 'Critical Outages';

    $.map(regionTable.Rows, function (obj, i) {
        regionArray.push(obj.CityName + '-' + obj.ZipCode);
    });

    $.map(custTable.Rows, function (obj, i) {
        categories.push({
            name: obj.CustomerType,
            categories: regionArray
        });
    });

    
    $.map(severityTable.Rows, function (severityObj, i) {
        var arr = new Array();

        $.map(custTable.Rows, function (custObj, i) {

            $.map(regionTable.Rows, function (regionObj, i) {
                var categoryFound = false;
                $.map(outageChartTable.Rows, function (outageObj, i) {
                    if (((regionObj.CityName + '-' + regionObj.ZipCode) == (outageObj.CityName + '-' + outageObj.ZipCode)) && (custObj.CustomerType == outageObj.CustomerType)
                        && severityObj.Severity == outageObj.Severity) {
                        categoryFound = true;
                        arr.push(outageObj.CustomersAffected);
                    }
                });

                if (categoryFound == false) {
                    arr.push(0);
                }
            });

        });
        chart2.push({
            name: severityObj.Severity,
            data: arr,
            color: coloranalyticsHEX[i]
        });
    });

    var title = '';
    var toolTipArray = ['Region & Customer Type: ', 'Severity: ', 'Customers Affected: '];
    BindColumnSeriesLocal('div-ImpactAnalysis', chart2, seriesname, categories, title, "# of Customers Affected", toolTipArray);
}

function ServiceRequestChart() {
    var outageTable, regionTable, periodTable;
    outageTable = Outagetable.Tables[6];
    periodTable = Outagetable.Tables[11];
    regionTable = Outagetable.Tables[10];

    //var periodArray, categories;
    chart2 = new Array();
    var seriesname = '';

    //periodArray = new Array();
    //categories = new Array();

    var chart2 = new Array();
    var tempArray = new Array();
    var tempUsageTbl = new Array();
    var categories = new Array();
    var seriesname = 'Current Outage Detailed';
    //$.map(periodTable.Rows, function (obj, i) {
    //    periodArray.push(obj.Hourly);
    //});


    //$.map(regionTable.Rows, function (obj, i) {
    //    categories.push({
    //        name: obj.CityName + '-' + obj.ZipCode,
    //        categories: periodArray
    //    });
    //});
    //seriesname = 'Year';

    //$.map(rootCauseTable.Rows, function (rootCauseObj, i) {
    //    var arr = new Array();

    //    $.map(regionTable.Rows, function (regionObj, i) {
    //        $.map(periodTable.Rows, function (periodObj, i) {
    //            var categoryFound = false;
    //            $.map(outageTable.Rows, function (outageObj, i) {
    //                if ((periodObj.Hourly == outageObj.Hourly) && ((regionObj.CityName + '-' + regionObj.ZipCode) == (outageObj.CityName + '-' + outageObj.ZipCode))) {
    //                    categoryFound = true;
    //                    arr.push(outageObj.TotalServiceRequest);
//                }
//            });

    //            if (categoryFound == false) {
    //                arr.push(0);
    //            }

//        });
//        chart2.push({
    //            name: regionObj.CityName,
//            data: arr,
//        });
//    });


    //});

    $.map(regionTable.Rows, function (regionObj, i) {
        tempArray = new Array();
        $.map(outageTable.Rows, function (outageObj, i) {
            if ((regionObj.CityName + '-' + regionObj.ZipCode) == (outageObj.CityName + '-' + outageObj.ZipCode)) {
                tempArray.push(outageObj.Hourly);
                tempUsageTbl.push({
                    //color: '#7CB5EC',
                    y: outageObj.TotalServiceRequest
                });
            }
        });
        categories.push({
            name: regionObj.CityName + '-' + regionObj.ZipCode,
            categories: tempArray
        });
        
    });
    chart2.push({
        data: tempUsageTbl,
        showInLegend: false,
        color: "#F8A13F"
    });     
    
    var title = '';
    var toolTipArray = ['Request Time & Region: ', 'Service Request Count: '];
    BindColumnSeriesLocal('div-ServiceRequestchart', chart2, seriesname, categories, title, "Total Service Requests", toolTipArray);
}

$(document).ready(function () {
    //checkClientTimeZone();
    //var date = new Date();
    //$('#txtDateFrom').val('1/1/2013');
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    Outagetable = CurrentOutageDetailed.GetData('','','','','').value;
    $('#hdnParamValues').val('|||||');
    //databindtogrid = Servicetable.Tables[4].Rows;
    databindtogrid = Outagetable.Tables[1].Rows;
    LoadGrid();
    PiechartCommon(startmode);
    //GenerateMapCommon();
    $('#chartDiv').show();
    $('#graphDiv').hide();
    $('#btnFilter').click(function () {
        submit();
    });

});

function submit() {

    var city = "";
    var zip = "";
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');
        if ($(ddlCity).attr('key') == 'CityName') {
            city = $(ddlCity).val();
        }
        if ($(ddlCity).attr('key') == 'Zipcode') {
            zip = $(ddlCity).val();
        }
    }
  
    var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
    var ddlStatus = ($('#ddlOutageStatus').val() == null || $('#ddlOutageStatus').val() == '') ? '' : $('#ddlOutageStatus').val();
    var ddlRestorationTime = ($('#ddlRestorationTime').val() == null || $('#ddlRestorationTime').val() == '') ? '' : $('#ddlRestorationTime').val();

    //Servicetable = ServiceRequest.GetData(startmode, dtFrom, dtTo, city, zip, ddlAccountType, ddlReason).value;
    Outagetable = CurrentOutageDetailed.GetData(city, zip, ddlAccountType, ddlStatus, ddlRestorationTime).value;

    //for pdf
    $('#hdnParamValues').val(city + '|' + zip + '|' + ddlAccountType + '|' + ddlStatus + '|' + ddlRestorationTime);
    databindtogrid = Outagetable.Tables[1].Rows;;
    //databindtogrid = Servicetable.Tables[4].Rows;

    if (Outagetable.Tables.length == 0) {
        $('#jqxgrid').hide();
        //$('#jqxchildgrid').hide();
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#nodata_div1').html('<font color="Red">No data</font>');
    }
    LoadGrid();
    PiechartCommon(startmode);
    if (Outagetable.Tables[0].Rows.length > 0) {
        mapId = "div-CurrentOutageMap";
        createmap(Outagetable.Tables[0].Rows, mapId);
    }
    if (Outagetable.Tables[2].Rows.length > 0) {
        mapId = "div-CurrentUnrestored";
        createmap(Outagetable.Tables[2].Rows, mapId);
    }
    if (Outagetable.Tables[4].Rows.length > 0) {
        mapId = "div-RetoreNextDay";
        createmap(Outagetable.Tables[4].Rows, mapId);
    }
    if (Outagetable.Tables[5].Rows.length > 0) {
        mapId = "div-RestoreUnrestore";
        createmap(Outagetable.Tables[5].Rows, mapId);
    }
}

//code for excel download
$("#btnexport").click(function () {
    $("#" + gridid).jqxGrid('exportdata', 'xls', 'Current Outage Detailed Analysis');
});

$('.imgtoggle').click(function () {

    $('.content').slideToggle('slow');
    var oldSrc = $('.imgtoggle').attr('src');
    var minusImg = "..\\images\\ArrowsMinus.png";
    var plusImg = "..\\images\\ArrowsPlus.png";
    oldSrc = oldSrc == minusImg ? plusImg : minusImg;
    $('.imgtoggle').attr('src', oldSrc);
});

function BindColumnSeriesLocal(id, dataseries, seriesname, categories, title, yaxistext, toolTipArray) {

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
                    cursor: 'normal',
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
                    if (yaxistext == "Number of Customer Affected") {
                        return '<tr><td style="color: {series.color}">' + toolTipArray[0] + '</td>' +
                                '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                                '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                                '<td style="text-align: right"><b>' + this.series.name + '</b></td></tr>' + '</br>' +
                                '<tr><td style="color: {series.color}">' + toolTipArray[2] + '</td>' +
                                '<td style="text-align: right"><b>' + this.y + '</b></td></tr>';
                    }
                    else {
                        return '<tr><td style="color: {series.color}">' + toolTipArray[0] + '</td>' +
                                '<td style="text-align: right"><b>' + this.x + '</b></td></tr>' + '</br>' +
                                '<tr><td style="color: {series.color}">' + toolTipArray[1] + '</td>' +
                                '<td style="text-align: right"><b>' + this.y + '</b></td></tr>' + '</br>';
                    }
                }
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                maxPadding : 0.09,
                title: {
                    text: yaxistext,
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

//function GenerateMapCommon() {
//    var mapId = '';
//    if (Outagetable.Tables[0].Rows.length > 0) {
//        mapId = "div-CurrentOutageMap";
//        createmap(Outagetable.Tables[0].Rows, mapId);
//    }
//    if (Outagetable.Tables[2].Rows.length > 0) {
//        mapId = "div-CurrentUnrestored";
//        createmap(Outagetable.Tables[2].Rows, mapId);
//    }
//    if (Outagetable.Tables[4].Rows.length > 0) {
//        mapId = "div-RetoreNextDay";
//        createmap(Outagetable.Tables[4].Rows, mapId);
//    }
//    if (Outagetable.Tables[5].Rows.length > 0) {
//        mapId = "div-RestoreUnrestore";
//        createmap(Outagetable.Tables[5].Rows, mapId);
//    }
    
//}