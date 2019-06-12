var modevalue = 0;
var custid;
var reasonid;
var PromotionID;
var databindtogrid;
var usertable;
var drawpoltable;
var GridWidth = '';
var GridHeight = '';
var planned = 0;
var unplanned = 0;
var total = 0;
var outid;
var defOpen = 1;
var customertable;
var Historygrid;
var IsPlanned = null;
var templateData = '';

$(document).ready(function () {
    $('#tempmasked').mask('(000) 000-0000'); //Text masking applied
    BindData();
    
  $(document).on("click", ".filterdrop", function () {  
        modevalue = 1;
        outid = this.id;
        BindChildData();       
    });

    $("#ddlMessageMode").change(function (i, obj) {
        var opt = $(this).val();
        showhideeditor(opt);
    });

    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
        removeFile(); //bug id 29396
        var opt = $(this).val(); //bug id 29396
        showhideeditor(opt);  //bug id 29396
    });

    $('#btnRemoveFile').hide();
   
    $('#lnkPlanned').click(function () {
        $('#lblPlan').css({ 'font-weight': 'bold' });
        $('#lblCurr').css({ 'font-weight': 'normal' });
        modevalue = 0;
        IsPlanned = 1;
        $("#outage_map_canvas").html('');       
        $("#outage_map_canvas").css('height', GridHeight * .50);
        $("#outage_map_canvas").width('100%');
        BindData();
        ShowhideAllLink(true);
        $('#row0jqxgrid [role=gridcell]').css('background', '#BEC1C1'); 
    });

    $('#lnkCurrent').click(function () {
        $('#lblPlan').css({ 'font-weight': 'normal' });
        $('#lblCurr').css({ 'font-weight': 'bold' });
        IsPlanned = 0; modevalue = 0;
        $("#outage_map_canvas").html('');     
        $("#outage_map_canvas").css('height', GridHeight * .50);
        $("#outage_map_canvas").width('100%');
        BindData();
        ShowhideAllLink(true);
        $('#row0jqxgrid [role=gridcell]').css('background', '#BEC1C1'); 
    });

    $('#lnkAll').click(function () {
        IsPlanned = null; modevalue = 0;
        BindData();
        ShowhideAllLink(false);
    });

    $('#btnBack').click(function () {
        $('#mapView').removeClass('activeMap');
        $('#mapView').addClass('map2');
        $('#gridView').addClass('activeGrid'); 
       
        modevalue = 0;
        outid = '';
        $('#nodata_div').hide();
        document.getElementById('map').style.display = 'none';
        document.getElementById('outage_map_canvas').style.display = 'none';
        document.getElementById('graphDiv').style.display = 'block';
        BindData();

        return false;
    });

    $('#btnSend').click(function () {
        $("#ddltypeofmessage").attr('disabled', true);
        SendNotification();
       
        return false;
    });

    $('#btnEdit').click(function () {
        outid = usertable.Table3[0]["OutageId"];        
            window.location = 'configure-outage.aspx?OutageId=' + outid;
       
    });

    showhideeditor($("#ddlMessageMode").val());

    $('#CustomerData').click(function () {
       $('.tab_nav_1 li.active').removeClass('active');
       $('#outagedata').hide();
       $(this).addClass('active');
        $('.outage_history_box').hide();
        $('.customer_list_box').show();
        LoadChildGrid(); $('#btnSend').show();
    });

    $('#HistoryData').click(function () {
        $('.tab_nav_1 li.active').removeClass('active');
        $('#outagedata').hide();
        $('.customer_list_box').hide();
        $('.outage_history_box').show();
        $(this).addClass('active');
        LoadHistoryGrid(); $('#btnSend').hide();
    });
    $('#DetailData').click(function () {
        $("#outage_child_map_canvas").replaceWith('<div class="map_1" id="outage_child_map_canvas" style="height: 100%!important;"></div>');
        $("#outage_child_map_canvas").css('height', GridHeight * .36);
        $("#outage_child_map_canvas").width('50%');
        $('.tab_nav_1 li.active').removeClass('active');
        $('.customer_list_box').hide();
        $('.outage_history_box').hide();
        $('#outagedata').show();
        $(this).addClass('active'); $('#btnSend').hide();
        loadChildOutageMap();
        //outage_child_map_canvas
    });

    $('#btnSubmitReply').click(function () {
        if (validateconfiguration() == true) {
            if (!IsFileValidForUpload()) {
                alert('Invalid file type select; file extentions allowed are : gif, png, bmp, jpg, jpeg, txt and rtf.');
                return false;
            }
            $('#btnSubmitReply').attr("disabled", "disabled");
            var placeholderid = $('#ddltypeofmessage').val();
            var subject = $("#txtmsgsubject").val();
            var messageBody = ($("#ddlMessageMode").val() != "1") ? $("#txtMessage").val() : $('#summernote').summernote('code');
            var accnumber = $("#hdnAccountNos").val();
            var attachmentPath = "Attachments";
            var src = ""; var mailfrom = "2";
            var attachmentType = "";
            var messageMod = $("#ddlMessageMode").val();
            var file = document.getElementById('fileupd');
            if (file.files.length > 0) {
                src = saveUloadedFile();
                attachmentType = file.files[0].name.split('.')[1];
            }
            var param = "{placeHolderID:'" + placeholderid + "',subject:'" + subject + "',mailFrom:'" + mailfrom + "',messageBody:'" + messageBody + "',accountNumber:'" + accnumber + "',attachmentPath:'Attachments',attachmentName:'" + src + "',attachmentType:'" + attachmentType + "',messageMode:'" + messageMod + "'}";

            $.ajax({
                type: "POST",
                url: "../UserManagement/Customer.aspx/InsertMessages",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }
    });

    function ShowhideAllLink(check)
    {
        if (check) {
            $("#lnkAll").fadeIn('slow').css('display', '');
        } else {
            $("#lnkAll").fadeOut('slow').css('display', 'none');
        }

    }

    function OnSuccess(data, status) {
        if (parseInt(data.d) > 0)
            alert('Message has been sent successfully');
        else
            alert('Message not sent.');
        $("#jqxchildgrid").jqxGrid('clearselection');

        resetForm(); removeFile();
        Popup.hide('PopupAddTopic');
        loader.hideloader();
        $('#btnSubmitReply').removeAttr("disabled");
    }

    function saveUloadedFile() {

        var data = new FormData();

        var files = $("#fileupd").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        var flName = '';
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            async: false,
            url: "../Upload.ashx?Path=Notification",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) { flName = data; }
        });

        ajaxRequest.done(function (xhr, textStatus) {
            // Do other operation
        });

        return flName;
    }

    function OnError(request, status, error) {
        alert(request.statusText);
        $('#btnSubmitReply').removeAttr("disabled");
    }

    function resetForm() {
        if ($("#ddlMessageMode").val() == "1") {
            $('#summernote').summernote('code', '');
            $("#txtmsgsubject").val('');
            showhideeditor('0');
        }
        else { $('textarea').val(''); }
        $('#ddlMessageMode').val('');
        $('#txtMessage').text('');
    }

    $("#ddlMessageMode").change(function () {
        try {
            if ($("#ddltypeofmessage").val() != "" && $("#ddlMessageMode").val() != "") {
                loader.showloader();
                resetMessageField();
                GetData();
                loader.hideloader();

            }
        } catch (e) {
            loader.hideloader();
            console.log(e.message);
        }

    })
    
});

