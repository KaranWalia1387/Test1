<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="AdminPanel.Home" %>

<%@ Import Namespace="AdminPanel" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="<%#string.Format("{0}/js/Validate.js",AdminPanel.Common.url)%>"></script>
    <style type="text/css">
        .icon-bar {
            display: none !important;
        }

        #menu_navigator {
            display: none;
        }
    </style>

    <script>
        $(document).ready(function () {
            $('.field_serv').find('a').attr('href', $('#smwLink').val());
            $('.DassiqLink').find('a').attr('href', $('#siqLink').val());
            $('.DassiqadminLink').find('a').attr('href', $('#siqadminLink').val());
            $(".logo").click(function () {
                $(this).removeAttr("href");
            });
        });

    </script>

    <section class="mid-container">
        <div class="container">
             
            <div class="row">
                <div class="dashboard-area">
                    <ul>
                        <%if (SessionAccessor.UserRightList.Contains(UserRights.EfficiencyShow, StringComparer.InvariantCultureIgnoreCase))
                          { %>
                        <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Efficiency) %>" class="efficiecny"><a href="configuration/configure-saving-tips.aspx" globalize="ML_COMMON_CONSERVATION">Efficiency</a></li>
                        <% } %>

                        <%  if (SessionAccessor.UserRightList.Contains(UserRights.OutageCancellation))
                            { %>
                        <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Outages) %>" class="outage"><a href="configuration/Outage-Cancellation.aspx">Outages</a></li>
                        <%}%>

                        <%  if (SessionAccessor.UserRightList.Contains(UserRights.ConfigurationCEAshow))
                            { %>
                        <li class="cea"><a href="AdminReports/Dashboard.aspx">Customer Engagement Analytics</a></li>
                        <%}%>

                        <% if (SessionAccessor.UserRightList.Contains(UserRights.DashboardDemandResp))
                           {%>
                        <li class="thermo" id="thermo" runat="server" visible="true"><a href="Demand-Response/dashboard.aspx">Demand Response</a></li>
                        <%} %>

                        <% if (SessionAccessor.UserRightList.Contains(UserRights.NotificationShow))
                           {%>
                        <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Notification) %>" class="notification_home"><a href="Notification/Notification-Inbox.aspx">Notification</a></li>
                        <%} %>

                        <% if (SessionAccessor.UserRightList.Contains(UserRights.DashboardUserManagemnt, StringComparer.InvariantCultureIgnoreCase)
                          || (SessionAccessor.UserRightList.Contains(UserRights.UserManagementUserCreate, StringComparer.InvariantCultureIgnoreCase)))
                           { %>
                        <li class="csr"><a href="usermanagement/Customer.aspx">CSR - WorkBench</a></li>
                        <% }%>

                        <% if (SessionAccessor.UserRightList.Contains(UserRights.AdministrationShow))
                           {%>
                        <li class="user_dash"><a href="UserManagement/User.aspx">Administration</a></li>
                        <% }

                           if (SessionAccessor.UserRightList.Contains(UserRights.DashboardCRM))
                           { %>
                        <li class="crm_home"><a href="CRM/Crm-Dashboard.aspx">CRM</a></li>
                        <%} %>

                        <%--<%if (Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["smwLink"]) != null)
                          { %>--%>

                        <%if (SessionAccessor.UserRightList.Contains(UserRights.FieldServiceView))
                                  { %>
                        <li class="field_serv"><a href="#" target="_self">Field Service View</a></li>
                        <%} %>

                        <%if (SessionAccessor.UserRightList.Contains(UserRights.WIQ))
                          { %>
                        <li class="DassiqLink"><a href="#" target="_self">Water iQ Analytics</a></li>
                        <%} %>

                    
                    </ul>
                </div>
                <!-- END .dashboard-area -->
            </div>
            <!-- END .row -->
        </div>
        <!-- END .container -->
    </section>
    <!-- END .mid-container -->
    <%--<input id="hdnCommonUrl" type="hidden" value="http://<%=HttpContext.Current.Request.Url.Authority %><%=HttpContext.Current.Request.ApplicationPath %>"  />--%>

    <script type="text/javascript">
        $(".home").addClass('active');
    </script>
</asp:Content>
