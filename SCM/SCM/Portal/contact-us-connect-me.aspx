<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contact-us-connect-me.aspx.cs" Inherits="CustomerPortal.contact_us_connect_me" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/AccountLengthUserControl.ascx" TagPrefix="uc1" TagName="AccountLengthUserControl" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title><%= CustomerPortal.Translator.T("ML_CONNECTMEMaster_Anchor_ContactUs") %> </title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Message for disable javascript in Browser -->
    <noscript>
    For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
</noscript>
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />

    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <link id="stylecss1" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link id="stylecss2" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <script src="js/youmax.js"></script>
    <link href="css/youmax.css" rel="stylesheet" />
    <script src="js/bootstrap.min.js"></script>
    <script src="js/contact-us-connect-me.js"></script>
    <script type="text/javascript" src="js/detect-zoom.js"></script>
    <script src="js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script src="js/jquery.mask.min.js" type="text/javascript"></script>
    <script src="js/ui/jquery.ui.core.js"></script>
	<script src="js/ui/jquery.ui.widget.js"></script>
<script src="js/ui/jquery.ui.position.js"></script>
<script src="js/ui/jquery.ui.autocomplete.js"></script>
    <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
    <style type="text/css">
        .hgt_new {
            height: 88% !important;
        }

        .hgt {
            height: 78%;
            overflow: auto;
        }

        #divFacebook {
            height: 100%;
            overflow: auto;
        }

        .fb_iframe_widget {
            height: 100%;
        }

            .fb_iframe_widget span {
                height: 100%;
            }

        @media (min-width: 414px) and (max-width:640px) {
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

            .cover_right_top_area .search-area input[type="text"], input[type="password"], textarea {
                width: 92% !important;
            }

            .right_content_box ul li:first-child {
                padding-left: 0 !important;
            }


            .right_content_box ul li {
                height: auto;
                padding-bottom: 10px !important;
                padding-left: 0 !important;
                width: 41% !important;
            }

            #divFacebook {
                padding: 10px 13px !important;
            }
        }

        #page_loader {
            background-image: url('images/loader.gif');
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

        .w2ui-tag .w2ui-tag-body {
            background-color: rgba(60,60,60,.82);
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            padding: 4px 10px;
            margin-left: 21px !important;
            margin-top: 0;
            color: #fff !important;
            box-shadow: 1px 1px 3px #000;
            line-height: 100%;
            font-size: 11px;
            font-family: Verdana,Arial,sans-serif;
        }

        @media (min-width:768px) and (max-width:991px) {
            .slider_mob {
                width: 142px !important;
            }

                .slider_mob img {
                    max-width: 142px !important;
                }

            input[type="text"], input[type="password"], textarea {
                width: 92%;
            }

            .customer_txt_name .topic_box select, #ddlOutageType {
                width: 91.2% !important;
            }
        }

        #divTwitter iframe {
            /*width: 100% !important;*/
            height: 100% !important;
            margin-left: -9px;
        }


        #divTwitter {
            height: 100%;
        }

        #divFacebook span iframe {
            width: 100% !important;
            height: 100% !important;
            margin-left: -9px;
        }

        #divTwitter span {
            width: 905px !important;
            height: 100% !important;
        }

            #divTwitter span iframe {
                width: 100% !important;
                height: 100% !important;
                margin-left: -9px;
            }

        #divTwitter .timeline, #divFacebook .timeline {
            border-radius: 0px !important;
        }

        .customer_txt_name .topic_box select {
            width: 53.2%;
            border: 1px solid #d6d6d6;
            outline: none;
            padding: 5px 5px 5px 4px;
        }

        #divYoutube {
            height: 100%;
        }

        #youmax {
            height: 100%;
        }

        .timeline {
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 10px;
            width: 915px !important;
        }

        #divTwitter {
            padding-left: 1% !important;
            width: 100% !important;
        }

        .connectSection {
            margin: 0px;
            float: left;
            width: 100%;
        }

            .connectSection p {
                margin: 10px 0;
                padding: 0 10px 0 48px;
            }

            .connectSection .customer_txt {
                padding: 11px 22px;
                font-weight: bold;
                font-size: 12px;
            }

        .customer-details ul li {
            padding: 0 0 0 20px;
        }

        .right_content_box ul li {
            height: auto !important;
            width: 25%;
        }

        .inner_uni1 {
            height: 86% !important;
        }

            .inner_uni1 .setting_save_box .connect_email_box {
                margin-top: 19px !important;
                padding-top: 5px !important;
            }

        .inner_uni2 {
            height: 86% !important;
        }

            .inner_uni2 .setting_save_box {
                padding-top: 12px !important;
            }

                .inner_uni2 .setting_save_box .connect_email_box {
                    margin-top: 19px !important;
                    padding-top: 5px !important;
                }

            .inner_uni2 .hgt_new {
                height: 86%;
            }

        .inner_uni3 {
            height: 86% !important;
        }

            .inner_uni3 .setting_save_box {
                padding-top: 4px !important;
            }

                .inner_uni3 .setting_save_box .connect_email_box {
                    margin-top: 10px !important;
                    padding-top: 5px !important;
                }

            .inner_uni3 .hgt {
                height: 85% !important;
            }

        .inner_uni4 {
            height: 84% !important;
        }



            .inner_uni4 .setting_save_box .connect_email_box {
                margin-top: 5px !important;
                padding-top: 5px !important;
            }

        #btnRemoveFile {
            position: relative;
            top: 6px;
        }

        #nofile {
            position: relative;
            top: 6px;
        }

        @media only screen and (min-width:992px) and (max-width:1024px) {
            .right_content_box ul li {
                height: auto !important;
                padding-left: 30px !important;
                width: 23%;
            }

            .hgt {
                height: 80% !important;
            }
        }

        @media (min-width: 1520px) and (max-width:3640px) {

            .hgt {
                height: 83% !important;
            }

            .setting_save_box {
                padding-top: 17px;
            }
        }

        footer {
            z-index: 9999999999;
        }

        #divFacebook {
            padding: 10px 0 !important;
        }

        }

        @media (max-width:478px) {
            #nofile {
                white-space: nowrap;
                top: -5px;
            }
        }

        @media (min-width:768px) and (max-width:991px) {
            .hgt {
                height: 87% !important;
            }

            input[type="text"], input[type="password"], textarea {
                width: 92%;
            }

            .customer_txt_name .topic_box select, #ddlOutageType {
                width: 91.2% !important;
            }

            #divTwitter {
                height: 100% !important;
            }

                #divTwitter iframe {
                    height: 100% !important;
                }
        }

        #changePwdPopup #errorMsg {
            top: 7px !important;
            right: 20.7% !important;
        }

        @media (min-width:320px) and (max-width:767px) {
            .right_content_box .customer-details ul li {
                padding-bottom: 5px;
            }

                .right_content_box .customer-details ul li b {
                    display: block;
                    padding-bottom: 5px;
                }

            .logo {
                float: right;
            }

            .customer_txt_name .topic_box select {
                width: 92.2% !important;
                padding: 3px 5px 4px 4px;
            }

            #nofile {
                float: left;
            }
        }

        @media (min-width: 1200px) and (max-width:1366px) {
            .inner_mid_section {
                height: 81%;
                margin-top: 15px;
            }
        }

        .ajax__calendar .ajax__calendar_container {
            margin-left: 0px !important;
            margin-top: 0px !important;
        }
         .custo_details_1, .custo_details_2 {
             width:100%;
             float:left;

        }
         .right_content_box ul.custo_details_1 li, .right_content_box ul.custo_details_2 li   {
                 height: auto !important;
                 width: 45% !important;
              }
         .customer-details ul li:first-child {
                    padding-left: 19px;
                width: 55% !important;
            }

         ul.custo_details_2 {
             padding-top:4px;
         }

         .custo_details_space {
             padding-top:12px!important;
         }
         .icon-cal {
    float: left;
    margin: 4px 0px 0px -28px;
}
         .w2ui-tag .w2ui-tag-body.w2ui-tag-body {
                    bottom: 6px;
                left: -240px;
            }
            .w2ui-tag .w2ui-tag-body.w2ui-tag-body:before {
                border-left: 5px solid transparent;
                border-top: 5px solid rgba(60,60,60,.82);
                border-right: 5px solid transparent;
                margin: 15px 0 0 -15px;
                left: 22%;
                    bottom: -10px;
                top: inherit !important;
            }
    </style>

    <script type="text/javascript">
        var arrcarosuelid = ["slider1_container", "slider2_container"];//Array for carosuel id's
    </script>

    <script type="text/javascript">
        var flag;



        function ValidateFile() {
            try {
                if (Validate2()) {
                    $('#hdnFlag').val('save');
                    if (GetFileSize('FileUpload1')) {
                        if (($('#ddl_topic').val() == "61")) {
                            var email = ($('#txtReporterEmail').val() || $('#txtEmailAddress').val() || $('#txtemailId').val());
                            var regx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
                            if (email.match(regx)) {
                                flag = true;
                                return true;
                            }
                            else {
                                toastr.warning($('#IDfilesize').text())
                                $('#txtReporterEmail').focus() || $('#txtEmailAddress').focus() || $('#txtemailId').focus();
                                flag = false;
                                return false;
                            }
                        }
                        else {
                            flag = true;
                            return true;
                        }
                    }
                    else {
                        flag = false;
                        return false;
                    }
                }
                else {
                    flag = false;
                    return false;
                }
            }
            catch (e) {
                flag = false;
                return false;
            }

        }

        $(document).ready(function () {
            $('#txtPhoneNumber').mask('(000) 000-0000');
            $('#txtReporterPhone').mask('(000) 000-0000');
            $('#txtphoneNo').mask('(000) 000-0000');
            $('#lblCService').mask('(000) 000-0000');
            $('#lblBEnq').mask('(000) 000-0000');
            $('#btnRemoveFile').hide();

            //*********************
            //var x = document.getElementById("ddl_topic");
            //var option = document.createElement("option");
            //option.text = $("#slect_ddl_topic").text();
            //x.add(option, x[0]);
            //x.add(value, '0');
           
            //$("#ddl_topic").append($("<option> 0</option>").val(0).html($('#slect_ddl_topic').text()));
            $("#ddl_topic").prepend($("<option> 0 </option>").val('').html($('#slect_ddl_topic').text()));
            //$('#ddl_topic').val('');
           // $("#ddlCategory").append($("<option>Some Text</option>").val(1).html("123"));
            //*********************
        });
        function File_OnChange(sender) {
            var filename = $(sender).val().replace(/^.*[\\\/]/, '');
            if (filename != "") {
                $("#nofile").html(filename);
                $('#btnRemoveFile').show();
            }
        }

        function removeFile() {
            $('#FileUpload1').val('');
            var control = $("#FileUpload1");
            control.replaceWith(control = control.clone(true));
            $('#btnRemoveFile').hide();
            $("#nofile").html($('#nofile').attr('title'));
            return false;
        }

        function Count(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
                toastr.warning(' ' + $('#IDMoreText').text() + ' ' + long + ' ' + $('#IDNoCharacters').text())

                $('.w2ui-popup-btn').focus();

            }
        }

    </script>

    <script type="text/javascript">
        function refresh() {
            if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
                $("#devices").addClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
                $("#devices").addClass('inner_uni2');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
                $("#devices").addClass('inner_uni3');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni4');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
                $("#devices").addClass('inner_uni4');
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
            }
            else {
                $("#devices").removeClass('inner_uni1');
                $("#devices").removeClass('inner_uni2');
                $("#devices").removeClass('inner_uni3');
                $("#devices").removeClass('inner_uni4');
            }

        }
        $(document).ready(function () {
            $(".icon_fb").click(function () {
                $("#divTwitter").hide();
                $("#divFacebook").show();
                $(".n_bt").hide();
                $(".hgt").css("height", "89%");
                $(".hgt").css("overflow", "hidden");
                $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            });

            $(".icon_twitter").click(function () {
                // $("#divConnectMe").hide();
                $("#divTwitter").show();
                $("#divFacebook").hide();
                $(".n_bt").hide();
                $(".hgt").css("height", "89%");
                $(".hgt").css("overflow", "hidden");
                $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            });

            $(".icon_youtube_new").click(function () {
                $(".social").hide();
                $("#divYoutube").show();
                $(".n_bt").hide();
                $(".hgt").css("height", "89%");
                $(".hgt").css("overflow", "hidden");
                $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            });
            $(".nav_left")
                .on('click',
                    'li',
                    function () {
                        $('.nav_left li.active').removeClass('active');
                        $(this).addClass('active');
                    });
            refresh();
            $(window).on('resize', refresh);
        });
    </script>

