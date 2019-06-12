<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="usage-demand-response.ascx.cs" Inherits="CustomerPortal.UserControls.usage_demand_response" %>


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

<div class="curent_usage_line" style="float: right; padding: 10px 0; width: 100% !important;display:none">    
    <div style="display: none;">
       
    </div>
    <div style="float: left; width: 50%;">
        <div class="add-card" style="width: 24%; float: left; padding: 0.9% 0% 0 3.5% !important;"><a onclick="openfancyboxrate('usagechartdiv')" href="#" style="color: #fff; background: #3772af; padding: 5px; border-radius: 1px; margin-top: 5px;">Rates</a></div>
        <div class="compare_month" style="float: left; width: 50%;">
            <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="~/images/table-export.png" ClientIDMode="Static" />
            <div style="margin-top: -25px; margin-left: 35px;">
                <asp:LinkButton ID="lnkExporttoExcel" runat="server" globalize="ML_POWERUSAGE_LBL_ExporttoExcel" Text="Export to Excel" ClientIDMode="Static"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_LBL_ExporttoExcel") %></asp:LinkButton>
            </div>
        </div>


    </div>   
    <div style="float: right; width: 38%;">
        <p>
            <span class="GraphLegend_low"></span>
            <span class="GraphLegend_data_low" globalize="ML_POWERUSAGE_LBL_LowUsage">Low Usage</span>
            <span class="GraphLegend_Avg"></span>
            <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1">Average Usage</span>
            <span class="GraphLegend_High"></span>
            <span class="GraphLegend_data_low" globalize="ML_POWERUSAGE_LBL_HighUsage">High Usage</span>
        </p>
    </div>

</div>

