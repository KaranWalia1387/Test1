var hashtable = {};
var city = '';
var divId = 'div-ViewUserchart'; //added chart control
var usertable;
var defOpen = 1;
var autoheightbool = false;
var autoheightPrimary = false;
var popupdetails;
var latitude, longitude, cityname, zipcode, addr1, addr2;
var PrevCust = '';
var ZipcodeDetails = '';
var RebateDiv;
var ProgramDiv;
var str = '';
var count = 1;
var Tables, CustomerData, MapData;
var processed_jsonChart;
var jsonBillgridData, jsonPaymentgridData, jsonConnectMedata, jsonServiceRequestData, jsonServicePlandata;
var TimeOffSet = (new Date()).getTimezoneOffset();
var SearchText = '';
var Advancesearch = '0';

var pageIndex = 1;
var pageSize = 10;
var pagenumber = 1;
var sortorder = '';
var SortColumn = null;
var
    mode,
    datefrom,
    dateto,
        cityid,
        zipcode,
        username,
        customertype,
        pprbillstatus,
        textmsgstatus,
        status,
        mapnew,
        accountno;

var colorarrHEX = ['#1f8aa7', '#a19999', '#ac4040', '#30cd94', '#cda24c', '#6ab3c8', '#a27cb0', '#28aca6', '#4d4366', '#6e8953', '#087189', '#decc00', '#f1c354'];
var mode = '0';
var databindtogrid;
var JsonMap;
var zip = '';
var GridHeight = '';
var ViewObj = '';
gridid = 'jqxgrid';
percentwidth = .98;

//for jqx grid
var jsonMap;
var mappoints = new Array();
var custId;
var accnumber;
var CustomerType;
var checkboxFormatter = function (row, value) {
    var EmailID = $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID;
    return "<input type='checkbox' id=" + EmailID + " name='checkboxIsBCC' class='emailCC' >";
}

$(document).ready(function () {
    //***************************************************

    //***************************************************


    $('#ddltypeofmessage').prepend('<option selected="true" value="">---Select---</option>');
   
    //********************************

    loader.showloader();
    SearchText = '';




    $('#inputSearch').val('');
    try {

        $('#imgSearch').click(function () {
            SearchResult();
        });

        $.each($("#imgSearch").data("events"), function (i, e) {
            if (window.location.href.indexOf('searchtext') > 0) {
                SearchText = (window.location.href).split('&');
                SearchText = decodeURI((SearchText[0].split('?')[1]).split('=')[1]);
            }
        });
    } catch (e) { alert(e.message); }

    $(window).resize(function () {
        try {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
            $("#jqxchildgrid").jqxGrid('setcolumnproperty', 'Edit', 'width', '170');
        }
        catch (e) { }
    });
    //$("#mapView").click(function () {
    //    $('.right-active-sprite').hide();
    //    createmapCluster(JSON.parse(MapData), 'div-useremap');

    //});

    //$("#mapView").click(function () {
    //    $('.right-active-sprite').hide();
    //    var param = {
    //        'datefrom': txtFrom,
    //        'dateto': $('#txtDateTo').val(),
    //        'cityid': txtTo,
    //        'zipcode': '',
    //        'username': '',
    //        'customertype': '',
    //        'pprbillstatus': '',
    //        'textmsgstatus': '',
    //        'status': '',
    //        'accountno': '',
    //        'SearchString': SearchText,
    //        'Mode': mode,
    //        'PageIndex': pageIndex,
    //        'PageSize': pageSize,
    //        'SortColumn': 'CustomerName',
    //        'SortOrder': 'ASC',
    //        'emailId': '',
    //        'MobilePhone': ''
    //    };


    //    $.ajax({
    //        type: "POST",
    //        url: "Customer.aspx/LoadMap",
    //        data: JSON.stringify(param),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (response, status, type) {
    //            MapData = $.parseJSON(response.d);
    //            if (MapData != null) {
    //                createmapCluster(JSON.parse(MapData), 'div-useremap');
    //            }
    //            else
    //                createmapCluster('', 'div-useremap');
    //        },
    //        error: function (request, status, error) {
    //            console.log('Error!! ' + request.statusText);
    //            loader.hideloader();
    //        },
    //    });
    //    loader.hideloader();

    //});

    $(document).on("click", ".details", function () {
        loader.showloader();
        var ids = $(this).data('id');
        custId = ids.split(",")[0];
        accnumber = ids.split(",")[1];
        var statusforlink = ids.split(",")[2];
        OpenCustomerDetail(ids, custId, accnumber, statusforlink, databindtogrid);
        loader.hideloader();

    });

    $('#chkall').change(function () {
        var c = this.checked;
        $('.MailListing input[type=checkbox]').prop('checked', c);

    });

    $('.MailListing').on('click', 'input[type=checkbox]', function () {
        var cnt = 0;
        var checkedcnt = 0;
        var uncheckedcnt = 0;
        $('.MailListing input[type=checkbox]').each(function (obj) {
            cnt++;
            if ($(this).prop('checked')) {
                checkedcnt++;
            }
            else {
                uncheckedcnt++;
            }
        });
        if (checkedcnt == cnt) {
            $('#chkall').prop('checked', true);
        }
        else {
            $('#chkall').prop('checked', false);
        }
    });

    $('#btnStatus').click(function () {
        $('#ulCustomerDetail').text('');
        if ($('#viewStatus').val() == "ASC")
            $('#viewStatus').val("DESC");
        else {
            $('#viewStatus').val("ASC");
        }

        submit(parseInt(pagenumber), $('#ddlPagesize').val(), 'Status', $('#viewStatus').val());
        $('#hdnSortColumn').val('Status');
        $('#hdnSortOrder').val($('#viewStatus').val());
    });

    $('#btnCustomerName').click(function () {
        $('#ulCustomerDetail').text('');
        if ($('#viewCustomerName').val() == "ASC")
            $('#viewCustomerName').val("DESC");
        else {
            $('#viewCustomerName').val("ASC");
        }

        submit(parseInt(pagenumber), $('#ddlPagesize').val(), 'CustomerName', $('#viewCustomerName').val());
        $('#hdnSortColumn').val('CustomerName');
        $('#hdnSortOrder').val($('#viewCustomerName').val());
    });

    $('#btnEmailID').click(function () {
        $('#ulCustomerDetail').text('');
        if ($('#viewEmailID').val() == "ASC")
            $('#viewEmailID').val("DESC");
        else {
            $('#viewEmailID').val("ASC");
        }

        submit(parseInt(pageIndex), $('#ddlPagesize').val(), 'EmailID', $('#viewEmailID').val());
        $('#hdnSortColumn').val('EmailID');
        $('#hdnSortOrder').val($('#viewEmailID').val());
    });

    $('#btnUtilityAccountNumber').click(function () {
        $('#ulCustomerDetail').text('');
        if ($('#viewUtilityAccountNumber').val() == "ASC")
            $('#viewUtilityAccountNumber').val("DESC");
        else {
            $('#viewUtilityAccountNumber').val("ASC");
        }

        submit(parseInt(pageIndex), $('#ddlPagesize').val(), 'UtilityAccountNumber', $('#viewUtilityAccountNumber').val());
        $('#hdnSortColumn').val('UtilityAccountNumber');
        $('#hdnSortOrder').val($('#viewUtilityAccountNumber').val());
    });

    $('#left').click(function () {

        pagenumber = parseInt(pagenumber) - 1;
        $('#hdnSort').val('0');
        submit(parseInt(pagenumber), $('#ddlPagesize').val(), $('#hdnSortColumn').val(), $('#hdnSortOrder').val());

        //loadData(parseInt(pagenumber), $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);
        

    })

    $('#right').click(function () {

        pagenumber = parseInt(pagenumber) + 1;
        $('#hdnSort').val('0');
        if ($('#hdnSortColumn').val().trim() != "") {
            submit(pagenumber, $('#ddlPagesize').val(), $('#hdnSortColumn').val(), $('#hdnSortOrder').val());
        }
        else {
            submit(pagenumber, $('#ddlPagesize').val(), 'CustomerName', $('#hdnSortOrder').val());
        }

    });
    $(".Pager").on('click', '.page', function () {
        pageIndex = parseInt($(this).attr('page'));
        $('#hdnSort').val('0');
        submit(parseInt($(this).attr('page')), $('#ddlPagesize').val(), 'CustomerName', $('#hdnSortOrder').val());
        
        // loadData(parseInt($(this).attr('page')), $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);

    });


    $("#ddlPagesize").change(function () {
        var selectedText = $(this).find("option:selected").text();
        var selectedValue = $(this).val();
        if ($('#hdnSortColumn').text().trim() != "") {
            submit(pageIndex, $('#ddlPagesize').val(),  $('#hdnSortColumn').val(), $('#hdnSortOrder').val());
        }
        else {
            submit(pageIndex, $('#ddlPagesize').val(), 'CustomerName', $('#hdnSortOrder').val());
        }
        //loadData(pageIndex, $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);

    });


    $('#BtnFilter').click(function () {
        loader.showloader();
        //  submit();
        
        if (mode == 2) {
            LoadChart();
            $('#pieGraph').click();
        }
        else {

            submit(pageIndex, $('#ddlPagesize').val(), 'CustomerName', 'ASC');
            chartgraphsection(defOpen);
        }
        loader.hideloader();
    });

    $('#gridView').click(function () {
        $('.right-active-sprite').hide();
        $('#jqxgrid').show();
        $('#jqxchildgrid').hide();
        $('#jqxchildlegend').hide();
        defOpen = 1; chartgraphsection(defOpen);

    });

    $('#pieGraph').click(function () {
        $('.right-active-sprite').hide();
        defOpen = 2;
        mode = 2;
        LoadChart();
        chartgraphsection(defOpen);

    });

    $("#Back").click(function () {

        $('#chkall').attr('checked', false);
        mode = 0;
        $('#ddlCity').prop('selectedIndex', 0);
        submit(pageIndex, pageSize, 'CustomerName', 'ASC');
        $('.responsive_alignment_pagination').hide();
        $('.right-active-sprite').hide();
        $('.divPagesize').hide();
        $('.Pager').hide();
    });

    $('#btnSend').click(function () {
       // $('#ddltypeofmessage').prepend('<option selected="true" value="">--Message Type--</option>'); 
        SendNotification();
        return false;
    });



    $('.advancelink').click(function () {
        $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val('');
        $('#ddlsearchtype').val('0');
        $('#btnSubmit').removeAttr('disabled');
    });

    $('#btnSubmit').click(function () {
        $(this).attr('disabled', 'disabled');
        if ($("#ddlPaperBillStatus option:selected").index() > 0 || $("#ddlTextMsgStatus option:selected").index() > 0 || $("#ddlStatus option:selected").index() > 0 || $("#ddlAccountType option:selected").index() > 0 || $('#txtcustname').val() != "" || $('#txtAccountID').val() != "" || $('#txtphone').val() != "" || $('#txtEmail').val() != "") {
            $('.advanceSearch').modal('toggle');
            Advancesearch = '1';
            submit(pageIndex, pageSize, 'CustomerName', 'ASC');
           // Advancesearch = '1';
        }
        else {
            //alert("Please select from Filter options");
            alert("Please select criteria to filter options");
            $(this).removeAttr('disabled');
            return false;
        }
        filterCreate();
    });

    $('#ddlAddress').change(function () {
        txtFrom = getMMDDYYDate($('#txtDateFrom').val());
        txtTo = getMMDDYYDate($('#txtDateTo').val());
        if (txtFrom == "NaN/NaN/N") {
            txtFrom = '';
        }
        if (txtTo == "NaN/NaN/N") {
            txtTo = '';
        }
        var timeOffsetMinutes = (new Date()).getTimezoneOffset();
        var param = {
            'datefrom': txtFrom,
            'dateto': $('#txtDateTo').val(),
            'cityid': txtTo,
            'zipcode': '',
            'username': '',
            'customertype': '',
            'pprbillstatus': '',
            'textmsgstatus': '',
            'status': '',
            'accountno': '',
            'TimeOffSet': timeOffsetMinutes,
            'SearchString': SearchText,
            'Mode': mode,
            'PageIndex': pageIndex,
            'PageSize': pageSize,
            'SortColumn': 'CityName',
            'SortOrder': 'ASC',
            'emailId': '',
            'MobilePhone': ''
        };
        GetDataOnAddressChange(Error, param);

    });

    function OnError(request, status, error) {
        alert('Error!! ' + request.statusText);
    }

    function onSucess(data, status) {
        $('#profile').html('');
        if (data.d == '') {
            $('#profile').html("<center><font color='Red'>No Data Available</Font></center>")
        }
        else {
            var divdata = data.d;
            $('#profile').html(data.d);
            var divcontent1 = $.parseJSON(data.d);
            $('#profile').html(divcontent1);

        }
    }

    $('.ccClose').click(function () {
        var id = this.id;
        $("#" + id).find('option:first')
           .attr('selected', 'selected');
        $("#txtcustname").val("");
        submit(pageIndex, pageSize, 'CustomerName', 'ASC');
        filterCreate();
    });

    $('#btnCancel').click(function () {
        $("#ddlAccountType").find('option:first')
            .attr('selected', 'selected');
        $("#ddlStatus").find('option:first')
            .attr('selected', 'selected');
        $("#ddlRole").find('option:first')
            .attr('selected', 'selected');
        $("#ddlPaperBillStatus").find('option:first')
            .attr('selected', 'selected');
        $("#ddlTextMsgStatus").find('option:first')
            .attr('selected', 'selected');
    });

    $("#filterTable").on('click', '.ccClose', function () {
        var classnameselected = this.className.split(' ')[0];
        var id = classnameselected;
        $("#" + id).find('option:first')
           .attr('selected', 'selected');
       // $("#txtcustname").val("");
        $("#" + id).val('')
        submit(pageIndex, pageSize, 'CustomerName', 'ASC');
        filterCreate();
    });

    $(".jqgrid").height(0);

    $('.imgtoggle').click(function () {
        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });


    txtFrom = getMMDDYYDate($('#txtDateFrom').val());
    txtTo = getMMDDYYDate($('#txtDateTo').val());
    if (txtFrom == "NaN/NaN/N") {
        txtFrom = '';
    }
    if (txtTo == "NaN/NaN/N") {
        txtTo = '';
    }

    if (SearchText != "") {
        mode = 1;
    }
    var param = {
        'datefrom': txtFrom,
        'dateto': $('#txtDateTo').val(),
        'cityid': txtTo,
        'zipcode': '',
        'username': '',
        'customertype': '',
        'pprbillstatus': '',
        'textmsgstatus': '',
        'status': '',
        'accountno': '',
        'SearchString': SearchText,
        'Mode': mode,
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortColumn': 'CityName',
        'SortOrder': 'ASC',
        'emailId': $("#txtEmail").val(),
        'MobilePhone': $("#txtphone").val(),
        'Searchtype': $("#ddlsearchtype").val(),
        'Advancesearch': Advancesearch,
        'Address': $("#txtStreet").val()

    };
    CallAjax(Error, param);


    var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
    var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
    var ddlStatus = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();
    var custname = '';
    var accountno = '';

    // START NEW UI 12/19/2014
    zip = '';
    city = '';

    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');

        if ($(ddlCity).attr('key') == 'Zipcode') {
            city = $(ddlCity).attr('cityid');
            zip = $(ddlCity).val();
        }
        else {
            city = $(ddlCity).val();
            zip = '';
        }
    }

    $('#hdnParamValues').val(mode + '|' + txtFrom + '|' + txtTo + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno + '|' + SearchText + '|' + pageIndex + '|' + pageSize + '|' + SortColumn + '|' + 'ASC' + '|' + '' + '|' + '');

    
    // END NEW UI 12/19/2014

    chartgraphsection(defOpen);

    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    $(document).on("click", "#locationCustomer a", function () {
        LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2);
        $("#location").css('height', '350px');
    });

    $("#ddlMessageMode").change(function (i, obj) {
        var opt = $(this).val();
        showhideeditor(opt);
    });

    $("#ClosePopupAddTopic").click(function () {
        Popup.hide('PopupAddTopic');
    });

    $('#btnRemoveFile').hide();
    showhideeditor($("#ddlMessageMode").val());

    $('#btnSubmitReply').click(function () {
        if (validateconfiguration() == true) {
            if (!IsFileValidForUpload()) {
                alert('Invalid file type select; file extentions allowed are : gif, png, bmp, jpg, jpeg, txt and rtf.');
                return false;
            }
            var placeholderid = $('#ddltypeofmessage').val();
            var subject = $("#txtmsgsubject").val();
           // var hide = ($("#ddlMessageMode").val() != "1") ? $("#txtMessage").val() : $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").get_content();
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
                url: "Customer.aspx/InsertMessages",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }
    });

    function OnSuccess(data, status) {
        if (parseInt(data.d) > 0)
            alert('Message has been sent successfully');
        else
            alert('Message not sent.');
        $("#jqxchildgrid").jqxGrid('clearselection');

        resetForm(); removeFile();
        Popup.hide('PopupAddTopic');
        loader.hideloader();
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
    }
    function resetForm() {

        $('#ddltypeofmessage').val('');
        if ($("#ddlMessageMode").val() == "1") {
            //  $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").set_content("");
            $('#summernote').summernote('code', '');
            $("#txtmsgsubject").val('');
            showhideeditor('0');
        }
        else { $('textarea').val(''); }
        $('#ddlMessageMode').val('');
        $('#txtMessage').text('');
    }
    $("#ClosePopupChangepass").click(function () {
        Popup.hide('PopupChangePassword');
        $('.PopupScreen').hide();
        $('.PopupScreenIframe').hide();

    });

    $('#txtpassword').attr("ValidateMessage", "Please enter New Password");
    $('#txtConfirmpassword').attr("ValidateMessage", "Please confirm the Password");

});

