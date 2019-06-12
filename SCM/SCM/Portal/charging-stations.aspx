<%@ Page Title="Charging Stations" Language="C#" MasterPageFile="~/ElectricVehicleNestedMaster.master" AutoEventWireup="true"
    CodeBehind="charging-stations.aspx.cs" Inherits="CustomerPortal.charging_stations" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderSearch" runat="server">

    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
    <link rel="stylesheet" href="//js.arcgis.com/3.14/dijit/themes/nihilo/nihilo.css" />
    <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.14/"></script>
    <% }
      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <script src="js/markerwithlabel.js" type="text/javascript"></script>
    <% }%>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssChargingStations") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsChargingStations")%>
   <style>
       .energy_mid_box .right_content_box {
    height: 96.9%;
}
   </style>
    <div class="gis-footprint-area gis-footprint-area-spanish" style="float: right;">

        <ul>
            <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EVChargingStationsRefresh)%>">
                <asp:ImageButton ID="btnRefresh" runat="server" Style="float: right; margin-left: 10px; margin-top: 0px; margin-right: 15px; outline: none;"
                    ImageUrl="images/RefreshBtn.svg" globalize="ML_Electric Vehicle_Div_Refresh" alt="Refresh" title="Refresh" ClientIDMode="Static" />
                 <span style="cursor:pointer" ID="btnRefresh" class="foot_print head_icon_flat icon_refreshbtn"></span>
            </li>
            <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EVChargingStationsSearch)%>">

                <div class="search-area">
                    <input id="txtMapSearch" type="text" globalize="ML_EV_Placeholder_SearchTxt" onkeypress="return checkEnter(event)" placeholder="Search City/Zip" maxlength="35" style="line-height: 25px;" /><!-- added globalize for bug id: 0009785 -->
                </div>
                <div class="search-icon-area">
                    <a href="#" id="searchESRIMap" globalize="ML_ElectricVehicle_div_SearchIcon">
                        <span class="SearchIcon">&nbsp;</span></a>
                </div>

            </li>
        </ul>

    </div>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">

    <div id="page_loader"></div>
    <div class="left_charging_map">
        <div id="electric_map_canvas" class="radius map_canvas" style="height: 100%;"></div>
    
    </div>
    <div class="right_charging_map">
        <div class="distance_area" style="text-align: center; background: #f4f4f4;">
            <ul>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EVChargingStationsDistance)%>">
                    <a id="btnDistance" class="active">
                        <img src="images/icon-distance.svg" /><br />
                        <span globalize="ML_CHARGING_STATION_Navigation_Distance"><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Distance") %></span></a></li>
                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EVChargingStationsRate)%>">
                    <a id="btnRate">
                        <img src="images/icon-rate.svg" /><br />
                        <span globalize="ML_CHARGING_STATION_Navigation_Rate"><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Rate") %></span></a></li>
            </ul>
        </div>
        <div class="map_address_area">
            <div id="LeftPanel" class="LeftPanel">
            
            </div>
        </div>
    </div>


    <span  id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Anchor_ChargingStations") %></span>
    <span  id="IDStationNotFound" style="display: none"><%= CustomerPortal.Translator.T("ML_Charging-station_ErMsg_Station_NotFound") %></span>
    <span  id="IDNoRoute" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoRoute") %></span>
    <span id="IDGeoNotSupported" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo_Not_Supported") %></span>
    <span  id="IDGeo" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo") %></span>
    <span  id="IDMandatoryText" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterCityZip") %></span>
    <span id="lblRate" style="display: none;" ><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Rate") %></span>
    <span id="lblDistance" style="display: none;" ><%= CustomerPortal.Translator.T("ML_CHARGING_STATION_Navigation_Distance") %></span>
    <span id="lblAddress" style="display: none;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterAddress") %></span>
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMapIcon" runat="server" ClientIDMode="Static" />
</asp:Content>
