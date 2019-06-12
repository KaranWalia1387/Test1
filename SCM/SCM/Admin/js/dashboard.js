var dtOutageChartjs = new Array();
var dtUsageChartjs = new Array();
var Generationjs = new Array();
var colors = ['#ec625e', '#79d1b5', '#D6D23A', '#109618', '#990099', '#0099c6', '#DD4477', '#66AA00', '#b82e2e', '#316395', '#994499', '#22aa99'];
var efficolors = ['#79d1b5', '#ec625e', '#D6D23A', '#109618', '#990099', '#0099c6', '#DD4477', '#66AA00', '#b82e2e', '#316395', '#994499', '#22aa99'];
var dt_outage;
var dt_service;
var dt_daily_usage;
var dt_usage;
var dt_efficency;
var dt_solar;
var dt_user_status;
var dt_electric_vehicle;
var unit;
var disabled = 0;
var PowerColor = '';
var WaterColor = '';
var GasColor = '';
var SolarColor = '';

var nodataLabel = "<center><font color='Red'>No Data Available</font></center>";
var colorarrHEX = new Array();
colorarrHEX = fillcolor();
var color;
function fillcolor() {
    var colorarray = ['#ed5d5d', '#d6d23a', '#32d2c9', '#f19c08', '#4dd304', '#999999', '#00ac79', '#a10014', '#ff5a00', '#1d00f8', '#087189', '#decc00', '#f1c354'];

    for (i = 0; i < 150; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        //var color = Math.floor((Math.random() * 1000000) + 1);
        //colorarray.push("#" + ("000000" + color.toString(16)).slice(-6));
        colorarray.push(color);
    }
    return colorarray;
}


