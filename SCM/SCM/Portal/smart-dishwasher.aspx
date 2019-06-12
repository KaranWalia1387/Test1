<%@ Page Title="Smart Dishwasher" Language="C#" MasterPageFile="SmartHomeMaster.Master" AutoEventWireup="true"
    CodeBehind="smart-dishwasher.aspx.cs" Inherits="CustomerPortal.dishwasher" %>

<%@ Register Src="UserControls/SmartSlider.ascx" TagName="SmartSlider" TagPrefix="uc1" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
            <%: System.Web.Optimization.Styles.Render("~/Content/cssSmartDishWasher") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSmartDishWasher")%>

    <asp:HiddenField ID="hdnFlag" ClientIDMode="Static" runat="server" Value="0" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sh" />
    <div class="right_content_box_1" >
    <div class="dish_washer_heading">
        <img src="images/dish_washer_img.png"  globalize="ML_SmartDish_img_DishWash">
        <p>
            <b style="float: left;"><span globalize="ML_SmartDish_b_DW"><%= CustomerPortal.Translator.T("ML_SmartDish_b_DW") %></span> <span>|</span> </b>
            <asp:Label ID="lblModel" runat="server" globalize="ML_SmartDish_Lbl_Model" ClientIDMode="Static" Style="float: left;"></asp:Label><%--<asp:Button ID="imgIson" runat="server" CssClass="on_off_btn" OnClick="imgIson_Click" Text="0" Style="float: left;" />--%>
            <asp:Button ID="imgIson" ClientIDMode="Static" runat="server" CssClass="on_off_btn" globalize="ML_SmartHome_DishWasher_OffOn" OnClientClick="return false;" Style="float: left;" />
        </p>
    </div>
    <div class="smart_dish_box" id="smart_dish">
        <div class="Left_Bill_area smart_time_days time_right_border">
            <b globalize="ML_SmartCAS_b_TD"><%= CustomerPortal.Translator.T("ML_SmartCAS_b_TD") %></b>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkMonday" runat="server" globalize="ML_SmartDish_chkbx_Mondy"  ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkMonday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>' globalize="ML_SmartCAS_Lbl_Mndy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Mndy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtMonday" runat="server" globalize="ML_SmartDish_txtbx_Mndy" placeholder="Time" ClientIDMode="static"></asp:TextBox>
                
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkTuesday" runat="server" globalize="ML_SmartDish_chkbx_Tuedy" ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkTuesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>' globalize="ML_SmartCAS_Lbl_Tudy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Tudy") %>'></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtTuesday" runat="server" globalize="ML_SmartDish_txtbx_Tuedy" placeholder="Time" ClientIdMode="Static" ></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkWednesday" runat="server" globalize="ML_SmartDish_chkbx_Weddy"  ClientIdMode="Static" onclick="javascript:checkStatus(this);" />
                <p>
                    <asp:Label AssociatedControlID="chkWednesday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDish_txtbx_Weddy") %>' globalize="ML_SmartDish_txtbx_Weddy"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtWednesday" runat="server" globalize="ML_SmartDish_txtbx_Weddy" placeholder="Time"  ClientIdMode="Static"></asp:TextBox>
      
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkThursday" runat="server" globalize="ML_SmartDish_chkbx_Thudy" ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkThursday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>' globalize="ML_SmartCAS_Lbl_Thurdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Thurdy") %>'></asp:Label>
                </p>

            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtThursday" runat="server" globalize="ML_SmartDish_Thudy" ClientIdMode="Static"  placeholder="Time"></asp:TextBox>
               
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkFriday" runat="server" globalize="ML_SmartDish_chkbx_Fridy" ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkFriday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDish_Lbl_Fridy") %>' globalize="ML_SmartDish_Lbl_Fridy"></asp:Label>
                </p>
            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtFriday" runat="server" globalize="ML_SmartDish_txtbx_Fridy" placeholder="Time"  ClientIdMode="Static"></asp:TextBox>

            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSaturday" runat="server" globalize="ML_SmartDish_chkbx_Satdy" ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkSaturday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>' ClientIdMode="Static" globalize="ML_SmartCAS_Lbl_Satdy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Satdy") %>'></asp:Label>
                </p>

            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSaturday" runat="server" globalize="ML_SmartDish_txtbx_Satdy" placeholder="Time" ClientIdMode="Static"></asp:TextBox>
            
            </div>
            <div class="smart_days_box">
                <asp:CheckBox ID="chkSunday" runat="server" globalize="ML_SmartDish_chkbx_Sundy"  ClientIdMode="Static" onclick="javascript:checkStatus(this);"/>
                <p>
                    <asp:Label AssociatedControlID="chkSunday" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'  globalize="ML_SmartCAS_Lbl_Sundy" title='<%# CustomerPortal.Translator.T("ML_SmartCAS_Lbl_Sundy") %>'></asp:Label>
                </p>

            </div>
            <div class="smart_time_box">
                <asp:TextBox ID="txtSunday" runat="server" globalize="ML_SmartDish_txtbx_Sundy" placeholder="Time" ClientIdMode="Static"></asp:TextBox>
             
            </div>
        </div>
        <div class="right_Bill_area smart_time_days">
            <b><span globalize="ML_SmartDish_b_TOW"><%= CustomerPortal.Translator.T("ML_SmartDish_b_TOW") %> </span></b>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoHW" runat="server" GroupName="Diswash" globalize="ML_SmartDish_rb_HW" ClientIDMode="Static" />
                <asp:Label AssociatedControlID="rdoHW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDish_rb_HW") %>'  globalize="ML_SmartDish_rb_HW"></asp:Label>

            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoNW" runat="server" GroupName="Diswash" globalize="ML_SmartDish_rb_NW" ClientIDMode="Static" />
                <asp:Label AssociatedControlID="rdoNW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDish_rb_NW") %>' globalize="ML_SmartDish_rb_NW"></asp:Label>
            </div>
            <div class="type_of_wash">
                <asp:RadioButton ID="rdoSW" runat="server" GroupName="Diswash" globalize="ML_SmartDish_rb_SW" ClientIDMode="Static" />
                <asp:Label AssociatedControlID="rdoSW" runat="server" Text='<%# CustomerPortal.Translator.T("ML_SmartDish_rb_SW") %>'  globalize="ML_SmartDish_rb_SW"></asp:Label>
            </div>
        </div>

