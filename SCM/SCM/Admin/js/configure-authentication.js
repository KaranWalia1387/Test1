var dt_result;
var dt_ContactInformation;
var dt_saveresult;
var Contact, Email, BillingContact, BillingEmail, Logo, MapId, Copyright, CopyrightSpanish, DefaultLoginPage, ChartType, ChartOrientation, WaterAllocationSource, IsExternalCrashLog, IsModernStyle, MailConfiguration, AuthMode, NetUsageInversion, DecimalValues;
var src = '';
var srcportal = '';
var hdfRemovefile = 1;
var rdesri = document.getElementsByName('rdesri');
var rdGoogle = document.getElementsByName('rdGoogle');
var rdBing = document.getElementsByName('rdBing');
var ImageSource = '';
var colorHEX = new Array();
colorHEX = ["#ea557b", "#e9cc57", "#4adea0", "#FFC118", "#31afdb"]
var colorarr = new Array();

$(document).ready(function () {
    loader.showloader();
    loadSpectrumData();

   

    $('#chkDefault').change(function () {
        if ($(this).is(":checked")) {
            FillColor('txtHigh', colorHEX[0]);
            $('#txtHigh').val(colorHEX[0]);
            FillColor('txtMedium', colorHEX[1]);
            $('#txtMedium').val(colorHEX[1]);
            FillColor('txtLow', colorHEX[2]);
            $('#txtLow').val(colorHEX[2]);
            FillColor('txtSolar', colorHEX[3]);
            $('#txtSolar').val(colorHEX[3]);
            FillColor('txtwater', colorHEX[4]);
            $('#txtwater').val(colorHEX[4]);
        }
        else {
            FillColor('txtHigh', colorarr[0]);
            FillColor('txtMedium', colorarr[2]);
            FillColor('txtLow', colorarr[1]);
            FillColor('txtSolar', colorarr[4]);
            FillColor('txtwater', colorarr[3]);
        }
        loader.hideloader();
    });



    $("#btnAuthentication").click(function () {
        if ($('#blah').val() != '') {
            $("#btnRemoveFile").show();
            if (GetFileSize('blah')) {
                $.ajaxFileUpload({
                    type: "POST",
                    fileElementId: 'blah',
                    url: "" + $('#filehandlerpath').val() + "Path=UtilityLogo",
                    secureuri: false,
                    cache: false,
                    contentType: 'text/plain',
                    dataType: "text",
                    success: function (data, status) {
                        src = data;
                        hdfRemovefile = 1;
                        PortalLogoUpload();
                    },
                    error: function (data, status, e) {

                        alert(e);
                    }
                });
            }
        }
        else {
            src = ''; hdfRemovefile = 0;
            PortalLogoUpload();
        }
    });
});

function restrict(event) {
    event.preventDefault();
    return false;
}

