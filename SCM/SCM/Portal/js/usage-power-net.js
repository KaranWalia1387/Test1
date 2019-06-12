

var lowRange;
var highRange;
var range;
var usageOrGeneration = "";
var showChartRangeWise;
var lowRange;
var highRange;
var range;
var usageOrGeneration = "";

$(document).ready(function () {
    $('#btnExporttoExcel').click(function () {
        $('#hdnType').val(type);
        $('#hdnMode').val(mode);
        $('#hdnTitle').val(mainTitle);
    });

    range = comUsage.LoadRange().value;
    usageOrGeneration = "1";
    type = $('#hdnType').val();
    mode = $('#hdnMode').val();
  
    prevmode = $('#hdnMode').val(); //This variable is used to remember prev mode.
    prevtype = $('#hdnType').val(); //This variable is used to remember prev type.
    $('#usageMapMode a').click(function () {
        currentmode = $(this).attr('mode');
        if (currentmode != mode) {
            prevmode = mode;
            mode = currentmode;
            $('#hdnMode').val(mode);
            drawChart(usageOrGeneration, type, mode);
            setImages();
        }
    });

    $('#usageMapType a, #usageMapOpt a').click(function () {
        currenttype = $(this).attr('type');
        if (currenttype != type) {
            prevtype = type;
            type = currenttype;
            $('#hdnType').val(type);
            drawChart(usageOrGeneration, type, mode);
            setImages();
        }
    });
    drawChart(usageOrGeneration, type, mode);
    setImages();
});

function formatAMPM(datein) {
    //var dateinput = new Date(datein);
    //var hours = dateinput.getHours();
    var minutes;
    var ampm = datein >= 12 ? 'pm' : 'am';
    datein = datein % 12;
    datein = datein ? datein : 12; // the hour '0' should be '12'
    //minutes = minutes < 10 ? '0' + minutes : minutes;
    minutes = '00';
    var strTime = datein + ':' + minutes + ' ' + ampm;
    return strTime;
}

//To set images on onclick
function setImages() {
    $('#usageMapMode a[mode=' + prevmode + ']').removeClass("active");
    $('#usageMapMode a[mode=' + mode + ']').addClass("active");
    $('#usageMapType a[type=' + prevtype + ']').removeClass("active");
    $('#usageMapType a[type=' + type + ']').addClass("active");
}

function drawChart(UsageOrGeneration, Type, Mode) {

    if (Mode == 'H' || Mode == 'D') {
        $("#divCalender").css('display', 'inline');
    }
    else {
        $("#divCalender").css('display', 'none');
    }

    var hAxisCol = '';
    var vAxisCol = '';
    var hAxTitle = '';
    yaxis = Type == "K" ? 'Units Consumed (kWh)' : 'Cost of Units Consumed ($)';
    generatedText = type == "K" ? 'Units Generated (kWh)' : 'Cost of Units Generated ($)';
    mainTitle = '';

    //Check Session
    var session = common.checksession().value;
    if (session) {
        alert('Your session has expired. Please re-login.');
        window.location.href = "default.aspx";
        return;
    }
    strDate = $("#hdnstrDate").val();

    var hourlytype = Mode == "H" ? "F" : "H";
    //Get Usage Data
    var usageData = comUsage.LoadNetUsage(Type, Mode, (strDate == undefined ? "" : strDate), hourlytype).value;
    if (usageData == null || usageData.Rows.length == 0) {
        $('#chartgeneration').html('');
        alert('Net Usage data not found.');
        return false;
    }
    
    processed_json = new Array();
    processed_json2 = new Array();
    loadRange(Type, Mode, "E");
    switch (Mode) {
        case "H":
            hAxisCol = "Hourly";
            vAxisCol = "Unit";
            hAxTitle = 'Hourly';
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: (obj.Hourly),
                    y: obj.UsageValue,
                    color: (setcolor(obj.UsageValue)),
                    year: obj.year
                }),
                 processed_json2.push({
                     name: (obj.Hourly),
                     y: -obj.GenerationValue,
                     color: '#018dc8',
                     year: obj.year
                 });
            });

            mainTitle = 'Hourly Usage for ' + usageData.Rows[0]["Usagedate"];
            break;

        case "D":
            hAxisCol = "UsageDate";
            vAxisCol = "TotalValue";
            hAxTitle = 'Daily';

            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.Usagedate,
                    y: obj.UsageValue,
                    color: (setcolor(obj.UsageValue)),
                    year: obj.year
                }),
                 processed_json2.push({
                     name: obj.Usagedate,
                     y: -obj.GenerationValue,
                     color: '#018dc8',
                     year: obj.year
                 });
            });
            mainTitle = 'Period: ' + usageData.Rows[0]["Usagedate"] + ' to ' + usageData.Rows[usageData.Rows.length - 1]["Usagedate"];
            break;

        case "M":
            hAxisCol = "Month";
            vAxisCol = "TotalValue";
            hAxTitle = 'Monthly';

            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: getMonthName(obj.month),
                    y: obj.UsageValue,
                    color: (setcolor(obj.UsageValue)),
                    year: obj.year
                }),
                 processed_json2.push({
                     name: getMonthName(obj.month),
                     y: -obj.GenerationValue,
                     color: '#018dc8',
                     year: obj.year
                 });
            });
            mainTitle = 'Period: ' + getMonthName(usageData.Rows[0]["month"]) + ' ' + usageData.Rows[0]["year"] + ' to ' + getMonthName(usageData.Rows[usageData.Rows.length - 1]["month"]) + ' ' + usageData.Rows[usageData.Rows.length - 1]["year"];
            break;
    }

    setdailyhighest(Mode, Type, processed_json);

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

    var chartDiv = $('#chartgeneration')[0];

    var cWidth = $('#chartgeneration').css('width').replace('px', '');
    var cHeight = $('#chartgeneration').css('height').replace('px', '');

    if (cHeight == "0px")
    { cHeight = 150; }

    $('#hdnTitle').val(mainTitle);
    $("#lblUpperTitle").text(mainTitle);
    $(".radius").height($(window).height() * .39);
    BindhighChart2SeriesNetUsage('column', 'chartgeneration', yaxis, generatedText)
}

