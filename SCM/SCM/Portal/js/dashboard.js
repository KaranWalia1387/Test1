var powerrange;
var waterrange;
var lowRange;
var highRange;
var gasrange;
var highcolor = '';// '#ea557b';
var lowcolor = '';//'#4adea0';
var avgcolor = '';//'#e9cc57';
var colorval = '';//"#31afdb"; -- For Water Allocation
var Type = 'K', mode = 'M';
var nameyaxis = '';
var poweryaxis = '';
var wateryaxis = '';
var powermode;
var watermode;
var NoCompareDiv = '';
var highlow = '';
var PowerMeterNum = "";
var WaterMeterNum = "";
var IsAMIStatusWater = "";
var IsAMIStatus = "";
var noofdays = 7;
var duration = 'D';
var TO_FIX = 2;
var OF_FIX = 2;

$(function () {

    try {
        $(".resizable").resizable({
            animate: true,
            maxWidth: 1000,
            grid: [10, 10]
        });
    }
    catch (e) {
        console.log(e.message);
    }
    loadElectricVehicle();
    var url = getBillingModuleURL();
    $($('#Module2 a')[0]).prop('href', url);

    $("#draggable").draggable();

    $('select').bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function (event) {
        event.stopImmediatePropagation();
    });

    try {
        $("#outage_map_canvas").click(function () {
            unbindoutage();
        });

        var arraydiv = new Array();
        var IDVAL = new Array();
        $(".ui-sortable>div").each(function (index, element) {
            IDVAL.push($(element).attr("id"));
        });
        var sortorder = Dashboard.getCustomerDashBoardorderDetail("1", IDVAL.join(',')).value.split(',');
        $(sortorder).each(function (index, element) {
            var obj = $('#' + element);
            $('#' + element).remove();
            arraydiv.push(obj);
        });

        $(arraydiv).each(function (index, element) {
            try {
                $(".ui-sortable").append(element);
            }
            catch (e) {
                console.log(e.message);
            }

        });
    }
    catch (e) {
        console.log(e.message);
    }

    $(".ui-sortable").sortable({
        //handle: "h3",
        cancel: "#outage_map_canvas,#footprint_map_canvas,#selFootPrint,#ddlElecVehicle,#drpCompare,#ddlThermostat,.notification-area,.outage-area,.myaccount-area,#ddlMultiMeterWater,#ddlMultiMeter,#imgOutagesText",
        cursor: 'move',
        containment: "parent",
        connectWith: 'Module5',
        update: function (event, ui) {

            var IDVAL = new Array();
            $(".ui-sortable>div").each(function (index, element) {
                IDVAL.push($(element).attr("id"));
            });
            console.log(IDVAL.join(','))
            $.ajax({
                type: "POST",
                url: "Dashboard.aspx/CustomerDashBoardorderDetail",
                data: JSON.stringify({ modulecode: IDVAL.join(','), dasboardoption: '1' }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                },
                failure: function (response) {
                }
            });
        },
        start: function (event, ui) {


        },
        stop: function (event, ui) {

        }

    });
    $(".ui-sortable").disableSelection();




    if (window.location.href.toLowerCase().indexOf("preview") >= 0) {
        var parms = window.location.href.split('=');
        if (parms[1] = 'preview' && parms[1] != null) {
            $('a').click(function e() {
                $('a').removeAttr("href");
                $('a').removeAttr("onClick");
                return false;
            });

            $('button').click(function e() {
                return false;
            });

            $('#aWaterUsageHCF').click(function e() {
                return false;
            });
            $('a').removeAttr("href");
            $('a').removeAttr("onClick");
            $('#ddlThermostat').attr("disabled", true);
            $('#ddlElecVehicle').attr("disabled", true);
            $('#drpCompare').attr("disabled", true);
            $('#selFootPrint').attr("disabled", true);
            $('#ddlAddress').attr("disabled", true);
            $('#aUsageElectrickWh').removeClass('active_links');
            $('#aWaterUsageD').removeClass('active_links');
            $('#imgOutagesMap').removeClass('active_links');
            $('#imgCompareSpendingPrev').removeClass('active_links');
            $('#imgCompareSpendingUtl').removeClass('active_links');
            $('#imgCompareSpendingZip').removeClass('active_links');
        }
    }

    setDefaultSelected();

    //window.setInterval(function () {
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
                $('#imgEfficiency').attr('title', Title);
                $('#IDEfficiency').attr('href', Type + '.aspx');
            }
        },
        failure: function (response) {
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
});