function SearchResult() {
    try {
        if ($('#inputSearch').val() != "") {
            SearchText = $('#inputSearch').val();
            mode = 1;
            var timeOffsetMinutes = (new Date()).getTimezoneOffset();
            var param = {
                'datefrom': "",
                'dateto': "",
                'cityid': "",
                'zipcode': "",
                'username': "",
                'customertype': "",
                'pprbillstatus': "",
                'textmsgstatus': "",
                'status': "",
                'accountno': "",
                'SearchString': SearchText,
                'Mode': mode,
                'PageIndex': pageIndex,
                'PageSize': pageSize,
                'SortColumn': SortColumn,
                'SortOrder': sortorder,
                'emailId': $("#txtEmail").val(),
                'MobilePhone': $("#txtphone").val(),
                'Searchtype': $("#ddlsearchtype").val(),
                'Advancesearch': Advancesearch,
                'Address': $("#txtStreet").val()
            };
            CallAjax(Error, param);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

//$(document).on("click", ".userDetails", function () {
//    loader.showloader();
//    $('#primary').addClass('active');
//    $('#property').removeClass('active');
//    $('#profile').removeClass('active');
//    $('#PropAddress').removeClass('active');
//    $('#locationCustomer').removeClass('active');
//    $('#locations').removeClass('active');
//    $('#notifications').removeClass('active');
//    $('#bill_pay').removeClass('active');
//    $('#serviceRequest').removeClass('active');
//    $('#Servicerequests').removeClass('active');
//    $('#home').addClass('active');
//    $('#profile').removeClass('active');
//    $('#location').removeClass('active');
//    $('#notify').removeClass('active');
//    $('#billpay').removeClass('active');
//    $('#requests').removeClass('active');
//    $('#plans').removeClass('active');
//    $('#Rebate').removeClass('active');
//    $('#Rebateprogram').removeClass('active');
//    $('#connectMeRequest').removeClass('active');
//    $('#MarketPref').removeClass('active');
//    $('#Market').removeClass('active');
//    $('#requests').removeClass('active');
//    $('#count').removeClass('active');
//    $('#Usage').removeClass('active');
//    $('#CompareMeDiv').removeClass('active');
//    $('#CompareMe').removeClass('active');
//    var ids = $(this).data('id');
//    custId = ids.split(",")[0];
//    accnumber = ids.split(",")[1];
//    var statusforlink = ids.split(",")[2];
//    $('#custId').val(custId);

//    //To load propery tab details
//    var custDetails = Customer.GetddlCustDetails(custId);

//    ZipcodeDetails = JSON.parse(custDetails.value);
//    BindDropdownPopAddress(JSON.parse(custDetails.value), accnumber);
//    var AccountNumber = $('#ddlAddress option:selected').val();
//    for (var i = 0; i < ZipcodeDetails.length; i++) {
//        if (AccountNumber == ZipcodeDetails[i].Accountnumber) {

//            divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:</b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
//            $('#DivBasicDetails').html('');
//            $('#DivBasicDetails').html(divbasicDt);
//            break;
//        }
//    }
//    var p = 'UserName>' + ZipcodeDetails[0].UserName + '&Password>' + ZipcodeDetails[0].Password;

//    if (statusforlink == "Active") {
//        $('#lnkToPortal').css('display', 'block');
//        $('#lnkToPortal').attr('href', $('#portalweb').val() + '?key=' + Customer.Encrypt(p).value);
//        $('#lnkToPortal').attr('target', '_new');
//    }
//    else {
//        $('#lnkToPortal').css('display', 'none');
//    }

//    //Start - Load notify,payment,requests and plans tab
//    popupdetails = Customer.LoadPopupDetailsData(accnumber, TimeOffSet).value;
//    FillCustomerDetails(popupdetails);
//    LoadProfile(popupdetails);
//    //End

//    loader.hideloader();
//    //setTimeout($(".wrapper_user_box").each(function (index) {
//    //    $(this).find(".userdetails_box:visible").removeClass("even").filter(":even").addClass("even");
//    //}), 20);
//});

//$(document).on("click", "#property", function () {
//    LoadPropertyDetails();
//});

//$(document).on("click", "#notifications", function () {

//    if ($('#custId').val() != null && $('#custId').val() != "") {
//        var customerId = $('#custId').val();
//        var Account = $('#ddlAddress option:selected').val();
//        var param = {
//            CustomerId: customerId,
//            Account: Account
//        }
//    }

//    $.ajax({
//        type: "POST",
//        url: "Customer.aspx/LoadNotificationData",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: JSON.stringify(param),
//        success: function OnSuccess(response) {

//            loadDataNotification(response);
//        },
//        error: OnErrorCS,
//    });



//});

//$(document).on("click", "#bill_pay", function () {
//    LoadBillGrid(jsonBillgridData);
//    LoadPaymentGrid(jsonPaymentgridData);

//});

//$(document).on("click", "#connectMeRequest", function () {
//    LoadConnectMeRequestGrid(jsonConnectMedata);
//});

//$(document).on("click", "#serviceRequest", function () {
//    LoadServiceRequestGrid(jsonServiceRequestData);
//});

//$(document).on("click", "#serviceplans", function () {
//    ServicePlans(jsonServicePlandata)
//});

//$(document).on("click", "#Rebateprogram", function () {
//    //To fill admin Rebate/Program Details
//    RebateDiv = Customer.GetCustomerProgram(accnumber, 3).value;
//    ProgramDiv = Customer.GetCustomerProgram(accnumber, 1).value;
//    LoadAdminRebate(RebateDiv);
//    LoadAdminProgram(ProgramDiv);

//});

//$(document).on("click", "#btnSave", function () {
//    if (ValidatePage('notify') && validateEmail('notify')) {
//        loader.showloader();
//        var Account = $('#ddlAddress option:selected').val();
//        var param = {
//            AccountNumber: Account,
//            xml: xml(),

//        };
//        $.ajax({
//            type: "POST",
//            url: "Customer.aspx/SaveDataNotification",
//            data: JSON.stringify(param),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: OnSuccess,
//            error: OnError
//        });

//        function OnSuccess(data, status) {
//            loader.hideloader();
//            var v = JSON.parse(data.d);
//            if (parseInt(v.Table[0].Status) > 0) {

//                try {
//                    w2alert(v.Table[0].Message);
//                }
//                catch (ex)
//                { }

//            }
//            else {
//                w2alert(v.Table[0].Message);

//            }
//        }
//        function OnError(request, status, error) {
//            loader.hideloader();
//            w2alert(request.statusText);

//        }
//    }
//});

//function BindDropdownPopAddress(custDetails, AccountNumber) {
//    try {

//        $("#ddlAddress").html('');
//        $.each(custDetails, function (key, value) {
//            if (value.Address2 != "")
//                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + " " + value.Address2 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
//            else if ((value.Address2 == "") && (value.Address1 == "")) {
//                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
//            }
//            else { $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode)); }

//        });
//        document.getElementById("ddlAddress").value = AccountNumber;
//    }
//    catch (e) { }
//}

function LoadAdminRebate(Rebate_Div) {
    RebateDiv = Rebate_Div;
    if (RebateDiv != null) {
        for (var i = 0; i < RebateDiv.Rows.length; i++) {
            BindingAdminRebate(i);
        }
        $('#divRebate').html(str);
        str = '';
        count = 1;
    }
    else {
        $('#divRebate').html('');
        str = '';
        count = 1;
    }
}

function LoadAdminProgram(Program_Div) {
    ProgramDiv = Program_Div;
    if (ProgramDiv != null) {
        for (var i = 0; i < ProgramDiv.Rows.length; i++) {
            BindingAdminProgram(i);
        }
        $('#divProgram').html(str);
        str = '';
        count = 1;
    }
    else {
        $('#divProgram').html('');
        str = '';
        count = 1;
    }
}

function ShowContent(id) {
    try {
        var ContentDisplay = $("#" + id + "_Content").css('display');
        if (ContentDisplay == "none") {
            $("#" + id).html("Click to Hide Details");
            $("#" + id + "_Content").slideToggle("fast");
            var promotionid = id.split('_')[1];
            var result = comEnergyEfficiency.ViewSavingTip(promotionid).value;
            if (result != null) {
                $('#VC_' + promotionid).html(result.Rows[0].UpdatedCount);
            }
        }
        else {
            $("#" + id).html("Show Details");
            $("#" + id + "_Content").slideToggle("fast");
        }
    }
    catch (e) { }
}

function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

function BindingAdminRebate(i) {

    var attachmentpath = "../Attachments/";
    var ImgURL = (RebateDiv.Rows[i].ImageUrl == "") ? "../images/no_img.png" : (attachmentpath + '' + RebateDiv.Rows[i].ImageUrl);
    var RebateProgramDesc = RebateDiv.Rows[i].RebateProgramDesc;
    var program_status = RebateDiv.Rows[i].program_status;
    var PromotionLike = RebateDiv.Rows[i].PromotionLike;
    str += '<ul><li><div class="profile_img"><span>' + (count++) + '</span><asp:Label ID="lblPromotionId" Text=' + RebateDiv.Rows[i].PromotionId + ' runat="server" Visible="false" ClientIDMode="Static" ></asp:Label>'
    str += '<img src=' + ImgURL + ' style="width:60px!important; height:60px;" onerror="imgError(this);">'
    str += '</div><div class="details_box"><h5><div>' + RebateDiv.Rows[i].Title + '</div></h5><div class="row-1"><div class="col-lg-5 col-md-5 col-sm-4 col-xs-8 view_details"><ul>'
    str += ' <li><span style="padding-right:2px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added">Added:</span><span>' + RebateDiv.Rows[i].AddedCount + '</span></li>'
    str += ' <li><span style="padding-right:1px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Viewed">Viewed:</span><span id="VC_' + RebateDiv.Rows[i].PromotionId + '">' + RebateDiv.Rows[i].VIEWS + '</span></li></ul></div>'
    str += '<div class="register_lnk col-lg-7 col-md-7 col-sm-8 col-xs-12"><ul><li><span globalize="ML_Programs_li_Type">Type: </span><span>' + RebateDiv.Rows[i].RebateProgramDesc + '</span></li><li>'
    str += '<a href="#" class="' + ((PromotionLike == "1") ? ("like_lnk") : ("like_lnk")) + '" id="LK_"+' + RebateDiv.Rows[i].PromotionId + '></a>'
    str += '<span globalize="ML_ENERGY_EFFICIENCY_Lbl_Likes"  style="padding-right:4px">Likes:</span><span id="LC_"' + RebateDiv.Rows[i].PromotionId + '">' + RebateDiv.Rows[i].LikeCount + '</span></li>'
    str += '<li class="register_eff_lnk" style=' + ((RebateProgramDesc == "Mandatory Program") ? "background:none !important" : "url(/images/divider_like_lnk.png) no-repeat left 14px !important;") + '>'
    str += '<a href="connect-me.aspx?pid=p&q=' + RebateDiv.Rows[i].Title + '>&id=' + RebateDiv.Rows[i].PromotionId + '" globalize="ML_Programs_anchor_Register"'
    str += '  </li></div><div class="show_hide_details" > <a href="#" id="ST_' + RebateDiv.Rows[i].PromotionId + '" onclick="ShowContent(id);" class="program_details_lnk"><span globalize="ML_Programs_anchor_Show_Details" class="program_details_lnk">Show Details</span></a></div></div></div>'
    str += ' </li><div class="ShowDetailsDiv" id="ST_' + RebateDiv.Rows[i].PromotionId + '_Content">' + RebateDiv.Rows[i].Description + '</div></ul>';
}

function BindingAdminProgram(i) {

    var attachmentpath = "../Attachments/";
    var ImgURL = (ProgramDiv.Rows[i].ImageUrl == "") ? "../images/noimage.png" : (attachmentpath + '' + ProgramDiv.Rows[i].ImageUrl);
    var RebateProgramDesc = ProgramDiv.Rows[i].RebateProgramDesc;
    var program_status = ProgramDiv.Rows[i].program_status;
    var PromotionLike = ProgramDiv.Rows[i].PromotionLike;
    str += '<ul><li><div class="profile_img"><span>' + (count++) + '</span><asp:Label ID="lblPromotionId" Text=' + ProgramDiv.Rows[i].PromotionId + ' runat="server" Visible="false" ClientIDMode="Static" ></asp:Label>'
    str += '<img src=' + ImgURL + ' style="width:60px!important; height:60px;" onerror="imgError(this);">'
    str += '</div><div class="details_box"><h5><div>' + ProgramDiv.Rows[i].Title + '</div></h5><div class="row-1"><div class="col-lg-5 col-md-5 col-sm-4 col-xs-8 view_details"><ul>'
    str += ' <li><span style="padding-right:2px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added">Added:</span><span>' + ProgramDiv.Rows[i].AddedCount + '</span></li>'
    str += ' <li><span style="padding-right:1px" globalize="ML_ENERGY_EFFICIENCY_Lbl_Viewed">Viewed:</span><span id="VC_' + ProgramDiv.Rows[i].PromotionId + '">' + ProgramDiv.Rows[i].VIEWS + '</span></li></ul></div>'
    str += '<div class="register_lnk col-lg-7 col-md-7 col-sm-8 col-xs-12"><ul><li><span globalize="ML_Programs_li_Type">Type: </span><span>' + ProgramDiv.Rows[i].RebateProgramDesc + '</span></li><li>'
    str += '<a href="#" class="' + ((PromotionLike == "1") ? ("like_lnk") : ("like_lnk")) + '" id="LK_"+' + ProgramDiv.Rows[i].PromotionId + '></a>'
    str += '<span globalize="ML_ENERGY_EFFICIENCY_Lbl_Likes"  style="padding-right:4px">Likes:</span><span id="LC_"' + ProgramDiv.Rows[i].PromotionId + '">' + ProgramDiv.Rows[i].LikeCount + '</span></li>'
    str += '<li class="register_eff_lnk" style=' + ((RebateProgramDesc == "Mandatory Program") ? "background:none !important" : "url(/images/divider_like_lnk.png) no-repeat left 14px !important;") + '>'
    str += '<a href="connect-me.aspx?pid=p&q=' + ProgramDiv.Rows[i].Title + '>&id=' + ProgramDiv.Rows[i].PromotionId + '" globalize="ML_Programs_anchor_Register"'
    str += '  </li></div><div class="show_hide_details" > <a href="#" id="ST_' + ProgramDiv.Rows[i].PromotionId + '" onclick="ShowContent(id);" class="program_details_lnk"><span globalize="ML_Programs_anchor_Show_Details" class="program_details_lnk">Show Details</span></a></div></div></div>'
    str += ' </li><div class="ShowDetailsDiv" id="ST_' + ProgramDiv.Rows[i].PromotionId + '_Content">' + ProgramDiv.Rows[i].Description + '</div></ul>';
}

$(document).on("click", ".filterdrop1", function () {
    mode = 1;
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        LoadUserZipcode($(obj).text());
    }
    submit(pageIndex, pageSize, 'CustomerName', 'ASC');
});

$(document).on("click", ".lockimg", function () {
    var idLock = this.id;
    var lockStatus = idLock.split('_')[0];
    var custId = idLock.split('_')[1];
    LockUnlock(lockStatus, custId, idLock);
});

$(document).on("click", ".registerimg", function () {
    var idLock = this.id;
    var StatusId = idLock.split('_')[0];
    var custId = idLock.split('_')[1];
    UserStatusRights ? RegisterImg(StatusId, custId, idLock, $(this).attr('kubratoken'), $(this).attr('details')) : '';
});

$(document).on("click", ".extra", function () {
    var idLock = this.id;
    PasswordReset(idLock);
});

function RegisterImg(StatusId, custId, idActive, kubratoken, userdetails) {
    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    switch (StatusId) {
        case 'Inactive':
            confirmMsg = "Are you sure you want to change the status?";
            alertMsg = 'Active';//According to BRD Sheet (Spreadsheet CSR-Workbench, Row no 19)
            status = '1';
            break;
        case 'Active':
            confirmMsg = "Are you sure you want to change the status?";
            alertMsg = 'Inactive';//According to BRD Sheet (Spreadsheet CSR-Workbench, Row no 21)
            status = '2';
            break;
        case 'Registered':
            confirmMsg = "Are you sure you want to change the status?";
            //alertMsg = 'activated';
            alertMsg = 'Active';
            status = '1';
            break;
        case 'Not Registered':
            return false;
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        changeStatusAsync(custId, status, alertMsg, idActive, StatusId, kubratoken, userdetails);
    } else {
    }
}

function ResendActivation(CustomerId) {
    loader.showloader();
    var param = {
        custid: CustomerId,

    };

    $.ajax({

        type: "POST",
        url: "Customer.aspx/ResendActivation",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            if (data.d == "Mail sent successfully") {

                alert("An Activation Mail has been sent successfully.");
                loader.hideloader();
            }

        },

        error: function (request, status, error) {
            alert('Error ' + request.statusText);
        }

    });

}

function changeStatusAsync(customerid, lockStatus, alertMsg, idActive, statusID, kubratoken, userdetails) {
    loader.showloader();
    if (kubratoken != '' && kubratoken != undefined) {
        var param = {
            custid: customerid,
            status: lockStatus,
            kubratoken: kubratoken,
            userdetails: userdetails
        };
    }
    else {
        var param = {
            custid: customerid,
            status: lockStatus,
            kubratoken: '',
            userdetails: userdetails
        };
    }

    $.ajax({

        type: "POST",
        url: "Customer.aspx/ChangeStatusAsync",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {

            if (parseInt(data.d) == 1) {
                alert('Status has been changed to ' + alertMsg);
                if (idActive.split('_')[0].toLowerCase() == 'registered' || idActive.split('_')[0].toLowerCase() == 'inactive') {
                    $('#' + idActive).attr("src", "../images/active.png");
                    $('#' + idActive).attr("id", "Active_" + customerid);
                }
                else if (idActive.split('_')[0].toLowerCase() == 'active') {
                    $('#' + idActive).attr("src", "../images/inactive.png");
                    $('#' + idActive).attr("id", "Inactive_" + customerid);
                }
                else {
                    $('#' + idActive).attr("src", "../images/registered.png");
                    $('#' + idActive).attr("id", "Registered_" + customerid);
                }
                var param = {
                    'datefrom': "",
                    'dateto': "",
                    'cityid': city,
                    'zipcode': "",
                    'username': "",
                    'customertype': "",
                    'pprbillstatus': "",
                    'textmsgstatus': "",
                    'status': "",
                    'accountno': "",
                    'SearchString': SearchText,
                    'Mode': mode,
                    'PageIndex': pageIndex,
                    'PageSize': pageSize,
                    'SortColumn': 'CustomerName',
                    'SortOrder': 'ASC',
                    'emailId': '',
                    'MobilePhone': '',
                    'Searchtype':'',
                    'Address':'',
                    'Advancesearch':''
                };
                CallAjax(Error, param);
                resetAdvanceSearch();
            }
            else {
                alert('Error in page');
            }
        },

        error: function (request, status, error) {
            alert('Error ' + request.statusText);
        }

    });

}

function filterCreate() {
    var fullItem = "<tr>";
    for (var key in hashtable) {
        if (hashtable[key].trim() != '') {
            var classcross = key + " ccClose";
            var teststatus = "<td><p class=ccBean ><span class=ccName>" + hashtable[key] + "</span><span  class=\"" + classcross.trimStart() + "\" >X</span></p></td>";
            fullItem = fullItem + teststatus;
        }
    }

    $("#filterTable tr").remove();
    $('#filterTable').append(fullItem + "</tr>");
}

function LockUnlockUserAsync(customerid, lockStatus, alertMsg, idLock) {
    loader.showloader();
    var param = {
        custid: customerid,
        lockstatus: lockStatus
    };
    $.ajax({
        type: "POST",
        url: "Customer.aspx/LockStatusAsync",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            if (parseInt(data.d) == 1) {
                alert('Customer has been ' + alertMsg + ' successfully');//According to BRD Sheet
                if (idLock.split('_')[0].toLowerCase() == 'unlock') {
                   // $('#' + idLock).attr("src", "../images/locked.png");
                    $('#' + idLock).attr("class", "lockimg fa fa-lock");
                    $('#' + idLock).attr("id", "Lock_" + customerid);

                }
                else {
                   // $('#' + idLock).attr("src", "../images/unlocked.png");
                    $('#' + idLock).attr("class", "lockimg fa fa-unlock");
                    $('#' + idLock).attr("id", "Unlock_" + customerid);
                }
                var lck = idLock.split('_')[0].toLowerCase() == "lock" ? "lockimg fa fa-lock" : "lockimg fa fa-unlock";
                $('#' + idLock).attr("class", lck);
                loader.hideloader();
            }
            else {
                alert('Error in page');
                loader.hideloader();
            }
            loader.hideloader();
        },
        error: function (request, status, error) {
            alert('Error ' + request.statusText);
            loader.hideloader();
        }
    });
}

function LockUnlock(lockStatus, custId, idLock) {
    var confirmMsg = '';
    var alertMsg = '';
    var lockcase = '';
    if (lockStatus == "Lock") {
        lockcase = '0';
    } else {
        lockcase = '1';
    }
    switch (lockcase) {
        case '0':
            confirmMsg = "Are you sure you want to unlock this customer?";
            alertMsg = 'unlocked';
            break;
        case '1':
            confirmMsg = "Are you sure you want to lock this customer?";
            alertMsg = 'locked';
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        LockUnlockUserAsync(custId, lockcase, alertMsg, idLock);
    } else {
    }
}





function PasswordReset(CustId) {
    $('#HiddenFieldCustid').val(CustId);
    Popup.showModal('PopupChangePassword');
    $('#txtpassword').val('');
    $('#txtConfirmpassword').val('');

}