function BindChildData() {
    try {
        loader.showloader();
        var param;
        if (modevalue == 0) {
            param = {
                fromdate: '', todate: '',
                Outageid: '', IsPlanned: IsPlanned
            }
            $('#hdnParamValues').val('' + '|' + '' + '|' + '' + '|' + IsPlanned + '|' + modevalue);
        }
        else {
            param = {
                fromdate: '', todate: '',
                Outageid: outid, IsPlanned: IsPlanned
            }
            $('#hdnParamValues').val('' + '|' + '' + '|' + outid + '|' + IsPlanned + '|' + modevalue);
        }


        $.ajax({
            type: "POST",
            url: "Outage-Cancellation.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data, status) {
                loader.hideloader();
                usertable = JSON.parse(data.d);
                databindtogrid = usertable.Table;              
                $('#row0jqxgrid [role=gridcell]').css('background', '#BEC1C1');               
                if (modevalue == 1) {
                    $('#row0jqxgrid [role=gridcell]').css('background', '#fff');
                }
                if (IsPlanned != null) {
                    $('#contenttablejqxgrid .jqx-fill-state-pressed').removeClass('jqx-fill-state-pressed');
                }
                drawpoltable = usertable.Table4;
                customertable = usertable.Table2;
                Historygrid = usertable.Table5;
                if ($('.tab_nav_1 li.active')[0].id == "HistoryData") {
                    $('#outagedata').hide();
                    $('.customer_list_box').hide();
                    $('.outage_history_box').show();
                    LoadHistoryGrid();
                }
                else if ($('.tab_nav_1 li.active')[0].id == "CustomerData") {
                    $('#outagedata').hide();
                    $('.outage_history_box').hide();
                    $('.customer_list_box').show();
                    LoadChildGrid();
                    $('#btnSend').show();
                }
                else {
                    $('#outagedata').show();
                    $('.customer_list_box').hide();
                    $('.outage_history_box').hide();
                }
                $('#filter_btn_explorer').hide();
                if (usertable.Table3[0].Resolution == "Resolved") {
                    $("#btnEdit").hide();
                }
                else { $("#btnEdit").show(); }
                $("#lblOutageHeading").text(usertable.Table3[0].Outage);
                $("#lblcusteffected").text(usertable.Table3[0].Total);
                $("#lblCommunity").text(usertable.Table3[0].CityName);
                $("#lblOutageStatus").text(usertable.Table3[0].Resolution); 
                $("#lblOutageCause").text(usertable.Table3[0].Cause);
              //  var startdate = new Date(usertable.Table3[0].StartDate).toLocaleString();
               // var resultstartdate = startdate.split(":");
                $("#lblstartdate").text(usertable.Table3[0].StartDate);
               // var enddate = new Date(usertable.Table3[0].EndDate).toLocaleString();
               // var resultenddate = enddate.split(":");
                $("#lblenddate").text(usertable.Table3[0].EndDate);
                loadChildOutageMap();
            }
        });
    }
    catch (e) { }
}