function loadRange(type, mode, rangeType) {
    type = type == "C" ? "K" : type;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["MiddleRange"];
            break;
        }
    }

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
    //            $("#lblUpperTitle").text(lblText);
    //       var meternumer = $('#hdnMeter').val();
   
    $("#hdnstrDate").val(strDate);
    drawChart('1', type, mode, strDate);

}

//future requirement
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

    drawChart(usageOrGeneration, $('#hdnType').val(), mode);
    setImages();
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
    var unittext = 'kWh';
    var modetext = '';
    switch (mode) {
        case 'H':
            // avftext = $('#glblizeDaily').text();
            avftext = $('#glblizeHourly').text();
            
            modetext = $('#glblizeDay').text();
            break;
        case 'D':
            //avftext = $('#glblizeMonthly').text();
            modetext = $('#glblizeMonth').text();
            avftext = $('#glblizeDaily').text();
            //modetext = $('#glblizeDay').text();
            break;
        case 'M':
            //avftext = $('#glblizeYearly').text();
            modetext = $('#glblizeYear').text();
            avftext = $('#glblizeMonthly').text();
            //modetext = $('#glblizeMonth').text();
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

    if (unittext == 'kWh') {
        $("#highestval").text(maxval.toFixed(2) + " " + unittext);
        $("#averageval").text(avgvalue.toFixed(2) + " " + unittext);
        $("#lblCurrentUsage").text($("#hdnPowerUnitThisMonth").val() + " " + unittext);
        $("#lblEstimatedUsage").text($("#hdnPowerUnitPrediction").val() + " " + unittext);
    }
    else {
        $("#highestval").text(unittext + maxval.toFixed(2));
        $("#averageval").text(unittext  + avgvalue.toFixed(2));
        $("#lblCurrentUsage").text($("#hdnDollarThisMonth").val());
        $("#lblEstimatedUsage").text($("#hdnDollarPredicted").val());
    }

    if (mode == 'M' && unit == 'K') {
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
    var currUsage = $("#hdnPowerUnitThisMonth").val();
    var estUsage = $("#hdnPowerUnitPrediction").val();
    if (currUsage <= lowRange) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRange && currUsage <= highRange) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRange) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}

function getColorForDollar() {
    var currUsage = $("#hdnDollarThisMonth").val();
    var estUsage = $("#hdnDollarPredicted").val();
    if (currUsage <= lowRange) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRange && currUsage <= highRange) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRange) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}