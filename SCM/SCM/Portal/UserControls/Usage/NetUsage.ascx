<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NetUsage.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.NetUsage" %>
<%@ Register Src="~/UserControls/Usage/HeaderUsageUI.ascx" TagPrefix="uc1" TagName="HeaderUsageUI" %>
<%@ Register Src="~/UserControls/Usage/ChartUsageUI.ascx" TagPrefix="uc1" TagName="ChartUsageUI" %>
<%@ Register Src="~/UserControls/Usage/FooterUsageUI.ascx" TagPrefix="uc1" TagName="FooterUsageUI" %>
<style type="text/css">
    .curent_usage_line {
        text-align: left;
        line-height: 17px;
        padding-left: 10px;
    }

        .curent_usage_line span {
            padding-right: 10px;
        }
</style>
<div class="current_area">
    <uc1:HeaderUsageUI runat="server" id="HeaderUsageUI" />
    <uc1:ChartUsageUI runat="server" id="ChartUsageUI" />
    <uc1:FooterUsageUI runat="server" id="FooterUsageUI" />
</div>
