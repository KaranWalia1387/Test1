var mode;
var databindtogrid;
var topicid;
var autoheightPrimary = false;
var bannerid;
var isedit = false;
var isURL = false;
var ViewObj;
function BindData() {
    try {
        $.ajax({
            type: "POST",
            url: "configure_banner.aspx/LoadGrid",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function OnSuccess(response) {
                try {
                    if (response != null && response.d != null) {
                        var parsedData = JSON.parse(response.d);
                        databindtogrid = parsedData;
                        LoadGrid();
                    }
                    else {
                        //$('#divUsagedata').hide();
                        //$('#divUsageNodata').show();
                    }
                }
                catch (e) { }
            },
            async: true,
            failure: function (response) {
                //$('#divUsagedata').hide();
                //$('#divUsageNodata').show();
            }
        });

        //databindtogrid = configure_banner.LoadGrid().value.Rows;
        //LoadGrid();
    }
    catch (e) { }
}

function getView(row, value) {

    BannerId = $('#jqxgrid').jqxGrid('getrowdata', row).BannerID;
    var BannerName = $('#jqxgrid').jqxGrid('getrowdata', row)["BannerName"];
    return '<div style="padding-left:5px;"><a class="details" href="#" data-id=' + BannerId + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".bannerDetails">' + BannerName + '</a></div>';
}

$(document).on("click", ".details", function () {
    $('#liprimary').addClass('active');
    $('#licontent').removeClass('active');
    $('#tabbannerdetails').addClass('active');
    $('#tabbannercontent').removeClass('active');
    var bannerId = $(this).data('id');
    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].BannerID == bannerId) {
            $('#lblBannerName').html(databindtogrid[i]["BannerName"]);
            var parseddate = new Date(databindtogrid[i].CreatedDate);
            $('#lblbannerCreatedDate').html((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());
            parseddate = new Date(databindtogrid[i].BannerStartDate);
            $('#lblBannerStartDate').html((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());
            parseddate = new Date(databindtogrid[i].BannerEndDate);
            $('#lblBannerEndDate').html((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());
            $('#lblBannerWeight').html(databindtogrid[i]["BannerWeight"]);
            $('#lblBannerExposures').html(databindtogrid[i].showcount);
            $('#lblBannerClicks').html(databindtogrid[i].clickcount);
            //$('#lblBannerExpperday').html(databindtogrid[i].EmailID);
            $('#lblBannerratio').html(databindtogrid[i].ClickRatio);
            $('#BannerImg').attr('src', '../Banners/' + databindtogrid[i].BannerContent)
            return;
        }
    }

});

