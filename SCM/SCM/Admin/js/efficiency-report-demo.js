﻿var efficiencytable, serviceID;
var databindtogrid;
var GridHeight = '';
TitleExport = 'efficiency-report';
gridid = 'jqxgrid';
var reportdata;
var colors = ['#3366CC', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#DD4477', '#66AA00', '#b82e2e', '#316395', '#994499', '#22aa99'];
var piechart = '';
var mode = '1';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var imagerenderer = function (row, datafield, value) {
    return getPopupView(row, value);
    //    switch (datafield) {
    //        case 'ID': return getPopupView(row, value); break;
    //       // default: return getresult(row, value); break;
    //}
}

function getPopupView(row, value) {
    try {
        serviceID = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
        //var servicePopup = $('#jqxgrid').jqxGrid('getrowdata', row)["ID"];
        return '<div style="padding-left:5px;" id="Popup"><span class="details" data-id=' + serviceID + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userDetails">' + value + '</span></div>';

    }
    catch (ex) { }
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
//function BindColumn(data) {
//    debugger
//    $.each(data, function (i, item) {
//        Count = i + 1;
//        item["recid"] = Count;
//    });
//}
function LoadGrid() {
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: true,
        },
        multiSearch: true,
        searches: [
         { field: 'ID', caption: 'ID', type: 'int' },
         { field: 'CityName', caption: 'City Name', type: 'text' },
         { field: 'EEType', caption: 'Efficiency Type', type: 'text' },
         { field: 'Title', caption: 'Title', size: '20%', type: 'text' },
         { field: 'PeopleEnrolled', caption: 'People Enrolled', type: 'int' }
        ],
        columns: [
            { field: 'ID', caption: 'ID', size: '20%', sortable: true },
            { field: 'CityName', caption: 'City Name', size: '20%', sortable: true },
            { field: 'EEType', caption: 'Efficiency Type', size: '20%', sortable: true },
            { field: 'Title', caption: 'Title', size: '20%', sortable: true },
            { field: 'PeopleEnrolled', caption: 'People Enrolled', size: '20%', sortable: true }
        ],
        records: databindtogrid
    });



    //autoheightPrimary = false;
    //if (databindtogrid.length <= 10)
    //    autoheightPrimary = true;
    ////Getting the source data with ajax GET request
    //var source = {
    //    datatype: "array",
    //    datafields: [
    //     { name: 'ID', type: 'number' },
    //          { name: 'CityId', type: 'number' },
    //     { name: 'CityName' },
    //     { name: 'EEType' },
    //     { name: 'Title' },
    //     { name: 'PeopleEnrolled', type: 'number' }
    //    ],
    //    //root: "Employees",
    //    //record: "Employee",
    //    //id: 'ID',
    //    async: false,
    //    record: 'Table',
    //    sortable: true,
    //    localdata: databindtogrid

    //};
    //var dataAdapter = new $.jqx.dataAdapter(source,
    //    { contentType: 'application/json; charset=utf-8' }
    //);


    //$("#jqxgrid").jqxGrid({
    //    width: "98%",
    //    autoheight: autoheightPrimary,
    //    height: "320",
    //    autorowheight: true,
    //    source: dataAdapter,
    //    theme: 'darkblue',
    //    sortable: true,
    //    selectionmode: 'singlerow', //To trigger row select event
    //    pageable: true,
    //    pagesizeoptions: ['10', '20', '30', '40', '50'],
    //    pagesize: 20,
    //    columnsresize: true,
    //    columnsreorder: true,
    //    enabletooltips: true,
    //    //selectionmode: 'singlerow',
    //    //initrowdetails: initrowdetails,
    //    //rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 3px;'></div>", rowdetailsheight: 120, rowdetailshidden: true },
    //    //ready: function () {
    //    //},
    //    columns:
    //    [
    //        //{ text: 'ID', dataField: 'ID', width: '20%', cellsrenderer: imagerenderer },
    //        { text: 'ID', dataField: 'ID', width: '0%', hidden: true },
    //        { text: 'City Name', dataField: 'CityName', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
    //        { text: 'Efficiency Type', dataField: 'EEType', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
    //        { text: 'Title', dataField: 'Title', width: '30%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
    //        { text: 'People Enrolled', dataField: 'PeopleEnrolled', width: '20%', cellsrenderer: imagerenderer }//, cellsrenderer: imagerenderer
    //    ]
    //});
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CityName' },
         { name: 'EEType' },
         { name: 'Title' },
         { name: 'PeopleEnrolled', type: 'number' }
        ],
        root: "Employees",
        record: "Employee",
        id: 'ID',
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxchildgrid").jqxGrid({
        width: "99%",
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
        selectionmode: 'singlerow',
        rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 3px;'></div>", rowdetailsheight: 120, rowdetailshidden: true },
        ready: function () {
        },
        columns:
        [
            { text: 'City Name', dataField: 'CityName', width: '20%' },
            { text: 'Efficiency Type', dataField: 'EEType', width: '20%' },
            { text: 'Title', dataField: 'Title', width: '35%' },
            { text: 'People Enrolled', dataField: 'PeopleEnrolled', width: '25%' }
        ]
    });
}
function PiechartCommon(mode, caseId) {
    drawOutageChart(caseId);
    drawOutageChartByCity(mode, caseId);
}
function drawOutageChart(caseId) {
    var titles = 'Total People Enrolled by EEType';
    var piechart = efficiencytable.Tables[2];
    $('#EfficiencyTitle').html(titles);
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: obj.EEType,
            y: obj.PeopleEnrolled,
            color: colorarrHEX[i],
            title: obj.EEType,
        });
    });
    if (processed_json.length > 0) {
        $('#titleEfficiency').show();
        $('#titleEfficiency').html(title);
    }
    createchart(caseId, 'div-Efficiencychart');

}

