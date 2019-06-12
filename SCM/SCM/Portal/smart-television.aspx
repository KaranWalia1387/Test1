<%@ Page Title="Smart Television" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-television.aspx.cs" Inherits="CustomerPortal.television" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartTelevision") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartTelevision")%>
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1" >
    <div class="dish_washer_heading">
        <img src="images/tv-image.png" globalize="ML_SmartTv_img_tv">
        <p>
            <b style="float: left;"><span globalize="ML_SmartTv_b_tv"><%= CustomerPortal.Translator.T("ML_SmartTv_b_tv") %></span> <span>|</span> </b>
            <asp:Label ID="lblModel" runat="server" globalize="ML_SmartTv_Lbl_Model" Style="float: left;"></asp:Label>
            <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" Text="OFF" OnClientClick="return false;" Style="float: left;" globalize="ML_SmartTV_ErrMsg_OnOff" />
        </p>

    </div>
    <div class="smart_dish_box" id="smart_dish">
        <div class="Left_Bill_area smart_time_days time_right_border">
            <b class="time_b" globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
            <b class="on_b" globalize="ML_SmartCAS_b_On"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_On") %></b>
            <b class="off_b" globalize="ML_SmartTv_b_Sleep"><%= CustomerPortal.Translator.T("ML_SmartTv_b_Sleep") %></b>
            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkMonday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Mndy" />
                <p>
                    <asp:Label AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title="Monday"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtMondayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_MondyOn" placeholder="Time"></asp:TextBox>
            </div>

            <div class="smart_time_box_second">
                <asp:TextBox ID="txtMondaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_MondySleep" placeholder="Time"></asp:TextBox>
             
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkTuesday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Tuedy" />
                <p>
                    <asp:Label AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title="Tuesday"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtTuesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_TuedyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtTuesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_TuedySleep" placeholder="Time"></asp:TextBox>
              
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkWednesday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Weddy" />
                <p>
                    <asp:Label AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Weddy") %>' globalize="ML_SmartCAS_Lbl_Weddy" title="Wednesday"></asp:Label>
                </p>

            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtWednesdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_WeddyOn" placeholder="Time"></asp:TextBox>

            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtWednesdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_WeddySleep" placeholder="Time"></asp:TextBox>
              
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkThursday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Thusdy" />
                <p>
                    <asp:Label AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title="Thursday"></asp:Label>
                </p>

            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtThursdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_ThusdyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtThursdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_ThusdySleep" placeholder="Time"></asp:TextBox>
              
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkFriday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Fridy" />
                <p>
                    <asp:Label AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' title='<%# CustomerPortal.Translator.T("ML_SmartDry_Lbl_Fridy") %>' globalize="ML_SmartDry_Lbl_Fridy"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtFridayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_FridyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtFridaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_FridySleep" placeholder="Time"></asp:TextBox>
             
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkSaturday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Satdy" />
                <p>
                    <asp:Label AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' globalize="ML_SmartCAS_Lbl_Satdy"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSaturdayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_SatOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtSaturdaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_SatdySleep" placeholder="Time"></asp:TextBox>
            </div>

            <div class="clear_both"></div>

            <div class="smart_days_box smart_days_box_second">
                <asp:CheckBox ID="chkSunday" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_chkbx_Sundy" />
                <p>
                    <asp:Label AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>' globalize="ML_SmartCAS_Lbl_Sundy"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSundayon" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_SundyOn" placeholder="Time"></asp:TextBox>
            </div>
            <div class="smart_time_box_second">
                <asp:TextBox ID="txtSundaysleep" ClientIDMode="Static" runat="server" globalize="ML_SmartTv_txtbx_SundySleep" placeholder="Time"></asp:TextBox>
</div>
        </div>
        <div class="right_Bill_area smart_time_days">
            <b globalize="ML_WaterHeater_b_Mode"><%= CustomerPortal.Translator.T("ML_WaterHeater_b_Mode") %></b>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoHW" ClientIDMode="Static" runat="server" GroupName="wash" globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoHW" runat="server" Text="Standard" globalize="ML_Smart_TV_ModeLabel1"></asp:Label>
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoNW" ClientIDMode="Static" runat="server" GroupName="wash"  globalize="ML_rdo_Smart"/>
                <asp:Label AssociatedControlID="rdoNW" runat="server" Text="Standard" globalize="ML_Smart_TV_ModeLabel2"></asp:Label>
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoSW" ClientIDMode="Static" runat="server" GroupName="wash" globalize="ML_rdo_Smart" />
                <asp:Label AssociatedControlID="rdoSW" runat="server" Text="Standard" globalize="ML_Smart_TV_ModeLabel3"></asp:Label>
            </div>
        </div>

        </div>

    </div>
    <div class="setting_save_box">
        <%-- <asp:Button runat="server" ID="btnSaveChanges" CssClass="submit-button" globalize="ML_SmartTv_Button_Save" Text="SAVE" OnClick="btnSaveChanges_Click" />--%>
        <asp:Button runat="server" ID="btnSaveChanges" ClientIDMode="Static" CssClass="submit-button" globalize="ML_SmartTv_Button_Save" Text='<%# CustomerPortal.Translator.T("ML_SmartTv_Button_Save") %>' OnClientClick="return false;" />
        <div>
            <asp:Label ID="lblMsg" runat="server" globalize="ML_SmartTv_Lbl_Msg"></asp:Label>
        </div>
    </div>
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_Television" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Television") %></span>
</asp:Content>
