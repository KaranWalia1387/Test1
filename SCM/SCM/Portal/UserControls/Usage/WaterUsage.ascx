<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WaterUsage.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.WaterUsage" %>
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
        .power_graph_heading.power_graph_spanish {
            margin-left: -2% !important;
        }
        ul.calender_usages li {
            overflow:visible;
        }
      
    @media only screen and (min-width: 991px) and (max-width:1024px) {
          #showWeatherOverlay.wthr_usages {
             margin-left: -18px !important;
        }
        .currency_1_mob ul.calender_usages#usageMapMode {
            width: 30% !important;
        }
    }
    @media only screen and (min-width: 320px) and (max-width:767px) {
        .power_graph_heading.power_graph_spanish {
            display: none;
            }
        #usageMapMode {
            top: 6px;
        }
        .currency ul li a.active[mode="B"] {
            text-indent: -9px !important;
        }
        }
</style>

<div class="current_area">
    <uc1:HeaderUsageUI runat="server" id="HeaderUsageUI" />
    <uc1:ChartUsageUI runat="server" id="ChartUsageUI" />
    <uc1:FooterUsageUI runat="server" id="FooterUsageUI" />
</div>
