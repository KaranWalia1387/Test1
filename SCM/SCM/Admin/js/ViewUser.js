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
var Tables, CustomerData;
var processed_jsonChart;
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
        accountno;

var colorarrHEX = ['#1f8aa7', '#a19999', '#ac4040', '#30cd94', '#cda24c', '#6ab3c8', '#a27cb0', '#28aca6', '#4d4366', '#6e8953', '#087189', '#decc00', '#f1c354'];
var mode = '1';
var databindtogrid;
var zip = '';
var GridHeight = '320px';
var ViewObj = '';
gridid = 'jqxgrid';
percentwidth = .98;
//for jqx grid
var mappoints = new Array();
var checkboxFormatter = function (row, value) {
    var EmailID = $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID;
    return "<input type='checkbox' id=" + EmailID + " name='checkboxIsBCC' class='emailCC' >";
}

$(document).ready(function () {

    $(window).resize(function () {
        try {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
            $("#jqxchildgrid").jqxGrid('setcolumnproperty', 'Edit', 'width', '170');
        }
        catch (e) { }
    });

    $('#BtnFilter').click(function () {
        submit();
        chartgraphsection(defOpen);
        createmap();//Bugid 16167
        loader.hideloader();
    });

    $('#btnSend').click(function () {
        SendNotification();

        return false;
    });

    $('.advancelink').click(function () {
        $('#btnSubmit').removeAttr('disabled');
    });

    $('#btnSubmit').click(function () {
        $(this).attr('disabled', 'disabled');
        if ($("#ddlPaperBillStatus option:selected").index() > 0 || $("#ddlTextMsgStatus option:selected").index() > 0 || $("#ddlStatus option:selected").index() > 0 || $("#ddlAccountType option:selected").index() > 0) {
            $('.advanceSearch').modal('toggle');
            submit();
        }
        else {
            alert("Please select a filter.");
            $(this).removeAttr('disabled');
            return false;
        }
        filterCreate();
    });

    $('#ddlAddress').change(function () {
        $("#location").css('height', '350px');
        var divRebate = Customer.GetCustomerProgram($('#ddlAddress').val(), 3).value;
        var divProg = Customer.GetCustomerProgram($('#ddlAddress').val(), 1).value;
        LoadAdminRebate(divRebate);
        LoadAdminProgram(divProg);     
        
        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].AccountNumber == $('#ddlAddress').val()) {
                latitude = databindtogrid[i].Latitude;
                longitude = databindtogrid[i].Longitude;
                cityname = databindtogrid[i].CityName;
                zipcode = databindtogrid[i].ZipCode;
                addr1 = databindtogrid[i].Address1;
                addr2 = databindtogrid[i].Address2;
                // load profile 
                $('#custName').html(databindtogrid[i]["Customer Name"]);              
                $('#lblCity').html(databindtogrid[i].CityName);
                $('#lblZipCode').html(databindtogrid[i].ZipCode);
                $('#statusUser').html(databindtogrid[i].Status);
                $('#accounttype').html(databindtogrid[i]["Customer Type"]);
                $('#paperBill').html(databindtogrid[i].Paperless);
                $('#lblEmailId').html(databindtogrid[i].EmailID);
                $('#lblMobile').html(databindtogrid[i].MobilePhone);
                $('#lblCreateDate').html(databindtogrid[i].CreatedDate);
                break;
            }
        }
        LoadUserMapLocation(latitude, longitude, cityname, zipcode, addr1, addr2); 
        popupdetails = Customer.LoadPopupDetailsData($('#ddlAddress').val()).value;
        LoadServiceRequestGrid(popupdetails.Tables[4].Rows);
        ServicePlans(popupdetails.Tables[0].Rows);
        LoadConnectMeRequestGrid(popupdetails.Tables[3].Rows);
        LoadPaymentGrid(popupdetails.Tables[2].Rows);
        Activenotifications(popupdetails.Tables[6].Rows);
       // MarketingPreferences(popupdetails.Tables[7].Rows);


        var divbasicDt = '';
        var address = $('#ddlAddress option:selected').val();
        for (var i = 0; i < ZipcodeDetails.length; i++) {
            if (address == ZipcodeDetails[i].Accountnumber) {              
                divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:  </b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
                $('#DivBasicDet').html('');
                $('#DivBasicDet').html(divbasicDt);              
                var param = {
                    address1: ZipcodeDetails[i].Address1 + " " + ZipcodeDetails[i].Address2,
                    zipCode: ZipcodeDetails[i].ZipCode
                }
                $.ajax({
                    type: "POST",
                    url: "Customer.aspx/PopulateDetails",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(param),
                    success: onSucess,
                    error: OnError
                });
            }
        }
    });

    function OnError(request, status, error) {
        alert('Error!! ' + request.statusText);
    }

    function onSucess(data, status) {
        //var htmText = $.parseJSON(data.d);
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
        submit();
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
        submit();
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
  //  alert('test mesaage ');
    usertable = Customer.LoadGrid(mode, txtFrom, txtTo, '', '', '', '', '', '', '', '').value;
    databindtogrid = usertable.Tables[0].Rows;
    if (databindtogrid.length == 0) {
        $('.jqgrid,#div-useremap').hide();
        $('.nodata').show();
        $('#nodata_div1').show();
        $('#nodata_div1').html('<font color="Red">No Data</font>');
        return;
    } else {
        $('.jqgrid,#div-useremap').show();
        $("#jqxgrid").height(320);
        $('.nodata').hide();
        $('#nodata_div1').hide();
    }
    LoadGrid();
    //LoadChart();
    //PiechartCommon(mode); //added chart control
    // NEW UI 12/19/2014
    // zip = ($('#ddluserzipcode').val() == null || $('#ddluserzipcode').val() == '') ? '' : $('#ddluserzipcode').val();
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

    $('#hdnParamValues').val(mode + '|' + txtFrom + '|' + txtTo + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno);

    // END NEW UI 12/19/2014

    chartgraphsection(defOpen);

    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
        var GridHeight = $(window).height() - 331;
        $("#jqxgrid").jqxGrid({ height: GridHeight });
        var modechild = ($('#ddlCity').val() != '') ? '2' : '1';
        if (modechild == 2) {
            $("#jqxchildgrid").jqxGrid({ height: GridHeight });
        }
    }, false);

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
            var messageBody = ($("#ddlMessageMode").val() != "1") ? $("#txtMessage").val() : $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").get_content();
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
            alert('Message sent.');
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
            $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").set_content("");
            $("#txtmsgsubject").val('');
            showhideeditor('0');
        }
        else { $('textarea').val(''); }
        $('#ddlMessageMode').val('');        
        $('#txtMessage').text('');
    }
    $("#ClosePopupCustomerChangepass").click(function () {
        Popup.hide('PopupChangeCustomerPassword');
});
});

