<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Error.aspx.cs" Inherits="AdminPanel.Error" %>

<%@ Register Src="~/UserControl/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="css/main.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <title></title>

    <style type="text/css">
        header {
	 background: #fff none repeat scroll 0 0;
    box-shadow: 0 0 4px #9c9c9c !important;
    margin: 0;
    position: relative;
    z-index: 99999999;
}

.logo {
	margin:0;
	padding:15px 0;
}

/*--Error Page CSS--*/

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
    <form id="form1" runat="server">
        <header>
    	    <div class="container">
        	    <div class="row">
            	    <div class="col-lg-6 col-md-6 col-sm-4 col-xs-12">
                	    <div class="logo"><a href="#"><img src="images/logo.png" alt="SCM Logo"></a></div>
                    </div>
                    
                
                </div>
            </div>
 </header>
        <section class="error_page_covered">
            <div class="container">
                <div class="row">
                    <div class="error_page_section">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <h1>Oops, looks like something went wrong.</h1>
                           <p>We're working to resolve the issue as soon as possible. Please try again later.<br /><br /> &raquo; <a href="home.aspx">Back to previous page</a></p>
                       </div>

                       
                    </div>
                </div>
            </div>
        </section>

    <div>
    
    </div>

        <uc1:Footer runat="server" ID="Footer" />
        <%--<footer class="footer">
    <div class="container">
    	<div class="row">
             <div class="col-xs-12 col-sm-4 col-md-4">    
          
<div style=" font-size: 10px;
    margin: 7px 0 0;
    padding: 0;
    text-align: center;position:absolute">
              Version No. 0.2.20
            </div>
      </div>
        	<div class="col-xs-12 col-sm-4 col-md-4">            
                <div class="copy-right">&copy; 2015 Smart Utility Systems | All rights reserved</div>
                </div>
     
            <div class="col-xs-12 col-sm-4 col-md-4">    
    <div style="float: right!important;cursor: pointer" class="footer-logo">
        
                	<a onclick="javascript:window.open('http://www.smartusys.com')">
                	    <img src="images/logo-sus.png">
                	</a>
                </div>        
                </div>
            </div>
        </div>
</footer>--%>
    </form>
</body>
</html>
