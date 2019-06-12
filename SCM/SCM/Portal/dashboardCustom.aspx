<%@ Page Title="Dashboard" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="dashboardCustom.aspx.cs" Inherits="CustomerPortal.DashboardLarge" EnableEventValidation="false" %>

<%@ Import Namespace="CustomerPortal" %>
<%@ Register Src="~/UserControls/Dashboard/BillingUserControl.ascx" TagPrefix="uc1" TagName="BillingUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/MyAccountUserControl.ascx" TagPrefix="uc1" TagName="MyAccountUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/NotificationUserControl.ascx" TagPrefix="uc1" TagName="NotificationUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/OutageUserControl.ascx" TagPrefix="uc1" TagName="OutageUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/CompareSpendingUserControl.ascx" TagPrefix="uc1" TagName="CompareSpendingUserControl" %>
<%@ Register Src="~/UserControls/Dashboard/ChargingStationUserControl.ascx" TagPrefix="uc1" TagName="ChargingStationUserControl" %>
<%@ Register Src="~/UserControls/OutageKeys.ascx" TagPrefix="uc1" TagName="OutageKeys" %>
<%--End --%>



<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://js.arcgis.com/3.14/dijit/themes/nihilo/nihilo.css" />
    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
    <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css" />
    <script src="//js.arcgis.com/3.14/" type="text/javascript"></script>
    <% }
      else
      {%>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <% }%>
    <%if (SessionAccessor.IsModuleEnabled(Features.FootPrint, false) == true)
      {  %>
    <script src="js/footprint.js" type="text/javascript"></script>
    <% }%>
    <%if (SessionAccessor.IsModuleEnabled(Features.Outages, false) == true)
      {  %>
    <script src="js/GISoutages.js" type="text/javascript"></script>
    <% }%>
    <script src="js/highchart_js/gauge.js" type="text/javascript"></script>
    <script src="js/highchart_js/highcharts.js" type="text/javascript"></script>
    <script src="js/highchart_js/common-chart.js" type="text/javascript"></script>
    <script src="js/dashboardcustom.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="js/jquery-ui.js"></script>

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
        var noofdays = 30;
        var duration = 'D';
        var TO_FIX = 2;
        var OF_FIX = 2;
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
            }
            else if (arr[arr.length - 1] == "Zip") {
                $('#imgCompareSpendingZip').addClass('active_links');
                $('#imgCompareSpendingZip').attr('src', 'images/zip-icon.svg');
                $(".divCompareSpendingZip").show();
            }
            else {
                $('#imgCompareSpendingPrev').addClass('active_links');
                $('#imgCompareSpendingPrev').attr('src', 'images/utility-icon_hover.svg');
                $(".divCompareSpendingPrev").show();
            }
            if (arr.length == 0) {
                $('.compare-area').hide();
                $('#drpCompare').hide();
            }
        }
        $(document).ready(function () {


            var url = getBillingModuleURL();
            $($('#Module2 a')[0]).prop('href', url);

            try {
                //Dashboard 6.5 changes merged for dropdown hide when only one metertype is available.
                $("#usagetype").change(function () {
                    var usagetyp = $(this).val();
                    switch (usagetyp) {
                        case 'W':
                            {
                           //     $('#duarationmode').css("display", "<%=master_master.WaterModeHideShow()%>");
                            }
                            break;
                        case 'E':
                            {
                            //    $('#duarationmode').css("display", "<%=master_master.PowerModeHideShow()%>");
                            }
                            break;
                        case 'G':
                            {
                        //        $('#duarationmode').css("display", "<%=master_master.GasModeHideShow()%>");
                            }
                            break;
                    }
                });



                var preview = '<%=HttpContext.Current.Request.QueryString["value"]%>';
                var v = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Usage) %>'
                $('#moduleUsages').attr('style', 'display:' + v);
                if (preview == 'preview') {
                    $(a).each(function (obj, i) {
                        $(obj).attr('href') = '#';


                    });
                }
                var arraydiv = new Array();
                var IDVAL = new Array();
                $(".ui-sortable>div").each(function (index, element) {
                    IDVAL.push($(element).attr("id"));
                });
                var sortorder = Dashboard.getCustomerDashBoardorderDetail("2", IDVAL.join(',')).value.split(',');
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
                        console.log('unable to append element in ul:' + e.message);
                    }

                });
            }
            catch (e) {
                console.log(e.message);
            }
            $(".ui-sortable").sortable({
                containment: "parent",
                cancel: "#outage_map_canvas,#footprint_map_canvas,#selFootPrint,#ddlElecVehicle,#drpCompare,#ddlThermostat,#usagetype, #imgOutagesText",
                update: function (event, ui) {
                    var IDVAL = new Array();
                    $(".ui-sortable>div").each(function (index, element) {
                        IDVAL.push($(element).attr("id"));
                    });

                    console.log(IDVAL.join(','))


                    $.ajax({
                        type: "POST",
                        url: "Dashboard.aspx/CustomerDashBoardorderDetail",
                        data: JSON.stringify({ modulecode: IDVAL.join(','), dasboardoption: '2' }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                        },
                        failure: function (response) {
                        }
                    });
                },
                start: function (event, ui) {
                    if (ui.item[0].className.indexOf("welcome-box") >= 0)
                        return false;
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
                    $('a').removeAttr("href");
                    $('a').removeAttr("onClick");
                    $('#aWaterUsageHCF').click(function e() {
                        return false;
                    });
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
                    $('#usagetype').attr("disabled", true);
                }
            }

            setDefaultSelected();
        });

        $(window).load(function () {
            try {
                if ("<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power)%>" == "none") {
                    $('#<%=hdnPinImageC.ClientID %>').val("images/outages/water_icon_red.png");
                    $('#<%=hdnPinImageP.ClientID %>').val("images/outages/water_icon_blue.png");
                }
                else {
                    $('#<%=hdnPinImageC.ClientID %>').val("images/outages/energy_icon_red.png");
                    $('#<%=hdnPinImageP.ClientID %>').val("images/outages/energy_icon_blue.png");
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
            }
            catch (e) { }
        });



        function getuntitype() {
            var unit = $("#unitmode li a:visible.active").attr("mode");
            yaxis = $("#unitmode li a:visible.active").text();
            switch ($("#usagetype").val()) {
                case 'W':
                    {
                        if (unit == 'D')
                            unit = 'D';
                        else if (unit == 'G') {
                            unit = 'G';
                        }
                        else {
                            unit = 'W'
                        }
                    }
                    break;
                case 'E': {
                    if (unit == 'U') {
                        unit = 'K';
                    }
                }
                    break;
                case 'G': {
                    if (unit == 'U') {
                        unit = 'C';
                    }
                    else {
                        unit = 'D';
                    }
                }
                    break;
            }
            return unit;
        }
        function getduration(usagetyp) {
            switch (usagetyp) {
                case 'W':
                    {
                        duration = $('#duarationmode li a.active').attr('mode');
                    }
                    break;
                default: duration = $('#duarationmode li a.active').attr('mode');
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

                //initDonut
                demoGauge = new Donut(document.getElementById(canvasName)).setOptions(opts);
                //demoGauge.setTextField(document.getElementById("divGasUsagetest"));
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
                document.getElementById("selFootPrint")[0].textContent = $('#ddlGreenFoot').text();
            }
            catch (e) {
                console.log(e.message);
            }
        });
        $(function () {
            $('select').bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function (event) {
                event.stopImmediatePropagation();
            });
        });
    </script>

    <style type="text/css">
        /*//added by lalit yadav 12 oc 2015*/
        .preLoader {
            background-image: url('images/loader.gif');
            background-attachment: inherit;
            background-position: center;
            top: 0px;
            background-repeat: no-repeat;
            color: white;
            opacity: 0.7;
            z-index: 99999999;
            /*url('http://jimpunk.net/Loading/wp-content/uploads/loading4.gif'); background-color: #198C19  ;  background-position: center;*/
        }

        #lblDueDate {
            display: inline;
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            /* Safari only override */
            ::i-block-chrome, .dashboard_new .mid-container {
                padding-bottom: 50px;
            }
        }

        .notification-area {
            height: 162px;
        }

        .compare_select_1 {
            float: right;
            position: absolute;
            right: 0px;
            top: 41px;
            width: 24%;
            padding-top:0px;
            z-index: 999;
            height: 18px;
            font-size: 11px;
        }

        .smart_icons_dash {
            display: inline-block;
            float: none;
            margin: -5px 0 0px !important;
            padding-right: 8px;
            width: 43px;
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
        }

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
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="hdnCompareUtility" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCompareMe" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCompareZip" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="dashboard_home" />
    <asp:HiddenField ID="hdOutageModuleEnabled" runat="server" ClientIDMode="Static" />
    <section class="mid-section dashboard_new">
    <div class="container mid-container">
    <div class="row ui-sortable">
        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" style="display:<%=SessionAccessor.IsModuleEnabled(Features.Billing) %>" id="Module2" clientidmode="Static">
            <div class="tablet-view">
                <h3><a href="BillDashboard.aspx"><img src="images/icon_dashboard_heading/icon_billing_heading.svg" /> <span class="icon icon-billing-noti"></span> <span globalize="ML_DASHBOARD_Lbl_Billing"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Billing") %></span></a></h3>
                <div id="billingLoader" style="display:none">
                    <uc1:BillingUserControl runat="server" id="BillingUserControl" />
                </div>
            </div>
        </div>

        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module5" runat="server" visible="false" clientidmode="Static">
            <div class="tablet-view">
                <h3><a href="outages.aspx">
                    <img src="images/icon_dashboard_heading/icon_outages_heading.svg" /> <span class="icon icon-outage-noti"></span>  <span globalize="ML_DASHBOARD_Anchor_Outages"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Outages") %></span></a>
                </h3>
                <uc1:OutageUserControl runat="server" id="OutageUserControl" />
                </div>
        </div>

        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module6" runat="server"  visible="false" clientidmode="Static">
            <div class="tablet-view">
                <h3><a href="Notification-Inbox.aspx"><img src="images/icon_dashboard_heading/icon_notifications_heading.svg" />  <span class="icon icon-icon-notif-sidebar"></span>  <span globalize="ML_DASHBOARD_Lbl_Notifications"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Notifications") %></span></a></h3>
                <div id="notificationLoader" style="display:none">
                    <uc1:NotificationUserControl runat="server" id="NotificationUserControl" />
                </div>
            </div>
        </div>
       
        <uc1:CompareSpendingUserControl runat="server" id="CompareSpendingUserControl" />
         
        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module12" runat="server" visible="false" clientidmode="Static" >
            <div class="tablet-view">
                <h3><a href="GISGreenFootprint.aspx"><img src="images/icon_dashboard_heading/icon_green_footprint_heading.svg" /> <span class="icon icon-icon-footprint-sidebar"></span>
                    <span globalize="ML_DASHBOARD_Lbl_GreenFootprint"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_GreenFootprint") %></span></a> 
                     <select id="selFootPrint" globalize="ML_DASHWIDGET_FOOTPRINTYPE" style="width:40%;" >
                        <option value="0" globalize="ML_Notification_Services_All"></option>
                     </select></h3>
                <div class="notification-area">
                    <div id="footprint_map_canvas" style="width:100%; margin-left: 1%; float: left; text-align: left;"> </div>
                </div>
            </div>
        </div>

        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="Module9" runat="server" visible="false" clientidmode="Static">
            <div class="tablet-view">
                <%-- Ref Bug ID: 6139 --%>
                <h3><img src="images/icon_dashboard_heading/icon_smart_home_heading.svg" class="smart_icons_dash" />
                    <span class="icon icon-icon-smart-home-sidebar"></span>

                

                     <% if (string.Equals(CustomerPortal.SessionAccessor.ThermoStateVersion, "ladwp"))
                        { %>
             <a id="smartlink"  href="<%=string.Format("{0}/Central_air_system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                        <%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_SmartHome") %>
                              <% }
                        else
                        { %>
                 <a href="<%=string.Format("{0}/Central-air-system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                          <%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_SmartHome") %>

              <% } %>  
                     </a>
                </h3>
                <div id="smartHomeLoader" style="display:none">        
                    <div class="smarthome-area">
                        <div class="image-listing">
                            <div id="divthermostat" runat="server"></div>     
                        </div>
                     </div>  
                </div>
            </div>
        </div>
                                  
        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module9_1" runat="server" visible="false" clientidmode="Static">
                <div class="tablet-view">
                <h3><a id="smartbuildinglink" href="SmartBuilding.aspx" runat="server"><img src="images/icon_dashboard_heading/icon_smart_building_heading.png" class="smart_icons_dash" /><span globalize="ML_SmartBuildng_div_SB"><%= CustomerPortal.Translator.T("ML_SmartBuildng_div_SB") %></span></a></h3>
                <div class="smarthome-area">
                                        	
            </div> </div>
            </div> 
                                    
        <div class="preLoader col-xs-12 col-sm-6 col-md-6 padding_L inner-dashboard-area-usage connectedSortable ui-widget-content" id="moduleUsages">
            <div class="tablet-view">
                 <div id="usageLoader"  style="display:none">   
                <h3><img src="images/icon_dashboard_heading/icon-usage.svg" style="padding-right:5px;"><a href="Usages.aspx">   <span class="icon icon-icon-usage-sidebar"></span>  <span globalize="ML_DASHBOARD_Lbl_Usage"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Usage") %></span></a>
                           
                        <div style="float: right;padding: 3px;margin-top:-6px;">
                            <select id="usagetype" globalize="ML_COMPARE_SERVICETYPE_DASHWIDGET" style="height: 21px;margin: 1px 7px 0 0;font-size: 9px;padding: 0;">
                                <option value="E" = "ML_Compare_Spending_Seg_Title_Power"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Power") %> </option>
                                <option value="W" ="ML_Compare_Spending_Seg_Title_Water"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Water") %> </option>
                                <option value="G" ="ML_Compare_Spending_Seg_Title_Gas"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Gas") %> </option>
                            
                                </select>
                        </div></h3>&nbsp;
                </div>
                <div>
                    <asp:DropDownList ID="ddlMultiMeter" CssClass="ddmultimeter_select" runat="server" Style="padding-right: 7px; float: right; width: 150px; margin-right: 10px;" ClientIDMode="Static"></asp:DropDownList>
                </div>
                <div>
                    <div style="float:left; width:70%; padding:18px 35px;"></div>
                    <div style="width:97%; clear:both;">
                        <div id="divElectricityUsage" style="height:250px" class="usageconsumption">  
                        </div>
                        <div id="divNoDataUsage" style="height:250px;top:0px; text-align:center; display:none"  globalize="ML_Dashboard_Lbl_NoUsageData"> <%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %>
                        </div>
                     </div>

                    <br />
                    <div style="width:63%; float:left; margin-left:1%;">
                        <div class="usage_listing" >
                            <ul id="duarationmode">
                                <li><a href="#" mode="H" globalize="<%=CustomerPortal.SessionAccessor.CustomerType=="Commercial"?"ML_WU_Navigation_HourlyCommercial":"ML_WU_a_Hourly"%>" onclick="return false"><%= CustomerPortal.Translator.T("ML_WU_a_Hourly") %></a></li>
                                <li><a href="#" mode="D" globalize="ML_WU_a_Daily" style="display:none" class="active" onclick="return false"><%= CustomerPortal.Translator.T("ML_WU_a_Daily") %></a></li>
                                <li><a href="#" mode="M" globalize="ML_WU_a_Monthly" style="display:none" onclick="return false"><%= CustomerPortal.Translator.T("ML_WU_a_Monthly") %> </a></li>
                                <li><a href="#" mode="S" globalize="ML_ErrMsg_Seasonal" style="display:none" onclick="return false" ><%= CustomerPortal.Translator.T("ML_ErrMsg_Seasonal") %> </a></li>
                                <li><a href="#" mode="B" globalize="ML_Usage_Btn_BiMonthly" style="display:none" onclick="return false" ><%= CustomerPortal.Translator.T("ML_Usage_Btn_BiMonthly") %>  </a></li>
                           </ul>
                      </div>
                  </div>
                                            
                                            <div style="width:35%; float:right; margin-left:1%;">
                                            	<div class="usage_listing" style="float:right;">
                                                	<ul id="unitmode">
                                                    	<li><a href="#" class="active" globalize="ML_DASHBOARD_Anchor_Dol" mode="D" id="aUsageElectricD" onclick="return false"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Dol") %>  </a></li>
                                                        <li><a href="#" mode="U" globalize="ML_USAGEPOWERWIDGET_KWH" id="aUsageElectrickWh" onclick="return false"><%= CustomerPortal.Translator.T("ML_USAGEPOWERWIDGET_KWH") %>  </a></li>
                                                        <li><a href="#" mode="G"  globalize="ML_DASHBOARD_Anchor_Gallon" id="aUsageWaterGl" style="display:none" onclick="return false"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Gallon") %>  </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                        </div> 

            </div>

        </div>

         <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module10" runat="server"  visible="false" clientidmode="Static">
                    <div class="tablet-view">
                        <div id="ModuleEV" runat="server">
                          <h3>                              
                              <a href="<%=common.GetEVLink%>"><img src="images/icon_dashboard_heading/icon_electric_vehicle_heading.svg" />  <span class="icon icon-icon-ev-sidebar"></span> <span ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_ElectricVehicle") %></span></a></h3>
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
                      
                     <div id="ModuleCStation" runat="server">
                         <div>  <h3>
                             <a href="charging-stations.aspx"><img src="images/icon-charging-stn.svg.svg" style="margin-top: -4px;" />
                                 <span class="head_icon_flat icon_ev"></span>
                             <span><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Anchor_ChargingStations") %></span></a> 
                            </h3>

                         </div>
                        <uc1:ChargingStationUserControl runat="server" id="ChargingStationUserControl" />
                    </div>
                     </div>
                 </div>       
                                   
        <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content"  id="Module1" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccount) %>"  runat="server" clientidmode="Static">
                 	<div class="tablet-view">
                       <h3><a href="account.aspx"><img src="images/icon_dashboard_heading/icon_my_account_heading.svg" /> <span class="icon icon-icon-myaccount-sidebar"></span> <span globalize="ML_DASHBOARD_Lbl_MyAccount"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_MyAccount") %></span></a></h3>
                       <div id="myAccountLoader"  style="display:none">          <uc1:MyAccountUserControl runat="server" id="MyAccountUserControl" />
                    </div>  </div>
               </div>
                  <%--BANNER--%>
         <div class="col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="PaperlessBillingBanner" globalize="ML_DASHBOARD_PAPERLESSBILLADD">
                    <div class="tablet-view">
                     <a id="IDBannerHref" href="#"><img id="BannerDashboard" clientidmode="Static" src="images/no_img.png" style="height: 204px; width: 100%;" onclick="BannerClick(this.id);" alt="" onerror="imgErrorBanner1(this);"/></a>
                   </div>
                    </div>                   
                        
                <%-- Energy Efficiency--%>
         <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content" id="EnergyEfficiencyModule" style="display:<%=SessionAccessor.IsModuleEnabled(Features.Efficiency) %>" >
                    <div class="tablet-view">                       
                         <h3><a href="rebates.aspx" id="IDEffDash"><img src="images/icon_dashboard_heading/icon_efficiency_sidebar_dashboard.svg" />
                             <span class="icon icon-icon-efficiency-sidebar"></span> <%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Efficiency") %></a></h3>
                        <div id="efficiencyLoader"  style="display:none"><div class="right-dolar-top-area"></div>

                        <div class="solargeneration-area" style="text-align: center;"><a id="IDEfficiency" href="#">
                            <img id="imgEfficiency"  src="" style="max-width:100%;" onerror="imgErrorBanner(this);"  alt=""/></a>
                        </div> </div>
                    </div>
                </div>  

    </div>        
    </div>                  
                              
       
            
         </section>
    <asp:HiddenField ID="hdnselectedindex" runat="server" Value="0" ClientIDMode="Static" />
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
    <span globalize="ML_Title_Dashboard" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Dashboard") %></span>
    <span id="NoEVSelected_NoEvConfig" style="display: none" globalize="ML_EV_NoEVConfigured"><%= CustomerPortal.Translator.T("ML_EV_NoEVConfigured") %></span>
    <span id="NoEVSelected" style="display: none" globalize="ML_Msg_EV_ClickToAdd"><%= CustomerPortal.Translator.T("ML_Msg_EV_ClickToAdd") %></span>
    <span globalize="ML_Footprint_ErrMsg_NoRoute" id="ErrMsgNoRoute" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoRoute") %></span>
    <span id="CompNeighbourhood" style="display: none" globalize="ML_Dashboard_Msg_CompNeighbour"><%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompNeighbour") %></span>
    <span id="CheckPrevMnth" style="display: none" globalize="ML_Dashboard_Msg_CompPrevMnth"><%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompPrevMnth") %></span>
    <span id="CompZip" style="display: none" globalize="ML_Dashboard_Msg_CompZip"><%= CustomerPortal.Translator.T("ML_Dashboard_Msg_CompZip") %></span>
    <span id="lblName" style="display: none;" globalize="ML_MYACCOUNT_Lbl_Name"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></span>
    <span id="lblAddress" style="display: none;" globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
    <span id="lblDistance" style="display: none;" globalize="ML_Footprint_Distance"><%= CustomerPortal.Translator.T("ML_Footprint_Distance") %></span>
    <span globalize="ML_Notification_Services_All" id="ddlGreenFoot" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>
    <span id="NoBillingAmountTxt" globalize="ML_ACCOUNT_Lbl_NoBillingText" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_NoBillingText") %></span>
    <span id="ML_Dashboard_Lbl_NoUsageData" globalize="ML_Dashboard_Lbl_NoUsageData" style="display: none"><%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %></span>
    <span id="alltxt" style="display:none"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>
    <span id="ML_Msg_CardDtls_NoDeflt" globalize="ML_Msg_CardDtls_NoDeflt" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_CardDtls_NoDeflt") %></span>
    <asp:HiddenField ID="hdnPaymentMode" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPinImageC" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPinImageP" runat="server" ClientIDMode="Static" />
    <uc1:OutageKeys runat="server" ID="OutageKeys" />
</asp:Content>
