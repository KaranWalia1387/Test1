<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompareSpendingChart.ascx.cs" Inherits="CustomerPortal.UserControls.CompareSpending.CompareSpendingChart" %>
<%@ Register Src="~/UserControls/CompareSpending/ChartUI.ascx" TagPrefix="uc1" TagName="ChartUI" %>
<%@ Register Src="~/UserControls/CompareSpending/FooterUI.ascx" TagPrefix="uc1" TagName="FooterUI" %>
<%@ Register Src="~/UserControls/CompareSpending/HeaderUI.ascx" TagPrefix="uc1" TagName="HeaderUI" %>


<div>
    <uc1:HeaderUI runat="server" ID="HeaderUI" />
    <uc1:ChartUI runat="server" ID="ChartUI" />
    <uc1:FooterUI runat="server" ID="FooterUI" />
</div>

