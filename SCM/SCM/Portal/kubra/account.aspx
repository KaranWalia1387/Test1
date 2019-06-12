<%@ Page Title="SCM - My Account" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" EnableEventValidation="false" CodeBehind="account.aspx.cs" Inherits="CustomerPortal.accountkubra" %>
<%@ Register Src="~/kubra/UserControl/AddUpdatePayment.ascx" TagPrefix="uc1" TagName="AddUpdatePayment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="grid-style.css" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/jquery-1.8.3.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/MyAccount.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <link href="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.min.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <script src="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <link href="<%#string.Format("{0}/js/w2Ui/w2ui-1.4.2.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
    
    <script src="<%#string.Format("{0}/js/jquery.creditCardValidator.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <style type="text/css">
        #grid_wugrid_toolbar {
            display: none !important;
        }

        #grid_wugrid_body {
            top: 0 !important;
        }

        label#lblcardtype img {
            margin-right: 3px;
        }

        .input-phone {
            background: #fff;
        }

        .profile-details {
            width: 100%;
            padding: 11px 22px;
        }

        .gray-box {
            padding: 9px 22px;
        }

        .gray-box_rem_marg {
            padding: 6px 22px !important;
        }

        .selector-text {
            margin: 0px;
            font-weight: bold;
        }

        .power-plan-selector span {
            padding: 0px;
        }

        .inner-right-sub {
            padding-top: 0px;
        }

        .my_account_divider {
            border-top: 1px solid #ccc;
            float: left;
            margin-bottom: 10px;
            margin-left: 0px;
            margin-top: 11px;
            width: 100%;
        }

        .profile-details .name-feild {
            font-weight: bold;
        }

        .profile-details table td, th {
            padding: 7px 10px;
            width: 20%;
            border: 1px solid #ccc;
            border-spacing: 0px;
            border-collapse: collapse;
        }

        .my_acc_tbl table td, th {
            width: 80%;
            padding-left: 3%;
        }

        .my_acc_tbl .address-1 {
            width: 50%;
        }


        .my_acc_tbl table td:nth-child(2n+1), th:nth-child(2n+1) {
            width: 20%;
            padding-left: 3%;
        }

        .acc_inner_box_1 .profile-details:nth-child(odd) {
            background: #f4f4f4;
        }

        .acc_inner_box_1 .profile-details input {
            margin-top: 1px;
        }

        .add-card a {
   background: #4b84bb none repeat scroll 0 0;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding: 3px 4px 2px !important;
    text-decoration: none;
}

         .add-card a:hover {
   background: #7c7c7c none repeat scroll 0 0;
    color: #fff;
}

        .add-card {
            cursor: pointer;
    width: 59% !important;
    padding: 0 3.5% 0;
        }

        .submit-button {
    background: #86bf1a none repeat scroll 0 0 !important;
    border: medium none !important;
    color: #f0f0f0 !important;
    float: right;
    font-size: 14px;
    font-weight: bold;
    height: 25px;
    margin-right: 10px;
    padding: 3px 27px !important;
    text-align: center;
}

        .right_content_box {
            height:96.6% !important;
        }

        .modal-dialog {
    margin: 15px auto;
    width: 420px;
}
        .popup_area .popup_area_home .popup_right_content_area_home {
    float: left;
    margin: 0 0 3px;
    width: 100%;
}
        .popup_area .popup_area_home .popup_left_content_area_home {
    float: left;
    margin: 0 0 1px;
    padding-top: 6px;
    width: 100%;
}

        .popup_area {
    bottom: 0;
    height: auto;
    left: 0;
    max-width: 56%;
    padding: 0 !important;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
}

