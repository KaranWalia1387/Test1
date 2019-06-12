function ConfirmPassword() {
    var cnfmpwd = $('#txtConfirmPwd').val();
    var pwd = $('#txtPassword').val();
    if (pwd == cnfmpwd) {
        $('#txtPassword').removeClass("red-border");
        $('#txtConfirmPwd').removeClass("red-border");
        return true;
    }
    else {
        alert("Confirm password does not match!");
        $('#txtConfirmPwd').focus();
        $('#txtPassword').addClass("red-border");
        $('#txtConfirmPwd').addClass("red-border");
        return false;
    }
}
//Ref Bug id :12724
function Validatehtmltags() {

    var reg = /<(.|\n)*?>/g;

    if (reg.test($('#txtAddress1').val()) == true ) {

        alert("Please enter a valid Address1.HTML tags not Allowed");
        $('#txtAddress1').addClass('errorbox');
        $('#txtAddress1').focus();
        return false;

    }
    if (reg.test($('#txtAddress2').val()) == true) {

        alert("Please enter a valid Address2.HTML tags not Allowed");
        $('#txtAddress2').addClass('errorbox');
        $('#txtAddress2').focus();
        return false;
    }
    return true;
}

function ValidateAll() {
   
   
    //return ValidateAllPageFieldsSingleMessage('tbl') && ConfirmPassword() && ValidateEmail() && MobileLength() && ValidateQuestions() && ValidateAccountNumber() && Validatehtmltags() && ValidateSecurityQuestion1() && ValidateSecurityQuestion2() && ValidateEmailAlt();
    return ValidatePage('tbl') && ConfirmPassword() && ValidateEmail() && MobileLength() && ValidateQuestions() && ValidateAccountNumber() && Validatehtmltags() && ValidateSecurityQuestion1() && ValidateSecurityQuestion2() && ValidateEmailAlt();
   
}



function ValidateEmail() {
    var email = $('#txtEmailID').val();
    if (email.trim().length != 0) {
    
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
        if (filter.test(email)) {
            $('#input-email').removeClass("red-border");
            return true;
        }
        else {
            alert("Please enter a valid Email");
            $('#txtEmailID').addClass('errorbox');
            $('#txtEmailID').focus();
            return false;
        }
    }
    return true;
}


function ValidateSecurityQuestion1() {
    var SecrityQuestion1 = $('#ddlquestions :selected').text();
    if (SecrityQuestion1.indexOf('4') >= 0) {
        var MinCharinAnswer = $('#txtSequertyA').val().length;
        if (MinCharinAnswer != '4') {
            alert("Please enter 4 digits as specified in Securityquestion1");
            $('#txtSequertyA').focus();
            return false;
        }
    }
    else if (SecrityQuestion1.indexOf('5') > 0) {
        var MinCharinAnswer = $('#txtSequertyA').val().length;
        if (MinCharinAnswer != '5') {
            alert("Please enter 5 digits as specified in Securityquestion1");
            $('#txtSequertyA').focus();
            return false;
        }
    }
    return true;
}
function ValidateSecurityQuestion2() {
    var SecrityQuestion2 = $('#ddlquestions2 :selected').text();
    if (SecrityQuestion2.indexOf('4') >= 0) {
        var MinCharinAnswer = $('#txtSequertyA2').val().length;
        if (MinCharinAnswer != '4') {
            alert("Please enter 4 as specified in Securityquestion2");
            $('#txtSequertyA2').focus();
            return false;
        }
    }
    else if (SecrityQuestion2.indexOf('5') > 0) {
        var MinCharinAnswer = $('#txtSequertyA2').val().length;
        if (MinCharinAnswer != '5') {
            alert("Please enter 5 digits as specified in Securityquestion2");
            $('#txtSequertyA2').focus();
            return false;
        }
    }
    return true;
    }
   


