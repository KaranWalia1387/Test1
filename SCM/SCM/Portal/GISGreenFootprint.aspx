<%@ Page Title="Footprint" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="GISGreenFootprint.aspx.cs" Inherits="CustomerPortal.GISGreenFootprint" %>

<%@ Register Src="~/UserControls/GreenFootPrintKeys.ascx" TagPrefix="uc1" TagName="GreenFootPrintKeys" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%if (CustomerPortal.SessionAccessor.MapId == "0")
      { %>
        <link rel="stylesheet" href="//js.arcgis.com/3.14/dijit/themes/nihilo/nihilo.css" />
        <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css" />
        <script type="text/javascript" src="//js.arcgis.com/3.14/"></script>
    <% }
      else if (CustomerPortal.SessionAccessor.MapId == "1")
      {%>
         <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
    <% }%>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssFootprint") %>
    <%: System.Web.Optimization.Scripts.Render("~/bundles/jsFootprint")%>
    <style>
        .jqx-listitem-state-normal {
        top:-1px !important}
        .jqx-icon-arrow-right, .jqx-icon-arrow-left {
        height:16px !important
        }
        #gridpagerlistjqxgrid{ height:18px !important}
        .jqx-fill-state-pressed{ width:40px !important}
        .jqx-input{ text-align:center !important}
        #jqxgrid {
                height: 460px !important
        }
       #footprint_map_canvas {
    height: 95.3% !important;
}
       
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="footprint" />
    <section class="inner_mid_section">
    <div class="container inner-mid-container">
        <div class="energy_mid_box without_sidebar" style="overflow-y:hidden;">
            <div class="cover_top_area">
                <h1><img src="images/icon_dashboard_heading/icon_green_footprint_heading.svg" style="padding-right:5px;" />
                     <span class="head_icon_flat icon_footprint"></span>
                    <span globalize="ML_GREEN_FOOT_PRINT_Navigation_GreenFootprint"><%= CustomerPortal.Translator.T("ML_GREEN_FOOT_PRINT_Navigation_GreenFootprint") %></span></h1>
                <div class="MapTextView">
                    <a href="#" id="Map" class="active"></a>
                    <a href="#" id="Text"></a>
                </div>

                <div class="cover_right_top_area" style="float:right; width:56%; text-align:right;">
                    <div class="gis-footprint-area">
                        <ul>
                            <li>
                                <asp:Image ID="Image1" runat="server" ImageUrl="Images/Footprint/out_location_icon.svg" style="height: 26px;cursor: pointer;margin-top: 2px;"
                            CssClass="currentlocation curren_flat_icon_hide" alt="Click to view current location" title="Click to view current location" globalize="ML_GISGreenFootprint_Img_CurrentLocation" />


                                <span ID="Image2" runat="server" style="height: 26px;cursor: pointer;margin-top: 2px;" class="currentlocation head_icon_flat icon_notif-sent" alt="Click to view current location" title="Click to view current location" globalize="ML_GISGreenFootprint_Img_CurrentLocation"></span>

                            </li>
                            <li style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FootPrintType) %>"> <img id="img-footprints" src="images/Footprint/All_key.png" style="width: 26px; height:27px;" /></li>
                            <li style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FootPrintType) %>">
                                <select id="selFootPrint" style="width: 200px; margin-top: 0px;" title="Select type of Green Footprint" globalize="ML_GISGreenFootprint_ddl_GreenBuildingType">
                                    <option value="0" globalize="ML_Notification_Services_All"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></option>
                                </select>
                            </li>
                            <li class="btn_ref_flat" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FootPrintRefresh) %>">
                              <asp:ImageButton ID="btnRefresh" runat="server" Style="float: right;height: 29px; margin-left: 10px; margin-top: -1px; outline: none;" ImageUrl="images/RefreshBtn.svg" alt="Click to refresh map" title="Click to refresh map" globalize="ML_GISGreenFootprint_Img_RefreshMap" ClientIDMode="Static"/>
                                <span style="cursor:pointer" ID="btnRefresh" class="foot_print head_icon_flat icon_refreshbtn" globalize="ML_GISGreenFootprint_Img_RefreshMap"></span>

                            </li>
                            <li class="responsive_width_1 " style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FootPrintSearch) %>">
                                <div class="search-area">
                                    <input id="GIStxtGoogleSearch" type="text" placeholder="Search by City or Zip" title='<%# CustomerPortal.Translator.T("ML_GISGreenFootprint_txtbox_GoogleSearch") %>' globalize="ML_GISGreenFootprint_txtbox_GoogleSearch" maxlength="35"/>
                                </div>
                                <div class="search-icon-area">
                                    <a href="#" id="GISsearchGoogleMap" title="Search" globalize="ML_GISGreenFootprint_Img_SearchBusiness">
                                        <span class="SearchIcon">&nbsp;</span></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>   
           </div>

           <%-- Map View --%>
            <div id="footprint_map_canvas" class="radius map_canvas footprint_height" style="width:100% !important; text-align: left;"></div>
          
            <%-- Text View --%>
            <div id="jqxgrid" style="display:none"></div>
        </div>
    </div>
    </section>
    <div id="progress" class="progress visible" style="display: none;"></div>
    <span globalize="ML_DASHBOARD_Lbl_GreenFootprint" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_GreenFootprint") %></span>
    <span globalize="ML_Footprint_ErrMsg_Geo" id="ErrMsgGeo" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo") %></span>
    <span globalize="ML_Footprint_ErrMsg_AccessDenied" id="ErrMsgAccessDebied" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_AccessDenied") %></span>
    <span globalize="ML_Footprint_ErrMsg_Unavailable" id="ErrMsgUnavailable" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Unavailable") %></span>
    <span globalize="ML_Footprint_ErrMsg_NoRoute" id="ErrMsgNoRoute" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoRoute") %></span>
    <span globalize="ML_Footprint_ErrMsg_NoFootprint" id="ErrMsgNoFootprint" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_NoFootprint") %></span>
    <span globalize="ML_Outages_ErrMsg_EnterCityZip" id="ErrMsgTextMand" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterCityZip") %></span>
    <span globalize="ML_Footprint_ErrMsg_Geo_Not_Supported" id="ErrMsgGeoNotSupp" style="display: none"></span>
    <span globalize="ML_MYACCOUNT_Lbl_Name" id="lblName" style="display: none;"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></span>
    <span globalize="ML_Default_Lbl_Address" id="lblAddress" style="display: none;"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
    <span globalize="ML_Footprint_Distance" id="lblDistance" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Distance") %></span>
    <span globalize="ML_Footprint_Latitude" id="lblLatitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Latitude") %></span>
    <span globalize="ML_Footprint_Longitude" id="lblLongitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Longitude") %></span>
    <span globalize="ML_Footprint_LocationName" id="lblLocationName" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_LocationName") %></span>
    <span globalize="ML_Footprint_MyLocation" id="lblMyLocation" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_MyLocation") %></span>
    <span globalize="ML_Outages_ErrMsg_EnterCityZip" id="lblcityblankerror" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterCityZip") %></span>
  
    <uc1:GreenFootPrintKeys runat="server" ID="GreenFootPrintKeys" />
    
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
</asp:Content>
