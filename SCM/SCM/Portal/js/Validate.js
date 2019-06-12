
//REQUIRED FIELD VALIDATION
var errorCnt = 0;

//Refresh the ValidationMessageg
function ClearValidadtion(tblid) {

    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    if (ctrlObj.length > 0) {

        for (var i = 0; i < ctrlObj.length; i++) {
            error.hideerror(ctrlObj[i]) + 'S';
        }

    }

}

//REQUIRED FIELD VAaLIDATION FOR HIGHER VERSIONS OF JQUERY
function ValidatePageFields(tblid) {

    $('#' + tblid + ' input[type=text],input[type=password],textarea').each(function () {

        if ($(this).val().trim().length == 0)
            $(this).val('');
    });
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    if (ctrlObj.length > 0) {

        if ($('#txtEmailOtherLogin').val() == "" && $('#txtComments').val() == "") {
            $('#errorMsg').show();
            $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
            $('#errorMsg').html('Please enter all the mandatory information.');
            ClearValidadtion(tblid);
            return false;
        }
        else if ($('#txtpwd').val() == "" && $('#txtconfirmpwd').val() == "") {
            ValidateAllPageFieldsSingleMessage(tblid);
            return;
        }
        else {

            for (var i = 0; i < ctrlObj.length; i++) {
                if ($(ctrlObj)[i].value == '') {
                    if ((ctrlObj[i].tagName).toLowerCase() == 'input') {
                        if (getmessage(ctrlObj[i]).indexOf("Card #") == 0) {
                            error.showerror(ctrlObj[i], 'Please enter your valid 8-16 digits credit card number.') + 'S';
                            //edited by priyansha
                        }
                        else if (getmessage(ctrlObj[i]).indexOf("Security Code") == 0) {
                            //edited by priyansha
                            error.showerror(ctrlObj[i], 'Please enter your 3-4 digit security code.') + 'S';//
                        }
                        else {
                            error.showerror(ctrlObj[i], $("#PleaseEnter").text() + getmessage(ctrlObj[i]) + '.') + 'S';
                        }

                    }
                    else if ((ctrlObj[i].tagName).toLowerCase() == 'textarea') {
                        error.showerror(ctrlObj[i], $("#PleaseEnter").text() + getmessage(ctrlObj[i]) + '.') + 'S';
                    }
                    else if ((ctrlObj[i].tagName).toLowerCase() == 'select') {
                        error.showerror(ctrlObj[i], $("#PleaseSelect").text() + getmessage(ctrlObj[i]) + '.') + 'S';
                    }
                    else {
                        error.showerror(ctrlObj[i], $("#PleaseEnter").text() + getmessage(ctrlObj[i]) + '.') + 'S';
                    }
                    $(ctrlObj[i]).focus();
                    $('#errorMsg').hide();
                    return false;
                }
            }
        }
    }


    return true;
}

