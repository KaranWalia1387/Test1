var lowRangew;
var highRangew;
var rangew;

google.load("visualization", "1", { packages: ["corechart"] });
$(document).ready(function () {

    $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
        $('#hdnunit').val(typew);
        $('#hdntime').val(mode);
        $('#hdnTitle').val(mainTitlew);
    });

    rangew = comUsage.LoadWaterRange().value;

    typew = $('#hdnType').val();
    mode = $('#hdnMode').val();
    prevmode = $('#hdnMode').val(); //This variable is used to remember prev mode.
    prevtypew = $('#hdnType').val(); //This variable is used to remember prev type.

    $('#usageMapMode a').click(function () {
        currentmodew = $(this).attr('mode');
        if (currentmodew != mode) {
            prevmode = mode;
            mode = currentmodew;
            $('#hdnMode').val(mode);
            drawChart(typew, mode);
            setImagesw();
        }
    });

    $('#usageMapType  a, #usageMapOpt a').click(function () {
        currenttypew = $(this).attr('type');
        if (currenttypew != typew) {
            prevtypew = typew;
            typew = currenttypew;
            drawChart(typew, mode);
            setImagesw();
        }
    });
    drawChart(typew, mode);
    setImagesw();

});

//To set images on onclick
function setImagesw() {
    $('#usageMapMode a[mode=' + prevmode + ']').removeClass("active");
    $('#usageMapMode a[mode=' + mode + ']').addClass("active");
    $('#usageMapType a[type=' + prevtypew + ']').removeClass("active");
    $('#usageMapType a[type=' + typew + ']').addClass("active");
}



function drawChart(Typew, Modew, strDate) {
    if (Modew == 'H' || Modew == 'D') {
        $("#divCalender").css('display', 'inline');
    }
    else {
        $("#divCalender").css('display', 'none');
    }

    mainTitlew = '';


    //Check Session
    var session = common.checksession().value;
    if (session) {
        alert('Your session has expired. Please re-login.');
        window.location.href = "default.aspx";
        return;
    }

    strDate = $("#hdnstrDate").val();
    var hourlytype = Modew == "H" ? "F" : "H";
    var usageDataw = comUsage.LoadWaterUsage(Typew, Modew, (strDate == undefined ? "" : strDate), hourlytype).value;

    if (usageDataw.Rows.length == 0 || usageDataw == null) {
        $('#chart-water').html('');
        alert('Water Usage data not found.');
        return false;
    }

    loadRangew(Typew, Modew);
    yaxis = Typew == "W" ? 'Units Consumed (HCF)' : 'Cost of Units Consumed ($)';
    processed_json = new Array();
    var rowCountw = usageDataw.Rows.length;

    switch (Modew) {
        case "H":
            mainTitlew = 'Usage for ' + usageDataw.Rows[0]["UsageDate"];
            //xaxis = 'Time';
            $.map(usageDataw.Rows, function (obj, i) {
                processed_json.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    name: obj.Hourly,
                    y: parseFloat(obj.TotalValue),
                    color: setcolor(obj.TotalValue)
                });
            });
            break;

        case "D":
            mainTitlew = 'Period: ' + usageDataw.Rows[0]["UsageDate"] + ' to ' + usageDataw.Rows[rowCountw - 1]["UsageDate"];
            //xaxis = 'Date';
            $.map(usageDataw.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.UsageDate,
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue),
                    year: obj.Year
                });
            });
            break;

        case "M":
            mainTitlew = 'Period: ' + getMonthName(usageDataw.Rows[0]["Month"]) + ' ' + usageDataw.Rows[0]["Year"] + ' to ' + getMonthName(usageDataw.Rows[rowCountw - 1]["Month"]) + ' ' + usageDataw.Rows[rowCountw - 1]["Year"];
            //xaxis = 'Month';
            $.map(usageDataw.Rows, function (obj, i) {
                processed_json.push({
                    name: getMonthName(obj.Month),
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue),
                    year: obj.Year
                });
            });
            break;
    }

    setdailyhighest(Modew, Typew, processed_json);
    $("#lblUsageDate").text(mainTitlew);

    //Start - increase width of the chart to show more data
    var columncount = processed_json.length;
    if (columncount > 31) {
        var chartwidth = columncount * 30;
        $('#chart-water').attr('style', 'width:' + chartwidth + 'px !important');
    }
    else {
        $('#chart-water').attr('style', 'width:97%!important');
    }
    //End - increase width of the chart to show more data
    $(".radius").height($(window).height() * .39);
    populateChart('column', 'chart-water');

}

function setcolor(usagevalue) {
    var color = '#FFFFFF';
    if (usagevalue <= lowRangew) {
        color = '#94D60A';
    }
    else if (usagevalue > lowRangew && usagevalue <= highRangew) {
        color = '#F8A13F';
    }
    else if (usagevalue > highRangew) {
        color = '#ba3d4b';
    }
    return color;

}

function loadRangew(typew, mode) {
    for (var r = 0; r < rangew.Rows.length; r++) {
        if (rangew.Rows[r]["Type"] == typew && rangew.Rows[r]["RangeMode"] == mode) {
            lowRangew = rangew.Rows[r]["LowRange"];
            highRangew = rangew.Rows[r]["MiddleRange"];
            break;
        }
    }
}

function setImages() {
    $('#usageMapMode a[mode=' + prevmode + ']').removeClass("active");
    $('#usageMapMode a[mode=' + mode + ']').addClass("active");
    $('#usageMapType a[type=' + prevtype + ']').removeClass("active");
    $('#usageMapType a[type=' + type + ']').addClass("active");
}

function chartclick(x, y) {
    prevmode = mode;
    if (mode == 'H')
    { return false; }
    else if (mode == 'Y') {
        mode = 'M';

    }
    else if (mode == 'M') {
        mode = 'D';
        var clickyear = "";
        for (var i = 0; i < processed_json.length; i++) {
            if (processed_json[i].name == x) {
                clickyear = processed_json[i].year;
            }
        }
        $("#hdnstrDate").val(pad(getMonthValue(x), 2) + "/" + clickyear);
    }
    else if (mode == 'D') {
        mode = 'H';
        $("#hdnstrDate").val(x);
        $find("Cal_Date").set_selectedDate(x);
    }

    drawChart($('#hdnType').val(), mode);
    setImages();

}

function UsageDataHourly(sender, args) {

    var date = new Date(sender._selectedDate);

    // get the timezone offset in minutes
    var timeOffsetMinutes = date.getTimezoneOffset();
    // Convert minutes into milliseconds and create a new date based on the minutes.
    var correctedDate = new Date(date.getTime() + timeOffsetMinutes * 60000);

    var dd = correctedDate.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    var mm = correctedDate.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm
    }

    var yyyy = date.getFullYear();
    var strDate = mm + '/' + dd + '/' + yyyy;
    var lblText = 'Hourly Data For ' + strDate;
    //            $("#lblCharttitle").text(lblText);

    var meternumer = $('#hdnMeter').val();
    $("#hdnstrDate").val(strDate);
    drawChart(typew, mode, strDate);

}


function setdailyhighest(mode, unit, usagearray) {
    var maxval = 0;
    var avgvalue = 0;
    var total = 0;
    if (usagearray.length > 0) {
        maxval = usagearray[0].y;
    }
    for (var i = 0; i < usagearray.length; i++) {
        if (usagearray[i].y > maxval) {
            maxval = usagearray[i].y;
        }
        total += usagearray[i].y;
    }
    avgvalue = total / usagearray.length;
    var maxValueInArray = Math.max.apply(Math, usagearray.y);

    var avftext = 'DAILY';
    var unittext = 'HCF';
    var modetext = '';
    switch (mode) {
        case 'H':
            avftext = $('#glblizeDaily').text();
            modetext = $('#glblizeDay').text();
            break;
        case 'D':
            avftext = $('#glblizeMonthly').text();
            modetext = $('#glblizeMonth').text();
            break;
        case 'M':
            avftext = $('#glblizeYearly').text();
            modetext = $('#glblizeYear').text();
            break;
    }
    switch (unit) {
        case 'K': unittext = 'kWh';
            break;
        case 'D':
            unittext = '$';
            break;

    }

    $('#averagevaltext').text(avftext);
    $('#ModeText').text(modetext);

    if (unittext == 'HCF') {
        $("#highestval").text(maxval.toFixed(2) + " " + unittext);
        $("#averageval").text(avgvalue.toFixed(2) + " " + unittext);
        $("#lblCrtUsage").text($("#hdnWaterUnitThisMonth").val() + " " + unittext);
        $("#lblEstiUsage").text($("#hdnWaterUnitPrediction").val() + " " + unittext);
    }
    else {
        $("#highestval").text(unittext  + maxval.toFixed(2));
        $("#averageval").text(unittext + avgvalue.toFixed(2));
        $("#lblCrtUsage").text($("#hdnDollarThisMonth").val());
        $("#lblEstiUsage").text($("#hdnDollarPredicted").val());
    }
    
    if (mode == 'M' && unit == 'W') {
        getColorForUnit();
    }
    else if (mode == 'M' && unit == 'D') {
        getColorForDollar();
    }
    if (maxval <= avgvalue) {
        document.getElementById('highestval').style.color = '#94D60A';
    }
    else if (maxval == avgvalue) {
        document.getElementById('highestval').style.color = '#F8A13F';
    }
    else {
        document.getElementById('highestval').style.color = '#ba3d4b';
    }
}

function getColorForUnit() {
    var currUsage = $("#hdnWaterUnitThisMonth").val();
    var estUsage = $("#hdnWaterUnitPrediction").val();
    if (currUsage <= lowRangew) {
        color = '#94D60A';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
    else if (currUsage > lowRangew && currUsage <= highRangew) {
        color = '#F8A13F';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
    else if (currUsage > highRangew) {
        color = '#ba3d4b';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
}

function getColorForDollar() {
    var currUsage = $("#hdnDollarThisMonth").val();
    var estUsage = $("#hdnDollarPredicted").val();
    if (currUsage <= lowRangew) {
        color = '#94D60A';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
    else if (currUsage > lowRangew && currUsage <= highRangew) {
        color = '#F8A13F';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
    else if (currUsage > highRangew) {
        color = '#ba3d4b';
        document.getElementById('lblCrtUsage').style.color = color;
        document.getElementById('lblEstiUsage').style.color = color;
    }
}