</head>
<body>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hdnFileExtension" runat="server" ClientIDMode="Static" />
        <uc1:AccountLengthUserControl runat="server" ID="AccountLengthUserControl" />
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <!-- header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- header ends -->

        <!-- section starts -->

        <section class="inner_mid_section" id="devices">
            <div class="container inner-mid-container">
                <div class="energy_mid_box" style="position: relative;">
                    <asp:HiddenField ID="hdnFlag" Value="load" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="hdnDR" Value="0" runat="server" ClientIDMode="Static" />
                    <h1>

                        <img src="images/icon_connectme_sidebar.svg" style="padding-right: 5px; margin-top: -3px; float: left;" />
                        <span class="head_icon_flat icon_connectme"></span>
                        <span globalize="ML_Footer_a_ConnectMe"><%= CustomerPortal.Translator.T("ML_Footer_a_ConnectMe") %></span></h1>
                    <span id="errorMsg" style="float: right;">Please enter all the mandatory information.</span>
                    <div class="sidebar_toggle">Sidebar Navigation</div>
                    <div class="nav_left">
                        <ul>
                            <li class="icon_contact active" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeContactUs) %>"><a href="contact-us-connect-me.aspx" globalize="ML_CONNECTMEMaster_Anchor_ContactUs"><%= CustomerPortal.Translator.T("ML_CONNECTMEMaster_Anchor_ContactUs") %></a></li>
                            <li class="icon_fb" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook) %>">
                                <a href="#" globalize="ML_Default_Anchor_FaceBook"><%= CustomerPortal.Translator.T("ML_Default_Anchor_FaceBook") %></a>
                            </li>
                            <li class="icon_twitter" id="MyAccountUsage" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter) %>">
                                <%--<a href="#" globalize="ML_ConnectMe_tw"><%= CustomerPortal.Translator.T("ML_ConnectMe_tw") %></a>--%>
                                 <a href="#" globalize="ML_ConnectMe_tw">Twitter</a><%-- made chagned for bug id 0054572 --%>

                            </li>
                            <li class="icon_youtube_new" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeYoutube) %>">
                                <a href="#" globalize="ML_ConnectMe_Youtube"><%= CustomerPortal.Translator.T("ML_ConnectMe_Youtube") %></a>
                            </li>
                        </ul>

                       <div class="banner_left_img" globlaize="ML_Compare_Lbl_AdBanner">
                            <a href="#"> <img id="IDBannerConnectMe" runat="server" clientidmode="Static" src="" alt="" class="padding_banner"  onclick="BannerClick(this.id);"/><%--images/banner_ads/image002.png--%>
                            </a>
                     </div> 

                    </div>


                    <div class="right_content_box">
                        <div class="hgt hgt_spanish">
                            <input type="hidden" class="activeli_list" value="connect" />

                            <div class="social" id="divConnectMe">
                                <div id="div_general">

                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p>
                                            <asp:TextBox ID="txtCustName" runat="server" ClientIDMode="Static" placeholder="Customer Name" onkeypress="return IsAlpha(event);" globalize="ML_Master_lbl_CustName" title="Customer Name" onKeyUp="Count(this,60)" onChange="Count(this,60)"></asp:TextBox>
                                        </p>
                                    </div>
                                    <div class="clear_both"></div>
                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p>
                                            <asp:TextBox ID="txtAccountNumber" runat="server" ClientIDMode="Static" placeholder="Account Number" title="Service Account #" globalize="ML_CONNECTME_txtbx_ServiceAcct" MaxLength="20"></asp:TextBox>
                                        </p>
                                    </div>
                                    <div class="clear_both"></div>
                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_Register_Lbl_EmailId"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p>
                                            <asp:TextBox ID="txtFromEmailId" MaxLength="50" runat="server" ClientIDMode="Static" title="Email" globalize="ML_SrvcRqust_txtbx_emailAdd"></asp:TextBox>
                                        </p>
                                    </div>
                                    <div class="clear_both"></div>


                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_CONNECTME_Lbl_Topic"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Topic") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p class="topic_box">
                                            <asp:DropDownList ID="ddl_topic" runat="server" mandatory="1" title="Topic" globalize="ML_CONNECTME_DDL_Topic"
                                                ClientIDMode="Static">
                                            </asp:DropDownList>
                                        </p>
                                    </div>
                                   <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                        <p globalize="ML_Notification_lbl_Subject"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></p>
                                    </div>
                                    <%--bug id 5740--%>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                        <p>
                                            <asp:TextBox ID="txt_Subject" runat="server" mandatory="1" title="Subject" globalize="ML_ConnectMe_TxtSubject" MaxLength="50"
                                                ClientIDMode="Static" placeholder="Subject" onKeyUp="Count(this,50)" onChange="Count(this,50)"></asp:TextBox>
                                        </p>
                                    </div>
                                    <div id="divAddresslatlong" runat="server" style="display: none;">
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                            <p globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></p>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtAddresslatlong" runat="server" ClientIDMode="Static" placeholder="Address" title="Address" MaxLength="100" globalize="ML_Default_Lbl_Address"></asp:TextBox><span id="AddressSpan" style="color: #950202; display: none; padding-left: 3px; font-size: 19px;">*</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="clear_both"></div>
                                <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt">
                                    <p globalize="ML_CONNECTME_Lbl_AddAttach"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
                                </div>

                                <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                    <p>
                                        <span class="submit-button btn btn-primary btn-file ieBtn" globalize="ML_ConnectMe_ChooseFile"><%= CustomerPortal.Translator.T("ML_ConnectMe_ChooseFile") %>
                                            <asp:FileUpload ClientIDMode="Static" ID="FileUpload1" ToolTip="" globalize="ML_CONNECTME_Btn_AttachFile" runat="server" onchange="File_OnChange(this)" Style="float: left; width: 230px;" />

                                        </span><i id="nofile" globalize="ML_CONNECTME_txtbx_NoAttachment"><%= CustomerPortal.Translator.T("ML_CONNECTME_txtbx_NoAttachment") %></i>
                                        <img id="btnRemoveFile" style="display:none;" alt="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                                            onclick="return removeFile();" />
                                    </p>

                                </div>

                                <div class="clear_both"></div>
                                <div id="divComments">
                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-4 customer_txt">
                                        <p globalize="ML_CONNECTME_Lbl_Comments"   style="padding-left: 18px;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Comments") %></p>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-7 col-xs-8 customer_txt_name">
                                        <p style="padding-left: 48px;" class="text_width_box">
                                            <asp:TextBox runat="server" MaxLength="500" TextMode="MultiLine" ID="txtComment" ClientIDMode="Static" Rows="7"
                                                mandatory="1" title="Comments" placeholder="Upto 500 Characters" globalize="ML_CONNECTME_Lbl_Comments" onKeyUp="Count(this,500)" onChange="Count(this,500)"></asp:TextBox>
                                        </p>
                                        <p class="service_text1" globalize="ML_ConnectMe_p_info" style="display: inline-block; margin-top: 0px; padding-left: 48px;">
                                            <%= CustomerPortal.Translator.TT_ProductName("ML_ConnectMe_p_info") %>
                                        </p>
                                    </div>

                                </div>

                                <div class="connectSection">
                                    <div id="div_contactInfo" style="display: none;" class="div_reason">
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_ContactInfo">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ContactInfo") %>
                                        </div>
                                        <i globalize="ML_CONNECTME_Lbl_ContactInfoVal"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ContactInfoVal") %>
                                        </i>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_FName" style="display: none;">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_FName") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name" style="display: none;">
                                            <p>
                                                <asp:TextBox ID="txtFirstName" MaxLength="30" globalize="ML_CONNECTME_Txt_FName" onkeypress="return IsAlpha(event);" placeholder="First Name" runat="server" mandatory="1" ToolTip="First Name" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_Register_Lbl_LastName">
                                            <%= CustomerPortal.Translator.T("ML_Register_Lbl_LastName") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtLastName" MaxLength="30" onkeypress="return IsAlpha(event);" globalize="ML_CONNECTME_Lbl_LNameVal" placeholder="Last Name" runat="server" mandatory="1" ToolTip="Last Name" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_SrvcRqust_txtbx_Contact">
                                            <%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>

                                                <asp:TextBox ID="txtPhoneNumber" globalize="ML_SrvcRqust_txtbx_Contact" placeholder="Phone Number" runat="server" mandatory="1" ToolTip="Phone Number"
                                                    ClientIDMode="Static" MaxLength="14" autocomplete="off"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clear_both"></div>
                                    </div>
                                    <div id="div_56" style="display: none;" class="div_reason">
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_Outage">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Outage") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:DropDownList ID="ddlOutageType" Width="53%" runat="server" ClientIDMode="Static">
                                                </asp:DropDownList>
                                            </p>
                                        </div>
                                        <div style="margin-top: 12px; float: left; width: 100%;">

                                            <i>
                                                <span id="OutageCauseDescription"></span>
                                                <span globalize="ML_CONNECTME_Lbl_PowerInfoSpecific">
                                                    <p style="padding-left: 0px;">
                                                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PowerInfoSpecific") %>
                                                    </p>
                                                </span>
                                            </i>
                                            <div class="ConnectMeData" style="width: 98%; clear: both; padding-left: 15px">
                                                <asp:TextBox  globalize="ML_CONNECTME_Lbl_OutageComment"  ID="txtOutageComments" class="fulllWidth" runat="server" TextMode="MultiLine"
                                                    ClientIDMode="Static" ToolTip="Outage Comments" Style="width: 98%;" onKeyUp="Count(this,500)" onChange="Count(this,500)"></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="clear">
                                            &nbsp;
                                        </div>
                                    </div>
                                    <div id="div_59" class="div_reason brokenstreetlight" style="display: none;">
                                        <div class="ConnectLabel" style="width: 28%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                                            <i globalize="ML_CONNECTME_Lbl_Status"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Status") %></i>
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:RadioButtonList ID="rdoLightStatus" runat="server" RepeatDirection="Horizontal">
                                            </asp:RadioButtonList>
                                        </div>
                                        <div class="ConnectLabel" style="width: 28%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                                            <i globalize="ML_CONNECTME_Lbl_DamageInfo"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_DamageInfo") %></i>
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:RadioButtonList ID="rdoVisibleDamage" runat="server" RepeatDirection="Horizontal">
                                            </asp:RadioButtonList>
                                        </div>
                                        <div class="ConnectLabel" style="width: 41%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                                            <i globalize="ML_CONNECTME_Lbl_DamageDesc"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_DamageDesc") %></i>
                                        </div>
                                        <div class="ConnectMeData" style="width: 97%;">
                                            <asp:TextBox globalize="ML_CONNECTME_Txt_DamageDesc" placeholder="Damage Description" ID="txtDamageDescription" runat="server" Style="width: 98%; margin: 0 0 0 24px;" TextMode="MultiLine" ClientIDMode="Static" MaxLength="50"></asp:TextBox>
                                        </div>
                                        <div class="ConnectLabel" style="width: 41%; padding: 6px 0 0 7px; font-weight: normal; line-height: inherit; margin-bottom: 0px;">
                                            <i globalize="ML_CONNECTME_Lbl_EnterPole"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_EnterPole") %></i>
                                        </div>
                                        <div class="ConnectMeData" style="width: 97%;">
                                            <asp:TextBox globalize="ML_CONNECTME_Txt_PoleNum" ID="txtPoleNumber" placeholder="Pole Number" runat="server" Style="width: 100%; margin: 0 0 0 24px;" ClientIDMode="Static"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div id="div_closeststreet" style="display: none;" class="div_reason">
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_TellLocation" style="display:none">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_TellLocation") %>
                                        </div>
                                        <i globalize="ML_CONNECTME_Lbl_RepairInfo" style="display:none"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_RepairInfo") %>
                                        </i>
                                        <div class="secServiceTitle" style="margin-bottom: 14px;" globalize="ML_CONNECTME_Lbl_Location">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Location") %>
                                        </div>

                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_Street">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Street") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtStreetNumber" MaxLength="5" globalize="ML_CONNECTME_Txt_Street" placeholder="Street Number" runat="server" ToolTip="Street Number" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_SrvcRqust_p_StrretName">
                                            <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_StrretName") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtStreetName" MaxLength="35" globalize="ML_CONNECTME_Txt_StreetNme" placeholder="Street Name" runat="server" ToolTip="Street Name" mandatory="1" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_Apt">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Apt") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtUnit" MaxLength="5" globalize="ML_CONNECTME_Txt_Apt" runat="server" placeholder="Unit" ToolTip="Apt/Unit" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_Register_Lbl_City">
                                            <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtCity" MaxLength="35" globalize="ML_CONNECTME_Txt_City" runat="server" ToolTip="City" placeholder="City" mandatory="1" onkeypress="return IsAlpha(event);" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_Zip">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Zip") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtZipcode" globalize="ML_CONNECTME_Txt_Zip" runat="server" placeholder="Zip" ToolTip="Zip" mandatory="1" TextMode="SingleLine" class="box ZipCode"
                                                    value="" size="30" MaxLength="5" onkeypress="return IsNumeric(event);" ClientIDMode="Static" ></asp:TextBox>
                                                <uc1:ZipCode runat="server" class="box" title="Zip Code" ID="ZipCode2" ClientIDMode="Static" />
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 customer_txt" globalize="ML_CONNECTME_Lbl_NearestStreet">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_NearestStreet") %>
                                        </div>
                                        <div class="col-lg-9 col-md-9 col-sm-7 col-xs-7 customer_txt_name">
                                            <p>
                                                <asp:TextBox ID="txtNearestCrossStreet" runat="server" ToolTip="Nearest Cross Street"
                                                    mandatory="1" MaxLength="35" globalize="ML_CONNECTME_Txt_NearestStreet" placeholder="Nearest Cross Street" ClientIDMode="Static"></asp:TextBox>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="ConnectLabel" style="clear: both; font-weight: normal; line-height: inherit; margin: 10px 0; padding: 0; width: 100%;">
                                            <i><span globalize="ML_CONNECTME_Lbl_LocationDesc">
                                                <p style="padding-left: 0px;" globalize="ML_CONNECTME_Lbl_LocationDesc"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_LocationDesc") %> </p>
                                            </span></i>
                                        </div>
                                        <div class="ConnectMeData" style="width: 98%; clear: both; padding-left: 15px;">
                                            <asp:TextBox  globalize="ML_CONNECTME_Txt_LocDesc" class="fulllWidth" ID="txtLocationDescription" runat="server" TextMode="MultiLine" ClientIDMode="Static" MaxLength="120" onKeyUp="Count(this,120)" onChange="Count(this,120)" Style="width: 98%"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>

                                    </div>
                                    <div id="div_61" class="div_reason brokenstreetlight" style="display: none;">
                                        <div class="secServiceTitle" style="margin-bottom: 15px;" globalize="ML_CONNECTME_Lbl_Reporting">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Reporting") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressReporting">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressReporting") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox MaxLength="100" globalize="ML_CONNECTME_Txt_AddressReporting" ID="txtTLocation" placeholder="Address Reporting" runat="server" ToolTip="Address" ClientIDMode="Static"
                                                mandatory="1"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressReportingDesc">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressReportingDesc") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox MaxLength="100" globalize="ML_CONNECTME_Txt_AddressReportingDesc" placeholder="Address Reporting Desc" ID="txtTDescription" runat="server" ToolTip="Description" ClientIDMode="Static"
                                                mandatory="1"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_EnergyTheft">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_EnergyTheft") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtTDate" globalize="ML_CONNECTME_Txt_DateAddressReporting" placeholder="Date Address Reporting" runat="server" ToolTip="Date energy theft<br>initially began (if known)"
                                                ClientIDMode="Static" onblur="javascript:checkdate(document.getElementById('txtTDate'))"></asp:TextBox>
                                             <asp:ImageButton CssClass="icon-cal" ID="btnTDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                                            <ajaxToolkit:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtTDate" PopupButtonID="btnTDate"
                                                Format="MM/dd/yy" />
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_PersonName">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PersonName") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox MaxLength="60" globalize="ML_CONNECTME_Txt_PersonName" ID="txtTName" placeholder="Person Name" runat="server" ClientIDMode="Static" ToolTip="Name of person commiting <br>energy theft (if known)"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_AddressPerson">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddressPerson") %>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtTAddress" MaxLength="100" placeholder="Person Address" ClientIDMode="Static" globalize="ML_CONNECTME_Txt_AddressPerson" runat="server" ToolTip="Address of person commiting<br> energy theft (if known)"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_OccupationPerson">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_OccupationPerson") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtTOccupation" MaxLength="30" globalize="ML_CONNECTME_Txt_OccupationPerson" placeholder="Occupation Person" runat="server" ClientIDMode="Static" ToolTip="Occupation of person<br> commiting energy theft (if known)"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_OtherPerson">
                                            <%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Lbl_OtherPerson") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtTOther" MaxLength="100" globalize="ML_CONNECTME_Txt_OtherPerson" ClientIDMode="Static" placeholder="Other Participants" runat="server" ToolTip="Other participants, or <br>information SUS should be aware of"></asp:TextBox>
                                        </div>
                                        <div class="clear">
                                            &nbsp;
                                        </div>
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_PartInfo">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PartInfo") %>
                                        </div>
                                        <p style="padding-left: 16px;">
                                            <strong globalize="ML_CONNECTME_Lbl_SUSContact"><%= CustomerPortal.Translator.TT_ProductName("ML_CONNECTME_Lbl_SUSContact") %></strong>
                                        </p>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_YourName">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_YourName") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox globalize="ML_CONNECTME_Txt_ReporterName" MaxLength="60" placeholder="Your Name" ID="txtReporterName" runat="server" ClientIDMode="Static" ToolTip="Your Name"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterAddress">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterAddress") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtReporterAddress" MaxLength="100" globalize="ML_CONNECTME_Txt_ReporterAddress" placeholder="Reporter Address" runat="server" ClientIDMode="Static" ToolTip="Your Address"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterPhone">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterPhone") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtReporterPhone" globalize="ML_CONNECTME_Txt_ReporterPhone" placeholder="Reporter Phone" runat="server" ToolTip="Your Telephone" MaxLength="14"
                                                ClientIDMode="Static" onblur="javascript:validPhone(this.value,'txtReporterPhone');"></asp:TextBox>
                                        </div>
                                        <div class="clear_both"></div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_CONNECTME_Lbl_ReporterEmail">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ReporterEmail") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtReporterEmail" globalize="ML_CONNECTME_Txt_ReporterEmail" ClientIDMode="Static" placeholder="Reporter Email" runat="server" ToolTip="Your Email" mandatory="1" value="" MaxLength="50">
                                            </asp:TextBox>
                                        </div>
                                        <div class="secServiceTitle" style="margin-bottom: 15px;" globalize="ML_CONNECTME_Lbl_Relation">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Relation") %>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12  customer_txt_name">
                                            <asp:TextBox ID="txtSuspectRelation" MaxLength="20" globalize="ML_CONNECTME_Txt_Relation" placeholder="Suspect Relation" runat="server" ToolTip="Your Relation to Suspect" ClientIDMode="Static" Style="width: 98%; margin-left: 10px; margin-top: 5px;"></asp:TextBox>
                                        </div>
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_Service" style="margin-bottom: 12px;">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Service") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt" globalize="ML_Register_Lbl_EmailId">
                                            <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6  customer_txt_name">
                                            <asp:TextBox ID="txtEmailAddress" placeholder="Email ID" globalize="ML_Register_Lbl_EmailId" runat="server" ToolTip="Email" mandatory="1" value="" MaxLength="50" ClientIDMode="Static"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div id="div_47" class="div_reason" style="display: none;">

                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_Form">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Form") %>
                                        </div>
                                        <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Program">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Program") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:Label globalize="ML_CONNECTME_Lbl_ProgramVal" ID="lbldrprogram" runat="server" ToolTip="DR Program" ClientIDMode="Static"></asp:Label>
                                        </div>
                                        <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Terms">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:Label ID="lbltermsconditions" globalize="ML_CONNECTME_Lbl_TermsVal" runat="server" ClientIDMode="Static" ToolTip="Terms and Conditions"></asp:Label>
                                        </div>
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_ApplicantInfo">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ApplicantInfo") %>
                                        </div>
                                        <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_ApplicantContact">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_ApplicantContact") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtcontectname" placeholder="Contact Name" globalize="ML_CONNECTME_Txt_ApplicantContactVal" ClientIDMode="Static" runat="server" ToolTip="Contact Name"></asp:TextBox>
                                        </div>
                                        <div class="ConnectLabel" globalize="ML_SrvcRqust_div_MailAdd">
                                            <%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtmallingaddress" placeholder="Mailling Address" ClientIDMode="Static" runat="server" globalize="ML_CONNECTME_Txt_MailAddVal" ToolTip="Mailling Address"></asp:TextBox>
                                        </div>

                                        <div class="ConnectLabel" globalize="ML_Register_Lbl_City">
                                            <%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtDRcity" placeholder="City" runat="server" globalize="ML_CONNECTME_Txt_MailCityVal" ClientIDMode="Static" ToolTip="City"></asp:TextBox>
                                        </div>

                                        <div class="ConnectLabel" globalize="ML_SrvcRqust_p_State">
                                            <%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtstate" placeholder="State" runat="server" ClientIDMode="Static" globalize="ML_CONNECTME_Txt_MailStateVal" ToolTip="State"></asp:TextBox>
                                        </div>

                                        <div class="ConnectLabel" globalize="ML_SrvcRqust_P_ZipCode">
                                            <%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtzip" globalize="ML_CONNECTME_Txt_MailZipVal" ClientIDMode="Static" placeholder="Zip" runat="server" ToolTip="Zip" TextMode="SingleLine" class="box" value="" size="30" mandatory="1" MaxLength="5" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                        </div>

                                        <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_PhoneNum">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_PhoneNum") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">

                                            <asp:TextBox ID="txtphoneNo" globalize="ML_CustomerRegistration_Lbl_MobileNum" placeholder="Phone Number" runat="server" mandatory="1" ToolTip="Phone Number"
                                                ClientIDMode="Static" MaxLength="14"></asp:TextBox>
                                        </div>

                                        <div class="ConnectLabel" globalize="ML_Register_Lbl_EmailId">
                                            <%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %>
                                        </div>
                                        <div class="ConnectLabelColon">
                                            :
                                        </div>
                                        <div class="ConnectMeData">
                                            <asp:TextBox ID="txtemailId" globalize="ML_Register_Lbl_EmailId" runat="server" ToolTip="Email" mandatory="1" placeholder="Ex:abc@smartusys.com" value="" MaxLength="2048" ClientIDMode="Static"></asp:TextBox>
                                        </div>
                                        <div class="secServiceTitle" globalize="ML_CONNECTME_Lbl_MailDisclaimer">
                                            <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_MailDisclaimer") %>
                                        </div>
                                        <div class="ConnectMeData" style="width: 98%;">
                                            <asp:Label ID="lbldisclamer" globalize="ML_CONNECTME_Lbl_MailDisclaimerVal" runat="server" ClientIDMode="Static" ToolTip="DISCLAIMER"></asp:Label>
                                        </div>
                                    </div>
                                </div>

                                <div id="divSign" class="sigPad" style="display: none">
                                    <div class="ConnectLabel" globalize="ML_CONNECTME_Lbl_Signature">
                                        <%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Signature") %>
                                    </div>
                                    <div class="ConnectLabelColon">
                                        :
                                    </div>
                                    <div class="sig sigWrapper" style="width: 29%;">
                                        <div class="typed"></div>
                                        <canvas class="pad" width="198" height="55"></canvas>
                                        <input type="hidden" name="output" class="output" globalize="ML_CONNECTME_Lbl_Signature" runat="server" id="signval" clientidmode="Static" mandatory="1" />
                                        <div class="clearButton" globalize="ML_CONNECTME_Lbl_Clear"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Clear") %></div>
                                    </div>
                                </div>
                            </div>
                            <div id="divTwitter" style="display: none; width: 98%; padding-left: 1%; text-align: center;" class="social">
                                <a class="twitter-timeline" style="margin: auto;" data-dnt="true" data-href="<%=twitterurl %>"
                                    data-widget-id="<%=twitterwidgetid %>" data-link-color="#79a412" data-related="twitterapi,twitter"
                                    data-aria-polite="assertive" lang="EN" globalize="ML_CONNECTME_Anchor_Tweets"><%= CustomerPortal.Translator.T("ML_CONNECTME_Anchor_Tweets") %></a>
                                <script>
                                    !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");
                                </script>
                            </div>

                            <div style="text-align: center; padding: 0px 50px; display: none" id="divFacebook" class="social">

                                <div class="fb-page" data-href="<%=fburl %>" data-width="2000" data-height="730" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true" data-show-posts="true">
                                    <div class="fb-xfbml-parse-ignore">
                                        <blockquote cite="<%=fburl %>"></blockquote>

                                    </div>
                                </div>


                                <script type="text/javascript">
                                    (function (d, s, id) {
                                        var js, fjs = d.getElementsByTagName(s)[0];
                                        if (d.getElementById(id)) return;
                                        js = d.createElement(s); js.id = id;
                                        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
                                        fjs.parentNode.insertBefore(js, fjs);
                                    }(document, 'script', 'facebook-jssdk'));

                                </script>
                            </div>
                            <div id="divYoutube" style="display: none; width: 98%; padding-top: 11px; padding-left: 2%;" class="social">
                                <script type="text/javascript">
                                    $(document).ready(function () {
                                        goClicked();
                                    });
                                </script>
                                <div id="youmax"></div>
                                <script type="text/javascript">
                                    function goClicked() {
                                        $('#youmax').empty().append(' loading ...');
                                        $('#youmax').youmax({
                                            apiKey: 'AIzaSyAjQndtEz0FlPGI_hpSD4XCdW7FDsscvH0',
                                            youTubeChannelURL: "<%=youtubeurl%>",
                                            youTubePlaylistURL: $('#youTubePlaylistUrl').val(),
                                            youmaxDefaultTab: "UPLOADS",
                                            youmaxColumns: 3,
                                            showVideoInLightbox: false,
                                            maxResults: 15,
                                        });
                                    }

                                </script>
                            </div>


                        </div>

                        <div class="setting_save_box">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer-padding n_bt">
                                <div class="buttons_area">
                                    <input type="button" id="BtnSubmitComment" globalize="ML_CONNECTME_BTN_Submit" value='<%# CustomerPortal.Translator.T("ML_CONNECTME_BTN_Submit") %>' class="submit-button" />
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer-padding connect_email_box" style="border-top: 1px solid #ccc; margin-top: 10px; padding-top: 9px; display: block;">
                                <div class="customer-details" style="padding: 0 !important; margin: 0; border: 0px;">
                                    <ul  class="custo_details_1">
                                        <li id="liCService" runat="server"><b globalize="ML_CONNECTME_Span_CustServ"><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_CustServ") %></b>&nbsp;
                                            <asp:Label ID="lblCService" Text="N/A" runat="server"></asp:Label></li>
                                        <li id="liemail1" runat="server"><b globalize="ML_CONNECTME_Span_Email"><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_Email") %> </b>&nbsp;
                                            <asp:Label ID="lblEmail" runat="server" Text="N/A"></asp:Label></li>
                                       </ul>
                                    <ul class="custo_details_2">
                                         <li id="liBEnq" runat="server"><b globalize="ML_CONNECTME_Span_CustServ2"><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_CustServ2") %></b>&nbsp;
                                            <asp:Label ID="lblBEnq" Text="N/A" runat="server"></asp:Label></li>
                                        <li id="liemail2" runat="server"><b globalize="ML_CONNECTME_Span_Email"><%= CustomerPortal.Translator.T("ML_CONNECTME_Span_Email") %> </b>&nbsp;
                                            <asp:Label ID="lblBEmail" runat="server"></asp:Label></li>
                                    </ul>
                                     

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <div id="page_loader">
        </div>
        <!-- section ends -->

        <!-- footer starts -->

        <uc1:Footer runat="server" ID="Footer" />

        <!-- footer ends -->

    </form>
    <script src="js/script_sign/jquery.signaturepad.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            if ($('.sigPad').css('display') == 'block') {
                $('.sigPad').signaturePad({ drawOnly: true });
            }
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeContactUs, false) == false)
               { %>
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook, false) == true)
               {%>

            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divFacebook").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_fb').addClass('active');
            <% }%>
               <%else if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter, false) == true)
               {%>
            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divTwitter").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_twitter').addClass('active');
            <%}%>
             <%else if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeYoutube, false) == true)
               {%>
            $('#divConnectMe').hide();
            $(".social").hide();
            $("#divYoutube").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
            $('.nav_left li.active').removeClass('active');
            $('.icon_youtube_new').addClass('active');
            <%}%>
          
            <% } %>
            <% else
               { %>
            $('#divConnectMe').show();
            <% } %>

            //END
        });

        var MaxLength = 120;
        $("#txtLocationDescription").keypress(function (e) {
            if ($(this).val().length >= MaxLength) {
                e.preventDefault();
            }
        });
        var MaxLengths = 50;
        $("#txtDamageDescription").keypress(function (e) {
            if ($(this).val().length >= MaxLength) {
                e.preventDefault();
            }
        });

        $(".icon_fb").click(function () {
            $(".social").hide();
            $("#divFacebook").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });

        $(".icon_twitter").click(function () {
            $(".social").hide();
            $("#divTwitter").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");
            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });
        $(".icon_youtube_new").click(function () {
            $(".social").hide();
            $("#divYoutube").show();
            $(".n_bt").hide();
            $(".hgt").toggleClass("hgt_new");
            $(".hgt").removeClass("hgt");//#divTwitter

            $(".setting_save_box").css("padding-top", "0").css("border-top", "0");
        });
        $(".nav_left").on('click', 'li', function () {
            $('.nav_left li.active').removeClass('active');
            $(this).addClass('active');
        })

    </script>


    <script src="js/script_sign/json2.min.js" type="text/javascript"></script>
    <span globalize="ML_Footer_a_ConnectMe" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Footer_a_ConnectMe") %></span>
    <span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
