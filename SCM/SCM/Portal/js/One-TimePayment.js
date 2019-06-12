window.onload = function () {
    var seconds = 3;
    setTimeout(function () {
        // if (document.getElementById('lblMsg') != "")
        // document.getElementById('lblMsg').style.display = "none";
    }, seconds * 1000);
    $('#txtPhoneNumber').mask('(000) 000-0000');
};

$(document).ready(function () {
    $('#txtphone1').mask('(000) 000-0000');
    $('#txtRoutingNmbr').blur(function () {
        testRoutingNumber();
    });

    if ($('#rdoCredit').is(':checked')) {
        $('#txtAccountName').removeAttr('mandatory');
        $('#txtRoutingNmbr').removeAttr('mandatory');
        $('#txtBankName').removeAttr('mandatory');
        $('#txtBankAccNumber').removeAttr('mandatory');
    }

    $('#txtSecurityCode').disableAutocomplete();
    var parseddate = new Date();
    var PaymentMode = $('#hdnPaymentMode').val(); //'<%=Convert.ToString(CustomerPortal.SessionAccessor.PaymentMode)%>';
    if (PaymentMode == "3") {
        //$('#PaymentInfo').hide();
    }
    else if (PaymentMode == "2") {
        //$('.bank').attr('style', 'display:none!important;');
        //$('#divbankrdobtn').attr('style', 'display:none!important;');
    }

    $('#btnCalender').val((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());

    var paytypeid = 1;
    var payid = "369";
    setMonth();

    $('#btnSubmitPayment').click(function () {
        var ispagevalid = ValidateAllPageFieldsSingleMessage('logincredentials');
        if (ispagevalid) {
            var result = Onetimepayment.validateonetimepayment($(".txtPhone").val(), $("#txtAccountNumber").val()).value;
            if (result.Rows[0]["STATUS"] == "0") {
                toastr.error(result.Rows[0]["Message"])
                // w2alert(result.Rows[0]["Message"]);
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    });

    $('#rdoCredit').click(function () {
        if ($('#rdoCredit').attr('checked', 'true')) {
            //$('.card').show();
            $('.bank').attr('style', 'display:none!important;');
            $('.card input[type=text]').val('')
            $('#txtAccountName').removeAttr('mandatory');
            $('#txtRoutingNmbr').removeAttr('mandatory');
            $('#txtBankName').removeAttr('mandatory');
            $('#txtBankAccNumber').removeAttr('mandatory');
            $('#txtTotlal').removeAttr('mandatory', '1');
            $('#txtCardNumber').removeAttr('mandatory', '1');
            $('#txtSecurityCode').removeAttr('mandatory', '1');
            $('.card').show();

            paytypeid = 1;
        }
    });

    $('#rdoBank').click(function () {
        if ($('#rdoBank').attr('checked', 'true')) {
            $('.card').attr('style', 'display:none!important;');
            $('.bank input[type=text]').val('')
            $('.bank').show();
            $('#txtTotlal').removeAttr('mandatory');
            $('#txtCardNumber').removeAttr('mandatory');
            $('#txtSecurityCode').removeAttr('mandatory');
            $('#txtAccountName').attr('mandatory', '1');
            $('#txtRoutingNmbr').attr('mandatory', '1');
            $('#txtBankName').attr('mandatory', '1');
            $('#txtBankAccNumber').attr('mandatory', '1');
            paytypeid = 2;
        }
    });

    $('#btnsubmit').click(function () {
        var container = '';
        loader.showloader();
        var PaymentMode = $('#hdnPaymentMode').val(); //'<%=Convert.ToString(CustomerPortal.SessionAccessor.PaymentMode)%>';
        if (PaymentMode == "3") {
            container = "responsive";
        }
        else {
            container = "submitteddetailvalue";
        }
        //if (!ValidateAllField(container)) {
        //    return false;
        //}

        if (!ValidateAllPageFieldsSingleMessage(container)) {
            loader.hideloader();
            return false;
        }

        var amount = 0;
        var powerAmount;
        var waterAmount;
        var solidAmount;
        var gasAmount;
        var str = $('#lblBillingID').text() + '|' + "369" + '|' + paytypeid + '|'; // Check for 369 is used on a One Time Payment which is hard coded
        if ($("#txtzipcode").val().length < 5) {
            w2alert($('#ML_Msg_EnterValidZip').text());
            $('#txtzipcode').focus();
            return false;
        }

        if (($("#txtTotlal").val()) <= 0) {
            //w2alert('Please enter a valid Payment Amount.');
            toastr.warning($('#Span_Billing_PaymentCanNotBeZero').text());
            $('#txtTotlal').focus();
            loader.hideloader();
            return false;
        }
        var authAmt = parseFloat($("#txtTotlal").val());
        var maxBillAmt = parseFloat($('#hdndrMaxbilling').val());
        if (authAmt > maxBillAmt) {
            toastr.warning($("#spnMaxPaymentAmtMsg").text() + ' $' + $('#hdndrMaxbilling').val());
            loader.hideloader();
            return false;
        }

        if (PaymentMode == "2") {
            if ($('#rdoCredit').is(':checked')) {
                if ($("#txtCardNumber").val() != "") {
                    var s1 = 0;
                    var s2 = 0;
                    var num = parseInt($('#txtCardNumber').val());
                    if (isNaN(num)) {
                        error.showerror($('#txtCardNumber'), $('#txtCardNumber').attr('ValidateMessage'))
                        return false;
                    }
                    for (i = 1; num > 0; i++) {
                        if (i % 2 != 0)
                            s1 = s1 + num % 10;
                        else {
                            test = num % 10;
                            test = test * 2;
                            if (test > 9) {
                                test = (test % 10) + (Math.floor(test / 10) % 10);
                            }
                            s2 = s2 + test;
                        }
                        num = Math.floor(num / 10);
                    }
                    var sum = s1 + s2;
                    if (sum % 10 != 0) {
                        error.showerror($('#txtCardNumber'), $('#txtCardNumber').attr('ValidateMessage'))
                        return false;
                    }
                }
                else if ($("#txtCardNumber").val() == "") {
                    error.showerror('#txtCardNumber', $('#txtCardNumber').attr('ValidateMessage'));
                    return false;
                }
                else if (!EmailValidator(document.getElementById("txtemail"))) {

                    return false;
                }

                if ($("#txtSecurityCode").val() == "") {
                    error.showerror('#txtSecurityCode', $('#txtSecurityCode').attr('ValidateMessage'));
                    return false;
                }

            }
            else if ($('#rdoBank').is(':checked')) {
                if ($("#txtAccountName").val() == "") {
                    error.showerror('#txtAccountName', 'Please enter Account Holder Name.');
                    return false;
                }
                else if ($("#txtRoutingNmbr").val() == "") {
                    error.showerror('#txtRoutingNmbr', 'Please enter Bank Routing Number.');
                    return false;
                }
                else if ($("#txtBankName").val() == "") {
                    error.showerror('#txtBankName', 'Please enter Bank Name.');
                    return false;
                }
                else if ($("#txtBankAccNumber").val() != "") {
                }
                else if ($("#txtBankAccNumber").val() == "") {
                    error.showerror('#txtBankAccNumber', 'Please enter valid Account number.');
                    return false;
                }
                $('#lblaccounttype').val($('#ddlaccounttype').val());              

            }
            if (paytypeid == 1) {
                if ($('#txtTotlal').val().trim() != '') {
                    if (parseFloat($('#txtTotlal').val().trim()) <= 0) {
                        error.showerror('#txtTotlal', 'Please enter valid amount.');
                        return false;
                    } else {


                        if ($('#hdnPowerAmount').val() != '') {
                            str += getFormatedValue($('#hdnPowerAmount').val()) + '|';
                            powerAmount = parseFloat($('#hdnPowerAmount').val()).toFixed(2);
                            amount = parseFloat(amount + powerAmount);
                        } else {
                            str += "0.00" + '|';
                        }
                        if ($('#txtTotlal').val().trim() != '') {
                            str += getFormatedValue($('#txtTotlal').val().trim()) + '|';
                            waterAmount = parseFloat($('#txtTotlal').val().trim()).toFixed(2);
                            amount = parseFloat(amount + waterAmount);
                        } else {
                            str += "0.00" + '|';
                        }
                        if ($('#hdnSolidAmount').val() != '') {
                            str += getFormatedValue($('#hdnSolidAmount').val()) + '|';
                            solidAmount = parseFloat($('#hdnSolidAmount').val()).toFixed(2);
                            amount = parseFloat(amount + solidAmount);
                        } else {
                            str += "0.00" + '|';
                        }
                        //#5896-Start
                        if ($('#hdnGasAmount').val() != '') {
                            str += getFormatedValue($('#hdnGasAmount').val());
                            gasAmount = parseFloat($('#hdnGasAmount').val()).toFixed(2);
                            amount = parseFloat(amount + gasAmount);
                        } else {
                            str += "0.00";
                        }
                        //#5896-End
                    }
                } else {
                    error.showerror('#txtTotlal', 'Please enter amount.');
                    $('#txtTotlal').focus();
                    return false;
                }

            } else if (paytypeid == "2") {
                if ($('#txtTotlal').val() != '') {
                    if ($('#txtTotlal').val() <= 0) {
                        //  error.showerror('#txtTotlal', 'Please enter valid amount.');
                        error.showerror('#txtTotlal', $('#Span_Billing_PaymentCanNotBeZero').text());
                        return false;
                    } else {
                        if ($('#hdnPowerAmount').val() != '') {
                            str += $('#hdnPowerAmount').val() + '|';
                        } else {
                            str += 0 + '|';
                        }

                        if ($('#txtTotlal').val().trim() != '') {
                            str += $('#txtTotlal').val().trim() + '|';
                            waterAmount = parseFloat($('#txtTotlal').val());
                            amount = parseFloat(amount + waterAmount);
                        } else {
                            str += 0 + '|';
                        }



                        if ($('#hdnSolidAmount').val() != '') {
                            str += $('#hdnSolidAmount').val() + '|';
                        } else {
                            str += 0 + '|';
                        }
                        //#5896-Start
                        if ($('#hdnGasAmount').val() != '') {
                            str += $('#hdnGasAmount').val();
                        } else {
                            str += 0;
                        }
                        str += "|" + $('#hdnAccountNumber').val() + "|" + $('#hdnLoginToken').val() + "|" + $('#hdnPaymentMode').val() + "|" + $('#hdnAccountID').val() + "|" + $('#hdnMerchantPin').val();

                        //#5896-End
                        if ($('#hdnPowerAmount').val() != '') {
                            powerAmount = parseFloat($('#hdnPowerAmount').val());
                            amount = parseFloat(amount + powerAmount);
                        }
                        if ($('#hdnWaterAmount').val() != '') {
                            waterAmount = parseFloat($('#hdnWaterAmount').val());
                            amount = parseFloat(amount + waterAmount);
                        }
                        if ($('#hdnSolidAmount').val() != '') {
                            solidAmount = parseFloat($('#hdnSolidAmount').val());
                            amount = parseFloat(amount + solidAmount);
                        }
                        //#5896-Start
                        if ($('#hdnGasAmount').val() != '') {
                            gasAmount = parseFloat($('#hdnGasAmount').val());
                            amount = parseFloat(amount + gasAmount);
                        }
                        //#5896-End
                    }
                } else {
                    error.showerror('#txtTotlal', 'Please enter amount.');
                    $('#txtTotlal').focus();
                    return false;
                }
            } else {
                return false;
            }
        }
        if (PaymentMode == "3") {
            return true;
            var currency = "USD";
            var paidAmount = $('#txtTotlal').val();
            var billid = $('#lblBillingID').text();
            var param = "currency=" + currency + "&amount=" + paidAmount + "&emailid=" + $('#txtemail').val() + "&description=Bill Payment&BillName=Electric Bill&InvoiceNumber=" + billid + "&notepayee=Test";
            param = param + "&clientid=" + $('#hdnClientID').val() + "";
            param = param + "&clientsecret=" + $('#hdnClientSecret').val() + "";

            $.ajax({
                type: "POST",
                url: "one-timepayment.aspx/PayPalMethod",
                data: '{param:' + JSON.stringify(param) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });

            function OnSuccess(data, status) {
                var waterAmount;
                var powerAmount;
                var solidAmount;
                var gasAmount;
                var paycardid = "1";
                var bilid = $('#lblBillingID').text();
                var str;

                if ($('#hdnWaterAmount').val() == '')
                    waterAmount = 0.0;
                else
                    waterAmount = $('#hdnWaterAmount').val();

                if ($('#hdnPowerAmount').val() == '')
                    powerAmount = 0.0;
                else
                    powerAmount = $('#hdnPowerAmount').val();

                if ($('#hdnSolidAmount').val() == '')
                    solidAmount = 0.0;
                else
                    solidAmount = $('#hdnSolidAmount').val();

                if ($('#hdnGasAmount').val() == '')
                    gasAmount = 0.0;
                else
                    gasAmount = $('#hdnGasAmount').val();

                powerAmount = $('#txtTotlal').val();
                var totalamount = parseFloat(waterAmount) + parseFloat(powerAmount) + parseFloat(solidAmount) + parseFloat(gasAmount);

                var params = waterAmount + "|" + powerAmount + "|" + solidAmount + "|" + gasAmount;
                params += "|" + amount + "|" + bilid + "|" + paycardid + "|" + totalamount;

                localStorage.setItem('passedString', params);
                window.location.href = data.d;

            }
            function OnError(request, status, error) {
                toastr.error("Error")
            }

        }
        else {
            str += "|" + $('#hdnAccountNumber').val() + "|" + $('#hdnLoginToken').val() + "|" + $('#hdnPaymentMode').val() + "|" + $('#hdnAccountID').val() + "|" + $('#hdnMerchantPin').val();

            if (PaymentMode == "2") {
                var name = $('#txtfirtname').val() + ' ' + $('#txtlastname').val();
                str += "|" + name + "|" + $('#txtCardNumber').val() + "|" + $('#ddlMonth').val() + "|" + $('#ddlYear').val() + "|" + $('#txtSecurityCode').val() + "|" + $('#txtemail').val();
            }  
        }
    });

    $('#ddlYear').change(function () {
        try {
            setMonth();
        }
        catch (e) { }
    });

    $('#txtCardNumber').validateCreditCard(function (result) {
        try {
            if (result.card_type != null) {
                $('#txtCardNumber').attr('maxlength', result.card_type.valid_length[0]);
                switch (result.card_type.name) {
                    case "visa":
                        setCreditCardType('visa');
                        break;
                    case "mastercard":
                        setCreditCardType('mastercard');
                        break;
                    case "discover":
                        setCreditCardType('discover');
                        break;
                    case "amex":
                        setCreditCardType('amex');
                        break;
                    case "diners_club_carte_blanche":
                        setCreditCardType('diners_club_carte_blanche');
                        break;
                    case "jcb":
                        setCreditCardType('jcb');
                        break;
                    default:
                        toastr.warning($('#ML_OnetimePayment_Msg_CreditCard').text());
                        $("#ImgCard").show();
                        $('#ImgVisa').hide();
                        $('#Imgamex').hide();
                        $('#ImgMaster').hide();
                        $('#ImgDiscov').hide();
                        $('#hdnCardtype').val('');
                        //  Imagejcb
                }
            }
            else {
                if ($('#txtCardNumber').val().length == 5) {
                    toastr.warning($('#ML_OnetimePayment_Msg_CreditCard').text());
                    $('#txtCardNumber').val('');
                }
                $("#ImgCard").show();
                $('#ImgVisa').hide();
                $('#Imgamex').hide();
                $('#ImgMaster').hide();
                $('#ImgDiscov').hide();
                $('#hdnCardtype').val('');
            }
        }
        catch (e) { }
    }, { accept: ['visa', 'mastercard', 'discover', 'amex', 'jcb', 'diners_club_carte_blanche'] });

    $("#btCancel").click(function () {
        window.location.href = "BillDashboard.aspx";
    });

    $("#cancelpayment").click(function () {
        $("#submitteddetailvalue").show();
        $("#submitteddetail").hide();
    })
});

//This function is use to set the type of credit card
function setCreditCardType(type) {
    $('#txtSecurityCode').attr('maxlength', '3');
    $('#txtCardNumber').attr('maxlength', '19');

    if (type.toString().indexOf("visa") > -1)
        type = "visa";
    else if (type.toString().indexOf("mastercard") > -1)
        type = "mastercard";
    else if (type.toString().indexOf("discover") > -1)
        type = "discover";
    else if (type.toString().indexOf("amex") > -1)
        type = "amex";
    else if (type.toString().indexOf("diners_club_carte_blanche") > -1)
        type = "diners_club_carte_blanche";
    else if (type.toString().indexOf("jcb") > -1)
        type = "jcb";
    else
        type = "";

    switch (type) {
        case "visa":
            $('#ImgVisa').show();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#Imgdine').hide();
            $('#Imgjcb').hide();
            $('#hdnCardtype').val('Visa');

            maxlength = 3;
            cardlenth = 16;
            $('#txtSecurityCode').attr('maxlength', '3');
            $('#txtCardNumber').attr('maxlength', '16');
            break;
        case "mastercard":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').show();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#Imgdine').hide();
            $('#Imgjcb').hide();
            $('#hdnCardtype').val('MasterCard');
            $('#txtSecurityCode').attr('maxlength', '3');
            $('#txtCardNumber').attr('maxlength', '16');
            break;
        case "discover":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgCard').hide();
            $('#Imgdine').hide();
            $('#Imgjcb').hide();
            $('#ImgDiscov').show();
            $('#hdnCardtype').val('Discover');
            $('#txtSecurityCode').attr('maxlength', '3');
            $('#txtCardNumber').attr('maxlength', '16');
            break;
        case "amex":
            maxlength = 4;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').show();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#Imgdine').hide();
            $('#Imgjcb').hide();
            $('#hdnCardtype').val('American Express');
            $('#txtSecurityCode').attr('maxlength', '4');
            $('#txtCardNumber').attr('maxlength', '16');
            break;


        case "diners_club_carte_blanche":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgCard').hide();
            $('#ImgDiscov').hide();
            $('#Imgdine').show();
            $('#Imgjcb').hide();
            $('#hdnCardtype').val('jcb');
            $('#txtSecurityCode').attr('maxlength', '4');
            $('#txtCardNumber').attr('maxlength', '16');
            break;
        case "jcb":
            maxlength = 4;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#Imgdine').hide();
            $('#Imgjcb').show();
            $('#hdnCardtype').val('jcb');
            $('#txtSecurityCode').attr('maxlength', '4');
            $('#txtCardNumber').attr('maxlength', '16');
            break;



        default:
            $("#ImgCard").show();
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#hdnCardtype').val('');
    }
}

function ValidateAllField(tblid) {
    i = 0;
    $('#' + tblid + ' [mandatory="1"]').each(function () {
        if ($(this).val().trim().length == 0) {
            $(this).val('');
            $(this).focus();
            $(this).addClass("errorbox");
            i++
        }
    });
    if (i > 1) {
        $("<span id='errorMsg'></span>").insertBefore("#" + tblid);
        $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
        if ($('#AllMandatory').text() == '') {

            $('#errorMsg').html($("#Span_Msg_EnterAllMandInfo").text());
            //$('#errorMsg').html('Please enter all the mandatory information.');
        }
        else {
            $('#errorMsg').html($('#AllMandatory').text());

        }
        return false;

    }
    else if ($('#txtTotlal').val() > 10000) {
        error.showerror('#txtTotlal', 'Please enter amount less than 10000.');
        return false;
    }
    else {
        $('#' + tblid + ' [mandatory="1"]').each(function () {
            if ($(this).hasClass("errorbox"))
                $(this).removeClass("errorbox");

        });
        if (ValidateAllPageFieldsSingleMessage(tblid)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function getFormatedValue(val) {
    var indx = ('' + val).split('.');
    if (indx.length == 1) val += '.00';
    else if (indx[1].length == 0) { val = indx[0] + '.00'; }
    else if (indx[1].length == 1) { val = indx[0] + '.' + indx[1] + '0'; }
    else if (indx[1].length == 2) { val = indx[0] + '.' + indx[1] }
    else val = indx[0] + '.' + indx[1].substr(0, 2);
    return val;
}

function setMonth() {
    try {
        var pad = "0"
        var selected_year = $("#ddlYear option:selected").text();
        DT = $('#hdnCurrentDate').val().split("-");
        var start_month = 1;
        if (selected_year == DT[0]) {
            start_month = parseInt(DT[2]) + 1
        }
        else {
            start_month = 1;
        }
        if (parseInt($("#ddlMonth option:first-child").val()) != start_month) {
            $('#ddlMonth').empty();
            for (var i = start_month; i <= 12; i++) {
                $('#ddlMonth').append($("<option></option>").val(pad.substring(0, pad.length - i.toString().length) + i.toString()).html(full_monthname[i - 1]));
            }
        }
    }
    catch (e) { }
}

function createParametersForAddUpdate() {
    var param = '';
    if ($('#rdoCredit').prop('checked')) {
        param = "CardName=" + $('#txtCardName').val() + "&CardType=" + $('#hdnCardtype').val() + "&CardNumber=" + $('#hdnActualTextValue').val() + "&ExpiryMonth=" + $('#ddlMonth').val();
        param += "&ExpiryYear=" + $('#ddlYear').val() + "&SecurityCode=" + $('#txtSecurityCode').val();
        if ($('#hdnpaymentmode').val() == 'add') {
            param += "&Mode=3" + "&IsBankAccount=0";
            mode = 'add';
        }
        else {
            param += "&Mode=1" + "&PayTypeId=" + $('#hdnPaymentId').val() + "&IsBankAccount=0";
            mode = 'edit'
        }
        action = 'Credit';
    }
    else {
        param = "BankName=" + $('#txtBankName').val() + "&BankAccount=" + $('#hdnActualTextValue').val() + "&BankRouting=" + $('#txtRoutingNumber').val() + "&AccountHolderName=" + $('#txtAccountHolderName').val();
        if ($('#hdnpaymentmode').val() == 'add') {
            param += "&Mode=3" + "&IsBankAccount=1";
            mode = 'add';
        }
        else {
            param += "&Mode=1" + "&PayTypeId=" + $('#hdnPaymentId').val() + "&IsBankAccount=1";
            mode = 'edit';
        }
        action = 'Bank';
    }
    return param;
}

function testRoutingNumber() {
    loader.showloader();
    if (!$('#rdoCredit').prop('checked')) {
        var param = { RoutingNumber: "RoutingNumber=" + $('#txtRoutingNmbr').val() };
        $('#txtBankName').prop('readonly', false);
        if ($('#txtRoutingNmbr').val().length == 9) {
            $.ajax({
                type: "POST",
                url: "one-timepayment.aspx/GetBankName",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessBankName,
                error: OnErrorBankName
            });

            function OnSuccessBankName(data, status) {
                loader.hideloader();
                var result = JSON.parse(data.d);
                if ((result != null || result != undefined) && (result.length > 0)) {
                    $('#txtBankName').val(result[0].BankName);
                    $('#txtBankName').prop('readonly', true);
                    $('#txtBankName').attr("enable", false);
                    return true;
                }
                else if (result.length == 0) {
                    error.showerror($('#txtRoutingNmbr'), $('#txtRoutingNmbr').attr('ValidateMessage'));
                    $('#txtBankName').prop('readonly', true);
                    $('#txtBankName').attr("enable", false);
                    $('#txtRoutingNmbr').val('');
                    return false;
                }
            }
            function OnErrorBankName(request, status, error) {
                loader.hideloader();
                toastr.error("Error")
            }
        }

        else if ($('#txtRoutingNmbr').val().length > 0) {
            error.showerror($('#txtRoutingNmbr'), $('#txtRoutingNmbr').attr('ValidateMessage'));
            $('#txtBankName').val('');
            $('#txtRoutingNmbr').val('');
            $('#txtRoutingNmbr').focus();
            loader.hideloader();
            return false;
        }
        else {
            $('#txtBankName').val('');
            loader.hideloader();
            return false;
        }
    }
    else {
        return true;
    }
    loader.hideloader();
}


function ValidateMinMaxLengthAccount() {

    if ($('#txtAccountNumber').val() != '') {
        if ($('#txtAccountNumber').val().length < $('#hdnAccountMinLength').val() || $('#txtAccountNumber').val().length > $('#hdnAccountMaxLength').val()) {
            var msg = $("#spnAccountIdMinMax").text();
            var min = $('#hdnAccountMinLength').val();
            var max = $('#hdnAccountMaxLength').val();
            msg = msg.replace('X', min);
            msg = msg.replace('Y', max);
            error.showerror($('#txtAccountNumber'), msg);
            return false;
        }
    }


}