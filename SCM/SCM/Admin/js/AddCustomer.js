$(document).ready(function () {

    questions1 = $('#ddlquestions').val();
    questions2 = $('#ddlquestions2').val();

    $('#ddlquestions').change(function () {
        hidequestion1dropdown();
    });

    $('#ddlquestions2').change(function () {
        hidequestion2dropdown();
    });

    if ($('#hdnAccNumNumeric').val() == 'True') {
        $("#txtAccno").bind('keypress', function (e) {         
                if (IsNumeric(event)) { return true; }
                else { return false; }           
        });
    }

    function hidequestion2dropdown() {

        var selectedItem1 = $('#ddlquestions').val();
        var selectedItem2 = $('#ddlquestions2').val();

        if (selectedItem2 == "") {
            alert('Please select a security question.');
            return false;
        }
        else if (selectedItem1 == selectedItem2) {
            alert('You cannot select same security question.');
            $('#ddlquestions2 option[value=' + questions2 + ']').prop('selected', 'selected');
            return false;
        }
        else {
            questions2 = $('#ddlquestions2').val();
            $('#txtSecurityB').val('');
        }
    }

    function hidequestion1dropdown() {

        var selectedItem1 = $('#ddlquestions').val();
        var selectedItem2 = $('#ddlquestions2').val();

        if (selectedItem1 == "") {
            alert('Please select a security question.');
            return false;
        }
        else if (selectedItem1 == selectedItem2) {
            alert('You cannot select same security question.');
            $('#ddlquestions option[value=' + questions1 + ']').prop('selected', 'selected');
            return false;
        }
        else {
            questions1 = $('#ddlquestions').val();
            $('#txtSecurityA').val('');
        }
    }


    $("#ddlZip").change(function () {
        var obj = $('#ddlCity option:selected');

        if (obj.index() > 0) {
            $('#hdnzipcode').val($(obj).text());
            $('#hdnCityId').val($(obj).attr('cityid'));
        }
        else {
            $('#hdnzipcode').val('');
            $('#hdnCityId').val('');
        }

        GetLatLongfromAddress();

        //var obj = $('#ddlCity option:selected');
        //if (obj.index() > 0) {
        //    LoadUserZipcode($(obj).text());
        //}
        //else {
        //    $('#ddluserzipcode').empty();
        //}
        // GetLatLongfromAddress();
    });

   

});

//$(document).on('blur', '.step2_button [type=password],[data-password="txtPassword"]', function () {
//   var r= $(this).val();
//    var regex = /^[a-zA-Z0-9@#$&%*!]*$/g;
//    if (r.match(regex)) {
//        alert("valid");
//    }
//    else {
//        alert("invalid");
//    }


   
//})
//$('.step2_button [type=password],.step2_button[data-password="txtPassword"]').on("keypress", function () {
//    alert();
//})

function GetLatLongfromAddress() {
    var city = '';
    var zipCode = '';
    var address1 = $("#txtAddress1").val();
    var address2 = $("#txtAddress2").val();

    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        city = $(obj).text();
    }

    // new Code 
    // #Issue By Ragu: Show ZipCodes as child items to the Cities in the City dropdown controls
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');

        if ($(ddlCity).attr('key') == 'Zipcode') {
            city = $(ddlCity).attr('cityname');
            zipCode = $(ddlCity).val();

        }
    }

    /*
    obj = $('#ddluserzipcode option:selected');
    if (obj.index() > 0) {
        zipCode = $(obj).text();
    }
    */

    if ((address1 != '' || address2 != '') && city != '' && zipCode != '') {
        var address = address1 + ' ' + address2 + ', ' + city + ', ' + zipCode;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status.toString() == google.maps.GeocoderStatus.OK.toString()) {
                //$('#txtLatitude').val(results[0].geometry.location.lat());
                //$('#txtLongitude').val(results[0].geometry.location.lng());
                $("#hdnLat").val(results[0].geometry.location.lat());
                $("#hdnLong").val(results[0].geometry.location.lng());
            }
            else {
             
                $("#hdnLat").val('');
                $("#hdnLong").val('');
            }
        });
    }
    else {
        //$('#txtLatitude').val('');
        //$('#txtLongitude').val('');
    }
}




function ValidateEmailAlt() {
    var email = $('#txtAltEmailId').val();
    if (email.trim().length != 0) {

        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
        if (filter.test(email)) {
            $('#input-email').removeClass("red-border");
            return true;
        }
        else {
            //alert("Please enter a valid email");
            alert("Please enter a valid Email");
            $('#txtAltEmailId').addClass('errorbox');
            $('#txtAltEmailId').focus();
            return false;
        }
    } 
    return true;
}

