var isbankdraft = false; 
var isenroll = false;
var iswithdraw = false;
var isbank = false;
var BankDataList = '';
var CardDataList = '';
var alreadyenrolledbankid = '';

function GetExpirydate(selecteddate) {
    var pad = '00';
    var newdate = new Date(Date.UTC(selecteddate.substring(selecteddate.indexOf('/') + 1, selecteddate.length), selecteddate.substring(0, selecteddate.indexOf('/'))));
    newdate = newdate.getFullYear() + '-' + pad.substring(0, pad.length - (newdate.getMonth() + 1).toString().length) + (newdate.getMonth() + 1).toString() + '-' + pad.substring(0, pad.length - newdate.getDate().toString().length) + newdate.getDate().toString();
    return newdate;
}

function ValidateBankEnroll() {
    if ($('#txtAccountNumberbank').val().trim() == '') {
        alert('Please enter your bank account#.')
        $('#txtAccountNumberbank').focus();
        return false;
    }
    else if ($('#txtRoutingNumberbank').val().trim() == '') {
        alert('Please enter your Routing #.')
        $('#txtRoutingNumberbank').focus();
        return false;
    }
    else if ($('#txtAccountHolderbank').val().trim() == '') {
        alert('Please enter your name as it appears on your Bank Account.')
        $('#txtAccountHolderbank').focus();
        return false;
    }

    else if ($('#txtAccountNumberbank').val().trim().length < 8) {
        alert('Account # must be 8 to 16 digits long.')
        $('#txtAccountNumberbank').focus();
        return false;
    }
    else if ($('#txtRoutingNumberbank').val().length < 9) {
        alert('Routing # must be 9 digits long.');
        $('#txtRoutingNumberbank').focus();
        return false;
    }
    else { return true; }
}