$(document).on("click", ".details", function () {
    loader.showloader();
    $('#primary').addClass('active');
    $('#property').removeClass('active');
    //$('#property').addClass('active');
    $('#profile').removeClass('active');
    $('#PropAddress').removeClass('active');
    $('#locationCustomer').removeClass('active');
    $('#locations').removeClass('active');
    $('#notifications').removeClass('active');
    $('#bill_pay').removeClass('active');
    $('#serviceRequest').removeClass('active');
    $('#Servicerequests').removeClass('active');
    $('#home').addClass('active');
    $('#profile').removeClass('active');
    $('#location').removeClass('active');
    $('#notify').removeClass('active');
    $('#billpay').removeClass('active');
    $('#requests').removeClass('active');
    $('#plans').removeClass('active');
    $('#Rebate').removeClass('active');
    $('#Rebateprogram').removeClass('active');
    $('#connectMeRequest').removeClass('active');
    $('#MarketPref').removeClass('active');
    $('#Market').removeClass('active');
    $('#requests').removeClass('active');
               
    var ids = $(this).data('id');
    //var custId = $(this).data('id');
    var custId = ids.split(",")[0];
    var accnumber = ids.split(",")[1];
    $('#custId').val(custId);

    //To load propery tab details
    var custDetails = Customer.GetddlCustDetails(custId);
    ZipcodeDetails = JSON.parse(custDetails.value);
    BindDropdownPopAddress(JSON.parse(custDetails.value));
    var address = $('#ddlAddress option:selected').val();
    for (var i = 0; i < ZipcodeDetails.length; i++) {
        if (address == ZipcodeDetails[i].Accountnumber) {           
            divbasicDt = "<div class='DivProp-format'><table style='width:100%'><tr><td><b>Utility Account No:  </b></td><td><span >" + ZipcodeDetails[i].UtilityAccountNumber + "</span></td></tr><tr><td><b>City Name:   </b></td><td><span >" + ZipcodeDetails[i].CityName + "</span></td></tr><tr><td><b>Account Type:   </b></td><td><span >" + ZipcodeDetails[i].AccountType + "</span></td></tr><tr><td><b>Zipcode:    </b></td><td><span >" + ZipcodeDetails[i].ZipCode + "</span></td></tr></table></div>"
            $('#DivBasicDet').html('');
            $('#DivBasicDet').html(divbasicDt);
            break;
        }
    }
    var p = 'UserName>' + ZipcodeDetails[0].UserName + '&Password>' + ZipcodeDetails[0].Password;
    $($('.modal-header')[1]).find('a').attr('href', $('#portalweb').val() + '?key=' + Customer.Encrypt(p).value);
    $($('.modal-header')[1]).find('a').attr('target', '_new');

    //To fill admin Rebate/Program Details
    RebateDiv = Customer.GetCustomerProgram(accnumber, 3).value;
    ProgramDiv = Customer.GetCustomerProgram(accnumber, 1).value;

    LoadAdminRebate(RebateDiv);
    LoadAdminProgram(ProgramDiv);

    //Start - Load notify,payment,requests and plans tab
    popupdetails = Customer.LoadPopupDetailsData(accnumber).value;
    LoadCustomerDetails(popupdetails);
    //End
    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].CustomerId == custId) {
            $('#custName').html(databindtogrid[i]["Customer Name"]);
            $('#lblCustName').html(databindtogrid[i]["Customer Name"]);
            $('#lblLoginId').html(databindtogrid[i]["UserName"]);
            $('#lblCity').html(databindtogrid[i].CityName);
            $('#lblZipCode').html(databindtogrid[i].ZipCode);
            $('#statusUser').html(databindtogrid[i].Status);
            $('#accounttype').html(databindtogrid[i]["Customer Type"]);
            $('#paperBill').html(databindtogrid[i].Paperless);
            $('#lblEmailId').html(databindtogrid[i].EmailID);
            $('#lblMobile').html(databindtogrid[i].MobilePhone);
            $('#lblCreateDate').html(databindtogrid[i].CreatedDate);

            // Load Map Location
            latitude = databindtogrid[i].Latitude;
            longitude = databindtogrid[i].Longitude;
            cityname = databindtogrid[i].CityName;
            zipcode = databindtogrid[i].ZipCode;
            addr1 = databindtogrid[i].Address1;
            addr2 = databindtogrid[i].Address2;
            break;
        }
    
    }
    var iplogin = popupdetails.Tables[0].Rows[0]["IPAddress"] == null ? 'N/A' : popupdetails.Tables[0].Rows[0]["IPAddress"];
    var parseddate = new Date(popupdetails.Tables[0].Rows[0]["LastLoginDateTime"]);
    $('#textStatus').html(iplogin + " & " + (parseddate.getMonth() < 9 ? '0' + (parseddate.getMonth() + 1).toString() : parseddate.getMonth() + 1) + '/'
       + (parseddate.getDate() < 10 ? '0' + parseddate.getDate().toString() : parseddate.getDate()) + '/' + parseddate.getFullYear());
    loader.hideloader();
});

$(document).on("click", "#property", function () {
    if ($('#custId').val() != null && $('#custId').val() != "") {
        var customerId = $('#custId').val();
        $('#previousCustId').val($('#custId').val());
        var address = $('#ddlAddress option:selected').val();
        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].CustomerId == customerId) {                
                if (address == databindtogrid[i].AccountNumber) {
                var zipCode = databindtogrid[i].CityName + ' ' + databindtogrid[i].ZipCode;               
                var param = {
                    address1: databindtogrid[i].Address1 + ' ' + ((databindtogrid[i].Address2 == null) ? '' : databindtogrid[i].Address2),
                    zipCode: zipCode
                }
                $.ajax({
                    type: "POST",
                    url: "Customer.aspx/PopulateDetails",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(param),
                    success: onClickSucess,
                    error: OnClickError
                });

               
            }
        }
    }
    }
});

function OnClickError(request, status, error) {
    alert('Error!! ' + request.statusText);
}

function onClickSucess(data, status) {    
    $('#profile').html('');
    if (data.d == '') {
        $('#profile').html("<center><font color='Red'>No Data Available</Font></center>")
    }
    else {
        $('#profile').html(data.d);
        var divcontent = $.parseJSON(data.d);
        if (divcontent != 'undefined') {
            $('#profile').html(divcontent);
        }
        else {
            $('#profile').html(data.d);
        }
    }

}

