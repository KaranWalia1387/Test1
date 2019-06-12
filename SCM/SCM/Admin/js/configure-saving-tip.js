var mode;
var databindtogrid;
var reasonid;
var custid;
var PromotionID;
var GridHeight = '';
var GridWidth = '';
var ImageSource = '';
var limit = 1000;
var editRowNum;
function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    $("#hdfile").val(filename);
    //if (filename == "") {
    //    $('#btnRemoveFile').hide();
    //}
    //else {
    //    $('#btnRemoveFile').show();
    //}

    if (filename == "" && $("#hdnfileOld").val() != "") {
        $("#nofile").html($("#hdnfileOld").val());
        $("#hdfile").val(filename);
        $('#btnRemoveFile').show();

    }

    else {
        $('#btnRemoveFile').show();
        $("#hdnfileOld").val(filename);
    }

}

function ValidateCongPage(tblid) {
    var isvalid = true;
    var cnt = 0;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    $(ctrlObj).each(function () {
        if ($(this).val() == '' && ($(this).css('display') != 'none')) {
            cnt++;
        }
    });
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
    var content = $('#summernote').summernote('code'); //editorControl.get_content();
    if (content == '') {    
        cnt++;
    }
    if (cnt > 1) {
        alert('Please enter all the mandatory information');
        return false;
    }
    $(ctrlObj).each(function () {

        if ($(this).val() == '') {
            if ((this.tagName).toLowerCase() == 'input') {
              //  alert('Please Enter ' + this.title);
                alert(getmessage(this));
            }
            else if ((this.tagName).toLowerCase() == 'select') {
                // alert('Please Select ' + this.title);
                alert(getmessage(this));
            }
            $(this).focus();
            isvalid = false;
            return false;
            //  }
        }


        if (content == '') {
            alert('Please enter Description');
            $(this).focus();
            isvalid = false;
            return false;
        }
    });
    return isvalid;
}

function ValidateInputs(v) {
    var flag = true;
    switch (v) {
        case "1":
            flag = /^\d+$/.test($('.txtAmount').val());
            if (flag == false)
                alert('Amount saving list/Yrs Must be a Numeric Value.');
            return flag;
            break;
        case "3":
            flag = /^\d+$/.test($('.txtAmount').val());
            if (flag == false)
                alert('Incentive Rate Must be a Numeric Value.');
            return flag;
            break;
        default:
            flag = true;
            break;
    }
    return flag;
}

function activeModeChanged(sender, activeModeChangedArgs) {
    var mode;
    if (activeModeChangedArgs.get_newMode() == 1) {
        mode = "design";
        activeModeChangedArgs.set_newMode(0);
    }
    else mode = "html"
    alert(mode);
}

function EditorTextSize() {
    var flag = true;
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
    var content = $('#summernote').summernote('code'); // editorControl.get_content();
    var conwithouthtml = removeHTML(content);
    if (conwithouthtml.length > limit) {
        alert("Maximum " + limit + " characters allowed");
        content = content.substring(0, 999);
        //  $find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content(content);
        //editorControl.set_content(content);
        $('#summernote').summernote('code', content);
        flag = false;
    }
    return flag;
}

