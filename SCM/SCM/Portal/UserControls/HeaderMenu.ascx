<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HeaderMenu.ascx.cs"
    Inherits="CustomerPortal.HeaderMenu" %>
 <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
<script>
    function getBillingModuleURL()
    {
        var utilityBill = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingUtilityBill) %>';
        var recBill = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingRecurringBill) %>';
        var billHistory = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingHistory) %>';
        var budgBill = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingBudgetMyBill) %>';
        var payLocat = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPaymentLocation) %>';
        var defUrl = 'BillDashboard.aspx';
        if (utilityBill.toLowerCase() != 'none')
        {
            defUrl = "BillDashboard.aspx";
        }
        else if (recBill.toLocaleLowerCase() != 'none')
        {
            defUrl = "recurringpayment.aspx";
        }
        else if (billHistory.toLocaleLowerCase() != 'none')
        {
            defUrl = 'BillingHistory.aspx';
        }
        else if (budgBill.toLocaleLowerCase() != 'none')
        {
            defUrl = 'Budgetbill.aspx';
        }
        else if (payLocat.toLocaleLowerCase() != 'none') {
            defUrl = 'PaymentLocationsMap.aspx';
        }
        else {
            defUrl = 'connect-me.aspx?pid=b';
        }
        return defUrl;
    }
    function getEfficiencyModuleURL()
    {
        var programUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPrograms) %>';
        var annualGoalUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal) %>';
        var edutipsUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyEducationTips) %>';
        var savingtipsUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips) %>';
        var effRankUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRank) %>';
        var effHomeRepUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyHomeReport) %>';
        var effAbtHomeUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyAboutHome) %>';
        var effRebatesUrl = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate) %>';

       var defUrl = 'rebates.aspx';
      
        if (effRebatesUrl.toLocaleLowerCase()!='none') {
           defUrl = 'rebates.aspx';
        }
        else if (programUrl.toLowerCase() != 'none') {
            defUrl = "programs.aspx";
        }
        else if (annualGoalUrl.toLocaleLowerCase() != 'none') {
            defUrl = "yearly-budget.aspx";
        }
        else if (edutipsUrl.toLocaleLowerCase() != 'none') {
            defUrl = 'educational-tips.aspx';
        }
        else if (savingtipsUrl.toLocaleLowerCase() != 'none') {
            defUrl = 'saving-tips.aspx';
        }
        else if (effRankUrl.toLocaleLowerCase() != 'none') {
            defUrl = 'efficiency-rank.aspx';
        }
        else if (effHomeRepUrl.toLocaleLowerCase() != 'none')
        {
            defUrl = 'Energy_Report/Energy_Report.aspx';
        }
        else if (effAbtHomeUrl.toLocaleLowerCase() != 'none')
        {
            defUrl = 'AboutmyHome/index.aspx';
        }
        else {
            defUrl = 'rebates.aspx';
        }
        return defUrl;
    }
    $(document).ready(function () {
        //Setting Url For Billing
        var url = getBillingModuleURL();
        $('.billing a').prop('href', '<%=CustomerPortal.SessionAccessor.BaseUrl%>/' + url);

        //Setting Url For Efficiency
        var url = getEfficiencyModuleURL();
        $('#module11 a').prop('href', '<%=CustomerPortal.SessionAccessor.BaseUrl%>/' + url);
        $('div[id="EnergyEfficiencyModule"] .tablet-view a').prop('href', url);
    })
