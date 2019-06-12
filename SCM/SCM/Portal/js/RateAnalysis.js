var globalData;
var currPlan = '';
var NewPlan = '';
$(document).ready(function () {
    $('.active').removeClass('active');
    $('.icon_rate_analysis').addClass('active');

    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindColorCodes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ 'Mode': 2 }),
        success: function (data) {
            var result = $.parseJSON(data.d);
            for (var i = 0; i < result.Table.length; i++) {
                if (result.Table[i].ModuleName == 'RateAnalysis') {
                    if (result.Table[i].ConfigOption == 'CurrentPlan') {
                        currPlan = result.Table[i].ConfigValue;
                    }
                    else if (result.Table[i].ConfigOption == 'OtherPlan') {
                        NewPlan = result.Table[i].ConfigValue;
                    }
                }
            }
        },
        error: function () {

        }
    });

    $("#btnShow").click(function () {
        var tempPlanId = $("input[type=radio][name=plan]:checked").attr('id');
        if (tempPlanId != undefined) {
            DrawChart();
          
        }
        else
        {
            toastr.error($("#compRates").text());
        }
    });

});



function DrawChart() {
    try {
        title = "";
        yaxis = $("#YCompRate").text();
        var tempPlanId = $("input[type=radio][name=plan]:checked").attr('id');
        var planId = tempPlanId.split('_')[1];

        var selectedColor = currPlan;
        var seriesname1 = 'Current Plan';
        var seriesname2 = $("#" + tempPlanId).closest('div').find('.planName').text();

        var param = { isCompare: 1, PlanId: planId };
        $.ajax({
            type: "POST",
            data: JSON.stringify(param),
            url: "RateAnalysis.aspx/GetAnalysis",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });
        var session = common.checksession().value;
        //if (session) {
        //    toastr.error('Your session has expired. Please re-login.')
        //    window.location.href = "default.aspx";
        //    return;
        //}

        function OnError(request, status, error) {
            loader.hideloader();
            toastr.error(request.statusText)

        }

        function OnSuccess(data, status) {
            try {
                $("#divRatePopup").modal('show');
                $('.right_content_box').removeClass("preLoader");
                if (data != null) {
                    var newdata = JSON.parse(data.d);
                }
                processed_json = new Array();
                processed_json2 = new Array();

                $.map(newdata.Table, function (obj, i) {
                    processed_json.push({
                        y: parseFloat(obj.Consumed),
                        name: getMonthName(obj.MOD),
                        color: selectedColor,
                        year: parseFloat(obj.YOD)
                    });
                });

                $.map(newdata.Table1, function (obj, i) {
                    processed_json2.push({
                        y: parseFloat(obj.Consumed),
                        name: getMonthName(obj.MOD),
                        color: NewPlan,
                        year: parseFloat(obj.YOD)
                    });
                });

                $(".cmpr_value_box").html('<div id="chartAnalysis"></div>');
                setTimeout(function () {
                    BindhighChart4RateAnalysis('column', 'chartAnalysis', selectedColor, NewPlan, seriesname1, seriesname2);
                },300);
                

            }
            catch (ex) {
                loader.hideloader();
                var msg = ex.message;
            }
        }
    }
    catch (ex) {
        loader.hideloader();
        var msg = ex.message;
    }
}