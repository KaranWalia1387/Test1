<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChargingStationUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.ChargingStationUserControl" %>

    
    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
   
   <% }
      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
  
     <script src="js/markerwithlabel.js" type="text/javascript"></script>
 <% }%>  

 <%--    <%: System.Web.Optimization.Styles.Render("~/Content/cssChargingStations") %>--%>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsChargingStations")%>
    
   


    <div id="page_loader"></div>
   
        <div id="electric_map_canvas" class="map_canvas" style="height: 177px; width: 98%; margin-left: 1%; float: left; text-align: left;">
        </div>
   
    


    <span globalize="ML_ELECTRIC_VEHICLE_Anchor_ChargingStations" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Anchor_ChargingStations") %></span>
    <span globalize="ML_Charging-station_ErMsg_Station_NotFound" id="IDStationNotFound" style="display: none"><%= CustomerPortal.Translator.T("ML_Charging-station_ErMsg_Station_NotFound") %></span>
    <span globalize="ML_Footprint_ErrMsg_NoRoute" id="IDNoRoute" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoRoute") %></span>
    <span globalize="ML_Footprint_ErrMsg_Geo_Not_Supported" id="IDGeoNotSupported" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo_Not_Supported") %></span>
    <span globalize="ML_Footprint_ErrMsg_Geo" id="IDGeo" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo") %></span>
    <span globalize="ML_Outages_ErrMsg_EnterCityZip" id="IDMandatoryText" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterCityZip") %></span>
    <span id="lblRate" style="display: none;" globalize="ML_CHARGING_STATION_Navigation_Rate"><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Rate") %></span>
    <span id="lblDistance" style="display: none;" globalize="ML_CHARGING_STATION_Navigation_Distance"><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Distance") %></span>
    <span id="lblAddress" style="display: none;" globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />

