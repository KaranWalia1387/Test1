<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OutageKeys.ascx.cs" Inherits="CustomerPortal.UserControls.OutageKeys" %>
<span id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Outages") %></span>
<span id="IDEnterCityZip" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterCityZip") %></span>
<span id="IDNoService" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_NoService") %></span>
<span id="IDEnterZip" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_EnterZip") %></span>
<span id="IDGeo" style="display: none"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo") %></span>
<span id="IDNoOutage" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_NoOutages") %></span>
<span id="IDNoPlannedOutage" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_NoPlannedOutages") %></span>
<span id="IDAccessDenied" style="display: none"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_AccessDenied") %></span>

<span id="lblLatitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Latitude") %>:</span>
<span id="lblLongitude" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Longitude") %>:</span>
<span id="lblLocationName" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_LocationName") %>:</span>
<span id="lblMyLocation" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_MyLocation") %></span>
<span id="lblDate" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Date") %></span>
<span id="lblStatus" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Status") %></span>
<span id="lblEstimatedtime" style="display: none;"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_lbl_Estimated_Restoration") %></span>
<span id="lblOutages" style="display: none;"><%= CustomerPortal.Translator.T("ML_OUTAGE_Navigation_Outage") %>:</span>
<span id="lblReport" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_span_ReportInfo") %>:</span>
<span id="lblGeoErrorCode1" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_error_geoerror1") %></span>
<span id="lblGeoErrorCode2" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_error_geoerror2") %>.</span>
<span id="lblGeoErrorCode3" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_Latitude") %></span>
<span id="lblCustomersAffected" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_lbl_CustomersAffected") %></span>
<span id="lblCommunityAffected" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outage_lbl_CommunityAffected") %></span>
<span id="lblCurrentLocation" style="display: none;"><%= CustomerPortal.Translator.T("ML_Msg_Outage_CurrentLocation") %></span>
<span id="lblAddplaceNotFound" style="display: none;"><%= CustomerPortal.Translator.T("ML_Outages_ErrMsg_AddNotFound") %></span>
<span id="lblGeoLocationNotSupportedBrowser" style="display: none;"><%= CustomerPortal.Translator.T("ML_Footprint_ErrMsg_Geo_Not_Supported") %></span>

<asp:HiddenField ID="hdnPinImageC" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinIcon" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinImageP" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinImageCC" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinImagePP" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinPng" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPinSvg" runat="server" ClientIDMode="Static" />
