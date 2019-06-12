<%@ Page Title="Smart Refrigerator" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true"
    CodeBehind="smart-refrigerator.aspx.cs" Inherits="CustomerPortal.refrigerator" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartRefrigerator") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartRefrigerator")%>

  
    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1">
        <div class="dish_washer_heading">
            <img src="images/refrigrator-image.png" globalize="ML_SmartRefrige_img_Refrige">
            <p>
                <b><span globalize="ML_SmartHm_div_Refrige"><%= CustomerPortal.Translator.T("ML_SmartHm_div_Refrige") %> </span><span>|</span> </b>
                <asp:Label ID="lblModel" runat="server" globalize="ML_SmartRefrige_Lbl_Model"></asp:Label>
            </p>
            <!--<input type="button" class="on_off_btn" value="OFF" />-->
        </div>
        <div class="smart_dish_box">
            <div class="Left_Bill_area smart_time_days time_right_border">
                <b globalize="ML_SmartRefrige_b_Fridge"><%= CustomerPortal.Translator.T("ML_SmartRefrige_b_Fridge") %></b>
                <div style="float: left; width: 81%;">
                    <span globalize="ML_SmartRefrige_txtbx_Sfridge">
                        <asp:TextBox ID="txt_Sliderfridge" ClientIDMode="Static" runat="server" placeholder="Fridge"></asp:TextBox></span>
                </div>
                <div style="float: left; width: 15%; margin-left: 10px; padding-top: 2px;">
                    <span globalize="ML_SmartRefrige_txtbx_SValfridge">
                        <asp:TextBox ID="txt_SliderValfridge" runat="server" ClientIDMode="Static" CssClass="TempBox" Style="padding-top: 0px; text-align: center;"
                            ReadOnly="true" placeholder="Temperature" /></span>
                    <span style="color: Black">&deg;F</span>
                </div>
                <div class="clear_both">
                </div>
                <div class="frezer">
                    <b globalize="ML_SmartRefrige_b_Freezer"><%= CustomerPortal.Translator.T("ML_SmartRefrige_b_Freezer") %></b>
                    <div class="TypeContainerRadioBtns">
                        <div style="float: left; width: 81%;">
                            <asp:TextBox ID="txt_Sliderfreezer" ClientIDMode="Static" runat="server" globalize="ML_SmartRefrige_txtbx_SliderF" placeholder="Freezer"></asp:TextBox>
                        </div>
                        <div style="float: left; width: 15%; margin-left: 10px; padding-top: 2px;">
                            <asp:TextBox ID="txt_SliderValfreezer" ClientIDMode="Static" runat="server" CssClass="TempBox" Style="padding-top: 0px; text-align: center;"
                                ReadOnly="true" globalize="ML_SmartRefrige_txtbx_SlideValF" placeholder="Temperature" /><span style="color: Black">&deg;F</span>
                        </div>
                        <div class="clear">
                            &nbsp;
                        </div>
                    </div>
                    <hr class="divider_line" style="float: left; width: 100%; margin-bottom: 23px; margin-top: 30px">
                    <div class="all_bill_box">
                        <div class="white_div" style="margin-bottom: 5px; float: left;">
                            <div class="left-area-tabular" globalize="ML_SmartRefrige_div_Light"><%= CustomerPortal.Translator.T("ML_SmartRefrige_div_Light") %></div>
                            <div class="right-area-tabular" style="padding: 0px;">
                                <asp:Button ID="btnLight" ClientIDMode="Static" runat="server" CssClass="on_off_btn" Style="float: left; margin: 0;" globalize="ML_btnLightON" Text='<%# CustomerPortal.Translator.T("ML_btnLightON") %>' OnClientClick="return false;" />
                            </div>
                        </div>
                        <div class="gray_div">
                            <div class="left-area-tabular">
                                <asp:TextBox ID="txtwaterfilter" ClientIDMode="Static" runat="server" CssClass="TempBox" Style="width: 100px; text-align: center; border: 1px solid #d6d6d6 !important;" globalize="ML_SmartRefrige_txtbx_WFilter" placeholder="Rate"></asp:TextBox>
                            </div>
                            <div class="right-area-tabular" globalize="ML_SmartRefrige_div_Good"><%= CustomerPortal.Translator.T("ML_SmartRefrige_div_Good") %></div>
                        </div>
                    </div>
                </div>


            </div>
            <div class="right_Bill_area smart_time_days">
                <b globalize="ML_WaterHeater_b_Mode"><%= CustomerPortal.Translator.T("ML_WaterHeater_b_Mode") %></b>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoHD" ClientIDMode="Static" runat="server" GroupName="mode" globalize="ML_rdo_Smart" />
                    <asp:Label AssociatedControlID="rdoHD" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartRefrige_rb_HD") %>' globalize="ML_SmartRefrige_rb_HD" />
                </div>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoPS" ClientIDMode="Static" runat="server" GroupName="mode" globalize="ML_rdo_Smart" />
                    <asp:Label AssociatedControlID="rdoPS" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartRefrige_rb_PS") %>' globalize="ML_SmartRefrige_rb_PS" />
                </div>
                <div class="type_of_wash">
                    <asp:RadioButton ID="rdoVA" runat="server" GroupName="mode" globalize="ML_rdo_Smart" />
                    <asp:Label AssociatedControlID="rdoVA" runat="server" Text='<%# CustomerPortal.Translator.T("ML_WaterHeater_rb_VA") %>' globalize="ML_WaterHeater_rb_VA" />
                </div>
            </div>
        </div>
    </div>
    <div class="setting_save_box">
        <asp:Button runat="server" ClientIDMode="Static" ID="btnSaveChanges" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' OnClientClick="return false;" globalize="ML_SmartCAS_btn_Save" />
        <asp:Label ID="lblMsg" runat="server" globalize="ML_SmartRefrige_Lbl_Msg"></asp:Label>
    </div>

    <ajaxToolkit:SliderExtender ID="SliderExtender1"  Length="400" runat="server" BehaviorID="txt_Sliderfridge"
        TargetControlID="txt_Sliderfridge" Minimum="-20" Maximum="20" BoundControlID="txt_SliderValfridge" />
    <ajaxToolkit:SliderExtender ID="SliderExtender2" Length="400" runat="server" BehaviorID="txt_Sliderfreezer"
        TargetControlID="txt_Sliderfreezer" Minimum="-20" Maximum="20" BoundControlID="txt_SliderValfreezer" />
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
    <span globalize="ML_Title_Smart_Refrigerator" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Refrigerator") %></span>
</asp:Content>
