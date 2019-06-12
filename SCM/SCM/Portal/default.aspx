<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="CustomerPortal._default" EnableEventValidation="true" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>


<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Ajax" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc2" TagName="Footer" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />

    <title globalize="ML_Login_Title"><%= CustomerPortal.Translator.T("ML_Login_Title") %> </title>

    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />

    <%: System.Web.Optimization.Styles.Render("~/Content/cssDefault") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsDefault")%>

    <link id="stylecss" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link href="css/scm_font_icon.css" rel="stylesheet" />
    <link href="css/font-awesome.css" rel="stylesheet" />

    <style type="text/css">
        .back_to_login {
            display: none;
        }
        #btnSaveBusinessInfo{
            margin-right:13px;
        }
    </style>
    <!-- Message for disable javascript in Browser -->
    <noscript>
        For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
    </noscript>


    <script type="text/javascript">

        $(document).ready(function () {
            getDefaultEffLoadTab();

            $('#BtnCloseAboutMyBusiness').click(function () {
                $('#RegisteredBusinessContainer').hide();
                window.location.href = "Dashboard.aspx";
            });

        });

        function getDefaultEffLoadTab() {
            var prg = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPrograms)%>';
            var rbts = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate)%>';
            var savTips = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips)%>';
            var eduTips = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyEducationTips)%>'
            if (prg.toLocaleLowerCase() == 'none' && rbts.toLocaleLowerCase() == 'none' && savTips.toLocaleLowerCase() == 'none' && eduTips.toLocaleLowerCase() == 'none') {
                $('#liEff').hide();
            }
        }

        function PaymentOption() {
            var externalPaymentLink = _default.GetPaymentOptions().value;

            if (externalPaymentLink.indexOf('One-TimePayment.aspx') != -1) {
                window.location.href = externalPaymentLink;
            }
            else {
                window.open(externalPaymentLink);
            }
        }

    </script>