function unbindoutage() {

}

function resizegrid() {
}

function setDefaultSelected() {
    var val = '';
    var arr = new Array();
    if ($('#hdnCompareMe').val() == "True") {
        arr.push('Me');
    }
    if ($('#hdnCompareUtility').val() == "True") {
        arr.push('Utility');
    }
    if ($('#hdnCompareZip').val() == "True") {
        arr.push('Zip');
    }

    if (arr[arr.length - 1] == "Utility") {
        $('#imgCompareSpendingUtl').addClass('active_links');
        $('#imgCompareSpendingUtl').attr('src', 'images/neighbour-icon_hover.svg');
        $(".divCompareSpendingUtl").show();
        $('#imgCompareSpendingUtl').trigger('click');
        $('#drpCompare').trigger('change');
    }
    else if (arr[arr.length - 1] == "Zip") {
        $('#imgCompareSpendingZip').addClass('active_links');
        $('#imgCompareSpendingZip').attr('src', 'images/zip-icon.svg');
        $(".divCompareSpendingZip").show();
        $('#imgCompareSpendingZip').trigger('click');
        $('#drpCompare').trigger('change');
    }
    else {
        $('#imgCompareSpendingPrev').addClass('active_links');
        $('#imgCompareSpendingPrev').attr('src', 'images/utility-icon_hover.svg');
        $(".divCompareSpendingPrev").show();
        $('#imgCompareSpendingPrev').trigger('click');
        $('#drpCompare').trigger('change');
    }
    if (arr.length == 0) {
        $('.compare-area').hide(); unbindoutage
        $('#drpCompare').hide();
    }

}

function drowDonutChart(color, maxval, setVal, canvasName) {
    try {
        var opts = {
            lines: 1, // The number of lines to draw
            angle: 0.22, // The length of each line
            lineWidth: 0.14, // The line thickness
            pointer: {
                length: 0.9, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
            colorStart: color,   // Colors
            colorStop: color,    // just experiment with them
            strokeColor: '#B0B0B0',   // to see which ones work best for you
            generateGradient: true
        };

        demoGauge = new Donut(document.getElementById(canvasName)).setOptions(opts);
        demoGauge.animationSpeed = 10;
        demoGauge.maxValue = maxval;
        demoGauge.set(setVal);
    }
    catch (e) {
        console.log(e.message);
    }
}

function bindmeter() {

    var param = { MeterType: 'W' };

    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindMultiMeter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            $("#ddlMultiMeterWater").empty();
          
            $("#ddlMultiMeterWater").append($("<option></option>").val('').html($('#alltxt').text())).attr("Isami", "");
            if (data.d != "") {
                var ddlvalue = $.parseJSON(data.d);
                IsAMIStatusWater = ddlvalue["MeterCheckIsAMI"][0]["IsAMIStatus"];

                $.each(ddlvalue["MeterDetails"], function () {
                    $("#ddlMultiMeterWater").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
                });
            }
        },
        error: function () {
            //  alert("Error");
        }
    });


    var parameter = { MeterType: 'E' };
    $.ajax({
        type: "POST",
        url: "Usages.aspx/BindMultiMeter",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parameter),
        success: function (data) {
            $("#ddlMultiMeter").empty();
            $("#ddlMultiMeter").append($("<option></option>").val('').html('All')).attr("Isami", "");
            if (data.d != "") {
                var ddlvalue = $.parseJSON(data.d);
                IsAMIStatus = ddlvalue["MeterCheckIsAMI"][0]["IsAMIStatus"];
                $.each(ddlvalue["MeterDetails"], function () {
                    $("#ddlMultiMeter").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
                });
            }
        },
        error: function () {
            //alert("Error");
        }
    });
}