function BindData(fnError,param) {
 
    try {
        
                $.ajax({

            type: "POST",
            url: "Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                //debugger;
                CustomerData = $.parseJSON(response.d);
                ConvertData();
                var length = parseInt(usertable.Tables[0].Rows.length);
                if (length > 0) {
    databindtogrid = usertable.Tables[0].Rows;
                    var length = parseInt(usertable.Tables[0].Rows.length);

    LoadChildGrid();
                } else {

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

function BindDropdownPopAddress(custDetails) {
    try {

        $("#ddlAddress").html('');
        $.each(custDetails, function (key, value) {
            if (value.Address2 != "")
                $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + " " + value.Address2 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
            else $('#ddlAddress').append($("<option></option>").val(value.Accountnumber).html(value.Address1 + ',' + " " + value.CityName + ',' + " " + value.StateCode + " - " + value.ZipCode));
        });        
    }
    catch (e) { }
}
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
    var ImgURL = (RebateDiv.Rows[i].ImageUrl == "") ? "../images/noimage.png" : (attachmentpath + '' + RebateDiv.Rows[i].ImageUrl);
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
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        LoadUserZipcode($(obj).text());
    }
    submit();
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
    UserStatusRights ? RegisterImg(StatusId, custId, idLock, $(this).attr('kubratoken'), $(this).attr('userdetails')) : '';
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
            //Ref Bug ID: 6243
            confirmMsg = "Are you sure you want to activate this user?";
            alertMsg = 'activated';
            status = '1';
            break;
        case 'Active':
            /*confirmMsg = "Are you sure you want to deactivate this user?";
            alertMsg = 'deactivated';
            status = '2';*/
            confirmMsg = "Are you sure you want to deactivate this user?";
            alertMsg = 'deactivated';
            status = '2';
            break;
        case 'Registered':
            // confirmMsg = "Are you sure you want to deactivate this user?";
            //alertMsg = 'deactivated';
            //status = '2';
            confirmMsg = "Are you sure you want to activate this user?";
            alertMsg = 'activated';
            status = '1';
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        changeStatusAsync(custId, status, alertMsg, idActive, StatusId, kubratoken, userdetails);
    } else {
        //alert('User is not ' + alertMsg);
    }
}
function changeStatusAsync(customerid, lockStatus, alertMsg, idActive, statusID, kubratoken, userdetails) {
    var param = {
        custid: customerid,
        status: lockStatus,
        kubratoken: kubratoken,
        userdetails: userdetails
    };
 
    $.ajax({
       
        type: "POST",
        url: "Customer.aspx/ChangeStatusAsync",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            loader.showloader();
            if (parseInt(data.d) == 1) {
                alert('User has been ' + alertMsg + ' successfully.');
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
                mode = 2;
                cityid = 1;// usertable = Customer.LoadGrid("2", '', '', '', '', '', '', '', '', '', '').value;
                var param = {
                    'mode': mode,
                    'datefrom': "",
                    'dateto': "",
                    'cityid': city,
                    'zipcode': "",
                    'username': "",
                    'customertype': "",
                    'pprbillstatus': "",
                    'textmsgstatus': "",
                    'status': "",
                    'accountno': ""
                };
                BindData(Error,param);
              
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
                alert('User has been ' + alertMsg + ' successfully.');
                if (idLock.split('_')[0].toLowerCase() == 'unlock') {
                    $('#' + idLock).attr("src", "../images/locked.png");
                    $('#' + idLock).attr("id", "Lock_" + customerid);
                }
                else {
                    $('#' + idLock).attr("src", "../images/unlocked.png");
                    $('#' + idLock).attr("id", "Unlock_" + customerid);
                }
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
            confirmMsg = "Are you sure you want to unlock this user?";
            alertMsg = 'unlocked';
            break;
        case '1':
            confirmMsg = "Are you sure you want to lock this user?";
            alertMsg = 'locked';
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        loader.showloader();       
        LockUnlockUserAsync(custId, lockcase, alertMsg, idLock);
        loader.hideloader();
    } else {
        //
    }
}

function PasswordReset(CustId) {
    $('#HiddenFieldCustid').val(CustId);
    Popup.showModal('PopupChangeCustomerPassword');
    $('#PopupChangeCustomerPassword #txtpassword').val('');
    $('#PopupChangeCustomerPassword #txtConfirmpassword').val('');


                    }
function submit() {
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
            hashtable["ddlPaperBillStatus"] = "Paper Bill";

        }
        if ($("#ddlTextMsgStatus option:selected").index() > 0) {
            hashtable["ddlTextMsgStatus"] = "Text Status";
        }
        if ($("#ddlRole option:selected").index() > 0) {
            hashtable["ddlRole"] = "Role";
        }
        if ($("#ddlStatus option:selected").index() > 0) {
            hashtable["ddlStatus"] = "Status";
        }
        if ($("#ddlAccountType option:selected").index() > 0) {
            hashtable["ddlAccountType"] = "Account Type";
        }

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        mode = ($('#ddlCity').val() != '') ? '2' : '1';

        // NEW UI 12/19/2014
        var custname = '';
        //On 10-02-2015 for adding Account Id in search panel
        // var accountno = $('#txtAccountID').val();
        var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
        var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
        var ddlStatus = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();
        //Code on 12 jan '15 for autocomplete textbox//
        //var custname = document.getElementById('txtcustomername').value();
        //custname = (custname == null || custname == '') ? '' : custname;

        var custname = ($('#txtcustomername').val() == null || $('#txtcustomername').val() == '' || $('#txtcustomername').val() == $('#txtcustomername').attr('placeholder')) ? '' : $('#txtcustomername').val();
        var accountno = ($("#txtAccountID").val() == null || $("#txtAccountID").val() == '' || $('#txtAccountID').val() == $('#txtAccountID').attr('placeholder')) ? '' : $("#txtAccountID").val();

        // Because of IE9 we have placed '$('#txtAccountID').val() == $('#txtAccountID').attr('placeholder')' this validation (Krishna Murari)

        //Removed as now no more Autocomplete is used
        //if (custname != '' && custname != null) {
        //    accountno = $("#AccountId").val();
        //}
        //Removed as now no more Autocomplete is used
        //end


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
        mode = zip != '' ? '3' : mode;

        // SERACH BUG 1/5/2015 START
        if ((mode == '3' || mode == '2') && ($('#ddlAccountType').val() != null && $('#ddlAccountType').val() != '')) {
            mode = 4;
        }

        if (mode == 4 && (ddlPaperBillStatus != '' || ddlTextMsgStatus != '' || ddlStatus != '')) {
            mode = 6;
        }
        if ($('#ddlAccountType').val() != null && $('#ddlAccountType').val() != '' && mode != 4 && mode != 6) {
            mode = 5;
        }

        //Code on 12 jan '15 for autocomplete textbox//
        //Remove as no more autocomplete
        //if (accountno != null && accountno != "") {
        //    mode = 2;
        //    custname = '';
        //}
        //Remove as no more autocomplete
        //code end


        if (custname != null && custname != "") {
            mode = 2;
        }
        if (accountno != null && accountno != "") {
            mode = 2;
        }

        // SERACH BUG 1/5/2015 END

        //  usertable = view_user.LoadGrid(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), $('#ddlCity').val(), zip, custname, $('#ddlAccountType').val(), ddlPaperBillStatus, ddlTextMsgStatus, $('#ddlStatus').val()).value;

        var param = {
            'mode': mode,
            'datefrom': $('#txtDateFrom').val(),
            'dateto': $('#txtDateTo').val(),
            'cityid': city,
            'zipcode': zip,
            'username': custname,
            'customertype': $('#ddlAccountType').val(),
            'pprbillstatus': ddlPaperBillStatus,
            'textmsgstatus': ddlTextMsgStatus,
            'status': $('#ddlStatus').val(),
            'accountno': $('#txtAccountID').val()
        };
        //  $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|' + $('#ddlCity').val() + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus);
        $('#hdnParamValues').val(mode + '|' + startDate + '|' + endDate + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno);

      // usertable = Customer.LoadGrid(mode, startDate, endDate, city, zip, custname, $('#ddlAccountType').val(), ddlPaperBillStatus, ddlTextMsgStatus, $('#ddlStatus').val(), accountno).value;
        CallAjax(Error, param);

            }
    catch (e) { }
            }

var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "IsTextMsg": return getlock(row, value, datafield); break;
        case "Paperless": return getlock(row, value, datafield); break;
        case "DeActivate": return getDeactve(row, value, datafield);
        case "Status": return getAction(row, value); break;
        case "Edit": return getResetPassword(row, value); break;
        case "Customer Name": return getView(row, value); break;
        case "CityName": return getdropDown(row, value); break;
        case "Cnt": return getdropDownCount(row, value); break;
        case "SSNNumber": return '****'; break;
        default: break;
    }
}
function LoadGrid() {
    $("#btnSend").hide();
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'CityName' },
             { name: 'CityId', type: 'number' },
         { name: 'Cnt', type: 'number' }
        ],
        //async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    //if (databindtogrid.length == 0) {
    //    $("#ibbExportPDF").attr('disabled', 'disabled');
    //    $("#ibbExportPDF").css('cursor', 'default');
    //    $("#exporttoexcel").attr('disabled', 'disabled');
    //    $("#exporttoexcel").css('cursor', 'default');
    //}
    //else {
    //    $("#ibbExportPDF").removeAttr('disabled');
    //    $("#ibbExportPDF").css('cursor', 'pointer');
    //    $("#exporttoexcel").removeAttr('disabled');
    //    $("#exporttoexcel").css('cursor', 'pointer');
    //}

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        //autoheight: autoheightPrimary,
        source: dataAdapter,
        height: GridHeight * .87,
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
            { text: 'City Name', dataField: 'CityName', width: '50%', cellsrenderer: imagerenderer },
            { text: 'Total Customers', dataField: 'Cnt', width: '50%', cellsrenderer: imagerenderer }//Bug Id 13203
        ]
    });

}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'CustomerId' },
            { name: 'AccountNumber' },
            { name: 'FirstName' },
            { name: 'LastName' },
            { name: 'BirthDate' },
            { name: 'HomePhone' },
            { name: 'Question' },
            { name: 'HintsAns' },
            { name: 'Address1' },
            { name: 'Address2' },
            { name: 'Edit' },
            { name: 'IsLocked' },
            { name: 'ResetPassword' },
            { name: 'UserName' },
            { name: 'Customer Name' },
            { name: 'EmailID' },
            { name: 'MobilePhone' },
            { name: 'Address' },
            { name: 'CityName' },
            { name: 'ZipCode', type: 'number' },
            { name: 'CreatedDate' },
            { name: 'Status' },
            { name: 'Customer Type' },
            { name: 'Status' },
            { name: 'IsTextMsg' },
            { name: 'Paperless' },
            { name: 'SSNNumber' },
            { name: 'UtilityAccountNumber' },
            { name: 'KubraToken' }
        ],
     //   async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    //Bug ID: 6396
    $("#jqxchildgrid").jqxGrid({
        width: "99.8%",

        //autoheight: false,
        height: GridHeight * .89,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        rowsheight:40,
        source: dataAdapter,
        sortable: true,
        selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        rendertoolbar: function (toolbar) {
            $("#btnSend").show();
        },
        columns:
        [
            { text: 'CustId', dataField: 'CustomerId', width: '0%', hidden: true, },
            { text: 'Account Number', dataField: 'AccountNumber', width: '0%', hidden: true },
            { text: 'FirstName', dataField: 'FirstName', width: '0%', hidden: true },
            { text: 'LastName', dataField: 'LastName', width: '0%', hidden: true },
            { text: 'BirthDate', dataField: 'BirthDate', width: '0%', hidden: true },
            { text: 'HomePhone', dataField: 'HomePhone', width: '0%', hidden: true },
            { text: 'Question', dataField: 'Question', width: '0%', hidden: true },
            { text: 'HintsAns', dataField: 'HintsAns', width: '0%', hidden: true },
            { text: 'Address1', dataField: 'Address1', width: '0%', hidden: true },
            { text: 'Address2', dataField: 'Address2', width: '0%', hidden: true },
            { text: 'Lock Status', dataField: 'IsLocked', width: '11%', hidden: true },
            { text: 'Reset Password', dataField: 'ResetPassword', width: '12%', hidden: true },
            { text: 'Username', dataField: 'UserName', width: '7%', hidden: true },
            { text: 'Mobile Phone', dataField: 'MobilePhone', width: '10%', hidden: true },
            { text: 'Created Date', dataField: 'CreatedDate', width: '11%', hidden: true },
            { text: 'Action', dataField: 'Edit', width: '20%', align: 'center', cellsrenderer: imagerenderer, hidden: !userEditRights && !UserResetPasswordRights ? true : false },
             { text: 'Status', dataField: 'Status', width: '15%', align: 'center', cellsrenderer: imagerenderer },
            { text: 'Customer Name', dataField: 'Customer Name', width: '20%', cellsrenderer: imagerenderer, },
            { text: 'Email', dataField: 'EmailID', width: '20%' },
            { text: 'Utility Account', dataField: 'UtilityAccountNumber', width: '15%' },
            //{ text: 'City Name', dataField: 'CityName', width: '10%' }, //made visible
            //{ text: 'Zip Code', dataField: 'ZipCode', width: '9%' }, // made visible
            //{ text: 'Account Type', dataField: 'Customer Type', width: '10%' },           
            { text: 'Paperless Bill Status', dataField: 'Paperless', width: '15%', align: 'center', cellsrenderer: imagerenderer },
             { text: 'DeActivateUser', dataField: 'DeActivate', width: '15%', cellsrenderer: imagerenderer, hidden: true },
            { text: 'Text Status', dataField: 'IsTextMsg', width: '18%', align: 'center', cellsrenderer: imagerenderer },
            { text: 'SSN', dataField: 'SSNNumber', width: '8%', cellsrenderer: imagerenderer, hidden: true }
            //{ text: 'Utility Account', dataField: 'UtilityAccountNumber', width: '12%' },
            
        ]
    });

    //Bug ID: 6396
    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');

        }

        //$("#jqxchildgrid").jqxGrid('autoresizecolumns');
        //$("#jqxchildgrid").jqxGrid('setcolumnproperty', 'Edit', 'width', '170');

    });

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
    //if (datafield == 'IsTextMsg') {
    //    src = value == "Active" ? "../images/green_sms.png" : "../images/gray_sms.png";
    //} else {
    // src = value == "Active" ? "../images/green_circle.png" : "../images/gray_circle.png";
    //}
    //return '<div style="text-align: center;"><img style="padding-top:8px;" src=' + src + ' /></div>';
    return '<div style="text-align: center;"><img style="padding-top:8px;" src="../images/green_circle.png" id="deActivate" onclick="fun()" /></div>';
}

