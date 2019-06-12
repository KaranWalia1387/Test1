<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UsageControl.ascx.cs"
    Inherits="AdminPanel.UserControl.UsageControl" %>
<%@ Import Namespace="AdminPanel" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<script src="<%#string.Format("{0}/js/CustomerUsage.js",AdminPanel.Common.url)%>"></script>
<link rel="stylesheet" type="text/css" href="//serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/css/esri.css" />
<script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.5compact" type="text/javascript"></script>

<style type="text/css">
    .usage_listing {
        margin: 0px;
        padding: 0px;
        float: right;
        width: 100%;
    }

        .usage_listing ul {
            margin: 0px;
            padding: 0px;
            list-style: none;
            text-align: right;
        }

            .usage_listing ul li {
                margin: 0px;
                padding: 0px 1px;
                display: inline-block;
            }


                .usage_listing ul li a {
                    padding: 10px;
                    display: block;
                    text-decoration: none;
                    color: #666;
                    outline: none !important;
                    border: 0px !important;
                    font-size: 88.3%;
                    background: url(../images/divider_inner_page_lnk.gif) no-repeat left 12px;
                }

                    .usage_listing ul li a:hover, .usage_listing ul li a.active {
                        color: #006699;
                        outline: none;
                    }

                .usage_listing ul li a {
                    padding: 29px 0px 8px !important;
                }

        .usage_listing > ul > li > a[mode="M"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_monthly.svg") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: -4px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="M"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_monthly_hover.svg") no-repeat left top !important;
            display: block;
        }

        .usage_listing > ul > li > a[mode="D"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_daily.svg") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: 0px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="D"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_daily_hover.svg") no-repeat left top !important;
            display: block;
        }

        .usage_listing > ul > li > a[mode="S"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_season.svg") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: -4px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="S"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_season_hover.svg") no-repeat left top !important;
            display: block;
        }

        .usage_listing > ul > li > a[mode="H"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hourly.svg") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: 0px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="H"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hourly_hover.svg") no-repeat left top !important;
            display: block;
        }

        .usage_listing > ul > li > a[mode="MI"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_15min.svg") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: -4px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="MI"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_15min_hover.svg") no-repeat left top !important;
            display: block;
        }

        .usage_listing > ul > li > a[mode="B"] {
            background: url("<%#AdminPanel.Common.url%>/images/bi_monthly_icon.png") no-repeat left top !important;
            display: block;
            height: 32px;
            margin: 10px 8px 7px 7px;
            text-indent: -11px !important;
            width: 32px;
        }

        .usage_listing ul li a.active[mode="B"] {
            background: url("<%#AdminPanel.Common.url%>/images/bi_monthly_icon_hover.png") no-repeat left top !important;
            display: block;
        }

        .usage_listing ul li a {
            font-size: 12px;
        }

            .usage_listing ul li a[mode="M"], .usage_listing ul li a[mode="S"], .usage_listing ul li a.active[mode="S"], .usage_listing ul li a.active[mode="M"] {
                text-indent: -3px !important;
            }


    .usage_type ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }

        .usage_type ul li {
            margin: 0px;
            padding: 0px 1px;
            float: left;
        }

    .usage_type > ul > li > a[mode="D"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_currency.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 0px 7px 0px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="D"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_currency_hover.svg") no-repeat left top !important;
        display: block;
    }

    .usage_type > ul > li > a[mode="G"] {
        background: url("<%#AdminPanel.Common.url%>/images/gl.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 0px 7px 0px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="G"] {
        background: url("<%#AdminPanel.Common.url%>/images/gl_ro.svg") no-repeat left top !important;
        display: block;
    }

    .usage_type > ul > li > a[mode="C"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 8px 7px 7px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="C"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.svg") no-repeat left top !important;
        display: block;
    }

    .usage_type > ul > li > a[mode="K"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_kWh.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 8px 7px 7px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="K"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_kWh_hover.svg") no-repeat left top !important;
        display: block;
    }

    .usage_type > ul > li > a[mode="C"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 8px 7px 7px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="C"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.svg") no-repeat left top !important;
        display: block;
    }

    .usage_type > ul > li > a[mode="W"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_hcf.svg") no-repeat left top !important;
        display: block;
        height: 35px;
        margin: 10px 8px 7px 7px;
        text-indent: -4px !important;
        width: 35px;
    }

    .usage_type ul li a.active[mode="W"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_hcf_active.svg") no-repeat left top !important;
        display: block;
    }

    .GraphLegend_data_WaterAlloc {
        color: #53565a;
        float: left;
        font-size: 12px;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 2px;
        margin-right: 5px;
    }

    .GraphLegend_WaterAlloc {
        background-color: #31afdb;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-right: 1px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_Usage {
        background-color: #7cab92;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-right: 1px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_low {
        background-color: #7cab92;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-right: 1px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_data_low {
        color: #53565a;
        float: left;
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 2px;
        margin-right: 5px;
    }

    .GraphLegend_Avg {
        background-color: #d39d76;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-right: 1px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_High {
        background-color: #c56e6e;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_solar {
        background-color: #018dc8;
        border-radius: 50%;
        float: left;
        height: 10px;
        margin-left: 5px;
        margin-right: 1px;
        margin-top: 7px;
        text-indent: -9999px;
        width: 10px;
    }

    .GraphLegend_data_solar {
        color: #53565a;
        float: left;
        font-size: 12px;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 2px;
        margin-right: 5px;
    }

    .meter_type_box1 {
        padding-left: 18px;
        background: #f4f4f4;
        padding-top: 10px;
    }

    .meter_type_left, meter_type_right {
        float: left;
        padding-right: 30px;
    }

        .meter_type_left > span, .meter_type_right > span {
            padding-right: 7px;
        }

    .wrapper_usage_type_box {
        float: left;
        width: 100%;
    }

    #usagetypepopup, #ddlMultiMeter, #ddlMonth, #Comparetype {
        border: 1px solid #c7c7c7;
    }