$(document).ready(function () {
    try {
        $('#divselectaddress').click(function () {
            $('.addresspanel').toggle();
        });

        $(document).click(function (e) {
            if (!$(e.target).is('.addresspanel, .chkaddresses *,.divselectaddress')) {
                $(".addresspanel").hide();
            }
        });

        $('#btnSaveChanges').click(function () {
            setdefaultpayment();
        });


        $('#btnEnrollNow').click(function () {
            if (common.checksession().value) {
                location.reload();
            }
            var result = PaymentInfo.CheckOpenitems($('#ddlChildAddress').val());
            if (result != null && result.value) {
                alert('Please pay all oustanding  balance due in full before enrolling in Automatic Bank Draft.');
                return false;
            }
            isenroll = true;
            $('#divEdittitle').show();
            $('#divEditEnrollNow').show();
            $('#divEnrollNow').hide();
            $('#divconfirmbackbuttons').show();
            $('#divcreditbankinfo').hide();
            $('#divSaveButton').hide();
        });
        $('#btnBackBank').click(function () {
            if (isenroll) {
                $('#divEdittitle').hide();
                $('#divEditEnrollNow').hide();
                $('#divEnrollNow').show();
                $('#divconfirmbackbuttons').hide();
                $('#divcreditbankinfo').show();
                $('#divSaveButton').show();
            }
            else {
                iswithdraw = false;
                $('#divAlreadyEnrolled').show();
                $('#divchangetext').show();
                $('#divchangebuttons').show();
                $('#divEdittitle').hide();
                $('#divEditEnrollNow').hide();
                $('#divconfirmbackbuttons').hide();
                $('#divcreditbankinfo').show();
                $('#divSaveButton').show();
            }
        });
        $('#btnConfirmBank').click(function () {
            if (common.checksession().value) {
                location.reload();
            }
            var type = '';
            var PF_CONTRACT = '';
            var EBVTY = '';
            var BANKL = '';
            var BANKN = '';
            var KOINH = '';
            var ACCNAME = '';

            PF_CONTRACT = $('#ddlChildAddress').val();
            if (iswithdraw) {
                if (confirm("Are you sure you want to withdraw from Automatic Bank Draft.")) {
                    type = '0';
                    var result = paymentinfo.EnrollBankDraft(type, PF_CONTRACT, EBVTY, BANKL, BANKN, KOINH, ACCNAME).value;
                    if (result == null) {
                        alert('Unable to proceed with the withdraw process.');
                        return false;
                    }
                    else {
                        alert(result.Message);
                        location.reload();
                    }
                }
            }
            else {
                if ($('#chkBankDraft').is(':checked')) {
                    if ($('#rdobuttonExistingbank').is(':checked')) {
                        type = isbankdraft ? '4' : '3';
                        EBVTY = $('#ddlBank').val();
                    }
                    else {
                        type = isbankdraft ? '2' : '1';
                        if (ValidateAllPageFieldsSingleMessage('divEditEnrollNow')) {
                            if (ValidateBankEnroll()) {
                                BANKL = $('#txtRoutingNumberbank').val();
                                BANKN = $('#txtAccountNumberbank').val();
                                KOINH = $('#txtAccountHolderbank').val();
                                ACCNAME = $('#txtAccountDescriptionbank').val();
                            }
                            else
                                return false;
                        }
                        else
                            return false;
                    }
                    var result = paymentinfo.EnrollBankDraft(type, PF_CONTRACT, EBVTY, BANKL, BANKN, KOINH, ACCNAME).value;
                    if (result == null) {
                        alert('Unable to proceed with the Enrollment process.');
                        return false;
                    }
                    else {
                        alert(result.Message);
                        location.reload();
                    }
                }
                else {
                    alert('Please accept terms and conditions.');
                    return false;
                }
            }
        });
        $('#btnChangeBank').click(function () {
            isenroll = false;
            $('#divchangetext').hide();
            $('#divEdittitle').hide();
            $('#divAlreadyEnrolled').show();
            $('#divEditEnrollNow').show();
            $('#divEnrollNow').hide();
            $('#divconfirmbackbuttons').show();
            $('#divcreditbankinfo').hide();
            $('#divSaveButton').hide();
            $('#divchangebuttons').hide();
        });
        $('#btnWithdrawBank').click(function () {
            iswithdraw = true;
            $('#divAlreadyEnrolled').show();
            $('#spanchangetext').text('I hereby withdraw the Automatic Bank Draft Authorization for the bank details above.');
            $('#divchangetext').show();
            $('#divEnrollNow').hide();
            $('#divchangebuttons').hide();
            $('#divEdittitle').hide();
            $('#divEditEnrollNow').hide();
            $('#divSaveButton').hide();
            $('#divcreditbankinfo').hide();
            $('#divconfirmbackbuttons').show();
        });
    }
    catch (e) { }
});

function setdefaultpayment() {
    try {
        if (common.checksession().value) {
            location.reload();
        }
        paymentinfo.setpaymentsession($("#tblPayment input[name=paymentinfo]:checked").val());
        alert('Default payment option saved successfully.');
    }
    catch (e) { }
}


