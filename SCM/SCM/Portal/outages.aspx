<%@ Page Title="Outages" Language="C#" MasterPageFile="~/OutageNestedMaster.master" AutoEventWireup="true" CodeBehind="outages.aspx.cs" Inherits="CustomerPortal.outages" %>

<%@ Register Src="~/UserControls/OutageKeys.ascx" TagPrefix="uc1" TagName="OutageKeys" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderSearch" runat="server">

    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
    <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css" />
    <script src="//js.arcgis.com/3.14/" type="text/javascript"></script>
    <% }
      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <%}%>


    <%: System.Web.Optimization.Styles.Render("~/Content/cssOutages") %>
    <%: System.Web.Optimization.Scripts.Render("~/bundles/jsOutages")%>
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
            document.getElementById("btnRefresh").accessKey = "R";
            document.getElementById("GIStxtGoogleSearch").accessKey = "S";
        })
    </script>
    <style>
        .energy_mid_box .right_content_box_outage { 
    height: 96% !important;
    
}

        @media (min-width:1700px) and (max-width:2200px) {
              .energy_mid_box .right_content_box_outage { 
                height: 97.4% !important;
    
            }
        }


    </style>
    <div class="cover_right_top_area">

        <input type="hidden" class="activeli_list" value="outages" />

        <div class="gis-footprint-area" style="float: right;">

            <ul>
                <li id="li_ReportOutage" class="li_ReportOutage_font" runat="server">
                    <a href="connect-me.aspx?pid=o" title="Report Outage" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesReportOutages)%>">
                        <img src="images/icon-outage-red.png" style="float: left; margin-top: 6px; width: 23px;" />
                        <span class="head_icon_flat icon_report-outage"></span>
                        <span style="display: inline-block; margin: 6px 0px 0px 8px;" globalize="ML_Outage_span_Report_Outage"><%= CustomerPortal.Translator.T("ML_Outage_span_Report_Outage") %></span>
                    </a>

                </li>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.NotificationOutages)%>"><%--Added Hide show count for Notification Key--%>
                    <a id="A3" href="Notification-inbox.aspx?type=1" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesNotifications)%>">
                        <asp:Label ID="lblNotificationOutage" runat="server" CssClass="lblBg no_notification_outage" Style="margin: 2px 10px 0px; float: left;"></asp:Label>
                        <span style="display: inline-block; padding-top: 7px;" globalize="ML_Outage_span_Report_Notifications"><%= CustomerPortal.Translator.T("ML_Outage_span_Report_Notifications") %></span></a>

                </li>
                <li style="width: auto;">

                    <asp:Image ID="imgCurrent" class="GIScurrentlocation curren_flat_icon_hide" runat="server" ImageUrl="Images/Footprint/out_location_icon.svg" ClientIDMode="Static"
                        Style="cursor: pointer; height: 23px; margin-top: 4px; vertical-align: top; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrentLocation) %>" globalize="ML_Outage_span_Current_Location" alt="Current Location" title="Current Location" />


                    <span id="imgCurrent2" class="GIScurrentlocation head_icon_flat icon_notif-sent" runat="server" imageurl="Images/Footprint/out_location_icon.svg" clientidmode="Static"
                        style="cursor: pointer; height: 23px; margin-top: 1px; vertical-align: top; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrentLocation) %>" globalize="ML_Outage_span_Current_Location" alt="Current Location" title="Current Location" /></span>


                    <div style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesRefresh)%>; float: right;">
                        <asp:ImageButton ID="btnRefresh" ClientIDMode="Static" runat="server" Class="btnRefresh"
                            Style="margin-left: 10px; margin-top: 1px; height: 22px; outline: none;"
                            ImageUrl="images/RefreshBtn.svg" alt="Refresh" title="Refresh" globalize="ML_Outage_span_Refresh_Map" />

                        <span style="cursor: pointer" name="btnRefresh1" id="btnRefresh" class="foot_print head_icon_flat icon_refreshbtn" globalize="ML_Outage_span_Refresh_Map"></span>
                    </div>
                </li>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesSearch)%>">

                    <div class="search-area">
                        <input id="GIStxtGoogleSearch" type="text" placeholder="Search by city/zip code" title="Search by city/zip code" onkeydown="if(event.keyCode == 13) return false;" globalize="ML_Outage_span_GIStxtGoogleSearch" maxlength="35" size="35" />
                    </div>
                    <div class="search-icon-area">
                        <a href="#" id="GISsearchGoogleMap">
                            <span class="SearchIcon" globalize="ML_Outage_span_Searchicon" id="srch">&nbsp;</span></a>
                    </div>

                </li>
            </ul>

        </div>
    </div>
    <img src="images/print-icon.png" style="padding-right: 7px; margin-top: -36px; float: right;" onclick="printarea();">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <div class="left_charging_map" style="width: 78%;">
        <div id="outage_map_canvas" class="radius map_canvas" style="height: 100% !important;">
        </div>
    </div>
    <div class="right_charging_map" style="width: 22%; overflow: visible;">
        <div class="distance_area distance_area_font" style="text-align: center; background: #f4f4f4;">
            <ul>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesCurrent)%>"><a href="#" key="C" class="active">
                    <img src="images/icon-current.png" style="padding-top: 5px; padding-bottom: 5px;" />
                    <span class="head_icon_flat icon_current"></span>
                    <br />
                    <span globalize="ML_Outage_span_Current"><%= CustomerPortal.Translator.T("ML_Outage_span_Current") %></span></a></li>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesPlaned)%>"><a href="#" key="P">
                    <img src="images/icon-planned.png" style="padding-top: 5px; padding-bottom: 5px;" />
                    <span class="head_icon_flat icon_planned-outage"></span>
                    <br />
                    <span globalize="ML_Outage_span_Planned"><%= CustomerPortal.Translator.T("ML_Outage_span_Planned") %></span></a></li>
            </ul>
        </div>
        <div class="map_address_area" style="height: 85% !important; overflow: auto;">
            <div id="LeftPanel" class="LeftPanel" style="overflow: auto;"></div>
        </div>
    </div>
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdOutageModuleEnabled" runat="server" ClientIDMode="Static" />

    <uc1:OutageKeys runat="server" ID="OutageKeys" />
</asp:Content>
