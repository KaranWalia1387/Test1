<%@ Page Title="Smart Water Heater" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-waterheater.aspx.cs" Inherits="CustomerPortal.waterheater" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartWaterHeater") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartWaterHeater")%>
    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1" >
    <div class="dish_washer_heading">
        <img src="images/water-heater-image.png">
        <p>
            <b><span globalize="ML_SmartHm_div_WH"><%= CustomerPortal.Translator.T("ML_SmartHm_div_WH") %></span> <span>|</span> </b>
            <asp:Label ID="lblModel" runat="server" globalize="ML_WaterHeater_Lbl_WH"></asp:Label>
        </p>
        <!--<input type="button" class="on_off_btn" value="OFF" />-->
    </div>
    <div class="smart_dish_box">
        <div class="Left_Bill_area smart_time_days time_right_border">
            <b globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Monday" />
                <p>
                    <asp:Label ID="Label7" AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtMonday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Mndy" placeholder="Time"></asp:TextBox>
           
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Tuesdy" />
                <p>
                    <asp:Label ID="Label1" AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtTuesday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Tuesdy" placeholder="Time"></asp:TextBox>
             
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Weddy" />
                <p>
                    <asp:Label ID="Label2" AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtWednesday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Weddy" placeholder="Time"></asp:TextBox>
             

            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkThursday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Thudy" />
                <p>
                    <asp:Label ID="Label3" AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">

                <asp:TextBox ID="txtThursday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Thudy" placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Fridy" />
                <p>
                    <asp:Label ID="Label4" AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy" title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtFriday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Fridy" placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSaturday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Satdy" />
                <p>
                    <asp:Label ID="Label5" AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSaturday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Satdy" placeholder="Time"></asp:TextBox>
             
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_chkbx_Sundy" />
                <p>
                    <asp:Label ID="Label6" AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSunday" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txtbx_Sundy" placeholder="Time"></asp:TextBox>
              
            </div>
        </div>
        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_SmartJac_b_WT"><%= CustomerPortal.Translator.T("ML_SmartJac_b_WT") %></b>
            <div class="type_of_wash">
                <div class="type_of_wash_temp"><span globalize="ML_SmartRefrige_txtbx_SValfridge">
                    <asp:TextBox ID="txt_Slider" ClientIDMode="Static" runat="server" globalize="ML_WaterHeater_txt_Slider" placeholder="Water Temperature"></asp:TextBox></span>
                </div>
                <div style="float: left; width: 18%; margin-left: 10px; padding-top: 20px;">
                    <asp:TextBox ID="txt_SliderVal" ClientIDMode="Static" runat="server" CssClass="TempBox" Style="width: 28px; text-align: center; border: 0; padding: 0px 0 0 0;"
                        ReadOnly="true" globalize="ML_WaterHeater_txt_SlideVal" placeholder="Slide Value" /><span style="color: Black; padding: 4px 0 0 0px;">&deg;F</span>
                </div>
            </div>
        </div>

        <hr class="divider_line" style="float: left; width: 49%; margin-bottom: 3px;">

        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_WaterHeater_b_Mode"><%= CustomerPortal.Translator.T("ML_WaterHeater_b_Mode") %></b>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoHD" ClientIDMode="Static" runat="server" GroupName="WHeater" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoHD" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartRefrige_rb_HD") %>' globalize="ML_SmartRefrige_rb_HD" />
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoPS" ClientIDMode="Static" runat="server" GroupName="WHeater" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoPS" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartRefrige_rb_PS") %>' globalize="ML_SmartRefrige_rb_PS" />
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoVA" runat="server" GroupName="WHeater" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoVA" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WaterHeater_rb_VA") %>' globalize="ML_WaterHeater_rb_VA" />
            </div>
        </div>
        </div>
    </div>
     <div class="setting_save_box">
        <%--<asp:Button runat="server" ID="btnSaveChanges" CssClass="submit-button" Text="SAVE" OnClick="btnSaveChanges_Click" globalize="ML_SmartCAS_btn_Save" />--%>
        <asp:Button runat="server" ClientIDMode="Static" ID="btnSaveChanges" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' OnClientClick="return false;" globalize="ML_SmartCAS_btn_Save" />

        <asp:Label ID="lblMsg" runat="server" globalize="ML_WaterHeater_Lbl_Msg"></asp:Label>
    </div>
    <ajaxToolkit:SliderExtender ID="SliderExtender1" Length="400" runat="server" BehaviorID="txt_Slider"
        TargetControlID="txt_Slider" Minimum="50" Maximum="80" BoundControlID="txt_SliderVal" />
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_WaterHeater" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_WaterHeater") %></span>
</asp:Content>
