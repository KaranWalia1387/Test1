var SegmentTable = {};
var databindtogrid;
var headerdata;
var Tables, SegmentData;
var mode = '1';
var GridHeight = '320px';

$(document).ready(function () {    
    Bind();
    $('#btnFilter').click(function () {
        Bind();
    });
});

function Bind() {
    try {
        $('#jqxgrid').show();
        $('#nodata_div1').hide();
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
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlCampignType = ($('#ddlType').val() == 'Select Campaign Type' || $('#ddlType').val() == null || $('#ddlType').val() == '') ? '' : $('#ddlType').val();
        var ddlSegment = ($('#ddlServiceType').val() == 'Select Segment' || $('#ddlServiceType').val() == null || $('#ddlServiceType').val() == '') ? '' : $('#ddlServiceType').val();
        var ddlFrequency = ($('#ddlFrequency').val() == 'Select Frequency Type' || $('#ddlFrequency').val() == null || $('#ddlFrequency').val() == '') ? '' : $('#ddlFrequency').val();

        var param = { 'fromdate': dtFrom, 'todate': dtTo, 'campaigntypeId': ddlCampignType, 'segmentId': ddlSegment, 'frequencyId': ddlFrequency };
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
            url: "crm-campaign-configuration.aspx/getData",
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
                    LoadGrid();
                    LoadHeader();
                    $('#nodata_div1').hide();
                } else {
                    $('#nodata_div1').show();
                    $('#jqxgrid').hide();
                    LoadHeader();
                }
            
                loader.hideloader();
            },
            error: fnError,
        });
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
        $('#nodata_div1').show();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#nodata_div1').hide();
        $('#jqxgrid').show();
        $('#jqxchildgrid').hide();
        $("#statusBill").attr('disabled', 'disabled');
    }
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
            { name: 'CampaignID' },
            { name: 'Action' },
            { name: 'Status' },            
            { name: 'Campaign' },
            { name: 'Segment' },
            { name: 'Type' },
            { name: 'Frequency' },
            { name: 'LastUpdated', type: 'date' },            
            { name: 'LastRun', type: 'date' },
            { name: 'NextRun', type: 'date' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

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
            { text: 'CampaignId', dataField: 'CampaignID', width: '0%', hidden: true, },
            { text: 'Action', datafield: 'Action', width: '8%', cellsrenderer: imagerenderer, },
            { text: 'Status', datafield: 'Status', width: '11%', cellsrenderer: imagerenderer, },
            { text: 'Campaign', dataField: 'Campaign', width: '20%', cellsrenderer: imagerenderer, },
            { text: 'Segment', dataField: 'Segment', width: '25%', },
            { text: 'Campaign Type', dataField: 'Type', width: '15%', },
            { text: 'Frequency', dataField: 'Frequency', width: '13%', },
            { text: 'Last Updated', dataField: 'LastUpdated', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt', },
            { text: 'Last Run', dataField: 'LastRun', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt', },
            { text: 'Next Run', dataField: 'NextRun', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt', },
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
        case "Campaign":
        case "Status":
        case "Action": return getAction(row, value, datafield); break;
        default: break;
    }
}

function getAction(row, value, datafield) {
    if (datafield == "Campaign")
    {
        CampId = $('#jqxgrid').jqxGrid('getrowdata', row).CampaignID;
        var CampName = $('#jqxgrid').jqxGrid('getrowdata', row)["Campaign"];
        return '<div style="padding-left:5px; padding-top:11px;"><a style="text-decoration:none;" href="../CRM/crm-create-campaign.aspx?CampaignId=' + CampId + '"" data-backdrop="true" data-keyboard="true">' + CampName + '</a></div>';
    }

    if (datafield == "Status")
    {
        var CompID = $('#jqxgrid').jqxGrid('getrowdata', row).CampaignID;
        var imgid = (value.toLowerCase() == 'inactive') ? 'inactive_' + CompID : value + '_' + CompID;
        var src;
        src = value == "Active" ? "<span class='active_new'>Active<span>" : "<span class='active_new inactive_grid'>Inactive<span>";
        return '<div style="text-align: center;"><span id=' + imgid + ' class="status">' + src + '</span></div>';
    }

    if (datafield == "Action")
    {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var CampaignID = ViewObj.CampaignID;
        var campaingStatus = ViewObj.Status;        
        var editbutton = '<a href="../CRM/crm-create-campaign.aspx?CampaignId=' + CampaignID + '"" style="text-align:center; margin-top:-5px;display:block; color:#000;"><i class="fa fa-pencil-square-o Gridimage" style="margin-top:9px;" title="Edit Campaign" ></i></a>';
        var deletebutton = '<a href="#" style="text-align:center; margin-top:-5px;display:block; color:#f20202;"><i class="fa fa-times Deleteimage" style="margin-top:11px;" id=' + CampaignID + ' title="Delete Campaign" ></i></a>';
        var runbutton = ''//'<a href="#" style="text-align:center; margin-top:-5px;display:block; color:#404040;"><i class="fa fa-play Run" id=' + campaingStatus + ' title="Run Campaign" ></i></a>';
        if (campaingStatus.toLowerCase() == 'active') {
            return '<center><table><tr><td>' + editbutton + '</td><td style="Padding-Left:8px;">' + deletebutton + '</td></tr></table></center>';
        }
        else
        {            
            return '<center><table><tr><td>' + editbutton + '</td><td style="Padding-Left:8px;">' + deletebutton + '</td></tr></table></center>';
        }
    }
}

$(document).on("click", ".status", function () {
    var idLock = this.id;
    var CompStatus = idLock.split('_')[0];
    var CompId = idLock.split('_')[1];
    var message;
    var value;
    if (CompStatus == 'inactive') {
        message = 'Are you sure want to Activate?';
        value = 1;
    }
    else {
        message = 'Are you sure want to Deactivate?';
        value = 0;
    }
    if (confirm(message)) {
        var param = { 'compid': CompId, 'act': 'Status', 'value': value };
        UpdateDeleteSegment(param);
        
    }
});

$(document).on("click", ".Deleteimage", function () {
    var idLock = this.id;
    var CompStatus = idLock.split('_')[0];
    var CompId = idLock;//idLock.split('_')[1];
    if (confirm('Are you sure want to Delete?')) {
        var param = { 'compid': CompStatus, 'act': 'Description', 'value': '' };
        UpdateDeleteSegment(param);
    }
});

// Get all selected row , change statue and delete
function ALLUpdateDeleteSegment(action) {
    var CampaignID = '';
    var param = '';
    var message = '';
    var rowindexes = $('#jqxgrid').jqxGrid('getselectedrowindexes');
    var boundrows = $('#jqxgrid').jqxGrid('getboundrows');
    var selectedrows = new Array();
    for (var i = 0; i < rowindexes.length; i++) {
        var row = boundrows[rowindexes[i]];
        if (CampaignID == "") {
            CampaignID = row['CampaignID'];
        } else {
            var str = CampaignID + ',' + row['CampaignID']
            CampaignID = str;
        }
    }
    if (action == 'status') {
        message = 'Are you sure want to Activate?';
        param = { 'compid': CampaignID, 'act': 'Status', 'value': 1 };
    }
    else {

        message = 'Are you sure want to Delete?';
        param = { 'compid': CampaignID, 'act': 'Description', 'value': '' };

    }
    if (confirm(message)) {
        UpdateDeleteSegment(param);
    }
}

function UpdateDeleteSegment(param) {
    try {
        $.ajax({
            type: "POST",
            url: "crm-campaign-configuration.aspx/UpdateDelete",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                var SegmentData = $.parseJSON(response.d);
                if (SegmentData.Table[0].STATUS == 1) {
                    Bind();
                    alert(SegmentData.Table[0].Message);

                }
            },
            error: function (response) {
                alert(response.responseText);
                loader.hideloader();
            },
        });
    }
    catch (e) { loader.hideloader(); }
}

function LoadHeader() {

    $('#CampaignTotalCount').text(SegmentTable.Tables[1].Rows[0]["TotalCount"]);
    $('#CampaignActiveCount').text(SegmentTable.Tables[1].Rows[0]["ActiveCount"]);
    $('#CampaignInactiveCount').text(SegmentTable.Tables[1].Rows[0]["InActiveCount"]);

}

$(document).on("click", ".Run", function () {
    var idLock = this.id;
    var CompStatus = idLock.split('_')[0];
    var CompId = idLock;//idLock.split('_')[1];  
    var param = { };
    callRun(param);   
});

function callRun(param) {
    try {
        $.ajax({
            type: "POST",
            url: "crm-campaign-configuration.aspx/CallRun",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                var message = $.parseJSON(response.d);
                if (message == 1)
                {
                    alert('Your Campaign Executed');
                }
                if (message == 0) {
                    alert('There is some error in Execution of campaign');
                }
            },
            error: function (response) {
                // alert(response.responseText);
                // loader.hideloader();
            },
        });
    }
    catch (e) { }
}



