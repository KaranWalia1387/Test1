<%@ Page Title="Billing " Language="C#" MasterPageFile="BillingMaster.Master" AutoEventWireup="true"
    CodeBehind="BillDashboard.aspx.cs" Inherits="CustomerPortal.BillDashboard" %>

<%@ Import Namespace="CustomerPortal" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <script type="text/javascript">
        function viewpdf() {
            var isexternalview = '<% = Convert.ToString(CustomerPortal.SessionAccessor.IsExternalPaymentLink)%>';
              if (isexternalview == '1') {
                  if (confirm($('#spnExternalRedirect').text())) {
                    window.open('<% = Convert.ToString(CustomerPortal.SessionAccessor.ExternalPaymentLink)%>', '_blank');
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                var accountno = '<%=CustomerPortal.SessionAccessor.AccountNumber.ToString()%>';
                var param = common.GetEncryptedData("AccountNo=" + accountno + "&ctype=inline").value;
                var url = "BillReport.aspx?EncQuery=" + param + "&EncType=A";
                window.open(url, '_blank'); return false;
            }
        }

        $(document).ready(function () {

            if ($(".current_area ul li:visible").length == 2) {
                $(".current_area ul li").css('width', '50%');
            }

            $('#ddlPaymentInfo').change(function () {
                $("#CardDetails").css('display', 'block');
                if ($('#ddlPaymentInfo').val() == "-Select-") {
                    $("#CardDetails").css('display', 'none');
                }
                else {
                    $("#CardDetails").css('display', 'block');
                }

                $('#txtCardNumber').val($('#ddlPaymentInfo option:selected').val());
                $('#txtExpiryDate').val($('#ddlPaymentInfo option:selected').attr("CardExpDate"));
                $('#txtNameOnCard').val($('#ddlPaymentInfo option:selected').attr("NameOnCard"));
            });

            $('#btnpaypower').click(function () {
                $('#RechargeSuccess').css('display', 'none');
                $("#CardDetails").css('display', 'none');
                $(".bottom_area_home").css('display', 'block');
                $(".recharge").css('display', 'block');
                $('#txtCardNumber').val('');
                $('#txtExpiryDate').val('');
                $('#txtNameOnCard').val('');
                $('#ddlPaymentInfo option:eq(0)').prop('selected', true);
            });

            $('#btnpaypower').click(function () {
                if ($('#waterPay').val() != "") {
                    $('#txtWater').val($('#waterPay').val());
                    $('#txtWater').show();
                    $('#lblWater').show();
                }
                else {
                    $('#txtWater').hide();
                    $('#lblWater').hide();
                }

                if ($('#electricPay').val() != "") {
                    $('#txtElectric').val($('#electricPay').val());
                    $('#txtElectric').show();
                    $('#lblPower').show();
                }
                else {
                    $('#txtElectric').hide();
                    $('#lblPower').hide();
                }

                if ($('#solidPay').val() != "") {
                    $('#txtSolid').val($('#solidPay').val());
                    $('#txtSolid').show();
                    $('#lblSolidWaste').show();
                }
                else {
                    $('#txtSolid').hide();
                    $('#lblSolidWaste').hide();
                }

                if ($('#gasPay').val() != "") {
                    $('#txtGas').val($('#gasPay').val());
                    $('#txtGas').show();
                    $('#lblGas').show();
                }
                else {
                    $('#txtGas').hide();
                    $('#lblGas').hide();
                }
            });
            $('#btnRecharge').click(function () {

                if ($('#txtRechargeAmount').val() == "") {
                    error.showerror('#txtRechargeAmount', 'Please enter valid amount.');
                    return false;
                }
                if ($('#ddlPaymentInfo').val() == "-Select-") {
                    error.showerror('#ddlPaymentInfo', 'Please Select Card Details');
                    return false;
                }
                if ($("#ChkTerm").prop("checked") == false) {
                    error.showerror('#ChkTerm', 'Please check Term & Conditions');
                    return false;
                }
                if ($("#txtCVV").val() == "") {
                    error.showerror('#txtCVV', 'Please enter CVV.');
                    return false;
                }
                str = $('#billid').val() + "|";
                str += $('#ddlPaymentInfo option:selected').attr("CreditCardId");
                str += "|" + $('#txtRechargeAmount').val();
                var d = new Date();
                str += "|" + d;
                var parameter = {
                    str: str
                };

                $.ajax({
                    type: "POST",
                    url: "BillDashboard.aspx/PayBill",
                    data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError,
                    async: true
                });
                function OnSuccess(data, status) {
                    data = data.d;
                    var resultdata = $.parseJSON(data);
                    $('#RechargeSuccess').css('display', 'block');
                    $("#CardDetails").css('display', 'none');
                    $(".bottom_area_home").css('display', 'none');
                    $(".recharge").css('display', 'none');
                    $('#RecAmount').text('$' + $('#txtRechargeAmount').val());
                    location.reload();
                }

                function OnError(request, status, error) {

                }


            });


            //************************************** 
            $('#LinkButton1').click(function () {

                $.ajax({
                    type: "POST",
                    url: "BillDashboard.aspx/PayMentExtentionMethod",
                    //  data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError,
                    async: true
                });
                function OnSuccess(data, status) {
                    data = data.d;
                    var resultdata = $.parseJSON(data);
                    if (resultdata != '' && resultdata != null) {
                        toastr.error(resultdata);

                    }
                    //$('#RechargeSuccess').css('display', 'block');
                    //$("#CardDetails").css('display', 'none');
                    //$(".bottom_area_home").css('display', 'none');
                    //$(".recharge").css('display', 'none');
                    //$('#RecAmount').text('$' + $('#txtRechargeAmount').val());
                    //return false;
                }

                function OnError(request, status, error) {

                }


            });
            //**************************************



        });
    </script>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssBillDashboard") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsBillDashboard") %>

    <div class="top_conte_box_mob" style="height: 85%; overflow: auto;">
        <input type="hidden" class="activeli_list" value="billing" />

        <asp:HiddenField ID="waterPay" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="solidPay" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="electricPay" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="gasPay" runat="server" ClientIDMode="Static" />
        <div class="current_area" id="GenDiv" style="display: block">


            <ul style="display:block;">
                <li>
                    <span>
                        <asp:Label ID="lblprvAmountH" runat="server"></asp:Label></span>
                    <i globalize="ML_BILLDASHBOARD_Lbl_PrevBal" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_PreviousBalanceDue") %></i>
                    <i globalize="ML_PrepayBill_Msg_LastRecharge" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none"%>"><%= CustomerPortal.Translator.T("ML_PrepayBill_Msg_LastRecharge") %></i>
                </li>

                <li style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
                    <span>
                        <asp:Label ID="lblTotalBillthisPdH" runat="server"></asp:Label></span>
                    <i globalize="ML_BILLDASHBOARD_Lbl_TotalBilling"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_TotalBilling") %></i>
                </li>
               <%-- <span id="billdisplay" runat="server" visible="true">--%>
                    <li style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
                        <span>
                            <asp:Label ID="lblduedateH" runat="server"></asp:Label></span>
                        <i globalize="ML_BILLING_Lbl_DueDate"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_DueDate") %></i>
                    </li>
               <%-- </span>--%>
                <li style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none"%>">
                    <span>
                        <asp:Label ID="lblRemainingBal" runat="server"></asp:Label></span>
                    <i globalize="ML_PrepayBill_Msg_RemainingBal"><%= CustomerPortal.Translator.T("ML_PrepayBill_Msg_RemainingBal") %></i>
                </li>
            </ul>
        </div>
        <div class="total_bills" style="width: 100% !important;">
            <div id="divbilldetails" runat="server">
            </div>
           
            <div id="nobilldetails" runat="server" globalize="ML_Billing_div_NoBillGenerated" style="text-align: center; color: red; margin-top: 15%"></div>
            <div class="clear">
                &nbsp;
            </div>
        </div>
    </div>



    <div class="setting_save_box">
        <div class="buttons_area" id="buttonsdiv" runat="server">
            <div id="div_disclaimer" class="div_disclaimer_spanish" style="float: left;  padding: 3px 10px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingDisclaimer)  %>">
                <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
                <span globalize="ML_BillDashbord_Disclaimer_text" id="lblText" runat="server" style="color: black;"><%= CustomerPortal.Translator.T("ML_BillDashbord_Disclaimer_text") %></span>
            </div>
            <div class="customer-details view_bill" style="margin-top: 3px !important;">
                <ul>
                 
                    <li style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":(CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPaymentExtension))%>"><a id="LinkButton1" style="color: #286296; font-size: 13px; text-decoration: none;" href="#">
                        <img src="images/icon-payment-ext.png" style="margin-top: 0; vertical-align: top;" />
                        Payment Extension</a></li>
                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingViewBill) %>" onclick="viewpdf();"><a href="#" globalize="ML_BILLING_Lbl_ViewFullBill" oncontextmenu="return false;">
                        <img src="images/view_all_pdf.png" align="left" style="float: left; padding-right: 10px; margin-top: -4px;" /></a><a href="#" globalize="ML_BILLING_Lbl_ViewFullBill" oncontextmenu="return false;"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_ViewFullBill") %></a></li>
                </ul>
            </div>
            <div id="divpaybutton" runat="server" clientidmode="Static">
            <% if (CustomerPortal.SessionAccessor.IsExternalPaymentLink == "1")
               { %>
            <a class="submit-button pay_now" target="_blank" href="<%= Convert.ToString(CustomerPortal.SessionAccessor.ExternalPaymentLink) %>"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Button_PayNow") %></a>
            <% }
               else
               { %>
           <%-- <input id="btnpaypower" type="button" value='<%=CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"ML_PrepayBill_Msg_Recharge":"ML_BILLDASHBOARD_Button_PayNow")%>' class="submit-button" data-toggle="modal" globalize="" data-target=".BillingPaymentDiv" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPayBill) %>">--%>
                 <input id="btnpaypower" type="button" value='<%=CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"ML_PrepayBill_Msg_Recharge":"ML_BILLDASHBOARD_Button_PayNow")%>' class="submit-button" data-toggle="" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPayBill) %>">
            <% } %>
            </div>
        </div>
    </div>

    <div class="modal fade bs-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content" style="padding-bottom: 0px!important">
                <div class="modal-header">
                    <button type="button" id="Button1" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="H1" globalize="ML_BILLDASHBOARD_h4_H1Calculation"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_h4_H1Calculation") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px!important">
                    <div class="popup_area_home">

                        <div id="divpowerrates" runat="server">
                        </div>

                    </div>
                    <div class="bottom_area_home">
                        <div style="clear: both;"></div>
                        <div id="formula" runat="server" class="cal_popup_box1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bf-modal-sm" tabindex="-1" role="dialog" aria-labelledby="waterModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content" style="padding-bottom: 0px!important">
                <div class="modal-header">
                    <button type="button" id="Button2" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="H2" globalize="ML_BILLDASHBOARD_h4_H1Calculation"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_h4_H1Calculation") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px!important">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="divwaterrates" runat="server">
                            <div style="clear: both;"></div>
                        </div>

                        <div class="bottom_area_home">
                            <div style="clear: both;"></div>
                            <div id="formula1" runat="server" class="cal_popup_box1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bg-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content" style="padding-bottom: 0px!important">
                <div class="modal-header">
                    <button type="button" id="btnCloseGasModal" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" globalize="ML_BILLDASHBOARD_h4_H1Calculation"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_h4_H1Calculation") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px!important">
                    <div class="popup_area_home">

                        <div id="divgasrate" runat="server">
                        </div>

                    </div>
                    <div class="bottom_area_home">
                        <div style="clear: both;"></div>
                        <div id="formulaGas" runat="server" class="cal_popup_box1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade BillingPaymentDiv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" id="BillPopup">
                <div class="modal-header">
                    <button type="button" id="btnclosepopup" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="myModalLabel" globalize="ML_Billing_Ttl_EnterPmtDetails"><%= CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"ML_PrepayBill_Msg_Recharge":"ML_Billing_Ttl_EnterPmtDetails") %></h4>
                    <span id="msg" style="display: block; float: right"></span>
                </div>
              
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="WaterDiv" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">

                            <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Water)%>">
                                <asp:Label class="popup_left_content_area_home" ClientIDMode="Static" globalize="ML_BILLDASHBOARD_Lbl_WaterPayment" ID="lblWater" runat="server"> <%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_WaterPayment") %></asp:Label>

                                <div class="popup_right_content_area_home">
                                    <input id="txtWater" runat="server" globalize="ML_BILLDASHBOARD_Txt_WaterPayment" type="text" maxlength="7" clientidmode="Static" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode==46) || (event.which==8 || event.which==0)' />
                                </div>
                            </div>
                            <div style="clear: both;"></div>

                            <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Power)%>">
                                <asp:Label class="popup_left_content_area_home" ID="lblPower" runat="server" globalize="ML_BILLDASHBOARD_Lbl_PowerPayent" ClientIDMode="Static"> <%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_PowerPayent") %></asp:Label>

                                <div class="popup_right_content_area_home">
                                    <input id="txtElectric" runat="server" globalize="ML_BILLDASHBOARD_Txt_ElectricPayent" type="text" maxlength="7" clientidmode="Static" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode==46) || (event.which==8 || event.which==0)' />
                                </div>
                            </div>
                            <div style="clear: both;"></div>
                            <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.BillingSolidWasteBill)%>">
                                <asp:Label class="popup_left_content_area_home" globalize="ML_BILLDASHBOARD_Lbl_SolidPayent" ID="lblSolidWaste" ClientIDMode="Static" runat="server"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_SolidPayent") %></asp:Label>

                                <div class="popup_right_content_area_home">
                                    <input id="txtSolid" runat="server" type="text" globalize="ML_BILLDASHBOARD_Txt_SolidPayent" maxlength="7" clientidmode="Static" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode==46) || (event.which==8 || event.which==0)' />
                                </div>
                            </div>
                            <div style="clear: both;"></div>
                            <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Gas)%>">
                                <asp:Label class="popup_left_content_area_home" ID="lblGas" globalize="ML_BILLDASHBOARD_Lbl_GasPayment" ClientIDMode="Static" runat="server">  <%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_GasPayment") %></asp:Label>

                                <div class="popup_right_content_area_home">
                                    <input id="txtGas" runat="server" globalize="ML_BILLDASHBOARD_Txt_GasPayment" type="text" maxlength="7" clientidmode="Static" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode==46) || (event.which==8 || event.which==0)' />
                                </div>

                            </div>
                        </div>
                        <div id="Recharge" style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none"%>">
                            <div class="recharge">
                                <asp:Label class="popup_left_content_area_home" ID="lblAmount" runat="server" globalize="ML_BILLING_Label_Amount" ClientIDMode="Static"> <%= CustomerPortal.Translator.T("ML_BILLING_Label_Amount") %></asp:Label>

                                <div class="popup_right_content_area_home">
                                    <input id="txtRechargeAmount" runat="server" globalize="ML_BILLING_Label_Amount" type="text" maxlength="7" clientidmode="Static" onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode==46) || (event.which==8 || event.which==0)' />
                                </div>

                            </div>
                            <div style="clear: both;" class="recharge"></div>
                            <div class="recharge">
                                <asp:Label class="popup_left_content_area_home" globalize="ML_Billing_Payment_Type" ID="lblSelectPayment" ClientIDMode="Static" runat="server">Select Payment Method
                              
                                </asp:Label>

                                <div class="popup_right_content_area_home">
                                    <asp:DropDownList runat="server" ID="ddlPaymentInfo" ClientIDMode="Static"></asp:DropDownList>

                                </div>

                            </div>
                            <div style="clear: both;" class="recharge"></div>
                            <div id="CardDetails" style="display: none;">
                                <div>
                                    <asp:Label class="popup_left_content_area_home" globalize="ML_Billing_lbl_NameOnCard" ID="lblNameOnCard" ClientIDMode="Static" runat="server">
                                   <%= CustomerPortal.Translator.T("ML_Billing_lbl_NameOnCard") %>
                                    </asp:Label>
                                    <div class="popup_right_content_area_home">
                                        <asp:TextBox ID="txtNameOnCard" runat="server" ClientIDMode="Static" ReadOnly="true"></asp:TextBox>
                                    </div>
                                </div>
                                <div>
                                    <asp:Label class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardNum" ID="lblCardNumber" ClientIDMode="Static" runat="server">
                                   <%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardNum") %>
                                    </asp:Label>
                                    <div class="popup_right_content_area_home">
                                        <asp:TextBox ID="txtCardNumber" runat="server" ClientIDMode="Static" ReadOnly="true"></asp:TextBox>
                                    </div>
                                </div>
                                <div>
                                    <asp:Label class="popup_left_content_area_home" globalize="ML_BILLING_Lbl_ExpryDate" ID="lblExpiryDate" ClientIDMode="Static" runat="server">
                                   <%= CustomerPortal.Translator.T("ML_BILLING_Lbl_ExpryDate") %>
                                    </asp:Label>
                                    <div class="popup_right_content_area_home">
                                        <asp:TextBox ID="txtExpiryDate" runat="server" ClientIDMode="Static" ReadOnly="true"></asp:TextBox>
                                    </div>
                                </div>
                                <div>
                                    <asp:Label class="popup_left_content_area_home" globalize="ML_Msg_Onetimepayment_CVVCode" ID="lblCVV" ClientIDMode="Static" runat="server">
                                   <%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_CVVCode") %>
                                    </asp:Label>
                                    <div class="popup_right_content_area_home">
                                        <asp:TextBox ID="txtCVV" TextMode="Password" MaxLength="3" runat="server" ClientIDMode="Static" Style="width: 98%;"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                            <div id="RechargeSuccess" style="display: none;">
                                <p>
                                    <b id="RecAmount"></b>
                                    <span>Has been sucessfully added to your pre-payment plan.</span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="bottom_area_home">
                    <div style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"block":"none"%>">

                        <input type="checkbox" id="ChkTerm" />
                        <a href="#" data-toggle="modal" data-target="#RecurringBillAgreeTerms"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_AgreeTerms") %></a>
                        <input id="btnRecharge" type="button" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_PrepayBill_Msg_Recharge") %>' globalize="ML_PrepayBill_Msg_Recharge" />
                    </div>
                    <div style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>">
                        <input id="btnPaymentSubmit" type="button" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_BILLDASHBOARD_Button_PayentSubmit") %>' globalize="ML_BILLDASHBOARD_Button_PayentSubmit" />
                        <input id="btnCancel" type="button" class="cancel-button" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Clear") %>' globalize="ML_Master_btn_Clear" />
                    </div>
                </div>

            </div>
        </div>
    </div>
        <div id="RecurringBillAgreeTerms" class="modal fade">
        <div class="modal-dialog" style="margin-top: 4%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png"></button>
                    <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></h4>
                </div>
                <div class="modal-body" style="height: 430px; overflow: auto;padding:0px;">
                    <div class="text_align_box" style="padding: 0 0px 5px;">
                        <asp:Literal ID="ltrlTermsAndCondition" runat="server"></asp:Literal>
                    </div>
                </div>
                <div class="modal-footer" style="display: none;">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                </div>
            </div>
        </div>
    </div>
   
 
     <asp:HiddenField ID="hdndrMaxbilling" runat="server" ClientIDMode="Static" />
    <span  id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_SCM_Billing") %></span>
    <asp:HiddenField ID="billid" runat="server" ClientIDMode="Static" />
    <span id="EnterallInfo" style="display: none;" ><%= CustomerPortal.Translator.T("ML_BillDashboard_Span_Msg_EnterAllMandInfo") %></span>
    <span id="EnterValidAmt" style="display: none;" ><%= CustomerPortal.Translator.T("ML_BillDashboard_Span_Msg_EnterValidAmt") %></span>
    <span  id="spnExternalRedirect" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Msg_ExternalRedirect") %></span>
   <span id="spnMaxPaymentAmtMsg"  style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Msg_MaxPayAmount") %></span>

</asp:Content>

