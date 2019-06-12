<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AddUpdatePayment.ascx.cs" Inherits="CustomerPortal.UserControls.AddUpdatePaymentKubra" %>
<%--<script src="<%=string.Format("{0}/js/jquery.2.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>--%>
<script src="<%=string.Format("{0}/js/addupdatepayment.js",CustomerPortal.SessionAccessor.BaseUrl)%>"></script>
 <script src="<%=string.Format("{0}/js/AddKubraPayment.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
<style>
    .popup_right_content_area_home span
    {
        font-weight:normal;
        color:#808080;
    }
      .popup_area .upper_text {
            width: 100%;
            margin: 0px !important;
            display: table;
        }
      #errorMsg
{
    float: right;
    position: absolute;
    top: 40px;
    right: 150px;
    background: rgba(60,60,60,.82);
    color: white;
    padding: 3px 8px;
    box-shadow: 0px 1px 3px #ccc;
    display: none;
    z-index: 9999;
}
      div#div2 ,  div#div1 {
  display: inline;
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
                    <img src="../images/cross-icon.png" /></button>
                <h4 class="modal-title" id="myModalLabelheadertext" globalize="ML_ACCOUNT_h_PaymentMode" ><%= CustomerPortal.Translator.T("ML_ACCOUNT_h_PaymentMode") %></h4>
            </div>
            <div class="modal-body">
                <div class="popup_area_home">
                    <div class="upper_text" id="PaymentTypeMode">
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
                  
                    <div id="commonfields">
                  <div class="popup_left_content_area_home" globalize="">First Name</div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtFirstName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 97%;" title="First Name"></asp:TextBox>
                        </div>
                    <div style="clear: both;"></div>
                    
                      <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_HolderName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_HolderName") %></div>
                    <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtLastName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 97%;" title="Last Name"></asp:TextBox>
                        </div>
                    
                     <div class="popup_left_content_area_home" globalize="">Nick Name</div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtNickName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 97%;" title="Nick Name"></asp:TextBox>
                        </div>
                    <div style="clear: both;"></div>
                    <div class="popup_left_content_area_home" globalize="">Account Description</div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtAccountDescription" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 97%;" title="Account Description"></asp:TextBox>
                        </div>
                    <div style="clear: both;"></div>
                        <div style="width:32%; float:left;">
                      <div class="popup_left_content_area_home" globalize="">Account Type</div>
                            </div>
                        <div style="width:50%; float:left;margin-top: 6px;">
                         <div id="div1" runat="server" clientidmode="Static" style="width:50%; float:left;">
                            <asp:RadioButton ID="rdSaving" runat="server" GroupName="grpAddType" value="0" ClientIDMode="Static" Checked="true" />
                            <label for="rdoSaving">
                                Saving</label>
                        </div>
                        <div id="div2" runat="server" clientidmode="Static" style="width:50%; float:left;">
                            <asp:RadioButton ID="rdCurrent" runat="server" GroupName="grpAddType" value="1" ClientIDMode="Static" />
                            <label for="rdoBank" >
                                Current</label>
                        </div>
                            </div>
                        </div>

                    <div id="divBankDetails" runat="server" clientidmode="Static">
                      
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_Routing"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_Routing") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtRoutingNumber" runat="server" MaxLength="9" onkeypress="return IsNumeric(event);" mandatory="1" ClientIDMode="Static" ToolTip="Routing #"
                                OnPaste="return false;" Style="width: 97%;" title="Routing Number" globalize="ML_ACCOUNT_Txt_Routing"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkName"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkName") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtBankName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1"
                                OnPaste="return false;" MaxLength="30" ClientIDMode="Static" Style="width: 97%;" title="Bank Name"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_lbl_BAnkAccount"><%= CustomerPortal.Translator.T("ML_ACCOUNT_lbl_BAnkAccount") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtBankAccount" runat="server" MaxLength="16" onkeypress="return IsNumeric(event);" mandatory="1"
                                OnPaste="return false;" ClientIDMode="Static" Style="width: 97%;" title="Bank Account #"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                      
                        <div class="popup_left_content_area_home"></div>
                        <div style="clear: both;"></div>
                    </div>
                    <div id="divCreditDetails" runat="server" clientidmode="Static">
                        <div style="width:32%; float:left;margin-top: 5px;">
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardType"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardType") %></div>
                            </div>
                        <div style="width:50%; float:left;margin-top: 7px;">
                        <div class="popup_right_content_area_home">
                            <img id="ImgCard" src="<%=string.Format("{0}/images/credit_card_logos_11.png",CustomerPortal.SessionAccessor.BaseUrl)%>" style="height:30px;" />
                            <img id="ImgVisa" src="<%=string.Format("{0}/images/visa.jpeg",CustomerPortal.SessionAccessor.BaseUrl)%>" style="height:30px;" />
                            <img id="ImgMaster" src="<%=string.Format("{0}/images/mastercard.png",CustomerPortal.SessionAccessor.BaseUrl)%>"  style="height:30px;" />
                            <img id="ImgDiscov"src="<%=string.Format("{0}/images/discoverNew.jpg",CustomerPortal.SessionAccessor.BaseUrl)%>" style="height:30px;" />
                             <img id="Imgamex" src="<%=string.Format("{0}/images/american.jpeg",CustomerPortal.SessionAccessor.BaseUrl)%>" style="height:30px;" />
                        </div>
                            </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardNum"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardNum") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtCardNumber" runat="server" MaxLength="16" onkeypress="return IsNumeric(event);" ClientIDMode="Static" mandatory="1"
                                 OnPaste="return false;" Style="width: 97%;" AutoCompleteType="Disabled" autocomplete="off" title="Card #"></asp:TextBox>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_CardExpire"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardExpire") %> </div>
                        <div class="popup_right_content_area_home">
                            <span globalize="ML_ACCOUNT_DDL_Month" style="margin-right: 10px;"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Month") %></span>
                            <asp:DropDownList ID="ddlMonth" runat="server" ClientIDMode="Static" style="width:31%;"></asp:DropDownList>
                            <span globalize="ML_ACCOUNT_DDL_Year" style="margin-left: 12px;margin-right: 13px;"><%= CustomerPortal.Translator.T("ML_ACCOUNT_DDL_Year") %></span>
                            <asp:DropDownList ID="ddlYear" runat="server" ClientIDMode="Static" style="width:31%;"></asp:DropDownList>
                        </div>
                        <div style="clear: both;"></div>
                        <div style="width:50%; float:left;">
                        <div class="popup_left_content_area_home" globalize="ML_ACCOUNT_Lbl_Code"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_Code") %></div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtSecurityCode" runat="server" MaxLength="3" OnPaste="return false;" Width="58px" ClientIDMode="Static" mandatory="1" ToolTip="Security Code"
                                TextMode="Password" onkeypress="return IsNumeric(event);" Style="width: 90%;" globalize="ML_ACCOUNT_Txt_Code" placeholder="Security Code"></asp:TextBox>
                        </div>
                            </div>
                         <div style="width:50%; float:left;">
                        <div class="popup_left_content_area_home" >Zip Code</div>
                        <div class="popup_right_content_area_home">
                            <asp:TextBox ID="txtZipCode" runat="server" MaxLength="5" OnPaste="return false;" Width="58px" ClientIDMode="Static" mandatory="1" ToolTip="Security Code"
                                TextMode="Password" onkeypress="return IsNumeric(event);" Style="width: 90%;"  placeholder="Zip Code"></asp:TextBox>
                        </div>
                             </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div class="bottom_area_home" style="margin-top:8px;">
                     <input type="button" id="btnAddUpdateCardBank" value="Add" class="submit-button" onclick="return validatefields();"  globalize="ML_ACCOUNT_Button_Update" style="font-weight:normal; height:30px;" />
                <%--   <asp:Button ID="btnAddUpdate" runat="server" Text="Add" class="submit-button" OnClientClick="return validatefields();return false;"  ClientIDMode="Static" globalize="ML_ACCOUNT_Button_Update" />---%>
                     <%--<asp:Button ID="btnAddUpdate" runat="server" Text="Add" class="submit-button" OnClientClick="return false;"  ClientIDMode="Static" globalize="ML_ACCOUNT_Button_Update" />--%>
                    <input id="btnCancel" type="button" globalize="ML_Master_btn_Clear" class="cancel-button" value="Clear" />

                </div>
            </div>
        </div>
    </div>
</div>

<div class="add-card" data-toggle="modal" data-target="#divPopup" style="width: 50%;cursor:pointer;">
    <a id="addnewpayment" runat="server" clientidmode="Static" globalize="ML_MYACCOUNT_Navigation_AddNewPayment"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Navigation_AddNewPayment") %></a>
</div>
<span globalize="ML_My_Account_ErrMsg_InfoMsg" id="InfoMsg" style="display: none"></span>