$(document).ready(function () {
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

            $('#imgOutagesMap').click(function () {
                $('#imgOutagesMap').attr('src', 'images/zip-icon.png');
                $('#imgOutagesText').attr('src', 'images/text-icon.png');

                $('#outage_Text_canvas').hide();
                $('#outage_map_canvas').show();
            });

            $('#imgOutagesText').click(function () {
                $('#imgOutagesMap').attr('src', 'images/zip-icon_hover.png');
                $('#imgOutagesText').attr('src', 'images/text-icon_hover.png');

                $('#outage_Text_canvas').show();
                $('#outage_map_canvas').hide();
            });

            bindmeter();

            //Water load if visible  # start
            if ($("#hdnWU").val() == "1") {
                waterrange = comUsage.LoadWaterRange().value;
                if ($("#hdnWUDollar").val() == "1") {
                    $('#aWaterUsageD').addClass('active_links');
                    loadWaterUsageAjax(mode, '$$');
                }
                else if ($("#hdnWUKWH").val() == "1") {
                    loadWaterUsageAjax(mode, 'HCF');
                }
                else if ($("#hdnWUGallon").val() == "1") {

                    $('#aWaterUsageGL').addClass('active_links');
                    loadWaterUsageAjax(mode, 'G');
                }
            }
            //#end

            //Power load if visible  # start
            if ($("#hdnPU").val() == "1") {
                powerrange = comUsage.LoadRange().value;
                if ($("#hdnPUKWH").val() == "0") {
                    loadpowerusageajax(mode, '$$');
                }
                else {
                    loadpowerusageajax(mode, 'kWh');
                }
            }
            //#end

            //Gas load if visible  # start
            if ($("#hdnGU").val() == "1") {
                gasrange = comUsage.LoadRange().value;
                loadGasUsage('D', '$$');
                $('#aGasUsageD').addClass('active_links');
            }
            //#end

            // Default Load
            $('#aUsageElectricD').addClass('active_links');

            $('#aGenerationUsageD').addClass('active_links');

            //for compare spending dropdown show/hide
           

            //  Power Usage
            $('#aUsageElectricD').click(function () {
                $('#aUsageElectricD').addClass('active_links');
                $('#aUsageElectrickWh').removeClass('active_links');
                loadpowerusageajax('D', '$$');
            });

            $('#aUsageElectrickWh').click(function () {
                $('#aUsageElectrickWh').addClass('active_links');
                $('#aUsageElectricD').removeClass('active_links');
                loadpowerusageajax('D', 'kWh');
            });
            //  Water Usage
            $('#aWaterUsageD').click(function () {
                $(this).parent().find('a').removeClass('active_links');
                $(this).addClass('active_links');
                loadWaterUsageAjax('D', '$$');
            });
            $('#aWaterUsageGL').click(function () {
                $(this).parent().find('a').removeClass('active_links');
                $(this).addClass('active_links');
                loadWaterUsageAjax('D', 'G');
            });

            $('#aWaterUsageHCF').click(function () {
                $(this).parent().find('a').removeClass('active_links');
                $(this).addClass('active_links');
                loadWaterUsageAjax('D', 'HCF');
            });

            //  Gas Usage
            $('#aGasUsageD').click(function () {
                $('#aGasUsageD').addClass('active_links');
                $('#aGasUsageCCF').removeClass('active_links');
                loadGasUsage('D', '$$');
            });

            $('#aGasUsageCCF').click(function () {
                $('#aGasUsageCCF').addClass('active_links');
                $('#aGasUsageD').removeClass('active_links');
                loadGasUsage('C', 'ccf');
            });


            $("#drpCompare").change(function () {
                setDropdowns();
                loadcomparespending();
                
            });

            //Changes done for Multimeter for dropdown

            $('#ddlMultiMeter').change(function () {
                PowerMeterNum = $(this).val();
                if ($('#aUsageElectricD').hasClass('active_links') == true) {
                    Type = '$$';
                }
                else {
                    Type = 'kWh';
                }
                loadpowerusageajax(mode, Type);

            });

            $('#ddlMultiMeterWater').change(function () {
                WaterMeterNum = $(this).val();
                if ($('#aWaterUsageHCF').hasClass('active_links') == true) {
                    Type = 'HCF';
                }
                else if ($('#aWaterUsageGL').hasClass('active_links') == true) {
                    Type = 'G';
                }
                else {
                    Type = 'ccf';
                }
                loadWaterUsageAjax(mode, Type);

            });
            //
            LoadBanner();

        },
        error: function () {

        }
    });
});

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

