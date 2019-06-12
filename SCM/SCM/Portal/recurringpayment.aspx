<%@ Page  Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="recurringpayment.aspx.cs" Inherits="CustomerPortal.recurringpaymnetportal" EnableEventValidation="false" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
   <%: System.Web.Optimization.Styles.Render("~/Content/cssRecurringPayment") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsRecurringPayment")%>
     <script src="<%#string.Format("{0}/js/jquery.creditCardValidator.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
   
    <script src="<%#string.Format("{0}/js/addupdatepayment.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
     <script src="<%#string.Format("{0}/js/MyAccount.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
 
    <input type="hidden" class="activeli_list" value="billing" />

    <div class="top_conte_box_mob" style="height: 87%; overflow: auto;" id="paymentdiv">
        <div class="inner-right-right-section">
            <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border: 0px; display: none">
                <div class="profile-details">
                    <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_Name"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></div>
                    <div class="sub-name">
                        <asp:Label ID="lblName" runat="server" Text=""></asp:Label>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_CustomerAccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_CustomerAccount") %></div>
                    <div class="sub-name">
                        <asp:Label ID="lblCustomerAccount" runat="server" Text=""></asp:Label>
                    </div>
                </div>

            </div>

            <div class="gray-bar top select-bar"  style="padding-left:11px;">
                <span globalize="ML_RecurringBill_Span_Heading1" id="topHead"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_Heading1") %></span>

            </div>


            <div id="divPayment" runat="server" class="inner-right-sub" style="border: 0px;">
                <div class="credit_debit">
                    <span id="SelectCard">
                        <input type="radio" name="cardtype" value="1" checked="checked">
                        <span globalize="ML_RecurringBill_Span_CreditCardTxt"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_CreditCardTxt") %></span></span>
                    <span id="SelectBank">
                        <input type="radio" name="cardtype" value="2" /><span globalize="ML_RecurringBill_Span_BankAccTxt" style="padding-left: 4px;"> <%= CustomerPortal.Translator.T("ML_RecurringBill_Span_BankAccTxt") %></span>
                    </span>
                    <div class="add-card" style="width: 40%; float: right">
                        <a id="addnewpayment" data-toggle="modal" data-target="#divPopup" runat="server" clientidmode="Static" style="cursor: pointer;" globalize="ML_Payment_add_Payment_Method_plus"><%= CustomerPortal.Translator.T("ML_Payment_add_Payment_Method_plus") %></a>
                    </div>

                </div>
                <div class="whites_bar">
                    <h2 globalize="ML_RecurringBill_Heading_PayMethod"><%= CustomerPortal.Translator.T("ML_RecurringBill_Heading_PayMethod") %></h2>
                    <span style="width: 50%; float: left;">
                        <asp:DropDownList ID="ddlPayment" runat="server" ClientIDMode="Static" mandatory="1" globalize="ML_RecurringBill_ddl_SelectMode" title="Please select Payment Mode" Style="width: 50%;"></asp:DropDownList>
                    </span>


                </div>
                <div class="whites_bar">
                    <h2 globalize="ML_RecurringBill_lbl_MakePayment"><%= CustomerPortal.Translator.T("ML_RecurringBill_lbl_MakePayment") %></h2>
                    <span style="width: 50%; float: left;">
                     
                        <select name="DueDate" id="ddlPaymentDate" mandatory="1" globalize="ML_RecurringBill_ddl_SelectDate" style="width: 50%;">
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>

                    </span>
                </div>
                <div class="whites_bar" style="height: 60%; padding-bottom: 0;">
                    <div class="gray-bar top select-bar" >
                        <span globalize="ML_RecurringBill_Heading_TermsCondition"><%= CustomerPortal.Translator.T("ML_RecurringBill_Heading_TermsCondition") %></span>
                    </div>
                    <div class="term_Cond">
                        <span globalize="ML_RecurringBill_Span_Terms_Notes"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_Terms_Notes") %></span><br />
                        <span globalize="ML_RecurringBill_Heading_Terms"><%= CustomerPortal.Translator.T("ML_RecurringBill_Heading_Terms") %></span><br />
                        <p globalize="ML_RecurringBill_Para_Terms1"><%= CustomerPortal.Translator.TT_ProductName("ML_RecurringBill_Para_Terms1") %></p>
                        <p globalize="ML_RecurringBill_Para_Terms2"><%= CustomerPortal.Translator.TT_ProductName("ML_RecurringBill_Para_Terms2") %></p>
                    </div>

                </div>
                <div class="whites_bar rec_payment_box" style="display: none;">
                    <div class="profile-details" style="padding: 11px 13px; width: 100%;">                        
                        <p class="accept">
                            <input type="checkbox" title="Terms and Condition" id="chkterm" /><span globalize="ML_RecurringBill_Span_AgreeTerms"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_AgreeTerms") %></span>
                        </p>
                    </div>
                </div>
               
              
                 <div id="recurringgridTable">
                   <table border="0" width="100%">
                                <tr>

                                    <th style="width: 28%;">
                                      <span globalize="ML_RecurringBill_Caption_CardorBank"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_CardorBank") %></span>
                                    </th>
                                    <th style="width: 22%;">
                                      <span globalize="ML_MyAccount_Lbl_CardNum"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_CardNum") %></span>
                                    </th>
                                    <th>
                                        <span globalize="ML_RecurringBill_Caption_RecDate"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_RecDate") %></span>
                                    </th>
                                    <th style="width: 20%;">
                                        <span globalize="ML_RecurringBill_Caption_Delete"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_Delete") %></span>
                                    </th>
                                    
                                </tr>
                                 <tr id="recurringgridDataRow"></tr>
                       </table>
            </div>
            </div>
        </div>
    </div>
    <!-- End Right Box -->
    <div class="setting_save_box">
        <div class="buttons_area">
             <div id="div_disclaim" style="width:75%;float:left;padding-left: 10px;padding-top: 6px;"><%= CustomerPortal.Translator.T("ML_RecurringPaymnt_disDeclare") %></div>

            <asp:Button ID="btnSaveRecurring" runat="server" ClientIDMode="Static" CssClass="submit-button" OnClientClick="return false;" />
            <span globalize="ML_Billing_RecurringBill_btn_Save" />
        </div>
    </div>

    <div class="modal fade" id="divPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content">
                <div class="modal-header" style="padding: 7px 15px;">
                    <button type="button" id="btnclosepopup" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="myModalLabelheadertext" globalize="ML_Payment_add_payment_method"><%= CustomerPortal.Translator.T("ML_Payment_add_payment_method") %></h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div class="upper_text">
                            <div id="divcreditrdobtn" runat="server" clientidmode="Static">
                                <asp:RadioButton ID="rdoCredit" runat="server" GroupName="grpAddNew" value="0" ClientIDMode="Static" />
                                <label for="rdoCredit" globalize="ML_ACCOUNT_lbl_Card">
                                    <%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Card") %></label>
                            </div>
                            <div id="divbankrdobtn" runat="server" clientidmode="Static">
                                <asp:RadioButton ID="rdoBank" runat="server" GroupName="grpAddNew" value="1" ClientIDMode="Static"  />
                                <label for="rdoBank" globalize="ML_ACCOUNT_lbl_BankAcount">
                                    <%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BankAcount") %></label>
                            </div>
                        </div>

                        <div id="divBankDetails" runat="server" clientidmode="Static">
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_HolderName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_HolderName") %></div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtAccountHolderName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                    OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 95%;" title="Account Holder Name" placeholder="Account Holder Name" globalize="ML_ACCOUNT_Txt_HolderName"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_Routing"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Routing") %> #</div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtRoutingNumber" runat="server" MaxLength="9" onkeypress="return IsNumeric(event);" mandatory="1" ClientIDMode="Static" ToolTip="Routing #"
                                    OnPaste="return false;" Style="width: 95%;" title="Routing Number" placeholder="Routing #" globalize="ML_ACCOUNT_Txt_Routing"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkName") %></div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtBankName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1" placeholder="Bank Name"
                                    OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 95%;" title="Bank Name" globalize="ML_ACCOUNT_Txt_BankName"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkAccount"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkAccount") %> #</div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtBankAccount" runat="server" MaxLength="16" onkeypress="return IsNumeric(event);" mandatory="1" placeholder="Bank Account #"
                                    OnPaste="return false;" ClientIDMode="Static" Style="width: 95%;" title="Bank Account #" onblur="javascript:onTextChange(this);" globalize="ML_ACCOUNT_Txt_BAnkAccount"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>

                            <div class="popup_left_content_area_home"></div>
                            <div style="clear: both;"></div>
                        </div>
                        <div id="divCreditDetails" runat="server" clientidmode="Static">
                            <div class="popup_left_content_area_home" globalize="ML_ADDCARDBANKDETAIL_Txt_NameonCard"><%= CustomerPortal.Translator.T("ML_ADDCARDBANKDETAIL_Txt_NameonCard") %></div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtCardName" runat="server" onkeypress="return IsAlpha(event);" AutoCompleteType="Disabled" autocomplete="false" ClientIDMode="Static" ToolTip="Name on Card"
                                    OnPaste="return false;" MaxLength="30" mandatory="1" Style="width: 95%;" globalize="ML_ACCOUNT_Txt_CardName" placeholder="Name On Card"></asp:TextBox>
                            </div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardType"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardType") %></div>
                            <div class="popup_right_content_area_home">
                                <asp:Image ID="ImgCard" runat="server" ImageUrl=<%#string.Format("{0}/images/credit_card_logos_11.png",CustomerPortal.SessionAccessor.BaseUrl)%> Height="30px" Visible="true" CssClass="" ClientIDMode="Static" />
                                <asp:Image ID="ImgVisa" runat="server" ImageUrl=<%#string.Format("{0}/images/visa.jpeg",CustomerPortal.SessionAccessor.BaseUrl)%> Height="30px" ClientIDMode="Static" />
                                <asp:Image ID="ImgMaster" runat="server" ImageUrl=<%#string.Format("{0}/images/mastercard.png",CustomerPortal.SessionAccessor.BaseUrl)%>  Height="30px" ClientIDMode="Static" />
                                <asp:Image ID="ImgDiscov" runat="server" ImageUrl=<%#string.Format("{0}/images/discoverNew.jpg",CustomerPortal.SessionAccessor.BaseUrl)%> Height="30px" ClientIDMode="Static" />
                                <asp:Image ID="Imgamex" runat="server" ImageUrl=<%#string.Format("{0}/images/american.jpeg",CustomerPortal.SessionAccessor.BaseUrl)%>  Height="30px" ClientIDMode="Static" />
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardNum"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardNum") %> #</div>
                            <div class="popup_right_content_area_home">
                                <input type="password" style="display: none" id="txt12" />
                                <asp:TextBox ID="txtCardNumber" runat="server" MaxLength="16" onkeypress="return IsNumeric(event);" ClientIDMode="Static" mandatory="1" placeholder="Card #"
                                    OnPaste="return false;" Style="width: 95%;" EnableViewState="false" AutoCompleteType="Disabled" autocomplete="false" title="Card #" onblur="javascript:onTextChange(this);" globalize="ML_ACCOUNT_txt_CardNum"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardExpire"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardExpire") %> </div>
                            <div class="popup_right_content_area_home">
                                <span globalize="ML_ACCOUNT_DDL_Month"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Month") %></span>
                                <asp:DropDownList ID="ddlMonth" globalize="ML_ACCOUNT_DDL_Month" runat="server" ClientIDMode="Static" mandatory="1"></asp:DropDownList>
                                <span globalize="ML_ACCOUNT_DDL_Year" style="margin-left: 15px;"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Year") %></span>
                                <asp:DropDownList ID="ddlYear" globalize="ML_ACCOUNT_DDL_Year" runat="server" ClientIDMode="Static" mandatory="1"></asp:DropDownList>
                            </div>
                            <div style="clear: both;"></div>
                            <div style="width: 100%; float: left;">
                                <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_Code"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_Code") %></div>
                                <div class="popup_right_content_area_home">
                                    <input type="password" style="display: none" id="txt1" />
                                    <asp:TextBox ID="txtSecurityCode" runat="server" MaxLength="3" OnPaste="return false;" Width="58px" ClientIDMode="Static" mandatory="1" ToolTip="Security Code"
                                        TextMode="Password" onkeypress="return IsNumeric(event);" EnableViewState="false" Style="width: 95%;" globalize="ML_ACCOUNT_Txt_Code" placeholder="Security Code" AutoCompleteType="Disabled" autocomplete="false"></asp:TextBox>
                                </div>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <input type="button" id="btnAddUpdate" globalize="ML_ACCOUNT_Button_Save" title="Save" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_ACCOUNT_Button_Save") %>' /><!-- removed on click functionality as the code already goes to validatefield on userclick -->
                        <input id="btnCancel" type="button"  text="Clear" class="cancel-button" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Clear") %>' />

                    </div>
                </div>
            </div>
        </div>
    </div>
    <asp:HiddenField ID="hdnCurrentDate" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnpaymenttype" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCardtype" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnActualTextValue" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPaymentId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnpaymentmode" runat="server" Value="" ClientIDMode="Static" />

  

    <span globalize="ML_ACCOUNT_h4_PaymentMode" id="addtext" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_h4_PaymentMode") %></span>
    <span globalize="ML_ACCOUNT_h4_PaymentModeEdit" id="edittext" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_h4_PaymentModeEdit") %></span>
    <span globalize="ML_RecurringBill_Caption_CardorBank" id="CardorBank" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_CardorBank") %></span>
    <span globalize="ML_MyAccount_Lbl_CardNum" id="CorBNum" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_CardNum") %></span>
    <span globalize="ML_RecurringBill_Caption_RecDate" id="RecDate" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_RecDate") %></span>
    <span globalize="ML_RecurringBill_Caption_Delete" id="Delete" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Caption_Delete") %></span>
    <span globalize="ML_Billing_Recurring_Msg_TandC" id="TandC" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Recurring_Msg_TandC") %></span>
    <span globalize="ML_Billing_Recurring_Msg_SaveSuccess" id="SaveSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Recurring_Msg_SaveSuccess") %></span>
    <span globalize="ML_Billing_Recurring_Msg_SaveFail" id="SaveFail" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Recurring_Msg_SaveFail") %></span>
    <span globalize="ML_BILLING_Btn_AlreadyEnrld" id="Existing" style="display: none"><%= CustomerPortal.Translator.T("ML_BILLING_Btn_AlreadyEnrld") %></span>
    <span globalize="ML_Billing_Recurring_Msg_CnfrmDel" id="CnfrmDel" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Recurring_Msg_CnfrmDel") %></span>
    <span globalize="ML_RecurringBill_Btn_SaveAll" id="SaveAll" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Btn_SaveAll") %></span>
    <span globalize="ML_Billing_Span_DeleteMsg" id="deleteGrid" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_DeleteMsg") %></span>

    <span globalize="ML_RecurringBill_Span_Heading1" id="topHeading1" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_Heading1") %></span>
    <span globalize="ML_RecurringBill_Span_Heading2" id="topHeading2" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_Heading2") %></span>

    <span globalize="ML_RecurringBill_lbl_DaysBefore" id="daysBefore" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_lbl_DaysBefore") %></span>
    <span globalize="ML_ACCOUNT_Button_Update" id="UpdtBtnVal" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Update") %></span>
    <span  id="AddBtnVal" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Add") %></span>
</asp:Content>
