var lowRange;
var highRange;
var range;
var highest;
var average;
var usageOrGeneration = "";
var seasonId = '';
var ExcelSeasonID = '';
var weatherOverlay = '0';
var usageyear = '';
json_htmp = new Array();
var hourlytype;
var date = '';
var chartorentation;
//var modesArr=new Array();
var lastdate = '';
var nextdate = '';
var sudata = '';
var highcolor = ''; //'#ea557b';
var lowcolor = ''; //'#4adea0';
var avgcolor = ''; //'#e9cc57';
var WaterColor = '';
var SolarColor = '';
var highlow = '';
var MeterNumber = "";
var IsAMIStatus = "";
var Isreverse = 1;
var IsDecimal = 1;
$(window).load(function () {

    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindColorCodes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ 'Mode': 2 }),
        success: function (data) {
            var result = $.parseJSON(data.d);
            for (var i = 0; i < result.Table.length; i++) {
                if (result.Table[i].ModuleName == 'Usage') {
                    if (result.Table[i].ConfigOption == 'High') {
                        highcolor = result.Table[i].ConfigValue;
                        $('.GraphLegend_High').css({ "background-color": highcolor });
                    }
                    else if (result.Table[i].ConfigOption == 'Low') {
                        lowcolor = result.Table[i].ConfigValue;
                        $('.GraphLegend_low').css({ "background-color": lowcolor });
                        $('.GraphLegend_Usage').css({ "background-color": lowcolor });
                    }
                    else if (result.Table[i].ConfigOption == 'Mid') {
                        avgcolor = result.Table[i].ConfigValue;
                        $('.GraphLegend_Avg').css({ "background-color": avgcolor });
                    }
                    else if (result.Table[i].ConfigOption == 'WaterAllocation') {
                        WaterColor = result.Table[i].ConfigValue;
                        $('.GraphLegend_WaterAlloc').css({ "background-color": WaterColor });
                    }
                    else if (result.Table[i].ConfigOption == 'SolarGeneration') {
                        SolarColor = result.Table[i].ConfigValue;
                    }
                }
            }

            $("span[id$='lblCurrentUsageH']").hide();
            $("span[id$='lblEstimatedUsageH']").hide();
            $("span[id$='lblUnitThisMonth']").hide();
            $("span[id$='lblUnitPrediction']").hide();
            try {
                chartorentation = $('#hdnChartOrentation').val();

                //  $("#imgIson").click(function () {
                $("#imgIson").click(function () {

                    //if ($(this).hasClass("off")) {
                    if ($("#imgIson")[0].checked == true) {
                        weatherOverlay = 1;
                        $("#hdnWeatherOverlay").val('1');
                    }
                    else {
                        weatherOverlay = 0;
                        $("#hdnWeatherOverlay").val('0');
                    }
                    drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
                });

                $("#imgUsage").click(function () {

                    if ($("#imgUsage")[0].checked == true) {
                        usageType = 'NU';
                        $("#hdnUsageType").val('NU');
                        $(".li_15min").attr('style', 'display:none!important;');
                    }
                    else {
                        usageType = 'PU';
                        $("#hdnUsageType").val('PU');
                        $(".li_15min").attr('style', 'display:none;');
                    }
                    drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
                });
                getCurrentHeader();

                if ($('#hdnUsageType').val() == 'WU') {
                    range = comUsage.LoadWaterRange().value;
                }
                else {
                    range = comUsage.LoadRange().value;
                }
                if ($('#hdnUsageType').val() != 'PU' && $('#hdnUsageType').val() != 'NU') {
                    $('#soFarUsage').css('display', 'block');
                    $('#projectedUsage').css('display', 'block');
                    $('#MaxDemand').css('display', 'none');
                    $('#LoadFactor').css('display', 'none');
                }

                $('#iLinkProjected').attr('data-html', $('#iprojectedusage').text());
                $('#iLinkSoFar').attr('data-html', $('#isofar').text());

                if ($('#hdnPrePaid').val() == "Prepaid") {
                    $('#projectedUsage').css('display', 'none');
                }
                else {
                    if ($('#hdnCustomerType').val() != "Commercial") {
                        $('#projectedUsage').css('display', 'block');
                    }
                    else {
                        $('#projectedUsage').css('display', 'none');
                    }
                }
                usageOrGeneration = "1";
                type = $('#hdnType').val();
                mode = $('#hdnMode').val();
                prevmode = $('#hdnMode').val(); //This variable is used to remember prev mode.
                prevtype = $('#hdnType').val(); //This variable is used to remember prev type.
                if (mode == "B") {
                    $('#soFarUsage').css('display', 'none');
                    $('#projectedUsage').css('display', 'none');
                }


                bindmeter();
                $('#usageMapMode a').click(function () {
                    seasonId = 0;
                    currentmode = $(this).attr('mode');
                    UsageType = $('#hdnUsageType').val();

                    $('#spnWaterMonthly').attr('style', 'display: none');
                    $('#spnWaterDaily').attr('style', 'display: none');
                    $('#spnWaterHourly').attr('style', 'display: none');
                    $('#spnPowerMonthly').attr('style', 'display: none');
                    $('#spnPowerDaily').attr('style', 'display: none');
                    $('#spnPowerHourly').attr('style', 'display: none');

                    if (UsageType == "PU") {
                        if (currentmode == 'M') {
                            $('#spnPowerMonthly').attr('style', 'display: inline');
                        }
                        else if (currentmode == 'D') {
                            $('#spnPowerDaily').attr('style', 'display: inline');
                        }
                        else if (currentmode == 'H') {
                            $('#spnPowerHourly').attr('style', 'display: inline');
                        }                        
                    }                    
                    else if (UsageType == "WU") {
                        if (currentmode == 'M') {
                            $('#spnWaterMonthly').attr('style', 'display: inline');
                        }
                        else if (currentmode == 'D') {
                            $('#spnWaterDaily').attr('style', 'display: inline');
                        }
                        else if (currentmode == 'H') {
                            $('#spnWaterHourly').attr('style', 'display: inline');
                        }                        
                    }

                    if (currentmode != mode) {
                        prevmode = mode;
                        mode = currentmode;
                        $('#hdnMode').val(mode);
                        drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
                        setImages();
                    }


                });

                $('#usageMapType ul li a, #usageMapOpt a').click(function () {
                    currenttype = $(this).attr('type');
                    if ($('#hdnUsageType').val() == 'WU') {
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            if (currenttype == "G" || currenttype == "W") {
                                $('#disclaimer').css('display', 'block');
                            }
                            else { $('#disclaimer').css('display', 'none'); }
                        }
                    }
                    else { $('#disclaimer').css('display', 'none'); }
                    if (currenttype != type) {
                        prevtype = type;
                        type = currenttype;
                        $('#hdnType').val(type);
                        drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
                        setImages();
                    }
                });

                $('#GenrationMode ul li a').click(function () {
                    try {
                        mode = $(this).attr('mode');
                        $('[type="hidden"][id$=hdnMode]').val(mode);
                        var date = '';
                        var timeOffsetMinutes = '';
                        var correctedDate = '';
                        var dd = '';
                        if (mode == 'L') {
                            date = new Date(lastdate);
                            // get the timezone offset in minutes
                            timeOffsetMinutes = date.getTimezoneOffset();
                            // Convert minutes into milliseconds and create a new date based on the minutes.
                            correctedDate = new Date(date.getTime() + timeOffsetMinutes * 60000);
                            dd = correctedDate.getDate();
                        }
                        if (mode == 'N') {
                            date = new Date(nextdate);
                            timeOffsetMinutes = date.getTimezoneOffset();
                            correctedDate = new Date(date.getTime() + timeOffsetMinutes * 60000);
                            dd = correctedDate.getDate() + 1;
                        }
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        var mm = correctedDate.getMonth() + 1;
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        var yyyy = date.getFullYear();
                        // check leap year
                        if (mm == '02' && dd == '30') {
                            if (((yyyy % 4 == 0) && (yyyy % 100 != 0)) || (yyyy % 400 == 0)) {
                                mm = parseInt(mm) + 1; dd = dd = '01';
                                mm = '0' + mm;
                            }
                            else {
                                mm = parseInt(mm) + 1; dd = dd = '01';
                                mm = '0' + mm;
                            }
                        }
                        var strDate = mm + '/' + dd + '/' + yyyy;
                        $("#hdnstrDate").val(strDate);
                        drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
                        $('#GenrationMode ul li a').removeClass("active");
                        $(this).addClass('active');
                        if (mode == 'L') {
                            // $('#LstTen').css('pointer-events', 'none');
                            if (sudata == null || sudata.Rows.length == 0 || sudata == '') {
                                $('#LstTen').css('pointer-events', 'none');
                                var Lstimg = 'images\/last_ten_days_active.png';
                                $('#lasttendays').attr("src", Lstimg);
                            }
                            else {
                                var Lstnormalimg = 'images\/last_ten_days.png';
                                $('#lasttendays').attr("src", Lstnormalimg);
                                $('#NxtTen').css('pointer-events', 'auto');
                                var normalimg = 'images\/next_ten_days.png';
                                $('#nexttendays').attr("src", normalimg);
                            }
                        }
                        else if (mode == 'N') {
                            if (CompareDate(date)) {
                                $('#NxtTen').css('pointer-events', 'none');
                                var activeimg = 'images\/next_ten_days_active.png';
                                $('#nexttendays').attr("src", activeimg);
                            }

                            $('#LstTen').css('pointer-events', 'auto');
                            var Lstnormalimg = 'images\/last_ten_days.png';
                            $('#lasttendays').attr("src", Lstnormalimg);
                        }
                    }


                    catch (ex) { }
                });


                //multi meter dropdown change function
                $('#ddlMultiMeter').change(function () {
                    var isami = $("#ddlMultiMeter option:selected").attr('Isami');
                    if ((isami == "false" && (mode != 'S' && mode != 'M')) || (IsAMIStatus == true && $("#ddlMultiMeter option:selected").text() == "All")) {
                        $('.calender_usages li a').removeClass('active');
                        if ($('#hdnUsageType').val() == "PU" || $('#hdnUsageType').val() == "NU") {
                            mode = $('#hdnPowerAMI').val();
                            $('.calender_usages li a[mode="' + mode + '"]').addClass('active')
                        }
                        else if ($('#hdnUsageType').val() == "WU") {
                            mode = $('#hdnWaterAMI').val();
                            $('.calender_usages li a[mode="' + mode + '"]').addClass('active')
                        }
                        else if ($('#hdnUsageType').val() == "GU") {
                            mode = $('#hdnGasAMI').val();
                            $('.calender_usages li a[mode="' + mode + '"]').addClass('active')
                        }
                    }


                    drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);

                });


                $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
                    $('#hdnunit').val(type);
                    $('#hdntime').val(mode);
                    $('#hdnHoulyType').val(hourlytype);
                    $('#hdnTitle').val(mainTitle);
                    $('#hdnGetExportValue').val('1');
                    $('#hdnExportUsageType').val($('#hdnUsageType').val());
                    if (mode == 'S' || mode == 'S1') {
                        $('#hdSeason1').val(seasonId);
                    }
                    else {
                        $('#hdSeason1').val('0');
                    }
                    $('#hdUsageYear').val(usageyear);
                    //if (processed_json.length != 0) {
                    if (usageData != null && usageData.Rows.length > 0) {
                        return true;
                    }
                    else {
                        toastr.error($('#ML_Dashboard_Lbl_NoUsageData').text());
                        return false;
                        e.preventDefault();
                       
                    }

                });

            }
            catch (ex) { }
        },
        error: function () {

        }
    });
});

