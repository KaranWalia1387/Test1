<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NotificationUserControl.ascx.cs"
    Inherits="CustomerPortal.UserControls.NotificationUserControl" %>
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="NotificationIcon">
            &nbsp;</div>
        <div class="TableCellHeaderTitle">
            <a href="Notification-inbox.aspx"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Notifications") %></a></div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div class="GridTableLabel OddColor">
            <a href="Notification-inbox.aspx?type=outage" style="color: #666">Outage</a></div>
        <div class="GridTableColon OddColor ">
            :</div>
        <div class="GridTableData OddColor">
            <asp:Label ID="lblnotificationcount" runat="server" Text="0" CssClass="lblBg"></asp:Label></div>
        <div class="GridTableLabel EvenColor">
            <a href="Notification-inbox.aspx?type=billing" style="color: #666">Billing</a></div>
        <div class="GridTableColon EvenColor ">
            :</div>
        <div class="GridTableData EvenColor">
            <asp:Label ID="lblBillingNotCount" runat="server" Text="0" CssClass="lblBg"></asp:Label></div>
        <div class="GridTableLabel OddColor">
            <a href="Notification-inbox.aspx?type=service" style="color: #666">Service</a></div>
        <div class="GridTableColon OddColor ">
            :</div>
        <div class="GridTableData OddColor">
            <asp:Label ID="lblServiceNotCount" runat="server" Text="0" CssClass="lblBg"></asp:Label></div>
        <div class="GridTableLabel EvenColor">
            <a href="Notification-inbox.aspx?type=connect me" style="color: #666">Connect Me</a></div>
        <div class="GridTableColon EvenColor ">
            :</div>
        <div class="GridTableData EvenColor">
            <asp:Label ID="lblconnectmeNotCount" runat="server" Text="0" CssClass="lblBg"> </asp:Label></div>
    </div>
    <div class="TableCellContainerFooter">
        &nbsp;</div>
</div>