function setcolor(usagevalue, highlow) {
    var color = '#FFFFFF';
    if ($('#hdnUsage').val() != 'WU') {
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
        if (highlow == '2') {
            color = highcolor;
        }
        else {
            color = lowcolor;
        }
        return color;
    }

}

function LoadBanner() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/Setbanners",
        data: '{PlaceHolderID: "' + 1 + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            JSON.parse(response.d) == null ? $('#BannerDashboard').attr('src', 'images/no_img.png') : $('#BannerDashboard').attr('src', JSON.parse(response.d)).removeClass("no_img_css");
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    });
}

function loadpowerusageajax(mode, Type) {
    try {
        $('#hdnUsage').val('PU');
        poweryaxis = Type == "kWh" ? 'kWh' : '$';

        if (Type == "kWh")
            Type = "K";
        else
            Type = "D";

        if ($("#hdnPUMonthly").val() != "0") {
            powermode = 'M';
        }
        else if ($("#hdnPUSeasonal").val() != "0") {
            powermode = 'S';
        }
        else if ($("#hdnPUDaily").val() != "0") {
            powermode = 'D';
        }
        else if ($("#hdnPUHourly").val() != "0") {
            powermode = 'H';
        }
        else {
            powermode = 'MI';
        }
        //Changes done for Multimeter for dropdown
        // for checking AMI or NON-AMI Meter
        var isami = $("#ddlMultiMeter option:selected").attr('Isami');
        if (isami == "false") {
            if ($("#hdnPUMonthly").val() != "0") {
                powermode = 'M';
            }
            else {
                powermode = 'S';
            }
        }
        else {
            if (IsAMIStatus == true && $("#ddlMultiMeter option:selected").text() == "All") {
                if ($("#hdnPUMonthly").val() != "0") {
                    powermode = 'M';
                }
                else {
                    powermode = 'S';
                }
            }
        }
        var url = "dashboard.aspx/LoadUsageAjax";
        var parameter = "{UsageOrGeneration:'1',Type:'" + Type.toString() + "', Mode:'" + powermode + "',strDate:'',hourlyType:'H',SeasonId:'',weatherOverlay:'0',usageyear:'',MeterNumber:'" + PowerMeterNum + "'}";
        $.ajax({
            type: "POST",
            url: url,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                OnsuccessPowerUsage(response, Type, powermode);
            },
            error: OnError,

        });

    }
    catch (e) {
        console.log(e.message);
        $('#NoUsageDataDiv').show();
        $("#PU").removeClass("preLoader");
    }
}

function OnsuccessPowerUsage(response, Type, powermode) {
    try {
        loadRange(Type, powermode, "E", powerrange);
        var usageData = JSON.parse(response.d);
        if (usageData != null && usageData.length > 0) {
            $('#divElectricityUsage').show();
            var startindex = 0;
            $('#NoUsageDataDiv').hide();
            if (usageData.length > noofdays) {
                startindex = usageData.length - noofdays;
            }

            if (powermode == 'D') {
                processed_json = new Array();
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            else if (powermode == "M") {
                processed_json = new Array();
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: getMonthName(obj.Month),
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(parseFloat(obj.TotalValue), (obj.HighUsage == undefined ? obj.HIGHEST : obj.HighUsage))
                        });
                    }
                });
            }
            else if (powermode == "S") {
                processed_json = new Array();
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: obj.SeasonName,// + " " + obj.GenerationDate,
                            y: parseFloat(obj.TotalValue),
                            color: setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            else if (powermode == "H" || powermode == "MI") {
                processed_json = new Array();
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: obj.Hourly,
                            y: parseFloat(obj.Unit),
                            color: setcolor(parseFloat(obj.Unit))
                        });
                    }
                });
            }
            BindheighDashboard('column', 'divElectricityUsage', '', poweryaxis);
        }
        else {
            $('#NoUsageDataDiv').show();
            $('#NoUsageDataDiv').html('<span style="color:red; position: relative!important; top: 0px;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
            $('#divElectricityUsage').hide();
        }
    }
    catch (e) {
        console.log(e.message);
    }
    $("#PU").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
}