function getdropDown(row, value) {
    CityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    City = $('#jqxgrid').jqxGrid('getrowdata', row).CityName;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop >' + City + '</span></div>';

}
function getdropDownCount(row, value) {
    CityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;
    Count = $('#jqxgrid').jqxGrid('getrowdata', row).Cnt;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop >' + Count + '</span></div>';

}
//for get lock icon showing in grid
function getView(row, value) {

    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    Accnumber = $('#jqxchildgrid').jqxGrid('getrowdata', row).AccountNumber;
    var CustName = $('#jqxchildgrid').jqxGrid('getrowdata', row)["Customer Name"];
    return '<div style="padding-left:5px; display:block; width:20%; padding-top:13px;"><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userDetails">' + CustName + '</a></div>';
}

//for get status icon showing in grid
function getAction(row, value) {
    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var kubratoken = $('#jqxchildgrid').jqxGrid('getrowdata', row).KubraToken;
    var userdetails = $('#jqxchildgrid').jqxGrid('getrowdata', row).FirstName + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).LastName + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).EmailID + '|' + $('#jqxchildgrid').jqxGrid('getrowdata', row).AccountNumber;
    var src = value == 'Registered' ? "<span class='active_new registered_grid'>Registered</span>" : value == "Active" ? "<span class='active_new' style='display:inline-block;color: #94d60a;'>Active</span>" : "<span class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
    var imgid = value + '_' + CustId;  
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid + '" class="registerimg" kubratoken=' + kubratoken + ' userdetails=' + userdetails + '>' + src + '</span></a></div>';
}

//for get reset password icon showing in grid
function getResetPassword(row, value, datafield) {

    var CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var img = $('#jqxchildgrid').jqxGrid('getrowdata', row).IsLocked;
    var src = img == "Lock" ? "../images/locked.png" : "../images/unlocked.png";
    var style = img == "Lock" ? "25px" : "20px";
    var anchorid = 'Reset' + CustId;
    var LockStatus = $('#jqxchildgrid').jqxGrid('getrowdata', row).IsLocked;
    var imgid = LockStatus + '_' + CustId;
    //if (datafield == 'ResetPassword') return '<div id="' + anchorid + '" style="text-align: center;"><a href="#" ><img id="' + CustId + '" src="../images/icons_password.png" class="Gridimage" style="height:25px; width:25px;"/></a></div>';
    //else

    var editButton = userEditRights ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; margin-top:10px;" href="UserManagement.aspx?CustId=' + CustId + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i>' : '';
    var lockButton = userEditRights ? '<a style=" margin-top:10px; display:block;"><img id=' + imgid + ' class="lockimg" title="Lock/Unlock" src=' + src + ' /></a>' : '';
    var resetPwdButton = UserResetPasswordRights ? '<div id="' + anchorid + '" style="text-align: center; margin-top:10px;"><a href="#" ><img id="' + CustId + '" src="../images/pass.png" class="Gridimage extra" style="margin-top:-1px;" title="Change Password"/></a></div>' : '';
    return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + lockButton + '</td><td style="Padding-Left:8px; margin-top:10px;">' + resetPwdButton + '</td></tr></table></center>';
}

