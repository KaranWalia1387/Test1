var powerrange;
var waterrange;
var lowRange;
var highRange;
var gasrange;
var Type = 'D', Usagemode = '';
var usagewidth = '';
var currentUnitmode = '';
var currentDurationmode = '';
var previousUnitmode = '';
var previousDurationmode = '';
var highcolor = '';//'#c56e6e';
var lowcolor = '';//'#7cab92';
var avgcolor = '';//'#d39d76';
var NoCompareDiv = '';
var highlow = '';
var Meternum = "";
var IsAMIStatus = "";
var AccountNumber = "";
var isami = "";
var ExcelSeasonID = 0;
var usageyear = '';
var mainTitle = '';
var CurrentUsage = 0;
var EstimatedUsage = 0;
var HeaderData;

$(document).ready(function () {
    $('#hdnUsage_date').text(setDate());
    var url1 = $('#hdnCommonUrl').val() + "/AdminReports/Dashboard.aspx/BindColorCodes";
    $.ajax({
        type: "POST",
        url: url1,
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
                    else if (result.Table[i].ConfigOption == 'WaterAllocation') {
                        WaterColor = result.Table[i].ConfigValue;
                        $('.GraphLegend_Usage').css({ "background-color": WaterColor });
                    }
                    else if (result.Table[i].ConfigOption == 'Mid') {
                        avgcolor = result.Table[i].ConfigValue;
                        $('.GraphLegend_Avg').css({ "background-color": avgcolor });
                    }
                    else if (result.Table[i].ConfigOption == 'Low') {
                        lowcolor = result.Table[i].ConfigValue;
                        $('.GraphLegend_low').css({ "background-color": lowcolor });
                    }
                    else if (result.Table[i].ConfigOption == 'SolarGeneration') {
                        SolarColor = result.Table[i].ConfigValue;
                    }
                }
            }

        },
        error: function (request, status, error) {
           // alert('Error!! ' + request.);
        }
    });
    $("#duarationmode li a").click(function () {
        try {
            currentDurationmode = $(this).attr('mode');
            $("#duarationmode li a").removeClass('active');
            $("#duarationmode li a[mode='" + currentDurationmode + "']").addClass('active');
            previousDurationmode = currentDurationmode;
            duration = $(this).attr('mode');
            if (duration == 'H' || duration == 'D' || duration == "MI") {
                $("#divCalender").css('display', 'inline');
            }
            else {
                $("#divCalender").css('display', 'none');
            }
            ExcelSeasonID = 0; usageyear = '';
            var usagetyp = $("#usagetypepopup").val();
            switch (usagetyp) {
                case 'W':
                    {
                        loadWaterusage(getuntitype(), duration, setDate());
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
            var usagetyp = $("#usagetypepopup").val();
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

    $("#ddlMultiMeter").change(function () {
        loader.showloader();
        var usagetyp = $('#usagetypepopup').val();
        $("#unitmode li a").removeClass('active');
        $("#duarationmode li a").removeClass('active');
        Meternum = $('#ddlMultiMeter').val();
        BindUsageType(usagetyp);
    });

    $("#usagetypepopup").change(function () {
        var usagetyp = $(this).val();
        BindMultimeter(usagetyp);
    });

    $('#ddlAddress').change(function () {
        BindMultimeter($("#usagetypepopup").val());
    });

    $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
        $('#hdnTitle').val(mainTitle);
        $('#hdnGetExportValue').val('1');
        if (processed_json.length != 0) {
            return true;
        }
        else {
            e.preventDefault();
        }

    });

    $(document).on("click", "#UsageDiv", function () {
        try {
            processed_json = [];
            loader.showloader();
            AccountNumber = $('#ddlAddress option:selected').val();
            powerrange = Customer.LoadRange(AccountNumber).value;
            waterrange = Customer.LoadWaterRange(AccountNumber).value;
            gasrange = Customer.LoadRange(AccountNumber).value;
            $('.usageconsumption').width(($('.popup_area').width() * .98) + 'px');
            $('.usageconsumption').height(($('.popup_area').height() - 320) + 'px');
            $("#lblCurrentUsageH").hide();
            $("#lblEstimatedUsageH").hide();
            $("#lblUnitThisMonth").hide();
            $("#lblUnitPrediction").hide();

            if ($("#hdnMeterTypePower").val() == "False") {
                $("#usagetypepopup  option[value='E']").remove();
            }
            else {
                if ($("#hdnPU").val() == "0")
                    $("#usagetypepopup  option[value='E']").remove();
                else
                    $("#usagetypepopup  option[value='E']").show();
            }

            if ($("#hdnMeterTypeWater").val() == "False") {
                $("#usagetypepopup  option[value='W']").remove();
            }
            else {
                if ($("#hdnWU").val() == "0")
                    $("#usagetypepopup  option[value='W']").remove();
                else
                    $("#usagetypepopup  option[value='W']").show();
            }

            if ($("#hdnMeterTypeGas").val() == "False") {
                $("#usagetypepopup  option[value='G']").remove();
            }
            else {
                if ($("#hdnGU").val() == "0")
                    $("#usagetypepopup  option[value='G']").remove();
                else
                    $("#usagetypepopup  option[value='G']").show();
            }

            currentDurationmode = 'M';
            previousDurationmode = 'D';
            if (currentDurationmode != previousDurationmode) {
                $("#duarationmode li a").removeClass('active');
                $("#duarationmode li a[mode='" + currentDurationmode + "']").addClass('active');
                previousDurationmode = currentDurationmode;
                duration = 'M';
            }
            BindHeaderValues();

        }
        catch (e) {
            console.log(e.message);
        }
    });
    
});

function BindHeaderValues() {
    var param = { AccountNumber: $('#ddlAddress option:selected').val() };
    var url1 = $('#hdnCommonUrl').val() + "/UserManagement/customer.aspx/BindHeaderValues";
    $.ajax({
        type: "POST",
        url: url1,//"../UserManagement/customer.aspx/BindHeaderValues",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            var data = $.parseJSON(data.d);
            HeaderData = data.Table[0];
            BindMultimeter($('#usagetypepopup').val());

        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

function BindUsageType(usagetyp) {

    switch (usagetyp) {
        case 'W':
            {
                $('#duarationmode li a[mode="MI"]').hide();
                setWaterModule();
                getduration(usagetyp);
                $("#aUsageElectrickWh").attr('mode', 'W');
                $('.usageconsumption').attr('id', 'divWaterUsage');
                loadRange(getuntitype(), duration, "W", waterrange);
                //loadwaterdata(getuntitype());
                loadWaterusage(getuntitype(), duration, '');
            }
            break;
        case 'E':
            {
                $('#aUsageWaterGl').hide();
                setPowerModule();
                getduration(usagetyp);
                $("#aUsageElectrickWh").attr('mode', 'K');
                $('.usageconsumption').attr('id', 'divElectricityUsage');
                loadRange(getuntitype(), duration, "E", powerrange);
                //loadpowerdata(getuntitype());
                loadpowerusage(getuntitype(), duration, '');
                // loadPowerUsageAjax(getuntitype(), duration)
            }
            break;
        case 'G':
            {
                $('#duarationmode li a[mode="MI"]').hide();
                $('#aUsageWaterGl').hide();
                setGasModule();
                getduration(usagetyp);
                $("#aUsageElectrickWh").attr('mode', 'C');
                $('.usageconsumption').attr('id', 'divGasUsage');
                loadRange(getuntitype(), duration, "G", gasrange);
                //loadgasdata(getuntitype());
                loadGasUsage(getuntitype(), duration, '');
            }
            break;
    }
}

//Changes done for Multimeter for dropdown
// for binding multimeter
function BindMultimeter(usagetyp) {

    var param = { MeterType: usagetyp, AccountNumber: $('#ddlAddress option:selected').val() };
    var url1 = $('#hdnCommonUrl').val() + "/UserManagement/customer.aspx/BindMultiMeter";
    $.ajax({
        type: "POST",
        url: url1,// "../UserManagement/customer.aspx/BindMultiMeter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            $("#ddlMultiMeter").empty();
            var ddlvalue = $.parseJSON(data.d);
            IsAMIStatus = ddlvalue.Table1[0]["IsNonAMI"];
            $("#ddlMultiMeter").append($("<option></option>").val('').html('All')).attr("Isami", "");
            $.each(ddlvalue.Table, function () {
                $("#ddlMultiMeter").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
            });
            usageyear = '';
            $("#unitmode li a").removeClass('active');
            $("#duarationmode li a").removeClass('active');
            Meternum = "";
            BindUsageType($('#usagetypepopup').val());
            loader.hideloader();
        },
        error: function () {
            alert("Error");
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
    }
    catch (e) {
        console.log(e.message);
    }
}

function setdailyhighest(mode, unit, usagearray) {
    try {

        var UsageType = $('#usagetypepopup').val();
        getCurrentHeader(UsageType);
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
        //Set Legend Values
        $('.GraphLegend_WaterAlloc').css('display', 'none');
        $('.GraphLegend_data_WaterAlloc').css('display', 'none');
        if (UsageType == 'W') {
            $('#AvgUsage').css('display', 'none');
            $('.GraphLegend_Avg').css('display', 'none');
            $('#LowUsage').css('display', 'none');
            $('.GraphLegend_low').css('display', 'none');
            $('#LUsage').css('display', 'block');
            $('.GraphLegend_Usage').css('display', 'block');
            if (unit == "D") {
                $('#HighUsage').css('display', 'none');
                $('.GraphLegend_Usage').css('background-color', '#31afdb');
                $('.GraphLegend_High').css('display', 'none');
            }
            else {
                $('#HighUsage').css('display', 'block');
                $('.GraphLegend_High').css('display', 'block');
                $('.GraphLegend_Usage').css('background-color', lowcolor); //'#7cab92');
            }
        }
        else {
            $('#AvgUsage').css('display', 'block');
            $('.GraphLegend_Avg').css('display', 'block');
            $('#LowUsage').css('display', 'block');
            $('.GraphLegend_low').css('display', 'block');
            $('#LUsage').css('display', 'none');
            $('.GraphLegend_Usage').css('display', 'none');

        }

        $('#averagevaltext').text(avftext);
        $('#averagevaltext').attr("title", titleText);
        $('#ModeText').text(modetext);
        $('#ModeText').attr("title", modetextTitle);



        if (UsageType == 'S') {
            $('#GenDivUsage').css("display", "none");
            $('#WaterDiv').css("display", "block");
            $('#GenrationMode').show();
            $('#UsagesID').hide();
            $('.rateid').hide();
            $(".currency_1").hide();
            $('#GenrationMode ul li a').removeClass("active");
            var currmode = $('#hdnMode').val();
            if (currmode == 'L')
                $('#GenrationMode a[mode=L]').addClass("active");
            else
                $('#GenrationMode a[mode=N]').addClass("active");
        }
        else {
            $('#GenrationMode').hide();
            $('#UsagesID').css('display', 'inline');
            $('.rateid').show();
            $(".currency_1").show();
            $('#GenDivUsage').css("display", "block");
            $('#WaterDiv').css("display", "none");
        }

        if (CustomerType == "Commercial" && UsageType == "E") {
            $("#soFarUsage").hide();
            $("#projectedUsage").hide();
            $('#MaxDemand').css('display', 'block');
            $('#LoadFactor').css('display', 'block');
        }
        else {
            $("#projectedUsage").show();
            $("#soFarUsage").show();
            $('#MaxDemand').css('display', 'none');
            $('#LoadFactor').css('display', 'none');
        }

        //For error handling
        if (HeaderData) {
            $("#hdnMaxDemandkwh").val(HeaderData["PeakLoadKWH"]);
            $("#hdnLoadKwh").val(HeaderData["LoadFactorKWH"]);
            $("#hdnMaxDemandDollar").val(HeaderData["PeakLoadDollar"]);
            $("#hdnLoadDollar").val(HeaderData["LoadFactorDollar"]);
        }

        var usage = "";
        if (UsageType == "E") usage = "Power";
        else if (UsageType == "W") usage = "Water";
        else if (UsageType == "G") usage = "Gas";
        else usage = "Solar";

        if (UsageType != 'S') {
            if (unittext == 'kWh' || unittext == 'HCF' || unittext == 'CCF' || unittext == 'Gal') {
                $("#highestval").text(changetoK(maxval) + " " + unittext);
                $("#averageval").text(changetoK(avgvalue) + " " + unittext);

                if (HeaderData) {
                    CurrentUsage = (HeaderData[usage + "UnitUsageSoFar"] * 748);
                    EstimatedUsage = (HeaderData[usage + "UnitExpectedUsage"] * 748);
                }


                if (unittext == 'Gal' || unittext == 'HCF') {
                    $("#lblCurrentUsage").text(changetoK(CurrentUsage) + " " + unittext);
                    $("#lblEstimatedUsage").text(changetoK(EstimatedUsage) + " " + unittext);
                }
                else {

                    if (HeaderData) {
                        $("#lblCurrentUsage").text(changetoK(parseFloat(HeaderData[usage + "UnitUsageSoFar"])) + " " + unittext);
                        $("#lblEstimatedUsage").text(changetoK(parseFloat(HeaderData[usage + "UnitExpectedUsage"])) + " " + unittext);
                    }

                    if (unittext == 'kWh') {
                        $("#lblMaxDemand").text(changetoK(parseFloat($("#hdnMaxDemandkwh").val())) + " " + unittext);
                        $("#lblLoadFactor").text(parseFloat($("#hdnLoadKwh").val()) + "%");
                    }
                }

            }
            else {
                $("#highestval").text(unittext + changetoK(maxval));
                $("#averageval").text(unittext + changetoK(avgvalue));

                if (HeaderData) {
                    $("#lblCurrentUsage").text(unittext + changetoK(parseFloat(HeaderData[usage + "UsageSoFar"])));
                    $("#lblEstimatedUsage").text(unittext + changetoK(parseFloat(HeaderData[usage + "ExpectedUsage"])));
                }


                $("#lblMaxDemand").text(unittext + changetoK(parseFloat($("#hdnMaxDemandDollar").val())));
                $("#lblLoadFactor").text(parseFloat($("#hdnLoadDollar").val()) + "%");
            }
        }
        else {
            if (unittext == 'kWh' || unittext == 'HCF' || unittext == 'CCF' || unittext == 'Gal') {
                $("#highestvalue").text(changetoK(maxval) + " " + unittext);
                $("#averagevalue").text(changetoK(avgvalue) + " " + unittext);

                if (HeaderData) {
                    $("#lblCurrentUsages").text(changetoK(parseFloat(HeaderData[usage + "UnitUsageSoFar"])) + " " + unittext);
                    $("#lblEstimatedUsages").text(changetoK(parseFloat(HeaderData[usage + "UnitExpectedUsage"])) + " " + unittext);
                }
            }
            else {
                $("#highestvalue").text(unittext + changetoK(maxval));
                $("#averagevalue").text(unittext + changetoK(avgvalue));

                if (HeaderData) {
                    $("#lblCurrentUsages").text(unittext + changetoK(parseFloat(HeaderData[usage + "UsageSoFar"])));
                    $("#lblEstimatedUsages").text(unittext + changetoK(parseFloat(HeaderData[usage + "ExpectedUsage"])));
                }
            }
        }
        if ((mode == 'M' || mode == 'B') && (unit == 'K' || unit == 'C' | unit == 'W' || unit == 'G')) {

            if (HeaderData) {
                var currUsage = HeaderData[usage + "UnitUsageSoFar"];
                var estUsage = HeaderData[usage + "UnitExpectedUsage"];
            }
            getColorForLabel(currUsage, estUsage);
        }
        else if ((mode == 'M' || mode == 'B') && unit == 'D') {
            if (HeaderData) {
                var currUsage = HeaderData[usage + "UsageSoFar"];
                var estUsage = HeaderData[usage + "ExpectedUsage"];
            }
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
        setheaderwidth();

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

function setheaderwidth() {
    var i = 0;
    var monthlyavg = $('#monthlyAvg').css("display") == "block" ? 1 : 0;
    var highestyear = $('#highestyear').css("display") == "block" ? 1 : 0;
    var soFarUsage = $('#soFarUsage').css("display") == "block" ? 1 : 0;
    var projectedUsage = $('#projectedUsage').css("display") == "block" ? 1 : 0;
    var loadfactor = $('#LoadFactor').css("display") == "block" ? 1 : 0;
    var MaxDemand = $('#MaxDemand').css("display") == "block" ? 1 : 0;

    var count = monthlyavg + highestyear + soFarUsage + projectedUsage + loadfactor + MaxDemand;
    switch (count) {
        case 1: $('#GenDivUsage ul li').css('width', '100%');
            break;
        case 2: $('#GenDivUsage ul li').css('width', '50%');
            break;
        case 3: $('#GenDivUsage ul li').css('width', '33.3%');
            break;
        case 4: $('#GenDivUsage ul li').css('width', '25%');
            break;

    }
}

function setcolor(usagevalue, highlow) {
    var color = '#FFFFFF';
    if ($("#usagetypepopup").val() != 'W') {
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
        if (Type != "D") {
            if (highlow == '2') {
                color = highcolor;
            }
            else {
                color = lowcolor;
            }
            return color;
        }
        else {
            color = "#31afdb";
            return color;
        }
    }

}
function BindheighDashboard(type, id, value, yaxislabel) {
    var setdrilldownonAMI = isami == "false" ? (duration == "S" ? true : false) : (IsAMIStatus == true && isami == undefined ? (duration == "S" ? true : false) : true);
    if (processed_json.length > 0) {
        $('#' + id).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: title,
                style: {
                    color: '#F00',
                    font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
                }
            },
            yAxis: [{
                //min: 0,
                maxPadding: 0.09,
                title: {
                    text: '',
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'red',
                        fontSize: '5px'
                    }
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
            },
             { // Secondary yAxis
                 //min: 0,
                 title: {
                     text: '',
                     style: {
                         color: Highcharts.getOptions().colors[0]
                     }
                 },
                 labels: {
                     formatter: function () {
                         return this.value;
                     }
                 },
                 opposite: true
             }],
            xAxis: {
                labels: {
                    rotation: -45,
                    style: {
                        color: '#333333',
                        margin: "-20px",
                        fontSize: '10px',
                    }
                },
                type: "category",
                name: 'Customer Count',
                title: {
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '3px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            },
            plotOptions: {


                series: {
                    dataLabels: {
                        //crop: true,
                        // stacking: 'normal',
                        align: 'top',
                        rotation: -90,
                        x: 4,
                        //inside: true,
                        enabled: false,
                        formatter: function () {
                            if (this.y === 0) {
                                return null;
                            }
                            if (value == 'absolute')
                                return this.y;
                            else
                                return Highcharts.numberFormat(this.y, 2);
                        },
                        style: {
                            color: 'black',
                            fontSize: '10px'
                        }
                    },
                    point: {
                        cursor: 'pointer',
                        events: {
                            click: function () {
                                if (this.series.name != "Temperature") {//Added by khushbu kansal to disable drilldown on weather
                                   if (setdrilldownonAMI == true) {
                                       if (duration != 'B') {
                                            chart_click(this);
                                       }
                                    }
                               }
                           }
                        }
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    if (this.point.title == 'Allocation') {
                        return '<div><div><b>Units Allocated: </b>' + changetoK(this.y);
                    }
                    if (value == 'absolute')
                        return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + this.y;
                    else {
                        if (yaxislabel == '$') {
                            return yaxislabel + changetoK(this.y)
                        }
                        else
                            return changetoK(this.y) + ' ' + yaxislabel;
                    }
                }
            },
            series: [{
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                colorByPoint: (showcolors && (type == 'column'))


            }
            , {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                data: processed_jsonAllocation,
                color: "#31afdb",
                dashStyle: 'shortdash',
            }
            , {
                yAxis: 1,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                type: 'line',
                data: processed_jsonOnDemand,
                color: "#31afdb",
                dashStyle: 'shortdash',
                opposite: true
            }
            ]

        });
    }
}
function chart_click(x) {
    try {
        previousDurationmode = duration;
        if (duration == 'S1') {
            duration = getNextActiveMode("M");
        }
        else if (duration == 'MI') {
            return false;
        }
        else if (duration == 'H' && $("#usagetypepopup").val() == "E") {
            duration = getNextActiveMode("H");
        }
        else if (duration == 'H') {
            return false;
        }
        else if (duration == 'Y') {
            duration = 'M';
        }
        else if (duration == 'M') {
            duration = getNextActiveMode('M');

        }
        else if (duration == 'D') {
            duration = getNextActiveMode('D');
        }
        else if (duration == 'S') {
            seasonId = x.id;
            ExcelSeasonID = x.id;
            duration = getNextActiveMode("S");
            usageyear = x.year;

        }
        if (previousDurationmode != duration) {
            if (duration == 'S1') Usagemode = 'S';
            else Usagemode = duration;

            if (duration == 'H' || duration == 'D' || duration == "MI") {
                $("#divCalender").css('display', 'inline');
            }
            else {
                $("#divCalender").css('display', 'none');
            }

            switch ($('#usagetypepopup').val()) {
                case 'E':
                    loadpowerusage(getuntitype(), Usagemode);
                    break;
                case 'W':

                    if (Usagemode == 'H') {
                        loadWaterusage(getuntitype(), Usagemode, x.year);
                    }
                    else {
                        if (Usagemode == 'D') {
                            if (x.month) {
                                var strDate = (x.month < 10 ? "0" + x.month : x.month) + "/" + x.year;
                                loadWaterusage(getuntitype(), Usagemode, strDate);
                            }
                            else {
                                loadWaterusage(getuntitype(), Usagemode);
                            }
                        }
                        else {
                            loadWaterusage(getuntitype(), Usagemode);
                        }
                    }
                    break;
                case 'G':
                    loadGasUsage(getuntitype(), Usagemode);
                    break;

            }

            setImages();
        }
    }
    catch (ex) { }
}

function setDate() {
    // z = $(date).attr('value');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

// this function help in loading of graph of power usage in dashboard Usage widget
function loadpowerusage(Type, mode, strDate) {
    try {

        var url = "../UserManagement/customer.aspx/LoadUsageAjax";
        var hourlyType = "H";

        isami = $("#ddlMultiMeter option:selected").attr('Isami');
        if (isami == "false") {
            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            $('#duarationmode li a[mode="MI"]').hide();
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
                $('#duarationmode li a[mode="MI"]').hide();
                $('#duarationmode li a[mode="' + mode + '"]').addClass('active');

            }
            else {
                if ($("#hdnPUMonthly").val() != "0") {
                    $('#duarationmode li a[mode="H"]').show();
                }
                if ($("#hdnPUDaily").val() != "0") {
                    $('#duarationmode li a[mode="D"]').show();
                }
                if ($("#hdnPU15Min").val() != "0") {
                    $('#duarationmode li a[mode="MI"]').show();
                }
            }
        }
        $('#hdnExportKey').val('E' + '|' + '1' + '|' + Type + '|' + mode + '|' + (strDate == undefined ? "" : strDate) + '|' + hourlyType + '|' + ExcelSeasonID + '|' + 0 + '|' + usageyear + '|' + Meternum + '|' + $('#ddlAddress option:selected').val() + '|' + $('#ddlAddress option:selected').text());
        var parameter = "{UsageOrGeneration:'1',Type:'" + Type + "', Mode:'" + mode + "',strDate:'" + (strDate == undefined ? "" : strDate) + "',hourlyType:'" + hourlyType + "',SeasonId:'" + ExcelSeasonID + "',weatherOverlay:'0',usageyear:'" + usageyear + "',MeterNumber:'" + Meternum + "',AccountNumber:'" + $('#ddlAddress option:selected').val() + "'}";
        var url1 = $('#hdnCommonUrl').val() + "/UserManagement/customer.aspx/LoadUsageAjax";
        $.ajax({
            type: "POST",
            url: url1,// "../UserManagement/customer.aspx/LoadUsageAjax",
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
            LoadUsageDatainChart(usageData, mode, yaxis, Type);
        }
        else {
            $('.usageconsumption').hide();
            $('#divNoDataUsage').show();

        }
    }


    catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        console.log(e.message);
    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoaderPopup").css('display', 'block');
}

// this function help in loading of graph of gas usage in dashboard Usage widget
function loadGasUsage(Type, mode, strDate) {
    try {
        //Changes done for Multimeter for AMI or NON-AMI
        isami = $("#ddlMultiMeter option:selected").attr('Isami');
        var hourlyType = "H";
        if (isami == "false") {
            $('#duarationmode li a').removeClass('active');
            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            if ($("#hdnGUMonthly").val() != "0") {
                duration = 'M';
                $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
            }
            else {
                duration = 'S';
                $('#duarationmode li a[mode="' + duration + '"]').addClass('active');
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
        $('#hdnExportKey').val('G' + '|' + '' + '|' + Type + '|' + mode + '|' + (strDate == undefined ? "" : strDate) + '|' + hourlyType + '|' + ExcelSeasonID + '|' + 0 + '|' + usageyear + '|' + Meternum + '|' + $('#ddlAddress option:selected').val() + '|' + $('#ddlAddress option:selected').text());
        // var url = "../UserManagement/customer.aspx/LoadGasUsageAjax";
        var hourlyType = duration.toString() == "H" ? "F" : "";
        var parameter = "{Type:'" + Type + "', Mode:'" + mode + "',strDate:'" + (strDate == undefined ? "" : strDate) + "',hourlyType:'" + hourlyType + "',seasonId:'" + ExcelSeasonID + "',weatherOverlay:'',usageyear:'" + usageyear + "',MeterNumber:'" + Meternum + "',AccountNumber:'" + $('#ddlAddress option:selected').val() + "'}";
        var url1 = $('#hdnCommonUrl').val() + "/UserManagement/customer.aspx/LoadGasUsageAjax";
        $.ajax({
            type: "POST",
            url: url1,
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
            LoadUsageDatainChart(usageData, mode, yaxis, Type);
        }
    } catch (e) {
        $('.usageconsumption').hide();
        $('#divNoDataUsage').show();
        console.log(e.message);
    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoaderPopup").css('display', 'block');
}

// this function help in loading of graph of water usage in dashboard Usage widget
function loadWaterusage(Type, mode, strDate) {
    try {
        if (strDate == '' || strDate == undefined)
        {
            strDate = $('#hdnUsage_date').text();
        }
        else
        {
            $('#hdnUsage_date').text(strDate);
        }
        // var url = "../UserManagement/customer.aspx/LoadWaterUsageAjax";
        var hourlyType = "H";
        //Changes done for Multimeter for AMI or NON-AMI
        isami = $("#ddlMultiMeterWater option:selected").attr('Isami');
        if (isami == "False") {
            $('#duarationmode li a').removeClass('active');
            $('#duarationmode li a[mode="H"]').hide();
            $('#duarationmode li a[mode="D"]').hide();
            $('#duarationmode li a[mode="' + mode + '"]').addClass('active');

        }
        else {
            if (IsAMIStatus == true && $("#ddlMultiMeter option:selected").text() == "All") {
                $('#duarationmode li a').removeClass('active');
                $('#duarationmode li a[mode="H"]').hide();
                $('#duarationmode li a[mode="D"]').hide();
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
        $('#hdnExportKey').val('W' + '|' + '' + '|' + Type + '|' + mode + '|' + (strDate == undefined ? "" : strDate) + '|' + hourlyType + '|' + ExcelSeasonID + '|' + 0 + '|' + usageyear + '|' + Meternum + '|' + $('#ddlAddress option:selected').val() + '|' + $('#ddlAddress option:selected').text());
        var parameter = "{Type:'" + Type + "',Mode:'" + mode + "',strDate:'" + (strDate == undefined ? "" : strDate) + "',hourlyType:'" + hourlyType + "',weatherOverlay:'0',seasonId:'" + ExcelSeasonID + "',usageyear:'" + usageyear + "',MeterNumber:'" + Meternum + "',AccountNumber:'" + $('#ddlAddress option:selected').val() + "'}";
        //LoadAjax(url, parameter, OnSuccessWaterUsage, OnError);
        var url1 = $('#hdnCommonUrl').val() + "/UserManagement/customer.aspx/LoadWaterUsageAjax";
        $.ajax({
            type: "POST",
            url: url1,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    OnSuccessWaterUsage(response, Type, mode, strDate);
                },
            error: OnError,

        });
    } catch (e) {
        console.log(e.message);
    }

}

function OnSuccessWaterUsage(response, Type, mode, strDate) {
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
            LoadUsageDatainChart(usageData, mode, yaxis, Type);
        }
        else {
            $('.usageconsumption').hide();
            $('#divNoDataUsage').show();
            loader.hideloader();
            if(strDate != undefined)
            {
                mainTitle = '';
                if (mode == 'H') {
                    mainTitle = "Hourly Usage For" + ' ' + strDate;
                }
                else if (mode == 'D')
                {
                    var arr = strDate.split('/')
                    if (arr.length == 2) {
                        mainTitle = 'Period:' + ' ' + new Date(new Date(arr[1], arr[0] - 1, 1)).toLocaleDateString() + " To " + new Date(new Date(arr[1], arr[0], 0)).toLocaleDateString();
                    }
                    else
                    {
                        mainTitle = ('Period: ' + new Date(new Date(strDate) - (30 * 24 * 60 * 60 * 1000)).toLocaleDateString() + " To " + new Date(new Date(strDate)).toLocaleDateString());
                    }
                }
                $("#lblCharttitle").text(mainTitle);
            }
        }
    } catch (e) {
        console.log(e.message);

    }
    $("#moduleUsages").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader/usages
    $("#usageLoaderPopup").css('display', 'block');
}

function setImages() {
    try {
        $('#duarationmode a[mode=' + (previousDurationmode == "S1" ? "M" : previousDurationmode) + ']').removeClass("active");
        $('#duarationmode a[mode=' + (duration == "S1" ? "M" : duration) + ']').addClass("active");
        //$('#unitmode a[mode=' + prevtype + ']').removeClass("active");
        $('#unitmode a[mode=' + unit + ']').addClass("active");
        if (duration == 'S1') duration = 'S';
    }
    catch (ex)
    { }
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
            $("#usagetypepopup  option[value='E']").remove();
        else {
            $("#usagetypepopup  option[value='E']").show();
            if ($("#hdnPUKWH").val() == "0") {
                $("#unitmode li a[mode='K']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='K']").show();

            if ($("#hdnPUDollar").val() == "0") {
                $("#unitmode li a[mode='D']").hide();
                $('#unitmode li a[mode="K"]').addClass('active');
                previousUnitmode = '$$';
            }
            else {
                $("#unitmode li a[mode='D']").show();
                $("#unitmode li a[mode='D']").addClass('active');
            }

            if ($("#hdnPUDollar").val() != "0" && $("#hdnPUKWH").val() != "0") {
                $("#unitmode li a[mode='D']").show();
                $("#unitmode li a[mode='K']").show();
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
            else if ($("#hdnPU15Min").val() != "0") {
                $("#hdnMode").val('MI');
                $("#duarationmode li a[mode='MI']").addClass('active');
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
            if ($("#hdnPU15Min").val() != "0") {
                $("#duarationmode li a[mode='MI']").show();
            }
            else {
                $("#duarationmode li a[mode='MI']").hide();
            }
            ////if (previousDurationmode == 'MI') {
            //    $("#hdnMode").val('D');
            //    $("#duarationmode li a[mode='D']").addClass('active');
            //    previousDurationmode = 'D';
            //    $("#duarationmode li a[mode='D']").show();
            //}

        }
    }
    catch (ex)
    { }
}

function setWaterModule() {
    try {
        if ($("#hdnWU").val() == "0")
            $("#usagetypepopup  option[value='W']").remove();
        else {
            $("#usagetypepopup  option[value='W']").show();

            if ($("#hdnWUKWH").val() == "0") {
                $("#unitmode li a[mode='W']").hide();
                $('#unitmode li a[mode="D"]').addClass('active');
                previousUnitmode = 'D';
            }
            else
                $("#unitmode li a[mode='W']").show();

            if ($("#hdnWUDollar").val() == "0") {
                $("#unitmode li a[mode='D']").hide();
                $("#unitmode li a[mode='W']").addClass('active');
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
                previousUnitmode = 'W';
            }
            else if ($("#hdnWUGallon").val() != "0") {
                $("#unitmode li a.active").removeClass('active');
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
            $("#usagetypepopup  option[value='G']").remove();
        else {
            $("#usagetypepopup  option[value='G']").show();
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

function LoadUsageDatainChart(usageData, Mode, yaxislabel, Type) {
    try {
        var usagetyp = $("#usagetypepopup").val();
        processed_json = new Array();
        processed_jsonAllocation = new Array();
        processed_jsonOnDemand = new Array();

        switch (Mode) {
            case "MI":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                        y: parseFloat(obj.Unit),
                        color: setcolor(parseFloat(obj.Unit)),
                        year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate
                    });
                    if (usagetyp == "E" && CustomerType == "Commercial") {
                        processed_jsonOnDemand.push({
                            name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                            y: obj.DemandValue,
                            color: "#31afdb",
                            title: 'Demand'
                        });
                    }
                });
                mainTitle = "15 Min Usage For" + ' ' + usageData[0]["UsageDate"];
                break;
            case "H":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                        y: (obj.Unit == undefined || obj.Unit == "") ? parseFloat(obj.TotalValue) : parseFloat(obj.Unit),
                        color: (obj.Unit == undefined || obj.Unit == "") ? setcolor(parseFloat(obj.TotalValue), obj.HighUsage) : setcolor(parseFloat(obj.Unit)),
                        year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate
                    });
                    if (usagetyp == "W") {
                        if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: (obj.Hourly == undefined || obj.Hourly == "") ? (obj.hourly) : (obj.Hourly),
                                    y: parseFloat((obj.AllocationValue)),
                                    color: "#31afdb",
                                    title: 'Allocation'
                                });
                            }
                        }
                    }
                    if (usagetyp == "E" && CustomerType == "Commercial") {
                        processed_jsonOnDemand.push({
                            name: (obj.Hourly),
                            y: obj.DemandValue,
                            color: "#31afdb",
                            title: 'Demand'
                        });
                    }
                });

                mainTitle = "Hourly Usage For" + ' ' + usageData[0]["UsageDate"];

                break;

            case "D":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: formatvalue(obj),//obj.UsageDate,
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: (obj.UsageDate == undefined || obj.UsageDate == "") ? '' : obj.UsageDate
                    });
                    if (usagetyp == "W") {
                        if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: formatvalue(obj),
                                    y: parseFloat((obj.AllocationValue)),
                                    color: "#31afdb",
                                    title: 'Allocation'
                                });
                            }
                        }
                    }
                    if (usagetyp == "E" && CustomerType == "Commercial") {
                        processed_jsonOnDemand.push({
                            name: formatvalue(obj),
                            y: obj.DemandValue,
                            color: "#31afdb",
                            title: 'Demand'
                        });
                    }
                });
                mainTitle = "Period" + ': ' + usageData[0]["UsageDate"] + " " + "To" + " " + usageData[usageData.length - 1]["UsageDate"];
                break;

            case "M":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: getMonthName(obj.Month),
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: obj.Year,
                        month: obj.Month
                    });
                    if (usagetyp == "W") {
                        if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: getMonthName(obj.Month),
                                    y: parseFloat((obj.AllocationValue)),
                                    color: "#31afdb",
                                    title: 'Allocation'
                                });
                            }
                        }
                    }
                    if (usagetyp == "E" && CustomerType == "Commercial") {
                        processed_jsonOnDemand.push({
                            name: getMonthName(obj.Month),
                            // y: parseFloat((obj.TotalValue * 1.1)),
                            y: obj.DemandValue,
                            color: "#31afdb",
                            title: 'Demand'
                        });
                    }
                });
                mainTitle = "Period" + ': ' + getMonthName(usageData[0]["Month"]) + ' ' + usageData[0]["Year"] + " " + "To" + " " + getMonthName(usageData[usageData.length - 1]["Month"]) + ' ' + usageData[usageData.length - 1]["Year"];
                break;
            case "B":
                $.map(usageData, function (obj, i) {
                    processed_json.push({
                        name: obj.Month,
                        y: parseFloat(obj.TotalValue),
                        color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                        year: obj.Year

                    });
                    if (usagetyp == "W") {
                        if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                            //Allocation Value
                            if (obj.AllocationValue != undefined) {
                                processed_jsonAllocation.push({
                                    name: obj.Month,
                                    y: parseFloat((obj.AllocationValue)),
                                    color: "#31afdb",
                                    title: 'Allocation'
                                });
                            }
                        }
                    }
                });
                break;
            case "S":
                if (ExcelSeasonID == 0) {
                    $.map(usageData, function (obj, i) {
                        processed_json.push({
                            name: obj.SeasonName,//+ ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                            year: obj.GenerationDate != undefined ? obj.GenerationDate : obj.UsageDate,
                            id: obj.SeasonID
                        });
                        if (usagetyp == "W") {
                            if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                                //Allocation Value
                                if (obj.AllocationValue != undefined) {
                                    processed_jsonAllocation.push({
                                        name: obj.SeasonName + ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                                        y: parseFloat((obj.AllocationValue)),
                                        color: "#31afdb",
                                        title: 'Allocation'
                                    });
                                }
                            }
                        }
                        if (usagetyp == "E" && CustomerType == "Commercial") {
                            processed_jsonOnDemand.push({
                                name: obj.SeasonName + ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                                y: obj.DemandValue,
                                color: "#31afdb",
                                title: 'Demand'
                            });
                        }
                    });
                }
                else {
                    $.map(usageData, function (obj, i) {
                        processed_json.push({
                            name: getMonthName(obj.MonthUsageDate),//+ ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage),
                            year: obj.GenerationDate != undefined ? obj.GenerationDate : obj.UsageDate,
                            id: obj.SeasonID
                        });
                        if (usagetyp == "W") {
                            if ($('#hdnWaterAllocation').val() == 'True' && (Type == "G" || Type == "W")) {
                                //Allocation Value
                                if (obj.AllocationValue != undefined) {
                                    processed_jsonAllocation.push({
                                        name: getMonthName(obj.MonthUsageDate) + ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                                        y: parseFloat((obj.AllocationValue)),
                                        color: "#31afdb",
                                        title: 'Allocation'
                                    });
                                }
                            }
                        }
                        if (usagetyp == "E" && CustomerType == "Commercial") {
                            processed_jsonOnDemand.push({
                                name: getMonthName(obj.MonthUsageDate) + ' ' + ($("#usagetypepopup").val() == 'E' ? obj.GenerationDate : obj.UsageDate),
                                y: obj.DemandValue,
                                color: "#31afdb",
                                title: 'Demand'
                            });
                        }
                    });
                }
                mainTitle = "";
                break;

        }
        setdailyhighest(Mode, Type, processed_json);

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
        $("#lblCharttitle").text(mainTitle); loader.hideloader();
    }
    catch (ex) {
        alert(ex.message);
    }
}