function OnError(response) {
    $('#NoUsageDataDiv').show();
    $("#PU").removeClass("preLoader");
}

function loadWaterUsageAjax(mode, Type) {
    try {
        $('#hdnUsage').val('WU');

        wateryaxis = Type == "HCF" ? 'HCF' : '$';
        if (Type == 'G') {
            wateryaxis = 'Gal';
        }
        if (Type == "HCF")
            Type = "W";
        else if (Type == 'G') {
            Type = "G";
        }
        else {
            Type = "D";
        }
        if ($("#hdnWUBIMonthly").val() != "0") {
            watermode = 'B';
        }
        else if ($("#hdnWUMonthly").val() != "0") {
            watermode = 'M';
        }
        else if ($("#hdnWUSeasonal").val() != "0") {
            watermode = 'S';
        }
        else if ($("#hdnWUDaily").val() != "0") {
            watermode = 'D';
        }
        else {
            watermode = 'H';
        }


        //Changes done for Multimeter for dropdown
        // for checking AMI or NON-AMI Meter
        var isami = $("#ddlMultiMeterWater option:selected").attr('Isami');
        if (isami == "False") {
            if ($("#hdnWUBIMonthly").val() != "0") {
                watermode = 'B';
            }
            else if ($("#hdnWUMonthly").val() != "0") {
                watermode = 'M';
            }
            else {
                watermode = 'S';
            }
        }
        else {
            if (IsAMIStatusWater == true && ($("#ddlMultiMeterWater option:selected").text() == "All" || $("#ddlMultiMeterWater option:selected").text() == "todas")) {
                if ($("#hdnWUBIMonthly").val() != "0") {
                    watermode = 'B';
                }
                else if ($("#hdnWUMonthly").val() != "0") {
                    watermode = 'M';
                }
                else {
                    watermode = 'S';
                }
            }
        }


        var url = "dashboard.aspx/LoadWaterUsageAjax";
        var parameter = "{Type:'" + Type + "',Mode:'" + watermode + "',strDate:'',hourlyType:'H',weatherOverlay:'0',seasonId:'0',usageyear:'',MeterNumber:'" + WaterMeterNum + "'}";
        $.ajax({
            type: "POST",
            url: url,
            data: parameter,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:
                function (response) {
                    OnSuccessWaterUsage(response, Type, watermode);
                },
            error: OnErrorWater,

        });

    }
    catch (e) {
        $('#NoUsageWaterDataDiv').show();// $('#divWaterUsage').html($('#lblUsageNoData').text());
        $("#WU").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
        console.log(e.message);
    }
}

function OnErrorWater(response) {
    //  $('#divWaterUsage').html($('#lblUsageNoData').text());
    $('#NoUsageWaterDataDiv').show();
    $("#WU").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
    console.log(response);
}

