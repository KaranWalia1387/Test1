var templateTable = {};
var databindtogrid;
var Tables, templatedata;

$(document).ready(function () {
    try {
        $('#nodata_div').hide();
        Bind();
    } catch (e) {
        console.log(e.message);
    }

    $('#btnFilter').click(function () {
        Bind();
    });
});

function Bind() {
    try {
        $('#jqxgrid').show();
        $('#nodata_div1').hide();
        // var param = { 'iMode': 2 };
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlStatustype = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();
        var ddlModeType = ($('#ddlModeType').val() == null || $('#ddlModeType').val() == '') ? '' : $('#ddlModeType').val();
        var EmailNotification = '', TextNotification = '', PushNotification = '', IVRNotification = '';
        if (ddlModeType == 1)
            EmailNotification = 1;
        else if (ddlModeType == 2)
            TextNotification = 1;
        else if (ddlModeType == 3)
            PushNotification = 1;
        else if (ddlModeType == 4)
            IVRNotification = 1;
        var param = { 'FromDate': dtFrom, 'ToDate': dtTo, 'Status': ddlStatustype, 'EmailNotification': EmailNotification, 'TextNotification': TextNotification, 'PushNotification': PushNotification, 'IVRNotification': IVRNotification };
        CallAjax(Error, param);
    } catch (e) {
        console.log(e.message);
    }
}

function CallAjax(fnError, param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-template.aspx/LoadGridData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                data = data.d;
                templatedata = $.parseJSON(data);
                ConvertData();
                //Bind header functionality
                $('#active_count').text(templateTable.Tables[1].Rows[0]["ActiveCount"]);
                $('#inactive_count').text(templateTable.Tables[1].Rows[0]["InActiveCount"]);
                $('#total_count').text(templateTable.Tables[1].Rows[0]["TotalCount"]);
                var length = parseInt(templateTable.Tables[0].Rows.length);
                if (length > 0) {
                    databindtogrid = templateTable.Tables[0].Rows;
                    LoadGrid();
                } else {
                    $('#nodata_div').show();
                    $('#jqxgrid').hide();
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
        $.map(templatedata, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        templateTable['Tables'] = Tables;
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
            { name: 'TemplateId' },
            { name: 'Action' },
            { name: 'STATUS' },         
            { name: 'NAME' },
            { name: 'Campaign' },
            { name: 'Mode' },
            { name: 'LastUpdated', type: 'date' },
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
        width: "99.8%",
        height: GridHeight * .84,
        columnsheight: 38,
        rowsheight: 40,
        source: dataAdapter,
        sortable: true,
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50', '60', '70', '80'],
        pagesize: 20,
        altrows: true,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'TemplateId', dataField: 'TemplateId', width: '0%', hidden: true, },
            { text: 'Action', dataField: 'Action', width: '10%', cellsrenderer: imagerenderer, },
            { text: 'Status', dataField: 'STATUS', width: '11%', cellsrenderer: imagerenderer, },
            { text: 'Template Name', dataField: 'NAME', width: '20%', cellsrenderer: imagerenderer, },
            { text: 'Campaign', dataField: 'Campaign', width: '22%', hidden: true },
            { text: 'Mode', dataField: 'Mode', width: '30%', cellsrenderer: imagerenderer, },
            { text: 'Last Updated', dataField: 'LastUpdated', width: '28%', cellsformat: 'MM/dd/yyyy h:mm tt', },
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
        case "NAME":
        case "STATUS":
        case "Mode":
        case "Action": return getStatus(row, value, datafield); break;
        default: break;
    }
}

