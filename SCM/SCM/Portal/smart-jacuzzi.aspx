<%@ Page Title="Smart Jacuzzi" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-jacuzzi.aspx.cs" Inherits="CustomerPortal.jacuzzi" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartJacuzzi") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartJacuzzi")%>
    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

  
    <input type="hidden" class="activeli_list" value="sh" />
     <div class="right_content_box_1" >
    <div class="dish_washer_heading">
        <img src="images/jacuzzi-image.png" globalize="ML_SmartJac_img_Jac">
        <p>
            <b globalize="ML_SmartJac_b_Jac" style="float: left;">Jacuzzi <span>|</span> </b>
            <asp:Label ID="lblModel" runat="server" globalize="ML_SmartJac_Lbl_Model" Style="float: left;"></asp:Label>            
            <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" Text="OFF" OnClientClick="return false;" Style="float: left;" globalize="ML_SmartJacuzzi_ErrMsg_OnOff" />

        </p>

    </div>
    <div class="smart_dish_box" id="smart_dish">
        <div class="Left_Bill_area smart_time_days time_right_border">
            <b class="time_b" globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
            <b class="on_b" globalize="ML_SmartCAS_b_On"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_On") %></b>
            <b class="off_b" globalize="ML_SmartJac_b_Off"><%= CustomerPortal.Translator.T("ML_SmartJac_b_Off") %></b>
            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_chkbx_Mondy" />
                <p>
                    <asp:Label ID="Label1" AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtMondayon" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_MondyOn" placeholder="Time"></asp:TextBox>
            </div>

            <div class="smart_time_box_second">
                <asp:TextBox ID="txtMondaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_MondySleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_chkbx_Tuesdy" />
                <p>
                    <asp:Label AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy"></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtTuesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_TuesdyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtTuesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_TuesdySleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_chkbx_Weddy" />
                <p>
                    <asp:Label AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy"></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtWednesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_WeddyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtWednesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_WeddySleep" placeholder="Time"></asp:TextBox>
              
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkThursday" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_chkbx_Thudy" />
                <p>
                    <asp:Label AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtThursdayon" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_txt_ThudyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtThursdaysleep" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_txt_ThudySleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkFriday"  ClientIDMode="Static" runat="server" globalize="ML_SmartJac_chkbx_Fridy" />
                <p>
                    <asp:Label AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy" title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>'></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtFridayon"  ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_FriOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtFridaysleep"  ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_FriSleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkSaturday" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_chkbx_Sat" />
                <p>
                    <asp:Label AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSaturdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_SatOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtSaturdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartJac_txt_SatSleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkSunday" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_chkbx_Sundy" />
                <p>
                    <asp:Label AssociatedControlID="chkSunday" ClientIDMode="Static"  runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label></p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSundayon" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_txt_SunOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtSundaysleep" ClientIDMode="Static"  runat="server" globalize="ML_SmartJac_txt_SunSleep" placeholder="Time"></asp:TextBox>
            </div>
        </div>
        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_SmartJac_b_WT"><%= CustomerPortal.Translator.T("ML_SmartJac_b_WT") %></b>
            <div class="type_of_wash">
                <div class="type_of_wash_temp"><span globalize="ML_SmartRefrige_txtbx_SValfridge">
                    <asp:TextBox ID="txtroomtemp" ClientIDMode="Static"  runat="server" Style="text-align: right;" globalize="ML_SmartJac_txt_RoomTemp" placeholder="Temperature"></asp:TextBox></span>
                </div>
                <div style="float: left; width: 60px; margin-left: 10px; padding-top: 16px;">
                    <asp:TextBox ID="txt_SliderVal" ClientIDMode="Static"  runat="server" CssClass="TempBox" Style="width: 31px; padding: 2px; text-align: center;" ReadOnly="true" globalize="ML_SmartJac_txt_Slider" placeholder="Temperature" /><span style="color: Black; padding: 0px;">&deg;F</span>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
            </div>
        </div>

        <hr class="divider_line" style="float: left; width: 49%; margin-bottom: 3px;">

        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_SmartJac_b_RT"><%= CustomerPortal.Translator.T("ML_SmartJac_b_RT") %></b>
            <div class="all_bill_box">
                <div class="white_div" style="margin-bottom: 5px;">
                    <div class="left-area-tabular" globalize="ML_SmartRefrige_div_Light"><%= CustomerPortal.Translator.T("ML_SmartRefrige_div_Light") %></div>
                    <div class="right-area-tabular" style="padding: 0px;">
                        <asp:Button ID="btnLight" ClientIDMode="Static"  runat="server" CssClass="on_off_btn" Text='<%# CustomerPortal.Translator.T("ML_btnLightOff") %>' OnClientClick="return false;" Style="margin: 0px;" globalize="ML_btnLightOff" />
                    </div>
                </div>
                <div class="gray_div">
                    <div class="left-area-tabular" globalize="ML_SmartJac_div_Auto"><%= CustomerPortal.Translator.T("ML_SmartJac_div_Auto") %></div>
                    <div class="right-area-tabular" style="padding: 0px;">                   
                        <asp:Button ID="btnAuto" ClientIDMode="Static"  runat="server" CssClass="on_off_btn" OnClientClick="return false;" Style="margin: 0px;" globalize="ML_btnAutoOn" />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="setting_save_box">
        <asp:Button runat="server" ClientIDMode="Static"  ID="btnSaveChanges" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' OnClientClick="return false;" globalize="ML_SmartCAS_btn_Save" />
        <asp:Label ID="lblMsg" runat="server" globalize="ML_SmartJac_Lbl_Msg"></asp:Label>
    </div>
    <ajaxToolkit:SliderExtender ID="SliderExtender1" Length="400" runat="server" BehaviorID="txt_Slider"
        TargetControlID="txtroomtemp" Minimum="50" Maximum="80" BoundControlID="txt_SliderVal" />
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_Jacuzzi" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Jacuzzi") %></span>
</asp:Content>
