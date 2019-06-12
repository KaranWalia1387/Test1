<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="CustomerPortal.Home" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Ajax" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>
<%@ Register Src="LanguageDropdown.ascx" TagPrefix="uc2" TagName="LanguageDrpdwn" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title><%=ConfigurationManager.AppSettings["DefaultTitleSmartEnergy"]%></title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.css" rel="stylesheet" />

    <link href="css/style-EN-fontstyle.css" rel="stylesheet" />
    <link href="css/home.css" rel="stylesheet" type="text/css">
    <script src="js/jquery-1.7.js" type="text/javascript"></script>
    <script type="text/javascript">
        var k = jQuery.noConflict();
    </script>

    <script src="js/jquery-1.12.3.min.js" type="text/javascript"></script>
    <link href="Toaster/toastr.css" rel="stylesheet" type="text/css" />
    <script src="Toaster/toastr.min.js" type="text/javascript"></script>
    <link href="js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.min.js"></script>
    <script src="js/jquery.disable.autocomplete.js" type="text/javascript"></script>
    <script src="js/Validate.js" type="text/javascript"></script>
    <script src="js/common.js" type="text/javascript"></script>
    <script src="js/default.js" type="text/javascript"></script>
    <script src="js/Translator.js" type="text/javascript"></script>
    <script src="js/loader.js"></script>
    <link href="css/error.css" rel="stylesheet" />
    <script src="js/bootstrap.min.js"></script>
    <script src="js/custom.js"></script>
           <script  src="<%#string.Format("{0}/js/Language_Dropdown.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>

    <style type="text/css">
        #errorMsg {
            background: rgba(60,60,60,.82) !important;
            border: 0px solid #ffa8a8 !important;
        }

        header {
            position: relative;
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

        .back_button {
            display: none !important;
        }

        .divtime_box {
            text-align: center;
            background: #fff;
            /* float: left; */
            width: 446px;
            padding: 21px;
            opacity: 0.91;
            margin: auto;
            position: absolute;
            left: -64px;
            right: 0;
            z-index: 9999;
            top: 150px;
            border: 1px solid #ccc;
        }

            .divtime_box > p {
                color: #707070;
                font-size: 22px;
                margin-bottom: 16px;
            }

            .divtime_box .date_box {
                color: #36abe0;
                font-size: 26px;
            }

        .time_box1 {
            width: 100%;
            float: left;
            text-align: center;
            margin-top: 21px;
        }

            .time_box1 ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }

                .time_box1 ul li {
                    width: 107px;
                    border-radius: 5px;
                    margin-left: 10px;
                    text-align: center;
                    display: inline-block;
                    padding: 10px;
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#36abe0+0,0c74a2+100 */
                    background: #36abe0; /* Old browsers */
                    background: -moz-linear-gradient(top, #36abe0 0%, #0c74a2 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(top, #36abe0 0%,#0c74a2 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(to bottom, #36abe0 0%,#0c74a2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#36abe0', endColorstr='#0c74a2',GradientType=0 ); /* IE6-9 */
                }

                    .time_box1 ul li span {
                        display: block;
                        font-size: 16px;
                        color: #fff;
                    }

                        .time_box1 ul li span:first-child {
                            font-size: 24px;
                        }

        .w2ui-tag .w2ui-tag-body {
            white-space: normal;
            width: 158px;
        }

        .w2ui-tag {
            z-index: 9999999;
        }

        .bg {
            display: none;
        }

        .main.container1 {
            width: 10% !important;
            display: block !important;
            float: left;
            position: Relative;
        }

        .help_popup_link, .help_popup_link_1 {
            position: relative;
            z-index: 999;
        }

        .help_popup_box, .help_popup_box_1 {
            display: none;
            width: 300px;
            min-height: 121px;
            border: 1px solid #E8E8E8;
            background: #fff;
            position: absolute;
            left: 55px;
            top: -18px;
            z-index: 9999;
            padding: 2px 10px;
            box-shadow: 1px 2px 6px #cdcdcd;
        }

        .help_popup_box_1 {
            left: 20px;
        }

        .help_popup_link img, .help_popup_link_1 img {
            cursor: pointer;
            z-index: 9999999;
            position: relative;
        }

        .help_popup_box h5, .help_popup_box_1 h5 {
            margin: 4px 0;
            padding: 4px 0px;
            border-bottom: 1px solid #EFEFEF;
            font-size: 14px;
            font-weight: bold;
            color: #4C82BB;
        }

        .help_popup_box p, .help_popup_box_1 p {
            font-size: 12px;
        }


        .help_popup_box_bdr {
            width: 0;
            height: 0;
            border-right: 15px solid #fff !important;
            border-left: 15px solid transparent;
            border-top: 15px solid transparent;
            border-bottom: 13px solid transparent;
            margin-left: -40px;
            position: absolute;
        }

        .help_popup_box_1 .help_popup_box_bdr {
            border-right: 15px solid #ECECEC !important;
        }


        i.icon.help.circle::before {
            content: "" !important;
        }

        .right {
            border: 0 none !important;
            height: 48px;
            left: 0 !important;
            position: absolute !important;
            z-index: -1;
        }

        .ui.divider {
            -moz-user-select: none;
            color: rgba(0, 0, 0, 0.85);
            font-size: 1rem;
            font-weight: 700;
            height: 0;
            letter-spacing: 0.05em;
            margin: 2px 0 8px 0px !important;
            text-transform: uppercase;
            padding: 0 !important;
        }

        h5 {
            font-weight: 700;
            margin: 0px 0px 8px !important;
            padding: 0;
            color: #006699 !important;
        }

        .help_icon_img {
            color: #AFAFAF;
            cursor: pointer;
            font-size: 24px;
            margin-left: -21px;
        }

        .main.container1 {
            position: relative;
        }

        .help_conte_box {
            display: none;
            background: #fff;
            position: absolute;
            left: -240px;
            width: 240px;
            float: left;
            height: auto;
            top: -22px;
            word-break: break-word;
            padding: 5px 9px;
            border-radius: 5px;
            box-shadow: 5px;
            text-align: left;
            box-shadow: 0px 0px 1px #ccc;
            opacity: 9 !important;
            border: 1px solid #ccc;
            color: #404040;
            font-family: arial;
            font-size: 15px;
            font-style: normal;
        }

        .arrow_brdr {
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-left: 10px solid #C7C7C7;
            border-bottom: 5px solid transparent;
            position: relative;
            float: right;
            right: -19px;
            top: 24px;
        }

        /* Added by prashant */
        .filter {
            background: #fff url("images/arrowdown.png") no-repeat scroll 95% 50%;
            border: 1px solid #ccc;
            border-radius: 2px;
            margin: 0 10px 0 0;
            overflow: hidden;
            padding: 0;
            width: 100%;
        }

            .filter > select {
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                -o-appearance: none;
                appearance: none;
                background-color: transparent !important;
                background-image: none;
                border: medium none;
                box-shadow: none;
                margin: 0;
                padding: 5px 8px;
                width: 100%;
                outline: 0;
                min-width: 70px;
                color: #888888;
            }

                .filter > select::-ms-expand {
                    display: none;
                }
        /* Added by prashant */

        /* Language drop down css */

        #ddlLanguage_msdd {
            width: 92px !important;
            outline: none;
            cursor: pointer;
            margin-top:0px !important
        }

            #ddlLanguage_msdd #ddlLanguage_title > img {
                width: 21px;
                padding-right: 5px;
                margin-top: -2px;
            }

            #ddlLanguage_msdd > div {
                font-size: 12px;
                padding-left: 7px;
                line-height: 25px;
                top:22px !important 
            }

        #ddlLanguage_child > ul {
            margin-top: 6px;
    background: #fff;
    border: 1px solid #ccc;
    list-style: none;
    padding-left: 0px;
    width: 103px;
    font-size: 12px;
    margin-left: -8px;
    overflow: auto;
        }

            #ddlLanguage_child > ul li {
                cursor: pointer;
                border-bottom: 1px solid #ccc;
                padding: 6px 7px 6px 7px;
                line-height: normal;
                width: 100%;
            }

                #ddlLanguage_child > ul li > img {
                    width: 22px;
                    padding-right: 7px;
                    float: left;
                }

                #ddlLanguage_child > ul li:hover {
                    background: #f9f9f9;
                }

        #ddlLanguage_child {
            height: 95px !important;
            background: #fff;
                margin-top: 4px !important;

        }
        /* End Language drop down css */
        .about_my_home .mid_area_home .left_content_area_home {
                margin: 0px 0px 0px;
        }
            input:not([type=button]), select, textarea {
                    margin-right: 7px;
    margin-left: 7px;
            }

    </style>



    <script type="text/javascript">
        function getDefaultEffLoadTab() {
            var prg = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPrograms)%>';
            var rbts = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate)%>';
            var savTips = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips)%>';

            if (prg.toLocaleLowerCase() == 'none' && rbts.toLocaleLowerCase() == 'none' && savTips.toLocaleLowerCase() == 'none') {
                $('#liEff').hide();
            }
        }

        //function checkClientTimeZone() {
        //    // Set the client time zone
        //    var dt = new Date();
        //    var tz = -dt.getTimezoneOffset();
        //    var parameter = "{str:'" + tz.toString() + "'}";
        //    $.ajax({
        //        type: "POST",
        //        url: "dashboard.aspx/setcookie",
        //        contentType: "application/json; charset=utf-8",
        //        data: parameter,
        //        datatype: "json",
        //    });
        //}



        $(document).ready(function () {
            //checkClientTimeZone();
            $('#txtpwd').disableAutocomplete();
            $(".login-sector-close").click(function () {
                $(".login-sector").hide();
            });

            $('.nav_login_section ul li').click(function (e) {
                $('.nav_login_section ul li').removeClass('active');
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.addClass('active');
                }
            });
        });




        function refresh() {
            try {

            }
            catch (e) {
                console.log(e.message);
            }
        }

        $("#drp-dwn").click(function () {

            var effect = 'slide';
            var options = { direction: 'right' };
            var duration = 500;
            $(".login-sector").toggle(effect, options, duration);

        });
        $("document").ready(function () {
            refresh();
            $(window).on('resize', refresh);
            $("#rmclass").css("display", "none");

            var qrStr = window.location.search;
            if (qrStr != "") {
                qrStr = qrStr.split("?")[1].split("=")[1];
                // alert(qrStr);
                if (qrStr == 'prelogin') {
                    var duration = 700;
                    $(".login-sector").toggle("options");
                }
            }





            var aa = $(window).width();
            if ($(window).width() < 767) {
                $("#drp-dwn").click(function () {

                    var options = { direction: 'bottom' };

                    $(".login-sector").toggle("options");

                });
            } else {
                $("#drp-dwn").click(function () {

                    var effect = 'slide';
                    var options = { direction: 'right' };
                    var duration = 500;
                    $(".login-sector").toggle(effect, options, duration);

                });


            }



            var aa = $(window).width();
            if ($(window).width() < 767) {
                $("#drp-dwn-1").click(function () {
                    var options = { direction: 'bottom' };
                    $(".login-sector-1").toggle("options");

                });
            } else {
                $("#drp-dwn-1").click(function () {
                    var effect = 'slide';
                    var options = { direction: 'right' };
                    var duration = 500;
                    $(".login-sector-1").toggle(effect, options, duration);

                });


            };
            $(".help_popup_link .glyphicon-question-sign").click(function (e) {
                $(".help_popup_box").toggle();
                e.stopPropagation();
            });
            $(document).click(function (e) {
                if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
                    $(".help_popup_box").hide();
                }
            });

            $(".help_popup_link_1 .glyphicon-question-sign").click(function (e) {
                $(".help_popup_box_1").toggle();
                e.stopPropagation();
            });
            $(document).click(function (e) {
                if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
                    $(".help_popup_box_1").hide();
                }
            });


        });
        $(window).load(function () {
            var solarMessage = $('#solarPanelMessage').text();
            $('#solarhelplink').text(solarMessage);
            $('#homeSizehelplink').html($('#homeSizeMessage').text());
            $('#electricVehiclehelplink').text($('#electricVehicleMessage').text());
            $('#numberofhighefficiencyhelplink').text($('#noOfAppliancesMessage').text());
            $('#lotSizehelplink').text($('#lotSizeMessage').text());
            $('#landscapeAreahelplink').text($('#landscapAreaMessage').text());
            $('#speciallandscapeAreahelplink').text($('#specialLandscapAreaMessage').text());
        });
    </script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".help_conte_box").hide();
            $('#elm1').hover(
                   function () { $('#help_conte_box1').addClass('show') },
                   function () { $('#help_conte_box1').removeClass('show') }
            )
            $('#elm2').hover(
       function () { $('#help_conte_box2').addClass('show') },
       function () { $('#help_conte_box2').removeClass('show') }
)
            $('#elm3').hover(
       function () { $('#help_conte_box3').addClass('show') },
       function () { $('#help_conte_box3').removeClass('show') }
)
            $('#elm4').hover(
       function () { $('#help_conte_box4').addClass('show') },
       function () { $('#help_conte_box4').removeClass('show') }
)
            $('#elm5').hover(
       function () { $('#help_conte_box5').addClass('show') },
       function () { $('#help_conte_box5').removeClass('show') }
)
            $('#elm6').hover(
       function () { $('#help_conte_box6').addClass('show') },
       function () { $('#help_conte_box6').removeClass('show') }
)
            $('#elm7').hover(
       function () { $('#help_conte_box7').addClass('show') },
       function () { $('#help_conte_box7').removeClass('show') }
)

        });

    </script>
    <script type="text/javascript" src="js/ImageDropdown.js"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            try {
                //$("#ddlLanguage").msDropDown();
            } catch (e) {
                console.log(e.message);
            }
        });
    </script>
