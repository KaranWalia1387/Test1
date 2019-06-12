var questions1;
var questions2;
var r = '';
var databindtogrid;
var editcolumn = false;
var flagDeleteRow = false;

function LoadGrid(name) {
    $('#wugrid').w2grid({
        name: name,
        show: {
            toolbar: false,
            footer: false
        },
        multiSearch: true,
        fixedBody: false,
        searches: [
             { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', type: 'text' },
             { field: 'Number', caption: 'Number', type: 'text' },
             { field: 'EXPDate', caption: 'EXP Date', size: '20%', type: 'text' },
             { field: 'Default', caption: 'Default', size: '20%', type: 'text' }
        ],
        columns: [
            { classname: 'ML_MyAccount_Msg_CardName', field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '25%', sortable: true, resizable: false },
            { classname: 'ML_MyAccount_Lbl_CardNum', field: 'Number', caption: 'Number', size: '23%', sortable: true, resizable: false },
            { classname: 'ML_MyAccount_Lbl_ExpDt', field: 'EXPDate', caption: 'EXP Date', size: '18%', sortable: true, resizable: false },
            { classname: 'ML_MyAccount_Lbl_Deflt', field: 'Default', caption: 'Default', size: '16%', sortable: true, resizable: false },
            {
                classname: 'ML_MyAccount_Lbl_EdtorDel', field: 'img', caption: '', size: '13%', sortable: true, resizable: false,
                render: function (record) {
                    return '<div id="' + record.img + '" style="float:left" title="Edit" data-toggle="modal" data-target="#divPopup" globalize="ML_MyAccount_Span_Edit" class="edit"><img src="images/icon_mark.png" /></div><div id="' + record.img + '" title="Delete" globalize="ML_Billing_Span_Delete"  class="deleterow"><img src="images/icon_delete.png" /></div>';
                }
            }
        ],
        records: databindtogrid,
        onRender: function (event) {
            w2UiTranslateGridHeaders(this);
        }
    });
}

$(document).ready(function () {
    refresh();
    $(window).on('resize', refresh);
    $('#txtPhone').mask('(000) 000-0000');
    $('#txtmob').mask('(000) 000-0000');

    $(window)
        .on('hidden.bs.modal',
            function () {
                clear();
            });

    questions1 = $('#ddlquestions1').val();
    questions2 = $('#ddlquestions2').val();

    hidequestion1dropdown();
    hidequestion2dropdown();

    $('#ddlquestions1').change(function () {
        // hidequestion1dropdown();
        var selectedItem = $('#ddlquestions1').val();

        $("select[id='ddlquestions2'] option").removeAttr('disabled');
        $("select[id='ddlquestions2'] option[value=" + selectedItem + "]").prop('disabled', 'disabled');
        $('#txtSecurityAns1').val('');
    });

    $('#ddlquestions2').change(function () {
        // hidequestion2dropdown();
        var selectedItem2 = $('#ddlquestions2').val();


        $("select[id='ddlquestions1'] option").removeAttr('disabled');
        $("select[id='ddlquestions1'] option[value=" + selectedItem2 + "]").prop('disabled', 'disabled');
        $('#txtSecurityAns2').val('');
    });

    function hidequestion2dropdown(e) {
      
        var selectedItem2 = $('#ddlquestions2').val();
      

        $("select[id='ddlquestions1'] option").removeAttr('disabled');
        $("select[id='ddlquestions1'] option[value=" + selectedItem2 + "]").prop('disabled', 'disabled');
       // $('#txtSecurityAns2').val('');
    }

    function hidequestion1dropdown() {
        var selectedItem = $('#ddlquestions1').val();
      
        $("select[id='ddlquestions2'] option").removeAttr('disabled');
        $("select[id='ddlquestions2'] option[value=" + selectedItem + "]").prop('disabled', 'disabled');
       // $('#txtSecurityAns1').val('');
    }

    function ValidateEmail() {

        var x = $('#txtEmailID').val();
        if (x == '') {
            error.showerror($('#txtEmailID'), 'Please enter your email id');
            return false;
        }
        else {

            var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (pattern.test(x)) {
                return true;
            } else {
                error.showerror($('#txtEmailID'), "Please enter a valid email id"); return false;
            }
        }
        return true;
    }

    function ValidateSSN() {
        if ($('#divSSN').css('display') != 'none') {
            if ($('#txtSsn2').val().length != 4) {
                error.showerror($('#txtSsn2'), 'SSN Number must be in 4 digit.');
                return false;
            }
            else if (parseInt($('#txtSsn2').val()) <= 0) {
                error.showerror($('#txtSsn2'), 'Invalid SSN Number.');
                return false;
            }
            return true;
        }
        else
            return true;
    }

    function ValidateMinMaxLength() {
        if ($('#txtAccno').val().length < $('#hdnAccountMinLength').val() || $('#txtAccno').txtSsn2().length > $('#hdnAccountMaxLength').val()) {
            error.showerror($('#txtAccno'), 'Account Number should be greater than ' + $('#hdnAccountMinLength').val() + ' characters and less than ' + $('#hdnAccountMaxLength').val() + ' characters');
            return false;
        }

        if ($('#txtMeterId').val() != '') {
            if ($('#txtMeterId').val().length < $('#hdnMeterIdMinLength').val() || $('#txtMeterId').val().length > $('#hdnMeterIdMaxLength').val()) {
                error.showerror($('#txtMeterId'), 'Meter Id should be greater than ' + $('#hdnMeterIdMinLength').val() + ' characters and less than ' + $('#hdnMeterIdMaxLength').val() + ' characters');
                return false;
            }
        }

        if ($('#txtDL').val() != '') {
            if ($('#txtDL').val().length < $('#hdDLMinLength').val() || $('#txtDL').val().length > $('#hdDLMaxLength').val()) {
                error.showerror($('#txtDL'), 'Driving License should be greater than ' + $('#hdDLMinLength').val() + ' characters and less than ' + $('#hdDLMaxLength').val() + ' characters');
                return false;
            }
        }
    }
    
    //Code for Communication Address
    var addressid;
    //****************
    var StreetAddress_popup = '';
    var ZipCode_popup = '';
    //****************

    var ss = $(".pro_add table tr td").find("input[type='radio'][name='properties']:checked").closest('tr').find('.addId img').attr('id');
    $("#lblCommAddress").text($("#lblContactCustAdd_" + ss).text());
    $($('input[type="radio"][name="rdo_typeAddr"]')[0]).prop('checked', true).trigger("change");
    $('input[type="radio"][name="rdo_typeAddr"]').change(function () {
        $('#cust_address1').removeAttr("ValidateMessage");
        var cntrls = $('#divAddressPopup_ChangePass input[type=text]');
        for (j = 0; j < cntrls.length; j++) {
            if ($('#' + cntrls[j].id).val() == "") {
                error.hideerror($('#' + cntrls[j].id));
            }            
        }
        if ($('#ddlState').val() == '') {
            error.hideerror(('#ddlState'));
        }

        //***********************************
        if (this.checked && this.value == '1') {
            StreetAddress_popup = $('#cust_address1').val();
        }
        if (this.checked && this.value == '0') {
            ZipCode_popup = $('#cust_address1').val();
        }
        //***********************************

        $('#cust_address1').val('');
        if (this.checked && this.value == '1') {           
            $('#cust_address1').val(ZipCode_popup);
            $('.addline2').hide();
            $('#Addline1').text($('#ML_Msg_POBox').text());
            $('#Addline1').attr('title', $('#ML_Msg_POBox').text());
            $('#cust_address1').attr('title', $('#ML_Msg_POBox').text());
            $('#cust_address2').val(''); 
            $('#cust_address1').attr('maxlength', '5');
            $('#cust_address1').bind("keydown", function (e) {
                var code = e.which || event.keyCode;
                if (!((code >= 48 && code <= 57) || code == 8 || code == 127))
                { return false; }
                return true;
            });
            $('#cust_address1').attr("ValidateMessage", $("#PoBlankText").text());
        }
        if (this.checked && this.value == '0') {
            $('#cust_address1').val(StreetAddress_popup);
            $('#cust_address1').attr('maxlength', '50');
            $('.addline2').show(); $('#cust_address1').unbind("keydown");
            $('#Addline1').text($('#ML_MyAccount_Msg_AddLine1').text());
            $('#Addline1').attr('title', $('#ML_MyAccount_Msg_AddLine1').text());
            $('#cust_address1').attr('title', $('#ML_MyAccount_Msg_AddLine1').text());
            $('#cust_address1').attr("ValidateMessage", $("#AddressLine1").text());
        }
    });
    $('#Addline1').keydown(function (e) {
        var code = e.which || event.keyCode;
        if (!((code >= 48 && code <= 57) || code == 8 || code == 127))
        { return false; }
        return true;
    });
    $('.editaddress').click(function () {
        $('#ddlState').attr('mandatory', true);
        ResetAddress();
       
        addressid = $(this).attr('id');
        $('#cust_address1').val($('#cust_add1_' + addressid).text());
        $('#cust_address2').val($('#cust_add2_' + addressid).text());
        // Added By Pawan Gupta
        $('#cust_Zip').val($('#cust_zip_' + addressid).text());
        $("#ddlState option").each(function () {
            if ($(this).text() == $('#cust_State_' + addressid).text()) {
                $(this).attr('selected', 'selected');
            }
        });
        $('#cust_City').val($('#cust_City_' + addressid).text());
    });

    $('.editcommaddress').click(function () {
        ResetAddress();
        $(".left_loading_area img").show();
        $(".result").text("");

        var ss = $(".pro_add table tr td").find("input[type='radio'][name='properties']:checked").attr('id');
        addressid = $("#" + ss).closest('tr').find('.editaddress').prop('id');// $(this).attr('id');
        if ($('#cust_ispobox_' + addressid).text() == "True") {
            $($('input[type="radio"][name="rdo_typeAddr"]')[1]).prop('checked', true).trigger("change");
        }
        else
        {
            $($('input[type="radio"][name="rdo_typeAddr"]')[0]).prop('checked', true).trigger("change");
        }
        $('#cust_address1').val($('#cust_add1_' + addressid).text());
        $('#cust_address2').val($('#cust_add2_' + addressid).text());
        // Added By Pawan Gupta
        $('#cust_Zip').val($('#cust_zip_' + addressid).text());
        $("#ddlState option").each(function () {
            if ($(this).text() == $('#cust_State_' + addressid).text()) {
                $(this).prop('selected', true);
            }
        });
        $('#cust_City').val($('#cust_City_' + addressid).text());
    });

    $('#btnValidateAddress').click(function () {
        if (isValidForUSPS()) {
            $('.result').text($("#uspsValidate").text());
            $(".editMain").css('display', 'none');
            $(".editProg").fadeIn();
            if (!validateUSPS()) {
                setTimeout(function () {
                    $(".left_loading_area img").hide();
                    $(".result").text($("#uspsInvalid").text());
                }, 2000);
            }
            else {
                setTimeout(function () {
                    $(".left_loading_area img").hide();
                    $(".result").text($("#uspsValid").text());
                }, 2000);
            }
            setTimeout(function () {
                $(".editProg").hide();
                $(".editMain").css('display', 'inline-block');

            }, 3000);
        }



    });

    $('#btnUpdateAddress').click(function () {

        

        if (isValidForUSPS()) {

            if ($('input:radio[name=rdo_typeAddr]:checked').val() == '1') {
                if ($('#cust_address1').val() == '') {
                    //  error.showerror($('#cust_address1'), 'hello');
                    toastr.error($('#PoBlankText').text());
                    return false;

                }
            }

            else {
                if ($('#cust_address1').val() == '') {
                    //  error.showerror($('#cust_address1'), 'hello');
                    toastr.error($('#AddressLine1').text());
                    return false;

                }

            }
            $(".left_loading_area img").show();
            $('.result').text($("#uspsValidateSave").text());
            $(".editMain").css('display', 'none');
            $(".editProg").fadeIn();
            //if (validateUSPS()) {
                $(".verify_usps").css("display", "block");
                var stateId = ($('#ddlState').val()).split('|');
                //var param = 'Address1=' + $('#cust_address1').val() + "&Address2=" + $('#cust_address2').val() + "&ZipCode=" + $('#cust_Zip').val() + "&CityName=" + $('#cust_City').val() + "&StateId=" + stateId[0]
                //var status = account.SaveContactAddress(param);

                var param = "ZipCode=" + $('#cust_Zip').val() + "&CityName=" + $('#cust_City').val() + "&StateId=" + stateId[0] + "&StateCode=" + stateId[1] + "&IsPOBox=" + $('input[type="radio"][name="rdo_typeAddr"]:checked').val();
                var status = account.SaveContactAddress(param, $('#cust_address1').val(), $('#cust_address2').val());
                if (JSON.parse(status.value)[0].STATUS == "1") {
                    $(".save_add").css("display", "block");
                    setTimeout(function () {
                        $(".left_loading_area img").hide();
                        $(".result").text(JSON.parse(status.value)[0].Message);
                       // $(".result").text($('#SuccessCommAdd').text());
                    }, 2000);
                    setTimeout(function () {
                        $("#divAddressPopup_123").hide();
                        window.location.reload();
                    }, 4000);
                }
                else {
                    setTimeout(function () {
                        $(".left_loading_area img").hide();
                        $(".result").text(JSON.parse(status.value)[0].Message);
                        //$(".result").text($('#FailedCommAdd').text());

                    }, 2000);
                    setTimeout(function () {
                        $(".editProg").hide();
                        $(".editMain").css('display', 'inline-block');

                    }, 3000);
                }
                //setTimeout(function () {
                //    $(".editProg").hide();
                //    $(".editMain").css('display', 'inline-block');
                //}, 3000);
                //setTimeout(function () {
                //    $("#divAddressPopup_123").hide();
                //    window.location.reload();
                //}, 4000);
            //} else {
            //    setTimeout(function () {
            //        $(".left_loading_area img").hide();
            //        $(".result").text($("#uspsInvalid").text());

            //    }, 2000);
            //    setTimeout(function () {
            //        $(".editProg").hide();
            //        $(".editMain").css('display', 'inline-block');

            //    }, 4000);

            //}
        }
    });

    $('.mailingaddressclose').click(function () {
        ResetAddress();
        $(".left_loading_area img").show();
        $(".result").text("");
    });

    $('.closeVerify').click(function () {
        window.location.reload();

    });

    function ResetAddress() {
        $('#cust_address1').val('').removeClass('errorbox');
        $('#cust_address2').val('').removeClass('errorbox');
        $('#cust_Zip').val('').removeClass('errorbox');
        $('#cust_City').val('').removeClass('errorbox');
        $('#ddlState').removeClass('errorbox');
        $('#ddlState option').removeAttr('selected');


        addressid = "";
    }

    $('#cust_address2').blur(function () {
        if ($('#cust_address2').val().trim() != "") {
            $('#cust_address2').removeClass('errorbox');
        }
    });
    
    //End Comment for Communication Address
    //ASYNC START
    function createParameters() {
        var param = "";
        // get only number from phone number
        var txtmob = $('#txtmob').val() != '' ? parseInt($('#txtmob').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtmob').val();
        var txtPhone = $('#txtPhone').val() != '' ? parseInt($('#txtPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtPhone').val();
        param += "&HomePhone=" + txtmob;
        param += "&MobilePhone=" + txtPhone;
        param += "&SecurityQuestionId=" + $('#ddlquestions1').val();
        param += "&SecurityQuestionId2=" + $('#ddlquestions2').val();
        return param;
    }

    $('#btnSaveAll').click(function () {
        try {
            toastr.clear();
            var status = saveData();
            if (status == true) {
                var param = {
                    json: createParameters(),
                    payment: ($('#wugrid div input[type=radio]:checked').val() == undefined ? null : $('#wugrid div input[type=radio]:checked').val()),
                    properties: $('input[type=radio][name=properties]:checked').val(),
                    HintAns: $('#txtSecurityAns1').val(), //Code commented as Hint answers will be encrypted from service now.
                    HintAns2: $('#txtSecurityAns2').val(),
                    EmailId: $('#txtEmail').val(),
                    AlternateEmailID:$('#txtAltEmail').val()
                }
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "account.aspx/SaveDataAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            }
        }
        catch (e) { }
    });

    function OnSuccess(data, status) {
        loader.hideloader();
        if (status == 'success' && JSON.parse(data.d)[0].Status=='1') {
            $("input[type='radio'][name='properties']").each(function () {
                $(this).closest('tr').find('img').removeClass('cssDefault');
            });
            $('input[type=radio][name=properties]:checked').closest('tr').find('img').addClass('cssDefault');
            //w2alert(JSON.parse(data.d)[0].Message);
            toastr.success(JSON.parse(data.d)[0].Message)

        }
        else if (status == 'success' && JSON.parse(data.d)[0].Status == '0') {
            //w2alert(status);
           
            toastr.warning(JSON.parse(data.d)[0].Message)
        }

        else {
            toastr.error(status)
        }
    }

    function OnError(request, status, error) {
        //w2alert(request.statusText);
        loader.hideloader();
        toastr.error(request.statusText)

    }

    var action = '';
    var mode = '';

    function clear() {
        $('#txtSsn2').val('').removeClass('errorbox');
        $('#txtAccno').val('').removeClass('errorbox');
        $('#txtPrimaryPhone').val('').removeClass('errorbox');
        $('#txtMeterId').val('').removeClass('errorbox');
        $('#txtEmailID').val('').removeClass('errorbox');
        $('#txtStreetNumber').val('').removeClass('errorbox');
        $('#txtDL').val('').removeClass('errorbox');
        $('#txtZipCode').val('').removeClass('errorbox');
    }
    
    $('#SubmitBtn').click(function () {
        toastr.clear();

        try {
            var status = ChkIsValid();
            var PrimaryPhone = $('#txtPrimaryPhone').val() != '' ? parseInt($('#txtPrimaryPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtPrimaryPhone').val();
            if (status == true) {
                var param = {
                    ssn: escape($('#txtSsn2').val()), Accnt: escape($('#txtAccno').val()), zipcode: escape($('#txtZipCode').val()),
                    meterid: escape($('#txtMeterId').val()),
                    emailid: escape($('#txtEmailID').val()),
                    street: escape($('#txtStreetNumber').val()),
                    dlno: escape($('#txtDL').val()),
                    primaryphn: escape(PrimaryPhone)
                }
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "account.aspx/SaveAddAccount",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessAddAccount,
                    error: function (response) {
                        console.log(response.d);
                    }
                });
                loader.hideloader();
            }
        }
        catch (e) { }
    });

    function OnSuccessAddAccount(data, status) {
        if (JSON.parse(data.d)[0].Status == 1) {
            toastr.success(JSON.parse(data.d)[0].Message)
            window.location.reload();
            $(".btnclosepopup").click();
            clear();
        }
        else {
            w2alert(JSON.parse(data.d)[0].Message, $("#Notificationtxt").text(), function () {
                if (JSON.parse(data.d)[0].AttemptLeft == "0") {
                    //window.location = "signout.aspx";
                    $.fn.idleTimeout().logout();
                }               
            });           
            //toastr.error(JSON.parse(data.d)[0].Message);
            $('.w2ui-popup-btn').focus();
        }
        
        loader.hideloader();
    }

    function ChkIsValid() {
        if (ValidateAllPageFieldsSingleMessage('divAccountPopup')) {
            if (ValidateEmail()) return true; else return false;
            if (ValidateSSN()) return true; else return false;
            if (ValidateMinMaxLength()) return true; else return false;
            return true;
        }

            //if (ValidateEmail()) return true;
            //if (ValidateSSN()) return true;
            //if (ValidateMinMaxLength()) return true;


        else { return false; }
    }

    $("#txtSsn2").on('focusout', function (e) {
        var $this = $(this);
        $this.val($this.val().replace(/[^\d\.]/g, ''));
    }).on('paste', function (e) {
        var $this = $(this);
        setTimeout(function () {
            $this.val($this.val().replace(/[^\d\.]/g, ''));
        }, 5);
    });

    $('#txtPrimaryPhone').mask('(000) 000-0000');
   
   // document.getElementById("btnSaveAll").accessKey = "A";

    $('.right_content_box').keypress(function (e) {
        if (e.keyCode == 13) {
            $('#btnSaveAll').click();
            e.preventDefault();
        }
    })

    //BUG ID 20791 END
    $(".icon_profile").addClass('active');
    try {
        var paymentdata = account.LoadW2UIGridData().value;
        if (paymentdata != null) {
            databindtogrid = paymentdata.Rows;
            if (databindtogrid.length != 0 || databindtogrid != null) {
                LoadGrid('wugrid');;
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
    k('.deleterow').live('click', function (e) {
        try {
            var grid = this;
            if (grid.id.indexOf("master") == 25 || grid.id.indexOf("visa") == 25 || grid.id.indexOf("american") == 20 || grid.id.indexOf("discover") == 20)
                var m = $('#DeleteCreditCard').text();
            else {
                var m = $('#DeleteBankAccount').text();
            }

            var res = w2confirm(m, function (obj) {
                if (obj == 'Yes') {

                    var msg = account.deleteRecord(grid.id).value;
                    //w2alert(msg);
                    toastr.success(msg);
                    databindtogrid = account.LoadW2UIGridData().value.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {

                        LoadGrid($('#wugrid').attr('name') + Math.floor((Math.random() * 100) + 7));

                    }
                }
            }
            )
        }
        catch (e) {
            console.log(e.message);
        }
    });

    $('.btnclose').click(function () {
        toastr.clear();
    });
    $('.closepopup').click(function () {
        toastr.clear();
    });
    
    //Added till here.  

});

function ValidateText(e) {
    var retVal;
    if ($('#ddlquestions1 :selected').text() == 'What were the last four digits of your childhood telephone number?') {
        $('#txtSecurityAns1').attr('maxlength', '4');
        var chk = (IsNumeric(e));
        if (chk)
            retVal = true;
        else retVal = false;
    }
    else if ($('#ddlquestions1 :selected').text() == 'What are the last 5 digits of your driver\'s license number?') {
        $('#txtSecurityAns1').attr('maxlength', '5');
        var chk = (IsNumeric(e));
        if (chk)
            retVal = true;
        else retVal = false;
    }
    else {
        retVal = true;
    }
    return retVal;
}

function ValidateText1(e) {
    var retVal;;
    if ($('#ddlquestions2 :selected').text() == 'What were the last four digits of your childhood telephone number?') {
        $('#txtSecurityAns2').attr('maxlength', '4');
        var chk = (IsNumeric(e));
        if (chk)
            var retVal = true;
        else retVal = false;
    }
    else if ($('#ddlquestions2 :selected').text() == 'What are the last 5 digits of your driver\'s license number?') {
        $('#txtSecurityAns2').attr('maxlength', '5');
        var chk = (IsNumeric(e));
        if (chk)
            retVal = true;
        else retVal = false;
    }
    else {
        retVal = true
    }
    return retVal;
}

function isValidForUSPS() {
    return ValidateAllPageFieldsSingleMessage('divAddressPopup_ChangePass');
}

function validateUSPS() {
    $(".left_loading_area img").show();
    var statestr = ($("#ddlState option:selected").val()).split('|');
    var stateCode = "";
    if (statestr.length > 1) { stateCode = statestr[1]; }
    //var param1 = 'Address1=' + $('#cust_address1').val() + '&Address2=' + $('#cust_address2').val() + '&City=' + $('#cust_City').val() + '&State=' + stateCode + '&Zip=' + $('#cust_Zip').val();
    //var status1 = {};
    var param1 = 'City=' + $('#cust_City').val() + '&State=' + stateCode + '&Zip=' + $('#cust_Zip').val();
    status1 = account.validateAddress(param1, $('#cust_address1').val(), $('#cust_address2').val());
    var aaa = JSON.parse(status1.value)[0];
   // return true;
    if (aaa.Zip == "") {
        return false;
    }
    else {
        $('#cust_Zip').val(aaa.Zip);
        $('#cust_City').val(aaa.City);
        var ss = $("#ddlState").find('option[value*=' + aaa.State + ']').val();
        $("#ddlState option").removeAttr('selected');
        $("#ddlState").val(ss.toString()); // Changed by Vijay on Dated- 26April2016. Issue: State value was not binding post validation
        //$("#ddlState option").filter(function () {
        //    return $(this).val() == ss;
        //}).attr('selected', 'selected');
        return true;
    }
}

function propertyChange(obj) {
    $('input[name=payment][value="' + $(obj).attr('defaultpayment') + '"]').attr('checked', true);

    var id = $(obj).closest('tr').find('.addId img').attr('id');

    $("#lblCommAddress").text($("#lblContactCustAdd_" + id).text());
}

//This method is created to validate different phone number format.
//BUG ID 5363 STARTS
function validatePhone(phoneField, format) {
    var num = phoneField.value.replace(/[^\d]/g, '');

    switch (format) {
        case '0': //Format (xxx)-xxx-xxxx
            phoneField.value = "(" + num.substring(0, 3) + ")-" + num.substring(3, 6) + "-" + num.substring(6);
            break;
        case '1': //Format xxx-xxx-xxxx
            if (phoneField.value.length > 9) {
                phoneField.value = num.substring(0, 3) + "-" + num.substring(3, 6) + "-" + num.substring(6);

            }
            break;
        default: //Format xxxxxxxxxx
            phoneField.value = num;
            break;
    }
    //}
}
//BUG ID 5363 END

//This function is use to validate fields before saving
function saveData() {

    if (ValidateAllPageFieldsSingleMessage('accountdetails,securitydiv')) {


        return true;
    }
    else { return false; }

}

k('.deleteaccount').live('click', function (e) {
    try {
        toastr.clear();

        var div = this;
        var delmsg = div.id.split('|');
        var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
        $tds = $row.find("td");
        var $img = $tds.find('img');

        // var rdbval = $tds.find('input:radio').is(':checked');
        //if (rdbval == true) {
        if ($tds.find('img').attr('class') == 'cssDefault') {
            toastr.error($("#spDefaultAddress").text());
            return false;
        }
        var msgshow = delmsg[delmsg.length - 1];
        //comment toastrconfirm popup and replace it with w2confirm.
        //toastrConfirmPopup();
        //toastr.info($('#DeleteAccountAddress').text() + '<br /><br /><button type="button" id="okBtn">Yes</button>');
        //toastrNotify();
        //$('#okBtn').click(function () {
        //    // var msg = account.DeleteAccount(delmsg);
        //    loader.showloader();
        //    var param = { AccountNumber: delmsg[0] }
        //    $.ajax({
        //        type: "POST",
        //        url: "account.aspx/DeleteAccount",
        //        data: JSON.stringify(param),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: OnSuccessDeleteAccount,
        //        error: function (response) {
        //            console.log(response.d);
        //            loader.hideloader();
        //        }
        //    });

        //});

        w2confirm($('#DeleteAccountAddress').text(), function (obj) {
            if (obj == 'Yes') {
                loader.showloader();
                var param = { AccountNumber: delmsg[0] }
                $.ajax({
                    type: "POST",
                    url: "account.aspx/DeleteAccount",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessDeleteAccount,
                    error: function (response) {
                        SubmitBtn
                        console.log(response.d);
                        loader.hideloader();
                    }
                });

            }
        });
        loader.hideloader();



    }
    catch (e) {
        console.log(e.message);
    }
});

function OnSuccessDeleteAccount(data, status) {

    if (JSON.parse(data.d)[0].Status == 1) {

        toastr.success(JSON.parse(data.d)[0].Message);
        window.location.reload();
        loader.hideloader();
    }
    else {
        toastr.error(JSON.parse(data.d)[0].Message);
    }
    loader.hideloader();
}

function EmailValidator(obj) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(obj.value)) { return true; }
    else { error.showerror(obj, 'Please Enter valid Email ID.'); obj.value = ''; obj.focus(); return false; }
}

function refresh() {
    try
    {
        var device = $('#devices');

        if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
            $("#devices").addClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
            $("#devices").addClass('inner_uni2');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
            $("#devices").addClass('inner_uni3');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
            $("#devices").addClass('inner_uni4');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
        }
        else {
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
    }
    catch(e)
    {
        console.log(e.message);
    }
}
