$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
    $(".nav_left li.icon_water_heater").addClass('active');
});


      function createParameter() {

          var TOW = '';
          if ($('#rdoHD').attr('checked')) {
              TOW = '1';
          }
          else if ($('#rdoPS').attr('checked')) {
              TOW = '2';
          }
          else {
              TOW = '3';
          }
          var param = "TemperatureMode=" + $('#txt_Slider').val().trim() + "&LoadType=" + TOW;
          param += "&DayId=" + ($('#chkMonday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkTuesday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkWednesday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkThursday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkFriday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkSaturday').attr('checked') ? "1" : "0") + ",";
          param += ($('#chkSunday').attr('checked') ? "1" : "0");

          param += "&OnTime=" + escape($('#txtMonday').val().trim()) + ",";
          param += escape($('#txtTuesday').val().trim()) + ","
          param += escape($('#txtWednesday').val().trim()) + ","
          param += escape($('#txtThursday').val().trim()) + ","
          param += escape($('#txtFriday').val().trim()) + ","
          param += escape($('#txtSaturday').val().trim()) + ","
          param += escape($('#txtSaturday').val().trim()) + ","
          return param;
      }
$(document).ready(function () {
    $('#btnSaveChanges').click(function () {
        try {
            if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                loader.showloader();
                var param = { json: createParameter() };
                $.ajax({
                    type: "POST",
                    url: "smart-waterheater.aspx/SaveAsync",
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