function ValidateAllPageFieldsSingleMessage(tblid) {
    $('#' + tblid + ' input[type=text],input[type=password],textarea,select').each(function () {
        if ($(this).val().trim().length == 0)
            $(this).val('');
        $(this).removeClass('errorbox');
    });
    // var ctrlObj = $('#' + tblid + ' [value=][mandatory="1"],textarea[mandatory=1][value=]');//Bug 7444
    var ctrlObj = [];
    //***************************
    var ctrls = $('#' + tblid).find('input[mandatory="1"],textarea[mandatory=1],select[mandatory=1]');
    for (j = 0; j < ctrls.length; j++) {        
                if ($('#' + ctrls[j].id).val() == "") {
                    ctrlObj.push(ctrls[j]);
                }
            } 
    //****************************
    if (ctrlObj.length > 1) {
        ctrlObj[0].focus();
        $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
        $('#errorMsg').html('Please enter all the mandatory information.');
        $('.w2ui-tag-body').hide();
        for (var i = 0; i < ctrlObj.length; i++) {
            // ctrlObj[i].className = "";
            ctrlObj[i].className = "errorbox";
        }
        // w2alert('Please enter all mandatory fields.');
        return false;
    }
    else if (ctrlObj.length == 1) {
        if (ctrlObj[0].tagName.toLowerCase() == 'select') {
            // error.showerror(ctrlObj[0], "Please select " + ctrlObj[0].title);
            $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
            $('#errorMsg').html("Please select " + ctrlObj[0].title);
            ctrlObj[0].className = "errorbox";
            return false;
        }
        else {
            if (ctrlObj[0].title == "Mobile number") {

                $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                $('#errorMsg').html('Please enter your 10 digit primary phone number');
                ctrlObj[0].className = "errorbox";
                ctrlObj[0].focus();
                return false;
            }
            else {

                $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                $('#errorMsg').html("Please enter " + ctrlObj[0].title);
                ctrlObj[0].className = "errorbox";
                ctrlObj[0].focus();
                return false;
            }

        }
    }
    else if (ctrlObj.length == 0) {
        return true;
    }
}




//******************************************



//******************************************