</head>
<body>
    <form runat="server">
        <asp:ScriptManager ID="scrMgr" runat="server">
        </asp:ScriptManager>
        <header>
            <div class="container">
                <div class="row top_bdr">
                    <div class="col-xs-12 col-sm-3 col-md-4">
                        <div class="logo">
                            <a href="#">
                                <img src="img/scm_logo.png" alt="SCM Logo" /></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-9 col-md-8" style="padding: 0 10px">
                        <div class="top_level_nav">
                            <ul style="margin-right: 15px;">
                                <li>
                                  <%--  <div class="conect filter" runat="server" id="LanguageDDL">
                                        <asp:DropDownList ID="ddlLanguage" globalize="ML_MYACCOUNT_ddl_Language" title="Language" runat="server" ClientIDMode="Static" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged" Style="margin-top: 7px">
                                        </asp:DropDownList>
                                       
                                    </div>--%>
                                       <uc2:LanguageDrpdwn runat="server" ID="LanguageDrpdwn" />
                                </li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FAQ) %>"><a href="help_html/index.html" globalize="ML_SideMenu_Navigation_Help"><%= CustomerPortal.Translator.T("ML_SideMenu_Navigation_Help") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMe) %>"><a href="contact-us-connect-me.aspx" globalize="ML_CONNECTMEMaster_Anchor_ContactUs"><%= CustomerPortal.Translator.T("ML_CONNECTMEMaster_Anchor_ContactUs") %></a></li>
                            </ul>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 bottom_level_menu top_level_nav">
                            <ul style="float: right; padding: 0px 15px; text-align: right;">
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Outages) %>"><a href="outeroutage.aspx" globalize="ML_DASHBOARD_Anchor_Outages"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Outages") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate) %>"><a href="OuterSavingTips.aspx" globalize="ML_Rebates_title_Rebates"><%= CustomerPortal.Translator.T("ML_Rebates_title_Rebates") %></a></li>

                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPayBill) %>"><a href="one-timepayment.aspx" globalize="ML_BILLING_BTN_PayBill"><%= CustomerPortal.Translator.T("ML_BILLING_BTN_PayBill") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Services) %>"><a href="outer-service-request.aspx" globalize="ML_Msg_ServiceTurnOnOff"><%= CustomerPortal.Translator.T("ML_Msg_ServiceTurnOnOff") %></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divschedulr" runat="server" class="divtime_box" style="display: none">
                <p globalize="ML_Home_under_maintenance"><%= CustomerPortal.Translator.T("ML_Home_under_maintenance") %> </p>
                <div class="date_box">
                    <asp:Label ID="lblDate" runat="server" Text=""></asp:Label>
                </div>
                <div class="time_box1">
                    <ul>
                        <li>
                            <span>
                                <asp:Label ID="lblHours" runat="server" Text=""></asp:Label></span>
                            <span globalize="ML_EV_lblCurrentAverageTime"><%= CustomerPortal.Translator.T("ML_EV_lblCurrentAverageTime") %> </span>
                        </li>
                        <li>
                            <span>
                                <asp:Label ID="lblMinutes" runat="server" Text=""></asp:Label></span>
                            <span globalize="ML_Home_Minutes"><%= CustomerPortal.Translator.T("ML_Home_Minutes") %> </span>
                        </li>
                        <li>
                            <span>
                                <asp:Label ID="lblSeconds" runat="server" Text=""></asp:Label></span>
                            <span globalize="ML_Home_Seconds"><%= CustomerPortal.Translator.T("ML_Home_Seconds") %> </span>
                        </li>
                    </ul>


                </div>
            </div>
        </header>
        <section class="wrapper-container">
            <div class="container">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-8 col-sm-12 col-xs-12 padd-off">
                        <div class="slider-area">
                            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#mymyCarousel" data-slide-to="0" class="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="item active">
                                        <img src="img/slider-1.png" data-src="holder.js/900x500/auto/#7cbf00:#fff/text: " alt="First slide">
                                        <div class="container">
                                            <div class="carousel-caption">
                                                <h2 globalize="ML_Home_Moving"><%= CustomerPortal.Translator.T("ML_Home_Moving") %></h2>
                                                <p globalize="ML_Home_Changeorstart"><%= CustomerPortal.Translator.T("ML_Home_Changeorstart") %></p>
                                                <p globalize="ML_Home_service_online"><%= CustomerPortal.Translator.T("ML_Home_service_online") %></p>
                                                <h3 globalize="ML_Home_get_started"><%= CustomerPortal.Translator.T("ML_Home_get_started") %></h3>
                                                <a href="outer-service-request.aspx" class="btn btn-default btn-logger2" globalize="ML_Home_learn_more"><%= CustomerPortal.Translator.T("ML_Home_learn_more") %></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <img src="img/slider-1.png" style="width: 100%" data-src="" alt="Second slide">
                                        <div class="container">
                                            <div class="carousel-caption">
                                                <h2 globalize="ML_Home_Moving"><%= CustomerPortal.Translator.T("ML_Home_Moving") %></h2>
                                                <p globalize="ML_Home_Changeorstart"><%= CustomerPortal.Translator.T("ML_Home_Changeorstart") %></p>
                                                <p globalize="ML_Home_service_online"><%= CustomerPortal.Translator.T("ML_Home_service_online") %></p>
                                                <h3 globalize="ML_Home_get_started"><%= CustomerPortal.Translator.T("ML_Home_get_started") %></h3>
                                                <a href="outer-service-request.aspx" class="btn btn-default btn-logger2" globalize="ML_Home_learn_more"><%= CustomerPortal.Translator.T("ML_Home_learn_more") %></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <img src="img/slider-1.png" style="width: 100%" data-src="" alt="Third slide">
                                        <div class="container">
                                            <div class="carousel-caption">
                                                <h2 globalize="ML_Home_Moving"><%= CustomerPortal.Translator.T("ML_Home_Moving") %></h2>
                                                <p globalize="ML_Home_Changeorstart"><%= CustomerPortal.Translator.T("ML_Home_Changeorstart") %></p>
                                                <p globalize="ML_Home_service_online"><%= CustomerPortal.Translator.T("ML_Home_service_online") %></p>
                                                <h3 globalize="ML_Home_get_started"><%= CustomerPortal.Translator.T("ML_Home_get_started") %></h3>
                                                <a href="outer-service-request.aspx" class="btn btn-default btn-logger2" globalize="ML_Home_learn_more"><%= CustomerPortal.Translator.T("ML_Home_learn_more") %></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12 col-xs-12 padd-off">
                        <div class="signuparea">
                            <div class="heading-container">
                                <h3 globalize="ML_Home_customer_poratl"><%= CustomerPortal.Translator.T("ML_Home_customer_poratl") %></h3>
                            </div>
                            <div class="tabbable custom-tabs tabs-animated flat large shadow  track-url auto-scroll">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a class="active" href="#panel5-1" data-toggle="tab" globalize="ML_LOGIN_BTN_Login"><%= CustomerPortal.Translator.T("ML_LOGIN_BTN_Login") %></a></li>
                                    <li><a href="CustomerRegistration.aspx" globalize="ML_BILLDASHBOARD_Navigation_SignUp"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_SignUp") %></a></li>
                                </ul>
                                <asp:Label ID="lblMsg" runat="server" Text="" ForeColor="Red" globalize="ML_Default_Lbl_Message"></asp:Label>
                                <span id="errorMsg" style="float: right;"></span>
                                <div class="tab-content">
                                    <div id="panel5-1" class="tab-pane fade in active">
                                        <div class="sign-in-form">
                                            <div class="form-group">
                                                <asp:TextBox ID="txtLogin" globalize="ML_Default_Txt_Login" runat="server" placeholder="User ID" class="form-control" title="User ID" value="" size="30" MaxLength="30" AutoCompleteType="None"> </asp:TextBox>
                                                <Ajax:FilteredTextBoxExtender ID="FtbtxtLogin" runat="server" TargetControlID="txtLogin" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></Ajax:FilteredTextBoxExtender>
                                            </div>
                                            <div class="form-group">
                                                <asp:TextBox globalize="ML_Default_Txt_Password" ID="txtpwd" runat="server" placeholder="Password" TextMode="Password" class="form-control" title="Password" value="" size="30" MaxLength="16" AutoCompleteType="None"></asp:TextBox>
                                            </div>
                                            <div class="form-group">
                                                <span class="loggedin minimal" style="width: 100%;">
                                                    <div class="area-remember">
                                                        <input type="checkbox" class="mail-checkboxer" id="rmbrme" value="1" runat="server" name="rmbrme" globalize="ML_Default_Chk_rememberme" />
                                                        <label for="rmbrme" class="rmbrme"></label>
                                                        <label globalize="ML_LOGIN_Lbl_RememberMe"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_RememberMe") %></label>
                                                    </div>
                                                    <asp:Button ID="btnlogin" runat="server" Text='<%# CustomerPortal.Translator.T("ML_LOGIN_BTN_Login") %>' Class="btn-logger2" globalize="ML_LOGIN_BTN_Login" title="Sign In" ClientIDMode="Static" OnClientClick="return false" Style="float: right;" />
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <p class="help-btn"><a href="LoginSupport.aspx" globalize="ML_LOGIN_BTN_LoginHelp"><%= CustomerPortal.Translator.T("ML_LOGIN_BTN_LoginHelp") %></a></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade " id="panel5-2">
                                        <div class="sign-in-form">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Create User ID" />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Your Password" />
                                            </div>
                                            <div class="form-group">
                                                <p class="help-btn"><a href="#" globalize="ML_Home_new_account"><%= CustomerPortal.Translator.T("ML_Home_new_account") %></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- section for bottom boxes -->
        <section class="ad-container">
            <div class="container">
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div class="slider-area" style="border: 0px; height: auto;">
                        <div id="myCarousel_1" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#myCarousel_1" data-slide-to="0" class="active"></li>
                                <li data-target="#myCarousel_1" data-slide-to="1"></li>
                                <li data-target="#myCarousel_1" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="item active">
                                    <div class="tips-image">
                                        <a href="OuterSavingTips.aspx" class="btn btn-default btn-logger" globalize="ML_Home_try_it_out"><%= CustomerPortal.Translator.T("ML_Home_try_it_out") %></a>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="tips-image tips-image1">
                                        <a href="OuterSavingTips.aspx" class="btn btn-default btn-logger" globalize="ML_Home_try_it_out"><%= CustomerPortal.Translator.T("ML_Home_try_it_out") %></a>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="tips-image tips-image2">
                                        <a href="OuterSavingTips.aspx" class="btn btn-default btn-logger" globalize="ML_Home_try_it_out"><%= CustomerPortal.Translator.T("ML_Home_try_it_out") %></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <!-- <div class="app-section"></div> -->
                    <img src="img/app-sec.png" alt="app" class="img-respon" />
                </div>
            </div>
        </section>
        <!-- Wrapper for Slides -->
        <!-- Div Starts here for popup -->
        <div class="bg">
            <div class="about_my_home" id="RegisteredHomeContainer" style="height: 500px;">
                <h1 globalize="ML_AboutMyHome_Header_AboutMyHome"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Header_AboutMyHome") %></h1>
                <span class="close_icon"><a href="#">
                    <img src="images/cross-icon.png" id="BtnCloseAboutMyHome"></a></span>


                <div class="mid_area_home" id="mid_area_home">
                    <div class="upper_text" globalize="ML_AboutMyHome_Lbl_Description"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_Description") %></div>
                    <div class="left_content_area_home" globalize="ML_Master_li_Select_Address"><%= CustomerPortal.Translator.T("ML_Master_li_Select_Address") %></div>
                    <div class="right_content_area_home">
                        <select id="ddlUserAddress" title="Address">
                        </select>
                    </div>
                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_SrvcRqust_p_SAN"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_SAN") %></div>
                    <div class="right_content_area_home">
                        <div class="blank_text">
                            <label id="lblAccountNumber" title="Service Account"></label>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_Default_Lbl_HomeType"><%= CustomerPortal.Translator.T("ML_Default_Lbl_HomeType") %></div>
                    <div class="right_content_area_home">
                        <select id="ddlHomeType" title="Home type" globalize="ML_Default_Lbl_HomeType">
                        </select>
                    </div>

                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_Default_Lbl_NoOfResidents"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfResidents") %></div>
                    <div class="right_content_area_home">
                      
                           <asp:DropDownList ID="ddlNoOfResidents" runat ="server" title="No of Residents" globalize="ML_Default_Txt_NoOfResidentsVal"></asp:DropDownList>
                    </div>

                    <div id="divPower" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power) %>">
                        <div class="clearfix"></div>
                        <div class="left_content_area_home" globalize="ML_Default_Lbl_SolarPanels"><%= CustomerPortal.Translator.T("ML_Default_Lbl_SolarPanels") %> </div>
                        <div class="right_content_area_home">
                            <select id="ddlSolarPanel" style="float: left;">
                                <option value="1" globalize="ML_Default_DDL_No"><%= CustomerPortal.Translator.T("ML_Default_DDL_No") %></option>
                                <option value="2" globalize="ML_EFFICIENCY_Yes"><%= CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %></option>
                            </select>
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                <i class="circle help link icon custome_help_popup" id="elm1" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; Solar panel is designed to absorb the sun's rays as a source of energy for generating electricity or heating &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>

                                    <div class="help_conte_box" id="help_conte_box1">
                                        <div class="arrow_brdr"></div>
                                        <span id="solarhelplink" globalize="ML_WU_li_Solar"><%= CustomerPortal.Translator.T("ML_WU_li_Solar") %></span>
                                    </div>

                                </i>
                            </span>

                        </div>

                        <div class="clearfix"></div>
                        <div id="div_Noofsolarpanels" style="display: none;">
                            <div class="left_content_area_home" globalize="ML_Default_Lbl_NoOfSolPan">
                                <%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfSolPan") %>
                            </div>
                            <div class="right_content_area_home">
                                <input type="text" globalize="ML_Default_Txt_NoOfSolPanVal" runat="server" placeholder="Number of Solar Panels" id="txtSolarPanel" maxlength="3" onkeypress="return IsNumeric1(event,this);"
                                    title="Number of Solar Panels" />
                            </div>

                        </div>

                        <div style="clear: both;"></div>
                        <div class="left_content_area_home" globalize="ML_Default_Lbl_NoOfHomeSize"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfHomeSize") %>  </div>
                        <div class="right_content_area_home">
                            <input globalize="ML_Default_Txt_NoOfHomeSizeVal" runat="server" placeholder="Home size in sq ft" type="text" id="txtHomesize" maxlength="5" onkeypress="return IsNumeric(event,this);"
                                mandatory="0" title="Home size in sq ft" />
                            <span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>

                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm2" data-html="&lt;h5&gt;How to determine square footage? &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhome'&gt; Round your measurements off to the nearest 0.5 linear foot. Multiply the length times the width of each section to find the square footag &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box2">
                                        <div class="arrow_brdr"></div>
                                        <span id="homeSizehelplink"></span>
                                    </div>

                                </i>
                            </span>
                        </div>


                        <div class="clearfix"></div>

                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_floors"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_floors") %> </span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_Floors" MaxLength="3" mandatory="0" placeholder="Floors" type="text" ID="txtFloors" onkeypress="return IsNumeric1(event,this);"
                                title="Floors" />
                        </div>
                        <div class="clearfix"></div>



                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Electricvehicle"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_Electricvehicle") %></span></div>
                        <div class="right_content_area_home inpt_space_style">
                            <asp:RadioButton GroupName="e" Checked="true" Style="margin-left: 00px;" runat="server" globalize="ML_EFFICIENCY_Yes" Text="&nbsp;Yes" ID="rdbEVyes" />
                            &nbsp;&nbsp;<asp:RadioButton GroupName="e" runat="server" globalize="ML_CustomerRegistration_rdb_Poolno" Text="&nbsp;No" ID="rdbEVNo" />
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm3" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarElectric'&gt; Electric Vehicle is propelled by electric motors, using electrical energy stored in rechargeable batteries. &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box3">
                                        <div class="arrow_brdr"></div>
                                        <span id="electricVehiclehelplink"></span>
                                    </div>
                                </i>
                            </span>

                        </div>
                        <div class="clearfix"></div>



                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_yearbuilt"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_yearbuilt") %> </span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_Yearbuilt" MaxLength="4" mandatory="0" placeholder="Year Built" type="text" ID="txtYearbuilt" onkeypress="return IsNumeric1(event,this);"
                                title="Year Built" />
                        </div>


                    </div>

                    <div class="clearfix"></div>
                    <div id="divWater" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Water) %>">


                        <div class="left_content_area_home" style="display: none;">
                        </div>


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofbathrooms"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofbathrooms") %> </span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_NoOfBathromms" MaxLength="3" mandatory="0" placeholder="Number of bathrooms" type="text" ID="txtNumberofbathrooms" onkeypress="return IsNumeric1(event,this);"
                                title="Number of bathrooms" />
                        </div>

                        <div class="clearfix"></div>


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp") %></span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_numberofhigheffiencyapp" MaxLength="3" mandatory="0" placeholder="Number of high-efficiency appliances" type="text" ID="txtNumberofhigheffapp" onkeypress="return IsNumeric1(event,this);"
                                title="Number of high-efficiency appliances" />
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                <i class="circle help link icon" id="elm4" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarEfficiency'&gt; Energy efficient appliances use less electricity to achieve the same level of performance to similar models with the same size or capacity. e. Add up the square feet of each section to find the total square footage of the house. Round your total off to the nearest square foot. &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box4">
                                        <div class="arrow_brdr"></div>
                                        <span id="numberofhighefficiencyhelplink"></span>
                                    </div>
                                </i>
                            </span>
                        </div>


                        <div class="clearfix"></div>

                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_lotsize"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_lotsize") %></span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_Lotsizep" MaxLength="5" mandatory="0" placeholder="Lot Size" type="text" ID="txtLotsize" onkeypress="return IsNumeric1(event,this);"
                                title="Lot Size" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm5" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='lotSizehelp'&gt; Lot structures include a house, private walkways, and in back - a detached garage with driveway access to the alley and a small area for garbage. &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box5">
                                        <div class="arrow_brdr"></div>
                                        <span id="lotSizehelplink"></span>
                                    </div>
                                </i>
                        </div>

                        <div class="clearfix"></div>


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_landscapearea"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_landscapearea") %></span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_Landscape" MaxLength="5" mandatory="0" placeholder="Landscape Area" type="text" ID="txtLandscapearea" onkeypress="return IsNumeric1(event,this);"
                                title="Landscape Area" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm6" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='landscapeAreahelp'&gt; Landscape is a given area of land improved by carefully designed planting and arrangement. It includes front or back yard garden or stone-paved pathway. &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box6">
                                        <div class="arrow_brdr"></div>
                                        <span id="landscapeAreahelplink"></span>
                                    </div>
                                </i>
                        </div>


                        <div class="clearfix"></div>

                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Splandscapearea"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_Splandscapearea") %></span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_slandscape" MaxLength="5" mandatory="0" placeholder="Special Landscape Area" type="text" ID="txtsplandscapearea" onkeypress="return IsNumeric1(event,this);"
                                title="Special Landscape Area" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>

                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm7" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='specialLandscapeAreahelp'&gt; Special Landscape Area means an area of the landscape dedicated solely to edible plants and areas irrigated with recycled water, water features using recycled water. &lt;/span&gt">
                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box7">
                                        <div class="arrow_brdr"></div>
                                        <span id="speciallandscapeAreahelplink"></span>
                                    </div>
                                </i>
                        </div>


                        <div class="clearfix"></div>


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_pool"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_pool") %></span></div>
                        <div class="right_content_area_home inpt_space_style">
                            <asp:RadioButton GroupName="a" Checked="true" runat="server" globalize="ML_EFFICIENCY_Yes" Text="&nbsp;Yes" ID="rdbPoolYes" />
                            <asp:RadioButton GroupName="a" runat="server" Style="margin-left: 20px" globalize="ML_CustomerRegistration_rdb_PoolNo" Text="&nbsp;No" ID="rdbPoolNo" />
                        </div>


                    </div>

                    <div style="clear: both;"></div>
                   

                </div>
                <div class="bottom_area_home">
                     <div class="pro_info_footer">
                             <input type="checkbox" id="chkdonotenter" />
                            <i class="check" globalize="ML_AboutMyHome_Lbl_Wish_to_inform"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_Wish_to_inform") %></i>
                      </div>
                    <div class="btn_footer_about">
                        <input class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' id="btnSaveHomeInfo" type="button" globalize="ML_Default_Button_Submit">
                        <input class="cancel-button" style="float: right; margin-right: 5px;" value='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' id="btnClearSaveHomeInfo" type="button" globalize="ML_Common_Navigation_cancel">
                  </div>

                </div>
            </div>
              <div class="about_my_home" id="RegisteredBusinessContainer" style="height: 500px;">
                <h1 globalize="ML_MyAccount_Header_AboutMyBusiness"><%= CustomerPortal.Translator.T("ML_MyAccount_Header_AboutMyBusiness") %></h1>
                <span class="close_icon"><a href="#">
                    <img src="images/cross-icon.png" id="BtnCloseAboutMyBusiness"/></a></span>


                <div class="mid_area_home" id="mid_area_business">
                    <div class="upper_text" globalize="ML_AboutMyHome_Lbl_Description"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_Description") %></div>
                    <%-- <div class="left_content_area_home" globalize="ML_Master_li_Select_Address"><%= CustomerPortal.Translator.T("ML_Master_li_Select_Address") %></div>
                    <div class="right_content_area_home">
                        <select id="ddlUserAddress" title="Address">
                        </select>
                    </div>--%>
                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_SrvcRqust_p_SAN"><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_SAN") %></div>
                    <div class="right_content_area_home">
                        <div class="blank_text">
                            <%--  <label id="lblUtilityAccountNumber" title="Service Account"></label>--%>
                            <asp:Label runat="server" ID="lblUtilityAccountNumber" ClientIDMode="Static" title="Service Account Number"></asp:Label>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_BusinessSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_BusinessSize") %></div>
                    <div class="right_content_area_home">

                        <asp:DropDownList ID="ddlBusinessSize" runat="server" ClientIDMode="Static" title="Business Size" globalize="ML_AboutMyBusiness_Lbl_BusinessSize">
                        </asp:DropDownList>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_BusinessType"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_BusinessType") %></div>
                    <div class="right_content_area_home">
                        <asp:DropDownList ID="ddlBusinessType" runat="server" ClientIDMode="Static" title="Business Size" globalize="ML_AboutMyBusiness_Lbl_BusinessType">
                        </asp:DropDownList>
                    </div>

                    <div class="clearfix"></div>
                    <div class="left_content_area_home" globalize="ML_Default_Lbl_NoOfResidents"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfResidents") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" ClientIDMode="Static" globalize="ML_Default_Txt_NoOfResidentsVal" type="text" placeholder="Number of Residents" mandatory="0" ID="txtNoofResident" MaxLength="3" onkeypress="return IsNumeric(event);"
                            title="Number of residents" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_OfficeArea"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_OfficeArea") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Office Area" mandatory="0" ID="txtOfficeArea" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="Office Area" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_LotSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_LotSize") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Lot Size" mandatory="0" ID="txtBusinnessLotSize" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="Lot Size" />
                          <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="LotSizehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LotSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_NoOfFloors"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_NoOfFloors") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="No of Floors" mandatory="0" ID="txtNoofFloors" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="No of Floors" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_NoOfRestrooms"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_NoOfRestrooms") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="No of RestRooms" mandatory="0" ID="txtNoOfRestrooms" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="No of RestRooms" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_LandcapeArea"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_LandcapeArea") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="Landscape Area" mandatory="0" ID="txtBusinessLandscapeArea" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="Landscape Area" />
                         <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="Landscapehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LandscapeAreaSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>


                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasSolarPanels"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasSolarPanels") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbSolarPanels" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div>


                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_GeneratingCapacity"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_GeneratingCapacity") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Generating Capacity" mandatory="0" ID="txtGeneratingCapacity" MaxLength="8"
                            onkeypress="return IsNumeric(event);"
                            title="Generating Capacity" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasElevator"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasElevator") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbElevator" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasHVACSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasHVACSystem") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbHVACSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                          <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="HVAChelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_HVACSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasElectricalSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasElectricalSystem") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbElectricalSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                         <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="Electricalhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ElectricalSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>


                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbPlumingWaterSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                         <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="PlumingWaterhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_PlumbingWaterSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasServerRoom"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasServerRoom") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbServerRoom" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                        <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">
                                    <i class="circle help link icon" id="ServerRoomhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ServerRoom") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                  </span>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasSwimmingPool"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasSwimmingPool") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbSwimmingPool" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div>

                    <div style="clear: both;"></div>
                    

                </div>
                <div class="bottom_area_home">
                      <div class="pro_info_footer">
                          <input type="checkbox" id="chkdonotenterMyBusiness" />
                    <i class="check" globalize="ML_AboutMyHome_Lbl_Wish_to_inform"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_Wish_to_inform") %></i>
                          </div>
                    <input class="submit-button" style="margin-right: 10px;" value='<%# CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' id="btnSaveBusinessInfo" type="button" globalize="ML_Default_Button_Submit">
                    <input class="cancel-button" style="float: left; margin-right: 5px;" value='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' id="btnClearSaveBusinessInfo" type="button" globalize="ML_Common_Navigation_cancel">
                </div>
            </div>
        </div>

        <!-- Div Starts here for popup -->
        <footer>

            <section class="upper-footer">
                <div class="container">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="col-md-3 col-sm-3 col-xs-12 ftr-widget">
                            <h3 class="footer-widget-title" globalize="ML_Home_quick_links"><%= CustomerPortal.Translator.T("ML_Home_quick_links") %></h3>
                            <ul>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPaymentLocation) %>"><a href="PaymentLocationPreLogin.aspx" globalize="ML_PayLocation_PayLocation"><%= CustomerPortal.Translator.T("ML_PayLocation_PayLocation") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Services) %>"><a href="outer-service-request.aspx" globalize="ML_Default_Msg_TurnOnOffService"><%= CustomerPortal.Translator.T("ML_Default_Msg_TurnOnOffService") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMe) %>"><a href="contact-us-connect-me.aspx" globalize="ML_CONNECTMEMaster_Anchor_ContactUs"><%= CustomerPortal.Translator.T("ML_CONNECTMEMaster_Anchor_ContactUs") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeReportWaterWaste)%>"><a href="contact-us-connect-me.aspx?pid=t" globalize="ML_ConnectMe_dropdn_txt_ReportWaterTheft"><%= CustomerPortal.Translator.T("ML_ConnectMe_dropdn_txt_ReportWaterTheft") %></a></li>
                            </ul>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 ftr-widget" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Outages) %>">
                            <h3 class="footer-widget-title" globalize="ML_DASHBOARD_Anchor_Outages"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Outages") %></h3>
                            <ul>
                                <li><a href="contact-us-connect-me.aspx" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.OutagesReportOutages) %>" globalize="ML_Outage_span_Report_Outage"><%= CustomerPortal.Translator.T("ML_Outage_span_Report_Outage") %></a></li>
                                <li><a href="outeroutage.aspx" globalize="ML_Home_view_outages"><%= CustomerPortal.Translator.T("ML_Home_view_outages") %></a></li>
                            </ul>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 ftr-widget" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Efficiency) %>">
                            <h3 class="footer-widget-title" globalize="ML_ENERGY_EFFICIENCY_Navigation_EnergyEffeciency"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Navigation_EnergyEffeciency") %></h3>
                            <ul>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips) %>"><a href="OuterSavingTips.aspx?type=save" globalize="ML_SvngTips_h1_SavingTip"><%= CustomerPortal.Translator.T("ML_SvngTips_h1_SavingTip") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate) %>"><a href="OuterSavingTips.aspx?type=rbt" globalize="ML_Rebates_title_Rebates"><%= CustomerPortal.Translator.T("ML_Rebates_title_Rebates") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyEducationTips) %>"><a href="OuterSavingTips.aspx?type=edu" globalize="ML_SvngTips_li_ET"><%= CustomerPortal.Translator.T("ML_SvngTips_li_ET") %></a></li>
                            </ul>
                        </div>
                        <%--<div class="col-md-3 col-sm-3 col-xs-12 ftr-widget" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMe) %>">--%>
                        <div class="col-md-3 col-sm-3 col-xs-12 ftr-widget" style="display: none">
                            <h3 class="footer-widget-title" globalize="ML_Home_follow_us"><%= CustomerPortal.Translator.T("ML_Home_follow_us") %></h3>
                            <ul>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook) %>"><a href="<%=fburl %>" target="_blank" globalize="ML_Default_Anchor_FaceBook"><%= CustomerPortal.Translator.T("ML_Default_Anchor_FaceBook") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter) %>"><a href="<%=twitterurl %>" target="_blank" globalize="ML_ConnectMe_tw"><%= CustomerPortal.Translator.T("ML_ConnectMe_tw") %></a></li>
                                <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeYoutube) %>"><a href="<%=youtubeurl %>" target="_blank" globalize="ML_ConnectMe_Youtube"><%= CustomerPortal.Translator.T("ML_ConnectMe_Youtube") %></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <uc1:Footer runat="server" ID="Footer" />
        </footer>
        <input id="hdnCommonUrl" type="hidden" value="<%=CustomerPortal.SessionAccessor.BaseUrl%>" />
        <asp:HiddenField ID="hdnCustomerid" runat="server" ClientIDMode="Static" />
        <span id="solarPanelMessage" style="display: none;" globalize="ML_Icon_Msg_SolanPanels"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SolanPanels") %></span>
        <span id="homeSizeMessage" style="display: none;" globalize="ML_Icon_Msg_HomeSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_HomeSize") %></span>
        <span id="electricVehicleMessage" style="display: none;" globalize="ML_Icon_Msg_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_Icon_Msg_ElectricVehicle") %></span>
        <span id="noOfAppliancesMessage" style="display: none;" globalize="ML_Icon_Msg_NoOfAppliances"><%= CustomerPortal.Translator.T("ML_Icon_Msg_NoOfAppliances") %></span>
        <span id="lotSizeMessage" style="display: none;" globalize="ML_Icon_Msg_LotSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LotSize") %></span>
        <span id="landscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_LandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LandscapArea") %></span>
        <span id="specialLandscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_SpecialLandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SpecialLandscapArea") %></span>
        <span id="spinvalidkey" style="display: none;" globalize="ML_AblouMyHome_InvalidYear"><%= CustomerPortal.Translator.T("ML_AblouMyHome_InvalidYear") %></span>

    </form>
    <div id="page_loader">
    </div>
</body>

</html>