function ValidateEmail() {
    var email = $('#txtEmailID').val();
    if (email.trim().length == 0) {
        alert('Please enter your email');
        $('#txtEmailID').addClass('errorbox');
        $('#txtEmailID').focus();
        return false;
    }
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
        $('#input-email').removeClass("red-border");
        return true;
    }
    else {
        //alert("Please enter a valid email");
        alert("Please enter a valid Email");
        $('#txtEmailID').addClass('errorbox');
        $('#txtEmailID').focus();
        return false;
    }
}
function validphoneno(e, obj) {
    var code = e.which || event.keyCode;
    if (code != 8) {
        if ($(obj).val().length == 3 || $(obj).val().length == 7) {
            $(obj).val($(obj).val() + '-');
        }
    }

}

function ValidateLatitude() {
    var lat = $('#txtLatitude').val();

    if (lat.toString().trim() != '') {
        if (isNaN(lat)) {
            alert('Please enter valid latitude');
            $('#txtLatitude').focus();
            //$('#txtLatitude').addClass("red-border");
            return false;
        }
        else {
            //$('#txtLatitude').removeClass("red-border");
            return true;
        }
    }

}

function ValidateLongtitude() {
    var long = $('#txtLongitude').val();

    if (long.toString().trim() != '') {
        if (isNaN(long)) {
            alert('Please enter valid longitude');
            $('#txtLongitude').focus();
            //$('#txtLongitude').addClass("red-border");
            return false;
        }
        else {
            $('#txtLongitude').removeClass("red-border");
            return true;
        }
    }

}
function validateZeroInContactNumber() {
    if ($('#txtAlternatNum').val() != '') {
        var threenumsum = parseInt($('#txtAlternatNum').val().charAt(1)) + parseInt($('#txtAlternatNum').val().charAt(2)) + parseInt($('#txtAlternatNum').val().charAt(3));
        if (threenumsum <= 1) {
            alert("Please enter a valid Contact number");
            $('#txtAlternatNum').focus();
            return false;
        }
        if ($('#txtAlternatNum').val().charAt(1) == 0) {
            alert("Please enter a valid Contact number");
            $('#txtAlternatNum').focus();
            return false;
        }
        return true;
    }
    else {
        return true;
    }
}
function ContactNoLength() {
    if ($('#txtAlternatNum').val() != '') {
        if (($('#txtAlternatNum').val().length < 14) || !($('#txtAlternatNum').val().lastIndexOf('-') == 9)) {

            alert("Please enter 10 digit Alternate Phone #"); $('#txtAlternatNum').focus();
            //$('#txtContactNo').addClass("red-border");
            return false;
        }
        $('#txtAlternatNum').removeClass("red-border");
        return true;
    }
    else {
        return true;
    }
}

function validateZeroInMobile() {
    var threenumsum = parseInt($('#txtPrimaryPhone').val().charAt(1)) + parseInt($('#txtPrimaryPhone').val().charAt(2)) + parseInt($('#txtPrimaryPhone').val().charAt(3));
    if (threenumsum <= 1) {
        //alert("Please enter a valid Primary Phone Number");
        alert("Please enter a valid 10 digit Primary Phone number");
        $('#txtPrimaryPhone').focus();
        return false;
    }
    if ($('#txtPrimaryPhone').val().charAt(1) == 0) {
        // alert("Please enter a valid Primary Phone Number");
        alert("Please enter a valid 10 digit Primary Phone number");
        $('#txtPrimaryPhone').focus();
        return false;
    }
    return true;

}

//This function is created to give summary of password in one alert rather than displaying multiple alert messages
function ValidatePassword2(password) {
    var re = '';
    var f = 0;
    if (password.length == 0) {
        alert('Please enter a password');
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
        //alert('The entered password does not meet minimum security requirements! Please enter a valid password. A password shall be at least 8 characters long and must contain a special character and a capital letter')
        alert('The entered Password does not meet the minimum security requirements. Please enter a valid password. Password shall be at least 8 characters long and must contain one capital letter, one numeric and one special character (@, #, $, &, %, *, !)')

        return false;
    }
    return true;
}


