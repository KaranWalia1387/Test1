<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="power-usage.ascx.cs"
    Inherits="CustomerPortal.UserControls.power_usage" %>

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
    <%--<h3  globalize="ML_POWERUSAGE_h3_PowerUSAGE">Power</h3>--%>
    <div style="display: none;">
        <%--<span style="color: #259f9e;font-weight: bold;">Current Usage</span><span><b><asp:Label ID="lblCurrentUsage" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblCurrentUsage"></asp:Label></b></span>
    <span style="color: #259f9e;font-weight: bold;">Projected Usage</span><span><b><asp:Label ID="lblEstimatedUsage" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblEstimatedUsage"></asp:Label></b></span>--%>
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

    <%--<div class="white_div" style="margin-left: 10px;">
        <div class="left-area-tabular" globalize="ML_PU_div_CU">Current Usage</div>
        <div class="right-area-tabular">
            <asp:Label ID="Label2" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblCurrentUsage"></asp:Label>
        </div>
    </div>
    <div class="gray_div" style="margin-left: 10px; width:99%;">
        <div class="left-area-tabular" globalize="ML_Usage_Lbl_ProjectedUsage">Projected Usage</div>
        <div class="right-area-tabular">
            <asp:Label ID="lblEstimatedUsage" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblEstimatedUsage"></asp:Label>
        </div>
    </div>--%>
    <div style="float: right; width: 38%;">
        <p>
            <span class="GraphLegend_low"></span>
            <span class="GraphLegend_data_low" globalize="ML_POWERUSAGE_LBL_LowUsage"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_LBL_LowUsage") %></span>
            <span class="GraphLegend_Avg"></span>
            <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1"><%= CustomerPortal.Translator.T("ML_WU_AverageUsage1") %></span>
            <span class="GraphLegend_High"></span>
            <span class="GraphLegend_data_low" globalize="ML_POWERUSAGE_LBL_HighUsage"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_LBL_HighUsage") %></span>
        </p>
    </div>

</div>
<div class="TableCellContainer" id="UC_Power_EnergyEfficiency" runat="server" visible="false">
    <div class="TableCellContainerHeader">
        <div class="EnergyEfficencyIcon">
            &nbsp;
        </div>
        <div class="TableCellHeaderTitle">
            <asp:HyperLink ID="lnkEE" runat="server" Text="Power Bill Discounts"></asp:HyperLink>
        </div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div style="text-align: center; margin-top: 10px; font-size: 1em;">
            <div style="width: 100px; float: left; text-align: left; padding-left: 15px; margin-top: 20px;">
            </div>
            <div style="width: 180px; float: left; text-align: left; padding-right: 15px; line-height: 25px; padding-top: 30px;">
                Receive monthly power bill discounts on qualified medical equipment.
            </div>
            <div class="clear">
                &nbsp;
            </div>
        </div>
    </div>
    <div class="TableCellContainerFooter">
        &nbsp;
    </div>
</div>