function setPayment(data) {
    try {
        var strdata = '';
        var isdefault = false;
        var paymentsession = paymentinfo.checkpaymentsession().value;
        if (paymentsession != null) {
            isdefault = true;
        }
        else
            isdefault = false;
        if (!isdefault) {
            if (data.BankDataList != null && data.BankDataList.length > 0) { paymentsession = '0|' + data.BankDataList[0].BankID; }
            else if (data.CardDataList != null && data.CardDataList.length > 0) { paymentsession = '1|' + data.CardDataList[0].CardID; }
            else { paymentsession = ''; }
        }
        if (data.BankDataList != null) {
            BankDataList = data.BankDataList;
            for (var j = 0; j < data.BankDataList.length; j++) {
                var check = (paymentsession == '0|' + data.BankDataList[j].BankID) ? 'checked="checked"' : '';
                strdata += '<div class="MyAddressContainer"><div class="BankName">&nbsp;' + data.BankDataList[j].Description + '</div>'
                    + '<div class="AccCard">&nbsp;' + data.BankDataList[j].BankType + ' ' + data.BankDataList[j].BankAccNumber + '</div>'
                    + '<div class="ExpiryDate">&nbsp;</div>'
                    + '<div class="MyHouseRadioBtn"><input type="radio" value="' + '0|' + data.BankDataList[j].BankID + '" name="paymentinfo"' + check + '></div>'
                    + '<div class="MyHouseEditBtn"><input type="image" class="edt"  ID="Edit|B|' + data.BankDataList[j].BankID + '" runat="server" src="images/Payment_EditIcon.png" style="height:16px; width:16px;" /></div>'
                    + '<div class="MyHouseDeleteBtn"><input type="image" class="del" ID="Delete|B|' + data.BankDataList[j].BankID + '" runat="server" src="images/Payment_DeleteIcon.png" style="height:16px; width:16px;" /></div><div class="clear">&nbsp;</div></div>';
                $('#ddlBank').append($("<option></option>").val(data.BankDataList[j].BankID).html(data.BankDataList[j].BankType + ' ' + data.BankDataList[j].BankAccNumber));
            }
        }
        if (data.CardDataList != null) {
            CardDataList = data.CardDataList;
            for (var j = 0; j < data.CardDataList.length; j++) {
                var check = (paymentsession == '1|' + data.CardDataList[j].CardID) ? 'checked="checked"' : '';
                strdata += '<div class="MyAddressContainer"><div class="BankName">&nbsp;' + data.CardDataList[j].Description + '</div>'
                    + '<div class="AccCard" value="CardType">&nbsp;' + data.CardDataList[j].CardType + ' ' + data.CardDataList[j].CardNumber + '</div>'
                    + '<div class="ExpiryDate">&nbsp;' + data.CardDataList[j].ExpDate + '</div>'
                    + '<div class="MyHouseRadioBtn"><input type="radio" value="' + '1|' + data.CardDataList[j].CardID + '" name="paymentinfo"' + check + '></div>'
                    + '<div class="MyHouseEditBtn"><input type="image" class="edt"  ID="Edit|C|' + data.CardDataList[j].CardID + '" runat="server" src="images/Payment_EditIcon.png" style="height:16px; width:16px;" /></div>'
                    + '<div class="MyHouseDeleteBtn"><input type="image" class="del" ID="Delete|C|' + data.CardDataList[j].CardID + '" runat="server" src="images/Payment_DeleteIcon.png" style="height:16px; width:16px;" /></div><div class="clear">&nbsp;</div></div>';
            }
        }
        if (strdata == '') { strdata += 'No payment info on file.'; }

        $("#tblPayment").html(strdata);
        $(".edt").click(function () {
            editValues(this);
            return false;
        });

        $(".del").click(function () {
            if (!deleteCardBank(this))
                return false;
            else
                location.reload();
        });

    }
    catch (e) { }
}

function deleteCardBank(obj) {
    var IsBank = $(obj).attr('id').split('|')[1];
    var bankcardid = $(obj).attr('id').split('|')[2];
    if (DeleteBankCard(bankcardid, IsBank)) {
        return true;
    }
    else {
        return false;
    }
}