// cancel state of reset position
function CancelState(CustId) {
    var imgiconpwd = '<a href="#" style=" margin-top:10px;"><img id="' + CustId + '" src="../images/pass.png" class="Gridimage extra" style="margin-top:-1px;"/></a>';
    $('#Reset' + CustId).html(imgiconpwd);
}
function ValidatePassword(Password) {
    if (Password == "") { return true; }
    else {
        if (Password.length < 8 || Password.length > 30) {
            alert("Password length should be between 8 to 30 character");
            return false;
        }
        var pwdReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)./;
        if (!pwdReg.test(Password)) {
            alert("Password must contains 1 Numeric, 1 Character in uppercase, 1 Special character & cannot contains Spaces");
            return false;
        }
        return true;
    }
}
function RefreshGrid() {
    // NEW UI 12/19/2014
    //usertable = view_user.LoadGrid(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), $('#ddlCity').val(), zip, $('#ddlAccountType').val(), $('#ddlStatus').val(), $('#ddlRole').val(), '', '').value;

    // Function Caling from Submt function
    //usertable = view_user.LoadGrid(mode, $('#txtDateFrom').val(), $('#txtDateTo').val(), city, zip, $('#ddlAccountType').val(), $('#ddlStatus').val(), $('#ddlRole').val(), '', '').value;
    //databindtogrid = usertable.Tables[0].Rows;
    submit();
    filterCreate();
    //if (mode == '1')
    //    LoadGrid();
    //else
    //    LoadChildGrid();

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

    //$.map(tempTable.Rows, function (obj, i) {
    //    if (obj.CityName.trim().toLowerCase() == name || obj.ZipCode == name) {
    //        var cusType = obj.CustomerType != undefined ? obj.CustomerType : obj["Customer Type"];
    //        cusType.toLowerCase() == 'residential' ? cusResidential++ : cusCommercial++;
    //        obj.Status.toLowerCase() == 'registered' ? statusRegistered++ : obj.Status.toLowerCase() == 'active' ? statusActive++ : statusInactive++;
    //    }
    //});
    //processed_json.push({
    //    name: 'Registered',
    //    y: statusRegistered,
    //    color: 'yellow',
    //    title: 'Registered'

    //});
    //processed_json.push({
    //    name: 'Active',
    //    y: statusActive,
    //    color: 'green',
    //    title: 'Active'

    //});
    //processed_json.push({
    //    name: 'InActive',
    //    y: statusInactive,
    //    color: 'red',
    //    title: 'InActive'

    //});
    //processed_json1.push({
    //    name: 'Residential',
    //    y: cusResidential,
    //    color: 'green',
    //    title: 'Residential'

    //});
    //processed_json1.push({
    //    name: 'Commercial',
    //    y: cusCommercial,
    //    color: 'red',
    //    title: 'Commercial'

    //});

    //if (type == 'Zipcode') {
    //    //$('#subChart1').html("<b>" + 'Status-Zipcode' + "</b>");
    //    $('#subChart2').html("<b>" + 'Account Type-Zipcode' + "</b>");
    //} else {
    //    $('#subChart1').html("<b>" + 'Status-City' + "</b>");
    //    $('#subChart2').html("<b>" + 'Account Type-City' + "</b>");
    //}
    //switch (chartType) {
    //    case 'pie':
    //        createchartWithSeries('i0', 'div-subChart1', processed_json, 'Status');
    //        createchartWithSeries('i0', 'div-subChart2', processed_json1, 'CustomerType');
    //        break;
    //    case 'column':
    //        createchartWithSeries('i1', 'div-subChart1', processed_json, 'Status');
    //        createchartWithSeries('i1', 'div-subChart2', processed_json1, 'CustomerType');
    //        break;
    //    case 'line':
    //        createchartWithSeries('i2', 'div-subChart1', processed_json, 'Status');
    //        createchartWithSeries('i2', 'div-subChart2', processed_json1, 'CustomerType');
    //        break;
    //    case 'area':
    //        createchartWithSeries('i3', 'div-subChart1', processed_json, 'Status');
    //        createchartWithSeries('i3', 'div-subChart2', processed_json1, 'CustomerType');
    //        break;
    //}

}

//function subBackToMain(chartType, type, name) {
//    $('#subChart1').html("<b>" + 'Status' + "</b>");
//    $('#subChart2').html("<b>" + 'Account Type' + "</b>");
//    var pieChartTable1 = usertable.Tables[1];
//    if (name != undefined && name.toLowerCase() == 'zipcode')
//        pieChartTable1 = usertable.Tables[2];
//    var subChart1Series = new Array();
//    var subChart2Series = new Array();
//    $.map(pieChartTable1.Rows, function (obj, i) {

//        subChart1Series.push({
//            name: obj.Status,
//            y: obj.Cnt,
//            color: colorarrHEX[i],
//            title: obj.Status
//        });
//    });

//    var pieChartTable2 = usertable.Tables[2];
//    if (name != undefined && name.toLowerCase() == 'zipcode')
//        pieChartTable1 = usertable.Tables[23];
//    $.map(pieChartTable2.Rows, function (obj, i) {

//        subChart2Series.push({
//            name: obj.CustomerType,
//            y: obj.Cnt,
//            color: colorarrHEX[i],
//            title: obj.CustomerType
//        });
//    });

//    switch (chartType) {
//        case 'pie':
//            createchartWithSeries('i0', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i0', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'column':
//            createchartWithSeries('i1', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i1', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'line':
//            createchartWithSeries('i2', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i2', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//        case 'area':
//            createchartWithSeries('i3', 'div-subChart1', subChart1Series, 'Paid');
//            createchartWithSeries('i3', 'div-subChart2', subChart2Series, 'Unpaid');
//            break;
//    }
//}

//function PiechartCommon(mode, caseId) {

//    var tempvalue;
//    $('#subChart2').show();
//    $('#subChart1').show();
//    $('#div-mainChart').height(150);
//    $('#borderline').show();
//    LoadChart();

//    switch (mode) {
//        case 1:
//        case "1":
//            tempvalue = usertable.Tables[0];
//            $('#subChart1').html("<b>" + 'Status' + "</b>");
//            $('#subChart2').html("<b>" + 'Account Type' + "</b>");
//            break;
//        case 2:
//        case "2":
//            tempvalue = usertable.Tables[1];
//            $('#subChart1').html("<b>" + 'Status' + "</b>");
//            $('#subChart2').html("<b>" + 'Account Type' + "</b>");
//            break;
//        case 3:
//        case "3":
//            tempvalue = usertable.Tables[1];
//            $('#subChart1').html("<b>" + 'Status' + "</b>");
//            $('#subChart2').html("<b>" + 'Account Type' + "</b>");
//            break;
//        case 4:
//        case "4":
//            tempvalue = usertable.Tables[1];
//            $('#div-subChart').hide();
//            $('#borderline').hide();
//            $('#div-mainChart').height('335');
//            break;
//        case 5:
//        case "5":
//            tempvalue = usertable.Tables[1];
//            $('#subChart1').html("<b>" + 'ZipCode' + "</b>");
//            $('#subChart2').html("<b>" + 'Status' + "</b>");
//            break;
//        case 6:
//        case "6":
//            tempvalue = usertable.Tables[2];
//            $('#subChart1').html("<b>" + 'Locked Status' + "</b>");
//            $('#subChart2').html("<b>" + 'Status' + "</b>");
//            break;
//    }

//    var piechart = tempvalue.Rows;

//    if (piechart.length > 0) {
//        $('#div-Userchart').show();
//        $('#nodata_div').hide();
//        $('#nodata_div1').hide();
//    } else {
//        $('#nodata_div').show();
//        $('#nodata_div1').show();
//        $('#nodata_div').html('<font color="Red">No Data</Font>');
//        $('#nodata_div1').html('<font color="Red">No Data</Font>');
//        $('#div-Userchart').hide();
//        $('#jqxgrid').hide();
//        $('#jqxchildgrid').hide();
//        $('#UserTitle').hide();
//    }

//    //Modified by Ruchika Chauhan on 27-Feb-2015 for Bug # 6399
//    var title;
//    if ($('#txtDateFrom').val() != '' && $('#txtDateTo').val() != '') {
//        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
//    }
//    else {
//        title = '';
//    }
//    //    var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
//    $('#UserTitle').html("<b>" + title + "</b>");

//    processed_json = new Array();
//    switch (mode) {
//        case 1:
//        case "1":
//            {
//                $.map(piechart, function (obj, i) {
//                    processed_json.push({
//                        name: obj.CityName,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.CityName,
//                        drilldown: 'City'
//                    });
//                });
//            }
//            break;
//        case 2:
//        case "2":
//            {
//                $.map(piechart, function (obj, i) {
//                    processed_json.push({
//                        name: obj.Zipcode,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Zipcode,
//                        drilldown: 'mode'
//                    });
//                });
//            }
//            break;
//        case 3:
//        case "3":
//            {
//                $.map(piechart, function (obj, i) {