// To show mandatory message only once 
function ValidateAllPageFieldsSingleMessage(tblids) {
    $('#errorMsg').remove();
    //To Validate Multiple Div Send values in comma seperated
    var tblid = [];
    var ctrlObj = [];
    if (tblids.indexOf(',') > 0) {
        tblid = tblids.split(',');
    }
    else {
        tblid.push(tblids);
    }
    for (var i = 0; i < tblid.length; i++) {
        $('#' + tblid[i] + ' input[type=text],input[type=password],textarea').each(function () {
            if ($(this).val().trim().length == 0)
                $(this).val('');
        });

       
        var ctrls = $('#' + tblid[i]).find('input[mandatory="1"],textarea[mandatory=1],select[mandatory=1]');
        for (j = 0; j < ctrls.length; j++) {
            if ($('#' + ctrls[j].id)[0].id == "signval") {
                if ($('#signval').val() == "") {
                    ctrlObj.push(ctrls[j]);
                }
            }
            else {
               
                    if ($('#' + ctrls[j].id).is(':visible') == true) {
                        if ($('#' + ctrls[j].id).val() == "") {
                            ctrlObj.push(ctrls[j]);
                        }
                    }
               
            }
        }
     
    }

    if (ctrlObj.length > 1) {
        ctrlObj[0].focus();

        $("<span id='errorMsg'></span>").insertBefore("#" + tblid[0]);
        $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
        if ($('#AllErrMsg').text() == '') {
            $('#errorMsg').html('Please enter all the mandatory information.');
        }
        else {
            $('#errorMsg').html($('#AllErrMsg').text());

        }
        $('.w2ui-tag-body').hide();
        for (var i = 0; i < ctrlObj.length; i++) {
          
            if (ctrlObj[i].className.indexOf('errorbox') == -1) {
                $(ctrlObj[i]).addClass('errorbox');
            }
            if ($(ctrlObj[i])[0].id == "signval") {
                if ($('#signval').val() == "") {
                    $(ctrlObj[i]).addClass('output');
                    $(ctrlObj[i]).prev().addClass('errorbox');
                }
                else {
                    $(ctrlObj[0]).removeClass('errorbox');
                    $(ctrlObj[0]).prev().removeClass('errorbox');
                }
            }
        }
        return false;
    }
    else if (ctrlObj.length == 1) {
        if ($(ctrlObj[0])[0].id == "signval") {
            if ($('#signval').val() == "") {
                $(ctrlObj[0]).addClass('output');
                $(ctrlObj[0]).prev().addClass('errorbox');
                var signmsg = getmessage(ctrlObj[0]);
                toastr.warning(signmsg);

            }
        }
        else {
            var element = document.getElementById('signval') == null ? '' : document.getElementById('signval');
            if (element.value != "" && element != "") {
                $('#signval').removeClass('errorbox');
                $('#signval').prev().removeClass('errorbox');
            }
            error.showerror(ctrlObj[0], getmessage(ctrlObj[0]));
            ctrlObj[0].focus();
        }

        return false;

    }
    else if (ctrlObj.length == 0) {
        if (tblids == 'mid_area_home') {
            $('#errorMsg').hide();
            return true;
        }
        for (var m = 0; m < tblid.length; m++) {
            var allCtrlObj = $('#' + tblid[m] + '').find('input:text, input:password, select, textarea');

            for (var i = 0; i < allCtrlObj.length; i++) {
                var ctrlName = allCtrlObj[i].id;
                if (ctrlName != "") {
                    var inputtype = $('#' + allCtrlObj[i].id).attr('InputType');
                    if ($('#' + allCtrlObj[i].id).val().length > 0) {
                        switch (inputtype) {
                            case "Account":
                                if ($('#' + ctrlName).val() == "0000000000000000") {
                                    $('#' + ctrlName).val("");
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }

                               
                                    if ($('#' + ctrlName).val().length < $('#hdnAccountMinLength').val() || $('#' + ctrlName).val().length > $('#hdnAccountMaxLength').val()) {
                                        var Erromessage = $('#ML_ErrorLength_Msg_AccountNumber').text().replace('X', $('#hdnAccountMinLength').val()).replace('Y', $('#hdnAccountMaxLength').val());
                                        error.showerror(allCtrlObj[i], Erromessage);
                                        $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                        return false;
                                    }
                              

                                break;
                            case "Email":
                                var email = $('#' + ctrlName).val();
                                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                                if ($('#' + ctrlName).val().length == "") {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus();
                                    return false;
                                }
                                else {
                                    if (!filter.test(email)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                        $('#' + ctrlName).focus();
                                        return false;
                                    }
                                }
                                break;
                            case "Phone":
                                //Change validation expression if any phone number starting with 0 then control displays error message.
                                //bug id 24617  

                             
                               
                                if (($('#' + ctrlName).val().length < 14) || !($('#' + ctrlName).val().lastIndexOf('-') == 9)) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                var threenumsum = parseInt($('#' + ctrlName).val().charAt(1)) + parseInt($('#' + ctrlName).val().charAt(2)) + parseInt($('#' + ctrlName).val().charAt(3));
                                if (threenumsum <= 1) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                if (parseInt($('#' + ctrlName).val().charAt(1)) == 0) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }


                               
                                if ($('#' + ctrlName).val().split('-')[1].length > 4) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }

                                
                                break;
                            case "Time":
                                var regexp = /^([0-9]|([1][0-2])):[0-5][0-9]?([AP][M]?)/;
                                if (!regexp.test($('#' + ctrlName).val().trim())) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "Card":
                                if ((($('#' + ctrlName).val().length > 19) && (($('#' + ctrlName).val().length < 8))) || ($('#hdnCardtype').val() == '')) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                    //Added by Abhilash Jha for Luhn's test on  credit card
                                else if ($('#' + ctrlName).val() != "") {
                                    var s1 = 0;
                                    var s2 = 0;
                                    var num = parseInt($('#' + ctrlName).val());
                                    for (k = 1; num > 0; k++) {
                                        if (k % 2 != 0)
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
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                        $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                        return false;
                                    }
                                }
                                break;
                            case "CVV":
                                if ($('#' + ctrlName).val() == "000") {
                                    $('#' + ctrlName).val("");
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                else if ($('#' + ctrlName).val().length < maxlength) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "TxtArea":
                                break;
                            case "Bank":
                                if ($('#' + ctrlName).val() == "0000000000000000") {
                                    $('#' + ctrlName).val("");
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                if ($('#' + ctrlName).val().length < 8) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "Routing":
                                if ($('#' + ctrlName).val().length < 9) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                if ($('#' + ctrlName).val() == "000000000") {
                                    $('#' + ctrlName).val("");
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "Date":
                                if ($('#' + ctrlName).val().length == "") {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "SSN":
                                if (parseInt($('#' + ctrlName).val().replace(/[^0-9\.]/g, ''), 10).toString() == "0") {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }

                                if (parseInt($('#' + ctrlName).val().replace(/[^0-9\.]/g, ''), 10).toString().length < 9) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "UA":
                                if ($('#' + ctrlName).val().length < 10) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "ZipCode":
                                if ($('#' + ctrlName).val() == "00000") {
                                    error.showerror(allCtrlObj[i], $('#InvalidZipCode').text());
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                if ($('#' + ctrlName).val().length < 5) {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            case "NAccount":
                                if ($('#' + ctrlName).val() == "0000000000000000") {
                                    $('#' + ctrlName).val("");
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                var regexp = /^[0-9]*$/;
                                if (regexp.test($('#' + ctrlName).val().trim())) {
                                    if ($('#' + ctrlName).val().length < $('#hdnAccountMinLength').val() || $('#' + ctrlName).val().length > $('#hdnAccountMaxLength').val()) {
                                        var Erromessage = $('#ML_ErrorLength_Msg_AccountNumber').text().replace('X', $('#hdnAccountMinLength').val()).replace('Y', $('#hdnAccountMaxLength').val());
                                        error.showerror(allCtrlObj[i], Erromessage);
                                        $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                        return false;
                                    }

                                }
                                else {
                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i]));
                                    $('#' + ctrlName).focus().attr("backgroundColor", "red");
                                    return false;
                                }
                                break;
                            default:

                                break;
                        }
                    }
                }
            }
        }
        return true;
    }

    // }

}


function checkHtml(id) {
    var val = $('#' + id).val();
    var iChars = "<>";
    for (var i = 0; i < val.length ; i++) {
        if (iChars.indexOf(val.charAt(i)) != -1) {
            error.showerror($('#' + id), 'Html Tags not allowed');
            return false;
        }
    }
    return true;
}




//COMPARE VALIDATION
//Here tblid is the id of the parent table
//Append group attribute with value compare in both elements. 
function CompareValidator(tblid) {
    var obj = $('#' + tblid + ' input[group=compare]');
    var value1 = $(obj[0]).val();
    var value2 = $(obj[1]).val();
    if (value1 != value2) {
        error.showerror(obj, getmessage(obj[0]) + ' and ' + getmessage(obj[1]) + ' are not same');
        $(obj[0]).val(''); $(obj[1]).val(''); $(obj[0]).focus(); return false;
    }
    return true;
}
//Validate date mm/dd/yy
function checkdate(input) {
    var validformat = /^\d{2}\/\d{2}\/\d{2}$/ //Basic check for format validity
    var returnval = true;
    if (input.value.trim().length != 0) {
        if (!validformat.test(input.value)) {
            toastr.warning("Invalid Date Format.");
            input.value = "";
            returnval = false;
        }
    }
    return returnval
}

//VALIDATION FOR EMAIL 
//Here parameter obj is the object of the textbox through which this function calls.  
function EmailValidator(obj) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(obj.value) || filter.test($(obj).val())) { return true; }
    else { error.showerror(obj, 'Please Enter valid Email ID.'); obj.value = ''; obj.focus(); return false; }
}


