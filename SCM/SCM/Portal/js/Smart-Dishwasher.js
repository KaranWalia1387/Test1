
        var Smarthometable,Smarthomedata;
$(document).ready(function () {
    $(".nav_left li.icon_dish_washer").addClass('active');

    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
     
    Smarthometable = dishwasher.LoadData();
    Smarthomedata = Smarthometable.value.Tables[0];

    if ($('#imgIson').val() == 'OFF') { $('#imgIson').attr('globalize', 'ML_SmartHome_ErrMsg_OnOff'); }
    else $('#imgIson').attr('globalize', 'ML_SmartHome_DishWasher_OffOn');
});


      //Done by Pooja for bugid 19617
      function checkStatus(obj) {
          var day = obj.id.substring(obj.id.indexOf("k") + 1);
          var txtvalue = '';
          if (!(obj.checked)) {
              $('#' + 'txt' + day).val('');
          }
          else {
              switch (day) {
                  case 'Monday': txtvalue = Smarthomedata.Rows[0]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Tuesday': txtvalue = Smarthomedata.Rows[1]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Wednesday': txtvalue = Smarthomedata.Rows[2]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Thursday': txtvalue = Smarthomedata.Rows[3]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Friday': txtvalue = Smarthomedata.Rows[4]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Saturday': txtvalue = Smarthomedata.Rows[5]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
                  case 'Sunday': txtvalue = Smarthomedata.Rows[6]["OnTime"];
                      $('#' + 'txt' + day).val(txtvalue);
                      break;
              }
          }
      }


     
  $(document).ready(function () {
      $('#txtMonday').timepicker({
        showPeriod: true,
          minutes: { interval: 2 },
          showLeadingZero: true
      });

      ($('#chkTuesday').prop('checked'))
      {
          $('#txtTuesday').timepicker({
              showPeriod: true,
              minutes: { interval: 2 },
              showLeadingZero: true
          });
      }

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

  
         k(document).ready(function () {
             $('#btnSaveChanges').click(function () {
               
                 try
                 {
                     if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                         loader.showloader();
                         var param = {
                             json: createParameters()
                         };
                         $.ajax({
                             type: "POST",
                             url: "smart-dishwasher.aspx/SaveAsync",
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
                             }
                         });
                     }
                     else
                     {
                         return false;
                     }
                 }
                 catch (e)
                 {
                     loader.hideloader();
                     toastr.error(e.message);
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
  function createParameters()
  {
      var TOW = '';
      if ($('#rdoHW').attr('checked'))
      { TOW = "1"; }
      else if ($('#rdoNW').attr('checked'))
      { TOW = "2"; }
      else
      { TOW = "3"; }
      var status;
      if ($('#imgIson').val() == 'ON') {
          status = "1";
      }
      else {
          status = "0";
      }
      var param = "TypeOfWash=" + TOW + "&IsActive=" + status;
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
      return param;
  }
  
  
   