function BindData() {
    try {
        loader.showloader();
        var param;
        if (modevalue == 0) {
            param = {
                fromdate: '', todate: '',
                Outageid: '', IsPlanned: IsPlanned
            }
            $('#hdnParamValues').val('' + '|' + '' + '|' + '' + '|' + IsPlanned+'|'+modevalue);
        }
        else {
            param = {
                fromdate: '', todate: '',
                Outageid: outid, IsPlanned: IsPlanned
            }
            $('#hdnParamValues').val('' + '|' + '' + '|' + outid + '|' + IsPlanned + '|' + modevalue);
        }

       
        $.ajax({
            type: "POST",
            url: "Outage-Cancellation.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data, status) {
                loader.hideloader();
                usertable = JSON.parse(data.d);
                if (usertable == null) {
                    $('#jqxgrid').html('<font color="Red">No Data</font>');
                }
                else {                    
                    databindtogrid = usertable.Table;
                    $("#colon").hide();
                    $("#btnAdd").show();
                    planned = usertable.Table1[0].Planned;
                    unplanned = usertable.Table1[0].Unplanned;
                    total = usertable.Table1[0].Total;
                    $("#lblplanned").text(planned);
                    $("#lblunplanned").text(unplanned);
                    $("#lbltotal").text(total);
                    $('#jqxgrid').show();
                    LoadGrid();
                    $('#row0jqxgrid [role=gridcell]').css('background', '#BEC1C1');
                    loadOutageMap();
                    if (modevalue == 1) {
                        $('#row0jqxgrid [role=gridcell]').css('background', '#fff');
                    }
                    if (IsPlanned != null) {
                        $('#contenttablejqxgrid .jqx-fill-state-pressed').removeClass('jqx-fill-state-pressed');
                    }
                    drawpoltable = usertable.Table4;
                    customertable = usertable.Table2;
                    Historygrid = usertable.Table5;
                    if ($('.tab_nav_1 li.active')[0].id == "HistoryData") {
                        $('#outagedata').hide();
                        $('.customer_list_box').hide();
                        $('.outage_history_box').show();
                        LoadHistoryGrid();
                    }
                    else if ($('.tab_nav_1 li.active')[0].id == "CustomerData") {
                        $('#outagedata').hide();
                        $('.outage_history_box').hide();
                        $('.customer_list_box').show();
                        LoadChildGrid();
                        $('#btnSend').show();
                    }
                    else {
                        $('#outagedata').show();
                        $('.customer_list_box').hide();
                        $('.outage_history_box').hide();
                    }
                    $('#filter_btn_explorer').hide();
                    if (usertable.Table3[0].Resolution == "Resolved") {
                        $("#btnEdit").hide();
                    }
                    else { $("#btnEdit").show(); }
                    $("#lblOutageHeading").text(usertable.Table3[0].Outage);
                    $("#lblcusteffected").text(usertable.Table3[0].Total);
                    $("#lblCommunity").text(usertable.Table3[0].CityName);
                    $("#lblOutageStatus").text(usertable.Table3[0].Resolution);
                    $("#lblOutageCause").text(usertable.Table3[0].Cause);
                    // var startdate = new Date(usertable.Table3[0].StartDate).toLocaleString();
                    // var resultstartdate = startdate.split(":");
                    $("#lblstartdate").text(usertable.Table3[0].StartDate);
                    // var enddate = new Date(usertable.Table3[0].EndDate).toLocaleString();
                    // var resultenddate = enddate.split(":");
                    $("#lblenddate").text(usertable.Table3[0].EndDate);
                    loadChildOutageMap();
                }
            }
        });
    }
    catch (e) { }
}