//VALIDATION FOR URL e.g:http://www.smartusys.com and http://smartusys.com
//Here parameter obj is the object of the textbox through which this function calls.  
function isValidURL(obj) {
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (RegExp.test(obj.value)) {
        return true;
    } else {
        error.showerror(obj, 'Please Enter Valid URL.');
        obj.value = '';
        obj.focus();
        return false;
    }
}

//VALIDATE SPECIAL CHARACTERS ON KEYPRESS AND ALSO WORKS FOR ALPHANUMERICITY
function ValidateForSpecialCharacter(e) {
    var code = e.which || event.keyCode;
    if (!(code == 8 || code == 32 || code == 127 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)))
        return false;
}

//VALIDATE NUMERICITY ON KEYPRESS
function IsNumeric(e) {
    var code = e.which || event.keyCode;
    if (!((code >= 48 && code <= 57) || code == 8 || code == 127 || code == 118 || code == 99))
    { return false; }
    return true;
}

function checkNumber(id) {
    var val = $('#' + id).val();
    var iChars = "0";
    for (var i = 0; i < val.length ; i++) {
        if (parseInt(val) <= 0) {
            error.showerror($('#' + id), $('#ML_Msg_ServiceAccountZeroNotAllowed').attr('validatemessage'));
            return false;
        }
    }
    return true;
}