function bindmeter() {

    var metertype = 'E';
    if ($('#hdnUsageType').val() == "PU" || $('#hdnUsageType').val() == "NU") {
        metertype = 'E';
    }
    else if ($('#hdnUsageType').val() == "WU") {
        metertype = 'W';
    }
    else if ($('#hdnUsageType').val() == "GU") {
        metertype = 'G';
    }
    else {
        metertype = 'PV';
    }
    //Bind dropdown multimeter
    var param = { MeterType: metertype };
    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindMultiMeter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            if ($('#hdnUsageType').val() == 'SU') {
                $('#ddlMultiMeter').css('display', 'none');
                $('#MeterNumlabel').css('display', 'none');
            } else {
                $('#ddlMultiMeter').css('display', 'block');
                $('#MeterNumlabel').css('display', 'block');
            }
            $("#ddlMultiMeter").empty();
            $("#ddlMultiMeter").append($("<option></option>").val('').html($('#alltxt').text())).attr("Isami", "");
            if (data.d != "") {
                var ddlvalue = $.parseJSON(data.d);
                IsAMIStatus = ddlvalue["MeterCheckIsAMI"][0]["IsAMIStatus"];
                $.each(ddlvalue["MeterDetails"], function () {
                    $("#ddlMultiMeter").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
                });
                $('.right_content_box').removeClass("preLoader");
            }
            drawChart(usageOrGeneration, type, mode, weatherOverlay, usageyear);
            setImages();
        },
        error: function () {
            //   alert("Error");
        }
    });
}

