var dt_result;

$(document).ready(function () {

    loaddata();
    $(".submitBtn").click(function () {
        savebtn();
    });
    $(".txtAmount").on('change', function () {
        if ($(this).val().trim() != '') {
            var aa = parseFloat($(this).val());
            if (aa <= 0) {
                $(this).val('');
                alert('0 is not allowed!');
            }
        }
    });
});

function loaddata() {
    try {        
        var Mode = 0;
        var param = { 'mode': 1 };
        $.ajax({
            type: "POST",
            url: "DeactivationSettings.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                $("#pageloader").css('display', 'none');
                data = data.d;
                var result = $.parseJSON(data);
                dt_result = result.Table;
                if (dt_result != null) {
                    $("#txtafterregistrationattempts").val(dt_result[0]["RegAcctLockAttempt"]);
                    $("#txtregistrationDuration").val(dt_result[0]["RegAcctLockDuration"]);
                    $("#txtaccountlockafter").val(dt_result[0]["LockDays"]);
                    $("#txtremindersettings").val(dt_result[0]["ReminderDays"]);
                    $("#txtafterloginattempts").val(dt_result[0]["LoginIPLockAttempt"]);
                    $("#txtloginDuration").val(dt_result[0]["LoginIPLockDuration"]);
                    $("#txtIPlocked").val(dt_result[0]["RegIPLockAttempt"]);
                    $("#txtIPDuration").val(dt_result[0]["RegIPLockDuration"]);
                    $("#txtPassword").val(dt_result[0]["ResetPasswordHistory"]);
                    $("#txtloginAcctBlockAttempt").val(dt_result[0]["LoginAcctLockAttempt"]);
                    $("#txtloginAcctBlockDuration").val(dt_result[0]["LoginAcctLockDuration"]);
                    //$("#txtChangePassIp").val(dt_result[0]["PassChangeIPLockAttempt"]);
                    //$("#txtChangePassIpDur").val(dt_result[0]["PassChangeIPLockDuration"]);
                    //$("#txtChangePassAcc").val(dt_result[0]["PassChangeAcctLockAttempt"]);
                    //$("#txtChangePassAccDur").val(dt_result[0]["PassChangeAcctLockDuration"]);
                    //$("#txtResetPassIp").val(dt_result[0]["PassResetIPLockAttempt"]);
                    //$("#txtResetPassIpDur").val(dt_result[0]["PassResetIPLockDuration"]);
                    //$("#txtResetPassAcc").val(dt_result[0]["PassResetAcctLockAttempt"]);
                    //$("#txtResetPassAccDur").val(dt_result[0]["PassResetAcctLockDuration"]);
                }             
              
            },
            error: function (request, status, error) { 
            }
        });
    }
    catch (e) { }
}

function validatefield() {
    if ($('#txtaccountlockafter').val().trim() == '') {
        alert('Please enter Account lock after.');
        $('#txtaccountlockafter').focus();
        return false;
    }
    else if ($('#txtremindersettings').val() == '') {
        alert('Please enter Reminder settings.');
        $('#txtremindersettings').focus();
        return false;
    }
    else if ($('#txtafterregistrationattempts').val().trim() == '') {
        alert('Please enter Unlock No. of attempts after registration.');
        $('#txtafterregistrationattempts').focus();
        return false;
        
    }
    else if ($('#txtregistrationDuration').val().trim() == '') {
        alert('Please enter Duration for attempts after registration.');
        $('#txtregistrationDuration').focus();
        return false;
        
    }
    else if ($('#txtafterloginattempts').val() == '') {
        alert('Please enter Unlock No. of attempts after login IP.');
        $('#txtafterloginattempts').focus();
        return false;
    }
    else if ($('#txtloginDuration').val() == '') {
        alert('Please enter duration for login IP attempt.');
        $('#txtloginDuration').focus();
        return false;
    }
    else if ($('#txtIPlocked').val() == '') {
        alert('Please enter no. of attempts for registered IP.');
        $('#txtIPlocked').focus();
        return false;
    }
    else if ($('#txtIPDuration').val() == '') {
        alert('Please enter duration for registered IP.');
        $('#txtIPDuration').focus();
        return false;
    }
    else if ($('#LoginAcctLockAttempt').val() == '') {
        alert('Please enter attempts for login account or change/reset/validate password.');
        $('#LoginAcctLockAttempt').focus();
        return false;
    }
    else if ($('#txtloginAcctBlockDuration').val() == '') {
        alert('Please enter duration for login account or change/reset/validate password.');
        $('#txtloginAcctBlockDuration').focus();
        return false;
    }
    
 
    else {
        return true;
    }
}

