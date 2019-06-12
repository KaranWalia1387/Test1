<%@ Page Title="Smart Light" Language="C#" MasterPageFile="SmartHomeMaster.Master" AutoEventWireup="true"
    CodeBehind="smart-light.aspx.cs" Inherits="CustomerPortal.light" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartLight") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartLight")%>

    <input type="hidden" class="activeli_list" value="sh" />
    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div class="right_content_box_1">
        <div class="dish_washer_heading">
            <img src="images/smart-light-image.png" globalize="ML_SmartLight_img_SL">
            <p>
                <b><span globalize="ML_SmartLight_b_Lights"><%= CustomerPortal.Translator.T("ML_SmartLight_b_Lights") %> </span><span>|</span> </b>
                <asp:Label ID="lblModel" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_Lbl_Model"></asp:Label>
                <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" OnClientClick="return false;" globalize="ML_SmartHome_ErrMsg_OffOn" />
            </p>

        </div>
        <div class="smart_dish_box" id="smart_dish">
            <div class="Left_Bill_area smart_time_days time_right_border">
                <b class="time_b" globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
                <b class="on_b" globalize="ML_SmartCAS_b_On"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_On") %></b>
                <b class="off_b" globalize="ML_SmartJac_b_Off"><%= CustomerPortal.Translator.T("ML_SmartJac_b_Off") %></b>
                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Mondy" />
                    <p>
                        <asp:Label AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label>
                    </p>

                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtMondayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_MndyOn" placeholder="Time"></asp:TextBox>

                </div>

                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtMondaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_MndySleep" placeholder="Time"></asp:TextBox>
           
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Tuesdy" />
                    <p>
                        <asp:Label AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtTuesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_tuesdyOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtTuesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_tuesdySleep" placeholder="Time"></asp:TextBox>
               
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Weddy" />
                    <p>
                        <asp:Label AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>'></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtWednesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txt_WeddyOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtWednesdaysleep" ClientIDMode="Static"  runat="server" globalize="ML_SmartLight_txt_WeddySleep" placeholder="Time"></asp:TextBox>
                
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkThursday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Thudy" />
                    <p>
                        <asp:Label AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtThursdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_ThudyOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtThursdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_ThudySleep" placeholder="Time"></asp:TextBox>
         
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Fridy" />
                    <p>
                        <asp:Label AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy" title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>'></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtFridayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_Fon" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtFridaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_FSleep" placeholder="Time"></asp:TextBox>
               
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkSaturday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Satdy" />
                    <p>
                        <asp:Label AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSaturdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbxSatOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtSaturdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_SatSleep" placeholder="Time"></asp:TextBox>
            
                </div>
                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_chkbx_Sundy" />
                    <p>
                        <asp:Label AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' ></asp:Label>
                    </p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSundayon" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_SundayOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtSundaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartLight_txtbx_SundaySleep" placeholder="Time"></asp:TextBox>
                 
                </div>
            </div>
            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_SmartLight_b_Bright"><%= CustomerPortal.Translator.T("ML_SmartLight_b_Bright") %></b>
                <div class="type_of_wash">
                    <p><span globalize="ML_SmartLight_txtbx_L">
                        <asp:TextBox ID="txtlight" ClientIDMode="Static" runat="server" Style="text-align: right;"  placeholder="Brightness"></asp:TextBox></span>
                        <asp:TextBox ID="txt_SliderVal" ClientIDMode="Static" runat="server" CssClass="TempBox" Style="width: 37px; padding-top: 2px; text-align: center;" ReadOnly="true" globalize="ML_SmartLight_txtbx_bx" placeholder="Temperature" /><span style="color: Black; padding: 0px;" globalize="ML_SmartLight_Percent">%</span>
                    </p>
                </div>
                <ajaxToolkit:SliderExtender ID="SliderExtender1" Length="300" runat="server" BehaviorID="txtlight" TargetControlID="txtlight" Minimum="0" Maximum="100" BoundControlID="txt_SliderVal" />
            </div>
        </div>

    </div>
    <div class="setting_save_box">
        <input type="button" id="btnSaveChanges" ClientIDMode="Static" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' globalize="ML_SmartCAS_btn_Save" />
    </div>
    <asp:Label ID="lblMsg" ClientIDMode="Static" runat="server"></asp:Label>
   <%-- <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />--%>
   <%-- <script src="js/Translator.js" type="text/javascript"></script>
    <script type="text/javascript" src="include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.position.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.timepicker.js?v=0.3.1"></script>
    <script type="text/javascript" src="apis.google.com/js/plusone.js"></script>--%>

   
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_Light" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Light") %></span>
</asp:Content>
