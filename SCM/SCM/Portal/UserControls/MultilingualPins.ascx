<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultilingualPins.ascx.cs" Inherits="CustomerPortal.UserControls.MultilingualPins" %>

 <span globalize="ML_Default_Lbl_Address" id="pinAddress" style="display: none"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
    <span globalize="ML_Register_Lbl_City" id="pinCity" style="display: none"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></span>
    <span globalize="ML_Billing_div_pinPaymntHrs" id="pinPayHrs" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_div_pinPaymntHrs") %></span>
    <span globalize="ML_Billing_div_pinContactNo" id="pinContactNo" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_div_pinContactNo") %></span>
    <span globalize="ML_Register_Lbl_EmailId" id="pinEmailID" style="display: none"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></span>