<%@ Page Title="My Account" Language="C#" MasterPageFile="MyAccount.master" AutoEventWireup="true" EnableEventValidation="false" CodeBehind="account.aspx.cs" Inherits="CustomerPortal.account" %>

<%@ Register Src="UserControls/ZipCode.ascx" TagPrefix="uc2" TagName="ZipCode" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssAccount") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsAccount")%>

    <input type="hidden" class="activeli_list" value="myaccount,icon_profile" />
    <asp:HiddenField ID="hdnAccountMaxLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnAccountMinLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMeterIdMaxLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMeterIdMinLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdDLMinLength" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdDLMaxLength" runat="server" ClientIDMode="Static" />
    <style type="text/css">
        .w2ui-tag .w2ui-tag-body.w2ui-tag-body:before {
    top: 5px !important;
}
        #w2ui-tag-txtPass .w2ui-tag-body:before{
                top: 9px !important;
        }
        .edit_icon_acc {
            position:absolute;display:inline-block; margin-left:10px;    top: 9px;
        }
    </style>
    <div class="right_content_box" style="position: relative;">
        <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
            <div class="inner-right-right-section">
                <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border: 0px;">
                    <div class="inner-right-sub" style="background: #dedede; padding-bottom: 5px; padding-top: 5px; border: 0px;">
                        <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%; background: none;">
                            <div class="inner-address"><b><span globalize="ML_ACCOUNT_Lbl_ProfileInfo"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_ProfileInfo") %></span></b></div>
                        </div>
                    </div>

                    <div class="profile-details">
                        <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_Name"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></div>
                        <div class="sub-name">
                            <asp:Label ID="lblName" runat="server" Text=""></asp:Label>
                        </div>
                    </div>
                    <div class="profile-details">
                        <div class="name-feild" globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %> </div>
                        <div class="sub-name">
                            <asp:Label ID="lblCustomerAccount" runat="server" Text=""></asp:Label>
                        </div>
                    </div>
                    <div class="profile-details  gray-box_rem_marg">
                        <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_CustomerRegistration_Lbl_MobileNum"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></span><span></span></div>
                        <asp:TextBox ID="txtPhone" globalize="ML_MYACCOUNT_Txt_PrimaryPhone" placeholder="Primary Phone" runat="server" title="Primary Phone" mandatory="1" class="input-phone txtPhone" ClientIDMode="Static" MaxLength="14"></asp:TextBox>
                        <a href="#"  class="confi_flat_icon edit_icon_acc" style="display: none"><img src="images/edit.png"></a>
                    </div>
                    <div class="profile-details gray-box_rem_marg">
                        <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></span><span></span></div>
                        <asp:TextBox ID="txtmob" globalize="ML_MYACCOUNT_Txt_AlternatePhone" placeholder="Alternate Number" runat="server" title="Alternate Number" class="input-phone txtmob" ClientIDMode="Static" MaxLength="14" ></asp:TextBox>
                         <a href="#"  class="confi_flat_icon edit_icon_acc" style="margin-left:22px;display: none "><img src="images/edit.png"></a>
                    </div>
                    <div class="profile-details gray-box_rem_marg">
                        <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></span><span></span></div>
                        <asp:TextBox ID="txtEmail" globalize="ML_MYACCOUNT_Txt_EmailId" placeholder="Email" runat="server" title="Email" mandatory="1" class="input-phone txtEmail" ClientIDMode="Static"
                            MaxLength="50"></asp:TextBox>
                         <a href="#"  class="confi_flat_icon edit_icon_acc"  style="display: none"><img src="images/edit.png"></a>
                    </div>
                    <div class="profile-details gray-box_rem_marg" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountProfileAlternateEmailID) %>">
                        <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_MYACCOUNT_Txt_AltEmailId"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Txt_AltEmailId") %></span></div>
                        <asp:TextBox ID="txtAltEmail" globalize="ML_MYACCOUNT_Txt_AltEmailId" placeholder="Alternate Email" runat="server" title="Alternate Email" class="input-phone txtEmail" ClientIDMode="Static"
                            MaxLength="50" ></asp:TextBox>
                         <a href="#"  class="confi_flat_icon edit_icon_acc" style="margin-left:22px;display: none "><img src="images/edit.png"></a>
                    </div>
                </div>
                <div class="inner-right-sub" style="background: #dedede; padding-bottom: 5px; padding-top: 5px; border: 0px;  ">
                    <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%;">
                        <div class="inner-address">
                            <b><span globalize="ML_MYACCOUNT_Lbl_BillingAddress"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_BillingAddress") %></span></b> <span globalize="ML_MyAccount_span_Default"><%= CustomerPortal.Translator.T("ML_MyAccount_span_Default") %></span>

                              <div class="add_account_btn" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountProfileAddAccount) %>">
                                  <asp:LinkButton ID="lnkbtnaddaccount" runat="server" data-toggle="modal" data-target="#divAddAccount" ClientIDMode="Static" globalize="ML_MYACCOUNT_btn_AddAccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_btn_AddAccount") %></asp:LinkButton>
                              </div>
                        </div>

                    </div>

                </div>
                <div class="inner-right-sub" style="border: 0px;">

                    <div class="my_account_table">
                        <div class="profile-details my_acc_tbl" style="padding: 0px;">
                        </div>
                        <div class="profile-details my_acc_tbl pro_add" style="padding: 0">
                            <table border="0" width="100%">
                                <tr>

                                    <td style="border-bottom: 0px; width: 23.5%;">
                                        <div class="default-address-1">
                                            <strong><span globalize="ML_MYACCOUNT_Lbl_Default"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Default") %></span></strong>
                                        </div>
                                    </td>
                                    <td style="border-bottom: 0px; width: 45%;">
                                        <div class="address-1">
                                            <strong><span globalize="ML_CONFIRM_BILL_Lbl_PropertyAddress"><%= CustomerPortal.Translator.T("ML_CONFIRM_BILL_Lbl_PropertyAddress") %></span></strong>
                                        </div>
                                    </td>
                                    <td style="border-bottom: 0px; width: 25%;">
                                        <div class="address-1">
                                            <strong><span globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></span></strong>
                                        </div>
                                    </td>
                                    <td class="delete_box" style="padding: 0 29px; margin-top: -1px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountProfileDeleteAccount) %>"></td>
                                    <td style="border-bottom: 0px; border-left: 0px; width: 0%; display: none"><strong><span globalize="ML_SrvcRqust_div_MailAdd"><%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %></span></strong></td>

                                </tr>
                                <asp:Repeater ID="rpt_Address" runat="server" ClientIDMode="Static">
                                    <ItemTemplate>

                                        <tr>
                                            <td style="width: 10%;">
                                                <div class="default-address-1">
                                                    <input style="margin-left: 14px;" id="rdobtnProperty_<%#Eval("AddressId") %>" type="radio" name="properties" onchange="propertyChange(this);" defaultpayment="<%#Eval("DefaultPayID")%>:<%#Eval("DefaultPayType")%>" value='<%#Eval("AccountNumber")%>:<%#Eval("AddressId")%>' class="address-button-billing rdbdefault" <%#string.IsNullOrEmpty(Eval("DefaultAddressId").ToString())?"":"checked='checked'"%> />
                                                </div>
                                            </td>
                                            <td style="width: 45%;">
                                                <div class="address-1">
                                                    <label id="lblpropertyaddress_<%#Eval("AddressId") %>"><%#Eval("Properties") %></label>
                                                </div>
                                            </td>
                                            <td style="width: 25%;">
                                                <div class="address-2">
                                                    <label id="lblutilitynumber_<%#Eval("UtilityAccountNumber") %>"><%#Eval("PremiseNumber") %></label>
                                                </div>
                                            </td>
                                            <td class="acc_del_box_1" style="width: 60px; text-align: center; border-bottom: 0px; border-left: 0; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountProfileDeleteAccount) %>;">
                                                <div class="address-2">
                                                    <div id='<%#Eval("AccountNumber")%>' title='<%= CustomerPortal.Translator.T("ML_BillingAccount_Span_Delete") %>' globalize="ML_BillingAccount_Span_Delete" class="deleteaccount">
                                                        <img src="images/icon_delete.png" style="cursor: pointer" class="<%#string.IsNullOrEmpty(Eval("DefaultAddressId").ToString())?"":"cssDefault"%>" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td style="border-left: 0px; width: 0%; display: none">
                                                <div class="address-1">
                                                    <label id="lblContactCustAdd_<%#Eval("AddressId") %>"><%#Eval("CommunicationAddress") %></label>
                                                </div>
                                                <div id="cust_add1_<%#Eval("AddressId") %>" style="display: none"><%#Eval("CommunicationAddress1") %></div>
                                                <div id="cust_add2_<%#Eval("AddressId") %>" style="display: none"><%#Eval("CommunicationAddress2") %></div>

                                                <div id="cust_City_<%#Eval("AddressId") %>" style="display: none"><%#Eval("CityName") %></div>
                                                <div id="cust_State_<%#Eval("AddressId") %>" style="display: none"><%#Eval("StateName") %></div>

                                                <div id="cust_zip_<%#Eval("AddressId") %>" style="display: none"><%#Eval("CommunicationZipCode") %></div>
                                                 <div id="cust_ispobox_<%#Eval("AddressId") %>" style="display: none"><%#Eval("IsPOBox") %></div>
                                                <div class="address-1 address-icon addId">
                                                    <img id="<%#Eval("AddressId") %>" src="images/icon_mark.png" alt="edit" class="editaddress" data-toggle="modal" data-target="#divAddressPopup_123" />
                                                </div>
                                            </td>

                                        </tr>
                                        <div class="clear_both"></div>
                                    </ItemTemplate>
                                </asp:Repeater>
                                <tr style="display: none">
                                    <td colspan="2" style="display: none">
                                        <asp:LinkButton ID="lnkAddNew" runat="server" Text="ADD NEW ACCOUNT" data-target="#add-new-divPopup" data-toggle="modal" /></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="inner-right-sub" style="background: #dedede; padding-bottom: 5px; padding-top: 5px; border: 0px;">
                    <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%;">
                        <div class="inner-address"><b><span globalize="ML_SrvcRqust_div_MailAdd"><%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %></span></b><%-- (<span globalize="ML_MyAccount_span_Default">Default Selected</span>)--%></div>
                    </div>
                </div>
                <div class="inner-right-sub" style="border: 0px;">
                    <div class="my_account_table">
                        <div class="profile-details my_acc_tbl" style="padding: 0px;">
                        </div>
                        <div class="profile-details my_acc_tbl" style="padding: 0">
                            <table border="0" width="100%" style="min-height: 37px;">
                                <tr>

                                    <td class="edgeb" style="border-bottom: 1px solid #ccc; width: 5%;">
                                        <div class="default-address-1">
                                            <strong><span globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span></strong>
                                        </div>
                                    </td>
                                    <td style="border-bottom: 1px solid #ccc; position: relative;">
                                        <div class="address-1">
                                            <label id="lblCommAddress"></label>
                                        </div>
                                        <div class="address-1 address-icon address-icon2">
                                            <img src="images/icon_mark.png" alt="edit" class="editcommaddress" data-toggle="modal" data-target="#divAddressPopup_123" />
                                            <span class="head_icon_flat icon_edit editcommaddress " data-toggle="modal" data-target="#divAddressPopup_123"></span>
                                        </div>
                                    </td>


                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
                <div id="securitydiv">
                    <div class="inner-right-sub" style="background: #dedede; padding-bottom: 5px; padding-top: 5px; border: 0px; margin-bottom: 10px;">
                        <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%;">
                            <div class="inner-address"><b><span globalize="ML_Register_Lbl_SecurtyQustn"><%= CustomerPortal.Translator.T("ML_Register_Lbl_SecurtyQustn") %></span></b><%-- (<span globalize="ML_MyAccount_span_Default">Default Selected</span>)--%></div>
                        </div>
                    </div>
                    <div class="sec_ques_box">
                        <div class="col-lg-2 col-md-2 col-sm-4">
                            <div globalize="ML_CustomerRegistration_Lbl_SecurityQues1" class="sec_font"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityQues1") %></div>
                        </div>
                        <div class="col-lg-4 col-md-4  col-sm-8">
                            <asp:DropDownList ID="ddlquestions1" globalize="ML_CustomerRegistration_Lbl_SecurityQues1" ClientIDMode="Static" runat="server" mandatory="1" title="Security Question 1" AutoPostBack="false" Style="margin-left: 12px; width: 90%;"></asp:DropDownList>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-4">
                            <div globalize="ML_CustomerRegistration_Lbl_SecurityAns1" class="sec_font"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityAns1") %></div>
                        </div>
                        <div class="col-lg-4 col-md-4  col-sm-8">
                            <asp:TextBox globalize="ML_CustomerRegistration_Lbl_SecurityAns1" ID="txtSecurityAns1" ClientIDMode="Static" MaxLength="25" runat="server" TextMode="Password" title="Security Answer 1" value="" mandatory="1" onkeypress="return ValidateText(event);" Style="margin-left: 12px; width: 90%;    margin-bottom: 12px;"></asp:TextBox>
                        </div>
                    </div>
                    <div class="sec_ques_box">
                        <div class="col-lg-2 col-md-2 col-sm-4">
                            <div globalize="ML_CustomerRegistration_Lbl_SecurityQues2" class="sec_font"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityQues2") %></div>
                        </div>
                        <div class="col-lg-4 col-md-4  col-sm-8">
                            <asp:DropDownList ID="ddlquestions2" globalize="ML_CustomerRegistration_Lbl_SecurityQues2" ClientIDMode="Static" runat="server" mandatory="1" title="Security Question 1" AutoPostBack="false" Style="margin-left: 12px; width: 90%;"></asp:DropDownList>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-4">
                            <div globalize="ML_CustomerRegistration_Lbl_SecurityAns2" class="sec_font"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityAns2") %> </div>
                        </div>
                        <div class="col-lg-4 col-md-4  col-sm-8">
                            <asp:TextBox globalize="ML_CustomerRegistration_Lbl_SecurityAns2" ID="txtSecurityAns2" ClientIDMode="Static" MaxLength="25" runat="server" TextMode="Password" title="Security Answer 1" value="" mandatory="1" onkeypress="return ValidateText1(event);" Style="margin-left: 12px; width: 90%;"></asp:TextBox>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="setting_save_box">
            <div class="buttons_area">
                <div class="div_disclaimer" style="float: left; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountProfileDisclaimer) %>!important">
                    <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red; float: left;" inputtype="" validatemessage="Disclaimer" title="Disclaimer"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span>
                        <span style="color: red;">:</span></b>
                    <span class="cls_disclaimer" globalize="ML_MyAccount_Profile_Disclaimer"><%= CustomerPortal.Translator.T("ML_MyAccount_Profile_Disclaimer") %></span>
                </div>
                <asp:Button ID="btnSaveAll" runat="server" ClientIDMode="Static" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_MYACCOUNT_Button_SaveAll") %>' OnClientClick="return false;" globalize="ML_MYACCOUNT_Button_SaveAll" />
            </div>
        </div>
    </div>



    <div id="divAddressPopup_123" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div id="divAddressPopup_ChangePass" class="modal-content editMain">
                <div class="modal-header">
                    <button type="button" class="mailingaddressclose" data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" globalize="ML_MyAccount_Msg_EditCommAdd"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_EditCommAdd") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">
                    <div id="divAddressPopup" style="z-index: 9999999; width: 100%; margin: 9px;">

                        <div class="row">
                            <div>
                                <p class="schedule_date" style="margin-left: 15px; font-weight: normal;">
                                    <span>
                                        <input type="radio" clientidmode="Static" name="rdo_typeAddr" value="0" style="margin-right: 5px; margin-top: 2px; line-height: normal !important; height: auto !important; vertical-align: top;" />
                                        <%=CustomerPortal.Translator.T("ML_Msg_StreetAddress") %></span>
                                    <span style="margin-left: 20px;">
                                        <input type="radio" name="rdo_typeAddr" value="1" style="margin-right: 5px; height: auto !important; line-height: normal !important; margin-top: 2px; vertical-align: top;" />
                                        <%=CustomerPortal.Translator.T("ML_Msg_POBox") %></span>
                                </p>
                            </div>

                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <label style="float: left" globalize="ML_MyAccount_Msg_AddLine1" id="Addline1"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine1") %>:</label>
                            </div>
                            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-9">
                                <input type="text" id="cust_address1"  title="Address Line 1" placeholder="Apartment or Suite Number" maxlength="50" mandatory="1" globalize="ML_MyAccount_Msg_AddLine2" />
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 addline2">
                                <label style="float: left" globalize="ML_MyAccount_Msg_AddLine2"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine2") %>:</label>
                            </div>
                            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-9 addline2">
                                <input type="text" id="cust_address2" title="Provide Street address." placeholder="Street Address" maxlength="50" globalize="ML_MyAccount_Msg_AddLine2" />
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %>: </div>

                            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-9">

                                <input type="text" id="cust_Zip" class="ZipCode" maxlength="5" onkeypress="javascript:if(IsNumeric(event)){return true;}else{return false;}" globalize="ML_SrvcRqust_P_ZipCode" placeholder="Zip Code" mandatory="1" />
                                <uc2:ZipCode runat="server" ID="ZipCode1" />
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %>: </div>
                            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-9">
                                <input type="text" id="cust_City" placeholder="City" maxlength="35" mandatory="1" globalize="ML_Register_Lbl_City" />

                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %>: </div>
                            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-9">

                                <asp:DropDownList ID="ddlState" runat="server" AppendDataBoundItems="true" ClientIDMode="Static" mandatory="1" globalize="ML_SrvcRqust_p_State"></asp:DropDownList>

                            </div>

                            <div style="display: none" id="hdnCommunicationAddressId"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">

                    <input type="button" id="btnUpdateAddress" class="submit-button" globalize="ML_MyAccount_btn_ValidateAndSave" value="<%= CustomerPortal.Translator.T("ML_MyAccount_btn_ValidateAndSave") %>" style="float: right; margin: 0 !important;" />

                    <input type="button" id="btnValidateAddress" class="submit-button" globalize="ML_MyAccount_btn_Validate" value="<%= CustomerPortal.Translator.T("ML_MyAccount_btn_Validate") %>" style="float: left!important; margin: 0 !important;" />
                </div>
            </div>
            <div class="modal-content editProg" style="display: none;">
                <div class="modal-header">
                    <button type="button" class="close closeVerify" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" globalize="ML_MyAccount_Msg_EditCommAdd"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_EditCommAdd") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">

                    <div class="left_loading_area">
                        <img src="images/loading_USPS.gif" />
                        <h4><span class="result" style="color: blue;"></span></h4>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divAddAccount" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div id="divAddAccountmodal" class="modal-content editMain modal-lg">
                <div class="modal-header">
                    <button type="button" class="closepopup" data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>

                    <h4 class="modal-title" globalize="ML_MYACCOUNT_btn_AddAccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_btn_AddAccount") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">
                    <div id="divAccountPopup" class="registration-form" style="z-index: 9999999; width: 100%; margin: 9px;">

                        <div class="row">

                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12 text_spanish_box" globalize="ML_Billing_lbl_AccNum"><%= CustomerPortal.Translator.T("ML_Billing_lbl_AccNum") %></div>
                            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                <asp:TextBox ID="txtAccno" placeholder="Account Number" globalize="ML_CustomerRegistration_txt_AccNo" runat="server" TextMode="SingleLine" MaxLength="20" title="Account Number" Text="" TabIndex="2" ClientIDMode="Static" mandatory="1"></asp:TextBox>
                            </div>
                            <%--BUG 6197--%><%--Bug: 6354--%>
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %> </div>
                            <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                <asp:TextBox globalize="ML_CustomerRegistration_Txt_EmailId" ID="txtEmailID" placeholder="Email ID" runat="server" class="box" title="email id" value="" MaxLength="50" TabIndex="4" mandatory="1" ClientIDMode="Static"></asp:TextBox>
                            </div>
                            <%-- <div class="clearfix"></div>--%>
                            <div id="divZipCode" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_SrvcRqust_P_ZipCode"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %> </div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox ID="txtZipCode" globalize="ML_CustomerRegistration_DDL_ZipCode" CssClass="ZipCode" title="Zip Code" placeholder="Mandatory" MaxLength="5" TabIndex="3" ClientIDMode="Static" runat="server"></asp:TextBox>
                                    <uc2:ZipCode runat="server" ID="ZipCode" />
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12" style="display: none; visibility: hidden;">
                                    <asp:DropDownList globalize="ML_CustomerRegistration_DDL_ZipCode" ID="ddlZip" runat="server" class="box" title="Zip Code" value="" MaxLength="5" TabIndex="3" ClientIDMode="Static"></asp:DropDownList>
                                </div>

                            </div>
                            <div id="divSSN" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12 text_spanish_box" globalize="ML_CustomerRegistration_Lbl_SSN"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SSN") %></div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox ID="txtSsn2" placeholder="Last 4 digit SSN" globalize="ML_CustomerRegistration_txt_SSN" runat="server" title="SSN" Text="" MaxLength="4" TabIndex="4" onkeypress="javascript:return(IsNumeric(event))" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>
                            <%--<div class="clearfix"></div>--%>
                            <div id="divMeterId" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_ErrMsg_MeterNumber" style=""><%= CustomerPortal.Translator.T("ML_ErrMsg_MeterNumber") %></div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox globalize="ML_Msg_MeterID" ID="txtMeterId" runat="server" class="box" placeholder="Meter ID" value="" MaxLength="5" TabIndex="5" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>
                            <div id="divStreetNumber" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_CustomerRegistration_Lbl_StreetNumber"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_StreetNumber") %></div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox globalize="ML_CustomerRegistration_Txt_StreetNumber" ID="txtStreetNumber" placeholder="Street Number" runat="server" class="box" title="Street Number" value="" MaxLength="5" TabIndex="5" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>
                            <div id="divDl" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_CustomerRegistration_Lbl_Dl"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Dl") %></div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox globalize="ML_CustomerRegistration_txt_DrivingLicense" ID="txtDL" runat="server" class="box" placeholder="Driving License" value="" MaxLength="50" TabIndex="6" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>
                            <div id="divPrimaryPhone" runat="server" style="display: none">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" globalize="ML_CustomerRegistration_Lbl_MobileNum"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></div>
                                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                    <asp:TextBox globalize="ML_CustomerRegistration_Txt_PrimaryPhone" ID="txtPrimaryPhone" placeholder="Primary Phone" runat="server" class="box" value="" MaxLength="14" TabIndex="7" ClientIDMode="Static"></asp:TextBox>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <asp:Button globalize="ML_Master_btn_Submit" CssClass="registration_btn" ID="SubmitBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Master_btn_Submit") %>' TabIndex="8" ClientIDMode="Static"
                        Style="display: inline-block; margin-right: 7px;" OnClientClick="return false;" />
                    <asp:Button ID="btnclose" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' globalize="ML_Common_Navigation_cancel" class="registration_btn" data-dismiss="modal" TabIndex="7" Style="float: left; margin-left: 6px;" />

                </div>


            </div>

        </div>
    </div>

    <span globalize="ML_Title_My_Account" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_My_Account") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_Card_Delete" id="SuccessMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_Card_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_BankAccount_Delete" id="SuccessDelMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_BankAccount_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Transaction_Failed" id="TxnFailedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Transaction_Failed") %></span>
    <span globalize="ML_Account_Span_ErrMsg_BankInfo_Added" id="BankInfoAddedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_BankInfo_Added") %></span>
    <span globalize="ML_Account_Span_ErrMsg_CreditInfo_Added" id="CrInfoAddedMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_CreditInfo_Added") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth" id="FailedAuthMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Failed_Auth") %></span>
    <span globalize="ML_Account_Span_ErrMsg_BankAccount_Updated_Success" id="BankUpdatedSucMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_BankAccount_Updated_Success") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth_Card" id="FailedAuthCardMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Failed_Auth_Card") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_CreditUpdate" id="CardUpdateSucMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_CreditUpdate") %></span>
    <span globalize="ML_Account_Span_ErrMsg_FailedTxn" id="FailedTxnMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_FailedTxn") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Select_PaymentInfo" id="PaymentInfMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Select_PaymentInfo") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Delete_Confirmation" id="DeleteConfMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Delete_Confirmation") %></span>
    <span globalize="ML_MyAccount_Msg_SuccesfulBankInfoUpdate" id="BankInfoAddedSucessMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_SuccesfulBankInfoUpdate") %></span>
    <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span><%--added by priyansha--%>
    <span globalize="ML_MyAccount_Msg_ValidPrimaryNo" id="ValidPrimaryNo" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_ValidPrimaryNo") %></span><%--added by priyansha--%>
    <span globalize="ML_MyAccount_ErrMsg_ValidAlternateNo" id="ValidAlternateNo" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_ErrMsg_ValidAlternateNo") %></span><%--added by priyansha--%>
    <span globalize="ML_MyAccount_Msg_DeleteCreditInfo" id="DeleteCreditCard" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteCreditInfo") %></span><%--added by priyansha--%>
    <span globalize="ML_MyAccount_Msg_DeleteBankInfo" id="DeleteBankAccount" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteBankInfo") %></span><%--added by priyansha--%>
    <span globalize="ML_MyAccount_Msg_InvalidRouting" id="InvalidRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_InvalidRouting") %></span>
    <span globalize="ML_MyAccount_Msg_NewRouting" id="NewRouting" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_NewRouting") %></span>


    <span id="EnterAllInfo"  style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>    
    <span id="SuccessCommAdd"  style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_CommAddSuccess") %></span>
    <span id="FailedCommAdd"  style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_CommAddFailed") %></span>
    <span id="ErrAddLine1" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_EnterAdd1Err") %></span>
    <span id="ErrAddLine2"  style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_EnterAdd2Err") %></span>
    <span id="ErrZip" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_ZipErr") %></span>
    <span id="ErrState"  style="display: none"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></span>
    <span id="ErrCity"  style="display: none"><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></span>
    <span id="uspsValidate" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_UspsValidate") %></span>
    <span id="uspsValidateSave" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_UspsValidateSave") %></span>
    <span id="uspsValid"  style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_UspsValid") %></span>
    <span id="uspsInvalid"  style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_UspsInvalid") %></span>
    <span  id="DeleteAccountAddress" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteAddressInfo") %></span>
    <span  id="spDefaultAddress" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DefaultAddress") %></span>
    <span  id="ML_ErrorLength_Msg_AccountNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_ErrorLength_Msg_AccountNumber") %></span>
     <span id="ML_Msg_POBox" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_POBox") %></span>
     <span  id="ML_MyAccount_Msg_AddLine1" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine1") %></span>
     <span  id="PoBlankText" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_EnterValidPOBox") %></span>
     <span  id="AddressLine1" style="display: none"><%= CustomerPortal.Translator.T("ML_validAddressLine1") %></span>
    <span id="Notificationtxt" style="display:none"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Notific") %></span>
    
</asp:Content>

