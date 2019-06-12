<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CustomerRegistration.aspx.cs" Inherits="CustomerPortal._CustomerRegistration" ValidateRequest="false" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<%@ Register Src="~/UserControls/PasswordIndicator.ascx" TagPrefix="uc1" TagName="PasswordIndicator" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link href="css/error.css" rel="stylesheet" />
    <script src="js/ui/jquery-ui.js"></script>
    <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
    <script src="js/ui/jquery.ui.core.js"></script>
    <script src="js/ui/jquery.ui.widget.js"></script>
    <script src="https://www.google.com/recaptcha/api.js" type="text/javascript"></script>
    <script src="js/ui/jquery.ui.position.js"></script>
    <script src="js/ui/jquery.ui.autocomplete.js"></script>
    <script src="js/CustomerRegistration.js" type="text/javascript"></script>
    <!-- bootstrap 3.0.2 -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />

    <title><%= CustomerPortal.Translator.TT_ProductName("ML_CustomerRegistration_Lbl_Registration") %></title>
    <link id="stylecss" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <script src="js/jquery.mask.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $('.w2ui-msg-title').text("Notification");
        });
    </script>
    <script src="js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function () {
            $('.collapse').on('shown.bs.collapse', function () {
                $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
            }).on('hidden.bs.collapse', function () {
                $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
            });
        });
    </script>
    <style type="text/css">
        .registration-form select {
            width: 96% !important;
        }

        .w2ui-tag .w2ui-tag-body {
            left: -39px;
        }

        

            #pswd_info::before {
                top: 82px !important;
                left: 2% !important;
            }


        .w2ui-tag .w2ui-tag-body {
            background-color: rgba(60,60,60,.82);
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            padding: 4px 10px;
            margin-top: 0;
            color: #fff !important;
            box-shadow: 1px 1px 3px #000;
            line-height: 100%;
            font-size: 11px;
            font-family: Verdana,Arial,sans-serif;
            left: -210px !important;
            bottom: 10px;
        }

            .w2ui-tag .w2ui-tag-body:before {
                left: 40px;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid rgba(60, 60, 60, 0.82);
                bottom: -13px;
            }

        .w2ui-msg-title {
            display: block !important;
        }

        .registration-form div {
            position: static;
            line-height: 30px;
        }

        .reg_button {
            margin-bottom: 28px;
        }

        .divider_register_box {
            display: table;
            width: 100%;
        }



        @media (max-width:767px) {
            .divider_register_box {
                background: none;
            }
        }

        .add_digits {
            font-size: 12px;
        }

        @-moz-document url-prefix() {
            #recaptcha_widget #recaptcha_image;

        {
            width: 80% !important;
        }

        }

        @media (min-width:768px) and (max-width:991px) {
            .step2_button {
                height: 675px !important;
            }

            .w2ui-tag .w2ui-tag-body {
                left: 0 !important;
                top: 0 !important;
                white-space: normal;
                width: 84px;
            }

            .divider_register_box {
                background: none !important;
            }

            .top_space {
                margin-top: 16px;
            }
            .registration-form select {
            width: 89% !important;
        }
            #pswd_info {
    left: 13px !important;
    position: absolute;
    top: -78px !important;
}
            #pswd_info::before {
    left: 1% !important;
    top: 82px !important;
}
            .capture {
    margin-top: 0px !important;
}
            .top_space {
    margin-top: 0px!important;
}
        }

        @media (min-width:992px) and (max-width:1024px) {
            .w2ui-tag .w2ui-tag-body {
                left: 0;
                white-space: normal;
                width: 84px;
            }
            #pswd_info {
    left: 13px !important;
    position: absolute;
    top: -78px !important;
}
            #pswd_info::before {
    left: 1% !important;
    top: 82px !important;
}
            .capture {
    margin-top: -12px;
}
        }

        /*#pswd_info {
            top: -194px !important;
        }*/

            #pswd_info::before {
                content: "\25bc" !important;
                position: absolute;
                font-size: 27px !important;
                line-height: 14px;
                color: #ddd;
                text-shadow: none;
                display: block;
            }

        #errorMsg {
            float: right;
            position: absolute;
            top: 27px;
            right: 30px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display: none;
        }

        #legend {
            float: left;
            position: relative;
            top: -47px;
            right: -209px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            margin: 0px -169px 0px 0px;
        }

        .registration-form select {
            padding-right: 0px;
        }

        @media screen and (min-width:0\0) {
            .w2ui-popup .w2ui-msg-body {
                overflow: inherit !important;
            }
        }

        .step2_button {
            height: 360px;
            overflow: auto;
        }

        @-moz-document url-prefix() {
            .step2_button {
                height: 381px;
                overflow: auto;
            }
        }

        @media screen and (min-width:0\0) {
            .step2_button {
                height: 385px;
                overflow: auto;
            }
        }

        @media (min-width:1600px) and (max-width:3500px) {

            .step2_button {
                height: auto;
                overflow: auto;
            }
        }

        @media (min-width: 320px) and (max-width:640px) {
            .logo {
                text-align: right !important;
                margin-right: 0 !important;
            }

                .logo img {
                    max-width: 100%;
                }

            .service_text p {
                font-size: 12px !important;
            }

            #NextBtn {
                margin-right: 39px !important;
            }

            .registration-form select#ddlZip {
                width: 91.8% !important;
            }
        }



        /* For IE 8 */

        @media \0screen {
            .w2ui-popup .w2ui-msg-body {
                overflow: inherit !important;
            }
        }

        .select_dis {
            -webkit-appearance: none;
            -o-appearance: none;
            -ms-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        .registration-page {
            /*margin-bottom: 30px;*/
            height: 507px;
        }

        @media (min-width: 992px) and (max-width:1024px) {
            #recaptcha_widget > #recaptcha_image {
                width: 210px !important;
            }

            #recaptcha_image img {
                width: 235px !important;
            }

            #recaptcha_response_field {
                width: 235px !important;
            }

            #Step2 {
                font-size: 13px;
            }

            .registration-form select {
                width: 95% !important;
            }

            .registration-form input[type="text"], .registration-form input[type="password"] {
                width: 95%!important;
            }
            
        }

        .w2ui-tag .w2ui-tag-body {
            white-space: normal;
            max-width: 194px;
        }

        .registration-form select#ddlZip {
            width: 86.8%;
        }

        #Step1 select {
            height: 28px;
        }

        .registration-form h1 {
            padding-left: 12px;
        }

        .strengthdiv {
            margin-top: -4px;
            width: 87%;
            margin-bottom: 5px;
        }

        .strengthdiv {
            width: 100%;
            float: left;
            text-align: left;
        }

        #ddlquestions {
            color: rgb(51, 51, 51) !important;
        }

        #ddlquestions2 {
            color: rgb(51, 51, 51) !important;
        }

        #toast-container {
            width: 100% !important;
        }

        .rightbor {
            margin-top: 5px;
        }

            .rightbor h2 {
                color: #39b0d2;
                font-size: 130.8%;
                font-weight: bold;
                padding: 10px 0 0 0;
                margin-top: 0;
            }

        .panel-title a {
            color: #39b0d2 !important;
            font-size: 14px !important;
            display: block;
            line-height: 20px;
            text-decoration: none !important;
        }

        .panel-default > .panel-heading {
            background-color: #fdfdff !important;
        }

        #accordion .panel:first-child {
            border-top: 0px solid #ebebeb !important;
        }

        .panel {
            border-bottom: 1px solid transparent;
            border-left: none;
            border-right: none;
        }

        .panel-heading, .panel {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

        .panel-title a:visited {
            text-decoration: none !important;
        }

        .accordion-toggle span {
            color: #a3a3a5;
            font-size: 20px;
            border-radius: 50%;
            padding: 0;
            border: 1px solid #a3a3a5;
            width: 22px;
            height: 22px;
            text-align: center;
        }

        .rightbor_border {
            border-top: 1px solid #e2e0e0;
            float: left;
            width: 100%;
            margin-top: 20px;
        }

        .panel-group .panel + .panel {
            margin-top: 0px;
        }

        .registration-form input[type="text"], .registration-form input[type="password"] {
            width: 96%;
        }

        .accordion-toggle span {
            color: #a3a3a5;
            font-size: 20px;
            border-radius: 50%;
            padding: 0;
            border: 1px solid #a3a3a5;
            width: 22px;
            height: 22px;
            text-align: center;
        }
        .capture{
            margin-top:-18px;
        }
        .registration_btn.registration_btn{
            line-height:21px;
        }
        .reg_btn{
            margin-right:0px!important;
        }
        #pswd_info {
            position: absolute;
            top: 41px !important;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#hdnCaptchamsg').val($('#ML_CustomerRegistration_Msg_Captcha').text());
            $('#txtSecurityA').disableAutocomplete();
            $('#txtPassword,#txtConfirmPwd,#txtSecurityB').disableAutocomplete();

            if ($('#Steps').val() == "1") {

            }
            else {
                markMandatory('Step2', 'legend');
            }
            $('#recaptcha_response_field').attr('tabindex', '16');

            // added to disable pasting  of special chars and Numbers in Names TextBox
            $("input.Text:text").bind('paste', function (e) {
                var input = $(this)
                setTimeout(function () {
                    var data = $(input).val();
                    var dataFull = data.replace(/[^a-zA-Z]/g, '');
                    $(input).val(dataFull);
                });

            });

            $("#txtSSN").on('focusout', function (e) {
                var $this = $(this);
                $this.val($this.val().replace(/[^\d\.]/g, ''));
            }).on('paste', function (e) {
                var $this = $(this);
                setTimeout(function () {
                    $this.val($this.val().replace(/[^\d\.]/g, ''));
                }, 5);
            });

            var $dropdown1 = $("select[name='ddlquestions']");
            var $dropdown2 = $("select[name='ddlquestions2']");
            $('#ddlquestions2').prop('selectedIndex', 1);
            hidequestion1dropdown();
            hidequestion2dropdown();

            $dropdown1.change(function () {
                hidequestion1dropdown();
                //var selectedItem = $($dropdown1).val();
                //var selectedItem2 = $($dropdown2).val();
                //$("select[name='ddlquestions2'] option").removeAttr('disabled');
                //$("select[name='ddlquestions2'] option[value=" + selectedItem + "]").prop('disabled', 'disabled');
                //$('#txtSecurityA').val('');
            });
            $dropdown2.change(function () {
                hidequestion2dropdown();
                //var selectedItem2 = $($dropdown2).val();
                //$("select[name='ddlquestions'] option").removeAttr('disabled');
                //$("select[name='ddlquestions'] option[value=" + selectedItem2 + "]").prop('disabled', 'disabled');
                //$('#txtSecurityB').val('');
            });
        });


        function hidequestion1dropdown() {
            var $dropdown1 = $("select[name='ddlquestions']");
            var selectedItem = $($dropdown1).val();

            $("select[name='ddlquestions2'] option").removeAttr('disabled');
            $("select[name='ddlquestions2'] option[value=" + selectedItem + "]").prop('disabled', 'disabled');
            $('#txtSecurityA').val('');
        }

        function hidequestion2dropdown() {
            var $dropdown2 = $("select[name='ddlquestions2']");

            var selectedItem2 = $($dropdown2).val();
            $("select[name='ddlquestions'] option").removeAttr('disabled');
            $("select[name='ddlquestions'] option[value=" + selectedItem2 + "]").prop('disabled', 'disabled');
            $('#txtSecurityB').val('');
        }

        function ValidateText(e) {
            var retVal;
            if ($('#ddlquestions :selected').text() == 'What were the last four digits of your childhood telephone number?') {

                var chk = (IsNumeric(e));
                if (chk) {

                    toastr.warning("Please enter   4 digits as specified in Securityquestion1");

                    retVal = true;
                }


                else {


                    retVal = false;
                }
            }
            else if ($('#ddlquestions :selected').text() == 'What are the last 5 digits of your driver\'s license number?') {
                $('#txtSecurityA').attr('maxlength', '5');
                var chk = (IsNumeric(e));
                if (chk) {

                    retVal = true;
                }

                else {
                    toastr.warning("Please enter  5 digits Securityquestion");

                    retVal = false;
                }
            }
            else {

                retVal = true;
            }
            return retVal;
        }
        function ValidateText1(e) {
            var retVal;;
            if ($('#ddlquestions2 :selected').text() == 'What were the last four digits of your childhood telephone number?') {
                $('#txtSecurityB').attr('maxlength', '4');
                var chk = (IsNumeric(e));
                if (chk)
                    var retVal = true;
                else retVal = false;
            }
            else if ($('#ddlquestions2 :selected').text() == 'What are the last 5 digits of your driver\'s license number?') {
                $('#txtSecurityB').attr('maxlength', '5');
                var chk = (IsNumeric(e));
                if (chk)
                    retVal = true;
                else retVal = false;
            }
            else {

                retVal = true;
            }
            return retVal;
        }

        $(window).load(function () {
            //  $("#myModal_terms div.modal-body").html($("#termsconditions").val());
            // $("#myModal_privacy div.modal-body").html($("#privacypolicy").val());
        });
    </script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#ddlquestions').css('color', '#a9a9a9');
            $('#ddlquestions').change(function () {
                var current = $('#ddlquestions').val();
                if (current != 'null') {
                    $('#ddlquestions').css('color', '#675E5E');
                } else {
                    $('#ddlquestions').css('color', '#a9a9a9');
                }
            });

            //code commented for removing password indicator to be used in next release
            $('#txtPassword').strength({
                strengthClass: 'strength',
                strengthMeterClass: 'strength_meter',
                strengthButtonClass: 'button_strength',
                strengthButtonText: 'Show Password',
                strengthButtonTextToggle: 'Hide Password'
            });
            $('#ddlquestions2').css('color', '#a9a9a9');
            $('#ddlquestions2').change(function () {
                var current = $('#ddlquestions2').val();
                if (current != 'null') {
                    $('#ddlquestions2').css('color', '#675E5E');
                } else {
                    $('#ddlquestions2').css('color', '#a9a9a9');
                }
            });
            $('#ddlCity').css('color', '#a9a9a9');
            $('#ddlCity').change(function () {
                var current = $('#ddlCity').val();
                if (current != 'null') {
                    $('#ddlCity').css('color', '#675E5E');
                } else {
                    $('#ddlCity').css('color', '#a9a9a9');
                }
            });
            $('#ddlZip').css('color', '#a9a9a9');
            $('#ddlZip').change(function () {
                var current = $('#ddlZip').val();
                if (current != 'null') {
                    $('#ddlZip').css('color', '#675E5E');
                } else {
                    $('#ddlZip').css('color', '#a9a9a9');
                }
            });
            $('#txtPrimaryPhone').mask('(000) 000-0000');
            $('#txtMobileNumber').mask('(000) 000-0000');
            $('#txtAlternatNum').mask('(000) 000-0000');
        });
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager" runat="server"></asp:ScriptManager>

        <asp:HiddenField ID="hdnLat" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="Steps" runat="server" Value="1" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnLong" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountNumber" runat="server" Value="" />
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnCustomeID" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnflag" runat="server" />
        <asp:HiddenField ID="termsconditions" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="privacypolicy" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountMaxLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountMinLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnMeterIdMaxLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnMeterIdMinLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdDLMinLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdDLMaxLength" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnCaptchamsg" runat="server" ClientIDMode="Static" />
        <!-- header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- header starts -->

        <section class="container">
            <div class="row" id="LoginboxContainer">
                <div class="col-lg-12">
                	<div class="registration-page" id="tblNewUser">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <!-- End .logo-login-page -->
                        <div class="registration-form">
                               <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"></span>
                       	     <h1 globalize="ML_Register_Header_Register"><%= CustomerPortal.Translator.T("ML_Register_Header_Register") %></h1>
                          
                             <span id="errorMsg"></span>
                             <asp:MultiView ID="regForm" runat="server" ActiveViewIndex="0">
                                 <asp:View ID="Step1" runat="server">
                                     <div id="Step1">
                                          <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_Billing_lbl_AccNum"><%= CustomerPortal.Translator.T("ML_Billing_lbl_AccNum") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox  ID="txtAccno" placeholder="Account Number" globalize="ML_CustomerRegistration_txt_AccNo" runat="server" TextMode="SingleLine" MaxLength="20" title="Account Number" Text="" TabIndex="2"  mandatory="1"></asp:TextBox>
                               

                                        </div> <%--BUG 6197--%><%--Bug: 6354--%>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_Register_Lbl_EmailId"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %> </div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_CustomerRegistration_Txt_EmailId" ID="txtEmailID" placeholder="Email ID" runat="server" class="box" title="email id" value="" MaxLength="50" TabIndex="4" mandatory="1" ClientIDMode="Static"></asp:TextBox>
                                      
                                        </div>
                                     
                                       
                                       <%-- <div class="clearfix"></div>--%>
                                         <div id ="divZipCode" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_SrvcRqust_P_ZipCode" > <%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %> </div>
                                      <div  class="col-lg-4 col-md-4 col-sm-8" >
                                          <asp:TextBox ID="txtZipCode" globalize="ML_SrvcRqust_txtbx_ZipCode1" CssClass="ZipCode" title="Zip Code" placeholder="Mandatory" MaxLength="5" TabIndex="3"  ClientIDMode="Static" runat="server"></asp:TextBox>
                                           <uc1:ZipCode runat="server"  class="box" title="Zip Code" id="ZipCode"   ClientIDMode="Static" />
                                       </div>
                                           <div  class="col-lg-4 col-md-4 col-sm-8" style="display:none;visibility:hidden;"> <asp:DropDownList globalize="ML_CustomerRegistration_DDL_ZipCode"  ID="ddlZip" runat="server" class="box" title="Zip Code" value="" MaxLength="5" TabIndex="3"  ClientIDMode="Static"></asp:DropDownList>
                                         
                                        </div>

                                             </div>
                                            <div id ="divSSN" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_SSN"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SSN") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox  ID="txtSSN" placeholder="Last 4 digit SSN" globalize="ML_CustomerRegistration_txt_SSN" runat="server" title="SSN" Text="" MaxLength="4" TabIndex="4" onkeypress="javascript:return(IsNumeric(event))" ></asp:TextBox>
                                     
                                        </div>
                                           </div>
                                      
                                           <div id ="divMeterId" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_ErrMsg_MeterNumber" style=""> <%= CustomerPortal.Translator.T("ML_ErrMsg_MeterNumber") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_ErrMsg_MeterNumber" ID="txtMeterId" runat="server" class="box" placeholder="Meter ID" value="" MaxLength="20" TabIndex="5"  ClientIDMode="Static"></asp:TextBox>
                                            <%-- <span  style="color:#950202; padding-left:3px; font-size: 19px;">*</span>--%>
                                        </div>
                                               </div>
                                           <div id ="divStreetNumber" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_StreetNumber">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_StreetNumber") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_CustomerRegistration_Txt_StreetNumber" ID="txtStreetNumber" placeholder="Street Number" runat="server" class="box" title="Street Number" value="" MaxLength="5" TabIndex="5"  ClientIDMode="Static"></asp:TextBox>
                                             <%--<span  style="color:#950202; padding-left:3px; font-size: 19px;">*</span>--%>
                                        </div>
                                               </div>