//                    processed_json.push({
//                        name: obj.ZipCode,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.ZipCode
//                    });
//                });
//            }
//            break;
//        case 4:
//        case "4":
//            {
//                $.map(piechart, function (obj, i) {
//                    processed_json.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });
//            }
//            break;
//        case 5:
//        case "5":
//            {
//                $.map(piechart, function (obj, i) {
//                    processed_json.push({
//                        name: obj.CityName,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.CityName
//                    });
//                });
//            }
//            break;
//        case 6:
//        case "6":
//            {
//                $.map(piechart, function (obj, i) {
//                    processed_json.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });
//            }
//            break;
//    }


//    var subChart1Series = new Array();
//    var subChart2Series = new Array();
//    var pieChart1Index = 0;
//    var pieChart2Index = 0;
//    var pieChartTable1;
//    var pieChartTable2;
//    switch (mode) {
//        case 1:
//        case "1":
//            {
//                pieChartTable1 = usertable.Tables[1];
//                $.map(pieChartTable1.Rows, function (obj, i) {

//                    subChart1Series.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });

//                pieChartTable2 = usertable.Tables[2];
//                $.map(pieChartTable2.Rows, function (obj, i) {

//                    subChart2Series.push({
//                        name: obj.CustomerType,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.CustomerType
//                    });
//                });
//            }
//            break;
//        case 2:
//        case "2":
//            {
//                pieChartTable1 = usertable.Tables[2];
//                $.map(pieChartTable1.Rows, function (obj, i) {

//                    subChart1Series.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });

//                pieChartTable2 = usertable.Tables[3];
//                $.map(pieChartTable2.Rows, function (obj, i) {

//                    subChart2Series.push({
//                        name: obj.CustomerType,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.CustomerType
//                    });
//                });
//            }
//            break;
//        case 3:
//        case "3":
//            {
//                pieChartTable1 = usertable.Tables[2];
//                $.map(pieChartTable1.Rows, function (obj, i) {
//                    subChart1Series.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });

//                pieChartTable2 = usertable.Tables[3];
//                $.map(pieChartTable2.Rows, function (obj, i) {

//                    subChart2Series.push({
//                        name: obj.CustomerType,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.CustomerType
//                    });
//                });
//            }
//            break;
//        case 5:
//        case "5":
//            {
//                pieChartTable1 = usertable.Tables[2];
//                $.map(pieChartTable1.Rows, function (obj, i) {

//                    subChart1Series.push({
//                        name: obj.ZipCode,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.ZipCode
//                    });
//                });

//                pieChartTable2 = usertable.Tables[3];
//                $.map(pieChartTable2.Rows, function (obj, i) {

//                    subChart2Series.push({
//                        name: obj.Status,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.Status
//                    });
//                });
//            }
//            break;
//        case 6:
//        case "6":
//            {
//                pieChartTable1 = usertable.Tables[3];
//                $.map(pieChartTable1.Rows, function (obj, i) {

//                    subChart1Series.push({
//                        name: obj.IsLocked,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.IsLocked
//                    });
//                });

//                pieChartTable2 = usertable.Tables[5];
//                $.map(pieChartTable2.Rows, function (obj, i) {

//                    subChart2Series.push({
//                        name: obj.IsTextMsg,
//                        y: obj.Cnt,
//                        color: colorarrHEX[i],
//                        title: obj.IsTextMsg
//                    });
//                });
//            }
//            break;
//    }
//    if (mode == 2) {
//        createchart(caseId, 'div-mainChart', 'ZipCode'); //function writtion in common-function.js
//    }
//    else if (mode == 1) {
//        createchart(caseId, 'div-mainChart', 'City');
//    }
//    else
//        createchart(caseId, 'div-mainChart'); //function writtion in common-function.js
//    if (piechart.length > 0) {
//        createchartWithSeries(caseId, 'div-subChart1', subChart1Series);
//        $('#subChart1-nodata').hide();
//        $('#nodata_div1').hide();
//    }
//    else {
//        createchartWithSeries(caseId, 'div-subChart1', []);
//        $('#subChart1-nodata').show();
//        $('#nodata_div1').show();
//    }

//    if (piechart.length > 0) {
//        createchartWithSeries(caseId, 'div-subChart2', subChart2Series);
//        $('#subChart2-nodata').hide();
//        $('#nodata_div1').hide();
//    }
//    else {
//        createchartWithSeries(caseId, 'div-subChart2', []);
//        $('#subChart1-nodata').show();
//        $('#nodata_div1').show();
//    }

//}

//Start - Show all customer details in popup
function LoadCustomerDetails(popupdetails) {
    Activenotifications(popupdetails.Tables[6].Rows);
    //BillPayments(popupdetails.Tables[1]);
    //ServiceRequests(popupdetails.Tables[2]);
    LoadBillGrid(popupdetails.Tables[1].Rows);
    LoadPaymentGrid(popupdetails.Tables[2].Rows);
    //LoadRequestGrid(popupdetails.Tables[3].Rows);
    LoadConnectMeRequestGrid(popupdetails.Tables[3].Rows);
    LoadServiceRequestGrid(popupdetails.Tables[4].Rows)
    ServicePlans(popupdetails.Tables[0].Rows);
    MarketingPreferences(popupdetails.Tables[6].Rows);

}

function MarketingPreferences(preferenceData)
{
    for (var i = 0; i < preferenceData.length; i++) 
    {
        if (preferenceData[i].PreferenceName == "News Releases") 
        {            
            $('#lblNewsRelease').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
        else if (preferenceData[i].PreferenceName == "Service Offerings") 
        {
            $('#lblSrvcOff').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
        else if (preferenceData[i].PreferenceName == "Newsletters") 
        {
            $('#lblNewsletter').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
        else if (preferenceData[i].PreferenceName == "Energy Savings Toolkits") 
        {
            $('#lblEnrgyToolkt').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
        else if (preferenceData[i].PreferenceName == "Cool Tips Brochures") 
        {
            $('#lblBrochures').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
        else (preferenceData[i].PreferenceName == "Community Benefit Programs")
        {
            $('#lblCommBnftProgs').html(preferenceData[i]["IsEnabled"]==0?"Not Opted":"Opted");
        }
    }
}

function Activenotifications(notificationdata) {
    for (var i = 0; i < notificationdata.length; i++) {
        if (notificationdata[i].NotificationType == "Text") {
            $('#lbltextnotify').html(notificationdata[i]["NotificationValues"]);
        }
        if (notificationdata[i].NotificationType == "Email") {
            $('#lblemailnotify').html(notificationdata[i]["NotificationValues"]);
        }
        if (notificationdata[i].NotificationType == "Push") {
            $('#lblpushnotify').html(notificationdata[i]["NotificationValues"]);
        }
        if (notificationdata[i].NotificationType == "IVR") {
            $('#lblivrnotify').html(notificationdata[i]["NotificationValues"]);
        }
        if (notificationdata[i].NotificationType == "Budget_Limit") {
            $('#lblbudgetnotify').html(notificationdata[i]["NotificationValues"]);
        }        
        if (notificationdata[i].NotificationType == "Quiet_Hours") {
            $('#lblquiethours').html(notificationdata[i]["NotificationValues"]);
        }
    }
}
//function BillPayments(billdata) {
//}
//function ServiceRequests(servicedata) {
//}
function ServicePlans(plansdata) {
    var noservicemessage = "Not Subscribed";
    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
        $('#lblpowerplan').html(plansdata[0]["PowerPlanName"]);

    }
    else {
        $('#lblpowerplan').html(noservicemessage);
    }
    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
        $('#lblwaterplan').html(plansdata[0]["WaterPlanName"]);
    }
    else {
        $('#lblwaterplan').html(noservicemessage);
    }
    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
        $('#lblgasplan').html(plansdata[0]["GasPlanName"]);
    }
    else {
        $('#lblgasplan').html(noservicemessage);
    }
    if (plansdata[0].PowerPlanName != null && plansdata[0].PowerPlanName != "") {
        $('#lblevplan').html(plansdata[0]["ElectricVehiclePlan"]);
    }
    else {
        $('#lblevplan ').html(noservicemessage);
    }
}



function LoadBillGrid(billdata) {
    autoheightPrimary = false;
    if (billdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'BillingDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'BillingId', type: 'number' },
         { name: 'BillAmountThisPeriod' },
         { name: 'TranPayStatusDesc' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: billdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridbill").jqxGrid({
        width: "100%",
        height: GridHeight * .29,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        //autoheight: autoheightPrimary,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Bill Id', dataField: 'BillingId', width: '0%', hidden: true },
            { text: 'Bill Date', dataField: 'BillingDate', width: '30%', cellsformat: "MMMM dd,yyyy" },
            { text: 'Bill Amount($)', dataField: 'BillAmountThisPeriod', width: '30%' },
            { text: 'Bill Pay Status', dataField: 'TranPayStatusDesc', width: '40%' }
        ]
    });

}

function LoadServiceRequestGrid(requestdata) {
    autoheightPrimary = false;
    if (requestdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'MessageId', type: 'number' },
         { name: 'MessageBody' },
         { name: 'Reason' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: requestdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxServicegrid").jqxGrid({
        width: "100%",
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
       // autoheight: autoheightPrimary,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
            { text: 'Service Type', dataField: 'Reason', width: '30%' },
            { text: 'Message', dataField: 'MessageBody', width: '40%' },
            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
        ]
    });

}
function LoadConnectMeRequestGrid(requestdata) {
    autoheightPrimary = false;
    if (requestdata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'CreatedDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'MessageId', type: 'number' },
         { name: 'MessageBody' },
         { name: 'Reason' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: requestdata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridrequest").jqxGrid({
        width: "100%",
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        //autoheight: autoheightPrimary,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Message Id', dataField: 'MessageId', width: '0%', hidden: true },
            { text: 'Reason', dataField: 'Reason', width: '30%' },
            { text: 'Message', dataField: 'MessageBody', width: '40%' },
            { text: 'Request Date', dataField: 'CreatedDate', width: '30%', cellsformat: "MMMM dd,yyyy" }
        ]
    });

}