function OnSuccessWaterUsage(response, Type, mode) {
    try {

        loadRange(Type, mode, "W", waterrange);
        var usageData = JSON.parse(response.d);//added default houlytype "H" for 15 mins data
        if (!(usageData == null || usageData.length == 0)) {
            $('#NoUsageWaterDataDiv').hide();
            $('#divWaterUsage').show();

            var startindex = 0;
            if (usageData.length > 7) {
                startindex = usageData.length - 7;
            }
            processed_json = new Array();
            if (watermode == 'D' || watermode == 'B') {
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: $("#hdnWUBIMonthly").val() == "1" ? (obj.Month) : obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
                            y: parseFloat(obj.TotalValue),
                            color: Type == "D" ? colorval : setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            else if (watermode == 'S') {
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: obj.SeasonName,//+ " " + obj.UsageDate,
                            y: parseFloat(obj.TotalValue),
                            color: Type == "D" ? colorval : setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            else if (watermode == "H") {
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: obj.Hourly,
                            y: parseFloat(obj.TotalValue),
                            color: Type == "D" ? colorval : setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            else if (watermode == "M") {
                $.map(usageData, function (obj, i) {
                    if (i >= startindex) {
                        processed_json.push({
                            name: getMonthName(obj.Month) ,//+ " " + obj.Year,
                            y: parseFloat(obj.TotalValue),
                            color: Type == "D" ? colorval : setcolor(parseFloat(obj.TotalValue), obj.HighUsage)
                        });
                    }
                });
            }
            BindheighDashboard('column', 'divWaterUsage', '', wateryaxis);
        }
        else {
            $('#NoUsageWaterDataDiv').html('<span style="color:red; position: relative!important; top: 0px;">' + $('#ML_Dashboard_Lbl_NoUsageData').text() + '</span>');
            $('#NoUsageWaterDataDiv').show();
            $('#divWaterUsage').hide();
        }
    }
    catch (e) {
        $('#NoUsageWaterDataDiv').show();
        console.log(e.message);
    }
    $("#WU").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
}

function OnErrorWaterUsage(response) {
     
    $('#NoUsageWaterDataDiv').show();
    $("#WU").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader


}

function loadGasUsage(Type, mode) {
    try {
        $('#hdnUsage').val('GU');
        yaxis = Type == "C" ? 'CCF' : '$';
        var usageData = comUsage.LoadGasUsage(Type, "D", "H", gasrange, "H").value;
        if (!(usageData == null || usageData.Rows.length == 0)) {
            var startindex = 0;
            if (usageData.Rows.length > 7) {
                startindex = usageData.Rows.length - 7;
            }
            processed_json = new Array();
            $.map(usageData.Rows, function (obj, i) {
                if (i >= startindex) {
                    processed_json.push({
                        name: obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
                        y: obj.TotalValue,
                        color: setcolor(obj.TotalValue, obj.HighUsage)
                    });
                }
            });
            BindheighDashboard('column', 'divGasUsage', '');
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function loadGenerationUsage(Type, mode) {
    try {
        $('#hdnUsage').val('NU');
        yaxis = Type == "K" ? 'kWh' : '$';
        var usageData = weatherAPI_PowerGeneration.GetGenration(Type, 'L').value;
        if (usageData != null) {
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

function loadElectricVehicle() {
    //This block of code is used for electric-vehicle section.
    if ($('#ddlElecVehicle' + ' option').length > 0) {
        $('#imgCar').attr("src", $('#ddlElecVehicle').val());
        $('#lblUsage').html($('#ddlElecVehicle' + ' option:selected').attr("usage"));
        $('#lblChrRem').html($('#ddlElecVehicle' + ' option:Selected').attr("chrrem"));

        $('#ddlElecVehicle').change(function () {
            $('#imgCar').attr("src", $('#ddlElecVehicle').val());
            $('#lblUsage').html($('#ddlElecVehicle' + ' option:selected').attr("usage"));
            $('#lblChrRem').html($('#ddlElecVehicle' + ' option:Selected').attr("chrrem"));
            $('#hdnselectedindex').val($('#ddlElecVehicle' + ' option:Selected').index());
        });
    }
}

function setDropdowns() {
    try {
        var ddlflag = 0;
        if ($("#hdnMeterTypePower").val() == "False")
            $("#drpCompare option[value='Power']").remove();
        else {
            $("#drpCompare option[value='Power']").show();
            ddlflag += 1;
        }

        if ($("#hdnMeterTypeWater").val() == "False")
            $("#drpCompare option[value='Water']").remove();
        else {
            $("#drpCompare option[value='Water']").show();
            ddlflag += 1;
        }

        if ($("#hdnMeterTypeGas").val() == "False")
            $("#drpCompare option[value='Gas']").remove();
        else {
            $("#drpCompare option[value='Gas']").show();
            ddlflag += 1;
        }

        if (ddlflag == 1)
            $("#drpCompare").css('display', 'none');
        else $("#drpCompare").css('display', 'block');
    }
    catch (ex) {
        var msg = ex.message;
    }
}

$('body').bind('beforeunload', function () {
    $("#PaperlessBillingBanner").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader //PaperlessBilling
    $("#Module9").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// SmartHome
    $("#Module9_1").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Smart Building
    $("#EnergyEfficiencyModule").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Efficiency

});

$(document).ready(function () {
    $("#PaperlessBillingBanner").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader //PaperlessBilling
    loadEVModule();
    NoCompareDiv = '<div class="NoCompare">' + $('#lblCompareNoData').text() + '</div>';
    loadMyAccountModule();
    loadNotificationDashboardModule();
    LoadBillDashBordModule();


    $("#Module9").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// SmartHome
    $("#smartHomeLoader").css('display', 'block');

    $("#Module9_1").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Smart Building
    $("#EnergyEfficiencyModule").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader// Efficiency
    $("#efficiencyLoader").css('display', 'block');
    $("#IDEfficiency").error(function () {
        $(this).attr("src", "images/no_img.png");
    })
    $("#BannerDashboard").error(function () {
        $(this).attr("src", "images/no_img.png").addClass("no_img_css");

    })

});

function ajaxCommomCompare(fnType, fnUrl, fnSuccess, fnError, param) {

    $.ajax({
        type: fnType,// "POST",
        url: fnUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: { id: 'k' },
        success: function (response, status, type) { return response.d; },
        error: fnError,

    });
}

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
                         
                    var Remainingamount = table.ToTalBalance.replace('DR', '');
                    var tt = Remainingamount.replace('CR', '');
                    var totalamount = tt;//table[21]["Value"];
                    var roundAmount = Math.round(Number(totalamount));
                          
                    if (Number(totalamount) == 0) {
                        $("#lblTotalPayableAmount").text($("#NoBillingAmountTxt").text());
                        $("#lblTotalPayableAmount").css({'color': '#000000', 'font-size': '16px', 'margin-top': '15px', 'margin-bottom': '30px' });
                          
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
            if ($("#lblTotalPayableAmount").text() == 'N/a')
            {
                if ($('#hdnPrePaid').val() == "Prepaid") {
                    $('#BtnRecharge').show();                    
                }
                else {
                    $('#BtnPayBill').hide(); 
                }
            }
        else
            {
                $('.pay_bill').show();
            }*/
            $("#Module2").removeClass("preLoader");//added by lalit yadav 12 oct loder
            $("#billingLoader").css('display', 'block');

        },
        error: OnErrorBi,
    });
}

function OnErrorBi(response) {
    console.log(response)
    console.log('fail');
}

function loadEVModule() {
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
        $(".electric-area").html('' + $('#NoEVSelected_NoEvConfig').text() + '<br/> <a href="electric-vehicle.aspx">' + $('#NoEVSelected').text() + '</a>').css({ "font-size": "18px", color: "#ed8601", top: 61, left: 0, position: 'relative', "text-align": "center" })

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

    $("#Module1").removeClass("preLoader");//added by lalit yadav 12 oct 2015 loader
    $("#myAccountLoader").css('display', 'block');
}

function OnErrorMyAcct(response) {
    var data = response.d;
}

// fuctionality added by priyansha 
// it will load defaultpayment card value of myaccount in dashboard
function setMyAccountData(item) {
    var json1 = JSON.parse(item);
    if (json1 != null) {
        var defaultpaytype = null;
        var defaultpayid = null;
        var defaultaddress = null;
        var hiddenString, i;
        for (i = 0; i < json1.Table.length; i++) {
            if (json1.Table[i]['DefaultAccountNumber'] == json1.Table[i]['AccountNumber']) {
                defaultpaytype = json1.Table[i]['DefaultPayType'];
                defaultpayid = json1.Table[i]['DefaultPayID'];
                defaultaddress = json1.Table[0].Properties;
            }
        }
        var PaymentMode = $('#hdnPaymentMode').val()

        if (PaymentMode != "3") {
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
        else {
            $('.defpay').hide();
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
    console.log(response.d);


}

