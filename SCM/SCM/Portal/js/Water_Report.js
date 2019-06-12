var waterrange;
var processed_json;
var data_water;
var piechartdata_water = 0;

var waterrange;
var processed_json;
var data_water;
var piechartdata_water = 0;

$(document).ready(function () {

    // add active class to side tabs,header icon
    $('.active').removeClass('active');
    $('.icon_energy_report').addClass('active');
    $('.efficency').addClass('active');

    $('.progress2').animate({ height: '69%' }, 1500);
    $(".progress_1").animate({ height: '28%' }, 1500);

   
    var billhtmlstr = Water_Report.LoadBillData();
    $('.bill_summary').html(billhtmlstr.value);

    GetPieChartData1();
    WaterAverageValues();    
    EfficientChart();

 
    var billhtmlstr = Water_Report.LoadBillData();
    $('.bill_summary').html(billhtmlstr.value);

    waterrange = comUsage.LoadWaterRange().value;

    data_water = Water_Report.LoadSavingTips().value;
    if (data_water.Rows.length > 0) {
        $('#water_title_1').text(data_water.Rows[0].Title);
        $('#water_desc_1').text(data_water.Rows[0].Description);
    }
    if (data_water.Rows.length > 1) {
        $('#water_title_2').text(data_water.Rows[1].Title);
        $('#water_desc_2').text(data_water.Rows[1].Description);
    }
    if ($("#hdnWUKWH").val() == "0")
        loadWaterusage('D', '$$');
    else
        loadWaterusage('D', 'HCF');

});

function setname(index) {
    var name = '';
    if (index == 0) {
        name = $('#Efficient').text();
    }
    else if (index == 1) {
        name = $('#Yourself').text();
    }
    else if (index == 2) {
        name = $('#Inefficient').text();
    }
    return name;

}

function EfficientChart() {

    $.ajax({
        type: "POST",
        url: "Water_Report.aspx/DrawChartMeterwise",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            data = data.d;
            var result = $.parseJSON(data);
            //result = result.Table;
            //FillData_HowYouCompare(result.Table);
            FillData_HowYouRank(result.Table1);
            DrawChart('G', 1);
        },
        error: function (request, status, error) {
            loader.hideloader();
            toastr.error('Error!! ' + request.statusText);
        }
    });

}

function DrawChart(Type, val) {
    try {
       // loader.showloader();
        var session = common.checksession().value;
        if (session) {
            toastr.error('Your session has expired. Please re-login.');
            window.location.href = "default.aspx";
            return;
        }

        var selectedType, selectedCompareType, month;
        var selectedMode, selectedColor, selectedColor2, selectedColor3;

        selectedMode = 'M';
        selectedCompareType = "CsW";

        function OnError(request, status, error) {
            //loader.hideloader();
            toastr.error(request.statusText);
        }

        function OnSuccess(data, status) {

            //loader.hideloader();
            if (data != null) {
                selectedType = "Units Consumed (HCF)";
                jsonData = JSON.parse(data.d);
                var newdata = JSON.parse(data.d);
                var odata = [];
                odata.push({ Name: "TblChartType", Rows: newdata.TblChartType });
                var ldata = {}
                ldata["Tables"] = odata.valueOf();
                var dtchart = ldata;
                var charttype = "line";
                var currentMonth = '';
                var previousMonth = '';
                var currentyear = '';
                var previousyear = '';

                function GetMonthName(monthNumber) {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    return months[monthNumber - 1];
                }

                var monthvalue = (new Date).getMonth() + 1;
                var month = GetMonthName(monthvalue);

                if (newdata.Table != null) {
                    for (var i = 0; i < newdata.Table.length; i++) {
                        if (parseInt(monthvalue) == parseInt(newdata.Table[i].MOD)) {
                            currentyear = newdata.Table[i].YOD;
                            break;
                        }
                    }
                }
                if (newdata.Table1 != null) {
                    for (var i = 0; i < newdata.Table1.length; i++) {
                        if (parseInt(monthvalue) == parseInt(newdata.Table1[i].MOD)) {
                            previousyear = newdata.Table1[i].YOD;
                            break;
                        }
                    }
                }
                currentMonth = month + " " + currentyear;
                previousMonth = month + " " + previousyear;

                if (selectedMode == "M") {
                    seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                    seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                    selectedColor = "#7bab91";
                    jsonDataMe = newdata.Table1;
                }
            }
            yaxis = selectedType;
            processed_json = new Array();
            processed_json2 = new Array();
            processed_jsonAllocation = new Array();

            $.map(newdata.Table, function (obj, i) {
                processed_json2.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: "#c66c6c",
                    year: obj.YOD
                });
            });
            //  }
            $.map(jsonDataMe, function (obj, i) {
                processed_json.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: selectedColor,
                    year: obj.YOD
                })
            });
           
            $.map(jsonDataMe, function (obj, i) {
                if (obj.AllocationValue != undefined) {
                    processed_jsonAllocation.push({
                        name: getMonthName(obj.MOD),
                        y: parseFloat((obj.AllocationValue)),
                        color: "#31afdb",
                        title: 'Allocation'
                    });
                }
            });
                
            var mon = monthvalue;

            //x-axis marker
            var monStartIndex = getMonthValue(processed_json[0].name);
            if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
            else if (parseInt(mon) == monStartIndex) { mon = 0; }
            else { mon = (parseInt(mon) + 12) - monStartIndex; }
            //x-axis marker

            //BindhighChart2SeriesLine('line', 'chartNeighboursDiv', "#7bab91", "#c66c6c", seriesname1, seriesname2, "CsW", mon);
            BindhighChart2SeriesLine_waterReport('line', 'chartNeighboursDiv', "#7bab91", "#c66c6c", "Usage1", "Usage2", "CsW", 11);
            //setdataforheader(selectedCompareType, selectedType);
            setLabelsValue(processed_json, processed_json2, 'M');

        }

        var param = { type: Type }

        $.ajax({
            type: "POST",
            url: "Water_Report.aspx/LoadData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

    }
    catch (ex) {
        loader.hideloader();
        var msg = ex.message;
    }
}