function ValidateAccountNumber() {
    if ($('#txtAccountNo').val() == "") {
        $('#txtAccountNo').focus();
        $('#txtAccountNo').addClass("red-border");
        alert("Please enter Account number");
        return false;
    }
    if ($('#hdnAccNumNumeric').val() == "True") {
        var regexp = /^[0-9]*$/;
        if (regexp.test($('#txtAccountNo').val().trim())) {
            if ($('#txtAccountNo').val().length < $('#hdnAccountMinLength').val() || $('#txtAccountNo').val().length > $('#hdnAccountMaxLength').val()) {
                alert('Account Number should be greater than ' + $('#hdnAccountMinLength').val() + ' characters and less than' + $('#hdnAccountMaxLength').val() + ' characters');
                $('#txtAccountNo').focus();
                $('#txtAccountNo').addClass("red-border");
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        var regexp = /^[\d-]+$/;
        if (regexp.test($('#txtAccountNo').val().trim())) {
            if ($('#txtAccountNo').val().length < $('#hdnAccountMinLength').val() || $('#txtAccountNo').val().length > $('#hdnAccountMaxLength').val()) {
                alert('Account Number should be greater than ' + $('#hdnAccountMinLength').val() + ' characters and less than' + $('#hdnAccountMaxLength').val() + ' characters');
                $('#txtAccountNo').focus();
                $('#txtAccountNo').addClass("red-border");
                return false;
            }
        }
        else {
            return false;
        }
    }
    var accountNumber = $('#txtAccountNo').val();
    if (accountNumber <= 0) {
        $('#txtAccountNo').focus();
        $('#txtAccountNo').addClass("red-border");
        alert("Please enter Account number greater than 0");
        return false;
    }
    $('#txtAccountNo').removeClass("red-border");
    return true;
}
function ValidateLatitude() {
    var lat = $('#txtLatitude').val();

    if (lat.toString().trim() != '') {
        if (isNaN(lat)) {
            alert('Please enter valid latitude');
            $('#txtLatitude').focus();
            $('#txtLatitude').addClass("red-border");
            return false;
        }
        else {
            $('#txtLatitude').removeClass("red-border");
            return true;
        }
    }
    else {
        alert("Please enter latitude");
        $('#txtLatitude').focus();
        $('#txtLatitude').addClass("red-border");
        return false;
    }
    return true;
}

function ValidateLongtitude() {
    var long = $('#txtLongitude').val();

    if (long.toString().trim() != '') {
        if (isNaN(long)) {
            alert('Please enter valid longitude');
            $('#txtLongitude').focus();
            $('#txtLongitude').addClass("red-border");
            return false;
        }
        else {
            $('#txtLongitude').removeClass("red-border");
            return true;
        }
    }
    else {
        alert("Please enter longitude");
        $('#txtLongitude').focus();
        $('#txtLongitude').addClass("red-border");
        return false;
    }
    return true;
}
function ValidateSSN() {

    var value = $('#txtSSN').val();
    if (value.length < 4 || value.length > 4) {
        $('#txtSSN').focus();
        $('#txtSSN').addClass("red-border");
        alert("Please enter Last four digit of SSN");
        return false;
    }
    else if (value == "0000")
    {
        $('#txtSSN').focus();
        $('#txtSSN').addClass("red-border");
        alert("SSN Number cannot be set as 0000");
        return false;
    }
    $('#txtSSN').removeClass("red-border");
    return true;
}
function ValidatePWD() {
    var pwd = $('#txtPassword').val();
    var regx = new RegExp("^(?=.{8,30})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$");
    if (pwd.match(regx)) {
        $('#txtPassword').removeClass("red-border");
        return true;
    }
    else {
        alert("Invalid Password.  Password  must be atleast 8 characters (1 special letter,1 number,1 capital letter.)");
        $('#txtPassword').focus();
        $('#txtPassword').addClass("red-border");
        return false;
    }
    return true;
}

function ValidatePostalCode() {
    var postcode = $('#ddluserzipcode').val();
    var regx = new RegExp("^([0-9]){5}(([ ]|[-])?([0-9]){4})?$");
    if (regx.match(postcode)) {
        $('#ddluserzipcode').removeClass("red-border");
        return true;
    }
    else {
        alert("Invalid postal code!");
        $('#ddluserzipcode').focus();
        $('#ddluserzipcode').addClass("red-border");
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

function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 0) || (charCode == 8))
        {
            $('#' + t.id).removeClass("red-border");
            return true;
        }
        else
        {
            alert("Please enter only character.");            
           // $('#' + t.id).addClass("red-border");
            return false;
        }
    }
    catch (err) {
        alert(err.Description);
    }
}

function MobileLength() {
    if (($('#txtMobile').val().length < 14) || !($('#txtMobile').val().lastIndexOf('-') == 9)) {
        alert("Please enter a valid 10 digit Mobile Number");
        $('#txtMobile').focus();
        $('#txtMobile').addClass("red-border");
        return false;
    }
    if ($('#txtContactNo').val() != '') {
        if (($('#txtContactNo').val().length < 14) || !($('#txtContactNo').val().lastIndexOf('-') == 9)) {

            alert("Please enter a valid 10 digit Alternate Number");
            $('#txtContactNo').focus();
            $('#txtContactNo').addClass("red-border");
            return false;
        }
    }
    else
    {
        $('#txtContactNo').removeClass("red-border");
        return true;
    }   
    $('#txtMobile').removeClass("red-border");
    return true;
}

