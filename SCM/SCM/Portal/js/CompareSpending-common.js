var range;
var lowRange;
var highRange;
var highRange;
var seriesname1 = '';
var seriesname2 = '';
var seriesname3 = '';
var seriesname4 = '';
var CompareType = '';
var type = '';
var mode = '';
var jsonData;
var jsonDataMe;
var jsonDataZip;
var jsonDataUtility;
var text;
var textgl;
var textexp;
var charttype;
var CurrColor = ''; //'#ea557b';
var PrevColor = ''; // '#4adea0';
var UtilityColor = ''; //'#e9cc57';
var ZipColor = '';
var selectedmonth = '';
var selectedType, selectedCompareType, month;
var selectedMode, selectedColor, selectedColor2, selectedColor3;
var IsDecimal = 1;
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
                if (result.Table[i].ModuleName == 'Compare') {
                    if (result.Table[i].ConfigOption == 'Current') {
                        CurrColor = result.Table[i].ConfigValue;
                        $('.legend_Curr').css({ "background-color": CurrColor });
                    }
                    else if (result.Table[i].ConfigOption == 'Previous') {
                        PrevColor = result.Table[i].ConfigValue;
                        $('.legend_Prev').css({ "background-color": PrevColor });
                    }
                    else if (result.Table[i].ConfigOption == 'Utility') {
                        UtilityColor = result.Table[i].ConfigValue;
                        $('.legend_Utility').css({ "background-color": UtilityColor });
                    }
                    else if (result.Table[i].ConfigOption == 'Zip') {
                        ZipColor = result.Table[i].ConfigValue;
                        $('.legend_Zip').css({ "background-color": ZipColor });
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
                IsDecimal = result.Table[0].ShowDecimal == true ? 1 : 0;
            }
        },
        error: function (response) {
            console.log(response.message);
        }
    });


    if ($('#hdnPrePaid').val() == "Prepaid") {
        $("#ProjectUsageId").css('display', 'none');
    }
  

    $('#chartCompare').css('width', $('.right_content_box').width() * .98);
    $(".nav_left ul li").click(function () {
        CompareType = $(this).attr('CsType');
        $("#hdnCsType").val(CompareType);

        if (CompareType == 'CsP') {
            text = "kWh";
        }
        else if (CompareType == 'CsG') {
            text = "CCF";
        }
        else if (CompareType == 'CsW') {
            if ($('#imgGallon').css('display') == 'none' && $('#imgKwh').css('display') == 'none')
                text = "Dollar";
            else if ($('#imgKwh').css('display') == 'none')
                text = "Gal";
            else if ($('#imgGallon').css('display') == 'none')
                text = "HCF";
        }
         setdataforheader(CompareType, text);
    });

    $(".currency ul li a").click(function () {
        $(".currency ul li a").removeClass('active');
        var currType = $(this).attr("currencyType");
        if (currType == "D")
            type = "D";

        else if (currType == "K")
            type = "K";
        else
            type = "G";

        $(".currency ul li a[currencyType='" + type + "']").addClass('active');

        DrawChart(type);

    });

    $(".currency_1 ul li span input").click(function () {
        // $('.right_content_box').addClass("preLoader");
        var btnMode = $(this).attr("btnMode");
        $("#hdnMode").val(btnMode);
        $(".currency_1 ul li span input").removeClass("active");
        $(".currency_1 ul li").removeClass("active");
        $(".currency_1 ul li span input[btnMode='" + btnMode + "']").addClass("active");
        $($(this).parent().parent()).addClass("active");
        if (btnMode == "M") {
            $('#lblDisclaimerMe').css("display", "block");
            $('#lblDisclaimerZip').css("display", "none");
            $('#lblDisclaimerUtility').css("display", "none");
            $('#lblDisclaimerAll').css("display", "none");
        }
        else if (btnMode == "Z") {
            $('#lblDisclaimerMe').css("display", "none");
            $('#lblDisclaimerZip').css("display", "block");
            $('#lblDisclaimerUtility').css("display", "none");
            $('#lblDisclaimerAll').css("display", "none");
        }
        else if (btnMode == "U") {
            $('#lblDisclaimerMe').css("display", "none");
            $('#lblDisclaimerZip').css("display", "none");
            $('#lblDisclaimerUtility').css("display", "block");
            $('#lblDisclaimerAll').css("display", "none");
        }
        else if (btnMode == "A") {
            $('#lblDisclaimerMe').css("display", "none");
            $('#lblDisclaimerZip').css("display", "none");
            $('#lblDisclaimerUtility').css("display", "none");
            $('#lblDisclaimerAll').css("display", "block");
        }

        DrawChart(type, '');

    });

    $("#ddlMonth").change(function () {
        selectedmonth = $("#ddlMonth option:selected").val();
        DrawChart(type, selectedmonth);
    });
   
    var CompareType = $('#hdnCsType').val();
    if (CompareType == 'CsP') {
        $('#imgGallon').hide();
    }
    else if (CompareType == 'CsG') {
        $('#imgGallon').hide();
    }
    else if (CompareType == 'CsW') {
        $('#imgGallon').show();
    }

    setCurrency();
    setActiveMode();
    type = $("#hdnType").val();

    DrawChart(type, '');
});