$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: "dashboard.aspx/BindColorCodes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ 'Mode': 2 }),
        success: function (data) {
            var result = $.parseJSON(data.d);
            for (var i = 0; i < result.Table.length; i++) {
                if (result.Table[i].ModuleName == 'Usage') {
                    if (result.Table[i].ConfigOption == 'High') {
                        PowerColor = result.Table[i].ConfigValue;
                    }
                    else if (result.Table[i].ConfigOption == 'WaterAllocation') {
                        WaterColor = result.Table[i].ConfigValue;
                    }
                    else if (result.Table[i].ConfigOption == 'Mid') {
                        GasColor = result.Table[i].ConfigValue;
                    }
                    else if (result.Table[i].ConfigOption == 'SolarGeneration') {
                        SolarColor = result.Table[i].ConfigValue;
                    }
                }
            }


            FillOutageData('dashboard');

            FillServiceData('dashboard');

            FillDailyUsageData('dashboard');

            unit = $("#usagetype option:first-child").val();

            FillUsageData('dashboard', unit);

            FillEfficencyData('dashboard');

            FillSolarData('dashboard');

            $("#usagetype").change(function (e) {
                // $("#div_usage_expand ul li img").removeClass('expander_btn');
                try {
                    disabled = 1;
                    $("#divusage").addClass("PreLoader");
                    $("#usageLoader").css('display', 'none');

                    if ($('#usagetype').val() == "P") {
                        unit = 'P';
                        FillUsageData('dashboard', unit);
                    }
                    else if ($('#usagetype').val() == "W") {
                        unit = 'W';
                        FillUsageData('dashboard', unit);
                    }
                    else if ($('#usagetype').val() == "G") {
                        unit = 'G';
                        FillUsageData('dashboard', unit);
                    }

                }
                catch (e) { }
                finally {
                    disabled = 0;
                }
            });

            $("#usagetypeinner").change(function () {
                if ($('#usagetypeinner').val() == "P") {
                    unit = 'P';
                    FillUsageData('popup', unit);
                }
                else if ($('#usagetypeinner').val() == "W") {
                    unit = 'W';
                    FillUsageData('popup', unit);
                }
                else if ($('#usagetypeinner').val() == "G") {
                    unit = 'G';
                    FillUsageData('popup', unit);
                }

            });

            FillUserStatusData('dashboard');

            FillElectricVechicleData('dashboard');

            $('.left-active-sprite ul li a').click(function () {
                var lstanchor = $(this).parent().parent().find('a');
                $(lstanchor).each(function (i, obj) {
                    $(obj).attr('class', '');
                })

                $(this).attr('class', 'active');
            });

            $('.expander_btn').click(function () {
                if (disabled == 1)
                    return false;
                $('.inner-right-section').css("overflow", "visible");
                loader.showloader();
                var popup = this.parentElement.parentElement.children;
                var visiblepopup = $('.left-active-sprite').find(popup).find("a.active")[0].parentElement.className;
                if (visiblepopup == "chart") {
                    $('#data-viewer-popup').hide(); $('#grid-viewer-popup').show();
                    $('#popup_views ul.popup_listener li.chart a').addClass("active");
                    $('#popup_views ul.popup_listener li.graph a').removeClass("active");
                    $('#popup_views ul.popup_listener li.pie a').removeClass("active");
                }
                else if (visiblepopup == "graph") {
                    $('#data-viewer-popup').show(); $('#grid-viewer-popup').hide();
                    $('#popup_views ul.popup_listener li.graph a').addClass("active");
                    $('#popup_views ul.popup_listener li.chart a').removeClass("active");
                    $('#popup_views ul.popup_listener li.pie a').removeClass("active");
                }
                else {
                    $('#data-viewer-popup').show(); $('#grid-viewer-popup').hide();
                    $('#popup_views ul.popup_listener li.pie a').addClass("active");
                    $('#popup_views ul.popup_listener li.chart a').removeClass("active");
                    $('#popup_views ul.popup_listener li.graph a').removeClass("active");
                }

                if ($(this).attr('id') == 'expand_outage') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'outage.aspx');
                    $('#a_expander').html("<i class='fa fa-warning'></i><img src='../images/icon_outage_sidebar.png' class='dash_heading_img' style='display:none !important;'/>Outage");
                    $('#li_graph').attr('class', 'graph');
                    FillOutageData('popup');
                }
                else if ($(this).attr('id') == 'expand_usage') {
                    $('#divusagetype').show();
                    $("#divusagetype option[value=" + unit + "]").attr("selected", "selected");
                    $('#a_expander').attr('href', 'Usage1.aspx');
                    $('#a_expander').html("<i class='fa fa-signal'></i><img src='../images/icon_usage_sidebar.png' class='dash_heading_img' style='display:none !important;' />Usage");
                    $('#li_graph').attr('class', 'graph');
                    FillUsageData('popup', unit);
                }
                else if ($(this).attr('id') == 'expand_solar') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'Generation1.aspx');
                    $('#a_expander').html("<i class='fa fa-sun-o'></i><img src='../images/icon_generation_sidebar.png' class='dash_heading_img' style='display:none !important;'/>Solar");
                    $('#li_graph').attr('class', 'graph');
                    FillSolarData('popup');
                }
                else if ($(this).attr('id') == 'expand_service') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'Servicesample.aspx');
                    $('#a_expander').html("<i class='fa fa-wrench'></i><img src='../images/icon_service_sidebar.png' class='dash_heading_img' style='display:none !important;'/>Service");
                    $('#li_graph').attr('class', 'pie');
                    FillServiceData('popup');
                }
                else if ($(this).attr('id') == 'expand_electric_vehicle') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', '#');
                    $('#a_expander').html("<img src='../images/icon-ev-dashboard.png' class='dash_heading_img' />Electric Vechicle");
                    $('#li_graph').attr('class', 'pie');
                    FillElectricVechicleData('popup');
                }
                else if ($(this).attr('id') == 'expand_user') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'User.aspx');
                    $('#a_expander').html("<i class='fa fa-user'></i><img src='../images/icon_myaccount_sidebar.png' class='dash_heading_img' style='display:none !important;'/>Customers");
                    $('#li_graph').attr('class', 'pie');
                    FillUserStatusData('popup');
                }
                else if ($(this).attr('id') == 'expand_efficency') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'Efficiencysample.aspx');
                    $('#a_expander').html("<img src='../images/icon_efficiency_sidebar.png' class='dash_heading_img' />Efficency");
                    $('#li_graph').attr('class', 'pie');
                    FillEfficencyData('popup');
                }
                else if ($(this).attr('id') == 'expand_daily_usage') {
                    $('#divusagetype').hide();
                    $('#a_expander').attr('href', 'Usage1.aspx');
                    $('#a_expander').html("<img src='../images/icon_usage_sidebar.png' class='dash_heading_img' />Daily Usage");
                    $('#li_graph').attr('class', 'pie');
                    FillDailyUsageData('popup');
                }
                loader.hideloader();
                $('#expand_popup_view').addClass('show');
                $('#altrnte').addClass('hide');
            });

            /* Edited by prashant */
            $('#close_graph').click(function () {
                $('.inner-right-section').css("overflow", "auto");
                $('#expand_popup_view').removeClass('show');
                $('#altrnte').removeClass('hide');
                //unit = $("#usagetype option:first-child").val();
                //FillUsageData('dashboard', unit);
            });
            /* Edited by prashant */
        },
        error: function () {

        }
    });
});

