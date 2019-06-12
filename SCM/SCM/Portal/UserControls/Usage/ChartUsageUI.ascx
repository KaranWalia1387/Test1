<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChartUsageUI.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.ChartUsageUI" EnableViewState="True" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>


<script>
    var UsageType = ""; var IsAMI = "";
    $(document).ready(function () {

        $(".currency").css("display", "none"); //$('#page_loader').show();
    });
    $(window).load(function () {
          $('#page_loader').hide(); $(".currency").css("display", "block");
         
    
    });
    $(document).ready(function () {
        try {
            $('#lblRateText').text($('#lblRates').text());
            UsageType = $('#hdnUsageType').val();
            var currtype = $('#hdnType').val();
            var titleText = "", titleText1 = "";
            $('#usageMapType a').removeClass("active");          
            if (currtype != 'D') {
                if (UsageType == 'PU') {
                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    titleText = $('#glbClickToViewKwh').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('kWh');
                    $('#usageMapType a[type=K]').addClass("active");
                }                
                else if (UsageType == 'GU') {
                    $('#typeK').attr('type', 'C');
                    $('#typeK').attr('globalize', 'ML_POWERGAS_btn_CCF');
                    titleText = $('#glbClickToViewCCF').attr("title");
                    $('#typeK').attr("title", titleText);                   
                    $('#typeK').text('Ccf');
                    $('#usageMapType a[type=C]').addClass("active");
                }
                else if (UsageType == 'WU') {
                    $('#typeK').attr('type', 'W');
                    $('#typeK').attr('globalize', 'ML_POWERGAS_btn_HCF');
                    titleText = $('#glbClickToViewHCF').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('HCF');
                    $('#usageMapType a[type=' + $('#hdnType').val() + ']').addClass("active");//Modified by Abhilash Jha for BUg ID: 0009638
                }
                else if (UsageType == 'SU') {

                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    titleText = $('#glbClickToViewKwh').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('kWh');
                    $('#usageMapType a[type=K]').addClass("active");
                }
                else {
                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    titleText = $('#glbClickToViewKwh').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('kWh');
                    $('#usageMapType a[type=K]').addClass("active");
                  
                }
            }
            else {
                $('#usageMapType a[type=D]').addClass("active");
                if (UsageType == 'PU') {
                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    titleText = $('#glbClickToViewKwh').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('kWh');

                    $('#typeD').attr('type', 'D');
                    $('#typeD').attr('globalize', 'ML_POWERWATER_btn_$');
                    titleText1 = $('#glbClickToView$').attr("title");
                    $('#typeD').attr("title", titleText1);
                    //$('#typeD').text('$$');
                }
                else if (UsageType == 'GU') {
                    $('#typeK').attr('type', 'C');
                    $('#typeK').attr('globalize', 'ML_POWERGAS_btn_CCF');
                    titleText = $('#glbClickToViewCCF').attr("title");
                    $('#typeK').attr("title", titleText);

                    $('#typeK').text('Ccf');
                }
                else if (UsageType == 'WU') {
                    $('#typeK').attr('type', 'W');
                    $('#typeK').attr('globalize', 'ML_POWERGAS_btn_HCF');
                    titleText = $('#glbClickToViewHCF').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('HCF');
                }
                else if (UsageType == 'SU') {
                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    $('#typeK').text('kWh');
                }

                else {
                    $('#typeK').attr('type', 'K');
                    $('#typeK').attr('globalize', 'ML_POWERUSAGE_btn_kWh');
                    titleText = $('#glbClickToViewKwh').attr("title");
                    $('#typeK').attr("title", titleText);
                    $('#typeK').text('kWh');

                    $('#typeD').attr('type', 'D');
                    $('#typeD').attr('globalize', 'ML_POWERWATER_btn_$');
                    titleText1 = $('#glbClickToView$').attr("title");
                    $('#typeD').attr("title", titleText1);
                }
            }

            showhideweatheroverlay();
        }

        catch (ex) { }

    });

    //Changes done for Multimeter for dropdown
    // for checking AMI or NON-AMI Meter
    function HideShowAMIMode() {
        var IsAMI = $("#ddlMultiMeter option:selected").attr('Isami');
        if (IsAMI == "false") {
            $("#<%=li_15min.ClientID %>").attr('style', 'display:none!important;');
            $("#<%=li_hourly.ClientID %>").attr('style', 'display:none!important;');
            $("#<%=li_daily.ClientID %>").attr('style', 'display:none!important;');
            $('#soFarUsage').css('display', 'none');
            $('#projectedUsage').css('display', 'none');
        }
        else {
            if (IsAMIStatus == true && ($("#ddlMultiMeter option:selected").text() == "All" || $("#ddlMultiMeter option:selected").text() == "todas")) {
                $("#<%=li_15min.ClientID %>").attr('style', 'display:none!important;');
                $("#<%=li_hourly.ClientID %>").attr('style', 'display:none!important;');
                $("#<%=li_daily.ClientID %>").attr('style', 'display:none!important;');
                $('#soFarUsage').css('display', 'none');
                $('#projectedUsage').css('display', 'none');
            }
            else {
                $("#<%=li_15min.ClientID %>").attr('style', '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power15)%>');
                $("#<%=li_hourly.ClientID %>").attr('style', '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.PowerDaily)%>');
                $("#<%=li_daily.ClientID %>").attr('style', '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.PowerHourly)%>');
                $('#soFarUsage').css('display', 'block');
                $('#projectedUsage').css('display', 'block');
                $("#soFarUsage").attr('style', '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageSoFar) %>');
                $("#projectedUsage").attr('style', '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>');
            }
        }

        //usageType = "<%=HttpContext.Current.Session["UsageType"].ToString()%>";
        if (usageType == "PU") {
            $('#usageMapMode').css("display", "<%=CustomerPortal.Master.PowerModeHideShow()%>");
            }
            else if (usageType == "WU") {
                $('#usageMapMode').css("display", "<%=CustomerPortal.Master.WaterModeHideShow()%>");
            }
            else if (usageType == "GU") {
                $('#usageMapMode').css("display", "<%=CustomerPortal.Master.GasModeHideShow()%>");
            }
            else {
                $('#usageMapMode').css('display', 'block');
                $("#<%=li_15min.ClientID %>").attr('style', 'display:none!important;');
            }
    }

    function showhideweatheroverlay() {
        if (UsageType == 'SU') {
            $("#showWeatherOverlay").css('display', 'inline');
            // $("input[name=weatheroverlay][value='1']").prop("checked", true);

        }
            //  || mode=='MI'
        else if ((UsageType == 'PU' || UsageType == 'WU' || UsageType == 'GU') && (mode == 'D' || mode == 'H')) {
            $("#showWeatherOverlay").css('display', 'inline');
           
        }
        else if ((UsageType == 'NU') && (mode == 'D' || mode == 'H')) {
            $("#showWeatherOverlay").css('display', 'inline');
        }

        else {
            $("#showWeatherOverlay").hide();
        }

    }
    function showhideNetUsage() {
        if (UsageType == 'PU'||UsageType == 'NU') {
            $("#divconfigusage").css('display', 'inline');
        }
        else {
            $("#divconfigusage").hide();
        }
    }

   