</head>
<body>
    <form id="form2" runat="server" defaultfocus="txtLogin" autocomplete="off" clientidmode="Static">
        <asp:ScriptManager ID="scrMgr" runat="server">
        </asp:ScriptManager>
        <!-- Header starts-->

        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header end-->

        <!-- Wrapper for Slides -->
        <div class="carousel-inner carousel slide" id="myCarousel">
            <div class="overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 sch_bill_box">
                            <div id="divschedulr" runat="server" class="divtime_box" style="display: none">
                                <p><%= CustomerPortal.Translator.T("ML_Home_under_maintenance") %></p>
                                <div class="date_box">
                                    <asp:Label ID="lblDate" runat="server" Text=""></asp:Label>
                                </div>
                                <div class="time_box1">
                                    <ul>
                                        <li>
                                            <span>
                                                <asp:Label ID="lblHours" runat="server" Text=""></asp:Label></span>
                                            <span><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_DailyChargeHours") %></span>
                                        </li>
                                        <li>
                                            <span>
                                                <asp:Label ID="lblMinutes" runat="server" Text=""></asp:Label></span>
                                            <span><%= CustomerPortal.Translator.T("ML_Home_Minutes") %></span>
                                        </li>
                                        <li>
                                            <span>
                                                <asp:Label ID="lblSeconds" runat="server" Text=""></asp:Label></span>
                                            <span><%= CustomerPortal.Translator.T("ML_Home_Seconds") %></span>
                                        </li>
                                    </ul>


                                </div>
                            </div>
                            <div class="Save_bill_section" style="visibility: hidden;">

                                <div class="Save_bill_section_left nhd">
                                    <h2>Save</h2>
                                    <h3>on your Bills!</h3>
                                    <p></p>
                                </div>
                                <div class="Save_bill_section_right nhd">
                                    <ul>
                                        <li><a href="#" style="cursor: default;">Turn off appliances when not in use</a></li>
                                        <li><a href="#" style="cursor: default;">Budget your Bill to avoid excessive usage</a></li>
                                        <li><a href="#" style="cursor: default;">Register for Efficiency Programs</a></li>
                                    </ul>
                                    <div class="button" style="display: none">
                                        <a href="#">Demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <div class="nav_login_section" id="device">
                                <ul>
                                    <li><a href="#" id="drp-dwn">
                                        <img src="images/icon_account.png" class="gen_theme" />
                                        <img src="images/icon_account_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_LoginToViewAccount"><i globalize="ML_MYACCOUNT_h1_Myaccount"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_h1_Myaccount") %></i>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_LoginToViewAccount") %>
                                            
                                        </span></a>


                                        <div class="login-sector">
                                            <div class="login-sector-close"></div>
                                            <div class="signin-section">

                                                <h3 globalize="ML_Default_Btn_Login"><%= CustomerPortal.Translator.T("ML_Default_Btn_Login") %></h3>
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1" globalize="ML_LOGIN_Lbl_UserID" style="font-size: 14px;"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_UserID") %></label>
                                                    <asp:TextBox ID="txtLogin" globalize="ML_Default_Txt_Login" runat="server" placeholder="User ID" class="form-control" title="User ID" value="" size="30" MaxLength="30" AutoCompleteType="None" > </asp:TextBox>
                                                    <Ajax:FilteredTextBoxExtender ID="FtbtxtLogin" runat="server" TargetControlID="txtLogin" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></Ajax:FilteredTextBoxExtender>
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" style="display: none;" />
                                                    <label for="exampleInputEmail1" globalize="ML_LOGIN_Lbl_Password" style="font-size: 14px;"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_Password") %></label>
                                                    <asp:TextBox globalize="ML_Default_Txt_Password" ID="txtpwd" runat="server" placeholder="Password" TextMode="Password" class="form-control" title="Password" value="" size="30" MaxLength="16" AutoCompleteType="None"></asp:TextBox>

                                                    <Ajax:FilteredTextBoxExtender ID="FilteredTextBoxExtender1" runat="server" TargetControlID="txtpwd" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom"></Ajax:FilteredTextBoxExtender>
                                                </div>
                                                <div class="form-group checkbox">
                                                    <label globalize="ML_LOGIN_Lbl_RememberMe"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_RememberMe") %></label>
                                                    <input type="checkbox" name="1" value="1" id="rememberMeCheck" globalize="ML_Default_Chk_rememberme" title="" runat="server" style="top: 2px; position: relative; margin-left: 16px; margin-top: 0px;">
                                                </div>
                                                <div class="form-group">
                                                    <%--<input ID="btnlogin" type="button"  Text="Sign In" value="Sign In"   Class="btn btn-sub btn-sub1" globalize="ML_LOGIN_BTN_Login" title="Sign In" clientidmode="Static" runat="server" />--%>
                                                    <asp:Button ID="btnlogin" runat="server" Text='<%# CustomerPortal.Translator.T("ML_LOGIN_BTN_Login") %>' Class="btn btn-sub btn-sub1" globalize="ML_LOGIN_BTN_Login" title="Sign In" ClientIDMode="Static" OnClientClick="return false" Style="height: 28px;padding-top: 3px;" />
                                                </div>

                                                <asp:Label ID="lblMsg" runat="server" Text="" ForeColor="Red" globalize="ML_Default_Lbl_Message"></asp:Label>
                                                <span id="errorMsg" style="float: right;"></span>

                                            </div>
                                            <div class="register-section">

                                                <div class="form-group">
                                                    <a href="LoginSupport.aspx?id=2" globalize="ML_LoginSupport_hyprlnk_username"><%= CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_username") %></a>
                                                </div>
                                                <div class="form-group">
                                                    <a href="LoginSupport.aspx?id=1" globalize="ML_LoginSupport_hyprlnk_password"><%= CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_password") %></a>
                                                </div>
                                                <div class="form-group">
                                                    <a href="LoginSupport.aspx?id=3" globalize="ML_LoginSupport_hyprlnk_signing_in"><%= CustomerPortal.Translator.T("ML_LoginSupport_hyprlnk_signing_in") %></a>
                                                </div>

                                                <div class="forget_name">
                                                    <div class="form-group form_group_1">
                                                        <h6 globalize="ML_LOGIN_Lbl_DontHav_Register" style="color: #a5a5a5; white-space: nowrap;"><%= CustomerPortal.Translator.T("ML_LOGIN_Lbl_DontHav_Register") %></h6>
                                                    </div>
                                                    <div class="form-group form-groups">
                                                        <button type="button" class="btn btn-sub btn-sub2" globalize="ML_Register_Btn_SignUp" onclick="location.href='CustomerRegistration.aspx';" style="font-size: 16px !important; margin-top: 6px; padding-top: 6px !important; height: 28px;"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Outages) %>"><a href="outeroutage.aspx">
                                        <img src="images/icon_outage.png" class="gen_theme" />
                                        <img src="images/icon_outage_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_ViewAndReportOutages"><i globalize="ML_OUTAGE_Navigation_Outage"><%= CustomerPortal.Translator.T("ML_OUTAGE_Navigation_Outage") %></i>
                                            <%-- View and report outages in your area--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_ViewAndReportOutages") %>
                                        </span></a></li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPayBill) %>"><a style="cursor: pointer;" onclick="PaymentOption()">
                                   
                                        <img src="images/icon_paybill.png" class="gen_theme" />
                                        <img src="images/icon_paybill_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_PayUtilityBill"><i globalize="ML_DASHBOARD_Lbl_PayBill"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_PayBill") %></i>
                                            <%-- Pay your utility bill in one click--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_PayUtilityBill") %>
                                        </span></a></li>

                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Efficiency) %>" id="liEff"><a href="OuterSavingTips.aspx">
                                        <img src="images/icon_savings.png" class="gen_theme" />
                                        <img src="images/icon_savings_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_LearnTips"><i globalize="ML_ENERGY_EFFICIENCY_Navigation_EnergyEffeciency"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Navigation_EnergyEffeciency") %></i>
                                            <%-- Learn tips to save on your next bill--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_LearnTips") %>
                                        </span></a></li>
                                    <%if (CustomerPortal.SessionAccessor.scmexpress == "0")
                                      {%>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Services) %>"><a href="outer-service-request.aspx">
                                        <img src="images/icon_service_request.png" class="gen_theme" />
                                        <img src="images/icon_service_request_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_TurnOnOffService"><i globalize="ML_Msg_ServiceTurnOnOff"><%= CustomerPortal.Translator.T("ML_Msg_ServiceTurnOnOff") %></i>
                                            <%-- Turn on/off your service--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_TurnOnOffService") %>
                                        </span></a></li>
                                    <% }%>
                                    <li runat="server" id="liConnectMe"><a href="contact-us-connect-me.aspx" id="drp-dwn-1">
                                        <img src="images/icon_contact.png" class="gen_theme" />
                                        <img src="images/icon_contact_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_GetInTouch"><i globalize="ML_CONNECTMEMaster_Anchor_ContactUs"><%= CustomerPortal.Translator.T("ML_CONNECTMEMaster_Anchor_ContactUs") %></i>
                                            <%--  Get in touch with us--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_GetInTouch") %>
                                        </span></a>

                                    </li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeReportWaterWaste) %>"><a href="contact-us-connect-me.aspx?pid=t">
                                        <img src="images/report_water_waste.png" class="gen_theme" />
                                        <img src="images/report_water_waste_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_ReportWaterLeak"><i globalize="ML_ConnectMe_dropdn_txt_WaterWaste"><%= CustomerPortal.Translator.T("ML_ConnectMe_dropdn_txt_WaterWaste") %></i>
                                            <%-- Report Water Leak, Water Waste and Water Theft--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_ReportWaterLeak") %>
                                        </span></a></li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingPaymentLocation) %>"><a href="PaymentLocationPreLogin.aspx">
                                        <img src="images/icon-pre-payment.png" class="gen_theme" />
                                        <img src="images/icon-pre-payment_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_ViewPaymentLocations"><i globalize="ML_PayLocation_PayLocation"><%= CustomerPortal.Translator.T("ML_PayLocation_PayLocation") %></i>
                                            <%--View Payment Locations--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_ViewPaymentLocations") %>
                                        </span></a></li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Help) %>"><a href="help_html/index.html" target="_blank" title="" globalize="ML_Default_hyprlnk_Help">
                                        <img src="images/icon_help.png" class="gen_theme">
                                        <img src="images/icon_help_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_ViewFAQ"><i globalize="ML_SideMenu_Navigation_Help"><%= CustomerPortal.Translator.T("ML_SideMenu_Navigation_Help") %></i>
                                            <%--View frequently asked questions--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_ViewFAQ") %>
                                        </span></a></li>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.FAQ) %>"><a href="FAQ.aspx?LanguageCode=<%=CustomerPortal.SessionAccessor.LanguageCode %>" target="_blank" title="" globalize="ML_SideMenu_FAQ">
                                        <img src="images/icon_help.png" class="gen_theme">
                                        <img src="images/icon_help_M.png" class="modern_theme" />
                                        <span globalize="ML_Default_Msg_ViewFAQ"><i globalize="ML_Login_Lbl_Faq"><%= CustomerPortal.Translator.T("ML_Login_Lbl_Faq") %></i>

                                            <%--  View frequently asked questions--%>
                                            <%= CustomerPortal.Translator.T("ML_Default_Msg_ViewFAQ") %>
                                        </span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Div Starts here for popup -->
        <div class="bg">
            <div class="about_my_home" id="RegisteredHomeContainer" style="height: 500px;">
                <h1 globalize="ML_AboutMyHome_Header_AboutMyHome"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Header_AboutMyHome") %></h1>
                <span class="close_icon"><a href="#">
                    <img src="images/cross-icon.png" id="BtnCloseAboutMyHome"></a></span>


                <div class="mid_area_home" id="mid_area_home">
                    <div class="upper_text" globalize="ML_AboutMyHome_Lbl_Description"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_Description") %></div>
                    <div class="left_content_area_home useraddress"  globalize="ML_Master_li_Select_Address"><%= CustomerPortal.Translator.T("ML_Master_li_Select_Address") %></div>
                    <div class="right_content_area_home useraddress">
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
                        <div class="left_content_area_home" globalize="ML_Default_Lbl_SolarPanels"><%= CustomerPortal.Translator.T("ML_Default_Lbl_SolarPanels") %>  </div>
                        <div class="right_content_area_home">
                            <select id="ddlSolarPanel" style="float: left;">
                                <option value="1" globalize="ML_Default_DDL_No"><%= CustomerPortal.Translator.T("ML_Default_DDL_No") %></option>
                                <option value="2" globalize="ML_EFFICIENCY_Yes"><%= CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %></option>
                            </select>
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                <i class="circle help link icon custome_help_popup" id="elm1" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; Solar panel is designed to absorb the sun's rays as a source of energy for generating electricity or heating &lt;/span&gt">
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>

                                    <div class="help_conte_box" id="help_conte_box1">
                                        <div class="arrow_brdr"></div>
                                        <span id="solarhelplink">solar</span>
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
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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



                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Electricvehicle"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_Electricvehicle") %> </span></div>
                        <div class="right_content_area_home inpt_space_style">
                            <asp:RadioButton GroupName="e" Checked="true" Style="margin-left: 00px;" runat="server" globalize="ML_EFFICIENCY_Yes" Text='<%# CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %>' ID="rdbEVyes" />
                            &nbsp;&nbsp;<asp:RadioButton GroupName="e" runat="server" globalize="ML_CustomerRegistration_rdb_Poolno" Text='<%# CustomerPortal.Translator.T("ML_CustomerRegistration_rdb_Poolno") %>' ID="rdbEVNo" />
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                <i class="circle help link icon" id="elm3" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarElectric'&gt; Electric Vehicle is propelled by electric motors, using electrical energy stored in rechargeable batteries. &lt;/span&gt">
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofbathrooms"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofbathrooms") %></span></div>
                        <div class="right_content_area_home">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_NoOfBathromms" MaxLength="3" mandatory="0" placeholder="Number of bathrooms" type="text" ID="txtNumberofbathrooms" onkeypress="return IsNumeric1(event,this);"
                                title="Number of bathrooms" />
                        </div>

                        <div class="clearfix"></div>


                        <div class="left_content_area_home" style="padding-top: 5px; display:none;"><span globalize="ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp") %></span></div>
                        <div class="right_content_area_home" style="display:none;">
                            <asp:TextBox runat="server" globalize="ML_Default_Txt_numberofhigheffiencyapp" MaxLength="3" mandatory="0" placeholder="Number of high-efficiency appliances" type="text" ID="txtNumberofhigheffapp" onkeypress="return IsNumeric1(event,this);"
                                title="Number of high-efficiency appliances" />
                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                <i class="circle help link icon" id="elm4" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarEfficiency'&gt; Energy efficient appliances use less electricity to achieve the same level of performance to similar models with the same size or capacity. e. Add up the square feet of each section to find the total square footage of the house. Round your total off to the nearest square foot. &lt;/span&gt">
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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
                                    <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    <div class="help_conte_box" id="help_conte_box7">
                                        <div class="arrow_brdr"></div>
                                        <span id="speciallandscapeAreahelplink"></span>
                                    </div>
                                </i>
                        </div>


                        <div class="clearfix"></div>


                        <div class="left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_pool"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_pool") %></span></div>
                        <div class="right_content_area_home inpt_space_style">
                            <asp:RadioButton GroupName="a" Checked="true" runat="server" globalize="ML_EFFICIENCY_Yes" Text='<%# CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %>' ID="rdbPoolYes" />
                            <asp:RadioButton GroupName="a" runat="server" Style="margin-left: 20px" globalize="ML_CustomerRegistration_rdb_PoolNo" Text="No" ID="rdbPoolNo" />
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
                    <img src="images/cross-icon.png" id="BtnCloseAboutMyBusiness"></a></span>


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
                       <div style="clear:both"></div>
                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_OfficeArea"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_OfficeArea") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Office Area" mandatory="0" ID="txtOfficeArea" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="Office Area" />
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_LotSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_LotSize") %></div>
                    <div class="right_content_area_home">
                        <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Lot Size" mandatory="0" ID="txtBusinnessLotSize" MaxLength="8" onkeypress="return IsNumeric(event);"
                            title="Lot Size" />
                          <span class="main container" style="width: 20px !important;display: inline-block; margin: 0 0 0 -15px">

                                    <i class="circle help link icon" id="LotSizehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LotSize") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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
                         <span class="main container" style="width: 20px !important; display: inline-block; margin: 0 0 0 -15px">

                                    <i class="circle help link icon" id="Landscapehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LandscapeAreaSize") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>


                    <div style="display:none;" class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasSolarPanels"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasSolarPanels") %></div>
                    <div class="right_content_area_home" style="display:none;">
                        <asp:RadioButtonList ID="rdbSolarPanels" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div>


                    <div style="display:none;" class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_GeneratingCapacity"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_GeneratingCapacity") %></div>
                    <div class="right_content_area_home" style="display:none;">
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
                        <asp:RadioButtonList ID="rdbHVACSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal" Style="display: inline-block;">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                          <span class="main container" style="width: 20px !important; display: inline-block; margin: 0 0 0 -15px">

                                    <i class="circle help link icon" id="HVAChelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_HVACSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>

                    <div style="display:none;" class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasElectricalSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasElectricalSystem") %></div>
                    <div class="right_content_area_home" style="display:none;">
                        <asp:RadioButtonList ID="rdbElectricalSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal" Style="display: inline-block;">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                         <span class="main container" style="width: 20px !important; display: inline-block; margin: 0 0 0 -15px">

                                    <i class="circle help link icon" id="Electricalhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ElectricalSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>


                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbPlumingWaterSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal" Style="display: inline-block;">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                         <span class="main container" style="width: 20px !important; display: inline-block; margin: 0 0 0 -15px">

                                    <i class="circle help link icon" id="PlumingWaterhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_PlumbingWaterSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                    </div>

                    <div class="left_content_area_home" globalize="ML_AboutMyBusiness_Lbl_HasServerRoom"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasServerRoom") %></div>
                    <div class="right_content_area_home">
                        <asp:RadioButtonList ID="rdbServerRoom" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal" Style="display: inline-block;">
                            <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                        <span class="main container" style="width: 20px !important; display: inline-block; margin: 0 0 0 -15px">
                                    <i class="circle help link icon" id="ServerRoomhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ServerRoom") %> &lt;/span&gt">
                                        <span style="margin-left: 10px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
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
                    <input class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' id="btnSaveBusinessInfo" type="button" globalize="ML_Default_Button_Submit">
                    <input class="cancel-button" style="float: left; margin-right: 5px;" value='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' id="btnClearSaveBusinessInfo" type="button" globalize="ML_Common_Navigation_cancel">
                </div>
            </div>
        </div>

        <!-- footer starts  -->

        <uc2:Footer runat="server" ID="Footer" />
        <!-- footer ends  -->
        <script src="js/bootstrap.min.js"></script>
        <asp:HiddenField ID="hdnflag" runat="server" />
        <asp:HiddenField ID="hdnCustomerid" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnIsValid" runat="server" ClientIDMode="Static" />
        <div id="page_loader">

            <span globalize="ML_Msg_ValidateLogin_useridpasswordinvalid" id="ML_Default_Lbl_Message" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_ValidateLogin_useridpasswordinvalid") %></span>
            <span globalize="ML_CustomerRegistration_Msg_UserId" id="ML_Default_Lbl_UserID" style="display: none"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Msg_UserId") %></span>
            <span globalize="ML_Login_Span_ErrMsg_Password" id="ML_Default_Lbl_Password" style="display: none"><%= CustomerPortal.Translator.T("ML_Login_Span_ErrMsg_Password") %></span>
            <span id="solarPanelMessage" style="display: none;" globalize="ML_Icon_Msg_SolanPanels"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SolanPanels") %></span>
            <span id="homeSizeMessage" style="display: none;" globalize="ML_Icon_Msg_HomeSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_HomeSize") %></span>
            <span id="electricVehicleMessage" style="display: none;" globalize="ML_Icon_Msg_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_Icon_Msg_ElectricVehicle") %></span>
            <span id="noOfAppliancesMessage" style="display: none;" globalize="ML_Icon_Msg_NoOfAppliances"><%= CustomerPortal.Translator.T("ML_Icon_Msg_NoOfAppliances") %></span>
            <span id="lotSizeMessage" style="display: none;" globalize="ML_Icon_Msg_LotSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LotSize") %></span>
            <span id="landscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_LandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LandscapArea") %></span>
            <span id="specialLandscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_SpecialLandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SpecialLandscapArea") %></span>
            <span id="spinvalidkey" style="display: none;" globalize="ML_AblouMyHome_InvalidYear"><%= CustomerPortal.Translator.T("ML_AblouMyHome_InvalidYear") %></span>
            <span id="loginvalidationmessage" style="display:none"><%= CustomerPortal.Translator.T("ML_Login_Span_EnterIDPassword") %></span>
            <span id="idErrMsg" style="display: none;" globalize="ML_LoginSupport_ErrorMsg"></span>
            <span id="uservalidation" style="display:none"><%= CustomerPortal.Translator.T("ML_Login_Span_EnterIDPassword") %></span>
        </div>

    </form>
</body>
</html>
