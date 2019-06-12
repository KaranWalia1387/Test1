<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OuterHeader.ascx.cs" Inherits="CustomerPortal.OuterHeader" %>
<%--<%@ Register Src="~/UserControls/ChatControl.ascx" TagPrefix="uc1" TagName="ChatControl" %>--%>
<%@ Register Src="LanguageDropdown.ascx" TagPrefix="uc2" TagName="LanguageDrpdwn" %>

<style type="text/css">
    @media (min-width: 1200px) {
        .container {
            width: 1200px !important;
        }
    }

     @media (min-width:1600px) and (max-width:3500px) {
            #habla_panel_div#habla_panel_div {
                overflow: hidden !important;
            }

            #habla_both_div#habla_both_div {
                position: relative !important;
                right: -90px !important;
                background-size: 68% !important;
            }
        }
    @media (min-width: 320px) and (max-width:767px) {
        .logo img {
            max-width: 100%;
        }

        .back_button {
            display: inline-block;
            left: 8px;
            margin: 0;
            position: absolute;
            top: 12px;
        }

            .back_button img {
                max-width: 100%;
            }

        .conect {
            display: none;
        }

        footer .footer-logo {
            float: none !important;
            text-align: center !important;
        }

        footer .copy-right {
            text-align: center !important;
        }

        .iphone {
            text-align: center !important;
        }

        .Save_bill_section {
            height: 87px;
        }

            .Save_bill_section .Save_bill_section_right ul {
                list-style: outside none none;
                margin: 13px 7px 0;
                padding: 0;
            }

        .overlay .container, .overlay .row, .overlay .col-lg-5, .overlay .col-md-5, .overlay .col-sm-5, .overlay .col-xs-12, .overlay .col-lg-7, .overlay .col-md-7, .overlay .col-sm-7 {
            height: 59%;
        }

        .Save_bill_section .Save_bill_section_left {
            width: 45%;
        }

        .Save_bill_section .Save_bill_section_right {
            width: 55%;
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            .nav_login_section {
                background: #f4f4f4 none repeat scroll 0 0;
                float: right;
                height: auto !important;
                margin-top: 4px;
                overflow: visible;
                padding: 0;
                position: absolute;
                right: 0;
                width: 100%;
                z-index: 999;
                padding-bottom: 90px !important;
            }
        }
    }

    @media (min-width: 414px) and (max-width:640px) {

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            .nav_login_section {
                background: #f4f4f4 none repeat scroll 0 0;
                float: right;
                height: auto !important;
                margin-top: 4px;
                overflow: visible;
                padding: 0;
                position: absolute;
                right: 0;
                width: 100%;
                z-index: 999;
                padding-bottom: 90px;
            }
        }
    }


    .row {
        margin-left: -15px;
        margin-right: -15px;
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
        margin-top: 16px;
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

    @media (min-width: 1520px) and (max-width:3640px) {
        .inner_mid_section {
            height: 86%;
        }
    }

    .rightF {
        float: right;
    }

    .left {
        float: left;
    }

  

    .mR15 {
        margin-right: 15px;
    }
    .langPan {
    margin-top:23px;
    }
    /* Added by prashant */
    .filter {
    background: #fff url("images/arrowdown.png") no-repeat scroll 95% 50%;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin: 0 10px 0 0;
    overflow: hidden;
    padding: 0;
    width:100%;
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
    outline:0;
    min-width:70px;
    color:#888888;
}
    .filter > select::-ms-expand {
    display: none;
}
    /* Added by prashant */

/* Language drop down css */

    #ddlLanguage_msdd {
        width:92px !important;
        outline: none;
        cursor:pointer;
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
    }
    #ddlLanguage_child > ul {
     margin-top: 24px;
    background: #fff;
    border: 1px solid #ccc;
    list-style: none;
    padding-left: 0px;
    width: 104px;
    font-size: 12px;
    margin-left: -8px;
    }
    #ddlLanguage_child > ul li {
           cursor: pointer;
    border-bottom: 1px solid #ccc;
    padding: 6px 7px 6px 7px;
    line-height: normal;
    }
    #ddlLanguage_child > ul li > img {
            width: 22px;
            padding-right: 7px;
            float: left;

    }
    #ddlLanguage_child > ul li:hover {
            background: #f9f9f9;
    }
    /* End Language drop down css */

    /*.langPan{
        display:none;
    }*/
    
