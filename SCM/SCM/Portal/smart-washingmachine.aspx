<%@ Page Title="Smart Washing Machine" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-washingmachine.aspx.cs" Inherits="CustomerPortal.washingmachine" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartWashingMachine") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartWashingMachine")%>
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    
    <input type="hidden" class="activeli_list" value="sh" />
     <div class="right_content_box_1" >
    <div class="dish_washer_heading">
        <img src="images/washing-image.png">
        <p>
            <b style="float: left;"><span globalize="ML_WashingMchn_b_WM"><%= CustomerPortal.Translator.T("ML_WashingMchn_b_WM") %></span> <span>|</span> </b>
            <asp:Label ID="lblModel" runat="server" globalize="ML_WashingMchn_Lbl_WM" Style="float: left;"></asp:Label>
            <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" Text='<%# CustomerPortal.Translator.T("ML_SmartWM_ErrMsg_OnOff") %>' OnClientClick="return false;" Style="float: left;" globalize="ML_SmartWM_ErrMsg_OnOff" />
        </p>

    </div>
    <div class="smart_dish_box" id="smart_dish">
        <div class="Left_Bill_area smart_time_days time_right_border">
            <b globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartCAS_Lbl_Mndy" />
                <p>
                    <asp:Label AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' ></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtMonday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Mndy" placeholder="Time"></asp:TextBox>
              
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Tusdy" />
                <p>
                    <asp:Label AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'  globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtTuesday" ClientIDMode="Static"  runat="server" globalize="ML_WashingMchn_txtbx_Tusdy" placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Weddy" />
                <p>
                    <asp:Label AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtWednesday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Weddy" placeholder="Time"></asp:TextBox>
              

            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkThursday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Thusdy" />
                <p>
                    <asp:Label AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtThursday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Thusdy" placeholder="Time"></asp:TextBox>
              
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Fridy" />
                <p>
                    <asp:Label AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy" title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtFriday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Fridy" placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSaturday"  ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Satdy" />
                <p>
                    <asp:Label AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSaturday"  ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Satdy" placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_chkbx_Sundy" />
                <p>
                    <asp:Label AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSunday" ClientIDMode="Static" runat="server" globalize="ML_WashingMchn_txtbx_Sundy" placeholder="Time"></asp:TextBox>
               
            </div>
        </div>
        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_WashingMchn_b_Temp"><%= CustomerPortal.Translator.T("ML_WashingMchn_b_Temp") %></b>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoHW" runat="server" ClientIDMode="Static"  GroupName="temp" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoHW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_HW") %>'  globalize="ML_WashingMchn_rb_HW" />
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoNW" ClientIDMode="Static"  runat="server" GroupName="temp" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoNW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_WW") %>'  globalize="ML_WashingMchn_rb_WW" />
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoSW" ClientIDMode="Static"  runat="server" GroupName="temp" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoSW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_CW") %>'  globalize="ML_WashingMchn_rb_CW" />
            </div>
        </div>

        <hr class="divider_line" style="float: left; width: 49%; margin-bottom: 3px;">

        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_SmartDry_b_LS"><%= CustomerPortal.Translator.T("ML_SmartDry_b_LS") %></b>
            <div class="type_of_wash">
                <asp:RadioButton ID="rodRL" ClientIDMode="Static"  runat="server" GroupName="load" globalize="ML_rdo_Smart" />
                <asp:Label AssociatedControlID="rodRL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_RLoad") %>' globalize="ML_WashingMchn_rb_RLoad" />
            </div>
            <%-- <div class="type_of_wash">
                        	<input name="Medium" type="radio">	<span>Medium</span>
                        </div>--%>
            <div class="type_of_wash">
                <asp:RadioButton ID="rodLL" ClientIDMode="Static"  runat="server" GroupName="load" globalize="ML_rdo_Smart" />
                <asp:Label AssociatedControlID="rodLL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WashingMchn_rb_LLoad") %>' globalize="ML_WashingMchn_rb_LLoad" />
            </div>

            <div class="type_of_wash">
                <asp:RadioButton ID="rodXLL" ClientIDMode="Static"  runat="server" GroupName="load" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rodXLL" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_rb_XLL") %>' globalize="ML_SmartDry_rb_XLL" />
            </div>
        </div>
        </div>
    </div>
    <div class="setting_save_box">
        <%-- <asp:Button runat="server" ID="btnSaveChanges" CssClass="submit-button" Text="SAVE" OnClick="btnSaveChanges_Click" globalize="ML_SmartCAS_btn_Save" />--%>
        <asp:Button runat="server" ClientIDMode="Static"  ID="btnSaveChanges" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' globalize="ML_SmartCAS_btn_Save" OnClientClick="return false;" />
    </div>

    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_Washing_Machine" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Washing_Machine") %></span>
</asp:Content>
