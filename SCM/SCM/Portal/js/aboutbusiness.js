$(document).ready(function () {
    var timeOffsetMinutes = -(new Date()).getTimezoneOffset();
   

    $('#btnSaveHomeInfo').click(function () {
        try {
            //loader.show();
            if (ValidateAllPageFieldsSingleMessage('accountdetails')) {

              var  param = '1';
                param += '|'+ $('#ddlBusinessSize').val() + '|' + $('#ddlBusinessType').val() + '|' + $('#txtNoofResidents').val();
                param += '|' + $('#txtOfficeArea').val() + '|' + $('#txtLotSize').val() + '|' + $('#txtNoofFloors').val() + '|' + $('#txtNoOfRestrooms').val();
                param += '|' + $('#txtlandscapearea').val() + '|' + $('#rdbSolarPanels').find(":checked").val() + '|' + $('#txtGeneratingCapacity').val();
                param += '|' + $('#rdbElevator').find(":checked").val() + '|' + $('#rdbHVACSystem').find(":checked").val() + '|' + $('#rdbElectricalSystem').find(":checked").val();
                param += '|' + $('#rdbPlumingWaterSystem').find(":checked").val() + '|' + $('#rdbServerRoom').find(":checked").val() + '|' + $('#rdbSwimmingPool').find(":checked").val();
                
                var result = AboutMyBusiness.GetSetWorkplaceDetail($('#lblAccountNumber').text(),param).value;
                if (result.Tables[0].Rows[0].STATUS == "1") {
                    //w2alert('Thank you! Your submission was successful.');
                    //loader.hide();
                        toastr.success(result.Tables[0].Rows[0].Message);
                        return false;
                    }
                    else {
                        $('.bg').hide();
                        $('.upper-footer').show();
                        $('.container').show();
                    //w2alert('Your submission was unsuccessful, please try again.');
                        //loader.hide();
                        toastr.error(result.Tables[0].Rows[0].Message)
                        return false;
                    }
               
                return false;
            }
           // loader.hide();
        }
        catch (e) {  return false; }
    });




});



//This function is use to validate fields before saving
function saveData() {
    if (ValidateAllPageFieldsSingleMessage('accountdetails')) {
        return true;
    }
    else { return false; }
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
        $('[id$=txtNoofResidents]').val('');
        $('[id$=txtHomesize]').val('');
        $('[id$=txtSolarPanel]').val('');

        $('[id$=div_Noofsolarpanels]').hide();
    }
    catch (e) { }
}

