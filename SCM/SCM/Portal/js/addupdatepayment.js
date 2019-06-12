var maxlength = 0;
var cardlenth = 0;
$(document).ready(function () {
    reset();
    $('#txtCardName').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtCardNumber').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#txtSecurityCode').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    var scode = $('#securitycode').text();
    $('#txtSecurityCode').attr('placeholder', scode);

    $('#txtCardNumber').change(function () { $('#txtSecurityCode').val(""); });
    $("#txtCardName").blur(function () {
        s = document.getElementById("txtCardName").value;
        s = s.replace(/(^\s*)|(\s*$)/gi, "");
        s = s.replace(/[ ]{2,}/gi, " ");
        s = s.replace(/\n /, "\n");
        document.getElementById("txtCardName").value = s;
    });

    $("#txtAccountHolderName").blur(function () {
        acc = document.getElementById("txtAccountHolderName").value;
        acc = acc.replace(/(^\s*)|(\s*$)/gi, "");
        acc = acc.replace(/[ ]{2,}/gi, " ");
        acc = acc.replace(/\n /, "\n");
        document.getElementById("txtAccountHolderName").value = acc;
    });


    //Added by khushbu kansal for bug id 9601
    function testRoutingNumber() {
        if (!$('#rdoCredit').prop('checked')) {
            var param = "RoutingNumber=" + $('#txtRoutingNumber').val();
            $('#txtBankName').prop('readonly', false);
            if ($('#txtRoutingNumber').val().length == 9) {
                var result = AddUpdatePayment.GetBankName(param).value.Rows;
                if ((result != null || result != undefined) && (result.length > 0)) {
                    $('#txtBankName').val(result[0].BankName);
                    $('#txtBankName').prop('readonly', true);
                    $('#txtBankName').attr("enable", false);
                    return true;
                }
                else if (result.length == 0) {
                    //alert($('#NewRouting').text());
                    //toastr.error($('#NewRouting').text())
                    error.showerror($('#txtRoutingNumber'), $('#txtRoutingNumber').attr('ValidateMessage'));
                    $('#txtBankName').prop('readonly', true);
                    $('#txtBankName').attr("enable", false);
                    $('#txtRoutingNumber').val('');
                    return false;
                }

            }

            else if ($('#txtRoutingNumber').val().length > 0) {
                //alert($('#InvalidRouting').text());
                //toastr.warning($('#InvalidRouting').text())
                error.showerror($('#txtRoutingNumber'), $('#txtRoutingNumber').attr('ValidateMessage'));
                $('#txtBankName').val('');
                $('#txtRoutingNumber').val('');
                $('#txtRoutingNumber').focus();
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
    }

    k('#txtRoutingNumber').blur(function () {

        testRoutingNumber();

    });
    //This code will call when a user will clicks on addnew popup cancel button.
    $('#btnCancel').click(function () {
        reset();
    });

    $('#btnclosepopup').click(function () { reset(); });

    $('.upper_text input[type="radio"]').change(function () {
        if (this.value == '0') {
            $('#divCreditDetails').show();
            $('#divBankDetails').hide();
            $("#rdoCredit").show();
            $("#rdoBank").show();
            $('#divBankDetails input[type=text],input[type=password]').val('');
            $('#ddlYear option:first-child').attr('selected', true);
            setMonth();
        }
        else {
            $('#divCreditDetails').hide();
            $('#divBankDetails').show();
            $("#rdoCredit").show();
            $("#rdoBank").show();
            $('#divCreditDetails input[type=text],input[type=password]').val('');
            $('#ddlYear option:first-child').prop('selected', true);
            setMonth();
            setCreditCardType('');
        }
    });

    $('#txtCardNumber').validateCreditCard(function (result) {
        try {
            if ($('#txtCardNumber').attr('readonly') == "readonly") {
                return false;
            }
            if (result.card_type != null) {
                $('#txtCardNumber').attr('maxlength', result.card_type.valid_length[0]);
                //maxlength = result.card_type.valid_length[0];
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
                        //w2alert($('#InfoMsg').text());
                        toastr.warning($('#InfoMsg').text())
                        $("#ImgCard").show();
                        $('#ImgVisa').hide();
                        $('#Imgamex').hide();
                        $('#ImgMaster').hide();
                        $('#ImgDiscov').hide();
                        $('#hdnCardtype').val('');
                }
            }
            else {

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
    $('#ddlYear').change(function () {

        try {
            var selected_year = $("#ddlYear option:selected").text();
            var selected_month = $("#ddlMonth option:selected").val();
            DT = $('#hdnCurrentDate').val().split("-");
            var start_month = selected_month;

            if (selected_year == DT[0]) {
                if (selected_month < (parseInt(DT[2]) + 1))
                    start_month = parseInt(DT[2]) + 1;
                $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);
            }
            else {
                var start_month = 1;
            }
        }
        catch (e) { }
    });

    $('#ddlMonth').change(function () {
        try {
            var selected_year = $("#ddlYear option:selected").text();
            var selected_month = $("#ddlMonth option:selected").val();
            DT = $('#hdnCurrentDate').val().split("-");
            var start_month = 1;

            if (selected_year == DT[0]) {
                if (selected_month < (parseInt(DT[2]) + 1)) {
                    $("#ddlMonth option").removeAttr('selected');
                    start_month = parseInt(DT[2]) + 1;
                    $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);
                }
            }
        }
        catch (e) { }
    });

    $('#addnewpayment').click(function () {
        $('#txtCardNumber').removeAttr('readonly');
        $('#txtRoutingNumber').removeAttr('readonly');
        $('#txtBankAccount').removeAttr('readonly');
        $('#divcreditrdobtn').removeClass('new');
        $('#divbankrdobtn').removeClass('new');
        reset();
        $('#hdnpaymentmode').val('add');

        var selected_year = $("#ddlYear option:selected").text();
        var selected_month = $("#ddlMonth option:selected").val();
        DT = $('#hdnCurrentDate').val().split("-");
        var start_month = selected_month;

        if (selected_year == DT[0]) {
            if (selected_month < (parseInt(DT[2]) + 1))
                start_month = parseInt(DT[2]) + 1;
            $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);
        }
        else {
            var start_month = 1;
        }
    });


    //This event will when user will edit his payment information.
    k('.edit').live('click', function (e) {

        $('#hdnpaymentmode').val('update');
        $('#btnAddUpdate').val($('#UpdtBtnVal').text());
        $('#btnAddUpdate').attr('title', $('#UpdtBtntitle').text());
        $('#myModalLabelheadertext').html($("#edittext").text());
        $('#btnCancel').hide();

        var value = $(this).attr('id');
        var dataarray = value.split('|');       
        $('#hdnPaymentId').val(dataarray[0]);
        $('#hdnvaultid').val(dataarray[1]);
        if (dataarray[dataarray.length - 1] == '1') {
            $('#txtCardNumber').attr('readonly', 'readonly');
            ClearValidadtion('divCreditDetails');
            //credit card
            $('#divcreditrdobtn').show();
            $('#divbankrdobtn').hide();
            $('#divcreditrdobtn').addClass('new')
            $('#divBankDetails').hide();
            $('#divCreditDetails').show();
            $("#rdoCredit").prop("checked", true);
            $('#txtCardName').val(dataarray[5]);
            var cardnumber = pad(dataarray[3],16);
            $('#txtCardNumber').val(cardnumber);

            //var obj = $('#txtCardNumber');
            //onTextChange(obj[0]);
            $('#ddlYear').val(dataarray[4].split('/')[1].toString().substring(2, 4));
            $("#rdoCredit").hide();
            setMonth();
            $('#ddlMonth').val(dataarray[4].split('/')[0]);
            var cardtype = dataarray[2].toLowerCase().toString().indexOf('american_express') > -1 ? 'amex' : dataarray[2].toLowerCase();
            setCreditCardType(cardtype);
        }
        else {
            //$('#txtRoutingNumber').attr('readonly', 'readonly');
            //$('#txtBankAccount').attr('readonly', 'readonly');
            ClearValidadtion('divBankDetails');
            var bankNamearr = dataarray[1].split('>');
            $('#divcreditrdobtn').hide();
            $('#divbankrdobtn').addClass('new')
            $('#divbankrdobtn').show();
            $("#rdoBank").hide();
            $('#divBankDetails').show();
            $('#divCreditDetails').hide();
            $("#rdoBank").prop("checked", true)
            $('#txtAccountHolderName').val(dataarray[5]);
            $('#txtBankName').val(bankNamearr[1]);
            $('#txtBankAccount').val(dataarray[2]);
            $('#hdnActualTextValue').val(dataarray[2]);
            var bankacc = dataarray[2].replace(/\d{4}(?=\d{4})/g, "****");
            $('#txtBankAccount').val('');
            //var obj = $('#txtBankAccount');
            //onTextChange(obj[0]);
            $('#txtRoutingNumber').val(dataarray[3]);
            //Added by Abhilash Jha to display Bank name disabled when user click on edit
            $('#txtBankName').prop('readonly', true);
            $('#txtBankName').attr("enable", false);
            //EndComment
        }
    });
    function createParametersForAddUpdate() {
        var param = '';
        if ($('#rdoCredit').prop('checked')) {
            param = "CardNumber=" + escape($('#txtCardNumber').val()) + "&cardExpMonth=" + $('#ddlMonth').val();
            param += "&cardExpYear=" + $('#ddlYear').val() + "&PaymentJunctionCustId=" + $('#hdnpayjuntionid').val();
            if ($('#hdnpaymentmode').val() == 'add') {
                param += "&Mode=3";
                mode = 'add';
            }
            else {
                param += "&Mode=5" + "&Vaultid=" + $('#hdnvaultid').val();
                mode = 'edit'
            }
            action = 'Credit';
        }
        else {
            param = "achAccountNumber=" + escape($('#txtBankAccount').val()) + "&achRoutingNumber=" + escape($('#txtRoutingNumber').val()) + "&achAccountType=" + escape($('#ddlaccounttype').val()) + "&achType=PPD" + "&PaymentJunctionCustId=" + $('#hdnpayjuntionid').val();
            if ($('#hdnpaymentmode').val() == 'add') {
                param += "&Mode=3";
                mode = 'add';
            }
            else {
                param += "&Mode=5" + "&PayTypeId=" + escape($('#hdnPaymentId').val()) + "&IsBankAccount=1";
                mode = 'edit';
            }
            action = 'Bank';
        }
        return param;
    }
    $('#btnAddUpdate').click(function () {     
        //testRoutingNumber();  //Added by khushbu kansal for bug id 9601
        if (validatefields() == true) {
            var x = createParametersForAddUpdate();
            var param = { json: x };
            loader.showloader();
            $.ajax({
                type: "POST",
                url: "account.aspx/AddUpdatePayment",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessAddPayment,
                error: OnErrorAddPayment
            });
        }
    });
    function OnSuccessAddPayment(data, status) {
        loader.hideloader();

        if (JSON.parse(data.d)[0].Status == '1') {
            try {
                if ($('#hdnCallByAng').val() == "0") {
                    databindtogrid = account.LoadW2UIGridData().value.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {
                        //The following code loads w2ui grid with a different name everytime a record is deleted.                                
                        LoadGrid($('#wugrid').attr('name') + Math.floor((Math.random() * 100) + 7));

                    }


                }
                else {
                    angular.element('#PaymentTable').scope().loadPaymentInfo();

                }

            }
            catch (e) {
                console.log(e.message);
            }
            $('#divPopup').hide();
            if (location.href.indexOf('recurringpayment') > -1) {
                var paymentdata = recurringpaymnetportal.GetPaymentData().value;
                if (paymentdata != null) {
                    databindtogrid = paymentdata.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {
                        if ((JSON.parse(data.d)[0].Message).indexOf('credit') > -1)
                            BindDropDown(1);
                        else
                            BindDropDown(2);
                    }

                }
            }
        }
        //w2alert(JSON.parse(data.d)[0].Message);
        // show message according to function
        if (JSON.parse(data.d)[0].Status == '1') {
            if ($('#hdnpaymentmode').val()=="add"){
            if ($('#rdoCredit').prop('checked'))
                toastr.success($('#CrInfoAddedMsg').text());
            else toastr.success($('#BankInfoAddedMsg').text());
            } else {
                if ($('#rdoCredit').prop('checked'))
                    toastr.success($('#CardUpdateSucMsg').text());
                else toastr.success($('#BankUpdatedSucMsg').text());
            }
        }
        else toastr.error($('#TxnFailedMsg').text());
        



    }
    function OnErrorAddPayment(request, status, error) {
        //alert('Error ' + error);
        toastr.error('Error ' + error)
    }

    //This function is use to validate the fields at the time of add and edit payment method.
    function validatefields() {
        $('#hdnMonth').val($('#ddlMonth').val())
        if ($('#rdoCredit').prop('checked')) {
            if (ValidateAllPageFieldsSingleMessage('divCreditDetails')) {//#5274
                return true
            }
            else
                return false;
            // }
        }
        else {
            if (ValidateAllPageFieldsSingleMessage('divBankDetails')) {//#5274

                if (testRoutingNumber()) { return true; }
                else { return false; }

            }
            else
                return false;
        }
    }

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
    else if (type.toString().indexOf("american_express") > -1)
        type = "amex";
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
            $('#hdnCardtype').val('american_express');
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

function setMonth() {
    try {
        var pad = "0"
        var selected_year = $("#ddlYear option:selected").text();
        var selected_month = $("#ddlMonth option:selected").val();
        DT = $('#hdnCurrentDate').val().split("-");
        var start_month = 0;
        if (selected_year == DT[0]) {
            if (selected_month < parseInt(DT[2]))
                start_month = parseInt(DT[2]) + 1;
        }
        else {
            start_month = 1;
        }
        $("#ddlMonth option[value=" + start_month + "]").prop('selected', true);

    }
    catch (e) { }
}
//This function is used to reset all the fields of addnew popup when a user will click close or cancel button.
function reset() {
    $('#myModalLabelheadertext').html($("#addtext").text());
    $('#lblBankName').html('');
    $("#divBankDetails input[type='text'],input[type='password']").val('');
    $("#divCreditDetails input[type='text'],input[type='password']").val('');
    $('#btnAddUpdate').val($('#AddBtnVal').text());

    //Added for Bug Id: 10368
    $('#txtCardName').removeClass('errorbox');
    $('#txtCardNumber').removeClass('errorbox');
    $('#txtSecurityCode').removeClass('errorbox');
    $('#txtAccountHolderName').removeClass('errorbox');
    $('#txtRoutingNumber').removeClass('errorbox');
    $('#txtBankName').removeClass('errorbox');
    $('#txtBankAccount').removeClass('errorbox');
    //End Comment

    $('#btnCancel').show();
    $('#rdoBank').show();
    $('#rdoCredit').show();

    //  $('#rdoBank').removeAttr('checked');
    $('#ddlYear option:first-child').attr('selected', true);

    if ($('#rdoBank').prop("checked") == true) {
        $("#divbankrdobtn").show();
        $('#txtAccountHolderName').text('');
        $('#txtRoutingNumber').text('');
        $('#txtBankName').text('');
        $('#txtBankAccount').text('');
    }
    else if ($('#rdoCredit').prop("checked") == true) {
        $("#divcreditrdobtn").show();
        setMonth();
        setCreditCardType('');
    }



    //#5451-start
    switch ($('#hdnpaymenttype').val()) {
        case "0":
            if ($('#rdoBank').prop("checked") == true) {
                //$('#divcreditrdobtn').show();
                $('#divbankrdobtn').show();
                $('#divBankDetails').show();
                //$('#divCreditDetails').show();
                $("#rdoBank").prop("checked", true);
                $('#divcreditrdobtn').show();
            }
            else {
                $('#divcreditrdobtn').show();
                $('#divbankrdobtn').show();
                $('#divBankDetails').hide();
                $('#divCreditDetails').show();
                $("#rdoCredit").prop("checked", true);
            }


            break;
        case "1":
            $('#divcreditrdobtn').show();
            $('#divbankrdobtn').hide();
            $('#divBankDetails').hide();
            $('#divCreditDetails').show();
            $("#rdoCredit").prop("checked", true);
            break;
        case "2":
            $('#divcreditrdobtn').hide();
            $('#divbankrdobtn').show();
            $('#divBankDetails').show();
            $('#divCreditDetails').hide();
            $("#rdoBank").prop("checked", true);
            break;
        default:
            $('#divcreditrdobtn').show();
            $('#divbankrdobtn').show();
            $('#divBankDetails').hide();
            $('#divCreditDetails').show();
            $("#rdoCredit").prop("checked", true);
            break;
    }
    //#5451-end
    // }
}





function onTextChange(obj) {
    document.getElementById('hdnActualTextValue').value = obj.value;
    obj.value = "";
    {
        var i = 0;

        for (; i < document.getElementById('hdnActualTextValue').value.length ; i++) {
            obj.value += document.getElementById('hdnActualTextValue').value.charAt(i);
            //OR ANY OTHER CHARACTER OF YOUR CHOICE
        }
    }

}

//Added to clear errorbox class when a texbox has some value
k('#txtCardName').live('blur', function () {
    if ($('#txtCardName').val().trim() != '')
        $('#txtCardName').removeClass('errorbox');
});

k('#txtCardNumber').live('blur', function () {
    if ($('#txtCardNumber').val().trim() != '')
        $('#txtCardNumber').removeClass('errorbox');
});

k('#txtSecurityCode').live('blur', function () {
    if ($('#txtSecurityCode').val().trim() != '')
        $('#txtSecurityCode').removeClass('errorbox');
});

k('#txtAccountHolderName').live('blur', function () {
    if ($('#txtAccountHolderName').val().trim() != '')
        $('#txtAccountHolderName').removeClass('errorbox');
});

k('#txtRoutingNumber').live('blur', function () {
    if ($('#txtRoutingNumber').val().trim() != '')
        $('#txtRoutingNumber').removeClass('errorbox');
});

k('#txtBankName').live('blur', function () {
    if ($('#txtBankName').val().trim() != '')
        $('#txtBankName').removeClass('errorbox');
});

k('#txtBankAccount').live('blur', function () {
    if ($('#txtBankAccount').val().trim() != '')
        $('#txtBankAccount').removeClass('errorbox');
});
//End Comment