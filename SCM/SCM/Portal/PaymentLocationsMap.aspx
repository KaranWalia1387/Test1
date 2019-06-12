<%@ Page Title="Payment Location" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="PaymentLocationsMap.aspx.cs" Inherits="CustomerPortal.PaymentLocationsMap" %>

<%@ Register Src="~/UserControls/MultilingualPins.ascx" TagPrefix="uc1" TagName="MultilingualPins" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
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
    <%}%>

    <script>var dojoConfig = { parseOnLoad: true };</script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnSubmit').val($('#spansubmit').text());
        });
        dojo.require("dijit.layout.BorderContainer");
        dojo.require("dijit.layout.ContentPane");
        dojo.require("esri.map");
        dojo.require("esri.layers.KMLLayer");
        dojo.require("esri.dijit.Popup");       
    </script>
    <style>
        .dropdown-menu{ z-index:999999 !important}
        .modal-open .modal {
                z-index: 9999999;
        }
        .inner_mid_section select {
                padding: 3px 0;
        }
    </style>
    <input type="hidden" class="activeli_list" value="billing" />
    <div class="ddlformap">
        <asp:DropDownList ID="ddlCity" CssClass="" runat="server" ClientIDMode="Static" globalize="ML_PaymentLocationsMap_ddl_City"></asp:DropDownList>
    </div>

    <div id="paymentlocation_map_canvas" class="radius map_canvas left_charging_map"></div>
    <div class="right_charging_map">
        <div id="LeftPanel" class="LeftPanel"></div>
    </div>
    <div id="page_loader">
    </div>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssPaymentLocationsMap") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsPaymentLocationsMap") %>

    <span globalize="ML_BILLING_Navigation_PaymentLocationsMap" id="titletext" style="display: none"></span>
    <%--<span globalize="ML_Billing_div_pinPaymntHrs" id="PaymentHours" style="display:none"></span>
    <span globalize="ML_Register_Lbl_EmailId" id="Emailid" style="display:none"></span>--%>
    <span id="PaymentHours" style="display: none;"><%= CustomerPortal.Translator.T("ML_Billing_div_pinPaymntHrs") %></span>
    <span id="Emailid" style="display: none;"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></span>
    <span id="City" style="display:none;"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></span>  
    <span id="Address" style="display: none;"><%= CustomerPortal.Translator.T("ML_Address") %></span>
    <span id="ContactNo" style="display:none;"><%= CustomerPortal.Translator.T("ML_ContactNo") %></span> 
      <span globalize="ML_Master_btn_Submit" id="spansubmit" style="display:none;"><%= CustomerPortal.Translator.T("ML_Master_btn_Submit") %></span>
     <span id="PaymentLocationsNotFound" style="display:none"><%=CustomerPortal.Translator.T("ML_PaymentLocations_NotFound")%></span>
    
    <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLatitude" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMapIcon" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLongitude" runat="server" ClientIDMode="Static" />
    <uc1:MultilingualPins runat="server" ID="MultilingualPins" />
</asp:Content>
