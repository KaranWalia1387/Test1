﻿$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
    $(".nav_left li.icon_dryer").addClass('active');
});


      function createParameters() {
          var param = '';
          var TOW = '';
          var TOW2 = '';
          if ($('#rdoRL').attr('checked')) {
              TOW = '1';
          }
          else if ($('#rdoLL').attr('checked')) {
              TOW = '2';
          }
          else {
              TOW = '3';
          }
          if ($('#rdoRL').attr('checked')) {
              TOW2 = '1';
          }
          else if ($('#rdoLL').attr('checked')) {
              TOW2 = '2';
          }
          else {
              TOW2 = '3';
          }
          var status = ($('#imgIson').val() == "ON" ? "1" : "0");
          var param = "TemperatureMode=" + TOW + "&LoadType=" + TOW2;
          param += "&DayId=" + ($('#chkMonday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkTuesday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkWednesday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkThursday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkFriday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkSaturday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkSunday').attr('checked') ? "1" : "0");

          param += "&OnTime=" + (escape($('#txtMonday').val().trim())) + ",";
          param += (escape($('#txtTuesday').val().trim())) + ",";
          param += (escape($('#txtWednesday').val().trim())) + ",";
          param += (escape($('#txtThursday').val().trim())) + ",";
          param += (escape($('#txtFriday').val().trim())) + ",";
          param += (escape($('#txtSaturday').val().trim())) + ",";
          param += (escape($('#txtSunday').val().trim()));

          param += "&IsActive=" + status;
          return param;
      }
$(document).ready(function () {
    $('#btnSaveChanges').click(function () {
        if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
            loader.showloader();
            var param = { json: createParameters() };

            $.ajax({
                type: "POST",
                url: "smart-dryer.aspx/SaveAsync",
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
        else
        {
            return false
        }
    });

    if ($('#imgIson').val() == 'OFF') { $('#imgIson').attr('globalize', 'ML_SmartDryer_ErrMsg_OffOn'); }
    else $('#imgIson').attr('globalize', 'ML_SmartDryer_ErrMsg_OnOff');

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
});


$(document).ready(function () {

    $('#txtMonday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtTuesday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtWednesday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtThursday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtFriday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtSaturday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });

    $('#txtSunday').timepicker({

        showPeriod: true,
        minutes: { interval: 2 },
        showLeadingZero: true
    });



});