function submit(PIndex, PSize, SColumn, SOrder) {
    try {
        var startDate = getMMDDYYDate($('#txtDateFrom').val());
        var endDate = getMMDDYYDate($('#txtDateTo').val());
        if (startDate == "NaN/NaN/N") {
            startDate = '';
        }
        if (endDate == "NaN/NaN/N") {
            endDate = '';
        }
        var Status = $('#ddlStatus').val();
        var role = $('#ddlRole').val();
        hashtable = {};

        if ($("#ddlPaperBillStatus option:selected").index() > 0) {
            hashtable["ddlPaperBillStatus"] = "Paper Bill Status: " + " " + $("#ddlPaperBillStatus option:selected").text();

        }
        if ($("#ddlTextMsgStatus option:selected").index() > 0) {
            hashtable["ddlTextMsgStatus"] = "TextMsg Status:" + " " + $("#ddlTextMsgStatus option:selected").text();
        }
        if ($("#ddlRole option:selected").index() > 0) {
            hashtable["ddlRole"] = "Role: " + " " + $("#ddlRole option:selected").text();
        }
        if ($("#ddlStatus option:selected").index() > 0) {
            hashtable["ddlStatus"] = "Status:" + " " + $("#ddlStatus option:selected").text();
        }
        if ($("#ddlAccountType option:selected").index() > 0) {
            hashtable["ddlAccountType"] = "Account Type: " + " " + $("#ddlAccountType option:selected").text();
        }
        if ($('#txtphone').val() != "") {
            hashtable["txtphone"] = "Mobile Number: " + " " + $('#txtphone').val();
        }
        if ($('#txtStreet').val() != "") {
            hashtable["txtStreet"] = "Street: " + " " + $('#txtStreet').val();
        }
        if ($("#txtcustname").val() != "") {
            //hashtable["ddlRole"] = $("#ddlRole option:selected").text();
            hashtable["txtcustname"] = "Customer Name: " + " " + $('#txtcustname').val();
        }
        if ($('#txtAccountID').val() != "") {
            hashtable["txtAccountID"] = "AccountID: " + " " + $('#txtAccountID').val();
        }
        if ($("#txtEmail").val() != "") {
            //hashtable["ddlRole"] = $("#ddlRole option:selected").text();
            hashtable["txtEmail"] = "Email: " + " " + $('#txtEmail').val();
        }

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than To date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        var custname = '';
        var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
        var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
        var ddlStatus = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();

      //  var custname = ($('#txtcustomername').val() == null || $('#txtcustomername').val() == '' || $('#txtcustomername').val() == $('#txtcustomername').attr('placeholder')) ? '' : $('#txtcustomername').val();
        var custname = ($("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == null || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == '' || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").attr('placeholder')) ? '' : $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val();
        if (custname.trim() == '')
        {
            custname = $('#txtcustname').val();
        }
        var accountno = ($("#txtAccountID").val() == null || $("#txtAccountID").val() == '' || $('#txtAccountID').val() == $('#txtAccountID').attr('placeholder')) ? '' : $("#txtAccountID").val();

        zip = '';
        city = '';
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');

            if ($(ddlCity).attr('key') == 'Zipcode') {
                city = $(ddlCity).attr('cityid');
                zip = $(ddlCity).val();
            }
            else {
                city = $(ddlCity).val();
                zip = '';
            }
        }
        if (mode == 0) {
            var param = {
                'datefrom': $('#txtDateFrom').val(),
                'dateto': $('#txtDateTo').val(),
                'cityid': city,
                'zipcode': zip,
                'username': custname,
                'customertype': $('#ddlAccountType').val(),
                'pprbillstatus': ddlPaperBillStatus,
                'textmsgstatus': ddlTextMsgStatus,
                'status': $('#ddlStatus').val(),
                'accountno': $('#txtAccountID').val(),
                'SearchString': SearchText,
                'Mode': mode,
                'PageIndex': PIndex,
                'PageSize': PSize,
                'SortColumn': 'CityName',
                'SortOrder': 'ASC',
                'emailId': $("#txtEmail").val(),
                'MobilePhone': $("#txtphone").val(),
                'Searchtype': $("#ddlsearchtype").val(),
                'Advancesearch': Advancesearch,
                'Address': $("#txtStreet").val()

            };
            $('#hdnParamValues').val(mode + '|' + startDate + '|' + endDate + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno + '|' + SearchText + '|' + PIndex + '|' + PSize + '|' + 'CityName' + '|' + 'ASC' + '|' + '' + '|' + '' + '|' + $("#ddlsearchtype").val() + '|' + '');
        }
        else {

            var param = {
                'datefrom': $('#txtDateFrom').val(),
                'dateto': $('#txtDateTo').val(),
                'cityid': city,
                'zipcode': zip,
                'username': custname,
                'customertype': $('#ddlAccountType').val(),
                'pprbillstatus': ddlPaperBillStatus,
                'textmsgstatus': ddlTextMsgStatus,
                'status': $('#ddlStatus').val(),
                'accountno': $('#txtAccountID').val(),
                'SearchString': SearchText,
                'Mode': mode,
                'PageIndex': PIndex,
                'PageSize': PSize,
                'SortColumn': SColumn,
                'SortOrder': SOrder,
                'emailId': $("#txtEmail").val(),
                'MobilePhone': $("#txtphone").val(),
                'Searchtype': $("#ddlsearchtype").val(),
                'Advancesearch': Advancesearch,
                'Address': $("#txtStreet").val()
            };
            $('#hdnParamValues').val(mode + '|' + startDate + '|' + endDate + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno + '|' + SearchText + '|' + PIndex + '|' + PSize + '|' + SColumn + '|' + SOrder + '|' + '' + '|' + '' + '|' + $("#ddlsearchtype").val() + '|' + '');
        }
      
        CallAjax(Error, param);
        //resetAdvanceSearch();
    }
    catch (e) { }
}



var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "Paperless": return getlock(row, value, datafield); break;
        case "DeActivate": return getDeactve(row, value, datafield);
        case "Status": return getAction(row, value); break;
        case "Edit": return getResetPassword(row, value); break;
        case "CustomerName": return getView(row, value); break;
        case "CityName": return getdropDown(row, value); break;
        case "Cnt": return getdropDownCount(row, value); break;
        case "SSNNumber": return '****'; break;
        case "ActivateCustomer": return getActivation(row, value); break;
        default: break;
    }
}

function LoadGrid() {
    $("#btnSend").hide(); $('#Back').hide();
    autoheightPrimary = false;

    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    source = {
        datatype: "array",
        datafields: [
         { name: 'CityName' },
             { name: 'CityId', type: 'number' },
         { name: 'Cnt', type: 'number' }
        ],
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        source: dataAdapter,
        height: GridHeight * .83,
        columnsheight: 38,
        rowsheight: 34,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'City Id', dataField: 'CityId', width: '50%', hidden: true },
            { text: 'City Name', dataField: 'CityName', width: '50%', cellsrenderer: imagerenderer },
            { text: 'Total Customers', dataField: 'Cnt', width: '50%', cellsrenderer: imagerenderer }//Bug Id 13203
        ]
    });

}



function LoadChildGrid() {
    $('#btnSend').show(); $('#Back').css('display', 'block');
    var str = '';

    for (var i = 0; i < databindtogrid.length; i++) {

        str += '<li Status=' + databindtogrid[i].Status + ' AccountStatus=' + databindtogrid[i].AccountStatus + ' CustomerName=' + databindtogrid[i].CustomerName + ' EmailID=' + databindtogrid[i].EmailID + ' UtilityAccountNumber=' + databindtogrid[i].UtilityAccountNumber + '>';
        str += '<div class="SelectContainer"><input type="checkbox" id=' + databindtogrid[i].AccountNumber + ' /></div>';

        var strdiv = '<div class="from-name-section action_cus">';


        var CustId = databindtogrid[i].CustomerId;
        var UAccNum = databindtogrid[i].UtilityAccountNumber;
        var img = databindtogrid[i].IsLocked;
        var src = img == "Lock" ? "../images/locked.png" : "../images/unlocked.png";
        var lck = img == "Lock" ? "lockimg fa fa-lock" : "lockimg fa fa-unlock";
        var style = img == "Lock" ? "25px" : "20px";
        var anchorid = 'Reset' + CustId;
        var LockStatus = databindtogrid[i].IsLocked;
        var imgid = LockStatus + '_' + CustId;



        if (databindtogrid[i].Status== 'Not Registered') {

            var editButton = userEditRights ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; " href="#" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i></a>' : '';
            var lockButton = userEditRights ? '<a style="display:block;"><i id=' + imgid + ' class="" title="Lock/Unlock" ></i></a>' : '';
            var resetPwdButton = UserResetPasswordRights ? '<div id="' + anchorid + '"><a href="#" ><i id="' + CustId + '" class="fa fa-key Gridimage" title="Change Password" aria-hidden="true"></i>   </a></div>' : '';
            strdiv += '<center><table style=float:left;margin-top:4px;><tr><td>' + editButton + '</td><td>' + lockButton + '</td><td>' + resetPwdButton + '</td></tr></table></center>';

            strdiv += '</div>';



            //var editButton = userEditRights ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; margin-top:10px;" href="#" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i>' : '';
          //  var lockButton = userEditRights ? '<a style=" margin-top:10px; display:block;"><img id=' + imgid + ' class="" title="Lock/Unlock" src=' + src + ' /></a>' : '';
          //  var resetPwdButton = UserResetPasswordRights ? '<div id="' + anchorid + '" style="text-align: center; margin-top:10px;"><a href="#" ><i id="' + CustId + '"  class="fa fa-key Gridimage" aria-hidden="true"></i></a></div>' : '';
           // return '<center><table><tr><td style="padding-left:5px;">' + editButton + '</td><td style="Padding-Left:9px;">' + lockButton + '</td><td style="Padding-Left:7px; margin-top:10px;">' + resetPwdButton + '</td></tr></table></center>';
        }
        else {
            var editButton = userEditRights ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; " href="UserManagement.aspx?CustId=' + CustId + '&UAccNum=' + UAccNum + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i></a>' : '';
            var lockButton = userEditRights ? '<a style="display:block;"><i id=' + imgid + ' class="' + lck + '" title="Lock/Unlock" ></i></a>' : '';
            var resetPwdButton = UserResetPasswordRights ? '<div id="' + anchorid + '"><a href="#" ><i id="' + CustId + '" class="fa fa-key Gridimage extra" title="Change Password" aria-hidden="true"></i>   </a></div>' : '';
            strdiv += '<center><table style=float:left;margin-top:4px;><tr><td>' + editButton + '</td><td>' + lockButton + '</td><td>' + resetPwdButton + '</td></tr></table></center>';

            strdiv += '</div>';
        }

        str += strdiv;
        var strstatus = '<div class="from-name-section status_cus">'

        var CustId = databindtogrid[i].CustomerId;

        var userdetails = databindtogrid[i].FirstName + '|' + databindtogrid[i].LastName + '|' + databindtogrid[i].EmailID + '|' + databindtogrid[i].AccountNumber;
        var src = databindtogrid[i].Status == 'Registered' ? "<span data-toggle='tooltip' title='Registered' class='active_new registered_grid'>Registered</span>" : databindtogrid[i].Status == "Active" ? "<span data-toggle='tooltip' title='Active' class='active_new'  style='display:inline-block;color: #94d60a;'>Active</span>" : databindtogrid[i].Status == "Not Registered" ? "<span data-toggle='tooltip' title='Not Registered' class='active_new notregistered_grid' style='display:inline-block;color:#acacac;'>Not Registered</span>" : "<span data-toggle='tooltip' title='Inactive' class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
        var imgid = databindtogrid[i].Status + '_' + CustId;
        strstatus += '<div style="text-align: left;    padding-left: 45px;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid + '" class="registerimg"  details=' + userdetails + '>' + src + '</span></a></div>';
        strstatus += '</div>';
        str += strstatus;

        str += '<div class="from-name-section resend_act_cust">';

        var CustId = databindtogrid[i].CustomerId;
        var firstName = databindtogrid[i].FirstName;
        var src = databindtogrid[i].Status == 'Registered' ? "<span data-toggle='tooltip' title='Resend Activation'  class='active_new resend_active_new' style='display:inline-block;'>Resend</span>" : "";
        var imgid = databindtogrid[i].Status + '_' + CustId;
        strResendActivation = '<div style="padding-left: 40px;"><a href="#" style=" display:inline-block; text-decoration:none !important ;" onclick="ResendActivation(' + CustId + ');"><span id="' + imgid + '" class="ResendActivation" >' + src + '</span></a></div>';
        strResendActivation += '</div>';
        str += strResendActivation;
        //****************************************
        //var strstatus_accountStatus = '<div class="from-name-section status_cus">'
        //var src_accountStatus = databindtogrid[i].AccountStatus == 'Registered' ? "<span data-toggle='tooltip' title='Registered' class='active_new registered_grid'>Registered</span>" : databindtogrid[i].AccountStatus == "Active" ? "<span data-toggle='tooltip' title='Active' class='active_new'  style='display:inline-block;color: #94d60a;'>Active</span>" : databindtogrid[i].AccountStatus == "Not Registered" ? "<span data-toggle='tooltip' title='Not Registered' class='active_new notregistered_grid' style='display:inline-block;color:#acacac;'>Not Registered</span>" : "<span data-toggle='tooltip' title='Inactive' class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
        //var imgid_accountStatus = databindtogrid[i].AccountStatus + '_' + CustId;
        //strstatus_accountStatus += '<div style="text-align: left;    padding-left: 14px;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid_accountStatus + '" class="registerimg"  details=' + userdetails + '>' + src_accountStatus + '</span></a></div>';
        //strstatus_accountStatus += '</div>';
        //str += strstatus_accountStatus;

        var strstatus_accountStatus = '<div class="from-name-section account_status">'

        var src_accountStatus;
        var src_accountStatus = databindtogrid[i].AccountStatus == 'Active' ? "<span class='active_new'  style='display:inline-block;'>active</span>" : "<span style='display:inline-block;' class='active_new inactive_grid'>inactive</span>";
        strstatus_accountStatus += '<div style="padding-left: 38px;"><a href="#" ><span id="' + databindtogrid[i].CustomerId + '" style="display:inline-block;" >' + src_accountStatus + '</span></a></div>';
        strstatus_accountStatus += '</div>';
        str += strstatus_accountStatus;
        //****************************************

        //str += '<div class="from-name-section cus_name_cust">' + databindtogrid[i].CustomerName + '</div>';

        var strCustomer = '<div class="from-name-section cus_name_cust">'

        var Accnumber = databindtogrid[i].AccountNumber;
        var CustomerType = databindtogrid[i].CustomerType;
        var CustName = databindtogrid[i].CustomerName;
        var status = databindtogrid[i].Status;

        strCustomer += '<div style="display:block;"><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails">' + CustName + '</a></div>';
        strCustomer += '</div>';

        str += strCustomer;


        str += '<div class="from-name-section email_id_cust">' + databindtogrid[i].EmailID + '</div>';

        str += '<div class="from-name-section utility_acc_cust">' + databindtogrid[i].UtilityAccountNumber + '</div>';
        str += '<div class="from-name-section address_acc_cust">' + databindtogrid[i].Address1 + '</div>';
        str += '<div class="from-name-section mobile_id_cust">' + databindtogrid[i].MobilePhone + '</div>';
      //  str += '<div class="from-name-section utility_acc_cust">' + databindtogrid[i].SSNNumber + '</div>';
        //str += '<div class="from-name-section utility_acc_cust">' + databindtogrid[i].UtilityAccountNumber + '</div>';

        //var srcpaperless = '<div class="from-name-section paper_bill_cust">'

        //var src;
        //var src = databindtogrid[i].Paperless == 'Active' ? "<span class='active_new'  style='display:inline-block;'>active</span>" : "<span style='display:inline-block;' class='active_new inactive_grid'>inactive</span>";
        //srcpaperless += '<div style="padding-left: 38px;"><a href="#" ><span id="' + databindtogrid[i].CustomerId + '" style="display:inline-block;" >' + src + '</span></a></div>';
        //srcpaperless += '</div>';

        //str += srcpaperless;
        
    }
    $('#ulCustomerDetail').html(str);

    if (mode == 1) {

        TotalRecord = CustomerData.Pager[0].RecordCount;
        if (TotalRecord <= 10) {
            $("#legends").html('');
            $("#right").hide();
            $("#left").hide();
        }
        else {
            $(".Pager").ASPSnippets_Pager({
                ActiveCssClass: "current",
                PagerCssClass: "pager",
                PageIndex: parseInt(CustomerData.Pager[0].PageIndex),
                PageSize: parseInt(CustomerData.Pager[0].PageSize),
                RecordCount: parseInt(CustomerData.Pager[0].RecordCount)
            });
        }
    }

    //autoheightbool = false;
    //if (databindtogrid.length <= 10)
    //    autoheightbool = true;
    //source = {
    //    datatype: "array",
    //    datafields: [
    //        { name: 'CustomerId' },
    //        { name: 'AccountNumber' },
    //        { name: 'FirstName' },
    //        { name: 'LastName' },
    //        { name: 'BirthDate' },
    //        { name: 'HomePhone' },
    //        { name: 'Question' },
    //        { name: 'HintsAns' },
    //        { name: 'Address1' },
    //        { name: 'Address2' },
    //        { name: 'Edit' },
    //        { name: 'IsLocked' },
    //        { name: 'ResetPassword' },
    //        { name: 'UserName' },
    //        { name: 'CustomerName' },
    //        { name: 'EmailID' },
    //        { name: 'MobilePhone' },
    //        { name: 'Address' },
    //        { name: 'CityName' },
    //        { name: 'ZipCode', type: 'number' },
    //        { name: 'CreatedDate' },
    //        { name: 'Status' },
    //        { name: 'CustomerType' },
    //        { name: 'Status' },
    //        { name: 'IsTextMsg' },
    //        { name: 'Paperless' },
    //        { name: 'SSNNumber' },
    //        { name: 'UtilityAccountNumber' },
    //        { name: 'KubraToken' },
    //           { name: 'ActivateCustomer' },

    //    ],
    //    record: 'Table',
    //    sortable: true,
    //    localdata: databindtogrid
    //};
    //var dataAdapter = new $.jqx.dataAdapter(source,
    //    { contentType: 'application/json; charset=utf-8' }
    //);

    ////Bug ID: 6396
    //$("#jqxchildgrid").jqxGrid({
    //    width: "99.8%",
    //    height: GridHeight * .87,
    //    columnsheight: 38,
    //    theme: 'darkblue',
    //    altrows: true,
    //    rowsheight: 40,
    //    source: dataAdapter,
    //    sortable: true,
    //    selectionmode: 'checkbox', //To trigger row select event
    //    pageable: true,
    //    pagesizeoptions: ['10', '20', '30', '40', '50'],
    //    pagesize: 20,
    //    filterable: true,
    //    columnsresize: true,
    //    columnsreorder: true,
    //    enabletooltips: true,
    //    rendertoolbar: function (toolbar) {
    //        $("#btnSend").show();
    //    },
    //    columns:
    //    [
    //        { text: 'CustId', dataField: 'CustomerId', width: '0%', hidden: true, },
    //        { text: 'Account Number', dataField: 'AccountNumber', width: '0%', hidden: true },
    //        { text: 'FirstName', dataField: 'FirstName', width: '0%', hidden: true },
    //        { text: 'LastName', dataField: 'LastName', width: '0%', hidden: true },
    //        { text: 'BirthDate', dataField: 'BirthDate', width: '0%', hidden: true },
    //        { text: 'HomePhone', dataField: 'HomePhone', width: '0%', hidden: true },
    //        { text: 'Question', dataField: 'Question', width: '0%', hidden: true },
    //        { text: 'HintsAns', dataField: 'HintsAns', width: '0%', hidden: true },
    //        { text: 'Address1', dataField: 'Address1', width: '0%', hidden: true },
    //        { text: 'Address2', dataField: 'Address2', width: '0%', hidden: true },
    //        { text: 'Lock Status', dataField: 'IsLocked', width: '11%', hidden: true },
    //        { text: 'Reset Password', dataField: 'ResetPassword', width: '12%', hidden: true },
    //        { text: 'Username', dataField: 'UserName', width: '7%', hidden: true },
    //        { text: 'Mobile Phone', dataField: 'MobilePhone', width: '10%', hidden: true },
    //        { text: 'Created Date', dataField: 'CreatedDate', width: '11%', hidden: true },
    //        { text: 'Action', dataField: 'Edit', width: '13%', align: 'center', cellsrenderer: imagerenderer, hidden: !userEditRights && !UserResetPasswordRights ? true : false },
    //         { text: 'Status', dataField: 'Status', width: '15%', align: 'center', cellsrenderer: imagerenderer },
    //        { text: 'Customer Type', dataField: 'CustomerType', width: '15%', align: 'center', cellsrenderer: imagerenderer, hidden: true },
    //        { text: 'Customer Name', dataField: 'CustomerName', width: '20%', cellsrenderer: imagerenderer, },
    //        { text: 'Email', dataField: 'EmailID', width: '20%' },
    //        { text: 'Utility Account', dataField: 'UtilityAccountNumber', width: '15%' },
    //        { text: 'Paperless Bill Status', dataField: 'Paperless', width: '15%', align: 'center', cellsrenderer: imagerenderer, hidden: $('#hdnpaperlessbill').val() == "0" ? true : false },
    //         { text: 'DeActivateUser', dataField: 'DeActivate', width: '15%', cellsrenderer: imagerenderer, hidden: true },
    //        { text: 'Text Status', dataField: 'IsTextMsg', width: '15%', align: 'center', cellsrenderer: imagerenderer, hidden: true },
    //        { text: 'SSN', dataField: 'SSNNumber', width: '8%', cellsrenderer: imagerenderer, hidden: true },
    //           { text: 'ResendActivation', datafield: 'ActivateCustomer', width: '15%', align: 'center', cellsrenderer: imagerenderer },
    //    ]
    //});

    ////Bug ID: 6396
    //$("#jqxchildgrid").on('bindingcomplete', function () {
    //    if ($(window).width() < 1025) {
    //        $("#jqxgrid").jqxGrid('autoresizecolumns');
    //    }

    //    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
    //    $("#jqxchildgrid").jqxGrid('setcolumnproperty', 'Edit', 'width', '170');

    //});

}

