<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FooterUI.ascx.cs" Inherits="CustomerPortal.UserControls.CompareSpending.FooterUI" %>
<script type="text/javascript">
    $(document).ready(function () {
        $("#FooterData").css("display", "none");
    });
    $(window).load(function () {
        $('#page_loader').hide(); $("#FooterData").css("display", "none");


    });
</script>
<div id="FooterData"  style="clear: both;display:none">
<div style="padding: 10px 10px 0px; border-top: 1px solid #dadada; text-align: left; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareSummary) %> !important" >
   <div class="SummaryTitle" style="color: #53565a;" globalize="ML_CompareSpending_div_lblSummary">
        <%= CustomerPortal.Translator.T("ML_CompareSpending_div_lblSummary") %>
    </div>
    <label class="summaryLabel" globalize="ML_CompareSpending_lblYourUsage">
        <%= CustomerPortal.Translator.T("ML_CompareSpending_lblYourUsage") %></label>

    <asp:Label ID="lbUsageSoFar" runat="server" CssClass="summaryData" ClientIDMode="Static"></asp:Label>
    <div id="divusage">
    </div>

    <label class="summaryLabel" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingBudgetMyBill) %>!important">
        <span globalize="ML_CompareSpending_lblYourBudget"> <%= CustomerPortal.Translator.T("ML_CompareSpending_lblYourBudget") %></label> </span>: <b><a href="BudgetBill.aspx" style="margin-left: 0px;" globalize="ML_Compare_Anchor_SET"><%= CustomerPortal.Translator.T("ML_Compare_Anchor_SET") %></a></b></label>

    <%--</div>--%>
    <asp:Label ID="lblBudgut" runat="server" CssClass="summaryData" ClientIDMode="Static"></asp:Label>

    <div id="divBudget" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingBudgetMyBill) %>!important">
    </div>


    <label style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>!important" class="summaryLabel" globalize="ML_CompareSpending_lblProjectedUsage">
        <%= CustomerPortal.Translator.T("ML_CompareSpending_lblProjectedUsage") %></label>

    <label style="float: right; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>!important" id="lblgeExpetedUsage" clientidmode="Static" cssclass="summaryData"></label>

    <div id="divExpectedUsage" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage) %>!important">
    </div>
    
</div>
</div>
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnUsageSoFar" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnBudgut" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnExpetedUsage" />