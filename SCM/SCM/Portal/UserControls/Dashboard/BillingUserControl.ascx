<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BillingUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.BillingUserControl" %>

<%@ Import Namespace="CustomerPortal" %>

<script type="text/javascript">
      function viewpdf() {
        var accountno,param,url;      
        if ("<%=SessionAccessor.PaymentMode%>" == 1) accountno = "";
        else accountno = '<%=SessionAccessor.AccountNumber.ToString()%>';
        if(<%= CustomerPortal.SessionAccessor.IsExternalPaymentLink %>== "1"){
            url='<%=Convert.ToString(CustomerPortal.SessionAccessor.ExternalPaymentLink)%>';
        }else{
        param = common.GetEncryptedData("AccountNo=" + accountno + "&ctype=inline").value;
        url = "BillReport.aspx?EncQuery=" + param + "&EncType=A";
        }
        window.open(url, '_blank'); return false;
    }
    $(document).ready(function () {
        $('div.pay_bill a.pay_now').off('click').on('click', function () {
            if ($(this).attr('linktype') == "1") {
                return confirm($("#spnExternalRedirect").attr('title'));
            }
        });

    });
</script>

<div class="billing-area">
    <span id="balance_due" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_Balance") %></span>
    <span style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none"%>"><%= CustomerPortal.Translator.T("ML_PrepayBill_Msg_RemainingBal") %></span>

    <strong><%--<asp:Literal ID="lblTotalPayableAmount" runat="server"></asp:Literal>--%>
        <asp:Label ID="lblTotalPayableAmount" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label>
    </strong>
    <div style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
        <div id="dueDateData" style="display:block;" >
            <span><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DueDate") %>   </span>
            <asp:Label ID="lblDueDate" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label>
        </div>
        <div id="noData" style="display:none;">
            <span><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DueDate") %></span>
        </div>
    </div>
    <div class="billing_bottom_buttons">
        <div class="pay_bill" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPayBill) %>">
            <a class="pay_now" id="BtnPayBill" target="_blank" href='<%= CustomerPortal.SessionAccessor.IsExternalPaymentLink == "1" ? Convert.ToString(CustomerPortal.SessionAccessor.ExternalPaymentLink):"BillDashboard.aspx" %>' linktype="<%= CustomerPortal.SessionAccessor.IsExternalPaymentLink %>" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block" %>"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_PayBill") %></a>
            <a class="pay_now re_txt1" id="BtnRecharge" target="_blank" href='<%= CustomerPortal.SessionAccessor.IsExternalPaymentLink == "1" ? Convert.ToString(CustomerPortal.SessionAccessor.ExternalPaymentLink):"BillDashboard.aspx" %>' linktype="<%= CustomerPortal.SessionAccessor.IsExternalPaymentLink %>" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none" %>; position: relative; right: -68px; width: 120px;"><%= CustomerPortal.Translator.T("ML_PrepayBill_Msg_Recharge") %></a>
        </div>
        <div class="pay_bill" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingViewBill)%>">
             <a href='#' class="view_bill_style" onclick="return viewpdf();" ><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_ViewBill") %></a>
        </div>
    </div>
    <span globalize="ML_Billing_Msg_ExternalRedirect" id="spnExternalRedirect" style="display: none"></span>
</div>