function FillColor(id, color) {
  //  loader.showloader();
    $("#" + id).spectrum({
        color: color,
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        move: function (color) {

        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function () {

        },
        change: function () {

        },
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
            "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
            "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
            "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
            "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
            "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
            "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
            "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
            "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
            "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
            "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
            "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ]
    });
}

function loadSpectrumData() {
    try {
        loader.showloader();
        var param = { 'mode': 2 };
        $.ajax({
            type: "POST",
            url: "configure-authentication.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                var result = JSON.parse(data.d).Table;

                for (var i = 0; i < result.length; i++) {
                    $('.Custom').each(function () {
                        switch (this.id) {
                            case "txtCompareCurrent":
                                $('#txtCompareCurrent').val(result[0].ConfigValue);
                                FillColor('txtCompareCurrent', result[0].ConfigValue);
                                break;
                            case "txtComparePrev":
                                $('#txtComparePrev').val(result[1].ConfigValue);
                                FillColor('txtComparePrev', result[1].ConfigValue);
                                break;
                            case "txtCompareUtility":
                                $('#txtCompareUtility').val(result[2].ConfigValue);
                                FillColor('txtCompareUtility', result[2].ConfigValue);
                                break;
                            case "txtCompareZip":
                                $('#txtCompareZip').val(result[3].ConfigValue);
                                FillColor('txtCompareZip', result[3].ConfigValue);
                                break;
                            case "txtHigh":
                                colorarr[0] = result[4].ConfigValue;
                                $('#txtHigh').val(result[4].ConfigValue);
                                FillColor('txtHigh', result[4].ConfigValue);
                                break;
                            case "txtLow":
                                colorarr[1] = result[5].ConfigValue;
                                $('#txtLow').val(result[5].ConfigValue);
                                FillColor('txtLow', result[5].ConfigVaue);
                                break;
                            case "txtMedium":
                                colorarr[2] = result[6].ConfigValue;
                                $('#txtMedium').val(result[6].ConfigValue);
                                FillColor('txtMedium', result[6].ConfigValue);
                                break;
                            case "txtwater":
                                colorarr[3] = result[7].ConfigValue;
                                $('#txtwater').val(result[7].ConfigValue);
                                FillColor('txtwater', result[7].ConfigValue);
                                break;
                            case "txtSolar":
                                colorarr[4] = result[8].ConfigValue;
                                $('#txtSolar').val(result[8].ConfigValue);
                                FillColor('txtSolar', result[8].ConfigValue);
                                break;
                            case "txtCurrPlan":
                                $('#txtCurrPlan').val(result[9].ConfigValue);
                                FillColor('txtCurrPlan', result[9].ConfigValue);
                                break;
                            case "txtNewPlan":
                                $('#txtNewPlan').val(result[10].ConfigValue);
                                FillColor('txtNewPlan', result[10].ConfigValue);
                                break;
                            case "txtBillUsage":
                                $('#txtBillUsage').val(result[11].ConfigValue);
                                FillColor('txtBillUsage', result[11].ConfigValue);
                                break;
                            case "txtBillZip":
                                $('#txtBillZip').val(result[12].ConfigValue);
                                FillColor('txtBillZip', result[12].ConfigValue);
                                break;
                            case "txtBillBudget":
                                $('#txtBillBudget').val(result[13].ConfigValue);
                                FillColor('txtBillBudget', result[13].ConfigValue);
                                break;

                        }
                    });
                }
                loaddata();
            },
            error: function (request, status, error) {
                console.log(error);
                
            }
        });
    }
    catch (e) {
        console.log(e);
        
    }

}

