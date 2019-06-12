<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AddUpdatePayment.ascx.cs" Inherits="CustomerPortal.UserControls.AddUpdatePayment"  %>

<script src="js/addupdatepayment.js"></script>
<script src="js/Validate.js" type="text/javascript"></script>
<style>
    .popup_right_content_area_home span {
        font-weight: normal;
        color: #808080;
    }

    .popup_area .upper_text {
        width: 100%;
        margin: 0px !important;
        display: table;
    }

    .new {
    float: none !important; 
    margin: -8px auto 0;
    padding: 4px 0px;
    font-weight: bold;
    }
      #txtBankName+span{
        display:none;
    }

    #errorMsg {
        float: right;
        position: absolute;
        top: -35px;
        right: 107px;
        background: rgba(60,60,60,.82);
        color: white;
        padding: 3px 8px;
        box-shadow: 0px 1px 3px #ccc;
        display: none;
        z-index: 9999;
    }

    .popup_right_content_area_home select {
        width: 32.3% !important;
    }
</style>
<asp:HiddenField ID="hdnpaymentmode" runat="server" Value="" ClientIDMode="Static" />
<asp:HiddenField ID="hdnCardtype" runat="server" Value="" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPaymentId" runat="server" Value="" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMonth" runat="server" Value="" ClientIDMode="Static" />
<asp:HiddenField ID="hdnpaymenttype" runat="server" Value="" ClientIDMode="Static" />
<asp:HiddenField ID="hdnCurrentDate" runat="server" Value="" ClientIDMode="Static" />
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
                            <asp:RadioButton ID="rdoBank" runat="server" GroupName="grpAddNew" value="1" ClientIDMode="Static" />
                            <label for="rdoBank" globalize="ML_ACCOUNT_lbl_BankAcount">
                                <%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BankAcount") %></label>
                        </div>

                    </div>

                 

                    <div id="divBankDetails" runat="server" clientidmode="Static">
                        <div style="display:none;" class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_HolderName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_HolderName") %></div>
                        <div style="display:none;" class="popup_right_content_area_home">
                            <asp:TextBox ID="txtAccountHolderName" runat="server" onkeypress="return IsAlpha(event);"
                                OnPaste="return false;" MaxLength="60" ClientIDMode="Static" Style="width: 95%;" title="Account Holder Name" placeholder="Account Holder Name" globalize="ML_ACCOUNT_Txt_HolderName"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_Routing"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Routing") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtRoutingNumber" runat="server" MaxLength="9" onkeypress="return IsNumeric(event);" mandatory="1" ClientIDMode="Static" ToolTip="Routing #"
                                OnPaste="return false;" Style="width: 95%;" title="Routing Number" placeholder="Routing" globalize="ML_ACCOUNT_Txt_Routing"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkName") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtBankName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1" placeholder="Bank Name"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 95%;" title="Bank Name" globalize="ML_ACCOUNT_Txt_BankName"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkAccount"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkAccount") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtBankAccount" runat="server" MaxLength="19" onkeypress="return IsNumeric(event);" mandatory="1" placeholder="Bank Account"
                                OnPaste="return false;" ClientIDMode="Static" Style="width: 95%;" title="Bank Account #" onblur="javascript:onTextChange(this);" globalize="ML_ACCOUNT_Txt_BAnkAccount"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>

                       <div class="popup_left_content_area_home"> <p  style="width:50%;float:left;margin: 7px 0 1px;font-size: 14px;" globalize="ML_ACCOUNT_lbl_Accounttype_1"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Accounttype_1") %></p>
                               <select id="ddlaccounttype" style="width:45%;float:left;">                                    
                                    <option value="CHECKING"><%= CustomerPortal.Translator.T("ML_Bank_Account_checking") %></option>
                                    <option value="SAVINGS"><%= CustomerPortal.Translator.T("ML_Bank_Account_saving") %></option>
                                </select>
                       </div>
                        <div style="clear: both;"></div>
                    </div>
                    <div id="divCreditDetails" runat="server" clientidmode="Static">
                        <div style="display:none;" class="popup_left_content_area_home" globalize="ML_ADDCARDBANKDETAIL_Txt_NameonCard"><%= CustomerPortal.Translator.T("ML_ADDCARDBANKDETAIL_Txt_NameonCard") %></div>
                        <div style="display:none;" class="popup_right_content_area_home">
                            <asp:TextBox ID="txtCardName" runat="server" onkeypress="return IsAlpha(event);" AutoCompleteType="Disabled" autocomplete="false" ClientIDMode="Static" ToolTip="Name on Card"
                                OnPaste="return false;" MaxLength="60" Style="width: 95%;" globalize="ML_ACCOUNT_Txt_CardName" placeholder="Name On Card"></asp:TextBox>
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
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardNum"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardNum") %></div>
                        <div class="popup_right_content_area_home">
                            <input type="password" style="display: none" id="txt12" />
                            <asp:TextBox ID="txtCardNumber" runat="server" MaxLength="19" onkeypress="return IsNumeric(event);" ClientIDMode="Static" mandatory="1" globalize="ML_ACCOUNT_txt_CardNum" placeholder="Card"
                                OnPaste="return false;" Style="width: 95%;" EnableViewState="false" AutoCompleteType="Disabled" autocomplete="false" title="Card #" onblur="javascript:onTextChange(this);" ></asp:TextBox>
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
                        <div style="width: 100%; float: left; display:none;">
                            <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_Code"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_Code") %></div>
                            <div class="popup_right_content_area_home">
                                <input type="password" style="display: none" id="txt1" />
                                <asp:TextBox ID="txtSecurityCode" runat="server" MaxLength="3" OnPaste="return false;" Width="58px" ClientIDMode="Static" ToolTip="Security Code"
                                    TextMode="Password" onkeypress="return IsNumeric(event);" EnableViewState="false" Style="width: 95%;" globalize="ML_ACCOUNT_Txt_Code" placeholder="Security Code" AutoCompleteType="Disabled" autocomplete="false"></asp:TextBox>
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div class="bottom_area_home">
                    <input type="button" id="btnAddUpdate" globalize="ML_ACCOUNT_Button_Save" title="Save" class="submit-button" value='<%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Save") %>' /><!-- removed on click functionality as the code already goes to validatefield on userclick -->
                    <input id="btnCancel" type="button" globalize="ML_Master_btn_Clear" class="cancel-button" value='<%= CustomerPortal.Translator.T("ML_Master_btn_Clear") %>' />

                </div>
            </div>
        </div>
    </div>
