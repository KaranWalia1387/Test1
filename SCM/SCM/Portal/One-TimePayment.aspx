<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="One-TimePayment.aspx.cs" Inherits="CustomerPortal.NewOneTimePayment" enableEventValidation="false" %>

<%@ Register Src="UserControls/Footer.ascx" TagName="Footer" TagPrefix="uc1" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc2" TagName="Footer" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <title globalize="ML_Default_Title_SmartEnergy"><%= CustomerPortal.Translator.TT_ProductName("ML_DASHBOARD_Lbl_PayBill") %> </title>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    
    
    
    <!-- Message for disable javascript in Browser -->
    <noscript>
        For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
    </noscript>

    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <%: System.Web.Optimization.Styles.Render("~/Content/cssNewOnetimepayment") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsNewOnetimepayment")%>
    
    <link id="stylecss" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link id="stylecss" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <script type="text/javascript" src="js/print.js"></script>
    <link href="css/print.css" rel="stylesheet" />
     <script language="javascript" type="text/javascript">
        $(function () {
            $("#hrefPrint").click(function () {
                // Print the DIV.
                $("#divthankpay").print();
                return (false);
            });
        });
    </script>
    <script src="js/loader.js"></script>
    <style type="text/css">
        .login-page input[type="text"]:-webkit-autofill {
                -webkit-text-fill-color: #000 !important;
                -moz-text-fill-color: #000 !important;
        }
        .bottom_billed_boxes {
              border-bottom: 0px solid #fff;
        }
        #divthankpay {
                float: left;
    width: 100%;
    background: #fff;
        }
      
        #errorMsg {
            right: 10px !important;
            top: 18px !important;
        }

        #submitteddetailvalue {
            background:#fff;
        }

        .profile-details {
            padding:0 !important;
            width:100%;
        }

        .btn-default-login {
            padding: 7px 6% !important;
        }

        .carousel-inner {
            background: none !important;
            -webkit-background-size: cover;
        }

        .upper_text {
            width: 100%;
            margin: 0px !important;
            display: table;
        }

        .profile-details {
            padding-top: 0px;
        }

            .profile-details p {
                margin: 14px 0px;
                padding: 0px;
                font-size: 14px;
                color: #000;
            }

            .profile-details h2 {
                margin: 0px;
                padding: 0px;
                font-size: 16px;
                color: #000;
                font-weight: bold;
            }

            .profile-details label {
                margin: 0px;
                padding: 0px;
                font-size: 14px;
                color: #000;
                font-weight: normal;
            }

            .profile-details span {
                margin: 0px;
                padding: 0px;
                font-size: 14px;
                color: #000;
            }

            .profile-details input[type="text"], .profile-details select, .profile-details input[type="password"] {
                padding: 6px 8px;
                border: 1px solid #bbb;
                color: #000;
                background-color: #fff;
                line-height: normal;
                font-size: 13px;
                margin-right: 7px;
                width: 90%;
                border-radius: 4px;
            }

            .profile-details table td {
                padding: 9px 23px 9px 23px;
            }

        .table-responsive tr:nth-child(even) td {
            background: #f3eeee;
        }

        #PaymentInfo.table-responsive tr:nth-child(odd) td {
            background: #f3eeee;
        }

        #PaymentInfo.table-responsive tr:nth-child(even) td {
            background: #fff;
        }

        @media (min-width: 1200px) {
            .one_time_payment_form.container {
                background: #fff;
                width: 1149px;
                margin-top: 19px;
                padding-top: 6px;
            }
        }

        @-moz-document url-prefix() {
            .tble_width_ie {
                width: 167px !important;
            }
        }

        @media screen and (min-width:0\0) {
            .tble_width_ie {
                width: 168px !important;
            }
        }

        .w2ui-tag .w2ui-tag-body {
            background-color: rgba(60,60,60,.82);
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            padding: 4px 10px;
            margin-left: 90px !important;
            margin-top: 0;
            color: #fff !important;
            box-shadow: 1px 1px 3px #000;
            line-height: 100%;
            font-size: 11px;
            font-family: Verdana,Arial,sans-serif;
                 bottom: 6px;
    left: -275px;
        }
        .w2ui-tag .w2ui-tag-body:before {
                border-left: 5px solid transparent !important;
            border-top: 5px solid rgba(60,60,60,.82) !important;
            border-right: 5px solid transparent !important;
            margin: 16px 2px 0 5px !important;
        }
        .buttons_area {
            padding: 0% 2% 0% 2%;
            border-top: 1px solid #cecaca;
        }

        .one_time_payment_form.container {
            background: #fff;
        }

        .submit-button {
            min-width: 120px;
        }

        @media (min-width:300px) and (max-width:767px) {
            .table-responsive {
                border-bottom: 0;
            }

                .table-responsive tr td {
                    width: 100% !important;
                    display: block;
                    background: none !important;
                }

                .table-responsive tr:nth-child(even) td {
                    background: #fff;
                }

            .table-responsive {
                border: 0px solid #ddd;
            }

            .submit-button {
                min-width: 50px;
            }
        }

        .make_one_head {
            font-size: 16px;
            color: #53565a;
            padding: 7px 0 10px 15px;
            margin: 0px 0px 1px 0px;
            font-weight: bold;
            border-bottom: 1px solid #f4f4f4;
            background: #fff;
        }

        .login-page {
               padding: 0 0 35px 0;
        }
        .login-page.login-page input[type="text"], .login-page.login-page input[type="password"] {
                width: 97% !important;
        }
        .pay_bill_head{
                padding: 18px 0 15px;
                margin:0;
        }

        .toast-top-right {
            width:98.5% !important;
        }
       .table-responsive{
	text-align: center;
}
.table-responsive table{
	text-align: left;
}
.table-responsive #hrefPrint{
	text-align: center;
}

