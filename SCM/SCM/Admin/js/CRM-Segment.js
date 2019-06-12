var SegmentTable = {};
var databindtogrid;
var Tables, SegmentData;
var mode = '1';
var GridHeight = '320px';

$(document).ready(function () {
    GetData();
 
    $('#btnFilter').click(function () {
        try {
            $('#jqxgrid').show();
            $('#nodata_div').hide();
            var startDate = $('#txtDateFrom').val();
            var endDate = $('#txtDateTo').val();

            if (startDate != '' && endDate != '') {
                if (Date.parse(startDate) > Date.parse(endDate)) {
                    $("#txtDateTo").val('');
                   // alert("From date should not be greater than to date");
                    alert("'From Date' should not be greater than 'To date'");
                    $("#txtDateTo").val("");
                    return false;
                }
            }

            var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? null: $('#txtDateFrom').val();
            var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? null : $('#txtDateTo').val();

            var ServiceType = ($('#ddlServiceType').val() == null || $('#ddlServiceType').val() == '') ? null : $('#ddlServiceType').val();
            var SegmentType = ($('#ddlType').val() == null || $('#ddlType').val() == '') ? null : $('#ddlType').val();
            var param = { 'iMode': 1, 'dFromDt': dtFrom, 'dToDt': dtTo, 'ServiceType': ServiceType, 'SegmentType': SegmentType }
            CallAjax(Error, param);
        }
        catch (e) {
            console.log(e.message);
        }

    });

});

function GetData() {
    try {
        $('#jqxgrid').show();
        $('#nodata_div').hide();
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? null : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? null : $('#txtDateTo').val();

        var ServiceType = ($('#ddlServiceType').val() == null || $('#ddlServiceType').val() == '') ? null : $('#ddlServiceType').val();
        var SegmentType = ($('#ddlType').val() == null || $('#ddlType').val() == '') ? null : $('#ddlType').val();
        var param = { 'iMode': 1, 'dFromDt': dtFrom, 'dToDt': dtTo, 'ServiceType': ServiceType, 'SegmentType': SegmentType }
        CallAjax(Error, param);
    } catch (e) {
        console.log(e.message);
    }
}
//GETDATA
function CallAjax(fnError, param) {
    try
    {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-segmentations.aspx/getData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                SegmentData = $.parseJSON(response.d);
                ConvertData();
                var length = parseInt(SegmentTable.Tables[0].Rows.length);
                if (length > 0) {
                    databindtogrid = SegmentTable.Tables[0].Rows;
                    var length = parseInt(SegmentTable.Tables[0].Rows.length);
                    LoadHeader();
                    LoadGrid();
                } else {
                    LoadHeader();
                    $('#nodata_div').show();
                    $('#jqxgrid').hide();
                }
                loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) { loader.hideloader(); }

}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(SegmentData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        SegmentTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

//GRID FUNCTIONS
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#nodata_div').hide();
        $('#jqxgrid').show();
        $('#jqxchildgrid').hide();
        $("#statusBill").attr('disabled', 'disabled');
    }
    if (databindtogrid.length <= 10)
        autoheightbool = true;

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'SegmentID' },
            { name: 'Action' },
            { name: 'Status' },
            { name: 'Segment' },
            { name: 'SegmentCode' },
            { name: 'LastUpdated', type: 'date' },
            { name: 'Type' },
            { name: 'ServiceTypeName' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    if ($(window).width() <= 1400) {
        $("#jqxgrid").jqxGrid({
            height: GridHeight * .96,
        });

    }

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        //autoheight: false,
        height: GridHeight * .84,
        columnsheight: 38,
        rowsheight: 40,
        source: dataAdapter,
        sortable: true,
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        altrows: true,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'SegmentID', dataField: 'SegmentID', width: '0%', hidden: true, },
            { text: 'Action', dataField: 'Action', width: '8%', cellsrenderer: imagerenderer, },
            { text: 'Status', dataField: 'Status', width: '11%', cellsrenderer: imagerenderer, },
            { text: 'Segment', dataField: 'Segment', width: '23%', cellsrenderer: imagerenderer, },
            { text: 'Segment Code', dataField: 'SegmentCode', width: '14%', },
            { text: 'Service Type', dataField: 'ServiceTypeName', width: '15%', },
            { text: 'Segment Type', dataField: 'Type', width: '12%', },
            { text: 'Last Updated', dataField: 'LastUpdated', width: '17%', cellsformat: 'MM/dd/yyyy h:mm tt', },
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "Segment":
        case "Status":
        case "Action": return getAction(row, value, datafield); break;
        default: break;
    }
}