</style>
<script type="text/javascript">
    $(document).ready(function () {

        if ("<%=SessionAccessor.IsModuleEnabled(Features.Power) %>" == "none")
            $("#Comparetype option[value='E']").remove();
        if ("<%=SessionAccessor.IsModuleEnabled(Features.Water) %>" == "none")
            $("#Comparetype option[value='W ']").remove();
        if ("<%=SessionAccessor.IsModuleEnabled(Features.Gas) %>" == "none")
            $("#Comparetype option[value='G']").remove();

    });

</script>
<script>
    $(document).ready(function () {

        $('.liprojectedusage').each(function () {
        });



    });
</script>
<div>
    <div id="usageLoaderPopup" style="display: none;">
        <div class="meter_type_box1">
            <div class="meter_type_left">
                <span>Meter Type:</span>
                <select id="usagetypepopup" style="width: 150px;">
                    <option value="E">Power</option>
                    <option value="W">Water</option>
                    <option value="G">Gas</option>
                </select>
            </div>
            <div class="meter_type_right">
                <span>Meter Number:</span>
                <asp:DropDownList ID="ddlMultiMeter" CssClass="ddmultimeter_select"
                    runat="server" Style="padding-right: 7px; width: 150px;"
                    ClientIDMode="Static">
                </asp:DropDownList>
            </div>
        </div>
        <div>
            <div class="current_area" id="GenDivUsage" style="display: none">
                <ul>
                    <li id="monthlyAvg" style="display: <%=AdminPanel.SessionAccessor.IsModuleEnabled(AdminPanel.Features.UsageMonthlyAverage) %>!important">
                        <div class="average_usage_header">
                            <span id="averageval" globalize="ML_POWERUSAGE_$" title=""></span>

                        </div>

                        <i id="averagevaltext"></i>&nbsp;<i id="glbizeAverage"></i>
                    </li>

                    <li id="highestyear" style="display: <%=AdminPanel.SessionAccessor.IsModuleEnabled(AdminPanel.Features.UsageHighestThisYear) %>!important">
                        <div class="average_usage_header">
                            <span id="highestval"></span>
                        </div>
                        <i id="ModeText" globalize=""></i>
                    </li>

                    <li id="soFarUsage" style="display: <%=AdminPanel.SessionAccessor.IsModuleEnabled(AdminPanel.Features.UsageSoFar) %>;">

                        <div class="average_usage_header">
                            <span id="lblCurrentUsage"></span>

                        </div>
                        <span id="lblUnitThisMonth"></span>
                        <span id="lblCurrentUsageH"></span>
                        <i id="SoFar" globalize="ML_WU_SPAN_SO_FAR_THIS_MONTH"></i>
                    </li>

                    <li id="projectedUsage" class="liprojectedusage" style="display: <%=AdminPanel.SessionAccessor.IsModuleEnabled(AdminPanel.Features.ProjectUsage) %>;">
                        <div class="average_usage_header">
                            <span id="lblEstimatedUsage"></span>

                        </div>
                        <span id="lblUnitPrediction"></span>
                        <span id="lblEstimatedUsageH"></span>
                        <i id="Projected" globalize="ML_WU_SPAN_PREDICTED_THIS"></i>
                    </li>

                    <li id="MaxDemand" class="liprojectedusage" style="display: none;">
                        <div class="average_usage_header">
                            <span>
                                <span id="lblMaxDemand"></span>
                            </span>
                        </div>
                        <i id="MaxDemandVal" globalize="ML_Usage_MaxDemand"></i>

                    </li>
                    <li id="LoadFactor" class="liprojectedusage" style="display: none;">
                        <div class="average_usage_header">
                            <span>
                                <span id="lblLoadFactor"></span>
                            </span>
                        </div>
                        <i id="LoadFactorVal" globalize="ML_Usage_LoadFactor"></i>

                    </li>
                </ul>
            </div>

            <div class="current_area" id="WaterDiv" style="display: none">
                <ul>
                    <li><span id="averagevalue" globalize="ML_POWERSOLAR_$"
                        title=""></span>
                        <i globalize="ML_Solar_SPAN_AVERAGE"></i>
                    </li>

                    <li><span id="highestvalue" globalize="ML_POWERSOLAR_$"></span>
                        <i globalize="ML_Solar_SPAN_HIGHEST_THIS"></i>
                    </li>

                    <li><span id="currentUsages" globalize="ML_POWERSOLAR_$"
                        title="">
                        <asp:Label ID="lblCurrentUsages" runat="server" Text="N/a"
                            ClientIDMode="Static"></asp:Label></span>
                        <i globalize="ML_WU_SPAN_SO_FAR_THIS_MONTH"></i>
                    </li>

                    <li><span id="estimatedUsages" globalize="ML_POWERSOLAR_$"
                        title="">
                        <asp:Label ID="lblEstimatedUsages" runat="server" Text="N/a"
                            ClientIDMode="Static"></asp:Label></span>
                        <i globalize="ML_Solar_SPAN_PREDICTED_THIS"></i>
                    </li>
                </ul>
            </div>

            <div class="wrapper_usage_type_box">
                <div style="width: 35%; margin-left: 1%;">
                    <div class="usage_type">
                        <ul id="unitmode">
                            <li><a href="#" class="active" mode="D" id="aUsageElectricD"
                                onclick="return false"></a></li>
                            <li><a href="#" mode="W" id="aUsageElectrickWh" onclick="return false"></a></li>
                            <li><a href="#" mode="G" id="aUsageWaterGl" style="display: none"
                                onclick="return false"></a></li>
                        </ul>
                    </div>
                </div>

                <div class="power_graph_heading power_graph_spanish" style="text-align: center; margin: 0px auto 0px -1%; float: left; width: 40%; padding: 9px 0px 0px;">
                    <asp:Label ID="lblCharttitle" ClientIDMode="Static" runat="server"
                        Text=""
                        Style="font-weight: bold; float: left; margin-top: 13px; margin-left: 40px;"
                        globalize="ML_POWERUSAGE_LBL_ChartTitle"></asp:Label>
                    <span id="divCalender" style="display: none; line-height: 43px;">
                        <asp:TextBox runat="server" ID="btnCalender" Style="width: 0px; height: 0px; visibility: hidden"></asp:TextBox>
                        <label>
                            <strong><span globalize="ML_WU_Lbl_SelectDate"></span>
                            </strong>
                        </label>
                        <asp:ImageButton runat="server" ID="imgbtnCalender" globalize="ML_POWERUSAGE_img_SelectedDate"
                            title="" ImageUrl="~/images/Icon-Calendar.svg" Style="vertical-align: middle;"></asp:ImageButton>
                        <asp:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="btnCalender"
                            Format="MM/dd/yyyy"
                            Enabled="True" OnClientDateSelectionChanged="UsageDataHourly"
                            PopupButtonID="imgbtnCalender">
                        </asp:CalendarExtender>
                    </span>

                </div>

                <div style="margin-right: 1%; float: right; width: 29%;">
                    <div class="usage_listing">
                        <ul id="duarationmode">
                            <li><a href="#" mode="MI" onclick="return false">15 Min</a>
                            </li>
                            <li><a href="#" mode="H" onclick="return false">Hourly</a>
                            </li>
                            <li><a href="#" mode="D" style="display: none" class="active"
                                onclick="return false">Daily</a></li>
                            <li><a href="#" mode="M" style="display: none" onclick="return false">Monthly </a></li>
                            <li><a href="#" mode="S" style="display: none" onclick="return false">Seasonal </a></li>
                            <li><a href="#" mode="B" style="display: none" onclick="return false">BiMonthly </a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="width: 100%; overflow: auto; clear: both;">
                <div id="divElectricityUsage" style="height: 455px" class="usageconsumption">
                </div>
                <div id="divNoDataUsage" style="height: 250px; text-align: center; display: none"
                    globalize="ML_Dashboard_Lbl_NoUsageData">
                    No Usage data available to display.
                </div>
            </div>
            <div class="currency compare_nav " style="width: 100%; float: left; background: #f5f5f5; padding-right: 20px;">

                <div class="curent_usage_line" style="float: right; padding: 10px 0; width: 100% !important; background-color: #f7f7f7;">
                    <div class="ratest_box_mob" style="float: left; width: 40%;">
                        <div class="compare_month solar_css" style="float: left; padding-left: 20px; width: auto;">
                            <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="~/images/table-export.svg"
                                OnClick="lnkExporttoExcel_Click" ClientIDMode="Static"
                                Style="cursor: auto; margin-top: 0;" />
                            <div style="white-space: nowrap; font-size: 14px;">
                                <asp:LinkButton ID="lnkExporttoExcel" runat="server" globalize="ML_POWERUSAGE_LBL_ExporttoExcel"
                                    Text="Export to Excel" OnClick="lnkExporttoExcel_Click"
                                    ClientIDMode="Static" Style="text-decoration: none !important; color: #4a7eb6 !important;"></asp:LinkButton>
                            </div>
                        </div>
                    </div>
                    <div id="UsagesID" style="border-top: 1px solid #f7f7f7; display: none; margin: 0px 0px 0px 0px; float: right; padding: 0px 0; text-align: center;">
                        <p>
                         <%--   <span class="GraphLegend_WaterAlloc"></span>
                            <span class="GraphLegend_data_WaterAlloc" globalize="ML_Usage_Lbl_WaterAlloc"></span>
                            <span class="GraphLegend_Usage"></span>
                            <span class="GraphLegend_data_low" globalize="ML_USAGE" id="LUsage"></span>
                            <span class="GraphLegend_low"></span>
                            <span class="GraphLegend_data_low" globalize="ML_WU_LowUsage" id="LowUsage"></span>
                            <span class="GraphLegend_Avg"></span>
                            <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1" id="AvgUsage"></span>
                            <span class="GraphLegend_High"></span>
                            <span class="GraphLegend_data_low" globalize="ML_WU_HighUsage1" id="HighUsage"></span>
                            <span class="GraphLegend_solar"></span>
                            <span class="GraphLegend_data_solar" globalize="ML_DASHBOARD_Anchor_SolGen"></span>--%>
                        </p>
                    </div>

                </div>
            </div>
            <br />
        </div>
    </div>