</div>

<div class="add-card" style="width: 50%;">
    <a id="addnewpayment" data-toggle="modal" data-target="#divPopup" runat="server" clientidmode="Static" style="cursor: pointer;" globalize="ML_Payment_add_Payment_Method_plus"><%= CustomerPortal.Translator.T("ML_Payment_add_Payment_Method_plus") %></a>
</div>
<span globalize="ML_My_Account_ErrMsg_InfoMsg" id="InfoMsg" style="display: none"></span>

<asp:HiddenField ID="hdnActualTextValue" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnCallByAng" runat="server" ClientIDMode="Static" Value="0" />
<span globalize="ML_Payment_add_payment_method" id="addtext" style="display: none"><%= CustomerPortal.Translator.T("ML_Payment_add_payment_method") %></span>
<span globalize="ML_ACCOUNT_h4_PaymentModeEdit" id="edittext" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_h4_PaymentModeEdit") %></span>
<%--keys added by priyansha--%>
<span  id="AddBtnVal" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Add") %></span>
<span globalize="ML_ACCOUNT_Button_Update" id="UpdtBtnVal" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Update") %></span>
<span globalize="ML_ACCOUNT_Button_title" id="UpdtBtntitle" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_title") %></span>
<span globalize="ML_Validate_Msg" id="ValidErrorMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Validate_Msg") %> </span>
 <span globalize="ML_Account_Span_ErrMsg_BankInfo_Added" id="BankInfoAddedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_BankInfo_Added") %></span>
    <span globalize="ML_Account_Span_ErrMsg_CreditInfo_Added" id="CrInfoAddedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_CreditInfo_Added") %></span>
 <span globalize="ML_Account_Span_ErrMsg_Success_CreditUpdate" id="CardUpdateSucMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_CreditUpdate") %></span>
 <span globalize="ML_Account_Span_ErrMsg_BankAccount_Updated_Success" id="BankUpdatedSucMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_BankAccount_Updated_Success") %></span>
 <span globalize="ML_Account_Span_ErrMsg_Transaction_Failed" id="TxnFailedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Transaction_Failed") %></span>
   <span globalize="ML_MyAccount_Msg_InvalidRouting" id="InvalidRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_InvalidRouting") %></span>
    <span globalize="ML_MyAccount_Msg_NewRouting" id="NewRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_NewRouting") %></span>
<span globalize="ML_ACCOUNT_Lbl_Code" id="securitycode" style="display: none"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_Code") %></span>