<%--    <span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>--%>
    <span globalize="ML_Connectme_ErrMsg_ValidEmailID" id="IDEmail" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_ValidEmailID") %></span>
    <span globalize="ML_Connectme_ErrMsg_Morethan" id="IDMoreText" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_Morethan") %></span>
    <span globalize="ML_Connectme_ErrMsg_NoCharacters" id="IDNoCharacters" style="display: none;"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_NoCharacters") %></span>
    <span globalize="ML_Connectme_ErrMsg_SignedDocument" id="IDSignedDocument" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_SignedDocument") %></span>
    <span globalize="ML_Connectme_ErrMsg_FileFailed" id="IDFileFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileFailed") %></span>
    <span globalize="ML_Connectme_ErrMsg_Comment_Failed" id="IDCommentFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_Comment_Failed") %></span>
    <span globalize="ML_Msg_ServerError" id="IDMessageReceived" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_ServerError") %></span>

    <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
    <span globalize="ML_SERVICE_Place_Mandatory" id="subjectmandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICE_Place_Mandatory") %></span>
    <span globalize="ML_Error_Msg_AlphabetOnly" id="ML_Error_Msg_AlphabetOnly" style="display: none"><%= CustomerPortal.Translator.T("ML_Error_Msg_AlphabetOnly") %></span>
    <span globalize="ML_ErrorLength_Msg_AccountNumber" id="ML_ErrorLength_Msg_AccountNumber" style="display: none"><%= CustomerPortal.Translator.T("ML_ErrorLength_Msg_AccountNumber") %></span>
    <span globalize="ML_Outage_span_Report_Outage" id="subjectReportOutage" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_Outage_span_Report_Outage") %></span>
    <span globalize="ML_BILLING_Navigation_ConnectMe" id="subjectBillingQuery" style="display: none"><%= CustomerPortal.Translator.TT_ProductName("ML_BILLING_Navigation_ConnectMe") %></span>
    <span globalize="ML_CONNECTME_Txt_MailPhoneVal" id="MobilevalidPhoneVal" style="display: none"><%= CustomerPortal.Translator.T("ML_CONNECTME_Txt_MailPhoneVal") %></span>

        <span globalize="ML_SvngLdr_lstItem_Select" id="slect_ddl_topic" style="display: none"><%= CustomerPortal.Translator.T("ML_SvngLdr_lstItem_Select") %></span>

</body>
</html>
