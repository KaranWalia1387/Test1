<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OutageUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.OutageUserControl" %>


<div class="right-dolar-top-area">
    <div class="SpanRight">
        <a href="#Module5">
            <img id="imgOutagesMap" src="images/zip-icon.png" globalize="ML_OUTAGEWIDGETHOME_MAPVIEW" onclick="return false" /></a>&nbsp;&nbsp;<a href="#Module5" onclick="return false"><img id="imgOutagesText" src="images/text-icon.png" globalize="ML_OUTAGEWIDGETHOME_TXTVIEW" /></a>
    </div>
</div>
<div class="outage-area">
    <div id="outage_map_canvas" class="map_canvas" style="height: 177px; width: 98%; margin-left: 1%; float: left; text-align: left;"></div>
    <div id="outage_Text_canvas" class="map_canvas" style="display: none; height: 100%; width: 98%; margin-left: 1%; float: left; text-align: left;"></div>
</div>
<span id="lblLatitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Latitude") %>:</span>
<span id="lblLongitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Longitude") %>:</span>
<span id="lblLocationName" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_LocationName") %>:</span>
<span id="lblMyLocation" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_MyLocation") %></span>
<span id="lblDate" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Date") %></span>
<span id="lblStatus" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Status") %></span>
<span id="lblEstimatedtime" style="display: none;"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_lbl_Estimated_Restoration") %></span>
<span id="lblOutages" style="display: none;"><%= CustomerPortal.Translator.T("ML_OUTAGE_Navigation_Outage") %>:</span>
<span id="lblReport" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_span_ReportInfo") %>:</span>
  <span id="IDNoOutage" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_NoOutages") %></span>