function loaddata() {
    try {
     
        var Mode = 0;
        var param = { 'mode': Mode };
        $.ajax({
            type: "POST",
            url: "configure-socialmedia.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                dt_result = result.Table;
                if (dt_result != null) {
                    $("#txtCopyRight").val(dt_result[0]["Copyright"]);
                    $("#txtCopyRightSpanish").val(dt_result[0]["CopyRightES"]);
                    if (dt_result[0]["MapId"] == "0") {
                        $("#rdesri").prop("checked", true);

                    }
                    if (dt_result[0]["MapId"] == "1") {
                        $("#rdGoogle").prop("checked", true);

                    } if (dt_result[0]["MapId"] == "2") {
                        $("#rdBing").prop("checked", true);

                    }

                    //=========================================
                    if (dt_result[0]["IsExternalPowerRateLink"] == "0") {
                        $("#rbPRateInternal").click();
                    } else {
                        $("#rbPRateExternal").click();
                    }
                    if (dt_result[0]["IsExternalWaterRateLink"] == "0") {
                        $("#rbWRateInternal").click();
                    } else {
                        $("#rbWRateExternal").click();
                    }
                    if (dt_result[0]["IsExternalGasRateLink"] == "0") {
                        $("#rbGRateInternal").click();
                    } else {
                        $("#rbGRateExternal").click();
                    }
                    $("#txtPRateLink").val(dt_result[0]["ExternalPowerRateLink"]);
                    $("#txtWRateLink").val(dt_result[0]["ExternalWaterRateLink"]);
                    $("#txtGRateLink").val(dt_result[0]["ExternalGasRateLink"]);
                    //=========================================

                    if (dt_result[0]["DefaultLoginPage"] == $("#rdhome").val()) {
                        $("#rdhome").prop("checked", true);

                    }
                    if (dt_result[0]["DefaultLoginPage"] == $("#rddefault").val()) {
                        $("#rddefault").prop("checked", true);

                    }
                    if (dt_result[0]["CompareChartType"] == $("#rdcol").val()) {
                        $("#rdcol").prop("checked", true);

                    }
                    if (dt_result[0]["CompareChartType"] == $("#rdline").val()) {
                        $("#rdline").prop("checked", true);
                    }
                    if (dt_result[0]["ChartOrientation"] == $("#rdhorizontal").val()) {
                        $("#rdhorizontal").prop("checked", true);
                    }
                    if (dt_result[0]["ChartOrientation"] == $("#rdvertical").val()) {
                        $("#rdvertical").prop("checked", true);
                    }

                    if (dt_result[0]["WaterAllocationSource"] == $("#rdInternal").val()) {
                        $("#rdInternal").prop("checked", true);
                    }
                    if (dt_result[0]["WaterAllocationSource"] == $("#rdExternal").val()) {
                        $("#rdExternal").prop("checked", true);
                    }
                    if (dt_result[0]["IsExternalCrashLog"] == $("#rdCrashExternal").val()) {
                        $("#rdCrashExternal").prop("checked", true);
                    }
                    if (dt_result[0]["IsExternalCrashLog"] == $("#rdCrashInternal").val()) {
                        $("#rdCrashInternal").prop("checked", true);
                    }

                    if (dt_result[0]["EmailOption"] == $("#rdSmtp").val()) {
                        $("#rdSmtp").prop("checked", true);
                    }
                    if (dt_result[0]["EmailOption"] == $("#rdSendgrid").val()) {
                        $("#rdSendgrid").prop("checked", true);
                    }

                    var imgsrc = dt_result[0]["Logo"];

                    var strpath = ImageSource = '../' + 'images' + '/' + imgsrc;

                    $('.blahimg').val(imgsrc);
                    $('#blahimg').attr('src', strpath);

                    $('#blahimg').error(function () { imgError(this) });

                    $('#blahimg1').error(function () { imgError(this) });

                    $('#btnRemoveFile1').hide();

                    if (dt_result[0]["IsModernStyle"] == 1) {
                        $("#chkStyleSheet").prop('checked', true);
                    }
                    if (dt_result[0]["NetUsageInversion"] == 1) {
                        $("#chkInverted").prop('checked', true);
                    }

                    if (dt_result[0]["ShowDecimal"] == 1) {
                        $("#chkDecimalValues").prop('checked', true);
                    }

                    $('#txtMonthlyBudget').val(dt_result[0]["MonthlyBudgetMaxLimit"]);
                    $('#txtCI').val(dt_result[0]["IMonthlyBudgetMaxLimit"]);

                    loader.hideloader();
                }
            },
            error: function (request, status, error) {
                loader.hideloader();
            }
        });
    }
    catch (e) {
        console.log(e);
        loader.hideloader();
    }
}

