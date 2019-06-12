<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PaymentLocationPreLogin.aspx.cs" Inherits="CustomerPortal.PaymentLocationPreLogin" %>
 
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/MultilingualPins.ascx" TagPrefix="uc1" TagName="MultilingualPins" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>

<!DOCTYPE html>



<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

   <%-- <title>Payment Location Pre Login</title>--%>
    <title globalize="ML_PayLocation_PayLocation"><%= CustomerPortal.Translator.T("ML_PayLocation_PayLocation") %> </title>

    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Message for disable javascript in Browser -->
    <noscript>
        For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
    </noscript>
      <%if (CustomerPortal.SessionAccessor.MapId == "0" || CustomerPortal.SessionAccessor.MapId =="")
    { %>
      <link rel="stylesheet" type="text/css" href="//serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/css/esri.css" />
    <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.5compact" type="text/javascript"></script>
    <%}
        else if (CustomerPortal.SessionAccessor.MapId == "1")
    {%>
        <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByj23mCSTae1Hr5SUITj_xepioqIHWONM"></script>
        <script src="js/markerwithlabel.js"></script>
    <%}%>  
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
             <link id="stylecss1" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
          <link id="stylecss2" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />

    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <script type="text/javascript" src="js/detect-zoom.js"></script>
 
        <script src="js/paymentlocationprelogin.js" type="text/javascript"></script>
         <style type="text/css">
             .text_align_box {
    width: 99% !important;
}
        #btnDistance, #btnRate {
            cursor: pointer;
        }

        .esriPopup .actionsPane .zoomTo {
            display: none;
        }

        .MessageContainer .PinLabel {
            color: #000000;
            display: block;
            font-weight: bold;
             left: 17px;
            position: absolute;
            text-align: center;
            top: 17px;
            width: 15px;
        }

        .LeftPanel .MessageContainerActive, .LeftPanel .MessageContainer:hover {
            background: #eaeaea;
            border-bottom: 1px dashed #dadada;
            color: #000;
            cursor: pointer;
            padding: 10px;
        }

        .MessageContainer, .MessageContainerActive {
            line-height: 18px;
            position: relative;
        }

            .MessageContainer .blue {
                color: #3398cc;
                font-weight: bold;
            }

            .MessageContainer .red {
                color: #fe0000;
            }

            .MessageContainerActive .blue, .MessageContainer:hover .blue, .MessageContainer:hover .red, .MessageContainerActive .red, .MessageContainerActive .PinLabel, .MessageContainer:hover .PinLabel {
                color: #006699 !important;
            }

        .LeftPanel .MessageContainer {
            border-bottom: 1px dashed #dadada;
            padding: 10px;
            font-size: 12px;
        }

            .LeftPanel .MessageContainer strong {
                font-size: 12px;
                padding-right: 5px;
            }

        .MessageContainer table td, th {
            vertical-align: top;
        }

        .gis-footprint-area ul li {
            margin: 0px;
            padding: 8px 10px 5px;
            float: left;
        }

            .gis-footprint-area ul li:last-child {
                padding-right: 15px;
                width: 39%;
            }

        @media screen and (min-width:0\0) {
            .gis-footprint-area ul li:last-child {
                padding-right: 15px;
                width: 35%;
            }
        }


        /* For IE 8 */

        @media \0screen {
            .gis-footprint-area ul li:last-child {
                padding-right: 15px;
                width: 35%;
            }
        }

        .distance_area ul {
            display: block !important;
            margin: 0px !important;
        }

            .distance_area ul li a.active {
                background: #dddddd;
                color: #000 !important;
            }

        .right_charging_map .distance_area ul li a {
            padding: 7px 0px !important;
        }

        .right_charging_map .distance_area ul li {
            border-bottom: medium none;
            display: inline;
            float: left;
            margin: 0;
            padding: 0;
            text-align: center;
            width: 50%;
        }

        .search-area input {
            height: 28px;
        }

        .gis-footprint-area {
            width: 69%;
        }

        @-moz-document url-prefix() {
            .gis-footprint-area {
                width: 45%;
            }
        }

        @media only screen and (min-width:991px) and (max-width:1024px) {

            .gis-footprint-area {
                width: 53%;
            }
        }

        @media only screen and (min-width:768px) and (max-width:991px) {

            @-moz-document url-prefix() {
                .gis-footprint-area {
                    width: 70%;
                }
            }



            .gis-footprint-area ul li:last-child {
                padding-right: 0px;
            }

            .search-area {
                float: left;
                width: 84%;
            }

            .distance_area ul {
                display: block !important;
                margin: 0px !important;
            }

                .distance_area ul li a.active {
                    background: #dddddd;
                    color: #000 !important;
                }

            .right_charging_map .distance_area ul li a {
                padding: 7px 0px !important;
            }

            .right_charging_map .distance_area ul li {
                border-bottom: medium none;
                display: inline;
                float: left;
                margin: 0;
                padding: 0;
                text-align: center;
                width: 50%;
            }

            .cover_top_area > h1 {
                width: 30% !important;
            }
        }

        ::i-block-chrome, .gis-footprint-area ul li:last-child {
            width: 34%;
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
        }

        @media (max-width:767px) {
            .without_sidebar.energy_mid_box {
                height: 100% !important;
                padding-bottom: 0;
            }

            #ddlCity {
                float: right;
                width: 120px;
            }
        }

        @media (min-width:1500px) {
            .without_sidebar {
                height: 101.8% !important;
            }
        }


        #paymentlocation_map_canvas {
            margin: 0;
            padding: 0;
            height: 100%;
            max-width: none;
        }

        .gm-style-iw {
            width: 350px !important;
            top: 15px !important;
            left: 0px !important;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
            border: 1px solid #fff;
            /*border-radius: 5px 5px 5px 5px;*/
        }

            .gm-style-iw > div {
                width: 350px !important;
            }
        /*#iw-container {
    margin-bottom: 10px;
}*/
        #iw-container .iw-title {
            font-family: 'Open Sans Condensed', sans-serif;
            font-size: 16px;
            font-weight: 400;
            padding: 6px 10px;
            background-color: #fff;
            color: #006699;
            margin: 0;
            /*border-radius: 2px 2px 0 0;*/
            border-bottom: 1px solid #f4f4f4;
            font-weight: bold;
            font-size: 13px;
            display: block;
        }

        .iw-title > strong {
            font-weight: bold;
            font-size: 13px;
        }

        #iw-container .iw-content {
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;
            margin-right: 1px;
            padding: 8px 5px 10px 10px;
            max-height: 140px;
            overflow-y: auto;
            overflow-x: hidden;
            color: #53565a;
            font-family: Arial;
        }

        .iw-content img {
            float: right;
            margin: 0 5px 5px 10px;
        }

        .iw-subTitle {
            font-size: 16px;
            font-weight: 700;
            padding: 5px 0;
        }

        .iw-bottom-gradient {
            position: absolute;
            width: 326px;
            height: 25px;
            bottom: 10px;
            right: 18px;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
            background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        }

         .inner_uni1 {
            height: 85% !important;
        }

            .inner_uni1 .setting_save_box .connect_email_box {
                margin-top: 19px !important;
                padding-top: 5px !important;
            }

        .inner_uni2 {
            height: 83% !important;
        }

            .inner_uni2 .setting_save_box {
                padding-top: 12px !important;
            }

                .inner_uni2 .setting_save_box .connect_email_box {
                    margin-top: 19px !important;
                    padding-top: 5px !important;
                }

        .inner_uni3 {
            height: 82% !important;
        }

            .inner_uni3 .setting_save_box {
                padding-top: 4px !important;
            }

                .inner_uni3 .setting_save_box .connect_email_box {
                    margin-top: 10px !important;
                    padding-top: 5px !important;
                }

        .inner_uni4 {
            height: 80% !important;
        }

            .inner_uni4 .setting_save_box .connect_email_box {
                margin-top: 5px !important;
                padding-top: 5px !important;
            }


        .labels {
            color: black;
            background-color: transparent;
            font-family: "Lucida Grande", "Arial", sans-serif;
            font-size: 12px;
            text-align: center;
            width: 20px;
        }
            
                 .energy_mid_box {
                     padding-bottom: 23px;
                 }
           .energy_mid_box .right_content_box_outage {
    height: 96.5% !important;
}
    </style>
    <script type="text/javascript">
        function refresh() {
            var device = $('#devices');
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

            //refresh();
            //$(window).on('resize', refresh);
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
  <!-- header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- header ends-->

        <section class="inner_mid_section" id="devices">

            <div class="container inner-mid-container">
                <div class="energy_mid_box without_sidebar" style="overflow: hidden;">
                    <input type="hidden" name="ctl00$ctl00$ContentPlaceHolder1$hdnFlag" id="hdnFlag" value="load">

                    <input type="hidden" name="ctl00$ctl00$ContentPlaceHolder1$hdnDR" id="hdnDR" value="0">
                    <div class="cover_top_area">
                        <h1 style="width: 60%;">
                            <img src="images/payment_icon.svg" style="padding-right: 5px; margin-top: -3px; float: left;">
                            <span class="head_icon_flat icon_payment-location"></span>
                            <span globalize="ML_PayLocation_PayLocation"> <%= CustomerPortal.Translator.T("ML_PayLocation_PayLocation") %></span>
                        </h1>

                        <div class="cover_right_top_area" style="float: right; width: 260px; padding: 6px 8px 0;">

                            <input type="hidden" class="activeli_list" value="outages">
                            <div class="gis-footprint-area" style="float: right;">
                                <asp:DropDownList ID="ddlCity" CssClass="" runat="server" ClientIDMode="Static" globalize="ML_PaymentLocationsPreLogin_ddl_City"></asp:DropDownList>

                            </div>
                        </div>
                    </div>

                    <div class="right_content_box_outage">

                        <div class="left_charging_map">

                            <div id="paymentlocationprelogin_map_canvas" class="radius map_canvas" style="height: 100% !important;"></div>

                        </div>

                        <div class="right_charging_map">
                            <div id="LeftPanel" class="LeftPanel outerprelogin_PinLabel"></div>
                        </div>
                    </div>
                    <div id="page_loader">
                    </div>
                    <span globalize="ML_BILLING_Navigation_PaymentLocationsPreLogin" id="titletext" style="display: none"></span>
                </div>

            </div>
        </section>
        <asp:HiddenField ID="hdMapId" runat="server" ClientIDMode="Static" Value="<%#CustomerPortal.SessionAccessor.MapId%>" />
         <span id="PaymentHours" style="display: none;"><%= CustomerPortal.Translator.T("ML_Billing_div_pinPaymntHrs") %></span>
         <span id="Emailid" style="display: none;"><%= CustomerPortal.Translator.T("ML_Register_Lbl_EmailId") %></span>
         <span id="City" style="display:none";><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></span>  
         <span id="Address" style="display: none;"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></span>
          <span id="ContactNo" style="display:none";><%= CustomerPortal.Translator.T("ML_ContactNo") %></span> 
        <span id="PaymentLocationsNotFound" style="display:none"><%=CustomerPortal.Translator.T("ML_PaymentLocations_NotFound")%></span>
         <asp:HiddenField ID="hdnLatitude" runat="server" ClientIDMode="Static" />
         <asp:HiddenField ID="hdnLongitude" runat="server" ClientIDMode="Static" />
         <asp:HiddenField ID="hdnMapIcon" runat="server" ClientIDMode="Static" />
        <!-- footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- footer ends -->
        <%--Multilingual pins user control incase the functionality is implemented in future.--%>
        <uc1:MultilingualPins runat="server" ID="MultilingualPins" />
    </form>
    <script src="js/bootstrap.js"></script>
</body>
</html>