function ContactNoLength() {
    if ($('#txtContactNo').val() != '') {
        if (($('#txtContactNo').val().length < 14) || !($('#txtContactNo').val().lastIndexOf('-') == 9)) {
            alert("Please enter 10 digit Contact number");
            $('#txtContactNo').focus();
            $('#txtContactNo').addClass("red-border");
            return false;
        }
    }
    else {
        $('#txtContactNo').removeClass("red-border");
        return true;
    }
}

function GetLatLongfromAddress() {
    var city = '';
    var zipCode = '';
    var address1 = $("#txtAddress1").val();
    var address2 = $("#txtAddress2").val();

    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        city = $(obj).text();
    }

   
    // #Issue By Ragu: Show ZipCodes as child items to the Cities in the City dropdown controls
    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
        var ddlCity = $('#ddlCity option:selected');

        if ($(ddlCity).attr('key') == 'Zipcode') {
            city = $(ddlCity).attr('cityname');
            zipCode = $(ddlCity).val();
        }
    }

 

    if ((address1 != '' || address2 != '') && city != '' && zipCode != '') {
        var address = address1 + ' ' + address2 + ', ' + city + ', ' + zipCode;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status.toString() == google.maps.GeocoderStatus.OK.toString()) {
                $('#txtLatitude').val(results[0].geometry.location.lat());
                $('#txtLongitude').val(results[0].geometry.location.lng());
                $("#hdnlatitude").val(results[0].geometry.location.lat());
                $("#hdnlongitude").val(results[0].geometry.location.lng());
            }
            else {
                $('#txtLatitude').val('');
                $('#txtLongitude').val('');
                $("#hdnlatitude").val('');
                $("#hdnlongitude").val('');
            }
        });
    }
    else {
        $('#txtLatitude').val('');
        $('#txtLongitude').val('');
    }
}

