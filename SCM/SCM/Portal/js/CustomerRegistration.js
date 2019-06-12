
function MobileLength() {
    if ($('#txtMobileNumber').val() != '') {
        if (($('#txtMobileNumber').val().length < 12) || !($('#txtMobileNumber').val().indexOf('-') == 3 && $('#txtMobileNumber').val().lastIndexOf('-') == 7)) {
            error.showerror($('#txtMobileNumber'), $("#spnValidMNumber").text()); $('#txtMobileNumber').focus(); return false;
        }
        else if (parseInt($("#txtMobileNumber").val().split('-')[0]) <= 200) {
            error.showerror($('#txtMobileNumber'), $("#spnValidMNumber").text()); $('#txtMobileNumber').focus(); return false;
        }
    }
    else if ($('#txtAlternatNum').val() != '') {
        //Bug 7441 - Start
        if (($('#txtAlternatNum').val().length < 12) || !($('#txtAlternatNum').val().indexOf('-') == 3 && $('#txtAlternatNum').val().lastIndexOf('-') == 7)) {
            error.showerror($('#txtAlternatNum'), $("#spnValidANumber").text()); $('#txtAlternatNum').focus(); return false;
        }
        else if (parseInt($("#txtAlternatNum").val().split('-')[0]) <= 200) {
            error.showerror($('#txtAlternatNum'), $("#spnValidANumber").text()); $('#txtMobileNumber').focus(); return false;
        }
        else {
            return true;
        }
        //Bug 7441 - End
    }
    else { return true; }
}

$(document).ready(function () {
  //  refresh();
   // $(window).on('resize', refresh);
    $('#txtMobileNumber').mask('(000) 000-0000');
    $('#txtAlternatNum').mask('(000) 000-0000');
});
// added for checking criteria requirement of user id


function ConfirmPassword() {
    var cnfmpwd = $('#txtConfirmPwd').val();
    var pwd = $('#txtPassword').val();
    if (pwd == cnfmpwd) {
        return true;
    }
    else if (pwd == '') {
        error.showerror($('#txtConfirmPwd'), $("#spnConfirmPassword").text());
        $('#txtConfirmPwd').focus();
        return false;
    }
    else {
        //error.showerror($('#txtConfirmPwd'), "Passwords do not match, please enter the same password.");
        w2alert($('#ML_LoginSupport_lbl_PwdDoNotMatch').text())
        $('#txtConfirmPwd').focus();
        return false;
    }
}

function ValidateSSN() {
    if ($('#divSSN').css('display') != 'none') {
        if ($('#txtSSN').val().length != 4) {
            error.showerror($('#txtSSN'), 'SSN Number must be in 4 digit.');
            return false;
        }
        else if (parseInt($('#txtSSN').val()) <= 0) {
            error.showerror($('#txtSSN'), 'Invalid SSN Number.');
            return false;
        }
        return true;
    }
    else
        return true;
}

function ValidateEmail() {
    //var email = $('#txtEmailID').val();
    //var regx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
    //if (email.match(regx)) {
    //    return true;
    //}
    //else {
    //    alert("Please enter valid email id");
    //    $('#txtEmailID').focus();
    //    return false;
    //}

    //Above code was commented because validation is not OK by above code.
    var x = $('#txtEmailID').val();
    if (x == '') {
        error.showerror($('#txtEmailID'), $('#txtEmailID').attr('ValidateMessage'));
        return false;
    }
    else {
        //var atpos = x.indexOf("@");
        //var dotpos = x.lastIndexOf(".");
        //if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        //    error.showerror($('#txtEmailID'), "Please enter a valid email id");
        //    return false;
        // }
        //Added by khushbu kansal for email verification user not able to add @ two times and .com 2 times
        //var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (pattern.test(x)) {
            return true;
        } else {
            error.showerror($('#txtEmailID'), $('#txtEmailID').attr('ValidateMessage')); return false;
        }
    }
    return true;
}

function ValidatePWD() {
    var pwd = $('#txtPassword').val();
    var regx = new RegExp("^(?=.{8,16})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$");
    if (pwd.match(regx)) {
        return true;
    }
    else {
        error.showerror($('#txtPassword'), $("#spnPasswordError").text());
        $('#txtPassword').focus();
        return false;
    }
}

