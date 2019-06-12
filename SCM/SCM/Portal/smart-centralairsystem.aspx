<%@ Page Title="Smart Central Air System" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-centralairsystem.aspx.cs" Inherits="CustomerPortal.centralairsystem" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
       <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartCentralAirSystem") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartCentralAirSystem")%>
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
  

  

    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1">
        <div class="dish_washer_heading">
            <img src="images/smart-central-image.png" globalize="ML_SmartCAS_img_SC">
            <p style="padding-top: 20px;">
                <b style="float: left;"><span globalize="ML_SmartCAS_b_CA"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_CA") %> </span>  <span>|</span> </b>
                <asp:Label ID="lblModel" runat="server" globalize="ML_SmartCAS_Lbl_Model" Style="float: left;"></asp:Label>
                <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" globalize="ML_SmartHome_ErrMsg_OffOn" CssClass="on_off_btn" OnClientClick="return false;" Style="float: left;" />
            </p>
        </div>
        <div class="smart_dish_box" id="smart_dish">
            <div class="Left_Bill_area smart_time_days time_right_border">
                <b class="time_b" globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
                <b class="on_b" globalize="ML_SmartCAS_b_On"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_On") %></b>
                <b class="off_b" globalize="ML_SmartTv_b_Sleep"><%= CustomerPortal.Translator.T("ML_SmartTv_b_Sleep") %></b>
                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_chkbx_Mndy" />
                    <p>
                        <asp:Label ID="Label1" AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtMondayon" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_MndyOn" placeholder="Time"></asp:TextBox>
                </div>

                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtMondaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_MndySleep" placeholder="Time"></asp:TextBox>
              
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkTuesday" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_chkbx_Tudy" />
                    <p>
                        <asp:Label ID="Label2" AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtTuesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_Tudy" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtTuesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_TudySleep" placeholder="Time"></asp:TextBox>
                  
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkWednesday" runat="server"  ClientIDMode="Static" globalize="ML_SmartCAS_chkbx_Weddy" />
                    <p>
                        <asp:Label ID="Label3" AssociatedControlID="chkWednesday"  runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" TITLE='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtWednesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_Weddy" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtWednesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_WeddySleep" placeholder="Time"></asp:TextBox>
                  
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkThursday" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_chkbx_Thurdy" />
                    <p>
                        <asp:Label ID="Label4" AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtThursdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_ThurdyOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtThursdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_ThurdySleep" placeholder="Time"></asp:TextBox>
                  
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_" />
                    <p>
                        <asp:Label ID="Label5" AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_") %>' globalize="ML_SmartCAS_" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box" globalize="ML_SmartCAS_">
                    <asp:TextBox ID="txtFridayon" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_txtbx_FridyOn" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtFridaysleep" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_txtbx_FridySleep" placeholder="Time"></asp:TextBox>
                 
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkSaturday" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_chkbx_Satdy" />
                    <p>
                        <asp:Label ID="Label6" AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSaturdayon" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_txtbx_Satdy" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtSaturdaysleep" runat="server" ClientIDMode="Static" globalize="ML_SmartCAS_txtbx_SatdySleep" placeholder="Time"></asp:TextBox>
                  
                </div>

                <div class="clear_both"></div>

                <div class="smart_days_box smart_days_box_second">
                    <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_chkbx_Sundy" />
                    <p>
                        <asp:Label ID="Label7" AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSundayon" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_Sundy" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_time_box_second">
                    <asp:TextBox ID="txtSundaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_txtbx_SundySleep" placeholder="Time"></asp:TextBox>
                 
                </div>
            </div>
            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_SmartJac_b_RT"><%= CustomerPortal.Translator.T("ML_SmartJac_b_RT") %></b>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoAuto" ClientIDMode="Static" runat="server" GroupName="mode" globalize="ML_SmartCAS_rb_Auto" />
                    <asp:Label AssociatedControlID="rdoFan" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_rb_Auto") %>' globalize="ML_SmartCAS_rb_Auto"></asp:Label>
                    <div style="float: right; width: 100px">
                        <asp:TextBox ID="txtroomtemp" runat="server" ClientIDMode="Static" CssClass="TempBox" Style="width: 83px; text-align: center;"
                            globalize="ML_SmartCAS_txtbx_RT" placeholder="Temperature"></asp:TextBox><span style="color: Black; padding: 0px;">&deg;F</span>

                    </div>
                </div>

                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoFan" runat="server" ClientIDMode="Static" GroupName="mode" globalize="ML_SmartCAS_rb_Fan" />
                    <asp:Label AssociatedControlID="rdoFan" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_rb_Fan") %>' globalize="ML_SmartCAS_rb_Fan"></asp:Label>
                </div>
            </div>

            <hr class="divider_line" style="float: left; width: 49%; margin-bottom: 3px;">

            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_SmartCAS_b_ST"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_ST") %></b>
                <div class="type_of_wash">
                    <div style="float: left; width: 100%;"><span globalize="ML_SmartLight_txtbx_L">
                        <asp:TextBox ID="txt_Slider" runat="server" ClientIDMode="Static" placeholder="Temperature"></asp:TextBox></span>
                        <div style="float: right; width: 15%; margin-left: 4px;">
                            <asp:TextBox ID="txt_SliderVal" runat="server" ClientIDMode="Static" CssClass="TempBox" Style="width: 31px; text-align: center; padding-top: 2px;" ReadOnly="true" globalize="ML_SmartCAS_txtbx_SLideVal" placeholder="Temperature" /><span style="color: Black; padding: 0px;">&deg;F</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="setting_save_box">
        <asp:Button runat="server" ID="btnSaveChanges" CssClass="submit-button" ClientIDMode="Static" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' globalize="ML_SmartCAS_btn_Save" />
        <asp:Label ID="lblMsg" runat="server" globalize="ML_SmartCAS_Lbl_Msg"></asp:Label>
    </div>
    <ajaxToolkit:SliderExtender ID="SliderExtender1" ClientIDMode="Static" Length="400" runat="server" BehaviorID="txt_Slider"
        TargetControlID="txt_Slider" Minimum="50" Maximum="80" BoundControlID="txt_SliderVal" />
    <span globalize="ML_Title_Smart_CentralSystem" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_CentralSystem") %></span>
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
</asp:Content>