function OnError() {
    $("#moduleUsages").removeClass("preLoader");
    $('.usageconsumption').hide();
    $('#divNoDataUsage').show();
    //  $("#usageLoaderPopup").css('display', 'block');

}


function getduration(usagetyp) {
    switch (usagetyp) {
        case 'W':
            {
                duration = $('#duarationmode li a.active').attr('mode');
            }
            break;
        default: duration = $('#duarationmode li a.active').attr('mode');
            break;

    }
    if (duration == 'H' || duration == 'D' || duration == "MI") {
        $("#divCalender").css('display', 'inline');
    }
    else {
        $("#divCalender").css('display', 'none');
    }

}

function getNextActiveMode(currMode) {
    try {
        var nextMode;
        if (currMode == 'S') {
            if ($('.usage_listing li a[mode="M"]').is(":visible") == true) {
                nextMode = 'S1';
            }
            else if ($('.usage_listing li a[mode="D"]').is(":visible") == true) {
                nextMode = 'D';
            }
            else if ($('.usage_listing li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.usage_listing li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'M') {
            if ($('.usage_listing li a[mode="D"]').is(":visible") == true) {
                nextMode = 'D';
            }
            else if ($('.usage_listing li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.usage_listing li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'D') {
            if ($('.usage_listing li a[mode="H"]').is(":visible") == true) {
                nextMode = 'H';
            }
            else if ($('.usage_listing li a[mode="MI"]').is(":visible") == true) {
                nextMode = 'MI';
            }
            else {
                nextMode = currMode;
            }
        }
        else if (currMode == 'H') {
            if ($('.usage_listing li a[mode="MI"]').is(":visible") == true) {
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



function getCurrentHeader(UsageType) {
    try {
        switch (UsageType) {
            case 'E':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                break;
            case 'G':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                break;
            case 'S':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                $('.compare_graph').attr('style', 'width: 97%; position: relative; overflow-x: hidden; overflow-y: hidden');
                break;
            case 'W':
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                break;
            default:
                $(".GraphLegend_solar").hide();
                $(".GraphLegend_data_solar").hide();
                break;
        }
    }
    catch (ex) { }
}

function getMonthName(monthIndex) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";

}



function getuntitype() {
    var unit = $("#unitmode li a.active").attr("mode");
    Type = unit;
    yaxis = $("#unitmode li a.active").text();
    return unit;
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

        if (duration == 'H' || duration == 'D' || duration == "MI") {
            $("#divCalender").css('display', 'inline');
        }
        else {
            $("#divCalender").css('display', 'none');
        }
        switch ($('#usagetypepopup').val()) {
            case 'E':
                loadpowerusage(getuntitype(), duration, strDate);
                break;
            case 'W':
                loadWaterusage(getuntitype(), duration, strDate);
                break;
            case 'G':
                loadGasUsage(getuntitype(), duration, strDate);
                break;

        }
    }
    catch (ex) { }
}