//VALIDATE NUMERICITY ON KEYPRESS(decimal is allowed,it only accepts only one decimal and values upto 2 decimal place.)
//Here obg is the object of textbox.
function IsNumeric1(e, obj) {
    var code = e.which || event.keyCode;
    if (code == 8 || code == 127) { return true; }
    if (code == 46) {
        if (obj.value.indexOf('.') < 0) {
            return true;
        }
        else { return false; }
    }
    if (!(code >= 48 && code <= 57))
    { return false; }
    else {
        if (obj.value.indexOf('.') > 0) {
            if (obj.value.substring(obj.value.indexOf('.') + 1).length < 2) { return true; }
            else { return false; }
        }
        else { return true; }
    }
}

//Validate Alpha numeric underscore and Hyphen
function checkAlphaUnderAndHyphen(e) {
    var code = e.which || event.keyCode;
    if (!((code == 8) || (code == 32) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || (code == 95) || (code == 45)))//BUG 6195
    {
        return false;
    }
    return true;
}

//VALIDATE ALPHA ONKEYPRESS
function IsAlpha(e) {
    var code = e.which || event.keyCode;
    if (!(code == 8 || code == 32 || code == 127 || (code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
        //toastr.error($('#ML_Error_Msg_AlphabetOnly').text());
        return false;
    }
}

//RESET 
function Reset() {
    $("form input:text").val(''); //For All TextBoxes on the page.
    $("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.
    $("form select").each(function () { $(this)[0].selectedIndex = 0; }); //For All Dropdownlists and Listboxes on the page makes 0 as selected index.
    $("form textarea").val(''); //For All Textareas on the page.
    return false;
}

//RANGE VALIDATOR
//Just append 3 attributes i.e range="validate" ,min="something"(minimum value)
//max="something"(maximum value) in the element and call that function.
function IsOfRange() {
    var obj = $("form input[range=validate]");
    var value = parseInt(obj.val());
    var min = parseInt(obj.attr('min'));
    var max = parseInt(obj.attr('max'));
    if (!(value >= min && value <= max)) { return false; }
    else { return true; }
}

//LENGTH VALIDATION
function CountDescription(obj, long) {
    var maxlength = new Number(long);
    if (obj.value.length >= maxlength) {
        return false;
    }
}

//LENGTH VALIDATION
function CountDescriptionOnchange(obj, long) {
    var maxlength = new Number(long); // Change number to your max length.
    if (obj.value.length > maxlength) {
        obj.value = obj.value.substring(0, maxlength);
        error.showerror(obj, " More than " + long + " characters not allowed.");  //more than 100/1000 character not allowed
    }
}

function validateUserid(idval) {
    try {
        var f = 0;
       
        //regex to start with alphabets and containing number and specified special characters between length 4 and 30
        var regex = /^\d*[a-zA-Z]+[a-zA-Z0-9@#$&%*!_.-]{3,30}$/g;

        if (idval.length < 4 || idval.length > 30) {
            f = 1;
        }
        if (!regex.test(idval)) {
            f = 1;
        }
        if (f == 1) {
            //alert('User Id entered is invalid.User Id can contain only @,#,$,&,%,*,!,_,.,- as special characters');
           // alert($('#ML_Err_ValidUsrID').text());
            toastr.warning($('#ML_Err_ValidUsrID').text());
            return false;
        }
        return true;
    }
    catch (e) {
        console.log(e);
    }
}

//VALIDATE PASSWORD
function ValidatePassword(password) {
    var re = '';
    if (password.length == 0) {
        toastr.warning('Please enter a password');
    }
    if (password.length < 8) {
        toastr.warning('New Password length should be at least of 8 characters.');//#5329
        return false;
    }
    re = /[0-9]/;
    if (!re.test(password)) {
        toastr.warning('New Password must contain at least one digit [0-9].');//#5329
        return false;
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        toastr.warning('New Password must contain at least one upperCase letter [A-Z].');//#5329
        return false;
    }
    if (/^[a-zA-Z0-9 ]*$/.test(password) == true) {
        toastr.warning('New Password must contain at least one special character.');//#5329
        return false;
    }
    return true;
}

//This function is created to give summary of password in one alert rather than displaying multiple alert messages
function ValidatePassword2(password) {
    var re = '';
    var f = 0;
    if (password.length == 0) {
        toastr.warning('Please enter a password');
        return false;
    }
    if (password.length < 8) {
        f = 1;
    }
    re = /[0-9]/;
    if (!re.test(password)) {
        f = 1;
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        f = 1;
    }
    if (/^[a-zA-Z0-9 ]*$/.test(password) == true) {
        f = 1;
    }
    if (!(/^[a-zA-Z0-9@#$&%*!]*$/g.test(password) == true)) {
        // check if it contains special characters other than mentioned
        f = 1;
    }
    if (f == 1) {
        toastr.error($('#ML_Registration_Span_ErrMsg_Valid-Password').text());
        return false;
    }
    return true;
}

//Show error message for control
var error = {
    showerror: function (obj, message) {
        try {
            $(obj).addClass('errorbox');
            if (message.length > 0) {
                $(obj).w2tag(message);
            }
        } catch (e) {
            console.log(e.message);
        }

    },
    hideerror: function (obj) {
        try {
            $(obj).removeClass('errorbox');
            $(obj).w2tag('');
        }
        catch (e) {
            console.log(e.message);
        }

    }
}
$(document).ready(function () {
    try {
        k(".errorbox").live('change', function () {
            $(this).removeClass('errorbox');

        });
        k(".errorbox").live('keypress', function () {
            $(this).removeClass('errorbox');

        });

        //Method to check value being entered in a text box. inputype need to be entered in Database for text box
        $("input[type=text]").bind('keypress', function (e) {
            switch ($(this).attr("inputtype")) {
                case "NAccount": {
                    if (IsNumeric(event)) { return true; }
                    else { return false; }
                } break;
                case "Account": {
                    if (IsNumeric(event) || e.keyCode == 45) { return true; }
                    else { return false; }
                } break;
                case "int": {
                    if (IsNumeric(event)) { return true; }
                    else { return false; }
                } break;

            }
        });

        //Method to check value being pasted in a text box. inputype need to be entered in Database for text box
        $("input[type=text]").bind("paste", function (e) {
            var pastedtext = e.originalEvent.clipboardData.getData('Text');
            switch ($(this).attr("inputtype")) {
                case "int": {
                    if (IsNumeric(pastedtext)) { return true; }
                    else { return false; }
                } break;
                case "ZipCode":
                    var $this = $(this);
                    setTimeout(function () {
                        $this.val($this.val().replace(/[^0-9]/g, ''));
                    }, 5);
                    break;
               
            }
        });





        //Method to check value being pasted in a text box only character . inputype need to be entered in Database for text box
        //*****************************************
        var keyDown = false, ctrl = 17, vKey = 86, Vkey = 118;
        $(document).keydown(function (e) {
            if (e.keyCode == ctrl) keyDown = true;
        }).keyup(function (e) {
            if (e.keyCode == ctrl) keyDown = false;
        });
        //*****************************************
       
       
        $('input[type=text]').on('keypress', function (e) {
            switch ($(this).attr("inputtype")) {
                case "String": {
                    if (!e) var e = window.event;
                    if (e.keyCode > 0 && e.which == 0) return true;
                    if (e.keyCode) code = e.keyCode;
                    else if (e.which) code = e.which;
                    var character = String.fromCharCode(code);
                    if (character == '\b' || character == ' ' || character == '\t') return true;
                    if (keyDown && (code == vKey || code == Vkey)) return (character);
                    else return (/[a-zA-Z ]$/.test(character));
                } break;

                case "Int": {
                    if (!e) var e = window.event;
                    if (e.keyCode > 0 && e.which == 0) return true;
                    if (e.keyCode) code = e.keyCode;
                    else if (e.which) code = e.which;
                    var character = String.fromCharCode(code);
                    if (character == '\b' || character == ' ' || character == '\t') return true;
                    if (keyDown && (code == vKey || code == Vkey)) return (character);
                    else return (/[0-9]$/.test(character));
                } break;
            }
        });

        $('input[type=text]').on('focusout', function (e) {
            switch ($(this).attr("inputtype")) {
                case "String": {
                    var $this = $(this);
                    $this.val($this.val().replace(/[^a-zA-Z ]/g, ''));
                } break;

                case "Int": {
                    var $this = $(this);
                    $this.val($this.val().replace(/[^0-9]/g, ''));
                } break;

            }
        });

        $('input[type=text]').on('paste', function (e) {
                    switch ($(this).attr("inputtype")) {
                        case "String": {
                            var $this = $(this);
                            setTimeout(function () {
                                //$this.val($this.val().replace(/[^a-zA-Z]/g, ''));
                                //if ($this.val($this.val().match(/[^a-zA-Z]/g))) {
                                if ($this.val().match(/[^a-zA-Z ]/g)) {
                                    error.showerror($this, $('#AlphabetsOnly').text());
                                    $this.val($this.val().replace($this.val(), ''));
                                }
                            }, 5);
                        } break;

                        case "Int": {
                            var $this = $(this);
                            setTimeout(function () {
                              
                                if ($this.val().match(/[^0-9]/g)) {
                                    error.showerror($this, $('#NumbersOnly').text());
                                    $this.val($this.val().replace($this.val(), ''));
                                }
                            }, 5);
                        } break;

                        case "NAccount": {
                            var $this = $(this);
                            setTimeout(function () {
                              
                                if ($this.val().match(/[^0-9]/g)) {
                                    error.showerror($this, $('#NumbersOnly').text());
                                    $this.val($this.val().replace($this.val(), ''));
                                }
                            }, 5);
                        } break;

                    }
                });
   
       
    }
    catch (ex) {
        var msg = ex.message;
        console.log(msg);
    }
})

//Error message to be returned for any control.
function getmessage(obj) {
    var msg = "";
    if ($(obj).attr('ValidateMessage') != undefined) {
        msg = $(obj).attr('ValidateMessage');
        if (msg == '') {
            msg = $(obj).attr('title');
        }
    }
    else if ($(obj).attr('placeholder') != undefined && (obj.localName != 'textarea')) {
        msg = $(obj).attr('placeholder');
    }
    else {
        msg = $(obj).attr('title');
    }
    return " " + msg;
}


function validPhone(phonenum, fieldId) {
    if (phonenum != '') {
        if ((phonenum.length < 14) || !(phonenum.lastIndexOf('-') == 9)) {
            error.showerror($('#' + fieldId), getmessage($('#' + fieldId)));
            $('#' + fieldId).focus().attr("backgroundColor", "red");
            return false;
        }
        var threenumsum = parseInt(phonenum.charAt(1)) + parseInt(phonenum.charAt(2)) + parseInt(phonenum.charAt(3));
        if (threenumsum <= 1) {
            error.showerror($('#' + fieldId), getmessage($('#' + fieldId)));
            $('#' + fieldId).focus().attr("backgroundColor", "red");;
            return false;
        }
        if (phonenum.charAt(1) == 0) {
            error.showerror($('#' + fieldId), getmessage($('#' + fieldId)));
            $('#' + fieldId).focus().attr("backgroundColor", "red");
            return false;
        }
        if (phonenum.split('-')[1].length > 4) {
            error.showerror($('#' + fieldId), getmessage($('#' + fieldId)));
            $('#' + fieldId).focus().attr("backgroundColor", "red");
            return false;
        }
        return true;
    }
    else {
        $('#' + fieldId).val(phonenum);
    }
}

function GetFileSize(fileid) {
    try {
        if ($("#" + $("#" + fileid)[0].id + "").val() != '') {
            if (ValidateFileUpload1($("#" + fileid)[0].files[0].name)) {
                if ($("#" + fileid)[0].files != undefined) {
                    if ($("#" + fileid)[0].files.length > 0) {
                        var f = $("#" + fileid)[0].files[0];
                        var fileSize = 0;
                        fileSize = f.size || f.fileSize; //size in kb
                        fileSize = fileSize / 1048576; //size in mb
                        if (fileSize > 5) {
                            toastr.warning($('#IDfilesize').text());
                            return false;
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                }
                else
                    return true;
            }
            else {
                toastr.warning($('#IDfileExt').text().replace("###", $('#hdnFileExtension').val()));
                return false;
            }
        }
        else {
            return true;
        }
    }
    catch (e) {
        return false;
    }
}

function ValidateFileUpload1(FileUploadPath) {

    if (FileUploadPath != '') {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();


        var ext = ($('#hdnFileExtension').val().replace(/ /g,'').split(','));
        if (ext.indexOf(Extension) != -1) {
            FileUploadPath == '';
            return true; // Valid file type
        }
        else {
            return false; // Not valid file type
        }
    }
    else
        return true;
}



//function ZipCodeAvailabiity(ZipCode)
//{
//    var param = {
//        ZipCode: ZipCode,
//        LanguageCode: $("#hdnParamLanguageCode").val()
//           }
 
  
//    $.ajax({
//        type: "POST",
//        url: "default.aspx/CheckZipCodeAvailability",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: JSON.stringify(param),
//        success: function(data) {
//            data = data;
//            // var l = JSON.parse(data);
            
//            var msg = '';
//            if ($.parseJSON(data.d).Table.length == 0) {
//                // var msg = $.parseJSON(data.d).Table[1].message;
//                var msg = $.parseJSON(data.d).Table1[0].Message
//                $("#hdnParamZipCodeMessage").val(msg);
//                return msg;

//            }
//            else {
//                $("#hdnParamZipCodeMessage").val(msg);
//                return msg;
//            }
          
//        },
//        error: OnError
//    });


   
//}