</style>
<script type="text/javascript" src="js/ImageDropdown.js"></script>
 <script src="js/Language_Dropdown.js"></script>
<%--<script src="js/Language_Dropdown.js"></script>--%>
<script type="text/javascript">
    $(document).ready(function () {
        $(".sidebar_toggle").click(function () {
            $(".nav_left").slideToggle();
        });

        <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook, false) == false && CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter, false) == false && linkedinurl.Trim() == "")
           { %>
        $('.connect_with_us').attr('style', 'display: none');
        <% }%>
       <%else
           {%> $('.connect_with_us').attr('style', 'display: block');
        <%}%>

       

       

        //**************************************
      
        //**************************************

    });
    //Code to bind Flag to Drop Down
    $(document).ready(function (e) {
        try {
        //    $("#ddlLanguage").msDropDown();
        } catch (e) {
            console.log(e.message);
        }
    });
</script>
<script src="js/jquery.disable.autocomplete.js" type="text/javascript"></script>
<link   href='<%#string.Format("{0}/css/style-EN-fontstyle.css",CustomerPortal.SessionAccessor.BaseUrl)%>'  rel="stylesheet" runat="server" id="linkCSSFlat" Visible="True"/>
  <%if (CustomerPortal.SessionAccessor.ModernStyleOption) {%>
<link id="languagecss" href="<%#string.Format("{1}/css/{0}",((CustomerPortal.SessionAccessor.LanguageCode=="ES")?"style-ES-fontstyle.css":(CustomerPortal.SessionAccessor.LanguageCode=="FR")?"style-FR-fontstyle.css":""),CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" />
 <% } %>
