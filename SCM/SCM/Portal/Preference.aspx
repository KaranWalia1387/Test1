<%@ Page Title="Marketing Preferences" Language="C#" MasterPageFile="MyAccount.master" AutoEventWireup="true" CodeBehind="Preference.aspx.cs" Inherits="CustomerPortal.Preference" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssMyAccountPreference") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyAccountPreference")%>

    <script type="text/javascript">
        $(document).ready(function () {
            //BUG ID 20791 START
            document.getElementById("btnSave").accessKey = "A";
            $('.right_content_box').keypress(function (e) {
                if (e.keyCode == 13) {
                    $('#btnSave').click();
                    e.preventDefault();
                }
            })
            //BUG ID 20791 END
            $(".marketing_pref").addClass('active');
        });
    </script>

    <script type="text/javascript">
        function refresh() {
            //var zoom = $('#zoom');
            var device = $('#devices');
            //zoom.text(window.detectZoom.zoom().toFixed(2));
            //device.text(window.detectZoom.device().toFixed(2));
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
        $(window).load(function () {
            refresh();
            $(window).on('resize', refresh);
            $('.top_conte_box_mob> div > p')[0].title = "";
            $('.top_conte_box_mob> div > p')[1].title = "";
            $('.top_conte_box_mob> div > h3')[0].title = "";
        });
    </script>
    <input type="hidden" class="activeli_list" value="myaccount" />


    <div class="right_content_box" style="position: relative;">
        <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
            <img src="images/mrkt_pre_banner.jpg" style="max-width: 100%;" />
            <div style="padding: 0px 15px 10px; text-align: justify;">
                <p globalize="ML_MyAccount_Marketing_Msg_Text2" class="mng_acc_sele"><%= CustomerPortal.Translator.T("ML_MyAccount_Marketing_Msg_Text2") %>.</p>
                <p globalize="ML_MyAccount_Marketing_Msg_Text1" title="" style="line-height: 26px;">
                    <%= CustomerPortal.Translator.T("ML_MyAccount_Marketing_Msg_Text1") %>.
                </p>


                <h3 style="font-weight: bold; font-size: 14px; color: #53565A; display: none;" globalize="ML_MyAccount_Marketing_Msg_EmailNL"><%= CustomerPortal.Translator.T("ML_MyAccount_Marketing_Msg_EmailNL") %></h3>
                <table width="100%" class="marketing_tbl">
                    <tbody>
                        <tr>
                            <td>
                                <div class="checkbox">
                                    <asp:CheckBox ID="chkID1" runat="server" ClientIDMode="Static" /><label id="lbl_ID1" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer"><asp:Label ID="lblID1" runat="server" ClientIDMode="Static"></asp:Label>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div class="checkbox">
                                    <asp:CheckBox ID="chkID2" runat="server" ClientIDMode="Static" /><label id="lbl_ID2" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID2" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox">
                                    <asp:CheckBox ID="chkID3" runat="server" ClientIDMode="Static" /><label id="lbl_ID3" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID3" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>
                            </td>
                            <td>
                                <div class="checkbox" style="display:none;">
                                    <asp:CheckBox ID="chkID4" runat="server" ClientIDMode="Static" /><label id="lbl_ID4" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID4" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>
                                 <div class="checkbox">
                                    <asp:CheckBox ID="chkID6" runat="server" ClientIDMode="Static" /><label id="lbl_ID6" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID6" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="checkbox">
                                    <asp:CheckBox ID="chkID5" runat="server" ClientIDMode="Static" />
                                    <label id="lbl_ID5" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID5" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>
                            </td>
                            <td>
                               <%-- <div class="checkbox">
                                    <asp:CheckBox ID="chkID6" runat="server" ClientIDMode="Static" /><label id="lbl_ID6" globalize="ML_MYACCOUNT_chkbx_Marketing_Prefer">
                                        <asp:Label ID="lblID6" runat="server" ClientIDMode="Static"></asp:Label></label>
                                </div>--%>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="my_account_table" style="display: none">
                <div class="profile-details gray-box" style="padding: 0px;">
                    <table>
                        <tr>
                            <td>
                                <div class="selector-text">
                                    <span class="img_align_1"></span><span globalize="ML_HeaderMenu_span_Notific"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Notific") %></span>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkTextAll" runat="server" CssClass="txtAll" />
                                    <strong><span globalize="ML_HeaderMenu_span_Text"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_Text") %></span></strong>
                                </div>
                            </td>
                            <td style="display: none">
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkEmailAll" runat="server" CssClass="emailAll" />
                                    <strong><span globalize="ML_MyAccount_chkbx_Email"><%= CustomerPortal.Translator.T("ML_MyAccount_chkbx_Email") %></span></strong>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkPushAll" runat="server" CssClass="pushAll" />
                                    <strong><span globalize="ML_SETTING_Lbl_Push_Notification"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Push_Notification") %></span></strong>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box" style="width: 80px;">
                                    <asp:CheckBox ID="chkIvrAll" runat="server" CssClass="ivrAll" />
                                    <strong><span globalize="ML_HeaderMenu_span_IVR"><%= CustomerPortal.Translator.T("ML_HeaderMenu_span_IVR") %></span></strong>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class=" profile-details" style="padding: 0px;">
                    <table>
                        <tr>
                            <td>
                                <div class="selector-text">
                                    <span class="img_align_1"></span><span>Newsletters</span>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkProgramText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td style="display: none">
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkProgramEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkProgramPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box" style="width: 80px;">
                                    <asp:CheckBox ID="chkProgramIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="profile-details" style="padding: 0px;">
                    <table>
                        <tr>
                            <td>
                                <div class="selector-text">
                                    <span class="img_align_1"></span><span>Rebate</span>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkRebateText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td style="display: none">
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkRebateEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkRebatePush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box" style="width: 80px;">
                                    <asp:CheckBox ID="chkRebateIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="profile-details" style="padding: 0px;">
                    <table>
                        <tr>
                            <td>
                                <div class="selector-text">
                                    <span class="img_align_1"></span><span>Energy Savings Toolkits </span>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkShoppingText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td style="display: none">
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkShoppingEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkShoppingPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box" style="width: 80px;">
                                    <asp:CheckBox ID="chkShoppingIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class=" profile-details" style="padding: 0px;">
                    <table>
                        <tr>
                            <td>
                                <div class="selector-text">
                                    <span class="img_align_1"></span><span>Community Benefit Programs </span>
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkTravellingText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td style="display: none">
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkTravellingEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box">
                                    <asp:CheckBox ID="chkTravellingPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                </div>
                            </td>
                            <td>
                                <div class="radio-button-box" style="width: 80px;">
                                    <asp:CheckBox ID="chkTravellingIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="setting_save_box">
            <div class="buttons_area" style="margin: 0px 0px;">
                <input type="button" id="btnSave" value='<%# CustomerPortal.Translator.T("ML_MyAccount_btn_Save") %>' class="submit-button" globalize="ML_MyAccount_btn_Save" />
            </div>

        </div>
    </div>
    <span globalize="ML_MyAccount_Marketing_Msg_SaveSuccess" style="display: none" id="SaveSuccess"><%= CustomerPortal.Translator.T("ML_MyAccount_Marketing_Msg_SaveSuccess") %></span>
    <span globalize="ML_MyAccount_Marketing_Msg_SaveFail" style="display: none" id="SaveFail"><%= CustomerPortal.Translator.T("ML_MyAccount_Marketing_Msg_SaveFail") %></span>

</asp:Content>