//Get the jqGrid Value with ajax Get method
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 14)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [

        { name: 'BannerName' },
        { name: 'BannerID' },
        { name: 'BannerContent' },
        { name: 'BannerOriginalContent' },
        { name: 'BannerStartDate', type: "date", format: 'MM/dd/yyyy' },
        { name: 'BannerEndDate', type: "date", format: 'MM/dd/yyyy' },
        { name: 'BannerWeight' },
        { name: 'Alternatetext' },
        { name: 'showcount' },
        { name: 'clickcount' },
        { name: 'CreatedDate', type: "date", format: 'MM/dd/yyyy' },
        { name: 'Alternatetext', },
        { name: 'BannerPlaceholder' },
        { name: 'ModuleScreenId' },
        { name: 'ModuleScreenUrl' },
        { name: 'IsActive' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    var imagerenderer = function (row, datafield, value) {
        //var ReasonID = $('#jqxgrid').jqxGrid('getrowdata', row).ReasonID;

        switch (datafield) {
            case "Edit": return '<a href="#" style="margin-left:14px;"  data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".addbanner" onclick="editSelected(' + row + ');"><img  src="../images/icon-edit.png" class="Gridimage" title="Edit"/></a>'; break;
            case "BannerName": return getView(row, value); break;
            default: break;
        }
    }

    //for get reset password icon showing in grid
    function getControlButton(row, value, datafield) {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        rId = ViewObj.ReasonID;

        var editButton = '<a href="#" style="margin-left:14px;" onclick="editSelected(' + row + ');"><img  src="../images/icon-edit.png" class="Gridimage" title="Edit"/></a>';
        var delButton = '<a href="#" style="margin-left:14px;" onclick="deleteSelected(' + rId + ');"><img  src="../images/delete_icon.gif" class="Gridimage" title="Delete"/></a>';

        return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + delButton + '</td></tr></table></center>';
    }




    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        //autoheight: autoheightPrimary,
        height: GridHeight * .79,
       // height: "400",
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Campaign Name', dataField: 'BannerName', cellsrenderer: imagerenderer },
            { text: 'BannerID', dataField: 'BannerID', hidden: true },
            { text: 'BannerOriginalContent', dataField: 'BannerOriginalContent', hidden: true },
            { text: 'BannerContent', dataField: 'BannerContent', hidden: true },
            { text: 'Start Date', dataField: 'BannerStartDate', cellsformat: 'MM/dd/yyyy' },
            { text: 'End Date', dataField: 'BannerEndDate', cellsformat: 'MM/dd/yyyy' },
            { text: 'Weight', dataField: 'BannerWeight', hidden: true },
            { text: 'showcount', dataField: 'showcount', hidden: true },
            { text: 'clickcount', dataField: 'clickcount', hidden: true },
            { text: 'Created Date', dataField: 'CreatedDate', cellsformat: 'MM/dd/yyyy', hidden: true },
            { text: 'IsActive', dataField: 'IsActive' },
            { text: 'Alternatetext', dataField: 'Alternatetext', hidden: true },
            { text: 'BannerPlaceholder', dataField: 'BannerPlaceholder', hidden: true },
            { text: 'ModuleScreenId', dataField: 'ModuleScreenId', hidden: true },
            { text: 'ModuleScreenUrl', dataField: 'ModuleScreenUrl', hidden: true },
            { text: 'Edit', dataField: 'Edit', align: 'center', cellsrenderer: imagerenderer, hidden: userUsageRights }
        ]
    });
}

function editSelected(row) {
    $("#addBanner").val('Update');
    ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    bannerid = ViewObj.BannerID;
    isedit = true;
    $('#txtBannerName').val(ViewObj.BannerName);
    var parseddate = new Date(ViewObj.BannerStartDate);
    $('#txtStartDate').val((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());
    parseddate = new Date(ViewObj.BannerEndDate);
    $('#txtEndDate').val((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());
    $('#txtBannerWeight').val(ViewObj.BannerWeight);
    //fileUpload
    $('#imgbannerpreview').attr('src', '../Banners/' + ViewObj.BannerContent);
    $('#fileUpload1').attr('src', BannerContent)
    if (ViewObj.ModuleScreenUrl != '' && ViewObj.ModuleScreenUrl != null) {
        $('#ddlLinkedURL').val(0);
        $('#ddlLinkedURL').attr('disabled', true);
        $('#txtLinkedURL').removeAttr('disabled');
        $('#txtLinkedURL').val(ViewObj.ModuleScreenUrl)
    }
    else {
        $('#txtLinkedURL').val('');
        $('#txtLinkedURL').attr('disabled', true);
        $('#ddlLinkedURL').removeAttr('disabled');
        $('#ddlLinkedURL').val(ViewObj.ModuleScreenId)
    }
    
    if (ViewObj.IsActive == "true") {
        $("#rdoisactiveyes").prop("checked", true);
    }
    else {
        $("#rdoisactiveno").prop("checked", true);
    }

    $('.addbanner [type="checkbox"]').prop('checked', false);
    var arrplaceholder = ViewObj.BannerPlaceholder.toString().split(',');
    $('#chklstScreen input[type="checkbox"]').each(function () {

        //if (jQuery.inArray($(this).val(), arrplaceholder) > -1) {
        if (checkarrayvalue(arrplaceholder, $(this).val())) {
            $(this).prop('checked', true);
        }
        //}
    });

    $('#txtAlternatetext').val(ViewObj.Alternatetext);
    //chklstScreen
}

function checkarrayvalue(arr, value) {
    var ismatched = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            ismatched = true;
            break;

        }
    }
    return ismatched;
}

