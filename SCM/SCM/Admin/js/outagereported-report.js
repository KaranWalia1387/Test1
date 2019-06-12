var OutageTable;
var databindtogrid;
gridid = 'jqxgrid';
var piechart = '';
var divId = 'div-OutageReportedchart';
var mode = '';

function LoadGrid() {
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'S.No', type: 'text' },
         { name: 'outageid' },
         { name: 'outageDate' },
         { name: 'outage_message' },
         { name: 'CityName' },
         { name: 'ZipCode' },
         { name: 'AccountNumber' },
         { name: 'name' },
         { name: 'time_reported_on' },
         { name: 'outage_status' },
         { name: 'Latitude' },
         { name: 'Longitude' },
         { name: 'AttachmentName' }

        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var addfilter = function () {
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = 'Beate';
        var filtercondition = 'contains';
        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtervalue = 'Andrew';
        filtercondition = 'starts_with';
        var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);

        filtergroup.addfilter(filter_or_operator, filter1);
        filtergroup.addfilter(filter_or_operator, filter2);
        // add the filters.
        $("#jqxgrid").jqxGrid('addfilter', 'City', filtergroup);
        // apply the filters.
        $("#jqxgrid").jqxGrid('applyfilters');
    }


    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    var imagerenderer = function (row, value, datafield) {

        if (datafield != '') {

            return '<div style="text-align: center;"><a href="http://173.51.209.200:8142/adminnew/Attachments/' + datafield + '" target="_blank" ><img src="../images/AttachmentIcon.png" class="Gridimage"/></a></div>';

        }
        else {
            return 'No Attachment';
        }
    }



    $("#jqxgrid").jqxGrid({

        width:GridWidth,
        height: GridHeight,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        filterable: true,
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 8,
        autoshowfiltericon: false,
        columnsresize: true,
        columnsreorder: true,
        columns:

        [
            { text: 'S.No', dataField: 'S.No', width: '5%' },
         { text: 'OutageId', dataField: 'outageid', width: '7%' },
          { text: 'Outage Message', dataField: 'outage_message', width: '7%' },
           { text: 'OutageDate', dataField: 'outageDate', width: '10%', cellsformat: "MM/dd/yyyy" },
           { text: 'Time Reported On', dataField: 'time_reported_on', width: '10%', cellsformat: "MM/dd/yyyy" },
         { text: 'Outage Status', dataField: 'outage_status', width: '10%' },
         { text: 'Customer Acc#', dataField: 'AccountNumber', width: '7%' },
         { text: 'Customer Name', dataField: 'name', width: '13%' },
        { text: 'Latitude', dataField: 'Latitude', width: '5%' },
         { text: 'Longitude', dataField: 'Longitude', width: '5%' },
          { text: 'City', dataField: 'CityName', width: '7%' },
                        { text: 'Zip', dataField: 'ZipCode', width: '5%' },
                        { text: 'Attachment', dataField: 'AttachmentName', width: '10%', cellsrenderer: imagerenderer },

        ]
    });
}

function PiechartCommon(mode,caseId) {

    var piechart = OutageTable.Tables[0];
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#OutageReportedTitle').html(title);

    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: obj.outage_city,
            y: parseInt(obj.outage_City_per.replace('%', '')),
            color: colorarrHEX[i],
            title: obj.outage_city
        });
    });
    createchart(caseId, divId);
}

$(document).ready(function () {
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-OutageReportedchart';
    OutageTable = OutageReported.LoadGridData($('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '','').value;

    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||||');
    databindtogrid = OutageTable.Tables[1].Rows;

    LoadGrid();
    PiechartCommon();

    $("#ddlCity").change(function () {
        var obj = $('#ddlCity option:selected');
        if (obj.index() > 0) {
            LoadUserZipcode($(obj).text());
        }
        else {
            $('#ddluserzipcode').empty();
        }
    });

    $('#btnFilter').click(function () {
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

        var zip = ($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var txtSearch = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();
        var ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();

        OutageTable = OutageReported.LoadGridData(dtFrom, dtTo, ddlCity, zip, txtSearch, ddlOutageType, '').value;

        //for pdf
        $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + ddlCity + '|' + zip + '|' + txtSearch + '|' + ddlOutageType+'|'+ '');

        databindtogrid = OutageTable.Tables[1].Rows;
        LoadGrid();
        PiechartCommon();

    });

});