function LoadGrid() {
    source = {
        datatype: "array",
        datafields: [
            { name: "OutageId", type: 'number' },
            { name: 'OutageMessage' },
            { name: 'Outage', type: 'string' },
            { name: 'OutageReportInfo' },
            { name: 'Cause' },
            { name: 'ZipCode' },
            { name: 'Resolution' },
            { name: 'LastUpdated' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        },
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
        //$("#jqxgrid").jqxGrid('addfilter', 'CategoryName', filtergroup);
        $("#jqxgrid").jqxGrid('addfilter', 'OutageId', filtergroup);
        // apply the filters.   
        $("#jqxgrid").jqxGrid('applyfilters');
    }
    var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

    var imagerenderer = function (row, datafield, value) {
        var OutageId = $('#jqxgrid').jqxGrid('getrowdata', row).OutageId;

        if (datafield == 'type') {
            var text = (value == 0 ? '<span class="active_new inactive_grid" style="padding-top:5px; display:inline-block;">Inactive</span>' : '<span class="active_new" style="padding-top:5px; display:inline-block;color: #94d60a;">Active</span>');
            return '<div style="text-align: center;"><a href="#" ><span id="' + row + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/>' + text + '</a></div>';
            //return '<div style="text-align: center;"><a href="#" ><img id="' + OutageId + '" src="' + (value == 0 ? '../images/red-dot.png' : '../images/green-dot.png') + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/></a></div>';
        }
        if (datafield == 'Detail') {
            return '<div style="text-align: center;"><a href="Outage-Information.aspx">Customer Detail</a></div>'
        }
        if (datafield == 'OutageId') {
            return getdropDown(row, value);
        }
        if (datafield == 'OutageReportInfo') {
            return getdropDown(row, value);
        }
        if (datafield == 'OutageMessage') {
            return getdropDown(row, value);
        }
        if (datafield == 'Outage') {
            return getdropDown(row, value);
        }
        if (datafield == 'Resolution') {
            return getdropDown(row, value);
        }        
        if (datafield == 'LastUpdated') {
            var startdate = new Date($('#jqxgrid').jqxGrid('getrowdata', row).LastUpdated).toLocaleString();
            var resultstartdate = startdate.split(":");
            return '<div style="text-align: center;"><span class=filterdrop >' + startdate.replace(":" + resultstartdate[2], "") +" "+ resultstartdate[2].split(" ")[1] + '</span></div>';
        }
        else
            return "";
    }

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .40,
        columnsheight: 38,
        rowsheight: 40,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        altrows: true,
        autoheight: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        //columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Outage ID', dataField: 'OutageId', width: '8%', type: 'number', cellsrenderer: imagerenderer },
            { text: 'Outage Title', dataField: 'OutageMessage', width: '25%', cellsrenderer: imagerenderer },
            { text: 'Outage Type', datafield: 'Outage', width: '12%', cellsrenderer: imagerenderer },
            { text: 'Outage Information', datafield: 'OutageReportInfo', width: '25%', cellsrenderer: imagerenderer },
            { text: 'Outage Status', dataField: 'Resolution', width: '12%', cellsrenderer: imagerenderer },
            { text: 'Last Updated', dataField: 'LastUpdated', width: '20%' }
        ]
    });


    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function getdropDown(row, value) {
    var outagid = $('#jqxgrid').jqxGrid('getrowdata', row).OutageId;
    var outtype = $('#jqxgrid').jqxGrid('getrowdata', row).Outage;
    if (outtype == "Current Outage") {
        //return '<div style="text-align: left;"><a href="" onclick="return false" id=' + outid + ' class=filterdrop >' + outid + '</a></div>';
        return '<div style="text-align: left; color:red;"><span id=' + outagid + ' class=filterdrop >' + value + '</span></div>';
    }
    else
    { return '<div style="text-align: left;"><span id=' + outagid + ' class=filterdrop >' + value + '</span></div>'; }

}

function changeStatus(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var type = ViewObj.type;
    var OutageId = ViewObj.OutageId;
    var confirmMsg = '';
    var alertMsg = '';
    switch (type) {
        case '1': confirmMsg = "Are you sure you want to Cancel Outage?"; alertMsg = 'Inactived'; break;
            //case '1': confirmMsg = "Are you sure you want to activate the status?"; alertMsg = 'activated'; break;
        default: breaK;
    }
    if (confirm(confirmMsg)) {
        var param = {
            OutageID: OutageId
        }
        $.ajax({
            type: "POST",
            url: "Outage-Cancellation.aspx/ChangeStatus",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            asyn: true,
            data: JSON.stringify(param),
            success: function (data, status) {
                var tab = JSON.parse(data.d);
                if (JSON.parse(data.d)[0].STATUS == "1") {
                    alert('Status has been cancelled successfully.');
                    // getupdatedrow(OutageId, Num);
                    BindData();

                }

                else {
                    alert('Status is not ' + alertMsg);
                    LoadGrid();
                }
            }

        });
    }
}

