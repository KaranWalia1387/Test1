<%@ Page Language="C#" Title="Login Support" AutoEventWireup="true" CodeBehind="LoginSupport.aspx.cs" Inherits="CustomerPortal.LoginSupport" EnableEventValidation="true" ValidateRequest="false" %>

<%@ Register Src="UserControls/Footer.ascx" TagName="Footer" TagPrefix="uc1" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc2" TagName="Footer" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Theme style -->
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <title globalize="ML_LoginSupport_title_Login"><%= CustomerPortal.Translator.TT_ProductName("ML_LoginSupport_title_Login") %></title>
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <%: System.Web.Optimization.Styles.Render("~/Content/cssLoginSupport") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsLoginSupport")%>
    <link id="stylecss" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
    <form id="form2" runat="server">

        <!-- header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />

        <!-- header ends -->
        <section class="container">
            <div class="row">
                <div class="col-lg-12">
                	<div class="login-page">
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="ProblemsContainer" runat="server" visible="false">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form">
                       	 <h1 globalize="ML_LoginSupport_h1_Having_trouble"><%= CustomerPortal.Translator.T("ML_LoginSupport_h1_Having_trouble") %></h1>
                            <div >
                                <div class="form-group ul_listing">
                                    <ul>
                                        <li><asp:HyperLink ID="lnkForgetPassword" runat="server" NavigateUrl="~/LoginSupport.aspx?id=1" globalize="ML_LoginSupport_hyprlnk_password" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_password") %>'></asp:HyperLink></li>
                                        <li><asp:HyperLink ID="lnkForgetUsername" runat="server" NavigateUrl="~/LoginSupport.aspx?id=2" globalize="ML_LoginSupport_hyprlnk_username" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_username") %>'></asp:HyperLink></li>
                                        <li><asp:HyperLink ID="lnkOtherProblems" runat="server" NavigateUrl="~/LoginSupport.aspx?id=3" globalize="ML_LoginSupport_hyprlnk_signing_in" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_signing_in") %>'></asp:HyperLink></li>
                                    </ul>
                              	                                
                                </div>
                             <div class="log_smw_btn">
                                      <asp:Button ID="btnCancelProblemsContainer" runat="server" OnClick="btnCancelProblemsContainer_Click" class="btn-default-login-cancel" Text='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' globalize="ML_Common_Navigation_cancel"/>
                                </div>
                            </div>

                        </div><!-- End .loginpage-form -->
                    </div>

                           <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="ForgotPswdContainer" runat="server" visible="false" clientidmode="Static">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form">
                       	 <h1 globalize="ML_LOGIN_Lbl_ForgotPassword"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_ForgotPassword") %></h1>
                            <div >
                                <div class="form-group">
                              	  <h3><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></h3>
                                <span class="login-page-user"></span>
                                   <asp:TextBox ID="txtEmailForgotPassword" runat="server" class="form-control" mandatory="1" Title="Email ID" placeholder="Email ID" globalize="ML_LoginSupport_txtbx_Email_ID" ClientIDMode="Static" style="float:left;" MaxLength="50" AutoCompleteType="Disabled" autocomplete="off"></asp:TextBox>
                                </div>
                               
                                <div class="log_smw_btn">
                                    <asp:Button ID="btnCancelForgotPassword" runat="server" OnClick="btnCancelForgotPassword_Click"  class="btn-default-login-cancel" Text='<%# CustomerPortal.Translator.T("ML_FORGOTPASSWORD_BTN_Cancel") %>' globalize="ML_FORGOTPASSWORD_BTN_Cancel" />
                                    <asp:Button ID="btnSubmitForgotPassword" runat="server" class="btn-default-login-submit" Text='<%# CustomerPortal.Translator.T("ML_FORGOTPASSWORD_BTN_Submit") %>' ClientIDMode="Static" globalize="ML_FORGOTPASSWORD_BTN_Submit" OnClientClick="return false"/>
                                </div>
                            </div>
                        </div><!-- End .loginpage-form -->
                    </div><!-- End .col-md-6 -->
                         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="ForgotUserNameContainer" runat="server" visible="false" clientidmode="Static">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form">
                       	 <h1 globalize="ML_LoginSupport_h1_Forgot_UserId"><%= CustomerPortal.Translator.T("ML_LoginSupport_h1_Forgot_UserId") %></h1>
                            <div >
                                <div class="form-group">
                              	  <h3 globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></h3>
                                    <span class="login-page-user"></span>
                                   <asp:TextBox ID="txtEmailForgotUserName" runat="server" class="form-control" mandatory="1" Title="Email ID" placeholder="Email ID"  globalize="ML_LoginSupport_txtbx_Email_ID" ClientIDMode="Static" style=" float:left;"  MaxLength="50"></asp:TextBox>
                                </div>
                               
                                <div class="log_smw_btn">
                                      <asp:Button ID="btnCancelForgotUserName" runat="server" OnClick="btnCancelForgotPassword_Click"  class="btn-default-login-cancel" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_forgotuserbtn_Cancel") %>' globalize="ML_LoginSupport_forgotuserbtn_Cancel"/>
                                      <asp:Button ID="btnSubmitForgotUserName" runat="server" class="btn-default-login-submit" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_forgotuserbtn_Submit") %>' ClientIDMode="Static" globalize="ML_LoginSupport_forgotuserbtn_Submit" OnClientClick="return false"/>
                                </div>
                            </div>
                        </div><!-- End .loginpage-form -->
                    </div>
                        <%-- <span id="errorMsg" style="float:right;"></span>--%>
                         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="OtherLoginProblemsContainer" runat="server" visible="false" clientidmode="Static">
                             
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form" id="divSubmitOtherLogin">
                             <span id="errorMsg" style="float:right;"></span>
                       	 <h1 globalize="ML_LoginSupport_h1_Other_Login_Problems"><%= CustomerPortal.Translator.T("ML_LoginSupport_h1_Other_Login_Problems") %></h1>
                            <div >
                                <div class="form-group">
                              	  <h3 globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></h3>
                                    <span class="login-page-user"></span>
                                   <asp:TextBox ID="txtEmailOtherLogin" runat="server" MaxLength="50" style=" float:left;" class="form-control" mandatory="1" Title="Email ID" placeholder="Email ID" globalize="ML_LoginSupport_txtbx_Other_Email_ID" ClientIDMode="Static" ></asp:TextBox>
                                </div>
                                <div class="form-group">
                                    <h3 style="padding-top:2px;" globalize="ML_CONNECTME_Lbl_Comments"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Comments") %></h3>
                                    <asp:TextBox ID="txtComments"  runat="server" globalize="ML_CONNECTME_Lbl_Comments" class="form-control" mandatory="1" Title="Comments" ClientIDMode="Static" TextMode="MultiLine" placeholder="Limit 500 Characters" onpaste="CountDescriptionOnchange(this,500);"  onkeyup="CountDescriptionOnchange(this,500);" style=" float:left; border-radius:0px;"></asp:TextBox>
                                </div>
                               
                                <div class="log_smw_btn">
                                      <asp:Button ID="btnOtherLogin" runat="server" OnClick="btnCancelForgotPassword_Click"  class="btn-default-login-cancel" globalize="ML_LoginSupport_otherbtn_Cancel" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_otherbtn_Cancel") %>' />
                                      <asp:Button ID="btnSubmitOtherLogin" runat="server" class="btn-default-login-submit" Text='<%# CustomerPortal.Translator.T("ML_LoginSupport_otherbtn_Submit") %>' ClientIDMode="Static" globalize="ML_LoginSupport_otherbtn_Submit" OnClientClick="return false"/>
                                </div>
                            </div>
                        </div><!-- End .loginpage-form -->
                    </div>
                    <div class="col-md-6 hidden-xs hidden-sm">
                    	<div class="login-page-image">
                           <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                              <!-- Indicators -->
                              <ol class="carousel-indicators">
                                 <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                 <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                  <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                              </ol>
                            
                              <!-- Wrapper for slides -->
                              <div class="carousel-inner" role="listbox">
                                <div class="item active">
                                    <img src="images/login_slider_img_01.png" alt="login-page-image" />                      
                                </div>
                                <div class="item">
                                       <img src="images/login_slider_img_02.png" alt="login-page-image" />                      
                                </div>
                                  
                                  <div class="item">
                                       <img src="images/login_slider_img_03.png" alt="login-page-image" />                      
                                </div>  
                                  
                                  <div class="item">
                                       <img src="images/login_slider_img_04.png" alt="login-page-image" />                      
                                </div>    
                                                                    
                              </div>
                            </div>
                      	
                        </div>                      
                    </div><!-- End .col-md-6 .login-page-image -->
                </div><!-- End .login-page -->
                </div><!-- End .col-md-12  -->
            </div><!-- End .row -->
          
                
        </section>
        <!-- End .container -->
        <!-- footer starts -->
        <uc2:Footer runat="server" ID="Footer" />
        <!-- footer ends -->

        <div id="page_loader">
        </div>
         <span id="idErrMsg" style="display: none;" globalize="ML_LoginSupport_ErrorMsg"></span>
        <span id="Notificationtxt" style="display:none"><%= CustomerPortal.Translator.TT_ProductName("ML_HeaderMenu_span_Notific") %></span>
    </form>
</body>
</html>