</script>
<header>
    <div class="container">
        <div class="row" style="position: relative;">
            <div class="col-xs-12 col-sm-2 col-md-2">
                <div class="<%=hdnlogosize.Value%>" id="headerlogo">
                    <a href="<%=CustomerPortal.SessionAccessor.DashboardOption%>">
                        <img src="<%=string.Format("{1}/images/{0}",(CustomerPortal.SessionAccessor.ModernStyleOption==true?"modern-logo.png":"logo.png"),CustomerPortal.SessionAccessor.BaseUrl)%>" />
                       <%-- <img src="<%=string.Format("{0}/images/modern-logo.png",CustomerPortal.SessionAccessor.BaseUrl)%>" class="modern_logo" />--%>

                    </a>
                </div>
            </div>
            <div class="col-xs-12 col-sm-10 col-md-10">

                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span>
                            <img src="images/Nav-icon.png" /></span>
                    </button>
                    <a class="navbar-brand" href="#" globalize="ML_HeaderMenu_a_NavigateTo">Navigate to...</a>
                </div>

                <nav class='<%=hdnnavigationClass.Value%>' id="headermenu" style="float:right">
                    <ul class="navbar-collapse collapse navbar-nav tabs">
                        <li class="dashboard_home"><a href="<%=string.Format("{0}/{1}",CustomerPortal.SessionAccessor.BaseUrl,CustomerPortal.SessionAccessor.DashboardOption)%>"><span title="HOME" globalize="ML_HeaderMenu_span_Home"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Home") %></span></a></li>
                        <li class="myaccount" id="module1" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccount) %>"><a href="<%=string.Format("{0}/account.aspx",CustomerPortal.SessionAccessor.BaseCustomUrl)%>"><span title="MY ACCOUNT" globalize="ML_HeaderMenu_span_MyAccount"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_MyAccount") %></span></a></li>
                        <li class="usage" id="module3" runat="server" visible="false"><a href="<%=string.Format("{0}/Usages.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="USAGE" globalize="ML_HeaderMenu_span_Usage"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Usage") %></span></a></li>
                        <%--<li class="usage" id="module3" runat="server" visible="false"><a href="<%=string.Format("{0}/DResponse.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="USAGE" globalize="ML_HeaderMenu_span_Usage">USAGE</span></a></li>--%>
                        <li class="billing" id="module2" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Billing) %>"><a href="<%=string.Format("{0}/BillDashboard.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="BILLING" globalize="ML_HeaderMenu_span_Billing"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Billing") %></span></a></li>
                        <li class="outages" id="module5" runat="server" visible="false"><a href="<%=string.Format("{0}/outages.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="OUTAGES" globalize="ML_HeaderMenu_span_Outages"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Outages") %></span></a></li>
                        <li class="nitiF" id="module6" runat="server" visible="false"><a href="<%=string.Format("{0}/Notification-Inbox.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="NOTIFICATIONS" globalize="ML_HeaderMenu_span_Notification"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Notification") %></span></a></li>
                         <li class="cs" id="module8" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Compare) %>"><a href="<%=string.Format("{0}/compare-spending.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="COMPARE" globalize="ML_HeaderMenu_span_Comparespending"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Comparespending") %></span></a></li>
                         <li class="connect" id="module4" runat="server" visible="false"><a href="<%=string.Format("{0}/connect-me.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="CONNECT ME" globalize="ML_HeaderMenu_span_ConnectMe"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_ConnectMe") %></span></a></li>
                        <li class="service" id="module7" runat="server" visible="false"><a href="<%=string.Format("{0}/service-request.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="SERVICE" globalize="ML_HeaderMenu_span_Service"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Service") %></span></a></li>
                        <li class="efficency" id="module11" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Efficiency) %>"><a href="<%=string.Format("{0}/programs.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="EFFICIENCY" globalize="ML_DASHBOARD_Lbl_EnergyEfficiency"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_EnergyEfficiency") %></span></a></li>
                       
                         <li class="sh" id="module9" runat="server" visible="false">
                               <% if (string.Equals(CustomerPortal.SessionAccessor.ThermoStateVersion, "ladwp"))
               { %>
             <a href="<%=string.Format("{0}/Central_air_system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                              <% }
               else
               { %>
                 <a href="<%=string.Format("{0}/Central-air-system.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
              <% } %>  

                             <span title="SMART HOME" globalize="ML_HeaderMenu_span_SmartHome"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_SmartHome") %></span>
                     </a>

                        </li>
                        
                        <li class="ev" id="module10" runat="server" visible="false">
                             <%if (CustomerPortal.SessionAccessor.CustomerType == "Commercial")
                               {%>
                            <a href="<%=string.Format("{0}/charging-stations.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>">
                           <span title="ELECTRIC VEHICLE" globalize="ML_HeaderMenu_span_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_ElectricVehicle") %>
                            </span></a>
                             <%}
                            else {%>
                             <a href="<%=string.Format("{0}/"+CustomerPortal.common.GetEVLink,CustomerPortal.SessionAccessor.BaseUrl)%>">
                            <span title="ELECTRIC VEHICLE" globalize="ML_HeaderMenu_span_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_ElectricVehicle") %>
                            </span></a>
                            <%}%>
                        </li>
                        <li class="footprint" runat="server" id="module12" visible="false"><a href="<%=string.Format("{0}/GISGreenFootprint.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"><span title="FOOTPRINT" globalize="ML_HeaderMenu_span_FootPrint"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_FootPrint") %></span></a></li>
                        
                    </ul>
                </nav>

            </div>
            <div class="changing_nav" style="display: none">
                <%--Div is hidden as per suggestion of Manoj on 20th July 2015--%>
                <ul>

                    <li><a href="#" id="main" logosize="logo">
                        <img src="images/medium_a_icon.png" /></a></li>
                    <li><a href="#" id="main_large" logosize="logo_large">
                        <img src="images/large_a_icon.png" /></a></li>
                </ul>
            </div>
        </div>
    </div>
    <asp:HiddenField ID="hdnnavigationClass" runat="server" Value="main_small" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnlogosize" runat="server" Value="logo_small" ClientIDMode="Static" />
</header>
<!-- End header -->
