<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Dispute_Bill.ascx.cs"
    Inherits="CustomerPortal.Dispute_Bill" %>
<style>
    .DisputeBillLinking{padding:20px 30px 0px;}
.DisputeBillLink{margin-bottom:15px;}
</style>
<script type="text/javascript">
    $(document).ready(function () {
        //$('#popuplink').click(function () {

        //    Popup.showModal('paymentpopup', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });

        //});
        //$('#btnClose').click(function () {
        //    Popup.hide('paymentpopup');
        //});
    });
</script>
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="BillIcon">
            &nbsp;</div>
        <div class="TableCellHeaderTitle">
            <a href="BillingDashboard.aspx">Billing</a></div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div id="MyAccountUsage" class="DisputeBillLinking">
            <div id="divDispute" runat="server" style="display: none;">
                <div class="DisputeBillLink">
                    <div class="DisputeBillIcon">
                        &nbsp;</div>
                    <a href="connect-me.aspx?pid=d" class="TableCellHeaderTitle">Dispute My Bill</a>
                    <div class="clear">
                        &nbsp;</div>
                </div>
            </div>
            <div id="divBudget" runat="server" style="display: none;">
                <div class="DisputeBillLink">
                    <div class="BudgetBillIcon" style="margin-left: 6px;">
                        &nbsp;</div>
                    <a href="BudgetMyBill.aspx" class="TableCellHeaderTitle">Budget My Bill</a>
                    <div class="clear">
                        &nbsp;</div>
                </div>
            </div>
            <div id="divmyaccount" runat="server" style="display: none;">
                <div class="DisputeBillLink">
                    <div class="MyAccountIcon" style="margin-left: 6px;">
                        &nbsp;</div>
                    <a href="Account.aspx" class="TableCellHeaderTitle">My Account</a>
                    <div class="clear">
                        &nbsp;</div>
                </div>
            </div>
            <div id="divPaymentLocations" runat="server">
                <div class="DisputeBillLink">
                    <div class="BillingIcon" style="margin-left: 6px;">
                        &nbsp;
                    </div>
                    <%--<a id="popuplink" href="#" class="TableCellHeaderTitle">Payment Location</a>--%>
                    <a id="popuplink" href="#" onclick="openfancybox('PaymentLocations.aspx','70%')" class="TableCellHeaderTitle">Payment Location(s)</a>
                    <div class="clear">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<div id="paymentpopup" style="display: none; width: 700px; height: 490px; position:absolute; top:0 !important; left:0 !important; right:0; bottom:0; margin:auto;">
        <div>
            <input type="button" id="btnClose" value="" class="popCloseBtn" style="margin-top: -40px;margin-right: -25px;">
        </div>
        <div style="overflow: auto; float: left;width:742px; margin-left:-20px; height:490px;">
            
        </div>
    </div>--%>
    <div class="TableCellContainerFooter">
        &nbsp;</div>
</div>
