$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
    $(".nav_left li.icon_jacuzzi").addClass('active');

    if ($('#imgIson').val() == 'OFF') { $('#imgIson').attr('globalize', 'ML_SmartJacuzzi_ErrMsg_OffOn'); }
    else $('#imgIson').attr('globalize', 'ML_SmartJacuzzi_ErrMsg_OnOff');

    if ($('#btnLight').val() == 'OFF') { $('#btnLight').attr('globalize', 'ML_btnLightON'); }
    else $('#btnLight').attr('globalize', 'ML_btnLightOff');


    if ($('#btnAuto').val() == 'OFF') { $('#btnAuto').attr('globalize', 'ML_btnAutoOff'); }
    else $('#btnAuto').attr('globalize', 'ML_btnAutoON');

});


      function createParameters() {
          var lightStatus = ($('#btnLight').val() == "ON" ? "1" : "0");
          var imgIsonStatus = ($('#imgIson').val() == "ON" ? "1" : "0");
          var btnAutoStatus = ($('#btnAuto').val() == "ON" ? "1" : "0");
          var param = "JacuzziLight=" + lightStatus + "&JacuzziAuto=" + btnAutoStatus + "&IsActive=" + imgIsonStatus + "&Temperature=" + $('#txtroomtemp').val().trim();
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
    $('#btnSaveChanges').click(function () {
        try {
            if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                loader.showloader();
                var param = {
                    json: createParameters()
                };
                $.ajax({
                    type: "POST",
                    url: "smart-jacuzzi.aspx/SaveAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data, status) {
                        if (parseInt(data.d) > 0) {
                            toastr.success($('#DBSuccess').text());
                            //alert('Settings saved successfully.');
                        }
                        else {
                            toastr.error($('#IDSaveFailed').text());
                            //alert('Setting  did not submitted.');
                        }
                        loader.hideloader();
                    },
                    error: function (request, status, error) {
                        loader.hideloader();
                        toastr.error($('#IDSaveFailed').text() + ' ' + request.statusText);
                        //alert('Setting  did not submitted. ' + request.statusText);
                    }
                });
            }
            else {
                return false;
            }
        }
        catch (e) {
            loader.hideloader();
            toastr.error(e.message);
        }
    });

    $('#btnAuto').click(function () {
        if ($(this).attr('class') == "OnBtnClass") {
            $(this).attr('class', 'OffBtnClass');
        }
        else {
            $(this).attr('class', 'OnBtnClass');
        }

        if ($(this).val() == "ON") {
            $(this).val('OFF');
        }
        else {
            $(this).val('ON');
        }
    });

    $('#imgIson').click(function () {
        if ($(this).attr('class') == "OnBtnClass") {
            $(this).attr('class', 'OffBtnClass');
        }
        else {
            $(this).attr('class', 'OnBtnClass');
        }

        if ($(this).val() == "ON") {
            $(this).val('OFF');
        }
        else {
            $(this).val('ON');
        }
    });

    $('#btnLight').click(function () {
        if ($(this).attr('class') == "OnBtnClass") {
            $(this).attr('class', 'OffBtnClass');
        }
        else {
            $(this).attr('class', 'OnBtnClass');
        }

        if ($(this).val() == "ON") {
            $(this).val('OFF');
        }
        else {
            $(this).val('ON');
        }
    });

});


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