//for get lock icon showing in grid
function getlock(row, value, datafield) {
    var src;
    var src = value == 'Active' ? "<span class='active_new'  style='display:inline-block;'>Active</span>" : "<span  class='active_new inactive_grid'>Inactive</span>";
    return '<div style="text-align: center;"><a href="#" ><span id="' + row + '" style="display:inline-block;" >' + src + '</span></a></div>';
}

function fun() {
    confirm('Are you sure want to de-Activate ?');
}

function getDeactve(row, value, datafield) {
    var src;
    return '<div style="text-align: center;"><img style="padding-top:8px;" src="../images/green_circle.png" id="deActivate" onclick="fun()" /></div>';
}

function getdropDown(row, value) {
    CityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    City = $('#jqxgrid').jqxGrid('getrowdata', row).CityName;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop1 >' + City + '</span></div>';

}

function getdropDownCount(row, value) {
    CityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    Count = $('#jqxgrid').jqxGrid('getrowdata', row).Cnt;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop1 >' + Count + '</span></div>';

}

//for get lock icon showing in grid
function getView(row, value) {

    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    Accnumber = $('#jqxchildgrid').jqxGrid('getrowdata', row).AccountNumber;
    CustomerType = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerType;
    var CustName = $('#jqxchildgrid').jqxGrid('getrowdata', row)["CustomerName"];
    var status = $('#jqxchildgrid').jqxGrid('getrowdata', row)["Status"]
    return '<div style="padding-left:5px; display:block; width:20%; padding-top:13px;"><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails">' + CustName + '</a></div>';

}

//for get status icon showing in grid
function getAction(row, value) {
    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var kubratoken = $('#jqxchildgrid').jqxGrid('getrowdata', row).KubraToken;
    var userdetails = $('#jqxchildgrid').jqxGrid('getrowdata', row).FirstName + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).LastName + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).AccountNumber;
    var src = value == 'Registered' ? "<span class='active_new registered_grid'>Registered</span>" : value == "Active" ? "<span class='active_new' style='display:inline-block;color: #94d60a;'>Active</span>" : value == "Not Registered" ? "<span class='active_new' style='display:inline-block;color:#acacac;'>Not Registered</span>" : "<span class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid + '" class="registerimg" kubratoken=' + kubratoken + ' userdetails=' + userdetails + '>' + src + '</span></a></div>';
}

//for get status icon showing in grid
function getActivation(row, value) {
    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var firstName = $('#jqxchildgrid').jqxGrid('getrowdata', row).FirstName;
    var src = value == 'Registered' ? "<span  class='active_new' style='display:inline-block; width: auto;padding: 0px 7px !important;'>Resend Activation</span>" : "";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important ;" onclick="ResendActivation(' + CustId + ');"><span id="' + imgid + '" class="ResendActivation" >' + src + '</span></a></div>';
}

//for get reset password icon showing in grid
function getResetPassword(row, value, datafield) {
    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var UAccNum = $('#jqxchildgrid').jqxGrid('getrowdata', row).UtilityAccountNumber;
    var img = $('#jqxchildgrid').jqxGrid('getrowdata', row).IsLocked;
    var src = img == "Lock" ? "../images/locked.png" : "../images/unlocked.png";
    var style = img == "Lock" ? "25px" : "20px";
    var anchorid = 'Reset' + CustId;
    var LockStatus = $('#jqxchildgrid').jqxGrid('getrowdata', row).IsLocked;
    var imgid = LockStatus + '_' + CustId;
        var editButton = userEditRights ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; margin-top:10px;" href="UserManagement.aspx?CustId=' + CustId + '&UAccNum=' + UAccNum + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i>' : '';
        var lockButton = userEditRights ? '<a style=" margin-top:10px; display:block;"><img id=' + imgid + ' class="lockimg" title="Lock/Unlock" src=' + src + ' /></a>' : '';
        var resetPwdButton = UserResetPasswordRights ? '<div id="' + anchorid + '" style="text-align: center; margin-top:10px;"><a href="#" ><i id="' + CustId + '"  class="fa fa-key Gridimage extra" aria-hidden="true"></i></a></div>' : '';
        return '<center><table><tr><td style="padding-left:5px;">' + editButton + '</td><td style="Padding-Left:9px;">' + lockButton + '</td><td style="Padding-Left:7px; margin-top:10px;">' + resetPwdButton + '</td></tr></table></center>';
}

// cancel state of reset position
function CancelState(CustId) {
    var imgiconpwd = '<a href="#" style=" margin-top:10px;"><i id="' + CustId + '"  class="fa fa-key Gridimage extra" aria-hidden="true"></i></a>';
    $('#Reset' + CustId).html(imgiconpwd);
}

function ValidatePassword(Password) {
    if (Password == "") { return true; }
    else {
        if (Password.length < 8 || Password.length > 30) {
            //alert("The entered password does not meet the minimum security requirements. Please enter a valid password. A password shall be atleast 8 characters long and must contain atleast one capital letter, one numeric and one special character ({},(),[],#,?,!,*,$,_,%,@,^)");
            alert("The entered password does not meet the minimum security requirements. Please enter a valid password. A password shall be atleast 8 characters long and must contain atleast one capital letter, one numeric and one special character(@, #, $, &, %, *, !)");

            return false;
        }
        // var pwdReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)./;
        var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&%*!])[a-zA-Z0-9@#$&%*!]{8,16}$/g;

        if (!pwdReg.test(Password)) {
            alert("Password must contains 1 Numeric, 1 Character in uppercase, 1 Special character & cannot contains Spaces.Password can have only these as special characters @,#,$,&,%,*,! ");
            return false;
        }
        return true;
    }
}

function RefreshGrid() {
    submit();
    filterCreate();
}

function chartclick(name, chartType, drilldown, type) {
    var tempTable;
    var processed_json4 = new Array();
    if (drilldown.indexOf('mode') >= 0) {
        if (name != '') {
            tempTable = usertable.Tables[0];
            var residentialCount = 0;
            var commercialCount = 0;
            $.map(tempTable.Rows, function (obj, i) {
                if (name == obj["ZipCode"])
                { obj["Customer Type"].toLowerCase() == 'residential' ? residentialCount++ : commercialCount++; }
            });
            processed_json4.push({
                name: "Residential",
                y: residentialCount,
                color: 'green',
                title: "Residential"
            });
            processed_json4.push({
                name: "Commercial",
                y: commercialCount,
                color: 'red',
                title: "Commercial"
            });
            if (type != 1)
                changeSubDiv(name.trim().toLowerCase(), 'Zipcode', chartType, 1);
            return processed_json4;
        }
    }
    else if (drilldown.indexOf('Zipcode') < 0) {
        if (name != '') {
            tempTable = usertable.Tables[3];

            $.map(tempTable.Rows, function (obj, i) {
                if (name.trim().toLowerCase() == obj["CityName"].trim().toLowerCase())
                    processed_json4.push({
                        name: obj.ZipCode,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        title: obj.ZipCode,
                        drilldown: 'Zipcode'
                    });
            });
            if (type != 1)
                changeSubDiv(name.trim().toLowerCase(), 'City', chartType);
            return processed_json4;
        }
    } else {
        tempTable = usertable.Tables[4];
        $.map(tempTable.Rows, function (obj, i) {
            if (name.trim().toLowerCase() == obj["ZipCode"].trim().toLowerCase())
                processed_json4.push({
                    name: obj.CustomerType,
                    y: obj.Cnt,
                    color: colorarrHEX[i],
                    title: obj.CustomerType

                });
        });
        if (type != 1)
            changeSubDiv(name.trim().toLowerCase(), 'Zipcode', chartType);
        return processed_json4;
    }
}

function changeSubDiv(name, type, chartType, mode) {

    var tempTable = usertable.Tables[5];
    if (mode == 1)
        tempTable = usertable.Tables[0];
    var statusRegistered = 0;
    var statusActive = 0;
    var statusInactive = 0;
    var cusCommercial = 0;
    var cusResidential = 0;
    var cityZip = '';
    var processed_json = new Array();
    var processed_json1 = new Array();
}

//Start - Show all customer details in popup
//function FillCustomerDetails(popupdetails) {
//    jsonBillgridData = popupdetails.Tables[1].Rows;
//    jsonPaymentgridData = popupdetails.Tables[2].Rows;
//    jsonConnectMedata = popupdetails.Tables[3].Rows;
//    jsonServiceRequestData = popupdetails.Tables[4].Rows;
//    jsonServicePlandata = popupdetails.Tables[0].Rows;

//    MarketingPreferences(popupdetails.Tables[6].Rows);
//    if (popupdetails.Tables[7].Rows != null && popupdetails.Tables[7].Rows.length > 0) {
//        LoadMeterNumberGrid(popupdetails.Tables[7].Rows);
//    }
//    LoadMeterNumberGrid(popupdetails.Tables[7].Rows);
//}

//function LoadProfile(popupdetails) {
//    for (var i = 0; i < databindtogrid.length; i++) {
//        if (databindtogrid[i].CustomerId == custId) {
//            $('#custName').html(databindtogrid[i]["CustomerName"]);
//            $('#lblCustName').html(databindtogrid[i]["CustomerName"]);
//            $('#lblLoginId').html(databindtogrid[i]["UserName"]);
//            $('#lblCity').html(databindtogrid[i].CityName);
//            $('#lblZipCode').html(databindtogrid[i].ZipCode);
//            $('#statusUser').html(databindtogrid[i].Status);
//            $('#accounttype').html(databindtogrid[i]["Customer Type"]);
//            $('#paperBill').html(databindtogrid[i].Paperless);
//            $('#lblEmailId').html(databindtogrid[i].EmailID);
//            $('#lblAlternateEmailId').html(databindtogrid[i].AlternateEmailID != '' ? databindtogrid[i].AlternateEmailID : 'N/A');
//            $('#lblMobile').html(databindtogrid[i].MobilePhone != '' ? (databindtogrid[i].MobilePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : databindtogrid[i].MobilePhone);
//            $('#lblCreateDate').html(databindtogrid[i].CreatedDate);
//            $('#lblAlternateNumber').html(databindtogrid[i].HomePhone == '' || databindtogrid[i].HomePhone == null ? 'N/A' : (databindtogrid[i].HomePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
//            // Load Map Location
//            latitude = databindtogrid[i].Latitude;
//            longitude = databindtogrid[i].Longitude;
//            cityname = databindtogrid[i].CityName;
//            zipcode = databindtogrid[i].ZipCode;
//            addr1 = databindtogrid[i].Address1;
//            addr2 = databindtogrid[i].Address2;
//            break;
//        }

//    }
//    var iplogin = popupdetails.Tables[0].Rows[0]["IPAddress"] == null ? 'N/A' : popupdetails.Tables[0].Rows[0]["IPAddress"];
//    var parseddate = popupdetails.Tables[0].Rows[0]["LastLoginDateTime"] == null ? 'Never' : new Date(popupdetails.Tables[0].Rows[0]["LastLoginDateTime"]);
//    //bug id 17962 resolved

//    if (parseddate != 'Never') {
//        var hours = parseddate.getHours() > 12 ? parseddate.getHours() - 12 : parseddate.getHours();
//        var am_pm = parseddate.getHours() >= 12 ? "PM" : "AM";
//        hours = hours < 10 ? "0" + hours : hours;
//        var minutes = parseddate.getMinutes() < 10 ? "0" + parseddate.getMinutes() : parseddate.getMinutes();
//        var seconds = parseddate.getSeconds() < 10 ? "0" + parseddate.getSeconds() : parseddate.getSeconds();
//        $('#textStatus').html(iplogin + " & " + (parseddate.getMonth() < 9 ? '0' + (parseddate.getMonth() + 1).toString() : parseddate.getMonth() + 1) + '/'
//           + (parseddate.getDate() < 10 ? '0' + parseddate.getDate().toString() : parseddate.getDate()) + '/' + parseddate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm);
//    } else {
//        $('#textStatus').html(iplogin + " & " + parseddate);
//    }
//}

//function LoadMeterNumber(RowData) {
//    if (RowData.length > 0) {
//        $('#lblMeterNumber').html(RowData[0]["MeterNumber"]);
//    }
//}

//function MarketingPreferences(preferenceData) {
//    for (var i = 0; i < preferenceData.length; i++) {
//        if (preferenceData[i].PreferenceName == "News Releases") {
//            $('#lblNewsRelease').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//        else if (preferenceData[i].PreferenceName == "Service Offerings") {
//            $('#lblSrvcOff').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//        else if (preferenceData[i].PreferenceName == "Newsletters") {
//            $('#lblNewsletter').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//        else if (preferenceData[i].PreferenceName == "Energy Savings Toolkits") {
//            $('#lblEnrgyToolkt').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//        else if (preferenceData[i].PreferenceName == "Cool Tips Brochures") {
//            $('#lblBrochures').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//        else (preferenceData[i].PreferenceName == "Community Benefit Programs")
//        {
//            $('#lblCommBnftProgs').html(preferenceData[i]["IsEnabled"] == 0 ? "Not Opted" : "Opted");
//        }
//    }
//}

//function Activenotifications(notificationdata) {
//    var arrtext = [];
//    var arremail = [];
//    var arrpush = [];
//    var arrivr = [];
//    var arrbudget = [];
//    var arrquiethours = [];
//    $('#lbltextnotify').empty();
//    $('#lblemailnotify').empty();
//    $('#lblpushnotify').empty();
//    $('#lblivrnotify').empty();
//    $('#lblbudgetnotify').empty();
//    $('#lblquiethours').empty();
//    for (var i = 0; i < notificationdata.length; i++) {
//        if (notificationdata[i].AccountNotificationType.indexOf("Text") > -1) {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arrtext.push(text);
//            }

//        }
//        if (notificationdata[i].AccountNotificationType.indexOf("Email") > -1) {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arremail.push(text);
//            }
//        }
//        if (notificationdata[i].AccountNotificationType.indexOf("Push") > -1) {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arrpush.push(text);
//            }
//        }
//        if (notificationdata[i].AccountNotificationType.indexOf("IVR") > -1) {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arrivr.push(text);
//            }
//        }
//        if (notificationdata[i].AccountNotificationType.indexOf("Budget_Limit") > -1 + " ,") {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arrbudget.push(text);
//            }

//        }
//        if (notificationdata[i].AccountNotificationType.indexOf("Quiet_Hours") > -1) {
//            if (notificationdata[i].IsNotify == true) {
//                var text = notificationdata[i]["AccountNotificationType"]
//                arrquiethours.push(text);
//            }
//        }

//    }

//    $('#lbltextnotify').html(arrtext.join(", "));
//    $('#lblemailnotify').html(arremail.join(", "));
//    $('#lblpushnotify').html(arrpush.join(", "));
//    $('#lblivrnotify').html(arrivr.join(", "));
//    $('#lblbudgetnotify').html(arrbudget.join(", "));
//    $('#lblquiethours').html(popupdetails.Tables[8].Rows[5].NotificationValues);
//}

//function ServicePlans(plansdata) {
//    var noservicemessage = "Not Subscribed";
//    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
//        $('#lblpowerplan').html(plansdata[0]["PowerPlanName"]);

//    }
//    else {
//        $('#lblpowerplan').html(noservicemessage);
//    }
//    if (plansdata[0].WaterPlanName != null && plansdata[0].WaterPlanName != "") {
//        $('#lblwaterplan').html(plansdata[0]["WaterPlanName"]);
//    }
//    else {
//        $('#lblwaterplan').html(noservicemessage);
//    }
//    if (plansdata[0].GasPlanName != null && plansdata[0].GasPlanName != "") {
//        $('#lblgasplan').html(plansdata[0]["GasPlanName"]);
//    }
//    else {
//        $('#lblgasplan').html(noservicemessage);
//    }
//    if (plansdata[0].ElectricVehiclePlan != null && plansdata[0].ElectricVehiclePlan != "") {
//        $('#lblevplan').html(plansdata[0]["ElectricVehiclePlan"]);
//    }
//    else {
//        $('#lblevplan ').html(noservicemessage);
//    }
//}

//function LoadBillGrid(billdata) {
//    autoheightPrimary = false;
//    if (billdata.length <= 10)
//        autoheightPrimary = true;
//    //Getting the source data with ajax GET request
//    source = {
//        datatype: "array",
//        datafields: [
//         { name: 'BillingDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
//             { name: 'BillingId', type: 'number' },
//         { name: 'BillAmountThisPeriod' },
//         { name: 'TranPayStatusDesc' }
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: billdata
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxgridbill").jqxGrid({
//        width: "100%",
//        height: GridHeight * .29,
//        columnsheight: 38,
//        rowsheight: 34,
//        altrows: true,
//        source: dataAdapter,
//        theme: 'darkblue',
//        sortable: false,
//        selectionmode: 'singlerow', //To trigger row select event
//        pageable: false,
//        pagesizeoptions: ['10', '20', '30', '40', '50'],
//        pagesize: 20,
//        columnsresize: true,
//        columnsreorder: true,
//        columns:
//        [
//            { text: 'Bill Id', dataField: 'BillingId', width: '0%', hidden: true },
//            { text: 'Bill Date', dataField: 'BillingDate', width: '30%', cellsformat: "MMMM dd,yyyy" },
//            { text: 'Bill Amount($)', dataField: 'BillAmountThisPeriod', width: '30%' },
//            { text: 'Bill Pay Status', dataField: 'TranPayStatusDesc', width: '40%' }
//        ]
//    });

