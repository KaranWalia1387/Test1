<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="signout.aspx.cs" Inherits="CustomerPortal.signout" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>





<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title><%= CustomerPortal.Translator.TT_ProductName("ML_signedout_txt_signedout") %></title>
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <style>
        #rmclass {
        display:none!important;
        }
		
		.back_button {
		display:none !important;
		}
        footer .footer-logo {
            margin: 4px 0px;
        }
    </style>
    
</head>
<body>
    <form id="form1" runat="server">
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
<section class="banner_logged_out">
	<div class="container">
    	<div class="row">
        	<div class="log_out_area">
            	<h1><%= CustomerPortal.Translator.TT_ProductName("ML_signout_txt_you_signout") %></h1>
                <p><span><%= CustomerPortal.Translator.TT_ProductName("ML_SignOut_Key") %> </span></p>
              


                <div class="sign_in">
                	<a href="default.aspx"><%= CustomerPortal.Translator.TT_ProductName("ML_signout_txt_signin") %></a>
                </div>
            </div>
        </div>
    </div>
</section>

        <!-- footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- footer ends -->

    </form>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>