//jsonData1 for Month, jsonData2 for prev
function setLabelsValue(jsonData1, jsonData2, selectedMode) {
    try {

        var month = (new Date).getMonth() + 1;
        var mnth = getMonthName(month);

        var monthlyAvg, PreviousAvg, Monthavglabel, lblPreveslabel, zipAvg, utilityAvg;

        $.each(jsonData1, function (i, obj) {
            if (obj.name == mnth) {
                PreviousAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                lblPreveslabel = obj.name + " " + obj.year;
            }
        });

        $.each(jsonData2, function (i, obj) {
            if (obj.name == mnth) {
                monthlyAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                Monthavglabel = obj.name + " " + obj.year;
            }
        });

        $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : "$" + monthlyAvg);
        $("#lblMonthavglabel").text(Monthavglabel + ":");
        $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);
        $("#lblPreveslabel").text(lblPreveslabel + ":");
        $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);
        $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);
    }
    catch (ex) {
        console.log(ex.message);
    }
}

function FillData_HowYouRank(data) {

    processed_json = new Array();
    $.map(data, function (obj, i) {
        processed_json.push({
            name: setname(0),
            y: obj.AboveMe,
            color: ((parseInt(obj.AboveMe)) > 0 ? '#79d1b5' : '#ec625e')
        }),
         processed_json.push({
             name: setname(2),
             y: Math.abs(obj.BelowMe),
             color: ((parseInt(obj.BelowMe)) > 0 ? '#79d1b5' : '#ec625e')
         }),
        processed_json.push({
            name: setname(1),
            y: Math.abs(obj.MyDifference),
            color: ((parseInt(obj.BelowMe)) > 0 ? '#79d1b5' : '#ec625e')
        });
    });
    showindecimal = true;
    Bindheigh_Efficiency('column', 'chartDiv');
}

function FillData_HowYouCompare(data) {

    processed_json = new Array();
    $.map(data, function (obj, i) {
        processed_json.push({
            name: getMonthName(obj.Month),
            y: obj.RankNo
        });
    });

    showindecimal = false;
    //populateChart('line', 'chartNeighboursDiv', 'absolute', false);
    BindhighChart2SeriesLine_waterReport('line', 'chartNeighboursDiv', "#7bab91", "#c66c6c", "Usage1", "Usage2", "CsW", 11);
}


function GetPieChartData1() {
    $.ajax({
        type: "POST",
        url: "Water_Report.aspx/PieChartData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess1,
        error: OnError
    });
}

function OnError(request, status, error) {
    loader.hideloader();
    toastr.error('Error!! ' + request.statusText);
}

function OnSuccess1(data, status) {
    data = data.d;
    var result = $.parseJSON(data);
    piechartdata_water = result.Table2;
    BindCSMDonut_Water(piechartdata_water);
}