function ValidateQuestions() {
    var q1 = document.getElementById("ddlquestions").selectedIndex;
    var q2 = document.getElementById("ddlquestions2").selectedIndex;
    if (q1 == q2 && q1 != '0') {
        alert('Can not select same question.');
        $("#ddlquestions").addClass("red-border");
        $("#ddlquestions2").addClass("red-border");
        return false;
    }
    $("#ddlquestions").removeClass("red-border");
    $("#ddlquestions2").removeClass("red-border");
    return true;
}
function OnSelectedIndexChange() {
    var id = $('#ddlquestions').val();
    $("#ddlquestions2 option").removeAttr('disabled');
    $("#ddlquestions2 option[value=" + id + "]").attr('disabled', 'disabled');
}
function OnSelectedIndexChange2() {
    var id = $('#ddlquestions2').val();
    $("#ddlquestions option").removeAttr('disabled');
    $("#ddlquestions option[value=" + id + "]").attr('disabled', 'disabled');
}
$(document).ready(function () {
    $("#ddlCity").change(function () {
        var obj = $('#ddlCity option:checked');

        if (obj.index() > 0) {
            $('#hdnzipcode').val($(obj).text());
            $('#hdnCityId').val($(obj).attr('cityid'));
        }
        else {
            $('#hdnzipcode').val('');
            $('#hdnCityId').val('');
        }

        GetLatLongfromAddress();

       
    });

    if ($('#hdnAccNumNumeric').val() == 'True') {
        $("#txtAccountNo").bind('keypress', function (e) {
            if (IsNumeric(event)) { return true; }
            else { return false; }
        });
    }

    $('#AddUserSaveBtn').click(function () {
       
    });

    $("#cancelButton").click(function () {
        if (($('#hdnCustomeID').val() == null || $('#hdnCustomeID').val() == 0)) {
            if (confirm('Are you sure want to cancel user registration ?'))
                location.href = url;
        } else {
            if (confirm('Are you sure want to cancel edit user ?'))
                location.href = url;
        }
    });
  
});
function LoadUserMapLocation(Latitude, Longitude, City, Zipcode, Address1, Address2) {
    if (Latitude == null || Latitude == "" || Longitude == null || Longitude == "") {
        $('#location').html('<center><font color="Red">No Data</Font></center>');
        return;
    }
    else {
        $('#location').html('');
    }
    require(["esri/map", "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Multipoint", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/InfoTemplate", "../js/utils.js", "dojo/_base/Color", "dojo/on", "dojo/dom", "dojo/domReady!"],
              function (Map, Geocoder, Point, Multipoint, Polyline, Polygon, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, utils, Color, on, dom) {
                  var map = new Map("location", {
                      basemap: "streets",
                      zoom: 3,
                      minZoom: 3,
                      maxZoom: 16,
                      smartNavigation: false
                  });
                  on(map, "load", function () {
                      try {
                          map.disableScrollWheelZoom();
                          getCurrentLocation();
                      }
                      catch (e) {
                          alert(e.message)
                      }
                  });

                  function getCurrentLocation() {
                      try {
                          map.graphics.clear();
                          pt = new Point(Longitude, Latitude);
                          var symbol = new esri.symbol.PictureMarkerSymbol('../images/map-icon-green.png', 30, 39);

                          var attributes = { "City": City, "Zipcode": Zipcode, "Address1": Address1, "Address2": Address2 };
                          var infoTemplate = new InfoTemplate('Location', "<p style='text-align:left'><b>${City}</b> - ${Zipcode}</br>${Address1}</br>${Address2}</p>");
                          var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
                          map.graphics.add(graphic);

                          // Position the map
                          map.centerAndZoom(pt, 10);
                          // map.zoomEnd(0);
                      }
                      catch (e)
                      { }
                  }
              });
}

$(document).ready(function () {


    $('#txtAccountNo').blur(function () {
        if ($('#txtAccountNo').val() != "") {
            $('#txtAccountNo').removeClass('errorbox');
        }
    });

    $('#ContentPlaceHolder1_rightpanel_txtFirstName').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#ContentPlaceHolder1_rightpanel_txtLastName').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#txtEmailID').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#txtMobile').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#txtAddress1').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#ddlCity').change(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#ContentPlaceHolder1_rightpanel_txtDob').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#txtUserID').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#txtPassword').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#txtConfirmPwd').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#ddlquestions').change(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#ContentPlaceHolder1_rightpanel_txtSequertyA').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });


    $('#ddlquestions2').change(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });

    $('#ContentPlaceHolder1_rightpanel_txtSequertyA2').blur(function () {
        if ($(this).val() != "") {
            $(this).removeClass('errorbox');
        }
    });
    $(document).ready(function () {
      

        $("#btnClear").click(function () {
            $("#txtFirstName").val('');
            $("#txtLastName").val('');
            $("#txtEmailID").val('');
            $("#txtDob").val('');
            $("#txtMobile").val('');
            $("#txtContactNo").val('');
            $("#txtAddress1").val('');
            $("#txtAddress2").val('');
            $("#ddlCity").val('');
            $("#txtUserID").val('');
            $("#ddlquestions").val('');
            $("#txtSequertyA").val('');
            $("#txtSSN").val('');
            $("#txtAccountNo").val('');
            $("#ddlquestions2").val('');
            $("#txtSequertyA2").val('');
        });

    });

});

function validateZeroInContactNumber()
{
    var str = $("#txtContactNo").val();
    var threenumsum = parseInt(str.charAt(1)) + parseInt(str.charAt(2)) + parseInt(str.charAt(3));
    if (threenumsum <= 1) {
        alert("Please enter a valid Contact number");
        $('#txtContactNo').focus();
        return false;
    }
    if (str.charAt(1) == 0) {
        alert("Please enter a valid Contact number");
        $('#txtContactNo').focus();
        return false;
    }
    return true;  
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
            alert("Please enter a valid Email");
            $('#txtAltEmailId').addClass('errorbox');
            $('#txtAltEmailId').focus();
            return false;
        }
    }
    return true;
}