// function to meet the criteria requirement of user field
function validateUserid(idval) {
    try {
        var f = 0;
       // var regex = /^[a-zA-Z0-9@#$&%*!_.-]*$/g;
        var regex = /^\d*[a-zA-Z]+[a-zA-Z0-9@#$&%*!_.-]{3,30}$/g;
        if (idval.length < 4 || idval.length > 30) {
            f = 1;
        }
        if (!regex.test(idval)) {
            f = 1;
        }
     
        if (f == 1) {
            alert('Username entered is invalid.Username can contain only @,#,$,&,%,*,!,_,.,- as special characters');

            return false;
        }
        return true;
    }
    catch (e) {
        console.log(e);
    }
}

function ConfirmPassword() {
    var cnfmpwd = $('#txtConfirmPwd').val();
    var pwd = $('#txtPassword').val();
    if (pwd == cnfmpwd) {
        return true;
    }
    else if (pwd == '') {
        //error.showerror($('#txtConfirmPwd'), "Please confirm your password");
        alert("Please confirm your password");
        $('#txtConfirmPwd').focus();
        return false;
    }
    else {
        //error.showerror($('#txtConfirmPwd'), "The password does not match, please enter the same password");
        //  error.showerror($('#txtConfirmPwd'), "Passwords do not match, please enter the same password");
        alert("Passwords do not match, please enter the same password");
        $('#txtConfirmPwd').focus();
        return false;
    }
}

function ValidateSecurityQuestion1() {
    var SecrityQuestion1 = $('#ddlquestions :selected').text();
    if (SecrityQuestion1.indexOf('4') >= 0) {
        var MinCharinAnswer = $('#txtSecurityA').val().length;
        if (MinCharinAnswer != '4') {
            alert("Please enter 4 digits as specified in Securityquestion1");
            $('#txtSecurityA').focus();
            return false;
        }
    }
    else if (SecrityQuestion1.indexOf('5') > 0) {
        var MinCharinAnswer = $('#txtSecurityA').val().length;
        if (MinCharinAnswer != '5') {
            alert("Please enter 5 digits as specified in Securityquestion1");
            $('#txtSecurityA').focus();
            return false;
        }
    }
    return true;
}
function ValidateSecurityQuestion2() {
    var SecrityQuestion2 = $('#ddlquestions2 :selected').text();
    if (SecrityQuestion2.indexOf('4') >= 0) {
        var MinCharinAnswer = $('#txtSecurityB').val().length;
        if (MinCharinAnswer != '4') {
            alert("Please enter 4 as specified in Securityquestion2");
            $('#txtSecurityB').focus();
            return false;
        }
    }
    else if (SecrityQuestion2.indexOf('5') > 0) {
        var MinCharinAnswer = $('#txtSecurityB').val().length;
        if (MinCharinAnswer != '5') {
            alert("Please enter 5 digits as specified in Securityquestion2");
            $('#txtSecurityB').focus();
            return false;
        }
    }    
    return true;


}




function ValidateMinMaxLength() {
    if ($('#hdnAccNumNumeric').val() == "True") {
        var regexp = /^[0-9]*$/;
        if (regexp.test($('#txtAccno').val().trim())) {
            if ($('#txtAccno').val().length < $('#hdnAccountMinLength').val() || $('#txtAccno').val().length > $('#hdnAccountMaxLength').val()) {
                alert('Please enter a valid ' + $('#hdnAccountMinLength').val() + ' to ' + $('#hdnAccountMaxLength').val() + ' digit Account Number.');
                $('#txtAccno').focus();
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    else
    {
        var regexp = /^[\d-]+$/;
        if (regexp.test($('#txtAccno').val().trim())) {
            if ($('#txtAccno').val().length < $('#hdnAccountMinLength').val() || $('#txtAccno').val().length > $('#hdnAccountMaxLength').val()) {
                alert('Please enter a valid ' + $('#hdnAccountMinLength').val() + ' to ' + $('#hdnAccountMaxLength').val() + ' digit Account Number.');
                $('#txtAccno').focus();
                return false;
            }
        }
        else {
            return false;
        }
    }

   
    if ($('#txtMeterId').val() != '') {
        if ($('#txtMeterId').val().length < $('#hdnMeterIdMinLength').val() || $('#txtMeterId').val().length > $('#hdnMeterIdMaxLength').val()) {
            alert('Please enter a valid ' + $('#hdnMeterIdMinLength').val() + ' to ' + $('#hdnMeterIdMaxLength').val() + ' digit Meter Number');
            $('#txtMeterId').focus();
            return false;
        }
    }
    if ($('#txtDL').val() != '') {
        if ($('#txtDL').val().length < $('#hdDLMinLength').val() || $('#txtDL').val().length > $('#hdDLMaxLength').val()) {
            alert('Please enter ' + $('#hdDLMinLength').val() + ' to ' + $('#hdDLMaxLength').val() + ' digit Driving License Number');
            return false;
        }
    }
    if ($('#txtZipCode').val() != '') {
        if ($('#txtZipCode').val().length < 5 ) {
            alert('Please enter a valid Zip Code');
            $('#txtZipCode').focus();
            return false;
        }
        if ($('#txtZipCode').val().length == "00000") {
            alert('Please enter a valid Zip Code');
            $('#txtZipCode').focus();
            return false;
        }
    }
}


function SameSecurityQuestion() {
    var selectedItem1 = $('#ddlquestions').val();
    var selectedItem2 = $('#ddlquestions2').val();

    if (selectedItem1 == selectedItem2) {
        alert('You cannot select same security question.');
        $('#ddlquestions2 option[value=' + questions2 + ']').prop('selected', 'selected');
        return false;
    }

}

