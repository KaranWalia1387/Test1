
$(document).ready(function () {
    $('.txtAll input[type=checkbox]').click(function () {
        if ($(this).prop('checked')) {
            $(".txt input[type=checkbox]").prop('checked', true);
        }
        else {
            $(".txt input[type=checkbox]").prop('checked', false);
        }

    });
    $('.emailAll input[type=checkbox]').click(function () {
        if ($(this).prop('checked')) {
            $(".email input[type=checkbox]").prop('checked', true);
        }
        else {
            $(".email input[type=checkbox]").prop('checked', false);
        }

    });
    $('.pushAll input[type=checkbox]').click(function () {
        if ($(this).prop('checked')) {
            $(".push input[type=checkbox]").prop('checked', true);
        }
        else {
            $(".push input[type=checkbox]").prop('checked', false);
        }

    });
    $('.ivrAll input[type=checkbox]').click(function () {
        if ($(this).prop('checked')) {
            $(".ivr input[type=checkbox]").prop('checked', true);
        }
        else {
            $(".ivr input[type=checkbox]").prop('checked', false);
        }

    });

    $(".txt input[type=checkbox]").click(function () {
        var ischecked = true;
        $(".txt input[type=checkbox]").each(function (i, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                ischecked = false;
            }
        });
        $(".txtAll input[type=checkbox]").prop('checked', ischecked);//5283
    });
    $(".email input[type=checkbox]").click(function () {
        var ischecked = true;
        $(".email input[type=checkbox]").each(function (i, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                ischecked = false;
            }
        });
        $(".emailAll input[type=checkbox]").prop('checked', ischecked);
    });
    $(".push input[type=checkbox]").click(function () {
        var ischecked = true;
        $(".push input[type=checkbox]").each(function (i, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                ischecked = false;
            }
        });
        $(".pushAll input[type=checkbox]").prop('checked', ischecked);//5283
    });
    $(".ivr input[type=checkbox]").click(function () {
        var ischecked = true;
        $(".ivr input[type=checkbox]").each(function (i, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                ischecked = false;
            }
        });
        $(".ivrAll input[type=checkbox]").prop('checked', ischecked);//5283
    });




    $('#btnSave').click(function () {
        loader.showloader();
        $('#btnSave').attr('enable', false)
        var param = { json: parametersforpreferences() };
        $.ajax({
            type: "POST",
            url: "Preference.aspx/SaveDataAsync",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

        function OnSuccess(data, status) {
            loader.hideloader();
            //w2alert($('#SaveSuccess').text());
            toastr.success($('#SaveSuccess').text());
        }
        function OnError(request, status, error) {
            loader.hideloader();
           // w2alert($('#SaveFail').text());
            toastr.error($('#SaveFail').text());
        }

    });
});


function parametersforpreferences() {
    try {
        var param = 'PreferenceId=';
        var isenabled = '';
        var i = 0;
        var preferenceid = [];
        if ($("#chkID1").is(":checked")) {
            preferenceid.push("1");
            param = "1,";
     //       isenabled = "&IsEnabled=1,"
        }
        else
        {
           // param = "PreferenceId=1,";
      //      isenabled = "&IsEnabled=0,"
        }
        if ($("#chkID2").is(":checked")) {
            preferenceid.push("2");
            // param += "2,";
       //     isenabled += "1,";
            }
        else{
        //    param += "2,";
       //     isenabled += "0,";
        }
        if ($("#chkID3").is(":checked")) {
            preferenceid.push("3");
         //   param += "3,";
        //    isenabled += "1,";
        }
        else {
            //param += "3,";
            //isenabled += "0,";
        }
        if ($("#chkID4").is(":checked")) {
            preferenceid.push("4");
            param += "4,";
            isenabled += "1,";
        }
        else {
            //param += "4,";
            //isenabled += "0,";
        }
        if ($("#chkID5").is(":checked")) {
            preferenceid.push("5");
            param += "5,";
            isenabled += "1,";
        }
        else {
            //param += "5,";
            //isenabled += "0,";
        }
        if ($("#chkID6").is(":checked")) {
            preferenceid.push("6");
            //param += "6";
            //isenabled += "1";
        }
        else {
            //param += "6";
            //isenabled += "1";
        }
        param = "PreferenceId=" + preferenceid.join(',');
        return (param);//bug id 9683
    }
    catch (e) { }
}

function parametersforAccSettings() {
    var param = '';
    param += "Mode=0";

    param += "&ProgramTextNotify=" + (($('#chkProgramText').attr('checked')) ? "1" : "0");
    param += "&ProgramEmailNotify=" + (($('#chkProgramEmail').attr('checked')) ? "1" : "0");
    param += "&ProgramPushNotify=" + (($('#chkProgramPush').attr('checked')) ? "1" : "0");
    param += "&ProgramIvrNotify=" + (($('#chkProgramIvr').attr('checked')) ? "1" : "0");

    param += "&RebateTextNotify=" + (($('#chkRebateText').attr('checked')) ? "1" : "0");
    param += "&RebateEmailNotify=" + (($('#chkRebateEmail').attr('checked')) ? "1" : "0");
    param += "&RebatePushNotify=" + (($('#chkRebatePush').attr('checked')) ? "1" : "0");
    param += "&RebateIvrNotify=" + (($('#chkRebateIvr').attr('checked')) ? "1" : "0");

    param += "&ShopingTextNotify=" + (($('#chkShoppingText').attr('checked')) ? "1" : "0");
    param += "&ShopingEmailNotify=" + (($('#chkShoppingEmail').attr('checked')) ? "1" : "0");
    param += "&ShopingPushNotify=" + (($('#chkShoppingPush').attr('checked')) ? "1" : "0");
    param += "&ShopingIvrNotify=" + (($('#chkShoppingIvr').attr('checked')) ? "1" : "0");

    param += "&TravellingTextNotify=" + (($('#chkTravellingText').attr('checked')) ? "1" : "0");
    param += "&TravellingEmailNotify=" + (($('#chkTravellingEmail').attr('checked')) ? "1" : "0");
    param += "&TravellingPushNotify=" + (($('#chkTravellingPush').attr('checked')) ? "1" : "0");
    param += "&TravellingIvrNotify=" + (($('#chkTravellingIvr').attr('checked')) ? "1" : "0");

    return param;
}