function submit() {

    try {

        //*************************
        PortaOutagelLogoUpload_crnt_modrn();
        //*****************************

        var PowerRateLink = $("ul#powerRate li input[type='radio']:checked").attr('Value');
        var PowerRateLinkUrl = $('#txtPRateLink').val();
        var WaterRateLink = $("ul#waterRate li input[type='radio']:checked").attr('Value');
        var WaterRateLinkUrl = $('#txtWRateLink').val();
        var GasRateLink = $("ul#gasRate li input[type='radio']:checked").attr('Value');
        var GasRateLinkUrl = $('#txtGRateLink').val();

        if (PowerRateLink == 1) {
            if (PowerRateLinkUrl.trim() == "") {
                alert('Please enter Power Rate External Link');
                $('#txtExternalLink').focus();
                return false;
            }
        }
        if (WaterRateLink == 1) {
            if (WaterRateLinkUrl.trim() == "") {
                alert('Please enter Water Rate External Link');
                $('#txtExternalLink').focus();
                return false;
            }
        }
        if (GasRateLink == 1) {
            if (GasRateLinkUrl.trim() == "") {
                alert('Please enter Gas Rate External Link');
                $('#txtExternalLink').focus();
                return false;
            }
        }

        var PowerRateLink = $("ul#powerRate li input[type='radio']:checked").attr('Value');
        var WaterRateLink = $("ul#waterRate li input[type='radio']:checked").attr('Value');
        var GasRateLink = $("ul#gasRate li input[type='radio']:checked").attr('Value');
        var authenticationmode = $("#rdLdap:checked").attr('Value');
        var MonthlyBudgetMax = $('#txtMonthlyBudget').val();
        var txtCI = $('#txtCI').val();

        if (MonthlyBudgetMax == "") {
            alert('Please enter Monthly Budget Max Limit');
            $('#MonthlyBudgetMax').focus();
            return false;
        }

        if (txtCI == "") {
            alert('Please enter C&I Monthly Budget Max Limit');
            $('#txtCI').focus();
            return false;
        }



        fillData();
        var Mode = 1;
        if (hdfRemovefile == 0) { src = ''; }
        src = (src == "") ? null : src;



        var ConfigSettingxml = '<UtilityConfig>';
        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Usage</ModuleName>';
        ConfigSettingxml += '<ConfigOption>High</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtHigh').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Usage</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Mid</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtMedium').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Usage</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Low</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtLow').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Usage</ModuleName>';
        ConfigSettingxml += '<ConfigOption>WaterAllocation</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtwater').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Usage</ModuleName>';
        ConfigSettingxml += '<ConfigOption>SolarGeneration</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtSolar').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Compare</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Current</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtCompareCurrent').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Compare</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Previous</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtComparePrev').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Compare</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Utility</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtCompareUtility').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>Compare</ModuleName>';
        ConfigSettingxml += '<ConfigOption>Zip</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtCompareZip').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
       

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>RateAnalysis</ModuleName>';
        ConfigSettingxml += '<ConfigOption>CurrentPlan</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtCurrPlan').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
       

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>RateAnalysis</ModuleName>';
        ConfigSettingxml += '<ConfigOption>OtherPlan</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtNewPlan').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
       

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>BudgetMyBill</ModuleName>';
        ConfigSettingxml += '<ConfigOption>MyUsage</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtBillUsage').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
       

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>BudgetMyBill</ModuleName>';
        ConfigSettingxml += '<ConfigOption>ZipAverage</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtBillZip').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
       

        ConfigSettingxml += '<Config>';
        ConfigSettingxml += '<UtilityID>0</UtilityID>';
        ConfigSettingxml += '<ModuleName>BudgetMyBill</ModuleName>';
        ConfigSettingxml += '<ConfigOption>MyBudget</ConfigOption>';
        ConfigSettingxml += '<ConfigValue>' + $('#txtBillBudget').val() + '</ConfigValue>';
        ConfigSettingxml += '</Config>';
        ConfigSettingxml += '</UtilityConfig>';

        var param = {
            mode: Mode, Copyright: Copyright, Logo: src, MapId: MapId, CopyrightSpanish: CopyrightSpanish, DefaultLoginPage: DefaultLoginPage,
            CompareChartType: ChartType, ChartOrientation: ChartOrientation, WaterAllocationSource: WaterAllocationSource,
            IsExternalPowerRateLink: PowerRateLink,
            ExternalPowerRateLink: PowerRateLinkUrl,
            IsExternalWaterRateLink: WaterRateLink,
            ExternalWaterRateLink: WaterRateLinkUrl,
            IsExternalGasRateLink: GasRateLink,
            ExternalGasRateLink: GasRateLinkUrl,
            IsExternalCrashLog: IsExternalCrashLog,
            TimeZoneoffSet: $('#ddlTomeZone option:selected').val(),
            ClientTimeZone: $('#ddlTomeZone').find('option:selected').attr("key"),
            IsModernStyle: IsModernStyle,
            MonthlyBudgetMaxLimit: MonthlyBudgetMax,
            MailConfiguration: MailConfiguration,
            Authentication: AuthMode,
            ConfigSettingxml: ConfigSettingxml,
            NetUsageInversion: NetUsageInversion,
            txtCI: txtCI,
            DecimalValues: DecimalValues
        };


        loader.showloader();

        $.ajax({
            type: "POST",
            url: "configure-authentication.aspx/Savedata",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessEdit,
            failure: function (response) {
                loader.hideloader();
                console.log(response.responseText);
            }
        });
    }
    catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

