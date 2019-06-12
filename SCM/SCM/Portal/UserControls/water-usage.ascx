<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="water-usage.ascx.cs"
    Inherits="CustomerPortal.UserControls.water_usage" %>

<style type="text/css">
    .curent_usage_line
    {
        text-align: left;
        line-height: 44px;
        padding-left: 10px;
    }

    .curent_usage_line span
    {
        padding-right:10px;
    }

</style>

<div runat="server" visible="true" id="UC_Water"  class="curent_usage_line" style="float:left; width:50% !important;">
    <span globalize="ML_WaterUsage_div_CU" style="color: #93d502;font-weight: bold;"><%= CustomerPortal.Translator.T("ML_WaterUsage_div_CU") %></span><span><b><asp:Label ID="lblCrtUsage" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblCurrentUsage"></asp:Label></b></span>
    <span globalize="ML_Usage_Lbl_ProjectedUsage" style="color: #93d502;font-weight: bold;"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_ProjectedUsage") %></span><span><b><asp:Label ID="lblEstiUsage" runat="server" Text="N/a" globalize="ML_PowerUSAGE_LBL_lblEstimatedUsage"></asp:Label></b></span>
    <%--<h3 globalize="ML_WU_li_Power">Power</h3>--%>
    <%--<div class="white_div" style="margin-left: 10px;">
        <div class="left-area-tabular"  globalize="ML_WaterUsage_div_CU">Current Usage</div>
        <div class="right-area-tabular">
            <asp:Label ID="lblCrtUsage" runat="server" Text="N/a"></asp:Label>
        </div>
    </div>
    <div class="gray_div" style="margin-left: 10px;">
        <div class="left-area-tabular"  globalize="ML_Usage_Lbl_ProjectedUsage">Projected Usage</div>
        <div class="right-area-tabular">
             <asp:Label ID="lblEstiUsage" runat="server" Text="N/a"></asp:Label>
        </div>
    </div>--%>
</div>
<div id="UC_Water_EnergyEfficiency" class="TableCellContainer" runat="server" visible="false">
    <div class="TableCellContainerHeader">
        <div class="EnergyEfficencyIcon">
            &nbsp;</div>
        <div class="TableCellHeaderTitle">
            <asp:HyperLink ID="lnkEE" runat="server" Text="Power Bill Discounts"></asp:HyperLink>
        </div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div style="text-align: center; margin-top: 10px; font-size: 1em;">
            <div style="width: 100px; float: left; text-align: left; padding-left: 15px; margin-top: 20px;">
                <img src="images/EE_icon.png" style="width: 90px;"></div>
            <div style="width: 180px; float: left; text-align: left; padding-right: 15px; line-height: 25px;
                padding-top: 30px;" globalize="ML_PU_div_ME">
                <%= CustomerPortal.Translator.T("ML_PU_div_ME") %></div>
            <div class="clear">
                &nbsp;</div>
        </div>
    </div>
    <div class="TableCellContainerFooter">
        &nbsp;</div>
</div>
