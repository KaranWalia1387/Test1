var Attributetable = {};
var databindtogrid;
var AttributeDate;
$(document).ready(function () {
   // Attributetable = crm_attribute.LoadGrid().value;
   // databindtogrid = Attributetable.Tables[0].Rows;
    // LoadGrid();
    $("#nodata_div").hide();
    getData();
    $('#btnFilter').click(function () {
        getData();           
    });
});
function getData()
{
    try
    {
        $("#nodata_div").hide();
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
        var ddlSegmentType = ($('#ddlSegmentType').val() == 'Select Segment Type' || $('#ddlSegmentType').val() == null || $('#ddlSegmentType').val() == '') ? '' : $('#ddlSegmentType').val();   
        var ddlServiceType = ($('#ddlServiceType').val() == 'Select Service Type' || $('#ddlServiceType').val() == null || $('#ddlServiceType').val() == '') ? '' : $('#ddlServiceType').val();
        var param = { 'fromdate': dtFrom, 'todate': dtTo, 'segmenttypeId': ddlSegmentType, 'utilitytypeId': ddlServiceType, };
        loader.showloader();
        $.ajax({

            type: "POST",
            url: "crm-attribute.aspx/LoadGrid",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                AttributeDate = $.parseJSON(response.d);
                ConvertData();
                var length = parseInt(Attributetable.Tables[0].Rows.length);
                if (length > 0) {
                    databindtogrid = Attributetable.Tables[0].Rows;
                    var length = parseInt(Attributetable.Tables[0].Rows.length);
                    LoadHeader();
                    LoadGrid();
                } else {
                    $('#nodata_div').show();
                    $('#jqxgrid').hide();
                    LoadHeader();                   
                    //$('#graphdivarea').hide();
                }
                loader.hideloader();
            },
            error:function (response){
              //  alert(response.responseText);
                loader.hideloader();
            },
        })
    }
    catch (e) { loader.hideloader(); }
}
function ConvertData() {
    try {
        Tables = new Array();
        $.map(AttributeDate, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        Attributetable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}


function LoadGrid() {    
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
    else {
        $('#nodata_div').hide();
        $('#jqxgrid').show();
        $('#jqxchildgrid').hide();       
    }
   // loader.showloader();
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'AttributeId' },
            { name: 'STATUS' },
            { name: 'NAME' },
            { name: 'Type' },
            { name: 'SegmentTypeName' },
            { name: 'LastUpdated', type: 'date' },
            
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
        //{ contentType: 'application/json; charset=utf-8' }
    //);

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        height: GridHeight * .84,
        rowsheight: 40,
        source: dataAdapter,
        theme: 'darkblue',
        altrows: true,
        columnsheight: 38,
        sortable: true,
       // selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'AttributeId', dataField: 'AttributeId', width: '0%', hidden: true, },
            { text: 'Status', dataField: 'STATUS', width: '11%', cellsrenderer: imagerenderer, },
            { text: 'Attribute Name', dataField: 'NAME', width: '22%' },
            { text: 'Service Type', dataField: 'Type', width: '22%' },            
            { text: 'Segment Type', dataField: 'SegmentTypeName', width: '25%' },
            { text: 'Last Updated', dataField: 'LastUpdated', width: '25%', cellsformat: 'MM/dd/yyyy h:mm tt', },
        ]
    });
   // LoadHeader()
    //loader.hideloader();
    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "STATUS": return getStatus(row, value, datafield); break;
        case "Edit": return getEditButton(row, value); break;
        case "Delete": return getEditButton(row, value); break;
        default: break;
    }
}
function getStatus(row, value, datafield) {
    var AttID = $('#jqxgrid').jqxGrid('getrowdata', row).AttributeId;
    var imgid = (value.toLowerCase() == 'inactive') ? 'inactive_' + AttID : value + '_' + AttID;
    var src;
    src = value == "Active" ? "<span class='active_new' style='margin-left: 12px !important;margin-top: 5px !important;'>Active</span>" :  '<span class="active_new inactive_grid" style="margin-left: 12px !important;margin-top: 5px !important;">Inactive</span>';
    return '<div style="text-align: center;"><span id=' + imgid + ' class="status">' + src + '</span></div>';
}
function LoadHeader() {

    //$('#demandusageval').text(SegmentTable.Tables[1].Rows[0]["TotalCount"]);

    $('#lblTotal').text(Attributetable.Tables[1].Rows[0]["TotalCount"]);
    $('#lblActive').text(Attributetable.Tables[1].Rows[0]["ActiveCount"]);
    $('#lblInactive').text(Attributetable.Tables[1].Rows[0]["InActiveCount"]);
}
$(document).on("click", ".status", function () {
    var idLock = this.id;
    var Status = idLock.split('_')[0];
    var AttId = idLock.split('_')[1];

    var message;
    var value;
    if (Status == 'inactive') {
        message = 'Are you sure you  want to Activate?';
        value = 1;
    }
    else {
        message = 'Are you sure  you want to Deactivate?';
        value = 0;
    }
    if (confirm(message)) {
        var param = { AttributeId: AttId, value: value };
        UpdateDelete(param);
    }
});
function UpdateDelete(param) {
    try
    {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-attribute.aspx/UpdateDelete",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                var result = JSON.parse(data.d);
                if (result.Table[0].Status == 1) {
                    alert(result.Table[0].Message);
                    getData();
                    //loader.hideloader();
                }
                // GetData();
            },
            error: function (response) {
                //  debugger;
                alert(response.responseText);
                loader.hideloader();
            },
        })
    }
    catch (e) { loader.hideloader(); }

}
