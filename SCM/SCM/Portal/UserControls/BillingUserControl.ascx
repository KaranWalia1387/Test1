<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BillingUserControl.ascx.cs"
    Inherits="CustomerPortal.UserControls.BillingUserControl" %>
    
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="BillingIcon">
            &nbsp;</div>
        <div class="TableCellHeaderTitle">
            <a href="BillingDashboard.aspx">Billing</a></div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div id="MyAccountBilling" style="text-align: left; height:162px; overflow:auto; ">
            <div class="GridTableLabel OddColor">
                Total Current Charges</div>
            <div class="GridTableColon OddColor ">
                :</div>
            <div class="GridTableData OddColor GridTableDataAmount">
                <asp:Label ID="lbltotalBill" runat="server" Text="N/a"></asp:Label></div>
            <div class="GridTableLabel EvenColor">
                Previous Balance Due</div>
            <div class="GridTableColon EvenColor ">
                :</div>
            <div class="GridTableData EvenColor GridTableDataAmount">
                <asp:Label ID="lalPbalnce" runat="server" Text="N/a"></asp:Label></div>

              <div class="GridTableLabel OddColor">
                Late Payment/Penalty Charges</div>
            <div class="GridTableColon OddColor ">
                :</div>
            <div class="GridTableData OddColor GridTableDataAmount">
                <asp:Label ID="lblpcharg" runat="server" Text="N/a"></asp:Label></div>




            <div class="GridTableLabel EvenColor">
                Amount Paid This Period</div>
            <div class="GridTableColon EvenColor ">
                :</div>
            <div class="GridTableData EvenColor GridTableDataAmount">
                <asp:Label ID="lblamount" runat="server" Text="N/a"></asp:Label></div>
            <div class="GridTableLabel OddColor">
                Total Amount Due</div>
            <div class="GridTableColon OddColor ">
                :</div>
            <div class="GridTableData OddColor GridTableDataAmount">
                <asp:Label ID="lblPwrDue" runat="server" Text="N/a"></asp:Label>
            </div>
        </div>
    </div>
    <div class="TableCellContainerFooter">
        &nbsp;</div>
</div>