$(document).ready(function () {
    $('#summernote').summernote();
    $('.dropdown-toggle').dropdown();
    if ($('#fileUpload').val() == '') {
        $('#blahimg').hide();
    }
    $('.note-btn.btn.btn-default.btn-sm').click(function() {
    
        $('.modal-backdrop.in').hide();
    });


    BindData()

    NoImageDisplay();

    $('#lblAddTopic').click(function () {
        if ($('#fileUpload').val() != '') {
            $('#fileUpload').val('');
            $('#blahimg').hide();
            $('#btnRemoveFile').hide();
        }

        editRowNum = '';
    });

    $('#BtnAdd').click(function () {
        var v = $('.ddlCategory option:selected').val();
        if (validateallfields() && ValidateCongPage('PopupAddTopic') && GetFileSize('fileUpload') && ValidateInputs(v) && EditorTextSize() && MatchExistingTitle()) {
            loader.showloader();
            switch ($('.ddlCategory option:selected').val()) {
                case '1': if ($('.txtAmount').val() == '' || $('.txtAmount').val() == 0) {
                    alert('Please enter amount saving list/Yrs.');
                    $('.txtAmount').focus();
                    loader.hideloader();
                    return false;
                }
                else {
                    addtip();
                    return true;

                }
                    break;
                case '4':
                    //if ($('.ddlRebateprogram').val() == '') {
                    //    alert('Please select Mandatory/Voluntary).');
                    //    loader.hideloader();
                    //    $('.ddlRebateprogram').focus();
                    //    return false;
                    //}
                    //else { 
                    addtip(); return true;
                    //}
                    break;
                case '3':
                    if ($('.txtAmount').val() == '' || $('.txtAmount').val() == 0) {
                        alert('Please enter Incentive Rate.');
                        $('.txtAmount').focus();
                        loader.hideloader();
                        return false;
                    }
                    else { addtip(); return true; }
                    break;
                default: addtip();
                    return true;

            }
        }
        else
            return false;
        loader.hideloader();
    });

    $('#img_popimage').on('error', function () {
        imgError(this);
    })

    $('#spanTxt').text("Max Characters:" + limit);
});

function saveUloadedFile() {

    var data = new FormData();

    var files = $("#fileUpload").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }
    var flName = '';
    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        async: false,
        url: "../Upload.ashx?Path=Attachments",
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

function addtip() {
    var source;
    var file = document.getElementById('fileUpload');
    if (file.files.length > 0) {
        source = saveUloadedFile();
    }
    else {
        source = '';
    }
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
    var content = $('#summernote').summernote('code');//editorControl.get_content();

    var param = {
        PromotionID: $('#hdnDetails').val(),
        Categoryid: $('.ddlCategory option:selected').val(),
        desc: content,
        title: $('#txtSavingTips').val(),
        amt: $('.txtAmount').val(),
        src: source,
        IsActive: document.getElementById('ContentPlaceHolder1_rightpanel_divRadioButtons_0').checked,
        RebateProgramDesc: $('.ddlRebateprogram option:selected').val(),
        ServiceTypeId: $('.ddlServiceType option:selected').val(),
        AccountTypeId: $('.ddlAccountType option:selected').val(),
    }
    $.ajax({
        type: "POST",
        url: "configure-saving-tips.aspx/Addtip",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            Popup.hide('PopupAddTopic');
            loader.hideloader();
            alert(data.d);

            if ($('#fileUpload').val() == '') {
                $('#blahimg').hide();
            }
            BindData();

        },
        error: function (request, status, error) {
        }
    });
}

//This function is used to get the updated row after jqgrid row updation.
function getupdatedrow(promotionid) {
    var row;
    databindtogrid = configure_saving_tips.LoadGrid().value.Rows;
    for (i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].PromotionId == parseInt(promotionid)) {
            row = databindtogrid[i];
            break;
        }
    }
    var updatedrow = {};
    updatedrow["PromotionId"] = row.PromotionId;
    updatedrow["IsActive"] = row.IsActive.toString();
    updatedrow["CategoryName"] = row.CategoryName;
    updatedrow["title"] = row.title;
    updatedrow["AddedCount"] = row.AddedCount;
    updatedrow["CategoryID"] = row.CategoryID;
    updatedrow["Description"] = row.Description;
    updatedrow["ImageURL"] = row.ImageURL;
    updatedrow["SavingValue"] = row.SavingValue;
    updatedrow["ServiceTypeId"] = row.ServiceTypeId;
    return updatedrow;
}

//This function is used to fetch data from Database and bind that data into grid.
function BindData() {
    databindtogrid = configure_saving_tips.LoadGrid().value.Rows;
    LoadGrid();
}

// for replacing distorted image with noimage
function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

// for calling imgError function for grid image column
function NoImageDisplay() {
    $('.GridImage').each(function () {
        $(this).error(function () {
            imgError(this);
        })
    })
}