function BindCSMDonut_Water(data) {
    try {

        processed_json1 = new Array();
        $.map(data, function (obj, i) {
            processed_json1.push({
                name: obj.Percentage,
                y: parseInt(obj.Duration),
                color: setcolorvalue(i),
                title: obj.WaterQuarter
            });
        })
        BindPieChart_WaterRep('divPieChart2', 'Quarterly Usage', processed_json1)
    }
    catch (e) { }
}

function setcolorvalue(usagevalue) {
    var color = '';
    if (usagevalue == 0) {
        color = '#79d1b5';
    }
    else if (usagevalue == 1) {
        color = '#f1b274';
    }
    else if (usagevalue == 2) {
        color = '#ec625e';
    }
    else if (usagevalue == 3) {
        color = '#31afdb';
    }
    return color;

}

function BindPieChart_WaterRep(id, axisname, processed_json1) {

    try {
        $('#' + id).highcharts({
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie',

            },

            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> %',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true,

                    }
                },
                pie: {
                    innerSize: 100
                }
            },
            tooltip: {

                formatter: function () {

                    return '<b>' + this.point.series.name + ' : </b>' + this.point.name + '%' + '<br><b>Duration: </b>' + this.point.title;

                }
            },
            legend: {
                enabled: true
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },


            series: [{

                name: axisname,
                data: processed_json1

            }]
        });
    }
    catch (e) {
        console.log(e.message);
    }

}

function WaterAverageValues() {

    sum = 0;
    DollarMonthlyAvg = 0;
    DollarDailyAvg = 0;
    waterUsageDollarMonth = comUsage.LoadWaterUsage('D', 'M', "", 'H', "", '0', "","").value;
    for (i = 0; i < waterUsageDollarMonth.Rows.length; i++) {
        sum += waterUsageDollarMonth.Rows[i].TotalValue;
    }
    DollarMonthlyAvg = sum / waterUsageDollarMonth.Rows.length;
    DollarDailyAvg = DollarMonthlyAvg / 30;
    $('#dollarpermonth').html('$' + DollarMonthlyAvg.toFixed(2) + ' per month.');
    $('#dollarperday').html('$' + DollarDailyAvg.toFixed(2) + ' per day.');

    sum = 0;
    GallonMonthlyAvg = 0;
    GallonDailyAvg = 0;
    usageDataGallonMonth = comUsage.LoadWaterUsage('G', 'M', "", 'H', "", '0', "","").value;
    for (i = 0; i < usageDataGallonMonth.Rows.length; i++) {
        sum += usageDataGallonMonth.Rows[i].TotalValue;
    }
    GallonMonthlyAvg = sum / usageDataGallonMonth.Rows.length;
    GallonDailyAvg = GallonMonthlyAvg / 30;
    $('#gallonpermonth').html(GallonMonthlyAvg.toFixed(2) + 'Gallon per month.');
    $('#gallonperday').html(GallonDailyAvg.toFixed(2) + 'Gallon per day.');
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

function loadWaterusage(mode, Type) {
    try {
        var yaxisname = Type == "HCF" ? 'HCF' : '$';
        if (Type == 'G') {
            yaxisname = 'GL';
        }
        if (Type == "HCF")
            Type = "W";
        else
            Type = "D";
        loadRange(Type, mode, "E", waterrange);
        var usageData = comUsage.LoadWaterUsage(Type, "D", "", "H", "0", "0", "0","").value;//added default houlytype "H" for 15 mins data
        if (!(usageData == null || usageData.Rows.length == 0)) {
            // drawgaugechart(usageData.Rows[usageData.Rows.length - 1].TotalValue, usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, "divWaterUsage", mode,'#0082cc');
            //drowDonutChart('#0082cc', usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, usageData.Rows[usageData.Rows.length - 1].TotalValue, "divWaterUsage");
            //$('#divWaterUsageText').html('<b>' + usageData.Rows[usageData.Rows.length - 1].TotalValue.toFixed(TO_FIX) + '</b></br> of ' + (usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2).toFixed(OF_FIX));
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
            BindheighDashboard_EnergyRpt('column', 'divWaterUsage', '', yaxisname);
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function loadRange(type, mode, rangeType, range) {
    //type = type == "C" ? "K" : type;
    mode = mode == "$$" ? "D" : mode;
    //if (rangeType == 'E') {
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["MiddleRange"];
            break;
        }
    }
    //}
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

var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {


})