function drawOutageChartByCity(mode, caseId) {
    var titles = 'Total People Enrolled by City';
    var piechart = efficiencytable.Tables[3];
    $('#EEtitlebyCity').html(titles);
    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: obj.City,
            y: obj.PeopleEnrolled,
            color: colorarrHEX[i],
            title: obj.City,
            drilldown: mode == 1 ? "Efficiency" : "second"
        });
    });
    createchart(caseId, 'div-Efficiencychart1');

}

function chartclick(name, chartType, drilldown, type) {

    var piechart = efficiencytable.Tables[4];
    processed_json4 = new Array();
    if (drilldown == 'second') {
        piechart = efficiencytable.Tables[2];
        $.map(piechart.Rows, function (obj, i) {
            processed_json4.push({
                name: obj.EEType,
                y: obj.PeopleEnrolled,
                color: colorarrHEX[i],
                title: obj.EEType,
            });
        });
    } else {
        if (piechart != undefined) {
            $.map(piechart.Rows, function (obj, i) {
                if (obj.CityName.toLowerCase() == name.trim().toLowerCase()) {
                    processed_json4.push({
                        name: obj.EEType,
                        y: obj.PeopleEnrolled,
                        color: colorarrHEX[i],
                        title: obj.EEType
                    });
                }
            });
        }
    }
    return processed_json4;
}

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
        chartgraphsection(defOpen);
    }
});
$(document).ready(function () {

    $('#nodata_div').hide();
    $('#nodata_div').html('');

    //START NEW UI 12/18/2014
    //source = {
    //    datatype: "array",
    //    datafields: [
    //    { name: 'CityName' },
    //        { name: 'CityId', type: 'number' },
    //     { name: 'Bills Unpaid', type: 'number' },
    //      { name: 'Bills Paid', type: 'number' }
    //    ],
    //    async: false,
    //    record: 'Table',
    //    sortable: true,
    //    localdata: databindtogrid
    //};
    //END NEW UI 12/18/2014

    //var date = new Date();
    //$('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    //$('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

    efficiencytable = Efficiency.LoadGridData(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), '', '', '').value;
    databindtogrid = efficiencytable.Tables[0].Rows;
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    if (databindtogrid.length == 0 || databindtogrid == null) {
        $('#jqxgrid').hide();
        $('#nodata_div').show();
    }
    else {
        $('#grid').show();
        $('#nodata_div').hide();
        $('#nodata_div').html('');
        LoadGrid();
        drawOutageChart();
        drawOutageChartByCity();
    }
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
            // var count = $("#" + gridid).jqxGrid('columns').records.length;
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Efficiency Report');
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
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '') ? '2' : '1';

        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";

        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
                city = $(ddlCity).attr('cityid');
            }
        }

        efficiencytable = Efficiency.LoadGridData(mode, dtFrom, dtTo, city, zip, ddlAccountType).value;
        //for pdf
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
        databindtogrid = efficiencytable.Tables[0].Rows;

        if (databindtogrid.length == 0 || databindtogrid == null) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
            $('#nodata_div').show();
            $('#nodata_div').html('<font color="Red">No Data</font>');
        }
        else if (mode == '1') {

            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            $('#nodata_div').hide();
            $('#nodata_div').html('');
            drawOutageChart();
            drawOutageChartByCity();
            gridid = 'jqxgrid';
            LoadGrid();

        }
        else {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            $('#nodata_div').hide();
            $('#nodata_div').html('');
            drawOutageChart();
            drawOutageChartByCity();
            gridid = 'jqxchildgrid';
            LoadChildGrid();

        }
    } catch (e) { }
}

var row;
$('#jqxgrid').bind('rowselect', function (event) {

    row = event.args.rowindex;

});

//getting values in popup
$(document).on("click", "#Popup", function () {
    var Id = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
    //var CustName ='';
    var SrAct = '';
    $("#Div1").html('');
    // $("#Div1").append();
    var tblstring = "<table>"
    var temptable = efficiencytable.Tables[1].Rows;

    for (var i = 0; i < databindtogrid.length; i++) {
        var CustName = '';
        if (temptable[i].ID == Id) {

            tblstring += "<tr>"
            tblstring += "<th >"
            tblstring += 'Customer Name :';
            tblstring += "</th>";
            tblstring += "<td>"
            tblstring += (CustName + temptable[i].CustomerName);
            tblstring += "</td>"
            tblstring += "<th>"
            tblstring += 'Service Account :'
            tblstring += "</th>"
            tblstring += "<td >"
            tblstring += (SrAct + temptable[i].ServiceAccount);
            tblstring += "</td>"
            tblstring += "</tr>"


        }

    }
    tblstring += "</table>";
    $("#Div1").html(tblstring);
    //$('#lblCustName').html(CustName);
    //$('#lblServiceAccount').html(SrAct);
    return;
});