function getAction(row, value, datafield) {
    if (datafield == "Segment") {
        SegId = $('#jqxgrid').jqxGrid('getrowdata', row).SegmentID;
        var SegName = $('#jqxgrid').jqxGrid('getrowdata', row)["Segment"];
        return '<div style="padding-left:5px; padding-top:11px;"><a style="text-decoration:none;" class="details" href="../CRM/crm-add-segmentations.aspx?SegmentId=' + SegId + '"" data-backdrop="true" data-keyboard="true">' + SegName + '</a></div>';
    }
    if (datafield == "Status") {
        var SegID = $('#jqxgrid').jqxGrid('getrowdata', row).SegmentID;
        src = value == "Active" ? "<span class='active_new'>Active</span>" : "<span class='active_new inactive_grid'>Inactive</span>";
        var imgid = (value.toLowerCase() == 'inactive') ? 'inactive_' + SegID : value + '_' + SegID;
        return '<div style="text-align: center;"><span id=' + imgid + ' class="status">' + src + '</span></div>';
    }
    if (datafield == "Action") {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var SegmentID = ViewObj.SegmentID;
        var editbutton = '<a href="../CRM/crm-add-segmentations.aspx?SegmentId=' + SegmentID + '""  style="text-align:center; margin-top:-5px;display:block; color:#000;"><i class="fa fa-pencil-square-o Gridimage" style="margin-top:9px;" title="Edit Segment"></i></a>';
        var deletebutton = '<a href="#" style="text-align:center; margin-top:-5px;display:block; color:#f20202;"><i class="fa fa-times Deleteimage" style="margin-top:13px; margin-left:-5px;" title="Delete Segment" id=' + SegmentID + ' ></i></a>';
        return '<center><table><tr><td>' + editbutton + '</td><td style="Padding-Left:8px;">' + deletebutton + '</td></tr></table></center>';
    }
}

$(document).on("click", ".status", function () {
    var idLock = this.id;
    var Status = idLock.split('_')[0];
    var SagId = idLock.split('_')[1];

    var message;
    var value;
    if (Status == 'inactive') {
        message = 'Are you sure want to Active?';
        value = 1;
    }
    else {
        message = 'Are you sure want to Deactivate?';
        value = 0;
    }
    if (confirm(message)) {
        var param = { 'segid': SagId, 'value': value };
        loader.showloader();
        UpdateDeleteSegment(param);
    }
});

$(document).on("click", ".Deleteimage", function () {
    var idLock = this.id;
    var StatusId = idLock.split('_')[0];
    var SagId = idLock.split('_')[1];
    if (confirm('Are you sure want to Delete')) {
        var param = { 'segid': StatusId, 'value': '' };
        loader.showloader();
        UpdateDeleteSegment(param);
    }
});

// method for change status and delete segment
function UpdateDeleteSegment(param) {
    try
    {
        $.ajax({
            type: "POST",
            url: "crm-segmentations.aspx/UpdateDeleteSegment",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                GetData();
                var result = JSON.parse(data.d);                
                    alert(result.Table[0].Message);              
                    loader.hideloader();
            },
            error: function (response) {
                alert(response.responseText);
                loader.hideloader();
            },
        })
    }
    catch (e) { loader.hideloader(); }

}

function LoadHeader() {
    $('#lblTotal').text(SegmentTable.Tables[1].Rows[0]["TotalCount"]);
    $('#lblActive').text(SegmentTable.Tables[1].Rows[0]["ActiveCount"]);
    $('#lblInactive').text(SegmentTable.Tables[1].Rows[0]["InActiveCount"]);
}