function LoadPaymentGrid(paydata) {
    autoheightPrimary = false;
    if (paydata.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
         { name: 'TransactionConDate', type: 'date', sorttype: "date", datefmt: "mm/dd/yyyy" },
             { name: 'BillingTransactionId', type: 'number' },
         { name: 'TransactionAmount' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: paydata
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgridpayment").jqxGrid({
        width: "100%",
        height: GridHeight * .25,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
     //   autoheight: autoheightPrimary,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: false,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Transaction Id', dataField: 'BillingTransactionId', width: '0%', hidden: true },
            { text: 'Payment Date', dataField: 'TransactionConDate', width: '50%', cellsformat: "MMMM dd,yyyy" },
            { text: 'Payment Amount($)', dataField: 'TransactionAmount', width: '50%' }
        ]
    });

}
//Send - Show all customer details in popup

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
        alert('There is no row selected');
        return;
    }

    $('#ddltypeofmessage').val('');
    $('#ddlMessageMode').val('0');
    $('#txtmsgsubject').val('');
    $('#txtMessage').val('');
    showhideeditor($("#ddlMessageMode").val());

    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
}

function validateconfiguration() {
    var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

    var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
    var value = objEditor.get_content();
    if (value == "" && ($('#ddlMessageMode').val()) == "1") {
        alert('Please Enter Message');
        isvalid = false;
    }

    return isvalid;
}

function ChangePassword()
{
    if (ValidatePage('PopupChangeCustomerPassword')) {
        if ($('#PopupChangeCustomerPassword #txtpassword').val() != $('#PopupChangeCustomerPassword #txtConfirmpassword').val())
    {
        alert('Passwords do not match, please enter the same password.');
    }
    else
    {
        var CustId= $('#HiddenFieldCustid').val();
        if (ValidatePassword($('#txtpassword').val())) {
            if (confirm("Are you sure you want to reset user password?")) {
                var users;
                var emailId = '';
                var userName = '';
                if (mode != 6)
                    users = usertable.Tables[0].Rows;
                else
                    users = usertable.Tables[6].Rows;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].CustomerId == CustId) {
                        emailId = users[i].EmailID;
                        userName = users[i].FirstName + ' ' + users[i].LastName;
                        break;
                    }
                }
                var result = Customer.ResetPassword(CustId, $('#PopupChangeCustomerPassword #txtpassword').val(), emailId, userName).value;
                if (result != '') {
                    // ViewObj.Password = $('#txt' + CustId).val();
                    CancelState(CustId);
                    alert('Password reset successfully.');
                    $('#txtpassword').val('');
                    $('#txtConfirmpassword').val('');
                    Popup.hide('PopupChangeCustomerPassword');
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
        $(".texttype").addClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $("#txtEditor").attr('mandatory', '1');
        $("#txtmsgsubject").attr('mandatory', '1');
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        $("#txtMessage").attr('mandatory', '1');
        $("#txtEditor").removeAttr('mandatory');
        $("#txtmsgsubject").attr('mandatory', '0');
        getLength();
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
    var txtbxlength = (textbox == 0 || textbox == 2) ? 140 : 140;
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

///added by priyansha
///Bug id-9010 
// This function reset all fields of advance search on reset button click
function resetAdvanceSearch() {
    $('#ddlAccountType').val('');
    $('#ddlStatus').val('');
    $('#ddlPaperBillStatus').val('');
    $('#ddlTextMsgStatus').val('');
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
            url: "Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                CustomerData = $.parseJSON(response.d);
                ConvertData();
                var length = parseInt(usertable.Tables[0].Rows.length);
                if (length > 0) {
                    databindtogrid = usertable.Tables[0].Rows;
                    var length = parseInt(usertable.Tables[0].Rows.length);

                    showdata();
                    //  LoadGrid();
                } else {
                    loader.hideloader();
                    $('#nodata_div').show();
                    $('#jqxgrid').hide();
                }
                loader.hideloader();
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        
        })
    }
    catch (e) { loader.hideloader(); }

}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(CustomerData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        usertable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function showdata() {
    
    // END NEW UI 12/19/2014
    if (mode == 3 || mode == 2) {
        mappoints = usertable.Tables[0];
        $("#mapView").show();
    }

    else {
        chartgraphsection(1);
        $("#mapView").hide();
    }
    databindtogrid = usertable.Tables[0].Rows;
    if (mode == 6)
        databindtogrid = usertable.Tables[6].Rows;
    if (databindtogrid.length == 0) {
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        $('.jqgrid,#div-useremap').hide();
        $('#div-mainChart').hide();
        //$('.nodata').show();
        $('#div-UserChart').hide();
        $('#nodata_div1').show();
        $('#nodata_div1').html('<font color="Red">No Data</font>');
    }
    else {
        $('.jqgrid,#div-useremap').show();
        $('.nodata').hide();
        $('#div-mainChart').show();
        $('#div-UserChart').show();
        $('#nodata_div1').hide();
    }
    /*#4101-start*/
    if (mode == 2 || mode == 3) {
        try {
            mappoints = [];
            var lat = 0;
            var lng = 0
            for (var i = 0; i < usertable.Tables[0].Rows.length; i++) {
                mappoints.push({
                    lat: usertable.Tables[0].Rows[i].Latitude,
                    lng: usertable.Tables[0].Rows[i].Longitude,
                });
            }
            if (ismap) {
                createmap();
            }
        }
        catch (e) {

        }
    }
    else {
        mappoints = [];
        if (ismap) { createmap(); }
    }
    /*#4101-end*/
    if (databindtogrid.length > 0) {
        $('#div-subChart').show();
        if (mode == '1') {
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            //PiechartCommon(mode); //added chart control
            gridid = 'jqxgrid';
            LoadGrid();
        }
        else {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            //PiechartCommon(mode);
            gridid = 'jqxchildgrid';
            LoadChildGrid();
        }
        $('#divExport').attr('disabled', false);

        chartgraphsection(defOpen);


    }
    else {
        $('#divExport').attr('disabled', true);
        $('#nodata_div1').show();
        $('#div-subChart').hide();
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
    }
}

//***********************************************

function switchview(viewshow, viewhide, viewhide2) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        // callmethodfordrow(viewshow);
        //if (type == 'dashboard') {
        //    $('#' + viewshow).css('height', 205);
        //}
        //else {
        //}
        document.getElementById(viewhide).style.display = 'none';
        if (viewhide2 != null || viewhide2!= undefined)
        document.getElementById(viewhide2).style.display = 'none';
        chartSelect(viewshow);
        // $(".jqgrid:visible").jqxGrid('updatebounddata');
    }
    catch (e) { }
}