//}

//function LoadServiceRequestGrid(requestdata) {
//    autoheightPrimary = false;
//    if (requestdata.length <= 10)
//        autoheightPrimary = true;
//    source = {
//        datatype: "array",
//        datafields: [
//         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
//             { name: 'MessageId', type: 'number' },
//         { name: 'MessageBody' },
//         { name: 'Reason' }
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: requestdata
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxServicegrid").jqxGrid({
//        width: "100%",
//        columnsheight: 38,
//        rowsheight: 34,
//        altrows: true,
//        source: dataAdapter,
//        theme: 'darkblue',
//        sortable: false,
//        selectionmode: 'singlerow', //To trigger row select event
//        pageable: false,
//        pagesizeoptions: ['10', '20', '30', '40', '50'],
//        pagesize: 20,
//        columnsresize: true,
//        columnsreorder: true,
//        columns:
//        [
//            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
//            { text: 'Service Type', dataField: 'Reason', width: '30%' },
//            { text: 'Message', dataField: 'MessageBody', width: '40%' },
//            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
//        ]
//    });

//}

//function LoadConnectMeRequestGrid(requestdata) {
//    autoheightPrimary = false;
//    if (requestdata.length <= 10)
//        autoheightPrimary = true;
//    //Getting the source data with ajax GET request
//    source = {
//        datatype: "array",
//        datafields: [
//         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
//             { name: 'MessageId', type: 'number' },
//         { name: 'MessageBody' },
//         { name: 'Reason' }
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: requestdata
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxgridrequest").jqxGrid({
//        width: "100%",
//        columnsheight: 38,
//        rowsheight: 34,
//        altrows: true,
//        source: dataAdapter,
//        theme: 'darkblue',
//        sortable: false,
//        selectionmode: 'singlerow', //To trigger row select event
//        pageable: false,
//        pagesizeoptions: ['10', '20', '30', '40', '50'],
//        pagesize: 20,
//        columnsresize: true,
//        columnsreorder: true,
//        columns:
//        [
//            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
//            { text: 'Reason', dataField: 'Reason', width: '30%' },
//            { text: 'Message', dataField: 'MessageBody', width: '40%', cellsrenderer: myCellFormatter },
//            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
//        ]
//    });
//    function myCellFormatter(cellvalue, options, value) {
//        return '<p title="' + value + '" style="overflow: hidden;text-overflow: ellipsis;padding-bottom: 2px;text-align: left;margin-right: 2px;margin-left: 4px;margin-top: 9px;">' + value + '</p>';
//    }

//}

//function LoadPaymentGrid(paydata) {
//    autoheightPrimary = false;
//    if (paydata.length <= 10)
//        autoheightPrimary = true;
//    source = {
//        datatype: "array",
//        datafields: [
//         { name: 'TransactionConDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
//         { name: 'BillingTransactionId', type: 'number' },
//         { name: 'TransactionAmount' }
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: paydata
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxgridpayment").jqxGrid({
//        width: "100%",
//        height: GridHeight * .25,
//        columnsheight: 38,
//        rowsheight: 34,
//        altrows: true,
//        source: dataAdapter,
//        theme: 'darkblue',
//        sortable: false,
//        selectionmode: 'singlerow', //To trigger row select event
//        pageable: false,
//        pagesizeoptions: ['10', '20', '30', '40', '50'],
//        pagesize: 20,
//        columnsresize: true,
//        columnsreorder: true,
//        columns:
//        [
//            { text: 'Transaction Id', dataField: 'BillingTransactionId', width: '0%', hidden: true },
//            { text: 'Payment Date', dataField: 'TransactionConDate', width: '50%', cellsformat: "MMMM dd,yyyy" },
//            { text: 'Payment Amount($)', dataField: 'TransactionAmount', width: '50%' }
//        ]
//    });

//}

//function LoadMeterNumberGrid(MeterNumberData) {
//    autoheightPrimary = false;
//    if (MeterNumberData.length <= 10)
//        autoheightPrimary = true;
//    source = {
//        datatype: "array",
//        datafields: [

//             { name: 'MeterId' },
//         { name: 'MeterNumber' },
//         { name: 'IsAMI' },
//          { name: 'MeterType' }
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: MeterNumberData
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxgridMeterNumber").jqxGrid({
//        width: "100%",
//        height: GridHeight * .40,
//        columnsheight: 38,
//        rowsheight: 34,
//        altrows: true,
//        source: dataAdapter,
//        theme: 'darkblue',
//        sortable: false,
//        selectionmode: 'singlerow', //To trigger row select event
//        pageable: false,
//        pagesizeoptions: ['10', '20', '30', '40', '50'],
//        pagesize: 20,
//        columnsresize: true,
//        columnsreorder: true,
//        columns:
//        [
//            { text: 'MeterId', dataField: 'MeterId', width: '0%', hidden: true },
//             { text: 'Meter Type', dataField: 'MeterType', width: '25%' },
//            { text: 'Meter Number', dataField: 'MeterNumber', width: '50%' },
//             { text: 'AMI/Non AMI', dataField: 'IsAMI', width: '25%', cellsrenderer: valuerender },
//        ]
//    });

//}

var valuerender = function (row, datafield, value) {
    switch (datafield) {
        case "IsAMI":
            return "<span style='line-height:32px;padding-left: 5px;'>" + ((value == "false") ? "Non AMI" : "AMI") + "</span>";
            break;
    }
}
//function LoadNotification() {
//    if ($('#custId').val() != null && $('#custId').val() != "") {
//        var customerId = $('#custId').val();
//        var Account = $('#ddlAddress option:selected').val();
//        var param = {
//            CustomerId: customerId,
//            Account: Account
//        }
//    }
//    $.ajax({
//        type: "POST",
//        url: "Customer.aspx/LoadNotificationData",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: JSON.stringify(param),
//        success: function OnSuccess(response) {
//            loadDataNotification(response);
//        },
//        error: OnErrorCS,

//    });

//}

//function loadDataNotification(fnResponses) {

//    //For clearing already extsting  values before filling new 
//    $('input.email').css("display", "none");
//    $('span.email').css("display", "block");
//    $("input.txt:text").val("");
//    $("span.txt input[type=checkbox]").removeAttr('checked');
//    $("input.email:text").val("");
//    $("span.email input[type=checkbox]").removeAttr('checked');
//    // $("span.email").siblings('input').prop('checked', false);
//    $("input.ivr:text").val("");
//    $("span.ivr input[type=checkbox]").removeAttr('checked');
//    $("span.push input[type=checkbox]").removeAttr('checked')
//    ///
//    try {
//        var JSONDoc = fnResponses.d;

//        $("#TxtOutageText").removeAttr('mandatory');
//        $("#TxtOutageText").next('span').remove();
//        $("#TxtOutageEmail").removeAttr("mandatory");
//        $("#TxtOutageEmail").next('span').remove();
//        $("#TxtOutageIvr").removeAttr("mandatory");
//        $("#TxtOutageIvr").next('span').remove();

//        $("#TxtBillingText").removeAttr("mandatory");
//        $("#TxtBillingText").next('span').remove();
//        $("#TxtBillingEmail").removeAttr("mandatory");
//        $("#TxtBillingEmail").next('span').remove();
//        $("#TxtBillingIvr").removeAttr("mandatory");
//        $("#TxtBillingIvr").next('span').remove();
//        //DR
//        $("#TxtDRText").removeAttr("mandatory");
//        $("#TxtDRText").next('span').remove();
//        $("#TxtDREmail").removeAttr("mandatory");
//        $("#TxtDREmail").next('span').remove();
//        $("#TxtDRIvr").removeAttr("mandatory");
//        $("#TxtDRIvr").next('span').remove();

//        $("#TxtConnectText").removeAttr("mandatory");
//        $("#TxtConnectText").next('span').remove();
//        $("#TxtConnectEmail").removeAttr("mandatory");
//        $("#TxtConnectEmail").next('span').remove();
//        $("#TxtConnectIVR").removeAttr("mandatory");
//        $("#TxtConnectIVR").next('span').remove();

//        $("#TxtServiceText").removeAttr("mandatory");
//        $("#TxtServiceText").next('span').remove();
//        $("#TxtServiceEmail").removeAttr("mandatory");
//        $("#TxtServiceEmail").next('span').remove();
//        $("#TxtServiceIVR").removeAttr("mandatory");
//        $("#TxtServiceIVR").next('span').remove();


//        $("#TxtLeakAlertText").removeAttr("mandatory");
//        $("#TxtLeakAlertText").next('span').remove();
//        $("#TxtLeakAlertEmail").removeAttr("mandatory");
//        $("#TxtLeakAlertEmail").next('span').remove();
//        $("#TxtLeakAlertIVR").removeAttr("mandatory");
//        $("#TxtLeakAlertIVR").next('span').remove();

//        $("#TxtBudgetIvr").removeAttr("mandatory");
//        $("#TxtBudgetIvr").next('span').remove();
//        $("#TxtBudgetText").removeAttr("mandatory");
//        $("#TxtBudgetText").next('span').remove();
//        $("#TxtBudgetEmail").removeAttr("mandatory");
//        $("#TxtBudgetEmail").next('span').remove();

//        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 15px;">*</span>';
//        if (JSONDoc.chkOutageTextChecked) {

//            var TxtOutageText = JSONDoc.TxtOutageText != null ? JSONDoc.TxtOutageText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageText;
//            $('#chkOutageText').prop('checked', true);
//            $("#TxtOutageText").css("display", "block");
//            $('#TxtOutageText').val(TxtOutageText);
//            $("#TxtOutageText").attr('mandatory', '1');
//            $("#TxtOutageText").after(mandatoryHtml);
//        }
//        if (JSONDoc.chkOutageEmail) {
//            $('#chkOutageEmail').prop('checked', true);
//            $("#TxtOutageEmail").css("display", "block");
//            $('#TxtOutageEmail').val(JSONDoc.TxtOutageEmail);
//            $("#TxtOutageEmail").attr("mandatory", "1");
//            $("#TxtOutageEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkOutageIvr) {
//            var TxtOutageIvr = JSONDoc.TxtOutageIvr != null ? JSONDoc.TxtOutageIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtOutageIvr;
//            $('#chkOutageIvr').prop('checked', true);
//            $("#TxtOutageIvr").css("display", "block");
//            $('#TxtOutageIvr').val(TxtOutageIvr);
//            $("#TxtOutageIvr").attr("mandatory", "1");
//            $("#TxtOutageIvr").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkOutagePush) {
//            $('#chkOutagePush').prop('checked', true);

//        }
//        //BILLING
//        if (JSONDoc.chkBillingText) {
//            var TxtBillingText = JSONDoc.TxtBillingText != null ? JSONDoc.TxtBillingText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingText;
//            $('#chkBillingText').prop('checked', true);
//            $("#TxtBillingText").css("display", "block");
//            $('#TxtBillingText').val(TxtBillingText);
//            $("#TxtBillingText").attr("mandatory", "1");
//            $("#TxtBillingText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBillingEmail) {
//            $('#chkBillingEmail').prop('checked', true);
//            $("#TxtBillingEmail").css("display", "block");
//            $('#TxtBillingEmail').val(JSONDoc.TxtBillingEmail);
//            $("#TxtBillingEmail").attr("mandatory", "1");
//            $("#TxtBillingEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBillingIvr) {
//            var TxtBillingIvr = JSONDoc.TxtBillingIvr != null ? JSONDoc.TxtBillingIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBillingIvr;
//            $('#chkBillingIvr').prop('checked', true);
//            $("#TxtBillingIvr").css("display", "block");
//            $('#TxtBillingIvr').val(TxtBillingIvr);
//            $("#TxtBillingIvr").attr("mandatory", "1");
//            $("#TxtBillingIvr").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBillingPush) {
//            $('#chkOutagePush').prop('checked', true);
//        }

//        //DR
//        if (JSONDoc.chkDRText) {
//            var TxtDRText = JSONDoc.TxtDRText != null ? JSONDoc.TxtDRText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRText;
//            $('#chkDRText').prop('checked', true);
//            $("#TxtDRText").css("display", "block");
//            $('#TxtDRText').val(TxtDRText);
//            $("#TxtDRText").attr("mandatory", "1");
//            $("#TxtDRText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBillingEmail) {
//            $('#chkDREmail').prop('checked', true);
//            $("#TxtDREmail").css("display", "block");
//            $('#TxtDREmail').val(JSONDoc.TxtDREmail);
//            $("#TxtDREmail").attr("mandatory", "1");
//            $("#TxtDREmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkDRIvr) {
//            var TxtDRIvr = JSONDoc.TxtDRIvr != null ? JSONDoc.TxtDRIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtDRIvr;
//            $('#chkDRIvr').prop('checked', true);
//            $("#TxtDRIvr").css("display", "block");
//            $('#TxtDRIvr').val(TxtDRIvr);
//            $("#TxtDRIvr").attr("mandatory", "1");
//            $("#TxtDRIvr").after(mandatoryHtml);

//        }

//        if (JSONDoc.chkDRPush) {
//            $('#chkDRPush').prop('checked', true);

//        }

//        //ConnectMe
//        if (JSONDoc.chkConnectText) {
//            var TxtConnectText = JSONDoc.TxtConnectText != null ? JSONDoc.TxtConnectText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectText;
//            $('#chkConnectText').prop('checked', true);
//            $("#TxtConnectText").css("display", "block");
//            $('#TxtConnectText').val(TxtConnectText);
//            $("#TxtConnectText").attr("mandatory", "1");
//            $("#TxtConnectText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkConnectEmail) {
//            $('#chkConnectEmail').prop('checked', true);
//            $("#TxtConnectEmail").css("display", "block");
//            $('#TxtConnectEmail').val(JSONDoc.TxtConnectEmail);
//            $("#TxtConnectEmail").attr("mandatory", "1");
//            $("#TxtConnectEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkConnectIVR) {
//            var TxtConnectIVR = JSONDoc.TxtConnectIVR != null ? JSONDoc.TxtConnectIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtConnectIVR;
//            $('#chkConnectIVR').prop('checked', true);
//            $("#TxtConnectIVR").css("display", "block");
//            $('#TxtConnectIVR').val(TxtConnectIVR);
//            $("#TxtConnectIVR").attr("mandatory", "1");
//            $("#TxtConnectIVR").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkConnectPush) {
//            $('#chkConnectPush').prop('checked', true);
//        }


//        //Service
//        if (JSONDoc.chkServiceText) {
//            var TxtServiceText = JSONDoc.TxtServiceText != null ? JSONDoc.TxtServiceText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtServiceText;
//            $('#chkServiceText').prop('checked', true);
//            $("#TxtServiceText").css("display", "block");
//            $('#TxtServiceText').val(TxtServiceText);
//            $("#TxtServiceText").attr("mandatory", "1");
//            $("#TxtServiceText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkServiceEmail) {
//            $('#chkServiceEmail').prop('checked', true);
//            $("#TxtServiceEmail").css("display", "block");
//            $('#TxtServiceEmail').val(JSONDoc.TxtServiceEmail);
//            $("#TxtServiceEmail").attr("mandatory", "1");
//            $("#TxtServiceEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkServiceIVR) {
//            var TxtServiceIVR = JSONDoc.TxtServiceIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
//            $('#chkServiceIVR').prop('checked', true);
//            $("#TxtServiceIVR").css("display", "block");
//            $('#TxtServiceIVR').val(TxtServiceIVR);
//            $("#TxtServiceIVR").attr("mandatory", "1");
//            $("#TxtServiceIVR").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkServicePush) {
//            $('#chkServicePush').prop('checked', true);
//        }

//        //LeakAlert
//        if (JSONDoc.chkLeakAlertText) {
//            var TxtLeakAlertText = JSONDoc.TxtLeakAlertText != null ? JSONDoc.TxtLeakAlertText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertText;
//            $('#chkLeakAlertText').prop('checked', true);
//            $("#TxtLeakAlertText").css("display", "block");
//            $('#TxtLeakAlertText').val(TxtLeakAlertText);
//            $("#TxtLeakAlertText").attr("mandatory", "1");
//            $("#TxtLeakAlertText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkLeakAlertEmail) {
//            $('#chkLeakAlertEmail').prop('checked', true);
//            $("#TxtLeakAlertEmail").css("display", "block");
//            $('#TxtLeakAlertEmail').val(JSONDoc.TxtLeakAlertEmail);
//            $("#TxtLeakAlertEmail").attr("mandatory", "1");
//            $("#TxtLeakAlertEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkLeakAlertIVR) {
//            var TxtLeakAlertIVR = JSONDoc.TxtLeakAlertIVR != null ? JSONDoc.TxtLeakAlertIVR.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtLeakAlertIVR;
//            $('#chkLeakAlertIVR').prop('checked', true);
//            $("#TxtLeakAlertIVR").css("display", "block");
//            $('#TxtLeakAlertIVR').val(TxtLeakAlertIVR);
//            $("#TxtLeakAlertIVR").attr("mandatory", "1");
//            $("#TxtLeakAlertIVR").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkLeakAlertPush) {
//            $('#chkLeakAlertPush').prop('checked', true);
//        }


//        //Budget
//        if (JSONDoc.chkBudgetText) {
//            var TxtBudgetText = JSONDoc.TxtBudgetText != null ? JSONDoc.TxtBudgetText.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetText;
//            $('#chkBudgetText').prop('checked', true);
//            $("#TxtBudgetText").css("display", "block");
//            $('#TxtBudgetText').val(TxtBudgetText);
//            $("#TxtBudgetText").attr("mandatory", "1");
//            $("#TxtBudgetText").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBudgetEmail) {
//            $('#chkBudgetEmail').prop('checked', true);
//            $("#TxtBudgetEmail").css("display", "block");
//            $('#TxtBudgetEmail').val(JSONDoc.TxtBudgetEmail);
//            $("#TxtBudgetEmail").attr("mandatory", "1");
//            $("#TxtBudgetEmail").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBudgetIvr) {
//            var TxtBudgetIvr = JSONDoc.TxtBudgetIvr != null ? JSONDoc.TxtBudgetIvr.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.TxtBudgetIvr;
//            $('#chkBudgetIvr').prop('checked', true);
//            $("#TxtBudgetIvr").css("display", "block");
//            $('#TxtBudgetIvr').val(TxtBudgetIvr);
//            $("#TxtBudgetIvr").attr("mandatory", "1");
//            $("#TxtBudgetIvr").after(mandatoryHtml);
//        }

//        if (JSONDoc.chkBudgetPush) {
//            $('#chkBudgetPush').prop('checked', true);
//        }


//        var TextAll = $('#outage').is(':visible') ? $('#chkOutageText').prop('checked') : true
//            && $('#billing').is(':visible') ? $('#chkBillingText').prop('checked') : true
//            && $('#Budget').is(':visible') ? $('#chkBudgetText').prop('checked') : true
//        $('#divDr').is(':visible') ? $('#chkDRText').prop('checked') : true
//         && $('#connectme').is(':visible') ? $('#chkConnectText').prop('checked') : true
//            && $('#service').is(':visible') ? $('#chkServiceText').prop('checked') : true
//        && $('#leakalert').is(':visible') ? $('#chkLeakAlertText').prop('checked') : true;


//        var EmailAll = $('#outage').is(':visible') ? $('#chkOutageEmail').prop('checked') : true
//           && $('#billing').is(':visible') ? $('#chkBillingEmail').prop('checked') : true
//           && $('#Budget').is(':visible') ? $('#chkBudgetEmail').prop('checked') : true
//        $('#divDr').is(':visible') ? $('#chkDREmail').prop('checked') : true
//         && $('#connectme').is(':visible') ? $('#chkConnectEmail').prop('checked') : true
//            && $('#service').is(':visible') ? $('#chkServiceEmail').prop('checked') : true
//        && $('#leakalert').is(':visible') ? $('#chkLeakAlertEmail').prop('checked') : true;


