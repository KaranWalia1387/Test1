<%@ Page Language="C#" AutoEventWireup="true" Title="Password Reset" CodeBehind="password_reset.aspx.cs" Inherits="AdminPanel.password_reset" %>

<%@ Register Src="~/UserControl/VersionNumber.ascx" TagPrefix="uc1" TagName="VersionNumber" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Ajax" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="js/1.11.1jquery.min.js"></script>
    <script src="js/1.11.4_jquery-ui.js"></script>
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
        .loginpage-form h4 {
            color: #87c301;
            font-family: arial;
            font-size: 141.7%;
            font-weight: normal !important;
            margin: 0;
            padding: 5px 0 7px;
        }

        .loginpage-form h3 {
            font-size: 13px !important;
            font-weight: normal;
            padding: 11px 0px 1px;
            margin: 0px;
            line-height: 21px;
        }

         body {
                background-size: cover;
                background: url(images/water_bck.jpg) no-repeat center top;
                margin: 0px;
                font-family: 'MyriadPro-Regular' !important;
            }

        .logo {
    margin: 24px auto 0px;
    display: block;
    text-align: center;
}

        .Login_box {
            background: #fff;
            max-width: 40%;
            max-height: 60%;
            margin: 0 auto;
            padding-left: 20px;
            -webkit-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            TOP: 50%;
            POSITION: fixed;
            left: 50%;
            width: 100%;
            height: 100%;
        }

        .loginpage-form h1 {
            color: #87c301;
            font-size: 190% !important;
            font-weight: normal;
            padding: 10px 0 0 0;
            margin: 0px;
            text-align: left;
        }

        .form-group {
    margin-bottom: 0 !important;
    width: 100%;
    float: left;
    margin-top: 8px;
}

     
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnSubmit').click(function () {
                var txtPwd = '';
                var txtConfPwd = '';
                txtPwd = $('#txtpwd').val();
                txtConfPwd = $('#txtconfirmpwd').val();


                if (txtPwd=='' && txtConfPwd == '') {
                    //alert("Passwords do not match, please enter the same password.")
                    alert("Please enter all the mandatory information")
                    return false;
                }


                if (txtPwd=='') {
                    //alert("Passwords do not match, please enter the same password.")
                    alert("Please enter New Password")
                    return false;
                }


                if (txtConfPwd == '') {
                    //alert("Passwords do not match, please enter the same password.")
                    alert("Please confirm the Password")
                    return false;
                }

                if (txtPwd != txtConfPwd) {
                    //alert("Passwords do not match, please enter the same password.")
                    alert("Passwords do not match, please enter the same password")
                    return false;
                }
                if (ValidatePassword3(txtPwd)) {
                    var username = $('#hdnUName').val();
                    var Token = $("#hdnToken").val();


                    var param = { Token: $("#hdnToken").val(), NewPassword: txtPwd };
                    $.ajax({
                        type: "POST",
                        url: "password_reset.aspx/UpdatePassword",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(param),
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                    function OnSuccess(data, status) {
                        var result = JSON.parse(data.d);
                        if (result.Table[0].STATUS == '1') {
                            alert(result.Table[0]["MESSAGE"]);
                            var url = window.location.href;
                            var index = url.lastIndexOf('/') + 1;
                            if (index != -1)
                                url = url.substring(0, index);
                            url = url + "default.aspx";
                            window.location = url;
                            return false;
                        }
                        else {
                            alert(result.Table[0]["MESSAGE"]);
                            return false;
                        }
                    }

                    function OnError(request, status, error) {
                        alert(result.Table[0]["MESSAGE"]);
                    }
                }
                else
                    return false;


            });
        });

        function ValidatePassword3(password) {
            var re = '';
            var f = 0;
            if (password.length == 0) {
                return false;
            }
            if (password.length < 8) {
                f = 1;
            }
            re = /[0-9]/;
            if (!re.test(password)) {
                f = 1;
            }
            re = /[A-Z]/;
            if (!re.test(password)) {
                f = 1;
            }
            if (/^[a-zA-Z0-9 ]*$/.test(password) == true) {
                f = 1;
            }
            if (f == 1) {
                //alert('The entered Password does not meet the minimum security requirements. Please enter a valid password. Password shall be at least 8 characters long and must contain one capital letter, one numeric and one special character ({}, (), [], #, ?, !, *, $, _, % @, ^).');
                alert('The entered Password does not meet the minimum security requirements. Please enter a valid password. Password should be at least 8 characters long and must contain one capital letter, one numeric and one special character (@, #, $, &, %, *, !)');

                return false;
            }
            return true;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="scrMgr" runat="server">
        </asp:ScriptManager>
        <asp:HiddenField ID="hdnmsg" runat="server" Value="" />
        <asp:HiddenField ID="hdnUName" runat="server" Value="" />
        <asp:HiddenField ID="hdnToken" runat="server" Value="" />
        <div class="container">
            <div class="row row-centered" id="tblLogin">
                <div class="col-xs-9 col-centered login_2">
                    <div class="content">
                        <div class="Login_box" id="tbl">
                            <div class="loginpage-form">
                                <div class="logo">
                                    
                                        <img src="images/scm_logo.png" />
                                </div>
                                <h1>Password Reset</h1>
                                <div id="divresetpassword">
                                    <div id="Error_Box" runat="server">
                                        <h3 id="ErrorMessage" runat="server" style="color: red;padding:0;">Password Reset link entered is invalid. Please try again or generate a new one by clicking on Forgot Password on Customer Service Portal.</h3>
                                    </div>
                                    <div id="Pass_Reset" runat="server">
                                        <div class="form-group">
                                            <h3>New Password</h3>
                                            <span class="login-page-password"></span>
                                            <asp:TextBox ID="txtpwd" runat="server" TextMode="Password" globalize="ML_CHANGEPWDPOPUP_NEWPWD" class="form-control" placeholder="New Password" title="New Password" value="" size="30"
                                                MaxLength="16" mandatory="1" Style="width: 97% !important; float: left;">
                                            </asp:TextBox>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="form-group">
                                            <h3 globalize="ML_PasswordReset_Lbl_ConfirmPass">Confirm Password</h3>
                                            <span class="login-page-password"></span>
                                            <asp:TextBox ID="txtconfirmpwd" runat="server" TextMode="Password" class="form-control" title="Confirm Password" placeholder="Confirm Password" globalize="ML_CHANGEPWDPOPUP_CONFIRMPWD"
                                                value="" size="30" MaxLength="16" mandatory="1" Style="width: 97% !important; float: left;">
                                            </asp:TextBox>
                                            <input type="button" class="btn-default-login-submit" style="margin-right: 3%;" id="btnSubmit" clientidmode="static"
                                                style="outline: none;" value="Submit" />
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
    </form>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
   <%-- <script src="js/mb.bgndGallery.js"></script>
    <script src="js/mb.bgndGallery.effects.js"></script>
    <script type="text/javascript">

        var myGallery;

        $(function () {

            if (self.location.href == top.location.href) {
                var logo = $("<a href='' style='position:absolute;top:40px;left:50px;z-index:1000;display:none'><img id='logo' border='0' src='http://pupunzi.com/images/logo.png' alt='mb.ideas.repository'></a>");
                $("body").prepend(logo);
                $("#logo").fadeIn();
            }

            setTimeout(function () {
                $("#wrapper").CSSAnimate({ marginLeft: -450, background: "rgba(255, 192, 0, 0.8)" }, 200);
                $("body").css({ overflow: "hidden" })
            }, 3000)

            $("#wrapper").on("mouseenter", function () {
                $(this).CSSAnimate({ marginLeft: 0, background: "rgba(232, 232, 232, .9)" }, 200);
                $("body").css({ overflow: "auto" })
            }).on("mouseleave", function () {
                $(this).CSSAnimate({ marginLeft: -450, background: "rgba(255, 192, 0, 0.8)" }, 200);
                $("body").css({ overflow: "hidden" })
            });



            myGallery = new mbBgndGallery({
                containment: "body",
                timer: 3000,
                effTimer: 3000,
                controls: "#controls",
                autoStart: true,
                grayScale: false,
                shuffle: true,
                preserveWidth: false,
                effect: "fade",
                thumbs: { folderPath: "thumbs/", placeholder: "#thumbnails" },

                images: [
                    "images/energy_bck.jpg",
                    "images/gas_bck.jpg",
                    "images/water_bck.jpg"
                ],

                onStart: function () { },
                onPause: function () { },
                onPlay: function (opt) { },
                onChange: function (opt, idx) { },
                onNext: function (opt) { },
                onPrev: function (opt) { }
            });
        });

    </script>--%>

</body>
</html>