function FillOutageData(type) {
    try {
        if (dt_outage == null || dt_outage == undefined) {
            $.ajax({
                type: "POST",
                url: "dashboard.aspx/LoadOutage",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (response) {
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r.Table }, { Name: "Table1", Rows: r.Table1 }, { Name: "Table2", Rows: r.Table2 });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_outage = data;
                    Filloutage();

                },

                error: function (response) {
                    console.log(response.d);
                }
            });

        }
        else {
            Filloutage();
        }

        function Filloutage() {

            for (var i = 0; i < dt_outage.Tables[1].Rows.length; i++) {
                if (dt_outage.Tables[1].Rows[i]["OutageDate"].split('/').length > 2) {
                    dt_outage.Tables[1].Rows[i]["OutageDate"] = dt_outage.Tables[1].Rows[i]["OutageDate"].substring(0, dt_outage.Tables[1].Rows[i]["OutageDate"].lastIndexOf('/'));
                    dt_outage.Tables[1].Rows[i]["TotalOutages"] = parseInt(dt_outage.Tables[1].Rows[i]["TotalOutages"].toString());
                }
            }
            yaxis = 'Total Outages';

            processed_json = new Array();
            $.map(dt_outage.Tables[1].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.OutageDate,
                    y: obj.TotalOutages,
                    color: '#6baee3',
                    title: 'Planned Outage'
                });
            });
            $("#divoutage").removeClass("PreLoader");
            $("#outageLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    populateChart('column', 'outageschart', false);
                    LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup', false);
                    LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#outageschart').html(nodataLabel);
                    $('#gridoutage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }

            dtOutageChartjs = processed_json;
        }
    } catch (e) { }
}

function FillServiceData(type) {
    try {

        if (dt_service == null || dt_service == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/LoadService",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r.Table }, { Name: "NewTab", Rows: r.NewTab });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_service = data;
                    Fillservice();
                },
                error: function (response) {
                    console.log(response.d);
                }
            });
        }
        else {
            Fillservice();
        }

        function Fillservice() {
            if (dt_service == null) {
                if (type == 'dashboard') {
                    $('#servicechart').html(nodataLabel);
                    $('#gridservice').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }

                var title = 'Period: ' + dt_service.Tables[0].Rows[0]["DateFrom"] + ' to ' + dt_service.Tables[0].Rows[0]["DateTo"];
                $('#ServiceContainertitle').html(title)


                processed_json = new Array();
                $.map(dt_service.Tables[1].Rows, function (obj, i) {
                    processed_json.push({
                        name: obj.ReasonName,
                        y: obj.Cnt_Reason,
                        color: colorarrHEX[i],
                        title: obj.ReasonName
                    });
                });
                $("#divservice").removeClass("PreLoader");
                $("#serviceLoader").css('display', 'block');

                if (processed_json.length > 0) {
                    if (type == 'dashboard') {
                        BindPieChartWithoutLabel('servicechart', 'Count');
                        LoadServiceGrid('gridservice', dt_service.Tables[1].Rows);
                    }
                    else {
                        BindPieChartWithoutLabel('data-viewer-popup', 'Count');
                        LoadServiceGrid('grid-viewer-popup', dt_service.Tables[1].Rows);
                    }
                } else {
                    if (type == 'dashboard') {
                        $('#servicechart').html(nodataLabel);
                        $('#gridservice').html(nodataLabel);
                    }
                    else {
                        $('#data-viewer-popup').hide();
                        $('#grid-viewer-popup').hide();
                        $('#NodataDivpopup').show();


                    }
                }
            }
        

    } catch (e) { }
}