function getupdatedrow(OutageID, Num) {
    var row;
    $.ajax({
        type: "POST",
        url: "Outage-Cancellation.aspx/LoadGridData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(),
        success: function (data, status) {
            usertable = JSON.parse(data.d);
            databindtogrid = usertable.Table;
            for (i = 0; i < databindtogrid.length; i++) {
                if (databindtogrid[i].OutageId == parseInt(OutageID)) {
                    row = databindtogrid[i];
                    break;
                }
            }
            var updatedrow = {};
            updatedrow["OutageId"] = row.OutageId;
            updatedrow["OutageMessage"] = row.OutageMessage;
            updatedrow["OutageReportInfo"] = row.OutageReportInfo;
            updatedrow["type"] = row.type;
            updatedrow["outage"] = row.outage;
            updatedrow["Cause"] = row.Cause;
            updatedrow["Zipcode"] = row.Zipcode;

            if (Num >= 0) {
                var id = $("#jqxgrid").jqxGrid('getrowid', Num);
                $("#jqxgrid").jqxGrid('updaterow', id, updatedrow);
                $("#jqxgrid").jqxGrid('ensurerowvisible', Num);
                LoadGrid();
            }

        }
    });
}

function LoadChildGrid() {
    try {
        autoheightPrimary = false;
        if (customertable.length <= 10)
            autoheightPrimary = true;
        if (customertable.length == 0) {
            $('#nodata_div').show();
            $('#jqxhistorygrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {        
            $('#nodata_div').hide();
            $('#jqxhistorygrid').hide();
            $('#jqxchildgrid').show();
        }
        //Getting the source data with ajax GET request
        var source = {
            datatype: "array",
            datafields: [
             { name: 'CustomerId' },
               { name: 'AccountNumber' },
             { name: 'FullName' },
             { name: 'EMailId' },
             { name: 'UtilityAccountNumber', type: 'number' },
             { name: 'MobilePhone' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: customertable
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        var imagerenderer = function (row, datafield, value) {
           
            if (datafield == 'MobilePhone') {
                var MobilePhone = $('#jqxchildgrid').jqxGrid('getrowdata', row).MobilePhone;
                MobilePhone = $("#tempmasked").masked(MobilePhone);
                return MobilePhone;
            }
            else
                return "";
        }

        $("#jqxchildgrid").jqxGrid({

            width: "99.8%",
            height: GridHeight * .32,
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            selectionmode: 'checkbox', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            filterable: true,
            columns:
            [
                { text: 'CustomerId', dataField: 'CustomerId', hidden: true },
                 { text: 'AccountNumber', dataField: 'AccountNumber', hidden: true },
                { text: 'Customer Name', dataField: 'FullName', width: '25%' },
                { text: 'Email', dataField: 'EMailId', width: '25%' },
                { text: 'Account Number', dataField: 'UtilityAccountNumber', width: '25%' },
                  { text: 'Mobile Number', dataField: 'MobilePhone', width: '25%' }
            ]
        });
    } catch (e) {
        console.log(e.message);
    }
}

function LoadHistoryGrid() {
    try {
        autoheightPrimary = false;
        if (Historygrid.length <= 10)
            autoheightPrimary = true;
        if (Historygrid.length == 0) {
            $('#nodata_div').show();
            $('#jqxhistorygrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxchildgrid').hide();
            $('#jqxhistorygrid').show();
        }
        //Getting the source data with ajax GET request
        var source = {
            datatype: "array",
            datafields: [
             { name: 'HistoryDate' },
               { name: 'AffectedCustomer' },
             { name: 'EndDate' },
             { name: 'Description' }
            
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: Historygrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );
        var imagerenderer = function (row, datafield, value) {
            if (datafield == 'HistoryDate') {
                var startdate = new Date($('#jqxhistorygrid').jqxGrid('getrowdata', row).HistoryDate).toLocaleString();
                var resultstartdate = startdate.split(":");
                return '<div style="text-align: left;"><span class=filterdrop >' + startdate.replace(":" + resultstartdate[2], "")+" " + resultstartdate[2].split(" ")[1] + '</span></div>';
            }
            if (datafield == 'EndDate') {
                //var startdate = new Date($('#jqxhistorygrid').jqxGrid('getrowdata', row).EndDate).toLocaleString();
               // var resultstartdate = startdate.split(":");
                return '<div style="text-align: left;"><span class=filterdrop >' + $('#jqxhistorygrid').jqxGrid('getrowdata', row).EndDate + '</span></div>';
            }
            if (datafield == 'MobilePhone') {
                var startdate = $('#jqxhistorygrid').jqxGrid('getrowdata', row).MobilePhone;

                return startdate.mask("000-000-0000");
            }
            else
                return "";
        }
        $("#jqxhistorygrid").jqxGrid({

            width: "99.8%",
            height: GridHeight * .32,
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            filterable: true,
            columns:
            [
                { text: 'Time', dataField: 'HistoryDate', width: '25%', cellsrenderer: imagerenderer },
                 { text: 'Customers Affected', dataField: 'AffectedCustomer', width: '25%' },
                { text: 'Estimated Restoration', dataField: 'EndDate', width: '25%', cellsrenderer: imagerenderer },
                { text: 'Description', dataField: 'Description', width: '25%' }              
            ]
        });
    } catch (e) {
        console.log(e.message);
    }
}

////send notification block////
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
        alert('Please select customer(s) to send Notification');
        return;
    }
    $('#ddltypeofmessage').attr("readonly", true);
    $('#ddltypeofmessage').val('1');
    $('#ddlMessageMode').val('0');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    loader.showloader();
    GetData();
    loader.hideloader()
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

    if ($('#ddlMessageMode').val() == 1) {
        var value = $('#summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g, ""); //objEditor.get_content();
        if (value.length > 1000) {
            alert("Maximum 1000 characters allowed");
            value = value.substring(0, 999);
            $('#summernote').summernote('code', '');
            $('#summernote').summernote('code', value);
            isvalid = false;
        }
    }

    else if ($('#ddlMessageMode').val() == 2) {
        var value = $('#txtMessage').val();
        if (value.length > 200) {
            alert("Maximum 200 characters allowed");
            //$('#txtMessage').val(value);
            $('#txtMessage').val($('#txtMessage').val().substring(0, 200));

            isvalid = false;
        }
    }

  
    else{
        var value = $('#txtMessage').val();
        if (value.length > 140) {
            alert("Maximum 140 characters allowed");
            //$('#txtMessage').val(value);
            $('#txtMessage').val($('#txtMessage').val().substring(0, 140));

            isvalid = false;
        }
    }


    return isvalid;

}

function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
        $(".texttype").removeClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $('#txtMessage').addClass('hide');
    
        AddMandatoryAttributeToElement('#txtmsgsubject');
    
        AddMandatoryAttributeToElement('#summernote');
        RemoveMandatoryAttributeFromElement('#txtMessage');
        getLength();
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        //$("#txtMessage").attr('mandatory', '1');
        //$("#txtEditor").removeAttr('mandatory');
        //$("#txtmsgsubject").attr('mandatory', '0');
        AddMandatoryAttributeToElement('#txtMessage');
        //   RemoveMandatoryAttributeFromElement('#ContentPlaceHolder1_rightpanel_txtEditor');
        RemoveMandatoryAttributeFromElement('#summernote');
        RemoveMandatoryAttributeFromElement('#txtmsgsubject');

        //************************
        var msgType = $('#ddlMessageMode').val();
        if (msgType == 0) {
            $('.mstType').attr("ValidateMessage", "Please enter Text Message");
            $('.mstType').attr("onKeyUp", "CountCharactersTextArea(this,140)");
            $('.mstType').attr("onChange", "CountCharactersTextArea(this,140)");
        }
        else if (msgType == 2) {
            $('.mstType').attr("ValidateMessage", "Please enter Push Message");
            $('.mstType').attr("onKeyUp", "CountCharactersTextArea(this,200)");
            $('.mstType').attr("onChange", "CountCharactersTextArea(this,200)");
        }
        else {
            $('.mstType').attr("ValidateMessage", "Please enter IVR message");
            $('.mstType').attr("onKeyUp", "CountCharactersTextArea(this,140)");
            $('.mstType').attr("onChange", "CountCharactersTextArea(this,140)");
        }
        //***********************
        getLength();
    }
}

function AddMandatoryAttributeToEditor(elemet) {
    var attr = $(elemet).attr('mandatory');
    // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
    if (typeof attr == typeof undefined || attr == false) {
        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;position:absolute; right: 22px;top: 0;">*</span>';
        $(elemet).attr('mandatory', '1');
        $(elemet).after(mandatoryHtml);
    }
}

function IsFileValidForUpload() {

    for (var i = 0; i < $("#fileupd").get(0).files.length; i++) {

        var fileName = $("#fileupd").get(0).files[i].name;

        var nameArr = $("#fileupd").get(0).files[i].name.split('.');
        if (nameArr[nameArr.length - 1] == 'gif' || nameArr[nameArr.length - 1] == 'png' || nameArr[nameArr.length - 1] == 'bmp' || nameArr[nameArr.length - 1] == 'jpg' || nameArr[nameArr.length - 1] == 'jpeg' || nameArr[nameArr.length - 1] == 'txt' || nameArr[nameArr.length - 1] == 'rtf')
            return true;
        else {
            if (nameArr[nameArr.length - 1] == 'exe') {
                return false;
            }
            else if (nameArr[nameArr.length - 1] == 'dll') {
                return false;
            }
            return false;
        }
    }

    return true;
}

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    $("#hdfile").val(filename);
   

    if (filename == "" && $("#hdnfileOld").val() != "") {
        $("#nofile").html($("#hdnfileOld").val());
        $("#hdfile").val(filename);
        $('#btnRemoveFile').show();

    }

    else {
        $('#btnRemoveFile').show();
        $("#hdnfileOld").val(filename);
       // $("#nofile").html($("#hdnfileOld").val());
    }

    //readURL(sender);

    
}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function getLength() {
    var textbox = $("#ddlMessageMode").val();
  
    var txtbxlength = 0;
    

    if (textbox == 0 || textbox == 3) {
        txtbxlength = 140;
    }
    else if (textbox == 2) {
        txtbxlength = 200;
    }
    else {
        txtbxlength = 1000;
    }
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
    $("#nofile").html('No File Chosen');
    return false;
}

////send notification block end here////
function loadOutageMap() {
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "esri/dijit/InfoWindow"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, InfoWindow) {
          var outageType = "C";
          var polygonSymbol, polygonGraphic, pts, pt, sym;
          var map = new Map("outage_map_canvas", {
              basemap: "streets",
              zoom: 3,
              minZoom: 10,
              maxZoom: 16
          });

          utils.autoRecenter(map);
          var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
          var tableID = '';
          on(map, "load", function () {
                  loadData();
          });

          $('#mapView').click(function () {
              //defOpen = 3;
              $("#outage_map_canvas").html('');
              //$("#outage_map_canvas").css('height', GridHeight * .92);
              $("#outage_map_canvas").css('height', GridHeight * .50);
              $("#outage_map_canvas").width('100%');
              if (databindtogrid.length == 0) {
                  document.getElementById('graphDiv').style.display = 'none';
                  document.getElementById('map').style.display = 'none';
                  document.getElementById('outage_map_canvas').style.display = 'none';
              }
              else {
                  document.getElementById('graphDiv').style.display = 'none';
                  document.getElementById('map').style.display = 'block';
                  document.getElementById('outage_map_canvas').style.display = 'block';
              }
              loadOutageMap();
              // chartgraphsection(defOpen);
          });

          function clearAddGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
              polygonGraphic = null;
              pts = null;
              polygonSymbol = null;
          }
          function loadData() {
              try {
                  clearAddGraphics();
                  for (var i in usertable.Table) {
                      attributes = { lat: usertable.Table[i].OutageLatitude, lon: usertable.Table[i].OutageLongitude, Cause: usertable.Table[i].Cause, CityName: usertable.Table[i].CityName, OutageDate: usertable.Table[i].OutageDate, OutageReportInfo: usertable.Table[i].OutageReportInfo, Resolution: usertable.Table[i].Resolution, ZipCode: usertable.Table[i].ZipCode };
                      if (usertable.Table[i].Outage == "Planned Outage") { sym = new esri.symbol.PictureMarkerSymbol('../images/planned_pin.png', 30, 40); }
                      else {
                          sym = new esri.symbol.PictureMarkerSymbol('../images/current_pin.png', 30, 40);
                      };
                      pt = new esri.geometry.Point(usertable.Table[i].OutageLongitude, usertable.Table[i].OutageLatitude, new esri.SpatialReference({ wkid: 4326 }))
                      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      var d = new Date(usertable.Table[i].OutageDate);
                      var month;                      
                      month = months[d.getMonth()];
                      var n = (month + " " + d.getDate() + " " + d.getFullYear())
                      infoTemplate = new InfoTemplate("Outage", "<b>${Cause}</b><br/><b>City:</b> ${CityName}<br/><b>Zip Code:</b> ${ZipCode}<br/><b>Outage Date:</b> " + n);

                      var graphic = new Graphic(pt, sym, attributes, infoTemplate);
                      map.graphics.add(graphic);
                  }
                  map.centerAndZoom(pt, 9);
              }
              catch (e) { }
          }

      });
}

