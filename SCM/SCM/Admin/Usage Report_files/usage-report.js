var defOpen = 1 // #4708
var usagetable;
var tempTable;
var max = 0;
var databindtogrid;
var GridHeight = '';
TitleExport = 'usage-report';
gridid = 'jqxgrid';
var divId = 'div-Usagechart';
isdecimal = 1;
var autoheightbool = false;
var autoheightPrimary = false;
//on page load
var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
function LoadGrid() {
    $("#btnSend").hide();

    autoheightPrimary = false;
    if (databindtogrid.length == 0) {
        $('#jqxgrid').hide();
        $('#nodata_div').show();
    }
    else {
        $('#jqxgrid').show();
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'MonthYear', type: 'text' },
        { name: 'CityName' },
              { name: 'CityId' },
         { name: 'TotalUsage', type: 'text' },
         { name: 'TotalWaterUsage', type: 'text' },
         { name: 'TotalGasUsage', type: 'text' }
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
        height: "320",
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Month Year', dataField: 'MonthYear', width: '16%', cellsformat: "MMMM,yyyy", cellsrenderer: imagerenderer },
            { text: 'City Name', dataField: 'CityName', width: '14%', cellsrenderer: imagerenderer },
            { text: 'Total Power Usage (kWh)', dataField: 'TotalUsage', width: '24%', cellsrenderer: imagerenderer },
            { text: 'Total Water Usage (HCF)', dataField: 'TotalWaterUsage', width: '24%', cellsrenderer: imagerenderer },
            { text: 'Total Gas Usage (CCF)', dataField: 'TotalGasUsage', width: '22%', cellsrenderer: imagerenderer }
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1366) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

