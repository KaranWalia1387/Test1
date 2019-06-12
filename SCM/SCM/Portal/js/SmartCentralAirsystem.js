
$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#' + '<%=hdnFlag.ClientID%>').val('1');
    });
    $(".nav_left li.icon_center_system").addClass('active');

    if ($('#imgIson').val() == 'OFF') { $('#imgIson').attr('globalize', 'ML_SmartHome_ErrMsg_OffOn'); }
    else $('#imgIson').attr('globalize', 'ML_SmartHome_ErrMsg_OnOff');
});


       $(document).ready(function () {
           $('#btnSaveChanges').click(function () {
               if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                   loader.showloader();
                   var param = { json: createParameters() };
                   try {
                       $.ajax({
                           type: "POST",
                           url: "smart-centralairsystem.aspx/SaveAsync",
                           data: JSON.stringify(param),
                           contentType: "application/json; charset=utf-8",
                           dataType: "json",
                           success: function (data, status) {
                               if (parseInt(data.d) > 0) {
                                   toastr.success($('#DBSuccess').text());
                               }
                               else {
                                   toastr.error($('#IDSaveFailed').text());
                               }
                               loader.hideloader();
                           },
                           error: function (request, status, error) {
                               loader.hideloader();
                               toastr.error($('#IDSaveFailed').text() + ' ' + request.statusText);
                           }
                       });
                       return false;
                   }

                   catch (e) {
                       loader.hideloader();
                       toastr.error(e.message);
                   }
               }
               else {
                   return false;
               }
           });

           $('#imgIson').click(function () {

               if ($('#imgIson').val() == 'OFF') {
                   $('#imgIson').val('ON');
                   $('#imgIson').attr('globalize', 'ML_SmartHome_ErrMsg_OffOn');
               }
               else {
                   $('#imgIson').val('OFF');
                   $('#imgIson').attr('globalize', 'ML_SmartHome_ErrMsg_OnOff');
               }
               if ($('#imgIson').attr('class') == 'OffBtnClass') {
                   $('#imgIson').attr('class', 'OnBtnClass');
               }
               else {
                   $('#imgIson').attr('class', 'OffBtnClass');
               }
           });
       });
function createParameters() {
    var TOW = '';
    if ($('#rdoAuto').attr('checked'))
        TOW = '1';
    else
        TOW = '2'
    var status = (($('#imgIson').val() == "ON") ? "1" : "0");
    var param = "TemperatureMode=" + TOW + "&IsActive=" + status;
    param += "&Temperature=" + (escape($('#txt_Slider').val().trim()));
    param += "&RoomTemperature=" + (escape($('#txtroomtemp').val().trim()));

    param += "&DayId=" + ($('#chkMonday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkTuesday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkWednesday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkThursday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkFriday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkSaturday').attr('checked') ? "1" : "0") + ",";
    param += ($('#chkSunday').attr('checked') ? "1" : "0");

    param += "&OnTime=" + (escape($('#txtMondayon').val().trim())) + ",";
    param += (escape($('#txtTuesdayon').val().trim())) + ",";
    param += (escape($('#txtWednesdayon').val().trim())) + ",";
    param += (escape($('#txtThursdayon').val().trim())) + ",";
    param += (escape($('#txtFridayon').val().trim())) + ",";
    param += (escape($('#txtSaturdayon').val().trim())) + ",";
    param += (escape($('#txtSundayon').val().trim()));

    param += "&OffTime=" + (escape($('#txtMondaysleep').val().trim())) + ",";
    param += (escape($('#txtTuesdaysleep').val().trim())) + ",";
    param += (escape($('#txtWednesdaysleep').val().trim())) + ",";
    param += (escape($('#txtThursdaysleep').val().trim())) + ",";
    param += (escape($('#txtFridaysleep').val().trim())) + ",";
    param += (escape($('#txtSaturdaysleep').val().trim())) + ",";
    param += (escape($('#txtSundaysleep').val().trim()));

    return param;
}


$(document).ready(function () {
    $('#txtMondayon').timepicker({
        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtMondaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtTuesdayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtTuesdaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtWednesdayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtWednesdaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtThursdayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtThursdaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtFridayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtFridaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtSaturdayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtSaturdaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtSundayon').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });
    $('#txtSundaysleep').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

});



     

   
        