function loadChildOutageMap() {
    $("#outage_child_map_canvas").html('');
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
      "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom",  "esri/dijit/InfoWindow"],
      function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom, InfoWindow) {
          var outageType = "C";
          var polygonSymbols, polygonGraphic, pts1, pt1, symbol;
          var map2 = new Map("outage_child_map_canvas", {
              basemap: "streets",           
              zoom: 3,             
              minZoom: 10,
              maxZoom: 16
          });
          utils.autoRecenter(map2);
          var geocodeService = new Geocoder(window.location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
         
          var tableID = '';
          on(map2, "load", function () {
                  drawchildpolygon();            
          });

        
          function createPolygonSymbol() {
              return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0, 0.92]), 1), new Color([255, 0, 0, 0.25]));
          }

          function drawchildpolygon() {
            //  clearAddGraphics();
              polygonSymbol = createPolygonSymbol();
              var tableindex = 0;
              if (drawpoltable.length > 0) {
                  pts1 = [];
                  for (var i = 0; i < drawpoltable.length; i++) {

                      pt1 = new Point(drawpoltable[i]["Longitude"], drawpoltable[i]["Latitude"]);
                      pts1.push(pt1);
                  }
                  if (pts1.length > 1) {
                      var polygon = new Polygon(pt1.spatialReference);
                      polygon.addRing(pts1);
                      polygonSymbol.setColor(outageType == 'C' ? new Color([255, 0, 0, 0.25]) : new Color([229, 107, 8, 0.25]));
                      polygonGraphic = new Graphic(polygon, polygonSymbol);
                      map2.graphics.add(polygonGraphic);
                      polygonGraphic = null;
                      pts1 = null;                  
                  }
              }

              if (usertable.Table3.length > 0) {
                  attributes = { lat: usertable.Table3[0].OutageLatitude, lon: usertable.Table3[0].OutageLongitude, Cause: usertable.Table3[0].Cause, CityName: usertable.Table3[0].CityName, ZipCode: usertable.Table3[0].ZipCode, };
                  if (usertable.Table3[0].Outage == "Planned Outage") { symbol = new esri.symbol.PictureMarkerSymbol('../images/planned_pin.png', 30, 40); }
                  else {
                      symbol = new esri.symbol.PictureMarkerSymbol('../images/current_pin.png', 30, 40);
                  };  
                  pt1 = new esri.geometry.Point(usertable.Table3[0].OutageLongitude, usertable.Table3[0].OutageLatitude, new esri.SpatialReference({ wkid: 4326 }))
                  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                  var d = new Date(usertable.Table3[0].OutageDate);
                  var month;
                  month = months[d.getMonth()];
                  var n = (month + " " + d.getDate() + " " + d.getFullYear())
                  infoTemplate = new InfoTemplate("Outage", "<b>${Cause}</b><br/><b>City:</b> ${CityName}<br/><b>Zip Code:</b> ${ZipCode}<br/><b>Outage Date:</b> " + n);

                  var graphic = new Graphic(pt1, symbol, attributes, infoTemplate);
                  map2.graphics.add(new Graphic(pt1, symbol, attributes, infoTemplate));
                  map2.centerAndZoom(pt1, 12);
              }
              $("#Module5").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Outage 
          }

          function clearAddGraphics() {
              map2.infoWindow.hide();
              map2.graphics.clear();
              polygonGraphic = null;
              pts = null;
              polygonSymbol = null;
          }


      });
}