function editValues(obj) {
    Popup.showModal('divEidtPopup', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    var parentObj = $(obj).parent().parent();
    var AccCard = $(parentObj).find('.AccCard');
    var ExpiryDate = $(parentObj).find('.ExpiryDate');

    if ($(obj).attr('id').split('|')[1] == 'B') {
        $('#divEditCreditDetails').hide();
        $('#divEditBankDetails').show();
        $('#hdnbankid').val($(obj).attr('id').split('|')[2]);
        $('#hdnIsBank').val(1);
        var result = $.grep(BankDataList, function (e) { return e.BankID == $(obj).attr('id').split('|')[2]; });
        $('#txteditaccountdescription').val(result[0]["Description"]);
        $('#txteditholdername').val(result[0]["AccountHolderName"]);
        $('#txtEditBankName').val(result[0]["BankType"]);
        $('#txtEditBankAcc').val(result[0]["OrignalBankAccNumber"]);
        $('#txtEditRouting').val(result[0]["BankRoutingNumber"]);
    }
    else {
        $('#divEditCreditDetails').show();
        $('#divEditBankDetails').hide();
        $('#hdncardid').val($(obj).attr('id').split('|')[2]);
        $('#hdnIsBank').val(0);
        var result = $.grep(CardDataList, function (e) { return e.CardID == $(obj).attr('id').split('|')[2]; });
        $('#txtEditCardName').val(result[0]["HolderName"]);
        $('#txtEditCardno').val(result[0]["CardNumber"]);
        $('#txtEditExpDate').val(result[0]["ExpDate"]);
        $('#txtEditCardDescription').val(result[0]["Description"]);
        $('#hdnCardtype').val(result[0]["CardType"]);

        switch ($('#hdnCardtype').val()) {
            case 'VISA':
                $('#imgeditvisa').show();
                $('#imgeditmaster').hide();
                $('#imgeditcard').hide();
                break;
            case 'MC':
                $('#imgeditvisa').hide();
                $('#imgeditmaster').show();
                $('#imgeditcard').hide();
                break;
            default:
                $('#imgeditvisa').hide();
                $('#imgeditmaster').hide();
                $('#imgeditcard').show();
                break;
        }
    }
}

function BindAlreadyEnrolled(data) {
    try {
        alreadyenrolledbankid = data.AutoBankDraftDetails.BankID;
        var strdata = '<div><div class="BankName" style="width:141px;">&nbsp' + data.AutoBankDraftDetails.Description + '</div>'
             + '<div class="AccCard" style="width:180px;">' + data.AutoBankDraftDetails.AccountHolderName + '</div>'
             + '<div class="AccCard" style="width:180px;">&nbsp;' + data.AutoBankDraftDetails.BankAccNumber + '</div>'
             + '<div class="MyHouseEditBtn" style="width:133px;">&nbsp;' + data.AutoBankDraftDetails.BankRoutingNumber + '</div><div class="clear">&nbsp;</div></div>';
        $('#tblBankDraftInfo').html(strdata);
    }
    catch (e) { }
}

function AddEditBank() {
    try {
        var routingno = '';
        var accno = '';
        var banktype = '';
        var accholdername = '';
        var accdescription = '';

        var bankid = $('#hdnbankid').val().toString();
        var businesspartnerno = $('#hdnbusinesspartnerno').val().toString();
        var contractno = $('#hdncontractno').val().toString();
        var username = $('#hdnusername').val().toString();
        var email = $('#hdnemail').val().toString();
        var updatetype = $('#hdnupdatetype').val().toString();
        if (updatetype == 'SAVE') {
            routingno = $('#txtRoutingNumber').val().toString();
            accno = $('#txtBankAccount').val().toString();
            //banktype = $('#txtBankName').val().toString();
            accholdername = $('#txtAccountHolderName').val().toString();
            accdescription = $('#txtaccountdescription').val().toString();
        }
        else {
            routingno = $('#txtEditRouting').val().toString();
            accno = $('#txtEditBankAcc').val().toString();
            banktype = $('#txtEditBankName').val().toString();
            accholdername = $('#txteditholdername').val().toString();
            accdescription = $('#txteditaccountdescription').val().toString();
        }
        if (common.checksession().value) {
            location.reload();
        }
        var response = common.AddEditBank(bankid, banktype, accdescription, accholdername, accno, routingno, businesspartnerno, contractno, username, email, updatetype);
        alert(response.value.split('|')[1]);
        if (response.value.split('|')[0] == '1') {
            location.reload();
        }
        else { return false; }
    }
    catch (e) {
    }

}

function AddEditCard() {
    try {
        var descr = '';
        var cardname = '';
        var cardnumber = '';
        var expdate = '';

        var cardid = $('#hdncardid').val().toString();
        var businesspartnerno = $('#hdnbusinesspartnerno').val().toString();
        var contractno = $('#hdncontractno').val().toString();
        var username = $('#hdnusername').val().toString();
        var email = $('#hdnemail').val().toString();
        var updatetype = $('#hdnupdatetype').val().toString();
        var cardtype = $('#hdnCardtype').val().toString();
        if (updatetype == 'SAVE') {
            descr = $('#txtDescription').val().toString();
            cardname = $('#txtCardName').val().toString();
            cardnumber = $('#txtCardNumber').val().toString();
            expdate = GetExpirydate($('#txtExpirationDate').val());
        }
        else {
            descr = $('#txtEditCardDescription').val().toString();
            cardname = $('#txtEditCardName').val().toString();
            cardnumber = $('#txtEditCardno').val().toString();
            expdate = GetExpirydate($('#txtEditExpDate').val());
        }
        if (common.checksession().value) {
            location.reload();
        }
        var response = common.AddEditCard(cardid, cardtype, descr, cardname, cardnumber, expdate, businesspartnerno, contractno, username, email, updatetype);
        alert(response.value.split('|')[1]);
        if (response.value.split('|')[0] == '1') {
            location.reload();
        }
        else { return false; }
    }
    catch (e) {
    }

}

function DeleteBankCard(bankcardid, isbank) {
    if (common.checksession().value) {
        location.reload();
    }
    var businesspartnerno = $('#hdnbusinesspartnerno').val().toString();
    var username = $('#hdnusername').val().toString();
    var email = $('#hdnemail').val().toString();
    var response = '';
    if (isbank == 'B') {
        if (bankcardid == alreadyenrolledbankid) {
            alert('Bank Account cannot be deleted as you are enrolled for direct debit within this account. Please contact SCM via phone at 1-877-777-9020 or contact us via email at Contact Us.');
            return false;
        }
        if (confirm('Do you want to delete Bank Account?')) {
            response = common.DeleteBankCard(businesspartnerno, username, bankcardid, 'bank', email);
            alert(response.value);
        }
        else {
            return false;
        }
    }
    else {
        if (confirm('Do you want to delete Credit Card?')) {
            response = common.DeleteBankCard(businesspartnerno, username, bankcardid, 'card', email);
            alert(response.value);
        }
        else {
            return false;
        }
    }
    if (response != null)
        return true;
    else
        return false;
}

function GetCardType(number) {
    var re = new RegExp("^4[0-9]{5}|^4[0-9]{6}|^4[0-9]{7}|^4[0-9]{8}|^4[0-9]{9}|^4[0-9]{10}|^4[0-9]{11}|^4[0-9]{12}|^4[0-9]{13}|^4[0-9]{14}|^4[0-9]{15}$");
    if (number.match(re) != null)

        return "Visa";

    re = new RegExp("^5[1-5][0-9]{5}|^5[1-5][0-9]{6}|^5[1-5][0-9]{7}|^5[1-5][0-9]{8}|^5[1-5][0-9]{9}|^5[1-5][0-9]{10}|^5[1-5][0-9]{11}|^5[1-5][0-9]{12}|^5[1-5][0-9]{13}|^5[1-5][0-9]{14}|^5[1-5][0-9]{15}$");
    if (number.match(re) != null)

        return "MasterCard";

    return "";
}
var maxlength = 0;
var maxCardLength = 0;
function setcardtype(e, obj, crdtype) {
    var CT = "";
    if (crdtype == '') {
        var number = $(obj).val();
        if (number.toString().length == 16) {
            return;
        }
        number = "" + number + String.fromCharCode(e.keyCode);
        CT = GetCardType(number);
    }
    else {
        CT = crdtype;
    }
    if (CT != "") {
        $("#imgeditcard").hide();
        $('#txtEditCardno').attr('maxlength', '16');
        switch (CT) {
            case "Visa":
                maxlength = 3;
                maxCardLength = 16;
                $('#imgeditvisa').show();
                $('#imgeditmaster').hide();
                cardtype = 'Visa';
                break;
            case "MasterCard":
                maxlength = 3;
                maxCardLength = 16;
                $('#imgeditvisa').hide();
                $('#imgeditmaster').show();
                cardtype = 'MasterCard';
                $('#txtEditCardno').attr('maxlength', '16');
                break;
            default:
                {
                    cardtype = '';
                    break;
                }
        }
    }
    else {
        $("#imgeditcard").show();
        $('#imgeditvisa').hide();
        $('#imgeditamericanex').hide();
        $('#imgeditmaster').hide();
        $('#imgeditdiscover').hide();
        cardtype = '';
    }
}