</div>
    </div>
 <div class="setting_save_box">
      
        <%--<asp:Button runat="server" ID="btnSaveChanges" CssClass="submit-button" Text="Save" OnClick="btnSaveChanges_Click" globalize="ML_SmartCAS_btn_Save" />--%>
        <input type="button" id="btnSaveChanges" ClientIDMode="Static" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_btn_Save") %>' globalize="ML_SmartCAS_btn_Save" />

    </div>



   <%-- <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />--%>
   
    <%--<script type="text/javascript" src="include/jquery-1.5.1.min.js"></script>--%>
  <%--  <script type="text/javascript" src="include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.position.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.timepicker.js?v=0.3.1"></script>
   
    <script src="js/Translator.js" type="text/javascript"></script>--%>
   
    <span globalize="ML_Title_Smart_Dishwasher" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Smart_Dishwasher") %></span>
   <%-- <script type="text/javascript">
        k(document).ready(function () {
            $('#btnSaveChanges').click(function () {
               
                try
                {
                    if (ValidateAllPageFieldsSingleMessage('smart_dish')) {
                        loader.showloader();
                        var param = {
                            json: createParameters()
                        };
                        $.ajax({
                            type: "POST",
                            url: "smart-dishwasher.aspx/SaveAsync",
                            data: JSON.stringify(param),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data, status) {
                                if (parseInt(data.d) > 0) {
                                    toastr.success($('#DBSuccess').text());
                                    //alert('Settings saved successfully.');
                                }
                                else {
                                    toastr.error($('#IDSaveFailed').text());
                                    //alert('Setting  did not submitted.');
                                }
                                loader.hideloader();
                            },
                            error: function (request, status, error) {
                                loader.hideloader();
                                toastr.error($('#IDSaveFailed').text() + ' ' + request.statusText);
                            }
                        });
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (e)
                {
                    loader.hideloader();
                    toastr.error(e.message);
                }
            });

            k('#<%=imgIson.ClientID%>').click(function () {
                if ($(this).attr('class') == "OnBtnClass") {
                    $(this).attr('class', 'OffBtnClass');
                }
                else {
                    $(this).attr('class', 'OnBtnClass');
                }

                if ($(this).val() == "ON") {
                    $(this).val('OFF');
                }
                else {
                    $(this).val('ON');
                }
            });
        });
        function createParameters()
        {
            var TOW = '';
            if ($('#rdoHW').attr('checked'))
            { TOW = "1"; }
            else if ($('#rdoNW').attr('checked'))
            { TOW = "2"; }
            else
            { TOW = "3"; }
            var status;
            if ($('#<%=imgIson.ClientID%>').val() == 'ON') {
                status = "1";
            }
            else {
                status = "0";
            }
            var param = "TypeOfWash=" + TOW + "&IsActive=" + status;
            param += "&DayId=" + ($('#<%=chkMonday.ClientID%>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%=chkTuesday.ClientID%>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%= chkWednesday.ClientID %>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%=chkThursday.ClientID%>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%=chkFriday.ClientID%>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%=chkSaturday.ClientID%>').attr('checked') ? "1" : "0") + ",";
            param += ($('#<%= chkSunday.ClientID%>').attr('checked') ? "1" : "0");

            param += "&OnTime=" + ($('#<%=txtMonday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtTuesday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtWednesday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtThursday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtFriday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtSaturday.ClientID%>').val().trim()) + ",";
            param += ($('#<%=txtSunday.ClientID%>').val().trim());
            return param;
        }
    </script>--%>
    
    <span globalize="ML_ServiceRequest_Msg_NotSubmit" id="IDSaveFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_ServiceRequest_Msg_NotSubmit") %></span>
    <span globalize="ML_SmartDishwasher_Span_SaveSuccessMsg" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_SmartDishwasher_Span_SaveSuccessMsg") %></span>
     <%-- globalize key addede by priyansha for id DBSuccess--%>
</asp:Content>
