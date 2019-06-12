<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="customer-verification.aspx.cs" Inherits="CustomerPortal.customer_verification"  %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <script src="js/default.js" type="text/javascript"></script>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- bootstrap 3.0.2 -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <title globalize="ML_Default_Title_SmartEnergy"> <%= CustomerPortal.Translator.T("ML_Msg_AccountActivation") %></title>
    <style type="text/css">
        .carousel-inner{
            background:none !important;
        }
    </style>
</head>
<body>
    <form id="form2" runat="server" defaultfocus="txtLogin" defaultbutton="">
        
        <!-- Header Starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header Ends -->

        <section class="container">
            <div class="row">
                <div class="col-lg-12">
                	<div class="login-page">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"  id="LoginboxContainer">
                        <!-- End .logo-login-page -->
                        <div class="loginpage-form">
                       	 <h1 globalize="ML_Msg_CustomerVerification"><%= CustomerPortal.Translator.T("ML_Msg_CustomerVerification") %></h1>
                            <div >
                                <asp:Label runat="server" ID="lblMessage" ForeColor="Red" Font-Size="20px" Visible="true" Text=""></asp:Label>
                            </div>
                            <br />
                            <div id="divlogin" runat="server" style="display:none">
                                <a href="default.aspx"><%= CustomerPortal.Translator.T("ML_Msg_ClickToLogin") %></a>
                            </div>
                            <div id="divregister" runat="server" style="display:none">
                                <a href="CustomerRegistration.aspx"><%= CustomerPortal.Translator.T("ML_Msg_ClickToRegister") %></a>
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
                    </div>
                </div><!-- End .login-page -->
                    
                </div><!-- End .col-md-12  -->
            </div><!-- End .row -->
            <div class="bg"></div>
        </section>
        <!-- End .container -->
       
        <!-- Footer Starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- Footer Ends -->
      <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/script.js" type="text/javascript"></script>
        <asp:HiddenField ID="hdnflag" runat="server" />
        <asp:HiddenField ID="hdnCustomerid" runat="server" ClientIDMode="Static" />
    </form>
</body>
</html>
