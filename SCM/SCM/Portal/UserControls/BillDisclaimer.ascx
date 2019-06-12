<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BillDisclaimer.ascx.cs" Inherits="CustomerPortal.UserControls.BillDisclaimer" %>
<div style="margin: 5px; padding: 5px;">
    <div id="disclaimer" style="float: left; margin-bottom: 0px; padding-left: 22px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingDisclaimer) %>!important;">
        <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
        <span globalize="ML_Billing_Span_Disclaimertxt" runat="server" style="color: black;"><%= CustomerPortal.Translator.T("ML_Billing_Span_Disclaimertxt") %></span>
    </div>
</div>
