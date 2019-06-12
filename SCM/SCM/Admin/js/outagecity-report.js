var OutageTable;
var databindtogrid;
gridid = 'jqxgrid';
var piechart = '';
var mode = '';

function LoadGrid() {
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'OutageId', type: 'number' },
         { name: 'OutageDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
         { name: 'City', type: 'text' },
         { name: 'ZipCode', type: 'number' },
         { name: 'type', type: 'text' },
         { name: 'Status' },
         { name: 'customer_service_acc', type: 'number' },
         { name: 'name', type: 'text' },
         { name: 'address_line', type: 'text' },
         { name: 'notification_sent' },
         { name: 'S.No', type: 'number' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        //localdata: databindtogrid  

        localdata: OutageTable.Tables[2].Rows
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
        $("#jqxgrid").jqxGrid('addfilter', 'Name', filtergroup);
        // apply the filters.
        $("#jqxgrid").jqxGrid('applyfilters');
    }

    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

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
        pagesize: 5,
        autoshowfiltericon: false,
        columnsresize: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
    [
        { text: 'S.No', dataField: 'S.No', width: '5%' },
        { text: 'OutageId', dataField: 'OutageId', width: '7%' },
        { text: 'Date Of Outage', dataField: 'OutageDate', cellsformat: "MM/dd/yyyy", width: '12%' },
        { text: 'Type', dataField: 'type', width: '13%' },
        { text: 'Status', dataField: 'Status', width: '5%' },
        { text: 'Customer Service Account', dataField: 'customer_service_acc', width: '10%' },
        { text: 'Name', dataField: 'name', width: '8%' },
        { text: 'Address Line', dataField: 'address_line', width: '14%' },
        { text: 'City', dataField: 'City', width: '9%' },
        { text: 'Zip', dataField: 'ZipCode', width: '5%' },
        { text: 'Notification Sent', dataField: 'notification_sent', width: '12%' }
    ]
    });
}

function PiechartCommon(mode,caseId) {

    var piechart = OutageTable.Tables[1];
    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#OutageCityTitle').html(title);

    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: mode = obj.Outage_type.replace(' ', '-'),
            y: mode = parseInt(obj.Outage_per.replace('%', '')),
            color: colorarrHEX[i],
            title: mode = obj.Outage_type.replace(' ', '-'),
        });
    });
    createchart(caseId, divId); //function writtion in common-function.js
}

$(document).ready(function () {
    var date = new Date();
    $('#txtDateFrom').val((date.getMonth() + 1) + '/1/' + (date.getFullYear()));
    $('#txtDateTo').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    chartdivid = 'div-OutageCitychart';
    OutageTable = OutageCity.LoadGridData($('#txtDateFrom').val(), convertlocaltoutc($('#txtDateTo').val()), '', '', '', '', '', '').value;
    $('#hdnParamValues').val($('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0');
    databindtogrid = OutageTable.Tables[0].Rows;

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
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '' || $('#txtSearch').val() != '') ? '2' : '1';

        var zip = ($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var txtSearch = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();
        var ddlOutageType = ($('#ddlOutageType').val() == '--Select--' || $('#ddlOutageType').val() == null || $('#ddlOutageType').val() == '') ? '' : $('#ddlOutageType').val();

        OutageTable = OutageCity.LoadGridData(dtFrom, dtTo, ddlCity, zip, txtSearch, ddlOutageType, '', '', '').value;

        //for pdf
        $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + ddlCity + '|' + zip + '|' + txtSearch + '|' + ddlOutageType, '', '', '');

        databindtogrid = OutageTable.Tables[0].Rows;
        LoadGrid();
        PiechartCommon(mode);

    });

});

