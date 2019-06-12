function txtcheck()
{
    var isValid = true;
    $(".txtAmount").each(function () {
        if ($(this).val().trim() != '') {
            if (parseFloat($(this).val()) <= 0) {
                //alert('Zero is not allowed, Please provide valid information');
                w2alert($('#ZeroNotAllowed').text());
                $(this).focus();
                isValid = false;
                return false;
            }
        }
    });
    return isValid;
}

$(document).ready(function () {
    var timeOffsetMinutes = -(new Date()).getTimezoneOffset();
    BindAddress();

    $(".txtAmount").on('keypress', function () {
        if ($(this).val().trim() != '') {
            var aa = parseFloat($(this).val());
            if (aa <= 0) {
                $(this).val('');
                //alert('Zero is not allowed, Please provide valid information');
                w2alert($('#ZeroNotAllowed').text());
            }
        }
    });

    
       
   $('#btnSaveHomeInfo').click(function () {
       try {
           if (txtcheck() && ValidateAllPageFieldsSingleMessage('accountdetails')) {

                if (ValidateBuiltyear()) {
                    var str = '0|' + escape($('#ddlUserAddress').val()) + '|' + escape($('[id$=ddlHomeType]').val());
                    if ($('[id$=ddlSolarPanel]').val() == '1')
                        str += '|' + 0;
                    else
                        str += '|' + escape($('[id$=txtSolarPanel]').val());


                    var evcheck = 0;
                    var poolcheck = 0;
                    if ($('[id$=rdbEVyes]').is(':checked') == true) {

                        evcheck = 1;

                    }
                    if ($('[id$=rdbPoolYes]').is(':checked') == true) {
                        poolcheck = 1;

                    }
                    str += '|' + escape($('[id$=ddlNoOfResidents]').val()) + '|' + escape($('[id$=txtHomesize]').val());
                    str += '|' + evcheck + '|' + escape($('[id$=txtFloors]').val()) + '|' + escape($('[id$=txtYearbuilt]').val());
                    str += '|' + poolcheck + '|' + escape($('[id$=txtNumberofbathrooms]').val()) + '|' + escape($('[id$=txtNumberofhigheffapp]').val());
                    str += '|' + escape($('[id$=txtLotsize]').val()) + '|' + escape($('[id$=txtLandscapearea]').val()) + '|' + escape($('[id$=txtsplandscapearea]').val());

                    var result = _default.setMyHomeInfo(str).value;
                    if (result.Rows[0].Status == "1") {
                        //w2alert('Thank you! Your submission was successful.');
                        toastr.success(result.Rows[0].Message);
                        return false;
                    }
                    else {
                        $('.bg').hide();
                        $('.upper-footer').show();
                        $('.container').show();
                        //w2alert('Your submission was unsuccessful, please try again.');
                        toastr.error(result.Rows[0].Message)
                        return false;
                    }
                }
                else { return false; }
                return false;
            }
        }
        catch (e) { return false; }
    });

    $('[id$=ddlSolarPanel]').change(function () {
        try {
            $('[id$=txtSolarPanel]').removeAttr('mandatory');
            $('[id$=txtSolarPanel]').val('');
            if ($(this).val() == '2') {
                $('#txtSolarPanel').attr('mandatory', '0');
                $('[id$=div_Noofsolarpanels]').show();
            }
            else {
                $('#txtSolarPanel').removeAttr('mandatory');
                $('[id$=div_Noofsolarpanels]').hide();
            }
        }
        catch (e) { }
    });
  
});



//This function is use to validate fields before saving
function saveData() {
    if (ValidateAllPageFieldsSingleMessage('accountdetails')) {
        return true;
    }
    else { return false; }
}



function ValidateBuiltyear() {
    if ($('#divPower').css('display') != 'none') {
        if ($('[id$=txtYearbuilt]').val() != '') {
            var currYear = new Date().toString().match(/(\d{4})/)[1];
            var msg_invalidyr = $('#spinvalidkey').text();
            if ($('[id$=txtYearbuilt]').val() <= 1900 || $('[id$=txtYearbuilt]').val() > currYear) {
                error.showerror($('[id$=txtYearbuilt]'), msg_invalidyr);
                return false;
            }         
        }

        return true;
    }
    else
        return true;
}

function resetAddress() {
    try {
        $("#ddlUserAddress option[value='" + $('#ddlUserAddress').val() + "']").remove();
        if ($('#ddlUserAddress > option').length > 0) {
            toastr.warning('Please enter for another address');
           //w2alert('Please enter for another address');
            $('#RegisteredHomeContainer select').prop('selectedIndex', 0);
            $('#RegisteredHomeContainer input[type=text]').val('');
            $('#div_Noofsolarpanels').hide();
            $('#lblAccountNumber').text($('#ddlUserAddress').val());
        }
        else {
            //resetAboutMyHome();
            window.location = "dashboard.aspx";
        }
    }
    catch (e) { }
}
function resetAboutMyHome() {
    try {
       
        $('#RegisteredHomeContainer input[type=text]').val('');
        $('#RegisteredHomeContainer select').prop('selectedIndex', 0);
        $('[id$=ddlNoOfResidents]').val('');
        $('[id$=txtHomesize]').val('');
        $('[id$=txtSolarPanel]').val('');
        
        $('[id$=div_Noofsolarpanels]').hide();
    }
    catch (e) { }
}
function BindAddress() {
    try {
        $('#ddlUserAddress').empty();       
            $('#ddlUserAddress').append($("<option></option>").val($('#ddlAddress option:selected').val().split(":")[0]).html($('#ddlAddress option:selected').text()));
        
    }
    catch (e) { }
}
function BindHomeType(data) {
    try {
        $('#ddlHomeType').empty();
        for (var i = 0; i < data.Rows.length; i++) {
            $('#ddlHomeType').append($("<option></option>").val(data.Rows[i]["Id"]).html(data.Rows[i]["NAME"]));
        }
    }
    catch (e) { }
}