<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AdminPanel.Default" ValidateRequest="false" %>

<%@ Register Src="~/UserControl/VersionNumber.ascx" TagPrefix="uc1" TagName="VersionNumber" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Ajax" %>


<%--  --%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SCM Admin - Login</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial=1" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link href="css/full-slider.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/jquery-1.11.2.min.js" type="text/javascript"></script>
    <link href="js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/modernizr-2.0.6.js"></script>
    <script src="js/app.js"></script>
   <script src="js/jquery.disable.autocomplete.js" type="text/javascript"></script>
      <script src="js/summernote.js"></script>
    <script src="js/Validate.js"></script>
    
  
    <script>
        $(document).ready(function () {
           
            $('.forget_text').click(function () {
                window.location.href = "ForgotPassword.aspx";
            });

            $('#btnlogin').click(function () {
                if ($('#txtLogin').val() == "" && $('#txtpwd').val() == "") {
                    $('#lblMsg').text('');
                    alert('Please enter Username and Password');
                    return false;
                }
                else if ($('#txtpwd').val() == "") {
                    $('#lblMsg').text('');
                    alert('Please enter Password');
                    return false;
                }
                else if ($('#txtLogin').val() == "") {
                    $('#lblMsg').text('');
                    alert('Please enter Username');
                    return false;
                }
                else {
                    try{
                        var isCheck = "";
                        if($("#rememberMeCheck").is(":checked")){
                            isCheck= true;
                        }
                        else
                            isCheck =false;
                        $.ajax({
                            async: true,
                            type: "POST",
                            url: "default.aspx/UserLogin",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: { userName: $('#txtLogin').val(), Pwd: $('#txtpwd').val(), chkRememberMe: isCheck },
                            success: function (response) {
                              
                            },
                            error: function (response) {
                                console.log(response.d);
                            }
                        });
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
                checkClientTimeZone();
            });
            function checkClientTimeZone() {
                var dt = new Date();
                var tz = -dt.getTimezoneOffset();
                Default.setcookie(tz.toString());
            }
            
             $('#txtpwd').disableAutocomplete();
           
        });
    </script>
   
    <style>
        #demo-1 {
            position: relative; /* can either be relative, absolute or fixed. If position is not set (i.e. static), it would be set to "relative" by script */
            overflow: hidden; /* to bound the empty top space created by inner element's top margin */
            width: 100%;
            min-height: 400px;
            background-color: #999;
        }

        .demo-inner-content {
            position: relative;
            z-index: 2;
            margin: 180px auto;
            padding: 40px;
            max-width: 600px;
            color: #fff;
            text-align: center;
            font-size: 1.5em;
        }

            .demo-inner-content h1 {
                font-size: 2.5em;
                margin: 0;
            }


            body {
                background: url(images/water_bck.jpg) no-repeat center center fixed; 
  	            -webkit-background-size: cover;
  	            -moz-background-size: cover;
  	            -o-background-size: cover;
  	             background-size: cover;
	             width:100%;
	             height:88.5%;
            }

    </style>

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

                                <div class="form-group">
                                    <asp:TextBox ID="txtLogin" runat="server" title="Username" placeholder="Username" MaxLength="50" CssClass="form-control" mandatory="1" AutoCompleteType="None">       </asp:TextBox>
                                    <Ajax:FilteredTextBoxExtender ID="FtbtxtLogin" runat="server" TargetControlID="txtLogin" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom" ValidChars=".@"></Ajax:FilteredTextBoxExtender>

                                </div>
                                <input type="password" style="display: none;" />
                                <div class="form-group">
                                    <asp:TextBox ID="txtpwd" runat="server" TextMode="Password" title="Password" placeholder="Password" MaxLength="16" mandatory="1" CssClass="form-control" AutoCompleteType="None"></asp:TextBox>
                                    <Ajax:FilteredTextBoxExtender ID="FilteredTextBoxExtender1" runat="server" TargetControlID="txtpwd" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></Ajax:FilteredTextBoxExtender>
                                </div>
                                <div class="checkbox login-form-text pull-left">
                                    <input type="checkbox" name="1" value="1" id="rememberMeCheck" runat="server" style="    position: relative !important;    top: 2px;"/><span>Remember Me </span>
                                </div>
                                   <div class="forget_text" style="display: block"><a href="#">
                                    Forgot My Password <span>
                                        <img src="images/arrow_login.png" /></a></span>
                                </div>
                                <p style="clear: both;">
                                    <asp:Label ID="lblMsg" runat="server" Text="" ForeColor="Red" style="float: left;margin-top: -6px;"></asp:Label>
                                </p>
                                <div class="log_smw_btn log_smw_dash pull-right">
                                    <asp:Button ID="btnlogin" runat="server" Text="Sign In" CssClass="btn-default-login"  OnClick="btnlogin_Click"/>
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

            

            setTimeout(function () {
                $("#wrapper").CSSAnimate({ marginLeft: -450, background: "rgba(255, 192, 0, 0.8)" }, 200);
                $("body").css({ overflow: "hidden" });
            }, 3000)

            $("#wrapper").on("mouseenter", function () {
                $(this).CSSAnimate({ marginLeft: 0, background: "rgba(232, 232, 232, .9)" }, 200);
                $("body").css({ overflow: "auto" });
            }).on("mouseleave", function () {
                $(this).CSSAnimate({ marginLeft: -450, background: "rgba(255, 192, 0, 0.8)" }, 200);
                $("body").css({ overflow: "hidden" });
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

                // If your server allow directory listing you can use:
                // (however this doesn't work locally on your computer)

                //folderPath:"testImage/",

                // else:

                images: [
                    //"images/energy_bck.jpg",
                    //"images/gas_bck.jpg",
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