function LoadGrid() {
    source = {
        datatype: "array",
        datafields: [
            { name: 'PromotionId' },
            { name: 'CategoryName', type: 'string' },
            { name: 'title' },
            { name: 'AddedCount', type: 'number' },
            { name: 'IsActive' },
            { name: 'CategoryID' },
            { name: 'ServiceTypeId' },
            { name: 'Description' },
            { name: 'ImageURL' },
            { name: 'SavingValue' },
            { name: 'RebatesValue' },
            { name: 'Likes', type: 'number' },
            { name: 'Views', type: 'number' },
            { name: 'AccountType' }
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
        $("#jqxgrid").jqxGrid('addfilter', 'CategoryName', filtergroup);
        // apply the filters.
        $("#jqxgrid").jqxGrid('applyfilters');
    }



    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    // set image for Edit/delete
    var imagerenderer = function (row, datafield, value) {
        var PromotionId = $('#jqxgrid').jqxGrid('getrowdata', row).PromotionId;
        if (datafield == 'Edit') {
            var editButton = '<a href="#" style="text-align:center; margin-top:2px;display:block;color:#000;"><i class="fa fa-pencil-square-o Gridimage" style="margin-top:9px;" id="editImg" title="Update" onClick=edit(' + row + ')></i></a>';
            var deleteButton = '<a href="#" style="text-align:center; margin-top:2px;display:block;color:#f20202;"><i class="fa fa-times Gridimage" style="margin-top:9px;" id="deletImg" title="Delete" onClick="deleteTip(' + row + ')"/></a>';
            return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + deleteButton + '</td></tr></table></center>';

        } else if (datafield == 'IsActive') {
            var text;
            text = (value == "true" ? '<span class="active_new" style="padding-top:5px; display:inline-block;color: #94d60a;margin-top:9px;">Active</span>' : '<span class="active_new inactive_grid" style="padding-top:5px;margin-top:9px;display:inline-block;">Inactive</span>');
            //            return '<div style="text-align: center;"><a href="#" ><img id="' + PromotionId + '" src="' + text + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/></a></div>';
            return '<div style="text-align: center;"><a href="#" ><span id="' + row + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/>' + text + '</a></div>';
        }
        else if (datafield == 'ImageURL') {

            if (value == '') {
                return '<a class="fancybox-effects" href="../images/noimage.png" ><img  src="../images/noimage.png"  onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;    width: 30px;height:30px;border-radius:4px;margin: 7px auto;"/></a>';

            }
            else {
                return '<a class="fancybox-effects" href="../Attachments/' + value + '" ><img  src="../Attachments/' + value + '" onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 30px;height:30px;border-radius: 4px;margin: 7px auto;"/></a>';


            }
        }
        else if (datafield == 'title') {
            var Title = $('#jqxgrid').jqxGrid('getrowdata', row)["title"];
            var displayButton = '<a href="#" style="padding-left:12px;display:block;padding-top:12px" id="displayDetails" title="Display Details" onClick=ShowContent(' + row + ')>' + Title + '</a>';
            return displayButton;

        }
        else if (datafield == 'AccountType') {
            var acctype = $('#jqxgrid').jqxGrid('getrowdata', row)["AccountType"];
            var acctext = acctype == '1' ? "Residential" : "Commercial";
            return '<div style="padding-left:5px; display:block; width:20%; padding-top:13px;">' + acctext + '</div>';

        }

        return "";
    }

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .92,
        columnsheight: 38,
        source: dataAdapter,
        rowsheight: 40,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        autoheight: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Action', datafield: 'Edit', width: '10%', align: 'center', cellsrenderer: imagerenderer, hidden: userUsageRights },
            { text: 'Status', dataField: 'IsActive', width: '10%', align: 'center', cellsrenderer: imagerenderer },
            { text: 'PromotionId', dataField: 'PromotionId', width: '0%', hidden: true },
            { text: 'ServiceTypeId', dataField: 'ServiceTypeId', width: '0%', hidden: true },
            { text: 'Category', dataField: 'CategoryName', width: '15%' },
            { text: 'Name', dataField: 'title', width: userUsageRights ? '45%' : '35%', cellsrenderer: imagerenderer },
            { text: 'Signed Up', dataField: 'AddedCount', width: '10%', type: 'number' }, // NEW UI 12/17/14
            { text: 'Likes', datafield: 'Likes', width: '10%', type: 'number' },
            { text: 'Image', dataField: 'ImageURL', width: '10%', align: 'center', cellsrenderer: imagerenderer },
            { text: 'Account Type', dataField: 'AccountType', width: '10%', align: 'center', cellsrenderer: imagerenderer }

        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function removeFile() {
    $('#fileUpload').val('');
    //$('#blahimg').hide();
    $('#btnRemoveFile').hide();
    $('#nofile').html('No File Chosen');
    $('#blahimg').attr('src', "../images/noimage.png");
}

function edit(rowNum) {
    $(".ajax__htmleditor_htmlpanel_default").css("display", "none");
    $('[name="ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00"]').css("display", "block")
    $('[name="ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00"]').css("display", "block")
    editRowNum = '';
    editRowNum = rowNum;
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', rowNum);
    var PromotionId = ViewObj.PromotionId;
    var StatusId = ViewObj.IsActive;
    var CategoryID = ViewObj.CategoryID;
    var CategoryName = ViewObj.CategoryName;
    var Title = ViewObj.Title;
    var Description = ViewObj.Description;
    var ImagePath = '../Attachments/';
    var ImageURL = ViewObj.ImageURL;
    var SavingValue = ViewObj.SavingValue;
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
    var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
    $("#nofile").html('No File Chosen');
    $('#btnRemoveFile').hide();
    $('#popuptitle').html('Update Efficiency');
    $('#BtnAdd').val('Update');
    $('#BtnAdd').attr('title', 'Update');
    $('#fileUpload').val(null);
    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    $('#PromotionId').hide();
    $('#hdnDetails').val(ViewObj.PromotionId);
    $('.ddlCategory').val(ViewObj.CategoryID);
    $('.ddlServiceType').val(ViewObj.ServiceTypeId);
    $('#ddlAccountType').val(ViewObj.AccountType);
    $("#hdnCategory").val(ViewObj.CategoryID);
    $("#hdnServiceType").val(ViewObj.ServiceTypeId);
    $("#hdnAccountType").val(ViewObj.AccountType);
    $('.txtSavingTips').val(ViewObj.title);
    //editorControl.set_content(ViewObj.Description);
    $('#summernote').summernote('code', Description);
    $('.blahimg').val(ViewObj.ImageURL);

    if (ViewObj.ImageURL != '') {
        //$('#btnRemoveFile').show();
        //$("#nofile").html(ViewObj.ImageURL);
    }
    $('#blahimg').attr('src', ImagePath + ViewObj.ImageURL);
    ImageSource = ImagePath + ViewObj.ImageURL;
    $('#blahimg').error(function () { imgError(this) });
    if (ViewObj.ImageURL != null || ViewObj.ImageURL != '') {
        $('#blahimg').show();
    }
    else { $('#blahimg').hide(); }

    $('.txtAmount').val(ViewObj.SavingValue);
    $('.ddlRebateprogram').val(ViewObj.RebatesValue);
    if ($('.ddlCategory').val() == 4) {
        $("#lblAmountsaving").hide();
        $('.txtAmount').hide();
        //  $("#lblRebateprogramDesc").show();
        $("#clnrebt").show();
        //$('.ddlRebateprogram').show();
        //AddMandatoryAttributeToElement('.ddlRebateprogram');
        RemoveMandatoryAttributeFromElement($('.txtAmount'));
        $('.ddlRebateprogram').hide();
        RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
        $("#lblRebateprogramDesc").hide();

    }
    else if ($('.ddlCategory').val() == 3) {
        $("#lblAmountsaving").show();
        $("#lblAmountsaving").text('Incentive Rate');
        $('.txtAmount').show();
        $("#lblRebateprogramDesc").hide();
        $("#clnamt").show();
        $("#clnrebt").show();
        $('.ddlRebateprogram').hide();
        AddMandatoryAttributeToElement('.txtAmount');
        RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));

    }
    else if ($('.ddlCategory').val() == 2) {
        $("#lblAmountsaving").hide();
        $('.txtAmount').hide();
        $("#lblRebateprogramDesc").hide();
        $("#clnamt").hide();
        $("#clnrebt").hide();
        $('.ddlRebateprogram').hide();
        RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
        RemoveMandatoryAttributeFromElement($('.txtAmount'));
    }
    else {
        $("#lblAmountsaving").show();
        $("#lblAmountsaving").text('Annual Savings');
        $('.txtAmount').show();
        $("#lblRebateprogramDesc").hide();
        $("#clnamt").show();
        $('.ddlRebateprogram').hide();
        AddMandatoryAttributeToElement('.txtAmount');
        RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
    }

    if (ViewObj.IsActive == "true") {
        /*BUG ID 5110
        START*/
        document.getElementById('ContentPlaceHolder1_rightpanel_divRadioButtons_0').checked = true;
        //END
    }
    else {
        /*BUG ID 5110
        START*/
        document.getElementById('ContentPlaceHolder1_rightpanel_divRadioButtons_1').checked = true;
        //END
    }
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
function removeHTML(text) {
    var el = document.createElement("div");
    el.innerHTML = text;
    r = el.innerText = el.textContent;
    return r;
}
function deleteTip(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var PromotionId = ViewObj.PromotionId;
    //if (confirm('Are you sure want to delete?')) {
    if (confirm('Are you sure you want to delete?')) {
        var result = configure_saving_tips.DeleteSavingTips(PromotionId).value;
        if (result == '1') {
            if (Num >= 0) {
                var id = $("#jqxgrid").jqxGrid('getrowid', Num);
                $("#jqxgrid").jqxGrid('deleterow', id);
                alert('Category has been deleted successfully');
            }
        }
        else
            alert('Category not deleted,Please try again.');
    }
}

function ShowContent(id) {
    try {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', id);
        var PromotionId = ViewObj.PromotionId;
        var StatusId = ViewObj.IsActive;
        var CategoryID = ViewObj.CategoryID;
        var CategoryName = ViewObj.CategoryName;
        var Title = ViewObj.title;
        var Description = ViewObj.Description;
        var ImagePath = '../Attachments/';
        var ImageURL = ViewObj.ImageURL;
        var SavingValue = ViewObj.SavingValue;
        var RegisteredCount = ViewObj.AddedCount;
        var Likes = ViewObj.Likes;
        var RebateValue = ViewObj.RebatesValue;
        var views = ViewObj.Views;
        $('.discription_pro').html(Description);
        $('#lblAdd').show();
        $('#lbl_added').show();

        if (CategoryID == "1") {
            $('#lblAdd').text('Added:');
            $('.typtxt').html(SavingValue);
            //$('.typtxt').html('');

        }
        else if (CategoryID == "2") {
            $('#lblAdd').hide();
            $('#lbl_added').hide();
            $('.typtxt').html('');
        }
        else if (CategoryID == "4") {
            $('.typtxt').html('');

        }
        else {
            $('#lblAdd').text('Registered:');
            $('.typtxt').html('$' + SavingValue);

        }
        $('#ModalTitle').html(Title);
        $('.img img').attr('src', ImagePath + ImageURL);
        $('.addtxt').html(' ' + RegisteredCount);
        if (SavingValue != '' && (CategoryID == "3" || CategoryID == "1")) {
            $('#lbl_type').show();
            $("#lblType").show();
        }
        else {
            $("#lblType").hide();
            $('#lbl_type').hide();

        }
        $('.viwtxt').html(' ' + views);
        Popup.showModal('showdetails_effi', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    }
    catch (e) { }
}

function changeStatus(Num) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', Num);
    var StatusId = ViewObj.IsActive;
    var PromotionId = ViewObj.PromotionId;
    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    if (StatusId == "true") {
        status = '0';
    }
    else {
        status = '1';
    }
    switch (status) {
        case '0': confirmMsg = "Are you sure you want to change the status?"; alertMsg = 'Inactive'; break;
        case '1': confirmMsg = "Are you sure you want to change the status?"; alertMsg = 'Active'; break;
        default: breaK;
    }
    if (confirm(confirmMsg)) {
        var result = configure_saving_tips.ChangeStatus(PromotionId, status).value;
        if (result == "1") {
            alert('Status has been changed to ' + alertMsg);
            var row = getupdatedrow(PromotionId);
            if (Num >= 0) {
                var id = $("#jqxgrid").jqxGrid('getrowid', Num);
                $("#jqxgrid").jqxGrid('updaterow', id, row);
                $("#jqxgrid").jqxGrid('ensurerowvisible', Num);
                LoadGrid();
            }
        }
        else
            alert('Status is not ' + alertMsg);
    }
    else {
    }
}

$(document).ready(function () {

    $(window).resize(function () {
        try {
            if ($(window).width() < 1025)
                $("#jqxgrid").jqxGrid('autoresizecolumns');
            else {
                LoadGrid();
            }
        }
        catch (e) { }
    });

    var BreadcumMenu = '';
    BreadcumMenu = "<a href='../home.aspx'>Home</a>|<a href='#' id='UserReportDiv' class='Active'>Configure Saving Tips</a>| <a href='#' id='lblAddTopic' >Add Tips</a>";
    $("#BreadcumMenu").html(BreadcumMenu);
    $("#lblAddTopic").click(function () {
        mode = '0';
        $('.ddlCategory').attr('disabled', false);
        $('.ddlServiceType').attr('disabled', false); $('.ddlAccountType').attr('disabled', false);
        $('#blahimg').attr('src', '');
        Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
        //for clear controls
        $('#hdnDetails ').val(0);
        $('.ddlCategory').val('');
        $('.ddlServiceType').val(''); $('.ddlAccountType').val('');
        $('.txtSavingTips').val('');
        $('#nofile').html('No File Chosen');
        $('#btnRemoveFile').hide();
        //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
        //editorControl.set_content('');
        $('#summernote').summernote('code', '');
        $('.blahimg').val('');
        $('.txtAmount').val('');
        RemoveMandatoryAttributeFromElement($('.txtAmount'));
        $('.divRadioButtons input[type="radio"][value="1"]').attr('checked', 'checked');
        $('#popuptitle').html('Add Efficiency');
        $('#BtnAdd').val('Add');
        $('#BtnAdd').attr('title', 'Add');
        $("#lblAmountsaving").hide();
        $('.txtAmount').hide();
        $("#lblRebateprogramDesc").hide();
        $('.ddlRebateprogram').hide();
        RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
        $("#clnrebt").hide();
        $("#clnamt").hide();
        $(document.body).css("overflow", "hidden");//bugid23721
    });
    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
        $(document.body).removeAttr("style");
        $('#blahimg').hide();
        $('#blahimg').val('');
    });
    $("#ClosePopupAddTopic2").click(function () {
        Popup.hide('showdetails_effi');
        $(document.body).removeAttr('style');
    });

    $('.ddlCategory').on('change', function () {
        var ddlvalue = this.value;
        if (ddlvalue == 4) {
            $("#lblAmountsaving").hide();
            $('.txtAmount').hide();
            AddMandatoryAttributeToElement($('.ddlRebateprogram'));
            RemoveMandatoryAttributeFromElement($('.txtAmount'));
            $("#lblRebateprogramDesc").show();
            $("#clnrebt").show();
            $("#clnamt").hide();
            //  $('.ddlRebateprogram').show();
            RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
            $("#lblRebateprogramDesc").hide();
            $('.ddlRebateprogram').hide();
            $('.ddlRebateprogram').val('');
        }
        else if (ddlvalue == 3) {
            $("#lblAmountsaving").show();
            $("#lblAmountsaving").text('Incentive Rate');
            $('.txtAmount').attr('title', 'Incentive Rate');
            //*********************
            $('.txtAmount').attr('ValidateMessage', 'Please enter Incentive Rate');
            //*********************
            $('.txtAmount').show();
            AddMandatoryAttributeToElement($('.txtAmount'));
            RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
            $("#lblRebateprogramDesc").hide();
            $("#clnamt").show();
            $("#clnrebt").hide();
            $('.ddlRebateprogram').hide();
            $('.ddlRebateprogram').val('');
            // $('#lblRebateprogramDesc').hide();
        }
        else if (ddlvalue == 2) {
            $("#lblAmountsaving").hide();
            $('.txtAmount').hide();
            RemoveMandatoryAttributeFromElement($('.txtAmount'));
            RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
            $('.txtAmount').val('');
            $("#lblRebateprogramDesc").hide();
            $("#clnamt").hide();
            $("#clnrebt").hide();
            $('.ddlRebateprogram').hide();
            $('.ddlRebateprogram').val('');
        }
        else {
            $("#lblAmountsaving").show();
            $("#lblAmountsaving").text('Annual Savings');
            $('.txtAmount').val('');
            $('.txtAmount').attr('title', 'Annual Savings');
            //*********************
            $('.txtAmount').attr('ValidateMessage', 'Please enter Annual Savings');
            //*********************

            $('.txtAmount').show();
            RemoveMandatoryAttributeFromElement($('.ddlRebateprogram'));
            AddMandatoryAttributeToElement($('.txtAmount'));
            $("#lblRebateprogramDesc").hide();
            $("#clnamt").show();
            $('.ddlRebateprogram').hide();
            $('.ddlRebateprogram').val('');
        }
    });

    var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
        var GridHeight = $(window).height() - 331 + 150;
        $("#jqxgrid").jqxGrid({ height: GridHeight });
    }, false);

    $("#jqxgrid").on("filter", function (event) {
        var filterinfo = $("#jqxgrid").jqxGrid('getfilterinformation');
        var eventData = "Triggered 'filter' event";
        for (i = 0; i < filterinfo.length; i++) {
            var eventData = "Filter Column: " + filterinfo[i].filtercolumntext;
        }
    });
});