<%--                                           <div class="clearfix"></div>--%>
                                          <div id ="divDl" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_Dl"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Dl") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_CustomerRegistration_txt_DrivingLicense" ID="txtDL" runat="server" class="box"  placeholder="Driving License"  value="" MaxLength="20" TabIndex="6" ClientIDMode="Static"></asp:TextBox>
                                            <%-- <span  style="color:#950202; padding-left:3px; font-size: 19px;">*</span>--%>
                                        </div>
                                              </div>
                                                   <div id ="divPrimaryPhone" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %></div>
                                        <div class="col-lg-4 col-md-4 col-sm-8">                                             
                                            <asp:TextBox globalize="ML_CustomerRegistration_Txt_PrimaryPhone" ID="txtPrimaryPhone" placeholder="Primary Phone" runat="server" class="box"  value="" MaxLength="14" TabIndex="7" ClientIDMode="Static"></asp:TextBox>
                                       <%--      <span  style="color:#950202; padding-left:3px; font-size: 19px;">*</span>--%>
                                        </div>
                                                       </div>
                                     <%--   <div class="clearfix"></div--%>
                                            <div id ="button" style="width:100%;float:left;">
                                        <asp:Button globalize="ML_UserRegistration_Btn_Next" CssClass="registration_btn" ID="NextBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_UserRegistration_Btn_Next") %>'  TabIndex="8"
                                        Style="display: inline-block; margin-right:15px;    padding: 8px 0!important;" OnClientClick="javascript:return (ValidateAllPageFieldsSingleMessage  ('Step1') && ValidateEmail() && ValidateSSN() &&  ValidateMinMaxLength());" CausesValidation="false" OnClick="NextBtn_Click" /> 
                                        <a href="default.aspx" globalize="ML_Common_Navigation_cancel" class="registration_btn" tabindex="7" style="float:left; margin-left:16px;"><%= CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %></a>

                                                </div>
                                 </div>
                                     <div class="rightbor_border"></div>
                                     <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 rightbor">
                                         

                                            <h2 globalize="ML_Reg_FAQ_lbl "><%= CustomerPortal.Translator.T("ML_Reg_FAQ_lbl") %></h2>
                                          


                                               
                                 <div class="container-fluid p0">
                                     <div class="row">
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false">
         
         <%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_AccNumQ") %>
           
        <span class="pull-right glyphicon-plus"></span>
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
      <div class="panel-body"><%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_AccNumA") %></div>
    </div>
  </div>
  <%--<div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false">
         
         Where do I find my Customer Number?
             <span class="glyphicon-plus pull-right"></span>
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false">
      <div class="panel-body">
       Your Customer Number is located under Account Information in the bill
      </div>
    </div>
  </div>--%>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false">
        
        <%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_ZipcodeQ") %>
              <span class="glyphicon-plus pull-right"></span>
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" aria-expanded="false">
      <div class="panel-body">
          <%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_ZipcodeA") %>    
      </div>
    </div>
  </div>
      <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false">
          
      <%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_EmailQ") %>
           <span class="glyphicon-plus pull-right"></span>
        </a>
      </h4>
    </div>

           <div id="collapseFour" class="panel-collapse collapse" aria-expanded="false">
      <div class="panel-body">
       <%= CustomerPortal.Translator.T("ML_Registration_lbl_Faq_EmailA") %>
      </div>
    </div>
   
  </div>
