<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="gas-usage.ascx.cs" Inherits="CustomerPortal.UserControls.gas_usage" %>

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

<div id="UC_Gas" class="curent_usage_line" style="float:left; width:50% !important;">
    <%--<h3>Gas</h3>--%>
     <span globalize="ML_GasUsage_Div_CurrentUsage" style="color: #93d502;font-weight: bold;"><%= CustomerPortal.Translator.T("ML_GasUsage_Div_CurrentUsage") %></span><span><b><asp:Label ID="lblCrtUsage" runat="server" Text='<%# CustomerPortal.Translator.T("ML_PowerUSAGE_LBL_lblCurrentUsage") %>' globalize="ML_PowerUSAGE_LBL_lblCurrentUsage"></asp:Label></b></span>
    <span globalize="ML_Usage_Lbl_ProjectedUsage" style="color: #93d502;font-weight: bold;"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_ProjectedUsage") %></span><span><b><asp:Label ID="lblEstiUsage" runat="server" Text='<%# CustomerPortal.Translator.T("ML_PowerUSAGE_LBL_lblEstimatedUsage") %>' globalize="ML_PowerUSAGE_LBL_lblEstimatedUsage"></asp:Label></b></span>
    <%--<div class="white_div" style="margin-left: 10px;">
        <div class="left-area-tabular" globalize="ML_GasUsage_Div_CurrentUsage">Current Usage</div>
        <div class="right-area-tabular">
            <asp:Label ID="lblCrtUsage" globalize="ML_GasUsage_Lbl_UsageVal" runat="server" Text="N/a"></asp:Label>
        </div>
    </div>
    <div class="gray_div" style="margin-left: 10px;">
        <div class="left-area-tabular" globalize="ML_Usage_Lbl_ProjectedUsage">Projected Usage</div>
        <div class="right-area-tabular">
            <asp:Label ID="lblEstiUsage" globalize="ML_GasUsage_Lbl_ProjectedUsageVal" runat="server" Text="N/a"></asp:Label>
        </div>
    </div>--%>
</div>


<div id="UC_Gas_EnergyEfficiency" class="TableCellContainer" runat="server" visible="false">
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
                <img src="images/EE_icon.png" style="width: 90px;">
            </div>
            <div globalize="ML_PU_div_ME" style="width: 180px; float: left; text-align: left; padding-right: 15px; line-height: 25px; padding-top: 30px;">
               <%= CustomerPortal.Translator.T("ML_PU_div_ME") %>
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