function formatAMPM(datein) {
    try {
        var minutes;
        var ampm = datein >= 12 ? 'pm' : 'am';
        datein = datein % 12;
        datein = datein ? datein : 12; // the hour '0' should be '12'
        minutes = '00';
        var strTime = datein + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    catch (ex) { }
}

//To set images on onclick
function setImages() {
    try {
        $('#usageMapMode a[mode=' + (prevmode == "S1" ? "M" : prevmode) + ']').removeClass("active");
        $('#usageMapMode a[mode=' + (mode == "S1" ? "M" : mode) + ']').addClass("active");
        $('#usageMapType a[type=' + prevtype + ']').removeClass("active");
        $('#usageMapType a[type=' + type + ']').addClass("active");
    }
    catch (ex)
    { }
}
var usageData = '';
function drawChart(UsageOrGeneration, Type, Mode, weatheroverlay) {
    try {

        showhideweatheroverlay();
        showhideNetUsage();
        demandtext = "";
        if (usageType == 'SU') {
            $('.calender_usages').css('display', 'none');
        }
        else {
            $('.calender_usages').css('display', 'block');
        }
        if (Mode == 'H' || Mode == 'D' || Mode == "MI") {
            $("#divCalender").css('display', 'inline');
        }
        else if (Mode == 'L' || Mode == 'N') {
            $("#divCalender").css('display', 'inline');
        }
        else {
            $("#divCalender").css('display', 'none');
        }
        
        usageType = $("#hdnUsageType").val();
        if ((usageType == 'PU') || (usageType == '')) {
            $(".li_15min").attr('style', 'display:block;');
        }
        else {
            $(".li_15min").attr('style', 'display:none!important;');
        }
        var hAxisCol = '';
        var vAxisCol = '';
        var hAxTitle = '';
        if (Type == "K") {
            yaxis = $('#lblPKWH').text();//'Units Consumed (kWh)';
        }
        else if (Type == "W") {
            yaxis = $('#lblWHCF').text();//'Units Consumed (HCF)'
        }
        else if (Type == "C") {
            yaxis = $('#lblGCCF').text();//'Units Consumed (CCF)'
        }
        else if (Type == "G") {
            yaxis = $('#lblWGL').text();//'Units Consumed (GL)'
        }
        else if (Type == "D") {
            yaxis = $('#lblUDollar').text();//'Cost of Units Consumed ($)'
        }
        else {
            yaxis = $('#lblUDollar').text();//'Cost of Units Consumed ($)'
        }

        if (Type == "K" && usageType == "SU") {
            yaxis = $('#lblPUKWH').text();//'Units Generated (kWh)'
        }
        else if (Type == "D" && usageType == "SU") {
            yaxis = $('#lblUGDollar').text();//'Cost of Units Generated ($)'
        }
        mainTitle = '';
        
        strDate = $("#hdnstrDate").val();
        hourlytype = "H";
        //hide net usage for water/power 
        if ($('#hdnUsageType').val() == 'WU' || $('#hdnUsageType').val() == 'PU') {
            $('#divconfigusage').css('display', 'none');
        }
        //Get Usage Data
        $('.GraphLegend_WaterAlloc').css('display', 'none');
        $('.GraphLegend_data_WaterAlloc').css('display', 'none');
        if ($('#hdnUsageType').val() == 'WU') {
            $('#AvgUsage').css('display', 'none');
            $('.GraphLegend_Avg').css('display', 'none');
            $('#LowUsage').css('display', 'none');
            $('.GraphLegend_low').css('display', 'none');
            $('#LUsage').css('display', 'block');
            $('.GraphLegend_Usage').css('display', 'block');

            /* code commented (to show only usage legend only */
            //if (Type == "D") {
            //    $('#HighUsage').css('display', 'none');
            //    $('.GraphLegend_Usage').css('background-color', WaterColor);
            //    $('.GraphLegend_High').css('display', 'none');
            //}
            //else {
            //    $('#HighUsage').css('display', 'block');
            //    $('.GraphLegend_High').css('display', 'block');
            //    $('.GraphLegend_Usage').css('background-color', '#4adea0');
            //}
            /* End of  (to show only usage legend only */
            $('.GraphLegend_WaterAlloc').css('display', 'none');
            $('.GraphLegend_data_WaterAlloc').css('display', 'none');
            $('.GraphLegend_High').css('display', 'none');
            $('#HighUsage').css('display', 'none');
        }
        else {

            $('#AvgUsage').css('display', 'none');
            $('.GraphLegend_Avg').css('display', 'none');
            $('#LowUsage').css('display', 'none');
            $('.GraphLegend_low').css('display', 'none');
            $('#LUsage').css('display', 'block');
            $('.GraphLegend_Usage').css('display', 'block');
            $('#HighUsage').css('display', 'none');
            $('.GraphLegend_High').css('display', 'none');
        }
        MeterNumber = $('#ddlMultiMeter').val();
        $('#hdnMeterValue').val(MeterNumber);
        HideShowAMIMode();
        var metertype = $('#ddlAddress').val().split(':')[7].trim();
        if (metertype == 'E') {
            $('#hdnUsageType').val('PU');
            usageType = 'PU';
        }
        else if (metertype == "W") {
            usageType = 'WU';
            $('#hdnUsageType').val('WU');
        }
        getCurrentHeader();
        switch (usageType) {
            case 'PU':
                usageData = comUsage.LoadUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype, seasonId, weatherOverlay, (usageyear == undefined ? "" : usageyear), MeterNumber).value;
                break;
            case 'WU':
                /* code commented (to show only usage legend only */
                if (Type != "D") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $('.GraphLegend_WaterAlloc').css('display', 'block');
                        $('.GraphLegend_data_WaterAlloc').css('display', 'block');
                        $('.GraphLegend_High').css('display', 'block');
                        $('#HighUsage').css('display', 'block');
                        $('.GraphLegend_low').css('display', 'block');
                        $('#LowUsage').css('display', 'block');
                        $('.GraphLegend_Usage').css('display', 'none');
                        $('#LUsage').css('display', 'none');
                    }
                }
                //}
                /* End of  (to show only usage legend only */

                var usage_Data = comUsage.LoadWaterUsage(Type, Mode, (strDate == undefined ? "": strDate), hourlytype, weatherOverlay, seasonId, (usageyear == undefined ? "": usageyear), MeterNumber).value;
                 //var usage_Data = comUsage.LoadWaterUsage(Type, Mode, (strDate == undefined ? "" : strDate), hourlytype, weatherOverlay, seasonId, (usageyear == undefined ? "" : usageyear)).value;
                    SetNextMeterReadDate(usage_Data.Tables[1]);
                usageData = usage_Data.Tables[0];
                break;
            case 'GU':
                usageData = comUsage.LoadGasUsage(Type, Mode, (strDate == undefined ? "" : strDate), hourlytype, seasonId, weatherOverlay, (usageyear == undefined ? "" : usageyear), MeterNumber).value;

                break;
            case 'NU':
                usageData = comUsage.LoadNetUsage(Type, Mode, (strDate == undefined ? "" : strDate), hourlytype, seasonId, (usageyear == undefined ? "" : usageyear), weatherOverlay, MeterNumber).value;
                break;
            case 'SU':
                usageData = comUsage.LoadSolarUsage(Type, Mode, (strDate == undefined ? "" : strDate), (weatherOverlay == undefined ? "" : weatherOverlay), '').value;
                sudata = usageData;
                break;
            default:
                usageData = comUsage.LoadUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype, seasonId, (usageyear == undefined ? "" : usageyear), MeterNumber).value;
                break;
        }

        if (usageData == null || usageData.Rows.length == 0) {
            $('#chart').width("100%");
            $('#chart').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');

            if (Mode == 'H') {
                mainTitle = ($('#textHourlyUsage').text() + ' ' + (new Date($("#hdnstrDate").val())).toLocaleDateString());
                $('#hdnTitle').val(mainTitle);
                $("#lblUpperTitle").text(mainTitle);
                $("#lblCharttitle").text(mainTitle);
            }
            if (Mode == 'D') {
                var dateval = $("#hdnstrDate").val().split('/');
                if (dateval.length > 2) {
                    mainTitle = ($('#periodtext').text() + ' ' + new Date(new Date($("#hdnstrDate").val()) - (30 * 24 * 60 * 60 * 1000)).toLocaleDateString() + " To " + new Date(new Date($("#hdnstrDate").val())).toLocaleDateString());
                    $('#hdnTitle').val(mainTitle);
                    $("#lblUpperTitle").text(mainTitle);
                    $("#lblCharttitle").text(mainTitle);
                }
                else {
                    mainTitle = ($('#periodtext').text() + ' ' + new Date(new Date(dateval[1], dateval[0] - 1, 1)).toLocaleDateString() + " To " + new Date(new Date(dateval[1], dateval[0], 0)).toLocaleDateString());
                    $('#hdnTitle').val(mainTitle);
                    $("#lblUpperTitle").text(mainTitle);
                    $("#lblCharttitle").text(mainTitle);
                }
            }

            $("#averageval").text('N/A');
            $("#highestval").text('N/A');
            setheaderwidth();
            return false;
        }

        if (usageType == 'SU') {
            var rowCount;
            if (usageData != null && usageData != "") {
                rowCount = usageData.Rows.length;
                date = usageData.Rows[rowCount - 1]["GenerationDate"];
                nextdate = date;
                lastdate = usageData.Rows[0]["GenerationDate"];

            }
            else { rowCount = 0; }
            processed_json = new Array();
            processed_json1 = new Array();
            json_htmp = new Array();
            json_htmp = new Array();
            if (rowCount > 0) {
                //$("input[name=weatheroverlay][value='" + (usageData.Rows[0]["IsWeatherEnable"].toString() == "false" ? "0" : "1") + "']").prop("checked", true)
                mainTitle = $('#periodtext').text() + ': ' + usageData.Rows[0]["GenerationDate"] + " " + $('#totext').text() + " " + usageData.Rows[rowCount - 1]["GenerationDate"];
                $.map(usageData.Rows, function (obj, i) {

                    processed_json.push({
                        name: obj.DateOfReading,
                        y:  IsDecimal == 1 ? parseFloat(obj.TotalUnit): parseInt(obj.TotalUnit),
                        High_fahrenheit: obj.High_fahrenheit,
                        //Icon_url: obj.Icon_url,
                        color: SolarColor,
                        Low_fahrenheit: obj.Low_fahrenheit,
                        Maxhumidity: obj.Maxhumidity,
                        Minhumidity: obj.Minhumidity,
                        Icon: obj.Icon,
                        Avehumidity: obj.Avehumidity

                    });
                    processed_json1.push({
                        y: IsDecimal == 1 ? parseFloat(obj.TotalUnit) : parseInt(obj.TotalUnit)
                    });
                    if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                    }
                    else {
                        json_htmp.push({
                            Icon_url: obj.Icon_url,
                            y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                        });
                    }
                });
            }
            else {
                toastr.error('Your account data is not available at this time. Please try again later or contact customer support.')
                $('#divWether').html('');
                $('#chart').html('');
            }
            setChartHeight();
            setdailyhighest(Mode, Type, processed_json);
            Bindsolar('column', 'chart', '', chartorentation);
            getapidata();
        }
        else if (usageType != 'NU') {
            json_htmp = new Array();
            processed_json = new Array();
            processed_json1 = new Array();
            processed_jsonAllocation = new Array();
            processed_jsonOnDemand = new Array();
            highest = usageData.Rows[0]["HIGHEST"];
            average = usageData.Rows[0]["AVERAGE"];
            loadRange(Type, Mode, "E");
            switch (Mode) {
                case "S":
                case "S1":
                    if (seasonId == 0) {
                        hAxisCol = "Season";
                        vAxisCol = "Unit";
                        hAxisCol = 'Season';
                        if ($('#hdnUsageType').val() == 'PU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                    y: (obj.TotalValue == undefined || obj.TotalValue.toString() == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.GenerationDate == undefined || obj.GenerationDate == "") ? '' : obj.GenerationDate,
                                    id: obj.SeasonID,
                                    year: obj.GenerationDate,
                                    High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                                    Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                                    Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                                    Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                                    Icon: (obj.Icon == null) ? "" : obj.Icon,
                                    Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,

                                });
                                if ($('#hdnCustomerType').val() == "Commercial") {
                                    demandtext = 'Max demand in kW';
                                    processed_jsonOnDemand.push({
                                        name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                                        y: obj.DemandValue,
                                        //y: (obj.TotalValue == undefined || obj.TotalValue.toString() == "") ? (obj.TotalValue * 1.1) : (obj.TotalValue * 1.1),
                                        color: WaterColor,
                                        title: 'Demand'
                                    });
                                }

                                //Creating Second Json
                                processed_json1.push({

                                    y: parseFloat(obj.TotalValue)
                                });
                                //Allocation Value
                                if ($('#hdnWaterAllocation').val() == 'True') {
                                    if (obj.AllocationValue != undefined) {
                                        processed_jsonAllocation.push({
                                            name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                            y: parseFloat((obj.AllocationValue)),
                                            color: WaterColor,
                                            title: 'Allocation'
                                        });
                                    }
                                }
                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({
                                        //name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName + ' ' + obj.GenerationDate),
                                        Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : null)
                                    });
                                }
                                //End
                            });
                        }
                        else if ($('#hdnUsageType').val() == 'WU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                    y: (obj.TotalValue == undefined || obj.TotalValue == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate,
                                    id: obj.SeasonID,
                                    Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                                    High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                                    Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                                    Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                                    Icon: (obj.Icon == null) ? "" : obj.Icon,
                                    Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                                    //END
                                });
                                //Creating Second Json
                                processed_json1.push({
                                    y: parseFloat(obj.TotalValue)
                                });
                                if ($('#hdnWaterAllocation').val() == 'True') {
                                    //Allocation Value
                                    if (obj.AllocationValue != undefined) {
                                        processed_jsonAllocation.push({
                                            name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName ),
                                            y: parseFloat((obj.AllocationValue)),
                                            color: WaterColor,
                                            title: 'Allocation'
                                        });
                                    }
                                }
                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({
                                        name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                        Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : null)

                                    });

                                }
                                //End
                            });
                        }
                        else if ($('#hdnUsageType').val() == 'GU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                    y: (obj.TotalValue == undefined || obj.TotalValue.toString() == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate,
                                    id: obj.SeasonID,
                                    Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                                    High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                                    Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                                    Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                                    Icon: (obj.Icon == null) ? "" : obj.Icon,
                                    Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                                    //END
                                });
                                //Creating Second Json
                                processed_json1.push({
                                    y: parseFloat(obj.TotalValue)
                                });
                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({

                                        name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName),
                                        Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : "")

                                    });

                                }
                                //End
                            });
                        }
                    }
                    else {
                        hAxisCol = "Season";
                        vAxisCol = "Unit";
                        hAxisCol = 'Season';
                        if ($('#hdnUsageType').val() == 'PU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate) ,//Changed by khushbu kansal for bug id 10853
                                    y: (obj.TotalValue == undefined || obj.TotalValue.toString() == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.GenerationDate == undefined || obj.GenerationDate == "") ? '' : obj.GenerationDate,
                                    id: obj.SeasonID,
                                    month: obj.MonthUsageDate,
                                    High_fahrenheit: obj.High_fahrenheit,
                                    Low_fahrenheit: obj.Low_fahrenheit,
                                    Maxhumidity: obj.Maxhumidity,
                                    Minhumidity: obj.Minhumidity,
                                    Icon: obj.Icon,
                                    Avehumidity: obj.Avehumidity
                                });
                                if ($('#hdnCustomerType').val() == "Commercial") {
                                    demandtext = 'Max demand in kW';
                                    processed_jsonOnDemand.push({
                                        name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                                        // y: (obj.TotalValue == undefined || obj.TotalValue.toString() == "") ? (obj.TotalValue * 1.1) : (obj.TotalValue * 1.1),
                                        y: obj.DemandValue,
                                        color: WaterColor,
                                        title: 'Demand'
                                    });
                                }
                                //Creating Second Json
                                processed_json1.push({
                                    y: parseFloat(obj.TotalValue)
                                });

                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({
                                        //name: (obj.SeasonName == undefined || obj.SeasonName == "") ? (obj.SeasonName) : (obj.SeasonName + ' ' + obj.GenerationDate),
                                        Icon_url: obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : "")
                                    });
                                }
                                //End
                            });
                        }
                        else if ($('#hdnUsageType').val() == 'WU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate) ,//Changed by khushbu kansal for bug id 10853
                                    y: (obj.TotalValue == undefined || obj.TotalValue == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate,
                                    id: obj.SeasonID,
                                    month: obj.MonthUsageDate,
                                    High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                                    // Icon_url: obj.Icon_url,
                                    Low_fahrenheit: obj.Low_fahrenheit,
                                    Maxhumidity: obj.Maxhumidity,
                                    Minhumidity: obj.Minhumidity,
                                    Icon: obj.Icon,
                                    Avehumidity: obj.Avehumidity
                                    //END
                                });

                                //Creating Second Json
                                processed_json1.push({
                                    y: parseFloat(obj.TotalValue)
                                });
                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({
                                        name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),
                                        Icon_url: obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : "")
                                    });
                                }
                                //End
                            });
                        }
                        else if ($('#hdnUsageType').val() == 'GU') {
                            $.map(usageData.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),//Changed by khushbu kansal for bug id 10853
                                    y: (obj.TotalValue == undefined || obj.TotalValue == "") ? obj.TotalValue : obj.TotalValue,
                                    color: (obj.TotalValue == undefined || obj.TotalValue == "") ? setcolor(obj.TotalValue, obj.HighUsage) : setcolor(obj.TotalValue, obj.HighUsage),
                                    year: (obj.UsageDate == undefined || obj.UsageDate == "") ? obj.UsageDate : obj.UsageDate,
                                    id: obj.SeasonID,
                                    month: obj.MonthUsageDate,
                                    High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                                    Low_fahrenheit: obj.Low_fahrenheit,
                                    Maxhumidity: obj.Maxhumidity,
                                    Minhumidity: obj.Minhumidity,
                                    Icon: obj.Icon,
                                    Avehumidity: obj.Avehumidity
                                    //END
                                });

                                //Creating Second Json
                                processed_json1.push({
                                    y: parseFloat(obj.TotalValue)
                                });
                                if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                                }
                                else {
                                    json_htmp.push({
                                        name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),
                                        Icon_url: obj.Icon_url,
                                        y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? obj.High_fahrenheit : "")
                                    });
                                }
                                //End
                            });
                        }
                    }
                    break;
                case "H":
                case "MI":
                    hAxisCol = (Mode == "H" ? "Hourly" : "15 Min");
                    vAxisCol = "Unit";
                    hAxTitle = (Mode == "H" ? "Hourly" : "15 Min");
                    $.map(usageData.Rows, function (obj, i) {
                        processed_json.push({
                            name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                            y: ($('#hdnUsageType').val() == 'WU' ? obj.TotalValue : ((obj.Unit == undefined || obj.Unit == "") ? obj.Unit : obj.Unit)),// In Usage Data Total Value column is returned.
                            color: (obj.Unit == undefined || obj.Unit == "") ? setcolor(obj.Unit, obj.HighUsage) : setcolor(obj.Unit),
                            year: (obj.Year == undefined || obj.Year == "") ? '' : obj.Year,
                            //START
                            //Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                            //END
                        });
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';
                            processed_jsonOnDemand.push({
                                name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                                y: obj.DemandValue,
                                color: WaterColor,
                                title: 'Demand'
                            });
                        }
                        //Creating Second Json
                        processed_json1.push({
                            y: parseFloat(obj.TotalValue)
                        });
                        if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {
                        }
                        else {
                            json_htmp.push({
                                name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? (parseFloat(obj.High_fahrenheit)) : null)
                            });
                        }
                        //End
                    });

                    mainTitle = (Mode == "H" ? $('#textHourlyUsage').text() + ' ' + usageData.Rows[0]["UsageDate"] : $('#text15MinUsage').text() + ' ' + usageData.Rows[0]["UsageDate"]);
                    break;

                case "D":
                    hAxisCol = "UsageDate";
                    vAxisCol = "TotalValue";
                    hAxTitle = 'Daily';

                    $.map(usageData.Rows, function (obj, i) {
                        processed_json.push({
                            name: obj.DateOfReading,
                            y: obj.TotalValue,
                            color: setcolor(obj.TotalValue, obj.HighUsage),
                            UsageDate: (obj.UsageDate == null) ? "" : obj.UsageDate,
                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                            //END
                        });
                        //Allocation Value
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: obj.DateOfReading,
                                    y: parseFloat((obj.AllocationValue)),
                                    color: WaterColor,
                                    title: 'Allocation'
                                });
                            }
                        }
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';
                            processed_jsonOnDemand.push({
                                name: obj.DateOfReading,
                                y: obj.DemandValue,
                                color: WaterColor,
                                title: 'Demand'
                            });
                        }
                        //Creating Second Json
                        processed_json1.push({
                            y: parseFloat(obj.TotalValue)
                        });
                     

                        if (weatherOverlay != 1) {

                        }
                        else {
                            json_htmp.push({
                                name: obj.DateOfReading,
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                            });
                        }
                        //End
                    });
                    mainTitle = $('#periodtext').text() + ': ' + usageData.Rows[0]["UsageDate"] + " " + $('#totext').text() + " " + usageData.Rows[usageData.Rows.length - 1]["UsageDate"];
                    break;

                case "M":
                    hAxisCol = "Month";
                    vAxisCol = "TotalValue";
                    hAxTitle = 'Monthly';


                    $.map(usageData.Rows, function (obj, i) {
                        processed_json.push({
                            name: getMonthName(obj.Month),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(obj.TotalValue, obj.HighUsage),
                            year: obj.Year,
                            month: obj.Month,
                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity
                        });
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: getMonthName(obj.Month),
                                    y: parseFloat((obj.AllocationValue)),
                                    color: WaterColor,
                                    title: 'Allocation'
                                });
                            }
                        }
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';
                            if ($('#hdnUsageType').val() == "PU") {
                                processed_jsonOnDemand.push({
                                    name: getMonthName(obj.Month),                                    
                                    y: parseFloat(obj.DemandValue),
                                    color: WaterColor,
                                    title: 'Demand'
                                });
                            }
                        }
                        //Copy of processed_json without TotalValue/1000 for Usage header.
                        processed_json2.push({
                            name: getMonthName(obj.Month),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(obj.TotalValue, obj.HighUsage),
                            year: obj.Year, month: obj.Month,
                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                        });

                        //Creating Second Json
                        processed_json1.push({
                            y: parseFloat(obj.TotalValue),
                        });
                        if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                        }
                        else {
                            json_htmp.push({
                                name: getMonthName(obj.Month),
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                            });
                        }
                        //End
                    });
                    mainTitle = $('#periodtext').text() + ': ' + getMonthName(usageData.Rows[0]["Month"]) + ' ' + usageData.Rows[0]["Year"] + " " + $('#totext').text() + " " + getMonthName(usageData.Rows[usageData.Rows.length - 1]["Month"]) + ' ' + usageData.Rows[usageData.Rows.length - 1]["Year"];
                    break;
                case "B":
                    hAxisCol = "Month";
                    vAxisCol = "TotalValue";
                    hAxTitle = 'Monthly';


                    $.map(usageData.Rows, function (obj, i) {
                        processed_json.push({
                            name: (obj.Month),
                            y: parseFloat((obj.TotalValue)),
                            color: setcolor(obj.TotalValue, obj.HighUsage),
                            year: obj.Year,
                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                        });
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: obj.Month,
                                    y: parseFloat((obj.AllocationValue)),
                                    color: WaterColor,
                                    title: 'Allocation'
                                });
                            }
                        }
                        //Copy of processed_json without TotalValue/1000 for Usage header.
                        processed_json2.push({
                            name: obj.Month,
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(obj.TotalValue, obj.HighUsage),
                            year: obj.Year,

                            High_fahrenheit: (obj.High_fahrenheit == null) ? "" : obj.High_fahrenheit,
                            Low_fahrenheit: (obj.Low_fahrenheit == null) ? "" : obj.Low_fahrenheit,
                            Maxhumidity: (obj.Maxhumidity == null) ? "" : obj.Maxhumidity,
                            Minhumidity: (obj.Minhumidity == null) ? "" : obj.Minhumidity,
                            Icon: (obj.Icon == null) ? "" : obj.Icon,
                            Avehumidity: (obj.Avehumidity == null) ? "" : obj.Avehumidity,
                        });

                        //Creating Second Json
                        processed_json1.push({
                            y: parseFloat((obj.TotalValue)),
                        });
                        if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {

                        }
                        else {
                            json_htmp.push({
                                name: obj.Month,
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                            });
                        }
                        //End
                    });
                  
                    break;
            }
            setChartHeight();
            Bindheigh_usage('column', 'chart', '', IsDecimal, $('#hdnUsageType').val(), Mode, chartorentation, $("#ddlMultiMeter option:selected").attr('Isami'), IsAMIStatus);


            setdailyhighest(Mode, Type, processed_json);
        }
        else {

            processed_json = new Array();
            processed_json2 = new Array();
            processed_jsonOnDemand = new Array();
            json_htmp = new Array();
            loadRange(Type, Mode, "E");
            switch (Mode) {
                case "H":
                    hAxisCol = "Hourly";
                    vAxisCol = "Unit";
                    hAxTitle = 'Hourly';
                    $.map(usageData.Rows, function (obj, i) {
                        obj.GenerationValue = obj.GenerationValue > 1 ? (IsDecimal == 1 ? parseFloat(obj.GenerationValue) : parseInt(obj.GenerationValue)) : obj.GenerationValue;
                        var NUvalue = Isreverse == 0 ? (-1 * obj.GenerationValue) : (1 * obj.GenerationValue);
                        processed_json.push({
                            name: (obj.Hourly),
                            y: obj.UsageValue,
                            color: (setcolor(obj.UsageValue, obj.HighUsage)),
                            year: obj.year,
                            Maxhumidity: obj.Maxhumidity,
                            Minhumidity: obj.Minhumidity,
                            Avehumidity: obj.Avehumidity,
                            High_fahrenheit: obj.High_fahrenheit,
                            Low_fahrenheit: obj.Low_fahrenheit
                        });
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';
                            processed_jsonOnDemand.push({
                                name: (obj.Hourly),
                                y: obj.DemandValue,
                                color: WaterColor,
                                title: 'Demand'
                            });
                        }
                        processed_json2.push({
                            name: (obj.Hourly),
                            y: NUvalue,
                            color: '#018dc8',
                            year: obj.year,


                        });

                        //Start
                        //if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {
                        if (weatherOverlay != 1) {

                        }
                        else {
                            json_htmp.push({
                                name: obj.Hourly,
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                            });
                        }
                        //End
                    });

                    mainTitle = $('#textHourlyUsage').text() + ' ' + usageData.Rows[0]["UsageDate"];//bug id 9713
                    break;

                case "D":
                    hAxisCol = "UsageDate";
                    vAxisCol = "TotalValue";
                    hAxTitle = 'Daily';

                    $.map(usageData.Rows, function (obj, i) {
                        obj.GenerationValue = obj.GenerationValue > 1 ? (IsDecimal == 1 ? parseFloat(obj.GenerationValue) : parseInt(obj.GenerationValue)) : obj.GenerationValue;
                        var NUvalue = Isreverse == 0 ? (-1 * obj.GenerationValue) : (1 * obj.GenerationValue);
                        processed_json.push({
                            name: obj.DateOfReading,
                            y: obj.UsageValue,
                            color: (setcolor(obj.UsageValue, obj.HighUsage)),
                            year: obj.year,
                            UsageDate: (obj.UsageDate == null) ? "" : obj.UsageDate,
                            Maxhumidity: obj.Maxhumidity,
                            Minhumidity: obj.Minhumidity,
                            Avehumidity: obj.Avehumidity,
                            High_fahrenheit: obj.High_fahrenheit,
                            Low_fahrenheit: obj.Low_fahrenheit
                        });
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';

                            processed_jsonOnDemand.push({
                                name: obj.DateOfReading,
                                // y: parseFloat((obj.TotalValue * 1.1)),
                                y: obj.DemandValue,
                                color: WaterColor,
                                title: 'Demand'
                            });
                        }
                        processed_json2.push({
                            name: obj.DateOfReading,
                            y: NUvalue,
                            color: '#018dc8',
                            year: obj.year,

                        });
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: obj.DateOfReading,
                                    y: parseFloat((obj.AllocationValue)),
                                    color: WaterColor,
                                    title: 'Allocation'
                                });
                            }
                        }
                        //Start
                        //if (obj.High_fahrenheit == null || obj.High_fahrenheit == undefined || obj.High_fahrenheit.length == 2) {
                        if (weatherOverlay != 1) {

                        }
                        else {
                            json_htmp.push({
                                name: obj.DateOfReading,
                                Icon_url: (obj.Icon_url == null) ? "" : obj.Icon_url,
                                y: ((obj.High_fahrenheit != null && obj.High_fahrenheit != undefined && obj.High_fahrenheit != '0') ? parseFloat(obj.High_fahrenheit) : null)
                            });
                        }
                        //End
                    });
                    mainTitle = $('#periodtext').text() + ': ' + usageData.Rows[0]["UsageDate"] + " " + $('#totext').text() + " " + usageData.Rows[usageData.Rows.length - 1]["UsageDate"];
                    break;

                case "M":
                    hAxisCol = "Month";
                    vAxisCol = "TotalValue";
                    hAxTitle = 'Monthly';


                    $.map(usageData.Rows, function (obj, i) {
                        obj.GenerationValue = obj.GenerationValue > 1 ? (IsDecimal == 1 ? parseFloat(obj.GenerationValue) : parseInt(obj.GenerationValue)) : obj.GenerationValue;
                        var NUvalue = Isreverse == 0 ? (-1 * obj.GenerationValue) : (1 * obj.GenerationValue);
                        processed_json.push({
                            name: getMonthName(obj.Month),
                            y: obj.UsageValue,
                            color: (setcolor(obj.UsageValue, obj.HighUsage)),
                            year: obj.Year,
                            month: obj.Month
                        });
                        if ($('#hdnCustomerType').val() == "Commercial") {
                            demandtext = 'Max demand in kW';
                            processed_jsonOnDemand.push({
                                name: getMonthName(obj.Month),
                                // y: parseFloat((obj.TotalValue * 1.1)),
                                y: obj.DemandValue,
                                color: WaterColor,
                                title: 'Demand'
                            });
                        }
                        processed_json2.push({
                            name: getMonthName(obj.Month),
                            y: NUvalue,
                            color: '#018dc8',
                            year: obj.Year,
                            month: obj.Month
                        });
                    });
                    mainTitle = $('#periodtext').text() + ': ' + getMonthName(usageData.Rows[0]["Month"]) + ' ' + usageData.Rows[0]["Year"] + " " + $('#totext').text() + " " + getMonthName(usageData.Rows[usageData.Rows.length - 1]["Month"]) + ' ' + usageData.Rows[usageData.Rows.length - 1]["Year"];
                    break;
                case "S":
                case "S1":
                    hAxisCol = "Season";
                    vAxisCol = "UsageValue";
                    hAxTitle = 'Seasonal';
                    if (seasonId == "" || seasonId == '0') {
                        $.map(usageData.Rows, function (obj, i) {
                            obj.GenerationValue = obj.GenerationValue > 1 ? (IsDecimal == 1 ? parseFloat(obj.GenerationValue) : parseInt(obj.GenerationValue)) : obj.GenerationValue;
                            var NUvalue = Isreverse == 0 ? (-1 * obj.GenerationValue) : (1 * obj.GenerationValue);
                            processed_json.push({
                                name: obj.SeasonName, //+ ' ' + obj.GenerationDate,
                                y: obj.UsageValue,
                                id: obj.SeasonID,
                                color: (setcolor(obj.UsageValue, obj.HighUsage)),
                                year: obj.GenerationDate
                            });
                            if ($('#hdnCustomerType').val() == "Commercial") {
                                demandtext = 'Max demand in kW';
                                processed_jsonOnDemand.push({
                                    name: obj.SeasonName, //+ ' ' + obj.GenerationDate,
                                    // y: parseFloat((obj.TotalValue * 1.1)),
                                    y: obj.DemandValue,
                                    color: WaterColor,
                                    title: 'Demand'
                                });
                            }
                            processed_json2.push({
                                name: obj.SeasonName,// + ' ' + obj.GenerationDate,
                                y: NUvalue,
                                color: '#018dc8',
                                id: obj.SeasonID,
                                year: obj.GenerationDate
                            });
                            if ($('#hdnWaterAllocation').val() == 'True') {
                                if (obj.AllocationValue != undefined) {
                                    processed_jsonAllocation.push({
                                        name: obj.SeasonName,// + ' ' + obj.GenerationDate,
                                        y: parseFloat((obj.AllocationValue)),
                                        color: WaterColor,
                                        title: 'Allocation'
                                    });
                                }
                            }
                        });
                    }
                    else {
                        $.map(usageData.Rows, function (obj, i) {
                            obj.GenerationValue = obj.GenerationValue > 1 ? (IsDecimal == 1 ? parseFloat(obj.GenerationValue) : parseInt(obj.GenerationValue)) : obj.GenerationValue;
                            var NUvalue = Isreverse == 0 ? (-1 * obj.GenerationValue) : (1 * obj.GenerationValue);
                            processed_json.push({
                                name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),
                                y: obj.UsageValue,
                                color: (setcolor(obj.UsageValue, obj.HighUsage)),
                                year: obj.GenerationDate,
                                month: obj.MonthUsageDate,
                                Icon_url: obj.Icon_url,
                                Maxhumidity: obj.Maxhumidity,
                                Minhumidity: obj.Minhumidity,
                                Avehumidity: obj.Avehumidity,
                                High_fahrenheit: obj.High_fahrenheit,
                                Low_fahrenheit: obj.Low_fahrenheit
                            });
                            if ($('#hdnCustomerType').val() == "Commercial") {
                                demandtext = 'Max demand in kW';
                                processed_jsonOnDemand.push({
                                    name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),
                                    // y: parseFloat((obj.TotalValue * 1.1)),
                                    y: obj.DemandValue,
                                    color: WaterColor,
                                    title: 'Demand'
                                });
                            }
                            processed_json2.push({
                                name: (obj.MonthUsageDate == undefined || obj.MonthUsageDate == "") ? (obj.MonthUsageDate) : getMonthName(obj.MonthUsageDate),
                                y: NUvalue,
                                color: '#018dc8',
                                year: obj.GenerationDate,
                                month: obj.MonthUsageDate,
                                Icon_url: obj.Icon_url,
                                Maxhumidity: obj.Maxhumidity,
                                Minhumidity: obj.Minhumidity,
                                Avehumidity: obj.Avehumidity,
                                High_fahrenheit: obj.High_fahrenheit,
                                Low_fahrenheit: obj.Low_fahrenheit
                            });
                        });
                    }
            }
            setChartHeight();
            BindhighChart2SeriesNetUsage('column', 'chart', yaxis, "Generations in " + ((Type == 'D') ? "($)" : "(Kwh)"), chartorentation, $("#ddlMultiMeter option:selected").attr('Isami'), IsAMIStatus,Isreverse)
            setdailyhighest(Mode, Type, processed_json);
        }

        var chartDiv = $('#chart')[0];

        var cWidth = $('#chart').css('width').replace('px', '');
        var cHeight = $('#chart').css('height').replace('px', '');

        if (cHeight == "0px")
        { cHeight = 150; }



        $('#hdnTitle').val(mainTitle);
        $("#lblUpperTitle").text(mainTitle);
        $("#lblCharttitle").text(mainTitle);
    }
    catch (ex) { }
}