</div>
<div style="display: none">
    <span globalize="ML_PowerUSAGE_span_Hourly" id="glblizeHourly"></span>
    <span globalize="ML_PowerUSAGE_span_Daily" id="glblizeDaily"></span>
    <span globalize="ML_PowerUSAGE_span_Monthly" id="glblizeMonthly"></span>
    <span globalize="ML_PowerUSAGE_span_Yearly" id="glblizeYearly"></span>
    <span globalize="ML_PowerUSAGE_span_15MINAVG" id="glblize15min"></span>
    <span globalize="ML_GASUSAGE_span_glblizeHour" id="glblizeHour"></span>
    <span globalize="ML_GASUSAGE_span_glblizeDay" id="glblizeDay"></span>
    <span globalize="ML_GASUSAGE_span_glblizeMonth" id="glblizeMonth"></span>
    <span globalize="ML_WU_span_glblizeYear" id="glblizeYear"></span>
    <span globalize='ML_PowerUSAGE_span_Seasonal' id="glblizeSeasonal"></span>
</div>

<asp:HiddenField ID="hdnWaterAllocation" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnExportKey" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnType" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnunit" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnFlag" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPU" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWU" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGU" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUKWH" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUMonthly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUDaily" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUHourly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPU15Min" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPUSeasonal" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUSeasonal" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUSeasonal" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUKWH" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUMonthly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUHourly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGUDaily" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUKWH" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUBIMonthly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUGallon" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUMonthly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUHourly" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWUDaily" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMeterTypePower" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMeterTypeWater" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMeterTypeGas" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnLoadKwh" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnLoadDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMaxDemandkwh" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMaxDemandDollar" runat="server" ClientIDMode="Static" />
<span id="hdnUsage_date" style="display:none"></span>