.justifytext td {
    border: 1px solid #ccc;
    padding: 5px;
}
.PaymentInfo_uppercls{
    height:200px;
}
#page_loader {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .9);
    position: fixed;
    font-family: 'MyriadPro-Regular';
    top: 0px;
    z-index: 999999999999999;
    left:0;
    opacity:1;
}
        .page_load_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 48%;
    height: 250px;
    text-align: center;
    color: #040404;
    background: #fff;
    border-radius: 8px;
    padding: 23px 0px;
}
        .page_loader_with_icon {
    background-image: url(images/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
    display: block;
    height: 100px;
    width: 130px;
    margin: 0 auto;
}
        #page_loader b {
    margin: 0;
    padding: 26px 0px 7px;
    font-size: 26px;
    color: #14569a;
    display: block;
    text-align: center;
}
        #page_loader p {
    margin: 0;
    padding: 10px 0px 0px;
    display: block;
    font-size: 19px;
    color: #14569a;
    text-align: center;
}
        .loader_none{
            display:none;
        }
    </style>
</head>
<body>
    <form id="form2" runat="server" defaultfocus="txtLogin">
        <asp:ScriptManager runat="server" ID="scriptManager" />
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <section class="container">           
            <asp:MultiView ID="OTPForm" runat="server" ActiveViewIndex="0">
            <asp:View ID="Step1" runat="server">
                <div class="row">                 
                    <div class="col-lg-12 energy_mid_box">
                        <span id="errorMsg" style="color:red;float:right"></span>
                	    <div class="login-page">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerservice_mid_head">
                            <h1 style="border-bottom: 1px solid #F4F4F4 !important; width: 100%;">
                                <img src="images/icon_dashboard_heading/icon_billing_heading.svg" style="padding-right: 10px;margin-top: -5px; float: left;">
                                <span class="head_icon_flat icon_billing"></span>
                                <span globalize="ML_BILLING_BTN_PayBill"><%= CustomerPortal.Translator.TT_ProductName("ML_BILLING_BTN_PayBill") %> </span> </h1>
                        </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="LoginboxContainer">
                                <div class="loginpage-form">  
                                    <span style="display: block;font-size: 13px;padding: 0 0 11px;  font-weight: bold;"> 
                                        <label class="pay_bill_head" globalize="ML_OTP_Welcome"><%= CustomerPortal.Translator.TT_ProductName("ML_OTP_Welcome") %></label>
                                        <label style="display: block;font-size: 13px;padding: 0 0 0px;  font-weight: bold;" globalize="ML_OTP_Note"><%= CustomerPortal.Translator.T("ML_OTP_Note") %></label>
                                   	</span>
                                    <div id="logincredentials">
                                        <div class="form-group" style="position:relative">
                                            <h3 globalize="ML_OTP_txt_AcctNo"><%= CustomerPortal.Translator.TT_ProductName("ML_OTP_txt_AcctNo") %></h3>
                                            <span class="login-page-user"></span>
                                            <asp:TextBox ID="txtAccountNumber" runat="server" mandatory="1" placeholder="Account Number" class="form-control" title="Account Number" value=""  AutoCompleteType="None" ClientIDMode="Static" globalize="ML_OTP_txt_AcctNo" MaxLength="20" > </asp:TextBox>
                                         </div>
                                        <div class="form-group" style="position:relative">
                                            <h3 globalize="ML_SrvcRqust_txtbx_Contact"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_txtbx_Contact") %></h3>
                                            <span class="login-page-password"></span>
                                            <asp:TextBox ID="txtPhoneNumber" runat="server" mandatory="1" placeholder="Mobile Number" class="form-control txtPhone"  title="Click to enter Mobile number" value="" MaxLength="14" AutoCompleteType="None" globalize="ML_SrvcRqust_txtbx_Contact" ClientIDMode="Static" alt="Click to enter  Mobile number"  autocomplete="off"></asp:TextBox>
                                        <%--<asp:TextBox ID="txtPhoneNumber" runat="server" mandatory="1" placeholder="Phone Number" class="form-control txtPhone" title="Phone Number" value="" MaxLength="14" AutoCompleteType="None" ClientIDMode="Static" globalize="ML_OTP_txt_PhoneNo" onblur="javascript:validatePhone(document.getElementById('txtPhoneNumber'),'1')" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                        </div> 
                                        <div class="checkbox login-form-text" style="display:none;">                                
                                            <label>
                                                <input type="checkbox" name="1" value="1" id="rememberMeCheck" runat="server"><span globalize="ML_LOGIN_Lbl_RememberMe"><%= CustomerPortal.Translator.TT_ProductName("ML_LOGIN_Lbl_RememberMe") %></span></label>                                     
                                        </div>
                                        <div class="log_smw_btn">
                                            <asp:Button ID="btnCancelPayment" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_Btn_Cancel") %>' OnClick="btnCancelPayment_Click" CssClass="btn-default-login" title="Cancel" globalize="ML_OTP_Btn_Cancel" ClientIDMode="Static"  style="float:left;"/>
                                            <asp:Button ID="btnSubmitPayment" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_BillPayment_Button_Next") %>' OnClick="btnlogin_Click" CssClass="btn-default-login" globalize="ML_BillPayment_Button_Next" title="Next" ClientIDMode="Static" style="float:right;" OnClientClick="javascript:return (ValidateMinMaxLengthAccount());"/>
                                        </div>
                                        <asp:Label ID="lblMsg" runat="server" Text="" ForeColor="Red" globalize="ML_Default_Lbl_Message" ClientIDMode="Static" style="left: 59% !important;top: -39px !important; width: 40% !important;" ></asp:Label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 hidden-xs hidden-sm">
                                <div class="login-page-image">
                                    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                              <!-- Indicators -->
                              <ol class="carousel-indicators">
                                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                              </ol>
                            
                              <!-- Wrapper for slides -->
                              <div class="carousel-inner" role="listbox">
                                <div class="item active">
                                    <img src="images/login_slider_img_01.png" alt="login-page-image" />                      
                                </div>
                                <div class="item">
                                       <img src="images/login_slider_img_02.png" alt="login-page-image">                      
                                </div>  
                                                          
                              </div>
                            </div>
                                </div>  
                            </div><!-- End .col-md-6 .login-page-image -->
                        </div><!-- End .login-page -->
                    </div><!-- End .col-md-12  -->
                </div>
            </asp:View>

            <asp:View ID="Step2" runat="server">
                <div class="row">
                <div class="col-lg-12">
                	<div class="login-page">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="LoginboxContainer">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form" style="text-align:justify;">
                       	 <h4 style="display: block;font-size: 20px;padding: 0 0 0px;  font-weight: bold;" globalize="ML_OTP_Welcome"><%= CustomerPortal.Translator.TT_ProductName("ML_OTP_Welcome") %></h4>
                            <h5 style="line-height: 21px;">
                                <%= CustomerPortal.Translator.TT_ProductName("ML_OTP_VerficationNote") %>
                       	    </h5>
                            <div>
                                <div class="log_smw_btn">
                                    <asp:Button ID="btnAgree" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_Btn_Agree") %>'  CssClass="btn-default-login" title="I AGREE" ClientIDMode="Static" globalize="ML_OTP_Btn_Agree" OnClick="btnAgree_Click" />
                                    <asp:Button ID="btnDisagree" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_Btn_Cancel") %>'  CssClass="btn-default-login" title="CANCEL" ClientIDMode="Static" globalize="ML_OTP_Btn_Cancel" OnClick="btnDisagree_Click" style="float:left;"/>
                                </div>
                                     <asp:Label ID="Label1" runat="server" Text="" ForeColor="Red" globalize="ML_Default_Lbl_Message"></asp:Label>
                                <div class="forgot-password pull-right" style="display:none;">
                               
                                   <a href="CustomerRegistration.aspx" globalize="ML_LOGIN_Lbl_DontHav_Register"><%= CustomerPortal.Translator.TT_ProductName("ML_LOGIN_Lbl_DontHav_Register") %></a>
                                </div><!-- End .forgot-password .pull-left -->
                                <div class="forgot-password pull-left" style="display:none;">
                               <a href="LoginSupport.aspx" globalize="ML_LOGIN_BTN_LoginHelp" ><%= CustomerPortal.Translator.TT_ProductName("ML_LOGIN_BTN_LoginHelp") %></a>
                                </div><!-- End .forgot-password .pull-left -->
                            </div>
                        </div><!-- End .loginpage-form -->
                    </div><!-- End .col-md-6 -->
                           <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="ForgetPswdContainer" style="display:none">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form">
                       	 <h1 globalize="ML_Default_Header_FrgtPass"><%= CustomerPortal.Translator.TT_ProductName("ML_Default_Header_FrgtPass") %></h1>
                            <div >
                                <div class="form-group">
                              	  <h3 globalize="ML_Default_Header_UserId"> <%= CustomerPortal.Translator.TT_ProductName("ML_Default_Header_UserId") %></h3>
                                   <asp:TextBox globalize="ML_Default_Txt_UserID" ID="txtUserid" placeholder="User ID or Email ID" runat="server" class="form-control" mandatory="1" Title="User ID" ClientIDMode="Static" style="width:98% !important; float:left;"></asp:TextBox>
                                </div>
                               
                                <div class="log_smw_btn">
                                      <input globalize="ML_Common_Navigation_cancel" id="lnkLogin"  value='<%# CustomerPortal.Translator.TT_ProductName("ML_Common_Navigation_cancel") %>' class="btn-default-login-cancel"  type="button"  />
                                      <input globalize="ML_Default_Button_Submit" ID="BtnSubmit"  value='<%# CustomerPortal.Translator.TT_ProductName("ML_Default_Button_Submit") %>' class="btn-default-login-submit"  type="button"  />
                                
                                </div>
                                    
                            
                            </div>
                        </div><!-- End .loginpage-form -->
                    </div><!-- End .col-md-6 -->
                    <div class="col-md-6 hidden-xs hidden-sm">
                    	<div class="login-page-image">
                           <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                              <!-- Indicators -->
                              <ol class="carousel-indicators">
                                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                              </ol>
                            
                              <!-- Wrapper for slides -->
                              <div class="carousel-inner" role="listbox">
                                <div class="item active">
                                    <img src="images/login_slider_img_01.png" alt="login-page-image" />                      
                                </div>
                                <div class="item">
                                       <img src="images/login_slider_img_02.png" alt="login-page-image">                      
                                </div>  
                                                          
                              </div>
                            </div>
                      	
                        </div>                      
                    </div><!-- End .col-md-6 .login-page-image -->
                </div><!-- End .login-page -->
                </div><!-- End .col-md-12  -->
            </div><!-- End .row -->
            </asp:View>

            <asp:View ID="Step3" runat="server">
                <div class="row">
                    <div class="col-lg-12" style="padding:0;"> 
                <asp:HiddenField ID="HiddenField1" runat="server" Value="" ClientIDMode="Static" />
                <asp:HiddenField ID="hdnCreditOrBank" runat="server" />
                <asp:Label ID="lblBillingID" runat="server" Style="display: none;" ClientIDMode="Static"></asp:Label>                
                <input type="text" runat="server" id="lblaccounttype" style="display:none;" />
                <asp:HiddenField ID="hdnTPAmount" runat="server" ClientIDMode="Static" />
                <asp:HiddenField ID="hdnWaterAmount" runat="server" />
                <asp:HiddenField ID="hdnPowerAmount" runat="server" />
                <asp:HiddenField ID="hdnSolidAmount" runat="server" />
                <asp:HiddenField ID="hdnPayId" runat="server" />
                <asp:HiddenField ID="hdnGasAmount" runat="server" />
                <asp:HiddenField  ID="hdMapId" runat="server"  ClientIDMode="Static"/>
               
                <div class="inner-right-sub">
                     <h1 class="make_one_head">                     
                     <img src="images/icon_dashboard_heading/icon_billing_heading.svg" style="padding-right: 10px;margin-top: -5px; float: left;">   <span globalize="ML_Msg_Onetimepayment_BillPayment"><%= CustomerPortal.Translator.TT_ProductName("ML_Msg_Onetimepayment_BillPayment") %></span>  </h1>
                    <div class="profile-details" id="submitteddetailvalue">
                        <div id="responsive" class="table-responsive">
                            <table style="width:100%;">
                                <tr>
                                     <td width ="20%" style="display:none">
                                        <label globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.TT_ProductName("ML_Master_lbl_CustName") %> </label>
                                    </td>
                                    <td  width="30%" style="display:none">
                                        <input type="text" id="txtfirtname" onkeypress="return IsAlpha(event);"  mandatory="1" globalize="ML_Master_lbl_CustName" title="Customer Name" placeholder="Customer Name" runat="server" clientidmode="Static" maxlength="30" />
                                   </td>
                      
                                 <td width="20%" >
                                          <label globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.TT_ProductName("ML_Master_lbl_CustName") %> </label>
                                   </td> 
                                    <td width="30%" >
                                        <input type="text" id="txtlastname" onkeypress="return IsAlpha(event);"  globalize="ML_MakeOTP_txt_LastName" title="Customer Name" runat="server" placeholder="Customer Name" clientidmode="Static" maxlength="30" />
                                   </td>
                                      </tr> 
                                <tr>
                                    <td>
                                        <label globalize="ML_MakeOTP_txt_AcctAddress"><%= CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_txt_AcctAddress") %></label></td>
                                    <td>
                                        <input type="text" placeholder="Account Address"  id="txtaddress" mandatory="1" globalize="ML_MakeOTP_txt_AcctAddress" title="Address" runat="server" clientidmode="Static" maxlength="100" /></td>
                                <td> 
                                    <label globalize="ML_Register_Lbl_City"><%= CustomerPortal.Translator.TT_ProductName("ML_Register_Lbl_City") %> </label></td>
                                    <td> <input type="text" id="txtcity"  onkeypress="return IsAlpha(event);"  placeholder="City" mandatory="1" runat="server" clientidmode="Static" globalize="ML_MakeOTP_txt_City" title="City" maxlength="35" /></td>
                            
                                     </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_SrvcRqust_p_State"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_p_State") %>  </label></td>
                                    <td>
                                
                                        <input type="text" id="txtstate" runat="server"  placeholder="State"  clientidmode="Static" title="state" globalize="ML_MakeOTP_txt_State" maxlength="35"/>
                                       </td>
                                   <td>
                                      <label globalize="ML_MakeOTP_txt_Zip"><%= CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_txt_Zip") %>  </label>
                                  </td>
                                    <td>
                                        <input type="text" id="txtzipcode" title="Zip"  placeholder="Zip"  globalize="ML_MakeOTP_txt_Zip"  maxlength="5" onkeypress="javascript:return (IsNumeric(event));" mandatory="1"  runat="server" clientidmode="Static">
                                    </td> 
                      
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_SrvcRqust_txtbx_Contact"><%= CustomerPortal.Translator.TT_ProductName("ML_SrvcRqust_txtbx_Contact") %> </label></td>
                                    <td title="Click to enter your phone number" globalize="ML_SrvcRqust_txtbx_Contact">
                                        <input type="text" id="txtphone1" onkeypress="javascript:return (IsNumeric(event));" maxlength="14" runat="server" clientidmode="Static" globalize="ML_SrvcRqust_txtbx_Contact" />
                             
                                    </td>
                                      <td>
                                        <label globalize="ML_MakeOTP_txt_EmailId"><%= CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_txt_EmailId") %> </label></td>
                                    <td>
                                        <input type="text" id="txtemail" mandatory="1" title="Email"  placeholder="Email Address" globalize="ML_MakeOTP_txt_EmailId" runat="server" clientidmode="Static" maxlength="50" />

                                    </td>
                                </tr>
                     
                                <tr>
                                    <td>
                                        <label globalize="ML_MakeOTP_txt_TotalPayAmt"><%= CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_txt_TotalPayAmt") %></label></td>
                                    <td>
                                    <asp:TextBox ID="txtTotlal" mandatory="1" globalize="ML_MakeOTP_txt_TotalPayAmt"  placeholder="Total Payment Amount" Tooltip="Total Amount" ClientIDMode="Static" runat="server" MaxLength="9" onkeypress="javascript:return (IsNumeric1(event,this));"></asp:TextBox></td>
                            
                                      <td colspan="2"><span id="txtTotalText" runat="server" clientidmode="Static" style="display: none"></span></td>
                                </tr>                      
                          </table>
                            </div>
                        <div class="PaymentInfo_uppercls">
                        <div id="PaymentInfo"  class="table-responsive" runat="server">
                            <table style="width:100%;">
                                <tr>
                                    <td width="20%"><label globalize="ML_MYACCOUNT_Lbl_PaymentMode"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_Txt_PaymentMethods") %> </label></td>
                                    <td width="30%">
                                         <div id="divcreditrdobtn" runat="server" clientidmode="Static" style="float:left; width:50%;padding:4px 0px;">
                                            <asp:RadioButton ID="rdoCredit" runat="server" GroupName="grpAddNew" value="0" ClientIDMode="Static" Checked="true" />
                                            <label for="rdoCredit" globalize="ML_ACCOUNT_lbl_creditDebitCard"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_creditDebitCard") %></label>
                                        </div>
                                        
                                        <div id="divbankrdobtn" runat="server" clientidmode="Static" style="float:left; width:50%;padding:4px 0px;">
                                            <asp:RadioButton ID="rdoBank" runat="server" GroupName="grpAddNew" value="1" ClientIDMode="Static" />
                                            <label for="rdoBank" globalize="ML_ACCOUNT_lbl_BankAcount"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_BankAcount") %></label>
                                        </div>
                                    </td>     
                                     <td colspan="2" Width="50%"></td>                                                
                                </tr>                                
                                <tr class="card">
                                    <td width="20%">
                                        <label globalize="ML_Billing_lbl_CrdNum"><%= CustomerPortal.Translator.TT_ProductName("ML_Billing_lbl_CrdNum") %></label></td>
                                    <td width="30%">
                                        <asp:TextBox ID="txtCardNumber" ClientIDMode="Static" runat="server" MaxLength="19" Text="" placeholder="Card Number" globalize="ML_MakeOTP_txt_CardNo" onkeypress="javascript:return (IsNumeric(event));" mandatory="1" style="float:left;" autocomplete="off"></asp:TextBox>
                                       <input type="text" mode="text" style="display:none"/>
                                 
                                    </td>
                                       <td colspan="2" Width="50%"> 
                                           <div class="popup_right_content_area_home" style="display: inline;">
                                            <%--Against Bug ID: 16340--%>
                                            <asp:Image ID="ImgCard" runat="server" ImageUrl="images/credit_card_logos_11.png" Height="30px" Visible="true" CssClass="" ClientIDMode="Static" />
                                            <asp:Image ID="ImgVisa" runat="server" ImageUrl="images/visa.jpeg" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="ImgMaster" runat="server" ImageUrl="images/mastercard.png" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="ImgDiscov" runat="server" ImageUrl="images/discoverNew.jpg" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="Imgamex" runat="server" ImageUrl="images/american.jpeg" Height="30px" ClientIDMode="Static" />
                                            <%-- <asp:Image ID="Imgdine" runat="server" ImageUrl="images/dinerclub.png" Height="30px" ClientIDMode="Static" />
                                            <asp:Image ID="Imgjcb" runat="server" ImageUrl="images/jcb.jpg" Height="30px" ClientIDMode="Static" />--%>
                                        </div>
                                           </td>
                                </tr>
                                <tr class="card">
                                    <td width="20%">
                                        <label globalize="ML_ACCOUNT_Lbl_CardExpire"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_Lbl_CardExpire") %> </label></td>
                                    <td width="30%">
                                        <span globalize="ML_ACCOUNT_DDL_Month"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_DDL_Month") %></span>
                                        <asp:DropDownList ID="ddlMonth" runat="server" ClientIDMode="Static" style="width:30.2%;    font-size: 11px;" placeholder="Month" globalize="ML_MakeOTP_ddl_Month" ToolTip="Click to select month"></asp:DropDownList>
                                        <span globalize="ML_ACCOUNT_DDL_Year"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_DDL_Year") %></span>
                                        <asp:DropDownList ID="ddlYear" runat="server" ClientIDMode="Static" style="width: 30%;    font-size: 11px;"  placeholder="Year" globalize="ML_MakeOTP_ddl_Year" ToolTip="Click to select year" ></asp:DropDownList>
                                    </td>
                                    <td width="20%"></td>
                                    <td width="30%"></td>
                                </tr>
                                <tr class="card" >
                                    <td width="20%">
                                        <label globalize="ML_Msg_Billing_SecurtyCode"><%= CustomerPortal.Translator.TT_ProductName("ML_Msg_Billing_SecurtyCode") %> </label></td>
                                    <td>
                                        <asp:TextBox ID="txtSecurityCode" runat="server" MaxLength="3" OnPaste="return false;"  ClientIDMode="Static" mandatory="1" ToolTip="CVV Code"
                                            TextMode="Password" onkeypress="return IsNumeric(event);" globalize="ML_ACCOUNT_Txt_Code" placeholder="CVV Code"></asp:TextBox>
                                        <a href="#" style="display:none" globalize="ML_Msg_Onetimepayment_WhatIsCVV"><%= CustomerPortal.Translator.TT_ProductName("ML_Msg_Onetimepayment_WhatIsCVV") %> </a>

                                    </td>
                                      <td></td>
                                    <td></td>
                                </tr>
                                <tr style="display:none" id="trStoreInfo">
                                    <td colspan="4">
                                        <input type="checkbox" id="chkStoreInfo" title="" globalize="ML_MakeOTP_Chk_Agree" style="margin-right:10px;margin-top:10px;vertical-align: top;"/><label style="padding: 7px 0;">Save this card information for making faster payments</label>
                                    </td>
                                </tr>

                                 <tr class="bank" style="display: none">
                                     <td width ="20%">
                                        <label globalize="ML_ACCOUNT_lbl_HolderName"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_HolderName") %></label>
                                    </td>
                                    <td  width="30%">
                                        <input type="text" id="txtAccountName" onkeypress="return IsAlpha(event);"  mandatory="1" globalize="ML_MyAccount_Lbl_EnterAccountHolderName" title="First Name" placeholder="First Name" runat="server" clientidmode="Static" maxlength="60" />
                                   </td>
                      
                                 <td width="20%">
                                          <label globalize="ML_ACCOUNT_lbl_Routing"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_Routing") %> </label>
                                   </td> 
                                    <td width="30%">
                                         <asp:TextBox ID="txtRoutingNmbr" runat="server" MaxLength="9" onkeypress="return IsNumeric(event);" mandatory="1" ClientIDMode="Static" ToolTip="Routing #"
                                        OnPaste="return false;" title="Routing Number" globalize="ML_ACCOUNT_Txt_Routing"></asp:TextBox>
                                   </td>
                                      </tr> 
                                <tr class="bank" style="display: none">
                                    <td>
                                        <label globalize="ML_ACCOUNT_lbl_BAnkName"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_BAnkName") %> </label></td>
                                    <td>
                                         <asp:TextBox ID="txtBankName" runat="server" onkeypress="return IsAlpha(event);" mandatory="1" ReadOnly="true"
                                        OnPaste="return false;" MaxLength="30" ClientIDMode="Static" title="Bank Name"></asp:TextBox>
                                        </td>
                            
                                <td> 
                                    <label globalize="ML_ACCOUNT_lbl_BAnkAccount"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_BAnkAccount") %> </label></td>
                                        <td>  <asp:TextBox ID="txtBankAccNumber" runat="server" MaxLength="19" onkeypress="return IsNumeric(event);" mandatory="1"
                                        OnPaste="return false;" ClientIDMode="Static" title="Bank Account #"  globalize="ML_Msg_Billing_EnterValidBankAccount"></asp:TextBox>
                                    </td>
                            
                                     </tr>
                                <tr class="bank" style="display:none;">
                                    <td>
                                        <label globalize="ML_ACCOUNT_lbl_Accounttype_1"><%= CustomerPortal.Translator.TT_ProductName("ML_ACCOUNT_lbl_Accounttype_1") %></label>
                                    </td>
                                    <td>
                                    <select id="ddlaccounttype" style="width:90%;float:left;">                                    
                                    <option value="CHECKING"><%= CustomerPortal.Translator.T("ML_Bank_Account_checking") %></option>
                                    <option value="SAVINGS"><%= CustomerPortal.Translator.T("ML_Bank_Account_saving") %></option>
                                    </select>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        </div>
                        <div class="clearfix"></div>
                        <div>
                             <div id="disclaimer" style="float: left; margin-bottom: 0px; padding-left: 22px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingDisclaimer) %>!important;">
                                <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
                                <span globalize="ML_Billing_Span_Disclaimertxt" runat="server" style="color: black;"><%= CustomerPortal.Translator.T("ML_Billing_Span_Disclaimertxt") %></span>
                               </div>
                        </div>
                          <div class="clearfix"></div>
                        <div class="buttons_area">
                            <asp:Button ID="btnsubmit" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_Btn_Submit") %>' CssClass="btn-default-login" title="Submit" globalize="ML_MakeOTP_Btn_Submit" ClientIDMode="Static" OnClick="btnsubmit_Click" />
                          <%--  <input id="btnsubmit" runat="server" type="button" value='<%# CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_Btn_Submit") %>' class="submit-button"  globalize="ML_MakeOTP_Btn_Submit" title="Submit" style="position:relative;float:right;background: #74a601 !important;"/>--%>
                             <asp:Button ID="btnCancel" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_MakeOTP_Btn_Cancel") %>' CssClass="btn-default-login" title="Cancel" globalize="ML_MakeOTP_Btn_Cancel" ClientIDMode="Static" OnClick="btnCancel_Click" style="float:left; color:#fff !important; border: 0px; width: 120px" />
                        </div>
                    </div>


                    <div class="profile-details" id="submitteddetail" style="display: none">
                        <p globalize="ML_Msg_Onetimepayment_RequestedPayment"><%= CustomerPortal.Translator.TT_ProductName("ML_Msg_Onetimepayment_RequestedPayment") %></p>
                        <div class="table-responsive">
                            <table>
                                <tr>
                                    <td width="200">
                                        <label globalize="ML_CONNECTME_Lbl_FName"><%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Lbl_FName") %>  : </label>
                                    </td>
                                    <td><span id="spnfirstname"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_MakeOTP_txt_LastName"><%= CustomerPortal.Translator.T("ML_MakeOTP_txt_LastName") %></label></td>
                                    <td><span id="spnlastname"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Msg_Onetimepayment_BillingAddress"><%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_BillingAddress") %></label></td>
                                    <td><span id="spnaddress"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Msg_Onetimepayment_BillingCity"><%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_BillingCity") %></label></td>
                                    <td><span id="spncity"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Msg_Onetimepayment_BillingZip"><%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_BillingZip") %></label></td>
                                    <td><span id="spnzip"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize=ML_SrvcRqust_txtbx_Contact><%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %>:</label></td>
                                    <td><span id="spnphone"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize=ML_MakeOTP_txt_EmailId><%= CustomerPortal.Translator.T("ML_MakeOTP_txt_EmailId") %>:</label></td>
                                    <td><span id="spnemail"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Billing_lbl_PayDate"><%= CustomerPortal.Translator.T("ML_Billing_lbl_PayDate") %>:</label></td>
                                    <td><span id="spnpaymentdate"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Msg_Onetimepayment_FeeAmount"><%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_FeeAmount") %></label></td>
                                    <td><span id="spnfeeamount"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_MakeOTP_txt_TotalPayAmt"><%= CustomerPortal.Translator.T("ML_MakeOTP_txt_TotalPayAmt") %>:</label></td>
                                    <td><span id="spntotalamount"></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label globalize="ML_Billing_lbl_CrdNum"><%= CustomerPortal.Translator.T("ML_Billing_lbl_CrdNum") %>:</label></td>
                                    <td><span id="spncardnumber"></span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <label globalize="ML_ACCOUNT_Lbl_CardExpire"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Lbl_CardExpire") %>:</label></td>
                                    <td><span id="spncardexpiration">5.12.1210</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <label globalize="ML_Msg_Onetimepayment_TermsAndConditions"><%= CustomerPortal.Translator.T("ML_Msg_Onetimepayment_TermsAndConditions") %></label></td>
                                </tr>
                            </table>
                        </div>
                        <div class="clearfix"></div>
                        <div class="buttons_area">
                            <input type="button" value='<%# CustomerPortal.Translator.T("ML_OTP_Btn_Cancel") %>' class="submit-button" id="cancelpayment" globalize="ML_OTP_Btn_Cancel" />
                            <input type="button" value='<%# CustomerPortal.Translator.T("ML_MakeOTP_Btn_Submit") %>' class="submit-button" id="ConfirmBtn" globalize="ML_MakeOTP_Btn_Submit" />
                        </div>
                    </div> 
                    
                </div>
        </div>
	            </div>
            </asp:View>
            <asp:View ID="Step4" runat="server">
                <%--<div class="row">  
                    <div class="col-lg-12">
                        <div class="login-page">
                <asp:Label ID="lblMessage" runat="server" ClientIDMode="Static" style="font-size: 23px;padding: 19px 30px;display: block;"></asp:Label>
                    </div>
                    </div>
                </div>--%>

                <div class="row">  
                    <div class="col-lg-12">
                        <div class="login-page">


                            <div id="divthankpay" style="display: block;">
                <div class="bottom_billed_boxes" style="width:100%; margin:0; padding: 7px 0px; border-bottom:0 !important;">
                    <div class="all_bill_box">

                        <div class="justifytext table-responsive">
                            <img src="images/paymenticon.png" />
                            <h2><%=CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_Thankyou") %></h2>
                            <b><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranSucess") %></b>
                            <span><strong><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranDetails") %></strong></span>

                            <%--  A confirmation email has been sent to your Email ID.--%>
                            <table style="width: 60%;margin:30px auto 80px;">                               
                                <tr>
                                <td width="50%"><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_TranID") %></span></td>
                                <td width="50%"><asp:Label ID="lblTransactionID" runat="server"></asp:Label></td>
                                </tr>

                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_PayDate") %></span></td>
                                <td> <asp:Label ID="lblPayDate" runat="server"></asp:Label></td>
                                </tr>

                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_Lbl_Rcpt_Amnt") %> </span></td>
                                <td> <asp:Label ID="lblAmount" runat="server"></asp:Label></td>
                                </tr>

                                
                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.T("ML_Payment_Lbl_Rcpt_Convienfee") %></span></td>
                                <td> <asp:Label ID="lblTransactionFee" runat="server"></asp:Label></td>
                                </tr>
                                 <tr>
                                <td><span class="boldtext"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_Lbl_Rcpt_totAmnt") %> </span></td>
                                <td> <asp:Label ID="lblTotAmount" runat="server"></asp:Label></td>
                                </tr>


                           <%--     <tr>
                                <td><span class="boldtext">Mode Of Payment: </span></td>
                                <td> <span id="lblTransactionFee"></span></td>
                                </tr>--%>
                                
                             
                                
                                 <tr>
                                <td colspan="2"><span class="boldtext" style="text-align:right;"><a href="#" id="hrefPrint"><%= CustomerPortal.Translator.TT_ProductName("ML_Payment_lnk_Rcpt_Print") %> </a></span></td>
                                </tr>

                                </table>

                        </div>


                       
                        <div class="buttons_area" style=" width:100%; padding: 10px 15px 0px;margin-top:0px;border-top: 2px solid #f4f4f4;    border-bottom: 0px;"><asp:Button ID="btnOK" runat="server" Text='<%# CustomerPortal.Translator.TT_ProductName("ML_Payment_lnk_Rcpt_okbtn") %>' ToolTip="OK" PostBackUrl="~/Default.aspx" class="submit-button" style="margin-bottom: 3px;"/></div>
                    </div>
                </div>
            </div>
                            </div></div></div>
            </asp:View>
            </asp:MultiView>             
        </section>

        <uc2:Footer runat="server" ID="Footer" />
         <div id="page_loader" style="align-content:center">
      <div class="page_load_container">
        <div class="page_loader_with_icon"></div>
        <b><%= CustomerPortal.Translator.T("ML_BILLING_Header_loadertextheader") %></b>
        <p><%= CustomerPortal.Translator.T("ML_BILLING_Header_loadertext") %></p>
      </div>
    </div>
        <script src="js/1.11.1jquery.min.js"></script>
        <script src="js/print.js"></script>

        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/script.js" type="text/javascript"></script>
        <asp:HiddenField ID="hdndrMaxbilling" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnCurrentDate" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnCardtype" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnMonth" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnCustomerType" runat="server" Value="" ClientIDMode="Static" />

        <asp:HiddenField ID="hdnAccountNumber" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnLoginToken" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnPaymentMode" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountID" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnMerchantPin" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnClientID" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnClientSecret" runat="server" Value="" ClientIDMode="Static" />
        <span globalize="ML_OTP_Msg_NewRouting" id="NewRouting" style="display: none">'uting" id="NewRouting" style="display: none">'<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_Msg_NewRouting") %>'</span>
        <span globalize="ML_OTP_Msg_EmailId" id="EmailIDValid" style="display: none">'<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_Msg_EmailId") %>'</span>
        <span globalize="ML_OTP_ERR_Mobile" id="MobileNumValid" style="display: none">'<%# CustomerPortal.Translator.TT_ProductName("ML_OTP_ERR_Mobile") %>'</span>
        <span id="spnMaxPaymentAmtMsg" globalize="ML_Billing_Msg_MaxPayAmount" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Billing_Msg_MaxPayAmount") %></span>
        <asp:HiddenField ID="hdnAccountMaxLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountMinLength" runat="server" ClientIDMode="Static" />
        <span globalize="ML_ErrorLength_Msg_AccountNumber" id="spnAccountIdMinMax" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_ErrorLength_Msg_AccountNumber") %></span>
        <span globalize="ML_BillDashboard_Span_Msg_EnterValidAmt" id="Span_Msg_EnterValidAmt" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_BillDashboard_Span_Msg_EnterValidAmt") %></span>

         <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="Span_Msg_EnterAllMandInfo" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
            <span globalize="ML_Msg_Billing_PaymentCanNotBeZero" id="Span_Billing_PaymentCanNotBeZero" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Msg_Billing_PaymentCanNotBeZero") %></span>

         </form>
</body>
</html>