//for 2nd grid after filter
function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length == 0) {
        $('#jqxchildgrid').hide();
        $('#nodata_div').show();
    }
    else {
        $('#jqxchildgrid').show();
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'Usagedate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
        { name: 'Customer Name' },
        { name: 'Customer Type' },
        { name: 'ZipCode' },
        { name: 'CityName' },
        { name: 'TotalUsage', type: 'decimal' },
        { name: 'TotalWaterUsage', type: 'decimal' },
        { name: 'TotalGasUsage', type: 'decimal' },
        { name: 'AccountNumber' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );
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
    $("#jqxchildgrid").jqxGrid({

        width: "99%",
        height: "320",
        autoheight: autoheightbool,
        source: dataAdapter,

        sortable: true,
        selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        rendertoolbar: function (toolbar) {
            $("#btnSend").show();
        },
        columns:
        [
          { text: 'Date Of Reading', dataField: 'Usagedate', cellsformat: "MM/dd/yyyy", width: '16%', },
          { text: 'Customer Name', dataField: 'Customer Name', width: '16%' },
          { text: 'Account Type', dataField: 'Customer Type', width: '14%' },
          { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
          { text: 'City Name', dataField: 'CityName', width: '12%' },
          { text: 'Total Power Usage (kWh)', dataField: 'TotalUsage', width: '18%' },
          { text: 'Total Water Usage (HCF)', dataField: 'TotalWaterUsage', width: '22%' },
          { text: 'Total Gas Usage (CCF)', dataField: 'TotalGasUsage', width: '20%' },
          { text: 'AccountNumber', dataField: 'AccountNumber', width: '0', hidden: true },
        ]
    });
    //$("#jqxchildgrid").jqxGrid('hidecolumn', 'AccountNumber');

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1366) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function chartclick(name, chartType, drilldown, type) {

    var mode = drilldown.toLowerCase().indexOf('power') >= 0 ? 1 : drilldown.toLowerCase().indexOf('water') > 0 ? 2 : 3;
    var processed_json5 = new Array();
    if (drilldown.toLowerCase().indexOf('zipcode') > 0) {
        var secondary = usagetable.Tables[2];
        var zipcode = name.toLowerCase().replace(' ', '').split('-')[0];
        $.map(secondary.Rows, function (obj, i) {
            if (obj.ZipCode == zipcode.trim()) {
                processed_json5.push({
                    name: obj.MonthYear,
                    y: mode == 1 ? obj.TotalUsage : mode == 2 ? obj.TotalWaterUsage : obj.TotalGasUsage,
                    color: colorarrHEX[i],
                    title: obj['ZipCode'] + ' ' + obj.MonthYear

                });
            }
        });
        return processed_json5;
    }
    else {
        var cityName = drilldown.toLowerCase().replace(' ', '').split('-')[0];
        var monthly;
        var ddlAccountType = ($('#ddlAccountType').val() == '--Select--' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        if (ddlAccountType == '')
            monthly = usagetable.Tables[0];
        else
            monthly = usagetable.Tables[2];
        $.map(monthly.Rows, function (obj, i) {
            if (obj['CityName'].toLowerCase().replace(' ', '') == cityName) {
                processed_json5.push({
                    name: obj.MonthYear,
                    y: mode == 1 ? obj.TotalUsage : mode == 2 ? obj.TotalWaterUsage : obj.TotalGasUsage,
                    color: colorarrHEX[i],
                    title: obj['CityName'] + ' ' + obj.MonthYear

                });
            }
        });
        return processed_json5;
    }
}
//For high chart
function PiechartCommon(mode, caseId) {
    var tempvalue;
    $('#div-subChart').show();
    $('#div-mainChart').height(150);
    $('#borderline').show();

    switch (mode) {
        case 0:
            tempvalue = usagetable.Tables[1];
            $('#subChart1Title').html("<b>" + 'City-Monthly' + "</b>");
            break;
        case 1:
            tempvalue = usagetable.Tables[1];

            $('#subChart1Title').html("<b>" + 'Zip-Monthly' + "</b>");
            break;
        case 2:
            tempvalue = usagetable.Tables[1];
            $('#subChart1Title').html("<b>" + 'CustomerType-Monthly' + "</b>");
            break;
        case 3:
            tempvalue = usagetable.Tables[1];
            $('#subChart1Title').html("<b>" + 'City-Monthly' + "</b>");
            break;
        case 4:
            tempvalue = usagetable.Tables[1];
            $('#div-subChart').hide();
            $('#borderline').hide();
            $('#div-mainChart').height('335');
            $('#div-mainChart').css("width", "100%");
            break;
    }

    var piechart = tempvalue.Rows;

    if (piechart.length > 0) {
        $('#nodata_div').hide();
        $('#div-Usagechart').show();
        $('#usagetitle').show();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div').html('<font color="Red">No Data</font>');
        $('#div-Usagechart').hide();
        $('#usagetitle').hide();
    }

    //Removed title if dates are blank
    var title;
    if ($('#txtDateFrom').val() == "" && $('#txtDateTo').val() == "")
        title = "";
    else
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#usagetitle').html("<b>" + title + "</b>");

    processed_json = new Array();
    processed_json2 = new Array();
    processed_json3 = new Array();
    processed_json4 = new Array();
    var powerTotal = 0;
    var GasTotal = 0;
    var waterTotal = 0;
    switch (mode) {
        case 0:
        case 3:
            {

                $.map(piechart, function (obj, i) {
                    var power = obj.CityName + '- Power(kWh)';
                    var water = obj.CityName + '- Water(HCF)';
                    var gas = obj.CityName + '- Gas(CCF)';

                    if (mode == 4) {
                        power = obj.MonthYear + '- Power(kWh)';
                        water = obj.MonthYear + '- Water(HCF)';
                        gas = obj.MonthYear + '- Gas(CCF)';
                    }

                    powerTotal = powerTotal + parseInt(obj.TotalUsage == null ? 0 : obj.TotalUsage);
                    GasTotal = GasTotal + parseInt(obj.TotalGasUsage == null ? 0 : obj.TotalGasUsage);
                    waterTotal = waterTotal + parseInt(obj.TotalWaterUsage == null ? 0 : obj.TotalWaterUsage);
                    processed_json2.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power,
                        drilldown: power
                    });

                    processed_json3.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water,
                        drilldown: water
                    });

                    processed_json4.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas,
                        drilldown: gas
                    });
                });
                if (powerTotal != 0) {
                    processed_json.push({
                        name: 'Power',
                        y: powerTotal,
                        color: colorarrHEX[0],
                        title: 'Power',
                        drilldown: 'Power'
                    });
                }
                if (waterTotal != 0) {
                    processed_json.push({
                        name: 'Water',
                        y: waterTotal,
                        color: colorarrHEX[2],
                        title: 'Water',
                        drilldown: 'Water'
                    });
                }
                if (GasTotal != 0) {
                    processed_json.push({
                        name: 'Gas',
                        y: GasTotal,
                        color: colorarrHEX[4],
                        title: 'Gas',
                        drilldown: 'Gas'
                    });
                }
            }
            break;

        case 1:
            {

                $.map(piechart, function (obj, i) {
                    var power = obj.ZipCode + '- Power(kWh)';
                    var water = obj.ZipCode + '- Water(HCF)';
                    var gas = obj.ZipCode + '- Gas(CCF)';
                    powerTotal = powerTotal + parseInt(obj.TotalUsage == null ? 0 : obj.TotalUsage);
                    GasTotal = GasTotal + parseInt(obj.TotalGasUsage == null ? 0 : obj.TotalGasUsage);
                    waterTotal = waterTotal + parseInt(obj.TotalWaterUsage == null ? 0 : obj.TotalWaterUsage);
                    processed_json2.push({
                        name: obj.ZipCode,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power,
                        drilldown: 'Power' + '-' + 'ZipCode'
                    });

                    processed_json3.push({
                        name: obj.ZipCode,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water,
                        drilldown: 'Water' + '-' + 'ZipCode'
                    });

                    processed_json4.push({
                        name: obj.ZipCode,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas,
                        drilldown: 'Gas' + '-' + 'ZipCode'
                    });

                });
                if (powerTotal != 0) {
                    processed_json.push({
                        name: 'Power',
                        y: powerTotal,
                        color: colorarrHEX[0],
                        title: 'Power',
                        drilldown: 'Power'
                    });
                }
                if (waterTotal != 0) {
                    processed_json.push({
                        name: 'Water',
                        y: waterTotal,
                        color: colorarrHEX[2],
                        title: 'Water',
                        drilldown: 'Water'
                    });
                }
                if (GasTotal != 0) {
                    processed_json.push({
                        name: 'Gas',
                        y: GasTotal,
                        color: colorarrHEX[4],
                        title: 'Gas',
                        drilldown: 'Gas'
                    });
                }

            }
            break;
        case 2:
            {
                $.map(piechart, function (obj, i) {
                    var customerType = obj.CustomerType;
                    var power = customerType + '- Power(kWh)';
                    var water = customerType + '- Water(HCF)';
                    var gas = customerType + '- Gas(CCF)';
                    powerTotal = powerTotal + parseInt(obj.TotalUsage == null ? 0 : obj.TotalUsage);
                    GasTotal = GasTotal + parseInt(obj.TotalGasUsage == null ? 0 : obj.TotalGasUsage);
                    waterTotal = waterTotal + parseInt(obj.TotalWaterUsage == null ? 0 : obj.TotalWaterUsage);

                    processed_json2.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    processed_json3.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water
                    });

                    processed_json4.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas
                    });
                });
                if (powerTotal != 0) {
                    processed_json.push({
                        name: 'Power',
                        y: powerTotal,
                        color: colorarrHEX[0],
                        title: 'Power',
                        drilldown: 'Power'
                    });
                }
                if (waterTotal != 0) {
                    processed_json.push({
                        name: 'Water',
                        y: waterTotal,
                        color: colorarrHEX[2],
                        title: 'Water',
                        drilldown: 'Water'
                    });
                }
                if (GasTotal != 0) {
                    processed_json.push({
                        name: 'Gas',
                        y: GasTotal,
                        color: colorarrHEX[4],
                        title: 'Gas',
                        drilldown: 'Gas'
                    });
                }
            }
            break;
        case 4:
            {
                $.map(piechart, function (obj, i) {
                    var power = obj.MonthYear + '- Power(kWh)';
                    var water = obj.MonthYear + '- Water(HCF)';
                    var gas = obj.MonthYear + '- Gas(CCF)';
                    processed_json.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    processed_json.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i + 1],
                        title: water
                    });

                    processed_json.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i + 2],
                        title: gas
                    });
                });
            }
            break;
    }


    var subChart1Series = new Array();
    var subChart2Series = new Array();
    var pieChart1Index = 0;
    var pieChart2Index = 0;

    switch (mode) {
        case 0:
        case 3:
            {
                var pieChartTable1 = usagetable.Tables[0];
                if (mode == 3) {
                    pieChartTable1 = usagetable.Tables[2]
                }
                $.map(pieChartTable1.Rows, function (obj, i) {
                    var power = obj.CityName + '-' + obj.MonthYear + '- Power(kWh)';
                    var water = obj.CityName + '-' + obj.MonthYear + '- Water(HCF)';
                    var gas = obj.CityName + '-' + obj.MonthYear + '- Gas(CCF)';

                    subChart1Series.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    subChart1Series.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water
                    });

                    subChart1Series.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas
                    });
                });

                var pieChartTable2 = usagetable.Tables[2];
                if (mode == 3) {
                    pieChartTable2 = usagetable.Tables[3]
                }
                $.map(pieChartTable2.Rows, function (obj, i) {
                    var power = obj.MonthYear + '- Power(kWh)';
                    var water = obj.MonthYear + '- Water(HCF)';
                    var gas = obj.MonthYear + '- Gas(CCF)';

                    subChart2Series.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    subChart2Series.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water
                    });

                    subChart2Series.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas
                    });
                });
            }
            break;
        case 1:
            {
                var pieChartTable1 = usagetable.Tables[2];
                $.map(pieChartTable1.Rows, function (obj, i) {
                    var power = obj.ZipCode + '-' + obj.MonthYear + '- Power(kWh)';
                    var water = obj.ZipCode + '-' + obj.MonthYear + '- Water(HCF)';
                    var gas = obj.ZipCode + '-' + obj.MonthYear + '- Gas(CCF)';

                    subChart1Series.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    subChart1Series.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water
                    });

                    subChart1Series.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas
                    });

                });

                var pieChartTable2 = usagetable.Tables[3];
                $.map(pieChartTable2.Rows, function (obj, i) {
                    var power = obj.MonthYear + '- Power(kWh)';
                    var water = obj.MonthYear + '- Water(HCF)';
                    var gas = obj.MonthYear + '- Gas(CCF)';

                    subChart2Series.push({
                        name: power,
                        y: obj.TotalUsage,
                        color: colorarrHEX[i],
                        title: power
                    });

                    subChart2Series.push({
                        name: water,
                        y: obj.TotalWaterUsage,
                        color: colorarrHEX[i],
                        title: water
                    });

                    subChart2Series.push({
                        name: gas,
                        y: obj.TotalGasUsage,
                        color: colorarrHEX[i],
                        title: gas
                    });
                });
            }
            break;
        case 2:
            {
                var pieChartTable1 = usagetable.Tables[2];
                $.map(pieChartTable1.Rows, function (obj, i) {

                    var customerType = obj.CustomerType;

                    subChart1Series.push({
                        name: customerType + '-' + obj.MonthYear,
                        y: obj.TotalUsage,
                        //    color: colorarrHEX[i],
                        title: customerType + '-' + obj.MonthYear
                    });

                    subChart1Series.push({
                        name: customerType + '-' + obj.MonthYear,
                        y: obj.TotalWaterUsage,
                        //  color: colorarrHEX[i],
                        title: customerType + '-' + obj.MonthYear
                    });

                    subChart1Series.push({
                        name: customerType + '-' + obj.MonthYear,
                        y: obj.TotalGasUsage,
                        //  color: colorarrHEX[i],
                        title: customerType + '-' + obj.MonthYear
                    });
                });

                var pieChartTable2 = usagetable.Tables[3];
                $.map(pieChartTable2.Rows, function (obj, i) {

                    subChart2Series.push({
                        name: obj.MonthYear,
                        y: obj.TotalUsage,
                        //   color: colorarrHEX[i],
                        title: obj.MonthYear
                    });

                    subChart2Series.push({
                        name: obj.MonthYear,
                        y: obj.TotalWaterUsage,
                        //    color: colorarrHEX[i],
                        title: obj.MonthYear
                    });

                    subChart2Series.push({
                        name: obj.MonthYear,
                        y: obj.TotalGasUsage,
                        //  color: colorarrHEX[i],
                        title: obj.MonthYear
                    });
                });
            }
            break;
    }

    createchart(caseId, 'div-mainChart', 'Main'); //function writtion in common-function.js
    if (piechart.length > 0) {
        createchartWithSeries(caseId, 'div-subChart1', subChart1Series, 'usageChart');
        $('#subChart1-nodata').hide();
    }
    else {
        createchartWithSeries(caseId, 'div-subChart1', []);
        $('#subChart1-nodata').show();
    }

    if (piechart.length > 0) {
        createchartWithSeries(caseId, 'div-subChart2', subChart2Series, 'usageChart');
        $('#subChart2-nodata').hide();
    }
    else {
        createchartWithSeries(caseId, 'div-subChart2', []);
        $('#subChart2-nodata').show();
    }
}

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});


