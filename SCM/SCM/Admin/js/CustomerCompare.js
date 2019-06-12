$(document).ready(function () {
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
    var highcolor = '#c56e6e';
    var lowcolor = '#7cab92';
    var avgcolor = '#d39d76';
    var CompareType = "";
    var selectedmonth = "";

    $(document).on("click", "#CompareMeDiv", function () {

        hideshowMeterType();
        $('#chartCompare').width(($('.popup_area').width() * .985) + 'px');
        $('#chartCompare').height(($('.popup_area').height() - 240) + 'px');      
        $("#Comparetype").change(function () {
            CompareType = $(this).val();
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
            setcharttype();
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
            var btnMode = $(this).attr("btnMode");
            $("#hdnCompMode").val(btnMode);
            setActivemode(btnMode);
            DrawChart(type);
        });

        $("#ddlMonth").change(function () {
            loader.showloader();
            selectedmonth = $("#ddlMonth option:selected").val();
            DrawChart(type, selectedmonth);
        });
        setActivemode($("#hdnCompMode").val());
        setcharttype();

    });

    function setActivemode(btnMode) {
        $(".currency_1 ul li span input").removeClass("active");
        $(".currency_1 ul li span input[btnMode='" + btnMode + "']").addClass("active");
    }

    function setcharttype() {
        loader.showloader();

        CompareType = $("#Comparetype").val();

        $("#hdnCsType").val(CompareType);

        if (CompareType == 'CsP') {
            $('#imgGallon').hide();
        }
        else if (CompareType == 'CsG') {
            $('#imgGallon').hide();
        }
        else if (CompareType == 'CsW') {
            $('#imgGallon').show();
        }
        var param = { compType: CompareType }
        var url1 = $('#hdnCommonUrl').val()+"/UserManagement/Customer.aspx/setChartType";

        $.ajax({
            type: "POST",
            url: url1,//"../UserManagement/Customer.aspx/setChartType",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var data = JSON.parse(result.d);
                $('#hdnType').val(data);
                type = data;
                setCurrency();
                setchartviewtype();
                DrawChart(type);

            },
            error: function () { }
        });

    }

    function hideshowMeterType() {

        if ($("#hdnPU").val() == "0")
            $("#Comparetype  option[value='CsE']").remove();
        else
            $("#Comparetype  option[value='CsE']").show();



        if ($("#hdnWU").val() == "0")
            $("#Comparetype  option[value='CsW']").remove();
        else
            $("#Comparetype  option[value='CsW']").show();



        if ($("#hdnGU").val() == "0")
            $("#Comparetype  option[value='CsG']").remove();
        else
            $("#Comparetype  option[value='CsG']").show();

    }

    function setchartviewtype() {
        var url1 = $('#hdnCommonUrl').val()+"/UserManagement/Customer.aspx/GetChartType";
        $.ajax({
            type: "POST",
            url:url1,// "../UserManagement/Customer.aspx/GetChartType",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                charttype = response.d;

            },
            error: function (response) {
                console.log(response.d);
            }
        });
    }

    function DrawChart(Type, selectedmonth) {
        try {
           
            var AccountNumber = $('#ddlAddress option:selected').val();
            var usagetyp = $("#Comparetype").val();
            var param = { AccountNumber: AccountNumber, type: Type, compType: usagetyp }
            var url1 = $('#hdnCommonUrl').val() + "/UserManagement/Customer.aspx/LoadData";
            $.ajax({
                type: "POST",
                url: url1,//"../UserManagement/Customer.aspx/LoadData",
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

    function OnError(request, status, error) {
        loader.hideloader();
    }

    function hidemonth(mon) {
        if ($(".compare_month").css('display') == 'none') {
            mon = -1;
        }
        return mon;
    }


    function OnSuccess(result, status) {
        loader.hideloader();
        var selectedType, selectedCompareType, month;
        var selectedMode, selectedColor, selectedColor2, selectedColor3;

        selectedMode = $("#hdnCompMode").val();
        selectedCompareType = $("#hdnCsType").val();

        if (result != null) {
            selectedType = type;
            showDivLabel();
            if (type == "D") {
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
                if (type == "K") {
                    selectedType = $('#lblWHCF').text();//"Units Consumed (HCF)";
                    text = "HCF";
                }
                else if (type == "G") {
                    selectedType = $('#lblWGL').text();//"Units Consumed (GL)";
                    text = "Gal";
                }
            }
            $('#ddlMonth').empty();
            var newdata = JSON.parse(result.d);
            var odata = [];
            // odata.push({ Name: "TblChartType", Rows: newdata.TblChartType });
            var ldata = {}
            ldata["Tables"] = odata.valueOf();
            var dtchart = ldata;
            //charttype = dtchart.Tables[0].Rows[0]["CompareChartType"];
            var currentMonth = '';
            var previousMonth = '';
            var currentyear = '';
            var previousyear = '';
            jsonDataUtility = newdata.Table2;
            $('#chartCompare').show();
            $('#NoDataCompare').hide();
            $('.compare_graph ').show();

            if (selectedMode == "M") {
                seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                selectedColor = "#7cab92";
                jsonDataMe = newdata.Table1;
                if (newdata.Table1 == null || newdata.Table1.length == 0) {
                    divShowHide()
                }
            }
            else if (selectedMode == "Z") {
                // 'Zip Average';
                seriesname1 = $('#zipAvg').text();
                seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                selectedColor = "#7a99bb";
                jsonDataMe = newdata.Table3;
                if (newdata.Table3 == null || newdata.Table3.length == 0) {
                    divShowHide()
                }

            }
            else if (selectedMode == "U") {
                //'Utility Average'
                selectedColor = "#d39d76";
                seriesname1 = $('#utilityAvg').text();
                seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                jsonDataMe = newdata.Table2;
                if (newdata.Table2 == null || newdata.Table2.length == 0) {
                    divShowHide()
                }
            }
            else if (selectedMode == "A") {
                selectedColor = "#7cab92";
                selectedColor2 = "#7a99bb";
                selectedColor3 = "#d39d76";
                seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                seriesname3 = $('#zipAvg').text();
                seriesname4 = $('#utilityAvg').text();
                jsonDataMe = newdata.Table;
                jsonDataUtility = newdata.Table2;
                jsonDataZip = newdata.Table3;

                if ((newdata.Table2 = null || newdata.Table2.length == 0) && (newdata.Table3 == null || newdata.Table3.length == 0) && (newdata.Table1 == null || newdata.Table1.length == 0)) {
                    divShowHide()
                }
            }
        }


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

        var month = $("#ddlMonth option:selected").text().split(" ")[0];
        var monthvalue = $("#ddlMonth option:selected").val();
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

        yaxis = selectedType;
        processed_json = new Array();
        processed_json2 = new Array();
        processed_json3 = new Array();
        processed_json4 = new Array();
        processed_jsonAllocation = new Array();

        if (selectedMode == "A") {
            $.map(newdata.Table1, function (obj, i) {
                processed_json.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: selectedColor,
                    year: obj.YOD
                })
            });
            if ($('#hdnValueM').val() == "True") {
                $.map(jsonDataMe, function (obj, i) {
                    processed_json2.push({
                        y: obj.Consumed,
                        name: getMonthName(obj.MOD),
                        color: "#c56e6e",
                        year: obj.YOD
                    })
                });
            }
            if ($('#hdnValueZ').val() == "True") {
                $.map(jsonDataZip, function (obj, i) {
                    processed_json3.push({
                        y: obj.Consumed,
                        name: getMonthName(obj.MOD),
                        color: selectedColor2,
                        year: obj.YOD
                    })
                });
            }
            if ($('#hdnValueU').val() == "True") {
                $.map(jsonDataUtility, function (obj, i) {
                    processed_json4.push({
                        y: obj.Consumed,
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
                            y: obj.AllocationValue,
                            name: getMonthName(obj.MOD),
                            color: "#31afdb",
                            year: obj.YOD
                        })
                    });
                }
            }
            var mon = $("#ddlMonth option:selected").val();

            //x-axis marker
            var monStartIndex = getMonthValue(processed_json[0].name);
            //var monStartIndex = 2;
            if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
            else if (parseInt(mon) == monStartIndex) { mon = 0; }
            else { mon = (parseInt(mon) + 12) - monStartIndex; }
            //x-axis marker

            BindhighChart4SeriesCompare(charttype, 'chartCompare', selectedColor, "#c56e6e", selectedColor2, selectedColor3, seriesname1, seriesname2, seriesname3, seriesname4, $('#hdnCsType').val(), hidemonth(mon));

        }
        else {

            $.map(newdata.Table, function (obj, i) {
                processed_json2.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: "#c56e6e",
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
            if (type != "D" && selectedCompareType == "CsW") {
                if ($('#hdnWaterAllocation').val() == 'True') {
                    $.map(newdata.Table, function (obj, i) {
                        processed_jsonAllocation.push({
                            y: obj.AllocationValue,
                            name: getMonthName(obj.MOD),
                            color: "#31afdb",
                            year: obj.YOD
                        })
                    });
                }
            }
            var mon = $("#ddlMonth option:selected").val();
            var monStartIndex = getMonthValue(processed_json[0].name);
            if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
            else if (parseInt(mon) == monStartIndex) { mon = 0; }
            else { mon = (parseInt(mon) + 12) - monStartIndex; }

            var str = $("#ContentPlaceHolder1_CompareSpendingMaster_CompareSpendingChart_ChartUI_lblText").text().replace('2014', processed_json[0].year);

            $("#ContentPlaceHolder1_CompareSpendingMaster_CompareSpendingChart_ChartUI_lblText").text(str);
            BindhighChart2SeriesCompare(charttype, 'chartCompare', selectedColor, "#c56e6e", seriesname1, seriesname2, $('#hdnCsType').val(), hidemonth(mon));

        }

        setLabelsValue(processed_json, processed_json2, processed_json3, processed_json4, selectedMode);

    }

    function getMonthValue(monthname) {
        var month1 = monthname;
        month1 = month1.toLowerCase();
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        month1 = months.indexOf(month1);
        return month1 + 1;

    }

    function loadRange() {
        range = comUsage.LoadRange().value;
        for (var r = 0; r < range.Rows.length; r++) {
            if (range.Rows[r]["Comparetype"] == "E" && range.Rows[r]["Type"] == "K" && range.Rows[r]["RangeMode"] == "D") {
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



    function setcolor(usagevalue, Range) {
        try {
            var color = '#FFFFFF';
            if (Range <= usagevalue) {
                color = lowcolor;
            }
            else if (Range > usagevalue) {
                color = highcolor;
            }
            return color;
        }
        catch (ex) { }
    }

    function setTopHeaders() {

        try {


            if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal' || text == 'GL') {
                if ($('#lblYourBudget').is(":visible") == true && $('#lblProjectedUsage').is(":visible") == true) {
                    $("#lblYourUsage").text($("#hdnUsageSoFar").val() + " " + text);
                    $("#lblProjectedUsage").text($("#hdnExpetedUsage").val() + " " + textexp);
                    document.getElementById('lblProjectedUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnExpetedUsage").val());
                    document.getElementById('lblYourUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnUsageSoFar").val());
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
                    document.getElementById('lblProjectedUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnExpetedUsage").val());
                    document.getElementById('lblYourUsage').style.color = setcolor($("#hdnBudgut").val(), $("#hdnUsageSoFar").val());
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
            CompareType = $('#hdnCsType').val();
            var currtype = $('#hdnType').val();
            $(".currency ul li a").removeClass('active');
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

    function showDivLabel() {
        try {
            var mode = $("#hdnCompMode").val();
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

    function changelabelforyear(year, mode) {
        if (mode == 'M') {
            year = year + 1;
        }
        else if (mode == 'U') {
            year = year;
        }
        else {
            year = year - 1;
        }
        return year;
    }

    //jsonData1 for Month, jsonData2 for prev, jsonData3 for zip, jsonData4 for utility
    function setLabelsValue(jsonData1, jsonData2, jsonData3, jsonData4, selectedMode) {
        try {
            var PreviousAvg;
            var month = $("#ddlMonth option:selected").text().split(" ")[0];
            var mnth = getMonthName($("#ddlMonth option:selected").val());
            var year = (parseInt($("#ddlMonth option:selected").text().split(" ")[1]));
            var monthlyAvg, PreviousAvglbl, Monthavglabel, lblPreveslabel, zipAvg, utilityAvg;
            year = changelabelforyear(year, selectedMode);
            $.each(jsonData1, function (i, obj) {
                if (obj.name == month) {
                    //PreviousAvg = obj.y;
                    PreviousAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                    lblPreveslabel = obj.name + " " + obj.year

                }
            });

            $.each(jsonData2, function (i, obj) {
                if (obj.name == month) {
                    //monthlyAvg = obj.y;
                    monthlyAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                    Monthavglabel = obj.name + " " + obj.year

                }
            });
            if (jsonData3 != null && jsonData3 != "") {
                $.each(jsonData3, function (i, obj) {
                    if (obj.name == month) {
                        //zipAvg = obj.y;
                        zipAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                    }
                });
            }
            if (jsonData4 != null && jsonData3 != "") {
                $.each(jsonData4, function (i, obj) {
                    if (obj.name == month) {
                        //utilityAvg = obj.y;
                        utilityAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                    }
                });
            }
            if (jsonData4 != null && jsonData4 != "") {
                $.each(jsonData4, function (i, obj) {
                    if (obj.name == month) {
                        //utilityAvg = obj.y;
                        utilityAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                    }
                });
            }


            if (type == "D") {
                $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : "$" + changetoK(parseFloat(monthlyAvg)));
                $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
                if (selectedMode == "A") {
                    $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)));
                    $("#lblPreveslabel").text((lblPreveslabel == undefined ? ('N/A' + ":") : (lblPreveslabel + ":")));
                    $("#lblZipcodeavg").text(zipAvg == null ? 'N/A' : "$" + changetoK(parseFloat(zipAvg)));
                    $("#lblUtilityavg").text(utilityAvg == null ? 'N/A' : "$" + changetoK(parseFloat(utilityAvg)));
                }
                else {
                    $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)));
                    $("#lblPreveslabel").text(lblPreveslabel + ":");
                    $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)));
                    $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)));
                }
            }
            else {
                if (selectedMode == "A") {
                    $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : changetoK(parseFloat(monthlyAvg)) + " " + text);
                    $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
                    $("#lblPreves").text(PreviousAvg == null ? 'N/A' : changetoK(parseFloat(PreviousAvg)) + " " + text);
                    $("#lblPreveslabel").text((lblPreveslabel == undefined ? ('N/A' + ":") : (lblPreveslabel + ":")));
                    if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal') {
                        $("#lblZipcodeavg").text(zipAvg == null ? "N/A" : changetoK(parseFloat(zipAvg)) + " " + text);
                        $("#lblUtilityavg").text(utilityAvg == null ? "N/A" : changetoK(parseFloat(utilityAvg)) + " " + text);

                    }
                    else {
                        $("#lblZipcodeavg").text(zipAvg == null ? 'N/A' : "$" + changetoK(parseFloat(zipAvg)) + text);
                        $("#lblUtilityavg").text(utilityAvg == null ? 'N/A' : "$" + changetoK(parseFloat(utilityAvg)) + text);
                    }
                }
                else {
                    $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : changetoK(parseFloat(monthlyAvg)) + " " + text);
                    $("#lblMonthavglabel").text((Monthavglabel == undefined ? ((month + ' ' + year) + ":") : (Monthavglabel + ":")));
                    $("#lblPreves").text(PreviousAvg == null ? 'N/A' : changetoK(parseFloat(PreviousAvg)) + " " + text);
                    $("#lblPreveslabel").text((lblPreveslabel == undefined ? ('N/A' + ":") : (lblPreveslabel + ":")));
                    if (text == 'kWh' || text == 'CCF' || text == 'HCF' || text == 'Gal') {

                        $("#lblZipcodeavg").text(PreviousAvg == null ? "N/A" : changetoK(parseFloat(PreviousAvg)) + " " + text);
                        $("#lblUtilityavg").text(PreviousAvg == null ? "N/A" : changetoK(parseFloat(PreviousAvg)) + " " + text);

                    }
                    else {
                        $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)) + text);
                        $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + changetoK(parseFloat(PreviousAvg)) + text);
                    }
                }
            }
        }
        catch (ex) {
            console.log(ex.message);
        }
    }


    function divShowHide() {
        try{
            $('#chartCompare').hide();
            $('#NoDataCompare').show();
            $('.compare_graph ').hide();
        }
        catch (e) {
            console.log(e);
        }
    }

    function GetBarColor(value, comparevalue) {
        var c;
        if (value > comparevalue) {
            c = "red";
        }
        else { c = "rgb(28, 187, 28)"; }
        return c;
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


    function BindhighChart4SeriesCompare(type, id, series1color, series2color, series3color, series4color, series1name, series2name, series3name, series4name, usagetype, month) {
        var maxy = processed_json[0].y;
        for (var i = 0; i < processed_json.length; i++) {
            if (maxy < processed_json[i].y)
                maxy = processed_json[i].y;

        }
        for (var i = 0; i < processed_json2.length; i++) {
            if (maxy < processed_json2[i].y)
                maxy = processed_json2[i].y;

        }
        for (var i = 0; i < processed_json3.length; i++) {
            if (maxy < processed_json3[i].y)
                maxy = processed_json3[i].y;

        }
        for (var i = 0; i < processed_json4.length; i++) {
            if (maxy < processed_json4[i].y)
                maxy = processed_json4[i].y;

        }

        // var plot = {};
        maxy = maxy * 0.9;
        //if (usagetype == "CsW") {
        //    plot = {
        //        dashStyle: 'shortdash',
        //        color: "blue",
        //        data: processed_jsonAllocation
        //        //label: {
        //        //    text: 'Water Allocation'
        //        //}
        //    }
        //}
        var plot1 = {
            value: 50,
            color: 'green',
            dashStyle: 'shortdash',
            width: 2,
        };

        $('#' + id).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: title
                ,
                style: {
                    color: '#F00',
                    font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
                }//,

            }

       ,
            yAxis: {
                min: 0,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '11px',
                    }
                },
                // plotLines: [plot],
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                    }
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            xAxis: {
                plotLines: [{
                    color: '#EFEFF4',
                    width: 10,
                    value: month
                }],
                labels: {
                    rotation: -25,
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
            tooltip: {
                formatter: function () {
                    return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, 2);
                }
            },
            plotLines: [plot1],
            plotOptions: {
                series: {
                    pointWidth: 18

                }
            },
            series: [{
                type: type,
                name: series1name,
                data: processed_json,
                showInLegend: false,
                color: series1color

            }, {
                type: type,
                name: series2name,
                data: processed_json2,
                showInLegend: false,
                color: series2color
            },
            {
                type: type,
                name: series3name,
                data: processed_json3,
                showInLegend: false,
                color: series3color
            },
            {
                type: type,
                name: series4name,
                data: processed_json4,
                showInLegend: false,
                color: series4color
            },
            {
                dashStyle: 'shortdash',
                name: series2name,
                data: processed_jsonAllocation,
                showInLegend: false,
                color: "#31afdb"
            }
            ]
        });
    }

    function BindhighChart2SeriesCompare(type, id, series1color, series2color, series1name, series2name, usagetype, month) {
        var maxy = processed_json[0].y;
        for (var i = 0; i < processed_json.length; i++) {
            if (maxy < processed_json[i].y)
                maxy = processed_json[i].y;

        }
        var maxy2 = 0;
        if (processed_json2.length > 0) {
            maxy2 = processed_json2[0].y;
            for (var i = 0; i < processed_json2.length; i++) {
                if (maxy2 < processed_json2[i].y)
                    maxy2 = processed_json2[i].y;

            }
        }
        if (maxy < maxy2) {
            maxy = maxy2;
        }

        var plot;
        maxy = maxy * 0.9;
        //if (usagetype == "CsW") {
        //    plot = [{
        //        data: processed_jsonAllocation           
        //    }]
        //}
        $('#' + id).highcharts({
            //chart: { zoomType: 'xy' },
            credits: {
                enabled: false
            },
            title: {
                text: title
                ,
                style: {
                    color: '#F00',
                    font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
                }//,
                //zoomType: 'xy'
            }

       ,
            yAxis: {
                min: 0,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '10px',
                    }
                },
                //  plotLines: [plot],
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                    }
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            xAxis: {
                plotLines: [{
                    color: '#EFEFF4',
                    width: 10,
                    value: month
                }],
                labels: {
                    rotation: -25,
                    style: {
                        color: '#333333',
                        margin: "-20px",
                        fontSize: '11px',
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


            tooltip: {

                formatter: function () {
                    return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, 2);
                }
            },
            plotOptions: {
                series: {
                    pointWidth: 18
                }
            },
            series: [{
                type: type,
                name: series1name,
                data: processed_json,
                showInLegend: false,
                color: series1color

            }, {
                type: type,
                name: series2name,
                data: processed_json2,
                showInLegend: false,
                color: series2color
            },
            {
                dashStyle: 'shortdash',
                name: series2name,
                data: processed_jsonAllocation,
                showInLegend: false,
                color: "#31afdb"
            }
            ]
        });
    }

});