// this validation message changed for fields containing mandatory attribute to be validated for empty value
function validateFields(tblid) {
    // var ctrlObj = $('#' + tblid + '[mandatory="1"]');
    var isvalid = true;
    var ctrlObj = [];
    var ctrls = $('#' + tblid + ' [mandatory="1"]');
    for (j = 0; j < ctrls.length; j++) {
        if ($('#' + ctrls[j].id).val() == "") {
            ctrlObj.push(ctrls[j]);
        }
    }

   

    if (ctrlObj.length > 1) {
        alert('Please enter all the mandatory information');
        return false;
    }
    else if (ctrlObj.length == 1) {
        $(ctrlObj).each(function () {
            if ($(this).attr('id') != undefined) {
                if ($(this).val() == '') {
                    if ((this.tagName).toLowerCase() == 'input') {
                        //alert('Please enter ' + this.title);
                       alert( getalertmessage($(this)));
                        
                    }
                    else if ((this.tagName).toLowerCase() == 'div') {
                        return true;
                    }
                    else if ((this.tagName).toLowerCase() == 'textarea') {
                        alert('Please enter ' + this.title + '');
                    }
                    else {
                        alert('Please select ' + this.title + '');
                    }
                    $(this).focus();
                    isvalid = false;
                    return false;
                }
            }
        });
        return isvalid;
    }
    else if (ctrlObj.length == 0) {
        return true;
    }
}

function getalertmessage(obj) {
    var msg = "";
    if ($(obj).attr('ValidateMessage') != undefined) {
        msg = $(obj).attr('ValidateMessage');
        if (msg == '') {
            msg ="Please enter "+ $(obj).attr('title');
        }
    }
    else if ($(obj).attr('placeholder') != undefined && (obj.localName != 'textarea')) {
        msg = "Please enter "+$(obj).attr('placeholder');
    }
    else {
        msg ="Please enter "+ $(obj).attr('title');
    }
    return " " +msg;
}

function savebtn() {
    try {
        
        var Mode = 2;
        var s;// = validatefield();
        s=validateFields('deactivationDiv');

        if (!s) {
            return false;
        }
        loader.showloader();
        var param = {
            'Mode': Mode, 'UtilityID': 0, 'ReminderDays': $("#txtremindersettings").val(), 'LockDays': $("#txtaccountlockafter").val(), 'LoginIPLockAttempt': $("#txtafterloginattempts").val(), 'LoginIPLockDuration': $("#txtloginDuration").val(),
            'RegIPLockAttempt': $("#txtIPlocked").val(), 'RegIPLockDuration': $("#txtIPDuration").val(), 'RegAcctLockAttempt': $("#txtafterregistrationattempts").val(), 'RegAcctLockDuration': $("#txtregistrationDuration").val(),
            'LoginAcctLockAttempt': $("#txtloginAcctBlockAttempt").val(), 'LoginAcctLockDuration': $("#txtloginAcctBlockDuration").val(),
            'ResetPasswordHistory': $("#txtPassword").val()
        };
        $.ajax({
            type: "POST",
            url: "DeactivationSettings.aspx/Savedata",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                if (result == 1) {
                    loader.hideloader();
                    alert('Security Configuration settings have been updated successfully.');
                }
                else { loader.hideloader(); alert('Failed to update deactivation settings.'); }

                //}
            },
            error: function (request, status, error) {
            }
        });
    }
    catch (e) { }

}