function SetNextMeterReadDate(table) {
    if (table != null) {
        var title = $('#iLinkSoFar').attr('data-html');
        title = title.replace('mm/dd/yyyy', table.Rows[0]["NextMeterReadStartDate"]);
        title = title.replace('mm/dd/yyyy', table.Rows[0]["NextMeterReadDate"]);
        $('#iLinkSoFar').attr('data-html', title);
        }
}

function getCurrentHeader() {
    try {
        switch ($('#hdnUsageType').val()) {
            case 'PU':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_power').addClass("active");
                break;
            case 'NU':
                $(".GraphLegend_solar").show();
                $(".GraphLegend_data_solar").show();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_power').addClass("active");
                break;
            case 'GU':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_gas').addClass("active");
                break;
            case 'SU':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_solar').addClass("active");
                $('.compare_graph').attr('style', 'width: 97%; position: relative; overflow-x: hidden; overflow-y: hidden');
                break;
            case 'WU':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_water').addClass("active");
                break;
            case 'DR':
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_dresponse').addClass("active");
                break;
            default:
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.nav_left ul li').removeClass("active");
                $('.sidebar_power').addClass("active");
                break;
        }
    }
    catch (ex) { }
}

function setcolor(usagevalue, highlow) {
    try {
        var color = '#FFFFFF';
        if ($('#hdnUsageType').val() != 'WU') {
            if (usagevalue <= lowRange) {
                color = lowcolor;
            }
            else if (usagevalue > lowRange && usagevalue <= highRange) {
                color = avgcolor;
            }
            else if (usagevalue > highRange) {
                color = highcolor;
            }
            return color;
        }
        else {
            //Changes made to show Allocation based on Allocation status for Water Specifically
            if (type != "D") {
                if (highlow == '2') {
                    color = highcolor;
                }
                else {
                    color = lowcolor;
                }
                return color;
            }
            else {
                color = WaterColor;
                return color;
            }
        }
    }
    catch (ex) { }
}