function DrawChart(Type, selectedmonth) {
    try {

        var param = { type: Type }
       

        $.ajax({
            type: "POST",
            url: "Compare-Spending.aspx/GetChartType",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                charttype = response.d;
                $.ajax({
                    type: "POST",
                    url: "Compare-Spending.aspx/LoadData",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            },
            error: function (response) {
                console.log(response.d);
            }
        });
        var session = common.checksession().value;
        if (session) {
            toastr.error('Your session has expired. Please re-login.')
            window.location.href = "default.aspx";
            return;
        }

       

      
      
        function OnError(request, status, error) {
            loader.hideloader();
            toastr.error(request.statusText)
            
        }
        //Month is set to -1 in order to not show month bar if Month Drop down is hidden.
        //Setting Value to -1 will not show bar even ig code is written to generate it.
        function hidemonth(mon) {
            if ($(".compare_month").css('display') == 'none') {
                mon = -1;
            }
            return mon;
        }

        function OnSuccess(data, status) {
            try {
                $('.right_content_box').removeClass("preLoader");
                if (data != null) {
                    selectedType = Type;
                    showDivLabel();
                    selectedMode = $("#hdnMode").val();
                    selectedCompareType = $("#hdnCsType").val();
                    setActiveLi(selectedCompareType);
                    if (selectedType == "D") {
                        selectedType = $('#lblUDollar').text(); //"Cost of Units Consumed ($)";
                        text = "Dollar";

                    }
                    else if (selectedCompareType == "CsG") {
                        selectedType = $('#lblGCCF').text(); //"Units Consumed (Ccf)";
                        text = "CCF";
                    }
                    else if (selectedCompareType == "CsP") {
                        selectedType = $('#lblPKWH').text(); //"Units Consumed (kWh)";
                        text = "kWh";
                    }
                    else if (selectedCompareType == "CsW") {
                        //added by priyansha for displaying units consumed in gallon or hcf
                        if (selectedType == "K") {
                            selectedType = $('#lblWHCF').text();//"Units Consumed (HCF)";
                            text = "HCF";
                        }
                        else if (selectedType == "G") {
                            selectedType = $('#lblWGL').text();//"Units Consumed (GL)";
                            text = "Gal";
                        }
                    }
                    $('#ddlMonth').empty();
                    var newdata = JSON.parse(data.d);
                    SetNextMeterReadDate(newdata.Table5);
                    var odata = [];
                    odata.push({ Name: "TblChartType", Rows: newdata.TblChartType });
                    var ldata = {}
                    ldata["Tables"] = odata.valueOf();
                    var dtchart = ldata;
                    charttype = dtchart.Tables[0].Rows[0]["CompareChartType"];
                    var currentMonth = '';
                    var previousMonth = '';
                    var currentyear = '';
                    var previousyear = '';
                    jsonDataUtility = newdata.Table2;
               
                    if (selectedMode == "M") {
                        seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                        seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                        selectedColor = PrevColor;
                        jsonDataMe = newdata.Table1;
                    }
                    else if (selectedMode == "Z") {
                        // 'Zip Average';
                        seriesname1 = $('#zipAvg').text();
                        seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                        selectedColor = ZipColor;
                        jsonDataMe = newdata.Table3;

                    }
                    else if (selectedMode == "U") {
                        //'Utility Average'
                        selectedColor = UtilityColor;
                        seriesname1 = $('#utilityAvg').text();
                        seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                        jsonDataMe = newdata.Table2;
                    }
                    else if (selectedMode == "A") {
                        selectedColor = PrevColor;
                        selectedColor2 = ZipColor;
                        selectedColor3 = UtilityColor;
                        seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                        seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                        seriesname3 = $('#zipAvg').text();
                        seriesname4 = $('#utilityAvg').text();
                        jsonDataMe = newdata.Table;
                        jsonDataUtility = newdata.Table2;
                        jsonDataZip = newdata.Table3;
                    }
                }

                yaxis = selectedType;
                processed_json = new Array();
                processed_json2 = new Array();
                processed_json3 = new Array();
                processed_json4 = new Array();
                processed_jsonAllocation = new Array();

                var option = '';
                for (var i = 0; i < jsonDataUtility.length; i++) {
                    option += '<option value="' + jsonDataUtility[i]["MOD"] + '">' + getMonthName(jsonDataUtility[i]["MOD"]) + " " + jsonDataUtility[i]["YOD"] + '</option>';
                }
                $('#ddlMonth').append(option);

                if (selectedmonth != "" && selectedmonth != undefined) {
                    $("#ddlMonth").val(selectedmonth);
                } else {
                    if (jsonDataUtility.length != 0)
                        $("#ddlMonth").val(jsonDataUtility[jsonDataUtility.length - 1]["MOD"]);
                    else
                        $("#ddlMonth").val('');
                }

                var month = jsonDataUtility.length != 0 ? $("#ddlMonth option:selected").text().split(" ")[0] : "";
                var monthvalue = jsonDataUtility.length != 0 ? $("#ddlMonth option:selected").val() : "";
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



                if (selectedMode == "A") {
                    $.map(newdata.Table1, function (obj, i) {
                        processed_json.push({
                            y: IsDecimal == 1 ? obj.Consumed : parseInt(obj.Consumed),
                            name: getMonthName(obj.MOD),
                            color: selectedColor,
                            year: obj.YOD
                        })
                    });
                    if ($('#hdnValueM').val() == "True") {
                        $.map(jsonDataMe, function (obj, i) {
                            processed_json2.push({
                                y: IsDecimal == 1 ? obj.Consumed : parseInt(obj.Consumed),
                                name: getMonthName(obj.MOD),
                                color: CurrColor,
                                year: obj.YOD
                            })
                        });
                    }
                    if ($('#hdnValueZ').val() == "True") {
                        $.map(jsonDataZip, function (obj, i) {
                            processed_json3.push({
                                y: IsDecimal == 1 ? obj.Consumed : parseInt(obj.Consumed),
                                name: getMonthName(obj.MOD),
                                color: selectedColor2,
                                year: obj.YOD
                            })
                        });
                    }
                    if ($('#hdnValueU').val() == "True") {
                        $.map(jsonDataUtility, function (obj, i) {
                            processed_json4.push({
                                y: IsDecimal == 1 ? obj.Consumed : parseInt(obj.Consumed),
                                name: getMonthName(obj.MOD),
                                color: selectedColor3,
                                year: obj.YOD
                            });
                        });
                    }
                    if (type != "D" && selectedCompareType == "CsW") {
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            $.map(newdata.Table, function (obj, i) {
                                processed_jsonAllocation.push({
                                    y: IsDecimal == 1 ? obj.AllocationValue : parseInt(obj.AllocationValue),
                                    name: getMonthName(obj.MOD),
                                    color: "#31afdb",
                                    year: obj.YOD
                                })
                            });
                        }
                    }
                    var mon = $("#ddlMonth option:selected").val();

                    //x-axis marker

                    var monStartIndex = getMonthValue($("#ddlMonth option:first-child").text().split(" ")[0]);
                    //var monStartIndex = 2;
                    if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
                    else if (parseInt(mon) == monStartIndex) { mon = 0; }
                    else { mon = (parseInt(mon) + 12) - monStartIndex; }
                    //x-axis marker

                    BindhighChart4SeriesLine(charttype, 'chartCompare', selectedColor, "#c56e6e", selectedColor2, selectedColor3, seriesname1, seriesname2, seriesname3, seriesname4, $('#hdnCsType').val(), hidemonth(mon));

                }
                else {

                    $.map(newdata.Table, function (obj, i) {
                        processed_json2.push({
                            y: IsDecimal == 1 ? obj.Consumed: parseInt(obj.Consumed),
                            name: getMonthName(obj.MOD),
                            color: CurrColor,
                            year: obj.YOD
                        });
                    });
                    //  }
                    $.map(jsonDataMe, function (obj, i) {
                        processed_json.push({
                            y: IsDecimal == 1 ? obj.Consumed: parseInt(obj.Consumed),
                            name: getMonthName(obj.MOD),
                            color: selectedColor,
                            year: obj.YOD
                        })
                    });
                    if (type != "D" && selectedCompareType == "CsW") {
                        if ($('#hdnWaterAllocation').val() == 'True') {
                            $.map(newdata.Table, function (obj, i) {
                                processed_jsonAllocation.push({
                                    y: IsDecimal == 1 ?  obj.AllocationValue: parseInt(obj.AllocationValue),
                                    name: getMonthName(obj.MOD),
                                    color: "#31afdb",
                                    year: obj.YOD
                                })
                            });
                        }
                    }

                    var mon = $("#ddlMonth option:selected").val();

                    //x-axis marker
                    var monStartIndex = getMonthValue($("#ddlMonth option:first-child").text().split(" ")[0]);
                    //var monStartIndex = 2;
                    if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
                    else if (parseInt(mon) == monStartIndex) { mon = 0; }
                    else { mon = (parseInt(mon) + 12) - monStartIndex; }
                 
                    BindhighChart2SeriesLine(charttype, 'chartCompare', selectedColor, "#c56e6e", seriesname1, seriesname2, $('#hdnCsType').val(), hidemonth(mon), IsDecimal);

                }

                setLabelsValue(processed_json, processed_json2, processed_json3, processed_json4, selectedMode);
                setdataforheader(selectedCompareType, selectedType);
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

function SetNextMeterReadDate(table5) {
    if (table5 != null) {
        var title = $('#LinkYourUsage').attr('data-original-title');
        title = title.replace('mm/dd/yyyy', table5[0]["NextMeterReadStartDate"]);
        title = title.replace('mm/dd/yyyy', table5[0]["NextMeterReadDate"]);
        $('#LinkYourUsage').attr('data-original-title', title);
    }
}

function getMonthValue(monthname) {
    var month1 = monthname;
    month1 = month1.toLowerCase();
    if ($('#hdnLanguageCode').val() == 'EN') {
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        month1 = months.indexOf(month1);
        return month1 + 1;
    }
    else {
        var months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        month1 = months.indexOf(month1);
        return month1 + 1;
    }
}

function loadRange() {
    range = comUsage.LoadRange().value;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["UsageType"] == "E" && range.Rows[r]["Type"] == "K" && range.Rows[r]["RangeMode"] == "D") {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["HighRange"];
            break;
        }
    }

}

function getColor(Usageval) {
    if (Usageval <= lowRange) {
        color = '#93d501';
    }
    else if (Usageval > lowRange && Usageval <= highRange) {
        color = '#F8A13F';
    }
    else if (Usageval > highRange) {
        color = '#ba3d4b';
    }

    return color;
}

function getColorforLabel(val) {
    if (val <= lowRange) {
        color = '#1d7000';
    }
    else if (val > lowRange && val <= highRange) {
        color = '#f7a913';
    }
    else if (val > highRange) {
        color = '#b30013';
    }

    return color;
}

function setActiveLi(selectedCompareType) {
    $(".nav_left ul li").removeClass('active');
    $(".nav_left ul li[CsType='" + selectedCompareType + "']").addClass('active');
}

function setcolor(usagevalue, Range) {
    try {
        var color = '#FFFFFF';
        if (Range <= usagevalue) {
            color = PrevColor;
        }
        else if (Range > usagevalue) {
            color = CurrColor;
        }
        return color;
    }
    catch (ex) { }
}

function setTopHeaders() {

    try {
        setheaderwidth();

        if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal' || text == 'GL') {
            if ($('#lblYourBudget').is(":visible") == true && $('#lblProjectedUsage').is(":visible") == true) {
                $("#lblYourUsage").text($("#hdnUsageSoFar").val() + " " + text);
                $("#lblProjectedUsage").text($("#hdnExpetedUsage").val() + " " + textexp);
                //document.getElementById('lblProjectedUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnExpetedUsage").val());
                //document.getElementById('lblYourUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnUsageSoFar").val());
            }
            else {
                $("#lblYourUsage").text($("#hdnUsageSoFar").val() + " " + text);
                $("#lblProjectedUsage").text($("#hdnExpetedUsage").val() + " " + text);
            }
            $("#lbUsageSoFar").text($("#hdnUsageSoFar").val() + " " + text);
            $("#lblYourBudget").text("$" + $("#hdnBudgut").val());
            $("#lblBudgut").text("$" + $("#hdnBudgut").val());
            $("#lblgeExpetedUsage").text($("#hdnExpetedUsage").val() + " " + text);
        }
        else {
            $("#lbUsageSoFar").text($("#hdnUsageSoFar").val());
            $("#lblYourBudget").text($("#hdnBudgut").val());
            $("#lblBudgut").text($("#hdnBudgut").val());
            $("#lblgeExpetedUsage").text($("#hdnExpetedUsage").val());
            if ($('#lblYourBudget').is(":visible") == true && $('#lblProjectedUsage').is(":visible") == true) {
                $("#lblYourUsage").text($("#hdnUsageSoFar").val());
                $("#lblProjectedUsage").text($("#hdnExpetedUsage").val());
                //document.getElementById('lblProjectedUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnExpetedUsage").val());
                //document.getElementById('lblYourUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnUsageSoFar").val());
            }
            else {
                $("#lblYourUsage").text($("#hdnUsageSoFar").val());
                $("#lblProjectedUsage").text($("#hdnExpetedUsage").val());
            }
        }
    }
    catch (ex) {
        var msg = ex.message;
    }
}

function setCurrency() {
    try {
        var CompareType = $('#hdnCsType').val();
        var currtype = $('#hdnType').val();
        if (currtype == 'K') {
            if (CompareType == 'CsP') {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');
                $('.currency ul li a[currencyType=K]').addClass("active");

                $('#imgKwh').attr('style', 'display:' + $('#hdnPowerkwh').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnPowerDollar').val());
            }
            else if (CompareType == 'CsG') {
                $('#imgKwh').attr('Text', 'CCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_CCF');
                $('#imgKwh').text('CCF');
                $('.currency ul li a[currencyType=K]').addClass("active");
                $('#imgKwh').attr('style', 'display:' + $('#hdnGasCCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnGasDollar').val());

            }
            else if (CompareType == 'CsW') {
                $('#imgKwh').attr('Text', 'HCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_HCF');
                $('#imgKwh').text('HCF');
                $('.currency ul li a[currencyType=K]').addClass("active");
                $('#imgGallon').attr('style', 'display:' + $('#hdnWaterGL').val());
                $('#imgKwh').attr('style', 'display:' + $('#hdnWaterHCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnWaterDollar').val());

            }
            else {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');
                $('.currency ul li a[currencyType=K]').addClass("active");
            }
        }
        else if (currtype == 'D') {
            $('.currency ul li a[currencyType=D]').addClass("active");
            if (CompareType == 'CsP') {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');

                $('#imgKwh').attr('style', 'display:' + $('#hdnPowerkwh').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnPowerDollar').val());
            }
            else if (CompareType == 'CsG') {
                $('#imgKwh').attr('Text', 'CCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_CCF');
                $('#imgKwh').text('CCF');
                $('#imgKwh').attr('style', 'display:' + $('#hdnGasCCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnGasDollar').val());

            }
            else if (CompareType == 'CsW') {
                $('#imgKwh').attr('Text', 'HCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_HCF');
                $('#imgKwh').text('HCF');
                $('#imgGallon').attr('style', 'display:' + $('#hdnWaterGL').val());
                $('#imgKwh').attr('style', 'display:' + $('#hdnWaterHCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnWaterDollar').val());

            }
            else {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');
            }
        }
        else if (currtype == 'G') {
            $('.currency ul li a[currencyType=G]').addClass("active");
            if (CompareType == 'CsP') {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');

                $('#imgKwh').attr('style', 'display:' + $('#hdnPowerkwh').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnPowerDollar').val());
            }
            else if (CompareType == 'CsG') {
                $('#imgKwh').attr('Text', 'CCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_CCF');
                $('#imgKwh').text('CCF');
                $('#imgKwh').attr('style', 'display:' + $('#hdnGasCCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnGasDollar').val());

            }
            else if (CompareType == 'CsW') {
                $('#imgKwh').attr('Text', 'HCF');
                $('#imgKwh').attr('globalize', 'ML_Compare_HCF');
                $('#imgKwh').text('HCF');
                $('#imgGallon').attr('style', 'display:' + $('#hdnWaterGL').val());
                $('#imgKwh').attr('style', 'display:' + $('#hdnWaterHCF').val());
                $('#imgDollar').attr('style', 'display:' + $('#hdnWaterDollar').val());

            }
            else {
                $('#imgKwh').attr('Text', 'kWh');
                $('#imgKwh').attr('globalize', 'ML_Compare_KWH');
                $('#imgKwh').text('kWh');
            }
        }
        else {
            $('.currency ul li a[currencyType=D]').addClass("active");

        }
    }
    catch (ex) { }
}

function setActiveMode() {
    try {
        var btnMode = $(".currency_1 ul li span input").attr("btnMode");
        $(".currency_1 ul li span input").removeClass("active");
        $(".currency_1 ul li span input[btnMode='" + btnMode + "']").addClass("active");
    }
    catch (ex) {
        var msg = ex.message;
    }
}

function showDivLabel() {
    try {
        var mode = $("#hdnMode").val();
        switch (mode) {
            case 'M':
                $("#divPrev").show();
                $("#divZ").hide();
                $("#divU").hide();
                $('#zipAvg').hide();
                $('#utilityAvg').hide();
                if (type != "D" && $("#hdnCsType").val() == "CsW") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $("#divWA").show();
                    }
                    else {
                        $("#divWA").hide();
                    }
                }
                else {
                    $("#divWA").hide();
                }
                break
            case 'Z':
                $("#divPrev").hide();
                $("#divZ").show();
                $('#zipAvg').show();
                $("#divU").hide();
                $('#utilityAvg').hide();
                if (type != "D" && $("#hdnCsType").val() == "CsW") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $("#divWA").show();
                    }
                    else {
                        $("#divWA").hide();
                    }
                }
                else {
                    $("#divWA").hide();
                }
                break
            case 'U':
                $("#divPrev").hide();
                $("#divZ").hide();
                $("#divU").show();
                $('#zipAvg').hide();
                $('#utilityAvg').show();
                if (type != "D" && $("#hdnCsType").val() == "CsW") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $("#divWA").show();
                    }
                    else {
                        $("#divWA").hide();
                    }
                }
                else {
                    $("#divWA").hide();
                }
                break
            case 'A':
                $("#divPrev").show();
                if ($('#hdnValueZ').val() == 'True') {
                    $("#divZ").show();
                    $('#zipAvg').show();
                }
                else {
                    $('#zipAvg').hide();
                    $("#divZ").hide();
                }
                if ($('#hdnValueU').val() == 'True') {
                    $("#divU").show();
                    $('#utilityAvg').show();
                }
                else {
                    $("#divU").hide();
                    $('#utilityAvg').hide();
                }
                if (type != "D" && $("#hdnCsType").val() == "CsW") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $("#divWA").show();
                    }
                    else {
                        $("#divWA").hide();
                    }
                }
                else {
                    $("#divWA").hide();
                }
                break
            default:
                $("#divPrev").show();
                $("#divZ").show();
                $("#divU").show();
                $('#zipAvg').show();
                $('#utilityAvg').show();
                if (type != "D" && $("#hdnCsType").val() == "CsW") {
                    if ($('#hdnWaterAllocation').val() == 'True') {
                        $("#divWA").show();
                    }
                    else {
                        $("#divWA").hide();
                    }
                }
                else {
                    $("#divWA").hide();
                }
                break
        }
    }
    catch (ex) {
        var msg = ex.message;
    }
}

