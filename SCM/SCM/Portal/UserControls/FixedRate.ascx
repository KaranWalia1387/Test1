<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FixedRate.ascx.cs" Inherits="CustomerPortal.UserControls.FixedRate" %>
<style type="text/css">
    .UsageRateImg
    {
        width: 220px;
        margin: 0px auto;
    }

        .UsageRateImg img
        {
            height: 29px;
            margin: 0px 10px;
            float: left;
        }
</style>
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="BillRatesIcon">
            &nbsp;
        </div>
        <div class="TableCellHeaderTitle" globalize="ML_WU_Lbl_Rates">
            Rates</div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div class="single">
            <br />
            <b globalize="ML_FixedRate_b_CurrentTime">&nbsp;&nbsp;Current Time:</b> &nbsp;<asp:Label ID="currenttime" runat="server" Text="Label"></asp:Label><br /> 
            <b globalize="ML_FixedRate_b_FixedRate">&nbsp;&nbsp;Fixed Rate:</b> &nbsp;$<asp:Label ID="currentrate" runat="server" Text="Label"></asp:Label>
        </div>
    </div>
    <div class="TableCellContainerFooter" style="padding: 3px;">
        <b globalize="ML_FixedRate_b_CurrentPlan">Current Plan :</b> Fixed
    </div>
</div>