function OnSuccessEdit(data, status) {
    var result = JSON.parse(data.d);
    loader.hideloader();
    if (result > 0) {
        alert('Your settings have been saved successfully');
    }
    else { alert('Please Try Again'); }
}

function fillData() {
    Copyright = $("#txtCopyRight").val();
    CopyrightSpanish = $("#txtCopyRightSpanish").val();

    if ($("#rdLdap").prop('checked')) {
        AuthMode = 1;
    }
    else ($("#rdDatabase").prop('checked'))
    {
        AuthMode = 0;
    }

    if ($("#rdBing").prop('checked')) {
        MapId = 2;
    }
    else if ($("#rdGoogle").prop('checked')) {
        MapId = 1;
    }
    else {
        MapId = 0;
    }

    //=========================================
    if (dt_result[0]["IsExternalPowerRateLink"] == "0") {
        $("#rbPRateInternal").click();
    } else {
        $("#rbPRateExternal").click();
    }
    if (dt_result[0]["IsExternalWaterRateLink"] == "0") {
        $("#rbWRateInternal").click();
    } else {
        $("#rbWRateExternal").click();
    }
    if (dt_result[0]["IsExternalGasRateLink"] == "0") {
        $("#rbGRateInternal").click();
    } else {
        $("#rbGRateExternal").click();
    }
    $("#txtPRateLink").val(dt_result[0]["ExternalPowerRateLink"]);
    $("#txtWRateLink").val(dt_result[0]["ExternalWaterRateLink"]);
    $("#txtGRateLink").val(dt_result[0]["ExternalGasRateLink"]);
    //=========================================

    if ($("#rdhome").prop('checked')) {
        DefaultLoginPage = $("#rdhome").val().trim();
    }
    else if ($("#rddefault").prop('checked')) {
        DefaultLoginPage = $("#rddefault").val().trim();
    }

    if ($("#rdcol").prop('checked')) {
        ChartType = $("#rdcol").val().trim();
    }
    else if ($("#rdline").prop('checked')) {
        ChartType = $("#rdline").val().trim();
    }
    if ($("#rdhorizontal").prop('checked')) {
        ChartOrientation = $("#rdhorizontal").val().trim();
    }
    else if ($("#rdvertical").prop('checked')) {
        ChartOrientation = $("#rdvertical").val().trim();
    }
    if ($("#rdInternal").prop('checked')) {
        WaterAllocationSource = $("#rdInternal").val().trim();
    }
    if ($("#rdExternal").prop('checked')) {
        WaterAllocationSource = $("#rdExternal").val().trim();
    }
    if ($("#rdCrashInternal").prop('checked')) {
        IsExternalCrashLog = $("#rdCrashInternal").val().trim();
    }
    if ($("#rdCrashExternal").prop('checked')) {
        IsExternalCrashLog = $("#rdCrashExternal").val().trim();
    }

    if ($("#chkStyleSheet").prop('checked')) {
        IsModernStyle = 1;
    }
    else {
        IsModernStyle = 0;
    }
    if ($("#rdSmtp").prop('checked')) {
        MailConfiguration = $("#rdSmtp").val().trim();
    }
    if ($("#rdSendgrid").prop('checked')) {
        MailConfiguration = $("#rdSendgrid").val().trim();
    }
    if ($("#chkInverted").prop('checked'))
        NetUsageInversion = 1;
    else
        NetUsageInversion = 0;
    if ($("#chkDecimalValues").prop('checked'))
        DecimalValues = 1;
    else
        DecimalValues = 0;

}