//        var IVRAll = $('#outage').is(':visible') ? $('#chkOutagePush').prop('checked') : true
//           && $('#billing').is(':visible') ? $('#chkBillingPush').prop('checked') : true
//           && $('#Budget').is(':visible') ? $('#chkBudgetPush').prop('checked') : true
//        $('#divDr').is(':visible') ? $('#chkDRPush').prop('checked') : true
//         && $('#connectme').is(':visible') ? $('#chkConnectPush').prop('checked') : true
//            && $('#service').is(':visible') ? $('#chkServicePush').prop('checked') : true
//        && $('#leakalert').is(':visible') ? $('#chkLeakAlertPush').prop('checked') : true;


//        var PushAll = $('#outage').is(':visible') ? $('#chkOutageIvr').prop('checked') : true
//          && $('#billing').is(':visible') ? $('#chkBillingIvr').prop('checked') : true
//          && $('#Budget').is(':visible') ? $('#chkBudgetIvr').prop('checked') : true
//        $('#divDr').is(':visible') ? $('#chkDRIvr').prop('checked') : true
//         && $('#connectme').is(':visible') ? $('#chkConnectIVR').prop('checked') : true
//            && $('#service').is(':visible') ? $('#chkServiceIVR').prop('checked') : true
//        && $('#leakalert').is(':visible') ? $('#chkLeakAlertIVR').prop('checked') : true;

//        if (TextAll) {
//            $('#chkTextAll').prop('checked', true)
//        }
//        if (EmailAll) {
//            $('#chkEmailAll').prop('checked', true)
//        }
//        if (IVRAll) {
//            $('#chkIvrAll').prop('checked', true)
//        }

//        if (PushAll) {
//            $('#chkPushAll').prop('checked', true)
//        }

//        var HdnPhoneNo = JSONDoc.HdnPhoneNo != null ? JSONDoc.HdnPhoneNo.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : JSONDoc.HdnPhoneNo;
//        $('#HdnPhoneNo').val(HdnPhoneNo);
//        $('#HdnEmailId').val(JSONDoc.HdnEmailId);

//    }

//    catch (e) {

//        console.log(e.message);
//    }
//}

function OnErrorCS(response) {


    //loader.hideloader();
    console.log(response);
}

//function LoadPropertyDetails() {
//    if ($('#custId').val() != null && $('#custId').val() != "") {
//        var customerId = $('#custId').val();
//        $('#previousCustId').val($('#custId').val());
//        var Account = $('#ddlAddress option:selected').val();

//        var IsAboutMyHome = 1;
//        var param = {
//            CustomerId: customerId,
//            IsAboutMyHome: IsAboutMyHome,
//            Account: Account
//        }
//        $.ajax({
//            type: "POST",
//            url: "Customer.aspx/GetCustomerPropertiesforAboutMyHome",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            data: JSON.stringify(param),
//            success: onClickSucess,
//            error: OnClickError
//        });
//    }


//    LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2);
//    $("#location").css('height', '400px');
//}

/* Edited by prashant */
function OnClickError(request, status, error) {
    alert('Error!! ' + request.statusText);
}

function onClickSucess(data, status) {
    var response = JSON.parse(data.d);
    $('#lblAccountNumber').html((response)[0].PremiseNumber);
    $('#txtNoofResidents').html((response)[0].NoOfResidents);
    $('#lblHomeType').html((response)[0].HomeType);
    $('#lblSolarPanel').html(((response)[0].SolarPanels == 1) ? 'Yes' : 'No, I dont have solar panels');
    $('#lblElectrivehicle').html(((response)[0].ElectricVehicle == 1) ? 'Yes' : 'No');
    $('#txtSolarPanel').html((response)[0].SolarPanels);
    $('#txtHomesize').html((response)[0].AreaDefined);
    $('#txtFloors').html((response)[0].Floors);
    $('#txtYearbuilt').html((response)[0].YearBuilt);
    $('#txtNumberofbathrooms').html((response)[0].NumberOfBathRooms);
    $('#txtNumberofhigheffapp').html((response)[0].NumberOfHighEfficiencyAppliances);
    $('#txtLotsize').html((response)[0].LotSize);
    $('#txtLandscapearea').html((response)[0].LandscapeArea);
    $('#txtsplandscapearea').html((response)[0].SpecialLandscapeArea);
    $('#lblPool').html(((response)[0].Pool == 1) ? 'Yes' : 'No');

    if ($('#txtHomesize').text() == '' || $('#txtHomesize').html() == '') {
        $('#txtHomesize').next('span').hide();
    }
    if ($('#txtLotsize').text() == '') {
        $('#txtLotsize').next('span').hide();
    }
    if ($('#txtLandscapearea').text() == '') {
        $('#txtLandscapearea').next('span').hide();
    }
    if ($('#txtsplandscapearea').text() == '') {
        $('#txtsplandscapearea').next('span').hide();
    }
}

//Send - Show all customer details in popup
function SendNotification() {
    var AccountNumbers = '';
    var checklength = $('.MailListing input[type=checkbox]:checked').length;
    //var rowindexes = $('#jqxchildgrid').jqxGrid('getselectedrowindexes');
    //var boundrows = $('#jqxchildgrid').jqxGrid('getboundrows');
    //var selectedrows = new Array();

    for (var i = 0; i < checklength; i++) {
        if (AccountNumbers == "") {
            AccountNumbers = $('.MailListing input[type=checkbox]:checked')[i].id;
        } else {
            var str = AccountNumbers + ',' + $('.MailListing input[type=checkbox]:checked')[i].id;
            AccountNumbers = str;
        }
    }
    //for (var i = 0; i < rowindexes.length; i++) {
    //    var row = boundrows[rowindexes[i]];
    //    if (AccountNumbers == "") {
    //        AccountNumbers = row['AccountNumber'];
    //    } else {
    //        var str = AccountNumbers + ',' + row['AccountNumber']
    //        AccountNumbers = str;
    //    }
    //}

    $('#hdnAccountNos').val(AccountNumbers);

    if (AccountNumbers == "") {
        //alert('Please select customer(s) to send notification');
        alert('Please select customer(s) to Send Notification');
        return;
    }

    $('#ddltypeofmessage').val('');
    $('#ddlMessageMode').val('1');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))
    //if (isvalid) {
    //    var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
    //    var value = objEditor.get_content();
    //    if (value == "" && ($('#ddlMessageMode').val()) == "1") {
    //        alert('Please Enter Message');
    //        isvalid = false;
    //    }
    //}
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
    else  {
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

function ChangePassword() {
    if (ValidatePage('PopupChangePassword')) {
        if ($('#txtpassword').val() != $('#txtConfirmpassword').val()) {
            //alert('Passwords do not match, please enter the same password.');
            alert('Passwords do not match, please enter the same password');
        }
        else {
            var CustId = $('#HiddenFieldCustid').val();
            if (ValidatePassword($('#txtpassword').val())) {
                if (confirm("Are you sure you want to reset password?")) {
                    var users;
                    var emailId = '';
                    var userName = '';
                    if (mode != 6)
                        users = usertable[0];//usertable.Tables[0].Rows;
                    else
                        users = usertable[6];//usertable.Tables[6].Rows;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].CustomerId == CustId) {
                            emailId = users[i].EmailID;
                            userName = users[i].FirstName + ' ' + users[i].LastName;
                            break;
                        }
                    }
                    var result = Customer.ResetPassword(CustId, $('#txtpassword').val(), emailId, userName).value;
                    if (result != '') {
                        // ViewObj.Password = $('#txt' + CustId).val();
                        CancelState(CustId);
                        //alert('Password reset successfully.');
                        alert('Password has been changed successfully');
                        $('#txtpassword').val('');
                        $('#txtConfirmpassword').val('');
                        Popup.hide('PopupChangePassword');
                        $('.PopupScreen').hide();
                        $('.PopupScreenIframe').hide();
                    }
                } else {
                    alert('Password is not reset');
                }
            }
        }
    }
}

function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
         $(".texttype").removeClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $('#txtMessage').addClass('hide');
        AddMandatoryAttributeToElement('#txtmsgsubject');
        //AddMandatoryAttributeToElement('#ContentPlaceHolder1_rightpanel_txtEditor');
        AddMandatoryAttributeToElement('#summernote');
        RemoveMandatoryAttributeFromElement('#txtMessage');
        getLength();
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        AddMandatoryAttributeToElement('#txtMessage');
        //RemoveMandatoryAttributeFromElement('#ContentPlaceHolder1_rightpanel_txtEditor');
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

function File_OnChange(sender) { $('#btnRemoveFile').show(); }

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function getLength() {
    var textbox = $("#ddlMessageMode").val();
    //var txtbxlength = (textbox == 0 || textbox == 2) ? 140 : 140;
    //if (textbox == 1) {
    //    document.getElementById("spanTxt").innerHTML = "Max Characters:" + 500;
    //}
    //else {
    //    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;
    //}

    if (textbox == 0 || textbox == 3) {
        txtbxlength = 140;
    }
    else if (textbox == 2) {
        txtbxlength = 200;
    }
    else {
        txtbxlength = 1000;
    }

    //if (textbox == 1) {
    //    document.getElementById("spanTxt").innerHTML = "Max Characters:" + 500;
    //}
    //else {
    //    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;
    //}
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
    return false;
}

function resetAdvanceSearch() {
    $('#txtcustname').val('');
    $('#ddlAccountType').val('');
    $('#ddlStatus').val('');
    $('#ddlPaperBillStatus').val('');
    $('#ddlTextMsgStatus').val('');
    $("#filterTable tr").remove();
    $('#txtAccountID').val('');
    $('#txtphone').val('');
    $('#txtStreet').val('');
    $('#txtEmail').val('');
}

function FieldValue(ControlID) {
    if ($('#' + ControlID).val() == $('#' + ControlID).attr('placeholder')) {
        $('#' + ControlID).val('');
        return ('#' + ControlID).val();
    }
    else {
        return ('#' + ControlID).val();
    }
};

//GETDATA
function CallAjax(fnError, param) {
    try {

        loader.showloader();
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                loader.showloader();
                CustomerData = $.parseJSON(response.d);
                ConvertData();
                if (CustomerData != null) {

                    $('#hdnTotalRecords').val(CustomerData.Table1[0]["TotalRecords"]);
                    if (CustomerData != null) {
                        //if (mode == 1) {
                        //    databindtogrid = CustomerData.Table;
                        //}
                        //else {
                        if (CustomerData.Table.length == 0) {
                            $('#nodata_divCustomer').show();
                            $('#nodata_divCustomer').html("<center><font color='Red'>No Data Available</Font></center>");
                            $('#jqxgrid').hide();
                            $('#jqxchildgrid').hide();
                            $('#jqxchildlegend').hide();
                            $('.responsive_alignment_pagination').hide();
                            $('.divPagesize').hide();
                            
                        }
                        else {
                            databindtogrid = CustomerData.Table;
                            // }
                            $('.grid-section').show();

                            showdata(param);
                        }
                      
                    } else {
                        LoadChart();
                        loader.hideloader();
                        $('#nodata_divCustomer').show();
                        $('#nodata_divCustomer').html("<center><font color='Red'>No Data Available</Font></center>");
                        $('.responsive_alignment_pagination').hide();
                        $('.divPagesize').hide();
                        $('#jqxgrid').hide();
                        $('#jqxchildgrid').hide();
                        $('#jqxchildlegend').hide();
                    //    $('.grid-section').hide();
                    }
                    loader.hideloader();
                }
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        })
    }
    catch (e) { loader.hideloader(); }

}

function GetDataOnAddressChange(fnError, param) {
    try {

        loader.showloader();
        $.ajax({

            type: "POST",
            url: "Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                CustomerData = $.parseJSON(response.d);
                ConvertData();
                var length = parseInt(CustomerData.Table.length);
                if (length > 0) {

                    jsonMap = CustomerData.Table;
                    bindDataonaddressChange();
                }
                loader.hideloader();
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        })
    }
    catch (e) {
        loader.hideloader();
    }
}

//function bindDataonaddressChange() {
//    $("#location").css('height', '350px');
//    var divRebate = Customer.GetCustomerProgram($('#ddlAddress').val(), 3).value;
//    var divProg = Customer.GetCustomerProgram($('#ddlAddress').val(), 1).value;
//    LoadAdminRebate(divRebate);
//    LoadAdminProgram(divProg);
//    LoadNotification();
//    for (var i = 0; i < jsonMap.length; i++) {
//        if (jsonMap[i].AccountNumber == $('#ddlAddress').val()) {
//            latitude = jsonMap[i].Latitude;
//            longitude = jsonMap[i].Longitude;
//            cityname = jsonMap[i].CityName;
//            zipcode = jsonMap[i].ZipCode;
//            addr1 = jsonMap[i].Address1;
//            addr2 = jsonMap[i].Address2;
//            // load profile 
//            $('#custName').html(jsonMap[i]["CustomerName"]);
//            $('#lblCity').html(jsonMap[i].CityName);
//            $('#lblZipCode').html(jsonMap[i].ZipCode);
//            $('#statusUser').html(jsonMap[i].Status);
//            $('#accounttype').html(jsonMap[i]["Customer Type"]);
//            $('#paperBill').html(jsonMap[i].Paperless);
//            $('#lblEmailId').html(jsonMap[i].EmailID);
//            $('#lblAlternateEmailId').html(jsonMap[i].AlternateEmailID != '' ? jsonMap[i].AlternateEmailID : 'N/A');
//            $('#lblMobile').html(jsonMap[i].MobilePhone != '' ? (jsonMap[i].MobilePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : jsonMap[i].MobilePhone);
//            $('#lblCreateDate').html(jsonMap[i].CreatedDate);
//            $('#lblAlternateNumber').html((jsonMap[i].HomePhone == '' || jsonMap[i].HomePhone == null) ? 'N/A' : (jsonMap[i].HomePhone).replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
//            break;
//        }
//    }
//    LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2);
//    popupdetails = Customer.LoadPopupDetailsData($('#ddlAddress').val(), TimeOffSet).value;
//    LoadServiceRequestGrid(popupdetails.Tables[4].Rows);
//    ServicePlans(popupdetails.Tables[0].Rows);
//    LoadConnectMeRequestGrid(popupdetails.Tables[3].Rows);
//    jsonBillgridData = popupdetails.Tables[1].Rows;
//    jsonPaymentgridData = popupdetails.Tables[2].Rows;
//    LoadPaymentGrid(popupdetails.Tables[2].Rows);
//    LoadBillGrid(popupdetails.Tables[1].Rows);
//    LoadMeterNumberGrid(popupdetails.Tables[7].Rows)
//    var divbasicDt = '';
//    var address = $('#ddlAddress option:selected').val();
//    for (var i = 0; i < ZipcodeDetails.length; i++) {
//        if (address == ZipcodeDetails[i].Accountnumber) {
//            divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:</b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
//            $('#DivBasicDetails').html('');
//            $('#DivBasicDetails').html(divbasicDt);
//            break;
//        }
//    }
//    LoadPropertyDetails();
//}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(CustomerData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        usertable = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function showdata(param) {

    loader.showloader();
    $('#nodata_divCustomer').hide();
    // END NEW UI 12/19/2014
    if (mode == 1) {
        mappoints = CustomerData.Table;
        $("#mapView").show();
    }
    else {
        chartgraphsection(1);
        $("#mapView").hide(); $("#mapDiv").hide();
    }
    if (databindtogrid.length == 0) {
        $('.responsive_alignment_pagination').hide();
        $('.divPagesize').hide();
        $('.right-active-sprite').hide();
        $('.Pager').hide();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('#jqxchildlegend').hide();
        $('.jqgrid,#div-useremap').hide();
        $('#div-mainChart').hide();
        $('#div-UserChart').hide();
        $('#nodata_divCustomer').show();
        $('#nodata_divCustomer').html('<font color="Red">No Data</font>');
    }
    else {
        if (mode == '0') {
            $('.responsive_alignment_pagination').hide();
            $('.divPagesize').hide();
            $('.right-active-sprite').hide();
            $('.Pager').hide();
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            $('#jqxchildlegend').hide();
            gridid = 'jqxgrid';
            LoadGrid();
        }
        else {
            $('.responsive_alignment_pagination').show();
            $('.divPagesize').show();
            $('.right-active-sprite').show();
           // $('.Pager').show();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            $('#jqxchildlegend').show();
            gridid = 'jqxchildgrid';
            $('#divHeader').show();

            LoadChildGrid();


        }
        $('#div-useremap').show();
        $('.nodata').hide();
        $('#div-mainChart').show();
        $('#div-UserChart').show();
        $('#nodata_divCustomer').hide();

        // LoadChart();
    }
    if (mode == 1) {
        $.ajax({
            type: "POST",
            url: "Customer.aspx/LoadMap",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                MapData = $.parseJSON(response.d);
                createmap();
                //if (MapData != null) {
                //    createmapCluster(JSON.parse(MapData), 'div-useremap');
                //}
                //else
                //    createmapCluster('', 'div-useremap');
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        });
        loader.hideloader();
    }
}

function switchview(viewshow, viewhide, viewhide2) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        document.getElementById(viewhide).style.display = 'none';
        if (viewhide2 != null || viewhide2 != undefined)
            document.getElementById(viewhide2).style.display = 'none';
        chartSelect(viewshow);
        if (viewshow == "Statusbargraph")
        {
             BindCRMheigh('column', 'Statusbargraph');
        }
        if (viewshow == "Acctypebargraph")
         {
          BindCRMheigh('column', 'Acctypebargraph');
        }
       // if (viewshow == "Statuschart" || viewshow == "Acctypechart")
          // chartSelect(viewshow);
    }
    catch (e) { }
}

function chartSelect(ID) {

    switch (ID) {
        case 'Statuschart':
            var Active = CustomerData.Table2[1]["Cnt"];
            var Inactive = CustomerData.Table2[2]["Cnt"];
            var Registered = CustomerData.Table2[0]["Cnt"];
            var NotRegistered = CustomerData.Table2[3]["Cnt"];
            createStatus('Statuschart', Active + Inactive + Registered + NotRegistered, Active, Inactive, Registered, NotRegistered);
            break;
        case 'Statusbargraph':
            if (CustomerData.Table2 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table2;
                $.map(Statusrow, function (obj, i) {
                    if (obj.Status.toLowerCase() == "registered") {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#d6d23a'
                        });
                    }
                    else if (obj.Status.toLowerCase() == "active") {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#32D2C9'
                        });
                    }

                    else if (obj.Status.toLowerCase() == "inactive") {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#ed5d5d'
                        });
                    }
                    else {
                        processed_jsonChart.push({
                            name: obj.Status,
                            y: obj.Cnt,
                            title: obj.Status,
                            color: '#ed5d5d'
                        });
                    }
                });
            }
            BindCRMheigh('column', 'Statusbargraph');
            break;
        case 'gridStatus':

            if (CustomerData.Table2 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table2;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.Status,
                        y: obj.Cnt,
                        Name: obj.Status,
                        Count: obj.Cnt

                    });
                });
            }
            LoadGridChart('gridStatus', processed_jsonChart);
            break;
        case 'Acctypechart':
            var totalcnt = 0;
            processed_jsonChart = new Array();
            $.map(CustomerData.Table3, function (obj, i) {
                totalcnt = totalcnt + obj.Cnt;
                processed_jsonChart.push({
                    name: obj.CustomerType,
                    y: obj.Cnt,
                    color: colorarrHEX[i],

                });
            })
            createAccountType('Acctypechart', totalcnt, Commercial, Residential);
            break;
        case 'Acctypegrid':

            if (CustomerData.Table3 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table3;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CustomerType,
                        y: obj.Cnt,
                        color: colorarrHEX[i],
                        Name: obj.CustomerType,
                        Count: obj.Cnt
                    });
                });
            }
            LoadGridChart('Acctypegrid', processed_jsonChart);
            break;

            break;
        case 'Acctypebargraph':
            if (CustomerData.Table3 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table3;
                $.map(row, function (obj, i) {
                    if (obj.CustomerType.toLowerCase() == "residential") {
                        processed_jsonChart.push({
                            name: obj.CustomerType,
                            y: obj.Cnt,
                            title: obj.CustomerType,
                            color: '#ed5d5d'
                        });
                    }
                    else {
                        processed_jsonChart.push({
                            name: obj.CustomerType,
                            y: obj.Cnt,
                            title: obj.CustomerType,
                            color: '#32D2C9'
                        });
                    }
                });
            }
            BindCRMheigh('column', 'Acctypebargraph');
            break;
        case 'Chartbox':
            $('#achartbox').removeClass('active');
            $('#agridbox').addClass('active');
            if (CustomerData.Table1 != null) {
                processed_jsonChart = new Array();
                var row = CustomerData.Table1;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CityName,
                        y: obj.Cnt,
                        title: obj.CityName,
                        color: colorarrHEX[i]
                    });
                });
            }

            BindCRMheigh('column', 'Chartbox');
            break;
        case 'gridbox':
            if (CustomerData.Table1 != null) {
                processed_jsonChart = new Array();
                var Statusrow = CustomerData.Table1;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CityName,
                        y: obj.Cnt,
                    });
                });
            }
            LoadGridCustomer('gridbox', processed_jsonChart);
            $('#agridbox').removeClass('active');
            $('#achartbox').addClass('active');
            break;
        case 'chartDiv':
            changeActiveClass(ID);
            LoadChart();
            break;
        case 'graphDiv':
            changeActiveClass(ID);

            break;
    }
}

