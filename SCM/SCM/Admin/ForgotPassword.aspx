<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="AdminPanel.ForgotPassword" %>

<%@ Register Src="~/UserControl/VersionNumber.ascx" TagPrefix="uc1" TagName="VersionNumber" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Ajax" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Forgot Password</title>
    <script src="js/1.11.1jquery.min.js"></script>
    <script src="js/1.11.4_jquery-ui.js"></script>
      <script src="js/loader.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link href="css/full-slider.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/modernizr-2.0.6.js"></script>
    <script src="js/app.js"></script>
    <script src="js/jquery.disable.autocomplete.js" type="text/javascript"></script>
    <script src="js/Validate.js"></script>
    
    <style>
        .Login_box {
                max-height: 278px;
            }

        body {
                background-size: cover;
                background: url(images/water_bck.jpg) no-repeat center top;
                margin: 0px;
                font-family: 'MyriadPro-Regular' !important;
            }

              #page_loader {
            background-image: url('../images/ajax-loader.gif');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: .7;
            display: none;
            position: absolute;
            top: 0px;
            z-index: 99999999;
        }
        .loginpage-form h4 {
            color: #87c301;
            font-family: arial;
            font-size: 141.7%;
            font-weight: normal !important;
            margin: 0;
            padding: 5px 0 7px;
        }
        .form-group input[type="text"], .form-group input[type="password"] {
            float:left;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnSubmitForgotUserName').click(function () {
              

                if (ValidateEmail($('#txtEmail').val())) {
                    var param = { 'EmailId': $('#txtEmail').val() };
                    loader.showloader();
                    $.ajax({
                        type: "POST",
                        url: "ForgotPassword.aspx/SubmitForgotPassword",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                    function OnSuccess(data, status) {
                        var msg = (data.d).split('$')[0].replace(/['"]+/g,"");
                        var status = (data.d).split('$')[1];
                        status = parseInt(status);
                        
                        if (status == 1) {
                            if (confirm(msg))
                                // $(location).attr("href", "default.aspx");
                                window.location.href = "default.aspx"
                         loader.hideloader();
                        }
                        else
                        {
                            alert((data.d).split('$')[0].replace(/['"]+/g,""));
                            loader.hideloader();
                            return false;
                        }
                       
                    }

                    function OnError(request, status, error) {
                        console.log(request.statusText);
                    }
                  
                }
            });
       
        });

        function ValidateEmail(email) {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
            var myRegExp = /^(?:(?:https?|ftp|http):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
            if (email.trim().length == 0) {
                //alert('Please enter your email.');
                alert('Please enter Email');
                $('#txtEmail').addClass('errorbox');
                $('#txtEmail').focus();
                return false;
            }
            else if (!filter.test(email)) {
                //alert("Please enter valid email.");
                alert("Please enter a valid Email");
                $('#txtEmail').addClass('errorbox');
                $('#txtEmail').focus();
                return false;
            }
            else { return true };
        }
    </script>
</head>
<body>


    <form id="form1" runat="server">
        <asp:ScriptManager ID="scrMgr" runat="server">
        </asp:ScriptManager>
        <div class="container">
            <div class="row row-centered" id="tblLogin">
                <div class="col-xs-9 col-centered login_2">
                    <div class="content">
                        <div class="Login_box">
                            <div class="Login_box_area_2">
                                <div class="logo">
                                   
                                        <img src="images/scm_logo.png" />
                                </div>
                                <div>
                                     
                                    <div id="ForgotPswdContainer" runat="server" clientidmode="Static" style="margin-top: 30px;">
                                        <div class="form-group">
                                            <h4 validatemessage="Email" title="Email">Email</h4>
                                            <span class="login-page-user"></span>
                                            <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Mandatory" MaxLength="50" ClientIDMode="Static"></asp:TextBox>
                                            <span class="required" style="color: #ff0000; padding-left: 3px; font-size: 19px; margin-right: -12px;float: right;">*</span>
                                        </div>

                                        <div class="log_smw_btn pull-left">
                                            <asp:Button ID="btnCancelForgotUserName" runat="server" Text="Cancel" value="Cancel" CssClass="btn-default-login-cancel" OnClick="btnCancelForgotUserName_Click" title="Click to cancel forgot password request" />
                                        </div>
                                        <div class="log_smw_btn pull-right">
                                            <asp:Button ID="btnSubmitForgotUserName" runat="server" Text="Submit" value="Submit" CssClass="btn-default-login-submit" title="Click to submit forgot password request" OnClientClick="return false;" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-md-4">
                        <uc1:VersionNumber runat="server" ID="VersionNumber" />
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-4">
                        <asp:Label ID="lblCopyRight" runat="server" Text="© 2016 Smart Utility Systems | All rights reserved" Style="line-height: 23px;"></asp:Label>
                    </div>

                    <div class="col-xs-12 col-sm-4 col-md-4">
                        <div class="footer-logo" style="float: right!important; cursor: pointer">

                            <a onclick="javascript:window.open('http://smartenergywater.com/')">
                                <img src="images/logo-sus.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- END footer -->
         <div id="page_loader">
    </div>
    </form>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    

</body>
</html>