function loadRange(type, mode, rangeType) {

    try {
        type = type == "C" ? "K" : type;
        for (var r = 0; r < range.Rows.length; r++) {
            if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
                lowRange = range.Rows[r]["LowRange"];
                highRange = range.Rows[r]["MiddleRange"];
                break;
            }
        }
    }
    catch (ex) { }
}

function getNextActiveMode(currMode) {
    try {
        var nextMode;
        if (currMode == 'S') {
            if ($('.calender_usages li a[mode="M"]').is(":visible") == true) {
                nextMode = 'S1';
            }
            else if ($('.calender_usages li a[mode="D"]').is(":visible") == true) {
                nextMode = 'D';
            }
            else if ($('.calender_usages li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.calender_usages li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'M') {
            if ($('.calender_usages li a[mode="D"]').is(":visible") == true) {
                nextMode = 'D';
            }
            else if ($('.calender_usages li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.calender_usages li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'D') {
            if ($('.calender_usages li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.calender_usages li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'H') {
            if ($('.calender_usages li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        return nextMode;
    }
    catch (e) {
        console.log(e.message);
    }
}

function chartclick(x) {
    try {
        prevmode = mode;
        if (mode == 'S1') {
            mode = getNextActiveMode("M");
            $('#hdnMode').val(mode)
            var clickyear = x.year;
            var month = x.month;
            $("#hdnstrDate").val((month < 10 ? "0" + month : month) + "/" + clickyear);
        }
        else if (mode == 'MI') {
            $('#hdnMode').val("MI");
            return false;
        }
        else if (mode == 'H' && $('#hdnUsageType').val() == "PU") {
            mode = getNextActiveMode("H");
            $('#hdnMode').val(mode);
        }
        else if (mode == 'H') {
            return false;
        }
        else if (mode == 'Y') {
            mode = 'M';
            $('#hdnMode').val("M");
        }
        else if (mode == 'M') {
            mode = getNextActiveMode('M');
            $('#hdnMode').val(mode);
            var clickyear = x.year;
            var month = x.month;
            $("#hdnstrDate").val((month < 10 ? "0" + month : month) + "/" + clickyear);

        }
        else if (mode == 'D') {
            mode = getNextActiveMode('D');
            $('#hdnMode').val(mode);
            var clickdate = x.UsageDate;
            $("#hdnstrDate").val(clickdate);
        }
        else if (mode == 'S') {
            $('#hdnMode').val(mode);
            seasonId = x.id;
            ExcelSeasonID = x.id;
            mode = getNextActiveMode("S");
            try {
                usageyear = x.year;
            }
            catch (e)
            { }

        }
        if (prevmode != mode) {
            showhideweatheroverlay();
            drawChart(usageOrGeneration, $('#hdnType').val(), mode, '0', usageyear);
            setImages();
        }
    }
    catch (ex) { }
}

function UsageDataHourly(sender, args) {
    try {
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
        drawChart('1', type, mode, strDate, usageyear);
    }
    catch (ex) { }
}

function setdailyhighest(mode, unit, usagearray) {
    try {
        var UsageType = $('#hdnUsageType').val();
        var maxval = 0;
        var avgvalue = 0;
        var total = 0;
        if (usagearray.length > 0) {
            maxval = usagearray[0].y;
        }
        for (var i = 0; i < usagearray.length; i++) {
            if (usagearray[i].y > maxval) {
                maxval = usagearray[i].y == undefined ? 0 : usagearray[i].y;
            }
            total += usagearray[i].y == undefined ? 0 : usagearray[i].y;
        }
        avgvalue = total / usagearray.length;
        var maxValueInArray = Math.max.apply(Math, usagearray.y);

        var avftext = 'DAILY';
        var titleText = '';
        var unittext = '';
        var modetextTitle = '';
        switch (unit) {
            case 'K': unittext = 'kWh';
                break;
            case 'D': unittext = '$';
                break;
            case 'W': unittext = 'HCF';
                break;
            case 'C': unittext = 'CCF';
                break;
            case 'G': unittext = 'Gal';
                break;
        }


        var modetext = '';
        switch (mode) {
            case 'H':
                avftext = $('#glblizeHourly').text();
                titleText = $('#glblizeHourly').attr("title");
                modetext = $('#glblizeDay').text();
                modetextTitle = $('#glblizeDay').attr("title");
                break;
            case 'D':
                avftext = $('#glblizeDaily').text();
                titleText = $('#glblizeDaily').attr("title");
                modetext = $('#glblizeMonth').text();
                modetextTitle = $('#glblizeMonth').attr("title");
                break;
            case 'M':
                avftext = $('#glblizeMonthly').text();
                titleText = $('#glblizeMonthly').attr("title");
                modetext = $('#glblizeYear').text();
                modetextTitle = $('#glblizeYear').attr("title");
                break;
            case 'S':
                avftext = $('#glblizeSeasonal').text();
                titleText = $('#glblizeSeasonal').attr("title");
                modetext = $('#glblizeYear').text();
                modetextTitle = $('#glblizeYear').attr("title");
                break;
            case 'S1':
                avftext = $('#glblizeMonthly').text();
                titleText = $('#glblizeMonthly').attr("title");
                modetext = $('#glblizeYear').text();
                modetextTitle = $('#glblizeYear').attr("title");
                break;
            case 'MI':
                avftext = $('#glblize15min').text();
                titleText = $('#glblize15min').attr("title");
                modetext = $('#glblizeDay').text();
                modetextTitle = $('#glblizeDay').attr("title");
                break;
            case 'B':
                avftext = $('#glblizeMonthly').text();
                titleText = $('#glblizeMonthly').attr("title");
                modetext = $('#glblizeYear').text();
                modetextTitle = $('#glblizeYear').attr("title");
                break;

        }

        $('#averagevaltext').text(avftext);
        $('#averagevaltext').attr("title", titleText);
        $('#ModeText').text(modetext);
        $('#ModeText').attr("title", modetextTitle);

        if (usageType == 'SU') {
            $('#GenDiv').css("display", "none");
            $('#WaterDiv').css("display", "block");

        }
        else {
            $('#GenDiv').css("display", "block");
            $('#WaterDiv').css("display", "none");
        }
        if (usageType != 'SU') {
            setheaderwidth();
            if (unittext == 'kWh' || unittext == 'HCF' || unittext == 'CCF' || unittext == 'Gal') {
                $("#highestval").text(changetoK(highest, IsDecimal) + " " + unittext);
                $("#averageval").text(changetoK(average, IsDecimal) + " " + unittext);
                var CurrentUsage = ($("span[id$='lblUnitThisMonth']").text() * 748);
                var EstimatedUsage = ($("span[id$='lblUnitPrediction']").text() * 748);
                if (unittext == 'Gal') {
                    $("#lblCurrentUsage").text(changetoK(CurrentUsage, IsDecimal) + " " + unittext);
                    $("#lblEstimatedUsage").text(changetoK(EstimatedUsage, IsDecimal) + " " + unittext);
                }
                else {
                    $("#lblCurrentUsage").text(changetoK(parseFloat($("span[id$='lblUnitThisMonth']").text())) + " " + unittext, IsDecimal);
                    $("#lblEstimatedUsage").text(changetoK(parseFloat($("span[id$='lblUnitPrediction']").text())) + " " + unittext, IsDecimal);

                    if ($("#lblCurrentUsage").text().toLowerCase().indexOf('NaN'.toLowerCase()) >= 0)
                        $("#lblCurrentUsage").text("N/A");

                    if ($("#lblEstimatedUsage").text().toLowerCase().indexOf('NaN'.toLowerCase()) >= 0)
                        $("#lblEstimatedUsage").text("N/A");

                    if (unittext == 'kWh') {
                        $("#lblMaxDemand").text(changetoK(parseFloat($("#hdnMaxDemandkwh").val())) + " " + "kW", IsDecimal);
                        $("#lblLoadFactor").text(parseFloat($("#hdnLoadKwh").val()).toFixed(2) + "%");
                       // $("#lblMaxDemand").text()
                    }
                }

            }
            else {
                $("#highestval").text(unittext + changetoK(highest, IsDecimal));
                $("#averageval").text(unittext + changetoK(average, IsDecimal));
                $("#lblCurrentUsage").text(unittext + changetoK(parseFloat($("span[id$='lblCurrentUsageH']").text()), IsDecimal));
                $("#lblEstimatedUsage").text(unittext + changetoK(parseFloat($("span[id$='lblEstimatedUsageH']").text()), IsDecimal));
                $("#lblMaxDemand").text(changetoK(parseFloat($("#hdnMaxDemandDollar").val())) + " kW", IsDecimal);
                $("#lblLoadFactor").text(parseFloat($("#hdnLoadDollar").val()).toFixed(2) + "%");
            }
        }
        else {
            if (unittext == 'kWh' || unittext == 'HCF' || unittext == 'CCF' || unittext == 'Gal') {
                $("#highestvalue").text(changetoK(highest, IsDecimal) + " " + unittext);
                $("#averagevalue").text(changetoK(average, IsDecimal) + " " + unittext);
                $("#lblCurrentUsages").text(changetoK(parseFloat($("span[id$='lblUnitThisMonth']").text()), IsDecimal) + " " + unittext);
                $("#lblEstimatedUsages").text(changetoK(parseFloat($("span[id$='lblUnitPrediction']").text()), IsDecimal) + " " + unittext);
            }
            else {
                $("#highestvalue").text(unittext + changetoK(highest, IsDecimal));
                $("#averagevalue").text(unittext + changetoK(average, IsDecimal));
                $("#lblCurrentUsages").text(unittext + changetoK(parseFloat($("span[id$='lblCurrentUsageH']").text()), IsDecimal));
                $("#lblEstimatedUsages").text(unittext + changetoK(parseFloat($("span[id$='lblEstimatedUsageH']").text()), IsDecimal));

            }

            
            
        }
        if ((mode == 'M' || mode == 'B') && (unit == 'K' || unit == 'C' | unit == 'W' || unit == 'G')) {
            var currUsage = $("#hdnUnitThisMonth").val();
            var estUsage = $("#hdnUnitPrediction").val();
            getColorForLabel(currUsage, estUsage);
        }
        else if ((mode == 'M' || mode == 'B') && unit == 'D') {
            var currUsage = $("#hdnDollarThisMonth").val().replace('$', '');
            var estUsage = $("#hdnDollarPredicted").val().replace('$', '');
            getColorForLabel(currUsage, estUsage);
        }
        if (UsageType != 'SU') {
            if (maxval <= avgvalue) {
                document.getElementById('highestval').style.color = lowcolor;
            }
            else if (maxval == avgvalue) {
                document.getElementById('highestval').style.color = avgcolor;
            }
            else {
                document.getElementById('highestval').style.color = highcolor;
            }
        }

    }
    catch (ex) { }
}

function getColorForLabel(currUsage, estUsage) {
    try {
        if (currUsage <= lowRange) {
            color = lowcolor;
            document.getElementById('lblCurrentUsage').style.color = color;
        }
        else if (currUsage > lowRange && currUsage <= highRange) {
            color = avgcolor;
            document.getElementById('lblCurrentUsage').style.color = color;
        }
        else if (currUsage > highRange) {
            color = highcolor;
            document.getElementById('lblCurrentUsage').style.color = color;
        }

        if (estUsage <= lowRange) {
            color = lowcolor;
            document.getElementById('lblEstimatedUsage').style.color = color;
        }
        else if (estUsage > lowRange && estUsage <= highRange) {
            color = avgcolor;
            document.getElementById('lblEstimatedUsage').style.color = color;
        }
        else if (estUsage > highRange) {
            color = highcolor;
            document.getElementById('lblEstimatedUsage').style.color = color;
        }
    }
    catch (ex) { }
}

function getapidata() {
    try {
        var result = comUsage.GetApiLocations().value;
        var parsedjson = jQuery.parseJSON(result);
        plotapilocations(parsedjson);
    }
    catch (ex) { }
}

function plotapilocations(data) {
    try {
        var s = '';
        for (var i = 1; i < data.list.length; i++) {
            var date = new Date();
            var date = new Date((data.list[i].dt) * 1000);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;
            var humidity = (data.list[i].humidity > 0) ? "humidity " + data.list[i].humidity : "&nbsp;";
            s += "<div class='DayContainer'> <div class='DayHeader'>" + date + "</div>" +
            "<div class='DateHeader'>" + humidity + "</div>" +
            "<div class='Weather'><img src='images/Weather/" + data.list[i].weather[0].icon + ".png' alt='WeatherIcon' title='" + data.list[i].weather[0].main + "'></div>" +
            "<div class='Temp'>max " + (((parseFloat(data.list[i].temp.max) - 273.15).toFixed(2)) * 1.8000 + 32.00).toFixed(2) + "°C</div>" +
            "<div class='Lowtemp'>min " + (((parseFloat(data.list[i].temp.min) - 273.15).toFixed(2)) * 1.8000 + 32.00).toFixed(2) + "°C</div></div>";
        }
        $('#divWether').html(s);
    }
    catch (ex) { }
}

function setChartHeight() {
    try {
        //Start - increase width of the chart to show more data
        var columncount = processed_json.length;
        if (columncount > 31) {
            var chartwidth = columncount * 31;
            $('#chart').attr('style', 'width:' + chartwidth + 'px !important');
        }
        else {

            if ((columncount >= 24)) {
                $('#chart').attr('style', 'width:150%!important');
            } else {
                $('#chart').attr('style', 'width:100%!important;overflow-x:hidden');
            }
        }

        $(".radius").height($(window).height() * .38);

    }
    catch (ex) { }
}

function CompareDate(date1) {
    var d = new Date();
    var date2 = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var bool = Date.parse(date1) > Date.parse(date2);
    return bool;
}

$(document).ready(function () {

    $('#ddlAddress').change(function () {
        var metertype = $(this).val().split(':')[7].trim();
        if (metertype == 'E')
        {
            $('#hdnUsageType').val('PU');
            UsageType = 'PU';
        }
        else if (metertype == "W") {
            UsageType = 'WU';
            $('#hdnUsageType').val('WU');
        }
        //Master.SetMeterType($(this).val().split(':')[7].trim());
    });

    refresh();
    $(window).on('resize', refresh);
    setDate();

    $.ajax({
        type: "POST",
        url: "Usages.aspx/IsInverted",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ 'Mode': 0 }),
        success: function (data) {
            var result = $.parseJSON(data.d);
            if (result != '') {
                Isreverse = result.Table[0].NetUsageInversion == true ? 1 : 0;
                IsDecimal = result.Table[0].ShowDecimal == true ? 1 : 0;
            }
        },
        error: function (response) {
            console.log(response.message);
        }
    });
});

function setDate() {
   // z = $(date).attr('value');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = mm+'/'+dd+'/'+yyyy;

    $('#hdnstrDate').val(today);
}
function refresh() {
   
    if ((window.detectZoom.device().toFixed(1) >= 1.60) && (window.detectZoom.device().toFixed(1) < 1.80)) {
        $(".power_graph_heading").addClass('msthigh');
        $("#showWeatherOverlay").addClass('msthigh');
    }
    else {
        $(".power_graph_heading").removeClass('msthigh');
        $("#showWeatherOverlay").removeClass('msthigh');
    }

}

function openfancyboxrate(id) {
    try {
        $.fancybox({
            //'width': '90%',
            'width': '625px',
            'height': '90%',
            'autoScale': true,
            'transitionIn': 'fade',
            'transitionOut': 'fade',
            content: $("#" + id).show()
        });
        getAMPMData();
        return false;
    }
    catch (ex) { }
}

function setheaderwidth() {
    var i = 0;
    var monthlyavg = $('#monthlyAvg').is(":visible") == true ? 1 : 0;
    var highestyear = $('#highestyear').is(":visible") == true ? 1 : 0;
    var soFarUsage = $('#divsoFarUsage').is(":visible") == true ? 1 : 0;
    var projectedUsage = $('#divprojectedUsage').is(":visible") == true ? 1 : 0;
    var loadfactor = $('#LoadFactor').is(":visible") == true ? 1 : 0;
    var MaxDemand = $('#MaxDemand').is(":visible") == true ? 1 : 0;
    monthlyavg == 1 ? $('#monthlyAvg').show() : $('#monthlyAvg').hide();
    highestyear == 1 ? $('#highestyear').show() : $('#highestyear').hide();
    soFarUsage == 1 ? $('#soFarUsage').show() : $('#soFarUsage').hide();
    projectedUsage == 1 ? $('#projectedUsage').show() : $('#projectedUsage').hide();
    loadfactor == 1 ? $('#LoadFactor').show() : $('#LoadFactor').hide();
    MaxDemand == 1 ? $('#MaxDemand').show() : $('#MaxDemand').hide();

    var count = monthlyavg + highestyear + soFarUsage + projectedUsage + loadfactor + MaxDemand;
    switch (count) {
        case 1: $('#GenDiv ul li').css('width', '100%');
            break;
        case 2: $('#GenDiv ul li').css('width', '50%');
            break;
        case 3: $('#GenDiv ul li').css('width', '33.3%');
            break;
        case 4: $('#GenDiv ul li').css('width', '25%');
            break;

    }
}