@media (min-width:1400px) and (max-width:3000px) {
      .energy_mid_box .right_content_box {
            height:97% !important;
        }

      .energy_mid_box {
          padding-bottom:20px !important;
      }
}

    </style>



    <script type="text/javascript">

        //Added by Ruchika Chauhan on 19-Feb-2015 for W2UI grid
        var r = '';
        var databindtogrid;
        var editcolumn = false;
        var flagDeleteRow = false;

        function LoadGrid(name) {
            $('#wugrid').w2grid({
                name: name,
                show: {
                    toolbar: false,
                    footer: false
                },
                multiSearch: true,
                searches: [
                     { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', type: 'text' },
                     { field: 'Number', caption: 'Number', type: 'text' },
                     { field: 'NickName', caption: 'Nick Name', size: '20%', type: 'text' },
                     { field: 'Default', caption: 'Default', size: '20%', type: 'text' }

                ],
                columns: [
                    {
                        field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '20%', sortable: true, render: function (record) {
                            if (record.CardTypOrBankAcc == 0)
                                return 'Bank Account';
                            else
                                return 'Credit Card';
                        }
                    },
                    { field: 'Number', caption: 'Number', size: '30%', sortable: true },
                    { field: 'NickName', caption: 'Nick Name', size: '30%', sortable: true },
                    {
                        field: 'img', caption: '', size: '15%', sortable: true,
                        render: function (record) {
                            return '<div id="' + record.accountID + '" accounttype="' + record.CardTypOrBankAcc + '"  title="Delete" class="deleterow"><img src="../images/icon_delete.png" /></div>';
                        }
                    }
                ],

                records: databindtogrid,

            });
        }

        $(document).ready(function () {
            try {
                var paymentdata = accountkubra.LoadW2UIGridData().value;
                if (paymentdata != null) {
                    databindtogrid = paymentdata.Rows;
                    if (databindtogrid.length != 0 || databindtogrid != null) {
                        LoadGrid('wugrid');
                    }
                }
            }
            catch (e) {
                console.log(e.message);
            }
            k('.deleterow').live('click', function (e) {
                try {
                    var grid = this;
                    var res = w2confirm('Do you want to delete?', function (obj) {
                        if (obj == 'Yes') {
                            // flagDeleteRow = true;

                            var msg = accountkubra.deleteRecord(grid.id, $(grid).attr('accounttype')).value;

                            w2alert(msg);
                            databindtogrid = accountkubra.LoadW2UIGridData().value.Rows;
                            if (databindtogrid.length != 0 || databindtogrid != null) {
                                //The following code loads w2ui grid with a different name everytime a record is deleted.                                
                                LoadGrid($('#wugrid').attr('name') + Math.floor((Math.random() * 100) + 7));

                            }
                        }
                    }
                    )
                }
                catch (e) {
                    console.log(e.message);
                }
            });

        });

        //Added till here.
    </script>




</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="myaccount" />
    <section class="inner_mid_section">
      <div class="container inner-mid-container">
      <div class="energy_mid_box">
            	<h1><img src="../images/icon_myaccount_sidebar.svg" style="padding-right:7px; margin-top: -3px; float: left;">
                    <span class="head_icon_flat icon_myaccount"></span>
                <span globalize="ML_MYACCOUNT_h1_Myaccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_h1_Myaccount") %></span></h1>
               	    <div class="sidebar_toggle">Sidebar Navigation</div>
                    <div class="nav_left"> 
                	    <ul>
                    	    <li class="icon_profile active"><a><span globalize="ML_MYACCOUNT_Navigation_Profile"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Navigation_Profile") %></span></a></li>
                            <li class="icon_setting"><a href="../Settings.aspx"><span globalize="ML_MyAccount_div_Settings"><%= CustomerPortal.Translator.T("ML_MyAccount_div_Settings") %></span></a></li>            
                           <%-- <li class="icon_paymentInfo"><a href="PaymentInfo.aspx">Payment Info</a></li> 
                                <li class="marketing_pref"><a href="Preference.aspx"><span globalize="ML_MarketingPreference">Marketing Preference</span></a></li> --%>           
                            <li class="ico_recurringpayment"><a href="recurringpayment.aspx"><span>Recurring Payment</span></a></li>            
                        </ul>
                        <div class="banner_left_img">
                            <a href="programs.aspx"> <img src="../images/banner_ads/image004.png" /></a>
                            <a href="programs.aspx"><img src="../images/banner_ads/image003.png" /></a>
                        </div>
                     </div>
                    <div class="right_content_box" style="position:relative;">  
                        <div style="height:100%; overflow:auto;">              	
                           <div class="inner-right-right-section">
                                <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border:0px;">
                                    <div class="profile-details">
                                        <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_Name" ><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Name") %></div>
                                        <div class="sub-name"><asp:Label ID="lblName" runat="server" Text=""></asp:Label></div>
                                    </div>                                   
                                    <div class="profile-details">
                                        <div class="name-feild" globalize="ML_MYACCOUNT_Lbl_CustomerAccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_CustomerAccount") %></div>
                                        <div class="sub-name"><asp:Label ID="lblCustomerAccount" runat="server" Text="" ></asp:Label></div>
                                    </div>                                    
                                    <div class="profile-details  gray-box_rem_marg">
                                        <div class="name-feild" style="padding-top:5px;"><span globalize="ML_CustomerRegistration_Lbl_MobileNum"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></span><span></span></div>
                                        <asp:TextBox ID="txtPhone" globalize="ML_MYACCOUNT_Txt_PrimaryPhone" placeholder="Primary Phone" runat="server" title="Primary Phone" mandatory="1" ismobile="1" class="input-phone txtPhone" ClientIDMode="Static" onblur="javascript:validatePhone(document.getElementById('txtPhone'),'1')"
                                            MaxLength="12" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>            
                                    </div>
                                    <div class="profile-details gray-box_rem_marg">
                                        <div class="name-feild" style="padding-top:5px;"><span globalize="ML_CustomerRistration_AlternateNum"><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></span><span></span></div>
                                        <asp:TextBox ID="txtmob" globalize="ML_MYACCOUNT_Txt_AlternatePhone" placeholder="Alternate Phone" runat="server" title="Alternate Phone" class="input-phone txtmob" ClientIDMode="Static" onblur="javascript:validatePhone(document.getElementById('txtmob'),'1')"
                                            MaxLength="12" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>
                                    </div>
                                    <div class="profile-details gray-box_rem_marg">
                                        <div class="name-feild" style="padding-top:5px;"><span globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></span><span></span></div>
                                        <asp:TextBox ID="txtEmail" globalize="ML_MYACCOUNT_Txt_EmailId" placeholder="Email ID" runat="server" title="Email ID" mandatory="1" class="input-phone txtEmail" ClientIDMode="Static"
                                        MaxLength="50" ></asp:TextBox>
                               	        </div>	
                    	        </div>
                                <hr class="my_account_divider " />
                               <div class="inner-right-sub" style="background:#ededed;padding-bottom: 5px;padding-top: 5px; border:0px;">
                                    <div class="profile-details" style="padding: 0.3% 0 0.3% 2.8%;">
                                        <div class="inner-address"><b><span globalize="ML_MYACCOUNT_Lbl_BillingAddress"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_BillingAddress") %></span></b> (<span globalize="ML_MyAccount_span_Default"><%= CustomerPortal.Translator.T("ML_MyAccount_span_Default") %></span>)</div>
                                    </div>   
                    		    </div>
                                <div class="inner-right-sub" style="border:0px;">
                                                                           
                                        <div class="my_account_table">
                                     <div class="profile-details my_acc_tbl" style="padding:0px;">
                                <table border="0" width="100%">
                                <tr>
                              
                                <td style="border-bottom:0px;"><div class="default-address-1">                                    
                                    <strong><span globalize="ML_MYACCOUNT_Lbl_Default"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Default") %></span></strong>
                                </div></td>
                                <td style="border-bottom:0px;"><div class="address-1">                                    
                                    <strong><span globalize="ML_CONFIRM_BILL_Lbl_PropertyAddress"><%= CustomerPortal.Translator.T("ML_CONFIRM_BILL_Lbl_PropertyAddress") %></span></strong>
                                </div>           </td>                         
                               
                                    </tr>
                                    </table>                                
                            </div>                                                                            
                                        <div class="profile-details my_acc_tbl" style="padding:0">
                                             <table border="0" width="100%">
                                            <asp:Repeater ID="rpt_Address" runat="server" ClientIDMode="Static">                                        
                                                <ItemTemplate>  
                                                    <tr><td >
                                                    <div class="default-address-1">  
                                                        <input id="rdobtnProperty" type="radio" name="properties" onchange="propertyChange(this);" defaultpayment="<%#Eval("DefaultPayID")%>:<%#Eval("DefaultPayType")%>" value='<%#Eval("AccountNumber")%>:<%#Eval("AddressId")%>' class="address-button-billing" <%#string.IsNullOrEmpty(Eval("DefaultAddressId").ToString())?"":"checked='checked'"%>  /></div>
                                                        </td>
                                                    <td >
                                                    <div class="address-1" >  <label id="lblpropertyaddress"><%#Eval("Properties") %></label></div>
                                                        </td></tr>                                                            
                                                    <div class="clear_both"></div>
                                                    </ItemTemplate>
                                            </asp:Repeater>
                                                 </table>
                                        </div>    
                                            </div>
                    	        </div>
                               <hr class="my_account_divider" />
                                 <div id="divPayment" runat="server" class="inner-right-sub" style="border:0px;">
                                    <div class="profile-details" style="background:#ededed;padding-bottom:8px;padding-top:8px; padding-right:0;">
                                        <div class="inner-address" style="width:40%; float:left;"><b><span globalize="ML_MYACCOUNT_Lbl_PaymentInfo"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_PaymentInfo") %> </span></b>(<span globalize="ML_MyAccount_span_Default"><%= CustomerPortal.Translator.T("ML_MyAccount_span_Default") %></span>)</div>
                                    
                                     <div class="buttons_area" style="width:34%; float:right; margin:0; text-align:right; border-bottom:0; padding-top:0;">
                                        <uc1:AddUpdatePayment runat="server" id="AddUpdatePayment" />
                                            <asp:Button ID="btnSaveAll" runat="server" ClientIDMode="Static" CssClass="submit-button" Text="Save All" OnClientClick="return false;" globalize="ML_MYACCOUNT_Button_SaveAll" style="margin-bottom:0;" />
                                     </div> 
                                        </div> 
                                    <div class="profile-details" style="display:none;">
                                        <div class="address-1" globalize="ML_MYACCOUNT_Lbl_CardType"  style="width:35%; display:none;"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_CardType") %></div>
                                        <div class="address-1" style="display:none;" globalize="ML_MYACCOUNT_Lbl_Number"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Number") %></div>
                                        <div class="address-1" style="width:20%; display:none;" globalize="ML_MYACCOUNT_Lbl_ExpDate"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_ExpDate") %></div>
                                        <div class="address-1" style="width:10%; display:none;" globalize="ML_MYACCOUNT_Lbl_Default"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_Default") %></div>
                                     </div>
                                      
                                     
   <div id="wugrid" style="height:280px !important;overflow:auto; width:100% !important;z-index:99;">
                                        </div>
                                    <asp:Repeater ID="rpt_payment" runat="server" Visible="false">
                                        <ItemTemplate>
                                             <div class='<%#Container.ItemIndex%2==0?"gray-bar":"white-bar" %>'>
                                                 <div class="address-1" style="width:35%;"><label id="lblcardtype">
                                                  
                                                          <%#Eval("Data").ToString().Split('|')[1]%></label>
                                                      &nbsp;</div>
                                                      <div class="address-1" >
                                                          <label id="lblcardnumber">***********<%#Eval("Data").ToString().Split('|')[2].Substring(Eval("Data").ToString().Split('|')[2].Length-4)%></label></div>
                                                      <div class="address-1" style="width: 20%">
                                                          <label id="lblExpdate"><%# Eval("Type").ToString()=="1"?Eval("Data").ToString().Split('|')[3]:""%></label>
                                                      </div>
                                                      <div class="address-1" style="width:16px;">
                                                          <%--BUG 801 - START  --%>
                                                          <input type="radio" name="payment" value='<%#Eval("Data").ToString().Split('|')[0]%>:<%#Eval("Type") %>' class="right-button" <%#(Eval("DefaultPayType").ToString()==Eval("Type").ToString()&&Eval("Defaultpayid").ToString()==Eval("Data").ToString().Split('|')[0])?"checked='checked'":""%> />
                                                          <label <%#Eval("Data").ToString().Split('|')[4].ToLower()=="verified"?"style='display:none;'":""%>><%#Eval("Data").ToString().Split('|')[4]%></label>
                                                          <%--BUG 801 - END  --%>
                                                      </div>
                                                      <div class="right-icons">
                                                          <img id='<%#Eval("Data")%>|<%# Eval("Type")%>' src="images/icon_mark.png" alt="edit" class="edit" data-toggle="modal" data-target="#divPopup" />
                                                          <img name='<%#Eval("Data")%>|<%# Eval("Type")%>' src="images/icon_delete.png" class="delete" title="delete" id="delete" clicked="0" />
                                                      </div>
                                                 </div>
                                         </ItemTemplate>
                                    </asp:Repeater>
                                </div>
                                                
              			    </div> 
                          </div>  
                         <%--<div class="setting_save_box">
                                 
                               </div>  --%>                           
                    </div><!-- End Right Box -->
                 </div>
    </div>
    </section>
    <span globalize="ML_ACCOUNT_h4_PaymentMode" id="addtext" style="display: none"></span>
    <span globalize="ML_ACCOUNT_h4_PaymentModeEdit" id="edittext" style="display: none"></span>
    <span globalize="ML_Title_My_Account" id="titletext" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_Card_Delete" id="SuccessMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_BankAccount_Delete" id="SuccessDelMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Transaction_Failed" id="TxnFailedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_BankInfo_Added" id="BankInfoAddedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_CreditInfo_Added" id="CrInfoAddedMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth" id="FailedAuthMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_BankAccount_Updated_Success" id="BankUpdatedSucMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth_Card" id="FailedAuthCardMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_CreditUpdate" id="CardUpdateSucMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_FailedTxn" id="FailedTxnMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Select_PaymentInfo" id="PaymentInfMsg" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Delete_Confirmation" id="DeleteConfMsg" style="display: none"></span>
</asp:Content>

