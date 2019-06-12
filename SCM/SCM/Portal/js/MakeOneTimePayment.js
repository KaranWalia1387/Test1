$(document).ready(function () {
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
    var PaymentMode = '<%=Convert.ToString(CustomerPortal.SessionAccessor.PaymentMode)%>';
    if (PaymentMode == "3") {
        $('#PaymentInfo').hide();
    }

    $('#btnCalender').val((parseddate.getMonth() + 1) + '/' + parseddate.getDate() + '/' + parseddate.getFullYear());

    var paytypeid = 1;
    var payid = "369";
    setMonth();

    $('#rdoCredit').click(function () {
        if ($('#rdoCredit').attr('checked', 'true')) {
            $('.card').show();
            $('.bank').attr('style', 'display:none!important;');
            $('#txtAccountName').removeAttr('mandatory');
            $('#txtRoutingNmbr').removeAttr('mandatory');
            $('#txtBankName').removeAttr('mandatory');
            $('#txtBankAccNumber').removeAttr('mandatory');
            $('#txtTotlal').removeAttr('mandatory', '1');
            $('#txtCardNumber').removeAttr('mandatory', '1');
            $('#txtSecurityCode').removeAttr('mandatory', '1');
        }
    });

    $('#rdoBank').click(function () {
        if ($('#rdoBank').attr('checked', 'true')) {
            $('.card').attr('style', 'display:none!important;');
            $('.bank').show();
            $('#txtTotlal').removeAttr('mandatory');
            $('#txtCardNumber').removeAttr('mandatory');
            $('#txtSecurityCode').removeAttr('mandatory');
            $('#txtAccountName').attr('mandatory', '1');
            $('#txtRoutingNmbr').attr('mandatory', '1');
            $('#txtBankName').attr('mandatory', '1');
            $('#txtBankAccNumber').attr('mandatory', '1');
        }
    });

    $('#btnsubmit').click(function () {
        var container = '';
        var PaymentMode = $('#hdnPaymentMode').val(); //'<%=Convert.ToString(CustomerPortal.SessionAccessor.PaymentMode)%>';
        if (PaymentMode == "3") {
            container = "responsive";
        }
        else {
            container = "submitteddetailvalue";
        }
        if (!ValidateAllField(container)) {
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
            w2alert('Please enter a valid Payment Amount.');
            $('#txtTotlal').focus();
            return false;
        }
        if (PaymentMode != "3") {
            if ($('#rdoCredit').is(':checked')) {
                //Added by Abhilash Jha for Luhn's test on  credit card
                if ($("#txtCardNumber").val() != "") {
                    var s1 = 0;
                    var s2 = 0;
                    var num = parseInt($('#txtCardNumber').val());
                    if (isNaN(num)) {
                        error.showerror($('#txtCardNumber'), "Please enter a valid card number")
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
                        error.showerror($('#txtCardNumber'), "Please enter a valid card number")
                        return false;
                    }
                }
                else if ($("#txtCardNumber").val() == "") {
                    error.showerror('#txtCardNumber', 'Please enter valid card number.');
                    return false;
                }
                else if (!EmailValidator(document.getElementById("txtemail"))) {

                    return false;
                }
            }
            else if ($('#rdoBank').is(':checked')) {
                if ($("#txtBankAccNumber").val() != "") {
                }
                else if ($("#txtBankAccNumber").val() == "") {
                    error.showerror('#txtBankAccNumber', 'Please enter valid Account number.');
                    return false;
                }
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
                if ($('#txtTotlal').text() != '') {
                    if ($('#txtTotlal').text() <= 0) {
                        error.showerror('#txtTotlal', 'Please enter valid amount.');
                        return false;
                    } else {
                        if ($('#hdnPowerAmount').val() != '') {
                            str += $('#hdnPowerAmount').val() + '|';
                        } else {
                            str += 0 + '|';
                        }
                        if ($('#hdnWaterAmount').val() != '') {
                            str += $('#hdnWaterAmount').val() + '|';
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
            var currency = "USD";
            var paidAmount = $('#txtTotlal').val();
            var billid = $('#lblBillingID').text();
            var param = "currency=" + currency + "&amount=" + paidAmount + "&emailid=" + '<%=Convert.ToString(CustomerPortal.SessionAccessor.EmailID)%>' + "&description=Bill Payment&BillName=Electric Bill&InvoiceNumber=" + billid + "&notepayee=Test";

            param = param + "&clientid=" + '<%=Convert.ToString(CustomerPortal.SessionAccessor.ClientID)%>' + "";
            param = param + "&clientsecret=" + '<%=Convert.ToString(CustomerPortal.SessionAccessor.ClientSecret)%>' + "";

            $.ajax({
                type: "POST",
                url: "Makeonetimepayment.aspx/PayPalMethod",
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
            if (PaymentMode == "2") {
                var name = $('#txtfirtname').val() + ' ' + $('#txtlastname').val();
                str += "|" + name + "|" + $('#txtCardNumber').val() + "|" + $('#ddlMonth').val() + "|" + $('#ddlYear').val() + "|" + $('#txtSecurityCode').val() + "|" + $('#txtemail').val();
            }

            str += "|" + $('#hdnAccountNumber').val() + "|" + $('#hdnLoginToken').val() + "|" + $('#hdnPaymentMode').val() + "|" + $('#hdnAccountID').val() + "|" + $('#hdnMerchantPin').val();

            var result = NewOneTimePayment.PayBill(str).value;
            ///Added by khushbu kansal
            /// this is used to add card details in database when user wants to save the card details
            if ($("#chkStoreInfo").prop("checked") == true) {
                var x = createParametersForAddUpdate();
                var param = { json: x };
                $.ajax({
                    type: "POST",
                    url: "Makeonetimepayment.aspx/AddUpdatePayment",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessAddPayment,
                    error: OnErrorAddPayment
                });
            }


            function createParametersForAddUpdate() {
                var param = '';
                param = "CardName=" + $('#txtfirtname').val() + "&CardType=" + $('#hdnCardtype').val() + "&CardNumber=" + $('#txtCardNumber').val() + "&ExpiryMonth=" + $('#ddlMonth').val();
                param += "&ExpiryYear=" + $('#ddlYear').val() + "&SecurityCode=" + $('#txtSecurityCode').val();
                param += "&Mode=3" + "&IsBankAccount=0";
                mode = 'add';
                action = 'Credit';
                return param;
            }

            function OnErrorAddPayment(request, status, error) {
                toastr.error('Error ' + error);
            }

            function OnSuccessAddPayment(data, status) {
            }

            if (PaymentMode == 2) {
                if (result != null && result.Rows[0]["Status"].toString() != '0') {

                    var totalamount = $('#hdnTPAmount').val();
                    var left = result.Rows[0].RemainingAmount;
                    if (left > 0) {
                        $('#lblBalanceleft').attr('class', 'red');
                        $('#lblBalanceleft').text('$' + left);
                    } else if (left < 0) {
                        $('#lblBalanceleft').attr('class', 'green');
                        $('#lblBalanceleft').text('$' + left + ' CR');
                    } else {
                        $('#lblBalanceleft').attr('class', 'green');
                        $('#lblBalanceleft').text('$' + left);
                    }
                    var temp = result.Rows[0]["Message"].toString();
                    var msg = temp.replace("<Balance>", result.Rows[0]["RemainingBalance"]);

                    $('#lblMessage').text(msg);
                    $('#changeText').text('Thank you. We are processing your Payment');
                    $('#divthankpay').show();
                    $("#submitteddetailvalue").hide();
                    $("#submitteddetail").hide();
                    $('#securityCode').attr('readonly', 'readonly');
                } else {

                    if (result != null) {
                        toastr.error(result.Rows[0]["Message"].toString());
                    }
                    else {
                        toastr.error('Error ' + error)
                    }
                }
            }
            else {
                if (result != null && result.Rows[0]["Status"].toString() != '0') {
                    var totalamount = $('#hdnTPAmount').val();
                    var left = result.Rows[0].remainingbalance;
                    if (left > 0) {
                        $('#lblBalanceleft').attr('class', 'red');
                        $('#lblBalanceleft').text('$' + left);
                    } else if (left < 0) {
                        $('#lblBalanceleft').attr('class', 'green');
                        $('#lblBalanceleft').text('$' + left + ' CR');
                    } else {
                        $('#lblBalanceleft').attr('class', 'green');
                        $('#lblBalanceleft').text('$' + left);
                    }
                    var temp = result.Rows[0]["Message"].toString();
                    var msg = temp.replace("<Balance>", result.Rows[0]["RemainingBalance"]);
                    $('#lblMessage').text(msg);
                    $('#changeText').text('Thank you. We are processing your Payment');
                    $('#divthankpay').show();
                    $("#submitteddetailvalue").hide();
                    $("#submitteddetail").hide();
                    $('#securityCode').attr('readonly', 'readonly');
                } else {
                    if (result != null) {
                        toastr.error(result.Rows[0]["Message"].toString())
                    } else {
                        toastr.error("Error");
                    }
                }
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
                    default:
                        toastr.warning($('#ML_OnetimePayment_Msg_CreditCard').text());
                        $("#ImgCard").show();
                        $('#ImgVisa').hide();
                        $('#Imgamex').hide();
                        $('#ImgMaster').hide();
                        $('#ImgDiscov').hide();
                        $('#hdnCardtype').val('');
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
    }, { accept: ['visa', 'mastercard', 'discover', 'amex'] });

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
    else
        type = "";

    switch (type) {
        case "visa":
            $('#ImgVisa').show();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('Visa');
            maxlength = 3;
            cardlenth = 16;
            break;
        case "mastercard":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').show();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('MasterCard');
            break;
        case "discover":
            maxlength = 3;
            cardlenth = 16;
            $('#ImgVisa').hide();
            $('#Imgamex').hide();
            $('#ImgMaster').hide();
            $('#ImgCard').hide();
            $('#ImgDiscov').show();
            $('#hdnCardtype').val('Discover');
            break;
        case "amex":
            maxlength = 4;
            cardlenth = 15;
            $('#ImgVisa').hide();
            $('#Imgamex').show();
            $('#ImgMaster').hide();
            $('#ImgDiscov').hide();
            $('#ImgCard').hide();
            $('#hdnCardtype').val('American Express');
            $('#txtSecurityCode').attr('maxlength', '4');
            $('#txtCardNumber').attr('maxlength', '15');
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
            $('#errorMsg').html('Please enter all the mandatory information.');
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
        var param = {RoutingNumber : "RoutingNumber=" + $('#txtRoutingNmbr').val() };
        $('#txtBankName').prop('readonly', false);
        if ($('#txtRoutingNmbr').val().length == 9) {
            $.ajax({
                type: "POST",
                url: "Makeonetimepayment.aspx/GetBankName",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessBankName,
                error: OnErrorBankName
            });

            function OnSuccessBankName(data, status) {
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
                toastr.error("Error")
            }
        }

        else if ($('#txtRoutingNmbr').val().length > 0) {
            error.showerror($('#txtRoutingNmbr'), $('#txtRoutingNmbr').attr('ValidateMessage'));
            $('#txtBankName').val('');
            $('#txtRoutingNmbr').val('');
            $('#txtRoutingNmbr').focus();
            return false;
        }
        else {
            $('#txtBankName').val('');
            return false;
        }
    }
    else {
        return true;
    }
    loader.hideloader();
}