function GetData() {
    try {
        var selected = $("#ddltypeofmessage").val();
        var param = { templateid: 5 };
        $.ajax({
            type: "POST",
            url: "Outage-Cancellation.aspx/GetTemplateData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                data = data.d;
                templateData = $.parseJSON(data);
                ConvertData();
                switch ($("#ddlMessageMode").val()) {
                    case "0":
                        if (templateData[0].IsText) {
                            $("#txtMessage").val(templateData[0].TextMessage)
                        }
                        break;
                    case "1":
                        if (templateData[0].IsEMail) {
                            $("#txtmsgsubject").val(templateData[0].EmailSubject);
                           // $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").set_content(templateData[0].EmailBody);
                            $('#summernote').summernote('code', (templateData[0].EmailBody));
                           
                        }
                        break;
                    case "2":
                        if (templateData[0].IsPush) {
                            $("#txtMessage").val(templateData[0].PushMessage);
                        }
                        break;
                    case "3":
                        if (templateData[0].IsIVR) {
                            $("#txtMessage").val(templateData[0].IVRMessage);
                        }
                        break;
                }

            },
            error: function (request, status, error) { loader.hideloader(); }
        })
    } catch (e) {
        console.log(e.message);
        loader.hideloader();
    }
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(templateData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        TemplateTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function resetMessageField() {
    $("#txtMessage").val('');
    $("#txtmsgsubject").val('');
    $('#summernote').summernote('code', '');
 //   $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").set_content('');
}