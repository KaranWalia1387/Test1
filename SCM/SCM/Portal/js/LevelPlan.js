var enrolledVal=0;
$(document).ready(function () {
    $('.active').removeClass('active');
    $('.icon_label_pay').addClass('active');
    //var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
    var utlitynum = $('select#ddlAddress').val().split(":")[6];
    $('#lblAccntNoVal').text(utlitynum)
    $('#btnEnroll').click(function () {
        if (!$("#chkterm").prop('checked')) {
            w2alert($('#ML_LevelPlay_TrmsndCondition').text());
            return false;
        }
        toastr.clear();
        param = { isAvgBill: enrolledVal?"0":"1" };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "LevelPlan.aspx/EnrollUnenrollUser",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessEnroll,
            error: OnErrorEnroll
        });
    })

    getEnrollingStatus();
})

function OnErrorEnroll(data, status) {
    // alert(request.statusText);
    toastr.clear();
    toastr.error(request.statusText);
    loader.hideloader();
}
function OnSuccessEnroll(data, status) {
    loader.hideloader();
    if (JSON.parse(data.d)[0].STATUS == 1) {
        //w2alert($('#SaveSuccess').text());
        if (JSON.parse(data.d)[0].IsAverageBilling == "1") {
            toastr.clear();
            toastr.success($('#ML_LevelPlay_successfullyenrolled').text());
            $('#btnEnroll').addClass('selected');
            $('#btnEnroll').val($('#ML_LevelPlay_Disenroll').text());
            enrolledVal = true;

            $("#chkterm").prop('checked', true);
            $("#chkterm").prop("disabled", true);
        }
        else {
            $('#btnEnroll').removeClass('selected');
            $('#btnEnroll').val($('#ML_RecurringBill_Btn_SaveAll').text());

            toastr.clear();
            toastr.success($('#ML_LevelPlay_disenrolled').text());
            enrolledVal = false;

            $("#chkterm").prop('checked', false);
            $("#chkterm").prop("disabled", false);
        }
  
    }
    else {
        toastr.error("Error");
    }
}


function getEnrollingStatus(data, status) {
    try{
        $.ajax({
            type: "POST",
            url: "LevelPlan.aspx/getStatus",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessStatus,
            error: OnErrorStatus
        });
    } catch (e) {
        console.log(e);
    }
}


function OnSuccessStatus(data, status) {
    try {
        var d = JSON.parse(data.d);
        if (d != null) {
            enrolledVal = d[0].IsAverageBilling;
            if (enrolledVal==false) {
                $('#btnEnroll').removeClass('selected');
                $('#btnEnroll').val($('#ML_RecurringBill_Btn_SaveAll').text());
                $("#chkterm").prop('checked', false);
                $("#chkterm").prop("disabled", false);
            }
            else if (enrolledVal==true) {
                $('#btnEnroll').addClass('selected');
                $('#btnEnroll').val($('#ML_LevelPlay_Disenroll').text());
                $("#chkterm").prop('checked', true);
                $("#chkterm").prop("disabled", true);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

function OnErrorStatus() {
    toastr.clear();
    toastr.error(request.statusText);
    loader.hideloader();
}