function changeActiveClass(ID) {
    $('#btnSend').hide();
    $('#pieGraph').addClass('pie').removeClass('activePie');
    $('#gridView').addClass('grid').removeClass('activeGrid');
    $('#mapView').addClass('map1').removeClass('activeMap');
    if (ID == 'graphDiv') {
        if (gridid == 'jqxchildgrid') {
            $('#btnSend').show();
        }
        $('#gridView').addClass('activeGrid').removeClass('grid');
    }
    else if (ID == 'chartDiv') {
        $('#pieGraph').addClass('activePie').removeClass('pie');
    }
    else if (ID == 'mapDiv') {

    }
}

function LoadChart() {
    try {
        var data1;
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('#jqxchildlegend').hide();
        //  $('.grid-section').hide();

        var startDate = getMMDDYYDate($('#txtDateFrom').val());
        var endDate = getMMDDYYDate($('#txtDateTo').val());
        if (startDate == "NaN/NaN/N") {
            startDate = '';
        }
        if (endDate == "NaN/NaN/N") {
            endDate = '';
        }
        var Status = $('#ddlStatus').val();
        var role = $('#ddlRole').val();
        hashtable = {};

        if ($("#ddlPaperBillStatus option:selected").index() > 0) {
            hashtable["ddlPaperBillStatus"] = "PaperBill Status: " + " " + $("#ddlPaperBillStatus option:selected").text();

        }
        if ($("#ddlTextMsgStatus option:selected").index() > 0) {
            hashtable["ddlTextMsgStatus"] = "TextMsg Status:" + " " + $("#ddlTextMsgStatus option:selected").text();
        }
        if ($("#ddlRole option:selected").index() > 0) {
            hashtable["ddlRole"] = "Role: " + " " + $("#ddlRole option:selected").text();
        }
        if ($("#ddlStatus option:selected").index() > 0) {
            hashtable["ddlStatus"] = "Status:" + " " + $("#ddlStatus option:selected").text();
        }
        if ($("#ddlAccountType option:selected").index() > 0) {
            hashtable["ddlAccountType"] = "AccountType: " + " " + $("#ddlAccountType option:selected").text();
        }
        if ($('#txtphone').val() != "") {
            hashtable["txtphone"] = "Mobile Number: " + " " + $('#txtphone').val();
        }
        if ($('#txtStreet').val() != "") {
            hashtable["txtStreet"] = "Street: " + " " + $('#txtStreet').val();
        }
        if ($("#txtcustname").val() != "") {
            //hashtable["ddlRole"] = $("#ddlRole option:selected").text();
            hashtable["txtStreet"] = "Customer Name: " + " " + $('#txtcustname').val();
        }
        if ($('#txtAccountID').val() != "") {
            hashtable["txtStreet"] = "AccountID: " + " " + $('#txtAccountID').val();
        }
        if ($("#txtEmail").val() != "") {
            //hashtable["ddlRole"] = $("#ddlRole option:selected").text();
            hashtable["txtEmail"] = "Email: " + " " + $('#txtEmail').val();
        }
      

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than To date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        var custname = '';
        var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
        var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
        var ddlStatus = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();

    //    var custname = ($('#txtcustomername').val() == null || $('#txtcustomername').val() == '' || $('#txtcustomername').val() == $('#txtcustomername').attr('placeholder')) ? '' : $('#txtcustomername').val();
        var custname = ($("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == null || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == '' || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").attr('placeholder')) ? '' : $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val();
        var accountno = ($("#txtAccountID").val() == null || $("#txtAccountID").val() == '' || $('#txtAccountID').val() == $('#txtAccountID').attr('placeholder')) ? '' : $("#txtAccountID").val();

        zip = '';

        city = '';
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');

            if ($(ddlCity).attr('key') == 'Zipcode') {
                city = $(ddlCity).attr('cityid');
                zip = $(ddlCity).val();
            }
            else {
                city = $(ddlCity).val();
                zip = '';
            }
        }

        var param = {
            'datefrom': txtFrom,
            'dateto': $('#txtDateTo').val(),
            'cityid': city,
            'zipcode': zip,
            'username': custname,
            'customertype': $('#ddlAccountType').val(),
            'pprbillstatus': ddlPaperBillStatus,
            'textmsgstatus': ddlTextMsgStatus,
            'status': $('#ddlStatus').val(),
            'accountno': $('#txtAccountID').val(),
            'SearchString': SearchText,
            'Mode': '2',
            'PageIndex': pageIndex,
            'PageSize': pageSize,
            'SortColumn': 'CityName',
            'SortOrder': 'ASC',
            'emailId': '',
            'MobilePhone': '',

          'Searchtype':'',
        'Advancesearch': '3',
        'Address':''

        };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                loader.showloader();
                CustomerData = $.parseJSON(response.d);
                ConvertData();
                if (CustomerData != null) {
                    if (CustomerData != null) {
                        data1 = CustomerData.Table2;
                        CustomerChart(data1);
                    }
                    loader.hideloader();
                }
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        })



    } catch (e) {
        alert(e.toString());
    }
}

function CustomerChart(data1) {
    for (var j = 0; j < data1.length; j++) {
        if (data1[j].Status == "Active") {
            var Active = data1[j].Cnt;
        }
        if (data1[j].Status == "Registered") {
            var Registered = data1[j].Cnt;
        }
        if (data1[j].Status == "Inactive") {
            var Inactive = data1[j].Cnt;
        }
        if (data1[j].Status == "Not Registered") {
            var NotRegistered = data1[j].Cnt;
        }
    }

    createStatus('Statuschart', Active + Inactive + Registered + NotRegistered, Active, Inactive, Registered, NotRegistered);

    processed_jsonChart = new Array();
    var Statusrow = CustomerData.Table2;
    $.map(Statusrow, function (obj, i) {
        processed_jsonChart.push({
            name: obj.Status,
            y: obj.Cnt,
            color: colorarrHEX[i],
            Name: obj.Status,
            Count: obj.Cnt
        });
    });
    LoadGridChart('gridStatus', processed_jsonChart);
    processed_jsonChart = new Array();
    var Statusrow = CustomerData.Table2;
    $.map(Statusrow, function (obj, i) {
        processed_jsonChart.push({
            name: obj.Status,
            y: obj.Cnt,
            color: colorarrHEX[i],
            Name: obj.Status,
            Count: obj.Cnt
        });
    });
    BindCRMheigh('column', 'Statusbargraph');
    var data1 = CustomerData.Table3;
    var total = 0;
    for (var j = 0; j < data1.length; j++) {

        total = total + data1[j].Cnt;
    }
    processed_jsonChart = new Array();
    var Statusrow = CustomerData.Table3;
    $.map(Statusrow, function (obj, i) {
        processed_jsonChart.push({
            name: obj.CustomerType,
            y: obj.Cnt,
            color: colorarrHEX[i],
        });
    });
    createAccountType('Acctypechart', total, '', '');
    if (CustomerData.Table3 != null) {
        processed_jsonChart = new Array();
        var row = CustomerData.Table3;
        $.map(row, function (obj, i) {
            if (obj.CustomerType.toLowerCase() == "residential") {
                processed_jsonChart.push({
                    name: obj.CustomerType,
                    y: obj.Cnt,
                    title: obj.CustomerType,
                    color: '#ed5d5d'
                });
            }
            else {
                processed_jsonChart.push({
                    name: obj.CustomerType,
                    y: obj.Cnt,
                    title: obj.CustomerType,
                    color: '#32D2C9'
                });
            }
        });
    }
    BindCRMheigh('column', 'Acctypebargraph');


    if (CustomerData.Table3 != null) {
        processed_jsonChart = new Array();
        var row = CustomerData.Table3;
        $.map(row, function (obj, i) {
            processed_jsonChart.push({
                name: obj.CustomerType,
                y: obj.Cnt,
                color: colorarrHEX[i],
                Name: obj.CustomerType,
                Count: obj.Cnt
            });
        });
    }
    LoadGridChart('Acctypegrid', processed_jsonChart);
    if (CustomerData.Table1 != null) {
        processed_jsonChart = new Array();
        var row = CustomerData.Table1;
        $.map(row, function (obj, i) {
            processed_jsonChart.push({
                name: obj.CityName,
                y: obj.Cnt,
                title: obj.CityName,
                color: colorarrHEX[i]
            });
        });
    }
    BindCRMheigh('column', 'Chartbox', '', '', 'Total Customers');

    LoadGridCustomer('gridbox', processed_jsonChart);
}

function createStatus(divid, total, active, Inactive, Registered, NotRegistered) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -35,
                style: {
                 font: '15px "Trebuchet MS", Verdana, sans-serif'
                }//,
                
            },
            chart: {

                renderTo: 'container',
                type: 'pie',
                options3d: {
                    alpha: 15,
                    beta: 0
                }
            },

            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                },
                series:
                 {
                     point: {
                         pointer: 'cursor',
                         events: {
                             click: function () {
                                 chartclick(this.name, divid);

                             }
                         }
                     }
                 }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' ';
                }
            },
            series: [{
                name: divid,
                data: [["Active", active], ["Inactive", Inactive], ["Registered", Registered], ["Not Registered", NotRegistered]],
                colors: [colorarrHEX[0], colorarrHEX[1], colorarrHEX[2], colorarrHEX[3]],
                size: '100%',
                innerSize: '60%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }
    catch (ex)
    { alert(ex.toString()); }
}

function createAccountType(divid, total, Commercial, Residential) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -25,
                style: {
                    font: '15px "Trebuchet MS", Verdana, sans-serif'
                }//,
            },
            chart: {

                renderTo: 'container',
                type: 'pie',
                options3d: {
                    alpha: 15,
                    beta: 0
                }
            },

            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                },
                series:
                 {
                     point: {
                         pointer: 'cursor',
                         events: {
                             click: function () {
                                 chartclick(this.name, divid);

                             }
                         }
                     }
                 }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' ';
                }
            },
            series: [{
                name: divid,
                data: processed_jsonChart,
                //  colors: colorarrHEX[i],
                size: '100%',
                innerSize: '60%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }
    catch (ex)
    { alert(ex.toString()); }
}

function LoadGridChart(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            source = {
                datatype: "array",
                datafields: [
                { name: 'Name' },
                { name: 'Count' },
                ],
                async: false,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                columnsheight: 28,
                altrows: true,
                sortable: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Mode', dataField: 'Name', width: '50%' },
                    { text: 'Count', dataField: 'Count', width: '50%' }
                ]
            });
        }
    }
    catch (e) { alert(e.toString()); }
}

function LoadGridCustomer(id, databindtogrid) {
    try {
       // {
            source = {
                datatype: "array",
                datafields: [
                { name: 'name' },
                { name: 'y' },
                ],
                async: false,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",

                source: dataAdapter,
                height: GridHeight * .50,
                columnsheight: 38,
                rowsheight: 34,
                altrows: true,

                sortable: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'City Name', dataField: 'name', width: '50%' },
                    { text: 'Total Customers', dataField: 'y', width: '50%' }
                ]
            });
       // }
    }
    catch (e) { alert(e.toString()); }
}

function BindCRMheigh(type, id, showindecimal, color) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }, events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var adprocessed_json4 = chartclick(e.point.title, type, e.point.drilldown, 0);
                        if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                            excludedrillup = false;
                        else {
                            excludedrillup = true;
                        }
                        var chart = this,
                            drilldowns = {
                                'Paid-Customer': {
                                    name: e.point.name,
                                    data: adprocessed_json4
                                }

                            },
                            series = drilldowns['Paid-Customer'];
                        series.id = e.point.drilldown;

                        chart.addSeriesAsDrilldown(e.point, series);

                    }

                },

                drillup: function (e) {
                    if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city' || e.seriesOptions.id.toLowerCase() == 'unplanned' || e.seriesOptions.id.toLowerCase() == 'planned') || (e.seriesOptions.name != null && e.seriesOptions.name.toLowerCase() == 'zipcode')) {
                        subBackToMain(type, excludedrillup);
                    }
                }
            }
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
        }

   ,
        yAxis: {
            min: 0,
            maxPadding: 0.09,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red',
                    fontSize: '5px'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {

            labels: {

                enabled: true,
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            type: "category",
            name: 'Customer Count',
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '3px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        plotOptions: {

            series: {
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: 0,//#4867
                    y: -7,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 0) : Highcharts.numberFormat(this.y, 0);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {
                            if (id != 'Chartbox')
                                chartclick(this.title, id);
                        }
                    }
                }
            }
        },

        tooltip: {

            formatter: function () {
                return this.point.name + ' : <b>' + Math.abs(this.y) + '<b>';
            }
        },
        series: [{
            showInLegend: false,
            type: type,
            data: processed_jsonChart,
            color: colorarrHEX[i]
        }
        ],


    });
}

function chartclick(name, divid) {
    loader.showloader();
    var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
    var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
   // var custname = ($('#txtcustomername').val() == null || $('#txtcustomername').val() == '' || $('#txtcustomername').val() == $('#txtcustomername').attr('placeholder')) ? '' : $('#txtcustomername').val();
    var custname = ($("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == null || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == '' || $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val() == $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").attr('placeholder')) ? '' : $("input[name='ctl00$ctl00$ContentPlaceHolder1$rightpanel$usernameautocomplete$txtcustomername']").val();
    var selectcolor;
    var stat;
    var custtype;
    if (name == "Active") {
        stat = 1;
        selectcolor = "#32D2C9";
    }
    else if (name == "Inactive") {
        stat = 2;
        selectcolor = "#ed5d5d";
    }
    else if (name == "Residential") {
        custtype = 1;
        selectcolor = "#ed5d5d";
    }
    else if (name == "Commercial") {
        custtype = 2;
        selectcolor = "#32D2C9";
    }
    else {
        stat = 0;
        selectcolor = "#d6d23a";
    }
    if (divid == 'Acctypechart' || divid == 'Acctypebargraph') {
        var param = {
            'datefrom': $('#txtDateFrom').val(),
            'dateto': $('#txtDateTo').val(),
            'cityid': city,
            'zipcode': zip,
            'username': custname,
            'customertype': custtype,
            'pprbillstatus': ddlPaperBillStatus,
            'textmsgstatus': ddlTextMsgStatus,
            'status': '',
            'accountno': $('#txtAccountID').val()
        };
    }
    else {
        var param = {
            'datefrom': $('#txtDateFrom').val(),
            'dateto': $('#txtDateTo').val(),
            'cityid': city,
            'zipcode': zip,
            'username': custname,
            'customertype': $('#ddlAccountType').val(),
            'pprbillstatus': ddlPaperBillStatus,
            'textmsgstatus': ddlTextMsgStatus,
            'status': stat,
            'accountno': $('#txtAccountID').val()
        };
    }
    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + $('#ddlCity').val() + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + status + '|' + $('#txtAccountID').val() + '|' + '' + '|' + '' + '|' + '' + '|' + '' + '|' + '' + '|' + '' + '|' + '');

    $.ajax({
        type: "POST",
        url: "../UserManagementCustomer.aspx/LoadGridAjax",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, status, type) {

            var Customdata = $.parseJSON(response.d);

            processed_jsonChart = new Array();
            var row = Customdata.Table1;
            $.map(row, function (obj, i) {
                processed_jsonChart.push({
                    name: obj.CityName,
                    y: obj.Cnt,
                    title: obj.CityName,
                    color: selectcolor
                });
            });

            BindCRMheigh('column', 'Chartbox', '', selectcolor);
            LoadGridCustomer('gridbox', processed_jsonChart);
            loader.hideloader();
        },
        error: function (request, status, error) {
            console.log('Error!! ' + request.statusText);
            loader.hideloader();
        },

    });

}

function createmap() {
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
                  "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
                  function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                      var polygonSymbol, polygonGraphic, pts, pt, sym;
                      $('#div-useremap').html('');
                      var map = new Map("div-useremap", { basemap: "streets", zoom: 3, minZoom: 3, maxZoom: 16 });

                      
                      $('#mapView').click(function () {
                          defOpen = 3;
                          chartgraphsection(defOpen);
                          if (CustomerData.Table.length > 0) {
                              $("#div-useremap").css('height', GridHeight * .85);
                              $("#div-useremap").width('100%');
                              ismap = true;//#4101
                              $("#mapDiv").show();
                              createmap();
                          }
                          else {
                              $("#mapDiv").hide();
                              $("#div-useremap").hide();
                          }
                          $(this).addClass('map-active');

                      });

                      $('#imggrid').click(function () {
                          ismap = false;
                      });
                      on(map, "load", function () {
                          try {
                              getCurrentLocation();
                          }
                          catch (e) {
                              console.log(e.message);
                          }
                      });

                      function clearAddGraphics() {
                          map.infoWindow.hide();
                          map.graphics.clear();
                          polygonGraphic = null;
                          pts = null;
                          polygonSymbol = null;
                      }
                      function getCurrentLocation() {
                          try {
                              clearAddGraphics();
                              var pt = null;
                              for (var i = 0; i < CustomerData.Table.length; i++) {
                                  if (!(CustomerData.Table[i].Latitude == '' && CustomerData.Table[i].Longitude == '')) {
                                      pt = new Point(CustomerData.Table[i].Longitude, CustomerData.Table[i].Latitude);
                                      var symbol = new esri.symbol.PictureMarkerSymbol('../images/user-icon.png', 30, 40);

                                      var attributes = { Address1: CustomerData.Table[i].Address1, UtilityAccountNumber: CustomerData.Table[i].UtilityAccountNumber };
                                      var infoTemplate = new InfoTemplate(CustomerData.Table[i].NAME, "<b>Address:</b> ${Address1}<br/><b>Utility Account Number:</b> ${UtilityAccountNumber}");//25537 bug id

                                      var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                                      map.graphics.add(graphic);
                                      map.centerAndZoom(pt, 10);
                                  }
                              }
                              if (CustomerData.Table.length == 0) {

                              }

                          }
                          catch (e) {
                              console.log(e.message);
                          }
                      }
                      utils.autoRecenter(map);
                  });
}