function readURL(input) {
    $('#blahimg').show();
    $('#btnRemoveFile').show();
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg')
            .attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
}

//BugId 19592
function validateallfields() {
    var errMsg = "Please enter all the mandatory information";
    //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
    var content = $('#summernote').summernote('code'); // editorControl.get_content();
    if (($("#ddlCategory option:selected").val() == "") && ($("#txtSavingTips").val() == "") && content == "" && ($("#ddlServiceType option:selected").val() == "") && ($("#ddlAccountType option:selected").val() == "")) {
        alert(errMsg);
        $('.ddlCategory').focus();
        return false;
    }
    else {
        return true;
    }

}

function validateExistingTips(obj) {
    try{

        var titletext = $('#txtSavingTips').val();
       if ((obj.title).trim().toLowerCase() == titletext.trim().toLowerCase()) {
            return true;
        }


    }
    catch (e) {
        console.log(e);
    }
}

function MatchExistingTitle() {
    try {

        if ($('#BtnAdd').val().trim().toLowerCase() == "add") {
            if (!checkExistingTitle())
                return false;
            return true;
        }
        else {
            if ($('#BtnAdd').val().trim().toLowerCase() == "update") {
                var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', editRowNum);
                var Title = ViewObj.title.trim().toLowerCase();
                var titletext = $('#txtSavingTips').val().trim().toLowerCase();
                if (Title == titletext) {
                    return true;
                }
                else {
                   
                    if (!checkExistingTitle())
                        return false;
                    return true;
                }

            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

function checkExistingTitle() {
    try{
        var len = (databindtogrid.filter(validateExistingTips)).length;
        if (len > 0) {
            alert("Category already exist");
            return false
        }
        else {
            return true;
        }
    }
    catch (e) {
        console.log(e);
    }
}