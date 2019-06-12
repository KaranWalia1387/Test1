<%@ Page Title="Dashboard" Language="C#" MasterPageFile="Master.Master"
    AutoEventWireup="true" CodeBehind="dashboard.aspx.cs"
    Inherits="CustomerPortal.Dashboard" EnableEventValidation="false" %>

<%@ Import Namespace="CustomerPortal" %>
<%@ Register Src="~/UserControls/Dashboard/BillingUserControl.ascx"
    TagPrefix="uc1" TagName="BillingUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/MyAccountUserControl.ascx"
    TagPrefix="uc1" TagName="MyAccountUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/NotificationUserControl.ascx"
    TagPrefix="uc1" TagName="NotificationUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/OutageUserControl.ascx"
    TagPrefix="uc1" TagName="OutageUserControl" %>
<%@ Register Src="~/UserControls/OutageKeys.ascx" TagPrefix="uc1"
    TagName="OutageKeys" %>
<%@ Register Src="~/UserControls/Dashboard/CompareSpendingUserControl.ascx"
    TagPrefix="uc1" TagName="CompareSpendingUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/ChargingStationUserControl.ascx"
    TagPrefix="uc1" TagName="ChargingStationUserControl" %>
<%@ Register Src="~/UserControls/GreenFootPrintKeys.ascx"
    TagPrefix="uc1" TagName="GreenFootPrintKeys" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
    <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css" />
    <script src="//js.arcgis.com/3.14/" type="text/javascript"></script>

    <% }
      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <% }%>
    <%if (SessionAccessor.IsModuleEnabled(Features.Outages, false) == true)
      {  %>
    <script src="js/GISoutages.js" type="text/javascript"></script>
    <% }%>
    <%if (SessionAccessor.IsModuleEnabled(Features.FootPrint, false) == true)
      {  %>
    <script src="js/footprint.js" type="text/javascript"></script>
    <% }%>
    <script src="js/highchart_js/highcharts.js" type="text/javascript"></script>
    <script src="js/highchart_js/common-chart.js" type="text/javascript"></script>

    <script>var dojoConfig = { parseOnLoad: true };</script>
    <script type="text/javascript">

        dojo.require("dijit.layout.BorderContainer");
        dojo.require("dijit.layout.ContentPane");
        dojo.require("esri.map");
        dojo.require("esri.layers.KMLLayer");

        dojo.require("esri.dijit.Popup");

        $(document).ready(function () {
            if (document.getElementById("imgCurrent") != null) {
                document.getElementById("imgCurrent").accessKey = "C";
            }
        })
    </script>

    <script type="text/javascript">
        var noofdays = 7;
        var duration = 'D';
        var TO_FIX = 2;
        var OF_FIX = 2;
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

        $(document).ready(function () {

            var url = getBillingModuleURL();
            $($('#Module2 a')[0]).prop('href', url);
            try {
                var preview = '<%=HttpContext.Current.Request.QueryString["value"]%>';
                    if (preview == 'preview') {
                        $(a).each(function (obj, i) {
                            $(obj).attr('href') = '#';
                            $(obj).attr('onclick') = 'return false';
                        });
                    }

                    $("#outage_map_canvas").click(function () {
                        unbindoutage();
                    });



                }
            catch (e) {
                console.log(e.message);
            }


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
        });

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
            $(window).load(function () {
                try {
                    if ("<%=SessionAccessor.IsModuleEnabled(Features.FootPrint) %>" != "none") {
                        document.getElementById("selFootPrint")[0].textContent = $('#ddlGreenFoot').text();
                    }
                    if ("<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power)%>" == "none") {
                        $('#<%=hdnPinImageC.ClientID %>').val("images/outages/water_icon_red.png");// = (outageType == 'C') ? "images/outages/water_icon_red" : "images/outages/water_icon_blue";
                        $('#<%=hdnPinImageP.ClientID %>').val("images/outages/water_icon_blue.png");
                    }
                }
                catch (e) { }
            });
            $(function () {
                $('select').bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function (event) {
                    event.stopImmediatePropagation();
                });
            });
    </script>

    <style type="text/css">
       
        
        .inner-dashboard-area h3 a img {
    padding-right: 0px !important;
}
        .inner-dashboard-area .right-dolar-top-area .SpanLeft {
               font-size: 14px;
    margin: 6px 5px 0px 0px;
        }
        .right-dolar-top-area #ddlMultiMeterWater, .right-dolar-top-area #ddlMultiMeter {
    width: 84px  !important;
   color:#000!important;
}

        #aWaterUsageHCF, #aWaterUsageGL {
               font-size: 13px !important;
    /*margin-top: 7px !important;*/
        }

        #draggable {
            width: 150px;
            height: auto;
            positio: relative;
            padding: 0.5em;
        }

            #draggable div {
                cursor: move;
            }
    </style>
    <script>
        $(function () {

            $("#draggable").draggable();

        });
    </script>
    <script src="js/dashboard.js" type="text/javascript"></script>
    <style type="text/css">
        /*//added by lalit yadav 12 oc 2015*/
        .preLoader {
            background-image: url('images/loader.gif');
            background-attachment: inherit;
            top: 0px;
            background-repeat: no-repeat;
            background-position: center center;
            color: white;
            opacity: 0.7;
            z-index: 99999;
            /*url('http://jimpunk.net/Loading/wp-content/uploads/loading4.gif'); background-color: #198C19  ;  background-position: center;*/
        }

        #lblDueDate {
            display: inline;
        }

        .outage-area {
            overflow: auto;
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            /* Safari only override */
            ::i-block-chrome, .dashboard_new .mid-container {
                padding-bottom: 50px;
            }
        }

        .compare_select_1 {
            float: right;
            position: absolute;
            right: 0px;
            top: 41px;
            width: 22%;
            padding-top: 0px;
            z-index: 999;
            height: 18px;
            font-size: 11px;
        }

        .smart_icons_dash {
            display: inline-block;
            float: none;
            margin: -5px 0 0px !important;
            padding-right: 8px;
        }

        #selFootPrint {
            height: 21px;
            margin: 1px 7px 0 0;
        }


        @media only screen and (min-width:992px) and (max-width:1024px) {
            #ddlThermostat {
                font-size: 10px !important;
                top: 41px !important;
            }

            .compare_select_1 {
                right: 0px !important;
                top: 41px !important;
                width: 30% !important;
                height: 18px;
            }

            .dashboard_new .mid-container {
                padding-bottom: 50px !important;
            }

            .inner-dashboard-area .right-dolar-top-area {
                margin: -38px 7px 0 0;
            }

                .inner-dashboard-area .right-dolar-top-area a#aUsageElectricD, .inner-dashboard-area .right-dolar-top-area a#aUsageElectrickWh {
                    padding-top: 1px;
                }

            .inner-dashboard-area h3 a img {
                padding-right: 4px;
            }

            .inner-dashboard-area .right-dolar-top-area .SpanRight {
                padding-left: 2px !important;
                line-height: 21px;
            }

            .inner-dashboard-area .right-dolar-top-area .SpanLeft {
                margin: 7px 4px 0 0 !important;
            }
        }

        @media (min-width:768px) and (max-width:991px) {
            .setting_area #ddlAddress {
                width: 120px !important;
            }

            .setting_area {
                float: right !important;
                margin-right: 0px !important;
            }

            .left-area-tabular {
                padding: 2% 4%;
            }

            .right-area-tabular {
                padding: 0;
            }
        }

        /*Google Map css start*/

        #footprint_map_canvas {
            margin: 0;
            padding: 0;
            height: 100%;
            max-width: none;
        }

        .gm-style-iw {
            width: 200px !important;
            top: 0px !important;
            left: 0px !important;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
            border: 1px solid #fff;
            /*border-radius: 2px 2px 10px 10px;*/
            height: 88px;
        }

            .gm-style-iw > div {
                width: 200px !important;
                height: 88px !important;
            }

        #iw-container .iw-title {
            font-family: 'Open Sans Condensed', sans-serif;
            font-size: 10px;
            font-weight: 400;
            padding: 3px 10px 3px 5px;
            background-color: #fff;
            color: #30AFDA;
            margin: 0;
            border-bottom: 1px solid #f4f4f4;
            /*border-radius: 2px 2px 0 0;*/
        }

        #iw-container .iw-content {
            font-size: 10px;
            line-height: 11px;
            font-weight: 400;
            margin-right: 1px;
            padding: 5px 5px 5px 5px;
            max-height: 140px;
            overflow-y: auto;
            overflow-x: hidden;
            color: #333;
        }

            #iw-container .iw-content > p {
                margin-bottom: 5px;
            }

        .iw-content img {
            float: left;
            margin: 0 5px 5px 10px;
        }

        .iw-subTitle {
            font-size: 16px;
            font-weight: 700;
            padding: 5px 0;
        }

        .iw-bottom-gradient {
            position: absolute;
            width: 326px;
            height: 25px;
            bottom: 10px;
            right: 18px;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        }

        .gm-style-iw + div {
            right: 55px !important;
            top: 3px !important;
        }

        /*Google map ends here */
        .ui-widget-content {
            border: 1px solid #d0d0d0 !important;
            box-shadow: none !important;
        }

        #IDEfficiency > img {
            max-width: 100%;
            max-height: 157px;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 0;
            bottom: 0px;
        }

        .MessageContainer {
            border-bottom: 1px solid #D8D8D8;
            padding-bottom: 8px;
            margin-bottom: 4px;
            float: left;
            width: 100%;
        }

        #outage_Text_canvas .MessageContainer:last-child {
            border-bottom: 0px solid #D8D8D8;
        }

        .labels {
            color: black;
            background-color: transparent;
            font-family: "Lucida Grande", "Arial", sans-serif;
            font-size: 12px;
            text-align: center;
            width: 20px;
        }

        .logo_large {
            padding-left: 0px;
        }

        #ContentPlaceHolder1_evArea {
            width: 100%;
        }

            #ContentPlaceHolder1_evArea a {
                font-size: 16px;
            }

        .compare-area strong {
            margin: 18px 0px 0px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1"
    runat="server">
    <asp:HiddenField ID="hdnCompareUtility" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCompareMe" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCompareZip" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPaymentMode" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="dashboard_home" />
    <section class="mid-section dashboard_new">
        <div class="container mid-container">
            <div class="row ui-sortable">               
                  <div  style="display:<%=SessionAccessor.IsModuleEnabled(Features.Billing) %>" class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module2" >
                    <div class="tablet-view">
                        <h3><a href="BillDashboard.aspx"><img src="images/icon_dashboard_heading/icon_billing_heading.svg" /> <span class="icon icon-billing-noti"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Billing") %></span></a></h3>
                       <div id="billingLoader"  style="display:none"><uc1:BillingUserControl  runat="server" id="BillingUserControl"/></div>
                    </div> 
                </div>
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content " id="PU" runat="server" visible="false" clientidmode="Static">
                    <div class="tablet-view">
                        <h3><a href="Usages.aspx"><img src="images/icon_dashboard_heading/icon_electricity_usage_heading.svg" /> <span class="icon icon-power-icon"></span> <span globalize="ML_DASHBOARD_Anchor_PowerUsage"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_PowerUsage") %></span></a></h3>
                          
                         <div class="right-dolar-top-area">
                                <a id="aUsageElectricD" class="SpanLeft" runat="server"  clientidmode="Static"  globalize="ML_DASHBOARD_Anchor_Dol" title="Dollar" style="padding-right: 9px;">$</a>
                                <a id="aUsageElectrickWh" class="SpanRight" runat="server"  clientidmode="Static"  title="kWh"><%= CustomerPortal.Translator.T("ML_USAGEPOWERWIDGET_KWH") %></a>
                               <asp:DropDownList ID="ddlMultiMeter" CssClass="ddmultimeter_select" runat="server" ClientIDMode="Static"></asp:DropDownList> 
                            </div>

                                            
                        <div class="electricity-area">
                            <div id="divElectricityUsage" style="width:100%; height: 100%;"></div>
                            <div class="" id="NoUsageDataDiv" style="display:none" ><%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %></div>                            
                        </div> 
                    </div>
                </div>
                                    
                <div  class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content " id="WU" runat="server"  visible="false" clientidmode="Static">
                    <div class="tablet-view">
                        <h3><a href="Usages.aspx?type=WU"><img src="images/icon_dashboard_heading/icon_water_usage_heading.svg" /> <span  class="icon icon-water-icon-1"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_WaterUsage") %></span></a></h3>
                            
                          <div class="right-dolar-top-area">
                                <a globalize="ML_DASHBOARD_Anchor_Dol" id="aWaterUsageD" class="SpanLeft" runat="server" clientidmode="Static" title="Dollar">$</a>
                                <a  id="aWaterUsageHCF" class="SpanRight" runat="server" clientidmode="Static" title="HCF"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_HCF") %></a>
                                  <a  id="aWaterUsageGL" class="SpanRight" style="padding-left:7px" runat="server" clientidmode="Static" title="Gallon"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Gallon") %></a>
                                <asp:DropDownList ID="ddlMultiMeterWater" CssClass="ddmultimeter_select" runat="server" ClientIDMode="Static"></asp:DropDownList> 
                            </div>
                        <div class="water-area">
                                <div id="divWaterUsage" style="width:100%; height: 100%;"> </div>
                                <div class="" id="NoUsageWaterDataDiv" style="display:none" ><%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %></div>
                           
                        </div>
                    </div>
                </div>                                    
                <%--BANNER--%>
                <div class="col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="PaperlessBillingBanner" globalize="ML_DASHBOARD_PAPERLESSBILLADD">
                    <a id="IDBannerHref" href="#"><img id="BannerDashboard" clientidmode="Static" src="" style="height: 204px; width: 100%;" onclick="BannerClick(this.id);" alt="" onerror="imgErrorBanner1(this);"/></a>
                </div>

                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content immovable"  id="Module5" runat="server"   visible="false" clientidmode="Static">
                    <div class="tablet-view">
                        <h3><a href="outages.aspx">
                            <img src="images/icon_dashboard_heading/icon_outages_heading.svg" /> <span class="icon icon-outage-noti"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Outages") %></span></a></h3>
                           <uc1:OutageUserControl runat="server" id="OutageUserControl" />
                    </div>
                </div>

                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module6" runat="server"  visible="false" clientidmode="Static">
                    <div class="tablet-view">
                    <h3><a href="Notification-Inbox.aspx"><img src="images/icon_dashboard_heading/icon_notifications_heading.svg" /> <span class="icon icon-icon-notif-sidebar"></span> <span globalize="ML_DASHBOARD_Lbl_Notifications" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Notifications") %></span></a></h3>
                        <div id="notificationLoader" style="display:none"><uc1:NotificationUserControl runat="server" id="NotificationUserControl"/></div>
                     
                    </div>
                </div>
          
                    <uc1:CompareSpendingUserControl runat="server" id="CompareSpendingUserControl" />
            
             
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module10" runat="server"  visible="false" clientidmode="Static">
                    <div class="tablet-view">
                        <div id="ModuleEV" runat="server">
                          <h3>                              
                              <a href="<%=common.GetEVLink%>"><img src="images/icon_dashboard_heading/icon_electric_vehicle_heading.svg" /> <span class="icon icon-icon-ev-sidebar"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_ElectricVehicle") %></span></a></h3>
                    <div id="electricvehicleLoader"  style="display:none">     
                         <div class="electric-area" id="evArea" runat="server">
                                        
                            <div class="TableCellContainerContent" id="ElectricVehicleContainer" style="display: block;">
                                <div class="VehicalImage">
                                    <asp:Image ID="imgCar" runat="server" AlternateText="Electric Vehicle" ClientIDMode="Static" />
                                    <asp:DropDownList globalize="ML_DASHBOARD_DDL_ElecVehicle" runat="server" ID="ddlElecVehicle" ClientIDMode="Static" CssClass="select">
                                    </asp:DropDownList>
                                </div>
                                <div class="VehicalStatus">
                                    <div class="GridTableLabel OddColor" >
                                        <%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DailyChargeTime") %>
                                    </div>
                                    <div class="GridTableData OddColor">
                                        <span id="lblChrRem"></span>&nbsp;<span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DailyChargeHours") %></span>
                                    </div>
                                    <div class="GridTableLabel EvenColor" >
                                        <%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DailyUsage") %>
                                    </div>
                                    <div class="GridTableData EvenColor"><span id="lblUsage"></span></div>
                                    <div class="GridTableLabel OddColor" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_CurrentPlan") %></div>
                                    <div class="GridTableData OddColor">
                                        <asp:Label ID="lblCurrentPlan" runat="server" ClientIDMode="static"></asp:Label>
                                    </div>
                                </div>
                            </div>
                        </div>   </div> 
                            </div>
                      
                     <div id="ModuleCStation" runat="server" >
                         <div>  <h3>
                             <a href="charging-stations.aspx"><img src="images/icon_dashboard_heading/icon_electric_vehicle_heading.svg" />
                             <span class="head_icon_flat icon_ev"></span>
                                 <span><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Anchor_ChargingStations") %></span></a> 
                            </h3>

                         </div>
                        <uc1:ChargingStationUserControl runat="server" id="ChargingStationUserControl" />
                    </div>
                     </div>
                 </div>
                                    
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module1"  style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccount) %>">
                    <div class="tablet-view">
                        <h3><a href="<%=string.Format("{0}/account.aspx",CustomerPortal.SessionAccessor.BaseCustomUrl)%>"><img src="images/icon_dashboard_heading/icon_my_account_heading.svg" /> <span class="icon icon-icon-myaccount-sidebar"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_MyAccount") %></span></a></h3>
                  <div id="myAccountLoader"  style="display:none">
                                 <uc1:MyAccountUserControl runat="server" id="MyAccountUserControl" />
                </div>
                    </div>
                </div>
                                    
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module9" runat="server" visible="false" clientidmode="Static">
                    <div class="tablet-view">
                       <h3>
                          

                            <% if (string.Equals(CustomerPortal.SessionAccessor.ThermoStateVersion, "ladwp"))
                               { %>
             <a id="smartlink"  href="<%=string.Format("{0}/Central_air_system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                           <img src="images/icon_dashboard_heading/icon_smart_home_heading.svg" class="smart_icons_dash" /> 
                           <span class="icon icon-icon-smart-home-sidebar"></span> 
                           <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_SmartHome") %></span></a>
                              <% }
                               else
                               { %>
                 <a href="<%=string.Format("{0}/Central-air-system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                           <img src="images/icon_dashboard_heading/icon_smart_home_heading.svg" class="smart_icons_dash" /> 
                           <span class="icon icon-icon-smart-home-sidebar"></span> 
                           <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_SmartHome") %></span></a>

              <% } %>  

                       </h3>
                       <div id="smartHomeLoader"  style="display:none">         <div class="smarthome-area">
                                                           
                                <div class="image-listing">   
                                    <div id="divthermostat" runat="server"></div>     
                                </div>
                            </div> </div> 
                    </div>
                </div>

                <%--Smart Building--%>
               
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  runat="server" visible="false" id="Module9_1"  clientidmode="Static">
                    <div class="tablet-view">                          
                        <h3><a id="smartbuildinglink" href="SmartBuilding.aspx" runat="server"><img src="images/icon_dashboard_heading/icon_smart_building_heading.svg" class="smart_icons_dash" />
                            <span globalize="ML_SmartBuildng_div_SB"></span>
                            </a></h3>
                        <div class="smarthome-area"></div>
                    </div>
                </div>

                <%-- Energy Efficiency--%>
                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="EnergyEfficiencyModule" style="display:<%=SessionAccessor.IsModuleEnabled(Features.Efficiency) %>" >
                    <div class="tablet-view">                       
                         <h3><a id="IDEff" href="rebates.aspx"><img src="images/icon_dashboard_heading/icon_efficiency_sidebar_dashboard.svg" />
                              <span class="icon icon-icon-efficiency-sidebar"></span> <%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Efficiency") %></a></h3>
                        <div id="efficiencyLoader"  style="display:none"><div class="right-dolar-top-area"></div>

                        <div class="solargeneration-area" style="text-align: center;"><a id="IDEfficiency" href="#">
                            <img id="imgEfficiency"  src="" style="max-width:100%;" onerror="imgErrorBanner(this);"  alt=""/></a><%--images/banner_ads/energy_banner_dashboard.png--%>
                        </div> </div>
                    </div>
                </div>

                <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module12" runat="server" style="display:none;" clientidmode="Static">
                    <div class="tablet-view">
                        <h3><a href="GISGreenFootprint.aspx"><img src="images/icon_dashboard_heading/icon_green_footprint_heading.svg" style="margin-top: -4px;" /> <span class="icon icon-icon-footprint-sidebar"></span> <span globalize="ML_DASHBOARD_Lbl_GreenFootprint" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_GreenFootprint") %></span></a>  <select id="selFootPrint" style="width:40%;" globalize="ML_DASHWIDGET_FOOTPRINTYPE" onchange="fpdropdownchange(this)" >
                            <option value="0" globalize="ML_Notification_Services_All"></option> </select></h3>
                        <div class="notification-area">
                            <div id="footprint_map_canvas" style="width:100%; margin-left: 1%; float: left; text-align: left;"> </div>
                            </div>
                        </div>
                </div>
                              
              
                
                
                 <div class="col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" style="display:none" >
                        <img id="DukeBanner" clientidmode="Static" src="Attachments/8_20160824114808.png" style=" width: 100%;margin-top: 16%;"  alt="" onerror="imgErrorBanner1(this);"/>
                </div>
                
                  </div>
        </div>    
    </section>
    <asp:HiddenField ID="hdnselectedindex" runat="server" Value="0"
        ClientIDMode="Static" />
    <asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnType" runat="server" ClientIDMode="Static" />
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
    <asp:HiddenField ID="hdnGUKWH" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGUDollar" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGUMonthly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGUHourly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGUDaily" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUKWH" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUGallon" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUDollar" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUMonthly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUHourly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUBIMonthly" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPUSeasonal" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGUSeasonal" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUSeasonal" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWUDaily" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMeterTypePower" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMeterTypeWater" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMeterTypeGas" runat="server" ClientIDMode="Static" />
    <span id="titletext" style="display: none" globalize="ML_Title_Dashboard">
        <%= CustomerPortal.Translator.T("ML_Title_Dashboard") %></span>
    <span id="CompNeighbourhood" style="display: none" globalize="ML_Dashboard_Msg_CompNeighbour">
        <%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompNeighbour") %></span>
    <span id="CheckPrevMnth" style="display: none" globalize="ML_Dashboard_Msg_CompPrevMnth">
        <%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompPrevMnth") %></span>
    <span id="CompZip" style="display: none" globalize="ML_Dashboard_Msg_CompZip">
        <%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompZip") %></span>
    <span id="NoEVSelected_NoEvConfig" style="display: none;
        font-size: 18px" globalize="ML_EV_NoEVConfigured"><%= CustomerPortal.Translator.T("ML_EV_NoEVConfigured") %></span>
    <span id="NoEVSelected" style="display: none; font-size: 14px"
        globalize="ML_Msg_EV_ClickToAdd"><%= CustomerPortal.Translator.T("ML_Msg_EV_ClickToAdd") %></span>
    <span id="ErrMsgNoRoute" style="display: none" globalize="ML_Footprint_ErrMsg_NoRoute">
        <%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoRoute") %></span>
    <span id="lblName" style="display: none;" globalize="ML_MYACCOUNT_Lbl_Name">
        <%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></span>
    <span id="lblAddress" style="display: none;" globalize="ML_Default_Lbl_Address">
        <%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
    <span id="lblDistance" style="display: none;" globalize="ML_Footprint_Distance">
        <%= CustomerPortal.Translator.T("ML_Footprint_Distance") %></span>
    <span id="lblLatitude" style="display: none;" globalize="ML_Footprint_Latitude">
        <%= CustomerPortal.Translator.T("ML_Footprint_Latitude") %></span>
    <span id="lblLongitude" style="display: none;" globalize="ML_Footprint_Longitude">
        <%= CustomerPortal.Translator.T("ML_Footprint_Longitude") %></span>
    <span id="lblLocationName" style="display: none;" globalize="ML_Footprint_LocationName">
        <%= CustomerPortal.Translator.T("ML_Footprint_LocationName") %></span>
    <span id="lblMyLocation" style="display: none;" globalize="ML_Footprint_MyLocation">
        <%= CustomerPortal.Translator.T("ML_Footprint_MyLocation") %></span>
    <span id="ddlGreenFoot" style="display: none" globalize="ML_Notification_Services_All">
        <%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>
    <span id="ddlComparePower" style="display: none" globalize="ML_Compare_Spending_Seg_Title_Power">
        <%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Power") %></span>
    <span id="ddlCompareWater" style="display: none" globalize="ML_Compare_Spending_Seg_Title_Water">
        <%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Water") %></span>
    <span id="ddlCompareGas" style="display: none" globalize="ML_Compare_Spending_Seg_Title_Gas">
        <%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Gas") %></span>
    <span id="lblusageequalto" style="display: none" globalize="ML_Msg_UsageEqualTo">
        <%= CustomerPortal.Translator.T("ML_Msg_UsageEqualTo") %></span>
    <span id="lblEfficiency" style="display: none" globalize="ML_DASHBOARD_Anchor_Efficiency">
        <%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Efficiency") %></span>
    <span id="NoBillingAmountTxt" globalize="ML_ACCOUNT_Lbl_NoBillingText"
        style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_NoBillingText") %></span>
    <span id="ML_Dashboard_Lbl_NoUsageData" globalize="ML_Dashboard_Lbl_NoUsageData"
        style="display: none"><%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %></span>
<span id="ML_Msg_CardDtls_NoDeflt" globalize="ML_Msg_CardDtls_NoDeflt" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_CardDtls_NoDeflt") %></span>
    <span id="alltxt" style="display:none"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnShowCurrentMode" runat="server"
        ClientIDMode="Static" />
    <asp:HiddenField ID="hdOutageModuleEnabled" runat="server"
        ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPinImageC" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPinImageP" runat="server" ClientIDMode="Static" />
    <uc1:OutageKeys runat="server" ID="OutageKeys" />
    <asp:HiddenField ID="hdnMapIcon" runat="server" ClientIDMode="Static" />
    <uc1:GreenFootPrintKeys runat="server" ID="GreenFootPrintKeys" />
</asp:Content>