</div>
                                         </div>
</div>

                                     </div>
                                     <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 rightbor">
                                         <img src="./images/utilitybill-img.png" alt="" />
                                     </div>
                                 </asp:View>
                                 <asp:View ID="Step2" runat="server">
                                        <div id="Step2">
                                               <div class="step2_button" >
                                            <div class="col-lg-2 col-md-2 col-sm-4" style="display:none" globalize="ML_CONNECTME_Lbl_FName">  <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_FName") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8" style="display:none"><asp:TextBox globalize="ML_CustomerRegistration_Txt_FirstName" ID="txtFirstName" placeholder="First Name" runat="server" CssClass="Text" Text="" MaxLength="30" TabIndex="1" onkeypress="return IsAlpha(event);" ></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" style="display:none" globalize="ML_Register_Lbl_MiddleName">  <%= CustomerPortal.Translator.T("ML_Register_Lbl_MiddleName") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8" style="display:none"><asp:TextBox globalize="ML_CustomerRegistration_Txt_MiddleName" ID="txtMiddleName" placeholder="Middle Name" runat="server" CssClass="Text" TextMode="SingleLine" MaxLength="30"  Text="" TabIndex="2" onkeypress="return IsAlpha(event);"></asp:TextBox></div>
                                            <div class="clearfix"></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_Master_lbl_CustName">  <%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox globalize="ML_Txt_CustomerName" ID="txtLastName" placeholder="Name" runat="server" CssClass="Text" TextMode="SingleLine" MaxLength="30" Text="" TabIndex="3" onkeypress="return IsAlpha(event);"></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_Address1">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Address1") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_CustomerRegistration_Txt_Address1" ID="txtAddress" placeholder="Address 1" runat="server" class="box"  value="" MaxLength="50" TabIndex="4"  ClientIDMode="Static"></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_Address2">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Address2") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox globalize="ML_CustomerRegistration_Txt_Address2" ID="txtAddress2" placeholder="Address 2" runat="server" class="box"  value="" MaxLength="50" TabIndex="5" ClientIDMode="Static"></asp:TextBox></div>
                                       <%--     <asp:UpdatePanel runat="server">
                                                <ContentTemplate>--%>
                                                    <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_Register_Lbl_City"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %> </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-8">
                                                        <asp:Label ID="lblCity" runat="server" runat="server" Visible="false" ClientIDMode="Static"></asp:Label>  
                                                        <asp:TextBox ID="txtCity" runat="server" ClientIDMode="Static"></asp:TextBox>
                                                        <asp:DropDownList globalize="ML_CustomerRegistration_DDL_City" ID="ddlCity" runat="server" class="box"  ClientIDMode="Static"  value="" TabIndex="6" OnSelectedIndexChanged="ddlCity_SelectedIndexChanged"></asp:DropDownList></div>
                                              <%--  </ContentTemplate>
                                            </asp:UpdatePanel>--%>
                                            <div class="clearfix"></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_MobileNum"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_MobileNum") %>  </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8 ">  
                                              <%--  <asp:TextBox globalize="ML_CustomerRegistration_Txt_MblNum" placeholder="Mobile Number" ID="txtMobileNumber" runat="server" TextMode="SingleLine" title="Mobile number" value="" MaxLength="12" ClientIDMode="Static" TabIndex="7" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox> --%>
                                                <asp:TextBox globalize="ML_CustomerRegistration_Txt_MblNum" placeholder="Mobile Number" ID="txtMobileNumber" runat="server" TextMode="SingleLine"  value="" MaxLength="14" ClientIDMode="Static" TabIndex="7"></asp:TextBox> 

                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-4"><span globalize="ML_CustomerRistration_AlternateNum"> <%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %> </span></div>
                                            <div class="col-lg-4 col-md-4 col-sm-8">                                             
                                              <asp:TextBox ID="txtAlternatNum" runat="server" globalize="ML_CustomerRegistration_txt_AltNum" title="Alternate Number" placeholder="Alternate Number" TabIndex="8" class="box" ClientIDMode="Static" MaxLength="14" onblur="javascript:validPhone(this.value,'txtAlternatNum');"/>

                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" globalize="ML_CustomerRegistration_Lbl_AltEmailId"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_AltEmailId") %> </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8 ">  <asp:TextBox globalize="ML_CustomerRegistration_txt_AltEmailId" placeholder="Alternate Email ID" ID="txtAltEmailId" runat="server" title="Alternate Email ID" value="" MaxLength="50" ClientIDMode="Static" TabIndex="9"></asp:TextBox>  </div>
                                            <div class="clearfix" style="border-bottom:1px solid #ccc; margin-bottom: 13px;"></div>


                                            <div class="divider_register_box">
                                                    <div class="col-md-6 col-sm-12">
                                                        <div class="row">
                                                        <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_LOGIN_Lbl_UserID"> <%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_UserID") %> </div>
                                                  <div class="col-lg-8 col-md-8  col-sm-8  "> 
                                                             <asp:TextBox globalize="ML_CustomerRegistration_Txt_UserId" ID="txtUserID" placeholder="User ID" runat="server" TextMode="SingleLine" title="User ID" value="" MaxLength="30" MinLength="4"  mandatory="1" TabIndex="10" AutoCompleteType="Disabled" autocomplete="off"></asp:TextBox>  

                                                            <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtUserId" runat="server" TargetControlID="txtUserID" InvalidChars=" " FilterMode="ValidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom" ValidChars="@#$&%*!_.-"></ajaxToolkit:FilteredTextBoxExtender>

                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_LOGIN_Lbl_Password"> <%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_Password") %> </div>
                                                <input type="password" style="display:none;" />
                                                <div class="col-lg-8 col-md-8 col-sm-8" style="position:relative;">
                                                    <asp:TextBox globalize="ML_CustomerRegistration_Txt_Password" ID="txtPassword" placeholder="Password" runat="server" TextMode="Password" ClientIDMode="Static" TabIndex="10" title="Password" value="" MaxLength="16" MinLength="8" mandatory="1" onkeypress="if(event.keyCode==32){return false;}" AutoCompleteType="Disabled" autocomplete="off"></asp:TextBox> 
                                                     <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtPassword" runat="server" TargetControlID="txtPassword" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></ajaxToolkit:FilteredTextBoxExtender>
                                                <uc1:PasswordIndicator runat="server" ID="PasswordIndicator" />
                                                </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_Register_Lbl_ConfrmPasswrd"> <%= CustomerPortal.Translator.T("ML_Register_Lbl_ConfrmPasswrd") %> </div>
                                                <div class="col-lg-8 col-md-8  col-sm-8 "> 
                                                    <asp:TextBox globalize="ML_CustomerRegistration_Txt_ConfrmPwd" ID="txtConfirmPwd" placeholder="Confirm Password" runat="server" TextMode="Password" title="Confirm Password" ClientIDMode="Static" TabIndex="11" value="" onkeypress="if(event.keyCode==32){return false;}" MaxLength="16" MinLength="8" mandatory="1" AutoCompleteType="Disabled" autocomplete="off"></asp:TextBox>  
                                               <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtConfirmPwd" runat="server" TargetControlID="txtConfirmPwd" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></ajaxToolkit:FilteredTextBoxExtender>

                                                     </div>
                                                        
                                                          </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12">
                                                        <div class="row">
                                                        <div class="col-lg-4 col-md-4 col-sm-4 top_space" globalize="ML_CustomerRegistration_Lbl_SecurityQues1"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityQues1") %> </div>
                                                        <div class="col-lg-8 col-md-8 col-sm-8 top_space"><%-- Bug 7445 - Start--%> <asp:DropDownList globalize="ML_CustomerRegistration_DDL_Questions1" ID="ddlquestions" runat="server" mandatory="1" title="Security Question 1" TabIndex="12" OnSelectedIndexChanged="ddlquestions_SelectedIndexChanged" AutoPostBack="false"></asp:DropDownList> <%-- Bug 7445 - End--%></div>
                                         <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_CustomerRegistration_Lbl_SecurityAns1"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityAns1") %> </div>
                                                <div class="col-lg-8 col-md-8 col-sm-8"><%-- Bug 7445 - Start--%> <asp:TextBox globalize="ML_CustomerRegistration_Txt_Answers1" placeholder="Security Answer 1" ID="txtSecurityA" MaxLength="25" runat="server" TextMode="Password" title="Security Answer 1" value="" mandatory="1" TabIndex="13" AutoCompleteType="Disabled" autocomplete="off" ></asp:TextBox> <%-- Bug 7445 - End--%> </div>
                                                 <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_CustomerRegistration_Lbl_SecurityQues2"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityQues2") %> </div>
                                                        <div class="col-lg-8 col-md-8 col-sm-8"><%-- Bug 7445 - Start--%> <asp:DropDownList globalize="ML_CustomerRegistration_DDL_Questions2" ID="ddlquestions2" runat="server" mandatory="1" title="Security Question 2" TabIndex="14" OnSelectedIndexChanged="ddlquestions2_SelectedIndexChanged" AutoPostBack="false"></asp:DropDownList> <%-- Bug 7445 - End--%></div>
                                                       <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_CustomerRegistration_Lbl_SecurityAns2"> <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_SecurityAns2") %> </div> 
                                                
                                                <div class="col-lg-8 col-md-8 col-sm-8"> <%-- Bug 7445 - Start--%><asp:TextBox  globalize="ML_CustomerRegistration_Txt_Answers1" placeholder="Security Answer 2" MaxLength="25" ID="txtSecurityB" runat="server" TextMode="Password" title="Security Answer 2" value="" mandatory="1" AutoCompleteType="Disabled" autocomplete="off" TabIndex="15" ></asp:TextBox> <%-- Bug 7445 - End--%> </div>
                                           </div>
                                                    </div>
                                                <div class="col-lg-6 col-md-6 col-sm-12 capture">
                                                    <div class="row">
                                                    <div class="col-lg-4 col-md-4 col-sm-4" globalize="ML_CustomerRegistration_Lbl_Captcha">  <%= CustomerPortal.Translator.T("ML_CustomerRegistration_Lbl_Captcha") %> </div><%--#5247  --%>
                                                <div class="col-lg-8 col-md-8 col-sm-8"> 
                                                    <%--<uc1:Captcha runat="server" id="Captcha" /> --%>
                                                   <%-- <grc1:GoogleReCaptcha ID="recaptcha" runat="server" />--%>
                                                 <input type="hidden" class="hiddenRecaptcha required" name="hiddenRecaptcha" id="hiddenRecaptcha">
                                                  <div class="g-recaptcha" data-sitekey="<%=System.Configuration.ConfigurationManager.AppSettings["RecaptchaKey"] %>"></div>
                                                </div>
                                                        </div>
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12">
                                                    
                                                        <input id="chktems" type="checkbox" title="Terms and Conditions" ClientIDMode="Static" TabIndex="16" name="terms_and_conditions" /> <%= CustomerPortal.Translator.T("ML_Msg_IAccept") %>

                                                <a href="#" data-toggle="modal" data-target="#myModal_terms" ="ML_CONNECTME_Lbl_Terms"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></a> <%-- &--%> <%= CustomerPortal.Translator.T("ML_Default_Lbl_AND") %>  <a href="#" data-toggle="modal" data-target="#myModal_privacy" globalize="ML_Msg_PrivacyPolicy"><%= CustomerPortal.Translator.T("ML_Msg_PrivacyPolicy") %></a> 
                                                   
                                                </div>

                                                
                                                        
                                                
                                             
                                                
                                                 </div>   
                                                  
                                                   
                                            </div>                                  
                                                                            
                                            <div>

                                            </div>
                                            <div class="clearfix">&nbsp;</div>
                                            <div class="reg_button" style="margin-bottom:0;">
                                                <div class="col-lg-12">
                                                    <asp:Button globalize="ML_Register_Btn_SignUp" CssClass="registration_btn reg_btn" ID="AddUserSaveBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %>' TabIndex="18" 
                                                    Style="display: inline-block;" OnClientClick="javascript:return (ValidateAllPageFieldsSingleMessage('tblNewUser,divider_register_box') && ValidatePassword2($('#txtPassword').val()) && validateUserid($('#txtUserID').val()) && ConfirmPassword() && ValidateMinMaxUserLength() && termsandconditions() && ValidateAltEmail() && ValidateCaptcha() && SameSecurityQuestion());" OnClick="AddUserSaveBtn_Click" CausesValidation="false" /> 
                                                    <asp:Button globalize="ML_UserRegistration_Btn_Previous" CssClass="registration_btn" ID="prevBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_UserRegistration_Btn_Previous") %>' 
                                                    Style="display: inline-block; float:left"  CausesValidation="false" OnClick="prevBtn_Click" TabIndex="16" />
                                                    <a href="default.aspx" globalize="ML_Common_Navigation_cancel" class="registration_btn" tabindex="17"><%= CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %></a>
                                                </div>
                                            </div>
                                        </div>
                                </asp:View>
                             </asp:MultiView>
                        </div><!-- End .registration-form -->
                    </div><!-- End .col-md-12-->
                    </div><!-- End .login-page -->
                </div><!-- End .col-md-12  -->
            </div><!-- End .row -->
        </section>
        <!-- End .container -->

        <!-- footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- footer ends -->
        <!-- Modal HTML -->
        <div id="myModal_terms" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" globalize="ML_CONNECTME_Lbl_Terms"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></h4>
                    </div>
                    <div class="modal-body" style="height: 400px; overflow: auto;">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" globalize="ML_Others_Span_OK"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal HTML -->
        <div id="myModal_privacy" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" globalize="ML_Msg_PrivacyPolicy"><%= CustomerPortal.Translator.T("ML_Msg_PrivacyPolicy") %></h4>
                    </div>
                    <div class="modal-body" style="height: 400px; overflow: auto;">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" globalize="ML_Others_Span_OK"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                    </div>
                </div>
            </div>
        </div>
        <span globalize="ML_LoginSupport_lbl_PwdDoNotMatch" id="ML_LoginSupport_lbl_PwdDoNotMatch" style="display: none"><%= CustomerPortal.Translator.T("ML_LoginSupport_lbl_PwdDoNotMatch") %></span>
        <span globalize="ML_CustomerRegistration_chk_termsandcondition" id="ML_CustomerRegistration_chk_termsandcondition" style="display: none"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_chk_termsandcondition") %></span>
        <span globalize="ML_CustomerRegistration_Msg_Captcha" id="ML_CustomerRegistration_Msg_Captcha" style="display: none"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Msg_Captcha") %></span>
        <span globalize="ML_ErrorLength_Msg_AccountNumber" id="ML_ErrorLength_Msg_AccountNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_ErrorLength_Msg_AccountNumber") %></span>
        <span globalize="ML_Registration_Span_ErrMsg_Valid-Password" id="ML_Registration_Span_ErrMsg_Valid-Password" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Span_ErrMsg_Valid-Password") %></span>
        <span globalize="ML_Registration_Span_ErrMsg_Valid_UserId" id="ML_Registration_Span_ErrMsg_Valid_UserId" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Span_ErrMsg_Valid_UserId") %></span>

        <span globalize="ML_Registeration_Msg_ValidMNum" id="spnValidMNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_Registeration_Msg_ValidMNum") %></span>
        <span globalize="ML_MYACCOUNT_Txt_AlternatePhone" id="spnValidANumber" style="display: none"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_Txt_AlternatePhone") %></span>
        <span globalize="ML_Span_ErrMsg_Confirm_Password" id="spnConfirmPassword" style="display: none"><%= CustomerPortal.Translator.T("ML_Span_ErrMsg_Confirm_Password") %></span>

        <span globalize="ML_Registration_Msg_UserIdMinMax" id="spnUserIdMinMax" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Msg_UserIdMinMax") %></span>

        <span globalize="ML_Registration_Msg_DrivingMinMax" id="spnDrivingMinMax" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Msg_DrivingMinMax") %></span>
        <span globalize="ML_Registration_Msg_MeterIdMinMax" id="spnMeterIdMinMax" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Msg_MeterIdMinMax") %></span>
        <span globalize="ML_Registration_Msg_PasswordError" id="spnPasswordError" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Msg_PasswordError") %></span>
        <span globalize="ML_Msg_SameSecurityQuestion" id="spnSamesecurityQustion" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_SameSecurityQuestion") %></span>

    </form>
</body>
</html>
