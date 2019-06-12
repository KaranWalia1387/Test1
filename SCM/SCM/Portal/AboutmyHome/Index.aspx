<%@ Page Language="C#" AutoEventWireup="true" Title="About My Home"
    CodeBehind="Index.aspx.cs" MasterPageFile="~/Efficiency.master"
    Inherits="CustomerPortal.Index" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead"
    runat="server">
    <title>:: SCM - Home ::</title>
    <%-- <link href="css/Index.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" type="text/css">
    <script type="text/jscript" src="js/Index.js"></script>--%>
    <%-- Bundling of js and css --%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssIndex") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsIndex")%>
    <style type="text/css">
        .inner_mid_section select, .button_list_section_right input[type="text"] {
            width: 90%;
        }

        .button_list_section_right select {
            margin: 0px 0px 0 0;
        }

        .inner_mid_section .required {
            display: inline-block;
        }

        .button_list_section_right span {
            display: inline-block;
        }

        .button_list_section_right input[type="text"] {
            margin: 0px 0px 0 0;
        }
    </style>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody"
    runat="server">
    <div class="right_content_box">
        <div class="bot_scroll">
            <div class="wrap_container">
                <div class="top_section" style="display: none">
                    <div class="top_section_left">
                        <h1 globalize="ML_Index_Msg_Chancetowin"><%= CustomerPortal.Translator.T("ML_Index_Msg_Chancetowin") %>
                        </h1>
                        <h2><i globalize="ML_Index_Msg_$1000"><%= CustomerPortal.Translator.T("ML_Index_Msg_$1000") %></i>
                            <span globalize="ML_Index_Msg_CompleteQuestions"><%= CustomerPortal.Translator.T("ML_Index_Msg_CompleteQuestions") %></span>
                        </h2>
                        <h3 globalize="ML_Index_Msg_Winners"><%= CustomerPortal.Translator.T("ML_Index_Msg_Winners") %>
                        </h3>
                        <div class="get_stareted">
                            <a href="#get" name="get" globalize="ML_Index_Msg_GetStarted">
                                <%= CustomerPortal.Translator.T("ML_Index_Msg_GetStarted") %></a>
                        </div>
                    </div>
                    <div class="top_section_right">
                        <img src="images/top_banner.png" alt="SCM Banner" />
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="content_section" name="get" id="divAboutmyHome">
                    <h1 globalize="ML_AboutMyHome_Lbl_HomeType"><%= CustomerPortal.Translator.T("ML_AboutMyHome_Lbl_HomeType") %>
                    </h1>

                    <div class="button_list_section">
                        <ul class="homeTp">
                        </ul>

                    </div>

                    <div class="clearfix"></div>
                    <h1>Floors</h1>

                    <div class="button_list_section">
                        <ul>
                            <li globalize="ML_Index_Msg_Basement"><%= CustomerPortal.Translator.T("ML_Index_Msg_Basement") %>
                            </li>
                        </ul>
                        <div class="button_list_section_right">
                            <select class="floorsTp" globalize="ML_Err_ValidFloor" mandatory="1"
                                id="ddlfloors">
                                <option value="0">-Select-</option>
                            </select>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <h1 globalize="ML_Default_Txt_NoOfResidentsVal"><%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfResidentsVal") %>
                    </h1>

                    <div class="button_list_section">
                        <ul>
                            <li globalize="ML_Index_Msg_LiveIn"><%= CustomerPortal.Translator.T("ML_Index_Msg_LiveIn") %>
                            </li>
                        </ul>
                        <div class="button_list_section_right">
                            <select class="occuTp" globalize="ML_Err_ValidOccpnt" mandatory="1"
                                id="ddloccuTp">
                                <option value="0">-Select-</option>
                            </select>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <h1 globalize="ML_Index_Msg_Size"><%= CustomerPortal.Translator.T("ML_Index_Msg_Size") %>
                    </h1>

                    <div class="button_list_section">
                        <ul>
                            <li globalize="ML_Index_Msg_EnterSize"><%= CustomerPortal.Translator.T("ML_Index_Msg_EnterSize") %>
                            </li>
                        </ul>
                        <div class="button_list_section_right">
                            <input type="text" class="ardfnd" maxlength="5" globalize="ML_Err_ValidSzeSqreFeet"
                                mandatory="1" id="txtardfnd" />
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <h1 globalize="ML_Default_Txt_Yearbuilt"><%= CustomerPortal.Translator.T("ML_Default_Txt_Yearbuilt") %>
                    </h1>

                    <div class="button_list_section">
                        <ul>
                            <li globalize="ML_Index_Msg_EnterYear"><%= CustomerPortal.Translator.T("ML_Index_Msg_EnterYear") %>
                            </li>
                        </ul>
                        <div class="button_list_section_right">
                            <input type="text" class="yrbld" maxlength="4" globalize="ML_Err_ValidYearBuilt"
                                mandatory="1" id="txtyrbld" />
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <h1 globalize="ML_CONNECTME_Lbl_Location"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Location") %>
                    </h1>

                    <div class="button_list_section">
                        <ul>
                            <li globalize="ML_Index_Msg_ZipCode"><%= CustomerPortal.Translator.T("ML_Index_Msg_ZipCode") %>
                            </li>
                        </ul>
                        <div class="button_list_section_right">
                            <input type="text" class="loc" disabled="disabled" maxlength="6"
                                globalize="ML_SrvcRqust_txtbx_ZipCode1" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="continue_button setting_save_box">
            <a id="btnSubmitData" href="#" globalize="ML_CentralAirSystem_Button_Continue">
                <%= CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Continue") %></a>
        </div>
    </div>
    <div class="clearfix"></div>


</asp:Content>