function removeFile() {

    src = '';

    hdfRemovefile = 0;
    $("#nofile").html('No File Chosen');
    $('#blah').val('');
    $('#blahimg').attr('src', '../images/noimage.png');
    $('#btnRemoveFile').hide();
}

function removeFileportal() {

    srcportal = '';
    hdfRemovefile = 0;
    $("#nofile1").html('No File Chosen');
    $("#nofile1").val('No File Chosen');
    $('#blah1').val('');
    $('#blahimg1').attr('src', $('#hdnImageSource1').val());
    $('#btnRemoveFile1').hide();
}

function savedata() {
    if ($('#blah').val() != '') {
        $("#btnRemoveFile").show();
        if (GetFileSize('blah') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'blah',
                url: "" + $('#filehandlerpath').val() + "Path=UtilityLogo",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    src = data;
                    hdfRemovefile = 1;
                    PortalLogoUpload();
                },
                error: function (data, status, e) {

                    alert(e);
                }
            });
        }
    }
    else {
        src = ''; hdfRemovefile = 0;
        PortalLogoUpload();
    }

}

// for replacing distorted image with noimage
function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

function readURL(input) {
    $('#blahimg').show();
    $('#btnRemoveFile').show();
    if (input.files && input.files[0]) {
        $("#nofile").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg')
            .attr('src', e.target.result)
            .width(226)
            .height(40);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readURLportal(input) {
    $('#blahimg1').show();
    $('#btnRemoveFile1').show();
    if (input.files && input.files[0]) {
        $("#nofile1").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg1')
            .attr('src', e.target.result)
            .width(226)
            .height(40);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function PortalLogoUpload() {
    if ($('#blah1').val() != '') {
        $("#btnRemoveFile1").show();
        if (GetFileSizePortalLogo() == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'blah1',
                url: "" + $('#filehandlerpath').val() + "Path=UtilityPortalLogo",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    srcportal = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        submit();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                }
            });
        }
    }
    else {
        srcportal = ''; hdfRemovefile = 0;
        submit();
    }

}

function GetFileSizePortalLogo() {
    try {
        if ($('#' + 'blah1').val() != '') {
            if ($('#blah1')[0].files != undefined) {
                if ($('#blah1')[0].files.length > 0) {
                    if (ValidateFileUpload($('#blah1')[0].value)) {
                        var fileSize = 0;
                        fileSize = $('#blah1')[0].files[0].size //size in kb
                        fileSize = fileSize / 1048576; //size in mb
                        if (fileSize > 5) {
                            alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                            return false;
                        }
                        else
                            return true;
                    }
                    else {
                        alert("File extensions allowed: png ");
                        return false;
                    }
                }
                else
                    return true;
            }
            else
                return true;
        }
        else {
            return true;
        }
    }
    catch (e) {
        return false;
    }
}


function readURL_outage_crnt_modrn(input) {
    $('#blahimg_imageOutage_crnt_modrn').show();
    $('#btnRemoveFile_outage_crnt_modrn').show();
    if (input.files && input.files[0]) {
        $("#nofile_outageImage_crnt_modrn").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg_imageOutage_crnt_modrn')
            .attr('src', e.target.result)
            .width(25)
            .height(30);
        };
        reader.readAsDataURL(input.files[0]);
    }
}



function removeFileOutageImage_crnt_modrn() {

    srcportal = '';
    hdfRemovefile = 0;
    $("#nofile_outageImage_crnt_modrn").html('No File Chosen');
    $("#nofile_outageImage_crnt_modrn").val('No File Chosen');
    $('#FileUplod_outage_Image_crnt_modrn').val('');
  //  $('#blahimg_imageOutage').attr('src', $('#hdnImageSource1').val());//
    //$('#blahimg_imageOutage_crnt_modrn').attr('src', ImageSource);
    $('#blahimg_imageOutage_crnt_modrn').attr('src', $('#filehandlerpath').val() + "imagename=energy_icon_red_M.png" + "&Path=outages");
    $('#btnRemoveFile_outage_crnt_modrn').hide();
}


