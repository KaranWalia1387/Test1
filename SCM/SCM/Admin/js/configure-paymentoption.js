var dt_result;
var dt_saveresult;

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}


$(document).ready(function () {
   
    loaddata();
    $(".submitBtn").click(function () {
        savebtn();
    });
});
function loaddata() {
    try {
        $("#txtApiLoginID").val('');
        $("#txtApiTransactionKey").val('');
        $("#txtClientID").val('');
        $("#txtClientSecret").val('');
        $('#txtAcctID').val('');
        $('#txtMerchantPin').val('');
        $("#pageloader").css('display', 'block');
        var Mode = 0;
        var param = { 'mode': Mode };
        $.ajax({
            type: "POST",
            url: "PaymentOption.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                $("#pageloader").css('display', 'none');
                data = data.d;
                var result = $.parseJSON(data);
                dt_result = result.Table;
                var isInternal = result.Table2;
                if (dt_result != null) {
                    // var fb = dt_result[0]["FbUrl"];
                    //===========================================
                    if (isInternal[0]["IsExternalPaymentLink"] == "0") {
                        $("#rdInternal").prop('checked', true);
                        $(".internal").show();
                        $(".external").hide();
                    }
                    if (isInternal[0]["IsExternalPaymentLink"] == "1") {
                        $("#rdExternal").prop('checked', true);
                        $(".internal").hide();
                        $(".external").show();
                    }
                    $("#txtExternalLink").val(isInternal[0]["ExternalPaymentLink"]);
                    //===========================================

                    $("#txtApiLoginID").val(dt_result[0]["PKey"]);
                    $("#txtApiTransactionKey").val(dt_result[0]["Value"]);
                    $("#txtClientID").val(dt_result[1]["PKey"]);
                    $("#txtClientSecret").val(dt_result[1]["Value"]);
                    $('#txtAcctID').val(dt_result[2]["PKey"]);
                    $('#txtMerchantPin').val(dt_result[2]["Value"]);
                    if(dt_result[0]["Status"]=="1")
                        $("input[type='radio'][value='Authorize']").prop('checked', true);
                    if(dt_result[1]["Status"]=="1")
                        $("input[type='radio'][value='Paypal']").prop('checked', true);
                    if(dt_result[2]["Status"]=="1")
                        $("input[type='radio'][value='Pace']").prop('checked', true);


                }
               // debugger;
                
               
              
                if (result.Table[1] != null)
                {
                    $("#txtMaxPaymentAmount").val(result.Table1[1]["ConfigValue"]);
                    $("#txtProcessingFee").val(result.Table1[0]["ConfigValue"]);
                    $("#txtPaymentDeferralDays").val(result.Table1[2]["ConfigValue"]);
                    if (result.Table1[1]["IsActive"] == true)
                    {
                        $("#chkProcessingFee").prop('checked', true);
                    }
                    
                }
            },
            error: function (request, status, error) { //alert('Error!! ' + request.statusText);
            }
        });
    }
    catch (e) { }
}

function validatefield() {
    var ctrls = $('#chkProcessingFee').prop('checked') ? $('#txtMaxPaymentAmount').add('#txtPaymentDeferralDays').add('#txtProcessingFee') : $('#txtMaxPaymentAmount').add('#txtPaymentDeferralDays');
    var ctrlObj = [];
    for (j = 0; j < ctrls.length; j++) {
        if ($('#' + ctrls[j].id).val() == "") {
            ctrlObj.push(ctrls[j]);
        }
    }
    if (ctrlObj.length > 1) {
        alert('Please enter all the mandatory information');
        return false;
    }
    else
    {
        if ($('#rdExternal').val() == '1')
        {
            if ($('#txtExternalLink').val() == '')
            {
                alert('Please enter External Payment Link');
                $('#txtExternalLink').focus();
                return false;
            }
            else if (isUrl($('#txtExternalLink').val())==false)
            {
                $('#txtExternalLink').focus();
                alert('Please enter a valid URL');
                return false;
            }
        }
        if ($('#txtMaxPaymentAmount').val() == '') {
            alert('Please enter Maximum Payment Amount');
            $('#txtMaxPaymentAmount').focus();
            return false;
        }
        else if ($('#chkProcessingFee').prop('checked') && $('#txtProcessingFee').val() == '') {
            alert('Please enter Payment Processing Fee');
            $('#txtProcessingFee').focus();
            return false;
        }
        else if ($('#txtPaymentDeferralDays').val() == '') {
            alert('Please enter Payment Deferral Days');
            $('#txtPaymentDeferralDays').focus();
            return false;
        }// #13215
        else if (parseInt($('#txtPaymentDeferralDays').val()) >= 30 || parseInt($('#txtPaymentDeferralDays').val()) <= 0) {
            alert('Please enter Payment Deferral Days between 1 and 30');
            $('#txtPaymentDeferralDays').focus();
            $('#txtPaymentDeferralDays').val('');
            return false;
        }
        else {
            return true;
        }
    }
}