function FillUsageData(type, unit) {
    try {

        var param = { Unit: unit }
        // if (dt_daily_usage == null || dt_daily_usage == undefined) {
        $.ajax({
            async: disabled == 0 ? true : false,
            type: "POST",
            data: JSON.stringify(param),
            url: "dashboard.aspx/LoadUsage",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var count = 0;
                var r = JSON.parse(response.d);
                var odata = [];
                // Loading of data in proper format as earlier
                odata.push({ Name: "Table", Rows: r });
                var object = {};
                var ldata = {}
                ldata["Tables"] = odata.valueOf();
                data = ldata;
                dt_daily_usage = data;
                FillUsage(unit);
            },
            error: function (response) {
                console.log(response.d);
            }
        });

        //}
        //else {
        //    FillUsage();
        //}

        function FillUsage(unit) {
            if (dt_daily_usage == null) {
                if (type == 'dashboard') {
                    $('#usagechart').hide();//.html(nodataLabel);
                    $('#gridusage').hide();//.html(nodataLabel);
                    $('#NoDataDiv').show();

                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
            else {
                if ($("#div_usage_expand ul li a.active")[0].parentElement.className == "chart") {
                    $("#usagechart").hide();
                    $("#gridusage").show();
                }
                else {
                    $("#usagechart").show();
                    $("#gridusage").hide();
                }
            }

            for (var i = 0; i < dt_daily_usage.Tables[0].Rows.length; i++) {
                if (dt_daily_usage.Tables[0].Rows[i]["DateofReading"].split('/').length > 2) {
                    dt_daily_usage.Tables[0].Rows[i]["DateofReading"] = dt_daily_usage.Tables[0].Rows[i]["DateofReading"].substring(0, dt_daily_usage.Tables[0].Rows[i]["DateofReading"].lastIndexOf('/'));
                    dt_daily_usage.Tables[0].Rows[i]["TotalUnits"] = parseFloat(parseFloat(dt_daily_usage.Tables[0].Rows[i]["TotalUnits"].toString()).toFixed(2));
                }
            }
            if (unit == "P") yaxis = "kWh"; else if (unit == "W") yaxis = "HCF"; else if (unit == "G") yaxis = "CCF";
            var color;
            if (unit == "P") color = PowerColor; else if (unit == "W") color = WaterColor; else if (unit == "G") color = GasColor;
            //yaxis = 'kWh';

            processed_json = new Array();
            $.map(dt_daily_usage.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.DateofReading,
                    y: obj.TotalUnits,
                    color: color,// '#6baee3',
                    title: 'Usage(' + yaxis + ')'
                });
            });
            $("#divusage").removeClass("PreLoader");
            $("#usageLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if ($("#div_usage_expand ul li a.active")[0].parentElement.className == "chart") {
                    $("#usagechart").hide();
                    $("#gridusage").show();
                }
                else {
                    $("#usagechart").show();
                    $("#gridusage").hide();
                }
                if (type == 'dashboard') {
                    populateChart('column', 'usagechart');
                    LoadUsageGrid('gridusage', dt_daily_usage.Tables[0].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup');
                    LoadUsageGrid('grid-viewer-popup', dt_daily_usage.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#usagechart').hide();//html(nodataLabel);
                    $('#gridusage').hide();//html(nodataLabel);
                    $('#NoDataDiv').show();
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
            dtUsageChartjs = processed_json;
        }
    } catch (e) { }
}

function FillDailyUsageData(type) {
    try {
        if (dt_usage == null || dt_usage == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/LaodUsageStatus",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_usage = data;
                    FillDailyUsage();
                },
                error: function (response) {
                    console.log(response.d);
                }
            });

        }
        else {
            FillDailyUsage();

        }

        function FillDailyUsage() {
            if (dt_usage.Tables[0] == null) {
                if (type == 'dashboard') {
                    $('#usageChartDash').html(nodataLabel);
                    $('#gridDailyUsage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }

            processed_json = new Array();
            $.map(dt_usage.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.CityName,
                    y: obj.PowerDailyUsage,
                    color: PowerColor, // colorarrHEX[i],
                    title: obj.CityName
                });
            });
            $("#divDailyUsage").removeClass("PreLoader");
            $("#DailyUsageLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    BindPieChartWithoutLabel('usageChartDash', 'Daily Usage');
                    LoadUsageGridDaily('gridDailyUsage', dt_usage.Tables[0].Rows);
                }
                else {
                    BindPieChartWithoutLabel('data-viewer-popup', 'Daily Usage');
                    LoadUsageGridDaily('grid-viewer-popup', dt_usage.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#usageChartDash').html(nodataLabel);
                    $('#gridDailyUsage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
        }
    } catch (e) { }
}

function FillEfficencyData(type) {
    try {
        if (dt_efficency == null && dt_efficency == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/BindgridEe",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_efficency = data;
                    FillEfficiency();

                },
                error: function (response) {
                    console.log(response.d);
                }
            });


        } else {
            FillEfficiency();

        }

        function FillEfficiency() {
            if (dt_efficency.Tables[0] == null) {
                if (type == 'dashboard') {
                    $('#energyEffChart').html(nodataLabel);
                    $('#gridEE').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }


            processed_json = new Array();
            $.map(dt_efficency.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.Type,
                    y: obj.TotalCount,
                    color: efficolors[i],
                    title: obj.Type
                });
            });
            $("#divEfficiency").removeClass("PreLoader");
            $("#EfficiencyLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    BindPieChartWithoutLabel('energyEffChart', 'PeopleEnrolled');
                    LoadEEGrid('gridEE', dt_efficency.Tables[0].Rows);
                }
                else {
                    BindPieChartWithoutLabel('data-viewer-popup', 'PeopleEnrolled');
                    LoadEEGrid('grid-viewer-popup', dt_efficency.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#energyEffChart').html(nodataLabel);
                    $('#gridEE').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
        }
    } catch (e) { }
}

