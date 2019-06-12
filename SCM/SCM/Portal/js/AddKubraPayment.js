function createParametersForAddUpdate() {
    var param = '';
    param += "FirstName=" + $('#txtFirstName').val();
    param += "&LastName=" + $('#txtLastName').val();
    param += "&AccountNickname=" + $('#txtNickName').val();
    param += "&AccountType=" + $('input[type=radio][name="ctl00$ContentPlaceHolder1$AddUpdatePayment$grpAddType"]:checked').val();
    param += "&AccountDescription=" + $('#txtAccountDescription').val();
   
    if ($('#rdoCredit').attr('checked')) {
        param += "&zipcode=" + $('#txtZipCode').val();
        param += "&CardName=" + $('#txtCardName').val() + "&CardType=" + $('#hdnCardtype').val() + "&CardNumber=" + $('#txtCardNumber').val() + "&ExpiryMonth=" + $('#ddlMonth').val();
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
        param += "&BankName=" + $('#txtBankName').val() + "&BankAccount=" + $('#txtBankAccount').val() + "&BankRouting=" + $('#txtRoutingNumber').val() + "&AccountHolderName=" + $('#txtAccountHolderName').val();
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
$(document).ready(function () {
    $('#btnAddUpdateCardBank').click(function () {
        if (validatefields() == true) {
            var x = createParametersForAddUpdate();
            var param = {
                json: x,
                creditcard: $('input[type=radio][name="ctl00$ContentPlaceHolder1$AddUpdatePayment$grpAddNew"]:checked').val()
            };
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
});
function OnSuccessAddPayment(data, status) {
    loader.hideloader();

    if (data.d == "SUCCESS") {
        databindtogrid = accountkubra.LoadW2UIGridData().value.Rows;
        LoadGrid($('#wugrid').attr('name') + (r + 2));
        $('#divPopup').hide();
    }
    w2alert(data.d);

}
function OnErrorAddPayment(request, status, error) {
    alert('Error ' + error);
}