</script>
<script src="<%=string.Format("{0}/js/bootstrap-toggle.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
<link href="<%=string.Format("{0}/js/bootstrap-toggle.min.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
<style>
 
    #usageMapType .compare_month {
        float: right;
        margin: 6px 0 0;
        width: 18%;
    }

    .currency ul li {
        height: auto
    }

    .currency_1 ul {
        margin: 0px !important;
        padding: 0px !important;
        list-style: none;
    }

        .currency_1 ul li {
            margin: 0px !important;
            padding: 0px 3px !important;
            float: left !important;
            width: auto;
            border-left: 0px;
        }

    .currency ul li {
        width: auto;
        border-left: 0px;
        min-height:auto;
    }

    .currency {
        padding-left: 19px;
        padding-bottom:0px;
    }

        .currency ul li a {
            margin-left: 0px !important;
        }

    .currency_1 ul li a {
        padding: 29px 0px 8px !important;
        text-indent: 0px !important;
    }


    #UsagesID {
        width: 65% !important;
    }

    .ratest_box_mob {
        width: 30% !important;
    }

    #RatesID {
        padding: 0.9% 6% 0 0.5% !important;
    }

    .wthr_usages {
        /*position: absolute;*/
        bottom: -10px;
        right: 46px;
    }

        .wthr_usages span {
            float: left;
            padding-top: 4px;
            font-weight: bold;
            padding-right: 6px;
        }


        .wthr_usages .on_off_usages {
            float: left;
            border-color: #2F71A3;
            background: #246A9F !important;
            color: #fff;
            outline: none;
        }

            .wthr_usages .on_off_usages:hover {
                background: #1c5b8a !important;
            }

    .highcharts-tooltip span {
        background-color: white;
        /*border: 1px solid green;*/
        opacity: 1;
        z-index: 9999 !important;
    }
    @media (min-width:992px) and (max-width:1024px) {        
        .currency_1_mob ul#usageMapMode {
            margin-right: -8% !important;
            width: 32% !important;

        }
        .wthr_usages {
            margin-left: -7px !important;
        }

        .solar_css {
               width: 152px !important;
        }
         .ratest_box_mob {
                width: 41% !important;
            } 
    }
     @media (min-width:768px) and (max-width:991px) {
          .currency_1_mob ul#usageMapMode {
            margin-right: -8% !important;
            width: 42% !important;
        }
           .solar_css {
               width: 152px !important;
               margin-right: -10px;
                margin-top: 0;
        }
           #UsagesID {                
                 margin: 0 0 0 -3px !important;
                padding: 0 !important;
           }

            .ratest_box_mob {
                 padding-top: 6px;
                width: 41% !important;
                font-size: 13px !important;
            } 
            
     }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
        /* Safari only override */
        ::i-block-chrome, .compare_graph img {
            width: 15px !important;
            height: 15px !important;
        }
    }

    .power_graph_spanish {
            margin-left: -4% !important;
    }
    @media (min-width:768px) and (max-width:991px) {
    .next_last_days {
        float: right;
        position: absolute;
        right: 0;
        top: 34px;
       width: 39% !important;
    }
    }
      }
    .toggle.btn.ios {
    margin-top: -1px;
    margin-right: 7px;
    min-width: 44px;
    min-height: 24px;
    height: 23px !important;
    width: 44px !important;
    background-color: #246A9F !important;
    border-color: #246A9F !important;
    border-radius: 20px !important;
    color: #246A9F !important;
}
    .toggle.ios, .toggle-on.ios, .weather_box_right .toggle-off.ios {
    border-radius: 20px;
}
     .toggle-on.btn {
    background-color: #246A9F !important;
    text-indent: -9999px;
}
    .toggle-off.btn {
    background-color: #828282 !important;
    text-indent: -9999px;
}
    .toggle.ios .toggle-handle {
    padding: 0 24px;
}
.toggle.ios .toggle-handle {
    -moz-border-radius: 20px; 
    -webkit-border-radius: 20px; 
    border-radius: 20px;
    float: none;
}



    @media (min-width:320px) and (max-width:767px) {
        .currency ul.calender_usages li {
            width: 38px;
        }
        .currency_1 ul li a {
            font-size: 9px;
        }
        .currency ul li a[mode="M"], .currency ul li a[mode="S"], .currency ul li a.active[mode="S"], .currency ul li a.active[mode="M"] {
             text-indent: -3px !important;
        }

        #usageMapMode {
            float: right !important;
           width: 54% !important;
        }
        #divCalender {
             width: 190px !important;
             float:left;
        }
    }

  
