<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="error.aspx.cs" Inherits="CustomerPortal.error" %>

<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 
   
    <script src="js/jquery-1.12.3.min.js"></script>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- bootstrap 3.0.2 -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <title >::Smart Energy:: Error</title>
     <script type="text/javascript">
         $(document).ready(function () {
             $("#rmclass").css("display", "none");
         });
    </script>
    <style type="text/css">
        .error_page_covered {
	background: url(../images/error_page_banner.png) no-repeat center center fixed; 
  	-webkit-background-size: cover;
  	-moz-background-size: cover;
  	-o-background-size: cover;
  	 background-size: cover;
	 width:100%;
	 height:88.5%;
}

.error_page_section {
	margin:auto;
	top:0;
	left:0;
	bottom:0;
	right:0;
	position:absolute;
	width:70%;
	height:200px;
	text-align:center;
}

.error_page_section h1 {
	margin: 10px 0 0;
    padding: 0 0 13px;
	color:#36abe0;
	font-size:45px;
    font-style:normal;
    font-family:Verdana;
    font-weight:normal;
}


.error_page_section p {
	color:#8b8b8b;
	margin:0;
	padding:15px 3px;
    font-family:Verdana;
	font-size:22px;
	line-height: 27px;
	
}

.error_page_section p a {
    margin:0;
    padding:0;
    color:#36abe0;
    text-decoration:none;
    display:inline-block;
}

.error_page_section p a:hover {
    text-decoration:underline;
}

.copy-right {
    padding-top:5px;
}
    </style>
</head>
<body>
    <form id="form2" runat="server" defaultfocus="txtLogin" defaultbutton="">
        
        <!-- Header Starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header Ends -->

        <section class="error_page_covered">
            <div class="container">
                <div class="row">
                    <div class="error_page_section">
                       <div class="col-xs-12 col-sm-12 col-md-12">
                            <h1>Oops, looks like something went wrong.</h1>
                           <p>We're working to resolve the issue as soon as possible. Please try again later.<br /><br /> &raquo; <a href="dashboard.aspx">Back to previous page</a></p>
                       </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End .container -->
       
        <!-- Footer Starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- Footer Ends -->

        <!-- Bootstrap -->
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
     
    </form>
</body>
</html>
