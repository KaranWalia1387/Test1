<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MyAccount.master" Title="Payment Info" CodeBehind="Payment_info.aspx.cs"  Inherits="CustomerPortal.Payment_info" %>

<%@ Register Src="~/UserControls/AddUpdatePayment.ascx" TagPrefix="uc1" TagName="AddUpdatePayment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
  
     <%: System.Web.Optimization.Styles.Render("~/Content/cssMyAccountPaymentInfo") %>
     <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyAccountPaymentInfo")%>
   

   <%-- <link href="css/font-awesome.css" rel="stylesheet" type="text/css" />--%>
      <style type="text/css">
           #divValidateLogin .modal-content{
              padding-bottom:0 !important;
          }
        #divValidateLogin  .popup_area .bottom_area_home{
              overflow:hidden !important;
              padding:10px 10px 0px 10px !important;
          }
         #divValidateLogin .modal-body {
    padding: 1px 0 0px !important; 
} 
        #divPopup .modal-content { 
    padding-bottom: 0px !important; 
}
        #divPopup .cancel-button{
            margin-bottom:0 !important
        }
       #divPopup  .popup_area .bottom_area_home { 
    padding: 10px 10px 0px 10px !important; 
    overflow:hidden !important;
}
        .profile-details table td, th 
        {
    padding: 7px 10px;
    width: 20%;
    border: 1px solid #ccc;
    border-spacing: 0px;
    border-collapse: collapse;
}
        .my_acc_tbl .address-1 {
    width: 93%;
}
        .popup_area .popup_area_home{
            width:100%;
        }
         .popup_area .popup_area_home .popup_left_content_area_home {
                background: #f2f2f2 none repeat scroll 0 0;
                border-top: 1px solid #b7b7b7;
                float: left;
            color: #5c5c5c;
                margin: 0 0 1px;
                padding: 6px 13px;
                width: 100%;
            }

            .popup_area .popup_area_home .popup_right_content_area_home {
                float: left;
                margin: 0 0 3px;
                padding: 7px 13px 6px;
                width: 100%;
            }

        .payment_info_tbl > table tr th, .payment_info_tbl >  table tr td {
            border:1px solid #ccc;
            font-size:12px;
            padding: 5px 8px;
        }
        .payment_info_tbl > table tr th {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f7f7f7+2,e4e4e4+100 */
            background: #f7f7f7; /* Old browsers */
            background: -moz-linear-gradient(top,  #f7f7f7 2%, #e4e4e4 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  #f7f7f7 2%,#e4e4e4 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  #f7f7f7 2%,#e4e4e4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#e4e4e4',GradientType=0 ); /* IE6-9 */
            padding: 11px 8px;
            }

            .payment_info_tbl > table tr:nth-child(even) td {
               background:#f3f6fa;
                }
        .card_type_img {
                width: 57px;
                 float: left;
                 text-align:center;
        }
        .payment_info_tbl > table tr td label, .payment_info_tbl > table tr td input[type="radio"] {
            margin-bottom:0px;
            margin-top:0px;
        }
        .payment_info_tbl > table tr:hover td{
            background:#e6f0ff;
        }

        .card_type_img > img {
          max-height: 31px;
          float: none;
        }
        .card_type_lbl {
            float: left;
            padding-top:9px;
            font-size: 12px;
            }
        .add-card {
            padding: 0.8% 3.5% 0 17px;
        }
        .edit_del_btn {
            text-align:center;
        }
        .edit_del_btn > div {
            float:none;
            display:inline-block;
        }
        
                  .popup_area_new .popup_area_home {
                color: #808080;
                display: block;
                font-size: 14px;
                margin: 2% auto 0;
                width: 90%;
            }

                    .popup_area_new .bottom_area_home {
                border-top: 2px solid #b9b9b9;
                clear: both;
                margin-top: 25px;
                padding: 10px;
            }

                    .popup_area_new .popup_left_content_area_home {
                float: left;
                margin: 0 0 10px;
                padding-top: 6px;
                width: 36%;
            }
            .popup_area_new .popup_right_content_area_home {
                float: left;
                margin: 0 0 10px;
                width: 64%;
            }
            .noti_wrapper_box {
                position:relative;
                float:left;
            }
            .tootip_popup_box {
                display:none;
            }
            .noti_wrapper_box img {
                cursor:pointer;
            }
            .tootip_popup_box {
                width:180px;
                padding:5px 10px;
                background:#fff;
                border:1px solid #ccc;
                position:absolute;
                left:0;
                bottom: 30px;
                 box-shadow: 0px 0px 5px #ccc;
                 font-size: 14px;
                     border-radius: 4px;
            }

            .arrow_icon_1 {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 7px solid #fff;
                position: absolute;
                bottom: -7px;
                left: 17px;
            }
            .w2ui-tag .w2ui-tag-body {
    top: 8px !important;
    left: 0 !important;
}
            .w2ui-tag .w2ui-tag-body:before {
    bottom: 3px !important;
    left: 5px !important;
}
            #errorMsg{
                top:14px !important
            }
            #changeUIbody .popup_left_content_area_home{
                background:none;
                border:none
            }
           #changeUIbody .popup_right_content_area_home {
    width: 64% !important; 
}
           #changeUIbody .popup_left_content_area_home {
    width: 36% !important; 
}
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#txtPassword').disableAutocomplete();
            $('#divValidateLogin').modal('show');
          
        });

        $(document).ready(function () {
            $("#change-pwd-divPopup .modal-dialog").removeClass("popup_area");
            $("#change-pwd-divPopup .modal-dialog").addClass("popup_area_new");
        });
    </script>
    <script type="text/javascript">
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
                fixedBody: false,
                searches: [
                     { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', type: 'text' },
                     { field: 'Number', caption: 'Number', type: 'text' },
                     { field: 'EXPDate', caption: 'EXP Date', size: '20%', type: 'text' },
                     { field: 'Default', caption: 'Default', size: '20%', type: 'text' }

                ],
                columns: [
                    { classname: 'ML_MYACCOUNT_Lbl_CardType', field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '25%', sortable: true, resizable: false },
                    { classname: 'ML_MyAccount_Lbl_CardNum', field: 'Number', caption: 'Number', size: '23%', sortable: true, resizable: false },
                    { classname: 'ML_MyAccount_Lbl_ExpDt', field: 'EXPDate', caption: 'EXP Date', size: '18%', sortable: true, resizable: false },
                    { classname: 'ML_MyAccount_Lbl_Deflt', field: 'Default', caption: 'Default', size: '16%', sortable: true, resizable: false },
                    {
                        classname: 'ML_MyAccount_Lbl_EdtorDel', field: 'img', caption: '', size: '13%', sortable: true, resizable: false,
                        render: function (record) {
                            return '<div id="' + record.img + '" style="float:left" title="Click to Edit payment info" data-toggle="modal" data-target="#divPopup" globalize="ML_MyAccount_Span_Edit" class="edit"><img src="images/icon_mark.png" style="cursor:pointer"/></div><div id="' + record.img + '" title="Click to Delete payment info" globalize="ML_Billing_Span_Delete"  class="deleterow"><img src="images/icon_delete.png" style="cursor:pointer"/></div>';
                        }
                    }
                ],

                records: databindtogrid,
                onRender: function (event) {
                    w2UiTranslateGridHeaders(this);
                }
            });
        }

      
    </script>
    <script type="text/javascript">
        function refresh() {
            
            if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
                $("#devices").addClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
                $("#devices").addClass('inner_uni2');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
                $("#devices").addClass('inner_uni3');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
                $("#devices").addClass('inner_uni4');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
            }
            else {
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }

        }
        $(document).ready(function () {
            refresh();
            $(window).on('resize', refresh);
            $('#btnclosepopup1').click(function ()
            {
                parent.history.back();
                return false;
            });

            $('#btnCancelpwd').click(function () {
                parent.history.back();
                return false;
            });

            $('#txtPassword').keypress(function (e) {
                if (e.keyCode == 13 && $('#txtPassword').val() == "")
                {
                    //alert('Please enter password.');
                    toastr.warning('Please enter password.');
                    return false;
                }
                else if (e.keyCode == 13 && $('#txtPassword').val() != "") {
                    $('#btnValidateLogin').trigger('click');
                }
            })
        });
    </script>
    <input type="hidden" class="activeli_list" value="myaccount" />
    <div class="right_content_box" style="position: relative;">
        <div  class="top_conte_box_mob" style="height: 89%; overflow: auto;" class="height">
            <div class="inner-right-right-section">
                <div class="AccountProfile" style="width: 100%; position: relative; padding: 10px;">
                    <div class="inner-address">
                        <b><span globalize="ML_MYACCOUNT_Lbl_PaymentInfo"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_PaymentInfo") %> </span></b>
                        <span globalize="ML_MyAccount_span_Default"><%= CustomerPortal.Translator.T("ML_MyAccount_span_Default") %> </span>
                    </div>
                </div>
                <div id="wugrid" style="width: 100% !important; z-index: 99;display:none">
                </div>
                 <div class="payment_info_tbl" id="PaymentTable" style="padding: 0" ng-app="PaymentInfoApp" ng-controller="PaymentInfoController" ng-cloak>
                            <table border="0" width="100%" ng-show="paymentInfo.Table1 ||paymentInfo.Table2||paymentInfo.Table3">
                                <tr>

                                    <th style="width: 28%;">
                                          <span globalize="ML_MYACCOUNT_Lbl_CardType"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Lbl_CardType") %></span>
                                    </th>
                                    <th style="width: 32%;">
                                           <span globalize="ML_MyAccount_Lbl_CardNum"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_CardNum") %></span>
                                    </th>
                                    <th style="width:10%;">
                                        <span globalize="ML_MyAccount_Lbl_ExpDt"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_ExpDt") %></span>
                                    </th>
                                <%--    <th style="width: 20%;">
                                              <span globalize="ML_MyAccount_Lbl_Deflt"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_Deflt") %></span>
                                    </th>--%>
                                     <th style="width: 13%;">
                                          <span globalize="ML_MyAccount_Lbl_EdtorDel"><%= CustomerPortal.Translator.T("ML_MyAccount_Lbl_EdtorDel") %></span>
                                    </th>
                                    <th style="border-bottom: 0px; border-left: 0px; width: 0%; display: none"><strong><span globalize="">Default</span></strong></th>

                                </tr>
                                <%--<asp:Repeater ID="rpt_Address" runat="server" ClientIDMode="Static">
                                    <ItemTemplate>--%>

                                        <tr ng-repeat="x in paymentInfo.Table1">
                                            <td  style="width: 28%;">                                                
                                                   <span class="card_type_img"> <img alt="cardImage" ng-src="{{x.CardType|cardTypeImage}}" />  </span>
                                                   <span class="card_type_lbl"> <label id="lblpropertyaddress" ng-bind="x.CardType"></label> </span>
                                              
                                                <div class="noti_wrapper_box"><%--<img  ng-src="{{x.ExpiryDate|ExpiryCheck:$index}}" style="margin-left:10px;margin-top:10px;width:15px;height:12px" ng-mouseover="clickHover($event)" ng-mouseleave="hidepopup($event)" class="" />--%>
                                                  <i  ng-style="{{x.ExpiryDate|ExpiryCheck:$index}}" class="fa fa-exclamation-circle" aria-hidden="true" style="margin-left:10px;margin-top:10px;width:15px;height:12px" ng-mouseover="clickHover($event)" ng-mouseleave="hidepopup($event)"></i>
                                                    <div class="tootip_popup_box">
                                                        <div class="arrow_icon_1" id="arrow_icon_{{$index}}"></div>
                                                           Expired Card notification
                                                    </div>

                                                </div>
                                              
                                            </td>
                                            <td>
                                                 <label id="" ng-bind="x.Cardnumber|maskcardNumber"></label>
                                            </td>
                                            <td>                                               
                                                    <label id="lblutilitynumber_" ng-bind="x.ExpiryDate" ></label>
                                               
                                            </td>
                                           <%-- <td >                                               
                                                    <input id="rdobtnProperty" type="radio" name="properties" value="{{x.CreditCardId+':'+x.PaymentTypeID}}" ng-checked="(x.CreditCardId==defaultPayId && x.PaymentTypeID==DefaultPayType)" class="address-button-billing rdbdefault"/>
                                               
                                            </td>--%>
                                             <td >      
                                                  <div class="edit_del_btn">                                            
                                                    <div id="{{x|manageId}}" title="<%= CustomerPortal.Translator.T("ML_Billing_Span_edit") %>" globalize="" data-toggle="modal" data-target="#divPopup" class="edit"><img src="images/icon_mark.png" style="cursor:pointer"/></div>
                                                    <div id="{{x|manageId}}" title='<%= CustomerPortal.Translator.T("ML_Billing_Span_Delete") %>' globalize="ML_Billing_Span_Delete"  class="deleterow"><img src="images/icon_delete.png" style="cursor:pointer"/></div>
                                                   </div>                                               
                                            </td>
                                           

                                        </tr>

                                        <tr ng-repeat="x in paymentInfo.Table2">
                                            <td style="width: 28%;">
                                                <span class="card_type_img"> <img alt="cardImage" ng-src="images/Bank_Acc_icon.png" /></span>
                                                    <span class="card_type_lbl"> <label id="" ng-bind="x.BankName"></label> </span>
                                               
                                            </td>
                                            <td>                                              
                                                    <label id="" ng-bind="x.BankAccount|maskcardNumber"></label>                                                
                                            </td>
                                            <td>                                               
                                                    <label id=""></label>                                               
                                            </td>
                                         <%--   <td >
                                              
                                                    <input id="rdobtnProperty1" type="radio" value="{{x.BankAccountID+':'+x.PaymentTypeID}}" name="properties" ng-checked="(x.BankAccountID==defaultPayId && x.PaymentTypeID==DefaultPayType)"  class="address-button-billing rdbdefault"/>
                                                
                                            </td>--%>
                                             <td>                                              
                                                 <div class="edit_del_btn">   
                                                    <div id="{{x|manageId}}" style="display:none;" title="<%= CustomerPortal.Translator.T("ML_Billing_Span_edit") %>" globalize="" data-toggle="modal" data-target="#divPopup" class="edit"><img src="images/icon_mark.png" style="cursor:pointer"/></div>
                                                    <div id="{{x|manageId}}" title='<%= CustomerPortal.Translator.T("ML_Billing_Span_Delete") %>' globalize="ML_Billing_Span_Delete"  class="deleterow"><img src="images/icon_delete.png" style="cursor:pointer"/></div>
                                               </div>
                                             </td>
                                         

                                        </tr>
                                        <div class="clear_both"></div>
                                   <%-- </ItemTemplate>
                                </asp:Repeater>--%>
                                <tr style="display: none">
                                    <td colspan="2" style="display: none">
                                        <asp:LinkButton ID="lnkAddNew" runat="server"  data-target="#add-new-divPopup" data-toggle="modal" globalize="ML_Billing_Span_Delete" ><%= CustomerPortal.Translator.T("ML_Payment_info_Msg_AddNewAccount") %></asp:LinkButton></td>
                                </tr>
                            </table>
                        </div>
            </div>
            <!-- End Right Box -->
        </div>
        <div class="setting_save_box">
            <div class="buttons_area">
                <uc1:AddUpdatePayment runat="server" ID="AddUpdatePayment" />
                <asp:Button ID="btnSaveAll" runat="server" Visible="false" ClientIDMode="Static" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_MYACCOUNT_Button_SaveAll") %>' OnClientClick="return false;" globalize="ML_MYACCOUNT_Button_SaveAll" />
            </div>
        </div>
    </div>


    <div class="modal fade" id="divValidateLogin" role="dialog">
        <div class="modal-backdrop fade"></div>
        <div class="modal-dialog popup_area" style="width: 400px;">
            <div class="modal-content">
                <div class="modal-header" style="padding: 7px 15px;">
                  <%--  <button type="button" id="" class="close " data-dismiss="modal">X</button>--%>
                    <button type="button" id="btnclosepopup1" class="close " data-dismiss="modal">
                    <img src="images/cross-icon.png"></button>
                    <h4 class="modal-title" id="myModalLabelheadertext1" globalize="ML_LOGIN_Lbl_Password"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_Password") %></h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;">&nbsp;</div>
                        <div id="div1" runat="server" clientidmode="Static">
                        
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" style="background:none !important; float: left !important;width: 30% !important;border: 0 none;line-height: 33px;" globalize ="ML_LOGIN_Lbl_Password"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_Password") %></div>
                            <div class="popup_right_content_area_home"  style="width: 69%;">
                                <asp:TextBox ID="txtPassword" runat="server" mandatory="1" TextMode="Password" globalize="ML_LOGIN_Lbl_Password"
                                    MaxLength="16" ClientIDMode="Static" title="Password" CssClass="form-control" AutoCompleteType="None"></asp:TextBox>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <asp:Button ID="btnValidateLogin" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' class="submit-button" data-toggle="modal" data-target="#divPopup1" globalize ="ML_Default_Button_Submit" OnClientClick="return false;" ClientIDMode="Static" />
                        <input id="btnCancelpwd" type="submit" class="cancel-button" value='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' globalize="ML_Common_Navigation_cancel" onclick="return false;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <asp:HiddenField ID="hdnDefaultPaymentMode" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnpayjuntionid" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnvaultid" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnUserName" runat="server" ClientIDMode="Static" />
    <span globalize="ML_ACCOUNT_h4_PaymentMode" id="addtext" style="display: none"></span>
    <span globalize="ML_ACCOUNT_h4_PaymentModeEdit" id="edittext" style="display: none"></span>
    <span globalize="ML_Title_My_Account" id="titletext" style="display: none"></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_Card_Delete" id="SuccessMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_Card_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Success_BankAccount_Delete" id="SuccessDelMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Success_BankAccount_Delete") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth" id="FailedAuthMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Failed_Auth") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Failed_Auth_Card" id="FailedAuthCardMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Failed_Auth_Card") %></span>
    <span globalize="ML_Account_Span_ErrMsg_FailedTxn" id="FailedTxnMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_FailedTxn") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Select_PaymentInfo" id="PaymentInfMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Select_PaymentInfo") %></span>
    <span globalize="ML_Account_Span_ErrMsg_Delete_Confirmation" id="DeleteConfMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Account_Span_ErrMsg_Delete_Confirmation") %></span>
    <span globalize="ML_MyAccount_Msg_DeleteCreditInfo" id="DeleteCreditCard" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteCreditInfo") %></span>
    <span globalize="ML_MyAccount_Msg_DeleteBankInfo" id="DeleteBankAccount" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_DeleteBankInfo") %></span>
    <span globalize="ML_MyAccount_ErrMsg_DelDefault" id="DefaultDelete" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_ErrMsg_DelDefault") %></span>
    <span globalize="ML_MyAccount_PayemntInfo_InvalidPassword" id="InvalidPassword" style="display:none;"><%= CustomerPortal.Translator.T("ML_MyAccount_PayemntInfo_InvalidPassword") %></span>    
    <span globalize="ML_Login_Span_ErrMsg_Password" id="passwordErrorMsg" style="display:none;"><%= CustomerPortal.Translator.T("ML_Login_Span_ErrMsg_Password") %></span>
    <span globalize="ML_PaymentInfo_ExpiredCardMsg" id="ML_PaymentInfo_ExpiredCardMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_PaymentInfo_ExpiredCardMsg") %></span>
    <span globalize="ML_PaymentInfo_ExpiryCardMsg" id="ML_PaymentInfo_ExpiryCardMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_PaymentInfo_ExpiryCardMsg") %></span>
</asp:Content>
