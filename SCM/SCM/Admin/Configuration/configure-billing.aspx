<%@ Page Title="Billing" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-billing.aspx.cs" Inherits="AdminPanel.configure_billing" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <style>
        .billingchkbox {
            width: 15px;
        }
    </style>
    <script>
        $(document).ready(function () {
            var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
            var userUsageRights = userRights.indexOf('<%=UserRights.BillingReadOnly%>') >= 0 && userRights.indexOf('<%=UserRights.BillingAccess%>') < 0;
            if (userUsageRights) {
                $('input[type=checkbox]').attr('disabled', 'true');
                $('input[type=radio]').attr('disabled', 'true');
                $("input[type=button]").hide();
            }
        });
    </script>
    <script src="../js/configure-billing.js"></script>
    <script>
        $(document).ready(function () {
            $(".divGasBill input:checkbox").change(function () {
                var total = $(".divGasBill input:checkbox").length;
                var checkedlength = $(".divGasBill input:checkbox:checked").length;
                if (total = checkedlength) {
                    $("#chkGasBill").prop('checked', true);
                }
                else if (checkedlength == 0) {
                    $("#chkGasBill").prop("checked", false);
                }
                else if (checkedlength >= 1) {
                    $("#chkGasBill").prop('checked', true);
                }
            });
            $(".divWaterBill input:checkbox").change(function () {
                var total = $(".divWaterBill input:checkbox").length;
                var checkedlength = $(".divWaterBill input:checkbox:checked").length;
                if (total == checkedlength) {
                    $("#WtrBillChk").prop('checked', true);
                }
                else if (checkedlength == 0) {
                    $("#WtrBillChk").prop('checked', false);
                }
                else if (checkedlength >= 1) {
                    $("#WtrBillChk").prop('checked', true);
                }

            });
            $(".divSolidWasteBill input:checkbox").change(function () {
                var total = $(".divSolidWasteBill input:checkbox").length;
                var checkedlength = $(".divSolidWasteBill input:checkbox:checked").length;
                if (total == checkedlength) {
                    $("#SolidBillChk").prop('checked', true);
                }
                else if (checkedlength == 0) {
                    $("#SolidBillChk").prop('checked', false);
                }
                else if (checkedlength >= 1) {
                    $("#SolidBillChk").prop('checked', true);
                }
            });
            $(".divPowerBilling input:checkbox").change(function () {
                var total = $(".divPowerBilling input:checkbox").length;
                var checkedlength = $(".divPowerBilling input:checkbox:checked").length;
                if (total == checkedlength) {
                    $("#PwrBillingChk").prop('checked', true);
                }
                else if (checkedlength == 0) {
                    $("#PwrBillingChk").prop('checked', false);
                }
                else if (checkedlength >= 1) {
                    $("#PwrBillingChk").prop('checked', true);
                }
            });

            $("#txtMaxPaymentAmount").change(function () {
                var maxPayMentAmmount = $("#txtMaxPaymentAmount").val();
                if (maxPayMentAmmount != "") {
                    if (Number(maxPayMentAmmount) > 999) {
                        $("#txtMaxPaymentAmount").val('');
                        $("#txtMaxPaymentAmount").focus();
                        alert("Maximum payment amount is 999");
                    }

                }
            });
            $("#txtProcessingFee").change(function () {
                var maxProcessingFee = $("#txtProcessingFee").val();
                if (maxProcessingFee != "") {
                    if (Number(maxProcessingFee) > 99) {
                        $("#txtProcessingFee").val('');
                        $("#txtProcessingFee").focus();
                        alert("Maximum processing fee is 99");
                    }

                }
            });
        });
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_billing" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Billing</h2>
        </div>
    </div>

    <div class="billing_inner_box">
        <div style="display: none">
            <div class="billing_left_box billing_show_modules">
                <h5>
                    <asp:CheckBox ID="PwrBillingChk" runat="server" CssClass="PwrBillingChk" ClientIDMode="Static" />
                    Power Billing</h5>

                <div id="divPowerBilling" runat="server" class="divPowerBilling">
                </div>
                <h5>
                    <asp:CheckBox ID="chkGasBill" runat="server" CssClass="GasBillChk" ClientIDMode="Static" />
                    Gas Bill</h5>

                <div id="divGasBill" runat="server" class="divGasBill"></div>
            </div>
            <div class="billing_right_box">
                <h5>
                    <asp:CheckBox ID="SolidBillChk" runat="server" CssClass="SolidBillChk" ClientIDMode="Static" />Solid Waste Bill</h5>


                <div id="divSolidWasteBill" runat="server" class="divSolidWasteBill"></div>

                <h5>
                    <asp:CheckBox ID="WtrBillChk" runat="server" CssClass="WtrBillChk" ClientIDMode="Static" />
                    Water Bill</h5>

                <div id="divWaterBill" runat="server" class="divWaterBill"></div>
                <h5>Show Modules</h5>
                <ul class="showhide_module">
                    <li>
                        <%--Changed text from Dispute My Bill to Billing Queries--%>
                        <asp:CheckBox ID="chkDisputeMyBill" runat="server" ClientIDMode="Static" />
                        Billing Queries</li>
                    <%--<li >
                        <asp:CheckBox ID="chkConnectme" runat="server" ClientIDMode="Static" />
                        Show Connect Me</li>--%>
                    <li>
                        <asp:CheckBox ID="chkBudgetMyBill" runat="server" ClientIDMode="Static" />
                        Budget My Bill</li>
                </ul>
            </div>
        </div>
        <%--Added by Abhilash Jha--%>
        <div class="billing_right_box mang_billing_cnfg">
            <h5>Manage Billing</h5>

            <div class="max_pay_amt" style="background: #f7f7f7;">
                <span>Maximum Payment Amount</span>
                <asp:TextBox ID="txtMaxPaymentAmount" runat="server" MaxLength="5" ClientIDMode="Static" onkeypress="javascript:return validateFloatKeyPress(this,event)"></asp:TextBox>
            </div>
            <div class="max_pay_pro_fee" style="background: #f7f7f7;">
                <span>Manage Payment Processing Fee</span>
                <asp:CheckBox ID="chkProcessingFee" runat="server" ClientIDMode="Static" />
                <asp:TextBox ID="txtProcessingFee" runat="server" MaxLength="4" ClientIDMode="Static" Style="float: right; margin-right: 11px; width: 105px;" onkeypress="javascript:return validateFloatKeyPress(this,event)"></asp:TextBox>
            </div>

            <div class="max_pay_amt">
                <span>Payment Deferral Days</span>
                <asp:TextBox ID="txtPaymentDeferralDays" runat="server" MaxLength="2" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
            </div>


        </div>
        <%--End Comment--%>
        <%--<div class="billing_right_box">
            <h5> <asp:CheckBox ID="SolidBillChk" runat="server" CssClass="SolidBillChk" ClientIDMode="Static" />Solid Waste Bill</h5>
            
              
                        <div id="divSolidWasteBill" runat="server" class="divSolidWasteBill"></div>
                    
                <h5><asp:CheckBox ID="WtrBillChk" runat="server" CssClass="WtrBillChk" ClientIDMode="Static" />
                Water Bill</h5>
               
                        <div id="divWaterBill" runat="server" class="divWaterBill"></div>
                   
        </div>--%>
    </div>
    <center style="text-align: right;">
            <input id="btnSaveSetting"  value="Save" class="DefaultBtn btnSaveSetting"  title="Save Setting" type="button"/></center>


</asp:Content>