<header>
    <div class="container">
        <div class="row">
             
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <span class="back_button"><a href="default.aspx">
                    <img src="images/back_button.png" /></a></span>
                <div class="logo">
                    <a href="#" style="cursor: default;">
                        <img src="images/scm_logo.png" alt="SCM Logo" /></a>
                </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <div class="rightF mR15 langPan">

                    <%--<div class="conect filter" runat="server" id="LanguageDDL">
                        <asp:DropDownList ID="ddlLanguage" globalize="ML_MYACCOUNT_ddl_Language" title="Language" runat="server" ClientIDMode="Static" AutoPostBack="True" OnSelectedIndexChanged="ddlLanguage_SelectedIndexChanged">
                            
                        </asp:DropDownList>
                   
                    </div>--%>
                       <%--*************************************--%>

                       <%--  <dl id="sample" class="dropdown">
        <dt class="preData">
       
        </dt>
        <dd>
            <ul class="dp_language">

            </ul>
        </dd>
    </dl>--%>
                    <uc2:LanguageDrpdwn runat="server" ID="LanguageDrpdwn" />

                        <%--   *************************************--%>
                   
                </div>
                <div style="float: right;" class="conect">
                    <div class="register-section header-top-social">

                        <%if (fburl.Trim() != "" || twitterurl.Trim() != "" || linkedinurl.Trim() != "" || youtubeurl.Trim() !="")
                          {%>
                      <%--  <div class="connect_with_us" globalize="ML_Default_Lbl_Connect" style="display: none"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Connect") %>:</div>--%>
                        <%}%>
                        <div class="social-section-area">
                            <div class="component-1">
                                <%if (fburl.Trim() != "") {%>
                                    <a href="<%=fburl %>" target="_blank" class="icon-123 icon-mono facebook" title="Click to visit City of Healdsburg Facebook Page" globalize="ML_PL_Lnk_fb" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeFacebook,true,"") %>">facebook</a>
                                <%}%>
                                <%if (twitterurl.Trim() != "") {%>
                                    <a href="<%=twitterurl %>" target="_blank" class="icon-123 icon-mono twitter" title="Click to visit City of Healdsburg Twitter Page" globalize="ML_PL_LNk_twitter" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeTwitter,true,"") %>">twitter</a>
                                <%}%>
                               
                                <%if (linkedinurl.Trim() != "") {%>
                                    <a href="<%=linkedinurl %>" target="_blank" class="icon-123 icon-mono linkedin-1" title="Click to visit City of Healdsburg LinkedIn Page" globalize="ML_PL_Lnk_LinkedIn">LinkedIn</a>
                                <%}%>
                                 <%if (youtubeurl.Trim() != "") {%>
                                    <a href="<%=youtubeurl %>" target="_blank" class="icon-123 icon-mono youtube" title="Click to visit City of Healdsburg Youtube Page" globalize="ML_PL_Lnk_YouTube" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ConnectMeYoutube,true,"") %>">YouTube</a>
                                <%}%>
                            </div>

                        </div>
                    </div>
                    <div class="back_to_login" id="rmclass">
                        <a href="Default.aspx"> <%--<%= CustomerPortal.Translator.T("ML_OuterHeader_txt_BackToLogin") %>--%></a>
                    </div>
                </div>
                    </div>


        </div>
    </div>
    <span globalize="ML_Validate_Msg" id="ValidErrorMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Validate_Msg") %> </span>
    <span globalize="ML_Registration_Span_ErrMsg_Valid-Password" id="ML_Registration_Span_ErrMsg_Valid-Password" style="display: none"><%= CustomerPortal.Translator.T("ML_Registration_Span_ErrMsg_Valid-Password") %></span>
    <span globalize="ML_OnetimePayment_Msg_CreditCard" id="ML_OnetimePayment_Msg_CreditCard" style="display: none"><%= CustomerPortal.Translator.T("ML_OnetimePayment_Msg_CreditCard") %></span>
    <input id="hdnCommonUrl" type="hidden" value="<%=CustomerPortal.SessionAccessor.BaseUrl%>" />
    <span globalize="ML_Msg_PasswordCheck_Reasonable" id="ML_Msg_PasswordCheck_Reasonable" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_PasswordCheck_Reasonable") %> </span>
    <span globalize="ML_Msg_PasswordCheck_Strong" id="ML_Msg_PasswordCheck_Strong" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_PasswordCheck_Strong") %> </span>
    <span globalize="ML_Msg_PasswordCheck_VeryStrong" id="ML_Msg_PasswordCheck_VeryStrong" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_PasswordCheck_VeryStrong") %> </span>
    <span globalize="ML_MyAccount_PayemntInfo_InvalidPassword" id="ML_MyAccount_PayemntInfo_InvalidPassword" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_PayemntInfo_InvalidPassword") %></span>
    <span globalize="ML_passwordmeter_lbl_show" id="ML_passwordmeter_lbl_show" style="display: none"><%= CustomerPortal.Translator.T("ML_passwordmeter_lbl_show") %></span>
    <span globalize="ML_passwordmeter_lbl_hide" id="ML_passwordmeter_lbl_hide" style="display: none"><%= CustomerPortal.Translator.T("ML_passwordmeter_lbl_hide") %></span>
<span globalize="ML_Err_ValidUsrID" id="ML_Err_ValidUsrID" style="display: none"><%= CustomerPortal.Translator.T("ML_Err_ValidUsrID") %></span>
     <span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>
    <span globalize="ML_Msg_ServiceAccountZeroNotAllowed" id="ML_Msg_ServiceAccountZeroNotAllowed" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_ServiceAccountZeroNotAllowed") %></span>

</header>

<%--<uc1:ChatControl runat="server" ID="ChatControl" />--%>
