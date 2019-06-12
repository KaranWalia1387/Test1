$(document).ready(function () {
    $('.addressDropdown').change(function () {
        $('#hdnFlag').val('1');
    });
    $(".nav_left li.icon_refrigerator").addClass('active');
});


      function createParameters() {
          var TOW = '';
          if ($('#rdoHD').attr('checked'))
              TOW = '1';
          else if ($('#rdoPS').attr('checked'))
              TOW = '2';
          else
              TOW = '3';
          var status = '';
          if ($('#btnLight').val() == 'ON') {
              status = "1";
          }
          else { status = "0"; }

          var param = ("FridgeTemp=" + escape($('#txt_Sliderfridge').val()));
          param += "&FreezerTemp=" + escape($('#txt_Sliderfreezer').val());
          param += "&Mode=" + TOW;
          param += "&RefrigeratorLight=" + status;
          param += "&WaterFilterStatus=" + escape($('#txtwaterfilter').val());
          return param;
      }
$(document).ready(function () {
    $('#btnSaveChanges').click(function () {
        loader.showloader();
        var param = { json: createParameters() };
        try {
            $.ajax({
                type: "POST",
                url: "smart-refrigerator.aspx/SaveAsync",
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
            return false;
        }
        catch (e) {
            loader.hideloader();
            toastr.error(e.message);
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
