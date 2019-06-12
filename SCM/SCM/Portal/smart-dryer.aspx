<%@ Page Title="Smart Dryer" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-dryer.aspx.cs" Inherits="CustomerPortal.dryer" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
       <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartDryer") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartDryer")%>
    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1">
        <div class="dish_washer_heading">
            <img src="images/dryer-image.png" globalize="ML_SmartDry_img_Dryer">
            <p>
                <b style="float: left;"><span globalize="ML_SmartHm_div_Dryer"><%= CustomerPortal.Translator.T("ML_SmartHm_div_Dryer") %></span> <span>|</span> </b>
                <asp:Label ID="lblModel" runat="server" globalize="ML_SmartDry_lBL_Model" Style="float: left;"></asp:Label>

                <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" OnClientClick="return false;" Text='<%# CustomerPortal.Translator.T("ML_SmartDryer_ErrMsg_OnOff") %>' Style="float: left;" globalize="ML_SmartDryer_ErrMsg_OnOff"/>
            </p>


        </div>
        <div class="smart_dish_box" id="smart_dish">
            <div class="Left_Bill_area smart_time_days time_right_border">
                <b globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Mndy" />
                    <p>
                        <asp:Label ID="Label1" AssociatedControlID="chkMonday" runat="server" globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txtbx_Mndy" placeholder="Time"></asp:TextBox>
                  
                </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Tuedy" placeholder="Time" />
                    <p>
                        <asp:Label ID="Label2" AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtTuesday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txtbx_Tuedy" placeholder="Time"></asp:TextBox>
                  
                </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Weddy" />
                    <p>
                        <asp:Label ID="Label3" AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtWednesday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txt_Weddy" placeholder="Time"></asp:TextBox>

                </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkThursday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Thudy" />
                    <p>
                        <asp:Label ID="Label4" AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtThursday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txt_Thudy" placeholder="Time"></asp:TextBox>
                </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Fridy" />
                    <p>
                        <asp:Label ID="Label5" AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy" title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtFriday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txt_Fridy" placeholder="Time"></asp:TextBox>
                                  </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkSaturday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chk_Satdy" />
                    <p>
                        <asp:Label ID="Label6" AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSaturday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txt_Satdy" placeholder="Time"></asp:TextBox>
                  
                </div>
                <div class="smart_days_box">
                    <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_chkbx_Sundy" />
                    <p>
                        <asp:Label ID="Label7" AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label></p>
                </div>
                <div class="smart_time_box">
                    <asp:TextBox ID="txtSunday" ClientIDMode="Static" runat="server" globalize="ML_SmartDry_txtbx_Sundy" placeholder="Time"></asp:TextBox>
                 
                </div>
            </div>
            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_SmartDry_b_temp"><%= CustomerPortal.Translator.T("ML_SmartDry_b_temp") %></b>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoLH" ClientIDMode="Static" runat="server" GroupName="temp" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoLH" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_rb_LH") %>' globalize="ML_SmartDry_rb_LH" />
                </div>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoHH" ClientIDMode="Static" runat="server" GroupName="temp" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoHH" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_rb_HH") %>' globalize="ML_SmartDry_rb_HH" />
                </div>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoPP" ClientIDMode="Static" runat="server" GroupName="temp" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoPP" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_rb_PP") %>' globalize="ML_SmartDry_rb_PP" />
                </div>
            </div>

            <hr class="divider_line" style="float: left; width: 49%; margin-bottom: 3px;">

            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_SmartDry_b_LS"><%= CustomerPortal.Translator.T("ML_SmartDry_b_LS") %></b>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoRL" ClientIDMode="Static" runat="server" GroupName="load" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoRL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_RLoad") %>' globalize="ML_WashingMchn_rb_RLoad" />
                </div>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoLL" ClientIDMode="Static" runat="server" GroupName="load" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoLL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_LLoad") %>' globalize="ML_WashingMchn_rb_LLoad" />
                </div>
                <div class="type_of_wash">

                    <asp:RadioButton ID="rdoXL" ClientIDMode="Static" runat="server" GroupName="load" globalize="ML_rdo_Smart"/>
                    <asp:Label AssociatedControlID="rdoXL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_rb_XLL") %>' globalize="ML_SmartDry_rb_XLL" />
                </div>
            </div>
        </div>
    </div>
    <div class="setting_save_box">        
        <asp:Button runat="server" ClientIDMode="Static" ID="btnSaveChanges" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' CssClass="submit-button" OnClientClick="return false;" globalize="ML_SmartCAS_btn_Save" />
        <div>
            <asp:Label ID="lblMsg" runat="server"></asp:Label>
        </div>
    </div>
    <span globalize="ML_Title_Smart_Dryer" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Dryer") %></span>
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>

</asp:Content>
