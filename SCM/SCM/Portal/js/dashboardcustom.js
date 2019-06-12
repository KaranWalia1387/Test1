var powerrange;
var waterrange;
var lowRange;
var highRange;
var gasrange;
var Type = 'K', mode = 'M';
var usagewidth = '';
var currentUnitmode = '';
var currentDurationmode = '';
var previousUnitmode = '';
var previousDurationmode = '';
var highcolor = '';// '#ea557b';
var lowcolor = '';//'#4adea0';
var avgcolor = '';//'#e9cc57';
var colorval = '';//"#31afdb"; -- For Water Allocation
var NoCompareDiv = '';
var highlow = '';
var Meternum = "";
var IsAMIStatus = "";
/*
 * Author: Manoj Sharma
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
$(function () {
    try {
        $(".resizable").resizable({

            animate: true,
            maxWidth: 1000,
            grid: [10, 10]
        });
        checkClientTimeZone();

        loadElectricVehicle();



    }
    catch (e) {
        console.log(e.message);
    }
});

$(document).ready(function () {
    try {
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
                        }
                        else if (result.Table[i].ConfigOption == 'Low') {
                            lowcolor = result.Table[i].ConfigValue;
                        }
                        else if (result.Table[i].ConfigOption == 'Mid') {
                            avgcolor = result.Table[i].ConfigValue;
                        }
                        else if (result.Table[i].ConfigOption == 'WaterAllocation') {
                            colorval = result.Table[i].ConfigValue;
                            $('.GraphLegend_Usage').css({ "background-color": colorval });
                        }
                    }
                }
            },
            error: function () {

            }
        });
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
        NoCompareDiv = '<div class="NoCompare">' + $('#lblCompareNoData').text() + '</div>';
        LoadBillDashBordModule();//added by lalit yadav 9 oct 2015 to call ajax billing module

        powerrange = comUsage.LoadRange().value;
        waterrange = comUsage.LoadWaterRange().value;
        gasrange = comUsage.LoadRange().value;
        usagewidth = $('.usageconsumption').width();

        //For New Dashboard
        if ($("#hdnMeterTypePower").val() == "False") {
            $("#usagetype  option[value='E']").remove();
        }
        else {
            if ($("#hdnPU").val() == "0")
                $("#usagetype  option[value='E']").remove();
            else
                $("#usagetype  option[value='E']").show();
        }

        if ($("#hdnMeterTypeWater").val() == "False") {
            $("#usagetype  option[value='W']").remove();
        }
        else {
            if ($("#hdnWU").val() == "0")
                $("#usagetype  option[value='W']").remove();
            else
                $("#usagetype  option[value='W']").show();
        }

        if ($("#hdnMeterTypeGas").val() == "False") {
            $("#usagetype  option[value='G']").remove();
        }
        else {
            if ($("#hdnGU").val() == "0")
                $("#usagetype  option[value='G']").remove();
            else
                $("#usagetype  option[value='G']").show();
        }
        //for compare spending dropdown show/hide
        setDropdowns();

        currentDurationmode = 'M';
        previousDurationmode = 'D';
        if (currentDurationmode != previousDurationmode) {
            $("#duarationmode li a").removeClass('active');
            $("#duarationmode li a[mode='" + currentDurationmode + "']").addClass('active');
            previousDurationmode = currentDurationmode;
            duration = 'M';
        }
       


        $("#duarationmode li a").click(function () {
            try {
                currentDurationmode = $(this).attr('mode');
                $("#duarationmode li a").removeClass('active');
                $("#duarationmode li a[mode='" + currentDurationmode + "']").addClass('active');
                previousDurationmode = currentDurationmode;
                duration = $(this).attr('mode');
                //}
                var usagetyp = $("#usagetype").val();
                switch (usagetyp) {
                    case 'W':
                        {
                            loadWaterusage(getuntitype(), duration);
                        }
                        break;
                    case 'E':
                        {
                            loadpowerusage(getuntitype(), duration);
                       
                        }
                        break;
                    case 'G':
                        {
                            loadGasUsage(getuntitype(), duration);
                        }
                        break;
                }
            }
            catch (ex) { }


        });

        $("#unitmode li a").click(function () {
            try {
                currentUnitmode = $(this).attr('mode');
                if (currentUnitmode != previousUnitmode) {
                    $("#unitmode li a").removeClass('active');
                    $("#unitmode li a[mode='" + currentUnitmode + "']").addClass('active');
                    previousUnitmode = currentUnitmode;
                }
                var usagetyp = $("#usagetype").val();
                getduration(usagetyp);
                switch (usagetyp) {
                    case 'W':
                        {
                            loadWaterusage(getuntitype(), duration);
                        }
                        break;
                    case 'E':
                        {
                            loadpowerusage(getuntitype(), duration);
                         
                        }
                        break;
                    case 'G':
                        {
                            loadGasUsage(getuntitype(), duration);
                        }
                        break;
                }

            }
            catch (ex) { }

        });


        k('#ddlElecVehicle').live('change', function () {
            $('#imgCar').attr("src", $('#ddlElecVehicle').val());
            $('#lblUsage').html($('#ddlElecVehicle' + ' option:selected').attr("usage"));
            $('#lblChrRem').html($('#ddlElecVehicle' + ' option:Selected').attr("chrrem"));
            $('#hdnselectedindex').val($('#ddlElecVehicle' + ' option:Selected').index());
        });

        $('#aGenerationUsageD').click(function () {
            $('#aGenerationUsageD').addClass('active_links');
            $('#aGenerationUsagekWh').removeClass('active_links');
            loadGenerationUsage('D', '$$');
        });

        $('#aGenerationUsagekWh').click(function () {
            $('#aGenerationUsagekWh').addClass('active_links');
            $('#aGenerationUsageD').removeClass('active_links');
            loadGenerationUsage('K', 'kWh');
        });
        $("#drpCompare").change(function () {
            loadcomparespending();
            setDropdowns();
        });

        //Changes done for Multimeter for dropdown
        // on multimeter dropdown change
        $("#ddlMultiMeter").change(function () {
            var usagetyp = $('#usagetype').val();
            $("#unitmode li a").removeClass('active');
            $("#duarationmode li a").removeClass('active');
            Meternum = $('#ddlMultiMeter').val();
            switch (usagetyp) {
                case 'W':
                    {
                        setWaterModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('HCF');
                        $('.usageconsumption').attr('id', 'divWaterUsage');
                        loadRange(getuntitype(), duration, "W", waterrange);
                        loadWaterusage(getuntitype(), duration);
                    }
                    break;
                case 'E':
                    {
                        $('#aUsageWaterGl').hide();
                        setPowerModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('kWH');
                        $('.usageconsumption').attr('id', 'divElectricityUsage');
                        loadRange(getuntitype(), duration, "E", powerrange);
                      
                        loadpowerusage(getuntitype(), duration);
                      
                    }
                    break;
                case 'G':
                    {
                        $('#aUsageWaterGl').hide();
                        setGasModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('CCF');
                        $('.usageconsumption').attr('id', 'divGasUsage');
                        loadRange(getuntitype(), duration, "G", gasrange);
                        //loadgasdata(getuntitype());
                        loadGasUsage(getuntitype(), duration);
                    }
                    break;
            }
        });

        $("#usagetype").change(function () {
            var usagetyp = $(this).val();
            BindMultimeter(usagetyp);
        });
        $("#usagetype").trigger('change');

    }
    catch (e) {
        console.log(e.message);
        $("#duarationmode li a[mode='" + currentDurationmode + "']").addClass('active');
        $("#duarationmode li a[mode='" + previousDurationmode + "']").removeClass('active');
    }
    $("#Module9").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// SmartHome
    $("#smartHomeLoader").css('display', 'block');

});

//Changes done for Multimeter for dropdown
// for binding multimeter
function BindMultimeter(usagetyp) {

    var param = { MeterType: usagetyp };
    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindMultiMeter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            $("#ddlMultiMeter").empty();
           
            $("#ddlMultiMeter").append($("<option></option>").val('').html($('#alltxt').text())).attr("Isami", "");
            if (data.d != "") {
                var ddlvalue = $.parseJSON(data.d);
                IsAMIStatus = ddlvalue["MeterCheckIsAMI"][0]["IsAMIStatus"];
                $.each(ddlvalue["MeterDetails"], function () {
                    $("#ddlMultiMeter").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
                });
            }

            $("#unitmode li a").removeClass('active');
            $("#duarationmode li a").removeClass('active');
            Meternum = "";
            switch (usagetyp) {
                case 'W':
                    {
                        setWaterModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('HCF');
                        $('.usageconsumption').attr('id', 'divWaterUsage');
                        loadRange(getuntitype(), duration, "W", waterrange);
                      
                        loadWaterusage(getuntitype(), duration);
                    }
                    break;
                case 'E':
                    {
                        $('#aUsageWaterGl').hide();
                        setPowerModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('kWh');
                        $('.usageconsumption').attr('id', 'divElectricityUsage');
                        loadRange(getuntitype(), duration, "E", powerrange);
                    
                        loadpowerusage(getuntitype(), duration);
                    
                    }
                    break;
                case 'G':
                    {
                        $('#aUsageWaterGl').hide();
                        setGasModule();
                        getduration(usagetyp);
                        $("#unitmode li a[mode=U]").text('CCF');
                        $('.usageconsumption').attr('id', 'divGasUsage');
                        loadRange(getuntitype(), duration, "G", gasrange);
                     
                        loadGasUsage(getuntitype(), duration);
                    }
                    break;
            }
        },
        error: function () {
           
        }


    });
}

function loadRange(type, mode, rangeType, range) {
    try {
      
        mode = mode == "$$" ? "D" : mode;
     
        for (var r = 0; r < range.Rows.length; r++) {
            if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
                lowRange = range.Rows[r]["LowRange"];
                highRange = range.Rows[r]["MiddleRange"];
                break;
            }
        }
        //}
    }
    catch (e) {
        console.log(e.message);
    }
}

function setcolor(usagevalue, highlow) {
    var color = '#FFFFFF';
    if ($("#usagetype").val() != 'W') {
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
        if (getuntitype() != "D") {
            if (highlow == '2') {
                color = highcolor;
            }
            else {
                color = lowcolor;
            }
            return color;
        }
        else {
            color = colorval;
            return color;
        }
    }

}

// this function help in loading of graph of power usage in dashboard Usage widget
function loadpowerusage(Type, mode) {
    try {

        var url = "dashboard.aspx/LoadUsageAjax";
        var hourlyType = duration.toString() == "H" ? "F" : "";

        var isami = $("#ddlMultiMeter option:selected").attr('Isami');
        if (isami == "false") {

            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            if (mode != 'M' && mode != 'S') {
                $('#duarationmode li a').removeClass('active');
                if ($("#hdnPUMonthly").val() != "0") {
                    duration = 'M';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
                else {
                    duration = 'S';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
            }
        }
        else {
            if (IsAMIStatus == true && $("#ddlMultiMeter option:selected").text() == "All") {
                $('#duarationmode li a').removeClass('active');
                $('#duarationmode li a[mode="H"]').hide();
                $('#duarationmode li a[mode="D"]').hide();
                $('#duarationmode li a[mode="' + mode + '"]').addClass('active');
            }
            else {
                if ($("#hdnPUMonthly").val() != "0") {
                    $('#duarationmode li a[mode="H"]').show();
                }
                if ($("#hdnPUDaily").val() != "0") {
                    $('#duarationmode li a[mode="D"]').show();
                }
            }
        }
        var parameter = "{UsageOrGeneration:'1',Type:'" + Type + "', Mode:'" + duration + "',strDate:'',hourlyType:'" + hourlyType + "',SeasonId:'0',weatherOverlay:'0',usageyear:'',MeterNumber:'" + Meternum + "'}";
        $.ajax({
            type: "POST",
            url: url,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                OnsuccessPowerUsage(response, Type, mode);
            },
            error: OnError,

        });

    } catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        console.log(e.message);
    }

}

function OnsuccessPowerUsage(response, Type, mode) {
    try {
        $('.usageconsumption').show();     
        $('#divNoDataUsage').hide();
        yaxis = Type == "K" ? 'kWh' : '$';
        loadRange(Type, mode, "E", powerrange);
        var usageData = JSON.parse(response.d);
        if (!(usageData == null || usageData.length == 0)) {
            processed_json = new Array();
            LoadUsageDatainChart(usageData, mode, yaxis);
        }
        else
        {
            $('.usageconsumption').hide();
            $('#divNoDataUsage').show();
            $('#divNoDataUsage').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
        }
    }


    catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        $('#divNoDataUsage').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
        console.log(e.message);
    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoader").css('display', 'block');
}

// this function help in loading of graph of gas usage in dashboard Usage widget
function loadGasUsage(Type, mode) {
    try {
        //Changes done for Multimeter for AMI or NON-AMI
        var isami = $("#ddlMultiMeter option:selected").attr('Isami');

        if (isami == "false") {

            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            if (mode != 'M' && mode != 'G') {
                $('#duarationmode li a').removeClass('active');
                if ($("#hdnGUMonthly").val() != "0") {
                    duration = 'M';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
                else {
                    duration = 'S';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
            }
        }
        else {
            if (IsAMIStatus == true && $("#ddlMultiMeter option:selected").text() == "All") {
                $('#duarationmode li a').removeClass('active');
                $('#duarationmode li a[mode="H"]').hide();
                $('#duarationmode li a[mode="D"]').hide();
                $('#duarationmode li a[mode="' + mode + '"]').addClass('active');
            }
            else {
                if ($("#hdnGUMonthly").val() != "0") {
                    $('#duarationmode li a[mode="H"]').show();
                }
                if ($("#hdnGUDaily").val() != "0") {
                    $('#duarationmode li a[mode="D"]').show();
                }
            }
        }
        //
        var url = "dashboard.aspx/LoadGasUsageAjax";
        var hourlyType = duration.toString() == "H" ? "F" : "";
        var parameter = "{Type:'" + Type + "', Mode:'" + mode + "',strDate:'',hourlyType:'" + hourlyType + "',seasonId:'',weatherOverlay:'',usageyear:'',MeterNumber:'" + Meternum + "'}";
        $.ajax({
            type: "POST",
            url: url,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                OnsuccessGasUsage(response, Type, mode);
            },
            error: OnError,

        });
    }
    catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        console.log(e.message);
    }


}

function OnsuccessGasUsage(response, Type, mode) {
    try {
        $('.usageconsumption').show();
        $('#divNoDataUsage').hide();       
        yaxis = Type == "C" ? 'CCF' : '$';
        loadRange(Type, mode, "G", powerrange);
        var usageData = JSON.parse(response.d);
        if (!(usageData == null || usageData.length == 0)) {
            processed_json = new Array();
            LoadUsageDatainChart(usageData, mode, yaxis);
        }
        else {
            $('.usageconsumption').hide();
            $('#divNoDataUsage').show();
            $('#divNoDataUsage').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
        }
    } catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        $('#divNoDataUsage').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
        console.log(e.message);
    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoader").css('display', 'block');
}

// this function help in loading of graph of water usage in dashboard Usage widget
// added by priyansha
function loadWaterusage(Type, mode) {
    try {
        var url = "dashboard.aspx/LoadWaterUsageAjax";
        var hourlyType = duration.toString() == "H" ? "F" : "";
        //Changes done for Multimeter for AMI or NON-AMI
        var isami = $("#ddlMultiMeterWater option:selected").attr('Isami');
        if (isami == "False") {
            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            if (mode != 'M' && mode != 'G' && mode != 'B') {
                $('#duarationmode li a').removeClass('active');
                if ($("#hdnWUBIMonthly").val() != "0") {
                    duration = 'B';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
                else if ($("#hdnWUMonthly").val() != "0") {
                    duration = 'M';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
                else {
                    duration = 'S';
                    $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
                }
            }
        }
        else {
            if (IsAMIStatus == true && ($("#ddlMultiMeter option:selected").text() == "All" || $("#ddlMultiMeter option:selected").text() == "todas")) {
                $('#duarationmode li a').removeClass('active');
                $('#duarationmode li a[mode="H"]').hide();
                $('#duarationmode li a[mode="D"]').hide();
                $('#duarationmode li a[mode="' + mode + '"]').addClass('active');
            }
            else {
                if ($("#hdnWUMonthly").val() != "0") {
                    $('#duarationmode li a[mode="H"]').show();
                }
                if ($("#hdnWUDaily").val() != "0") {
                    $('#duarationmode li a[mode="D"]').show();
                }
            }
        }
        //
        var parameter = "{Type:'" + Type + "',Mode:'" + duration + "',strDate:'',hourlyType:'" + hourlyType + "',weatherOverlay:'0',seasonId:'0',usageyear:'',MeterNumber:'" + Meternum + "'}";
        //LoadAjax(url, parameter, OnSuccessWaterUsage, OnError);
        $.ajax({
            type: "POST",
            url: url,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    OnSuccessWaterUsage(response, Type, mode);
                },
            error: OnError,

        });
    } catch (e) {
        console.log(e.message);
    }

}

function OnSuccessWaterUsage(response, Type, mode) {
    try {
        $('.usageconsumption').show();
        $('#divNoDataUsage').hide();       
        yaxis = Type == "W" ? 'HCF' : '$';
        if (Type == 'G') {
            yaxis = 'Gal';
        }
        loadRange(Type, mode, "W", waterrange);
        var usageData = JSON.parse(response.d);
        // loadwaterdata(Type)
        if (!(usageData == null || usageData.length == 0)) {
            processed_json = new Array();
            LoadUsageDatainChart(usageData, mode, yaxis);
        }
        else {
            $('.usageconsumption').hide();
            $('#divNoDataUsage').show();
            $('#divNoDataUsage').html('<span style="color:red;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
        }
    } catch (e) {
        console.log(e.message);

    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoader").css('display', 'block');
}

function formatvalue(inputvalue) {
    var formatteedvalue = inputvalue;
    if (duration == 'H') {
        if (inputvalue.hourly == undefined) {
            formatteedvalue = formatAMPM(inputvalue.Hourly);
        }
        else {
            formatteedvalue = formatAMPM(inputvalue.hourly);
        }

    }
    if (duration == "M") {
        formatteedvalue = getMonthName(inputvalue.Month);
    }
    if (duration == "D") {
        formatteedvalue = inputvalue.UsageDate.substring(0, inputvalue.UsageDate.lastIndexOf('/'));

    }
    return formatteedvalue;
}

function loadGenerationUsage(Type, mode) {
    try {
        yaxis = Type == "K" ? 'kWh' : '$';
        var usageData = weatherAPI_PowerGeneration.GetGenration(Type, 'L').value;
        if (usageData != null) {
            //drawgaugechart(usageData, usageData * 1.2, "divGenerationUsage", mode, '#f08b1e');
            //drowDonutChart('#f08b1e', usageData * 1.2, usageData, "divGenerationUsage");
            //$('#divGenerationUsageText').html('<b>' + usageData.toFixed(TO_FIX) + '</b></br> of ' + (usageData * 1.2).toFixed(OF_FIX));
            var startindex = 0;
            if (usageData.Rows.length > 7) {
                startindex = usageData.Rows.length - 7;
            }
            processed_json = new Array();
            $.map(usageData.Rows, function (obj, i) {
                if (i >= startindex) {
                    processed_json.push({
                        name: obj.DateOfReading,
                        y: obj.TotalUnit
                        //color: setcolor(obj.TotalValue)
                    });
                }
            });
            BindheighDashboard('column', 'divGenerationUsage', '');
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function resizediv(usagedata) {
    var columncount = usagedata.length;
    if (columncount > 30) {
        var chartwidth = columncount * 30;
        $('.usageconsumption').attr('style', 'width:' + chartwidth + 'px !important;height:250px');
    }
    else {
        $('.usageconsumption').attr('style', 'width:' + usagewidth + 'px !important;height:250px');
    }
}

function loadElectricVehicle() {
    //This block of code is used for electric-vehicle section.
    if ($('#ddlElecVehicle' + ' option').length > 0) {
        $('#imgCar').attr("src", $('#ddlElecVehicle').val());
        $('#lblUsage').html($('#ddlElecVehicle' + ' option:selected').attr("usage"));
        $('#lblChrRem').html($('#ddlElecVehicle' + ' option:Selected').attr("chrrem"));

    }
}

function formatAMPM(datein) {
    if (!isNaN(datein)) {
        var minutes;
        var ampm = datein >= 12 ? 'pm' : 'am';
        datein = datein % 12;
        datein = datein ? datein : 12; // the hour '0' should be '12'
        minutes = '00';
        var strTime = datein + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    else {
        return datein;
    }
}

function setPowerModule() {
    try {
        $("#duarationmode li a[mode='B']").hide();
        if ($("#hdnPU").val() == "0")
            $("#usagetype  option[value='E']").remove();
        else {
            $("#usagetype  option[value='E']").show();
            if ($("#hdnPUKWH").val() == "0") {
                $("#unitmode li a[mode='U']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='U']").show();

            if ($("#hdnPUDollar").val() == "0") {
                $("#unitmode li a[mode='D']").hide();
                $('#unitmode li a[mode="U"]').addClass('active');
                previousUnitmode = '$$';
            }
            else {
                $("#unitmode li a[mode='D']").show();
                $("#unitmode li a[mode='D']").addClass('active');
            }

            if ($("#hdnPUDollar").val() != "0" && $("#hdnPUKWH").val() != "0") {
                $("#unitmode li a[mode='D']").show();
                $("#unitmode li a[mode='U']").show();
                previousUnitmode = 'D';
            }
            if ($("#hdnPUMonthly").val() != "0") {
                $("#hdnMode").val('M');
                $("#duarationmode li a[mode='M']").addClass('active');
                previousDurationmode = 'M';
            }
            else if ($('#hdnPUSeasonal').val() != "0") {
                $("#hdnMode").val('S');
                $("#duarationmode li a[mode='S']").addClass('active');
                previousDurationmode = 'S';
            }
            else if ($("#hdnPUDaily").val() != "0") {
                $("#hdnMode").val('D');
                $("#duarationmode li a[mode='D']").addClass('active');
                previousDurationmode = 'D';
            }
            else if ($("#hdnPUHourly").val() != "0") {
                $("#hdnMode").val('H');
                $("#duarationmode li a[mode='H']").addClass('active');
                previousDurationmode = 'H';
            }
            else {
                previousDurationmode = 'MI';
            }

            if ($("#hdnPUDaily").val() != "0") {
                $("#duarationmode li a[mode='D']").show();
            }
            else {
                $("#duarationmode li a[mode='D']").hide();
            }

            if ($("#hdnPUHourly").val() != "0") {
                $("#duarationmode li a[mode='H']").show();
            }
            else {
                $("#duarationmode li a[mode='H']").hide();
            }

            if ($("#hdnPUMonthly").val() != "0") {
                $("#duarationmode li a[mode='M']").show();
            }
            else {
                $("#duarationmode li a[mode='M']").hide();
            }
            if ($("#hdnPUSeasonal").val() != "0") {
                $("#duarationmode li a[mode='S']").show();
            }
            else {
                $("#duarationmode li a[mode='S']").hide();
            }
            if (previousDurationmode == 'MI') {
                $("#hdnMode").val('D');
                $("#duarationmode li a[mode='D']").addClass('active');
                previousDurationmode = 'D';
                $("#duarationmode li a[mode='D']").show();
            }

        }
    }
    catch (ex)
    { }
}

function setWaterModule() {
    try {
        if ($("#hdnWU").val() == "0")
            $("#usagetype  option[value='W']").remove();
        else {
            $("#usagetype  option[value='W']").show();

            if ($("#hdnWUKWH").val() == "0") {
                $("#unitmode li a[mode='U']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='U']").show();

            if ($("#hdnWUDollar").val() == "0") {
                $("#unitmode li a[mode='D']").hide();
                $('#unitmode li a[mode="U"]').addClass('active');
                previousUnitmode = '$$';
            }
            else
                $("#unitmode li a[mode='D']").show();

            if ($("#hdnWUGallon").val() == "0") {
                $("#unitmode li a[mode='G']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='G']").show();

            if ($("#hdnWUDollar").val() != "0" && $("#hdnWUKWH").val() != "0" && $("#hdnWUGallon").val() != "0") {
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else if ($("#hdnWUDollar").val() != "0" && $("#hdnWUKWH").val() != "0") {
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else if ($("#hdnWUDollar").val() != "0" && $("#hdnWUGallon").val() != "0") {
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else if ($("#hdnWUKWH").val() != "0" && $("#hdnWUGallon").val() != "0") {
                $('#unitmode li a[mode="U"]').addClass('active');
                previousUnitmode = 'U';
            }
            else if ($("#hdnWUGallon").val() != "0") {
                $('#unitmode li a[mode="G"]').addClass('active');
                previousUnitmode = 'G';
            }




            if ($("#hdnWUBIMonthly").val() != "0") {
                previousDurationmode = 'B';
                $("#hdnMode").val('B');
                $("#duarationmode li a[mode='B']").addClass('active');
            }
            else if ($("#hdnWUMonthly").val() != "0") {
                $("#hdnMode").val('M');
                $("#duarationmode li a[mode='M']").addClass('active');
                previousDurationmode = 'M';
            }
            else if ($('#hdnWUSeasonal').val() != "0") {
                $("#hdnMode").val('S');
                $("#duarationmode li a[mode='S']").addClass('active');
                previousDurationmode = 'S';
            }
            else if ($("#hdnWUDaily").val() != "0") {
                $("#hdnMode").val('D');
                $("#duarationmode li a[mode='D']").addClass('active');
                previousDurationmode = 'D';
            }
            else if ($("#hdnWUHourly").val() != "0") {
                $("#hdnMode").val('H');
                $("#duarationmode li a[mode='H']").addClass('active');
                previousDurationmode = 'H';
            }


            if ($("#hdnWUBIMonthly").val() != "0") {
                $("#duarationmode li a[mode='B']").show();
                $("#duarationmode li a[mode='H']").hide();
                $("#duarationmode li a[mode='M']").hide();
                $("#duarationmode li a[mode='D']").hide();
                $("#duarationmode li a[mode='S']").hide();
            }
            else {
                $("#duarationmode li a[mode='B']").hide();
                if ($("#hdnWUDaily").val() != "0") {
                    $("#duarationmode li a[mode='D']").show();
                }
                else {
                    $("#duarationmode li a[mode='D']").hide();
                }
                if ($("#hdnWUHourly").val() != "0") {
                    $("#duarationmode li a[mode='H']").show();
                }
                else {
                    $("#duarationmode li a[mode='H']").hide();
                }
                if ($("#hdnWUMonthly").val() != "0") {
                    $("#duarationmode li a[mode='M']").show();
                }
                else {
                    $("#duarationmode li a[mode='M']").hide();
                }
                if ($("#hdnWUSeasonal").val() != "0") {
                    $("#duarationmode li a[mode='S']").show();
                }
                else {
                    $("#duarationmode li a[mode='S']").hide();
                }

            }


        }
    }
    catch (ex)
    { }
}

function setGasModule() {
    try {
        $("#duarationmode li a[mode='B']").hide();
        if ($("#hdnGU").val() == "0")
            $("#usagetype  option[value='G']").remove();
        else {
            $("#usagetype  option[value='G']").show();
            if ($("#hdnGUKWH").val() == "0") {
                $("#unitmode li a[mode='U']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='U']").show();

            if ($("#hdnGUDollar").val() == "0") {
                $("#unitmode li a[mode='D']").hide();
                $('#unitmode li a[mode="U"]').addClass('active');
                previousUnitmode = '$$';
            }
            else
                $("#unitmode li a[mode='D']").show();

            if ($("#hdnGUDollar").val() != "0" && $("#hdnGUKWH").val() != "0") {
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }

            if ($("#hdnGUMonthly").val() != "0") {
                $("#hdnMode").val('M');
                $("#duarationmode li a[mode='M']").addClass('active');
                previousDurationmode = 'M';
            }
            else if ($('#hdnGUSeasonal').val() != "0") {
                $("#hdnMode").val('S');
                $("#duarationmode li a[mode='S']").addClass('active');
                previousDurationmode = 'S';
            }
            else if ($("#hdnGUDaily").val() != "0") {
                $("#hdnMode").val('D');
                $("#duarationmode li a[mode='D']").addClass('active');
                previousDurationmode = 'D';
            }
            else if ($("#hdnGUHourly").val() != "0") {
                $("#hdnMode").val('H');
                $("#duarationmode li a[mode='H']").addClass('active');
                previousDurationmode = 'H';
            }




            if ($("#hdnGUDaily").val() != "0") {
                $("#duarationmode li a[mode='D']").show();
            }
            else {
                $("#duarationmode li a[mode='D']").hide();
            }

            if ($("#hdnGUHourly").val() != "0") {
                $("#duarationmode li a[mode='H']").show();
            }
            else {
                $("#duarationmode li a[mode='H']").hide();
            }

            if ($("#hdnGUMonthly").val() != "0") {
                $("#duarationmode li a[mode='M']").show();
            }
            else {
                $("#duarationmode li a[mode='M']").hide();
            }

            if ($("#hdnGUSeasonal").val() != "0") {
                $("#duarationmode li a[mode='S']").show();
            }
            else {
                $("#duarationmode li a[mode='S']").hide();
            }

        }
    }
    catch (ex)
    { }
}

function LoadUsageDatainChart(usageData, Mode, yaxislabel) {
    try {
        processed_json = new Array();
        switch (Mode) {
            case "H":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                        y: (obj.Unit == undefined || obj.Unit == "") ? parseFloat(obj.TotalValue) : parseFloat(obj.Unit),
                        color: (obj.Unit == undefined || obj.Unit == "") ? setcolor(parseFloat(obj.TotalValue), obj.HighUsage) : setcolor(parseFloat(obj.Unit)),
                        year: (obj.Year == undefined || obj.Year == "") ? '' : obj.Year
                    });
                });
                break;

            case "D":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: formatvalue(obj),//obj.UsageDate,
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                    });
                });
                break;

            case "M":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: getMonthName(obj.Month),
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: obj.Year
                    });
                });
                break;
            case "B":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: obj.Month,
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: obj.Year
                    });
                });
                break;
            case "S":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: obj.SeasonName,// + ' ' + ($("#usagetype").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: obj.Year
                    });
                });
                break;
        }
        var usagetyp = $("#usagetype").val();
        switch (usagetyp) {
            case 'W':
                {
                    BindheighDashboard('column', 'divWaterUsage', '', yaxislabel);
                }
                break;
            case 'E':
                {
                    BindheighDashboard('column', 'divElectricityUsage', '', yaxislabel);
                }
                break;
            case 'G':
                {
                    BindheighDashboard('column', 'divGasUsage', '', yaxislabel);
                }
                break;
        }
    }
    catch (ex) { }
}

function setDropdowns() {
    try {
        var ddlflag = 0;
        if ($("#hdnMeterTypePower").val() == "False") {
            $("#drpCompare option[value='Power']").remove();
            $("#usagetype  option[value='E']").remove();
        }
        else {
            $("#drpCompare option[value='Power']").show();
            $("#usagetype  option[value='E']").show();
            ddlflag += 1;
        }

        if ($("#hdnMeterTypeWater").val() == "False") {
            $("#drpCompare option[value='Water']").remove();
            $("#usagetype  option[value='W']").remove();
        }
        else {
            $("#drpCompare option[value='Water']").show();
            $("#usagetype  option[value='W']").show();
            ddlflag += 1;
        }

        if ($("#hdnMeterTypeGas").val() == "False") {
            $("#usagetype  option[value='G']").remove();
            $("#drpCompare option[value='Gas']").remove();
        }
        else {
            $("#drpCompare option[value='Gas']").show();
            $("#usagetype  option[value='G']").show();
            ddlflag += 1;
        }

        if (ddlflag == 1) {
            $("#drpCompare").css('display', 'none');
            $("#usagetype").css('display', 'none');
        }
        else {
            $("#drpCompare").css('display', 'block');
            $("#usagetype").css('display', 'block');
        }
    }
    catch (ex) {
        var msg = ex.message;
    }
}

$('body').bind('beforeunload', function () {
    $("#PaperlessBillingBanner").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader //PaperlessBilling

});

$(document).ready(function () {
    loadEVModule();
    loadMyAccountModule();
    loadcomparespending()
    loadNotificationDashboardModule();
    LoadEnergyEfficiencyModule();
    LoadBanner();
    $("#efficiencyLoader").css('display', 'block');
    $("#IDEfficiency").error(function () {
        $(this).attr("src", "images/no_img.png");
    })
    $("#BannerDashboard").error(function () {
        $(this).attr("src", "images/no_img.png").addClass("no_img_css");
    })
});

function LoadBanner() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/Setbanners",
        data: '{PlaceHolderID: "' + 1 + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            JSON.parse(response.d) == null ? $('#BannerDashboard').attr('src', 'images/no_img.png') : $('#BannerDashboard').attr('src', JSON.parse(response.d)).removeClass("no_img_css");
            $('#BannerDashboard').error(function () {
                $(this).attr('src', 'images/no_img.png');
            });
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    });
}

function LoadEnergyEfficiencyModule() {

    try {
        $.ajax({
            type: "POST",
            url: "dashboard.aspx/LoadSavingTips",
            data: JSON.stringify({ SavingName: '' }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    var URL = JSON.parse(response.d).split(',')[0];
                    var Type = JSON.parse(response.d).split(',')[1];
                    var Title = JSON.parse(response.d).split(',')[2];
                    (URL == "") ? $('#imgEfficiency').attr('src', "images/no_img.png") : $('#imgEfficiency').attr('src', $('#hdnAttachmentPath').val() + '' + URL);
                    $('#IDEfficiency').attr('href', Type + '.aspx');
                    $('#IDEffDash').prop('title', URL.split('.')[0]);
                    $('#imgEfficiency').attr('title', Title);
                }
            },
            failure: function (response) {
            }
        });
    } catch (e) {

    }
    $("#EnergyEfficiencyModule").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Efficiency

}

function loadEVModule() {
    //added by priyansha for clientside loading of Electric Vehicle Module
    $.ajax({
        type: "POST",
        url: "dashboard.aspx/LoadEVModule",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessEV,
        error: OnErrorEV,

    });
}

function OnSuccessEV(response) {

    var data = response.d;
    setEVDropdown(data);
    $("#Module10").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loder
    $("#electricvehicleLoader").css('display', 'block');
}

function OnErrorEV(response) {

}

//added by priyansha to show dropdown vehicles in Electric Vehicle Module
function setEVDropdown(item) {
    var json = JSON.parse(item);
    $('#ddlElecVehicle').empty();

    if (json.length > 0) {
        for (var i = 0; i < json.length; i++) {
            //$('#ddlElecVehicle').append($("<option></option>").val(json[i].CarImage).html(json[i].CarName).attr({ 'chrrem': json[i].CurrentChargeTime, 'usage': "$" + json[i].CurrentAverage }));
            $('#ddlElecVehicle').append($("<option></option>").val(json[i].ImagePath).html(json[i].Name).attr({ 'chrrem': json[i].CurrentChargeTime, 'usage': "$" + json[i].CurrentAverage }));

        }

        var sindex = $('#hdnselectedindex').val();
        $('#ddlElecVehicle')[0].selectedIndex = sindex;

        $('#lblCurrentPlan').html(json[0].CurrentPlan.toString());
        loadElectricVehicle();

    }
    else {
        $(".VehicalImage,.VehicalStatus").hide();

        //$(".electric-area").html($('#NoEVSelected').text()).css({ "font-size": "18px", color: "#ed8601", top: 61, left: 0, position: 'relative', "text-align": "center" })
        //$(".electric-area").html('<a href="electric-vehicle.aspx">' + $('#NoEVSelected').text() + '</a>').css({ "font-size": "18px", color: "#ed8601", top: 61, left: 0, position: 'relative', "text-align": "center" })
        $(".electric-area").html('' + $('#NoEVSelected_NoEvConfig').text() + '<br/><a href="electric-vehicle.aspx">' + $('#NoEVSelected').text() + '</a>').css({ "font-size": "18px", color: "#ed8601", top: 61, left: 0, position: 'relative', "text-align": "center" })

        // $(".electric-area").html('' + $('#NoEVSelected_NoEvConfig').text() + '<br/> <a href="electric-vehicle.aspx">' + $('#NoEVSelected').text() + '</a>').css({ "font-size": "18px", color: "#ed8601", top: 61, left: 0, position: 'relative', "text-align": "center" })

    }



}

//added by priyansha for loading of account module in dashboard
function loadMyAccountModule() {

    $.ajax({
        type: "POST",
        url: "dashboard.aspx/LoadMyAccountModule",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessMyAcct,
        error: OnErrorMyAcct,

    });


}

function OnSuccessMyAcct(response) {
    var data = response.d;
    setMyAccountData(data)

    $("#Module1").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader//my account
    $("#myAccountLoader").css('display', 'block');

}

function OnErrorMyAcct(response) {
    var data = response.d;
}

// fuctionality added by priyansha 
// it will load defaultpayment card value of myaccount in dashboard
function setMyAccountData(item) {
    var json1 = JSON.parse(item);
    var defaultpaytype = null;
    var defaultpayid = null;
    var defaultaddress = null;
    var hiddenString, i;
    for (i = 0; i < json1.Table.length; i++) {
        if (json1.Table[i]['DefaultAccountNumber'] == json1.Table[i]['AccountNumber']) {
            if (json1.Table[i]['DefaultPayID'] != null) {
                defaultpaytype = json1.Table[i]['DefaultPayType'].toString();
                defaultpayid = json1.Table[i]['DefaultPayID'].toString();
            }
            defaultaddress = json1.Table[0].Properties.toString();
        }
    }
    if (json1.Table1.length > 0) {
        if (defaultpaytype == "1") {
            for (i = 0; i < json1.Table1.length; i++) {
                var dr = json1.Table1[i];
                if (dr['CreditCardId'].toString() == defaultpayid) {
                    var cardType = dr.CardType.toString();
                    var cardnumber = dr.Cardnumber.toString();
                    hiddenString = padLeft(cardnumber);
                    var expiryDate = dr.ExpiryDate.toString();
                    $(".lblDefaultCard").html(cardType + "," + hiddenString + "," + expiryDate);
                }
            }
        }
        else if (defaultpaytype == "2") {
            for (i = 0; i < json1.Table3.length; i++) {
                var dr = json1.Table3[i];
                if (dr['BankAccountID'].toString() == defaultpayid) {
                    var bankname = dr.BankName.toString();
                    var bankacountnumber = dr.BankAccount.toString();
                    hiddenString = padLeft(bankacountnumber);
                    $(".lblDefaultCard").html(bankname + "," + hiddenString);
                }
            }
        }

        if ($(".lblDefaultCard").text() == "") {
            //$(".lblDefaultCard").html("No default card/bank account has been selected");
            $(".lblDefaultCard").html($('#ML_Msg_CardDtls_NoDeflt').text());
            
        }
    }
}

function padLeft(str) {
    var sub = "";
    var substr = str.substring(str.length - 4);
    for (i = 0; i < str.length - 4; i++) {
        sub = sub + str[i].replace(str[i], "*");
    }
    return sub + substr;

}

//added by lalit yadav 7 october 2015 to load compare module client side
function loadCompareData(fnResponses, unit) {
    var JSONDoc = $.parseJSON(fnResponses.d);
    var Table = JSONDoc.Table;
    var Table1 = JSONDoc.Table1;
    var Table2 = JSONDoc.Table2;
    var Table3 = JSONDoc.Table3;

    var current = Table[Table.length - 1]["Consumed"];
    var previous = Table1[Table1.length - 1]["Consumed"];
    var utility = Table2[Table2.length - 1]["Consumed"];
    var zip = Table3[Table3.length - 1]["Consumed"];
    var diffPerCurrent = (((previous - current) * 100) / previous);

    if ($('#hdnCompareMe').val() == "True") {
        var strTextCurrent = "";
        if (diffPerCurrent != 0) {
            strTextCurrent = (Math.abs(diffPerCurrent).toFixed(0) + '% ' + (current < previous ? $('#LessUsage').text() : $('#MoreUsage').text()));
        }
        else {
            strTextCurrent = "Usage is equal";
        }
        var perMe = current < previous ? 100 - diffPerCurrent : 100;
        var perPrev = current < previous ? 100 : 100 - diffPerCurrent;

        $(".divCompareSpendingPrev").html("");
        $(".divCompareSpendingPrev").html("<strong><span>" + strTextCurrent + "</span></strong>"
                                        + "<i>" + $('#CheckPrevMnth').text() + "</i>"
                                        + "<div class='compare_section'>"
                                        + "<div title='" + current + unit + " ' style='height:" + perMe + "%;' class='" + "green_compare" + "' ></div>"
                                        + "<div title='" + previous + unit + " ' style='height:" + perPrev + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                        + "</div>");
    }
    // Utility

    if ($('#hdnCompareUtility').val() == "True") {

        var diffPerUtility = (((utility - current) * 100) / utility);
        var strTextUtility = "";
        if (diffPerUtility != 0) {
            strTextUtility = (Math.abs(diffPerUtility).toFixed(0) + '% ' + (current < utility ? "Less Usage" : "More Usage"));
        }
        else {
            strTextUtility = "Usage is equal";
        }

        perMe = current < utility ? 100 - diffPerUtility : 100;
        var perUtility = current < utility ? 100 : 100 - diffPerUtility;
        $(".divCompareSpendingUtl").html(NoCompareDiv);
        $(".divCompareSpendingUtl").html("<strong><span>" + strTextUtility + "</span></strong>"
                                        + "<i>" + $('#CompNeighbourhood').text() + "</i>"
                                        + "<div class='compare_section'>"
                                        + "<div title='" + current + unit + " ' style='height:" + perMe + "%;'  class='" + "green_compare" + "' ></div>"
                                        + "<div title='" + utility + unit + "' style='height:" + perUtility + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                        + "</div>");
    }

    // Zip

    if ($('#hdnCompareZip').val() == "True") {

        var diffPerZip = (((current - zip) * 100) / zip);
        var strTextZip = "";
        if (diffPerZip != 0) {
            strTextZip = (Math.abs(diffPerZip).toFixed(0) + '% ' + (current < zip ? "Less Usage" : "More Usage"));
        }
        else {
            strTextZip = "Usage is equal";
        }
        perMe = current < zip ? 100 - diffPerZip : 100;
        var perZip = current < zip ? 100 : 100 - diffPerZip;
        $(".divCompareSpendingZip").html(NoCompareDiv);
        $(".divCompareSpendingZip").html("<strong><span>" + strTextZip + "</span></strong>"
                                        + "<i>" + $('#CompZip').text() + "</i>"
                                        + "<div class='compare_section'>"
                                        + "<div title='" + current + unit + " ' style='height:" + perMe + "%;'  class='" + "green_compare" + "' ></div>"
                                        + "<div  title='" + zip + unit + " ' style='height:" + perZip + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                        + "</div>");

    }
}

// added by priyansha for loading of noification widget in Dashboard
function loadNotificationDashboardModule() {


    $.ajax({
        type: "POST",
        url: "dashboard.aspx/LoadNotificationUserControl",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessNotification,
        error: OnErrorNotification,

    });


}

function OnSuccessNotification(response) {

    var data = response.d;
    var json = JSON.parse(data);
    if (json.length > 0) {
        //adding text  in Notification labels
        for (var i = 0; i < json.length; i++) {
            switch (json[i]['PlaceHolderId']) {
                case "1":
                    $('#lblnotificationcount').text(json[i].UnreadStatus);
                    $('#lblnotificationcount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction");
                    break;
                case "13":
                    $('#lblleakalertCount').text(json[i].UnreadStatus);
                    $('#lblleakalertCount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction");
                    break;
                case "5":
                    $('#lbldrCount').text(json[i].UnreadStatus);
                    $('#lbldrCount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction");
                    break;
                case "4":
                    $('#lblBillingNotCount').text(json[i].UnreadStatus);
                    $('#lblBillingNotCount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction");
                    break;
                case "3":
                    $('#lblServiceNotCount').text(json[i].UnreadStatus);
                    $('#lblServiceNotCount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction");
                    break;
                case "2":
                    $('#lblconnectmeNotCount').text(json[i].UnreadStatus);
                    $('#lblconnectmeNotCount').addClass(Number(json[i].UnreadStatus) > 0 ? "get_notifiction" : "no_notifiction")
                    break;
                default:
                    break;
            }
        }

        $("#Module6").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
        $("#notificationLoader").css('display', 'block');
    }

}

function OnErrorNotification(response) {
    // console.log(response.d);
    // alert("Error Notification");

}

function OnError() {
    $("#moduleUsages").removeClass("preLoader");
    $('.usageconsumption').hide();
    $('#divNoDataUsage').show();
    $("#usageLoader").css('display', 'block');

}

//added by lalit yadav for bill dashbord client side on 9 october 2015
function LoadBillDashBordModule() {
    $.ajax({
        type: "POST",
        url: "BillDashboard.aspx/LoadBilling",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function OnSuccess(response) {
            var JSONDoc = (response.d);
            var table = JSONDoc;
            if (table != null) {//JSONDoc[0].length > 0

                if ($('#hdnPrePaid').val() == "Prepaid") {
                    $("#lblTotalPayableAmount").text("$" + Math.abs(table.ToTalBalance));
                    $("#lblTotalPayableAmount").css('color', 'black');
                }
                else {

                    var Remainingamount = table.ToTalBalance;
                    var tt = Remainingamount.replace('CR', '');
                    var totalamount = tt;//table[21]["Value"];
                    var roundAmount = Math.round(Number(totalamount));

                    if (Number(totalamount) == 0) {
                        $("#lblTotalPayableAmount").text($("#NoBillingAmountTxt").text());
                        $("#lblTotalPayableAmount").css({ 'color': '#000000', 'font-size': '16px', 'margin-top': '15px', 'margin-bottom': '30px' });

                        $("#dueDateData").hide();
                        $("#balance_due").hide();


                    }
                    else {
                        if (Remainingamount.toLowerCase().indexOf("cr") >= 0) {

                            $("#lblTotalPayableAmount").text("$" + Remainingamount);
                        }

                        if (Remainingamount.toLowerCase().indexOf("cr") < 0) {
                            $("#lblTotalPayableAmount").text("$" + Remainingamount);

                        }
                    }

                    //BillingUserControl_lblTotalPayableAmount
                    var date1 = new Date(table.BillDue);
                    var billDueDate = getMonthName(date1.getMonth() + 1) + ' ' + date1.getDate() + ', ' + date1.getFullYear();

                    $('#lblDueDate').text(billDueDate);
                    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    var dateNow = new Date();
                    billDueDate = new Date(table.BillDue);
                    var datediff = Math.round(Math.abs((dateNow.getTime() - billDueDate.getTime()) / (oneDay)));

                    if (Remainingamount.toLowerCase().indexOf("cr") >= 0) {
                        $("#lblTotalPayableAmount").css('color', 'green');
                        $("#dueDateData").hide();
                        $("#balance_due").hide();
                    } else {

                        $("#lblTotalPayableAmount").css('color', 'red');
                        if (Number(totalamount) == 0) {

                            $("#dueDateData").hide();
                            $("#balance_due").hide();
                        } else {
                            $("#dueDateData").show();
                            $("#balance_due").show();
                        }
                    }
                }

            }
            // In water we do not have Pre Paid
            /*
            if ($("#lblTotalPayableAmount").text() == 'N/a') {
                if ($('#hdnPrePaid').val() == "Prepaid") {
                    $('#BtnRecharge').show();
                }
                else {
                    $('#BtnPayBill').hide();
                }
            }
            else {
                $('.pay_bill').show();
            } */
            $("#Module2").removeClass("preLoader");//added by lalit yadav 12 oct loder
            $("#billingLoader").css('display', 'block');

        },
        error: OnErrorBi,
    });
}
function OnErrorBi(response) { }