</style>
<%-- code for multilingual id's --%>
<div style="display: none">
    <span globalize="" id="glblize15min"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_Period") %></span>
    <span globalize="ML_PowerUSAGE_span_Daily" id="glblizeDaily"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Daily") %></span>
    <span globalize="ML_PowerUSAGE_span_Hourly" id="glblizeHourly"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Hourly") %></span>
    <span globalize="ML_PowerUSAGE_span_Monthly" id="glblizeMonthly"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Monthly") %></span>
    <span globalize='ML_PowerUSAGE_span_Seasonal' id="glblizeSeasonal"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Seasonal") %></span>
</div>

<div class="currency" style="clear: both; display: none">
    <div id="usageMapType">
        <ul style="float: left; width: 15%;">
            <li runat="server" id="li_kwh"><a id="typeK" type="K" title="" href="#" clientidmode="Static">kWh </a></li>
            <li runat="server" id="li_Gallon" visible="false"><a id="typeG" globalize="ML_POWERWATER_btn_GL" title="" type="G" href="#" clientidmode="Static"><%= CustomerPortal.Translator.T("ML_POWERWATER_btn_GL") %> </a></li>
            <li runat="server" id="li_dollar"><a type="D" id="typeD" href="#" globalize="ML_POWERWATER_btn_$" clientidmode="Static"><%= CustomerPortal.Translator.T("ML_POWERWATER_btn_$") %>   </a></li>

        </ul>
    </div>


    <div class="power_graph_heading power_graph_spanish" style="text-align: center; margin: 0px auto 0px -1%; float: left; width: 40%; padding: 9px 0px 0px;">
        <asp:Label ID="lblCharttitle" ClientIDMode="Static" runat="server" Text=""
            Style="font-weight: bold; float: left; margin-top: 13px; margin-left: 20px;" globalize="ML_POWERUSAGE_LBL_ChartTitle"></asp:Label>
        <span id="divCalender" style="display: none; line-height: 43px;">
            <asp:TextBox runat="server" ID="btnCalender" Style="width: 0px; height: 0px; visibility: hidden"></asp:TextBox>
            <label><strong><span globalize="ML_WU_Lbl_SelectDate"><%= CustomerPortal.Translator.T("ML_WU_Lbl_SelectDate") %></span></strong></label>
            <asp:LinkButton runat="server" ID="imgbtnCalender" class="cal_img_btn" globalize="ML_POWERUSAGE_img_SelectedDate" title=""  Style="vertical-align: middle;"></asp:LinkButton>
            <asp:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="btnCalender" Format="MM/dd/yyyy"
                Enabled="True" OnClientDateSelectionChanged="UsageDataHourly" PopupButtonID="imgbtnCalender">
            </asp:CalendarExtender>
        </span>

    </div>
    <div style="display: none">
    <div id="GenrationMode" class="next_last_days" style="float: right; width: 25%;display: none">
        <ul style="float: right; margin-right: 10px;">
            <li><a href="#" mode="L" class="active" id="LstTen">
                <img src="images/last_ten_days.png" id="lasttendays" />
                <p>
                    <span globalize="ML_SolarGen_Last10"><%= CustomerPortal.Translator.T("ML_SolarGen_Last10") %></span>
                    <span globalize="ML_SolarGen_10DAYS"><%= CustomerPortal.Translator.T("ML_SolarGen_10DAYS") %></span>
                </p>
            </a></li>
            <%--globalize="ML_Usage_Solar_Lbl_Last10Days"--%>
            <li><a href="#" mode="N" id="NxtTen">
                <img src="images/next_ten_days.png" id="nexttendays" />
                <p>
                    <span globalize="ML_SolarGen_Next10"><%= CustomerPortal.Translator.T("ML_SolarGen_Next10") %></span>
                    <span globalize="ML_SolarGen_10DAYS"><%= CustomerPortal.Translator.T("ML_SolarGen_10DAYS") %></span>
                </p>
            </a></li>
            <%--globalize="ML_Usage_Solar_Lbl_Next10Days"--%>
        </ul>
    </div>
        </div>
    <div style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.IsWeatherOverlay) %>;">
    <div id="showWeatherOverlay" class="wthr_usages" style="display: none; float: left; margin-top: 18px; margin-left: 2%;">

        <span style="float: left;" globalize="ML_USAGE_Weather_Overlay_Text"><%= CustomerPortal.Translator.T("ML_USAGE_Weather_Overlay_Text") %></span>
            <%--<input id="imgIson" name="weatheroverlay" text="On" style="float: left;" type="checkbox" class="on_off_btn on_off_usages" data-toggle="toggle" data-style="ios">--%>
        <input id="imgIson" name="weatheroverlay" text="On" style="float: left;" type="checkbox" class="cmn-toggle cmn-toggle-round on_off_btn on_off_usages" data-style="ios">  
        <label for="imgIson" class="toggle_lbl_class"></label>
    </div>
        
    </div>
    <div class="currency_1 currency_1_mob">

        <ul class="calender_usages cal-usa-es" style="float: right; margin-right: 4px !important; display: none" id="usageMapMode">
            <li id="li_15min" runat="server" class="li_15min"><a href="#" mode="MI" globalize="ML_Usage_Btn_15min"><%= CustomerPortal.Translator.T("ML_Usage_Btn_15min") %></a></li>
            <li runat="server" id="li_hourly"><a href="#" mode="H" globalize="ML_Usage_Btn_Hourly"><%= CustomerPortal.Translator.T("ML_Usage_Btn_Hourly") %></a></li>
            <li runat="server" id="li_daily"><a href="#" mode="D" globalize="ML_Usage_Btn_Daily"><%= CustomerPortal.Translator.T("ML_Usage_Btn_Daily") %></a></li>
            <li runat="server" id="li_monthly"><a href="#" mode="M" globalize="ML_Usage_Btn_Monthly"><%= CustomerPortal.Translator.T("ML_Usage_Btn_Monthly") %></a></li>
            <li runat="server" id="li_season"><a href="#" mode="S" globalize="ML_Usage_Btn_Seasonal"><%= CustomerPortal.Translator.T("ML_Usage_Btn_Seasonal") %></a></li>
            <!-- added globalize for bug id: 0009752 -->
            <li runat="server" id="li_bimonthly"><a href="#" mode="B" globalize="ML_Usage_Btn_BiMonthly"><%= CustomerPortal.Translator.T("ML_Usage_Btn_BiMonthly") %></a></li>
        </ul>
    </div>
    <%-- <div class="currency compare_nav " style="width: 98.6%">
        <uc1:FooterUsageUI runat="server" id="FooterUsageUI"   />
    </div>--%>

    <div class="total_bills" style="width: 97%; display: none">
        <div class="Left_Bill_area" style="border-right: 2px solid #f4f4f4;" id="UsageDiv" runat="server">
            <div id="UsageDivHide" runat="server" class="right-area-tabular" style="width: 35%; position: absolute; left: 70%; top: 17%; z-index: 99;">
                <p>
                    <span class="GraphLegend_Avg"></span>
                    <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1"><%= CustomerPortal.Translator.T("ML_WU_AverageUsage1") %></span>
                </p>
                <div class="clearfix">&nbsp;</div>
                <p>
                    <span class="GraphLegend_High"></span>
                    <span class="GraphLegend_data_low" globalize="ML_WU_HighUsage1"><%= CustomerPortal.Translator.T("ML_WU_HighUsage1") %></span>
                </p>

            </div>
            <div class="all_bill_box" id="divusagewatericon" runat="server"></div>
            <div class="all_bill_box" id="divgasUsage" runat="server"></div>
            <div class="all_bill_box" id="divgenerationicon" runat="server"></div>
        </div>

    </div>