function FillSolarData(type) {
    try {
        if (dt_solar == null && dt_solar == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/LoadGeneration",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_solar = data;
                    FillGeneration();
                },
                error: function (response) {
                    console.log(response.d);
                }
            });


        } else {
            FillGeneration();

        }

        function FillGeneration() {
            if (dt_solar.Tables[0] == null) {
                if (type == 'dashboard') {
                    $('#generationchart').html(nodataLabel);
                    $('#gridgeneration').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }

            var title = 'Period: ' + dt_solar.Tables[0].Rows[0]["DateofReading"] + ' to ' + dt_solar.Tables[0].Rows[dt_solar.Tables[0].Rows.length - 1]["DateofReading"];
            $('#GenerationContainertitle').html(title);
            for (var i = 0; i < dt_solar.Tables[0].Rows.length; i++) {
                if (dt_solar.Tables[0].Rows[i]["DateofReading"].split('/').length > 2) {
                    dt_solar.Tables[0].Rows[i]["DateofReading"] = dt_solar.Tables[0].Rows[i]["DateofReading"].substring(0, dt_solar.Tables[0].Rows[i]["DateofReading"].lastIndexOf('/'));
                    dt_solar.Tables[0].Rows[i]["TotalUnits"] = dt_solar.Tables[0].Rows[i]["TotalUnits"];//removed parse int because when value was less tha 1 say .56 then it was returning zero and not showing in chart.
                }
            }

            yaxis = 'kWh';


            processed_json = new Array();
            $.map(dt_solar.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.DateofReading,
                    y: obj.TotalUnits,
                    color: SolarColor, //'#FFC118',
                    title: 'Solar(kWh)'
                });
            });
            $("#divsolar").removeClass("PreLoader");
            $("#solarLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    populateChart('column', 'generationchart');
                    LoadGenerationGrid('gridgeneration', dt_solar.Tables[0].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup');//bug id 16817	
                    LoadGenerationGrid('grid-viewer-popup', dt_solar.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#generationchart').html(nodataLabel);
                    $('#gridgeneration').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
            Generationjs = processed_json;
        }
    } catch (e) { }
}

