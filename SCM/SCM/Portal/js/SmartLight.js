$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
    $(".nav_left li.icon_lighting").addClass('active');

    if ($('#imgIson').val() == 'OFF') { $('#imgIson').attr('globalize', 'ML_btnLightON'); }
    else $('#imgIson').attr('globalize', 'ML_btnLightOff');
});


      k(document).ready(function () {
          $('#btnSaveChanges').click(function () {
              if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                  loader.showloader();
                  try {
                      var param = {
                          json: createParameter()
                      };
                      $.ajax({
                          type: "POST",
                          url: "smart-light.aspx/SaveAsync",
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
                  }
                  catch (e) {
                      toastr.error(e.message);
                  }
              }
              else
              {
                  return false;
              }
          });

          k('#imgIson').click(function () {
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

function createParameter() {

    var status;
    if ($('#imgIson').val() == 'ON') {
        status = "1";
    }
    else {
        status = "0";
    }
    var param = "IsActive=" + status + "&Brightness=" + $('#txtlight').val();
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
    param += "&OffTime=" + (escape($($('#txtMondaysleep').val().trim())) + ",";
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