$(document).ready(function () {

    //code for resize grid by anuj
    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1366) {
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadChildGrid();
                }
            }
            else {
                if ($(window).width() < 1100) {
                    $("#jqxgrid").jqxGrid('autoresizecolumns');
                }
                else {
                    LoadGrid();
                }
            }
        }
        catch (e) { }
    });

    //code end

    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

    $('#btnSend').click(function () {
        SendNotification();

        return false;
    });

    chartdivid = 'div-Usagechart';
    mode = 0;
    submit();
    //
    //usagetable = Usage.LoadGridData($('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), mode, '', '', '', '', '').value;
    //$('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|0||||||0');
    //databindtogrid = usagetable.Tables[0].Rows;

    //LoadGrid();
    //  PiechartCommon(mode);

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
    });


    // NEW UI 12/17/2014
    $("#btnExcelExport").click(function () {
        try {

            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Usages Report');
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

    // START NEW UI 10/1/2015
    $("#ddlMessageMode").change(function (i, obj) {
        var opt = $(this).val();
        showhideeditor(opt);

    });

    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
    });

    $('#btnRemoveFile').hide();
    showhideeditor($("#ddlMessageMode").val());

    // END NEW UI 10/1/2015


});

function submit() {
    try {
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
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        var city = '';
        var zip = '';
        if (ValidatePage('divFilter')) {
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

            var ddlAccountType = ($('#ddlAccountType').val() == '--Select--' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

            if ((city == '' && zip == '' && ddlAccountType == '')) {
                mode = 0;
            }
            else {

                mode = (city != '') ? 1 : 0;

                if (zip != '') {
                    mode = 2;
                }

                if ((city != '' || zip != '') && ddlAccountType != '') {
                    mode = 4;
                } else if (ddlAccountType != '') {
                    mode = 3;
                }
            }

            if (mode > 0) {
                tempTable = Usage.LoadGridData(dtFrom, dtTo, mode, city, zip, ddlAccountType, "0", "1");
                usagetable = tempTable.value;
                databindtogrid = tempTable.value.Tables[0].Rows;

                $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|1|' + city + '|' + zip + '|' + ddlAccountType + '|' + "0" + '|' + "1" + '|2');
                PiechartCommon(mode);

                chartgraphsection(defOpen);
                $("#jqxchildgrid").jqxGrid('showcolumn', 'ZipCode')

                $('#jqxgrid').hide();
                if (!(databindtogrid.length == 0))
                    $('#jqxchildgrid').show();
                gridid = 'jqxchildgrid';
                LoadChildGrid();

                // #4708
            }
            else {
                tempTable = Usage.LoadGridData(dtFrom, dtTo, mode, '', '', ddlAccountType, '', '');
                usagetable = tempTable.value;
                databindtogrid = tempTable.value.Tables[0].Rows;

                //usagetable = Usage.LoadGridData(dtFrom, dtTo, mode, '', '', ddlAccountType, '', '').value;
                //databindtogrid = tempTable.value.Tables[0].Rows;

                $('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|0|||' + ddlAccountType + '|||0');
                PiechartCommon(mode);
                chartgraphsection(defOpen);
                if (databindtogrid.length <= 10)
                    autoheightPrimary = true;
                $('#jqxgrid').show();
                $('#jqxchildgrid').hide();
                gridid = 'jqxgrid';
                LoadGrid();


            }

            //if (databindtogrid.length == 0)
            //    nodatashow();

        }
        else { return false; }

    }
    catch (e) { }
}


// START NEW UI 10/1/2015

//var checkboxFormatter = function (row, value) {
//    var EmailID = $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID;
//    return "<input type='checkbox' id=" + EmailID + " name='checkboxIsBCC' class='emailCC' >";
//}


function SendNotification() {
    var AccountNumbers = '';
    var rowindexes = $('#jqxchildgrid').jqxGrid('getselectedrowindexes');
    var boundrows = $('#jqxchildgrid').jqxGrid('getboundrows');
    var selectedrows = new Array();
    for (var i = 0; i < rowindexes.length; i++) {
        var row = boundrows[rowindexes[i]];
        if (AccountNumbers == "") {
            AccountNumbers = row['AccountNumber'];
        } else {
            var str = AccountNumbers + ',' + row['AccountNumber']
            AccountNumbers = str;
        }
        //selectedrows.push(row);
    }

    $('#hdnAccountNos').val(AccountNumbers);

    if (AccountNumbers == "") {
        alert('There is no row selected');
        return;
    }

    $('#ddltypeofmessage').val('');
    $('#ddlMessageMode').val('0');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

    var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
    var value = objEditor.get_content();
    if (value == "" && ($('#ddlMessageMode').val()) == "1") {
        alert('Please Enter Message');
        isvalid = false;
    }

    return isvalid;
}


function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
        $(".texttype").addClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $("#txtEditor").attr('mandatory', '1');
        $("#txtmsgsubject").attr('mandatory', '1');
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        $("#txtMessage").attr('mandatory', '1');
        $("#txtEditor").removeAttr('mandatory');
        $("#txtmsgsubject").attr('mandatory', '0');
        getLength();
    }
}