$(document).ready(function () {
    $('#collapseTwo').show();
    BindData();

    $('#addBanner').click(function () {
        if (validateDetails()) {
            if (!isedit)
                uploadfile();
            else {
                var attachmentsrc = $('#imgbannerpreview').attr('src');
                if (attachmentsrc.substr(attachmentsrc.lastIndexOf('/') + 1, attachmentsrc.length) == ViewObj.BannerContent)
                    savedata(ViewObj.BannerContent, ViewObj.BannerOriginalContent);
                else
                    uploadfile();
            }
        }
    });
    $("#lblAddBanner").click(function () {
        mode = '0';
        $('#addBanner').val('Add');
        reset();
    });
    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
        reset();
    });

    $('#ddlLinkedURL').change(function () {
        try {
            if ($(this).val() > 0) {
                $('#txtLinkedURL').val('');
                $('#txtLinkedURL').attr('disabled', true);
                isURL = false;
            }
            else {
                $('#txtLinkedURL').removeAttr('disabled');
            }
        }
        catch (e) {
            $('#txtLinkedURL').removeAttr('disabled');
            isURL = false;
        }
    });
});

function CheckLinking() {
    try {
        if ($('#txtLinkedURL').val().length > 0) {
            isURL = true;
            $('#ddlLinkedURL').val(0);
            $('#ddlLinkedURL').attr('disabled', true);
        }
        else {
            $('#ddlLinkedURL').removeAttr('disabled');
            isURL = false;
        }

    }
    catch (e) {
        $('#ddlLinkedURL').removeAttr('disabled');
        isURL = false;
    }
}

function File_OnChange(objfileupload, objimg, objdiscard, bannerno) {
    try {
        var files = $("#fileUpload").get(0).files;
        if (files.length > 0) {
            //Check file type
            var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == 'jpg' || Extension == 'mp4' || Extension == 'swf') {
                // Valid file type
                var fReader = new FileReader();
                fReader.readAsDataURL(files[0]);
                fReader.onloadend = function (event) {
                    $('#imgbannerpreview').attr('src', event.target.result);
                }
            }
            else {
                $('#imgbannerpreview').attr('src', '');
                alert("File extensions allowed: gif, png, bmp, jpg ,jpeg, mp4 and swf.");
                return false; // Not valid file type
            }

            //Validate filesize
            var fileSize = 0;
            fileSize = files[0].size || files[0].fileSize; //size in kb
            fileSize = fileSize / 1048576; //size in mb
            if (fileSize > 5) {
                alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                return false;
            }
        }
    }
    catch (e) { }
}

function uploadfile() {
    var data = new FormData();
    var files = $("#fileUpload").get(0).files;
    if (files.length > 0) {

        ////Check file type
        //var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
        //if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == 'jpg') {
        //    // Valid file type
        //}
        //else {
        //    alert("File extensions allowed: gif, png, bmp, jpg and jpeg.");
        //    return false; // Not valid file type
        //}

        ////Validate filesize
        //var fileSize = 0;
        //fileSize = files[0].size || files[0].fileSize; //size in kb
        //fileSize = fileSize / 1048576; //size in mb
        //if (fileSize > 5) {
        //    alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
        //    return false;
        //}

        data.append("UploadedImage", files[0]);
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "../api/fileupload/uploadfile",
            contentType: false,
            processData: false,
            data: data
        });

        ajaxRequest.done(function (responseData, textStatus) {
            if (textStatus == 'success') {
                if (responseData != null) {
                    savedata(responseData, files[0].name);
                }
                else {
                    alert('Error in file uploading, Please try again later.');
                    return false;
                }
            } else {
                alert('Error in file uploading, Please try again later.');
                return false;
            }
        });
    }
}

