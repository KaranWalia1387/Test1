<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OuterOutage.aspx.cs" Inherits="CustomerPortal.OuterOutage" %>

<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/UserControls/OutageKeys.ascx" TagPrefix="uc1" TagName="OutageKeys" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%--<title>Outages</title>--%>
    <title globalize="ML_OUTAGE_Navigation_Outage"><%= CustomerPortal.Translator.T("ML_OUTAGE_Navigation_Outage") %> </title>

    <link href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />

    <%--  --%>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

    <!-- Message for disable javascript in Browser -->
    <noscript>
        For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
    </noscript>
    <script type="text/javascript" src="js/detect-zoom.js"></script>
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <%if (CustomerPortal.SessionAccessor.MapId == "0" || CustomerPortal.SessionAccessor.MapId == "")
      { %>
    <link rel="stylesheet" type="text/css" href="//serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/css/esri.css" />
    <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.5compact" type="text/javascript"></script>
    <%}

      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <%}%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssOuterOutage") %>
    <%: System.Web.Optimization.Scripts.Render("~/bundles/jsOuterOutage")%>

    <script src="js/bootstrap.min.js"></script>

    <script>var dojoConfig = { parseOnLoad: true };</script>

    <script type="text/javascript">
        dojo.require("dijit.layout.BorderContainer");
        dojo.require("dijit.layout.ContentPane");
        dojo.require("esri.map");
        dojo.require("esri.layers.KMLLayer");

        dojo.require("esri.dijit.Popup");
        function refresh() {
            var device = $('#devices');
            if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
                $("#devices").addClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
                $("#devices").addClass('inner_uni2');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
                $("#devices").addClass('inner_uni3');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
                $("#devices").addClass('inner_uni4');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
            }
            else {
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }

        }
        $(document).ready(function () {

            refresh();
            $(window).on('resize', refresh);
        });
    </script>
    <style type="text/css">
        .energy_mid_box .right_content_box_outage {
       height: 95.2%;
 }
        .energy_mid_box {
            padding-bottom: 22px;
        }

        footer {
            z-index: 9999999999;
        }

        #outage_map_canvas_root 
        {
         height:485px !important}

    </style>
</head>
<body>
    <form id="form1" runat="server">
        <uc1:OutageKeys runat="server" ID="OutageKeys2" />
        <!-- header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- header ends-->

        <section class="inner_mid_section" id="devices">

            <div class="container inner-mid-container">
                <div class="energy_mid_box without_sidebar" style="overflow: hidden;">
                    <input type="hidden" name="ctl00$ctl00$ContentPlaceHolder1$hdnFlag" id="hdnFlag" value="load">

                    <input type="hidden" name="ctl00$ctl00$ContentPlaceHolder1$hdnDR" id="hdnDR" value="0">
                    <div class="cover_top_area">
                        <h1>
                            <img src="images/icon_outages_sidebar.svg" style="padding-right: 5px; margin-top: -3px; float: left;">
                            <span class="head_icon_flat icon_notif-outage"></span>
                            <span globalize="ML_OUTAGE_Navigation_Outage"><%= CustomerPortal.Translator.T("ML_OUTAGE_Navigation_Outage") %></span>
                        </h1>

                        <div class="cover_right_top_area">

                            <input type="hidden" class="activeli_list" value="outages">
                            <div class="gis-footprint-area" style="float: right; margin-right: 5px;">

                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesReportOutages) %>">
                                        <a href="contact-us-connect-me.aspx?pid=o" title="Report Outage">
                                            <img src="images/icon-outage-red.png" style="float: left; margin-top: 4px;">
                                            <span style="display: inline-block; margin: 6px 0px 0px 8px;" globalize="ML_Outage_span_Report_Outage"><%= CustomerPortal.Translator.T("ML_Outage_span_Report_Outage") %></span>
                                        </a>

                                    </li>
                                    <li>
                                        <img id="imgCurrent" class="GIScurrentlocation curren_flat_icon_hide" alt="Current Location" title="Current Location" src="Images/Footprint/out_location_icon.svg"
                                            globalize="ML_OuterOutage_img_Current" style="cursor: pointer; height: 23px; margin-top: 4px; vertical-align: top; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrentLocation) %>" />



                                        <span id="imgCurrent" class="GIScurrentlocation head_icon_flat icon_notif-sent" runat="server" imageurl="Images/Footprint/out_location_icon.svg" clientidmode="Static"
                                            style="cursor: pointer; height: 23px; margin-top: 1px; vertical-align: top; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrentLocation) %>" globalize="ML_Outage_span_Current_Location" alt="Current Location" title="Current Location" /></span>

                                    </li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesRefresh)%>">
                                        <input class="btnRefresh" type="image" id="btnRefresh" alt="Refresh" title="Refresh" globalize="ML_OuterOutage_img_Refresh" src="images/RefreshBtn.svg" style="margin-top: 1px; height: 25px; outline: none;" />
                                        <span style="cursor: pointer" id="btnRefresh" class="foot_print head_icon_flat icon_refreshbtn" globalize="ML_OuterOutage_img_Refresh"></span>
                                    </li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesSearch) %>">

                                        <div class="search-area">
                                            <input id="GIStxtGoogleSearch" type="text" maxlength="35"  onkeydown="if(event.keyCode == 13) return false;" globalize="ML_Outage_span_GIStxtGoogleSearch" />
                                        </div>
                                        <div class="search-icon-area" title="Click to search" globalize="ML_OuterOutage_lbl_Search">
                                            <a href="#" id="GISsearchGoogleMap">
                                                <span class="SearchIcon" globalize="ML_Outage_span_Searchicon">&nbsp;</span></a>
                                        </div>

                                    </li>
                                </ul>

                            </div>
                        </div>


                    </div>

                    <div class="right_content_box_outage">

                        <div class="left_charging_map" style="width: 78%;">
                            <div id="outage_map_canvas" class="radius map_canvas" style="height: 100% !important;">
                            </div>
                        </div>

                        <div class="right_charging_map" style="width: 22%; overflow: hidden;">
                            <div class="distance_area distance_area_font" style="text-align: center; background: #f4f4f4;">
                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrent) %>"><a href="#" id="crent" key="C" class="active" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrent) %>">
                                        <img src="images/icon-current.png" style="padding-top: 5px; padding-bottom: 5px;" />
                                        <span class="head_icon_flat icon_current"></span>
                                        <br />
                                        <span globalize="ML_Outage_span_Current"><%= CustomerPortal.Translator.T("ML_Outage_span_Current") %></span></a></li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesPlaned) %>"><a href="#" id="plnd" key="P" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesPlaned) %>">
                                        <img src="images/icon-planned.png" style="padding-top: 5px; padding-bottom: 5px;" />
                                        <span class="head_icon_flat icon_planned-outage"></span>
                                        <br />
                                        <span globalize="ML_Outage_span_Planned"><%= CustomerPortal.Translator.T("ML_Outage_span_Planned") %></span></a></li>
                                </ul>
                            </div>
                            <div class="map_address_area" style="height: 85%; overflow: auto;">
                                <div id="LeftPanel" class="LeftPanel" style="overflow: auto;"></div>
                            </div>
                        </div>

                        <uc1:OutageKeys runat="server" ID="OutageKeys" />
                    </div>
                </div>
            </div>
            <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" Value="<%#CustomerPortal.SessionAccessor.MapId%>" />
            <asp:HiddenField ID="hdnLatitude" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnLongitude" runat="server" ClientIDMode="Static" />
        </section>

        <!-- footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- footer ends -->

    </form>
</body>
</html>