//jsonData1 for Month, jsonData2 for prev, jsonData3 for zip, jsonData4 for utility
function setLabelsValue(jsonData1, jsonData2, jsonData3, jsonData4, selectedMode) {
    try {
        var PreviousAvg;
        var month = $("#ddlMonth option:selected").text().split(" ")[0];
        var mnth = getMonthName($("#ddlMonth option:selected").val());
        var year = (parseInt($("#ddlMonth option:selected").text().split(" ")[1]));
        var monthlyAvg, PreviousAvglbl, Monthavglabel, lblPreveslabel, zipAvg, utilityAvg;
       
        $.each(jsonData1, function (i, obj) {
            if (obj.name == month) {
                //PreviousAvg = obj.y;
                PreviousAvg = (obj.y == null) ? null : ( IsDecimal == 1 ? parseFloat(obj.y).toFixed(2) : parseInt(obj.y));
                lblPreveslabel = obj.name + " " + obj.year

            }
        });

        $.each(jsonData2, function (i, obj) {
            if (obj.name == month) {
                //monthlyAvg = obj.y;
                monthlyAvg = (obj.y == null) ? null :  (IsDecimal == 1 ? parseFloat(obj.y).toFixed(2) : parseInt(obj.y));
                Monthavglabel = obj.name + " " + obj.year

            }
        });
        if (jsonData3 != null && jsonData3 != "") {
            $.each(jsonData3, function (i, obj) {
                if (obj.name == month) {
                    //zipAvg = obj.y;
                    zipAvg = (obj.y == null) ? null :  (IsDecimal == 1 ? parseFloat(obj.y).toFixed(2) : parseInt(obj.y));
                }
            });
        }
        if (jsonData4 != null && jsonData3 != "") {
            $.each(jsonData4, function (i, obj) {
                if (obj.name == month) {
                    //utilityAvg = obj.y;
                    utilityAvg = (obj.y == null) ? null :  (IsDecimal == 1 ? parseFloat(obj.y).toFixed(2) : parseInt(obj.y));
                }
            });
        }
        if (jsonData4 != null && jsonData4 != "") {
            $.each(jsonData4, function (i, obj) {
                if (obj.name == month) {
                    //utilityAvg = obj.y;
                    utilityAvg = (obj.y == null) ? null : (IsDecimal == 1 ? parseFloat(obj.y).toFixed(2) : parseInt(obj.y));
                }
            });
        }


        if (type == "D") {
            $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : "$" + changetoK(parseFloat(monthlyAvg), IsDecimal));
            $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
            if (selectedMode == "A") {
                $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal));
                $("#lblPreveslabel").text((lblPreveslabel == undefined ? (mnth + " " + (year - 1) + ":") : (lblPreveslabel + ":")));
                $("#lblZipcodeavg").text(zipAvg == null ? 'N/A' : "$" + changetoK(parseFloat(zipAvg), IsDecimal));
                $("#lblUtilityavg").text(utilityAvg == null ? 'N/A' : "$" + changetoK(parseFloat(utilityAvg), IsDecimal));
            }
            else {
                $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal));
                $("#lblPreveslabel").text(lblPreveslabel + ":");
                $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal));
                $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal));
            }
        }
        else {
            if (selectedMode == "A") {
                $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : changetoK(parseFloat(monthlyAvg), IsDecimal) + " " + text);
                $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
                $("#lblPreves").text(PreviousAvg == null ? 'N/A' : changetoK(parseFloat(PreviousAvg), IsDecimal) + " " + text);
                $("#lblPreveslabel").text((lblPreveslabel == undefined ? (mnth + " " + (year - 1) + ":") : (lblPreveslabel + ":")));
                if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal') {
                    $("#lblZipcodeavg").text(zipAvg == null ? "N/A" : changetoK(parseFloat(zipAvg), IsDecimal) + " " + text);
                    $("#lblUtilityavg").text(utilityAvg == null ? "N/A" : changetoK(parseFloat(utilityAvg), IsDecimal) + " " + text);

                }
                else {
                    $("#lblZipcodeavg").text(zipAvg == null ? 'N/A' : "$" + changetoK(parseFloat(zipAvg), IsDecimal) + text);
                    $("#lblUtilityavg").text(utilityAvg == null ? 'N/A' : "$" + changetoK(parseFloat(utilityAvg), IsDecimal) + text);
                }
            }
            else {
                $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : changetoK(parseFloat(monthlyAvg), IsDecimal) + " " + text);
                $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
                $("#lblPreves").text(PreviousAvg == null ? 'N/A' : changetoK(parseFloat(PreviousAvg), IsDecimal) + " " + text);
                $("#lblPreveslabel").text((lblPreveslabel == undefined ? (mnth + " " + (year - 1) + ":") : (lblPreveslabel + ":")));
                if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal') {

                    $("#lblZipcodeavg").text(PreviousAvg == null ? "N/A" : changetoK(parseFloat(PreviousAvg), IsDecimal) + " " + text);
                    $("#lblUtilityavg").text(PreviousAvg == null ? "N/A" : changetoK(parseFloat(PreviousAvg), IsDecimal) + " " + text);

                }
                else {
                    $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal) + text);
                    $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg), IsDecimal) + text);
                }
            }
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
}