//function GetFileSizeOutageImage_crnt_modrn() {
//    try {
//        if ($('#' + 'FileUplod_outage_Image_crnt_modrn').val() != '') {
//            if ($('#FileUplod_outage_Image_crnt_modrn')[0].files != undefined) {
//                if ($('#FileUplod_outage_Image_crnt_modrn')[0].files.length > 0) {
//                    if (ValidateFileUpload($('#FileUplod_outage_Image_crnt_modrn')[0].value)) {
//                        var fileSize = 0;
//                        fileSize = $('#FileUplod_outage_Image_crnt_modrn')[0].files[0].size //size in kb
//                        fileSize = fileSize / 1048576; //size in mb
//                        if (fileSize > 5) {
//                            alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
//                            return false;
//                        }
//                        else
//                            return true;
//                    }
//                    else {
//                        alert("File extensions allowed: png ");
//                        return false;
//                    }
//                }
//                else
//                    return true;
//            }
//            else
//                return true;
//        }
//        else {
//            return true;
//        }
//    }
//    catch (e) {
//        return false;
//    }
//}

function GetFileSizeOutageImage(FileUploader) {
    try {
        if ($('#'+ FileUploader).val() != '') {
            if ($('#' + FileUploader)[0].files != undefined) {
                if ($('#' + FileUploader)[0].files.length > 0) {
                    if (ValidateFileUpload($('#' + FileUploader)[0].value)) {
                        var fileSize = 0;
                        fileSize = $('#' + FileUploader)[0].files[0].size //size in kb
                        fileSize = fileSize / 1048576; //size in mb
                        if (fileSize > 5) {
                            alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                            return false;
                        }
                        else
                            return true;
                    }
                    else {
                        alert("File extensions allowed: png ");
                        return false;
                    }
                }
                else
                    return true;
            }
            else
                return true;
        }
        else {
            return true;
        }
    }
    catch (e) {
        return false;
    }
}


function PortaOutagelLogoUpload_crnt_modrn() {
    if ($('#FileUplod_outage_Image_crnt_modrn').val() != '') {
        $("#btnRemoveFile_outage_crnt_modrn").show();
        if (GetFileSizeOutageImage('FileUplod_outage_Image_crnt_modrn') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'FileUplod_outage_Image_crnt_modrn',
                url: "" + $('#filehandlerpath').val() + "Path=outages" + "&type=Current-Modern",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    srcportal = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        PortaOutagelLogoUpload_crnt_trdtion();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                    return false;
                }
            });
        }
    }
   

}
//*****************************************************************


function readURL_outage_crnt_trdtion(input) {
    $('#blahimg_imageOutage_crnt_trdtion').show();
    $('#btnRemoveFile_outage_crnt_trdtion').show();
    if (input.files && input.files[0]) {
        $("#nofile_outageImage_crnt_trdtion").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg_imageOutage_crnt_trdtion')
            .attr('src', e.target.result)
            .width(25)
            .height(30);
        };
        reader.readAsDataURL(input.files[0]);
    }
}



function removeFileOutageImage_crnt_trdtion() {

    srcportal = '';
    hdfRemovefile = 0;
    $("#nofile_outageImage_crnt_trdtion").html('No File Chosen');
    $("#nofile_outageImage_crnt_trdtion").val('No File Chosen');
    $('#FileUplod_outage_Image_crnt_trdtion').val('');
    //  $('#blahimg_imageOutage').attr('src', $('#hdnImageSource1').val());//
    $('#blahimg_imageOutage_crnt_trdtion').attr('src', $('#filehandlerpath').val() + "imagename=energy_icon_red.png" + "&Path=outages");
    $('#btnRemoveFile_outage_crnt_trdtion').hide();
}