function savedata(uploadedfilename, orignalfilename) {
    str = uploadedfilename + '|' + orignalfilename;
    str += '|' + getPlaceholders() + '|' + $('#ddlLinkedURL').val() + '|' + $('#txtStartDate').val() + '|' + $('#txtEndDate').val() + '|' + $('#txtBannerName').val() + '|' + $('#txtAlternatetext').val() + '|' + $('#txtBannerWeight').val();
    if ($("#rdoisactiveyes").is(":checked")) { str += '|1'; }
    else { str += '|0'; }

    if (isedit)
        str += '|' + bannerid;
    if (isURL)
        str += '|' + $('#txtLinkedURL').val();
    var result = configure_banner.AddBanner(str, isedit, isURL);
    if (result != null && result.value != null && result.value == '1') {
        if (!isedit)
            alert('Banner uploaded successfully.');
        else
            alert('Banner updated successfully.');
        $("#Button1").trigger('click');
        reset();
        BindData();
    }
    else
        alert('Banner not uploaded, Please try again.');
}

//This function is use to get the screen name's on which banner will display.
function getPlaceholders() {
    var strplaceholders = '';
    $('#chklstScreen input:checked').each(function () {
        strplaceholders += $(this).val() + ',';
    });
    if (strplaceholders != '')
        strplaceholders = strplaceholders.substr(0, strplaceholders.length - 1);
    return strplaceholders;
}

//This function is use to reset the popup fields.
function reset() {
    $('.addbanner [type="file"]').val('');
    $('.addbanner [type="text"]').val('');
    $('.addbanner select').val('0');
    $('.addbanner [type="checkbox"]').prop('checked', false);
    $('#txtBannerWeight').val('0');
    bannerid = '';
    isedit = false;
    isURL = false;
    $('#txtLinkedURL').removeAttr('disabled');
    $('#ddlLinkedURL').removeAttr('disabled');
    $('#imgbannerpreview').attr('src', '');
    $("#rdoisactiveyes").prop("checked", true);
}

//This function is use to validate the startdate and enddate
function validateDates(startdate, enddate) {
    var startDate = new Date(startdate.val());
    var endDate = new Date(enddate.val());
    if (!(startDate <= endDate)) {
        alert('Start date should not be greater than End date');
        enddate.val('');
        enddate.focus();
        return false;
    }
    else { return true; }
}

//This function is use to validate the details.
function validateDetails() {
    if ($('#txtBannerName').val() == '') {
        alert('Enter Campaign Name.');
        $('#txtBannerName').focus();
        return false;
    }
    else if ($('#txtBannerWeight').val() == '') {
        alert('Enter banner weight.');
        $('#txtBannerWeight').focus();
        return false;
    }
    else if (!isedit) {
        if ($('#fileUpload').val() == '') {
            alert('Select file to upload.');
            $('#fileUpload').focus();
            return false;
        }
    }
    else if ($('#chklstScreen input:checked').length == 0) {
        alert('Select Placeholder for banner.');
        $('#chklstScreen').focus();
        return false;
    }
    //DATE - Begins
    //START DATE - Begins
    if ($('#txtStartDate').val() != '') {
        if (isNaN(Date.parse($('#txtStartDate').val()))) {
            alert('Invalid start date.');
            $('#txtStartDate').focus();
            return false;
        }
    }
    //START DATE - End

    //END DATE - Begins
    if ($('#txtEndDate').val() != '') {
        if (isNaN(Date.parse($('#txtEndDate').val()))) {
            alert('Invalid end date.');
            $('#txtEndDate').focus();
            return false;
        }
    }
    //END DATE - End

    if ($('#txtStartDate').val() != '' && $('#txtEndDate').val() != '') {
        return validateDates($('#txtStartDate'), $('#txtEndDate'));
    }
    else
        return true;
    //DATE - End
}