function getStatus(row, value, datafield) {
    var src;
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    var TemplateID = ViewObj.TemplateId;

    if (datafield == "Action") {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var TemplateID = ViewObj.TemplateId;
        var editButton = '<a href="../crm/crm-add-template.aspx?templateid=' + TemplateID + '"" style="text-align:center; margin-top:-5px;display:block; color:#000;" ><i class="fa fa-pencil-square-o Gridimage" style="margin-top:9px;" title="Edit Template" ></i></a>';
        var deleteButton = '<a href="#" " style="text-align:center; margin-top:-5px;display:block; color:#f20202;" ><i class="fa fa-times Gridimage" style="margin-top:10px;"  title="Delete Template" onClick="deleteTemplate(' + row + ')"></i></a>';
        return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + deleteButton + '</td></tr></table></center>';
    }
    if (datafield == 'NAME') {
        TempId = $('#jqxgrid').jqxGrid('getrowdata', row).TemplateId;
        var TempName = $('#jqxgrid').jqxGrid('getrowdata', row)["NAME"];
        return '<div style="padding-left:5px;  padding-top:11px;"><a style="text-decoration:none;" href="../crm/crm-add-template.aspx?templateid=' + TempId + '"" data-backdrop="true" data-keyboard="true">' + TempName + '</a></div>';
    }

    if (datafield == "STATUS") {
        var text;
        text = (value == "Active" ? '<span class="active_new" style="margin-left: 12px !important;margin-top: 2px !important;text-decoration:none !important;">Active</span>' : '<span class="active_new inactive_grid" style="text-decoration:none !important;margin-left: 12px !important;margin-top: 2px !important;">Inactive</span>');
        return '<div style="text-align: center;"><a href="#" ><span id="' + row + '" class="Gridimage" onClick="SingleChangeStatus(' + row + ')"/>' + text + '</a></div>';
    }

    if (datafield == "Mode") {
        var ModeType = $('#jqxgrid').jqxGrid('getrowdata', row).Mode;
        var rowtext = '';
        if (ModeType != "") {
            var arr = ModeType.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].trim() == "Text") {
                    rowtext += '<img  src="../images/text.png" class="Gridimage Gridimage2" title="Text" /> ' + arr[i].trim();
                } if (arr[i].trim() == "Email") {
                    rowtext += ' <img  src="../images/email.png" class="Gridimage Gridimage2" title="Text" /> ' + arr[i].trim();
                } if (arr[i].trim() == "Push") {
                    rowtext += ' <img  src="../images/push.png" class="Gridimage Gridimage2" title="Text" /> ' + arr[i].trim();
                } if (arr[i].trim() == "IVR") {
                    rowtext += ' <img  src="../images/ivr.png" class="Gridimage Gridimage2" title="Text" /> ' + arr[i].trim();
                }

            }
            return rowtext;
            return '<center><table><tr><td>' + rowtext + '</td></tr></table></center>';
        }
    }
}

function deleteTemplate(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var TemplateId = ViewObj.TemplateId;
    if (confirm('Are you sure want to delete the template?')) {
        var param =
      {
          status: null,
          templateid: TemplateId
      };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-template.aspx/SingleChangeStatus",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                templatedata = $.parseJSON(data);
                ConvertData();
                LoadGrid();
                Bind();
                alert(templateTable.Tables[0].Rows[0]["Message"]);
                loader.hideloader();
            },
            error: function (request, status, error) {
                loader.hideloader();
                alert('Error!! ' + request.statusText);
            }
        });

    }
}

function SingleChangeStatus(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var StatusId = ViewObj.STATUS;
    var TemplateId = ViewObj.TemplateId;
    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    if (StatusId == "Active") {
        status = '0';
    }
    else {
        status = '1';
    }
    switch (status) {
        case '0': confirmMsg = "Are you sure you want to Inactivate the status?"; alertMsg = 'Inactivated'; break;
        case '1': confirmMsg = "Are you sure you want to activate the status?"; alertMsg = 'activated'; break;
        default: breaK;
    }
    if (confirm(confirmMsg)) {
        var param =
           {
               status: status,
               templateid: TemplateId
           };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-template.aspx/SingleChangeStatus",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                templatedata = $.parseJSON(data);
                ConvertData();
                LoadGrid();
                Bind();
                alert(templateTable.Tables[0].Rows[0]["Message"]);
                loader.hideloader();
            },
            error: function (request, status, error) {
                loader.hideloader();
                alert('Error!! ' + request.statusText);
            }
        });
    }
    else {
        alert('Status is not ' + alertMsg);
    }
}