function ValidateAltEmail() {
    var email = $('#txtAltEmailId').val();
    var regx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email.match(regx)) {
        $('#txtAltEmailId').removeClass("red-border");

        return true;
    }
    else {
        if (email.trim().length == 0) {
            return true;
        }
        error.showerror($('#txtAltEmailId'), $('#txtAltEmailId').attr('ValidateMessage'));
        $('#txtAltEmailId').focus();
        $('#txtAltEmailId').addClass("red-border");
        return false;
    }
}

function ValidateAccount() {
    if (!isNaN($('#txtAccno').val())) {
        if (parseInt($('#txtAccno').val()) == 0) {
            error.showerror($('#txtAccno'), $('#txtAccno').attr('ValidateMessage'));
            return false;
        }
    }

    if ($('#txtAccno').val().toLowerCase().match(/[a-z]/i)) {
        error.showerror($('#txtAccno'), $('#txtAccno').attr('ValidateMessage'));
        return false;
    }
    return true;
}

function ValidateMinMaxLength() {

    if ($('#txtMeterId').val() != '') {
        if ($('#txtMeterId').val().length < $('#hdnMeterIdMinLength').val() || $('#txtMeterId').val().length > $('#hdnMeterIdMaxLength').val()) {
            var msg = $("#spnMeterIdMinMax").text();
            var min = $('#hdnMeterIdMinLength').val();
            var max = $('#hdnMeterIdMaxLength').val();
            msg = msg.replace('{min}', min);
            msg=msg.replace('{max}', max);
            error.showerror($('#txtMeterId'), msg);
            return false;
        }
    }

    if ($('#txtDL').val() != '') {
        if ($('#txtDL').val().length < $('#hdDLMinLength').val() || $('#txtDL').val().length > $('#hdDLMaxLength').val()) {
            var msg = $("#spnDrivingMinMax").text();
            msg= msg.replace('{min}', $('#hdDLMinLength').val());
            msg=msg.replace('{max}', $('#hdDLMaxLength').val());
            error.showerror($('#txtDL'), msg);
            return false;
        }
    }
}

function ValidateMinMaxUserLength() {
    if ($('#txtUserID').val().length < parseInt($('#txtUserID').attr('minlength') == '' ? 6 : $('#txtUserID').attr('minlength')) || $('#txtUserID').val().length > parseInt($('#txtUserID').attr('maxlength') == '' ? 6 : $('#txtUserID').attr('maxlength'))) {
        var msg = $("#spnUserIdMinMax").text();
        msg= msg.replace('{min}', parseInt($('#txtUserID').attr('minlength') == '' ? 6 : $('#txtUserID').attr('minlength')));
        msg=  msg.replace('{max}', parseInt($('#txtUserID').attr('maxlength') == '' ? 6 : $('#txtUserID').attr('maxlength')));
        error.showerror($('#txtUserID'), msg);
        return false;
    }
    else {
        return true;
    }
}

function termsandconditions() {
    if ($("#chktems").prop('checked')) {
        return true;
    }
    else {
        // toastr.warning('Please check terms and conditions.');
        // w2alert('Please check terms and conditions.');
        toastr.warning($('#ML_CustomerRegistration_chk_termsandcondition').text());
        return false;
    }
}

function ValidateCaptcha() {
    try {
        if (grecaptcha.getResponse().length == 0) {
            toastr.error($('#hdnCaptchamsg').val());
            loader.hideloader();
            return false;
        }
    }
    catch (e) {
        console.log(e);
    }
}

function ValidateZip() {
    var zip = $('#txtZipCode').val();
    if (zip.length < 5) {
        error.showerror($('#txtZipCode'), 'Invalid Zip Code');
        $('#txtZipCode').focus();
        $('#txtZipCode').addClass("red-border");
        return false;
    }
}


function SameSecurityQuestion() {
    var selectedItem1 = $('#ddlquestions').val();
    var selectedItem2 = $('#ddlquestions2').val();

    if (selectedItem1 == selectedItem2) {
        toastr.warning($('#spnSamesecurityQustion').text());
        $('#ddlquestions2 option[value=' + selectedItem2 + ']').prop('selected', 'selected');
        return false;
    }

}