</div>


<div class="clearfix"></div>
  

<div class="compare_graph" style="width: 100%; position: relative; overflow-x: auto; overflow-y: hidden">
    <div id="chart" class="radius" style="height: 550px;">
    </div>

</div>

<div id="usagechartdiv" runat="server" style="width: auto; display: none;" clientidmode="Static">
    <h1 style="font-size: 24px; margin: 0; padding: 0 0 13px;"><span id="lblRateText"></span></h1>
</div>
<asp:HiddenField runat="server" ID="hdnPowerAMI" ClientIDMode="Static" />
<asp:HiddenField runat="server" ID="hdnWaterAMI" ClientIDMode="Static" />
<asp:HiddenField runat="server" ID="hdnGasAMI" ClientIDMode="Static" />
<span id="lblRates" style="display: none;" globalize="ML_RBC_Rates"><%= CustomerPortal.Translator.T("ML_RBC_Rates") %></span>
   <span id="lblUDollar" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Dollar") %></span>
<span id="lblUGDollar" style="display: none;" globalize="ML_Graph_Lbl_Gen_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Dollar") %></span>
<span id="lblPKWH" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Kwh") %></span>
<span id="lblGCCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Gas"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Gas") %></span>
<span id="lblWGL" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Galon"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Galon") %></span>
<span id="lblWHCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_HCF"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_HCF") %></span>
<span id="lblPUKWH" style="display: none;" globalize="ML_Graph_Lbl_Gen_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Kwh") %></span>
<span id="lblMaxTemp" style="display: none;" globalize="ML_Usage_WaterChart"><%= CustomerPortal.Translator.T("ML_Usage_WaterChart") %></span>
<span id="lblMinTemp" style="display: none;" globalize="ML_Usage_WaterChart_Min"><%= CustomerPortal.Translator.T("ML_Usage_WaterChart_Min") %></span>
<span id="lblAvgHumidity" style="display: none;" globalize="ML_Usage_WaterChart_Avg"><%= CustomerPortal.Translator.T("ML_Usage_WaterChart_Avg") %></span>
<span id="lblWeather" style="display: none;" globalize="ML_Usage_Weather"><%= CustomerPortal.Translator.T("ML_Usage_Weather") %></span>
<span id="lblon" style="display: none;" globalize="ML_SmartCAS_b_On"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_On") %></span>
<span id="lbloff" style="display: none;" globalize="ML_SmartCAS_btn_Off"><%= CustomerPortal.Translator.T("ML_SmartCAS_btn_Off") %></span>
<span id="lbltemp" style="display: none;" globalize="ML_SmartDry_b_temp"><%= CustomerPortal.Translator.T("ML_SmartDry_b_temp") %></span>

<span id="glbClickToViewCCF" style="display: none;" globalize="ML_POWERGAS_btn_CCF"><%= CustomerPortal.Translator.T("ML_POWERGAS_btn_CCF") %></span>
<span id="glbClickToView$" style="display: none;" globalize="ML_POWERWATER_btn_$"><%= CustomerPortal.Translator.T("ML_POWERWATER_btn_$") %></span>
<span id="glbClickToViewKwh" style="display: none;" globalize="ML_POWERUSAGE_btn_kWh"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_btn_kWh") %></span>
<span id="glbClickToViewHCF" style="display: none;" globalize="ML_POWERGAS_btn_HCF"><%= CustomerPortal.Translator.T("ML_POWERGAS_btn_HCF") %></span>
<span id="iprojectedusage" globalize="ML_Usage_Icon_ProjectedUsage" style="display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Icon_ProjectedUsage") %></span>
<span id="isofar" globalize="ML_Usage_Icon_SoFarThisMonth" style="display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Icon_SoFarThisMonth") %></span>