function FillUserStatusData(type) {
    try {
        if (dt_user_status == null || dt_user_status == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/LaodUserStatus",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_user_status = data;
                    FillUserStatus();
                },
                error: function (response) {
                    console.log(response.d);
                }
            });

        }
        else {
            FillUserStatus();

        }

        function FillUserStatus() {
            $('#UserStatusContainertitle').html('Users Status');

            if (dt_user_status.Tables[0] == null) {
                if (type == 'dashboard') {
                    $('#statuschart').html(nodataLabel);
                    $('#griduser').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
            //var selectedcolor;
            //for (var i = 0; i < dt_user_status.Tables[0].Rows.length;i++) {
            //    if (dt_user_status.Tables[0].Rows[i]["ColName"] == "Active Customers")
            //    { selectedcolor = "green"; }
            //    if (dt_user_status.Tables[0].Rows[i]["ColName"] == "Inactive Customers")
            //    { selectedcolor = "red"; }
            //    if (dt_user_status.Tables[0].Rows[i]["ColName"] == "Registered Customers")
            //    { selectedcolor = "black"; }
            //}
            processed_json = new Array();
            $.map(dt_user_status.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.ColName,
                    y: obj.ColValue,
                    color: colors[i]
                     ,
                    title: obj.ColName
                });
            });
            $("#divUser").removeClass("PreLoader");
            $("#UserLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    BindPieChartWithoutLabel('statuschart', 'Count');
                    LoadUserGrid('griduser', dt_user_status.Tables[0].Rows);
                }
                else {
                    BindPieChartWithoutLabel('data-viewer-popup', 'Count');
                    LoadUserGrid('grid-viewer-popup', dt_user_status.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#statuschart').html(nodataLabel);
                    $('#griduser').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
        }
    } catch (e) { }
}

function FillElectricVechicleData(type) {
    try {
        if (dt_electric_vehicle == null || dt_electric_vehicle == undefined) {
            $.ajax({
                async: true,
                type: "POST",
                url: "dashboard.aspx/LoadElectricVehicle",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var count = 0;
                    var r = JSON.parse(response.d);
                    var odata = [];
                    // Loading of data in proper format as earlier
                    odata.push({ Name: "Table", Rows: r });
                    var object = {};
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    data = ldata;
                    dt_electric_vehicle = data;
                    FillElectricVehicle();

                },
                error: function (response) {
                    console.log(response.d);
                }
            });

        }
        else {
            FillElectricVehicle();
        }

        function FillElectricVehicle() {
            $('#ElectricVehicleContainertitle').html('Electric Vehicle');

            if (dt_electric_vehicle == null) {
                if (type == 'dashboard') {
                    $('#EVchart').html(nodataLabel);
                    $('#gridEV').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }

            processed_json = new Array();
            $.map(dt_electric_vehicle.Tables[0].Rows, function (obj, i) {
                processed_json.push({
                    name: obj.Name,
                    y: obj.Cnt,
                    color: colorarrHEX[i],
                    title: obj.Name
                });
            });
            $("#divEV").removeClass("PreLoader");
            $("#EVLoader").css('display', 'block');

            if (processed_json.length > 0) {
                if (type == 'dashboard') {
                    BindPieChartWithoutLabel('EVchart', 'Count');
                    LoadElectricVehicleGrid('gridEV', dt_electric_vehicle.Tables[0].Rows);
                }
                else {
                    BindPieChartWithoutLabel('data-viewer-popup', 'Count');
                    LoadElectricVehicleGrid('grid-viewer-popup', dt_electric_vehicle.Tables[0].Rows);
                }
            } else {
                if (type == 'dashboard') {
                    $('#EVchart').html(nodataLabel);
                    $('#gridEV').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').hide();
                    $('#grid-viewer-popup').hide();
                    $('#NodataDivpopup').show();
                }
            }
        }
    } catch (e) { }
}

function LoadOutageGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                { name: 'OutageDate' },
                { name: 'TotalOutages', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "210",
                source: dataAdapter,
                sortable: true,

                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,

                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Outage Date', dataField: 'OutageDate', width: '50%' },
                    { text: 'Total Outages', dataField: 'TotalOutages', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }

    catch (e) { }
}

function LoadUsageGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $("#NoDataDiv").hide();
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                { name: 'DateofReading' },
                { name: 'TotalUnits', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,

                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,

                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Date of Reading', dataField: 'DateofReading', width: '50%' },//text changed
                    { text: 'Total Units(' + (unit == 'G' ? 'CCF' : (unit == 'W' ? 'HCF' : 'kWh')) + ')', dataField: 'TotalUnits', width: '50%' }
                ]
            });
        }
        else { //$("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); 
            $("#NoDataDiv").show();
        }
    }
    catch (e) { }
}

function LoadGenerationGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                 { name: 'DateofReading' },
                { name: 'TotalUnits', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Date of Reading', dataField: 'DateofReading', width: '50%' },//text changed
                    { text: 'Total Units(kWh)', dataField: 'TotalUnits', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function LoadServiceGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                { name: 'ReasonName' },
                { name: 'Cnt_Reason', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Reason', dataField: 'ReasonName', width: '50%' },
                    { text: 'Requests Received', dataField: 'Cnt_Reason', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function LoadElectricVehicleGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                { name: 'Name' },
                { name: 'Cnt', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Car Name', dataField: 'Name', width: '50%' },
                    { text: 'Count', dataField: 'Cnt', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function LoadUserGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                  { name: 'ColName' },
                { name: 'ColValue', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Customers', dataField: 'ColName', width: '50%' },
                    { text: 'Count', dataField: 'ColValue', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function LoadUsageGridDaily(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                  { name: 'CityName' },
                { name: 'PowerDailyUsage', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'City', dataField: 'CityName', width: '50%' },
                    { text: 'Usage(kWh)', dataField: 'PowerDailyUsage', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function LoadEEGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
         $('#NodataDivpopup').hide();
            source = {
                datatype: "array",
                datafields: [
                  { name: 'Type' },
                { name: 'TotalCount', type: 'number' },
                ],
                async: true,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "205",
                source: dataAdapter,
                sortable: true,
                columnsheight: 27,
                theme: 'darkblue',
                altrows: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Type', dataField: 'Type', width: '50%' },
                    { text: 'Count', dataField: 'TotalCount', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>'); }
    }
    catch (e) { }
}

function switchview(viewshow, viewhide, type) {
    try {
        if ($('#NodataDivpopup').is(":visible") == false) {
            document.getElementById(viewshow).style.display = 'block';
            if (type == 'dashboard') {
                $('#' + viewshow).css('height', 205);
            }
            else {

            }
            document.getElementById(viewhide).style.display = 'none';
        } else {
            document.getElementById(viewshow).style.display = 'none';
            document.getElementById(viewhide).style.display = 'none';
        }
            //$(".jqgrid:visible").jqxGrid('updatebounddata');
        
    }
    catch (e) { }
}