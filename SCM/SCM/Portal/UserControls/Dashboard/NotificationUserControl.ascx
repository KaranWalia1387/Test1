<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NotificationUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.NotificationUserControl" %>


<div class="notification-area"  style="overflow: auto;">
    <a id="aoutage" runat="server" href="../../Notification-inbox.aspx?type=1">
        <div class="block">
            <div class="left-area-tabular" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Outage") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lblnotificationcount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_OUTAGEIMG") %>'  ClientIDMode="Static"></asp:Label></div>
        </div>
    </a>

    <a id="abilling" runat="server" href="../../Notification-inbox.aspx?type=4">
        <div class="block">
            <div class="left-area-tabular" ><%= CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment=="Prepaid"?"ML_MyAccount_Dropdn_Txt_Prepay":"ML_DASHBOARD_Lbl_BillingNotify") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lblBillingNotCount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_BILLINGIMG") %>' ClientIDMode="Static" ></asp:Label></div>
        </div>
    </a>
     <%if(CustomerPortal.SessionAccessor.scmexpress=="0"){%>
    <a id="aservice" runat="server" href="../../Notification-inbox.aspx?type=3">
        <div class="block">
            <div class="left-area-tabular" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Service") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lblServiceNotCount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_SERVICEIMG") %>' ClientIDMode="Static" ></asp:Label></div>
        </div>
    </a>
    <% }%>
    <a id="aconnectme" runat="server" href="../../Notification-inbox.aspx?type=2" >
        <div class="block">
            <div class="left-area-tabular" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_ConnectMe") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lblconnectmeNotCount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_CONNECTMEIMG") %>' ClientIDMode="Static" > </asp:Label></div>
        </div>
    </a>
        <%if(CustomerPortal.SessionAccessor.scmexpress=="0"){%>
    <a id="ademandresponse" runat="server" href="../../Notification-inbox.aspx?type=5" >
        <div class="block">
            <div class="left-area-tabular"  style="width:61%;"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DemandResponse") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lbldrCount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_DEMANDRESIMG") %>'  ClientIDMode="Static" ></asp:Label></div>
        </div>
    </a>
      <% }%>
     <a id="aleakaalert" runat="server" href="../../Notification-inbox.aspx?type=13">
        <div class="block">
            <div class="left-area-tabular"  style="width:61%;"><%= CustomerPortal.Translator.T("ML_Dashboard_LeakAlert") %></div>
            <div class="right-area-tabular">
                <asp:Label ID="lblleakalertCount" runat="server" Text='<%# CustomerPortal.Translator.T("ML_NOTIFICATIONS_DEMANDRESIMG") %>' ClientIDMode="Static" ></asp:Label></div>
        </div>
    </a>
</div>