function setdataforheader(strComparetype) {

    var usagedata = '';
    usagedata = Compare_Spending.LoadHeadervalues(strComparetype);
    var width = "";
    var color = "";
    textexp = textgl = text;

    var powusage;
    var mybud;
    var expecusage;
    var arr = [];
   
    switch (strComparetype) {
        case 'CsP':
            if (text == 'kWh') {
                $('#hdnUsageSoFar').val(usagedata.value.Rows[0]== null ? 'N/A' : "$" + changetoK(usagedata.value.Rows[0]["PowerUnitUsageSoFar"]));
                $('#hdnBudgut').val(usagedata.value.Rows[0] == null ? 'N/A' : "$" + changetoK(usagedata.value.Rows[0]["MyBudget"]));
                $('#hdnExpetedUsage').val(usagedata.value.Rows[0] == null ? 'N/A' : "$" + changetoK(usagedata.value.Rows[0]["PowerUnitExpectedUsage"]));

                powusage =usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["PowerUnitUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUnitUsageSoFar"]);
                mybud =usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"])
                expecusage =usagedata.value.Rows[0] == null ? 'N/A': usagedata.value.Rows[0]["PowerUnitExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUnitExpectedUsage"]);

                arr.push(usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["PowerUnitUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUnitUsageSoFar"]));
                arr.push(usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUnitUsageSoFar"]));
                arr.push(usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["PowerUnitExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUnitUsageSoFar"]));
                arr.sort();
                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";

            }

            else {
                $('#hdnUsageSoFar').val("$" + changetoK(usagedata.value.Rows[0]["PowerUsageSoFar"]));
                $('#hdnBudgut').val("$" + changetoK(usagedata.value.Rows[0]["MyBudget"]), IsDecimal);
                $('#hdnExpetedUsage').val("$" + changetoK(usagedata.value.Rows[0]["PowerExpectedUsage"]));

                powusage = usagedata.value.Rows[0]["PowerUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerUsageSoFar"]);
                mybud = usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = usagedata.value.Rows[0]["PowerExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["PowerExpectedUsage"]);

                arr.push(usagedata.value.Rows[0]["PowerUsageSoFar"]);
                arr.push(usagedata.value.Rows[0]["MyBudget"]);
                arr.push(usagedata.value.Rows[0]["PowerExpectedUsage"])
                arr.sort();

                var largest = Math.max.apply(Math, arr);

                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / arr[2] > 1 ? 1 : expecusage / arr[2]) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";

            }
            break;
        case 'CsG':
            if (text == 'CCF') {
                $('#hdnUsageSoFar').val(changetoK(usagedata.value.Rows[0]["GasUnitUsageSoFar"]));
                $('#hdnBudgut').val(changetoK(usagedata.value.Rows[0]["MyBudget"]));
                $('#hdnExpetedUsage').val(changetoK(usagedata.value.Rows[0]["GasUnitExpectedUsage"]));

                powusage = usagedata.value.Rows[0]["GasUnitUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["GasUnitUsageSoFar"]);
                mybud = usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = usagedata.value.Rows[0]["Co2UnitExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["GasUnitExpectedUsage"]);

                arr.push(usagedata.value.Rows[0]["GasUnitUsageSoFar"]);
                arr.push(usagedata.value.Rows[0]["MyBudget"]);
                arr.push(usagedata.value.Rows[0]["GasUnitExpectedUsage"])
                arr.sort();
                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";
            }
            else {
                $('#hdnUsageSoFar').val("$" + changetoK(usagedata.value.Rows[0]["GasUsageSoFar"]));
                $('#hdnBudgut').val("$" + changetoK(usagedata.value.Rows[0]["MyBudget"]));
                $('#hdnExpetedUsage').val("$" + changetoK(usagedata.value.Rows[0]["Co2ExpectedUsage"]));

                powusage = usagedata.value.Rows[0]["GasUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["GasUsageSoFar"]);
                mybud = usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = usagedata.value.Rows[0]["GasExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["GasExpectedUsage"]);

                arr.push(usagedata.value.Rows[0]["GasUsageSoFar"]);
                arr.push(usagedata.value.Rows[0]["MyBudget"]);
                arr.push(usagedata.value.Rows[0]["GasExpectedUsage"])
                arr.sort();
                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";
            }
            break;
        case 'CsW':
            if (text == 'HCF')//HCF
            {          

                $('#hdnUsageSoFar').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : (changetoK(usagedata.value.Rows[0]["WaterUnitUsageSoFar"])));
                $('#hdnBudgut').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : (changetoK(usagedata.value.Rows[0]["MyBudget"])));
                $('#hdnExpetedUsage').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : (changetoK(usagedata.value.Rows[0]["WaterUnitExpectedUsage"])));

                //powusage = usagedata.value.Rows[0]["WaterUnitUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterUnitUsageSoFar"]);
                //mybud = usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                //expecusage = usagedata.value.Rows[0]["WaterUnitExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterUnitExpectedUsage"]);

                powusage = usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterUnitUsageSoFar"]);
                mybud = usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterUnitExpectedUsage"]);


                //arr.push(usagedata.value.Rows[0]["WaterUnitUsageSoFar"]);
                //arr.push(usagedata.value.Rows[0]["MyBudget"]);
                //arr.push(usagedata.value.Rows[0]["WaterUnitExpectedUsage"])

                arr.push(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitUsageSoFar"]);
                arr.push(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["MyBudget"]);
                arr.push(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitExpectedUsage"])

                arr.sort();
                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";
            }
            else if (text == 'Gal') {
                
             //   usagedata.value.Rows[0] == null ? 'N/A' : "$" + changetoK(usagedata.value.Rows[0]["PowerUnitUsageSoFar"], IsDecimal)
                var gl = (((usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitUsageSoFar"]) * 748).toFixed(2));
                var glExpected = (((usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : usagedata.value.Rows[0]["WaterUnitExpectedUsage"]) * 748).toFixed(2));

                $('#hdnUsageSoFar').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : changetoK(gl));
                $('#hdnBudgut').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : changetoK(usagedata.value.Rows[0]["MyBudget"]));
                $('#hdnExpetedUsage').val(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : changetoK(glExpected));
                  
                powusage = gl == "" ? 0 : parseFloat(gl);
                mybud =usagedata.value.Rows[0] == undefined ? 'N/A': usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = glExpected == "" ? 0 : parseFloat(glExpected);
                arr.push(gl);
                arr.push(usagedata.value.Rows[0] == undefined ? 'N/A' : usagedata.value.Rows[0] == null ? 'N/A' : "$" + usagedata.value.Rows[0]["MyBudget"], IsDecimal);
                arr.push(glExpected)
                arr.sort();

                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";


            }
            else {
                $('#hdnUsageSoFar').val("$" + changetoK(usagedata.value.Rows[0]["WaterUsageSoFar"]));
                $('#hdnBudgut').val("$" + changetoK(usagedata.value.Rows[0]["MyBudget"]));
                $('#hdnExpetedUsage').val("$" + changetoK(usagedata.value.Rows[0]["WaterExpectedUsage"]));

                powusage = usagedata.value.Rows[0]["WaterUsageSoFar"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterUsageSoFar"]);
                mybud = usagedata.value.Rows[0]["MyBudget"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["MyBudget"]);
                expecusage = usagedata.value.Rows[0]["WaterExpectedUsage"] == "" ? 0 : parseFloat(usagedata.value.Rows[0]["WaterExpectedUsage"]);

                arr.push(usagedata.value.Rows[0]["WaterUsageSoFar"]);
                arr.push(usagedata.value.Rows[0]["MyBudget"]);
                arr.push(usagedata.value.Rows[0]["WaterExpectedUsage"])
                arr.sort();
                var largest = Math.max.apply(Math, arr);
                color = GetBarColor(powusage, mybud);
                width = ((powusage / largest > 1 ? 1 : powusage / largest) * 100).toFixed(2) + "%";
                divusage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width:" + width + ";\">&nbsp;</div></div>";

                width = ((mybud / largest > 1 ? 1 : mybud / largest) * 100).toFixed(2) + "%";
                divBudget.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(121, 209, 181); width: " + width + ";\">&nbsp;</div></div>";

                color = GetBarColor(expecusage, mybud);
                width = ((expecusage / largest > 1 ? 1 : expecusage / largest) * 100).toFixed(2) + "%";
                divExpectedUsage.innerHTML = "<div class=\"ProgressContainer\"><div class=\"ProgressMeter\" style=\"background-color: rgb(236, 98, 94); width: " + width + ";\">&nbsp;</div></div>";
            }
            break;
        default:

            break;

    }

    setTopHeaders();

}

function GetBarColor(value, comparevalue) {
    var c;
    if (value > comparevalue) {
        c = "red";
    }
    else { c = "rgb(28, 187, 28)"; }
    return c;
}

function setheaderwidth() {
    var i = 0;
    var UsageId = $('#UsageId').is(":visible") == true ? 1 : 0;
    var BudgetId = $('#BudgetId').is(":visible") == true ? 1 : 0;
    var ProjectUsageId = $('#ProjectUsageId').is(":visible") == true ? 1 : 0;
    var count = UsageId + BudgetId + ProjectUsageId;
    switch (count) {
        case 1: $('#HeaderData ul li').css('width', '100%');
            break;
        case 2: $('#HeaderData ul li').css('width', '50%');
            break;
        case 3: $('#HeaderData ul li').css('width', '33.3%');
            break;
    }
}
