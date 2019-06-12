<%@ Page Title="Settings" Language="C#" MasterPageFile="MyAccount.master" AutoEventWireup="true"
    CodeBehind="Settings.aspx.cs" Inherits="CustomerPortal.MyAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">

    <%: System.Web.Optimization.Styles.Render("~/Content/cssMyAccountSettings") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyAccountSettings")%>
    <link rel="stylesheet/less" type="text/css" href="//semantic-ui.com/src/definitions/elements/container.less">

    <script type="text/javascript">
        $(document).ready(function () {
            $('#txtPayment').val($('#ddlPayment option:selected').text());
            $('.IsRequired').on("click", function () {
                <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.WaterDollar, false) == false)
                   { %>
                if ($("#chkGallon").prop("checked") == false && $("#chkHCF").prop("checked") == false) {
                    toastr.warning('Please select atleast 1 water unit.'); return false;
                }
                <% }%>
            });

            if ($('#ddlPayment option:selected').val() == "0") {
                $('#Budget').hide(); $('#PaperLessBill').hide(); $('#BudgetLimit').hide();
            }
            else
            {
                $('#Budget').show(); $('#PaperLessBill').show(); $('#BudgetLimit').show();
            }

        });
    </script>

    <style type="text/css">
        .help_icon_img.help_icon_img{
            margin-top: 6px;
        }
        /*Code Changed to Prevent issue caused on loading of page which was distorted*/
        .txtDiv {
            display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccounbtSettingsText,true,"inline-block")%> !important;
        }

        .divIVR {
            display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsIVR,true,"inline-block")%> !important;
        }

        .divPush {
            display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsPushNotification,true,"inline-block")%> !important;
        }

        .divEmail {
            display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsEmail,true,"inline-block")%> !important;
        }

        .div_disclaimer {
            display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccounbtSettingsText,true,"inline-block")%> !important;
        }
        /*Width returned from C# Code*/
        .my_account_table .profile-details.my_acc_tbl table td {
            width: <%=CustomerPortal.MyAccount.returnWidth()%>% !important;
        }
        #myModal_terms {
           z-index: 99999999 !important;
        }
        .w2ui-tag {
    z-index: 999999 !important;
}
div#w2ui-tag-txtConfirmPass {
    z-index: 999999 !important;
}
    </style>
    <input type="hidden" class="activeli_list" value="myaccount" />
    <div class="right_content_box" style="position: relative;">
        <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
            <div class="inner-right-sub acc_inner_box_1" style="border: 0px;">
                <div id="rowpowerplan" runat="server" class="profile-details ">
                    <div class="selector-text" globalize="ML_SETTING_Lbl_PowerPlan"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_PowerPlan") %> </div>
                    <div class="power-plan-selector">
                        <asp:Label ID="lblpowerplan" runat="server" Text=""></asp:Label>
                    </div>
                </div>
                <div id="rowwaterplan" runat="server" class="profile-details water_plain">
                    <div class="selector-text" globalize="ML_Setting_Lbl_WaterPlan"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_WaterPlan") %>  </div>
                    <div class="radio-button-box">
                        <asp:Label ID="lblwaterplan" runat="server" Text="" Style="margin-top: 0px;"></asp:Label>
                    </div>
                </div>
                <div id="rowgasplan" runat="server" class="profile-details water_plain ">
                    <div class="selector-text" globalize="ML_Setting_Lbl_GasPlan"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_GasPlan") %> </div>
                    <div class="radio-button-box">
                        <asp:Label ID="lblgasplan" runat="server" Text="" Style="margin-top: 0px;"></asp:Label>
                    </div>
                </div>

                <div id="rowevplan" runat="server" class="divevplan profile-details water_plain">
                    <div id="divevplan" runat="server" class="selector-text" globalize="ML_SETTING_Lbl_ElectricVehiclePlan"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_ElectricVehiclePlan") %></div>
                    <div class="power-plan-selector">
                        <asp:Label ID="lblevplan" runat="server" Text=""></asp:Label>
                    </div>
                </div>

                <div class="profile-details gray-box_rem_marg" id="divconfigusage" runat="server" style="display:none;">

                    <div class="selector-text" globalize="ML_SETTING_Lbl_ConfigureUsage" style="padding-top: 5px;"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_ConfigureUsage") %> </div>
                    <div class="power-plan-selector">
                        <asp:DropDownList ID="ddlusage" runat="server" globalize="ML_MYACCONT_ddl_Usage" title="Configure Usage" ClientIDMode="Static">
                            <asp:ListItem Text="Usage" Value="0"></asp:ListItem>
                            <asp:ListItem Text="Net Usage" Value="1"></asp:ListItem>
                        </asp:DropDownList>
                    </div>

                    <span class="main container" style="width: 20px !important; float: left; margin: 0">

                        <i class="circle help link icon" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  <%= CustomerPortal.Translator.T("ML_MyAccount_Msg_HelpIcon") %>">
                            <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                        </i>
                    </span>

                </div>
                <div class="profile-details gray-box_rem_marg" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsConfigPayment) %>">
                    <div class="selector-text" globalize="ML_SETTING_Lbl_ConfigurePayment" style="padding-top: 5px;"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_ConfigurePayment") %> </div>
                    <div class="power-plan-selector">
                        <asp:TextBox ID="txtPayment" runat="server" ClientIDMode="Static" ReadOnly="true" Style="width: 100%;"></asp:TextBox>
                      
                    </div>

                    <span style="width: 20px !important; float: left; margin: 6px 0px 0px 29px"><a href="#configure_payment" data-target="#configure_payment" class="confi_flat_icon" data-toggle="modal">
                        <img src="images/edit.png" /></a></span>


                </div>

                <div class="profile-details  gray-box_rem_marg" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsLanguage) %>">
                    <div class="selector-text" globalize="ML_Setting_Lbl_Lang" style="padding-top: 5px;"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_Lang") %> </div>
                    <div class="radio-button-box" style="width: 35%;">
                        <asp:DropDownList ID="ddlLanguage" globalize="ML_MYACCOUNT_ddl_Language" title="Language" runat="server" ClientIDMode="Static">
                            <asp:ListItem Text="English" Value="1"></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="profile-details  gray-box_rem_marg">
                    <div class="selector-text" globalize="ML_Setting_Lbl_TimeZone" style="padding-top: 5px;"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_TimeZone") %> </div>
                    <div class="radio-button-box mand_txt" id="TimeZone" style="width: 35%;">
                        <asp:DropDownList ID="ddlTimeZone" globalize="ML_MYACCOUNT_ddl_TimeZone" mandatory="1" title="TimeZone" runat="server" ClientIDMode="Static">
                           <%-- <asp:ListItem Text="Time Zone" Value="1"></asp:ListItem>--%>
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="profile-details  gray-box_rem_marg" id="ChkWaterUnit" clientidmode="Static" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsConfigUsage) %>">
                    <div class="selector-text" globalize="ML_Msg_SelectWaterUnit" style="padding-top: 5px;"><%= CustomerPortal.Translator.T("ML_Msg_SelectWaterUnit") %> </div>
                    <div class="radio-button-box" style="width: 35%;">
                        <asp:CheckBox ID="chkGallon" title="Gallon" runat="server" Text="" CssClass="IsRequired" ClientIDMode="Static" Style="float: left; margin-top: 7px;" />
                        <strong><span globalize="ML_MYACCOUNT_chkbx_WaterUnit_Gallon"><%= CustomerPortal.Translator.T("ML_MYACCOUNT_chkbx_WaterUnit_Gallon") %></span></strong>
                        <asp:CheckBox ID="chkHCF" runat="server" Text="HCF" CssClass="IsRequired" globalize="ML_MYACCOUNT_chkbx_WaterUnit" title="HCF" ClientIDMode="Static" Style="margin-left: 10px;"></asp:CheckBox>
                    </div>
                </div>
                <div class="profile-details gray-box_rem_marg" style="margin-bottom: 4px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsHomeDashboard) %>">
                    <div class="selector-text" globalize="ML_MyAccount_div_HomeOption" style="padding-top: 19px;"><%= CustomerPortal.Translator.T("ML_MyAccount_div_HomeOption") %> </div>
                    <div class="radio-button-box radio-button-box-mob" style="width: 35%;">
                        <asp:RadioButtonList ID="rd_DashboardOption" runat="server" ClientIDMode="Static" RepeatDirection="Horizontal">
                            <asp:ListItem Text="<a href='Dashboard.aspx' target='_blank' onclick='return Dashboard(this);'><span globalize='ML_MyAccount_div_HomeOption'><img src='images/icon_home_1.png' /></span></a>" Value="1" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="<a href='DashboardCustom.aspx' target='_blank' onclick='return DashboardCustom(this);'><span globalize='ML_MyAccount_div_HomeOption'><img src='images/icon_home_2.png' /></span></a>" Value="2"></asp:ListItem>
                            <asp:ListItem Text="<a href='DashboardCustom3_3.aspx' target='_blank' onclick='return DashboardCustom3_3(this);'><span globalize='ML_MyAccount_div_HomeOption'><img src='images/icon_home_3.png' /></span></a>" Value="3"></asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="my_account_table" id="NotificationData" runat="server" clientidmode="Static">
                    <div class="profile-details gray-box my_acc_tbl my_acc_tbl_1" style="padding: 0px;">
                        <table>
                            <tr>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_notif_setting.svg" />
                                            <span class="head_icon_flat icon_notifications"></span>
                                        </span><span globalize="ML_HeaderMenu_span_Notific"> <%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Notific") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkTextAll" runat="server" CssClass="txtAll" />
                                        <strong><span globalize="ML_HeaderMenu_span_Text"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Text") %></span></strong>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkEmailAll" runat="server" CssClass="emailAll" />
                                        <strong><span globalize="ML_MakeOTP_txt_EmailId"><%= CustomerPortal.Translator.T("ML_MakeOTP_txt_EmailId") %></span></strong>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box" style="width: 80px;">
                                        <asp:CheckBox ID="chkIvrAll" runat="server" CssClass="ivrAll" />
                                        <strong><span globalize="ML_HeaderMenu_span_IVR"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_IVR") %></span></strong>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkPushAll" runat="server" CssClass="pushAll" />
                                        <strong class="push_noti_box"><span globalize="ML_SETTING_Lbl_Push_Notification"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Push_Notification") %></span></strong>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" style="padding: 0px;" id="outage">
                        <table>
                            <tr>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_outage_setting.svg" />
                                            <span class="head_icon_flat icon_notif-outage"></span>
                                        </span> <span globalize="ML_Setting_Lbl_Outage"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_Outage") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkOutageText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                       
                                        <asp:TextBox ID="TxtOutageText" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" runat="server" value="" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkOutageEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtOutageEmail" runat="server" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" value="" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkOutageIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtOutageIvr" runat="server" MaxLength="14" value="" ClientIDMode="static" globalize="ML_MYACCOUNT_txt_Outage_Mob" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkOutagePush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" style="padding: 0px;" id="billing" clientidmode="Static">
                        <table>
                            <tr>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_billing_setting.svg" />
                                            <span class="head_icon_flat icon_billing"></span>
                                        </span> <span id="billingTxt" globalize="ML_Title_Billing"><%= CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment=="Prepaid"?"ML_MyAccount_Dropdn_Txt_Prepay": "ML_Title_Billing") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBillingText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBillingText" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" runat="server" value="" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBillingEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBillingEmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBillingIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBillingIvr" runat="server" globalize="ML_MYACCOUNT_txt_Outage_Mob" value="" ClientIDMode="static" CssClass="ivr" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBillingPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>

                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" id="Budget" clientidmode="Static">
                        <table>
                            <tr>
                                <%--Changes w.r.t. Bug ID: 5775--%>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_budget_setting.svg" />
                                            <span class="head_icon_flat icon_thermolist"></span>
                                        </span> <span globalize="ML_SETTING_Lbl_Budget"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Budget") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBudgetText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBudgetText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBudgetEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBudgetEmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBudgetIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtBudgetIvr" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkBudgetPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" id="divDR" runat="server" style="padding: 0px;">
                        <table>
                            <tr>

                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon-demand-response.svg" style="width: 16px;" />
                                             <span class="head_icon_flat icon_rate-analysis"></span>
                                        </span> <span globalize="ML_Settings_Span_DemandResp" class="demand_spanish"><%= CustomerPortal.Translator.T("ML_Settings_Span_DemandResp") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkDRText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtDRText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" MaxLength="14" ClientIDMode="static" CssClass="txt" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkDREmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtDREmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkDRIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtDRIvr" runat="server" value="" MaxLength="14" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkDRPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" style="padding: 0px;" id="connectme">
                        <table>
                            <tr>
                                <%--Changes w.r.t. Bug ID: 5775--%>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_connectme_sidebar.svg" />
                                             <span class="head_icon_flat icon_connectme"></span>

                                        </span> <span globalize="ML_Footer_a_ConnectMe"><%= CustomerPortal.Translator.T("ML_Footer_a_ConnectMe") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkConnectText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtConnectText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkConnectEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtConnectEmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkConnectIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtConnectIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkConnectPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" style="padding: 0px;" id="service">
                        <table>
                            <tr>
                                <%--Changes w.r.t. Bug ID: 5775--%>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/icon_service_sidebar.svg" style="margin-left: -4px; width: 22px;" />
                                            <span class="head_icon_flat icon_services"></span>
                                        </span> <span globalize="ML_SERVICE_Navigation_Title"><%= CustomerPortal.Translator.T("ML_SERVICE_Navigation_Title") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkServiceText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtServiceText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkServiceEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtServiceEmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkServiceIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtServiceIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkServicePush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="profile-details my_acc_tbl my_acc_tbl_1" runat="server" style="padding: 0px;" id="leakalert">
                        <table>
                            <tr>
                                <%--Changes w.r.t. Bug ID: 5775--%>
                                <td class="img_title1">
                                    <div class="selector-text">
                                        <span class="img_align_1">
                                            <img src="images/leak_alret_setting.png" />
                                             <span class="head_icon_flat icon_notif-leakalert"></span>

                                        </span> <span globalize="ML_Setting_Span_LeakAlert"><%= CustomerPortal.Translator.T("ML_Setting_Span_LeakAlert") %></span>
                                    </div>
                                </td>
                                <td class="txtDiv">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkLeakAlertText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtLeakAlertText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divEmail">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkLeakAlertEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtLeakAlertEmail" runat="server" value="" MaxLength="50" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divIVR">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkLeakAlertIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                        <asp:TextBox ID="TxtLeakAlertIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" Style="display: none"></asp:TextBox>
                                    </div>
                                </td>
                                <td class="divPush">
                                    <div class="radio-button-box">
                                        <asp:CheckBox ID="chkLeakAlertPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr class="my_account_divider ">
                    <%--<div class="profile-details" id="BudgetLimit" style="padding: 0px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingBudgetMyBill) %>">--%>
                    <div class="profile-details" runat="server" id="BudgetLimit" >
                        <table class="budgetlimit">
                            <tr>
                                <%--Changes w.r.t. Bug ID: 5775--%>
                                <td>
                                    <div class="selector-text" globalize="ML_Setting_Lbl_BdgtNotifyLimit" style="padding-left: 16px;"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_BdgtNotifyLimit") %> </div>
                                </td>
                                <td>
                                    <div class="radio-button-box budget_limit_box" style="padding-top: 5px;">
                                        <asp:CheckBox ID="chkbudget50" globalize="ML_MYACCOUNT_chkbx_budgelimit" title="50% Budget" runat="server" Text="50%" ClientIDMode="Static" />
                                    </div>
                                </td>
                                <td>
                                    <div class="radio-button-box" style="padding-top: 5px;">
                                        <asp:CheckBox ID="chkbudget75" globalize="ML_MYACCOUNT_chkbx_budgelimit" title="75% Budget" runat="server" Text="75%" ClientIDMode="Static" />
                                    </div>
                                </td>
                                <td>
                                    <div class="radio-button-box" style="padding-top: 5px;">
                                        <asp:CheckBox ID="chkbudget90" globalize="ML_MYACCOUNT_chkbx_budgelimit" title="90% Budget" runat="server" Text="90%" ClientIDMode="Static" />
                                    </div>
                                </td>
                                <td>
                                    <div class="radio-button-box" style="padding-top: 5px;">
                                        <asp:TextBox ID="txtAmount" runat="server" Text="" globalize="ML_MYACCOUNT_chkbx_budgelimit" title="Budge Limit" CssClass="input-phone" MaxLength="3" Style="padding: 5px 1px; width: 24%; background-color: white;" onkeypress="javascript:return(IsNumeric(event))" ClientIDMode="Static"></asp:TextBox><span style="margin-left: 3px; line-height: 28px; margin-top: 0;">%</span>

                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="profile-details  gray-box_rem_marg" id="PaperLessBill" runat="server" clientidmode="Static">
                    <div class="selector-text" globalize="ML_SETTING_Lbl_Paperless_Bill" style="padding-top: 4px;"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Paperless_Bill") %> </div>
                    <div class="radio-button-box">
                        <%--   <asp:RadioButtonList ID="EbillBtn" runat="server" RepeatDirection="Horizontal" CssClass="RadioBtnList" ClientIDMode="Static" Style="position: relative; top: 3px;">

		                    <asp:ListItem Value="1"><span globalize="ML_MyAccount_span_ON" style="margin:0;">On</span></asp:ListItem>
		                    <asp:ListItem Value="0" Selected="True"><span globalize="ML_MyAccount_span_OFF" style="margin:0;">Off</span></asp:ListItem>

	                        style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment=="Prepaid"?"none":CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsPaperlessBill) %>"

	                    </asp:RadioButtonList>--%>

	                    <asp:CheckBox ID="EbillBtn" runat="server" ClientIDMode="Static" style="margin-top:5px;"/>
                    </div>
                    
                    <span class="main container" style="width: 20px !important; float: left; margin: -3px 0 0 -18px;">
                        <i class="circle help link icon icon_e-bill" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  <%= CustomerPortal.Translator.T("ML_MyAccount_Msg_HelpIcon1") %>">
                            <span style="margin-left: -2px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                        </i>
                </div>

                <div class="profile-details gray-box_rem_marg" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountQuiteHours) %>">
                    <div class="selector-text" style="padding-top: 2px;">
                        <span globalize="ML_Setting_Lbl_QuietHours" style="width: auto;"><%= CustomerPortal.Translator.T("ML_Setting_Lbl_QuietHours") %></span>
                        <asp:CheckBox ID="chkEnablequitehours" globalize="ML_MYACCOUNT_chkbx_quietHrs" title="Quiet Hours" runat="server" ClientIDMode="Static" CssClass="asp_check" Style="width: auto; margin-top: 2px;" />

                    </div>
                    <div id="quitehours" class="quitehours" runat="server" style="display: none">
                        <div class="Quiet_Hours_from service_fill_box" style="margin-right: 7%;">
                            <i globalize="ML_Settings_Lbl_From"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_From") %></i>
                            <span class="schedule_time">
                                <asp:DropDownList ID="ddlFrmHours" runat="server" globalize="ML_MYACCOUNT_ddl_Hours" title="Hours" ClientIDMode="Static">
                                    <asp:ListItem Text="1" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="2" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="3" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="4" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="5" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="7" Value="7"></asp:ListItem>
                                    <asp:ListItem Text="8" Value="8"></asp:ListItem>
                                    <asp:ListItem Text="9" Value="9"></asp:ListItem>
                                    <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                    <asp:ListItem Text="11" Value="11"></asp:ListItem>
                                    <asp:ListItem Text="12" Value="12"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlFrmMin" runat="server" globalize="ML_MYACCOUNT_ddl_Minutes" title="Minutes" ClientIDMode="Static">
                                    <asp:ListItem Text="00" Value="00"></asp:ListItem>
                                    <asp:ListItem Text="15" Value="15"></asp:ListItem>
                                    <asp:ListItem Text="30" Value="30"></asp:ListItem>
                                    <asp:ListItem Text="45" Value="45"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlFrmAmpm" runat="server" globalize="ML_MYACCOUNT_ddl_AM_PM" title="AM/PM" ClientIDMode="Static">
                                    <asp:ListItem Text="AM" Value="AM"></asp:ListItem>
                                    <asp:ListItem Text="PM" Value="PM" Selected="True"></asp:ListItem>
                                </asp:DropDownList>
                            </span>
                        </div>
                        <div class="Quiet_Hours_to service_fill_box">
                            <i globalize="ML_Settings_Lbl_To" style="padding-left: 16px !important;"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_To") %></i>
                            <span class="schedule_time">
                                <asp:DropDownList ID="ddlToHours" runat="server" globalize="ML_MYACCOUNT_ddlTo_Hours" title="Hours" ClientIDMode="Static">
                                    <asp:ListItem Text="1" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="2" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="3" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="4" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="5" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="7" Value="7"></asp:ListItem>
                                    <asp:ListItem Text="8" Value="8"></asp:ListItem>
                                    <asp:ListItem Text="9" Value="9"></asp:ListItem>
                                    <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                    <asp:ListItem Text="11" Value="11"></asp:ListItem>
                                    <asp:ListItem Text="12" Value="12"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlToMin" runat="server" globalize="ML_MYACCOUNT_ddlTo_Minutes" title="Minutes" ClientIDMode="Static">
                                    <asp:ListItem Text="00" Value="00"></asp:ListItem>
                                    <asp:ListItem Text="15" Value="15"></asp:ListItem>
                                    <asp:ListItem Text="30" Value="30"></asp:ListItem>
                                    <asp:ListItem Text="45" Value="45"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlToAmpm" runat="server" globalize="ML_MYACCOUNT_ddlTo_AM_PM" title="AM/PM" ClientIDMode="Static">
                                    <asp:ListItem Text="AM" Value="AM"></asp:ListItem>
                                    <asp:ListItem Text="PM" Value="PM" Selected="True"></asp:ListItem>
                                </asp:DropDownList>
                            </span>
                        </div>
                    </div>
                    <div id="quitehoursdisable" class="quitehoursdisable" runat="server" style="display: none">
                        <div class="Quiet_Hours_from service_fill_box" style="margin-right: 7%;">
                            <i globalize="ML_Settings_Lbl_From"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_From") %></i>
                            <span class="schedule_time">
                                <asp:DropDownList ID="DropDownList1" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>

                                </asp:DropDownList>
                                <asp:DropDownList ID="DropDownList2" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>

                                </asp:DropDownList>
                                <asp:DropDownList ID="DropDownList3" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>
                                </asp:DropDownList>
                            </span>
                        </div>
                        <div class="Quiet_Hours_to service_fill_box">
                            <i globalize="ML_Settings_Lbl_To" style="padding-left: 20px;"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_To") %></i>
                            <span class="schedule_time">
                                <asp:DropDownList ID="DropDownList4" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="DropDownList5" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="DropDownList6" runat="server" ClientIDMode="Static" Enabled="false">
                                    <asp:ListItem Text="--" Value="--"></asp:ListItem>
                                </asp:DropDownList>
                            </span>
                        </div>
                    </div>
                </div>


             <%--   <div class=" profile-details water_plain inner-right-sub  gray-box_rem_marg" id="evList" runat="server" style='border: 0px;'>
                    <div id="divtextEV" runat="server" class="selector-text" globalize="ML_MyAccount_div_Electric_Vehicle" style="padding-top: 2px;"><%= CustomerPortal.Translator.T("ML_MyAccount_div_Electric_Vehicle")%> </div>

                    <div class="radio-button-box electric_vehicle_box">
                        <asp:CheckBoxList ID="chklstelectricvehicle" globalize="ML_MYACCOUNT_chkbx_Electric_Vehicle" title="" runat="server" RepeatDirection="Horizontal">
                        </asp:CheckBoxList>
                    </div>
                </div>--%>
            </div>
            <div id="electricvechiclelist" runat="server">
            </div>

        </div>
        <div class="setting_save_box">
            <div class="buttons_area">
                <div class="div_disclaimer" style="float: left; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.MyAccountSettingsDisclaimer) %>!important">
                    <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red; float: left;" inputtype="" validatemessage="Disclaimer" title="Disclaimer"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer")%></span>
                        <span style="color: red;">:</span></b>
                    <span class="cls_disclaimer" globalize="ML_MyAccount_Text_Disclaimer"><%= CustomerPortal.Translator.T("ML_MyAccount_Text_Disclaimer")%></span>
                </div>
                <input type="button" id="btnSave" value='<%# CustomerPortal.Translator.T("ML_MyAccount_btn_Save") %>' class="submit-button" globalize="ML_MyAccount_btn_Save" />
            </div>
        </div>
    </div>



    <%-- Configure Paymnet Popup --%>


    <div id="configure_payment" class="modal fade" role="dialog">
        <div class="modal-dialog modal-md">
            <!-- Modal content-->
            <div class="modal-content editMain modal-lg">
                <div class="modal-header">
                    <button type="button" class="closepopup" data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>

                    <h4 class="modal-title"><%# CustomerPortal.Translator.T("ML_SETTING_Lbl_ConfigurePayment") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">
                    <div class="registration-form" style="z-index: 9999999; margin: 9px;">

                        <div class="row">

                            <div class="col-md-5 col-sm-4 col-xs-12 text_spanish_box"><i><%# CustomerPortal.Translator.T("ML_Billing_Payment_Type") %></i></div>
                            <div class="col-md-7 col-sm-8 col-xs-12">
                                <asp:DropDownList ID="ddlPayment" runat="server" globalize="ML_MYACCOUNT_ddl_Payment" title="Configure Payment" ClientIDMode="Static">
                                   <%-- <asp:ListItem Text="Pay as you go"  Value="0"></asp:ListItem>
                                    <asp:ListItem Text="Monthly Billing" Value="1"></asp:ListItem>--%>
                                </asp:DropDownList>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="modal-footer footertextes">

                    <p><%# CustomerPortal.Translator.T("ML_Setting_advanceofserviceuse") %></p>
                    <p>
                      
                        <input type="checkbox" id="chkTerm"  style="float: left; margin: 2px 3px 0 0;"/>
                        <%--<span style="font-size: 12px"><%= CustomerPortal.Translator.T("ML_Msg_IAgreeTo") %>--%> <a href="#" data-toggle="modal" data-target="#myModal_terms"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_AgreeTerms") %></a>
                      <%--  </span>--%>
                        <input type="button" class="submit-button frightbtn" id="btnPaymentType"  value='<%# CustomerPortal.Translator.T("ML_MyAccount_btn_Save") %>' />
                    </p>
                </div>


            </div>

        </div>
    </div>

    <div id="myModal_terms" class="modal fade">
        <div class="modal-dialog" style="margin-top: 4%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png"></button>
                    <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></h4>
                </div>
                <div class="modal-body" style="height: 430px; overflow: auto;padding:0px;">
                    <div class="text_align_box" style="padding: 0 0px 5px;">
                        <asp:Literal ID="ltrlTermsAndCondition" runat="server"></asp:Literal>
                    </div>
                </div>
                <div class="modal-footer" style="display: none;">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                </div>
            </div>
        </div>
    </div>

    <asp:HiddenField ID="HdnPhoneNo" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="HdnEmailId" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnScmExpress" ClientIDMode="Static" runat="server" />
    <span id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Settings")%></span>
    <span id="updatedMessage" style="display: none"><%= CustomerPortal.Translator.T("ML_Setting_Msg_SuccesfulProfileUpdate")%></span>
    <span  id="failedMessage" style="display: none"><%= CustomerPortal.Translator.T("ML_My Account_Span_ErrMsg_Save_Unsuccessful")%></span>
    <span  id="QuietHours" style="display: none"><%= CustomerPortal.Translator.T("ML_My Account_Span_ErrMsg_QuietHours")%></span>
    <span  id="ProfileUpdate" style="display: none"><%= CustomerPortal.Translator.T("ML_Setting_Msg_SuccesfulProfileUpdate")%></span>
    <span id="OptionUsage" style="display: none"><%= CustomerPortal.Translator.T("ML_USAGE")%></span>
    <span id="OptionNetUsage" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_NetUsage")%></span>
    <span id="OptionPPay" style="display: none"><%= CustomerPortal.Translator.T("ML_MyAccount_Dropdn_Txt_Prepay")%></span>
    <span id="OptionMPay" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_MonthlyPayment")%></span>
    <span id="LanguageEN" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_LanguageEnglish")%></span>
    <span  id="LanguageES" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_LanguageSpanish")%></span>
    <span id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo")%></span>
    <span id="TNC" style="display: none"><%= CustomerPortal.Translator.T("ML_Setting_EnterTermsandConditions")%></span>
    <span  id="billtext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Billing")%></span>
    <span  id="BudgetLimitVal" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_BudgetLimit")%></span>

      <asp:HiddenField ID="Hdn_LanguageDropdown" ClientIDMode="Static" runat="server" />
     <asp:HiddenField ID="Hdn_LanguageDropdown_onload" ClientIDMode="Static" runat="server" />
</asp:Content>


