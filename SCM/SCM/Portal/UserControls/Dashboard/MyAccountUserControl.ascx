<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MyAccountUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.MyAccountUserControl" %>

<%@ Import Namespace="CustomerPortal" %>

<div class="myaccount-area">

    <div class="defadd" runat="server" id="DefAdd" clientidmode="static">
        <b><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DefAddress") %></b>
        <%--<address><%=Convert.ToString(SessionAccessor.DefaultAddress)%></address>--%>
        <div style="margin: 0px 0px 0px; padding: 0px; color: #606060; font-size: 11px;"><asp:Label ID="lblDefaultAddress" runat="server"></asp:Label></div>
    </div>
  <%--  <div class="defpay" style="display: <%= CustomerPortal.SessionAccessor.IsExternalPaymentLink == "1" ? "none;" : "block;" %>">--%>
      <div class="defpay" style="display:none;">
        <b style="display: <%= CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountDefaultPayment) %>">
            <%= CustomerPortal.Translator.T("ML_Msg_DefaultPaymentMethod") %></b>
        <address id="lblDefaultCard" runat="server" class="lblDefaultCard" clientidmode="static"></address>
    </div>
    <div class="defPaprlessBill" runat="server" id="defPaprlessBill" clientidmode="static">
        <div style="float: left; font-size: 11px; padding: 6px 0px 0px;width: 100%; font-weight: bold;">
            <b><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Paperless_Bill") %></b>
        </div>
        <div style="color:#606060; font-size: 10px ">
            <asp:Label ID="lblText" runat="server"></asp:Label>
        </div>
    </div>

</div>