function chartSelect(ID)
{
    var i = 0;
    if (mode != 1)
    {
        i = 1;
    }
    switch(ID)
    {
        case 'Statuschart':
            var Active = usertable.Tables[i+1].Rows[0]["Cnt"];
            var Inactive = usertable.Tables[i + 1].Rows[1]["Cnt"];
            var Registered = usertable.Tables[i + 1].Rows[2]["Cnt"];
            createStatus('Statuschart', Active + Inactive + Registered, Active, Inactive, Registered);
            break;
        case 'Statusbargraph':
            if (usertable.Tables[i + 1] != null) {
                processed_jsonChart = new Array();
                var Statusrow = usertable.Tables[i + 1].Rows;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.Status,
                        y: obj.Cnt,
                        title: obj.Status,
                        color: colorarrHEX[i]
                    });
                });
            }
            BindCRMheigh('column', 'Statusbargraph');
            break;
        case 'gridStatus':
           
            if (usertable.Tables[i + 1] != null) {
                processed_jsonChart = new Array();
                var Statusrow = usertable.Tables[i + 1].Rows;
                $.map(Statusrow, function (obj, i) {
                    processed_jsonChart.push({
                        Name: obj.Status,
                        Count: obj.Cnt,
                    });
                });
            }
            LoadGridChart('gridStatus', processed_jsonChart);
            break;
        case 'Acctypechart':
            var Commercial = usertable.Tables[i + 2].Rows[0]["Cnt"];
            var Residential = usertable.Tables[i + 2].Rows[1]["Cnt"];
            createAccountType('Acctypechart', Commercial + Residential, Commercial, Residential);
            break;
        case 'Acctypegrid':

            if (usertable.Tables[i + 2] != null) {
                processed_jsonChart = new Array();
                var row = usertable.Tables[i + 2].Rows;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        Name: obj.CustomerType,
                        Count: obj.Cnt,
                    });
                });
            }
            LoadGridChart('Acctypegrid', processed_jsonChart);
            break;

            break;
        case 'Acctypebargraph':
            if (usertable.Tables[i + 2] != null) {
                processed_jsonChart = new Array();
                var row = usertable.Tables[i + 2].Rows;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CustomerType,
                        y: obj.Cnt,
                        title: obj.CustomerType,
                        color: colorarrHEX[i]
                    });
                });
            }
            BindCRMheigh('column', 'Acctypebargraph');
            break;
        case 'Chartbox':
            $('#achartbox').removeClass('active');
            $('#agridbox').addClass('active');
            break;
        case 'gridbox':
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
function changeActiveClass(ID)
{
    $('#btnSend').hide();
    $('#pieGraph').addClass('pie').removeClass('activePie');
    $('#gridView').addClass('grid').removeClass('activeGrid');
    $('#mapView').addClass('map1').removeClass('activeMap');
    if(ID=='graphDiv')
    {
        $('#btnSend').show();
        $('#gridView').addClass('activeGrid').removeClass('grid');
    }
    else if(ID=='chartDiv')
    {
        $('#pieGraph').addClass('activePie').removeClass('pie');
    }
    else if (ID == 'mapDiv') {

    }
}


function LoadChart() {
    try {
        var i=0
        if (mode != 1)
        {
            i = 1;
        }
        var Active = usertable.Tables[i+1].Rows[0]["Cnt"];
        var Inactive = usertable.Tables[i+1].Rows[1]["Cnt"];
        var Registered = usertable.Tables[i+1].Rows[2]["Cnt"];
        createStatus('Statuschart', Active + Inactive + Registered, Active, Inactive, Registered);
        var Commercial = usertable.Tables[i+2].Rows[0]["Cnt"];
        var Residential = usertable.Tables[i+2].Rows[1]["Cnt"];
        createAccountType('Acctypechart', Commercial + Residential, Commercial, Residential);

        //if (usertable.Tables[i] != null) {
        //    processed_jsonChart = new Array();
        //    var row = usertable.Tables[i].Rows;
        //    $.map(row, function (obj, i) {
        //        processed_jsonChart.push({
        //            name: obj.CityName,
        //            y: obj.Cnt,
        //            title: obj.CityName,
        //            color: colorarrHEX[i]
        //        });
        //    });
        //}

        if(mode==1)
        {
            if (usertable.Tables[i] != null) {
                processed_jsonChart = new Array();
                var row = usertable.Tables[i].Rows;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.CityName,
                        y: obj.Cnt,
                        title: obj.CityName,
                        color: colorarrHEX[i]
                    });
                });
            }
        }
        else
        {
            if (usertable.Tables[i] != null) {
                processed_jsonChart = new Array();
                var row = usertable.Tables[i].Rows;
                $.map(row, function (obj, i) {
                    processed_jsonChart.push({
                        name: obj.Zipcode,
                        y: obj.Cnt,
                        title: obj.Zipcode,
                        color: colorarrHEX[i]
                    });
                });
            }
        }
        BindCRMheigh('column', 'Chartbox');
        LoadGridCustomer('gridbox',processed_jsonChart);
    } catch (e) {
        alert(e.toString());
    }
}

function createStatus(divid, total, active, Inactive,Registered) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -25
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
                data: [["Active", active], ["Inactive", Inactive], ["Registered", Registered]],
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

function createAccountType(divid, total, Commercial , Residential) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -25
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
                data: [["Commercial", Commercial], ["Residential", Residential]],
                colors: [colorarrHEX[0], colorarrHEX[1], colorarrHEX[2]],
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
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
    }
    catch (e) { alert(e.toString()); }
}
function LoadGridCustomer(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
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
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
    }
    catch (e) { alert(e.toString()); }
}
function BindCRMheigh(type, id, showindecimal, name) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        //chart: { zoomType: 'xy' },
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
            //zoomType: 'xy'
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
            //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
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
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
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
                return this.point.title + ' : <b>' + Math.abs(this.y) + '<b>';
                // + ' ' + this.series.tooltipOptions.valueSuffix + '<b>';
                //if (this.point.series.yAxis.axisTitle!=null)
                //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
            }
        },
        series: [{
            showInLegend: false,
            type: type,
            name: name,
            data: processed_jsonChart,
            color: colorarrHEX[0]
            //colorByPoint: (showcolors && (type == 'column'))


        }
        ],
        //drilldown: {
        //    series: [{
        //        id: 'Paid',
        //        name: 'Paid',
        //        data: processed_json2
        //    }, {
        //        id: 'Unpaid',
        //        name: 'Unpaid',
        //        data: processed_json3
        //    }, {
        //        id: 'Planned',
        //        name: 'Planned',
        //        data: processed_json2
        //    }, {
        //        id: 'Unplanned',
        //        name: 'Unplanned',
        //        data: processed_json3
        //    }, {
        //        id: 'Power',
        //        name: 'Power',
        //        data: processed_json2
        //    }, {
        //        id: 'Water',
        //        name: 'Water',
        //        data: processed_json3
        //    }, {
        //        id: 'Gas',
        //        name: 'Gas',
        //        data: processed_json4
        //    }]
        //}

    });
}

function chartclick(name, divid)
    {
    alert( name + "--"+divid);
}


//************************************************


