<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="password_reset.aspx.cs" Inherits="CustomerPortal.password_reset" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<%@ Register Src="~/UserControls/PasswordIndicator.ascx" TagPrefix="uc1" TagName="PasswordIndicator" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head runat="server"><title>Password Reset</title><uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <script src="js/login-support.js" type="text/javascript"></script>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- bootstrap 3.0.2 -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
     <link id="stylecss" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <style type="text/css">
        footer .footer-logo {
            float: right;
            text-align: right;
            margin: 6px 0px 0;
        }

        .form-group {
            float: left;
            width: 100%;
        }

        .login-page-password {
            top: 30px !important;
            background-size: 36px 34px;
        }

        .loginpage-form h1 {
            font-size: 23px !important;
        }

        .loginpage-form h3 {
            font-size: 17px !important;
        }

        #errorMsg {
            float: right;
            position: absolute;
            top: 8px;
            right: 0px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display: none;
        }

        .carousel-inner {
            background: none !important;
        }

        @media (min-width: 1200px) {
            .container {
                width: 1200px !important;
            }
        }

        .row {
            margin-left: -15px;
            margin-right: -15px;
        }

        .logo {
            margin: 0;
            padding: 7px 0;
            width: auto;
        }

        .right_my_accounct {
            margin: 0;
            padding: 0;
            text-align: right;
        }

            .right_my_accounct ul {
                margin: 17px 0px;
                padding: 0;
                float: right;
                list-style: none;
            }

                .right_my_accounct ul li {
                    margin: 0;
                    padding: 0;
                    float: left;
                }

                    .right_my_accounct ul li a {
                        margin: 0;
                        padding: 10px 10px 2px;
                        text-decoration: none;
                        display: block;
                    }

                        .right_my_accounct ul li a:hover {
                            color: #88c300;
                        }

        .header-top-social {
            float: left;
            margin-right: 10px;
            margin-top: 14px;
            width: 267px;
        }

        @media (max-width:767px) {
            .header-top-social {
                width: 100%;
            }

            .back_to_login {
                background: rgba(0, 0, 0, 0) url("../images/icon_back_login.png") no-repeat scroll left top;
                clear: both;
                display: block;
                float: none;
                height: 30px;
                margin: 62px auto 0;
                padding: 0;
                text-align: center;
                width: 167px;
            }

            .logo {
                display: block;
                float: none;
                margin: 0 auto;
                padding: 5px 0;
                text-align: center;
                width: 210px;
            }


            .conect {
                clear: both;
                float: right;
                margin-bottom: 10px;
                width: 100%;
            }

            .connect_with_us {
                color: #888888;
                float: left;
                font-size: 14px;
                font-weight: normal;
                padding-top: 13px;
                width: 40%;
            }

            .register-section > .social-section-area {
                float: left;
                margin-bottom: 1px;
                margin-top: 9px;
                text-align: left;
                width: 52%;
            }

                .register-section > .social-section-area > ul > li > a {
                    margin: 0 2px !important;
                }
        }

        @media (max-width:450px) {
            .header-top-social {
                margin-top: 0px;
            }
        }

        .connect_with_us {
            float: left;
            font-size: 14px;
            font-weight: normal;
            color: #888888;
            padding-top: 13px;
        }


        /* =============================================================================
  Social Media Links
============================================================================= */
        .component-1 {
            text-align: center;
        }

        .component__title {
            margin-bottom: 12px;
            color: #fff;
            font-size: 22px;
            font-weight: 700;
        }

        /* =============================================================================
      ICONS - Social Media Links 
    ============================================================================= */
        /**
     * Icon common styles.
     *
     * Set it to block or inline block, whichever suits your needs. Overflow set to
     * hidden for precautions, and make sure to set the font size to 0 and the text
     * indent to -9999px. This allows us to actually include text in the markup
     * which will be good for screen readers and accessibility purposes.
     */
        .icon-123 {
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            margin: 4px;
            width: 26px;
            height: 26px;
            font-size: 0;
            text-indent: -9999px;
        }


        .log_smw_btn {
            width: 100% !important;
        }

        .login-page input[type="text"], .login-page input[type="password"] {
            height: 34px;
            width: 97% !important;
            float: left;
        }

        .strengthdiv {
            width: 100%;
            float: left;
            text-align: left;
        }

        #pswd_info#pswd_info {
            top: -26px !important;
            left: 90px !important;
        }


    </style>
    <script type="text/javascript">
        $(document).ready(function () {
    // code commented for removing password indicator to be used in next release
    $('#txtpwd').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: 'Show Password',
        strengthButtonTextToggle: 'Hide Password'
    });


    // spanish issue
    // for password meter attribute to be same as txtpassword refer to password meter
    
    $('#txtpwd').focus();
    var msg = $('#hdnmsg').val();
    if (msg != null & msg != "") {

        toastr.info(msg);

    }
});
                                $(document).ready(function () {
                                    if($('#ErrorMessage').text() == "This link has expired. Please click here to generate a new password")
                                        $('#ErrorMessage').html("This link has expired. Please <a href='LoginSupport.aspx?id=1'>click here</a> to generate a new password")
                                    else  if($('#ErrorMessage').text() == "Este enlace ha caducado. Haga clic aquí para generar una nueva contraseña")
                                        $('#ErrorMessage').html("Este enlace ha caducado. <a href='LoginSupport.aspx?id=1'>Haga clic aquí</a> para generar una nueva contraseña")

                                    $("#btnlogin").click(function () {
                                        if (ValidateAllPageFieldsSingleMessage('Sec_Question')) {
                                            var param = { UserName: $("#hdnUName").val(), token: $("#hdnToken").val(), Question: $("#ddlSecurityQuestions").val(), Answer: $("#txtHintAns").val() };
                                            $.ajax({
                                                type: "POST",
                                                url: "password_reset.aspx/SubmitAnswer",
                                                data: JSON.stringify(param),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (response) {
                                                    var res =$.parseJSON(response.d);
                                                    var status=res.Table[0].STATUS;
                                                    var msg=res.Table[0].Message;
                                                    if (status == "1")
                                                    {
                                                        $("#Sec_Question").hide();
                                                        $("#Pass_Reset").show();
                                                    }
                                                      
                                                    else {


                                                        //w2alert(res.Table[0].Message,'Notification', function() {                                                            
                                                        w2alert(res.Table[0].Message, $("#Notificationtxt").text(), function () {
                                                                if (res.Table[0].AttemptLeft == "0") {
                                                                    window.location = "default.aspx";
                                                                }
                                                            
                                                        });
                                                      
                                                    }
                                                    loader.hideloader();
                                                },
                                                error: function (request, status, error) {
                                                    loader.hideloader();

                                                    toastr.error(error);
                                                }
                                            });
                                        }
                                        else {
                                            // alert('hiee');
                                        }
                                    });
                                });

                                //#5323,#5325 - Start
                                function ValidateAndSubmit() {
                                    var txtPwd = '';
                                    var txtConfPwd = '';
                                    var SecQuesId = "";
                                    var HintAns = "";
                                    toastr.clear();
                                    if (ValidateAllPageFieldsSingleMessage('Pass_Reset')) {
                                        txtPwd = $('#txtpwd').val();
                                        txtConfPwd = $('#txtconfirmpwd').val();
                                      
                                        if (txtPwd != txtConfPwd) {
                                          
                                            toastr.warning($('#ML_LoginSupport_lbl_PwdDoNotMatch').text());
                                           
                                            return false;
                                        }
                
                                        if (ValidatePassword3(txtPwd)) {
                                            var username = $('#hdnUName').val();
                                            var result = password_reset.UpdatePassword(username, txtPwd).value;
                                            if (result != null && result.Rows.length > 0) {
                        
                                                if (result.Rows[0]["Status"] == '1') {
                                                    toastr.success(result.Rows[0]["msg"])
                                                    // alert(result.Rows[0]["msg"]);
                                                    var url = window.location.href;
                                                    var index = url.lastIndexOf('/') + 1;
                                                    if (index != -1)
                                                        url = url.substring(0, index);
                                                    url = url + "default.aspx";
                                                    window.location = "default.aspx";
                                                    return false;
                                                }
                                                else {
                                                    toastr.error(result.Rows[0]["msg"])
                                                 
                                                    $('#txtHintAns').val('');
                                                    return false;
                                                }
                                            }
                                            else {
                                                toastr
                                                    .error("Server error. Please try again later or contact support.");
                                                
                                                return false;
                                            }
                                        }
                                        else
                                            return false;
                                    }
                                    else
                                        return false;
                                }

                              
                                </script>
                            </head>
                            <body>
    <form id="form1" runat="server" autocomplete="off">
        <asp:HiddenField ID="hdnmsg" runat="server" Value="" />
        <asp:HiddenField ID="hdnUName" runat="server" Value="" />
        <asp:HiddenField ID="hdnToken" runat="server" Value="" />
        <!-- Header starts-->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header end-->

        <section class="container">
            <div class="row">
                <div class="col-lg-12">
                	<div class="login-page">

        <div id="LoginboxContainer" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" runat="server">
           <div class="loginpage-form">
                <h1 globalize="ML_PasswordReset_Lbl_PassReset"><%= CustomerPortal.Translator.TT_ProductName("ML_PasswordReset_Lbl_PassReset") %></h1>              
             <div id="divresetpassword">
                 <div id="Error_Box" runat="server">
                     <h3 id="ErrorMessage" runat="server" style="color:red">Password Reset link entered is invalid. Please try again or generate a new one by clicking on Forgot Password on Smart Customer Mobile.</h3>
                    </div>
                    <div id="Pass_Reset" runat="server">
                    <div class="form-group">
                    <h3 globalize="ML_PasswordReset_Lbl_NewPass"><%= CustomerPortal.Translator.T("ML_PasswordReset_Lbl_NewPass") %></h3>
                   <span class="login-page-password"></span>
                        <asp:TextBox ID="txtpwd" runat="server" TextMode="Password" globalize="ML_CHANGEPWDPOPUP_NEWPWD" class="form-control" placeholder="New Password" title="New Password" value="" size="30"
                            MaxLength="16" mandatory="1" style="width:97% !important; float:left;">
                        </asp:TextBox>
                        </div>
                      <div class="form-group">
                    <h3 globalize="ML_Register_Lbl_ConfrmPasswrd"><%= CustomerPortal.Translator.T("ML_Register_Lbl_ConfrmPasswrd") %></h3>
                   <span class="login-page-password"></span>
                        <asp:TextBox ID="txtconfirmpwd" runat="server" TextMode="Password" class="form-control" title="Confirm Password" placeholder="Confirm Password" globalize="ML_CHANGEPWDPOPUP_CONFIRMPWD"
                            value="" size="30" MaxLength="16" mandatory="1" style="width:97% !important; float:left;">
                        </asp:TextBox>
    <input type="button"  value='<%= CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' class="btn-default-login-submit" style="margin-right:3%;" onclick=" return ValidateAndSubmit();"
                            Style="outline: none;" />
                     <uc1:PasswordIndicator runat="server" ID="PasswordIndicator" />
    </div>
                         </div>
                        <div class="clearfix">&nbsp;</div>
                        <div id="Sec_Question" runat="server">
                        <div class="log_smw_btn">
                        <div class="form-group">
                            <h3 globalize="ML_Register_Lbl_SecurtyQustn"><%= CustomerPortal.Translator.T("ML_Register_Lbl_SecurtyQustn") %></h3>
                            <asp:DropDownList ID="ddlSecurityQuestions"  ClientIDMode="Static" runat="server" mandatory="1" globalize="ML_Register_Lbl_SecurtyQustn" title="Security Question" AutoPostBack="false" style="width:97%;height:34px;"></asp:DropDownList>
                        </div>
                             <div class="form-group">
                             <h3 globalize="ML_Register_Lbl_SecurtyAnswr"><%= CustomerPortal.Translator.T("ML_Register_Lbl_SecurtyAnswr") %></h3>
                             <span class="login-page-password hint_img"></span><asp:TextBox ID="txtHintAns" runat="server" class="form-control" style="width:97% !important; float:left;" size="30" ClientIDMode="Static" globalize="ML_Register_Lbl_SecurtyAnswr" placeholder="Security Answer" title="Security Answer" mandatory="1" MaxLength="25">
                        </asp:TextBox>   
                            </div> 
                            <input type="button" id="btnlogin"  value='<%= CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' class="btn-default-login-submit"  Style="outline: none;" />
                         </div>
                                </div>                         
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
            </div><!-- End .row -->
          
                
        </section>
        <!-- footer starts  -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- footer ends  -->
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <span globalize="ML_LoginSupport_lbl_PwdDoNotMatch" id="ML_LoginSupport_lbl_PwdDoNotMatch" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_LoginSupport_lbl_PwdDoNotMatch") %></span>
        <span id="Notificationtxt" globalize="ML_HeaderMenu_span_Notific" style="display:none"><%= CustomerPortal.Translator.TT_ProductName("ML_HeaderMenu_span_Notific") %></span>
    </form>
</body>
</html>