function PortaOutagelLogoUpload_crnt_trdtion() {
    if ($('#FileUplod_outage_Image_crnt_trdtion').val() != '') {
        $("#btnRemoveFile_outage_crnt_trdtion").show();
        if (GetFileSizeOutageImage('FileUplod_outage_Image_crnt_trdtion') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'FileUplod_outage_Image_crnt_trdtion',
                url: "" + $('#filehandlerpath').val() + "Path=outages" + "&type=Current-Tradition",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    srcportal = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        PortaOutagelLogoUpload_plan_trdtion();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                    return false;
                }
            });
        }
    }


}
//*******************************************************************



function readURL_outage_plan_trdtion(input) {
    $('#blahimg_imageOutage_plan_trdtion').show();
    $('#btnRemoveFile_outage_plan_trdtion').show();
    if (input.files && input.files[0]) {
        $("#nofile_outageImage_plan_trdtion").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg_imageOutage_plan_trdtion')
            .attr('src', e.target.result)
            .width(25)
            .height(30);
        };
        reader.readAsDataURL(input.files[0]);
    }
}



function removeFileOutageImage_plan_trdtion() {

    srcportal = '';
    hdfRemovefile = 0;
    $("#nofile_outageImage_plan_trdtion").html('No File Chosen');
    $("#nofile_outageImage_plan_trdtion").val('No File Chosen');
    $('#FileUplod_outage_Image_plan_trdtion').val('');
    //  $('#blahimg_imageOutage').attr('src', $('#hdnImageSource1').val());//
    $('#blahimg_imageOutage_plan_trdtion').attr('src', $('#filehandlerpath').val() + "imagename=energy_icon_blue.png" + "&Path=outages");
    $('#btnRemoveFile_outage_plan_trdtion').hide();
}

function PortaOutagelLogoUpload_plan_trdtion() {
    if ($('#FileUplod_outage_Image_plan_trdtion').val() != '') {
        $("#btnRemoveFile_outage_plan_trdtion").show();
        if (GetFileSizeOutageImage('FileUplod_outage_Image_plan_trdtion') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'FileUplod_outage_Image_plan_trdtion',
                url: "" + $('#filehandlerpath').val() + "Path=outages" + "&type=Plan-Tradition",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    srcportal = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        PortaOutagelLogoUpload_plan_modrn();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                    return false;
                }
            });
        }
    }


}
//************************************************************************


function readURL_outage_plan_modrn(input) {
    $('#blahimg_imageOutage_plan_modrn').show();
    $('#btnRemoveFile_outage_plan_modrn').show();
    if (input.files && input.files[0]) {
        $("#nofile_outageImage_plan_modrn").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg_imageOutage_plan_modrn')
            .attr('src', e.target.result)
            .width(25)
            .height(30);
        };
        reader.readAsDataURL(input.files[0]);
    }
}



function removeFileOutageImage_plan_modrn() {

    srcportal = '';
    hdfRemovefile = 0;
    $("#nofile_outageImage_plan_modrn").html('No File Chosen');
    $("#nofile_outageImage_plan_modrn").val('No File Chosen');
    $('#FileUplod_outage_Image_plan_modrn').val('');
    //  $('#blahimg_imageOutage').attr('src', $('#hdnImageSource1').val());//
    $('#blahimg_imageOutage_plan_modrn').attr('src', $('#filehandlerpath').val() + "imagename=energy_icon_blue_M.png" + "&Path=outages");
    $('#btnRemoveFile_outage_plan_modrn').hide();
}

function PortaOutagelLogoUpload_plan_modrn() {
    if ($('#FileUplod_outage_Image_plan_modrn').val() != '') {
        $("#btnRemoveFile_outage_plan_modrn").show();
        if (GetFileSizeOutageImage('FileUplod_outage_Image_plan_modrn') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'FileUplod_outage_Image_plan_modrn',
                url: "" + $('#filehandlerpath').val() + "Path=outages" + "&type=Plan-Modern",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    srcportal = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        removeFileOutageImage_crnt_modrn();
                        removeFileOutageImage_crnt_trdtion();
                        removeFileOutageImage_plan_trdtion();
                        removeFileOutageImage_plan_modrn();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                    return false;
                }
            });
        }
    }


}
//*************************************************************************