function savebtn() {
    try {
        loader.showloader();
        var Mode = 1;
        var PKey = "";
        var Value = "";
        var KeyCategory = "";
        var ConfigSettingxml = "";
        var LinkMode = 0;
        var LinkUrl = "";

        var s = validatefield();

        if (!s) {
            loader.hideloader();
            return false;
        }


        if ($('#chkPayOptions_0').prop("checked")) {
            PKey = $("#txtApiLoginID").val();
            Value = $("#txtApiTransactionKey").val();
            KeyCategory = $("#chkPayOptions_0").val();
        }
        else if ($('#chkPayOptions_1').prop("checked")) {
            PKey = $("#txtClientID").val();
            Value = $("#txtClientSecret").val();
            KeyCategory = $("#chkPayOptions_1").val();
        }
        else if ($('#chkPayOptions_2').prop("checked")) {
            PKey = $('#txtAcctID').val();
            Value = $('#txtMerchantPin').val();
            KeyCategory = $("#chkPayOptions_2").val();
        }
        //Start for Processfee,Maximum Payment Amount,Payment Deferred Days 
        ConfigSettingxml = '<ConfigSettings>';
        ConfigSettingxml += '<ConfigSetting>';
        ConfigSettingxml += '<ConfigType>Processing Fee</ConfigType>';
        ConfigSettingxml += '<ConfigValue>' + ($('#chkProcessingFee').prop('checked') ? $("#txtProcessingFee").val() : "0") + '</ConfigValue>';
        ConfigSettingxml += '<IsActive>'+ ($('#chkProcessingFee').prop('checked') ? "1" : "0") + '</IsActive>';
        ConfigSettingxml += '</ConfigSetting>';

        ConfigSettingxml += '<ConfigSetting>';
        ConfigSettingxml += '<ConfigType>Maximum Payment Amount</ConfigType>';
        ConfigSettingxml += '<ConfigValue>' + $("#txtMaxPaymentAmount").val() + '</ConfigValue>';
        ConfigSettingxml += '<IsActive>1</IsActive>';
        ConfigSettingxml += '</ConfigSetting>';

        ConfigSettingxml += '<ConfigSetting>';
        ConfigSettingxml += '<ConfigType>Payment Deferred Days</ConfigType>';
        ConfigSettingxml += '<ConfigValue>' + $("#txtPaymentDeferralDays").val() + '</ConfigValue>';
        ConfigSettingxml += '<IsActive>1</IsActive>';
        ConfigSettingxml += '</ConfigSetting>';
        ConfigSettingxml += '</ConfigSettings>';
        //End for Processfee,Maximum Payment Amount,Payment Deferred Days End

        //var param = { 'mode': Mode, 'APILoginID': $("#txtApiLoginID").val(), 'APITransactionKey': $("#txtApiTransactionKey").val(), 'ClientID': $("#txtClientID").val(), 'ClientSecret': $("#txtClientSecret").val(), 'mode': Mode, 'AcctID': $('#txtAcctID').val(), 'MerchantPin': $('#txtMerchantPin').val() };

        LinkMode = $(".grid-section .usage-area-section ul li input[type='radio']:checked").attr('Value');
        LinkUrl = $("#txtExternalLink").val();
        if (LinkMode == 1) {
            if (LinkUrl.trim() == "") {
                alert('Please enter Payment Link');
                $('#txtExternalLink').focus();
                return false;
            }
        }
        var param = { 'PKey': PKey, 'Value': Value, 'KeyCategory': KeyCategory, 'Mode': Mode, 'ConfigSetting': ConfigSettingxml, 'LinkMode': LinkMode, 'LinkUrl': LinkUrl };
        $.ajax({
            type: "POST",
            url: "PaymentOption.aspx/Savedata",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                //dt_saveresult = result.Table;
                //if (dt_saveresult != null) {
                if (result == 1) {
                    loader.hideloader();
                    alert('Payment options have been updated successfully');
                }
                else { loader.hideloader(); alert('Failed to update payment options.'); }

                //}
            },
            error: function (request, status, error) { //alert('Error!! ' + request.statusText); 
            }
        });
    }
    catch (e) { }
   
}


