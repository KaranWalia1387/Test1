var Name, City, Latitude, Longitude, LocationType, PhoneNo, WebSite, Address1, Address2, ZipCode,Mode,Comments


$(document).ready(function () {
    $("#ddlCity").change(function () {
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

function ContactNoLength() {
    if (($('#txtContactNo').val().length < 12) || !($('#txtContactNo').val().indexOf('-') == 3 && $('#txtContactNo').val().lastIndexOf('-') == 7)) {
        if ($('#txtContactNo').val().length > 0) {
            alert("Please enter a valid 10 digit Contact Number"); $('#txtContactNo').focus(); $('#txtContactNo').addClass("red-border"); return false;
        }
    }
    $('#txtContactNo').removeClass("red-border");
    return true;
}



function ValidateEmail() {
    var email = $('#txtEmailID').val();
    if (email.trim().length == 0) {
        alert('Please enter your Email.');
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
        alert("Please enter a valid Email.");
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

function SaveUpdateData() {
    try {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < 1; i++) {
            var pair = vars[i].split('=');
            qrStr = decodeURIComponent(pair[1]);
        }
        if (qrStr > 0) {
            Mode = 3;
            var FootprintID = qrStr;
        }
        else {
            Mode = 2;
            FootprintID = 0;
        }

        if (Validate() && ContactNoLength() && ValidateLatitude() && ValidateLongtitude()) {

                //ConCatstring(key);
            var params = { 'Mode': Mode, 'LocationType': LocationType, 'Name': Name, 'Address1': Address1, 'Address2': Address2, 'City': City, 'ZipCode': ZipCode, 'Latitude': Latitude, 'Longitude': Longitude, 'WebSite': WebSite, 'PhoneNo': PhoneNo, 'FootprintID': FootprintID,'Comments':Comments };
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "configure-greenfootprint.aspx/SaveUpdateData",
                    data: JSON.stringify(params),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        loader.hideloader();
                        var result = JSON.parse(response.d);
                        if (result.Table[0].Status == 1) {
                            alert(result.Table[0].Message);
                            window.location.href = 'configure_viewfootprint.aspx'
                        }

                    },
                    //async: false,

                    failure: function (response) {
                        return response.d;
                        loader.hideloader();
                    }
                });
            }
        
    }
    catch (e) { }
}
function Validate() {
    var errMsg = "Please enter all the mandatory information";
    var ctrls = $('#tblconfigurepay [mandatory="1"]');
    var ctrlObj = [];
    for (j = 0; j < ctrls.length; j++) {
        if ($('#' + ctrls[j].id).val() == "") {
            ctrlObj.push(ctrls[j]);
        }
    }
    if (ctrlObj.length > 1) {
        alert(errMsg);
        return false;
    }
    else {
        if ($("#txtName").val() == "") {
            alert("Please enter Name");
            $('#txtName').focus();
            return false;
        }
        else {
            Name = $('#txtName').val();
        }

        if ($("#ddlLocationType option:selected").val() == "") {
            $('#ddlLocationType').focus();
            alert("Please select Location Type");
            return false;
        }
        else {
            LocationType = $("#ddlLocationType option:selected").val();
        }

        if ($("#txtAddress1").val() == "") {
            alert("Please enter Address");
            $('#txtAddress1').focus();
            return false;
        }
        else {
            Address1 = $('#txtAddress1').val();
        }

        if ($("#txtContactNo").val() == "") {
            alert("Please enter a valid 10 digit Contact Number");
            $('#txtContactNo').focus();
            return false;
        }
        else {
            var ContactNo = $('#txtContactNo').val() != '' ? parseInt($('#txtContactNo').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtContactNo').val();
            PhoneNo = ContactNo;
        }

        if ($("#ddlCity option:selected").val() == "") {
            alert("Please select Zip Code");
            $('#ddlCity').focus();
            return false;
        }
        else {
            City = $(ddlCity).find('option:selected').attr("cityid");
        }


        if ($("#txtLatitude").val() == "") {
            alert("Please enter latitude");
            $('#txtLatitude').focus();
            return false;
        }
        else {
            Latitude = $("#txtLatitude").val();
        }

        if ($("#txtLongitude").val() == "") {
            alert("Please enter longitude");
            $('#txtLongitude').focus();
            return false;
        }
        else {
            Longitude = $("#txtLongitude").val();
        }

        // PhoneNo= $("#txtContactNo").val();
        //Address1 = $("#txtAddress1").val();
    
        Address2 = $("#txtAddress2").val();
        WebSite = $("#txtWebsite").val();
        Comments = $("#txtComments").val();
        ZipCode = $(ddlCity).find('option:selected').text();
        return true;
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
  
    var threenumsum = parseInt($('#txtContactNo').val().charAt(1)) + parseInt($('#txtContactNo').val().charAt(2)) + parseInt($('#txtContactNo').val().charAt(3));
    if (threenumsum <= 1) {
        alert("Please enter a valid contact number");
        $('#txtContactNo').focus();
        return false;
    }
    if ($('#txtContactNo').val().charAt(1) == 0) {
        alert("Please enter a valid contact number");
        $('#txtContactNo').focus();
        return false;
    }
    return true;
}

function ContactNoLength() {
    if (($('#txtContactNo').val().length < 14) || !($('#txtContactNo').val().lastIndexOf('-') == 9)) {
      
            alert("Please enter 10 digit contact number."); $('#txtContactNo').focus();            
            return false;
        
    }
    var threenumsum = parseInt($('#txtContactNo').val().charAt(1)) + parseInt($('#txtContactNo').val().charAt(2)) + parseInt($('#txtContactNo').val().charAt(3));
    if (threenumsum <= 1) {
        alert("Please enter a valid contact number");
        $('#txtContactNo').focus();
        return false;
    }
    if ($('#txtContactNo').val().charAt(1) == 0) {
        alert("Please enter a valid contact number");
        $('#txtContactNo').focus();
        return false;
    }   
    return true;
}
