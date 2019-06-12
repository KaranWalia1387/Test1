var powerrange;
var processed_json;
var data_energy;



$(document).ready(function () {

    $('.active').removeClass('active');
    $('.icon_energy_report').addClass('active');

    $('.efficency').addClass('active');
    var billhtmlstr = Energy_Report.LoadBillData();
    $('.bill_summary').html(billhtmlstr.value);
    //waterrange = comUsage.LoadWaterRange().value;
    //if ($("#hdnWUKWH").val() == "0")
    //    loadWaterusage('D', '$$');
    //else
    //    loadWaterusage('D', 'HCF');
    $('.active').removeClass('active');
    $('.icon_energy_report').addClass('active');
    $('.efficency').addClass('active');
    var billhtmlstr = Energy_Report.LoadBillData();
    $('.bill_summary').html(billhtmlstr.value);

    $('.progress_2').animate({ height: '88%' }, 1500);
    $(".progress_1").animate({ height: '28%' }, 1500);

    powerrange = comUsage.LoadRange().value;

    data_energy = Energy_Report.LoadSavingTips().value;
    $('#energy_title_1').text(data_energy.Rows[0].Title);
    $('#energy_desc_1').text(data_energy.Rows[0].Description);
    $('#energy_title_2').text(data_energy.Rows[1].Title);
    $('#energy_desc_2').text(data_energy.Rows[1].Description);

    if ($("#hdnPUKWH").val() == "0")
        loadpowerusage('D', '$$');
    else
        loadpowerusage('D', 'kWh');


    powerrange = comUsage.LoadRange().value;

    data_energy = Energy_Report.LoadSavingTips().value;
    try {
        if (data_energy.Rows.length > 0) {
            $('#energy_title_1').text(data_energy.Rows[0].Title);
            $('#energy_desc_1').text(data_energy.Rows[0].Description);
        }
        else {

        }
        if (data_energy.Rows.length > 1) {
            $('#energy_title_2').text(data_energy.Rows[1].Title);
            $('#energy_desc_2').text(data_energy.Rows[1].Description);
        }
        else {

        }
      
      
    }
    catch (e)
    {
        console.log(e.message);
    }
    if ($("#hdnPUKWH").val() == "0")
        loadpowerusage('D', '$$');
    else
        loadpowerusage('D', 'kWh');

});

//Creates dynamic date range
function createDateLabel(usageData) {
    var from = new Date(usageData.Rows[0].UsageDate);
    var to = new Date(usageData.Rows[usageData.Rows.length - 1].UsageDate);
    var dt;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m1 = month[from.getMonth()];
    var m2 = month[to.getMonth()];
    if (from.getFullYear() == to.getFullYear()) {
        dt = m1 + " " + from.getDate() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
    }
    else {
        dt = m1 + " " + from.getDate() + ", " + from.getFullYear() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
    }
    $('#dvDateRange').text(dt);
}

function loadpowerusage(mode, Type) {
    try {
        var yaxisname = Type == "kWh" ? 'kWh' : '$';
        if (Type == "kWh")
            Type = "K";
        else
            Type = "D";
        loadRange(Type, mode, "E", powerrange);
        var usageData = comUsage.LoadUsage("1", Type, mode, "", "H", "", "0", "","").value; //added default houlytype "H" for 15 mins data
        if (!(usageData == null || usageData.Rows.length == 0)) {
            // drawgaugechart(usageData.Rows[usageData.Rows.length - 1].TotalValue, usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, "divElectricityUsage", mode, '#f0cb1e');
            //drowDonutChart('#f0cb1e', usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, usageData.Rows[usageData.Rows.length - 1].TotalValue, "divElectricityUsage");
            //$('#divElectricityUsageText').html('<b>' + usageData.Rows[usageData.Rows.length - 1].TotalValue.toFixed(TO_FIX) + '</b></br> of ' + (usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2).toFixed(OF_FIX));
            var startindex = 0;
            if (usageData.Rows.length > 7) {
                startindex = usageData.Rows.length - 7;
            }

            createDateLabel(usageData);

            processed_json = new Array();
            $.map(usageData.Rows, function (obj, i) {
                if (i >= startindex) {
                    processed_json.push({
                        name: obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
                        y: obj.TotalValue,
                        color: setcolor(obj.TotalValue)
                    });
                }
            });
            BindheighDashboard_EnergyRpt('column', 'divElectricityUsage', '', yaxisname);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function loadRange(type, mode, rangeType, range) {

    mode = mode == "$$" ? "D" : mode;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["MiddleRange"];
            break;
        }
    }
}

function setcolor(usagevalue) {
    var color = '#FFFFFF';
    if (usagevalue <= lowRange) {
        color = '#94D60A';
    }
    else if (usagevalue > lowRange && usagevalue <= highRange) {
        color = '#F8A13F';
    }
    else if (usagevalue > highRange) {
        color = '#ba3d4b';
    }
    return color;

}

//Creates dynamic date range
function createDateLabel(usageData) {
    var from = new Date(usageData.Rows[0].UsageDate);
    var to = new Date(usageData.Rows[usageData.Rows.length - 1].UsageDate);
    var dt;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m1 = month[from.getMonth()];
    var m2 = month[to.getMonth()];
    if (from.getFullYear() == to.getFullYear()) {
        dt = m1 + " " + from.getDate() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
    }
    else {
        dt = m1 + " " + from.getDate() + ", " + from.getFullYear() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
    }
    $('#dvDateRange').text(dt);
}

function loadpowerusage(mode, Type) {
    try {
        var yaxisname = Type == "kWh" ? 'kWh' : '$';
        if (Type == "kWh")
            Type = "K";
        else
            Type = "D";
        loadRange(Type, mode, "E", powerrange);
        var usageData = comUsage.LoadUsage("1", Type, mode, "", "H", "", "0", "","").value; //added default houlytype "H" for 15 mins data
        if (!(usageData == null || usageData.Rows.length == 0)) {
            // drawgaugechart(usageData.Rows[usageData.Rows.length - 1].TotalValue, usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, "divElectricityUsage", mode, '#f0cb1e');
            //drowDonutChart('#f0cb1e', usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, usageData.Rows[usageData.Rows.length - 1].TotalValue, "divElectricityUsage");
            //$('#divElectricityUsageText').html('<b>' + usageData.Rows[usageData.Rows.length - 1].TotalValue.toFixed(TO_FIX) + '</b></br> of ' + (usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2).toFixed(OF_FIX));
            var startindex = 0;
            if (usageData.Rows.length > 7) {
                startindex = usageData.Rows.length - 7;
            }

            createDateLabel(usageData);

            processed_json = new Array();
            $.map(usageData.Rows, function (obj, i) {
                if (i >= startindex) {
                    processed_json.push({
                        name: obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
                        y: obj.TotalValue,
                        color: setcolor(obj.TotalValue)
                    });
                }
            });
            BindheighDashboard_EnergyRpt('column', 'divElectricityUsage', '', yaxisname);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function loadRange(type, mode, rangeType, range) {

    mode = mode == "$$" ? "D" : mode;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["MiddleRange"];
            break;
        }
    }
}

function setcolor(usagevalue) {
    var color = '#79d1b5';
    if (usagevalue <= lowRange) {
        color = '#f1b274';
    }
    else if (usagevalue > lowRange && usagevalue <= highRange) {
        color = '#ec625e';
    }
    else if (usagevalue > highRange) {
        color = '#31afdb';
    }
    return color;

}

var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {


})
