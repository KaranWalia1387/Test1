<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HeaderUsageUI.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.HeaderUsageUI" %>
<link rel="stylesheet/less" type="text/css" href="//semantic-ui.com/src/definitions/elements/container.less">

<div class="current_area" id="GenDiv" style="display: none">
    <ul>
        <li id="monthlyAvg" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageMonthlyAverage) %>!important">
            <div class="average_usage_header">
                <span id="averageval" globalize="" title=""></span>
                <img src="images/arrow_down_img.png" style="display: none;" />
            </div>

            <i><i id="averagevaltext"></i>&nbsp;<i id="glbizeAverage"></i></i>
        </li>

        <li id="highestyear" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageHighestThisYear) %>!important">
            <span id="highestval"></span>
            <i><i id="ModeText" globalize=""></i></i>
        </li>

        <li id="soFarUsage" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageSoFar) %>!important"">
            <div style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageSoFar) %>!important">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblCurrentUsage" runat="server" globalize="ML_PowerUSAGE_LBL_lblCurrentUsage" ClientIDMode="Static"></asp:Label></span><img src="images/arrow_down_img.png" style="display: none;" />
                </div>
                <asp:Label ID="lblUnitThisMonth" runat="server"></asp:Label>
                <asp:Label ID="lblCurrentUsageH" runat="server"></asp:Label>
                <i globalize="ML_WU_SPAN_SO_FAR_THIS_MONTH" style="float: left;"><%= CustomerPortal.Translator.T("ML_WU_SPAN_SO_FAR_THIS_MONTH") %>
                </i>
                <span class="main container" style="width: 20px !important; float: left; margin: -17px 0 -5px 0;">
                    <i class="circle help link icon" data-html="" id="iLinkSoFar">
                        <span style="margin-left: 4px; font-size: 17px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-info-sign help_icon_img"></span>
                    </i>
                </span>
            </div>
        </li>

        <li id="projectedUsage" class="liprojectedusage" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>!important">
            <div style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>!important">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblEstimatedUsage" runat="server" globalize="ML_PowerUSAGE_LBL_lblEstimatedUsage" ClientIDMode="Static"></asp:Label>
                    </span>
                    <img src="images/arrow_up_img.png" style="display: none;" />
                </div>
                <asp:Label ID="lblUnitPrediction" runat="server"></asp:Label>
                <asp:Label ID="lblEstimatedUsageH" runat="server"></asp:Label>
                <i globalize="ML_WU_SPAN_PREDICTED_THIS" style="float: left;"><%= CustomerPortal.Translator.T("ML_WU_SPAN_PREDICTED_THIS") %></i>
                <span class="main container" style="width: 20px !important; float: left; margin: -17px 0 -5px 0;">
                    <i class="circle help link icon" data-html="" id="iLinkProjected">
                        <span style="margin-left: 4px; font-size: 17px; position: relative; padding-right: 10px; float: left; " class="glyphicon glyphicon-info-sign help_icon_img"></span>
                    </i>
                </span>

            </div>
        </li>

        <li id="MaxDemand" class="liprojectedusage" style="display:none">
            <div class="average_usage_header">
                <span>
                    <asp:Label ID="lblMaxDemand" runat="server" globalize="" ClientIDMode="Static"></asp:Label>
                </span>
            </div>
            <i id="MaxDemandVal"><%= CustomerPortal.Translator.T("ML_Usage_MaxDemand") %></i>

        </li>
        <li id="LoadFactor" class="liprojectedusage" style="display:none"">
            <div class="average_usage_header">
                <span>
                    <asp:Label ID="lblLoadFactor" runat="server" globalize="" ClientIDMode="Static"></asp:Label>
                </span>
            </div>
            <i id="LoadFactorVal" globalize="ML_Usage_LoadFactor"><%= CustomerPortal.Translator.T("ML_Usage_LoadFactor") %></i>

        </li>
    </ul>
</div>

<div class="current_area" id="WaterDiv" style="display: none">
    <ul>
        <li><span id="averagevalue" globalize="ML_POWERSOLAR_$" title=""></span>
            <i globalize="ML_Solar_SPAN_AVERAGE"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_AVERAGE") %></i>
        </li>

        <li><span id="highestvalue" globalize="ML_POWERSOLAR_$"></span>
            <i globalize="ML_Solar_SPAN_HIGHEST_THIS"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_HIGHEST_THIS") %> </i>
        </li>

        <li><span id="currentUsages" globalize="ML_POWERSOLAR_$" title="">
            <asp:Label ID="lblCurrentUsages" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
            <i globalize="ML_WU_SPAN_SO_FAR_THIS_MONTH"><%= CustomerPortal.Translator.T("ML_WU_SPAN_SO_FAR_THIS_MONTH") %></i>
        </li>

        <li><span id="estimatedUsages" globalize="ML_POWERSOLAR_$" title="">
            <asp:Label ID="lblEstimatedUsages" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
            <i globalize="ML_Solar_SPAN_PREDICTED_THIS"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_PREDICTED_THIS") %></i>
        </li>
    </ul>
</div>

<div style="display: none">
    <span globalize="ML_PowerUSAGE_span_Hourly" id="glblizeHourly"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Hourly") %></span>
    <span globalize="ML_PowerUSAGE_span_Daily" id="glblizeDaily"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Daily") %></span>
    <span globalize="ML_PowerUSAGE_span_Monthly" id="glblizeMonthly"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Monthly") %></span>
    <span globalize="ML_PowerUSAGE_span_Yearly" id="glblizeYearly"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_Yearly") %></span>
    <span globalize="ML_PowerUSAGE_span_15MINAVG" id="glblize15min"><%= CustomerPortal.Translator.T("ML_PowerUSAGE_span_15MINAVG") %></span>

    <span globalize="ML_GASUSAGE_span_glblizeHour" id="glblizeHour"><%= CustomerPortal.Translator.T("ML_GASUSAGE_span_glblizeHour") %></span>
    <span globalize="ML_GASUSAGE_span_glblizeDay" id="glblizeDay"><%= CustomerPortal.Translator.T("ML_GASUSAGE_span_glblizeDay") %></span>
    <span globalize="ML_GASUSAGE_span_glblizeMonth" id="glblizeMonth"><%= CustomerPortal.Translator.T("ML_GASUSAGE_span_glblizeMonth") %></span>
    <span globalize="ML_WU_span_glblizeYear" id="glblizeYear"><%= CustomerPortal.Translator.T("ML_WU_span_glblizeYear") %></span>

</div>
<script>
    $(document).ready(function () {
       

        $('.liprojectedusage').each(function () {

            if ($('.liprojectedusage').css("display") == "none")
                $('#GenDiv.current_area ul li').css("width", "33.3%")
        });

    });
</script>
<asp:HiddenField ID="hdnDollarThisMonth" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnDollarPredicted" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnUnitThisMonth" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnUnitPrediction" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnLoadKwh" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnLoadDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMaxDemandkwh" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMaxDemandDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnCustomerType" runat="server" ClientIDMode="Static" />