function xml() {
    var xml, ischk;
    var phoneno = $('#HdnPhoneNo').val();
    var email = $('#HdnEmailId').val();
    xml = '<NotificationDetail><NotificationType id="1">';
    ischk = (($('#chkOutageText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageText:visible').length == 1) {
        var TxtOutageText = $('#TxtOutageText').val() != '' ? parseInt($('#TxtOutageText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageText').val();
        xml += '<EmailORPhone>' + TxtOutageText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="2">';
    ischk = (($('#chkOutageEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtOutageEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="3">';
    ischk = (($('#chkOutagePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="4">';
    ischk = (($('#chkOutageIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageIvr:visible').length == 1) {
        var TxtOutageIvr = $('#TxtOutageIvr').val() != '' ? parseInt($('#TxtOutageIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageIvr').val();
        xml += '<EmailORPhone>' + TxtOutageIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for  billing checkbox   
    xml += '<NotificationType id="5">';
    ischk = (($('#chkBillingText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingText:visible').length == 1) {
        var TxtBillingText = $('#TxtBillingText').val() != '' ? parseInt($('#TxtBillingText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingText').val();
        xml += '<EmailORPhone>' + TxtBillingText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="6">';
    ischk = (($('#chkBillingEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBillingEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="7">';
    ischk = (($('#chkBillingPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="8">';
    ischk = (($('#chkBillingIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingIvr:visible').length == 1) {
        var TxtBillingIvr = $('#TxtBillingIvr').val() != '' ? parseInt($('#TxtBillingIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingIvr').val();
        xml += '<EmailORPhone>' + TxtBillingIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for budget checkbox
    xml += '<NotificationType id="9">';
    ischk = (($('#chkBudgetText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetText:visible').length == 1) {
        var TxtBudgetText = $('#TxtBudgetText').val() != '' ? parseInt($('#TxtBudgetText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetText').val();
        xml += '<EmailORPhone>' + TxtBudgetText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="10">';
    ischk = (($('#chkBudgetEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBudgetEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="11">';
    ischk = (($('#chkBudgetPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="12">';
    ischk = (($('#chkBudgetIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetIvr:visible').length == 1) {
        var TxtBudgetIvr = $('#TxtBudgetIvr').val() != '' ? parseInt($('#TxtBudgetIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetIvr').val();
        xml += '<EmailORPhone>' + TxtBudgetIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for DemandResponse Checkbox
    xml += '<NotificationType id="13">';
    ischk = (($('#chkDRText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRText:visible').length == 1) {
        var TxtDRText = $('#TxtDRText').val() != '' ? parseInt($('#TxtDRText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRText').val();
        xml += '<EmailORPhone>' + TxtDRText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="14">';
    ischk = (($('#chkDREmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDREmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtDREmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDREmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="15">';
    ischk = (($('#chkDRPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="16">';
    ischk = (($('#chkDRIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRIvr:visible').length == 1) {
        var TxtDRIvr = $('#TxtDRIvr').val() != '' ? parseInt($('#TxtDRIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRIvr').val();
        xml += '<EmailORPhone>' + TxtDRIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //For Connect Me checkbox
    xml += '<NotificationType id="17">';
    ischk = (($('#chkConnectText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectText:visible').length == 1) {
        var TxtConnectText = $('#TxtConnectText').val() != '' ? parseInt($('#TxtConnectText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectText').val();
        xml += '<EmailORPhone>' + TxtConnectText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="18">';
    ischk = (($('#chkConnectEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtConnectEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="19">';
    ischk = (($('#chkConnectPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="20">';
    ischk = (($('#chkConnectIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectIVR:visible').length == 1) {
        var TxtConnectIVR = $('#TxtConnectIVR').val() != '' ? parseInt($('#TxtConnectIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectIVR').val();
        xml += '<EmailORPhone>' + TxtConnectIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    //For Service checkbox
    xml += '<NotificationType id="21">';
    ischk = (($('#chkServiceText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectText:visible').length == 1) {
        var TxtConnectText = $('#TxtConnectText').val() != '' ? parseInt($('#TxtConnectText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectText').val();
        xml += '<EmailORPhone>' + TxtConnectText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="22">';
    ischk = (($('#chkServiceEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtServiceEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="23">';
    ischk = (($('#chkServicePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="24">';
    ischk = (($('#chkServiceIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceIVR:visible').length == 1) {
        var TxtServiceIVR = $('#TxtServiceIVR').val() != '' ? parseInt($('#TxtServiceIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtServiceIVR').val();
        xml += '<EmailORPhone>' + TxtServiceIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //for leakalert
    xml += '<NotificationType id="25">';
    ischk = (($('#chkLeakAlertText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertText:visible').length == 1) {
        var TxtLeakAlertText = $('#TxtLeakAlertText').val() != '' ? parseInt($('#TxtLeakAlertText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertText').val();
        xml += '<EmailORPhone>' + TxtLeakAlertText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="26">';
    ischk = (($('#chkLeakAlertEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtLeakAlertEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="27">';
    ischk = (($('#chkLeakAlertPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="28">';
    ischk = (($('#chkLeakAlertIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertIVR:visible').length == 1) {
        var TxtLeakAlertIVR = $('#TxtLeakAlertIVR').val() != '' ? parseInt($('#TxtLeakAlertIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertIVR').val();
        xml += '<EmailORPhone>' + TxtLeakAlertIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }
    xml += '</NotificationDetail>';

    return xml;

}

$(document).on("click", ".txtAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".txt input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='txt']").each(function (i, obj) {


            $(obj).css('display', 'block');
            $(obj).show();
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='txt errorbox']").each(function (i, obj) {

            $(obj).css('display', 'block');
            $(obj).show();
        });
    }
    else {
        $(".txt input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='txt errorbox']").each(function (i, obj) {
            $(obj).removeClass('errorbox');
            $(obj).w2tag('');
        });
        $("input[type='text'][class='txt']").each(function (i, obj) {
            $(obj).next('span').hide();
        });

        $("input[type='text'][class='txt']").hide().css('display', 'none');

    }

});

$(document).on("click", ".emailAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".email input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='email']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='email errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }

        });
    }
    else {
        $(".email input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='email']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
            }

        });
        $("input[type='text'][class='email']").each(function (i, obj) {
            $(obj).next('span').hide();
        });
        $("input[type='text'][class='email errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
                $(obj).val('');
                $(obj).removeClass('errorbox');
            }

        });
    }

});

$(document).on("click", ".pushAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".push input[type=checkbox]").prop('checked', true);

    }
    else {
        $(".push input[type=checkbox]").prop('checked', false);
    }

});

$(document).on("click", ".ivrAll input[type=checkbox]", function () {
    if ($(this).prop('checked')) {
        $(".ivr input[type=checkbox]").prop('checked', true);
        $("input[type='text'][class='ivr']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }
            if ($(obj).next('span').length == 1) {
                $(obj).next('span').show();
            }
            else {
                $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
        });
        $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'none') {
                $(obj).css('display', 'block');
            }

        });
    }
    else {
        $(".ivr input[type=checkbox]").prop('checked', false);
        $("input[type='text'][class='ivr']").each(function (i, obj) {
            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
            }
            $(obj).next('span').hide();
        });
        $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

            if ($(obj).css('display') == 'block') {
                $(obj).css('display', 'none');
                $(obj).val('');
                $(obj).removeClass('errorbox');
            }

        });
    }

});

function HideShowOnCheck(controlName, obj) {
    if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
        if ($('#Txt' + controlName + '').hasClass('errorbox')) {
            $('#Txt' + controlName + '').removeClass('errorbox');
            $('#Txt' + controlName + '').w2tag('');
            $('#Txt' + controlName + '').val('');

        }
        if (controlName.indexOf('Email') != -1) {
            $('#Txt' + controlName + '').val($('#HdnEmailId').val());
        }
        else {
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val());
        }
        $('#Txt' + controlName + '').hide();
        $('#Txt' + controlName + '').css('display', 'none');
        $('#Txt' + controlName + '').removeAttr('mandatory');
        $('#Txt' + controlName + '').next('span').hide();
    }
    else {
        $('#Txt' + controlName + '').css('display', 'block');
        if (controlName.indexOf('Email') != -1) {
            $('#Txt' + controlName + '').val($('#HdnEmailId').val());
        }
        else {
            $('#Txt' + controlName + '').val($('#HdnPhoneNo').val());
        }
        if ($('#Txt' + controlName + '').attr("mandatory") == undefined) {
            $('#Txt' + controlName + '').attr('mandatory', '1');
            if ($('#Txt' + controlName + '').next('span').length == 0) {
                $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
            else {
                $('#Txt' + controlName + '').next('span').show();
            }
        }
        else {
            if ($('#Txt' + controlName + '').next('span').length == 0) {
                $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
            }
            else {
                $('#Txt' + controlName + '').next('span').show();
            }
        }
    }
}

$(document).on("click", ".txt input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".txt input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".txtAll input[type=checkbox]").prop('checked', ischecked);//5283
});

$(document).on("click", ".email input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".email input[type=checkbox]").each(function (i, obj) {

        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".emailAll input[type=checkbox]").prop('checked', ischecked);
});

$(document).on("click", ".push input[type=checkbox]", function () {
    var ischecked = true;
    $(".push input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }

    });
    $(".pushAll input[type=checkbox]").prop('checked', ischecked);//5283
});

$(document).on("click", ".ivr input[type=checkbox]", function () {
    var ischecked = true;
    var id = $(this).attr('ID');
    var controlName = id.replace('chk', '');
    HideShowOnCheck(controlName, this);
    $(".ivr input[type=checkbox]").each(function (i, obj) {
        if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
            ischecked = false;
        }
    });
    $(".ivrAll input[type=checkbox]").prop('checked', ischecked);//5283
});

function validateEmail(tblid) {

    var ctrls = $('#' + tblid + ' [mandatory="1"]');

    for (var i = 0; i < ctrls.length; i++) {
        var ctrlName = ctrls[i].id;
        var inputype = ctrls[i].className;
        if (ctrlName != "") {

            switch (inputype) {

                case "email":
                    var email = $('#' + ctrlName).val();
                    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if ($('#' + ctrlName).val().length == "") {
                        alert("Please enter valid Email");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    else {
                        if (!filter.test(email)) {
                            alert("Please enter valid Email");
                            $('#' + ctrlName).focus();
                            return false;
                        }
                    }
                    break;

                case "txt":
                    var PhoneVal = $('#' + ctrlName).val();
                    if (($('#' + ctrlName).val().length < 14) || !($('#' + ctrlName).val().lastIndexOf('-') == 9)) {
                        alert("Please enter a valid 10 digit Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    var threenumsum = parseInt($('#' + ctrlName).val().charAt(1)) + parseInt($('#' + ctrlName).val().charAt(2)) + parseInt($('#' + ctrlName).val().charAt(3));
                    if (threenumsum <= 1) {
                        alert("Please enter a valid 10 digit Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    if (parseInt($('#' + ctrlName).val().charAt(1)) == 0) {
                        alert("Please enter a valid 10 digit Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    if ($('#' + ctrlName).val().split('-')[1].length > 4) {
                        alert("Please enter a valid 10 digit Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    break;
                case "ivr":
                    var PhoneVal = $('#' + ctrlName).val();
                    if (($('#' + ctrlName).val().length < 14) || !($('#' + ctrlName).val().lastIndexOf('-') == 9)) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    var threenumsum = parseInt($('#' + ctrlName).val().charAt(1)) + parseInt($('#' + ctrlName).val().charAt(2)) + parseInt($('#' + ctrlName).val().charAt(3));
                    if (threenumsum <= 1) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }
                    if (parseInt($('#' + ctrlName).val().charAt(1)) == 0) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    if ($('#' + ctrlName).val().split('-')[1].length > 4) {
                        alert("Please enter valid Mobile number.");
                        $('#' + ctrlName).focus();
                        return false;
                    }

                    break;

            }

        }

    }
    return true;
}

//function createmapCluster(data, mapId) {
//    map.remove();
//    var geoJsonData = data;
//    var LatLong = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]]; //["33.957577", "-117.737646"];
//    var streetMapUrl = 'https://serverapi.arcgisonline.com/jsapi/arcgis/3.3/';
//    var tiles = new L.TileLayer(streetMapUrl, { maxZoom: 19 });
//    require(["esri/map", "dojo/domReady!"], function (Map) {

//        if (data !== '' && data != null) {

//            map = L.map(mapId, {
//                center: LatLong,
//                zoom: 5
//            }).addLayer(tiles);
//            map.options.minZoom = 8;
//            map.options.maxZoom = 17;
//        }
//        else {
//            map = L.map(mapId, {
//                center: LatLong,
//                zoom: 12
//            }).addLayer(tiles).setView(LatLong, 12);

//            map.options.minZoom = 12;
//            map.options.maxZoom = 17;
//        }

//        //L.esri.basemapLayer('Streets').addTo(map);
//        map.setZoom(0);
//        var markers = L.markerClusterGroup();

//        var geoJsonLayer = L.geoJson(geoJsonData, {
//            pointToLayer: function (feature, latlng) {
//                var imagePath = "";
//                imagePath = '../Leaflet/images/marker-icon.png';
//                var smallIcon = L.icon({
//                    iconSize: [10, 10],
//                    iconAnchor: [13, 27],
//                    popupAnchor: [1, -24],
//                    iconUrl: imagePath
//                });

//                return L.marker(latlng, { icon: smallIcon });
//            },
//            onEachFeature: function (feature, layer) {
//                layer.bindPopup('<b>' + 'Customer Name : ' + '</b>' + feature.properties.CustomerName + '<br>'
//                        + '<b>' + 'Utility Account Number: ' + '</b>' + feature.properties.UtilityAccountNumber + '<br>'
//                            + '<b>' + 'Address: ' + '</b>' + feature.properties.Address1);
//            }

//        });
//        markers.addLayer(geoJsonLayer);
//        map.addLayer(markers);
//        if (data !== '')
//            map.fitBounds(markers.getBounds());

//    });


//}

function createmapCluster(data, mapId) {
    
    var geoJsonData = data;
    var LatLong = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]]; / /["33.957577", "-117.737646"];
    var streetMapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    var tiles = new L.TileLayer(streetMapUrl, { maxZoom: 19 });

    //map1 = L.map(mapId, {
    //    center: LatLong,
    //    zoom: 8
    //}).addLayer(tiles).setView(LatLong, 8);


    //map1.options.minZoom = 8;
    //map1.options.maxZoom = 17;

    if (data !== '' && data != null) {

        if(mapnew==null){
        mapnew = L.map(mapId, {
            center: LatLong,
            zoom: 5
        }).addLayer(tiles);
        }
        mapnew.options.minZoom = 8;
        mapnew.options.maxZoom = 17;
    }
    else {
        if (mapnew == null) {
            mapnew = L.map(mapId, {
                center: LatLong,
                zoom: 12
            }).addLayer(tiles).setView(LatLong, 12);
        }
        mapnew.options.minZoom = 12;
        mapnew.options.maxZoom = 17;
    }

  //  L.esri.basemapLayer('Streets').addTo(mapnew);
    mapnew.setZoom(0);
    var markers = L.markerClusterGroup();

    var geoJsonLayer = L.geoJson(geoJsonData, {
        pointToLayer: function (feature, latlng) {
            var imagePath = "";
            imagePath = '../Leaflet/images/marker-icon.png';
            var smallIcon = L.icon({
                iconSize: [10, 10],
                iconAnchor: [13, 27],
                popupAnchor: [1, -24],
                iconUrl: imagePath
            });

            return L.marker(latlng, { icon: smallIcon });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<b>' + 'Customer Name : ' + '</b>' + feature.properties.CustomerName + '<br>'
                    + '<b>' + 'Utility Account Number: ' + '</b>' + feature.properties.UtilityAccountNumber + '<br>'
                        + '<b>' + 'Address: ' + '</b>' + feature.properties.Address1);
        }

    });
    markers.addLayer(geoJsonLayer);
    mapnew.addLayer(markers);
    
}


//if (data != '' && data != null) {

//    map1 = L.map(mapId, {
//        center: LatLong,
//        zoom: 5
//    }).addLayer(tiles);//.setView(LatLong, 8);

//    map1.options.minZoom = 8;
//    map1.options.maxZoom = 17;
//}
//else {
//    map1 = L.map(mapId, {
//        center: LatLong,
//        zoom: 12
//    }).addLayer(tiles).setView(LatLong, 12);

//    map1.options.minZoom = 12;
//    map1.options.maxZoom = 17;
//}

//L.esri.basemapLayer('Streets').addTo(map1);
//map1.setZoom(0);
//var markers = L.markerClusterGroup();
//var geoJsonLayer = L.geoJson(geoJsonData, {

//    //for pin color change
//    pointToLayer: function (feature, latlng) {

//        imagePath = '../images/Map-pins/25.png';
//        var smallIcon = L.icon({
//            iconSize: [12, 12],
//            iconAnchor: [13, 27],
//            popupAnchor: [1, -24],
//            iconUrl: imagePath
//        });

//        return L.marker(latlng, { icon: smallIcon });
//    },
//    onEachFeature: function (feature, layer) {

//        var AttachmentPath = '';
//        var imagelocation = '';
//        if (feature.properties.AttachmentName != '') {
//            AttachmentUrl = '';
//            AttachmentUrl = "../Attachments/";
//            imagelocation = AttachmentUrl + feature.properties.AttachmentName;
//        }
//        if (feature.properties.Address == null)
//            feature.properties.Address = ''

//        if (feature.properties.CustomerName != '' && feature.properties.AttachmentPath != '') {
//            layer.bindPopup('<b>' + 'Customer Name : ' + '</b>' + feature.properties.CustomerName + '<br>'
//                + '<b>' + 'From : ' + '</b>' + feature.properties.Address + '<br>'
//                    + '<b>' + 'Message : ' + '</b>' + feature.properties.MessageBody + '<br>'

//                     + '<b>' + 'Address : ' + '</b>' + feature.properties.Address + '<br>'
//                    + '<img src=' + imagelocation + ' style=\'width:250px;height:150px\' alt=\'Violation\'>');


//        }
//        else if (feature.properties.CustomerName == '' && feature.properties.AttachmentPath != '') {
//            layer.bindPopup('<b>' + ' No Customer </b><br>'
//                + '<b>' + 'From : ' + '</b>' + feature.properties.Address + '<br>'
//                    + '<b>' + 'Message : ' + '</b>' + feature.properties.MessageBody + '<br>'
//                    + '<b>' + 'Address : ' + '</b>' + feature.properties.Address + '<br>'
//            + '<img src=' + imagelocation + ' style=\'width:250px;height:150px\' alt=\'Violation\'>');
//        }
//        else if (feature.properties.CustomerName == '' && feature.properties.AttachmentPath == '') {
//            layer.bindPopup('<b>' + ' No Customer </b><br>'
//                + '<b>' + 'From : ' + '</b>' + feature.properties.Address + '<br>'
//                    + '<b>' + 'Message : ' + '</b>' + feature.properties.MessageBody + '<br>'
//                    + '<b>' + 'Address : ' + '</b>' + feature.properties.Address);

//        }
//        else if (feature.properties.CustomerName != '' && feature.properties.AttachmentPath == '') {
//            layer.bindPopup('<b>' + 'Customer Name : ' + '</b>' + feature.properties.CustomerName + '<br>'
//                + '<b>' + 'From : ' + '</b>' + feature.properties.Address + '<br>'
//                    + '<b>' + 'Message : ' + '</b>' + feature.properties.MessageBody + '<br>'
//                    + '<b>' + 'Address : ' + '</b>' + feature.properties.Address);

//        }

//    }

//});

//markers.addLayer(geoJsonLayer);
//map1.addLayer(markers);
//if (data != '')
//    map1.fitBounds(markers.getBounds());