//function GetFileSize(fileid) {
//    if ($('#fileupd').val() != '') {
//        try {
//            var fileSize = 0;
//            //for IE
//            if ($.browser.msie) {
//                //before making an object of ActiveXObject, 
//                //please make sure ActiveX is enabled in your IE browser
//                var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#" + fileid)[0].value;
//                var objFile = objFSO.getFile(filePath);
//                var fileSize = objFile.size; //size in kb
//                fileSize = fileSize / 1048576; //size in mb 
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//                //for FF, Safari, Opeara and Others
//            else {
//                fileSize = $('#fileupd')[0].files[0].size //size in kb
//                //fileSize = $("#fUpload")[0].files[0].size //size in kb
//                fileSize = fileSize / 1048576; //size in mb
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//        }
//        catch (e) {
//        }
//    }
//    else {
//        if ($("#txtEditor").val() == '') {
//            alert("Please enter message");
//            return false;
//        }
//        else {
//            if ($('#ddltypeofmessage').val() == '0') {
//                alert("Please select type of message.");
//                return false;
//            }

//            if ($('#txtmsgsubject').val() == '' && $('#ddlMessageMode').val() == 1) {
//                alert('Please enter subject.');   //alert("Please enter subject. " + $('#ddlMessageMode').val());
//                return false;
//            }
//            else
//                return true;
//        }
//    }
//}

function File_OnChange(sender) { $('#btnRemoveFile').show(); }
function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function getLength() {
    var textbox = $("#ddlMessageMode").val();
    var txtbxlength = (textbox == 0 || textbox == 2) ? 200 : 500;
    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;

    var txtMessage = $("#txtMessage").val();
    if (txtMessage.trim().length >= txtbxlength) {
        $("#txtMessage").val(txtMessage.substring(0, txtbxlength));
    }

}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

// END NEW UI 10/1/2015