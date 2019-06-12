<%@ Page Title="Payment Options" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="PaymentOption.aspx.cs" Inherits="AdminPanel.PaymentOption" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/configure-paymentoption.js"></script>

    <style type="text/css">
        .check_pay_opt {
            margin-bottom: 10px;
            border-bottom: 1px solid #F7F7F7;
            font-size: 15px;
            padding-left: 20px;
            line-height: 32px;
        }

            .check_pay_opt table tr td {
                padding-left: 10px;
                padding-right: 30px;
            }

        .payment_option_box {
            width: 100%;
            float: left;
            padding-left: 21px;
            padding-top: 14px;
        }

            .payment_option_box input[type="text"] {
                border: 1px solid #999999;
                color: #616161;
                font-size: 98.3%;
                margin-bottom: 10px;
                padding: 3px 6px 4px;
                width: 93%;
                line-height: 15px;
            }

        .sbt_wrapper {
            text-align: right;
            border-top: 1px solid #F7F7F7;
            float: right;
            width: 100%;
            margin-top: 20px;
        }

        .FLeft_Area {
            float: left;
            padding-right: 10px;
            margin: 0px 0px 0px 0px;
        }

        .usage-area-section ul {
            float: left;
            margin: 0px;
        }

        input[type="radio"], input[type="checkbox"] {
            line-height: normal;
            margin: 4px 5px 0 0;
        }
    </style>
    <%--<script src="../js/configure-billing.js"></script>--%>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#Paypal").hide();
            $("#Pace").hide();

            $(".check_pay_opt table tbody tr td input[type='radio']").click(function () {
                var checkid = $(this).attr('Value');
                if ($(this).prop('checked')) {
                    $(".check_pay_opt table tbody tr td input[type='radio']").prop('checked', false);
                    $("#Authorize").hide();
                    $("#Paypal").hide();
                    $("#Pace").hide();
                    $(this).prop('checked', true);

                    //alert('yes' + "|" + checkid);
                    if (checkid == "Authorize") {
                        $("#Authorize").show();
                    }
                    else if (checkid == "Paypal") {
                        $("#Paypal").show();
                    }
                    else if (checkid == "Pace") {
                        $("#Pace").show();
                    }
                }
                else {
                    $(this).prop('checked', true);
                    //alert($(".check_pay_opt table tbody tr td input[type='checkbox'][checked='checked']").length);
                    ////alert('no' + "|" + checkid);
                    //if (checkid == "Authorize")
                    //    $("#Authorize").slideUp();
                    //else if (checkid == "Paypal")
                    //    $("#Paypal").slideUp();
                    //else if (checkid == "Pace")
                    //    $("#Pace").slideUp();
                }
            });

            $(".grid-section .usage-area-section ul li input[type='radio']").click(function () {
                var value = $(this).attr('Value');
                if ($(this).prop('checked')) {
                    if (value == 1) {
                        $(".internal").hide(500);
                        $(".external").show(500);
                    }
                    else if (value == 0) {
                        $(".internal").show(500);
                        $(".external").hide(500);
                    }
                }
            });

            $("#txtMaxPaymentAmount").change(function () {
                var maxPayMentAmmount = $("#txtMaxPaymentAmount").val();
                if (maxPayMentAmmount != "") {
                    if (Number(maxPayMentAmmount) > 99999) {
                        $("#txtMaxPaymentAmount").val('');
                        $("#txtMaxPaymentAmount").focus();
                        alert("Maximum payment amount is $99999");
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
    <input type="hidden" class="activeli_list" value="sidebar_PaymentOption" />
    <div class="top-header-area">
        <h2>Payment Options</h2>
    </div>
    <div class="grid-section" style="margin: -4px 0px 0px 0px; padding: 0px 0px 0px; background: #fff; clear: both;">
        <div class="usage-area-section" style="padding: 14px 0px 0px 14px; display: table; width: 100%; border-bottom: 2px solid #ebebeb;">
            <span class="FLeft_Area" style="padding-left: 13px;">Pay Mode Link : </span>
            <ul>
                <li>
                    <asp:RadioButton ID="rdInternal" runat="server" Checked="true" Text=" Internal" GroupName="Link" value="0" ClientIDMode="Static" />
                </li>
                <li>
                    <asp:RadioButton ID="rdExternal" runat="server" Text=" External" GroupName="Link" value="1" ClientIDMode="Static" />
                </li>
            </ul>
        </div>
    
    <div class="internal">
        <div class="check_pay_opt">
            <asp:RadioButtonList ID="chkPayOptions" ClientIDMode="Static" RepeatDirection="Horizontal" runat="server">
                <asp:ListItem Text="Authorize" Value="Authorize"></asp:ListItem>
                <asp:ListItem Text="Paypal" Value="Paypal"></asp:ListItem>
                <asp:ListItem Text="Pace" Value="Pace"></asp:ListItem>
            </asp:RadioButtonList>
            <%--<asp:CheckBoxList ID="chkPayOptions" ClientIDMode="Static" RepeatDirection="Horizontal" runat="server">
            <asp:ListItem Text="Authorize" Value="Authorize"></asp:ListItem>
            <asp:ListItem Text="Paypal" Value="Paypal"></asp:ListItem>
            <asp:ListItem Text="Pace" Value="Pace"></asp:ListItem>
        </asp:CheckBoxList>--%>
        </div>

        <div class="payment_option_box" id="Authorize">
            <div class="col-lg-2 col-md-2 col-sm-2">API Login ID</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtApiLoginID" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2">API Transaction Key</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtApiTransactionKey" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
        </div>
        <div class="payment_option_box" id="Paypal">
            <div class="col-lg-2 col-md-2 col-sm-2">Client ID</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtClientID" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2">Client Secret</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtClientSecret" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
        </div>
        <div class="payment_option_box" id="Pace">
            <div class="col-lg-2 col-md-2 col-sm-2">Acct ID</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtAcctID" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
            <%--<div class="col-lg-2 col-md-2 col-sm-2">  SubID</div>
          <div class="col-lg-4 col-md-4 col-sm-4">     <asp:TextBox ID="txtSubID" runat="server"></asp:TextBox></div>--%>
            <div class="col-lg-2 col-md-2 col-sm-2">Merchant Pin</div>
            <div class="col-lg-4 col-md-4 col-sm-4">
                <asp:TextBox ID="txtMerchantPin" Enabled="false" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
        </div>


        <div class="top-header-area">
            <h2>Manage Billing</h2>
        </div>
        <%--<h5> Manage Billing</h5>--%>
        <div class="billing_right_box mang_billing_cnfg">
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


    </div>
    <div class="external" style="display:none;">
        <div class="payment_option_box">
            <div class="col-lg-3 col-md-2 col-sm-12">External Payment Link</div>
            <div class="col-lg-7 col-md-7 col-sm-12">
                <asp:TextBox ID="txtExternalLink" runat="server" ClientIDMode="Static"></asp:TextBox>
            </div>
        </div>
    </div>
        </div>
    <div class="sbt_wrapper">
        <input type="button" title="Submit" class="submitBtn" value="Submit" />
    </div>
</asp:Content>
